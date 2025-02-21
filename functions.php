<?php
// Define constants
define( 'DO_VER', DO_ENVIRONMENT == 'local' ? time() : 'DEPLOY_TIMESTAMP' );
// TODO: Move config file to child theme
include_once( __DIR__ . '/inc/config.php' );

// Include Helper Functions
include_once( __DIR__ . '/inc/functions.helpers.php' );
// Include Display Functions
include_once( __DIR__ . '/inc/functions.display.php' );
// Include API Routes
require( __DIR__ . '/inc/functions.routes.php' );
// Include Shortcode Functions
require( __DIR__ . '/inc/functions.shortcodes.php' );

// Scripts
function do_scripts() {
    // wp_enqueue_style( $handle, $src, $deps = [], $ver = false, $media = 'all' )
    // wp_enqueue_script( $handle, $src, $deps = [], $ver = false, $load_in_footer = FALSE )

    $entry = 'assets/src/index.tsx';
    $manifest = file_get_contents( __DIR__ . '/assets/dist/.vite/manifest.json' );
    $vite_files = json_decode( $manifest );
    if ( isset( $vite_files->{ $entry } ) ) {
        $index_file = $vite_files->{ $entry };
        // Load React app
        wp_enqueue_script( 'react-index', get_template_directory_uri() . '/assets/dist/' . $index_file->file, [], DO_VER, TRUE );
        // Load global styles
        wp_enqueue_style( 'do-global', get_template_directory_uri() . '/assets/dist/do-global.css', [], DO_VER );
        if ( isset( $index_file->css ) ) {
            wp_enqueue_style( 'react-index', get_template_directory_uri() . '/assets/dist/' . current( $index_file->css ), [], DO_VER );
        }
    }
    
}
add_action( 'wp_enqueue_scripts', 'do_scripts', 1 );

function do_js_module( $tag ) {
    // Only do this if we are not in the admin and this is a js file
    if ( is_admin() || strpos( $tag, 'index' ) === FALSE ) {
        return $tag;
    }
    $module_tag = str_replace( 'type="text/javascript"', 'type="module"', $tag );
    return $module_tag;
}
add_filter( 'script_loader_tag', 'do_js_module', 10 );

// Admin Scripts
function do_admin_scripts() {
    // List Library
    wp_register_script( 'list', get_template_directory_uri() . '/assets/js/libs/list.js', [], '12232019' );
    // DO Admin
    wp_enqueue_script( 'do-admin', get_template_directory_uri() . '/assets/js/do-admin.js', [ 'jquery', 'list', 'jquery-ui-sortable' ], DO_VER, TRUE );
    wp_enqueue_style( 'do-admin', get_template_directory_uri() . '/assets/dist/do-admin.css', [ 'dashicons' ], DO_VER, 'all' );
    // Font Awesome Index
    if ( get_current_screen()->id === 'appearance_page_fontawesome-icons' ) {
        wp_enqueue_style( 'do-icons', get_template_directory_uri() . '/assets/src/styles/fonts/FontAwesome/style.css', [], DO_VER, 'all' );
    }
    // Media Library Tabs
    wp_enqueue_script( 'media-library-tabs', get_template_directory_uri() . '/assets/js/do-media-library-tabs.js', array( 'jquery', 'media-upload', 'media-views' ), DO_VER, TRUE );
    // Image upload
    wp_enqueue_media();
    wp_enqueue_script( 'media-upload-field', get_template_directory_uri() . '/assets/js/do-media-upload-field.js', [ 'jquery', 'jquery-ui-core', 'jquery-ui-sortable' ], '08062024', TRUE );
    // Binary checkbox in admin column
    wp_enqueue_script( 'binary-toggle', get_template_directory_uri() . '/assets/js/do-binary-toggle.js', [ 'jquery' ], '08062024', TRUE );
    // Color picker
    wp_enqueue_style( 'wp-color-picker' );
    wp_enqueue_script( 'wp-color-picker' );
    wp_enqueue_script( 'do-color-picker', get_template_directory_uri() . '/assets/js/do-color-picker.js', [ 'jquery', 'wp-color-picker' ], '08062024', TRUE );
    // Date picker
    wp_enqueue_style( 'jquery-ui-styles', get_template_directory_uri() . '/assets/js/libs/timepicker/jquery-ui.css', [], '08062024' );
    wp_enqueue_style( 'jquery-ui-timepicker-styles', get_template_directory_uri() . '/assets/js/libs/timepicker/jquery-ui-timepicker-addon.css', [ 'jquery-ui-styles' ], '08062024' );
    wp_enqueue_script( 'jquery-ui-timepicker', get_template_directory_uri() . '/assets/js/libs/timepicker/jquery-ui-timepicker-addon.js', [ 'jquery-ui-datepicker', 'jquery-ui-slider' ], '08062024', TRUE );
    wp_enqueue_script( 'date-picker', get_template_directory_uri() . '/assets/js/do-date-picker.js', [ 'jquery-ui-timepicker' ], '08062024', TRUE );

}
add_action( 'admin_enqueue_scripts', 'do_admin_scripts' );

