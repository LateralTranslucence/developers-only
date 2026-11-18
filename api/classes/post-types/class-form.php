<?php
class DO_Form extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'devo_form';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [
            'icon' => '\f175',
            'display_name' => 'Forms',
            'post_title' => 'Form Name',
            'post_name' => 'Form ID',
            'slug' => 'form',
            'restrict_users' => [ 'administrator' ],
            'has_archive' => FALSE,
            'menu_position' => 40,
            'notes' => [
                'Email Submissions To' => 'Comma-separated list of email addresses. Also used when Email Submissions Logic matches no value.',
                'Field IDs' => 'Comma-separated list of field IDs.',
                'Thank You Redirect' => 'Can only be an internal URL.'
            ],
            'schema' => 'ContactPage',
            // Routing and notification settings are for staff only; never send
            // them to the browser.
            'private_fields' => [
                'Email Submissions To',
                'Email Submissions Logic',
                'Email Subject',
                'Email Confirmation',
            ],
            'dynamic_interface' => [
                'settings' => [
                    'type' => 'array',
                    'nested' => 'Field Type',
                    'default_meta_boxes' => [ 'Admin', 'onSubmit', 'Submissions' ],
                    'dynamic_meta_box' => 'Field',
                    'dynamic_meta_box_title_field' => 'Label',
                ],
                'field_configuration' => [
                    'Field Type' => [
                        'binary' => [],
                        'button_select' => [
                            'Options' => [
                                'type' => 'multi_array',
                                'fields' => [
                                    'Label' => 'text',
                                    'Value' => 'varchar',
                                    'Description' => 'text',
                                ],
                            ],
                        ],
                        'checkbox' => [
                            'Options' => [
                                'type' => 'multi_array',
                                'fields' => [
                                    'Label' => 'text',
                                    'Value' => 'varchar',
                                ],
                            ],
                        ],
                        'email' => [],
                        'hidden' => [],
                        'radio' => [
                            'Options' => [
                                'type' => 'multi_array',
                                'fields' => [
                                    'Label' => 'text',
                                    'Value' => 'varchar',
                                ],
                            ],
                        ],
                        'range_slider' => [
                            'Min' => 'int',
                            'Max' => 'int',
                            'Increment' => 'int',
                        ],
                        'select' => [
                            'Options' => [
                                'type' => 'multi_array',
                                'fields' => [
                                    'Label' => 'text',
                                    'Value' => 'varchar',
                                ],
                            ],
                        ],
                        'text' => [],
                        'textarea' => [],
                        'toggle' => [
                            'Options' => [
                                'type' => 'multi_array',
                                'fields' => [
                                    'Label' => 'text',
                                    'Value' => 'varchar',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];
    }
    protected function meta_fields(): array {
        global $wp_roles;
        return [
            'Admin' => [
                'Form Name' => 'text',
                'Form ID' => 'varchar',
                'Field Label Location' => [
                    'type' => 'select',
                    'options' => [
                        'inside' => [
                            'label' => 'Inside (default)',
                            'value' => 'inside',
                        ],
                        'outside' => [
                            'label' => 'Outside',
                            'value' => 'outside',
                        ],
                    ],
                ],
                'Submit Button Text' => 'text',
                'Privacy Policy' => 'binary',
            ],
            'onSubmit' => [
                //'Repopulate?' => 'binary',
                'Auto-update?' => 'binary',
                'Thank You Text' => 'html',
                'Thank You Redirect' => 'url',
            ],
            'Submissions' => [
                'Email Submissions To' => 'textarea',
                'Email Submissions Logic' => [
                    'type' => 'multi',
                    'fields' => [
                        'Field ID' => 'varchar',
                        'Map' => [
                            'type' => 'multi_array',
                            'fields' => [
                                'Value' => 'varchar',
                                'Email Addresses' => 'textarea',
                            ],
                        ],
                    ],
                ],
                'Email Subject' => 'text',
                'Email Confirmation' => 'textarea',
            ],
            'Fieldsets' => [
                'Fieldset' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Fieldset Title' => 'text',
                        'Field IDs' => 'textarea',
                    ],
                ],
            ],
            'Field' => [
                'Hide Field' => 'binary',
                'Field Type' => [
                    'type' => 'select',
                    'options' => [
                        'binary' => [
                            'label' => 'Binary',
                            'value' => 'binary',
                        ],
                        'button_select' => [
                            'label' => 'Button Select',
                            'value' => 'button_select',
                        ],
                        'checkbox' => [
                            'label' => 'Checkboxes',
                            'value' => 'checkbox',
                        ],
                        'email' => [
                            'label' => 'Email Address',
                            'value' => 'email',
                        ],
                        'hidden' => [
                            'label' => 'Hidden',
                            'value' => 'hidden',
                        ],
                        'Phone' => [
                            'label' => 'Phone Number',
                            'value' => 'phone',
                        ],
                        'radio' => [
                            'label' => 'Radio Buttons',
                            'value' => 'radio',
                        ],
                        'range_slider' => [
                            'label' => 'Range Slider',
                            'value' => 'range_slider',
                        ],
                        'select' => [
                            'label' => 'Select',
                            'value' => 'select',
                        ],
                        'text' => [
                            'label' => 'Text',
                            'value' => 'text',
                        ],
                        'textarea' => [
                            'label' => 'Text Area',
                            'value' => 'textarea',
                        ],
                        'toggle' => [
                            'label' => 'Toggle',
                            'value' => 'toggle',
                        ],
                    ],
                ],
                'Label' => 'text',
                'ID' => 'varchar',
                'Required' => 'binary',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Form ID', 'post_date' ];
    }
}