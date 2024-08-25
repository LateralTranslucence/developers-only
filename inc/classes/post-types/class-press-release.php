<?php
// Press Releases
class DO_Press_Release {
    public function __construct() {
        // Filters/Actions
        add_action( 'after_setup_theme', [ $this, 'site_settings' ], 2 );
        add_filter( 'do_block_image', [ $this, 'set_block_image' ], 10, 2 );
        // Post Type
        $press_release = new DO_Custom_Post_Type( 'do_press_release' );
        $press_release->settings( [
            'display_name' => 'Press Release',
            'slug' => __( 'press-release', 'developers_only' ),
            'post_title' => 'Title',
            'post_name' => 'Title',
            'post_thumbnail' => 'Image',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'has_archive' => FALSE,
            'show_in_menu' => 'resources',
            'onsave_callback' => 'do_client_autotagging',
            'seo' => [
                'title' => 'Title',
                'image' => 'SEO Image||Image',
                'description' => 'Description',
            ],
            'bonus_fields' => [
                'subject' => 'press_subject',
                'region' => 'press_region',
                'client' => 'press_client',
            ],
            'hide_field' => 'Hidden',
            'meta_prefix' => 'press',
            'character_count' => [
                'Page Title' => 60,
                'Description' => 160,
            ],
            'notes' => [
                'Client' => 'If this press release is announcing a new client, select the client from the Clients post type',
            ],
            'schema' => [
                '@type' => 'Article',
                'headline' => 'Title',
                'image' => 'Image',
                'text' => 'Content',
            ],
            'breadcrumbs' => [
                'Resources' => '/resources/',
                'Press' => '/press/',
            ],
        ] );
        $press_release->meta_fields( [
            'Title' => 'text',
            'Long Title' => 'textarea',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'SEO Image' => 'media',
            'Description' => 'html',
            'Content' => 'wp_editor',
            'Hidden' => 'binary',
            'Hide Boilerplate' => 'binary',
            'Client' => new DO_CPT_Form_Field( 'select', 'do_company', 'post_title', 'post_name' ),
        ] );
        if ( class_exists( 'DO_Subject' ) && class_exists( 'DO_Region' ) ) {
            $press_release->meta_fields( [
                'Subject' => new DO_CPT_Form_Field( 'checkbox', 'do_subject', 'post_title', 'post_name' ),
                'Region' => new DO_CPT_Form_Field( 'checkbox', 'do_region', 'post_title', 'post_name' ),
            ], 'Taxonomy' );
        }
        $press_release->meta_fields( [
            'Custom CTA Hide Panel' => 'binary',
            'Custom CTA' => 'do_cta_callback',
        ], 'Custom CTA' );
        $press_release->admin_fields( [ 'Title', 'Subject', 'Hidden', 'post_date' ] );
    }

    // Press Release boilerplate setting
    public function site_settings() {
        global $site_settings;
        $site_settings->fields( [
            'Boilerplate' => 'wp_editor',
        ], 'Press Release Boilerplate' );
    }

    public function set_block_image( $block_image, $post_id = FALSE ) {
        if ( get_post_field( 'post_type', $post_id ) == 'do_press_release' ) {
            $client = do_get_post_meta( $post_id, 'press_client' );
            $client_ids = strlen( $client ) ? get_posts( [
                'post_type' => 'do_company',
                'fields' => 'ids',
                'name' => $client,
            ] ) : [];
            $client_post_id = count( $client_ids ) ? current( $client_ids ) : FALSE;
            $block_image = $client_post_id ? do_get_post_meta( $client_post_id, 'company_logo' ) : $block_image;
        }
        return $block_image;
    }
}
$do_press_release = new DO_Press_Release();