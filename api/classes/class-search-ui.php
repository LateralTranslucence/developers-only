<?php

class DO_Search_UI {
    public $output;
    private $fields;
    private $field_label_location;
    private $fields_raw;
    private $query_string;
    public $results_statement;
    private $search_results;
    private $settings;
    public $sort;
    public $ui;

    function __construct( $settings = [], $search_results = FALSE ) {
        $this->settings = $settings;
        $this->field_label_location = isset( $settings['label_location'] ) ? $settings['label_location'] : 'inside';
        $this->search_results = $search_results;
        $this->fields_raw = $settings['fields'];
        $this->fields = $this->fields();
        $this->ui = $this->fields;
        $this->query_string = $this->search_results->query_string;
        $this->results_statement = $this->results_statement( $search_results );
        $this->sort = $this->sort( $settings['sort'], $settings['hide_sort_by'] );
    }

    private function fields() {
        $fields = [];
        if ( count( $this->fields_raw ) ) {
            foreach ( $this->fields_raw as $field_name => $field_details ) {
                // Set label location
                $field_details['label_location'] = $this->field_label_location;
                // If there's a meta_key, use it as the field_name
                $field_name = $field_details['meta_key'] ? $field_details['meta_key'] : $field_name;
                $field_details['name'] = $field_name;
                // If the field requires additional setup, do it...
                if ( method_exists( $this, $field_details['type'] ) ) {
                    $field_details = $this->{ $field_details['type'] }( $field_details );
                }
                $fields[ $field_name ] = $field_details;
            }
        }
        return $fields;
    }

    private function results_statement( $search_results ) {
        $per_page = (int) $search_results->query['posts_per_page'];
        $page_num = (int) $search_results->current_page;
        $first = ( $per_page * $page_num ) - $per_page + 1;
        $last = $search_results->found_posts >= $per_page && $first + ( $per_page - 1 ) <= $search_results->found_posts ? $first + ( $per_page - 1 ) : $search_results->found_posts;
        $results_statement = [
            'text' => $search_results->found_posts ? 'Showing ' . $first . '-' . $last . ' of ' . $search_results->found_posts : '',
            'criteria' => [],
        ];
        foreach ( $search_results->query_fields as $key => $value ) {
            if ( ! in_array( $key, [ 'paged', 'posts_per_page', 'sort' ] ) ) {
                $default_value = isset( $search_results->default_query_fields[ $key ] ) ? $search_results->default_query_fields[ $key ] : FALSE;
                if (
                    // If part of the current query is not in the default query,
                    ! $default_value ||
                    // or if it is but it's changed
                    $default_value !== $value
                ) {
                    // Add it to the results statement criteria
                    // If it's an array
                    if ( is_array( $value ) ) {
                        foreach ( $value as $value_piece ) {
                            if (
                                // The piece is not empty
                                devo_has_value( $value_piece ) &&
                                // The field exists
                                isset( $this->fields[ $key ] )
                            ) {
                                // If the field is in the default query
                                if ( $default_value ) {
                                    // implode it if it's an array
                                    $value_string = is_array( $default_value ) ? implode( ',', $default_value ) : $default_value;
                                }
                                // If the field is not in the default query
                                else {
                                    $value_string = '';
                                }
                                // Only add the current value piece to criteria if it is not part of the default query or if the filter option matches the default query
                                $field_options = isset( $this->fields[ $key ]['options'] ) ? array_keys( $this->fields[ $key ]['options'] ) : FALSE;
                                // If there is an 'all' option, remove it for comparision
                                if ( $field_options && in_array( 'all', $field_options ) ) {
                                    unset( $field_options[ array_search( 'all', $field_options ) ] );
                                    $field_options = array_values( $field_options );
                                }
                                if ( ! $default_value || ! in_array( $value_piece, $default_value ) || ( $field_options && $field_options === $default_value ) ) {
                                    $results_statement['criteria'][] = [
                                        'label' => isset( $this->fields[ $key ]['options'][ $value_piece ] ) ? $this->fields[ $key ]['options'][ $value_piece ]['label'] : $value_piece,
                                        'name' => $key,
                                        'value' => $value_piece,
                                        'value_string' => $key . '=' . $value_string,
                                    ];
                                }
                            }
                        }
                    }
                    // If it's not an array
                    else {
                        $results_statement['criteria'][] = [
                            'label' => str_replace( $key . '=', '', $value ),
                            'name' => $key,
                            'value' => '',
                            'value_string' => $key . '=',
                        ];
                    }
                }
            }
        }
        return $results_statement;
    }

