<?php
// Define constants

/* DO_ENVIRONMENT is one of local, dev, stg or prod. A site can pin it in
 * wp-config.php ( define( 'DO_ENVIRONMENT', 'prod' ); ); when it doesn't, it is
 * derived from WordPress's own environment type so the theme activates on any
 * install. */
if ( ! defined( 'DO_ENVIRONMENT' ) ) {
    $devo_environment_map = [
        'local' => 'local',
        'development' => 'dev',
        'staging' => 'stg',
        'production' => 'prod',
    ];
    $devo_environment_type = function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production';
    define( 'DO_ENVIRONMENT', isset( $devo_environment_map[ $devo_environment_type ] ) ? $devo_environment_map[ $devo_environment_type ] : 'prod' );
    unset( $devo_environment_map, $devo_environment_type );
}

// Cache-busting version for enqueued assets: the theme version from style.css,
// or the current time on local so edits always show up.
define( 'DO_VER', DO_ENVIRONMENT === 'local' ? (string) time() : (string) wp_get_theme( get_template() )->get( 'Version' ) );

/* Version for a file in public/dist. Those files keep the same name between
 * builds, so the theme version alone wouldn't bust the cache after a rebuild;
 * the file's modification time does. */
function devo_asset_ver( $relative_path ) {
    $file = __DIR__ . '/' . ltrim( $relative_path, '/' );
    return file_exists( $file ) ? DO_VER . '.' . filemtime( $file ) : DO_VER;
}

// Include Helper Functions
include_once( __DIR__ . '/api/functions.helpers.php' );
// Include Display Functions
include_once( __DIR__ . '/api/functions.display.php' );
// Include API Routes
require( __DIR__ . '/api/functions.routes.php' );
// Include Shortcode Functions
require( __DIR__ . '/api/functions.shortcodes.php' );
// Disable Comments
require( __DIR__ . '/api/disable-comments.php' );

// Include Extension flat files (extensions/api/*.php, not its classes/
// subfolder) - see extensions/README.md. Auto-discovered by glob, so
// dropping a file here is enough; nothing above needs to change.
foreach ( glob( __DIR__ . '/extensions/api/*.php' ) as $devo_extension_file ) {
    require_once( $devo_extension_file );
}
unset( $devo_extension_file );

// Scripts
function devo_scripts() {
    // wp_enqueue_style( $handle, $src, $deps = [], $ver = false, $media = 'all' )
    // wp_enqueue_script( $handle, $src, $deps = [], $ver = false, $load_in_footer = FALSE )

    $entry = 'app/index.tsx';
    $manifest = @file_get_contents( __DIR__ . '/public/dist/.vite/manifest.json' );
    if ( $manifest ) {
        $vite_files = json_decode( $manifest );
        if ( isset( $vite_files->{ $entry } ) ) {
            $index_file = $vite_files->{ $entry };
            // Load React app.
            // $ver MUST be null (no ?ver= query): lazy chunks import this entry
            // by its bare hashed filename, and a ?ver= query on the script tag
            // would make the browser evaluate the module a second time under a
            // different URL - mounting a second React root and crashing the app.
            // The content hash in the filename already handles cache busting.
            wp_enqueue_script( 'react-index', get_template_directory_uri() . '/public/dist/' . $index_file->file, [], null, TRUE );
            // Stylesheets are enqueued framework-first, theming layer last, and
            // each one declares the previous as a dependency so WordPress can't
            // reorder them.
            //
            // Correctness does not actually rest on this order any more: the
            // framework's CSS is compiled into `@layer framework` and the
            // extensions layer is deliberately unlayered, so it outranks the
            // framework whatever the source order (see
            // build/postcss-layer-framework.cjs). The ordering is kept as a
            // fallback - if the layer is ever lost, a build with the stylesheets
            // in this order still resolves the way it should, rather than
            // silently inverting.

            // Load global styles
            wp_enqueue_style( 'devo-global', get_template_directory_uri() . '/public/dist/devo-global.css', [], devo_asset_ver( 'public/dist/devo-global.css' ) );

            // Component CSS Vite extracted from the React entry. Still framework
            // CSS, so it belongs alongside devo-global rather than after the
            // theming layer.
            $devo_style_deps = [ 'devo-global' ];
            if ( isset( $index_file->css ) ) {
                wp_enqueue_style( 'react-index', get_template_directory_uri() . '/public/dist/' . current( $index_file->css ), [ 'devo-global' ], DO_VER );
                $devo_style_deps[] = 'react-index';
            }

            // Load extension global styles (extensions/app/styles/extensions-global.scss)
            wp_enqueue_style( 'extensions-global', get_template_directory_uri() . '/public/dist/extensions-global.css', $devo_style_deps, devo_asset_ver( 'public/dist/extensions-global.css' ) );
        }
    }
}
add_action( 'wp_enqueue_scripts', 'devo_scripts', 1 );

