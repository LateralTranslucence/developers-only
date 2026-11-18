<?php

class DO_Form_Field_Display {
    private $brackets;
    private $disabled;
    private $field_id;
    private $field_key;
    private $field_name;
    private $field_options;
    private $footnote;
    private $nested_array;
    private $force_value;
    private $in_a_multi;
    private $is_array;
    private $is_multi;
    private $label;
    private $limit;
    public $output;
    private $previous_type;
    private $raw_meta_value = NULL;
    private $raw_type;
    private $settings;
    private $show_field_key;
    private $type;
    private $value;
    private $value_source;

    function __construct( $type, $field_key, $field_options = [], $settings = [] ) {
        $this->raw_type = $type;
        $this->field_key = $field_key;
        $this->field_options = $field_options;
        $this->value_source = isset( $settings['value_source'] ) ? $settings['value_source'] : '';
        $this->force_value = isset( $settings['force_value'] ) ? $settings['force_value'] : FALSE;
        $this->disabled = isset( $settings['disabled'] ) ? $settings['disabled'] : FALSE;
        $this->is_array = strpos( $type, '_array' ) !== FALSE;
        $this->type = $this->is_array ? str_replace( '_array', '', $type ) : $type;
        $this->previous_type = isset( $settings['previous_type'] ) ? $settings['previous_type'] : FALSE;
        $this->is_multi = strpos( $this->type, 'multi' ) !== FALSE;
        $this->in_a_multi = isset( $settings['in_a_multi'] ) ? $settings['in_a_multi'] : FALSE;
        $this->nested_array = isset( $settings['nested_array'] ) && $settings['nested_array'] ? $settings['nested_array'] : $this->is_array && $this->in_a_multi;
        $this->label = isset( $settings['label'] ) ? $settings['label'] : FALSE;
        $this->show_field_key = isset( $settings['show_field_key'] ) ? $settings['show_field_key'] : $type !== 'hidden' && is_super_admin();
        $this->limit = isset( $settings['limit'] ) ? $settings['limit'] : FALSE;
        // Get Brackets
        // is_array, is_multi - include an i
        if ( $this->is_array && $this->is_multi && ! $this->in_a_multi && ! $this->nested_array ) {
            $this->brackets = $this->brackets( '', isset( $settings['i'] ) ? $settings['i'] : 0 );
        } 
        // in_a_multi, nested_array - include i and maybe label
        elseif ( ! $this->is_array && ! $this->is_multi && $this->in_a_multi && $this->nested_array ) {
            $this->brackets = $this->brackets( $settings['brackets'], $settings['i'], ( in_array( $this->previous_type, [ 'multi', 'multi_array' ] ) ? $settings['label'] : FALSE ) );
        } 
        // Everything else - include label if there is one, or i if there is one
        else {
            $this->brackets = $this->brackets( isset( $settings['brackets'] ) ? $settings['brackets'] : '', $this->label ? $this->label : ( isset( $settings['i'] ) ? $settings['i'] : FALSE ) );
        }
        $this->settings = $settings;
        // Get value from taxonomy
        $taxonomy = isset( $this->settings['taxonomy'] ) ? $this->settings['taxonomy'] : FALSE;
        if ( $taxonomy ) {
            $this->value = wp_list_pluck( wp_get_post_terms( $this->value_source, $this->field_key ), 'term_id' );
        }
        // Get value from meta field
        else if ( is_numeric( $this->value_source ) ) {
            $this->value = devo_get_post_meta( $this->value_source, $this->field_key );
            // devo_get_post_meta() JSON-decodes, so free-text fields need the
            // string as stored too; see string_value()
            $this->raw_meta_value = get_post_meta( $this->value_source, $this->field_key, TRUE );
        }
        // Get value from option
        else if ( strpos( $this->value_source, '[' ) !== FALSE ) {
            $option = get_option( substr( $this->value_source, 0, strpos( $this->value_source, '[' ) ) );
            $this->value = isset( $option[ $this->field_key ] ) ? $option[ $this->field_key ] : '';
            $this->field_key = $this->value_source;
        }
        // The value was passed in
        else {
            $this->value = $this->value_source;
        }
        
        $this->value = $this->force_value === FALSE ? $this->value : $this->force_value;
        $this->field_id = $this->field_id( $this->field_key, $this->label );
        $this->field_name = $this->field_key . $this->brackets;
        
        $output = '';
        $this->footnote = '<br><span class="footnote">' . esc_html( $this->field_key ) . '</span>';

        // Arrays
        if ( $this->is_array ) {
            $output .= $this->array();
        }
        // Find the custom method for the data type
        else if ( method_exists( $this, $this->type ) ) {
            $output .= $this->{ $this->type }();
        } 
        // or use the default field type
        else {
            $output .= $this->default();
        }
            
        // Add field name if admin
        if ( is_super_admin() && ! $this->is_array && ! $this->nested_array && ! $this->in_a_multi && $this->show_field_key ) {
            $output .= $this->footnote;
        }

        $this->output = $output;
    }

