<?php
class DO_Simple_Page extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'devo_simple_page';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [
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
        ];
    }
    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [
            'Page' => [
                'Title' => 'text',
                'Slug' => 'varchar',
                'Image' => 'media',
                'Image Credit' => 'varchar',
                'SEO Image' => 'media',
                'Description' => 'html',
                'Content' => 'wp_editor',
                'Hidden' => 'binary',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Description', 'Hidden', 'post_date' ];
    }
}
$devo_page = DO_Simple_Page::get_instance();