<?php
// Event Type
class DO_Event_Type {
    public function __construct() {
        $event_type = new DO_Custom_Post_Type( 'do_event_type' );
        $event_type->settings( [
            'display_name' => 'Event Type',
            'post_title' => 'Title',
            'post_name' => 'Slug',
            'has_archive' => FALSE,
            'noindex' => TRUE,
            'show_in_menu' => 'taxonomy',
            'show_in_admin_bar' => FALSE,
            'restrict_users' => [ 'administrator' ],
            'hide_field' => 'Hidden',
        ] );
        $event_type->meta_fields( [
            'Title' => 'text',
            'Slug' => 'varchar',
            'Description' => 'textarea',
            'Hidden' => 'binary',
        ] );
        $event_type->admin_fields( [ 'Title', 'Slug', 'post_date' ] );
    }
}
$do_event_type = new DO_Event_Type();