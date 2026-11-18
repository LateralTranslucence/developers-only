<?php
/* Helper Functions */

// Get abbreviated timezone from full timezone
function devo_abbreviated_timezone( $time, $full_timezone ) {
    $date = new DateTime( date( 'D, d M Y H:i:s', $time ), new DateTimeZone( $full_timezone ) );
    return $date->format( 'T' );
}

// From http://stackoverflow.com/questions/3512311/how-to-generate-lighter-darker-color-with-php
function devo_adjust_brightness( $hex, $steps ) {
    // Steps should be between -255 and 255. Negative = darker, positive = lighter
    $steps = max( -255, min( 255, $steps ) );
    // Normalize into a six character long hex string
    $hex = str_replace( '#', '', $hex );
    if ( strlen( $hex ) == 3 ) {
        $hex = str_repeat( substr( $hex, 0, 1 ), 2 ) . str_repeat( substr( $hex, 1, 1 ), 2 ) . str_repeat( substr( $hex, 2, 1 ), 2 );
    }
    // Split into three parts: R, G and B
    $color_parts = str_split( $hex, 2 );
    $return = '#';
    foreach ( $color_parts as $color ) {
        $color = hexdec( $color ); // Convert to decimal
        $color = max( 0, min( 255, $color + $steps ) ); // Adjust color
        $return .= str_pad( dechex( $color ), 2, '0', STR_PAD_LEFT ); // Make two char hex code
    }
    return $return;
}

/* Minimal post type details for post types that weren't registered through
 * DO_Custom_Post_Type (core post/page, plugin types), so the helpers below can
 * treat every post the same way without reading undefined indexes. */
function devo_default_post_type_details( $post_type ) {
    $post_type_object = get_post_type_object( $post_type );
    $details = new stdClass();
    $details->breadcrumbs = [];
    $details->is_landing_page = FALSE;
    $details->meta_prefix = '';
    $details->meta_fields = [];
    $details->post_content = NULL;
    $details->post_excerpt = NULL;
    $details->post_file = NULL;
    $details->post_name = NULL;
    $details->post_thumbnail = NULL;
    $details->post_title = NULL;
    $details->post_type = $post_type;
    $details->post_type_display_name = $post_type_object ? $post_type_object->labels->singular_name : '';
    $details->post_type_slug = $post_type;
    $details->private_fields = [];
    $details->schema = [];
    $details->seo_description = FALSE;
    $details->seo_image = FALSE;
    $details->seo_title = 'post_title';
    return $details;
}

// Post type details for $post_type, from the theme's registry when it has them
function devo_get_post_type_details( $post_type ) {
    global $devo_custom_post_types;
    return isset( $devo_custom_post_types[ $post_type ] ) ? $devo_custom_post_types[ $post_type ] : devo_default_post_type_details( $post_type );
}

// Absolute URL for a site-relative path such as a post's `permalink` field.
// The path already includes any subdirectory WordPress is installed in, so it
// is joined to the origin only, not to home_url().
function devo_absolute_url( $relative_path ) {
    $home = wp_parse_url( home_url() );
    $origin = ( isset( $home['scheme'] ) ? $home['scheme'] : 'https' ) . '://' . ( isset( $home['host'] ) ? $home['host'] : '' ) . ( isset( $home['port'] ) ? ':' . $home['port'] : '' );
    return $origin . '/' . ltrim( (string) $relative_path, '/' );
}

/* How many devo_rest_prepare_post() calls are in progress. A post_browser
 * field prepares the posts it lists, which can list posts of their own, so
 * this is the nesting level. Pass +1/-1 to enter/leave a level. */
function devo_rest_prepare_depth( $change = 0 ) {
    static $depth = 0;
    $depth = max( 0, $depth + (int) $change );
    return $depth;
}

/* Per-request memo for the theme's REST data. The same post is often listed
 * many times on one page (twelve landing pages that each list the same
 * twelve), and each listing used to be prepared from scratch.
 *
 * Keyed by the nesting level as well as the post, because a post's nested
 * post_browser data is cut short past three levels, so the same post prepared
 * at different depths differs. devo_rest_memo_flush() empties it when any
 * post or its meta changes, and devo_rest_memo_store() caps its size for
 * long-running processes. */
function &devo_rest_memo() {
    static $memo = [ 'custom_data' => [], 'prepared' => [] ];
    return $memo;
}
function devo_rest_memo_flush() {
    $memo = &devo_rest_memo();
    $memo = [ 'custom_data' => [], 'prepared' => [] ];
}
/* Stores one entry in a memo bucket ('custom_data' or 'prepared'). A web
 * request is short-lived, but a WP-CLI command or cron job that prepares
 * thousands of posts in one process would otherwise keep every one in memory,
 * so each bucket holds at most devo_rest_memo_limit entries (filterable,
 * default 500) and drops the oldest first. */
function devo_rest_memo_store( $bucket, $key, $value ) {
    static $limit = NULL;
    if ( $limit === NULL ) {
        $limit = max( 1, (int) apply_filters( 'devo_rest_memo_limit', 500 ) );
    }
    $memo = &devo_rest_memo();
    unset( $memo[ $bucket ][ $key ] );
    $memo[ $bucket ][ $key ] = $value;
    while ( count( $memo[ $bucket ] ) > $limit ) {
        unset( $memo[ $bucket ][ array_key_first( $memo[ $bucket ] ) ] );
    }
}
foreach ( [ 'added_post_meta', 'updated_post_meta', 'deleted_post_meta', 'clean_post_cache' ] as $devo_memo_hook ) {
    add_action( $devo_memo_hook, 'devo_rest_memo_flush', 10, 0 );
}
unset( $devo_memo_hook );

/* Adds the theme's data to a post object: `fields` (typed meta), permalink,
 * formatted date, thumbnail, seo_* values and schema.
 *
 * Mutates and returns the object it is given, so pass a clone when the
 * original WP_Post (which WordPress caches) must stay untouched. seo_* values
 * are plain text and NOT escaped: the React side escapes them, and PHP
 * templates must escape them for their own context.
 *
 * Computed once per post (and nesting level) per request; see
 * devo_rest_memo(). */
function devo_api_custom_data( $post, $post_type_details = FALSE ) {
    if ( $post ) {
        if ( $post_type_details === FALSE ) {
            $post_type_details = devo_get_post_type_details( $post->post_type );
        }
        $meta_fields_for_key = isset( $post_type_details->meta_fields ) && is_array( $post_type_details->meta_fields ) ? array_keys( $post_type_details->meta_fields ) : [];
        $memo_key = isset( $post->ID ) ? (int) $post->ID . '|' . devo_rest_prepare_depth() . '|' . md5( $post->post_type . '|' . implode( ',', $meta_fields_for_key ) ) : '';
        $memo = &devo_rest_memo();
        if ( $memo_key && isset( $memo['custom_data'][ $memo_key ] ) ) {
            foreach ( $memo['custom_data'][ $memo_key ] as $property => $value ) {
                $post->{ $property } = $value;
            }
            return $post;
        }
        $original_post_date = $post->post_date;
        $post->fields = [];
        $private_fields = isset( $post_type_details->private_fields ) && is_array( $post_type_details->private_fields ) ? $post_type_details->private_fields : [];
        $meta_fields = isset( $post_type_details->meta_fields ) && is_array( $post_type_details->meta_fields ) ? $post_type_details->meta_fields : [];
        foreach ( $meta_fields as $field_key => $field_details ) {
            // Staff-only settings (see the private_fields post type setting)
            if ( in_array( $field_key, $private_fields, TRUE ) ) {
                continue;
            }
            $field_type = devo_get_meta_field_type( $field_details );
            $api_display = new DO_Form_Field_API_Display( $field_type, $field_key, $post->ID, $post_type_details );
            $post->fields[ $field_key ] = $api_display->output;
        }
        $post->post_type_details = $post_type_details;
        $post_thumbnail = new DO_Form_Field_API_Display( 'media', 'post_thumbnail', $post->ID, $post_type_details, apply_filters( 'devo_block_image', null, $post->ID ) );
        $post->post_thumbnail = $post_thumbnail->output;
        $post->permalink = '/' . trim( devo_get_relative_permalink( $post->ID ), '/' ) . '/';
        // If this is the home page, modify permalink
        if ( $post->permalink == home_url( '/home/', 'relative' ) || $post->permalink === '//' ) {
            $post->permalink = home_url( '/', 'relative' );
        }
        // Date
        if ( is_string( $post->post_date ) ) {
            $raw_post_date = $post->post_date;
            $post_date = new DO_Form_Field_API_Display( 'date', 'post_date', $post->ID, $post_type_details, date( 'U', strtotime( $raw_post_date ) ) );
            $post->post_date = $post_date->output;
            $post->raw_post_date = $raw_post_date;
        }
        // Excerpt
        $post->post_excerpt = devo_autop( $post->post_excerpt );
        // SEO meta fields. Raw text; escaped by whatever prints them.
        foreach ( devo_seo_data( $post, $post_type_details ) as $seo_key => $seo_value ) {
            $post->{ $seo_key } = $seo_value;
        }
        $post->is_featured = (bool) devo_get_post_meta( $post->ID, 'featured_post', TRUE );
        // Only memoise what came from an untouched post: one that has been
        // through here already had its date and excerpt formatted. A hit
        // copies these back, so the excerpt is never autop'd twice.
        if ( $memo_key && is_string( $original_post_date ) ) {
            devo_rest_memo_store( 'custom_data', $memo_key, get_object_vars( $post ) );
        }
    }
    return $post;
}

/* SEO values for a post: title, description, image, absolute URL, locale,
 * site name, robots and JSON-LD schema. Shared by the REST data and the
 * server-rendered <head> (header.php), so the two always agree.
 *
 * Every value is plain text or a URL, unescaped. `title` is the bare SEO
 * title; `seo_title` has the post type label appended, as the document title
 * does. Expects $post->permalink when devo_api_custom_data() has set it. */
function devo_seo_data( $post, $post_type_details = FALSE ) {
    if ( $post_type_details === FALSE ) {
        $post_type_details = devo_get_post_type_details( $post->post_type );
    }
    $permalink = isset( $post->permalink ) && is_string( $post->permalink ) ? $post->permalink : '/' . trim( devo_get_relative_permalink( $post->ID ), '/' ) . '/';
    if ( $permalink === '//' ) {
        $permalink = home_url( '/', 'relative' );
    }
    $post_type_label = isset( $post_type_details->post_type_display_name ) ? $post_type_details->post_type_display_name : '';
    $title = isset( $post_type_details->seo_title ) && $post_type_details->seo_title ? devo_get_seo_field_value( $post_type_details->seo_title, $post ) : devo_plain_text( $post->post_title );
    $title = is_string( $title ) ? $title : '';
    $og_image = get_template_directory_uri() . '/public/images/og-image.png';
    $image = isset( $post_type_details->seo_image ) && $post_type_details->seo_image ? devo_get_seo_field_value( $post_type_details->seo_image, $post ) : $og_image;
    $description = isset( $post_type_details->seo_description ) && $post_type_details->seo_description ? devo_get_seo_field_value( $post_type_details->seo_description, $post ) : '';
    // A password-protected post's fields stay private until it's unlocked:
    // no description, and schema without field values.
    $protected = devo_post_content_protected( $post );
    $schema_fields = isset( $post_type_details->schema ) && is_array( $post_type_details->schema ) ? $post_type_details->schema : [];
    if ( $protected ) {
        $schema_fields = array_intersect_key( $schema_fields, [ '@type' => TRUE ] );
    }
    return [
        'seo_title_plain' => $title,
        'seo_title' => strlen( $post_type_label ) && strlen( $title ) ? $title . ' - ' . $post_type_label : $title,
        'seo_image' => is_array( $image ) && count( $image ) && isset( $image['cinema_600'] ) ? $image['cinema_600']['url'] : ( is_string( $image ) && strlen( $image ) ? $image : $og_image ),
        // Absolute, for canonical and og:url
        'seo_url' => devo_absolute_url( $permalink ),
        'seo_description' => is_string( $description ) && ! $protected ? $description : '',
        'seo_locale' => get_locale(),
        'seo_site_name' => devo_plain_text( get_bloginfo( 'name' ) ),
        'noindex' => devo_noindex(),
        'schema' => devo_get_schema( $schema_fields, $post, $post_type_details ),
    ];
}

