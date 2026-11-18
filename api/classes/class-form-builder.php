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

    /* Returns the post ID when $form_id names a published devo_form post, and
     * FALSE otherwise. The public form routes take a post ID from the request,
     * so everything they read or write is gated on this: without it they would
     * read form_* meta off any post, and accept submissions to drafts. */
    public static function published_form_id( $form_id ) {
        if ( ! is_scalar( $form_id ) || ! ctype_digit( (string) $form_id ) ) {
            return FALSE;
        }
        $post = get_post( (int) $form_id );
        if ( ! $post || $post->post_type !== 'devo_form' || $post->post_status !== 'publish' || post_password_required( $post ) ) {
            return FALSE;
        }
        return (int) $post->ID;
    }

    /* The form as the front end needs it to render and submit. Deliberately
     * leaves out the notification settings (recipients, routing logic, subject,
     * confirmation copy): this goes to anonymous visitors. */
    public static function display( $form_id = FALSE ) {
        $form_id = self::published_form_id( $form_id );
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
            'hide_label' => FALSE,
            'field_type' => 'hidden',
            'label' => 'Form ID',
            'label_location' => $label_location,
            'name' => 'devo-form-id',
            'required' => FALSE,
            'options' => [],
            'settings' => [],
            'current_value' => devo_get_post_meta( $post_id, 'form_form_id' ),
        ];
        // Hidden Post ID field
        $fields['devo-form-post-id'] = [
            'hidden' => FALSE,
            'hide_label' => FALSE,
            'field_type' => 'hidden',
            'label' => 'Post ID',
            'label_location' => $label_location,
            'name' => 'devo-form-post-id',
            'required' => FALSE,
            'options' => [],
            'settings' => [],
            'current_value' => $post_id,
        ];

        // Added after the numbered fields (see below). The honeypot input is
        // rendered by the front end, and a filled one makes the submit route
        // answer with a fake success; a real field sharing its name would
        // silently discard every genuine submission.
        $reserved_names = [
            'devo-privacy-policy' => TRUE,
            'devo-form-submit' => TRUE,
            devo_form_honeypot_field() => TRUE,
        ];

        // Get the rest of the fields
        for ( $i = 1; $i <= $form_fields_count; $i++ ) {
            $field_hidden = (bool) devo_get_post_meta( $post_id, 'form_hide_field_' . $i );
            $field_type = devo_get_post_meta( $post_id, 'form_field_type_' . $i );
            $field_label = devo_get_post_meta( $post_id, 'form_label_' . $i );
            $field_hide_label = (bool) devo_get_post_meta( $post_id, 'form_hide_label_' . $i );
            $field_name = strlen( $id = devo_get_post_meta( $post_id, 'form_id_' . $i ) ) ? $id : sanitize_title_with_dashes( $field_label );
            // A field the visitor can't see can't be filled in, so it is never
            // required: otherwise every submission would fail on it.
            $field_required = ! $field_hidden && (bool) devo_get_post_meta( $post_id, 'form_required_' . $i );
            $field_options = [];
            $field_settings = [];
            switch ( $field_type ) {
                case 'button_select':
                case 'checkbox':
                case 'radio':
                case 'select':
                    $field_options_raw = is_array( $options = devo_get_post_meta( $post_id, 'form_options_' . $i ) ) ? $options : [];
                    $field_options = self::format_field_options( $field_options_raw );
                    break;
                case 'toggle':
                    $field_options_raw = is_array( $options = devo_get_post_meta( $post_id, 'form_options_' . $i ) ) ? $options : [];
                    $field_options = self::format_field_options( $field_options_raw );
                    $field_settings = self::toggle_settings( $field_options );
                    break;
                case 'range_slider':
                    $field_settings = self::range_settings(
                        devo_get_post_meta( $post_id, 'form_min_' . $i ),
                        devo_get_post_meta( $post_id, 'form_max_' . $i ),
                        devo_get_post_meta( $post_id, 'form_increment_' . $i )
                    );
                    break;
                case 'text':
                    $autocomplete = devo_get_post_meta( $post_id, 'form_autocomplete_' . $i );
                    // Only a token from the list: the stored value is
                    // whatever the admin form posted.
                    if ( is_string( $autocomplete ) && isset( self::autocomplete_options()[ $autocomplete ] ) ) {
                        $field_settings['autocomplete'] = $autocomplete;
                    }
                    break;
            }
            // Two fields with the same label and no ID would get the same
            // name, and the second replaced the first. Number the repeat
            // instead (name-2), so the first keeps the name it always had.
            // The privacy notice and submit button are added after this loop,
            // so their names are reserved up front (with the honeypot's); a
            // field called "devo-privacy-policy" used to be overwritten by the
            // notice.
            if ( isset( $fields[ $field_name ] ) || isset( $reserved_names[ $field_name ] ) ) {
                $base_name = $field_name;
                for ( $n = 2; isset( $fields[ $field_name ] ) || isset( $reserved_names[ $field_name ] ); $n++ ) {
                    $field_name = $base_name . '-' . $n;
                }
            }
            $fields[ $field_name ] = [
                'hidden' => $field_hidden,
                // The label is still rendered, for assistive tech, but
                // visually hidden (.screenReader).
                'hide_label' => $field_hide_label,
                'field_type' => $field_type,
                // Labels are stored as sanitised HTML ("R&amp;D") but only ever
                // shown as text: React text nodes, and the alert email, which
                // escapes them. The field name above still derives from the
                // stored label, so existing names don't change.
                'label' => devo_plain_text( $field_label ),
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
                'hide_label' => FALSE,
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
            'hide_label' => FALSE,
            'field_type' => 'button',
            'label' => strlen( $form_button_label = devo_plain_text( devo_get_post_meta( $post_id, 'form_submit_button_text' ) ) ) ? $form_button_label : 'Submit',
            'label_location' => $label_location,
            'name' => 'devo-form-submit',
            'required' => FALSE,
            'options' => [],
            'settings' => [],
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
                        'label' => devo_plain_text( $fieldset_title ),
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
            $label = isset( $field_option->label ) ? devo_plain_text( $field_option->label ) : '';
            $value = isset( $field_option->value ) ? $field_option->value : '';
            // Shown as text, like the label (Button Select options have one)
            $description = isset( $field_option->description ) ? devo_plain_text( $field_option->description ) : '';
            $field_options[] = [
                'label' => $label,
                'value' => $value,
                'description' => $description,
            ];
        }
        return $field_options;
    }

    /* The autocomplete tokens a Text field can carry, as select options for
     * the form builder. Keys are the HTML autocomplete tokens. Email and
     * phone fields set their own token and have no setting. */
    public static function autocomplete_options() {
        $tokens = [
            'name' => 'Full name',
            'honorific-prefix' => 'Title (Mr, Dr...)',
            'given-name' => 'First name',
            'additional-name' => 'Middle name',
            'family-name' => 'Last name',
            'honorific-suffix' => 'Suffix (Jr, PhD...)',
            'nickname' => 'Nickname',
            'organization' => 'Organization',
            'organization-title' => 'Job title',
            'street-address' => 'Street address',
            'address-line1' => 'Address line 1',
            'address-line2' => 'Address line 2',
            'address-level2' => 'City',
            'address-level1' => 'State / province',
            'postal-code' => 'Postal code',
            'country-name' => 'Country',
            'url' => 'Website',
            'bday' => 'Birthday',
            'username' => 'Username',
        ];
        $options = [];
        foreach ( $tokens as $token => $label ) {
            $options[ $token ] = [
                'label' => $label . ' (' . $token . ')',
                'value' => $token,
            ];
        }
        return $options;
    }

    /* A range slider's bounds as whole numbers, defaulting to 0-100 in steps
     * of 1. A step below 1 becomes 1, and a max below the min becomes the min,
     * which is how the browser would read them anyway.
     *
     * Each is clamped to +/- RANGE_LIMIT. Near PHP_INT_MIN or PHP_INT_MAX,
     * field_value_allowed()'s $value - $min overflowed to a float, and the
     * float modulo printed a deprecation notice. */
    const RANGE_LIMIT = 1000000000;

    public static function range_settings( $min, $max, $step ) {
        $whole = function ( $value, $default ) {
            $value = is_scalar( $value ) && preg_match( '/^\s*-?\d+\s*\z/', (string) $value ) ? (int) $value : $default;
            return max( -self::RANGE_LIMIT, min( self::RANGE_LIMIT, $value ) );
        };
        $min = $whole( $min, 0 );
        $max = max( $min, $whole( $max, 100 ) );
        $step = max( 1, $whole( $step, 1 ) );
        return [
            'min' => $min,
            'max' => $max,
            'step' => $step,
        ];
    }

    /* A toggle's off and on states, from its options: the first option is
     * off (and the default) and the second is on, as in the admin preview.
     * With a single option, that option is "on" and off sends nothing, so a
     * required toggle must be switched on (a consent switch). With none, on
     * sends "1". */
    public static function toggle_settings( $field_options ) {
        $field_options = array_values( $field_options );
        $empty = [ 'label' => '', 'value' => '' ];
        if ( count( $field_options ) >= 2 ) {
            $off = $field_options[0];
            $on = $field_options[1];
        } elseif ( count( $field_options ) === 1 ) {
            $off = $empty;
            $on = $field_options[0];
        } else {
            $off = $empty;
            $on = [ 'label' => '', 'value' => '1' ];
        }
        if ( ! strlen( (string) $on['value'] ) ) {
            $on['value'] = '1';
        }
        return [
            'off' => [ 'label' => (string) $off['label'], 'value' => (string) $off['value'] ],
            'on' => [ 'label' => (string) $on['label'], 'value' => (string) $on['value'] ],
        ];
    }

    /* Whether a submitted value is one this field can produce. A browser only
     * ever sends one of a choice field's options, or a range value on its
     * step between min and max, so anything else was made up by the client.
     * An empty value is left to the required check. Compared before
     * sanitising, against the option values exactly as they were sent to the
     * browser. */
    public static function field_value_allowed( $form_field, $raw_value ) {
        if ( ! devo_form_value_present( $raw_value ) ) {
            return TRUE;
        }
        $type = isset( $form_field['field_type'] ) ? $form_field['field_type'] : '';
        switch ( $type ) {
            case 'button_select':
            case 'radio':
            case 'select':
                if ( ! is_string( $raw_value ) ) {
                    return FALSE;
                }
                foreach ( $form_field['options'] as $option ) {
                    if ( (string) $option['value'] === $raw_value ) {
                        return TRUE;
                    }
                }
                return FALSE;
            case 'toggle':
                $settings = $form_field['settings'];
                return is_string( $raw_value ) && in_array( $raw_value, [ $settings['off']['value'], $settings['on']['value'] ], TRUE );
            case 'range_slider':
                // \z, not $: $ also matches before a final newline, so "5\n"
                // passed and was stored
                if ( ! is_string( $raw_value ) || ! preg_match( '/^-?\d+\z/', $raw_value ) ) {
                    return FALSE;
                }
                $settings = $form_field['settings'];
                $value = (int) $raw_value;
                return $value >= $settings['min'] && $value <= $settings['max'] && ( $value - $settings['min'] ) % $settings['step'] === 0;
        }
        return TRUE;
    }
}
$forms = DO_Form_Builder::get_instance();