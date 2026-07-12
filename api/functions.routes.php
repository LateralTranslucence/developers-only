<?php

/* 
 * API ROUTES
 * TODO: turn into class object 
 * */

function add_nav_menu_custom_fields_rest_api() {
    // Mega menu
    register_rest_field(
        'nav_menu_item',
        '_menu_mega_menu',
        [
            'get_callback' => function( $object ) {
                return devo_get_post_meta( $object['id'], '_menu_mega_menu' );
            },
            'update_callback' => function( $value, $object ) {
                return update_post_meta( $object->ID, '_menu_mega_menu', $value );
            },
        ],
    );
    // Menu icon (CSS class / Font Awesome)
    register_rest_field(
        'nav_menu_item',
        '_menu_icon',
        [
            'get_callback' => function( $object ) {
                return devo_get_post_meta( $object['id'], '_menu_icon' );
            },
            'update_callback' => function( $value, $object ) {
                return update_post_meta( $object->ID, '_menu_icon', $value );
            },
        ],
    );
    // Menu media icon (Icon Library SVG URL)
    register_rest_field(
        'nav_menu_item',
        '_menu_media_icon',
        [
            'get_callback' => function( $object ) {
                return devo_get_post_meta( $object['id'], '_menu_media_icon' );
            },
            'update_callback' => function( $value, $object ) {
                return update_post_meta( $object->ID, '_menu_media_icon', $value );
            },
        ],
    );
}
add_filter( 'rest_prepare_nav_menu_item', function( $data, $post, $context  ) {
    $data->data['fields'][ '_menu_mega_menu' ] = devo_get_post_meta( $post->ID, '_menu_mega_menu' );
    return $data;
    $data->data['fields'][ '_menu_icon' ] = devo_get_post_meta( $post->ID, '_menu_icon' );
    return $data;
}, 10, 3 );
add_action('rest_api_init', 'add_nav_menu_custom_fields_rest_api');

// Create REST API route for menu locations
add_action( 'rest_api_init', function() {
    register_rest_route( 'wp/v2', '/menu/', [
        'methods' => 'GET',
        'callback' => 'devo_menu_route',
        'permission_callback' => function () {
            return TRUE;
        }
    ] );
} );

// Menu locations
function devo_menu_route() {
    // Get nav locations set in theme
    $menu_locations = get_nav_menu_locations();
    $menus = [];
    foreach ( $menu_locations as $menu_name => $menu_id ) {
        // Get the array of wp objects, the nav items for our queried location
        $nav = wp_get_nav_menu_items( $menu_id ); 
        if ( $nav ) {
            foreach ( $nav as $nav_menu_object ) {
                $nav_menu_object->fields = [
                    '_menu_mega_menu'   => devo_get_post_meta( $nav_menu_object->ID, '_menu_mega_menu' ),
                    '_menu_icon'        => devo_get_post_meta( $nav_menu_object->ID, '_menu_icon' ),
                    '_menu_media_icon'  => devo_get_post_meta( $nav_menu_object->ID, '_menu_media_icon' ),
                ];
                $nav_menu_object->post_title = $nav_menu_object->title;
                $menus[ $menu_name ][] = $nav_menu_object;
            }
        }
    }
    return $menus;
}

// Create REST API route for individual menu
add_action( 'rest_api_init', function() {
    register_rest_route( 'wp/v2', '/menu/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => 'devo_single_menu',
        'permission_callback' => function () {
            return TRUE;
        }
    ] );
} );

// Individual menus
function devo_single_menu( $data ) {
    // Get the menu from the ID
    $menu_id = $data['id'];
    // Get the array of wp objects, the nav items for our queried location
    $primary_nav = wp_get_nav_menu_items( $menu_id ); 
    if ( $primary_nav ) {
        foreach ( $primary_nav as $nav_menu_object ) {
            $nav_menu_object->fields = [
                '_menu_mega_menu'   => devo_get_post_meta( $nav_menu_object->ID, '_menu_mega_menu' ),
                '_menu_icon'        => devo_get_post_meta( $nav_menu_object->ID, '_menu_icon' ),
                '_menu_media_icon'  => devo_get_post_meta( $nav_menu_object->ID, '_menu_media_icon' ),
            ];
            $nav_menu_object->post_title = $nav_menu_object->title;
        }
    }
    return $primary_nav;
}

/*
 * Archive Panels
 */

 // Create REST API route for archive queries
