<?php
// Podcasts
class DO_Podcast {
    public function __construct() {
        $podcast = new DO_Custom_Post_Type( 'do_podcast' );
        $podcast->settings( [
            'slug' => 'podcast',
            'post_title' => 'Title',
            'post_name' => 'Title',
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
                'subject' => 'podcast_subject',
                'region' => 'podcast_region',
            ],
            'hide_field' => 'Hidden',
            'character_count' => [
                'Page Title' => 60,
                'Description' => 160,
            ],
            'schema' => [
                '@type' => 'PodcastEpisode',
                'name' => 'Title',
                'image' => 'Image',
                'url' => 'Audio Embed Code||Video Embed URL||External URL',
            ],
            'breadcrumbs' => [
                'Resources' => '/resources/',
                'Podcasts' => '/podcasts/',
            ],
        ] );
        $podcast->meta_fields( [
            'Title' => 'text',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'SEO Image' => 'media',
            'Description' => 'html',
            'Content' => 'wp_editor',
            'Audio Embed Code' => 'code',
            'Video Embed URL' => 'url',
            'External URL' => 'url',
            'Format' => [
                'type' => 'select',
                'options' => [ 
                    'audio' => [
                        'label' => 'Audio',
                        'value' => 'audio',
                    ],
                    'video' => [
                        'label' => 'Video',
                        'value' => 'video',
                    ],
                ],
            ],
            'Series' => new DO_CPT_Form_Field( 'select', 'do_podcast_series', 'post_title', 'post_name' ),
            'Hidden' => 'binary',
        ] );
        $podcast->meta_fields( [
            'Form Title' => 'varchar',
            'Hubspot Form Embed Code' => 'hubspot_code',
        ], 'Form (Optional)' );
        if ( class_exists( 'DO_Subject' ) && class_exists( 'DO_Region' ) ) {
            $podcast->meta_fields( [
                'Subject' => new DO_CPT_Form_Field( 'checkbox', 'do_subject', 'post_title', 'post_name' ),
                'Region' => new DO_CPT_Form_Field( 'checkbox', 'do_region', 'post_title', 'post_name' ),
            ], 'Taxonomy' );
        }
        $podcast->meta_fields( [
            'Custom CTA Hide Panel' => 'binary',
            'Custom CTA' => 'do_cta_callback',
        ], 'Custom CTA' );
        $podcast->admin_fields( [ 'Title', 'Format', 'Series', 'Hidden', 'post_date' ] );
    }
}
$do_podcast = new DO_Podcast();