    private function sort( $sort_settings = [], $hide_sort_by = FALSE ) {
        $default_sort = count( $sort_keys = array_keys( $sort_settings ) ) && isset( $sort_keys[0] ) ? $sort_keys[0] : 'date_desc';
        $sort = [];
        $sort['current_value'] = isset( $this->search_results->query_fields['sort'] ) && $this->search_results->query_fields['sort'] ? $this->search_results->query_fields['sort'] : $default_sort;
        if ( ! $hide_sort_by ) {
            $sort['options'] = $sort_settings;
        }
        return $sort;
    }

    /*
     * FIELD TYPES
     */

    private function alphabet( $field_details ) {
        // Set the query_var
        $field_details['query_var'] = 'alpha';
        // Determine the current value
        $field_details['current_value'] = isset( $this->search_results->query_fields[ $field_details['name'] ] ) ? $this->search_results->query_fields[ $field_details['name'] ] : '';
        // Create options array
        $raw_options = [];
        foreach ( range( 'A', 'Z' ) as $letter ) {
            $raw_options[ $letter ] = [
                'label' => $letter,
                'value' => $letter,
                'name' => $letter,
                'query_string' => $this->field_query_string( $field_details['name'], $letter ),
                'count' => '',
            ];
        }
        $field_details['options'] = $this->get_alpha_count( $raw_options, $field_details );

        return $field_details;
    }

    private function post_types( $field_details ) {
        global $devo_custom_post_types;
        // Change the type to select_list
        $field_details['type'] = 'select_list';
        // Set the query_var
        $field_details['query_var'] = 'post_type';
        // Set up the options
        $options = isset( $this->settings['post_id'] ) ? devo_get_post_meta( $this->settings['post_id'], $this->settings['meta_prefix'] . '_search_post_types' . $this->settings['meta_suffix'] ) : [];
        $options = devo_filter_public_post_types( is_array( $options ) ? $options : ( is_string( $options ) && strlen( $options ) ? [ $options ] : [] ) );
        if ( ! count( $options ) ) {
            $options = devo_get_public_post_types( 'indexed_array' );
        }
        $field_details['options']['all'] = [
            'label' => 'All',
            'value' => 'all',
            'name' => 'all',
            'query_string' => $this->field_query_string( $field_details['name'], 'all' ),
            'count' => '',
        ];
        foreach ( $options as $post_type ) {
            if ( ! isset( $devo_custom_post_types[ $post_type ] ) ) {
                continue;
            }
            $field_details['options'][ $post_type ] = [
                'label' => $devo_custom_post_types[ $post_type ]->post_type_display_name,
                'value' => $post_type,
                'name' => $post_type,
                'query_string' => $this->field_query_string( $field_details['name'], $post_type ),
                'count' => '',
            ];
        }
        // Determine the current value
        $current_value = isset( $this->search_results->query_fields[ $field_details['name'] ] ) ? $this->search_results->query_fields[ $field_details['name'] ] : '';
        // If the current value is equal to the default value, no current value
        if ( isset( $this->search_results->default_query_fields[ $field_details['name'] ] ) && $current_value === $this->search_results->default_query_fields[ $field_details['name'] ] ) {
            $field_details['current_value'] = '';
        } else {
            $field_details['current_value'] = $current_value;
        }
        return $field_details;
    }

    private function search( $field_details ) {
        // Set the query_var
        $field_details['query_var'] = 's';
        // Determine the current value
        $field_details['current_value'] = isset( $this->search_results->query_fields[ $field_details['name'] ] ) ? $this->search_results->query_fields[ $field_details['name'] ] : '';
        return $field_details;
    }

