<?php

class DO_Company {
    public function __construct() {
        $companies = new DO_Custom_Post_Type( 'do_company' );
        $companies->settings( [
            'post_title' => 'Name',
            'post_content' => 'Description',
            'post_excerpt' => 'Description',
            'post_thumbnail' => 'Logo',
            'has_archive' => FALSE,
            'noindex' => TRUE,
            'show_in_menu' => 'themes.php',
            'show_in_admin_bar' => FALSE,
            'hide_field' => 'Hidden',
            'onsave_callback' => [ $this, 'onsave' ],
        ] );
        $companies->meta_fields( [
            'Name' => 'text',
            'Logo' => 'media',
            'Description' => 'html',
            'About' => 'html',
            'Size' => 'int',
            'URL' => 'url',
            'Stats' => [
                'type' => 'multi_array',
                'fields' => [
                    'Title' => 'text',
                    'Copy' => 'html',
                    'Solution' => new DO_CPT_Form_Field( 'select', 'do_solution', 'Slug', 'Slug' ),
                ],
            ],
            'Hidden' => 'binary',
        ] );
        $companies->meta_fields( [
            'Solutions' => new DO_CPT_Form_Field( 'checkbox', 'do_solution', 'post_title', 'post_name' ),
        ], 'Solutions' );
        $companies->admin_fields( [ 'Title', 'Logo', 'Description', 'Hidden', 'post_date' ] );
    }

    public function onsave( $POST, $cpt_object ) {
        global $wpdb;
        if ( isset( $POST['company_logo'] ) && strlen( $POST['company_logo'] ) ) {
            $logo_file = $POST['company_logo'];
            $logo_id = do_get_media_by_url( $logo_file, 'thumbnail', 'id' );
            update_post_meta( $logo_id, 'logo', TRUE );
            update_post_meta( $logo_id, 'logo_label', $POST['company_name'] );
            $wpdb->update( 
                // Table
                $wpdb->posts,
                // Data $column => $value
                [
                    'post_title' => $POST['company_name'],
                ],
                // Where $column => $value
                [ 'ID' => $logo_id ],
            );
        }
        return $POST;
    }
}
$do_company = new DO_Company();