// TRUE when $post has a password the visitor hasn't supplied, either through
// WordPress's password cookie or a `password` REST parameter (as core allows).
function devo_post_content_protected( $post, $request = NULL ) {
    if ( ! $post || ! strlen( (string) $post->post_password ) ) {
        return FALSE;
    }
    if ( $request instanceof WP_REST_Request && is_string( $request['password'] ) && hash_equals( $post->post_password, $request['password'] ) ) {
        return FALSE;
    }
    return post_password_required( $post );
}

/* The theme's additions to a post's REST data, as an array.
 *
 * Includes a few WP_Post-style properties (ID, post_title, post_name, ...) for
 * the front end, but never the raw object: no post_password, and no content,
 * excerpt, fields or description for a password-protected post the visitor
 * hasn't unlocked. */
function devo_rest_theme_fields( $post, $post_type_details = FALSE, $request = NULL ) {
    $protected = devo_post_content_protected( $post, $request );
    // Clone: devo_api_custom_data() mutates the object, and WP_Post objects
    // are shared through the object cache.
    $theme_post = devo_api_custom_data( clone $post, $post_type_details );
    return [
        'ID' => (int) $post->ID,
        'post_title' => $post->post_title,
        'post_name' => $post->post_name,
        'post_type' => $post->post_type,
        'post_parent' => (int) $post->post_parent,
        'menu_order' => (int) $post->menu_order,
        'post_date' => $theme_post->post_date,
        'raw_post_date' => isset( $theme_post->raw_post_date ) ? $theme_post->raw_post_date : $post->post_date,
        'post_modified' => $post->post_modified,
        'post_content' => $protected ? '' : $post->post_content,
        'post_excerpt' => $protected ? '' : $theme_post->post_excerpt,
        'content_protected' => $protected,
        'fields' => $protected ? [] : $theme_post->fields,
        'post_type_details' => $theme_post->post_type_details,
        'post_thumbnail' => $theme_post->post_thumbnail,
        'permalink' => $theme_post->permalink,
        'seo_title' => $theme_post->seo_title,
        'seo_image' => $theme_post->seo_image,
        'seo_url' => $theme_post->seo_url,
        'seo_description' => $protected ? '' : $theme_post->seo_description,
        'seo_locale' => $theme_post->seo_locale,
        'seo_site_name' => $theme_post->seo_site_name,
        'noindex' => $theme_post->noindex,
        'schema' => $theme_post->schema,
        'is_featured' => $theme_post->is_featured,
    ];
}

/* A post in the same shape /wp/v2/{type} returns it: core's REST response
 * with the theme's fields on top. For the theme's own routes (/archive/,
 * /page/, /devo-search) and post_browser fields, which used to return raw
 * WP_Post objects - post_password included.
 *
 * Returns NULL for anything an anonymous visitor couldn't view (drafts,
 * private posts, non-public post types).
 *
 * Memoised per post and nesting level for the request (see devo_rest_memo()),
 * unless a password is involved. */
function devo_rest_prepare_post( $post, $request = NULL ) {
    // get_post( 0 ) / get_post( NULL ) would return the global post
    if ( ! $post || ( ! is_object( $post ) && ! ( is_numeric( $post ) && (int) $post > 0 ) ) ) {
        return NULL;
    }
    $post = get_post( $post );
    if ( ! $post || ! is_post_publicly_viewable( $post ) ) {
        return NULL;
    }
    // A post_browser field can point back at the post that contains it
    if ( devo_rest_prepare_depth() > 2 ) {
        return [ 'ID' => (int) $post->ID, 'post_title' => $post->post_title, 'post_type' => $post->post_type, 'permalink' => '/' . trim( devo_get_relative_permalink( $post->ID ), '/' ) . '/' ];
    }
    $password = $request instanceof WP_REST_Request && is_string( $request['password'] ) ? $request['password'] : NULL;
    $memo = &devo_rest_memo();
    $memo_key = $password === NULL ? (int) $post->ID . '|' . devo_rest_prepare_depth() : '';
    if ( $memo_key && array_key_exists( $memo_key, $memo['prepared'] ) ) {
        return $memo['prepared'][ $memo_key ];
    }
    // Core's prepare_item_for_response() makes this post the global $post
    // (setup_postdata()) and leaves it there. When this runs for a
    // post_browser field, the post that contains the field is still being
    // prepared and has yet to render its content, so its shortcodes would see
    // this post instead. Put the previous one back afterwards.
    $previous_post = isset( $GLOBALS['post'] ) ? $GLOBALS['post'] : NULL;
    devo_rest_prepare_depth( 1 );
    try {
        $post_type_object = get_post_type_object( $post->post_type );
        $controller = $post_type_object ? $post_type_object->get_rest_controller() : NULL;
        if ( $controller instanceof WP_REST_Posts_Controller ) {
            $rest_base = ! empty( $post_type_object->rest_base ) ? $post_type_object->rest_base : $post->post_type;
            $item_request = new WP_REST_Request( 'GET', '/wp/v2/' . $rest_base . '/' . $post->ID );
            $item_request->set_param( 'context', 'view' );
            if ( $password !== NULL ) {
                $item_request->set_param( 'password', $password );
            }
            $response = $controller->prepare_item_for_response( $post, $item_request );
            $data = rest_get_server()->response_to_data( $response, FALSE );
            // Theme post types add their fields in rest_prepare_{post_type};
            // add them here for any other public type.
            if ( ! isset( $data['fields'] ) ) {
                $data = array_merge( $data, devo_rest_theme_fields( $post, FALSE, $item_request ) );
            }
        } else {
            // Public, but not in REST: the theme's fields only
            $data = devo_rest_theme_fields( $post, FALSE, $request );
        }
        if ( $memo_key ) {
            devo_rest_memo_store( 'prepared', $memo_key, $data );
        }
        return $data;
    } finally {
        // Restore while still nested, so DO_Custom_Post_Type::the_post()
        // (which skips nested prepares) doesn't rebuild the outer post's data
        if ( $previous_post instanceof WP_Post ) {
            $GLOBALS['post'] = $previous_post;
            setup_postdata( $previous_post );
        } else {
            $GLOBALS['post'] = $previous_post;
        }
        devo_rest_prepare_depth( -1 );
    }
}

// Returns the average of an array of numbers
function devo_array_average( $raw_array ) {
    if ( ! is_array( $raw_array ) ) {
        $raw_array = [ $raw_array ];
    }
    $array = [];
    foreach ( $raw_array as $item ) {
        // Text binary
        if ( in_array( strtolower( $item ), [ 'yes', 'true'] ) ) {
            $item = 1;
        }
        if ( in_array( strtolower( $item ), [ 'no', 'false'] ) ) {
            $item = 0;
        }
        $item = preg_replace( '/[^0-9\,\.\-]/', '', $item );
        if ( strlen( $item ) ) {
            $array[] = floatval( $item );
        }
    }
    sort( $array );
    return count( $array ) ? array_sum( $array ) / count( $array ) : 0;
}

// Counts the instances of values in an array. Returns [ $value => $count ]
function devo_array_count_values( $array ) {
    $return = [];
    foreach ( $array as $key => $value ) {
        if ( isset( $return[ $value ] ) ) {
            $return[ $value ]++;
        } else {
            $return[ $value ] = 1;
        }
    }
    return $return;
}

// Searches array values for strings. Returns the first-level keys where string was found. Optionally searches the keys as well.
function devo_array_find( $needles, $haystack, $search_keys = FALSE, $keep_going = TRUE ) {
	$needles_array = is_array( $needles ) ? $needles : [ $needles ];
    $keys = [];
    foreach ( $needles_array as $needle ) {
        foreach ( $haystack as $key => $value ) {
            if ( ! is_array( $value ) && ! is_object( $value ) ) {
                // Search key
                if ( $search_keys && ( strpos( $key, $needle ) !== FALSE || $key === $needle ) ) {
                    $keys[] =  $key;
                }
                // Search value
                else if ( strpos( $value, $needle ) !== FALSE || $value === $needle ) {
                    $keys[] =  $key;
                }
            } elseif ( $keep_going ) {
                $found_deeper = devo_array_find( $needle, $value, $search_keys, $keep_going );
                if ( $found_deeper ) {
                    $keys[] = $key;
                }
            }
        }
    }
	if ( count( $keys ) ) {
		return array_unique( $keys );
	} else {
		return FALSE;
	}
}

function devo_array_flatten( $array ) {
    if ( is_array( $array ) ) {
        return array_reduce( $array, function ( $c, $a ) { 
            return array_merge( $c, devo_array_flatten( $a ) ); 
        }, [] );
    } else {
        return [ $array ];
    }
}

// Returns the values of a column in an associative array or object (up to two levels deep)
function devo_array_get_column_values( $needles, $haystack, $level = 2 ) {
	if ( ! is_array( $needles ) ) {
	    $needles = [ $needles ];
	}
	$values = [];
	switch ( $level ) {
		case 1:
		case '1':
			if ( is_object( $haystack ) ) {
				foreach( $needles as $key ) {
					if ( isset( $haystack->{ $key } ) && $haystack->{ $key } !== '' ) {
						$values[ $key ] = $haystack->{ $key };
					}
				}
			} else if ( is_array( $haystack ) ) {
				foreach( $needles as $key ) {
					if ( isset( $haystack[ $key ] ) && $haystack[ $key ] !== '' ) {
						$values[ $key ] = $haystack[ $key ];
					}
				}
			}
			break;
		case 2:
		case '2':
			if ( is_object( $haystack ) ) {
				foreach( $needles as $key ) {
					foreach ( $haystack as $haystack_key => $haystack_values ) {
						if ( is_object( $haystack_values ) ) {
                            if ( isset( $haystack_values->{ $key } ) && $haystack_values->{ $key } !== '' ) {
                                $values[] = $haystack_values->{ $key };
                            }
                        } else if ( is_array( $haystack_values ) ) {
                            if ( isset( $haystack_values[ $key ] ) && $haystack_values[ $key ] !== '' ) {
                                $values[] = $haystack_values[ $key ];
                            }
                        }
					}
				}
			} else if ( is_array( $haystack ) ) {
				foreach( $needles as $key ) {
					foreach ( $haystack as $haystack_key => $haystack_values ) {
					    if ( is_object( $haystack_values ) ) {
					        if ( isset( $haystack_values->{ $key } ) && $haystack_values->{ $key } !== '' ) {
                                $values[] = $haystack_values->{ $key };
                            }
                        } else if ( is_array( $haystack_values ) ) {
    						if ( isset( $haystack_values[ $key ] ) && $haystack_values[ $key ] !== '' ) {
    							$values[] = $haystack_values[ $key ];
    						}
    					}
					}
				}
			}
			break;
	}
	return $values;
}

function devo_array_has_value( $array ) {
    $flat_array = devo_array_flatten( $array );
    if ( is_array( $flat_array ) ) {
        $flat_array = implode( '', $flat_array );
    }
    return (bool) strlen( $flat_array );
}

function devo_array_insert( $array = [], $index = 0, $value = '' ) {
    if ( $index === 0 ) {
        array_unshift( $array, $value );
        return $array;
    } else {
        $new_array = array_slice( $array, 0, $index );
        array_push( $new_array, $value );
        foreach ( array_slice( $array, $index, count( $array ) - 1 ) as $array_piece ) {
            array_push( $new_array, $array_piece );
        }
        return $new_array;
    }
}

// Wraps array items with the specified before and after
function devo_array_items_wrap( $array, $before = '', $after = FALSE ) {
    $after = $after ? $after : $before;
    $new_array = [];
    foreach ( $array as $key => $value ) {
        $new_array[ $key ] = $before . $value . $after;
    }
    return $new_array;
}