add_action( 'rest_api_init', function() {
    register_rest_route( 'wp/v2', '/archive/', [
        'methods' => 'GET',
        'callback' => 'devo_archive_query',
        'permission_callback' => function () {
            return TRUE;
        }
    ] );
} );
function devo_archive_query( $data ) {
    $query_params = $data->get_params();
    // Query Args
    $post_type = isset( $query_params['post_type'] ) && $query_params['post_type'] !== 'any' ? explode( ',', $query_params['post_type'] ) : devo_get_public_post_types( 'indexed_array' );
    $subjects = isset( $query_params['subject'] ) ? explode( ',', $query_params['subject'] ) : [];
    $region = isset( $query_params['region'] ) ? $query_params['region'] : FALSE;
    $posts_per_page = isset( $query_params['posts_per_page'] ) ? (int) $query_params['posts_per_page'] : 15;
    $orderbys = isset( $query_params['orderby'] ) ? $query_params['orderby'] : FALSE;
    $post_not_in = isset( $query_params['post__not_in'] ) ? $query_params['post__not_in'] : FALSE;
    $featured = isset( $query_params['featured'] ) ? (bool) $query_params['featured'] : FALSE;
    $query_args = [
        'post_type' => $post_type,
        'posts_per_page' => $posts_per_page,
        'meta_query' => [ 'relation' => 'AND' ],
    ];
    // Subject Filter
    if ( count( $subjects ) ) {
        $query_args['meta_query']['subject'] = [
            'relation' => 'OR',
        ];
        foreach ( $subjects as $subject ) {
            $query_args['meta_query']['subject'][] = [
                'key' => 'subject',
                'value' => $subject,
                'compare' => 'LIKE',
            ];
        }
    }
    // Region Filter
    if ( $region ) {
        $query_args['meta_query'][] = [
            'key' => 'region',
            'value' => $region,
            'compare' => 'LIKE',
        ];
    }
    // Exclude Posts
    if ( $post_not_in ) {
        $query_args['post__not_in']= [ $post_not_in ];
    }
    // Order By
    if ( strlen( $orderbys ) ) {
        $posts_orderbys = explode( ',', $orderbys );
        foreach ( $posts_orderbys as $posts_orderby ) {
            $order_options = explode( '_', $posts_orderby );
            $order = end( $order_options );
            $orderby = str_replace( '_' . $order, '', $posts_orderby );
            if ( in_array( $orderby, devo_default_fields_array() ) ) {
                $query_args['orderby'][ $orderby ] = $order;
            }
            elseif ( $order == 'random' ) {
                $query_args['orderby'] = 'rand';
            } else {
                $query_args['orderby'][ $orderby ] = $order;
                $query_args['meta_query'][ $orderby ] = [
                    'key' => $orderby,
                ];
            }
        }
        // Add is_modified to override any default orderby settings
        $query_args['is_modified'] = TRUE;
    }
    // Default orderby
    else {
        $query_args['orderby'] = [ 'date' => 'DESC' ];
    }
    // Hide Post
    $hidden_field_query = [
        'relation' => 'OR',
        [
            'key' => 'hide_post',
            'value' => '',
            'compare' => '=',
        ],
        [
            'key' => 'hide_post',
            'value' => '',
            'compare' => 'NOT EXISTS',
        ],
    ];
    $query_args['meta_query']['hidden'] = $hidden_field_query;
    // Featured posts
    if ( $featured ) {
        $featured_query = $query_args;
        $featured_query['meta_query']['featured'] = [
            [
                'key' => 'featured_post',
                'value' => 1,
                'compare' => '=',
            ],
        ];
        $featured_posts = get_posts( $featured_query );
        if ( count( $featured_posts ) ) {
            $query_args['post__not_in'] = isset( $query_args['post__not_in'] ) ? array_merge( $query_args['post__not_in'], devo_array_get_column_values( [ 'ID' ], $featured_posts ) ) : devo_array_get_column_values( [ 'ID' ], $featured_posts );
        }
    }
    // Get the posts
    $posts = get_posts( $query_args );
    // Insert Featured posts
    if ( $featured && count( $featured_posts ) ) { 
        $posts = [ ...$featured_posts, ...$posts ];
    }
    // Get all the data for all the posts
    foreach ( $posts as $i => $post ) {
        $posts[ $i ] = devo_api_custom_data( $post );
    }
    return $posts;
}