// Include Classes
function do_load_classes() {
    // Required Utilities
    $utility_classes = [
        'cpt-form-field',
    	'custom-post-type',
        'form-field-api-display',
    	'form-field-display',
    	'form-field-validate',
    	'options-screen',
    	'post-browser',
    	'redirect',
    	'rewrite',
	];
    // Optional Utilities
    if ( defined( 'DO_ADMIN_PAGES' ) && DO_ADMIN_PAGES ) {
        $utility_classes[] = 'admin-pages'; // extends options-screen
    }
    if ( defined( 'DO_CONTENT_SURVEY' ) && DO_CONTENT_SURVEY ) {
        $utility_classes[] = 'content-survey';
    }
    if ( defined( 'DO_CSV' ) && DO_CSV ) {
        $utility_classes[] = 'csv';
    }
    if ( defined( 'DO_FORM_BUILDER' ) && DO_FORM_BUILDER ) {
        $utility_classes[] = 'form-builder';
        $utility_classes[] = 'send-simple-email';
    }
    if ( defined( 'DO_GATE' ) && DO_GATE ) {
        $utility_classes[] = 'gated';
    }
    if ( defined( 'DO_PHPINFO' ) && DO_PHPINFO ) {
        $utility_classes[] = 'view-phpinfo';
    }
    if ( defined( 'DO_SEARCH' ) && DO_SEARCH ) {
        $utility_classes[] = 'search';
        $utility_classes[] = 'search-query';
        $utility_classes[] = 'search-ui';
    }
    if ( defined( 'DO_UNUSED_MEDIA' ) && DO_UNUSED_MEDIA ) {
        $utility_classes[] = 'unused-media';
    }
    if ( defined( 'DO_UPDATES' ) && DO_UPDATES ) {
        $utility_classes[] = 'site-updates-email';
    }
    if ( defined( 'DO_USER_ROLE' ) && DO_USER_ROLE ) {
        $utility_classes[] = 'user-role';
    }
    if ( defined( 'DO_VIEW_PERMALINKS' ) && DO_VIEW_PERMALINKS ) {
        $utility_classes[] = 'view-permalinks';
    }
    do_load_class_files( $utility_classes );

    // Taxonomies
    $taxonomies = [];
    if ( defined( 'DO_EVENT_TYPE' ) && DO_EVENT_TYPE ) {
        $taxonomies[] = 'event-type';
    }
    if ( defined( 'DO_PODCAST_SERIES' ) && DO_PODCAST_SERIES ) {
        $taxonomies[] = 'podcast-series';
    }
    if ( defined( 'DO_REGION' ) && DO_REGION ) {
        $taxonomies[] = 'region';
    }
    if ( defined( 'DO_SUBJECT' ) && DO_SUBJECT ) {
        $taxonomies[] = 'subject';
    }
    if ( count( $taxonomies ) ) {
        do_load_class_files( $taxonomies, 'post-types/taxonomies' );
    }
    // Post Types
    $post_types = [];
    if ( defined( 'DO_ANNOUNCEMENT' ) && DO_ANNOUNCEMENT ) {
        $post_types[] = 'announcement';
    }
    if ( defined( 'DO_ATTACHMENT' ) && DO_ATTACHMENT ) {
        $post_types[] = 'attachment';
    }
    if ( defined( 'DO_BLOG' ) && DO_BLOG ) {
        $post_types[] = 'blog';
    }
    if ( defined( 'DO_CUSTOMER_STORY' ) && DO_CUSTOMER_STORY ) {
        $post_types[] = 'customer-story';
    }
    if ( defined( 'DO_EVENT' ) && DO_EVENT ) {
        $post_types[] = 'event';
    }
    if ( defined( 'DO_GLOSSARY' ) && DO_GLOSSARY ) {
        $post_types[] = 'glossary';
    }
    if ( defined( 'DO_LANDING_PAGE' ) && DO_LANDING_PAGE ) {
        $post_types[] = 'landing-page';
    }
    if ( defined( 'DO_LEGAL' ) && DO_LEGAL ) {
        $post_types[] = 'legal';
    }
    if ( defined( 'DO_MEDIA_COVERAGE' ) && DO_MEDIA_COVERAGE ) {
        $post_types[] = 'media-coverage';
    }
    if ( defined( 'DO_PODCAST' ) && DO_PODCAST ) {
        $post_types[] = 'podcast';
    }
    if ( defined( 'DO_PRESS_RELEASE' ) && DO_PRESS_RELEASE ) {
        $post_types[] = 'press-release';
    }
    if ( defined( 'DO_REPORT' ) && DO_REPORT ) {
        $post_types[] = 'report';
    }
    if ( defined( 'DO_SIMPLE_PAGE' ) && DO_SIMPLE_PAGE ) {
        $post_types[] = 'simple-page';
    }
    if ( defined( 'DO_TOPIC' ) && DO_TOPIC ) {
        $post_types[] = 'topic';
    }
    if ( defined( 'DO_VIDEO' ) && DO_VIDEO ) {
        $post_types[] = 'video';
    }
    if ( defined( 'DO_STAFF' ) && DO_STAFF ) {
        $post_types[] = 'staff';
    }
    if ( defined( 'DO_TESTIMONIAL' ) && DO_TESTIMONIAL ) {
        $post_types[] = 'testimonial';
    }
    if ( defined( 'DO_ABOUT' ) && DO_ABOUT ) {
        $post_types[] = 'about';
    }
    if ( defined( 'DO_CAMPAIGN_PAGE' ) && DO_CAMPAIGN_PAGE ) {
        $post_types[] = 'campaign-page';
    }
    if ( defined( 'DO_LOCATION' ) && DO_LOCATION ) {
        $post_types[] = 'location';
    }
    if ( defined( 'DO_COMPANY' ) && DO_COMPANY ) {
        $post_types[] = 'company';
    }
    if ( defined( 'DO_ICON' ) && DO_ICON ) {
        $post_types[] = 'icon';
    }
    if ( 
        ( defined( 'DO_COMPANY' ) && DO_COMPANY ) ||
        ( defined( 'DO_ICON' ) && DO_ICON )
        ) {
        // A utility that is currently only needed for these 2 post types
        $post_types[] = 'media-library-tab';
    }
    if ( count( $post_types ) ) {
        do_load_class_files( $post_types, 'post-types' );
    }
}
add_action( 'after_setup_theme', 'do_load_classes', 0 );

