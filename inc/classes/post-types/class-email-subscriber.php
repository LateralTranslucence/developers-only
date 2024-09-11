<?php
class DO_Email_Subscriber extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'do_email_subscriber';
    }
    protected function post_type_args(): array {
        return [
            'rewrite' => false,
        ];
    }
    protected function settings(): array {
        return [
            'display_name' => 'Site Updates Subscribers',
            'post_title' => 'Email',
            'show_in_menu' => 'edit.php?post_type=do_form',
            'noindex' => TRUE,
            'public' => FALSE,
            'has_archive' => FALSE,
        ];
    }
    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [
            ''  => [
                'Email' => 'text',
                'Active' => 'binary',
                'Frequency' => [
                    'type' => 'select',
                    'options' => [
                        'daily' => [
                            'label' => 'Daily',
                            'value' => 'daily',
                        ],
                        'weekly' => [
                            'label' => 'Weekly',
                            'value' => 'weekly',
                        ],
                        'monthly' => [
                            'label' => 'Monthly',
                            'value' => 'monthly',
                        ],
                        'unsubscribe' => [
                            'label' => 'Unsubscribed',
                            'value' => 'unsubscribe',
                        ],
                    ],
                ],
                'Subjects' => new DO_CPT_Form_Field( 'select_multiple', 'do_subject', 'post_title', 'post_name' ),
                'Data' => 'read_only_serialized',
                'Date Subscribed' => 'date_time',
                'Date Last Updated' => 'date_time',
                'Date Last Email' => 'date_time',
                'Date Unsubscribed' => 'date_time',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Frequency', 'Date Last Email', 'Active' ];
    }
}