    private function array() {
        $this->value = is_array( $this->value ) ? ( count( $this->value ) ? $this->value : [ '' ] ) : [ $this->value ];
        $array_output = '';
        $array_output .= $this->limit ? '<span class="red small">Limit ' . (int) $this->limit . '</span><br>' : '';
        $array_output .= '<div class="array-wrapper">' . "\n";
        $array_output .= $this->limit ? '<style>.' . sanitize_html_class( $this->field_key ) . ' > div.post-meta-content > div.array-wrapper > div.array-fields-wrapper > .array-field-wrapper:nth-child(n+' . ( (int) $this->limit + 1 ) . ') {opacity: .4;}</style>' :''; // +1 because 'new-array-field'
        $array_output .= '<span class="new-array-field button"><span>' . __( '+ Add', 'developers_only' ) . '</span></span>' . "\n";
        $array_output .= '<div class="array-fields-wrapper">' . "\n";
        $i = isset( $this->settings['i'] ) ? $this->settings['i'] : 0;
        foreach ( $this->value as $field_value ) {
            if ( $this->is_array && $this->is_multi && ! $this->in_a_multi && ! $this->nested_array ) {
                $this->brackets = $this->brackets( '', $i );
            }
            $subfield_settings['previous_type'] = $this->raw_type;
            $subfield_settings['brackets'] = $this->brackets;
            $subfield_settings['nested_array'] = $this->is_array && $this->in_a_multi ? TRUE : $this->nested_array;
            $subfield_settings['in_a_multi'] = $this->in_a_multi;
            $subfield_settings['force_value'] = $field_value;
            $subfield_settings['label'] = $this->label;
            $subfield_settings['i'] = $i;
            $subfield_settings['show_field_key'] = FALSE;
            if ( $this->in_a_multi || ( $this->is_multi && $this->type !== 'multi' ) ) {
                $subfield_settings['in_a_multi'] = TRUE;
            }
            $array_output .= '<span class="array-field-wrapper' . ( $this->is_multi ? ' multi' : '' ) . ( $this->in_a_multi ? ' in-a-multi' : '' ) . '" data-i="' . esc_attr( $i ) . '">' . "\n";
            $array_output .= '<span class="drag-handle"><span>Reorder</span></span>' . "\n";
            $array_field = new DO_Form_Field_Display( $this->type, $this->field_key, $this->field_options, $subfield_settings );
            $array_output .= $array_field->output . "\n";
            $array_output .= '<span class="delete-field"><span>X Delete Field</span></span>' . "\n";
            $array_output .= '</span>' . "\n";
            //if ( ! $this->in_a_multi ) {
                $i++;
            //}
        }
        $array_output .= '</div>' . "\n";
        if ( $this->show_field_key ) {
            $array_output .= $this->footnote;
        }
        $array_output .= '</div>' . "\n";
        return $array_output;
    }

    /*
     * FIELD TYPES
     * (alphabetical order)
     */