function devo_array_keys_exists( $keys, $array ) {
    $return = [];
    if ( ! is_array( $keys ) ) {
        $keys = [ $keys ];
    }
    foreach ( $keys as $key ) {
        if ( array_key_exists( $key, $array ) ) {
            $return[] = $key;
        }
    }
    return $return;
}

// Returns the median of an array of numbers
function devo_array_median( $raw_array ) {
    if ( ! is_array( $raw_array ) ) {
        $raw_array = [ $raw_array ];
    }
    $array = [];
    foreach ( $raw_array as $key => $value ) {
        $temp_value = preg_replace( '/[^0-9\,\.\-]/', '', $value );
        if ( strlen( $temp_value ) ) {
            $array[] = floatval( $temp_value );
        }
    }
    if ( ! count( $array ) ) {
        return 0;
    }
    sort( $array );
    $count = count( $array ); //total numbers in array
    $middle_val = (int) floor( ( $count - 1 ) / 2 ); // find the middle value, or the lowest middle value; (int) because floor() returns a float, which isn't an array key
    if ( $count % 2 ) { // odd number, middle is the median
        $median = $array[ $middle_val ];
    } else { // even number, calculate avg of 2 medians
        $low = $array[ $middle_val ];
        $high = $array[ $middle_val + 1 ];
        $median = ( ( $low + $high ) / 2 );
    }
    return $median;
}

// Merges associative arrays and sums the value of each key
function devo_array_merge_add( $arrays = [] ) {
    if ( ! count( $arrays ) > 1  ) {
        return $arrays;
    }
    $return_array = [];
    foreach ( $arrays as $array ) {
        foreach ( $array as $key => $value ) {
            if ( is_numeric( $value ) ) {
                $return_array[ $key ] = isset( $return_array[ $key ] ) ? $return_array[ $key ] + $value : $value;
            }
        }
    }
    return $return_array;
}

function devo_strip_slashes( $var ) {
    if ( $var instanceof stdClass ) {
        $clean_var = new stdClass;
    } else {
        $clean_var = [];
    }
    if ( ! is_array( $var ) && ! ( $var instanceof stdClass ) ) {
        return stripslashes( $var );
    } else {
        foreach( $var as $key => $value ) {
            if ( $var instanceof stdClass ) {
                $clean_var->{ $key } = devo_strip_slashes( $value );
            } else {
                $clean_var[ $key ] = devo_strip_slashes( $value );
            }
        }
        return $clean_var;
    }
}

// Finds the sum of the values for specific $keys in an $array
function devo_array_sum_of( $keys, $array ) {
    $sum = 0;
    foreach( $keys as $key ) {
        if ( isset( $array[ $key ] ) ) {
            $sum += $array[ $key ];
        }
    }
    return $sum;
}

// Convert an array into an object
function devo_array_to_object( $array ) {
	$object = new stdClass();
	foreach ( $array as $key => $value ) {
		$object->{ $key } = $value;
	}
	return $object;
}

// Converts an array of key/value pairs into a query string
function devo_array_to_query_string( $array, $delimiter1 = '/', $delimiter2 = '/' ) {
    $string = '';
    foreach ( $array as $key => $value ) {
        if ( is_string( $value ) ) {
            $string .= $key . $delimiter1 . $value . $delimiter2;
        }
    }
    return trim( $string, $delimiter1 . $delimiter2 );
}

// Searches an associative array for a key/value pair
function devo_array_query( $query_key, $query_value, $array ) {
    $result_keys = [];
    foreach ( $array as $row_id => $data ) {
        if ( isset( $data[ $query_key ] ) ) {
            $value_array = explode( ';', $data[ $query_key ] );
            if ( in_array( $query_value, $value_array ) ) {
                $result_keys[] = $row_id;
            }
        }
    }
    return $result_keys;
}

// Returns the values of the first x $number of items in an array
function devo_array_x_number( $array, $number ) {
    if ( ! $number || ! is_int( $number ) ) {
        return $array;
    }
    $return_array = [];
    $i = 0;
    foreach ( $array as $key => $value ) {
        if ( $i < $number ) {
            $return_array[] = $value;
        } else {
            return $return_array;
        }
        $i++;
    }
    return $return_array;
}

// Sorts an array of rows by up to two columns: $columns = [ $column_name => 'ASC'|'DESC' ].
// Rows missing a sort column are dropped. String keys are kept; numeric keys
// are renumbered, as array_multisort() did.
function devo_assoc_array_sort( $data, $columns ) {
    if ( ! is_array( $data ) || ! is_array( $columns ) || ! count( $columns ) ) {
        return $data;
    }
    $columns = array_slice( $columns, 0, 2, TRUE );
    foreach ( $data as $key => $row ) {
        foreach ( $columns as $column_name => $direction ) {
            if ( ! is_array( $row ) || ! isset( $row[ $column_name ] ) ) {
                unset( $data[ $key ] );
                continue 2;
            }
        }
    }
    uasort( $data, function( $a, $b ) use ( $columns ) {
        foreach ( $columns as $column_name => $direction ) {
            $comparison = is_numeric( $a[ $column_name ] ) && is_numeric( $b[ $column_name ] ) ? $a[ $column_name ] <=> $b[ $column_name ] : strnatcasecmp( (string) $a[ $column_name ], (string) $b[ $column_name ] );
            if ( $comparison !== 0 ) {
                return strtoupper( (string) $direction ) === 'DESC' ? -$comparison : $comparison;
            }
        }
        return 0;
    } );
    $string_keys = array_filter( array_keys( $data ), 'is_string' );
    return count( $string_keys ) ? $data : array_values( $data );
}

// Applies do_shortcode to wpautop
function devo_autop( $text ) {
    return do_shortcode( devo_shortcode_empty_paragraph_fix( wpautop( $text ) ) );
}

// Turns all values of an array into strings
function devo_cast_array_values_as_string( &$array ) {
    $new_array = [];
    foreach ( $array as $key => $value ) {
        $new_array[ $key ] = "$value";
    }
    $array = $new_array;
}

// Convert number digits to words
// from http://www.karlrixon.co.uk/writing/convert-numbers-to-words-with-php/
function devo_convert_number_to_words( $number ) {
    $hyphen      = '-';
    $conjunction = ' and ';
    $separator   = ', ';
    $negative    = 'negative ';
    $decimal     = ' point ';
    $dictionary  = [
        0                   => 'zero',
        1                   => 'one',
        2                   => 'two',
        3                   => 'three',
        4                   => 'four',
        5                   => 'five',
        6                   => 'six',
        7                   => 'seven',
        8                   => 'eight',
        9                   => 'nine',
        10                  => 'ten',
        11                  => 'eleven',
        12                  => 'twelve',
        13                  => 'thirteen',
        14                  => 'fourteen',
        15                  => 'fifteen',
        16                  => 'sixteen',
        17                  => 'seventeen',
        18                  => 'eighteen',
        19                  => 'nineteen',
        20                  => 'twenty',
        30                  => 'thirty',
        40                  => 'forty',
        50                  => 'fifty',
        60                  => 'sixty',
        70                  => 'seventy',
        80                  => 'eighty',
        90                  => 'ninety',
        100                 => 'hundred',
        1000                => 'thousand',
        1000000             => 'million',
        1000000000          => 'billion',
        1000000000000       => 'trillion',
        1000000000000000    => 'quadrillion',
        1000000000000000000 => 'quintillion'
    ];
    if ( ! is_numeric( $number ) ) {
        return false;
    }
    if ( ( $number >= 0 && (int) $number < 0 ) || (int) $number < 0 - PHP_INT_MAX ) {
        // overflow
        trigger_error(
            'devo_convert_number_to_words only accepts numbers between -' . PHP_INT_MAX . ' and ' . PHP_INT_MAX,
            E_USER_WARNING
        );
        return false;
    }
    if ( $number < 0 ) {
        return $negative . devo_convert_number_to_words( abs( $number ) );
    }
    $string = $fraction = null;
    if ( strpos( $number, '.' ) !== false ) {
        list( $number, $fraction ) = explode( '.', $number );
    }
    switch ( true ) {
        case $number < 21:
            $string = $dictionary[ $number ];
            break;
        case $number < 100:
            $tens   = ( (int) ( $number / 10 ) ) * 10;
            $units  = $number % 10;
            $string = $dictionary[ $tens ];
            if ( $units ) {
                $string .= $hyphen . $dictionary[ $units ];
            }
            break;
        case $number < 1000:
            $hundreds  = $number / 100;
            $remainder = $number % 100;
            $string = $dictionary[ $hundreds ] . ' ' . $dictionary[100];
            if ( $remainder ) {
                $string .= $conjunction . devo_convert_number_to_words( $remainder );
            }
            break;
        default:
            $baseUnit = pow( 1000, floor( log( $number, 1000 ) ) );
            $numBaseUnits = (int) ( $number / $baseUnit );
            $remainder = $number % $baseUnit;
            $string = devo_convert_number_to_words( $numBaseUnits ) . ' ' . $dictionary[ $baseUnit ];
            if ( $remainder ) {
                $string .= $remainder < 100 ? $conjunction : $separator;
                $string .= devo_convert_number_to_words( $remainder );
            }
            break;
    }
    if ( null !== $fraction && is_numeric( $fraction ) ) {
        $string .= $decimal;
        $words = [];
        foreach ( str_split( (string) $fraction ) as $number ) {
            $words[] = $dictionary[ $number ];
        }
        $string .= implode( ' ', $words );
    }
    return $string;
}

// From http://shiflett.org/blog/2005/oct/convert-smart-quotes-with-php
function devo_convert_smart_quotes( $string ) {
    $search = [ chr( 145 ),
                chr( 146 ),
                chr( 147 ),
                chr( 148 ),
                chr( 151 ) ];
    $replace = [ "'",
                 "'",
                 '"',
                 '"',
                 '-' ];
    return str_replace( $search, $replace, $string );
}

// Get the current url
function devo_current_url( $relative = FALSE, $protocol_less = FALSE ) {
    $host = $_SERVER['HTTP_HOST'];
    $request_uri = $_SERVER['REQUEST_URI'];
    $protocol = strpos( home_url(), 'https://' ) !== FALSE ? 'https://' : 'http://';
    if ( $relative ) {
        $url = str_replace( home_url(), '', ( $protocol_less ? '' : $protocol ) . $host . $request_uri );
    } else {
        $url = ( $protocol_less ? '' : $protocol ) . $host . $request_uri;
    }
    return $url;
}

function devo_current_user_role() {
    $current_user = wp_get_current_user();
    return $current_user->roles;
}

// Returns only the decimal value that results from division
function devo_decimal_from_division( $numerator = 1, $denominator = 1 ) {
    $divide = is_int( $denominator ) && $denominator ? $numerator / $denominator : 1;
    $decimals = $divide - floor( $divide );
    return $decimals;
}

function devo_decode_data_characters( $string = '' ) {
    return str_replace( [ '<semicolon>', '<comma>' ], [ ';', ',' ], $string );
}

function devo_default_fields_array() {
    return [ 'post_type', 'post_name', 'post_date', 'post_title', 'post_type', 'date', 'title', 'ID', 'guid' ];
}

