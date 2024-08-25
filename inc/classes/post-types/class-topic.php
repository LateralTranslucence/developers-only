<?php
// Topics
class DO_Topic {
    public function __construct() {
        $topic = new DO_Custom_Post_Type( 'do_topic' );
        $topic->settings( [
            'display_name' => 'Topic',
            'post_title' => 'Page Title',
            'post_name' => 'Page Title',
            'post_thumbnail' => 'Image',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'slug' => 'topic',
            'show_in_menu' => 'resources',
            'dynamic_interface' => [
                'settings' => [
                    'type' => 'array',
                    //'nested' => 'Panel Type',
                    'default_meta_boxes' => [ 'Topic Page', 'Taxonomy', 'Custom CTA' ],
                    'dynamic_meta_box' => 'Section',
                    'dynamic_meta_box_title_field' => 'Title',
                ],
            ],
            'seo' => [
                'title' => 'Page Title',
                'image' => 'SEO Image||Image',
                'description' => 'Description',
            ],
            'bonus_fields' => [
                'subject' => 'topic_subject',
                'region' => 'topic_region',
            ],
            'hide_field' => 'Hidden',
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
            ],
            'onsave_callback' => [ $this, 'onsave' ],
        ] );
        $topic->meta_fields( [
            'Page Title' => 'text',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'SEO Image' => 'media',
            'Description' => 'html',
            'Hidden' => 'binary',
        ], 'Topic Page' );
        if ( class_exists( 'DO_Subject' ) && class_exists( 'DO_Region' ) ) {
            $topic->meta_fields( [
                'Subject' => new DO_CPT_Form_Field( 'checkbox', 'do_subject', 'post_title', 'post_name' ),
                'Region' => new DO_CPT_Form_Field( 'checkbox', 'do_region', 'post_title', 'post_name' ),
            ], 'Taxonomy' );
        }
        $topic->meta_fields( [
            'Title' => 'text',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'Content' => 'wp_editor',
        ], 'Section' );
        $topic->meta_fields( [
            'Custom CTA Hide Panel' => 'binary',
            'Custom CTA' => 'do_cta_callback',
        ], 'Custom CTA' );
        $topic->admin_fields( [ 'Title', 'Description', 'Hidden', 'post_date' ] );
    }

    public function onsave( $POST, $cpt_object ) {
        global $wpdb;
        $content = '';
        foreach ( $POST as $key => $value ) {
            if ( strpos( $key, 'topic_title' ) !== FALSE ) {
                $content .= '<h2>' . $value . '</h2>';
            }
            if ( strpos( $key, 'topic_content' ) !== FALSE ) {
                $content .= do_autop( $value );
            }
        }
        if ( strlen( $content ) ) {
            $wpdb->update( 
                // Table
                $wpdb->posts,
                // Data $column => $value
                [
                    'post_content' => $content,
                ],
                // Where $column => $value
                [ 'ID' => (int) $POST[ 'post_ID' ] ],
            );
        }
        return $POST;
    }
}
$do_topic = new DO_Topic();