    private function accordion() {
        $accordion_field_options = [
            'fields' => [
                'Title' => 'html',
                'Text' => 'html',
            ],
        ];
        $accordion_field = new DO_Form_Field_Display( 'multi_array', $this->field_key, $accordion_field_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $accordion_field->output;
    }

    private function address() {
        $address_options = [
            'fields' => [
                'Name' => 'text',
                'Address 1' => 'text',
                'Address 2' => 'text',
                'City' => 'text',
                'State / Locality' => 'text',
                'Postal Code' => 'text',
                'Country' => 'country',
                'Google Maps' => 'google_maps_embed',
            ],
        ];
        $address_field = new DO_Form_Field_Display( 'multi', $this->field_key, $address_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $address_field->output;
    }

    private function background() {
        include( locate_template( 'api/fields/colors.php' ) );
        $background_options = [
            'fields' => [
                'Color' => 'color',
                'Media' => 'media',
            ],
        ];
        $background_field = new DO_Form_Field_Display( 'multi', $this->field_key, $background_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $background_field->output;
    }
    
    private function binary() {
        // checked( $checked, $current, $echo )
        $output = '<input type="checkbox" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" value="1" ' . checked( $this->value, 1, FALSE ) . ( $this->disabled ? ' disabled="disabled"' : '' ) . '> <label for="' . esc_attr( $this->field_id ) . '" class="checkbox-label">' . esc_html( $this->label ? $this->label : __( 'True', 'developers_only' ) ) . '</label>';

        return $output;
    }
    
    private function binary_select() {
        $css_attribute = $this->nested_array ? 'class' : 'id';
        // checked( $checked, $current, $echo )
        $output = '<select name="' . esc_attr( $this->field_name ) . '" ' . $css_attribute . '="' . esc_attr( $this->field_id ) . '"' . ( $this->disabled ? ' disabled="disabled" class="devo-disabled"' : '' ) . '>';
        $output .= '<option value="">' . esc_html( $this->label ? $this->label : __( 'Select', 'developers_only' ) ) . '</option>';
        $output .=  '<option value="1" ' . selected( 1, $this->value, FALSE ) . '>' . esc_html( ( $this->in_a_multi ? $this->label . ' - ' : '' ) . __( 'True', 'developers_only' ) ) . '</option>';
        $output .=  '<option value="0" ' . selected( 0, $this->value, FALSE ) . '>' . esc_html( ( $this->in_a_multi ? $this->label . ' - ' : '' ) . __( 'False', 'developers_only' ) ) . '</option>';
        $output .= '</select>';

        return $output;
    }
    
    private function button() {
        $output = '<button name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" value="' . esc_attr( isset( $this->field_options['value'] ) ? $this->field_options['value'] : '' ) . '" ' . ( $this->disabled ? ' disabled="disabled"' : '' ) . ' class="button blue"><span>' . esc_html( $this->label ? $this->label : __( 'Submit', 'developers_only' ) ) . '</span></button>';

        return $output;
    }
    
    private function button_style() {
        $button_options = [
            'options' => [
                'solid-button' => [
                    'label' => __( 'Solid Button', 'developers_only' ),
                    'value' => 'solid-button',
                ],
                'hollow-button' => [
                    'label' => __( 'Hollow Button', 'developers_only' ),
                    'value' => 'hollow-button',
                ],
                'text-button' => [
                    'label' => __( 'Text Button', 'developers_only' ),
                    'value' => 'text-button',
                ],
            ],
        ];
        $button_color_field = new DO_Form_Field_Display( 'select', $this->field_key, $button_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $button_color_field->output;
    }

    private function button_select() {
        return $this->checkbox();
    }

    private function checkbox() {
        $button_select = $this->type == 'button_select' ? 'button_select' : FALSE;
        $toggle = $this->type == 'toggle' ? 'toggle' : FALSE;
        $type = $toggle || $button_select ? 'radio' : $this->type;
        $field_settings = isset( $this->field_options['options'] ) ? $this->field_options : FALSE;
        $this->field_options = isset( $this->field_options['options'] ) ? $this->field_options['options'] : $this->field_options;
        $array_field = $type == 'checkbox' ? '[]' : '';
        $this->field_name = $this->field_key . $this->brackets . $array_field;
        $output = '';
        if ( count( $this->field_options ) ) {
            $other = isset( $field_settings['other'] ) && $field_settings['other'];
            $output .= $this->disabled ? '<div class="devo-disabled">' : '';
            // Put in a 'select all' if checkboxes and  more than 20
            if ( $type == 'checkbox' && count( $this->field_options ) > 20 ) {
                $output .= '<span 
                                class="devo-select-all button" 
                                data-for="' . esc_attr( $this->field_name ) . '" 
                                data-deselect-text="' . esc_attr__( 'Deselect All', 'developers_only' ) . '">' . esc_html__( 'Select All', 'developers_only' ) . '</span>';
            }
            // Put in columns if there are a lot of them...
            if ( count( $this->field_options ) > 10 ) {
                $output .= $this->columns( $this->field_options, $type, $this->field_key, is_array( $this->value ) ? $this->value : [ $this->value ] );
            }
            // ...or not
            else {
                // If it's a button_select or toggle, add a container div. If it's a toggle, default select first option.
                $output .= $toggle ? '<div class="toggle-container">' : ( $button_select ?  '<div class="button-select-container">' : '' );
                $i = 0;
                foreach ( $this->field_options as $option ) {
                    $option_label = isset( $option['label'] ) ? $option['label'] : $option;
                    $option_value = isset( $option['value'] ) ? $option['value'] : $option;
                    $option_description = isset( $option['description'] ) && strlen( $option['description'] ) ? $option['description'] : FALSE;
                    $output .= '<div class="multi-field">';
                    $output .= '<input 
                                    class="widefat' . ( $toggle && $i == 0 && ! count( $this->value ) ? ' toggle-left' : ( $toggle && $i == 1 && ! count( $this->value ) ? ' toggle-right' : '' ) ) . '" 
                                    type="' . esc_attr( $type ) . '" 
                                    name="' . esc_attr( $this->field_name ) . '" 
                                    id="' . esc_attr( $this->field_id . '_' . strtolower( str_replace( ' ', '-', $option_value ) ) ) . '" 
                                    value="' . esc_attr( $option_value ) . '" ' . 
                                    checked( ( $toggle && $i == 0 && ! count( $this->value ) ? TRUE : in_array( $option_value, ( is_array( $this->value ) ? $this->value : [ $this->value ] ) ) ), TRUE, FALSE ) . 
                                    ( $this->disabled ? ' disabled="disabled"' : '' ) . '> 
                                    <label 
                                        for="' . esc_attr( $this->field_id . '_' . strtolower( str_replace( ' ', '-', $option_value ) ) ) . '" 
                                        class="' . esc_attr( $type ) . '-label">' . esc_html( $option_label ) . '</label>';
                    $output .=  $option_description ? '<span class="field-description">' . wp_kses_post( $option_description ) . '</span>' : '' ;
                    $output .= '</div>';
                    $i++;
                }
                $output .= $button_select || $toggle ? '</div>' : '';
            }
            // 'Other' option
            if ( $other ) {
                $other_text = isset( $field_settings['other_text'] ) ? $field_settings['other_text'] : 'Other';
                $potential_values = count( $maybe_values = devo_array_get_column_values( 'value', $this->field_options, '2' ) ) ? $maybe_values : $this->field_options;
                devo_cast_array_values_as_string( $potential_values );
                $value_is_other = ! count( $this->value ) || devo_array_contains( $this->value, $potential_values, TRUE, TRUE ) ? FALSE : TRUE;
                $other_value = '';
                if ( $value_is_other ) {
                    foreach ( $this->value as $potential_other ) {
                        if ( ! devo_array_contains( $potential_other, $potential_values ) ) {
                            $other_value = $potential_other;
                        }
                    }
                }
                $output .= '<label 
                                for="' . esc_attr( $this->field_id ) . '_other_text" 
                                class="' . esc_attr( $type ) . '-label">' . esc_html( $other_text ) . '</label>
                                <input 
                                    class="widefat devo-other-text" 
                                    type="text" 
                                    name="' . esc_attr( $this->field_name ) . '" 
                                    id="' . esc_attr( $this->field_id ) . '_other_text" 
                                    value="' . esc_attr( $other_value ) . '" '. 
                                    ( $this->disabled ? ' disabled="disabled"' : '' ) . '>';
                $output .= '</div>';
            }
            $output .= $this->disabled ? '</div>' : '';
        }

        return $output;
    }
    
    private function code() {
        return $this->textarea();
    }
    
    /* Colour picker.
     *
     * No data-default-color on purpose. wpColorPicker merges the element's data
     * attributes over its options ($.extend( self.options, el.data() )), and it
     * decides the button from that value: a truthy defaultColor renders
     * "Default", which resets the field to that colour, while the default of
     * FALSE renders "Clear", which empties the field.
     *
     * An empty value is what lets a colour be genuinely unset - the background
     * helpers only apply a colour when one is present, so clearing it leaves the
     * element transparent. Naming a default here would make "no colour"
     * unreachable through the UI.
     *
     * Note the picker cannot express transparency itself: WordPress ships Iris,
     * which has no alpha channel. Semi-transparent backgrounds have to come from
     * the theming layer.
     *
     * A default can still be set per field via the field's settings. */
    private function color() {
        $default_color = isset( $this->field_options['default_color'] ) ? $this->field_options['default_color'] : '';
        $output = '<input
                        type="text" id="' . esc_attr( $this->field_id ) . '"
                        name="' . esc_attr( $this->field_name ) . '"
                        value="' . esc_attr( $this->value ) . '"' .
                        ( $this->label ? ' placeholder="' . esc_attr( $this->label ) . '"' : '' ) . '
                        class="devo-color' . ( $this->disabled ? ' devo-disabled' : '' ) . '"' .
                        ( $this->disabled ? ' disabled="disabled"' : '' ) .
                        ( strlen( $default_color ) ? ' data-default-color="' . esc_attr( $default_color ) . '"' : '' ) . '>';
        $output .= '<div class="picker" id="' . esc_attr( $this->field_id ) . '-picker"></div>';

        return $output;
    }
    
    private function country() {
        include( locate_template( 'api/fields/countries.php' ) );
        $country_field = new DO_Form_Field_Display( 'select', $this->field_key, $countries, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $country_field->output;
    }
    
    private function cta() {
        $cta_field_options = [
            'fields' => [
                'Text' => 'varchar',
                'URL' => 'url',
                'Modal' => 'binary_select',
                'Button Style' => 'button_style',
                'Modal Class' => 'varchar',
            ],
        ];
        $cta_field = new DO_Form_Field_Display( 'multi', $this->field_key, $cta_field_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $cta_field->output;
    }

    private function ctas() {
        $cta_field_options = [
            'fields' => [
                'Text' => 'varchar',
                'URL' => 'url',
                'Modal' => 'binary_select',
                'Button Style' => 'button_style',
                'Modal Class' => 'varchar',
            ],
        ];
        $cta_field = new DO_Form_Field_Display( 'multi_array', $this->field_key, $cta_field_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $cta_field->output;
    }
    
    private function date() {
        $output = '<input 
                        class="widefat devo-date-picker" 
                        placeholder="' . esc_attr( ( $this->label ? $this->label . ' - ' : '' ) . 'Month Day, Year' ) . '" 
                        type="text" 
                        name="' . esc_attr( $this->field_name ) . '" 
                        id="' . esc_attr( $this->field_id ) . '" 
                        value="' . esc_attr( strlen( $this->value ) ? devo_utc_to_timezone( $this->value, FALSE, 'Y-m-d' ) : '' ) . '" 
                        size="60"' . 
                        ( $this->disabled ? ' disabled="disabled"' : '' ) . '>';
        
        return $output;
    }
    
    private function date_time() {
        $output = '<input 
                    class="widefat devo-date-time-picker" 
                    placeholder="' . esc_attr( ( $this->label ? $this->label . ' - ' : '' ) . 'YYYY-MM-DD' ) . '" 
                    type="text" 
                    name="' . esc_attr( $this->field_name ) . '" 
                    id="' . esc_attr( $this->field_id ) . '" 
                    value="' . esc_attr( strlen( $this->value ) ? devo_utc_to_timezone( $this->value, FALSE, 'Y-m-d g:i A' ) : '' ) . '" 
                    size="60"' . 
                    ( $this->disabled ? ' disabled="disabled"' : '' ) . '>';
        
        return $output;
    }
    
    private function date_time_timezone() {
        include( locate_template( 'api/fields/timezones.php' ) );
        $timestamp = isset( $this->value['date_time'] ) ? $this->value['date_time'] : FALSE;
        $timezone = isset( $this->value['timezone'] ) ? $this->value['timezone'] : FALSE;
        $output = '<span class="multi-field-wrapper">';
            $output .= '<span>';
                $output .= '<input class="widefat devo-date-time-picker" placeholder="' . esc_attr( ( $this->label ? $this->label . ' - ' : '' ) . 'YYYY-MM-DD' ) . '" type="text" name="' . esc_attr( $this->field_name . '[date_time]' ) . '" id="' . esc_attr( $this->field_id ) . '" value="' . esc_attr( $timestamp ? devo_utc_to_timezone( $timestamp, $timezone, 'Y-m-d g:i A' ) : '' ) . '" size="60"' . ( $this->disabled ? ' disabled="disabled"' : '' ) . '>';
            $output .= '</span>';
            $output .= '<span>';
                $select_field = new DO_Form_Field_Display( 'select', $this->field_name, $timezones, [ 'is_multi' => TRUE, 'label' => __( 'Timezone', 'developers_only' ), 'in_a_multi' => TRUE, 'value_source' => $timezone ] );
                $output .= $select_field->output;
            $output .= '</span>';
        $output .= '</span>';

        return $output;
    }

    private function default() {
        return $this->text();
    }
    
    private function disabled() {
        $output = '<input type="hidden" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" value="'. esc_attr( $this->value ) .'">';
        $output .= '<input type="text" disabled="disabled" value="' . esc_attr( $this->value ) . '"> (Set automatically)';
        
        return $output;
    }

    private function dollars() {
        return $this->text();
    }
    
    private function file() {
        return $this->image();
    }

    private function files() {
        return $this->images();
    }

    private function gallery() {
        $gallery_options = [
            'fields' => [
                'Title' => 'text',
                'Media' => 'media',
            ],
        ];
        $gallery_field = new DO_Form_Field_Display( 'multi_array', $this->field_key, $gallery_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $gallery_field->output;
    }

    private function google_maps_embed() {
        return $this->text();
    }
    
    private function hidden() {
        $output = '<input type="hidden" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" value="'. esc_attr( $this->value ) .'">';
        
        return $output;
    }

    private function html() {
        return $this->textarea();
    }
    
    private function images() {
        $output = '<div class="gallery-wrapper ' . esc_attr( $this->type ) . '">';
        $output .= '<span class="media-upload-button-wrapper"><a href="#" class="media-upload-button-gallery button" name="' . esc_attr( $this->field_name ) . '"><span>' . esc_html__( 'Add Media', 'developers_only' ) . '</span></a><br><br></span>';
        $output .= '<span class="previews">';
        if ( is_array( $this->value ) && count( $this->value ) ) {
            $images = array_values( $this->value );
            for ( $i = 0; $i < count( $images ); $i++ ) {
                if ( is_scalar( $images[ $i ] ) && strlen( (string) $images[ $i ] ) ) {
                    $image = wp_get_attachment_image_src( $images[ $i ], 'thumbnail' );
                    if ( $image ) {
                        $output .= '<span class="media-upload-preview-wrapper">';
                        $output .= '<img src="' . esc_url( $image[0] ) . '" height="' . (int) $image[2] . '" class="media-upload-preview" alt="">';
                    }
                    $output .= '<input type="hidden" class="media-upload-field" name="' . esc_attr( $this->field_key . $this->brackets . '[' . $i . ']' ) . '" id="' . esc_attr( $this->field_id . '[' . $i . ']' ) . '" value="'. esc_attr( $images[ $i ] ) .'">';
                    if ( $image ) {
                        $output .= '</span>';
                    }
                }
            }
        }
        $output .= '</span>';
        $output .= '</div>';
        
        return $output;
    }

    private function image_link() {
        $link_options = [
            'fields' => [
                'URL' => 'url',
                'Modal' => 'binary_select',
            ],
        ];
        $image_link_field = new DO_Form_Field_Display( 'multi', $this->field_key, $link_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $image_link_field->output;
    }
    
    private function image_select() {
        if ( isset( $this->field_options['options'] ) ) {
            $output = $this->disabled ? '<div class="devo-disabled">' : '';
            foreach ( $this->field_options['options'] as $i => $option_value ) {
                $output .= '<label for="' . esc_attr( $this->field_id . '_' . $i ) . '" class="image-select-wrapper' . ( in_array( $option_value, (array) $this->value ) ? ' selected' : '' ) . '"><img src="' . esc_url( $option_value ) . '" alt=""></label>';
                $output .= '<input class="hidden image-select" type="radio" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id . '_' . $i ) . '" value="' . esc_attr( $option_value ) . '" '. checked( in_array( $option_value, (array) $this->value ), TRUE, FALSE ) . ( $this->disabled ? ' disabled="disabled"' : '' ) . '>';
            }
            $output .= $this->disabled ? '</div>' : '';
        }
        
        return $output;
    }
    
    private function image_size() {
        $size_options = [
            'vertical' => [
                'label' => 'Vertical',
                'value' => 'vertical_600',
            ],
            'cinema' => [
                'label' => 'Cinema (16:9 ratio)',
                'value' => 'cinema_600',
            ],
            'square' => [
                'label' => 'Square',
                'value' => 'square_600',
            ],
            // 'logo' => [
            //     'label' => 'Logo (50px height)',
            //     'value' => 'logo',
            // ],
            // 'full' => [
            //     'label' => 'Full',
            //     'value' => 'full',
            // ],
        ];
        $image_size_field = new DO_Form_Field_Display( 'select', $this->field_key, $size_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $image_size_field->output;
    }

    private function int() {
        return $this->text();
    }
    
    private function logos() {
        $logos_options =  [
            'black' => [
               'label' => __( 'Black', 'developers_only' ),
               'value' => 'black',
            ],
            'white' => [
                'label' => __( 'White', 'developers_only' ),
                'value' => 'white',
            ],
        ];
        $logo_field = new DO_Form_Field_Display( 'select', $this->field_key, $logos_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $logo_field->output;
    }
    
    private function matrix() {
        $heading = isset( $this->field_options['heading'] ) ? $this->field_options['heading'] : FALSE;
        $questions = $this->field_options['questions'];
        $answers = $this->field_options['answers'];
        $output = '';
        if ( $heading ) {
            $output .= '<b class="devo-matrix-heading">' . esc_html( $heading ) . '</b>';
        }
        $output .= '<table class="devo-matrix" width="100%" border="0" cell-padding="0" cell-spacing="0">';
        $output .= '<thead>';
        $output .= '<tr>';
        $output .= '<th></th>';
        foreach ( $answers as $answer ) {
            $answer_label = isset( $answer['label'] ) ? $answer['label'] : $answer;
            $output .= '<th class="devo-matrix-answer" scope="col">' . esc_html( $answer_label ) . '</th>';
        }
        $output .= '</tr>';
        $output .= '</thead>';
        $output .= '<tbody>';
        $i = 0;
        foreach ( $questions as $question ) {
            $output .= '<tr>';
            $question_label = isset( $question['label'] ) ? $question['label'] : $question;
            $question_value = isset( $question['value'] ) ? $question['value'] : sanitize_title_with_dashes( $question );
            $output .= '<th class="devo-matrix-question" scope="row">' . esc_html( $question_label ) . '</th>';
            $output .= '<input type="hidden" name="' . esc_attr( $this->field_key . '[' . $question_value . ']' . $this->brackets ) . '" value="">';
            foreach ( $answers as $answer ) {
                $answer_label = isset( $answer['label'] ) ? $answer['label'] : $answer;
                $answer_value = isset( $answer['value'] ) ? $answer['value'] : sanitize_title_with_dashes( $answer );
                $output .= '<td data-value="' . esc_attr( $answer_value ) . '">';
                $output .= '<input class="widefat" type="radio" name="' . esc_attr( $this->field_key . '[' . $question_value . ']' . $this->brackets ) . '" id="' . esc_attr( $this->field_id . '_' . $question_value . '_' . $answer_value ) . '" value="' . esc_attr( $answer_label ) . '" '. checked( ( isset( $this->value[ $i ] ) && $this->value[ $i ] == $answer_label ), TRUE, FALSE ) . ( $this->disabled ? ' disabled="disabled"' : '' ) . '>';
                $output .= '</td>';
            }
            $output .= '</tr>';
            $i++;
        }
        $output .= '</tbody>';
        $output .= '</table>';
        
        return $output;
    }

    private function media( $is_icon = FALSE ) {
        $output = '<input class="media-upload-field ' . esc_attr( $this->type ) . '" type="text" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '"  value="'. esc_attr( $this->value ) .'" size="100"' . ( $this->label ? ' placeholder="' . esc_attr( $this->label ) . '"' : '' ) . '><a href="#" class="media-upload-button-image button' . ( $is_icon ? ' icon' : '' ) . '"><span>' . esc_html__( 'Add Media', 'developers_only' ) . '</span></a>';
        if ( is_string( $this->value ) && strlen( $this->value ) && $this->type == 'media' ) {
            $output .= '<br>';
            $output .= '<span class="media-upload-preview-wrapper">';
            $output .= '<img src="' . esc_url( $this->value ) . '" class="media-upload-preview" alt="">';
            $output .= '</span>';
        }

        return $output;
    }

    private function icon() {
        return $this->media( TRUE ) ;
    }
    
    private function multi() {
        $output = '<span class="multi-field-wrapper">';
        foreach ( $this->field_options['fields'] as $subfield_title => $subfield ) {
            $subfield_key = devo_field_key( $subfield_title );
            $subfield_type = is_a( $subfield, 'DO_CPT_Form_Field' ) ? $subfield->field_type : ( is_array( $subfield ) ? $subfield['type'] : $subfield );
            $subfield_options['options'] = is_a( $subfield, 'DO_CPT_Form_Field' ) ? ( $subfield->target_type == 'taxonomy' ? $subfield->set_up_tax_options() : $subfield->set_up_field_options() ) : ( is_array( $subfield ) && isset( $subfield['options'] ) ? devo_field_options( $subfield['options'] ) : [] );
            $subfield_options['fields'] = is_array( $subfield ) && isset( $subfield['fields'] ) ? $subfield['fields'] : [];
            $this->settings['force_value'] = isset( $this->value->{ $subfield_key } ) ? $this->value->{ $subfield_key } : ( is_string( $this->value ) ? $this->value : '' );
            $this->settings['label'] = $subfield_title;
            $this->settings['in_a_multi'] = TRUE;
            $this->settings['brackets'] = $this->brackets;
            $subfield_field = new DO_Form_Field_Display( $subfield_type, $this->field_key, $subfield_options, $this->settings );
            $output .= '<span class="' . esc_attr( strtolower( str_replace( ' ', '-', $subfield_title ) ) . '-label ' . ( is_string( $subfield_type ) ? $subfield_type : '' ) . '-type' ) . '">' . $subfield_field->output . '</span>';
        }
        $output .= '</span>';
        
        return $output;
    }
    
    private function number() {
        $output = '<input class="widefat' . ( $this->disabled ? ' devo-disabled' : '' ) . '" type="text" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" value="' . esc_attr( $this->value ) . '" size="60"' . ( $this->disabled ? ' disabled="disabled"' : '' ) . ' placeholder="' . esc_attr( $this->label ) . '">';
        
        return $output;
    }
    
    private function per_row() {
        $per_row_options = [
            'options' => [ 4, 3, 2, 1 ], // Earth below us, drifting falling...
        ];
        $per_row_field = new DO_Form_Field_Display( 'select', $this->field_key, $per_row_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $per_row_field->output;
    }
    
    private function post_browser() {
        $this->field_options = isset( $this->field_options['settings'] ) ? $this->field_options['settings'] : [];
        $post_browser = new DO_Post_Browser( $this->field_key, $this->value_source, array_merge( $this->field_options, [ 'brackets' => $this->brackets, 'force_value' => $this->value ] ) );
        
        return $post_browser->output;
    }

    private function post_type_labels() {
        $post_type_labels_options = [];
        foreach ( devo_get_public_post_types() as $post_type => $details ) {
            $post_type_labels_options[ $post_type ] = [
                'label' => $details['label'],
                'value' => $details['label'],
            ];
        }
        $post_type_labels_field = new DO_Form_Field_Display( 'select', $this->field_key, $post_type_labels_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $post_type_labels_field->output;
    }
    
    private function radio() {
        return $this->checkbox();
    }

    private function range_slider() {
        $this->field_options = isset( $this->field_options['settings'] ) ? $this->field_options['settings'] : FALSE;
        $min = $this->field_options && isset( $this->field_options['min'] ) ? $this->field_options['min'] : 0;
        $max = $this->field_options && isset( $this->field_options['max'] ) ? $this->field_options['max'] : 100;
        $step = $this->field_options && isset( $this->field_options['increment'] ) ? $this->field_options['increment'] : 1;
        // If there's no value, or the value is less than $min, set as $min
        $this->value = ! $this->value || $this->value < $min ? $min : $this->value;
        // If there is a value and it's greater than $max, set as $max
        $this->value = $this->value && $this->value > $max ? $max : $this->value;
        $output = '<div class="range-slider-container">';
            // Minus Button
            $output .= '<button aria-label="' . esc_attr__( 'Minus', 'developers_only' ) . '" class="range-slider-minus' . ( $this->value <= $min ? ' devo-disabled' : '' ) . '"' . ( $this->value <= $min ? ' disabled="disabled"' : '' ) . '><span>' . __( 'Minus', 'developers_only' ) . '</span></button>';
            // Slider (UI only)
            $output .= '<input class="widefat range-slider' . ( $this->disabled ? ' devo-disabled' : '' ) . '" type="range" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" value="' . esc_attr( $this->value ) . '" min="' . esc_attr( $min ) . '" max="' . esc_attr( $max ) . '" step="' . esc_attr( $step ) . '"' . ( $this->disabled ? ' disabled="disabled"' : '' ) . '>';
            // Plus Button
            $output .= '<button aria-label="' . esc_attr__( 'Plus', 'developers_only' ) . '" class="range-slider-plus' . ( $this->value >= $max ? ' devo-disabled' : '' ) . '"' . ( $this->value >= $max ? ' disabled="disabled"' : '' ) . '><span>' . __( 'Plus', 'developers_only' ) . '</span></button>';
            // Value Display Field
            $output .= '<input class="widefat range-slider-display-value" type="text" name="' . esc_attr( $this->field_name . '-display-value' ) . '" id="' . esc_attr( $this->field_id . '-display-value' ) . '" value="' . esc_attr( $this->value ) . '" disabled="disabled" placeholder="' . esc_attr( $this->label ) . '">';
            // Value Field (hidden, this is what actually gets saved)
            //$output .= '<input class="range-slider-display-value" type="hidden" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" value="' . esc_attr( $this->value ) . '" autocomplete="off">';
        $output .= '</div>';

        return $output;
    }
    
    private function read_only() {
        // Read-only values can come from anonymous visitors (a form
        // submission's stored form ID), so every path out is escaped.
        $value = is_scalar( $this->value ) ? (string) $this->value : wp_json_encode( $this->value );
        $binary = $this->value === '1' || $this->value === '0' || $this->value === TRUE || $this->value === FALSE;
        $email = is_email( $value );
        $link = strpos( $value, 'http' ) === 0;
        $output = '<textarea name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" style="display: none">' . esc_textarea( $value ) . '</textarea>';
        if ( $link || $email ) {
            $output .= '<a href="' . esc_url( ( $email ? 'mailto:' : '' ) . $value ) . '" target="_blank" rel="noopener noreferrer">';
        }
        $output .= $binary ? ( (bool) $this->value ? esc_html__( 'True', 'developers_only' ) : esc_html__( 'False', 'developers_only' ) ) : esc_html( $value );
        if ( $link || $email ) {
            $output .= '</a>';
        }

        return $output;
    }
    
    private function read_only_json() {
        $value = is_string( $this->value ) ? json_decode( $this->value ) : $this->value;
        $output = '<textarea name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" style="display: none">' . esc_textarea( (string) wp_json_encode( $value ) ) . '</textarea>';
        if ( count( (array) $value ) ) {
            $output .= '<table class="read-only-json" cellpadding="0" cellspacing="0" border="0">';
            foreach ( (array) $value as $data_label => $data_value ) {
                // Submitted by anonymous visitors: escape both columns.
                $data_value = is_scalar( $data_value ) ? (string) $data_value : wp_json_encode( $data_value );
                $output .= '<tr>';
                $output .= '<th scope="row">' . esc_html( $data_label ) . '</th><td>' . esc_html( $data_value ) . '</td>';
                $output .= '</tr>';
            }
            $output .= '</table>';
        }

        return $output;
    }
    
    private function scale() {
        if ( isset( $this->field_options['options'] ) ) {
            $output = $this->disabled ? '<div class="devo-disabled">' : '';
            $i = 1;
            foreach ( $this->field_options['options'] as $option ) {
                $option_label = isset( $option['label'] ) ? $option['label'] : $option;
                $option_value = isset( $option['value'] ) ? $option['value'] : $i;
                $output .= '<div class="devo-scale-item">';
                $output .= '<input class="widefat" type="radio" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id . '_' . strtolower( str_replace( ' ', '-', $option_value ) ) ) . '" value="' . esc_attr( $option_value ) . '" ' . checked( $option_value, $this->value, FALSE ) . ( $this->disabled ? ' disabled="disabled"' : '' ) . '> <label for="' . esc_attr( $this->field_id . '_' . strtolower( str_replace( ' ', '-', $option_value ) ) ) . '" class="radio-label">' . esc_html( $option_label ) . '</label>';
                $output .= '</div>';
                $i++;
            }
            $output .= $this->disabled ? '</div>' : '';
        }

        return $output;
    }

    private function select() {
        $css_attribute = $this->nested_array ? 'class' : 'id';
        $is_select_multiple = $this->type === 'select_multiple';
        $this->field_options = isset( $this->field_options['options'] ) ? $this->field_options['options'] : $this->field_options;
        $output = '';
        if ( is_array( $this->field_options ) && count( $this->field_options ) ) {
            if ( $is_select_multiple ) {
                $output .= '<span class="footnote">' . esc_html__( 'Hold cmd or ctrl to select multiple', 'developers_only' ) . '</span><br>';
            }
            $output .= '<select name="' . esc_attr( $this->field_name . ( $is_select_multiple ? '[]' : '' ) ) . '" ' . $css_attribute . '="' . esc_attr( $this->field_id ) . '"' . ( $this->disabled ? ' disabled="disabled" class="devo-disabled"' : '' ) . ( $is_select_multiple ? ' multiple' : '' ) . '>';
            $output .= '<option value="">' . esc_html( $this->label ? $this->label : __( 'Select', 'developers_only' ) ) . '</option>';
            foreach ( $this->field_options as $option ) {
                $option_label = isset( $option['label'] ) ? $option['label'] : $option;
                $option_value = isset( $option['value'] ) ? $option['value'] : $option;
                $output .=  '<option value="' . esc_attr( $option_value ) . '" ' . ( $is_select_multiple ? ( in_array( $option_value, ( is_array( $this->value ) ? $this->value : [ $this->value ] ) ) ? ' selected="selected"' : '' ) : selected( $option_value, $this->value, FALSE ) ) . '>' . esc_html( ( $this->in_a_multi ? $this->label . ' - ' : '' ) . $option_label ) . '</option>';
            }
            $output .= '</select>';
        }

        return $output;
    }

    private function select_multiple() {
        return $this->select();
    }

    private function sort() {
        return $this->text();
    }
    
    private function state() {
        include( locate_template( 'api/fields/states.php' ) );
        $output = '<select name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '"' . ( $this->disabled ? ' disabled="disabled" class="devo-disabled"' : '' ) . '>';
        $output .= '<option value="">' . esc_html( $this->label ? $this->label : __( 'Select a State', 'developers_only' ) ) . '</option>';
        foreach ( $states as $state_abrv => $state ) {
            $option_label = $state;
            $option_value = $state_abrv;
            $output .=  '<option value="' . esc_attr( $option_value ) . '" ' . selected( $option_value, $this->value, FALSE ) . '>' . esc_html( $option_label ) . '</option>';
        }
        $output .= '</select>';

        return $output;
    }
    
    private function stats() {
        $stats_field_options = [
            'fields' => [
                'Before Number' => 'text',
                'Number' => 'number',
                'After Number' => 'text',
                'Description' => 'html',
                'Count Down' => 'binary',
            ],
        ];
        $stats_field = new DO_Form_Field_Display( 'multi_array', $this->field_key, $stats_field_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $stats_field->output;
    }

    /* A free-text field's value as the string that was stored.
     *
     * devo_get_post_meta() decodes values that look like JSON, so a JSON
     * snippet typed into a text, textarea, html or code field would come back
     * as an array or object, render empty, and be wiped by the next save. The
     * stored string is used whenever there is one. Nothing is unslashed: values
     * are stored as typed, and stripping here lost a backslash on every save. */
    private function string_value() {
        if ( $this->force_value === FALSE && is_string( $this->raw_meta_value ) && $this->raw_meta_value !== '' ) {
            return $this->raw_meta_value;
        }
        if ( is_string( $this->value ) ) {
            return $this->value;
        }
        if ( is_int( $this->value ) || is_float( $this->value ) ) {
            return (string) $this->value;
        }
        return '';
    }

    private function text() {
        $output = '<input class="widefat' . ( $this->disabled ? ' devo-disabled' : '' ) . '" type="text" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" value="' . esc_attr( $this->string_value() ) . '" size="60"' . ( $this->disabled ? ' disabled="disabled"' : '' ) . ' placeholder="' . esc_attr( $this->label ) . '">';

        return $output;
    }
    
    private function textarea() {
        $output = '<textarea class="widefat type-' . esc_attr( $this->type ) . '" name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '" size="60" rows="5"' . ( $this->label ? ' placeholder="' . esc_attr( $this->label ) . '"' : '' ) . ( $this->disabled ? ' disabled="disabled"' : '' ) . '>' . esc_textarea( $this->string_value() ) . '</textarea>';

        return $output;
    }

    private function toggle() {
        return $this->checkbox();
    }

    private function url() {
        return $this->text();
    }
    
    private function varchar() {
        return $this->text();
    }
    
    private function videos() {
        $videos_field_options = [
            'fields' => [
                'Title' => 'text',
                'Copy' => 'html',
                'URL' => 'varchar',
            ],
        ];
        $videos_field = new DO_Form_Field_Display( 'multi_array', $this->field_key, $videos_field_options, array_merge( $this->settings, [ 'show_field_key' => FALSE ] ) );
        
        return $videos_field->output;
    } 
    
    private function wp_editor() {
        $output = wp_editor( $this->string_value(), $this->field_id, [ 'textarea_name' => $this->field_name, 'media_buttons' => ( $this->type === 'wp_editor' ), 'teeny' => ( $this->type === 'wp_editor_limited' ), 'wpautop' => TRUE ] );

        return $output;
    }

    private function wp_editor_limited() {
        return $this->wp_editor();
    }

    private function year() {
        return $this->text();
    }
    
    private function year_select() {
        include( locate_template( 'api/fields/years.php' ) );
        $output = '<span class="multi-label"></span>';
        $output .= '<select name="' . esc_attr( $this->field_name ) . '" id="' . esc_attr( $this->field_id ) . '"' . ( $this->disabled ? ' disabled="disabled" class="devo-disabled"' : '' ) . '>';
        $output .= '<option value="">' . esc_html( $this->label ? $this->label : __( 'Select a Year', 'developers_only' ) ) . '</option>';
        foreach ( $years as $year ) {
            $option_label = $year;
            $option_value = $year;
            $output .=  '<option value="' . esc_attr( $option_value ) . '" ' . selected( $option_value, $this->value, FALSE ) . '>' . esc_html( $option_label ) . '</option>';
        }
        $output .= '</select>';

        return $output;
    }


    /*
     * HELPERS
     */

    private function brackets( $current_brackets = '', $label = FALSE, $label2 = FALSE ) {
        $return = $current_brackets;
        $key = $label !== FALSE ? devo_field_key( $label ) : '';
        $key2 = $label2 !== FALSE ? devo_field_key( $label2 ) : '';

        // None
        if ( ! $this->is_array && ! $this->is_multi && ! $this->in_a_multi && ! $this->nested_array ) {
            // Add nothing
            $return = $current_brackets;
        }
        // is_array, is_multi
        if ( $this->is_array && $this->is_multi && ! $this->in_a_multi && ! $this->nested_array ) {
            // Add labeled brackets
            $return = $current_brackets . '[' . $key . ']';
        }
        // is_multi
        if ( ! $this->is_array && $this->is_multi && ! $this->in_a_multi && ! $this->nested_array ) {
            // Add nothing
            $return = $current_brackets;
        }
        // is_multi, in_a_multi, nested_array
        if ( ! $this->is_array && $this->is_multi && $this->in_a_multi && $this->nested_array ) {
            // Add labeled brackets
            $return = $current_brackets . '[' . $key . ']';
        }
        // in_a_multi
        if ( ! $this->is_array && ! $this->is_multi && $this->in_a_multi && ! $this->nested_array ) {
            // Add labeled brackets
            $return = $current_brackets . '[' . $key . ']';
        }
        // is_array, in_a_multi, nested_array
        if ( $this->is_array && ! $this->is_multi && $this->in_a_multi && $this->nested_array ) {
            // Add labeled brackets
            $return = $current_brackets . '[' . $key . ']';
        }
        // in_a_multi, nested_array
        if ( ! $this->is_array && ! $this->is_multi && $this->in_a_multi && $this->nested_array ) {
            // Add brackets
            $return = $current_brackets . '[' . $key . ']' . ( strlen( $key2 ) ? '[' . $key2 . ']' : '' );
        }
        // is_array
        if ( $this->is_array && ! $this->is_multi && ! $this->in_a_multi && ! $this->nested_array ) {
            // Add brackets
            $return = $current_brackets . '[]';
        }
        // // is_array
        // if ( $this->is_array && ! $this->is_multi && ! $this->in_a_multi && ! $this->nested_array ) {
        //     // Add brackets
        //     $return = $current_brackets . '[]';
        // }
        
        return $return;
    }

    private function columns( $field_options, $field_type, $field_key, $value_array ) {
        $field_id = $this->field_id( $field_key );
        $distribute = devo_distribute( $field_options, 2, 'content' );
        $array_field = $field_type == 'checkbox' ? '[]' : '';
        $output = '<div class="twoColumnTbl">';
        foreach ( $distribute as $column_num => $column ) {
            $output .= '<div class="column' . ( $column_num + 1 ) . '">';
            $output .= '<ul class="' . esc_attr( $field_key . '-' . $field_type ) . '">';
            foreach ( $column as $option ) {
                $option_label = isset( $option['label'] ) ? $option['label'] : $option;
                $option_value = isset( $option['value'] ) ? $option['value'] : $option;
                $option_id = $field_key . '_' . strtolower( str_replace( ' ', '-', $option_value ) );
                $output .=  '<li><div class="multi-field"><input class="widefat" type="' . esc_attr( $field_type ) . '" name="' . esc_attr( $field_key . $array_field ) . '" id="' . esc_attr( $option_id ) . '" value="' . esc_attr( $option_value ) . '" '. checked( in_array( $option_value, $value_array ), TRUE, FALSE ) .'> <label for="' . esc_attr( $option_id ) . '" class="' . esc_attr( $field_type ) . '-label">' . esc_html( $option_label ) . '</label></div></li>';
            }
            $output .=  '</ul>';
            $output .=  '</div>';
        }
        $output .=  '</div>';
        return $output;
    }

    private function field_id( $field_key, $field_label = FALSE ) {
        $key = strtolower( preg_replace( '/[^\w]/', '', str_replace( [ '[', ']', ' ' ], [ '_', '', '_' ], $field_key ) ) );
        $label = $field_label ? '_' . strtolower( preg_replace( '/[^\w]/', '', str_replace( [ '[', ']', ' ' ], [ '_', '', '_' ], $field_label ) ) ) : '';
        return $key . $label ;
    }
}