// Distribute items into roughly even columns
function devo_distribute( $items = [], $columns = 2, $output = 'per_column' ) {
	$num_items = count( $items );
    if ( $num_items ) {
    	$rough_per_column = round( $num_items / $columns, 0 );
    	$left_overs = $num_items - ( $rough_per_column * $columns );
    	$per_column = [];
    	for ( $i = 0; $i < $columns; $i++ ) {
    		if ( $left_overs == 0 )	{
    			array_push( $per_column, $rough_per_column );
    		} else if ( $left_overs > 0 ) {
    			array_push( $per_column, $rough_per_column + 1 );
    			$left_overs = $left_overs - 1;
    		} else if ( $left_overs < 0 ) {
    			if ( $i >= $columns - abs( $left_overs ) ) {
    				array_push( $per_column, $rough_per_column - 1 );
    				$left_overs = $left_overs + 1;
    			} else {
    				array_push( $per_column, $rough_per_column );
    			}
    		}
    	}
    	if ( $output == 'per_column' ) {
    		return $per_column;
    	} else {
    	    if ( is_assoc_array( $items ) ) {
                $indexed_items = [];
                $i = 0;
                foreach ( $items as $key => $value ) {
                    $indexed_items[ $i ] = $value;
                    $indexed_items[ $i ]['key'] = $key;
                    $i++;
                }
                $items = $indexed_items;
            }
    		$column_contents = [];
    		$array_index = 0;
    		$column_index = 0;
    		for ( $i = 0; $i < count( $per_column ); $i++ ) {
    			$column_index += $per_column[ $i ];
    			$column_contents[ $i ] = [];
    			for ( $j = $array_index; $j < $column_index; $j++ ) {
    				$column_contents[ $i ][] = $items[ $j ];
    				$array_index++;
    			}
    		}
    		return $column_contents;
    	}
	}
}

function devo_encode_data_characters( $string = '' ) {
    return str_replace( [ ';', ',' ], [ '<semicolon>', '<comma>' ], $string );
}

// Returns raw value of 11:59pm of the date passed in
function devo_end_of_day( $time ) {
	$time = strtotime( $time ) ? strtotime( $time ) : $time;
	if ( $time ) {
		$date_string = date( 'Y-m-d', $time );
		return date( strtotime( $date_string ) + 86399 );
	} else {
		return $time;
	}
}

// Returns 'even' or 'odd' for the given number
function devo_even_odd( $i ) {
    if ( $i % 2 ) {
        return 'odd';
    } else {
        return 'even';
    }
}

function devo_api_field_key( $field_label ) {
    // Remove non-word characters, replace spaces with underscores, and lowercase everything
    $field_key = devo_field_key( $field_label );
    // Convert to lowercase and split into words
    $words = explode( '_', $field_label );
    // First word stays lowercase
    $camelCase = array_shift( $words );
    // Capitalize remaining words
    $camelCase .= implode( '', array_map( 'ucfirst', $words ) ); // Capitalize remaining words

    return $camelCase;
}

function devo_field_key( $field_label ) {
    // Remove non-word characters, replace spaces with underscores, and lowercase everything
    return preg_replace( '/_+/', '_', strtolower( preg_replace( '[\W]', '', str_replace( ' ', '_', $field_label ) ) ) );
}

// Calls functions or methods for retrieving field options
function devo_field_options( $field_options ) {
    // Function, no arguments
    if ( is_string( $field_options ) && function_exists( $field_options ) ) {
        $options = call_user_func( $field_options );
    }
    // Post Type
    elseif ( is_string( $field_options ) && post_type_exists( $field_options ) ) {
        $options = [];
        $options_raw = get_posts( [
            'post_type' => $field_options,
            'fields' => 'ids',
            'nopaging' => TRUE,
        ] );
        if ( count( $options_raw ) ) {
            // Alphabetize them
            $options_alpha = [];
            foreach ( $options_raw as $post_id ) {
                $post_title = get_post_field( 'post_title', $post_id );
                $options_alpha[ $post_title ] = $post_id;
            }
            ksort( $options_alpha );
            foreach ( $options_alpha as $post_id ) {
                $post_title = get_post_field( 'post_title', $post_id );
                $post_name = get_post_field( 'post_name', $post_id );
                $options[ $post_name ] = [
                    'label' => $post_title,
                    'value' => $post_name,
                ];
            }
        }

    }
    elseif ( is_array( $field_options ) && isset( $field_options[0] ) && isset( $field_options[1] ) ) {
        // Function, with arguments
        if ( is_string ( $field_options[0] ) && function_exists( $field_options[0] ) ) {
            $options = call_user_func_array( $field_options[0], is_array( $field_options[1] ) ? $field_options[1] : [ $field_options[1] ] );
        }
        // Method
        elseif ( is_object( $field_options[0] ) && method_exists( $field_options[0], $field_options[1] ) ) {
            // With arguments
            if ( isset( $field_options[2] ) ) {
                $options = call_user_func_array( [ $field_options[0], $field_options[1] ], is_array( $field_options[2] ) ? $field_options[2] : [ $field_options[2] ] );
            }
            // Without arguments
            else {
                $options = call_user_func( [ $field_options[0], $field_options[1] ] );
            }
        }
        // Guess it's just a list of options...
        else {
            $options = $field_options;
        }
    }
    // Guess it's just a list of options...
    else {
        $options = $field_options;
    }
    return $options;
}

function devo_format_address( $address = [], $break = '<br>' ) {
    $address_string = '';
    if ( isset( $address['name'] ) && strlen( $address['name'] ) ) {
        $address_string .= '<b>' . $address['name'] . '</b>';
    }
    if ( isset( $address['address_1'] ) && strlen( $address['address_1'] ) ) {
        $address_string .= strlen( $address_string ) ? $break . $address['address_1'] : $address['address_1'];
    }
    if ( isset( $address['address_2'] ) && strlen( $address['address_2'] ) ) {
        $address_string .= strlen( $address_string ) ? $break . $address['address_2'] : $address['address_2'];
    }
    if ( isset( $address['city'] ) && strlen( $address['city'] ) ) {
        $address_string .= strlen( $address_string ) ? $break . $address['city'] : $address['city'];
    }
    if ( isset( $address['state'] ) && strlen( $address['state'] ) ) {
        $address_string .= strlen( $address_string ) ? ', ' . $address['state'] : $address['state'];
    }
    if ( isset( $address['zip'] ) && strlen( $address['zip'] ) ) {
        $address_string .= strlen( $address_string ) ? ' ' . $address['zip'] : $address['zip'];
    }
    if ( isset( $address['country'] ) && strlen( $address['country'] ) ) {
        $address_string .= strlen( $address_string ) ? $break . $address['country'] : $address['country'];
    }
    return $address_string;
}

// Format dollar amount with $ and . (if applicable)
function devo_format_dollars( $amounts = FALSE ) {
    if ( $amounts === FALSE ) {
        return;
    }
    $amounts = is_string( $amounts ) ? [ $amounts ] : $amounts;
    sort( $amounts );
    $formatted_amounts = [];
    foreach ( $amounts as $amount ) {
        if ( count( $formatted_amounts ) < 2 ) {
            $amount_clean = str_replace( '.00', '', $amount );
            $amount_decimals = strpos( $amount_clean, '.' ) !== FALSE ? 2 : 0;
            if ( ! is_numeric( $amount_clean ) ) {
                $amount_clean = (float) $amount_clean;
            }
            if ( strlen( $amount_clean ) ) {
                $formatted_amounts[] = strlen( $amount_clean ) ? number_format( $amount_clean, $amount_decimals ) : '';
            }
        }
    }
	return count( $formatted_amounts ) ? '$' . implode( ' - ', $formatted_amounts ) : '';
}

// Formats large numbers using words and rounding
function devo_format_number( $number, $abr = FALSE, $dec = FALSE ) {
	$number = str_replace( ',', '', $number );
	if ( ! is_numeric( $number ) ) {
		return $number;
	}

	if ( $number >= 1000000000000 ) {
		$word = $abr ? 'T' : 'Trillion';
		if ( ! $dec ) {
			$dec = gmp_strval( gmp_div_r( $number, 1000000000000 ) ) ? 2 : 0;
		}
		return number_format( $number / 1000000000000, $dec ) . ' ' . $word;
	}
	else if ( $number >= 1000000000 ) {
		$word = $abr ? 'B' : 'Billion';
		if ( ! $dec ) {
			$dec = gmp_strval( gmp_div_r( $number, 1000000000 ) ) ? 2 : 0;
		}
		return number_format( $number / 1000000000, $dec ) . ' ' . $word;
	}
	else if ( $number >= 1000000 ) {
		$word = $abr ? 'M' : 'Million';
		if ( ! $dec ) {
			$dec = gmp_strval( gmp_div_r( $number, 1000000 ) ) ? 2 : 0;
		}
		return number_format( $number / 1000000, $dec ) . ' ' . $word;
	}
	else if ( $number >= 1000 ) {
		$word = $abr ? 'K' : 'Thousand';
		if ( ! $dec ) {
			$dec = gmp_strval( gmp_div_r( $number, 1000 ) ) ? 2 : 0;
		}
		return number_format( $number / 1000, $dec ) . ' ' . $word;
	}
	else {
   		return number_format( $number );
	}
}

// Returns the previous and next post ids in an associative array [ 'previous' => $post_id, 'next' => $post_id ]
// @param str|array $query_args  Either a str post_type (if all query modifications are done in a pre_get_posts) or an
// associative array of arguments for WP_Query
function devo_get_adjacent_posts( $query_args = FALSE, $current_post_id = FALSE, $loop = FALSE ) {
    if ( ! $query_args || ! $current_post_id ) {
        return '';
    }
    $adjacent_posts = [
        'previous' => FALSE,
        'next' => FALSE,
    ];
    $post_ids = [];
    // Post type
    if ( is_string( $query_args ) ) {
        $post_ids = get_posts( [ 'post_type' => $query_args, 'nopaging' => TRUE, 'fields' => 'ids' ] );
    }
    // Custom query
    elseif ( is_array( $query_args ) ) {
        $query_args['nopaging'] = TRUE;
        $query_args['fields'] = 'ids';
        $post_ids = get_posts( $query_args );
    }
    if ( count( $post_ids ) ) {
        $current_post_index = array_search( $current_post_id, $post_ids );
        if ( $current_post_index !== FALSE ) {
            // Previous
            if ( isset( $post_ids[ $current_post_index - 1 ] ) ) {
                $adjacent_posts[ 'previous' ] = $post_ids[ $current_post_index - 1 ];
            }
            // Loop to end
            elseif ( $loop ) {
                $adjacent_posts[ 'previous' ] = end( $post_ids );
            }
            // Next
            if ( isset( $post_ids[ $current_post_index + 1 ] ) ) {
                $adjacent_posts[ 'next' ] = $post_ids[ $current_post_index + 1 ];
            }
            // Loop to beginning
            elseif ( $loop ) {
                $adjacent_posts[ 'next' ] = $post_ids[0];
            }
        }
    }
    return $adjacent_posts;
}

function devo_get_content_from_meta_field( $field_type, $field_value, $subfields_raw = [] ) {
    $content = [];
    // If the $field_type is an array, look further
    if ( is_array( $field_type ) ) {
        $type = isset( $field_type['type'] ) ? $field_type['type'] : FALSE;
    } else {
        $type = $field_type;
    }
    if ( $type ) {
        // If it's a single field, return the value string
        if ( in_array( $type, [ 'text', 'wp_editor', 'html' ] ) ) {
            $content[] = $field_value;
        }
        // If it's an array field with subfields, go deeper
        elseif ( count( $subfields_raw ) ) {
            $subfields = [];
            // Organize subfields by key
            foreach ( $subfields_raw as $sub_label => $sub_type ) {
                $sub_key = devo_field_key( $sub_label );
                $subfields[ $sub_key ] = $sub_type;
            }
            // Indexed array
            if ( is_array( $field_value ) && array_is_list( $field_value ) ) {
                foreach ( $field_value as $value_array ) {
                    foreach ( $value_array as $key => $value ) {
                        $type = isset( $subfields[ $key ] ) ? $subfields[ $key ] : FALSE;
                        if ( in_array( $type, [ 'text', 'wp_editor', 'html' ] ) ) {
                            $content[] = $value;
                        }
                    }
                }
            }
            // Associative Array
            elseif ( is_array( $field_value ) && ! array_is_list( $field_value ) ) {
                foreach ( $field_value as $key => $value ) {
                    $type = isset( $subfields[ $key ] ) ? $subfields[ $key ] : FALSE;
                    if ( in_array( $type, [ 'text', 'wp_editor', 'html' ] ) ) {
                        $content[] = $value;
                    }
                }
            }
        }
    }
    return ( count( $content ) > 1 ? $content : implode( '', $content ) );
}

