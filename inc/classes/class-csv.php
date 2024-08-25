<?php
/**
 * CSV Exporter
 * Uses DO_Custom_Post_Type and DO_Options_Screen
 *
 */


class DO_CSV {

    public $post_type;
    public $sample_post_id;
    public $fields;
    private $option_name;
    private $options;
    private $option_screen;

    function __construct() {
        // Actions
        if ( is_admin() ) {
            add_action( 'after_setup_theme', [ $this, 'setup' ], 1 );
        }
    }

    public function setup() {
        // Only if current user is an admin
        $user = wp_get_current_user();
        if ( in_array( 'administrator', $user->roles ) ) {
            add_action( 'all_admin_notices', [ $this, 'show_btn' ] );
            add_action( 'admin_head', [ $this, 'button_styles' ] );
            add_action( 'after_setup_theme', [ $this, 'options' ], 2 );
        }
    }

    public function show_btn() {
        global $pagenow, $wp_query;
        // Get post type
        if ( isset( $_REQUEST['post_type'] ) ) {
            $this_post_type = $_REQUEST['post_type'];
        } elseif ( isset( $wp_query->query_vars['post_type'] ) ) {
            $this_post_type = $wp_query->query_vars['post_type'];
        } elseif ( $pagenow == 'upload.php' ) {
            $this_post_type = 'attachment';
        } else {
            $this_post_type = FALSE;
        }
        // Abort if there is no post type
        if ( ! $this_post_type ) {
            return;
        }
        // Abort if there are no posts for the post type
        $posts = get_posts( [ 'post_type' => $this_post_type, 'posts_per_page' => 1, 'fields' => 'ids' ] );
        if ( ! count( $posts ) ) {
            return;
        }
        // Abort if not on post or edit pages, or media library
        if( ! in_array( $pagenow, [ 'post-new.php', 'post.php', 'edit.php', 'upload.php' ] ) ) {
            return;
        }
        // Echo the button
        echo '<a class="do-csv-btn" href="' . admin_url( '/' . $pagenow . '?page=' . $this->option_name . '&post_type=' . $this_post_type, 'relative' ) . '">Export to CSV</a>';
    }

    public function button_styles() {
        echo '<style>
                a.do-csv-btn {
                    display: inline-block;
                    padding: 7px 12px;
                    background-color: #777;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    border: 3px #ccc solid;
                    position: absolute;
                    top: 50px;
                    right: 20px;
                }
                @media(max-width:600px) {
                    a.do-csv-btn { top: 100px; }
                }
            </style>';
    }

