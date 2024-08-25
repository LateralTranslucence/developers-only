<?php
// Regions
class DO_Region {
    public function __construct() {
        $regions = new DO_Custom_Post_Type( 'do_region' );
        $regions->settings( [
            'post_title' => 'Title',
            'post_name' => 'Slug',
            'has_archive' => FALSE,
            'noindex' => TRUE,
            'show_in_menu' => 'taxonomy',
            'show_in_admin_bar' => FALSE,
            'seo' => [
                'title' => 'Title',
                'description' => 'Description',
            ],
            'restrict_users' => [ 'administrator' ],
            'hide_field' => 'Hidden',
        ] );
        $regions->meta_fields( [
            'Title' => 'text',
            'Slug' => 'varchar',
            'Description' => 'textarea',
            'Hidden' => 'binary',
        ] );
        $regions->admin_fields( [ 'Title', 'Slug', 'Description', 'Active' ] );
    }
}
$do_region = new DO_Region();