// Returns an array of all field values that match the given key for a specific post type
// function devo_get_field_values( $key = '', $type = 'post', $with_ids = FALSE, $status = 'publish' ) {
//     global $wpdb;
//     if ( empty( $key ) ) {
//         return;
// 	}
// 	$field_name = in_array( strtolower( $key ), [ 'post_title', 'post_name', 'post_author', 'post_date', 'id' ] ) ? strtolower( $key ) : FALSE;
// 	if ( $field_name === 'id' ) {
//         $field_name = 'ID';
//     }
// 	if ( $field_name ) {
// 		$method = $with_ids ? 'get_results' : 'get_col';
// 	    $resultsArray = $wpdb->{ $method }( $wpdb->prepare( "
// 	        SELECT $field_name" . ( $with_ids ? ", ID" : "" ) . " FROM {$wpdb->posts}
// 	        WHERE post_type = '%s'
// 	        AND post_status = '%s'
// 	        ORDER BY post_title
// 	    ", $type, $status  ) );

// 		$newResultsArray = [];
// 		if( $with_ids ) {
// 			foreach ( $resultsArray as $obj ) {
// 				$newResultsArray[ trim( $obj->{ $field_name }, ' ' ) ] = $obj->ID;
// 			}
// 			return $newResultsArray;
// 		} else {
// 			foreach ( $resultsArray as $field_value ) {
// 				if ( strlen( $field_value ) ) {
// 					$newResultsArray[] = trim( $field_value, ' ' );
// 				}
// 			}
// 			return array_unique( $newResultsArray );
// 		}
// 	} else {
// 		return;
// 	}
// }

// Get image from media gallery by url
function devo_get_media_by_url( $url, $size = 'thumbnail', $mode = 'image' ) {
	global $wpdb;
	if ( ! isset ( $url ) ) {
		return;
	}
	$image_obj = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $wpdb->posts WHERE guid = '%s'", $url ) );
	$output = FALSE;
	if ( $image_obj ) {
		switch( $mode ) {
			case 'id':
				$output = $image_obj->ID;
				break;
			case 'path':
				$src_obj = wp_get_attachment_image_src( $image_obj->ID, $size );
				$output = $src_obj[0];
				break;
			case 'image':
			default:
				$output = wp_get_attachment_image( $image_obj->ID, $size );
				break;
		}
	}
	$output = strlen( $output ) ? $output : FALSE;
	return $output;
}

// Determine field type from $settings array
function devo_get_meta_field_type( $settings ) {
    // Field with options
    if ( is_array( $settings ) && isset( $settings['type'] ) ) {
        $type = $settings['type'];
    }
    // CPT_Form_Field
    elseif ( is_a( $settings, 'DO_CPT_Form_Field' ) ) {
        $type = $settings->field_type;
    }
    // Method
    elseif ( is_array( $settings ) && isset( $settings[0] ) && isset( $settings[1] ) && strpos( $settings[1], '_callback' ) ) {
        $type = $settings[1];
    }
    // Regular Field
    else {
        $type = $settings;
    }
    return $type;
}

// Returns an array of all meta values that match the given key for a specific post type
// function devo_get_meta_values( $key = '', $type = 'post', $order_by = 'p.post_title', $with_ids = FALSE, $status = 'publish' ) {
//     global $wpdb;
//     if ( empty( $key ) ) {
//         return;
// 	}
// 	$method = $with_ids ? 'get_results' : 'get_col';
//     $results_array_raw = $wpdb->{ $method }( $wpdb->prepare( "
//         SELECT pm.meta_value" . ( $with_ids ? ", p.ID" : "" ) . " FROM {$wpdb->postmeta} pm
//         LEFT JOIN {$wpdb->posts} p ON p.ID = pm.post_id
//         WHERE pm.meta_key = '%s'
//         AND p.post_status = '%s'
//         AND p.post_type = '%s'
//         ORDER BY %s
//     ", $key, $status, $type, $order_by ) );

// 	$results_array = [];
// 	if( $with_ids ) {
// 		foreach ( $results_array_raw as $obj ) {
// 			if ( strpos( $obj->meta_value, ';' ) ) {
// 				foreach( explode( ';', $obj->meta_value ) as $value ) {
// 					$results_array[ trim( $value, ' ' ) ][] = $obj->ID;
// 				}
// 			} else {
// 				$results_array[ trim( $obj->meta_value, ' ' ) ][] = $obj->ID;
// 			}
// 		}
// 		return $results_array;
// 	} else {
// 		foreach ( $results_array_raw as $meta_value ) {
// 			if ( strpos( $meta_value, ';' ) ) {
// 				foreach( explode( ';', $meta_value ) as $value ) {
// 					$results_array[] = trim( $value, ' ' );
// 				}
// 			} else if ( strlen( $meta_value ) ) {
// 				$results_array[] = trim( $meta_value, ' ' );
// 			}
// 		}
// 		sort( $results_array );
// 		return array_unique( $results_array );
// 	}
// }

/* A meta value as the theme uses it. Structured fields are stored as JSON
 * (arrays, objects, and the odd JSON string), so those are decoded; anything
 * else comes back exactly as stored. With no $meta_key, all of the post's
 * fields (not _private or BAK backup keys).
 *
 * Values are stored unslashed (writers wp_slash() what they hand to
 * update_post_meta()), so nothing is unslashed here: that used to drop every
 * backslash a visitor or editor typed. And JSON scalars aren't decoded: "2.10",
 * "1e3" and "true" in a text field came back as 2.1, 1000 and "1".
 *
 * Free-text fields (text, textarea, html, wp_editor) should be read with
 * devo_get_post_meta_string(), so text that happens to look like a JSON array
 * stays text. */
function devo_get_post_meta( $post_id, $meta_key = '' ) {
    if ( strlen( $meta_key ) ) {
        return devo_decode_meta_value( get_post_meta( $post_id, $meta_key, TRUE ) );
    }
    $meta_values = [];
    $meta_values_raw = get_post_meta( $post_id );
    foreach ( is_array( $meta_values_raw ) ? $meta_values_raw : [] as $key => $values ) {
        if ( strpos( $key, 'BAK' ) === FALSE && strpos( $key, '_' ) !== 0 ) {
            $meta_values[ $key ] = devo_get_post_meta( $post_id, $key );
        }
    }
    return $meta_values;
}

// A free-text field's value exactly as stored, never JSON-decoded
function devo_get_post_meta_string( $post_id, $meta_key ) {
    $value = get_post_meta( $post_id, $meta_key, TRUE );
    return is_scalar( $value ) ? (string) $value : '';
}

/* For the one-time upgrade in devo_upgrade_unslash_meta(): a value that
 * save_post() stored while it still validated the slashed $_POST ("O\'Brien",
 * or JSON whose strings were slashed), as the value it has always displayed as
 * ("O'Brien"). NULL when the value should be left alone.
 *
 * addslashes() only ever puts a backslash before ', ", \ or NUL, so a value
 * (or, for JSON, any string inside it) with any other backslash was stored as
 * typed - an imported page, a form submission, C:\path - and is left as it is. */
function devo_unslash_legacy_meta_value( $value ) {
    if ( ! is_string( $value ) || strpos( $value, '\\' ) === FALSE ) {
        return NULL;
    }
    $decoded = devo_decode_meta_value( $value );
    if ( $decoded === $value ) {
        return devo_is_slashed_shape( $value ) ? stripslashes( $value ) : NULL;
    }
    // JSON: unslash the strings inside it, if every one of them is slashed
    $shaped = TRUE;
    $changed = FALSE;
    $unslash = function( $node ) use ( &$unslash, &$shaped, &$changed ) {
        if ( is_string( $node ) ) {
            if ( strpos( $node, '\\' ) === FALSE ) {
                return $node;
            }
            $shaped = $shaped && devo_is_slashed_shape( $node );
            $changed = TRUE;
            return stripslashes( $node );
        }
        if ( is_array( $node ) || is_object( $node ) ) {
            $is_object = is_object( $node );
            $result = $is_object ? new stdClass() : [];
            foreach ( $node as $key => $child ) {
                $unslashed_key = $unslash( (string) $key );
                if ( $is_object ) {
                    $result->{ $unslashed_key } = $unslash( $child );
                } else {
                    $result[ $key ] = $unslash( $child );
                }
            }
            return $result;
        }
        return $node;
    };
    $unslashed = $unslash( $decoded );
    if ( ! $changed || ! $shaped ) {
        return NULL;
    }
    $encoded = wp_json_encode( $unslashed );
    return is_string( $encoded ) ? $encoded : NULL;
}

/* Whether every backslash in $string starts one of the pairs addslashes()
 * writes: \', \", \\ or \0. A single linear scan, not a regex: a pattern that
 * repeats an alternation once per character runs out of PCRE stack on long
 * values (preg_match() returns false at about 9,000 characters on PHP 8.4
 * with JIT), which read as "not slashed" and left long fields slashed. */
function devo_is_slashed_shape( $string ) {
    $length = strlen( $string );
    $offset = 0;
    while ( ( $position = strpos( $string, '\\', $offset ) ) !== FALSE ) {
        $next = $position + 1 < $length ? $string[ $position + 1 ] : '';
        if ( $next !== '\'' && $next !== '"' && $next !== '\\' && $next !== '0' ) {
            return FALSE;
        }
        $offset = $position + 2;
    }
    return TRUE;
}

// Decodes a stored meta value that is a JSON array, object or string
function devo_decode_meta_value( $value ) {
    if ( ! is_string( $value ) ) {
        return $value;
    }
    $trimmed = trim( $value );
    $first = substr( $trimmed, 0, 1 );
    if ( ! in_array( $first, [ '[', '{', '"' ], TRUE ) || ! is_json( $trimmed ) ) {
        return $value;
    }
    return json_decode( $trimmed );
}

function devo_get_relative_permalink( $post_id ) {
    $relative_permalink = home_url( str_replace( home_url(), '', get_the_permalink( $post_id ) ), 'relative' );
    return $relative_permalink === '/home/' ? '/' : $relative_permalink;
}

function devo_get_schema( $schema_fields, $post, $post_type_details = FALSE ) {
    if ( $post_type_details === FALSE ) {
        $post_type_details = devo_get_post_type_details( $post->post_type );
    }
    if ( ! is_array( $schema_fields ) ) {
        $schema_fields = [];
    }
    $date = isset( $post->post_date['iso8601'] ) ? $post->post_date['iso8601'] : $post->post_date;
    //$publish_date = date( 'Y-m-d', strtotime( get_post_field( 'post_date', $post->ID ) ) );
    $schema = [
        '@context' => 'https://schema.org',
    ];
    if ( $post->post_type !== 'devo_event' ) {
        $schema['datePublished'] = $date;
        $schema['author'] = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => devo_plain_text( get_bloginfo( 'name' ) ),
            'url' => home_url( '/' ),
        ];
    }
    foreach ( $schema_fields as $key => $values ) {
        $value_options = strpos( $values, '||' ) ? explode( '||', $values ) : [ $values ];
        foreach ( $value_options as $value ) {
            // The type field is kinda special
            if ( $key === '@type' ) {
                $maybe_meta_field = devo_get_post_meta( $post->ID, $post_type_details->meta_prefix . '_schema' );
                // If we find the value here, break the loop
                if ( strlen( $maybe_meta_field ) ) {
                    $schema[ $key ] = $maybe_meta_field;
                    break;
                } else {
                    $schema[ $key ] = $value;
                }
            } 
            // Default fields
            elseif ( in_array( $value, devo_default_fields_array() ) ) {
                $default_field_value = get_post_field( $value, $post->ID );
                // If we find the value here, break the loop
                if ( strlen( $default_field_value ) ) {
                    $schema[ $key ] = devo_schema_formatter( $key, $default_field_value, $post );
                    break;
                }
            }
            // Meta fields
            else {
                $meta_value = devo_get_post_meta( $post->ID, $value );
                if ( ( is_array( $meta_value ) && count( $meta_value ) ) || ( is_string( $meta_value ) && strlen( $meta_value ) ) ) {
                    $schema[ $key ] = devo_schema_formatter( $key, $meta_value, $post );
                    // Break the loop
                    break;
                }
            }
        }
    }

    return $schema;
}