    private function select_list( $field_details ) {
        // If no options have been set yet
        if ( ! isset( $field_details['options'] ) ) {
            // Get the options from a post type
            if ( isset( $field_details['options_post_type'] ) && strlen( $field_details['options_post_type'] ) ) {
                $field_details['options'] = $this->get_field_options_from_post_type( $field_details );
            }
            // Create some options from the meta field settings
            else {
                $field_details['options'] = $this->get_field_options_from_meta_field_settings( $field_details );
            }
        }
        $field_details['options'] = devo_assoc_array_sort( $field_details['options'], [ 'label' => 'ASC' ] );
        // Determine the current value
        $current_value = isset( $this->search_results->query_fields[ $field_details['name'] ] ) ? $this->search_results->query_fields[ $field_details['name'] ] : [];
        // Determine the default value
        $default_value = isset( $this->search_results->default_query_fields[ $field_details['name'] ] ) ? $this->search_results->default_query_fields[ $field_details['name'] ] : FALSE;
        // If the current value is equal to the default value, no current value
        if ( $default_value && $current_value === $default_value ) {
            $field_details['current_value'] = [];
        } else {
            $field_details['current_value'] = $current_value;
        }
        // If there's a default value...
        if ( $default_value ) {
            foreach ( $default_value as $value ) {
                // ...don't show it as an option
                if ( isset( $field_details['options'][ $value ] ) ) {
                    unset( $field_details['options'][ $value ] );
                }
                // and remove it from current value
                $current_value_key = array_search( $value, $field_details['current_value'] );
                if ( $current_value_key !== FALSE ) {
                    unset( $field_details['current_value'][ $current_value_key ] );
                    $field_details['current_value'] = array_values( $field_details['current_value'] );
                }
            }
        }
        return $field_details;
    }

    /*
     * HELPERS
     */

    private function field_query_string( $key = '', $value = '' ) {
        $default_query_fields = $this->search_results->default_query_fields;
        // If the key is in the default query...
        if ( isset( $default_query_fields[ $key ] ) ) {
            // ...and the value is not, and is not 'all'
            if ( is_array( $default_query_fields[ $key ] ) && ! in_array( $value, $default_query_fields[ $key ] ) && $value !== 'all' ) {
                // add the value to the existing key/value.
                $new_value = $default_query_fields[ $key ];
                array_push( $new_value, $value );
                return $key . '=' . implode( ',', $new_value );
            }
            // ...and the value is also in the default query, but is not 'all'
            elseif ( $value !== 'all' ) {
                // just return the new key/value pair.
                return $key . '=' . $value;
            }
        }
        // If the key is not in the default query and the value is not 'all'
        elseif ( $value !== 'all' ) {
            // just return the new key/value pair.
            return $key . '=' . $value;
        }
    }

    private function get_count( $raw_options, $field_details ) {
        global $wpdb;
        // Modify the current query to return all posts at once and unset criteria for this field
        $query = $this->search_results->query;
        unset( $query['posts_per_page'] );
        unset( $query['paged'] );
        $query['nopaging'] = TRUE;
        $query['fields'] = 'ids';
        // If this field is a meta query parameter, find it and unset it
        if ( $field_details['meta_key'] !== FALSE ) {
            if ( isset( $query['meta_query'] ) ) {
                foreach ( $query['meta_query'] as $key => $meta_query ) {
                    if ( isset( $meta_query['key'] ) && $meta_query['key'] === $field_details['meta_key'] ) {
                        unset( $query['meta_query'][ $key ] );
                    }
                }
            }
        }
        // Or if this field is a default parameter, just unset it
        elseif ( isset( $query[ $field_details['name'] ] ) ) {
            unset( $query[ $field_details['name'] ] );
        }
        // Get all meta_values for the specified meta_key and post ids
        $post_ids = implode( ',', get_posts( $query ) );
        if ( ! strlen( $post_ids ) ) {
            return [];
        }
        $meta_key = $field_details['meta_key'];
        $sql = $wpdb->prepare( "SELECT meta_value FROM $wpdb->postmeta WHERE meta_key = %s AND post_id IN ($post_ids)", $meta_key );
        $meta_values = $wpdb->get_col( $sql );
        // Loop through the meta_values and count them up
        $options_count = [];
        foreach ( $meta_values as $value_field ) {
            if ( $value_field && strlen( $value_field ) ) {
                $values = is_json( $value_field ) ? json_decode( $value_field ) : $value_field;
                // If it's an array of values, loop through them and add to $options_count
                if ( is_array( $values ) ) {
                    foreach ( $values as $value ) {
                        $value = strtolower( $value );
                        // If the value is already in the array, update the count
                        if ( isset( $options_count[ $value ] ) ) {
                            $options_count[ $value ]++;
                        }
                        // If it's not in the array, add it and set count to 1
                        else {
                            $options_count[ $value ] = 1;
                        }
                    }
                }
                // If the value is a string, just add to $options_count
                else {
                    $value = strtolower( $values );
                    // If the value is already in the array, update the count
                    if ( isset( $options_count[ $value ] ) ) {
                        $options_count[ $value ]++;
                    }
                    // If it's not in the array, add it and set count to 1
                    else {
                        $options_count[ $value ] = 1;
                    }
                }
            }
        }
        // Loop through all the options and match the count to the option
        $options = [];
        foreach ( $raw_options as $value => $option_details ) {
            if ( isset( $options_count[ $value ] ) ) {
                $option_details['count'] = $options_count[ $value ];
                $options[ $value ] = $option_details;
            }
        }
        return $options;
    }

