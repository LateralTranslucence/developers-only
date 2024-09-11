<?php
/*
 * Form Builder
 *
 */
include locate_template( '/inc/classes/post-types/class-form.php' );
include locate_template( '/inc/classes/post-types/class-form-submission.php' );

class DO_Form_Builder {
    private static $instance;
    public $form_submitted;
    private $default_submitted_message;

    private function __construct() {
        $this->default_submitted_message = "Thank you for reaching out, we'll be in touch soon.";
        // Actions/Filters
        add_action( 'after_setup_theme', [ $this, 'post_types' ], 3 );
    }

    public static function get_instance() {
        if ( ! self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function post_types() {
        $form = DO_Form::get_instance();
        $form_submission = DO_Form_Submission::get_instance();
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
            'items' => [],
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
$forms = DO_Form_Builder::get_instance();