function devo_js_module( $tag ) {
    // Only do this if we are not in the admin and this is a js file
    if ( is_admin() || strpos( $tag, 'react-index' ) === FALSE ) {
        return $tag;
    }
    // WordPress 6.3 removed type="text/javascript" from script tags; handle both old and new formats
    if ( strpos( $tag, 'type=' ) !== FALSE ) {
        $tag = str_replace( 'type="text/javascript"', 'type="module"', $tag );
        $tag = str_replace( "type='text/javascript'", "type='module'", $tag );
        return $tag;
    }
    return str_replace( '<script ', '<script type="module" ', $tag );
}
add_filter( 'script_loader_tag', 'devo_js_module', 10 );

// Admin Scripts
function devo_admin_scripts() {
    // List Library
    wp_register_script( 'list', get_template_directory_uri() . '/public/js/libs/list.js', [], '12232019' );
    // AF Admin
    wp_enqueue_script( 'devo-admin', get_template_directory_uri() . '/public/js/admin.js', [ 'jquery', 'list' ], DO_VER, TRUE );
    wp_enqueue_style( 'devo-admin', get_template_directory_uri() . '/public/dist/admin.css', [ 'dashicons' ], devo_asset_ver( 'public/dist/admin.css' ), 'all' );
    // Image upload
    wp_enqueue_media();
    wp_enqueue_script( 'devo-media-upload-field', get_template_directory_uri() . '/public/js/media-upload-field.js', [ 'jquery', 'jquery-ui-core', 'jquery-ui-sortable' ], '08062024', TRUE );
    // Icon Library
    wp_enqueue_script( 'devo-media-library-tabs', get_template_directory_uri() . '/public/js/media-library-tabs.js', array( 'jquery', 'media-upload', 'media-views' ), DO_VER, TRUE );
    // Binary checkbox in admin column
    wp_enqueue_script( 'devo-binary-toggle', get_template_directory_uri() . '/public/js/binary-toggle.js', [ 'jquery' ], DO_VER, TRUE );
    // Color picker
    wp_enqueue_style( 'wp-color-picker' );
    wp_enqueue_script( 'wp-color-picker' );
    wp_enqueue_script( 'devo-color-picker', get_template_directory_uri() . '/public/js/color-picker.js', [ 'jquery', 'wp-color-picker' ], '08062024', TRUE );
    // Date picker
    wp_enqueue_style( 'jquery-ui-styles', get_template_directory_uri() . '/public/js/libs/timepicker/jquery-ui.css', [], '08062024' );
    wp_enqueue_style( 'jquery-ui-timepicker-styles', get_template_directory_uri() . '/public/js/libs/timepicker/jquery-ui-timepicker-addon.css', [ 'jquery-ui-styles' ], '08062024' );
    wp_enqueue_script( 'jquery-ui-timepicker', get_template_directory_uri() . '/public/js/libs/timepicker/jquery-ui-timepicker-addon.js', [ 'jquery-ui-datepicker', 'jquery-ui-slider' ], '08062024', TRUE );
    wp_enqueue_script( 'devodate-picker', get_template_directory_uri() . '/public/js/date-picker.js', [ 'jquery-ui-timepicker' ], '08062024', TRUE );

}
add_action( 'admin_enqueue_scripts', 'devo_admin_scripts' );

// Include Classes
function devo_load_classes() {
    
    // Required Utilities
    $utility_classes = [
        'cpt-form-field',
    	'custom-post-type',
        'form-builder',
        'form-field-api-display',
    	'form-field-display',
    	'form-field-validate',
    	'media-library-tab',
        'menu-custom-fields',
    	'options-screen',
            'admin-pages', // extends options-screen
        'post-browser',
        'redirect',
        'rewrite',
        'search-query',
        'search-ui',
        'search',
        'send-simple-email',
        'unused-media',
        'view-permalinks',
	];
    devo_load_class_files( $utility_classes );

    // Taxonomies
    // $taxonomy = [
        
    // ];
    // devo_load_class_files( $taxonomy, 'post-types/taxonomies' );
    
    // Post Types
    $post_types = [
        'landing-page',
        'simple-page',
        'icon',
    ];
    devo_load_class_files( $post_types, 'post-types' );
}
add_action( 'after_setup_theme', 'devo_load_classes', 0 );

