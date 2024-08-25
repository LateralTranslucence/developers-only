<?php
// Blogs
class DO_Blog {
    public function __construct() {
        $blog = new DO_Custom_Post_Type( 'do_blog' );
        $blog->settings( [
            'post_title' => 'Title',
            'post_name' => 'Title',
            'post_thumbnail' => 'Image',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'slug' => 'blog',
            'show_in_menu' => 'resources',
            'has_archive' => TRUE,
            'seo' => [
                'title' => 'Title',
                'image' => 'SEO Image||Image',
                'description' => 'Description',
            ],
            'bonus_fields' => [
                'subject' => 'blog_subject',
                'region' => 'blog_region',
            ],
            'hide_field' => 'Hidden',
            'character_count' => [
                'Page Title' => 60,
                'Description' => 160,
            ],
            'schema' => [
                '@type' => 'BlogPosting',
                'headline' => 'Title',
                'image' => 'Image',
                'text' => 'Content',
            ],
            'breadcrumbs' => [
                'Resources' => '/resources/',
                'Blog' => '/blog/',
            ],
        ] );
        $blog->meta_fields( [
            'Title' => 'text',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'SEO Image' => 'media',
            'Description' => 'html',
            'Content' => 'wp_editor',
            'Author' => 'varchar',
            'Hidden' => 'binary',
        ], 'Blog Post' );
        if ( class_exists( 'DO_Subject' ) && class_exists( 'DO_Region' ) ) {
            $blog->meta_fields( [
                'Subject' => new DO_CPT_Form_Field( 'checkbox', 'do_subject', 'post_title', 'post_name' ),
                'Region' => new DO_CPT_Form_Field( 'checkbox', 'do_region', 'post_title', 'post_name' ),
            ], 'Taxonomy' );
        }
        $blog->meta_fields( [
            'Custom CTA Hide Panel' => 'binary',
            'Custom CTA' => 'do_cta_callback',
        ], 'Custom CTA' );
        $blog->admin_fields( [ 'Title', 'Subject', 'Hidden', 'post_date' ] );
    }
}
$do_blog = new DO_Blog();