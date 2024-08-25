<?php
// Videos
class DO_Video {
    public function __construct() {
        $video = new DO_Custom_Post_Type( 'do_video' );
        $video->settings( [
            'slug' => 'video',
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
                'subject' => 'video_subject',
                'region' => 'video_region',
            ],
            'hide_field' => 'Hidden',
            'character_count' => [
                'Page Title' => 60,
                'Description' => 160,
            ],
            'schema' => [
                '@type' => 'VideoObject',
                'name' => 'Title',
                'thumbnailUrl' => 'Image',
                'uploadDate' => 'post_date',
            ],
            'breadcrumbs' => [
                'Resources' => '/resources/',
                'Blog' => '/blog/',
            ],
        ] );
        $video->meta_fields( [
            'Title' => 'text',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'SEO Image' => 'media',
            'Embed URL' => 'url',
            'Description' => 'html',
            'Content' => 'wp_editor',
            'Hidden' => 'binary',
        ] );
        if ( class_exists( 'DO_Subject' ) && class_exists( 'DO_Region' ) ) {
            $video->meta_fields( [
                'Subject' => new DO_CPT_Form_Field( 'checkbox', 'do_subject', 'post_title', 'post_name' ),
                'Region' => new DO_CPT_Form_Field( 'checkbox', 'do_region', 'post_title', 'post_name' ),
            ], 'Taxonomy' );
        }
        $video->meta_fields( [
            'Custom CTA Hide Panel' => 'binary',
            'Custom CTA' => 'do_cta_callback',
        ], 'Custom CTA' );
        $video->admin_fields( [ 'Title', 'Subject', 'Hidden', 'post_date' ] );
    }
}
$do_video = new DO_Video();