// Extension post type classes (extensions/api/classes/post-types/class-*.php)
// - see extensions/README.md. Discovered by glob rather than a hand-maintained
// array, so dropping a file in is enough to register it; no core file changes.
// Registered immediately after devo_load_classes (same hook/priority, added
// second) so DO_Custom_Post_Type already exists for extension classes to extend.
function devo_load_extension_classes() {
    foreach ( glob( __DIR__ . '/extensions/api/classes/post-types/class-*.php' ) as $devo_extension_class_file ) {
        require_once( $devo_extension_class_file );
    }
}
add_action( 'after_setup_theme', 'devo_load_extension_classes', 0 );

function devo_create_objects() {
    // There is no Site Settings screen: its fields (cookie consent text, header
    // and footer scripts) were never read. Banner copy comes from the
    // devo_cookie_consent_text filter, and third-party scripts are added from
    // extensions/api/*.php on wp_head / wp_footer (see below). An extension that
    // wants its own settings screen can create one with DO_Options_Screen.

    // Custom Image Sizes
    add_image_size( 'cinema_1000', 1000, 673, [ 'center', 'top' ] );
    add_image_size( 'cinema_600', 600, 404, [ 'center', 'top' ] );
    add_image_size( 'cinema_400', 400, 269, [ 'center', 'top' ] );
    add_image_size( 'square_600', 600, 600, TRUE );
    add_image_size( 'square_400', 400, 400, TRUE );
    add_image_size( 'vertical_400', 400, 500, TRUE );
    add_image_size( 'vertical_600', 600, 750, TRUE );
    add_image_size( 'icon', 200, 9999 );
    add_image_size( 'icon_400', 400, 9999 );
    add_image_size( 'background', 1500, 9999 );
    add_image_size( 'background_mobile', 600, 9999);

    // Enable post thumbnails
	add_theme_support( 'post-thumbnails' );

    // Let WordPress render <title>. The SEO title is supplied through the
    // pre_get_document_title filter below rather than printed in header.php, so
    // plugins and core filters can see it.
    add_theme_support( 'title-tag' );

    // Emit HTML5 markup rather than the XHTML fallbacks core defaults to.
    add_theme_support( 'html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ] );

    // Constrain embedded media to its container.
    add_theme_support( 'responsive-embeds' );

    add_theme_support( 'automatic-feed-links' );

	// Register nav menus
	register_nav_menus( [
        'top-nav' => __( 'Top Navigation', 'developers_only' ),
        'main-nav' => __( 'Main Navigation', 'developers_only' ),
        'social-nav' => __( 'Social Navigation', 'developers_only' ),
        'legal-nav' => __( 'Legal Footer Navigation', 'developers_only' ),
	] );
}
add_action( 'after_setup_theme', 'devo_create_objects', 1 );

/* One-time upgrade: meta values used to be saved from wp-admin still slashed
 * ("O\'Brien") and unslashed on every read, which also stripped backslashes
 * from anything stored correctly. Values are now stored as typed and read as
 * stored, so the slashed ones are rewritten once, to what they displayed as.
 * See DO_Custom_Post_Type::unslash_legacy_meta_batch().
 *
 * Runs in wp-admin for an administrator, never for a visitor, in batches for
 * a few seconds per request, and picks up where it stopped on the next admin
 * request. Unslashing is not idempotent, so no row may be done twice: a lock
 * keeps two requests from running at once, and the cursor is saved before
 * each rewrite (a request that dies mid-row leaves that row slashed, not
 * stripped twice). Only rows that existed when the upgrade started are looked
 * at: anything written later was stored as typed. The done-flag is set once
 * nothing is left.
 *
 * The flag is checked first from the options cache, which is cheap, and again
 * from the database once the lock is held: a request that read its options
 * before another one finished would otherwise start a fresh pass from row 0.
 * A database error stops the run without setting the flag, keeping the
 * cursor where it was, and the cursor is only dropped once the flag is
 * confirmed stored. */
function devo_meta_unslashed_stored() {
    global $wpdb;
    return (bool) $wpdb->get_var( $wpdb->prepare( "SELECT option_value FROM {$wpdb->options} WHERE option_name = %s", 'devo_meta_unslashed' ) );
}
function devo_upgrade_unslash_meta() {
    global $wpdb;
    if ( get_option( 'devo_meta_unslashed' ) || ! current_user_can( 'manage_options' ) || is_customize_preview() ) {
        return;
    }
    $lock = 'devo_meta_unslash_lock';
    $lock_ttl = 5 * MINUTE_IN_SECONDS;
    $now = time();
    // An atomic lock, as WP_Upgrader::create_lock() does it: add_option()
    // isn't one (it upserts), so two first requests could both run a batch,
    // and the second would strip a legitimate backslash before a quote
    $locked = $wpdb->query( $wpdb->prepare( "INSERT IGNORE INTO {$wpdb->options} ( option_name, option_value, autoload ) VALUES ( %s, %s, 'no' )", $lock, $now ) );
    if ( ! $locked ) {
        $locked_at = $wpdb->get_var( $wpdb->prepare( "SELECT option_value FROM {$wpdb->options} WHERE option_name = %s", $lock ) );
        if ( $locked_at === NULL || (int) $locked_at > $now - $lock_ttl ) {
            return;
        }
        // A stale lock from a request that died: take it over, unless another
        // request just did
        $locked = $wpdb->query( $wpdb->prepare( "UPDATE {$wpdb->options} SET option_value = %s WHERE option_name = %s AND option_value = %s", $now, $lock, $locked_at ) );
        if ( ! $locked ) {
            return;
        }
    }
    try {
        // Another request may have finished between the cached check above
        // and taking the lock
        $done = devo_meta_unslashed_stored();
        if ( $wpdb->last_error !== '' || $done ) {
            return;
        }
        // Read past any cached copy: another request may have moved it on
        wp_cache_delete( 'devo_meta_unslash_progress', 'options' );
        $progress = get_option( 'devo_meta_unslash_progress' );
        if ( ! is_array( $progress ) || ! isset( $progress['after'], $progress['ceiling'] ) ) {
            $ceiling = $wpdb->get_var( "SELECT MAX(meta_id) FROM {$wpdb->postmeta}" );
            // A failed query reads as a ceiling of 0, which is "done"
            if ( $wpdb->last_error !== '' ) {
                return;
            }
            $progress = [
                'after' => 0,
                'ceiling' => (int) $ceiling,
            ];
        }
        // Returns FALSE when the cursor couldn't be stored, and the batch
        // then leaves the row alone
        $save_progress = function( $meta_id ) use ( &$progress ) {
            $progress['after'] = $meta_id;
            return update_option( 'devo_meta_unslash_progress', $progress, FALSE );
        };
        $deadline = microtime( TRUE ) + 5;
        do {
            $batch = DO_Custom_Post_Type::unslash_legacy_meta_batch( (int) $progress['after'], (int) $progress['ceiling'], 100, $save_progress );
            $progress['after'] = $batch['last_meta_id'];
            if ( $batch['error'] !== '' ) {
                // Back to the last row known to be finished; the flag stays
                // unset, and the next admin request carries on from here
                update_option( 'devo_meta_unslash_progress', $progress, FALSE );
                return;
            }
            if ( $batch['done'] ) {
                update_option( 'devo_meta_unslashed', 1, TRUE );
                // Without the flag, dropping the cursor would start the
                // next pass over from row 0
                if ( devo_meta_unslashed_stored() ) {
                    delete_option( 'devo_meta_unslash_progress' );
                }
                return;
            }
            update_option( 'devo_meta_unslash_progress', $progress, FALSE );
        } while ( microtime( TRUE ) < $deadline );
    } finally {
        $wpdb->delete( $wpdb->options, [ 'option_name' => $lock ] );
    }
}
add_action( 'admin_init', 'devo_upgrade_unslash_meta' );

/*
 *
 * CLEANUP
 * 
 */

// Dequeue unneeded styles/scripts
function devo_dequeue_script() {
    wp_dequeue_style( 'wp-block-library' );
    wp_deregister_script( 'wp-embed' );
    wp_dequeue_style( 'global-styles' );
}
add_action( 'wp_enqueue_scripts', 'devo_dequeue_script', 99999 );

// Remove emoji from wp-core....
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
add_filter( 'emoji_svg_url', '__return_false' );

// Remove extraneous meta/link tags
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'rest_output_link_wp_head' );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'template_redirect', 'rest_output_link_header', 11 );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rel_canonical' );
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
// Remove WP meta generator
remove_action( 'wp_head', 'wp_generator' );
// Remove default sitemap
add_filter( 'wp_sitemaps_enabled', '__return_false' );

