<?php
// Series (videos, podcasts, blogs, etc.)
class DO_Series {
    public function __construct() {
        $series = new DO_Custom_Post_Type( 'do_series' );
        $series->settings( [
            'display_name' => 'Series',
            'post_title' => 'Title',
            'post_name' => 'Slug',
            'has_archive' => FALSE,
            'noindex' => TRUE,
            'show_in_menu' => 'taxonomy',
            'show_in_admin_bar' => FALSE,
            'restrict_users' => [ 'administrator' ],
            'hide_field' => 'Hidden',
        ] );
        $series->meta_fields( [
            'Title' => 'text',
            'Slug' => 'varchar',
            'Description' => 'textarea',
            'Hidden' => 'binary',
        ] );
        $series->admin_fields( [ 'Title', 'Slug', 'post_date' ] );
    }
}
$do_series = new DO_Series();