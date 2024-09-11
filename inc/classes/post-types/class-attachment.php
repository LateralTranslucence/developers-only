<?php
class DO_Attachment extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'attachment';
    }
    protected function post_type_args(): array {
        return [ 
            'rewrite' => [ 
                'slug' => 'media' 
            ] 
        ];
    }
    protected function settings(): array {
        return [
            'noindex' => TRUE,
            'has_archive' => FALSE,
            'schema' => [
                '@type' => 'MediaObject',
            ]
        ];
    }
    protected function meta_fields(): array {
        return [];
    }
    protected function admin_fields(): array {
        return [];
    }
}
$DO_Attachment = DO_Attachment::get_instance();