    private function get_alpha_count( $raw_options, $field_details ) {
        global $wpdb;
        // Modify the current query to return all posts at once and unset criteria for this field
        $query = $this->search_results->query;
        unset( $query['posts_per_page'] );
        unset( $query['paged'] );
        $query['nopaging'] = TRUE;
        $query['fields'] = 'ids';
        // If this field is a meta query parameter, find it and unset it
        if ( $field_details['meta_key'] !== FALSE ) {
            if ( isset( $query['meta_query'] ) ) {
                foreach ( $query['meta_query'] as $key => $meta_query ) {
                    if ( isset( $meta_query['key'] ) && $meta_query['key'] === $field_details['meta_key'] ) {
                        unset( $query['meta_query'][ $key ] );
                    }
                }
            }
        }
        // Or if this field is a default parameter, just unset it
        elseif ( isset( $query[ $field_details['name'] ] ) ) {
            unset( $query[ $field_details['name'] ] );
        }
        // Get all post_titles for the specified post ids
        $post_ids = implode( ',', get_posts( $query ) );
        if ( ! strlen( $post_ids ) ) {
            return $raw_options;
        }
        $sql = "SELECT post_title FROM $wpdb->posts WHERE ID IN ($post_ids) ORDER BY post_title ASC";
        $titles = $wpdb->get_col( $sql );
        // Loop through the post_titles and count them up
        $options_count = [];
        foreach ( $titles as $title_field ) {
            if ( $title_field && strlen( $title_field ) ) {
                $value = strtoupper( substr( preg_replace( '/^(The|the|A|a)\s/', '', $title_field ), 0, 1 ) );
                // If the value is already in the array, update the count
                if ( isset( $options_count[ $value ] ) ) {
                    $options_count[ $value ]++;
                }
                // If it's not in the array, add it and set count to 1
                else {
                    $options_count[ $value ] = 1;
                }
            }
        }
        // Loop through all the options and match the count to the option
        $options = [];
        foreach ( $raw_options as $value => $option_details ) {
            $option_details['count'] = isset( $options_count[ $value ] ) ? $options_count[ $value ] : 0;
            $options[ $value ] = $option_details;
        }
        return $options;
    }

    private function get_field_options_from_post_type( $field_details ) {
        // Option lists come from a post type an editor picked in the panel
        // settings; never from one that is off-limits to the front end.
        $allowed_types = array_column( devo_get_post_types(), 'value' );
        $options_post_type = is_string( $field_details['options_post_type'] ) ? $field_details['options_post_type'] : '';
        $options_posts = in_array( $options_post_type, $allowed_types, TRUE ) ? get_posts( [
            'post_type' => $options_post_type,
            'post_status' => 'publish',
            'nopaging' => TRUE,
        ] ) : [];
        $options = [];
        $options['all'] = [
            'label' => 'All',
            'value' => 'all',
            'name' => 'all',
            'query_string' => $this->field_query_string( $field_details['name'], 'all' ),
            'count' => FALSE,
        ];
        foreach ( $options_posts as $post ) {
            $options[ $post->post_name ] = [
                'label' => $post->post_title,
                'value' => $post->post_name,
                'name' => $post->post_name,
                'query_string' => $this->field_query_string( $field_details['name'], $post->post_name ),
                'count' => 0, // Set count to 0. We'll update that next.
            ];
        }
        return $this->get_count( $options, $field_details );
    }

