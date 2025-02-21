<?php
// Events
class DO_Event {
    public function __construct() {
        $event = new DO_Custom_Post_Type( 'do_event' );
        $event->settings( [
            'icon' => '\f508',
            'post_title' => 'Title',
            'post_name' => [ 'Title', 'Type', 'Slug Suffix' ],
            'post_thumbnail' => 'Image',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'has_archive' => FALSE,
            'show_in_menu' => 'resources',
            'seo' => [
                'title' => 'Title',
                'image' => 'SEO Image||Image',
                'description' => 'Description',
            ],
            'bonus_fields' => [
                'subject' => 'event_subject',
                'region' => 'event_region',
            ],
            'hide_field' => 'Hidden',
            'featured_field' => 'Featured',
            'character_count' => [
                'Page Title' => 60,
                'Description' => 160,
            ],
            'notes' => [
                'Location' => 'Not for Webinars. Paste the entire embed code from Google.',
                'Date' => 'Default timezone is ' . wp_timezone_string() . '.',
                'End Date' => 'Only use if the event ends on a different day than it begins.',
                'Video' => 'For un-gated replays.',
            ],
            'breadcrumbs' => [
                'Resources' => '/resources/',
                'Events' => '/events/',
            ],
            'schema' => [
                '@type' => 'Event',
                'name' => 'Title',
                'image' => 'Image',
                'startDate' => 'Date',
                'endDate' => 'End Date',
                'location' => 'Location||guid',
            ],
        ] );
        $event->meta_fields( [
            'Type' => new DO_CPT_Form_Field( 'select', 'do_event_type', 'post_title', 'post_name' ),
            'Slug Suffix' => 'varchar',
            'Title' => 'text',
            'Subtitle' => 'text',
            'Date' => 'date_time_timezone',
            'End Date' => 'date_time_timezone',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'SEO Image' => 'media',
            'Registration Link' => 'url',
            'Description' => 'html',
            'Content' => 'wp_editor',
            'Presenters' => [
                'type' => 'multi_array',
                'fields' => [
                    'Staff' => new DO_CPT_Form_Field( 'select', 'do_staff', 'post_title', 'post_name' ),
                    'Name' => 'text',
                    'Position' => 'varchar',
                    'Image' => 'media',
                    'Bio' => 'html',
                    'LinkedIn' => 'url',
                ],
            ],
            'Custom CTA Text' => [
                'type' => 'multi',
                'fields' => [
                    'Before Event' => 'varchar',
                    'After Event' => 'varchar',
                ],
            ],
            'Location' => 'address',
            'Form Embed Code' => 'form_embed_code',
            'Form' => new DO_CPT_Form_Field( 'select', 'do_form', 'post_title', 'post_id' ),
            'Video' => 'url',
            'Featured' => 'binary',
            'Hidden' => 'binary',
        ] );
        if ( class_exists( 'DO_Subject' ) && class_exists( 'DO_Region' ) ) {
            $event->meta_fields( [
                'Subject' => new DO_CPT_Form_Field( 'checkbox', 'do_subject', 'post_title', 'post_name' ),
                'Region' => new DO_CPT_Form_Field( 'checkbox', 'do_region', 'post_title', 'post_name' ),
            ], 'Taxonomy' );
        }
        $event->meta_fields( [
            'Custom CTA Hide Panel' => 'binary',
            'Custom CTA' => 'do_cta_callback',
        ], 'Custom CTA' );
        $event->admin_fields( [ 'Title', 'Type', 'Slug Suffix', 'Date', 'Featured', 'Hidden' ] );
    }
}
$do_event = new DO_Event();