    // Create csv options page
    public function options() {
        // Vars
        $this->option_name = 'do_csv_options';
        if ( isset( $_REQUEST['post_type'] ) ) {
            $this->post_type = $_REQUEST['post_type'];
        }
        $this->sample_post_id = current( get_posts( [ 'post_type' => $this->post_type, 'posts_per_page' => 1, 'fields' => 'ids' ] ) );
        global $do_custom_post_types;
        $post_type_obj = isset( $do_custom_post_types[ $this->post_type ] ) ? $do_custom_post_types[ $this->post_type ] : FALSE;
        $post_custom_array = $post_type_obj ? array_keys( $post_type_obj->meta_fields ) : [];
        $get_post_array = get_post( $this->sample_post_id, 'ARRAY_A' );
        $default_fields_array = is_array( $get_post_array ) ? array_keys( $get_post_array ) : [];
        $custom_fields_array = $post_custom_array ? $post_custom_array : [];
        $compare_options = [ '=', '!=', '>', '>=', '<', '<=', 'LIKE', 'NOT LIKE', 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN', 'NOT EXISTS' ];
        sort( $custom_fields_array );
        sort( $default_fields_array );
        // Options Screen
        $this->option_screen = new DO_Options_Screen( $this->option_name );
        $this->option_screen->settings( [
            'page_title' => 'CSV Export Options',
            'onsave_callback' => [ $this, 'build' ],
            'pre_form_callback' => [ $this, 'error_message' ],
            'hide_menu' => true,
        ] );
        $this->option_screen->fields( [
            'Post Type' => [ $this, 'display_post_type_callback' ],
            'Custom Fields' => [
                'type' => 'checkbox',
                'options' => $custom_fields_array,
            ],
            'Default Fields' => [
                'type' => 'checkbox',
                'options' => $default_fields_array,
            ],
            'Date Format' => [
                'type' => 'select',
                'options' => [
                    'YYYY-MM-DD', 'MM-DD-YYYY', 'MM/DD/YYYY', 'Month D, YYYY'
                ],
            ],
            'Where Custom Field' => [
                'type' => 'select_array',
                'options' => $custom_fields_array,
            ],
            'Custom Field Value' => 'text_array',
            'Custom Field Compare' => [
                'type' => 'radio',
                'options' => $compare_options,
            ],
            'Where Default Field' => [
                'type' => 'select',
                'options' => $default_fields_array,
            ],
            /* 'Default Field Compare' => [
                'type' => 'radio',
                'options' => $compare_options,
            ],*/
            'Default Field Value' => 'text',
        ] );
    }

    public function build( $validated_input ) {
        ini_set( 'memory_limit', '1024M' );
        $this->post_type = $this->post_type ? $this->post_type : $validated_input['post_type'];
        global $do_custom_post_types;
        $delimiter = ',';
        $default_fields_array = isset( $validated_input['default_fields'] ) && is_array( $validated_input['default_fields'] ) ? $validated_input['default_fields'] : [];
        $custom_fields_array = isset( $validated_input['custom_fields'] ) && is_array( $validated_input['custom_fields'] ) ? $this->custom_fields_array( $validated_input['custom_fields'] ) : [];
        $cpt_class = isset( $do_custom_post_types[ $this->post_type ] ) ? $do_custom_post_types[ $this->post_type ] : FALSE;
        $header_row = array_merge( $default_fields_array, array_keys( $custom_fields_array ) );

        // Filters
        $custom_field_where = isset( $validated_input['where_custom_field'] ) ? $validated_input['where_custom_field'] : FALSE;
        $custom_field_value = isset( $validated_input['custom_field_value'] ) ? $validated_input['custom_field_value'] : FALSE;
        $custom_field_relation = isset( $validated_input['custom_field_relation'] ) && strlen( $validated_input['custom_field_relation'] ) ? $validated_input['custom_field_relation'] : 'AND';
        $custom_field_compare = isset( $validated_input['custom_field_compare'] ) && strlen( $validated_input['custom_field_compare'] ) ? $validated_input['custom_field_compare'] : '=';
        $default_field_where = isset( $validated_input['where_default_field'] ) ? $validated_input['where_default_field'] : '';
        //$default_field_compare = isset ( $validated_input['default_field_compare'] ) && strlen( $validated_input['default_field_compare'] ) ? $validated_input['default_field_compare'] : '=';
        $default_field_value = isset( $validated_input['default_field_value'] ) ? $validated_input['default_field_value'] : '';

        // Return if no content was selected
        if ( ! is_array( $header_row ) || ! count( $header_row ) ) {
            //$validated_input['csv-error'] = 'No content was selected for the CSV.';
            return $validated_input;
        }
        // Date format
        $date_format = isset( $validated_input['date_format'] ) ? $validated_input['date_format'] : 'YYYY-MM-DD';
        switch ( $date_format ) {
            case 'MM-DD-YYYY':
                $date_format = 'm-d-Y';
                break;
            case 'MM/DD/YYYY':
                $date_format = 'm/d/Y';
                break;
            case 'Month D, YYYY':
                $date_format = 'F n, Y';
                break;
            case 'YYYY-MM-DD':
            default:
                $date_format = 'Y-m-d';
                break;
        }
        // Get posts
        $args = [
            'post_type' => $this->post_type,
            'nopaging' => true,
        ];
        // Custom Field Filter
        if ( $custom_field_where && $custom_field_value && count( $custom_field_where ) == count( $custom_field_value ) ) {
            $args['meta_query'] = [ 'relation' => $custom_field_relation ];
            for ( $i = 0; $i < count( $custom_field_where ); $i ++ ) {
                if ( strlen( $custom_field_where[ $i ] ) && strlen( $custom_field_value[ $i ] ) ) {
                    $args['meta_query'][] = [
                        'key' => $custom_field_where[ $i ],
                        'value' => $custom_field_value[ $i ],
                        'compare' => $custom_field_compare
                    ];
                }
            }
        }
        // Default Field Filter
        if ( strlen( $default_field_where ) && strlen( $default_field_value ) ) {
            $args[ $default_field_where ] = $default_field_value;
        }

        $posts = get_posts( $args );
        // Return if there are no posts
        if ( ! count( $posts ) ) {
            $validated_input['csv_error'] = 'There are no posts for this content type.';
            return $validated_input;
        }
        // Create content array
        $content_rows = [];
        // Add content to array
        foreach ( $posts as $post ) {
            $content_rows[ $post->ID ] = [];
            foreach ( $default_fields_array as $default_field_name ) {
                $content_rows[ $post->ID ][ $default_field_name ] = $post->{ $default_field_name };
            }
            foreach ( $custom_fields_array as $custom_field_name => $custom_field_type ) {
                // if the field type is a date, format the value
                $do_get_post_meta = do_get_post_meta( $post->ID, $custom_field_name );
                if ( in_array( $custom_field_type, [ 'date_time', 'date_time_timezone' ] ) && strlen( $do_get_post_meta ) ) {
                    if ( $custom_field_type == 'date_time_timezone' ) {
                        $custom_value_array = explode( '|', $do_get_post_meta );
                        $timezone = isset( $custom_value_array[1] ) ? $custom_value_array[1] : '';
                        $do_get_post_meta = isset( $custom_value_array[0] ) ? $custom_value_array[0] : $do_get_post_meta;
                    }
                    $custom_value = is_numeric( $do_get_post_meta ) && $do_get_post_meta > 0 ? date( $date_format, $do_get_post_meta ) . ( isset( $timezone ) && strlen( $timezone ) ? ' ' . $timezone : '' ) : '';
                }
                // otherwise just show it
                else {
                    if ( is_array( $do_get_post_meta ) ) {
                        $meta_array_string = '{';
                        foreach ( $do_get_post_meta as $key => $value ) {
                            $meta_array_string .= $key . '=>' . $value . ';';
                        }
                        $meta_array_string = trim( $meta_array_string, '; ');
                        $meta_array_string .= '}';
                        $custom_value = $meta_array_string;
                        //$custom_value = serialize( $do_get_post_meta );
                    }
                    // If pretty values
                    elseif ( $cpt_class && isset( $cpt_class->meta_fields[ $custom_field_name ] ) && is_array( $cpt_class->meta_fields[ $custom_field_name ] ) && isset( $cpt_class->meta_fields[ $custom_field_name ][0] ) && is_object( $cpt_class->meta_fields[ $custom_field_name ][0] ) ) {
                        $meta_field_details = $cpt_class->meta_fields[ $custom_field_name ][0];
                        $raw_meta_values = explode( ';', $do_get_post_meta );
                        $organized_value_options = $meta_field_details->organize_options();
                        $custom_values = [];
                        foreach ( $raw_meta_values as $value ) {
                            $custom_values[] = isset( $organized_value_options[ $value ] ) ? $organized_value_options[ $value ] : $value;
                        }
                        $custom_value = (string) implode( ', ', $custom_values );
                    } elseif ( $cpt_class && in_array( $do_get_post_meta, [ '0', '1' ] ) ) {
                        $custom_value = $do_get_post_meta ? 'True' : '';
                    }
                    // Values as they appear in the database
                    else {
                        $custom_value = (string) $do_get_post_meta;
                    }
                }
                $content_rows[ $post->ID ][ $custom_field_name ] = $custom_value;
            }
        }
        // Return if content array is still empty
        if ( ! count( $content_rows ) ) {
            $validated_input['csv_error'] = 'There was no content to write.';
            return $validated_input;
        }
        // Create CSV file
        $this->generate( $header_row, $content_rows, $delimiter );
        // Clear options
        update_option( $this->option_name, '' );
        die();
    }

    private function custom_fields_array( $field_names ) {
        $custom_fields = [];
        if ( count( $field_names ) ) {
            global $do_custom_post_types;
            $cpt = $do_custom_post_types[ $this->post_type ];
            foreach ( $field_names as $field ) {
                $custom_fields[ $field ] = $this->get_field_type( $cpt->meta_fields[ $field ] );
            }
        }
        return $custom_fields;
    }

    private function get_field_type( $field_settings ) {
        // If using DO_CPT_Form_Field
        if ( is_a( $field_settings, 'DO_CPT_Form_Field' ) ) {
            $type = 'DO_CPT_Form_Field';
        }
        else if ( is_array( $field_settings ) ) {
            // Method callback
            if ( isset( $field_settings[0] ) ) {
                if ( isset( $field_settings[1] ) && strpos( $field_settings[1], '_callback' ) ) {
                    $type = 'callback';
                }
            }
            // Something with an array of settings
            elseif ( isset( $field_settings['type'] ) ) {
                $type = $field_settings['type'];
            }
        }
        // A plain John field
        else {
            $type = $field_settings;
        }
        return $type;
    }

    private function generate( $header_row, $content_rows, $delimiter = ',' ) {
        header( 'Content-Type: text/csv' );
        header( 'Content-Disposition: attachment; filename=do_csv_' . $this->post_type . '_' . date( 'Ymd' ) . '.csv' );

        $file = fopen( 'php://output', 'w' );
        // utf-8 encoding
        fputs( $file, $bom = ( chr( 0xEF ) . chr( 0xBB ) . chr( 0xBF ) ) );
        fputcsv( $file, $header_row, $delimiter );
        foreach ( $content_rows as $row ) {
            fputcsv( $file, $row, $delimiter );
        }
        fclose( $file );
    }

    function display_post_type_callback( $option_name, $location = 'edit', $value = FALSE ) {
        switch ( $location ) {
            case 'edit':
                echo '<input type="hidden" name="' . $option_name . '[post_type]" value="' . $this->post_type . '" id="post_type">' . $this->post_type;
                break;
            case 'validate':
                $validate = new DO_Form_Field_Validate( 'text', $value );
                return $validate->value;
                break;
            default:
                break;
        }
    }

    public function error_message() {
        $this->options = get_option( $this->option_name );
        if ( isset( $this->options['csv_error'] ) ) {
            echo '<p><b>' . $this->options['csv_error'] . '</b></p>';
        }
    }
}

$do_csv = new DO_CSV();