function do_create_objects() {
    // Site Settings
    global $site_settings;
    include( locate_template( 'inc/fields/colors.php' ) );
    $site_settings = new DO_Options_Screen( 'site_settings' );
    $site_settings->settings( [
        'submenu' => 'themes.php',
        'page_title' => 'Site Settings',
        'notes' => [
            'CTAs' => '<b>Exclude from Pages</b> - Show ad on all pages except these. Comma-separated paths, like "solutions/it, contact". Home is /. Accepts * as wildcard. <br>
            <b>Only on Pages</b> - Show ad only on these pages (Supercedes "Exclude from Pages"). Comma-separated paths, like "solutions/it, contact". Home is /. Accepts * as wildcard.',
            'Ads' => '<b>Pre-built Ad</b> - Overrides "Custom Code" <br>
            <b>Exclude from Pages</b> - Show ad on all pages except these. Comma-separated paths, like "solutions/it, contact". Home is /. Accepts * as wildcard. <br>
            <b>Only on Pages</b> - Show ad only on these pages (Supercedes "Exclude from Pages"). Comma-separated paths, like "solutions/it, contact". Home is /. Accepts * as wildcard. <br>
            <b>Wrapper ID</b> - If using custom code. Will automatically include prefix "ad-"',
            'CTA Options' => '<b>CTA ID</b> - This field is required and cannot be changed.',
            'Avatar' => 'Default is <b>True</b>.',
        ],
        'character_count' => [
            'Headline' => 95,
        ],
    ] );
    $site_settings->fields( [
        'Header Script' => 'code',
        'Footer Script' => 'code',
    ], 'Misc' );
    $site_settings->fields( [
        'Active' => 'binary',
        'Headline' => 'textarea',
        'URL' => 'url',
        'Modal' => 'binary',
    ], 'Header Promo' );
    $site_settings->fields( [
        'Text' => 'text',
        'URL' => 'url',
        'Modal' => 'binary',
    ], 'Footer CTA' );

    // Custom Image Sizes
    add_image_size( 'cinema_1000', 1000, 563, [ 'center', 'top' ] );
    add_image_size( 'cinema_600', 600, 338, [ 'center', 'top' ] );
    add_image_size( 'cinema_400', 400, 225, [ 'center', 'top' ] );
    add_image_size( 'square_600', 600, 600, TRUE );
    add_image_size( 'square_400', 400, 400, TRUE );
    add_image_size( 'vertical_400', 400, 500, TRUE );
    add_image_size( 'vertical_600', 600, 750, TRUE );
    add_image_size( 'logo', 200, 9999 );
    add_image_size( 'logo_400', 400, 9999 );
    add_image_size( 'background', 1500, 9999 );
    add_image_size( 'background_mobile', 600, 700, TRUE );

    // Enable post thumbnails
	add_theme_support( 'post-thumbnails' );

	// Register nav menus
	register_nav_menus( [
        'main-nav' => __( 'Main Navigation' ),
        'footer-nav' => __( 'Footer Navigation' ),
        'social-nav' => __( 'Social Navigation' ),
        'legal-nav' => __( 'Legal Footer Navigation' ),
	] );
}
add_action( 'after_setup_theme', 'do_create_objects', 1 );