    private function get_field_options_from_meta_field_settings( $field_details ) {
        $options = [];
        // Make sure we have a meta_key to work with (if we don't, there's nothing we can do here)
        if ( isset( $field_details['meta_key'] ) && $field_details['meta_key'] ) {
            $options['all'] = [
                'label' => 'All',
                'value' => 'all',
                'name' => 'all',
                'query_string' => $this->field_query_string( $field_details['name'], 'all' ),
                'count' => FALSE,
            ];
            // If we know the post types we're looking at, use their objects to find the correct meta field options
            if ( isset( $this->search_results->query_fields['post_type'] ) ) {
                global $devo_custom_post_types;
                foreach ( $this->search_results->query_fields['post_type'] as $post_type ) {
                    // If the meta key is part of this post type, get the options
                    if (
                        // If the meta field is part of this post type
                        isset( $devo_custom_post_types[ $post_type ]->meta_fields[ $field_details['meta_key'] ] ) &&
                        // And if the meta field has options
                        isset( $devo_custom_post_types[ $post_type ]->meta_fields[ $field_details['meta_key'] ]['options'] )
                        ) {
                        // Add the options
                        $meta_field_options = $devo_custom_post_types[ $post_type ]->meta_fields[ $field_details['meta_key'] ]['options'];
                        foreach ( $meta_field_options as $option_key => $option ) {
                            $label = isset( $option['label'] ) ? $option['label'] : $this->value_to_label( $option );
                            $value = isset( $option['value'] ) ? $option['value'] : $option;
                            $options[ $option_key ] = [
                                'label' => $label,
                                'value' => $value,
                                'name' => $value,
                                'query_string' => $this->field_query_string( $field_details['name'], $value ),
                                'count' => 0, // Set count to 0. We'll update that next.
                            ];
                        }
                    }
                }
                // If we still haven't found any options, pull the fields from the database
                if ( count( $options ) <= 1 ) { // 1 because we added the 'all' option
                    $options = $this->get_field_options_from_meta_field_values( $field_details, $options );
                }
            }
            // If we don't know the post types, pull the fields from the database
            else {
                $options = $this->get_field_options_from_meta_field_values( $field_details, $options );
            }
        }
        return $this->get_count( $options, $field_details );
    }

    private function get_field_options_from_meta_field_values( $field_details, $options = [] ) {
        global $wpdb;
        $meta_key = $field_details['meta_key'];
        $sql = $wpdb->prepare( "SELECT DISTINCT meta_value FROM $wpdb->postmeta WHERE meta_key = %s", $meta_key );
        $meta_values = $wpdb->get_col( $sql );
        foreach ( $meta_values as $value_raw ) {
            if ( ! strlen( (string) $value_raw ) ) {
                continue;
            }
            $values = is_json( $value_raw ) ? json_decode( $value_raw ) : [ $value_raw ];
            $values = is_array( $values ) ? $values : [ $values ];
            foreach ( $values as $value ) {
                $value = (string) $value;
                if ( ! strlen( $value ) || isset( $options[ $value ] ) ) {
                    continue;
                }
                $options[ $value ] = [
                    'label' => $this->value_to_label( $value ),
                    'value' => $value,
                    'name' => $value,
                    'query_string' => $this->field_query_string( $field_details['name'], $value ),
                    'count' => 0,
                ];
            }
        }
        return $options;
    }

    private function value_to_label( $value_raw ) {
        $devo_not_capitalize = [ 'and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet', 'a', 'an', 'the', 'as', 'at', 'by', 'for', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via' ];
        $value_array = explode( '-', $value_raw );
        $value_words = [];
        foreach ( $value_array as $i => $value ) {
            if (
                // If it's the first word
                $i === 0 ||
                // OR if the word is not in the do not capitalize list
                ( ! in_array( $value, $devo_not_capitalize ) &&
                // AND is longer than 3 letters
                strlen( $value ) > 3 )
            ) {
                // Capitalize it
                $value_words[] = ucfirst( $value );
            }
            // If none of the above, just put it in the array
            else {
                $value_words[] = $value;
            }
        }
        return implode( ' ', $value_words );
    }
}
