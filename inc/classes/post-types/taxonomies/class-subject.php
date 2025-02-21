<?php
class DO_Subject extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'do_subject';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [
            'post_title' => 'Title',
            'post_name' => 'Slug',
            'has_archive' => FALSE,
            'noindex' => TRUE,
            'show_in_menu' => 'taxonomy',
            'show_in_admin_bar' => FALSE,
            'seo' => [
                'title' => 'Title',
                'description' => 'Description',
            ],
            'restrict_users' => [ 'administrator' ],
            'hide_field' => 'Hidden',
        ];
    }
    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [
            '' => [
                'Title' => 'text',
                'Slug' => 'varchar',
                'Description' => 'textarea',
                'Hidden' => 'binary',
            ]
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Slug', 'Description', 'Active' ];
    }
}
$do_subject = DO_Subject::get_instance();