function devo_schema_formatter( $key, $value, $post ) {
    $schema = '';
    switch ( $key ) {
        case 'breadcrumb':
            if ( is_array( $value ) && count( $value ) ) {
                $schema = [
                    '@context' => 'https://schema.org',
                    '@type' => 'BreadcrumbList',
                    'itemListElement' => [],
                ];
                foreach ( $value as $i => $breadcrumb ) {
                    $schema['itemListElement'][] = [
                        '@type' => 'ListItem',
                        'position' => $i + 1,
                        'item' => [
                            '@id' => strlen( $breadcrumb->url ) ? $breadcrumb->url : ( isset( $post->permalink ) ? $post->permalink : get_the_permalink( $post ) ),
                            'name' => $breadcrumb->text,
                        ],
                    ];
                }
            }
            break;
        case 'endDate':
        case 'startDate':
            $date_time = isset( $value['date_time'] ) && strlen( $value['date_time'] ) ? $value['date_time'] : ( isset( $value['date'] ) && strlen( $value['date'] ) ? $value['date'] : ( is_string( $value ) ? $value : '' ) );
            $timezone = isset( $value['timezone'] ) ? $value['timezone'] : '';
            if ( strlen( $date_time ) ) {
                $schema = devo_utc_to_timezone( $date_time, $timezone, 'Y-m-d' ) . 'T' . devo_utc_to_timezone( $date_time, $timezone, 'H:i:sP' );
            }
            break;
        case 'location':
            // URL
            if ( wp_http_validate_url( $value ) ) {
                $schema = [
                    '@type' => 'VirtualLocation',
                    'url' => $value,
                ];
            }
            // Place
            else {
                $schema = [
                    '@type' => 'Place',
                    'name' => isset( $value['name'] ) ? $value['name'] : '',
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressLocality' => isset( $value['city'] ) ? $value['city'] : '',
                        'addressRegion' => isset( $value['state_locality'] ) ? $value['state_locality'] : '',
                        'streetAddress' => ( isset( $value['address_1'] ) ? $value['address_1'] : '' ) . ' ' . ( isset( $value['address_2'] ) ? $value['address_2'] : '' ),
                        'country' => isset( $value['country'] ) ? $value['country'] : '',
                        'postalCode' => isset( $value['postal_code'] ) ? $value['postal_code'] : '',
                    ],
                ];
            }
            break;
        default: 
            $schema = is_scalar( $value ) ? devo_plain_text( $value ) : '';
            break;
    }
    return $schema;
}

/* Turns stored field HTML into plain text: tags removed and entities decoded.
 *
 * Field values are saved through wp_kses_post(), which normalises a bare "&"
 * to "&amp;". That's right for HTML, but text that ends up somewhere plain -
 * a <title>, a meta description, JSON-LD, a post title - would show the
 * entity. Decode it here, at the point of use, rather than when saving: a
 * decode on save would also turn an escaped "&lt;script&gt;" back into a
 * live tag. Tags are stripped again after decoding for the same reason. The
 * result is plain text and must still be escaped for whatever context it is
 * printed in. */
function devo_plain_text( $value ) {
    if ( ! is_scalar( $value ) ) {
        return '';
    }
    $text = html_entity_decode( devo_strip_tags( (string) $value ), ENT_QUOTES | ENT_HTML5, 'UTF-8' );
    return trim( devo_strip_tags( $text ) );
}

// Like wp_strip_all_tags(), but only removes things shaped like markup.
// strip_tags() treats any "<" as the start of a tag and drops everything after
// it, so a plain-text label "x<y" came back as "x". Here a "<" only opens a tag
// when a letter, "/", "!" or "?" follows it.
function devo_strip_tags( $text ) {
    $text = preg_replace( '@<(script|style)[^>]*?>.*?</\\1\s*>@si', '', (string) $text );
    $text = preg_replace( '@<!--.*?-->|<[/!?]?[a-zA-Z][^>]*>@s', '', (string) $text );
    return (string) $text;
}

// Retrieves and formats seo field value from options
function devo_get_seo_field_value( $field_options, $data = new stdClass ) {
    // One field ('SEO Description'), a fallback chain ('SEO Title||post_title')
    // or an array of fields to join
    if ( is_string( $field_options ) && strlen( $field_options ) ) {
        $fields = explode( '||', $field_options );
    } elseif ( is_array( $field_options ) ) {
        $fields = $field_options;
    } else {
        $fields = [];
    }
    foreach ( $fields as $field ) {
        // $field is a string (aka a single field)
        if ( is_string( $field ) ) {
            // Default field
            if ( in_array( $field, devo_default_fields_array() ) && isset( $data->{ $field } ) ) {
                // Array
                if ( is_array( $data->{ $field } ) && count( $data->{ $field } ) ) {
                    return $data->{ $field };
                } 
                // String
                elseif ( is_string( $data->{ $field } ) && strlen( $data->{ $field } ) ) {
                    return devo_plain_text( $data->{ $field } );
                }
            } 
            // Meta field
            else {
                $meta_value = devo_get_post_meta( $data->ID, $field );
                // Array
                if ( is_array( $meta_value ) && isset( $meta_value['media'] ) ) {
                    return $meta_value['media'];
                }
                // String
                elseif ( is_string( $meta_value ) && strlen( $meta_value ) ) {
                    return devo_plain_text( $meta_value );
                }
            }
        } 
        // $field is an array (aka join multiple fields)
        elseif ( is_array( $field ) ) {
            $return = [];
            foreach ( $field as $field_part ) {
                // Default field
                if ( in_array( $field_part, devo_default_fields_array() ) && isset( $data->{ $field_part } ) ) {
                    // If it's an array, go ahead and return. We can't join that.
                    if ( is_array( $data->{ $field_part } ) && count( $data->{ $field_part } ) ) {
                        return $data->{ $field_part };
                    } 
                    // String
                    elseif ( is_string( $data->{ $field_part } ) && strlen( $data->{ $field_part } ) ) {
                        $return[] = devo_plain_text( $data->{ $field_part } );
                    }
                } 
                // Meta field?
                else {
                    $meta_value = devo_get_post_meta( $data->ID, $field_part );
                    // Array
                    // If it's an array, go ahead and return. We can't join that.
                    if ( is_array( $meta_value ) && count( $meta_value ) ) {
                        // Accounts for using a background image as the seo image
                        return isset( $meta_value['media'] ) ? $meta_value['media'] : $meta_value;
                    }
                    // String
                    elseif ( is_string( $meta_value ) && strlen( $meta_value ) ) {
                        $return[] = devo_plain_text( $meta_value );
                    }
                }
            }
            return implode( ' ', $return );
        }
    }
    return '';
}

/**
 * Extracts the vimeo id from a vimeo url.
 * Returns false if the url is not recognized as a vimeo url.
 * Regex from https://stackoverflow.com/questions/10488943/easy-way-to-get-vimeo-id-from-a-vimeo-url/34027757#answer-50651372
 */
function devo_get_vimeo_id( $url ) {
    if ( strpos( $url, 'vimeo' ) !== FALSE ) {
        $vimeo_url_search = preg_match( '/[\d]+/', $url, $matches );
        if ( current( $matches ) ) {
            return current( $matches );
        }
    }
    return FALSE;
}

/**
 * Extracts the youtube id from a youtube url.
 * Returns false if the url is not recognized as a youtube url.
 * From https://github.com/lingtalfi/video-ids-and-thumbnails/blob/master/function.video.php
 */
function devo_get_youtube_id( $url ) {
    $url_parts = parse_url( $url );
    if ( isset( $url_parts['host'] ) ) {
        $host = $url_parts['host'];
        if ( FALSE === strpos( $host, 'youtube' ) && FALSE === strpos( $host, 'youtu.be' ) ) {
            return FALSE;
        }
    }
    if ( isset( $url_parts['query'] ) ) {
        parse_str( $url_parts['query'], $query_vars );
        if ( isset( $query_vars['v'] ) ) {
            return $query_vars['v'];
        }
        else if (isset($query_vars['vi'])) {
            return $query_vars['vi'];
        }
    }
    if ( isset( $url_parts['path'] ) ) {
        $url_path = explode( '/', trim( $url_parts['path'], '/' ) );
        return $url_path[ count( $url_path ) - 1 ];
    }
    return FALSE;
}

function devo_has_value( $var ) {
    if ( is_array( $var ) ) {
        return devo_array_has_value( $var );
    } else {
        return strlen( (string) $var );
    }
}

function devo_hex_to_rgb( $hex ) {
    $hex = (string) $hex;
    $hex = strtolower( str_replace( '#', '', $hex ) );
    if ( strlen( $hex ) == 3 ) {
        $color_parts = [ substr( $hex, 0, 1 ) . substr( $hex, 0, 1 ), substr( $hex, 1, 1 ) . substr( $hex, 1, 1 ), substr( $hex, 2, 1 ) . substr( $hex, 2, 1 ) ];
    } else {
        $color_parts = [ substr( $hex, 0, 2 ), substr( $hex, 2, 2 ), substr( $hex, 4, 2 ) ];
    }
    $map = [
      '0' => 0,
      '1' => 1,
      '2' => 2,
      '3' => 3,
      '4' => 4,
      '5' => 5,
      '6' => 6,
      '7' => 7,
      '8' => 8,
      '9' => 9,
      'a' => 10,
      'b' => 11,
      'c' => 12,
      'd' => 13,
      'e' => 14,
      'f' => 15,
    ];
    $rgb = [];
    foreach( $color_parts as $segment ) {
        $first_digit_raw = substr( $segment, 0, 1 );
        $first_digit = $map[ $first_digit_raw ];
        $second_digit_raw = substr( $segment, 1, 1 );
        $second_digit = $map[ $second_digit_raw ];
        $rgb[] = ( $first_digit * pow( 16, 1 ) ) + ( $second_digit * pow( 16, 0 ) );
    }
    return $rgb;
}

function devo_array_contains( $needles, $haystack, $all = FALSE, $strict = FALSE ) {
    if ( ! is_array( $needles ) ) {
        $needles = [ $needles ];
    }
    $matches = [];
    foreach ( $needles as $needle ) {
        if ( in_array( $needle, $haystack, $strict ) ) {
            $matches[] = $needle;
        }
    }
    return $all ? count( $matches ) == count( $needles ) : count( $matches );
}

function devo_items_in_a_series( $items = [], $and = 'and' ) {
    if ( ! count( $items ) ) {
        return '';
    }
    $series = '';
    $items_count = count( $items );
    $i = 1;
    if ( $items_count > 1 ) {
        foreach ( $items as $item ) {
            $series .= $i == $items_count ? $and . ' ' . $item : $item . ( $items_count > 2 ? ', ' : ' ' );
            $i++;
        }
    } else {
        $series = current( $items );
    }
    return $series;
}
// Load classes from specified directory
function devo_load_class_files( $post_types = [], $directory = FALSE ) {
    $path = $directory ? $directory . '/' : '';
    foreach ( $post_types as $post_type ) {
        locate_template( 'api/classes/' . $path . 'class-' . $post_type . '.php', TRUE, TRUE );
    }
}

// Figures out whether a file is an image, video, pdf, or url
function devo_media_type( $media = FALSE ) {
    // If this is a post_id, get the post
    if ( $media && is_numeric( $media ) ) {
        $media_details = wp_get_attachment_image_src( $media, 'full' );
        $media = $media_details && isset( $media_details[0] ) ? $media_details[0] : FALSE;
    }
    // If there's no media, get out
    if ( ! $media ) {
        return;
    }
    // Image
    if ( strpos( $media, '.jpg' ) !== FALSE || strpos( $media, '.jpeg' ) !== FALSE || strpos( $media, '.gif' ) !== FALSE || strpos( $media, '.png' ) !== FALSE || strpos( $media, '.svg' ) !== FALSE || strpos( $media, '.webp' ) !== FALSE ) {
        return 'image';
    }
    // Video
    elseif ( strpos( $media, 'vimeo' ) !== FALSE || strpos( $media, 'youtube' ) !== FALSE || strpos( $media, '.mp4' ) !== FALSE || strpos( $media, '.webm' ) !== FALSE ) {
        return 'video';
    }
    // PDF
    elseif ( strpos( $media, '.pdf' ) !== FALSE ) {
        return 'pdf';
    }
    // if none of the above, assume it's a URL
    else {
        return 'url';
    }
}

