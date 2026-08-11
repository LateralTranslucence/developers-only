<?php
/*
 * Form Builder
 *
 */
include locate_template( '/api/classes/post-types/class-form.php' );
include locate_template( '/api/classes/post-types/class-form-submission.php' );

class DO_Form_Builder {
    private static $instance;

    private function __construct() {
        // Actions/Filters
        add_action( 'after_setup_theme', [ 'DO_Form_Builder', 'post_types' ], 3 );
    }

    /* Fallback message shown after a successful submission when a form does not
     * define its own. This is a method rather than a static property so the
     * string reaches __() as a literal - a variable can't be extracted into the
     * POT - and so it is translated on use, after the textdomain has loaded. */
    private static function default_submitted_message() {
        return __( "Thank you for reaching out, we'll be in touch soon.", 'developers_only' );
    }

    public static function get_instance() {
        if ( ! self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public static function post_types() {
        $form = DO_Form::get_instance();
        $form_submission = DO_Form_Submission::get_instance();
    }

    public static function display( $form_id = FALSE ) {
        if ( ! $form_id ) {
            return;
        }
        $form = [
            'id' => devo_get_post_meta( $form_id, 'form_form_id' ),
            'name' => devo_get_post_meta( $form_id, 'form_form_name' ),
            'post_id' => $form_id,
            'submitted' => isset( $_POST ) && count( $_POST ),
            'error' => isset( $_POST['missing_fields'] ),
            'autoupdate' => (bool) devo_get_post_meta( $form_id, 'form_autoupdate' ),
            'thank_you_message' => strlen( $thank_you = devo_get_post_meta( $form_id, 'form_thank_you_text' ) ) ? $thank_you : self::default_submitted_message(),
            'thank_you_redirect' => devo_get_post_meta( $form_id, 'form_thank_you_redirect' ),
            'submissions_email_to' => devo_get_post_meta( $form_id, 'form_email_submissions_to' ),
            'submissions_email_logic' => devo_get_post_meta( $form_id, 'form_email_submissions_logic' ),
            'submissions_email_subject' => devo_get_post_meta( $form_id, 'form_email_subject' ),
            'submissions_email_confirmation_copy' => devo_get_post_meta( $form_id, 'form_email_confirmation' ),
            'missing_fields' => [],
            // Resolved server-side so the rendered input always matches what the
            // submit route checks, even when the devo_form_honeypot_field filter
            // has changed the name.
            'honeypot_field' => devo_form_honeypot_field(),
            'notice' => NULL,
            'items' => [],
        ];
        $form_items = self::form_items( $form_id );
        // If we're auto-updating, hide the submit button
        if ( $form['autoupdate'] === TRUE ) {
            $form_items['devo-form-submit']['field_type'] = 'hidden';
        }
        $form['items'] = $form_items;
        return $form;
    }

    public static function form_items( $post_id ) {
        if ( ! $post_id ) {
            return;
        }
        $raw_form_fields = self::get_fields( $post_id );
        $raw_fieldsets = self::get_fieldsets( $post_id );
        $form_items = self::organize_fields( $raw_form_fields, $raw_fieldsets );

        return $form_items;
    }

    /*
     * HELPERS
     */

    public static function get_fields( $post_id ) {
        $form_fields_count = (int) devo_get_post_meta( $post_id, 'form_field_count' );
        $label_location = strlen( $label_location = devo_get_post_meta( $post_id, 'form_field_label_location' ) ) ? $label_location : 'inside';
        $show_privacy_policy = (bool) devo_get_post_meta( $post_id, 'form_privacy_policy' );
        $fields = [];

        // Hidden form ID field
        $fields['devo-form-id'] = [
            'hidden' => FALSE,
            'field_type' => 'hidden',
            'label' => 'Form ID',
            'label_location' => $label_location,
            'name' => 'devo-form-id',
            'required' => FALSE,
            'options' => [],
            'current_value' => devo_get_post_meta( $post_id, 'form_form_id' ),
        ];
        // Hidden Post ID field
        $fields['devo-form-post-id'] = [
            'hidden' => FALSE,
            'field_type' => 'hidden',
            'label' => 'Post ID',
            'label_location' => $label_location,
            'name' => 'devo-form-post-id',
            'required' => FALSE,
            'options' => [],
            'current_value' => $post_id,
        ];

        // Get the rest of the fields
        for ( $i = 1; $i <= $form_fields_count; $i++ ) {
            $field_hidden = (bool) devo_get_post_meta( $post_id, 'form_hide_field_' . $i );
            $field_type = devo_get_post_meta( $post_id, 'form_field_type_' . $i );
            $field_label = devo_get_post_meta( $post_id, 'form_label_' . $i );
            $field_hide_label = (bool) devo_get_post_meta( $post_id, 'form_hide_label_' . $i );
            $field_name = strlen( $id = devo_get_post_meta( $post_id, 'form_id_' . $i ) ) ? $id : sanitize_title_with_dashes( $field_label );
            $field_required = (bool) devo_get_post_meta( $post_id, 'form_required_' . $i );
            $field_options = [];
            $field_settings = [];
            switch ( $field_type ) {
                case 'button_select':
                case 'checkbox':
                case 'radio':
                case 'select':
                case 'toggle':
                    $field_options_raw = is_array( $options = devo_get_post_meta( $post_id, 'form_options_' . $i ) ) ? $options : [];
                    $field_options = self::format_field_options( $field_options_raw );
                    break;
                case 'range_slider':
                    $field_options_raw = is_array( $options = devo_get_post_meta( $post_id, 'form_options_' . $i ) ) ? $options : [];
                    $field_max = strlen( $max = devo_get_post_meta( $post_id, 'form_max_' . $i ) ) ? $max : 100;
                    $field_min = strlen( $min = devo_get_post_meta( $post_id, 'form_min_' . $i ) ) ? $min : 0;
                    $field_increment = strlen( $increment = devo_get_post_meta( $post_id, 'form_increment_' . $i ) ) ? $increment : 1;
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
            $fields['devo-privacy-policy'] = [
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
        $fields['devo-form-submit'] = [
            'hidden' => FALSE,
            'field_type' => 'button',
            'label' => strlen( $form_button_label = devo_get_post_meta( $post_id, 'form_submit_button_text' ) ) ? $form_button_label : 'Submit',
            'label_location' => $label_location,
            'name' => 'devo-form-submit',
            'required' => FALSE,
            'options' => [],
            'current_value' => 'submit',
        ];

        return $fields;
    }

    public static function get_fieldsets( $post_id ) {
        $fieldsets = [];
        $fieldset_field_raw = is_array( $fieldset_options = devo_get_post_meta( $post_id, 'form_fieldset' ) ) ? $fieldset_options : [];
        foreach ( $fieldset_field_raw as $fieldset_field_array ) {
            $label = current( $fieldset_field_array );
            $values =  explode(',', end( $fieldset_field_array ) );
            $fieldsets[ $label ] = $values;
        }
        return $fieldsets;
    }

    public static function organize_fields( $fields, $fieldsets ) {
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

    private static function format_field_options( $field_options_raw ) {
        $field_options = [];
        foreach ( $field_options_raw as $field_option ) {
            $label = isset( $field_option->label ) ? $field_option->label : '';
            $value = isset( $field_option->value ) ? $field_option->value : '';
            $description = isset( $field_option->description ) ? $field_option->description : '';
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