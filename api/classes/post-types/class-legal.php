<?php
class DO_Legal extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'devo_legal';
    }
    protected function post_type_args(): array {
        return [
            'labels' => [
                'name' => 'Legal',
                'menu_name' => 'Legal',
                'add_new_item' => 'Add New Legal Entry',
                'edit_item' => 'Edit Legal Entry',
                'all_items' => 'Legal Entries',
                'singular_name' => 'Legal Entry',
            ],
        ];
    }
    protected function settings(): array {
        return [
            'display_name' => 'Legal',
            'post_title' => 'Title',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'post_name' => 'Slug',
            'slug' => 'legal',
            'has_archive' => FALSE,
            'icon' => '\f334',
            'seo' => [
                'title' => 'Title',
                'description' => 'Description',
            ],
            'hide_field' => 'Hidden',
            'breadcrumbs' => [
                'Legal &amp; Privacy' => '/legal/',
            ],
            'schema' => [
                '@type' => 'ItemPage',
                'breadcrumb' => 'Breadcrumbs',
                'headline' => 'Title',
                'description' => 'Description',
            ],
        ];
    }
    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [
            'Legal' => [
                'Title' => 'text',
                'Slug' => 'varchar',
                'Effective Date' => 'date',
                'Last Updated Date' => 'date',
                'Last Updated Change' => 'varchar',
                'Description' => 'html',
                'Content' => 'wp_editor',
                'Hidden' => 'binary',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Slug', 'Hidden', 'post_date' ];
    }
}
$devo_legal = DO_Legal::get_instance();