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
                return update_post_meta( $object->ID, '_menu_mega_menu', wp_slash( $value ) );
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
                return update_post_meta( $object->ID, '_menu_icon', wp_slash( $value ) );
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
                return update_post_meta( $object->ID, '_menu_media_icon', wp_slash( $value ) );
            },
        ],
    );
}
add_filter( 'rest_prepare_nav_menu_item', function( $data, $post, $context  ) {
    $data->data['fields'][ '_menu_mega_menu' ] = devo_get_post_meta( $post->ID, '_menu_mega_menu' );
    $data->data['fields'][ '_menu_icon' ] = devo_get_post_meta( $post->ID, '_menu_icon' );
    $data->data['fields'][ '_menu_media_icon' ] = devo_get_post_meta( $post->ID, '_menu_media_icon' );
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
    // Only post types the front end may list; a request can narrow the list
    // but never widen it.
    $allowed_post_types = devo_get_public_post_types( 'indexed_array' );
    if ( isset( $query_params['post_type'] ) && $query_params['post_type'] !== 'any' ) {
        $post_type = devo_filter_public_post_types( $query_params['post_type'] );
        if ( ! count( $post_type ) ) {
            return [];
        }
    } else {
        $post_type = $allowed_post_types;
    }
    if ( ! count( $post_type ) ) {
        return [];
    }
    $posts_per_page = devo_clamp_posts_per_page( isset( $query_params['posts_per_page'] ) ? $query_params['posts_per_page'] : 15 );
    $orderbys = isset( $query_params['orderby'] ) && is_string( $query_params['orderby'] ) ? $query_params['orderby'] : '';
    $post_not_in = isset( $query_params['post__not_in'] ) ? wp_parse_id_list( $query_params['post__not_in'] ) : [];
    $featured = isset( $query_params['featured'] ) ? rest_sanitize_boolean( $query_params['featured'] ) : FALSE;
    $query_args = [
        'post_type' => $post_type,
        'post_status' => 'publish',
        'posts_per_page' => $posts_per_page,
        'meta_query' => [ 'relation' => 'AND' ],
    ];
    // Exclude Posts
    if ( count( $post_not_in ) ) {
        $query_args['post__not_in'] = $post_not_in;
    }
    // Order By: field_direction, comma-separated (title_asc,date_desc), or
    // anything_random
    // Only core post fields and the meta keys allowed by the
    // devo_archive_sortable_meta_keys filter (none by default) can be sorted
    // on. Ordering by an arbitrary meta key reveals the order of its values,
    // which leaks private meta one comparison at a time.
    if ( strlen( $orderbys ) ) {
        $core_orderbys = [
            'date' => 'date',
            'post_date' => 'date',
            'modified' => 'modified',
            'post_modified' => 'modified',
            'title' => 'title',
            'post_title' => 'title',
            'name' => 'name',
            'post_name' => 'name',
            'menu_order' => 'menu_order',
            'id' => 'ID',
            'post_type' => 'type',
        ];
        $sortable_meta_keys = apply_filters( 'devo_archive_sortable_meta_keys', [], $post_type );
        $sortable_meta_keys = is_array( $sortable_meta_keys ) ? array_filter( $sortable_meta_keys, 'is_string' ) : [];
        $posts_orderbys = explode( ',', $orderbys );
        foreach ( $posts_orderbys as $posts_orderby ) {
            $order_options = explode( '_', $posts_orderby );
            $order = strtolower( end( $order_options ) );
            $orderby = sanitize_key( substr( $posts_orderby, 0, - ( strlen( $order ) + 1 ) ) );
            if ( $order === 'random' ) {
                $query_args['orderby'] = 'rand';
                break;
            }
            if ( count( $order_options ) < 2 || ! in_array( $order, [ 'asc', 'desc' ], TRUE ) || ! strlen( $orderby ) ) {
                continue;
            }
            if ( isset( $core_orderbys[ $orderby ] ) ) {
                $query_args['orderby'][ $core_orderbys[ $orderby ] ] = strtoupper( $order );
            } elseif ( in_array( $orderby, $sortable_meta_keys, TRUE ) ) {
                $query_args['orderby'][ $orderby ] = strtoupper( $order );
                $query_args['meta_query'][ $orderby ] = [
                    'key' => $orderby,
                ];
            }
        }
        // Add is_modified to override any default orderby settings
        $query_args['is_modified'] = TRUE;
    }
    // Default orderby
    if ( ! isset( $query_args['orderby'] ) ) {
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
    $featured_posts = [];
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
    // Same shape as /wp/v2/{type}: core's response plus the theme's fields
    $prepared = [];
    foreach ( $posts as $post ) {
        $prepared_post = devo_rest_prepare_post( $post, $data );
        if ( $prepared_post ) {
            $prepared[] = $prepared_post;
        }
    }
    return $prepared;
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
    $form_id = isset( $query_params['formID'] ) ? DO_Form_Builder::published_form_id( $query_params['formID'] ) : FALSE;
    if ( ! $form_id ) {
        return new WP_Error( 'devo_form_not_found', __( 'No form found.', 'developers_only' ), [ 'status' => 404 ] );
    }
    // Get the form
    $form = DO_Form_Builder::display( $form_id );

    return $form;
}

/* Spam controls for the public submit endpoint.
 *
 * The route has to stay open to anonymous visitors, so it can't be protected by
 * a nonce or a capability check. Instead it relies on cheap, stateless-ish
 * controls: a honeypot field that only automated clients fill in, a per-client
 * rate limit, and caps on the confirmation email. All are filterable so a site
 * can tune or disable them.
 *
 * Without these, an unauthenticated caller can create unlimited
 * devo_form_submission posts and make the site send unlimited mail - including
 * the confirmation email, whose recipient comes from the payload. */

// Name of the honeypot input. Deliberately looks like a real field so bots fill
// it; the rendered markup hides it and marks it aria-hidden for humans and AT.
function devo_form_honeypot_field() {
    return apply_filters( 'devo_form_honeypot_field', 'devo-form-website' );
}

// Submissions allowed from one client per window. Set max to 0 to disable.
function devo_form_rate_limit_settings() {
    return [
        'max' => (int) apply_filters( 'devo_form_rate_limit_max', 5 ),
        'window' => (int) apply_filters( 'devo_form_rate_limit_window', 10 * MINUTE_IN_SECONDS ),
    ];
}

/* What identifies "one client" for the rate limit. REMOTE_ADDR by default.
 *
 * Behind a reverse proxy or CDN every request arrives from the proxy's
 * address, so all visitors would share one allowance. Filter the key to the
 * real client address there - but only read a forwarding header your proxy
 * sets and overwrites, or a client can rotate it to dodge the limit:
 *
 *   add_filter( 'devo_form_rate_limit_key', function ( $key ) {
 *       return isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ? $_SERVER['HTTP_CF_CONNECTING_IP'] : $key;
 *   } );
 *
 * Return an empty string to skip the limit for a request. */
function devo_form_rate_limit_key( $request = NULL ) {
    $ip = isset( $_SERVER['REMOTE_ADDR'] ) && is_string( $_SERVER['REMOTE_ADDR'] ) ? $_SERVER['REMOTE_ADDR'] : '';
    $key = apply_filters( 'devo_form_rate_limit_key', $ip, $request );
    return is_scalar( $key ) ? (string) $key : '';
}

// TRUE when this client has already used up its allowance. Counts the current
// request, and refreshes the TTL so a client that keeps hammering stays blocked.
function devo_form_rate_limit_exceeded( $request = NULL ) {
    $settings = devo_form_rate_limit_settings();
    if ( $settings['max'] < 1 ) {
        return FALSE;
    }
    $client = devo_form_rate_limit_key( $request );
    if ( ! strlen( $client ) ) {
        return FALSE;
    }
    $key = 'devo_form_rl_' . md5( $client );
    $count = (int) get_transient( $key );
    if ( $count >= $settings['max'] ) {
        return TRUE;
    }
    set_transient( $key, $count + 1, $settings['window'] );
    return FALSE;
}

/* Whether the confirmation email may go to $email_address.
 *
 * The address comes from the visitor, so without limits the form would mail
 * the confirmation text to anyone, as often as asked. Each address gets at
 * most one confirmation per window, and the whole site at most a fixed number
 * per hour. Both are filterable; devo_form_send_confirmation can veto a send
 * outright (to require double opt-in, say). Counts the send when it allows it. */
function devo_form_confirmation_allowed( $email_address, $form_post_id ) {
    if ( ! is_email( $email_address ) ) {
        return FALSE;
    }
    if ( ! apply_filters( 'devo_form_send_confirmation', TRUE, $email_address, $form_post_id ) ) {
        return FALSE;
    }
    // Per recipient
    $recipient_window = (int) apply_filters( 'devo_form_confirmation_recipient_window', DAY_IN_SECONDS );
    $recipient_key = 'devo_form_conf_' . md5( strtolower( $email_address ) );
    if ( $recipient_window > 0 && get_transient( $recipient_key ) ) {
        return FALSE;
    }
    // Site-wide
    $hourly_max = (int) apply_filters( 'devo_form_confirmation_hourly_max', 50 );
    $site_key = 'devo_form_conf_hourly';
    $site_count = (int) get_transient( $site_key );
    if ( $hourly_max > 0 && $site_count >= $hourly_max ) {
        return FALSE;
    }
    if ( $recipient_window > 0 ) {
        set_transient( $recipient_key, 1, $recipient_window );
    }
    if ( $hourly_max > 0 ) {
        set_transient( $site_key, $site_count + 1, HOUR_IN_SECONDS );
    }
    return TRUE;
}

// TRUE when a submitted value has content. Values can be arrays (checkboxes).
function devo_form_value_present( $value ) {
    if ( is_array( $value ) ) {
        return (bool) strlen( implode( '', array_filter( devo_array_flatten( $value ), 'is_scalar' ) ) );
    }
    return is_scalar( $value ) && strlen( trim( (string) $value ) );
}

// A validated field value as plain text for the alert email. Array fields are
// stored JSON-encoded.
function devo_form_email_value( $value ) {
    if ( is_string( $value ) && is_json( $value ) ) {
        $decoded = json_decode( $value, TRUE );
        if ( is_array( $decoded ) ) {
            $value = implode( ', ', array_filter( devo_array_flatten( $decoded ), 'is_scalar' ) );
        }
    }
    return is_scalar( $value ) ? html_entity_decode( wp_strip_all_tags( (string) $value ), ENT_QUOTES | ENT_HTML5, 'UTF-8' ) : '';
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
    // Only published forms take submissions. Everything after this reads from
    // the validated form, never from the identifiers in the request.
    $form_post_id = isset( $query_params['devo-form-post-id'] ) ? DO_Form_Builder::published_form_id( $query_params['devo-form-post-id'] ) : FALSE;
    if ( ! $form_post_id ) {
        return new WP_Error( 'devo_form_not_found', __( 'No form found.', 'developers_only' ), [ 'status' => 404 ] );
    }
    $form_id = devo_get_post_meta( $form_post_id, 'form_form_id' );
    $form_id = is_string( $form_id ) ? $form_id : '';

    // Honeypot. A browser leaves this empty; anything that fills it is
    // automated. Answer exactly as if the submission succeeded so the caller
    // learns nothing, but store nothing and send nothing.
    $honeypot_field = devo_form_honeypot_field();
    if ( isset( $query_params[ $honeypot_field ] ) && devo_form_value_present( $query_params[ $honeypot_field ] ) ) {
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
    if ( devo_form_rate_limit_exceeded( $data ) ) {
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
    // The hidden identifier fields always carry the validated values, whatever
    // the request said.
    $trusted_values = [
        'devo-form-id' => $form_id,
        'devo-form-post-id' => (string) $form_post_id,
    ];
    $form_values_array = [];
    $json_encode_me = [];
    $email_address = FALSE;
    // Set submitted to true and add a missing_fields property
    $form['submitted'] = TRUE;
    $form['missing_fields'] = [];
    foreach ( $form_fields as $field_name => $form_field ) {
        // The submit button and privacy notice carry no data
        if ( in_array( $field_name, [ 'devo-form-submit', 'devo-privacy-policy' ], TRUE ) ) {
            continue;
        }
        $required = $form_field['required'];
        if ( isset( $trusted_values[ $field_name ] ) ) {
            $raw_value = $trusted_values[ $field_name ];
        } else {
            $raw_value = isset( $query_params[ $field_name ] ) ? $query_params[ $field_name ] : NULL;
            // Only strings and arrays of them are form input
            if ( ! is_string( $raw_value ) && ! is_array( $raw_value ) ) {
                $raw_value = NULL;
            }
        }
        $present = $raw_value !== NULL && devo_form_value_present( $raw_value );
        // If it is required but not present, add to the list of missing fields and set error to true
        if ( $required && ! $present ) {
            $form['missing_fields'][] = $field_name;
            $form['error'] = TRUE;
            continue;
        }
        if ( $raw_value === NULL ) {
            continue;
        }
        // Sanitize
        $validate = new DO_Form_Field_Validate( $form_field['field_type'], $raw_value );
        $value = $validate->value;
        // Add to field's current_value property
        $form_field['current_value'] = $value;
        $form_fields[ $field_name ]['current_value'] = $value;
        // Keyed by field ID: two fields can share a label (a billing and a
        // shipping "Name"), and keying by label kept only the last one. The
        // label is kept for the admin's Data table.
        $json_encode_me[ $field_name ] = [
            'label' => $form_field['label'],
            'value' => $value,
        ];
        // And to $form_values_array (for storing in the submissions post type)
        $form_values_array[ $field_name ] = $form_field;
        // The confirmation email goes to the first email-type field, and only
        // if it holds an actual address.
        if ( $email_address === FALSE && $form_field['field_type'] === 'email' && is_string( $value ) && is_email( $value ) ) {
            $email_address = $value;
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
    // Save. Private: submissions are only ever read in wp-admin.
    $create_submission_args = [
        'post_type' => 'devo_form_submission',
        'post_status' => 'private',
        'post_title' => $email_address ? $email_address : $form_id,
        'post_content'  => '',
    ];
    $submission_id = wp_insert_post( $create_submission_args );
    if ( $submission_id && ! is_wp_error( $submission_id ) ) {
        // update_post_meta() unslashes, so slash first or the JSON's own
        // escapes (é, \") are stripped and the stored value breaks.
        update_post_meta( $submission_id, 'submission_email', wp_slash( $email_address ? $email_address : '' ) );
        update_post_meta( $submission_id, 'submission_form_id', wp_slash( $form_id ) );
        update_post_meta( $submission_id, 'submission_data', wp_slash( wp_json_encode( $json_encode_me ) ) );
    }

    // Submission Email Alert (internal)
    $form_name = devo_get_post_meta( $form_post_id, 'form_form_name' );
    // Both are stored as sanitised HTML ("R&amp;D"); the subject header is
    // plain text.
    $form_name = devo_plain_text( $form_name );
    $subject = devo_plain_text( devo_get_post_meta( $form_post_id, 'form_email_subject' ) );
    $submission_email_subject = is_string( $subject ) && strlen( $subject ) ? $subject : sprintf( /* translators: %s: form name. */ __( 'Submission from %s form', 'developers_only' ), $form_name );
    // Submitted values go into an HTML email, so every one is escaped.
    $submission_email_content = '';
    foreach ( $form_values_array as $field_name => $field_details ) {
        $submission_email_content .= esc_html( $field_details['label'] ) . ': ' . nl2br( esc_html( devo_form_email_value( $field_details['current_value'] ) ) ) . '<br>';
    }
    $email_submissions_to = FALSE;
    // Logic: route by the value of one field
    $email_submissions_logic = devo_get_post_meta( $form_post_id, 'form_email_submissions_logic' );
    if ( is_object( $email_submissions_logic ) && isset( $email_submissions_logic->map ) && is_array( $email_submissions_logic->map ) && count( $email_submissions_logic->map ) ) {
        // Organize the options
        $options = [];
        foreach ( $email_submissions_logic->map as $map ) {
            if ( isset( $map->value, $map->email_addresses ) ) {
                $options[ $map->value ] = $map->email_addresses;
            }
        }
        $logic_field_id = isset( $email_submissions_logic->field_id ) ? $email_submissions_logic->field_id : '';
        if ( isset( $form_values_array[ $logic_field_id ] ) && is_scalar( $form_values_array[ $logic_field_id ]['current_value'] ) && isset( $options[ $form_values_array[ $logic_field_id ]['current_value'] ] ) ) {
            $email_submissions_to = $options[ $form_values_array[ $logic_field_id ]['current_value'] ];
        }
    }
    // Simple send: no routing logic, or none of its options matched (the
    // field was left empty, or holds a value with no mapping). Without this
    // fallback an unmatched submission sent no alert at all.
    if ( ! $email_submissions_to ) {
        $simple_to = devo_get_post_meta( $form_post_id, 'form_email_submissions_to' );
        $email_submissions_to = is_string( $simple_to ) && strlen( $simple_to ) ? $simple_to : FALSE;
    }
    if ( $email_submissions_to ) {
        $send_alert = new DO_Send_Simple_Email( FALSE, FALSE, $email_submissions_to, $submission_email_subject, $submission_email_content );
        $form['alert_status'] = [
            'status_code' => $send_alert->status_code,
            'log' => $send_alert->status_log,
        ];
    }

    // Confirmation Email (if applicable). Its content is the form's own copy,
    // never anything from the request.
    $confirmation_email_content = devo_get_post_meta( $form_post_id, 'form_email_confirmation' );
    if ( $email_address && is_string( $confirmation_email_content ) && strlen( $confirmation_email_content ) && devo_form_confirmation_allowed( $email_address, $form_post_id ) ) {
        $confirmation_email_subject = is_string( $subject ) && strlen( $subject ) ? $subject : sprintf( /* translators: %s: form name. */ __( 'Submission of %s form', 'developers_only' ), $form_name );
        $send_confirmation = new DO_Send_Simple_Email( FALSE, FALSE, $email_address, $confirmation_email_subject, nl2br( esc_html( $confirmation_email_content ) ) );
        $form['confirmation_status'] = [
            'status_code' => $send_confirmation->status_code,
            'log' => $send_confirmation->status_log,
        ];
    }

    // Fire an action, for callback purposes. The hook name comes from the
    // form's configured ID, not from the request.
    $action_suffix = sanitize_key( str_replace( '-', '_', $form_id ) );
    if ( strlen( $action_suffix ) ) {
        do_action( 'devo_form_submit_' . $action_suffix, $form_values_array, $form_post_id );
    }
    do_action( 'devo_form_submit', $form_values_array, $form_post_id, $form_id );
    // Return the form
    return $form;
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
    $prepared_post = $post ? devo_rest_prepare_post( $post, $data ) : NULL;
    if ( ! $prepared_post ) {
        return new WP_Error( 'devo_not_found', __( 'No page found for that slug.', 'developers_only' ), [ 'status' => 404 ] );
    }
    return $prepared_post;
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
    // Match core's /wp/v2/media visibility: an attachment uploaded to a draft,
    // private or otherwise unreadable post is hidden from anyone who can't read
    // that parent. Answer with the same 404 so its existence doesn't leak.
    $attachments_controller = new WP_REST_Attachments_Controller( 'attachment' );
    if ( ! $media || ! $attachments_controller->check_read_permission( $media ) ) {
        return new WP_Error( 'devo_not_found', __( 'No media found for that slug.', 'developers_only' ), [ 'status' => 404 ] );
    }
    $post_date = new DO_Form_Field_API_Display( 'date', 'post_date', $media->ID, FALSE, date( 'U', strtotime( $media->post_date ) ) );
    $media->post_date = $post_date->output;
    return $media;
}