// Remove unused filter that cause an unneccessary query
remove_filter( 'theme_mod_custom_logo', '_override_custom_logo_theme_mod' );

// Remove max image size
add_filter( 'big_image_size_threshold', '__return_false' );

// Remove Posts and Comments from nav menu
function devo_remove_admin_menu_items() {
    // Posts
    remove_menu_page( 'edit.php' );
    // Pages
    remove_menu_page( 'edit.php?post_type=page' );
    add_submenu_page(
        'options-general.php',          // The slug of the parent menu (Tools in this case)
        'WP Pages',              // The page title
        'WP Pages',              // The menu title
        'edit_pages',         // The capability required for this menu to be displayed to the user
        'edit.php?post_type=page' // The slug of the page to be displayed when this menu is clicked
    );
}
add_action( 'admin_menu', 'devo_remove_admin_menu_items' );

/* Third-party scripts - analytics, tag managers, chat widgets - are not part of
 * the theme. Add them from extensions/api/*.php on the standard WordPress hooks:
 *
 *   add_action( 'wp_head', function () { ... } );
 *   add_action( 'wp_footer', function () { ... } );
 *
 * To gate one on cookie consent, check the cookie the consent banner sets:
 *
 *   if ( isset( $_COOKIE['devo_cookie_consent'] ) && $_COOKIE['devo_cookie_consent'] === 'accepted' ) { ... }
 *
 * Client-side, listen for the devo:cookie-consent event so a script can start
 * without waiting for the next page load (see CookieConsent.tsx). */