function devo_meta_field_key( $field_label, $meta_prefix = '', $meta_suffix = '' ) {
    $field_label = str_replace( '/[<>]/', '', $field_label );
    $meta_field_key = ( strlen( $meta_prefix ) ? $meta_prefix . '_' : '' ) . trim( strtolower( preg_replace('/[^\w\d_]/', '_', preg_replace( '/[-\(\)]/', '', $field_label ) ) ), '_' );
    $meta_field_key = str_replace( '__', '_', $meta_field_key );
    $meta_field_key = str_replace( '__', '_', $meta_field_key );
    $meta_field_key = strlen( $meta_suffix ) ? $meta_field_key . '_' . $meta_suffix : $meta_field_key;
    
    return $meta_field_key;
}

// Organize meta fields by meta_field_key
function devo_meta_field_labels_by_key( $meta_fields, $meta_prefix ) {
    $meta_field_labels = [];
    foreach ( $meta_fields as $field_label => $field_options ) {
        $meta_field_labels[ devo_meta_field_key( $field_label, $meta_prefix ) ] = $field_label;
    }
    return $meta_field_labels;
}

// Make text safe to use as o column name in MySQL database
function devo_mysql_column_name( $text ) {
    if ( strpos( $text, ';' ) !== FALSE ) {
    	$return = [];
	    foreach( explode( ';', $text ) as $string ) {
            $return[] = devo_mysql_column_name( $string );
        }
        return implode( ';', $return );
    }
    // If there's a byte order mark, remove it
    if ( substr( $text, 0, 3 ) == chr( hexdec( 'EF' ) ) . chr( hexdec( 'BB' ) ) . chr( hexdec( 'BF' ) ) ) {
        $text = substr( $text, 3 );
    }
    $safe_text = preg_replace( '/[^0-9,a-z,A-Z\$\_\;]/', '_', trim( $text ) );
    return $safe_text;
}

// Gets the next key in an associative array
function devo_next_key( $array, $current_key ) {
    $keys = array_keys( $array );
    $current_index = array_search( $current_key, $keys );
    $next_index = $current_index !== FALSE ? $current_index + 1 : FALSE;
    if ( $next_index && $next_index < count( $keys ) ) {
        return $keys[ $next_index ];
    }
    return FALSE;
}

function devo_number_in_range( $number, $range = [ 0, 0 ] ) {
    if ( ! is_numeric( $number ) || ! isset( $range[0] ) || ! isset( $range[1] ) ) {
        return FALSE;
    }
    if ( $range[0] <= $number && $number <= $range[1] ) {
        return TRUE;
    } else {
        return FALSE;
    }
}

// Convert an object into an array
function devo_array_from_object( $obj ) {
	$array = [];
	foreach ( $obj as $key => $value ) {
		$array[ $key ] = $value;
	}
	return $array;
}

// Organize post type into $value => [ 'label' => $label, 'value' => $value ] format
function devo_organize_posts( $post_type = FALSE ) {
    if ( ! $post_type ) {
        return;
    }
    $posts = get_posts( [
        'post_type' => $post_type,
        'nopaging' => TRUE,
        'fields' => 'ids',
    ] );
    $organized_posts = [];
    if ( count( $posts ) ) {
        foreach ( $posts as $post_id ) {
            $slug = get_post_field( 'post_name', $post_id );
            $organized_posts[ $slug ] = [
                'label' => get_the_title( $post_id ),
                'value' => $slug,
            ];
        }
    }
    return $organized_posts;
}

// Returns a whole number percentage
function devo_percent( $numerator, $denominator = FALSE, $adjust_for_0 = TRUE ) {
    if ( $denominator ) {
        $raw_percent = ( $numerator / $denominator ) * 100;
    } else {
        $raw_percent = $numerator * 100;
    }
    if ( $raw_percent < .1 && $adjust_for_0 ) {
        $percent = round( $raw_percent, 2 );
    } else if ( $raw_percent < 1 && $adjust_for_0 ) {
        $percent = round( $raw_percent, 1 );
    } else {
        $percent = round( $raw_percent, 0 );
    }
    return $percent;
}

function devo_php_us_timezone( $timezone_abrv ) {
    $timezones = [
        'et' => 'America/New_York',
        'ct' => 'America/Chicago',
        'mt' => 'America/Denver',
        'mst' => 'America/Phoenix',
        'pt' => 'America/Los_Angeles',
        'ak' => 'America/Anchorage',
    ];
    if ( isset( $timezones[ $timezone_abrv ] ) ) {
        return $timezones[ $timezone_abrv ];
    } else {
        return FALSE;
    }
}

// Makes a word plural
function devo_pluralize( $word ) {
	if ( strlen( $word ) ) {
		$last_char = $word[ strlen( $word ) - 1 ];
		switch ( $last_char ) {
			case 'y':
				return substr( $word, 0, -1 ) . 'ies';
				break;

			case 'h':
			case 'x':
				return $word . 'es';
				break;

			case 's':
				return $word;
				break;

			default:
				return $word . 's';
				break;
		}
	}
	return;
}

// Get custom post types
function devo_get_post_types( $specific_site = FALSE ) {
    $custom_post_types = [];
    $not_these_post_types = [
        // WordPress native
        'post', 'page', 'product', 'customize_changeset', 'custom_css', 'attachment', 'revision', 'nav_menu_item', 'oembed_cache', 'user_request', 'wp_block', 'wp_template', 'wp_global_styles', 'wp_navigation', 'wp_template_part', 'wp_font_face', 'wp_font_family', 
        // From plugins
        'scheduled-action', 'wpforms', 'wpforms-template',
        // Custom, but still no
        'devo_form_submission', 'devo_admin_page' ];
    if ( $specific_site ) {
        $blog_id = ( $specific_site_id = devo_site_id( $specific_site ) ) ? $specific_site_id : get_current_blog_id();
        switch_to_blog( $blog_id );
            global $wpdb;
            $post_types = $wpdb->get_col( "SELECT DISTINCT(post_type) FROM $wpdb->posts ORDER BY post_type" );
            foreach ( $post_types as $type ) {
                if ( ! in_array( $type, $not_these_post_types ) ) {
                    $custom_post_types[ $type ] = [
                        'label' => ucwords( str_replace( [ 'devo_', '_' ], [ '', ' ' ], $type ) ),
                        'value' => $type,
                    ];
                }
            }
        restore_current_blog();
    }
    else {
        $all_post_types = get_post_types( [], 'objects' );
        foreach ( $all_post_types as $type => $post_type ) {
            if ( ! in_array( $type, $not_these_post_types ) ) {
                $custom_post_types[ $type ] = [
                    'label' => $post_type->label,
                    'value' => $type,
                ];
            }
        }
    }
    sort( $custom_post_types );
    return $custom_post_types;
}

/* Post types the front end may list: /archive/, /devo-search, post browser
 * defaults and the post type pickers.
 *
 * An allowlist built from what WordPress itself considers public, minus a
 * filterable set the theme keeps out of listings (core posts/pages, forms,
 * icons). Anything non-public - form submissions, admin pages, plugin
 * internals - can never appear, however the request is crafted. */
function devo_get_public_post_types( $format = 'assc_array' ) {
    $excluded = apply_filters( 'devo_public_post_types_exclude', [ 'post', 'page', 'attachment', 'devo_form', 'devo_icon' ] );
    $excluded = is_array( $excluded ) ? $excluded : [];
    $custom_post_types = [];
    foreach ( get_post_types( [ 'public' => TRUE ], 'objects' ) as $type => $post_type ) {
        if ( in_array( $type, $excluded, TRUE ) || ! is_post_type_viewable( $post_type ) ) {
            continue;
        }
        // Assc Array type => [ label, value ]
        if ( $format === 'assc_array' ) {
            $custom_post_types[ $type ] = [
                'label' => $post_type->label,
                'value' => $type,
            ];
        }
        // Indexed Array
        else {
            $custom_post_types[] = $type;
        }
    }
    if ( $format === 'assc_array' ) {
        ksort( $custom_post_types );
    } else {
        sort( $custom_post_types );
    }
    return $custom_post_types;
}

// Keeps only the post types in $requested that the front end may list
function devo_filter_public_post_types( $requested ) {
    if ( is_string( $requested ) ) {
        $requested = explode( ',', $requested );
    }
    if ( ! is_array( $requested ) ) {
        return [];
    }
    $requested = array_map( 'trim', array_filter( $requested, 'is_string' ) );
    return array_values( array_intersect( $requested, devo_get_public_post_types( 'indexed_array' ) ) );
}

// Most posts one /archive/ or /devo-search request may return
function devo_max_posts_per_page() {
    return max( 1, (int) apply_filters( 'devo_max_posts_per_page', 50 ) );
}

// A requested page size, capped. -1 ("all") and anything out of range become the cap.
function devo_clamp_posts_per_page( $posts_per_page, $default = 15 ) {
    $posts_per_page = is_numeric( $posts_per_page ) ? (int) $posts_per_page : (int) $default;
    $max = devo_max_posts_per_page();
    return $posts_per_page < 1 || $posts_per_page > $max ? $max : $posts_per_page;
}

function devo_read_time( $content = '', $wpm = 300 ) {
	$clean_content = strip_shortcodes( $content );
	$clean_content = strip_tags( $clean_content );
	$word_count = str_word_count( $clean_content );
	$time = ceil( $word_count / $wpm );
	return ( $time > 0 ? str_replace( 'X', $time, __( 'X minute read', 'developers_only' ) ) : __( 'Less than 1 minute read', 'developers_only' ) );
}

// Replaces $find with $n, where $n is incremented for each $find
function devo_replace_with_increment( $string, $find ) {
    $get_count = str_replace( $find, $find, $string, $count );
    $new_string = $string;
    for ( $i = 0; $i < $count; $i++ ) {
        $pos = strpos( $new_string, $find );
        $n = $i + 1;
        $new_string = substr_replace( $new_string, $n, $pos, strlen( $find ) );
    }
    return $new_string;
}

/* Automatically creates rewrite rules for spcified number of key/value pairs
   $wp_rewrite: $wp_rewrite global
   $criteria_count: how many key/value pairs
   $root: the base path, ex. 'search' or 'reports'
   $post_type: adds post_type parameter
   $binary: sets $binary=1. Used for template selection
*/
function devo_rewrite_generator( $wp_rewrite, $criteria_count, $root, $post_type = FALSE, $binary = FALSE, $base = 'base', $custom = FALSE ) {
    $regex = '([^/]+)';
	for ( $i = 0; $i < $criteria_count + 1; $i++ ) {
		$parameter_array = [ $root ];
		$query_string = 'index.php?';
		if ( $binary ) {
		    $binary = is_array( $binary ) ? $binary : [ $binary ];
		    $binaries = [];
		    foreach ( $binary as $var ) {
			    $binaries[] = $var . '=1';
            }
            $query_string .= implode( '&', $binaries );
		}
        if ( $post_type ) {
		    $query_string .= '&post_type=' . $post_type;
        }
        if ( $custom ) {
		    $query_string .= $custom;
        }
		if ( $i > 0 ) {
			for ( $j = 1; $j < $i * 2 + 1; $j++ ) {
				array_push( $parameter_array, $regex );
				if ( $j % 2 ) {
					$query_string .= '&$matches[' . $j . ']';
				} else {
					$query_string .= '=$matches[' . $j . ']';
				}
			}
		}
		$parameters = implode( '/', $parameter_array ) . '$';
        if ( $base == 'base' || $i != 0 ) {
            // Regular
            $wp_rewrite->rules = [  $parameters => $query_string ] + $wp_rewrite->rules;
            // iFrame
            //$wp_rewrite->rules = [ 'iframe/' . $parameters => $query_string . '&iframe=1' ] + $wp_rewrite->rules;
            // PDF
            //$wp_rewrite->rules = [ 'pdf/' . $parameters => $query_string . '&pdf=1' ] + $wp_rewrite->rules;
        }
	}
}

