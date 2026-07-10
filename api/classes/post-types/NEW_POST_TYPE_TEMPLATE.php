<?php
class DO_POST_TYPE extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return '';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [];
    }
    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [];
    }
    protected function admin_fields(): array {
        return [];
    }
}
$devo_post_type = DO_POST_TYPE::get_instance();