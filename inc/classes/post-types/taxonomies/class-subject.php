<?php
// Subjects
class DO_Subject {
    public function __construct() {
        $subjects = new DO_Custom_Post_Type( 'do_subject' );
        $subjects->settings( [
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
        $subjects->meta_fields( [
            'Title' => 'text',
            'Slug' => 'varchar',
            'Description' => 'textarea',
            'Hidden' => 'binary',
        ] );
        $subjects->admin_fields( [ 'Title', 'Slug', 'Description', 'Active' ] );
    }
}
$do_subject = new DO_Subject();