/*
 *
 * CLEANUP
 * 
 */

// Dequeue unneeded styles/scripts
function do_dequeue_script() {
    wp_dequeue_style( 'wp-block-library' );
    wp_deregister_script( 'wp-embed' );
    wp_dequeue_style( 'global-styles' );
}
add_action( 'wp_enqueue_scripts', 'do_dequeue_script', 99999 );

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
function do_remove_admin_menu_items() {
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
    // Comments
    remove_menu_page( 'edit-comments.php' );
}
add_action( 'admin_menu', 'do_remove_admin_menu_items' );



// Header Scripts
function do_header_scripts() {
    $site_settings_misc = get_option( 'site_settings_misc' );
    echo isset( $site_settings_misc['header_script'] ) ? $site_settings_misc['header_script'] : '';
}
add_action( 'wp_head', 'do_header_scripts' );

// Footer Scripts
function do_footer_scripts() {
    $site_settings_misc = get_option( 'site_settings_misc' );
	echo isset( $site_settings_misc['footer_script'] ) ? $site_settings_misc['footer_script'] : '';
}
add_action( 'wp_footer', 'do_footer_scripts' );

// Javascript home_url
function do_js_globals() {
    $home_url = home_url();
    $relative_home_url = home_url( '', 'relative' );
    $site_language = substr( get_bloginfo( 'language' ), 0, 2 );
    $template_directory = get_template_directory_uri();
?>
<script>
    const doEnv = "<?php echo DO_ENVIRONMENT ?>";
    const homeURL = "<?php echo $home_url ?>";
    const relativeHomeURL = "<?php echo $relative_home_url ?>";
    const templateDirectory = "<?php echo $template_directory ?>";
    const siteLanguage = "<?php echo $site_language ?>";
    const hubspotForms = [];
    const hubspotFormsLoaded = [];
    const menus = [];
<?php if ( ! is_admin() ) : ?>
    const exports = {};
<?php endif; ?>
</script>
<?php }
add_action( 'wp_head', 'do_js_globals' );
add_action( 'admin_head', 'do_js_globals' );