// Javascript home_url
function devo_js_globals() {
    $home_url = home_url();
    $relative_home_url = home_url( '', 'relative' );
    $site_language = substr( get_bloginfo( 'language' ), 0, 2 );
    $template_directory = get_template_directory_uri();
    // Copy for the consent banner. Filterable rather than read from an option so
    // an extension can supply it from wherever it keeps site settings.
    $cookie_consent_text = apply_filters( 'devo_cookie_consent_text', '' );
    $cookie_consent_text = is_string( $cookie_consent_text ) ? $cookie_consent_text : '';
    // The site name is stored HTML-escaped ("R&amp;D"); React renders it as text
    $site_name = devo_plain_text( get_bloginfo( 'name' ) );
    // Settings > Privacy. '' when no page is set or it isn't published.
    $privacy_policy_url = get_privacy_policy_url();
    // JSON for a <script> block: JSON_HEX_TAG so a value can't close it
    $json_flags = JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_SLASHES;
    $rest_bases = devo_rest_bases_by_url_slug();
?>
<script>
    window.devoEnv = "<?php echo esc_js( DO_ENVIRONMENT ) ?>";
    window.homeURL = "<?php echo esc_url( $home_url ) ?>";
    window.relativeHomeURL = "<?php echo esc_js( $relative_home_url ) ?>";
    window.devoCookieConsentText = <?php echo wp_json_encode( $cookie_consent_text, $json_flags ) ?>;
    window.devoSiteName = <?php echo wp_json_encode( $site_name, $json_flags ) ?>;
    window.devoLocale = <?php echo wp_json_encode( get_locale(), $json_flags ) ?>;
    window.devoPrivacyPolicyURL = <?php echo wp_json_encode( $privacy_policy_url, $json_flags ) ?>;
    window.devoRestBases = <?php echo wp_json_encode( (object) $rest_bases, $json_flags ) ?>;
</script>
<?php }

/* { URL slug => REST base } for every public post type in the REST API that
 * has its own URL segment (/{slug}/{post-name}/). The SPA reads the post type
 * from that segment, but a post type's rest_slug setting can give it a
 * different REST base (Simple Page: /page/... is /wp/v2/simple-page), so
 * TemplateLoader looks the base up here (window.devoRestBases). */
function devo_rest_bases_by_url_slug() {
    $rest_bases = [];
    foreach ( get_post_types( [ 'public' => TRUE, 'show_in_rest' => TRUE ], 'objects' ) as $post_type_object ) {
        $url_slug = is_array( $post_type_object->rewrite ) && isset( $post_type_object->rewrite['slug'] ) ? trim( (string) $post_type_object->rewrite['slug'], '/' ) : '';
        // Only a single segment can match the SPA's /:postType/:slug route
        if ( $url_slug === '' || strpos( $url_slug, '/' ) !== FALSE ) {
            continue;
        }
        $rest_bases[ $url_slug ] = ! empty( $post_type_object->rest_base ) ? $post_type_object->rest_base : $post_type_object->name;
    }
    return $rest_bases;
}
add_action( 'wp_head', 'devo_js_globals' );
add_action( 'admin_head', 'devo_js_globals' );

// noindex Filter
function devo_noindex() {
	$noindex = apply_filters( 'devo_noindex', null );
	if ( $noindex ) {
		return 'noindex';
	} else {
        return 'index, follow';
    }
}

// Set noindex
function devo_set_noindex( $noindex ) {
    global $post;
    // Posts
    if ( is_object( $post ) ) {
        $post_id = $post->ID;
    }
    // Nothing
    else {
        $post_id = FALSE;
    }
    switch ( TRUE ) {
        // Tags, attachments, pages, dev & stg environment
        // definitely noindex
        case is_tag():
        case get_post_type() == 'attachment':
        case get_post_type() == 'page':
        case in_array( DO_ENVIRONMENT, [ 'dev', 'stg' ] ):
            $noindex = TRUE;
            break;
        // Check posts for noindex or hide_post fields
        case $post_id:
            $noindex_field = (bool) devo_get_post_meta( $post_id, 'noindex' );
            $hidden = (bool) devo_get_post_meta( $post_id, 'hide_post' );
            $noindex = $noindex_field || $hidden;
            break;
    }
    return $noindex;
}
add_filter( 'devo_noindex', 'devo_set_noindex' );

