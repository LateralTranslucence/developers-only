<?php
// Custom CTA Repository
class DO_CTA extends DO_Custom_Post_Type {
    protected function post_type() {
        return 'do_cta';
    }
    protected function post_type_args() {
        return [];
    }
    protected function settings() {
        return [
            'display_name' => 'CTA Repository',
            'slug' => 'cta',
            'post_title' => 'Title',
            'post_name' => 'Title',
            'post_thumbnail' => 'Image',
            'post_content' => 'Content',
            'post_excerpt' => 'Content',
            'has_archive' => FALSE,
            //'show_in_menu' => 'resources',
            'noindex' => TRUE,
            'seo' => [
                'title' => 'Title',
                'image' => 'Image',
                'description' => 'Content',
            ],
            'hide_field' => 'Hidden',
            'meta_prefix' => 'cta',
        ];
    }
    protected function meta_fields() {
        return [ 
            [
                'Title' => 'text',
                'Image' => 'media',
                'Content' => 'wp_editor',
                'CTA' => 'cta',
                'Hidden' => 'binary',
            ],
        ];
    }
    protected function admin_fields() {
        return [ 'Title', 'Hidden', 'post_date' ];
    }
}
$do_cta = new DO_CTA();