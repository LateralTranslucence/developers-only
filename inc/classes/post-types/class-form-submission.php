<?php
class DO_Form_Submission extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'do_form_submission';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [
            'display_name' => 'Submissions',
            'post_title' => 'Email',
            'show_in_menu' => 'edit.php?post_type=do_form',
            'restrict_users' => [ 'administrator' ],
            'has_archive' => FALSE,
        ];
    }
    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [
            '' => [
                'Email' => 'text',
                'Form ID' => 'read_only',
                'Data' => 'read_only_json',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Form ID', 'post_date' ];
    }
}