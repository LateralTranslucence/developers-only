<?php
// Customer Testimonials
class DO_Testimonial {
    public function __construct() {
        add_action( 'after_setup_theme', [ $this, 'site_settings' ], 2 );

        $testimonial = new DO_Custom_Post_Type( 'do_testimonial' );
        $testimonial->settings( [
            'post_title' => [ 'Author', ',', 'Author Title', ',', 'Company', ],
            'post_content' => 'Quote',
            'post_excerpt' => 'Quote',
            'has_archive' => FALSE,
            'noindex' => TRUE,
            'show_in_menu' => 'themes.php',
            'bonus_fields' => [
                'client' => 'testimonial_client',
            ],
            'hide_field' => 'Hidden',
        ] );
        $testimonial->meta_fields( [
            'Company' => 'text',
            'Author' => 'text',
            'Author Title' => 'text',
            'Quote' => 'html',
            'URL' => 'url',
            'Client' => new DO_CPT_Form_Field( 'select', 'do_company', 'post_title', 'post_name' ),
            'Hidden' => 'binary',
        ] );
        $testimonial->admin_fields( [ 'Title', 'Client', 'Quote', 'Hidden', 'post_date' ] );
    }
}
$do_testimonial = new DO_Testimonial();