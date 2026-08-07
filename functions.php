<?php
// Define constants
define( 'DO_VER', DO_ENVIRONMENT == 'local' ? time() : 'DEPLOY_TIMESTAMP' );
define( 'DO_GTM_ID', 'GTM-PJ878CTW' );

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
            // Load global styles
            wp_enqueue_style( 'devo-global', get_template_directory_uri() . '/public/dist/devo-global.css', [], DO_VER );
            // Load extension global styles (extensions/app/styles/extensions-global.scss)
            wp_enqueue_style( 'extensions-global', get_template_directory_uri() . '/public/dist/extensions-global.css', [ 'devo-global' ], DO_VER );
            if ( isset( $index_file->css ) ) {
                wp_enqueue_style( 'react-index', get_template_directory_uri() . '/public/dist/' . current( $index_file->css ), [], DO_VER );
            }
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
    wp_enqueue_style( 'devo-admin', get_template_directory_uri() . '/public/dist/admin.css', [ 'dashicons' ], DO_VER, 'all' );
    // Image upload
    wp_enqueue_media();
    wp_enqueue_script( 'devo-media-upload-field', get_template_directory_uri() . '/public/js/media-upload-field.js', [ 'jquery', 'jquery-ui-core', 'jquery-ui-sortable' ], '08062024', TRUE );
    // Icon Library
    wp_enqueue_script( 'devo-media-library-tabs', get_template_directory_uri() . '/public/js/media-library-tabs.js', array( 'jquery', 'media-upload', 'media-views' ), DO_VER, TRUE );
    // Binary checkbox in admin column
    wp_enqueue_script( 'devobinary-toggle', get_template_directory_uri() . '/public/js/binary-toggle.js', [ 'jquery' ], '08062024', TRUE );
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
    // Site Settings
    global $site_settings;
    include( locate_template( 'api/fields/colors.php' ) );
    $site_settings = new DO_Options_Screen( 'site_settings' );
    $site_settings->settings( [
        'submenu' => 'themes.php',
        'page_title' => 'Site Settings',
        'notes' => [
        ],
    ] );
    $site_settings->fields( [
        'Cookie Consent Text' => 'html',
        'Header Script' => 'code',
        'Footer Script' => 'code',
    ], 'Misc' );

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

	// Register nav menus
	register_nav_menus( [
        'top-nav' => __( 'Top Navigation' ),
        'main-nav' => __( 'Main Navigation' ),
        'social-nav' => __( 'Social Navigation' ),
        'legal-nav' => __( 'Legal Footer Navigation' ),
	] );
}
add_action( 'after_setup_theme', 'devo_create_objects', 1 );

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

// Header Scripts
function devo_header_scripts() {
    $site_settings_misc = get_option( 'site_settings_misc' );
    echo isset( $site_settings_misc['header_script'] ) ? $site_settings_misc['header_script'] : '';
}
add_action( 'wp_head', 'devo_header_scripts' );

// Footer Scripts
function devo_footer_scripts() {
    $site_settings_misc = get_option( 'site_settings_misc' );
	echo isset( $site_settings_misc['footer_script'] ) ? $site_settings_misc['footer_script'] : '';
}
add_action( 'wp_footer', 'devo_footer_scripts' );

// Javascript home_url
function devo_js_globals() {
    $home_url = home_url();
    $relative_home_url = home_url( '', 'relative' );
    $site_language = substr( get_bloginfo( 'language' ), 0, 2 );
    $template_directory = get_template_directory_uri();
    $site_settings_misc = get_option( 'site_settings_misc' );
    $cookie_consent_text = isset( $site_settings_misc['cookie_consent_text'] ) && is_string( $site_settings_misc['cookie_consent_text'] ) ? $site_settings_misc['cookie_consent_text'] : '';
?>
<script>
    window.devoEnv = "<?php echo DO_ENVIRONMENT ?>";
    window.homeURL = "<?php echo $home_url ?>";
    window.relativeHomeURL = "<?php echo $relative_home_url ?>";
    window.devoGTM = "<?php echo esc_js( DO_GTM_ID ) ?>";
    window.devoCookieConsentText = <?php echo wp_json_encode( $cookie_consent_text ) ?>;
    window.menus = [];
</script>
<?php }
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
        return 'Astraea Foundation';
    }
}
add_filter( 'login_headertext', 'devo_login_url_title' );
// CSS
function devo_login_stylesheet() {
    wp_enqueue_style( 'devo-login', get_template_directory_uri() . '/public/dist/devo-login.css', [ 'login' ], DO_VER );
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
function devo_add_file_types_to_uploads( $file_types ) {
	$new_filetypes = [];
	$new_filetypes['svg'] = 'image/svg+xml';
	$new_filetypes['webp'] = 'image/webp';
    $new_filetypes['vtt'] = 'text/vtt';
	$file_types = array_merge( $file_types, $new_filetypes );
	return $file_types;
}
add_action( 'upload_mimes', 'devo_add_file_types_to_uploads' );

// Allow script & iframe tag within posts
function devo_allow_tags( $allowed_post_tags ){
    $allowed_post_tags['span'] = [
        'class' => TRUE,
        'id' => TRUE,
        'style' => TRUE,
    ];
    $allowed_post_tags['script'] = [
        'type' => TRUE,
        'src' => TRUE,
        'height' => TRUE,
        'width' => TRUE,
    ];
    $allowed_post_tags['iframe'] = [
        'src' => TRUE,
        'width' => TRUE,
        'height' => TRUE,
        'class' => TRUE,
        'frameborder' => TRUE,
        'webkitAllowFullScreen' => TRUE,
        'mozallowfullscreen' => TRUE,
        'allowFullScreen' => TRUE
    ];
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
add_filter( 'wp_kses_allowed_html', 'devo_allow_tags', 1 );

// Changing excerpt more
function devo_excerpt_more( $more ) {
	return '...';
}
add_filter( 'excerpt_more', 'devo_excerpt_more' );

function devo_case_insensitive_urls() {
    $request_uri = isset( $_SERVER['REQUEST_URI'] ) && strlen( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : FALSE;
    $query_string = isset( $_SERVER['QUERY_STRING'] ) && strlen( $_SERVER['QUERY_STRING'] ) ? '?' . $_SERVER['QUERY_STRING'] : '';
    $path = $query_string && $request_uri ? str_replace( $query_string, '', $request_uri ) : ( $request_uri ? $request_uri : FALSE );
    if ( $path && preg_match( '/[A-Z]/', $path ) ) {
        $lowercase_url = strtolower( $path ) . $query_string;
        wp_redirect( $lowercase_url );
        exit;
    }
}
add_action( 'init', 'devo_case_insensitive_urls' );

// Add site ID to admin toolbar
function devo_admin_menu_site_id( $wp_admin_bar ) {
    $args = [
        'id' => 'siteID',
        'title' => 'Site ID: ' . get_current_blog_id(),
    ];
    $wp_admin_bar->add_node( $args );
}
//add_action( 'admin_bar_menu', 'devo_admin_menu_site_id', 20 );

// Load Text Domain
function devo_load_textdomain() {
    load_theme_textdomain( 'astraea', get_template_directory() . '/languages' );
}
//add_action( 'after_setup_theme', 'devo_load_textdomain', 0 );

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