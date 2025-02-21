<?php

// White Papers
class DO_Report {
    public function __construct() {
        $white_paper = new DO_Custom_Post_Type( 'do_white_paper' );
        $white_paper->settings( [
            'display_name' => 'Report',
            'slug' => 'report',
            'post_title' => 'Title',
            'post_name' => 'Title',
            'post_thumbnail' => 'Image',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'post_file' => 'File',
            'has_archive' => FALSE,
            //'show_in_menu' => 'resources',
            'seo' => [
                'title' => 'Title',
                'image' => 'SEO Image||Image',
                'description' => 'Description',
            ],
            'bonus_fields' => [
                'subject' => 'report_subject',
                'region' => 'report_region',
            ],
            'hide_field' => 'Hidden',
            'character_count' => [
                'Title' => 60,
                'Description' => 160,
            ],
            'schema' => [
                '@type' => 'Article',
                'headline' => 'Title',
                'image' => 'Image',
                'text' => 'Content',
            ],
            'gated' => TRUE,
            'breadcrumbs' => [
                'Resources' => '/resources/',
                'Reports' => '/report/',
            ],
        ] );
        $white_paper->meta_fields( [
            'Title' => 'text',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'SEO Image' => 'media',
            'Cover' => 'media',
            'Description' => 'html',
            'Content' => 'wp_editor',
            'File' => 'media',
            'Download Button Text' => 'varchar',
            'Hidden' => 'binary',
        ] );
        if ( class_exists( 'DO_Subject' ) && class_exists( 'DO_Region' ) ) {
            $white_paper->meta_fields( [
                'Subject' => new DO_CPT_Form_Field( 'checkbox', 'do_subject', 'post_title', 'post_name' ),
                'Region' => new DO_CPT_Form_Field( 'checkbox', 'do_region', 'post_title', 'post_name' ),
            ], 'Taxonomy' );
        }
        $white_paper->meta_fields( [
            'Custom CTA Hide Panel' => 'binary',
            'Custom CTA' => 'do_cta_callback',
        ], 'Custom CTA' );
        $white_paper->admin_fields( [ 'Title', 'Subject', 'Hidden', 'post_date' ] );
    }
}
$do_report = new DO_Report();