// noindex Filter
function do_noindex() {
	$noindex = apply_filters( 'do_noindex', null );
	if ( $noindex ) {
		return 'noindex';
	} else {
        return 'index, follow';
    }
}

// Set noindex
function do_set_noindex( $noindex ) {
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
            $noindex_field = (bool) do_get_post_meta( $post_id, 'noindex' );
            $hidden = (bool) do_get_post_meta( $post_id, 'hide_post' );
            $noindex = $noindex_field || $hidden;
            break;
    }
    return $noindex;
}
add_filter( 'do_noindex', 'do_set_noindex' );

// Show what template we're looking at and why
function do_debug_page_request() {
    global $wp, $template; ?>
<!-- Request: <?php echo empty( $wp->request ) ? 'None' : esc_html( $wp->request ) ?> -->
<!-- Matched Rewrite Rule: <?php echo empty( $wp->matched_rule ) ? 'None' : esc_html( $wp->matched_rule ) ?> -->
<!-- Matched Rewrite Query: <?php echo empty( $wp->matched_query ) ? 'None' : esc_html( $wp->matched_query ) ?> -->
<!-- Loaded Template: <?php echo basename( $template ) ?> -->
<?php }

// Clean up rewrite rules
function do_clean_up_rewrite_rules( $rules ) {
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
add_filter( 'rewrite_rules_array', 'do_clean_up_rewrite_rules' );

/* Login Screen Branding (overwritable) */
// Url
if ( ! function_exists( 'do_login_logo_url' ) ) {
    function do_login_logo_url() {
        return home_url();
    }
}
add_filter( 'login_headerurl', 'do_login_logo_url' );
// Title
if ( ! function_exists( 'do_login_url_title' ) ) {
    function do_login_url_title() {
        return '{DevelopersOnly}';
    }
}
add_filter( 'login_headertext', 'do_login_url_title' );
// CSS
function do_login_stylesheet() {
    wp_enqueue_style( 'do-login', get_template_directory_uri() . '/assets/dist/do-login.css', [ 'login' ], DO_VER );
}
add_action( 'login_enqueue_scripts', 'do_login_stylesheet' );

/* Add custom fields to nav items */
// TODO: turn this into a class
// Show the fields
function do_mega_menu_fields( $item_id, $item ) {
    //do_var_dump($item);
	wp_nonce_field( 'mega_menu_meta_nonce', '_mega_menu_meta_nonce_name' );
	?>
    <input type="hidden" class="nav-menu-id" value="<?php echo $item_id ?>">
    <?php
    // Mega Nav - only if top level nav item
    if ( $item->menu_item_parent == '0' ) :
        $mega_menu = (bool) do_get_post_meta( $item_id, '_menu_mega_menu' ); ?>
        <p class="description-wide">
            <label for="mega-menu-<?php echo $item_id ?>">
                <?php _e( 'Mega Menu?', 'developers_only' ) ?>
            </label>
            <input type="checkbox" name="_menu_mega_menu[<?php echo $item_id ?>]" id="mega_menu-<?php echo $item_id ?>" value="1" <?php checked( $mega_menu, 1 ) ?>>
        </p>
	<?php endif;
    // Icon
    $icon = do_get_post_meta( $item_id, '_menu_icon' ); ?>
    <p class="description-wide">
        <span class="red small">List of available icon names can be found <a href="<?php echo admin_url( '/themes.php?page=fontawesome-icons', 'relative' ) ?>" target="_blank">here</a>.</span><br>
        <label for="icon-<?php echo $item_id ?>">
            <?php _e( 'Icon', 'developers_only' ) ?>
        </label>
        <input type="text" name="_menu_icon[<?php echo $item_id ?>]" id="icon-<?php echo $item_id ?>" value="<?php echo $icon ?>">
    </p>
    <?php
}
add_action( 'wp_nav_menu_item_custom_fields', 'do_mega_menu_fields', 10, 2 );

// Save the fields
function do_save_mega_menu_fields( $menu_id, $menu_item_db_id ) {
	// Verify this came from our screen and with proper authorization.
	if ( ! isset( $_POST['_mega_menu_meta_nonce_name'] ) || ! wp_verify_nonce( $_POST['_mega_menu_meta_nonce_name'], 'mega_menu_meta_nonce' ) ) {
		return $menu_id;
	}
    // Mega Nav
	if ( isset( $_POST['_menu_mega_menu'][ $menu_item_db_id ] ) ) {
		$sanitized_data = sanitize_text_field( $_POST['_menu_mega_menu'][ $menu_item_db_id ] );
		update_post_meta( $menu_item_db_id, '_menu_mega_menu', $sanitized_data );
	} else {
		delete_post_meta( $menu_item_db_id, '_menu_mega_menu' );
	}
    // Icon
	if ( isset( $_POST['_menu_icon'][ $menu_item_db_id ] ) ) {
		$sanitized_data = sanitize_text_field( $_POST['_menu_icon'][ $menu_item_db_id ] );
		update_post_meta( $menu_item_db_id, '_menu_icon', $sanitized_data );
	} else {
		delete_post_meta( $menu_item_db_id, '_menu_icon' );
	}
}
add_action( 'wp_update_nav_menu_item', 'do_save_mega_menu_fields', 10, 2 );

// Extracts width and height from svg images. Slightly modified from
// https://wordpress.stackexchange.com/questions/255314/cant-extract-and-set-svg-dimensions#answer-255634
// It's here instead of in functions.helpers because it's actually a filter
function do_fix_wp_get_attachment_image_svg( $image, $attachment_id, $size, $icon ) {
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
add_filter( 'wp_get_attachment_image_src', 'do_fix_wp_get_attachment_image_svg', 10, 4 );

// Admin Color Scheme
function do_admin_color_scheme( $color_scheme ) {
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
add_filter( 'get_user_option_admin_color', 'do_admin_color_scheme', 5 );
remove_action( 'admin_color_scheme_picker', 'admin_color_scheme_picker' );

if ( is_admin() ) {
    function do_admin_posts_per_page( $num_posts ) {
        if ( $num_posts == 20 ) {
            $num_posts = 200;
        }
        return $num_posts;
    }
    add_filter( 'edit_posts_per_page', 'do_admin_posts_per_page' );
}

// Allow specified file types in media uploads
function do_add_file_types_to_uploads( $file_types ) {
	$new_filetypes = [];
	$new_filetypes['svg'] = 'image/svg+xml';
	$new_filetypes['webp'] = 'image/webp';
    $new_filetypes['vtt'] = 'text/vtt';
	$file_types = array_merge( $file_types, $new_filetypes );
	return $file_types;
}
add_action( 'upload_mimes', 'do_add_file_types_to_uploads' );

// Allow script & iframe tag within posts
function do_allow_tags( $allowed_post_tags ){
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
add_filter( 'wp_kses_allowed_html', 'do_allow_tags', 1 );

// Changing excerpt more
function do_excerpt_more( $more ) {
	return '...';
}
add_filter( 'excerpt_more', 'do_excerpt_more' );

function do_case_insensitive_urls() {
    $request_uri = isset( $_SERVER['REQUEST_URI'] ) && strlen( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : FALSE;
    $query_string = isset( $_SERVER['QUERY_STRING'] ) && strlen( $_SERVER['QUERY_STRING'] ) ? '?' . $_SERVER['QUERY_STRING'] : '';
    $path = $query_string && $request_uri ? str_replace( $query_string, '', $request_uri ) : ( $request_uri ? $request_uri : FALSE );
    if ( $path && preg_match( '/[A-Z]/', $path ) ) {
        $lowercase_url = strtolower( $path ) . $query_string;
        wp_redirect( $lowercase_url );
        exit;
    }
}
add_action( 'init', 'do_case_insensitive_urls' );

// Custom walker for social navigation - used in a shortcode
class DO_Social_Menu_Walker extends Walker_Nav_Menu {
	function start_el( &$output, $item, $depth = 0, $args = [], $id = 0 ) {
		if ( is_object( $args ) ) {
            $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
            $icon = get_post_meta( $item->ID, '_menu_icon', TRUE );
            $class_names = $value = '';
            $classes = empty( $item->classes ) ? [] : (array) $item->classes;
            $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
            $class_names = ' class="' . esc_attr( $class_names ) . '"';

            $output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';

            $attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) .'"' : '';
            $attributes .= ! empty( $item->target ) ? ' target="_blank"' : '';
            $attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) .'"' : '';
            $attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) .'"' : '';
            $attributes .= strlen( $icon ) ? ' class="do-fa fa-' . esc_attr( $icon ) .'"' : '';

            $item_output = $args->before;
            $item_output .= '<a'. $attributes .'>';
            $item_output .= $args->link_before . '<span>' . apply_filters( 'the_title', $item->title, $item->ID ) . '</span>' . $args->link_after;
            $item_output .= '</a>';
            $item_output .= $args->after;

            $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
        }
	}
}

// Add site ID to admin toolbar
function do_admin_menu_site_id( $wp_admin_bar ) {
    $args = [
        'id' => 'siteID',
        'title' => 'Site ID: ' . get_current_blog_id(),
    ];
    $wp_admin_bar->add_node( $args );
}
//add_action( 'admin_bar_menu', 'do_admin_menu_site_id', 20 );

// Load Text Domain
function do_load_textdomain() {
    load_theme_textdomain( 'developers_only', get_template_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'do_load_textdomain', 0 );

function do_add_custom_post_types_to_homepage_dropdown( $pages, $r ) {
    if ( isset( $r['post_type'] ) && 'page' === $r['post_type'] ) {
        // Get custom post types (for example, 'my_custom_post_type')
        $custom_posts = get_posts( array(
            'post_type' => [ 'do_landing_page', 'do_simple_page' ], // Replace with your custom post type
            'numberposts' => -1,
        ) );
        // Add custom post types to the list of pages
        foreach ( $custom_posts as $custom_post ) {
            $pages[] = $custom_post;
        }
    }
    return $pages;
}
add_filter( 'get_pages', 'do_add_custom_post_types_to_homepage_dropdown', 10, 2 );

// Set Block Image
function do_set_block_image( $block_image, $post_id = FALSE ) {
    $fallback_images = [
        get_template_directory_uri() . '/images/fallback1.jpg',
        get_template_directory_uri() . '/images/fallback2.jpg',
        get_template_directory_uri() . '/images/fallback3.jpg',
        get_template_directory_uri() . '/images/fallback4.jpg',
        get_template_directory_uri() . '/images/fallback5.jpg',
    ];
    $random_number = rand( 0, 4 );
    $block_image = get_the_post_thumbnail_url( $post_id );

    return $block_image ? $block_image : $fallback_images[ $random_number ];
}
add_filter( 'do_block_image', 'do_set_block_image', 10, 2 );