/*
 * AF Forms
 */

// Fields
add_action( 'rest_api_init', function() {
    register_rest_route( 'wp/v2', '/devo-form/', [
        'methods' => 'GET',
        'callback' => 'devo_form_query',
        'permission_callback' => function () {
            return TRUE;
        }
    ] );
} );
function devo_form_query( $data ) {
    $query_params = $data->get_params();
    $form_id = isset( $query_params['formID'] ) ? $query_params['formID'] : FALSE;
    if ( ! $form_id ) {
        return [];
    }
    // Get the form
    $form = DO_Form_Builder::display( $form_id );

    return $form;
}

// Submit
add_action( 'rest_api_init', function() {
    register_rest_route( 'wp/v2', '/devo-form-submit/', [
        'methods' => 'POST',
        'callback' => 'devo_form_submit_query',
        'permission_callback' => function () {
            return TRUE;
        }
    ] );
} );
function devo_form_submit_query( $data ) {
    $query_params = $data->get_params();
    $form_id = isset( $query_params['devo-form-id'] ) ? $query_params['devo-form-id'] : FALSE;
    $form_post_id = isset( $query_params['devo-form-post-id'] ) ? $query_params['devo-form-post-id'] : FALSE;
    if ( $form_post_id ) {
        // Get the form
        $form = DO_Form_Builder::display( $form_post_id );
        $form_fields = DO_Form_Builder::get_fields( $form_post_id, FALSE );
        $form_values_array = [];
        $json_encode_me = [];
        $email_address = FALSE;
        // Set submitted to true and add a missing_fields property
        $form['submitted'] = TRUE;
        $form['missing_fields'] = [];
        foreach ( $form_fields as $field_name => $form_field ) {
            $required = $form_field['required'];
            // If it's not required, or if it is required and is present, then proceed
            if ( isset( $query_params[ $field_name ] ) && ! in_array( $field_name, [ 'devo-form-submit', 'devo-privacy-policy' ] ) && ! $required || ( $required && isset( $query_params[ $field_name ] ) && strlen( $query_params[ $field_name ] ) ) ) {
                // Sanitize
                $validate = new DO_Form_Field_Validate( $form_field['field_type'], $query_params[ $field_name ] );
                $value = isset( $query_params[ $field_name ] ) ? $validate->value : '';
                // Add to field's current_value property
                $form_field['current_value'] = $value;
                $form_fields[ $field_name ]['current_value'] = $value;
                $json_encode_me[ $form_field['label'] ] = $value;
                // And to $form_values_array (for storing in the submissions post type)
                $form_values_array[ $field_name ] = $form_field;
                // Check to see if this is the email field
                if ( strpos( $field_name, 'email' ) !== FALSE && $email_address === FALSE ) {
                    $email_address = $value;
                }
            }
            // If it is required but not present, add to the list of missing fields and set error to true
            elseif ( $required ) {
                $form['missing_fields'][] = $field_name;
                $form['error'] = TRUE;
            }
        }
        // Organize the fields and add to form object
        $raw_fieldsets = DO_Form_Builder::get_fieldsets( $form_post_id );
        $form_items = DO_Form_Builder::organize_fields( $form_fields, $raw_fieldsets );
        $form['items'] = $form_items;
        $form['alert_status'] = NULL;
        $form['confirmation_status'] = NULL;
        // If there is an error, return the form
        if ( $form['error'] ) {
            return $form;
        }
        // Otherwise, save (and maybe email) the submission, fire callback function
        else {
            // Save
            $create_submission_args = [
                'post_type' => 'devo_form_submission',
                'post_status' => 'publish',
                'post_title' => $email_address,
                'post_content'  => '',
            ];
            $submission_id = wp_insert_post( $create_submission_args );
            if ( $submission_id ) {
                update_post_meta( $submission_id, 'submission_email', $email_address );
                update_post_meta( $submission_id, 'submission_form_id', $form_id );
                update_post_meta( $submission_id, 'submission_data', json_encode( $json_encode_me ) );
            }
            // Submission Email Alert (internal)
            // Logic
            $email_submissions_logic = devo_get_post_meta( $form_post_id, 'form_email_submissions_logic' );
            if ( gettype( $email_submissions_logic ) === 'object' && count( get_object_vars( $email_submissions_logic ) ) && is_array( $email_submissions_logic->map ) && count( $email_submissions_logic->map ) ) {
                // Organize the options
                $options = [];
                foreach ( $email_submissions_logic->map as $map ) {
                    $options[ $map->value ] = $map->email_addresses;
                }
                $form_name = devo_get_post_meta( $form_post_id, 'form_form_name' );
                $submission_email_subject = strlen( $subject = devo_get_post_meta( $form_post_id, 'form_email_subject' ) ) ? $subject : __( 'Submission from ' . $form_name . ' form', 'astraea' );
                $submission_email_content = '';
                $email_submissions_to = FALSE;
                foreach ( $form_values_array as $field_name => $field_details ) {
                    $submission_email_content .= $field_details['label'] . ': ' . $field_details['current_value'] . '<br>';
                    if ( $field_name === $email_submissions_logic->field_id ) {
                        if ( isset( $options[ $field_details['current_value'] ] ) ) {
                            $email_submissions_to = $options[ $field_details['current_value'] ];
                        }
                    }
                }
                $send_alert = new DO_Send_Simple_Email( FALSE, FALSE, $email_submissions_to, $submission_email_subject, $submission_email_content );
                $form['alert_status'] = [
                    'status_code' => $send_alert->status_code,
                    'log' => $send_alert->status_log,
                ];
            }
            // Simple send
            else if ( strlen( $email_submissions_to = devo_get_post_meta( $form_post_id, 'form_email_submissions_to' ) ) ) {
                $form_name = devo_get_post_meta( $form_post_id, 'form_form_name' );
                $submission_email_subject = strlen( $subject = devo_get_post_meta( $form_post_id, 'form_email_subject' ) ) ? $subject : __( 'Submission from ' . $form_name . ' form', 'astraea' );
                $submission_email_content = '';
                foreach ( $form_values_array as $field_name => $field_details ) {
                    $submission_email_content .= $field_details['label'] . ': ' . $field_details['current_value'] . '<br>';
                }
                $send_alert = new DO_Send_Simple_Email( FALSE, FALSE, $email_submissions_to, $submission_email_subject, $submission_email_content );
                $form['alert_status'] = [
                    'status_code' => $send_alert->status_code,
                    'log' => $send_alert->status_log,
                ];
            }
            // Confirmation Email (if applicable)
            if ( $email_address && strlen( $confirmation_email_content = devo_get_post_meta( $form_post_id, 'form_email_confirmation' ) ) ) {
                $form_name = devo_get_post_meta( $form_post_id, 'form_form_name' );
                $confirmation_email_subject = strlen( $subject = devo_get_post_meta( $form_post_id, 'form_email_subject' ) ) ? $subject : __( 'Submission of ' . $form_name . ' form', 'astraea' );
                $send_confirmation = new DO_Send_Simple_Email( FALSE, FALSE, $email_address, $confirmation_email_subject, $confirmation_email_content );
                $form['confirmation_status'] = [
                    'status_code' => $send_confirmation->status_code,
                    'log' => $send_confirmation->status_log,
                ];
            }
            // Fire an action, for callback purposes
            do_action( 'devo_form_submit_' . str_replace( '-', '_', $form_values_array['devo-form-id']['current_value'] ), $form_values_array );
            // Return the form
            return $form;
        }
    }
}

/* Page */
add_action( 'rest_api_init', function() {
    register_rest_route( 'wp/v2', '/page/', [
        'methods' => 'GET',
        'callback' => 'devo_page_route',
        'permission_callback' => function () {
            return TRUE;
        }
    ] );
} );
function devo_page_route( $data ) {
    $query_params = $data->get_params();
    $page = new WP_Query( [ 'pagename' => $query_params['slug'] ] );
    return current( $page->posts );
}

/* Media Library Items */
add_action( 'rest_api_init', function() {
    register_rest_route( 'wp/v2', '/media-library/', [
        'methods' => 'GET',
        'callback' => 'devo_media_library_route',
        'permission_callback' => function () {
            return TRUE;
        }
    ] );
} );
function devo_media_library_route( $data ) {
    $query_params = $data->get_params();
    $media_query = new WP_Query( [ 'post_type' => 'attachment', 'pagename' => $query_params['slug'] ] );
    $media = current( $media_query->posts );
    $post_date = new DO_Form_Field_API_Display( 'date', 'post_date', $media->ID, FALSE, date( 'U', strtotime( $media->post_date ) ) );
    $media->post_date = $post_date->output;
    return $media;
}

