<?php

class DO_Menu_Custom_Fields {
    private static $instance = null;
    private $prefix = '_menu';
    private $fields = [];
    private $nonce_action = 'devo_menu_meta_nonce';
    private $nonce_field = '_devo_menu_meta_nonce';

    private function __construct( array $sections ) {
        foreach ( $sections as $section_fields ) {
            foreach ( $section_fields as $label => $settings ) {
                $key = devo_meta_field_key( $label, $this->prefix );
                if ( is_array( $settings ) ) {
                    $this->fields[ $key ] = array_merge( $settings, [ 'label' => $label ] );
                }
                else {
                    $this->fields[ $key ] = [ 'type' => $settings, 'label' => $label ];
                }
            }
        }
        add_action( 'wp_nav_menu_item_custom_fields', [ $this, 'render_fields' ], 10, 2 );
        add_action( 'wp_update_nav_menu_item', [ $this, 'save_fields' ], 10, 2 );
    }
 
    public static function register( array $sections ): self {
        if ( self::$instance === null ) {
            self::$instance = new self( $sections );
        }
        return self::$instance;
    }

    public function render_fields( $item_id, $item ): void {
        wp_nonce_field( $this->nonce_action, $this->nonce_field );
        echo '<input type="hidden" class="nav-menu-id" value="' . esc_attr( $item_id ) . '">';

        foreach ( $this->fields as $key => $field ) {
            if ( ! empty( $field['top_level_only'] ) && $item->menu_item_parent != '0' ) {
                continue;
            }

            $label = $field['label'];
            $raw_type = $field['type'];
            $description = isset( $field['description'] ) ? $field['description'] : '';
            $value = devo_get_post_meta( $item_id, $key );

            if ( is_a( $raw_type, 'DO_CPT_Form_Field' ) ) {
                $type = $raw_type->field_type;
                $field_options = [ 'options' => $raw_type->target_type == 'taxonomy' ? $raw_type->set_up_tax_options() : $raw_type->set_up_field_options() ];
            }
            else {
                $type = $raw_type;
                $field_options = [];
            }

            $display = new DO_Form_Field_Display(
                $type,
                $key . '[' . $item_id . ']',
                $field_options,
                [ 'label' => $label, 'force_value' => $value ]
            );

            echo '<p class="description-wide">';
            if ( $description ) {
                echo '<span class="red small">' . wp_kses_post( $description ) . '</span><br>';
            }
            echo '<label for="' . esc_attr( $key . '-' . $item_id ) . '">' . esc_html( $label ) . '</label>';
            echo $display->output;
            echo '</p>';
        }
    }

    public function save_fields( $menu_id, $item_id ): void {
        if ( ! isset( $_POST[ $this->nonce_field ] ) || ! wp_verify_nonce( $_POST[ $this->nonce_field ], $this->nonce_action ) ) {
            return;
        }

        foreach ( $this->fields as $key => $field ) {
            if ( isset( $_POST[ $key ][ $item_id ] ) ) {
                $raw_type = $field['type'];
                $type = is_a( $raw_type, 'DO_CPT_Form_Field' ) ? $raw_type->field_type : $raw_type;
                $validator = new DO_Form_Field_Validate( $type, $_POST[ $key ][ $item_id ] );
                // Slashed, like DO_Custom_Post_Type::save_post(): the value
                // can be JSON, and update_post_meta() unslashes.
                update_post_meta( $item_id, $key, wp_slash( $validator->value ) );
            }
            else {
                delete_post_meta( $item_id, $key );
            }
        }
    }
}

DO_Menu_Custom_Fields::register( [
    'Menu Fields' => [
        'Icon' => [
            'type' => new DO_CPT_Form_Field( 'select', 'devo_icon', 'post_title', 'post_name' ),
        ],
    ],
] );
