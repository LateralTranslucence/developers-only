<?php
class DO_Blog extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'do_blog';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [
            'post_title' => 'Title',
            'post_name' => 'Title',
            'post_thumbnail' => 'Image',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'slug' => 'blog',
            //'show_in_menu' => 'resources',
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
        ];
    }
    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [
            'Blog Post' => [
                'Title' => 'text',
                'Image' => 'media',
                'Image Credit' => 'varchar',
                'SEO Image' => 'media',
                'Description' => 'html',
                'Content' => 'wp_editor',
                'Author' => 'varchar',
                'Hidden' => 'binary',
            ],
            // 'Taxonomy' => [
            //     'Subject' => new DO_CPT_Form_Field( 'checkbox', 'do_subject', 'post_title', 'post_name' ),
            //     'Region' => new DO_CPT_Form_Field( 'checkbox', 'do_region', 'post_title', 'post_name' ),
            // ],
            'Custom CTA' => [
                'Custom CTA Hide Panel' => 'binary',
                'Custom CTA' => 'do_cta_callback',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Subject', 'Hidden', 'post_date' ];
    }
}
$DO_Blog = DO_Blog::get_instance();