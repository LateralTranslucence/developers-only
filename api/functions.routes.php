<?php

/* 
 * API ROUTES
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

/* Spam controls for the public submit endpoint.
 *
 * The route has to stay open to anonymous visitors, so it can't be protected by
 * a nonce or a capability check. Instead it relies on two cheap, stateless-ish
 * controls: a honeypot field that only automated clients fill in, and a per-IP
 * rate limit. Both are filterable so a site can tune or disable them.
 *
 * Without these, an unauthenticated caller can create unlimited
 * devo_form_submission posts and make the site send unlimited mail - including
 * the confirmation email, whose recipient comes straight from the payload. */

// Name of the honeypot input. Deliberately looks like a real field so bots fill
// it; the rendered markup hides it and marks it aria-hidden for humans and AT.
function devo_form_honeypot_field() {
    return apply_filters( 'devo_form_honeypot_field', 'devo-form-website' );
}

// Submissions allowed from one IP per window. Set max to 0 to disable.
function devo_form_rate_limit_settings() {
    return [
        'max' => (int) apply_filters( 'devo_form_rate_limit_max', 5 ),
        'window' => (int) apply_filters( 'devo_form_rate_limit_window', 10 * MINUTE_IN_SECONDS ),
    ];
}

// TRUE when this client has already used up its allowance. Counts the current
// request, and refreshes the TTL so a client that keeps hammering stays blocked.
function devo_form_rate_limit_exceeded() {
    $settings = devo_form_rate_limit_settings();
    if ( $settings['max'] < 1 ) {
        return FALSE;
    }
    $ip = isset( $_SERVER['REMOTE_ADDR'] ) && is_string( $_SERVER['REMOTE_ADDR'] ) ? $_SERVER['REMOTE_ADDR'] : '';
    if ( ! $ip ) {
        return FALSE;
    }
    $key = 'devo_form_rl_' . md5( $ip );
    $count = (int) get_transient( $key );
    if ( $count >= $settings['max'] ) {
        return TRUE;
    }
    set_transient( $key, $count + 1, $settings['window'] );
    return FALSE;
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
        // Honeypot. A browser leaves this empty; anything that fills it is
        // automated. Answer exactly as if the submission succeeded so the caller
        // learns nothing, but store nothing and send nothing.
        $honeypot_field = devo_form_honeypot_field();
        if ( isset( $query_params[ $honeypot_field ] ) && strlen( trim( (string) $query_params[ $honeypot_field ] ) ) ) {
            $form = DO_Form_Builder::display( $form_post_id );
            $form['submitted'] = TRUE;
            $form['error'] = FALSE;
            $form['missing_fields'] = [];
            $form['alert_status'] = NULL;
            $form['confirmation_status'] = NULL;
            return $form;
        }
        // Rate limit. Returns the form with a notice rather than a WP_Error so
        // the client keeps its existing response shape and can show the message.
        if ( devo_form_rate_limit_exceeded() ) {
            $form = DO_Form_Builder::display( $form_post_id );
            $form['submitted'] = FALSE;
            $form['error'] = TRUE;
            $form['missing_fields'] = [];
            $form['notice'] = __( 'Too many submissions from this connection. Please wait a few minutes and try again.', 'developers_only' );
            return $form;
        }
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
                // Check to see if this is the email field. The value decides who
                // the confirmation email is sent to, so only accept it if it is
                // actually an address - otherwise the endpoint can be pointed at
                // arbitrary recipients.
                if ( strpos( $field_name, 'email' ) !== FALSE && $email_address === FALSE && is_email( $value ) ) {
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
        $form['notice'] = NULL;
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
                $submission_email_subject = strlen( $subject = devo_get_post_meta( $form_post_id, 'form_email_subject' ) ) ? $subject : sprintf( /* translators: %s: form name. */ __( 'Submission from %s form', 'developers_only' ), $form_name );
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
                $submission_email_subject = strlen( $subject = devo_get_post_meta( $form_post_id, 'form_email_subject' ) ) ? $subject : sprintf( /* translators: %s: form name. */ __( 'Submission from %s form', 'developers_only' ), $form_name );
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
                $confirmation_email_subject = strlen( $subject = devo_get_post_meta( $form_post_id, 'form_email_subject' ) ) ? $subject : sprintf( /* translators: %s: form name. */ __( 'Submission of %s form', 'developers_only' ), $form_name );
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
    $slug = isset( $query_params['slug'] ) ? sanitize_title( $query_params['slug'] ) : '';
    if ( ! strlen( $slug ) ) {
        return new WP_Error( 'devo_missing_slug', __( 'A slug is required.', 'developers_only' ), [ 'status' => 400 ] );
    }
    $page = new WP_Query( [ 'pagename' => $slug ] );
    $post = current( $page->posts );
    if ( ! $post ) {
        return new WP_Error( 'devo_not_found', __( 'No page found for that slug.', 'developers_only' ), [ 'status' => 404 ] );
    }
    return $post;
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
    $slug = isset( $query_params['slug'] ) ? sanitize_title( $query_params['slug'] ) : '';
    if ( ! strlen( $slug ) ) {
        return new WP_Error( 'devo_missing_slug', __( 'A slug is required.', 'developers_only' ), [ 'status' => 400 ] );
    }
    $media_query = new WP_Query( [ 'post_type' => 'attachment', 'post_status' => 'inherit', 'pagename' => $slug ] );
    $media = current( $media_query->posts );
    // current() returns FALSE on an empty result; reading ->ID off that warns and
    // hands strtotime() a null, so bail before touching the object.
    if ( ! $media ) {
        return new WP_Error( 'devo_not_found', __( 'No media found for that slug.', 'developers_only' ), [ 'status' => 404 ] );
    }
    $post_date = new DO_Form_Field_API_Display( 'date', 'post_date', $media->ID, FALSE, date( 'U', strtotime( $media->post_date ) ) );
    $media->post_date = $post_date->output;
    return $media;
}

