<?php
/*
 * Form Builder
 *
 */

class DO_Form_Builder {
    public $form_submitted;
    private $default_submitted_message;

    public function __construct() {
        global $do_forms;
        $do_forms = $this;
        $this->default_submitted_message = "Thank you for reaching out, we'll be in touch soon.";
        // Actions/Filters
        add_action( 'after_setup_theme', [ $this, 'post_type' ], 3 );
    }
    public function post_type() {
        $forms = new DO_Custom_Post_Type( 'do_form' );
        $forms->settings( [
            'icon' => '\f175',
            'display_name' => 'Forms',
            'post_title' => 'Form Name',
            'post_name' => 'Form ID',
            'slug' => 'form',
            'restrict_users' => [ 'administrator' ],
            'has_archive' => FALSE,
            'menu_position' => 40,
            'notes' => [
                'Email Submissions To' => 'Comma-separated list of email addresses.',
                'Field IDs' => 'Comma-separated list of field IDs.',
                'Thank You Redirect' => 'Can only be an internal URL.'
            ],
            'schema' => 'ContactPage',
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
        ] );
        $forms->meta_fields( [
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
        ], 'Admin' );
        $forms->meta_fields( [
            //'Repopulate?' => 'binary',
            'Auto-update?' => 'binary',
            'Thank You Text' => 'html',
            'Thank You Redirect' => 'url',
        ], 'onSubmit' );
        $forms->meta_fields( [
            'Email Submissions To' => 'textarea',
            'Email Subject' => 'text',
            'Email Confirmation' => 'textarea',
        ], 'Submissions' );
        $forms->meta_fields( [
            'Fieldset' => [
                'type' => 'multi_array',
                'fields' => [
                    'Fieldset Title' => 'text',
                    'Field IDs' => 'textarea',
                ],
            ],
        ], 'Fieldsets' );
        $forms->meta_fields( [
            'Hide Field' => 'binary',
            'Field Type' => [
                'type' => 'select',
                'options' => [
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
        ], 'Field' );
        $forms->admin_fields( [ 'Title', 'Form ID', 'post_date' ] );

        $submissions = new DO_Custom_Post_Type( 'do_form_submission' );
        $submissions->settings( [
            'display_name' => 'Submissions',
            'post_title' => 'Email',
            'show_in_menu' => 'edit.php?post_type=do_form',
            'restrict_users' => [ 'administrator' ],
            'has_archive' => FALSE,
        ] );
        $submissions->meta_fields( [
            'Email' => 'text',
            'Form ID' => 'read_only',
            'Data' => 'read_only_serialized',
        ] );
        $submissions->admin_fields( [ 'Title', 'Form ID', 'post_date' ] );
    }

    public function display( $form_id = FALSE ) {
        if ( ! $form_id ) {
            return;
        }
        $form = [
            'id' => do_get_post_meta( $form_id, 'form_form_id' ),
            'name' => do_get_post_meta( $form_id, 'form_form_name' ),
            'post_id' => $form_id,
            'submitted' => isset( $_POST ) && count( $_POST ),
            'error' => isset( $_POST['missing_fields'] ),
            'autoupdate' => (bool) do_get_post_meta( $form_id, 'form_autoupdate' ) && $this->form_submitted,
            'thank_you_message' => strlen( $thank_you = do_get_post_meta( $form_id, 'form_thank_you_text' ) ) ? __( $thank_you, 'developers_only' ) : __( $this->default_submitted_message, 'developers_only' ),
            'thank_you_redirect' => do_get_post_meta( $form_id, 'form_thank_you_redirect' ),
            'submissions_email_to' => do_get_post_meta( $form_id, 'form_email_submissions_to' ),
            'submissions_email_subject' => do_get_post_meta( $form_id, 'form_email_subject' ),
            'submissions_email_confirmation_copy' => do_get_post_meta( $form_id, 'form_email_confirmation' ),
            'missing_fields' => [],
        ];
        $form_items = $this->form_items( $form_id );
        // If we're auto-updating, hide the submit button
        if ( $form['autoupdate'] === TRUE ) {
            $form_items['do-form-submit']['field_type'] = 'hidden';
        }
        $form['items'] = $form_items;
        return $form;
    }

    public function form_items( $post_id ) {
        if ( ! $post_id ) {
            return;
        }
        $raw_form_fields = $this->get_fields( $post_id );
        $raw_fieldsets = $this->get_fieldsets( $post_id );
        $form_items = $this->organize_fields( $raw_form_fields, $raw_fieldsets );

        return $form_items;
    }

    /*
     * HELPERS
     */

    public function get_fields( $post_id ) {
        $form_fields_count = (int) do_get_post_meta( $post_id, 'form_field_count' );
        $label_location = strlen( $label_location = do_get_post_meta( $post_id, 'form_field_label_location' ) ) ? $label_location : 'inside';
        $show_privacy_policy = (bool) do_get_post_meta( $post_id, 'form_privacy_policy' );
        $fields = [];

        // Hidden form ID field
        $fields['do-form-id'] = [
            'hidden' => FALSE,
            'field_type' => 'hidden',
            'label' => 'Form ID',
            'label_location' => $label_location,
            'name' => 'do-form-id',
            'required' => FALSE,
            'options' => [],
            'current_value' => do_get_post_meta( $post_id, 'form_form_id' ),
        ];
        // Hidden Post ID field
        $fields['do-form-post-id'] = [
            'hidden' => FALSE,
            'field_type' => 'hidden',
            'label' => 'Post ID',
            'label_location' => $label_location,
            'name' => 'do-form-post-id',
            'required' => FALSE,
            'options' => [],
            'current_value' => $post_id,
        ];

        // Get the rest of the fields
        for ( $i = 1; $i <= $form_fields_count; $i++ ) {
            $field_hidden = (bool) do_get_post_meta( $post_id, 'form_hide_field_' . $i );
            $field_type = do_get_post_meta( $post_id, 'form_field_type_' . $i );
            $field_label = do_get_post_meta( $post_id, 'form_label_' . $i );
            $field_hide_label = (bool) do_get_post_meta( $post_id, 'form_hide_label_' . $i );
            $field_name = strlen( $id = do_get_post_meta( $post_id, 'form_id_' . $i ) ) ? $id : sanitize_title_with_dashes( $field_label );
            $field_required = (bool) do_get_post_meta( $post_id, 'form_required_' . $i );
            $field_options = [];
            $field_settings = [];
            switch ( $field_type ) {
                case 'button_select':
                case 'checkbox':
                case 'radio':
                case 'select':
                case 'toggle':
                    $field_options_raw = is_array( $options = do_get_post_meta( $post_id, 'form_options_' . $i ) ) ? $options : [];
                    $field_options = $this->format_field_options( $field_options_raw );
                    break;
                case 'range_slider':
                    $field_options_raw = is_array( $options = do_get_post_meta( $post_id, 'form_options_' . $i ) ) ? $options : [];
                    $field_max = strlen( $max = do_get_post_meta( $post_id, 'form_max_' . $i ) ) ? $max : 100;
                    $field_min = strlen( $min = do_get_post_meta( $post_id, 'form_min_' . $i ) ) ? $min : 0;
                    $field_increment = strlen( $increment = do_get_post_meta( $post_id, 'form_increment_' . $i ) ) ? $increment : 1;
                    $field_options = [
                        'settings' => [
                            'min' => $field_min,
                            'max' => $field_max,
                            'increment' => $field_increment,
                        ],
                    ];
                    break;
            }
            $fields[ $field_name ] = [
                'hidden' => $field_hidden,
                'field_type' => $field_type,
                'label' => $field_label,
                'label_location' => $label_location,
                'name' => $field_name,
                'required' => $field_required,
                'options' => $field_options,
                'settings' => $field_settings,
                'current_value' => '',
            ];
        }
        if ( $show_privacy_policy ) {
            $fields['do-privacy-policy'] = [
                'hidden' => FALSE,
                'field_type' => 'privacy_policy',
                'label' => '',
                'label_location' => 'outside',
                'name' => 'privacy-policy',
                'required' => FALSE,
                'options' => [],
                'settings' => [],
                'current_value' => '',
            ];
        }
        // Submit button
        $fields['do-form-submit'] = [
            'hidden' => FALSE,
            'field_type' => 'button',
            'label' => strlen( $form_button_label = do_get_post_meta( $post_id, 'form_submit_button_text' ) ) ? $form_button_label : 'Submit',
            'label_location' => $label_location,
            'name' => 'do-form-submit',
            'required' => FALSE,
            'options' => [],
            'current_value' => 'submit',
        ];

        return $fields;
    }

    public function get_fieldsets( $post_id ) {
        $fieldsets = [];
        $fieldset_field_raw = is_array( $fieldset_options = do_get_post_meta( $post_id, 'form_fieldset' ) ) ? $fieldset_options : [];
        foreach ( $fieldset_field_raw as $fieldset_field_array ) {
            $label = current( $fieldset_field_array );
            $values =  explode(',', end( $fieldset_field_array ) );
            $fieldsets[ $label ] = $values;
        }
        return $fieldsets;
    }

    public function organize_fields( $fields, $fieldsets ) {
        $form_fields = [];
        // Create $fieldset_fields lookup array
        $fieldset_fields = [];
        foreach ( $fieldsets as $fieldset_label => $fieldset_values ) {
            foreach ( $fieldset_values as $value ) {
                $fieldset_fields[ $value ] = $fieldset_label;
            }
        }
        // Organize the fields
        foreach ( $fields as $field_name => $form_field ) {
            // If this field is in a fieldset
            if ( isset( $fieldset_fields[ $field_name ] ) ) {
                $fieldset_title = $fieldset_fields[ $field_name ];
                // If this field doesn't already exist
                if ( ! isset( $form_fields[ $fieldset_title ] ) ) {
                    $fieldset = [
                        'item_type' => 'fieldset',
                        'label' => $fieldset_title,
                        'fields' => [],
                    ];
                    foreach ( $fieldsets[ $fieldset_title ] as $fieldset_field_name ) {
                        $fieldset['fields'][ $fieldset_field_name ] = $fields[ $fieldset_field_name ];
                    }
                    $form_fields[ $fieldset_title ] = $fieldset;
                }
            }
            // If the field is NOT in a fieldset
            else {
                $form_field['item_type'] = 'field';
                $form_fields[ $field_name ] = $form_field;
            }
        }
        return $form_fields;
    }

    private function format_field_options( $field_options_raw ) {
        $field_options = [];
        foreach ( $field_options_raw as $field_option ) {
            $label = isset( $field_option['label'] ) ? $field_option['label'] : '';
            $value = isset( $field_option['value'] ) ? $field_option['value'] : '';
            $description = isset( $field_option['description'] ) ? $field_option['description'] : '';
            $field_options[] = [
                'label' => $label,
                'value' => $value,
                'description' => $description,
            ];
        }
        return $field_options;
    }
}
$forms = new DO_Form_Builder();