/**
 * Get the site ID from the site path.
 *
 * @param string|false $name A site's stylesheet ('global' for the main site),
 *                           or FALSE for all of them.
 * @return int|false|array<string, int> The site's ID, FALSE if there's no such
 *                                      site, or every site's ID by name.
 */
function devo_site_id( $name = FALSE ) {
    $sites_raw = get_sites();
    $sites = [];
    foreach ( $sites_raw as $site ) {
        $site_name = $site->blog_id == 1 ? 'global' : get_blog_option( $site->blog_id, 'stylesheet' );
        $sites[ $site_name ] = (int) $site->blog_id;
    }
    return $name ? ( isset( $sites[ $name ] ) ? $sites[ $name ] : FALSE ) : $sites;
}

// Wraps a string with the specified before and after
function devo_string_wrap( $string, $before = '', $after = '' ) {
    if ( ! $string ) {
        return;
    }
    return $before . $string . $after;
}

function devo_str_lreplace( $search, $replace, $subject ) {
    $pos = strrpos( $subject, $search );
    if ( $pos !== FALSE ) {
        $subject = substr_replace( $subject, $replace, $pos, strlen( $search ) );
    }
    return $subject;
}

function devo_svg_dimensions( $image_url, $dimension = 'all' ) {
    $dimensions = FALSE;
    $image_url_array = explode( '/', $image_url );
    $image_path_array = array_slice( $image_url_array, array_search( 'wp-content', $image_url_array ) + 1 );
    $image_path = WP_CONTENT_DIR . '/' . implode( '/', $image_path_array );
    if ( strpos( $image_url, '.svg' ) !== FALSE && ( $xml = @simplexml_load_file( $image_path ) ) !== FALSE ) {
        $attr = $xml->attributes();
        $viewbox = explode( ' ', isset( $attr->viewBox ) ? $attr->viewBox : '' );
        $width = isset( $attr->width ) && preg_match( '/\d+/', $attr->width, $value ) ? (int) $value[0] : ( count( $viewbox ) == 4 ? (int) $viewbox[2] : null );
        $height = isset( $attr->height ) && preg_match( '/\d+/', $attr->height, $value ) ? (int) $value[0] : ( count( $viewbox ) == 4 ? (int) $viewbox[3] : null );
        $dimensions = [
            'all' => [ 'width' => $width, 'height' => $height ],
            'width' => $width,
            'height' => $height,
        ];
    }
    return isset( $dimensions[ $dimension ] ) ? $dimensions[ $dimension ] : FALSE;
}

// Takes a timestamp representing a specified timezone (or wp_timezone_string() by default) and converts it to a UTC timestamp
function devo_timezone_to_utc( $timestamp = FALSE, $timezone = FALSE ) {
    if ( ! $timestamp ) {
        return FALSE;
    }
    if ( ! $timezone ) {
        $timezone = wp_timezone_string();
    }
    $date_obj = new DateTime( date('F j, Y g:i:s A ', (int) $timestamp ) . $timezone );
    $timezone_obj = new DateTimeZone( 'UTC' );
    $date_obj->setTimeZone( $timezone_obj );

    return $date_obj->format( 'U' );
}

// Truncates text at the end of a sentence if possible (or always if threshold == FALSE )
function devo_truncate( $text = FALSE, $settings = [] ) {
    if ( ! $text ) {
        return;
    }
    $count = isset( $settings['count'] ) ? $settings['count'] : 25;
    $count_type = isset( $settings['count_type'] ) ? $settings['count_type'] : 'words';
    $threshold =  isset( $settings['threshold'] ) ? $settings['threshold'] : FALSE;
    $truncated_text = $text;
    if ( $count_type == 'words' ) {
        $words = explode( ' ', $text );
        if ( count( $words ) > $count ) {
            $truncated_text = implode( ' ', array_slice( $words, 0, $count ) );
            $min_threshold = $threshold && $count - $threshold > 0 ? $count - $threshold : 0;
            $max_threshold = $threshold && $count + $threshold < count( $words ) ? $count + $threshold : count( $words );
            $periods = devo_array_find( '.', $words );
            $exclamation_points = devo_array_find( '!', $words );
            $question_marks = devo_array_find( '?', $words );
            $punctuation = array_merge( $periods ? $periods : [], $exclamation_points ? $exclamation_points : [], $question_marks ? $question_marks : [] );
            sort( $punctuation );
            foreach ( $punctuation as $location ) {
                if ( $threshold && $location >= $min_threshold && $location <= $max_threshold ) {
                    $truncated_text = implode( ' ', array_slice( $words, 0, $location + 1 ) );
                } elseif ( $threshold && $location <= $max_threshold ) {
                    $truncated_text = implode( ' ', array_slice( $words, 0, $location + 1 ) );
                } elseif ( $location >= $count ) {
                    return implode( ' ', array_slice( $words, 0, $location + 1 ) );
                }
            }
        }
    } elseif ( $count_type = 'characters' ) {
        $characters = explode( '', $text );
        if ( count( $characters ) > $count ) {
            $truncated_text = implode( '', array_slice( $characters, 0, $count ) );
            $min_threshold = $threshold && $count - $threshold > 0 ? $count - $threshold : 0;
            $max_threshold = $threshold && $count + $threshold < count( $characters ) ? $count + $threshold : count( $characters );
            $periods = devo_array_find( '.', $characters );
            $exclamation_points = devo_array_find( '!', $characters );
            $question_marks = devo_array_find( '?', $characters );
            $punctuation = array_merge( $periods ? $periods : [], $exclamation_points ? $exclamation_points : [], $question_marks ? $question_marks : [] );
            sort( $punctuation );
            foreach ( $punctuation as $location ) {
                if ( $location >= $min_threshold && $location <= $max_threshold ) {
                    $truncated_text = implode( '', array_slice( $characters, 0, $location + 1 ) );
                } elseif ( $location <= $max_threshold ) {
                    $truncated_text = implode( '', array_slice( $characters, 0, $location + 1 ) );
                } elseif ( $location >= $count ) {
                    return implode( ' ', array_slice( $characters, 0, $location + 1 ) );
                }
            }
        }
    }
    return $truncated_text;
}

// Determines if a url is good based on the headers it returns (not always accurate)
function devo_url_checker( $url ) {
	$headers = @get_headers( $url );
	if ( $headers[0] == 'HTTP/1.1 404 Not Found' ) {
	    return FALSE;
	} else {
	    return TRUE;
	}
}

// Figure out url type - pdf, image, video, page
function devo_url_type( $url = '' ) {
    if ( strpos( $url, '.pdf' ) !== FALSE ) {
        $url_type = 'pdf';
    } elseif ( strpos( $url, '.jpg' ) !== FALSE || strpos( $url, '.jpeg' ) !== FALSE || strpos( $url, '.png' ) !== FALSE || strpos( $url, '.gif' ) !== FALSE || strpos( $url, '.bmp' ) !== FALSE || strpos( $url, '.webp' ) !== FALSE || strpos( $url, '.svg' ) !== FALSE ) {
        $url_type = 'image';
    } elseif ( strpos( $url, 'vimeo' ) !== FALSE ) {
        $url_type = 'video';
    } else {
        $url_type = 'page';
    }
    return $url_type;
}

// Takes a UTC timestamp and converts it to a date string for the specified tomezone (wp_timezone_string() by default)
function devo_utc_to_timezone( $timestamp = FALSE, $timezone = FALSE, $format = 'F j, Y, g:ia T' ) {
    if ( ! $timestamp ) {
        return FALSE;
    }
    if ( ! $timezone ) {
        $timezone = wp_timezone_string();
    }
    $date_obj = new DateTime( date('F j, Y g:i:s A ', $timestamp ) . 'UTC' );
    $timezone_obj = new DateTimeZone( $timezone );
    $date_obj->setTimeZone( $timezone_obj );

    return $date_obj->format( $format );
}

function devo_video_embed_url( $url = FALSE ) {
    if ( ! $url ) {
        return;
    }
    $site_language = substr( get_bloginfo( 'language' ), 0, 2 );
    $source = strpos( $url, 'vimeo' ) !== FALSE ? 'vimeo' : 'youtube';
    $id = strpos( $url, 'vimeo' ) !== FALSE ? devo_get_vimeo_id( $url ) : devo_get_youtube_id( $url );
    // If site language is not English, turn on subtitles
    $language_param = '';//$site_language !== 'en' ? ( $source == 'vimeo' ? '&texttrack=' . $site_language : '&hl=' . $site_language . '&cc_lang_pref=' . $site_language . '&cc_load_policy=1' ) : '';

    return $source == 'vimeo' ? 'https://player.vimeo.com/video/' . $id . '?loop=0&title=0&byline=0' . $language_param :  'https://www.youtube.com/embed/' . $id . '?rel=0&showinfo=0' . $language_param;
}

// Figures out whether a media file is an image or a video
function devo_video_type( $video = FALSE ) {
    // If there's no video, get out
    if ( ! $video ) {
        return;
    }
    // Streaming
    if ( strpos( $video, 'vimeo' ) !== FALSE || strpos( $video, 'youtube' ) ) {
        return 'streaming';
    }
    // Embed
    elseif ( strpos( $video, '.mp4' ) !== FALSE || strpos( $video, '.webm' ) !== FALSE ) {
        return 'embed';
    }
    // No idea
    else {
        return FALSE;
    }
}

// Determines if an array is associative or not
// from https://stackoverflow.com/questions/173400/how-to-check-if-php-array-is-associative-or-sequential
function is_assoc_array( $array = [] ) {
    if ( ! count( $array ) ) {
        return FALSE;
    }
    return array_keys( $array ) !== range( 0, count( $array ) - 1 );
}

// ...pretty self-explanatory I think
// Meta values can be arrays (serialized meta), so anything but a string is
// simply not JSON rather than a TypeError.
function is_json( $string ): bool {
    if ( ! is_string( $string ) || $string === '' ) {
        return FALSE;
    }
    json_decode( $string );
    return ( json_last_error() === JSON_ERROR_NONE );
}

// Helps remove filters originating in plugins
// from: https://wordpress.stackexchange.com/questions/304859/remove-action-from-a-plugin-class
function remove_filters_with_method_name( $hook_name = '', $method_name = '', $priority = 0 ) {
    global $wp_filter;
    // Take only filters on right hook name and priority
    if ( ! isset( $wp_filter[ $hook_name ][ $priority ] ) || ! is_array( $wp_filter[ $hook_name ][ $priority ] ) ) {
        return FALSE;
    }
    // Loop on filters registered
    foreach ( (array) $wp_filter[ $hook_name ][ $priority ] as $unique_id => $filter_array ) {
        // Test if filter is an array ! (always for class/method)
        if ( isset( $filter_array['function'] ) && is_array( $filter_array['function'] ) ) {
            // Test if object is a class and method is equal to param !
            if ( is_object( $filter_array['function'][0] ) && get_class( $filter_array['function'][0] ) && $filter_array['function'][1] == $method_name ) {
                // Test for WordPress >= 4.7 WP_Hook class (https://make.wordpress.org/core/2016/09/08/wp_hook-next-generation-actions-and-filters/)
                if ( is_a( $wp_filter[ $hook_name ], 'WP_Hook' ) ) {
                    unset( $wp_filter[ $hook_name ]->callbacks[ $priority ][ $unique_id ] );
                } else {
                    unset( $wp_filter[ $hook_name ][ $priority ][ $unique_id ] );
                }
            }
        }
    }
    return FALSE;
}