/* Flushes rewrite rules only when the theme's own rules may have changed: on
 * activation, after a theme update, or when a post type is added, removed or
 * re-slugged (an extension post type, say). Rules used to be flushed on every
 * landing page save, which is slow and unnecessary - they match any slug.
 *
 * A rule added in code without any of those changing (a new DO_Redirect, for
 * instance) still needs a manual flush: Settings > Permalinks > Save, or the
 * Refresh button on the View Permalinks screen. */
function devo_rewrite_signature() {
    global $devo_custom_post_types;
    $slugs = [];
    foreach ( (array) $devo_custom_post_types as $post_type => $details ) {
        $slugs[ $post_type ] = isset( $details->post_type_slug ) ? $details->post_type_slug : '';
    }
    ksort( $slugs );
    return md5( wp_json_encode( [ wp_get_theme( get_template() )->get( 'Version' ), $slugs ] ) );
}
function devo_maybe_flush_rewrite_rules() {
    $signature = devo_rewrite_signature();
    if ( get_option( 'devo_rewrite_signature' ) !== $signature ) {
        flush_rewrite_rules( FALSE );
        update_option( 'devo_rewrite_signature', $signature, TRUE );
    }
}
add_action( 'wp_loaded', 'devo_maybe_flush_rewrite_rules' );
// Activating the theme always flushes
add_action( 'after_switch_theme', function() {
    delete_option( 'devo_rewrite_signature' );
} );

// Clean up rewrite rules
function devo_clean_up_rewrite_rules( $rules ) {
    foreach ( $rules as $rule => $rewrite ) {
        // Author
        if ( preg_match( '/author\//', $rule ) ) {
            unset( $rules[ $rule ] );
        }
        // Category
        if ( preg_match( '/category\//', $rule ) ) {
            unset( $rules[ $rule ] );
        }
        // Tag
        if ( preg_match( '/tag\//', $rule ) ) {
            unset( $rules[ $rule ] );
        }
        // Attachment
        if ( preg_match( '/attachment/', $rule ) ) {
            unset( $rules[ $rule ] );
        }
        if ( preg_match( '/attachment/', $rewrite ) ) {
            unset( $rules[ $rule ] );
        }
        // Comment
        if ( preg_match( '/comments\//', $rule ) ) {
            unset( $rules[ $rule ] );
        }
        // Feeds
        if ( preg_match( '/feed/', $rule ) ) {
            unset( $rules[ $rule ] );
        }
        // comment-page
        if ( preg_match( '/comment-page/', $rule ) ) {
            unset( $rules[ $rule ] );
        }
        // embed
        if ( preg_match( '/embed/', $rule ) ) {
            unset( $rules[ $rule ] );
        }
        // monthnum
        if ( preg_match( '/monthnum/', $rewrite ) ) {
            unset( $rules[ $rule ] );
        }
        // trackback
        if ( preg_match( '/trackback/', $rule ) ) {
            unset( $rules[ $rule ] );
        }
        // Specific Rules
        if ( $rule === '([0-9]{4})/page/?([0-9]{1,})/?$' ) {
            unset( $rules[ $rule ] );
        }
        if ( $rule === '([0-9]{4})/?$' ) {
            unset( $rules[ $rule ] );
        }
        if ( $rule === '(.?.+?)/page/?([0-9]{1,})/?$' ) {
            unset( $rules[ $rule ] );
        }
        if ( $rule === '(.?.+?)(?:/([0-9]+))?/?$' ) {
            unset( $rules[ $rule ] );
        }
        if ( $rule === '([^/]+)/page/?([0-9]{1,})/?$' ) {
            unset( $rules[ $rule ] );
        }
        if ( $rule === '([^/]+)(?:/([0-9]+))?/?$' ) {
            unset( $rules[ $rule ] );
        }
    }
    return $rules;
}
add_filter( 'rewrite_rules_array', 'devo_clean_up_rewrite_rules' );

/* Login Screen Branding (overwritable) */
// Url
if ( ! function_exists( 'devo_login_logo_url' ) ) {
    function devo_login_logo_url() {
        return home_url();
    }
}
add_filter( 'login_headerurl', 'devo_login_logo_url' );
// Title
if ( ! function_exists( 'devo_login_url_title' ) ) {
    function devo_login_url_title() {
        return '{Developers_Only}';
    }
}
add_filter( 'login_headertext', 'devo_login_url_title' );
// CSS
function devo_login_stylesheet() {
    // Vite emits the login entry as login.css (see vite.config.ts).
    wp_enqueue_style( 'devo-login', get_template_directory_uri() . '/public/dist/login.css', [ 'login' ], devo_asset_ver( 'public/dist/login.css' ) );
}
add_action( 'login_enqueue_scripts', 'devo_login_stylesheet' );

