<?php
// Simple Pages
class DO_Simple_Page {
    public function __construct() {
        $page = new DO_Custom_Post_Type( 'do_simple_page' );
        $page->settings( [
            'post_title' => 'Title',
            'post_name' => 'Slug',
            'post_thumbnail' => 'Image',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'slug' => 'page',
            'icon' => '\f105',
            'menu_position' => 10,
            'rest_slug' => 'simple-page',
            'has_archive' => FALSE,
            'seo' => [
                'title' => 'Title',
                'image' => 'SEO Image||Image',
                'description' => 'Description',
            ],
            'hide_field' => 'Hidden',
            'character_count' => [
                'Page Title' => 60,
                'Description' => 160,
            ],
            'schema' => [
                '@type' => 'WebPage',
                'headline' => 'Title',
                'image' => 'Image',
                'text' => 'Content',
            ],
        ] );
        $page->meta_fields( [
            'Title' => 'text',
            'Slug' => 'varchar',
            'Image' => 'media',
            'Image Credit' => 'varchar',
            'SEO Image' => 'media',
            'Description' => 'html',
            'Content' => 'wp_editor',
            'Hidden' => 'binary',
        ], 'Page' );
        $page->admin_fields( [ 'Title', 'Description', 'Hidden', 'post_date' ] );
    }
}
$do_page = new DO_Simple_Page();