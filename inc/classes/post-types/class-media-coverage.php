<?php
// Media Coverage
class DO_Media_Coverage {
    public function __construct() {
        $media_coverage = new DO_Custom_Post_Type( 'do_media_coverage', [ 'labels' => [ 'name' => 'Media Coverage' ] ] );
        $media_coverage->settings( [
            'display_name' => 'Media Coverage',
            'slug' => 'media-coverage',
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
                'subject' => 'media_subject',
                'region' => 'media_region',
            ],
            'hide_field' => 'Hidden',
            'meta_prefix' => 'media',
            'character_count' => [
                'Page Title' => 60,
                'Description' => 160,
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
        $media_coverage->meta_fields( [
            'Title' => 'text',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'SEO Image' => 'media',
            'URL' => 'url',
            'Description' => 'html',
            'Content' => 'wp_editor',
            'Hidden' => 'binary',
        ] );
        if ( class_exists( 'DO_Subject' ) && class_exists( 'DO_Region' ) ) {
            $media_coverage->meta_fields( [
                'Subject' => new DO_CPT_Form_Field( 'checkbox', 'do_subject', 'post_title', 'post_name' ),
                'Region' => new DO_CPT_Form_Field( 'checkbox', 'do_region', 'post_title', 'post_name' ),
            ], 'Taxonomy' );
        }
        $media_coverage->meta_fields( [
            'Custom CTA Hide Panel' => 'binary',
            'Custom CTA' => 'do_cta_callback',
        ], 'Custom CTA' );
        $media_coverage->admin_fields( [ 'Title', 'Subject', 'Hidden', 'post_date' ] );
    }
}
$do_media_coverage = new DO_Media_Coverage();