// Extracts width and height from svg images. Slightly modified from
// https://wordpress.stackexchange.com/questions/255314/cant-extract-and-set-svg-dimensions#answer-255634
// It's here instead of in functions.helpers because it's actually a filter
function devo_fix_wp_get_attachment_image_svg( $image, $attachment_id, $size, $icon ) {
    if ( is_array( $image ) && preg_match( '/\.svg$/i', $image[0] ) && $image[1] <= 1 ) {
        if( is_array( $size ) ) {
            $image[1] = $size[0];
            $image[2] = $size[1];
        } elseif( ( $xml = @simplexml_load_file( __DIR__ . '/../../..' . str_replace( home_url(), '', $image[0] ) ) ) !== FALSE ) {
            $attr = $xml->attributes();
            $viewbox = explode( ' ', isset( $attr->viewBox ) ? $attr->viewBox : '' );
            $image[1] = isset( $attr->width ) && preg_match( '/\d+/', $attr->width, $value ) ? (int) $value[0] : ( count( $viewbox ) == 4 ? (int) $viewbox[2] : null );
            $image[2] = isset( $attr->height ) && preg_match( '/\d+/', $attr->height, $value ) ? (int) $value[0] : ( count( $viewbox ) == 4 ? (int) $viewbox[3] : null );
        } else {
            $image[1] = $image[2] = null;
        }
    }
    return $image;
}
add_filter( 'wp_get_attachment_image_src', 'devo_fix_wp_get_attachment_image_svg', 10, 4 );

// Admin Color Scheme
function devo_admin_color_scheme( $color_scheme ) {
    switch ( DO_ENVIRONMENT ) {
        case 'local':
            $color_scheme = 'ectoplasm';
            break;
        case 'dev':
            $color_scheme = 'ocean';
            break;
        case 'stg':
            $color_scheme = 'light';
            break;
        case 'prod':
            $color_scheme = 'midnight';
            break;
    }
    return $color_scheme;
}
add_filter( 'get_user_option_admin_color', 'devo_admin_color_scheme', 5 );
remove_action( 'admin_color_scheme_picker', 'admin_color_scheme_picker' );

if ( is_admin() ) {
    function devo_admin_posts_per_page( $num_posts ) {
        if ( $num_posts == 20 ) {
            $num_posts = 200;
        }
        return $num_posts;
    }
    add_filter( 'edit_posts_per_page', 'devo_admin_posts_per_page' );
}

// Allow specified file types in media uploads
function devo_add_file_types_to_uploads( $file_types, $user = NULL ) {
	$new_filetypes = [];
	$new_filetypes['webp'] = 'image/webp';
    $new_filetypes['vtt'] = 'text/vtt';
    // An SVG is a document that can carry script, so only users who may
    // already publish unfiltered HTML can upload one. On multisite, or with
    // DISALLOW_UNFILTERED_HTML, that leaves site admins unable to upload
    // icons; the devo_allow_svg_uploads filter can grant it (see README).
    // upload_mimes passes a user ID, a WP_User, or nothing
    $user = $user ? ( $user instanceof WP_User ? $user : get_userdata( (int) $user ) ) : wp_get_current_user();
    if ( $user instanceof WP_User && $user->exists() && apply_filters( 'devo_allow_svg_uploads', user_can( $user, 'unfiltered_html' ), $user ) ) {
        $new_filetypes['svg'] = 'image/svg+xml';
    }
	$file_types = array_merge( $file_types, $new_filetypes );
	return $file_types;
}
add_filter( 'upload_mimes', 'devo_add_file_types_to_uploads', 10, 2 );

/* Extra tags for post content and the theme's HTML fields (both are filtered
 * with wp_kses_post()). <cta> is the theme's own link/button tag. <iframe>
 * is only allowed for users who can post unfiltered HTML anyway; <script>
 * never is. */
function devo_allow_tags( $allowed_post_tags, $context = 'post' ) {
    if ( $context !== 'post' ) {
        return $allowed_post_tags;
    }
    $allowed_post_tags['span'] = array_merge( isset( $allowed_post_tags['span'] ) && is_array( $allowed_post_tags['span'] ) ? $allowed_post_tags['span'] : [], [
        'class' => TRUE,
        'id' => TRUE,
        'style' => TRUE,
    ] );
    // Filterable for the same reason as devo_allow_svg_uploads
    if ( apply_filters( 'devo_allow_iframes', current_user_can( 'unfiltered_html' ) ) ) {
        $allowed_post_tags['iframe'] = [
            'src' => TRUE,
            'width' => TRUE,
            'height' => TRUE,
            'class' => TRUE,
            'title' => TRUE,
            'loading' => TRUE,
            'allow' => TRUE,
            'frameborder' => TRUE,
            'webkitallowfullscreen' => TRUE,
            'mozallowfullscreen' => TRUE,
            'allowfullscreen' => TRUE,
        ];
    }
    $allowed_post_tags['cta'] = [
        'url' => TRUE,
        'text' => TRUE,
        'title' => TRUE,
        'classes' => TRUE,
        'modal' => TRUE,
        'target' => TRUE,
    ];
    return $allowed_post_tags;
}
add_filter( 'wp_kses_allowed_html', 'devo_allow_tags', 1, 2 );

// Changing excerpt more
function devo_excerpt_more( $more ) {
	return '...';
}
add_filter( 'excerpt_more', 'devo_excerpt_more' );

function devo_case_insensitive_urls() {
    $request_uri = isset( $_SERVER['REQUEST_URI'] ) && is_string( $_SERVER['REQUEST_URI'] ) && strlen( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : FALSE;
    $query_string = isset( $_SERVER['QUERY_STRING'] ) && is_string( $_SERVER['QUERY_STRING'] ) && strlen( $_SERVER['QUERY_STRING'] ) ? '?' . $_SERVER['QUERY_STRING'] : '';
    $path = $query_string && $request_uri ? str_replace( $query_string, '', $request_uri ) : ( $request_uri ? $request_uri : FALSE );
    if ( $path && preg_match( '/[A-Z]/', $path ) ) {
        // Collapse leading slashes: //Evil.com must stay a path on this
        // site, not become a protocol-relative URL to another one.
        $lowercase_path = '/' . ltrim( strtolower( $path ), '/' );
        wp_safe_redirect( devo_absolute_url( $lowercase_path ) . $query_string );
        exit;
    }
}
add_action( 'init', 'devo_case_insensitive_urls' );

// Load Text Domain
function devo_load_textdomain() {
    load_theme_textdomain( 'developers_only', get_template_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'devo_load_textdomain', 0 );

/* Supplies the document title now that the theme declares title-tag support.
 *
 * The SEO title comes from the post type's configured seo_title field, with the
 * post type's display name appended - the same output header.php used to print
 * directly. Going through the filter means core and plugins can see and adjust
 * it, which is the point of title-tag support. */
function devo_document_title( $title ) {
    global $devo_custom_post_types, $post, $wp;

    if ( ! $post && isset( $wp->request ) ) {
        $post_array = get_posts( [
            'name' => strlen( $wp->request ) ? $wp->request : 'home',
            'post_type' => 'devo_landing_page',
        ] );
        $post = current( $post_array );
    }
    if ( ! $post || ! isset( $devo_custom_post_types[ $post->post_type ] ) ) {
        return $title;
    }

    $post_type_details = $devo_custom_post_types[ $post->post_type ];
    $seo_title = isset( $post_type_details->seo_title )
        ? devo_get_seo_field_value( $post_type_details->seo_title, $post )
        : '';
    if ( ! is_string( $seo_title ) || ! strlen( $seo_title ) ) {
        return $title;
    }

    $post_type_label = isset( $post_type_details->post_type_display_name )
        ? $post_type_details->post_type_display_name
        : '';

    return $seo_title . ( strlen( $post_type_label ) ? ' - ' . $post_type_label : '' );
}
add_filter( 'pre_get_document_title', 'devo_document_title' );

function devo_add_custom_post_types_to_homepage_dropdown( $pages, $r ) {
    if ( isset( $r['post_type'] ) && 'page' === $r['post_type'] ) {
        // Get custom post types (for example, 'my_custom_post_type')
        $custom_posts = get_posts( array(
            'post_type' => [ 'devo_landing_page', 'devo_simple_page' ], 
            'numberposts' => -1,
        ) );
        // Add custom post types to the list of pages
        foreach ( $custom_posts as $custom_post ) {
            $pages[] = $custom_post;
        }
    }
    return $pages;
}
add_filter( 'get_pages', 'devo_add_custom_post_types_to_homepage_dropdown', 10, 2 );

// Set Block Image
function devo_set_block_image( $block_image, $post_id = FALSE ) {
    $fallback_image = get_template_directory_uri() . '/public/images/fallback1.jpg';
    $block_image = get_the_post_thumbnail_url( $post_id );

    return $block_image ? $block_image : $fallback_image;
}
add_filter( 'devo_block_image', 'devo_set_block_image', 10, 2 );