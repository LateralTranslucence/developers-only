<?php

class DO_Form_Field_API_Display {
    private $field_key;
    public $output;
    private $post_id;
    private $post_type_details;
    /* What the private type methods get when there is no value to format and
     * they should read the field's own meta. It used to be FALSE, so a stored
     * JSON false inside a multi field (a sub-value force_field() passes down)
     * read the parent field's raw meta instead. Nothing stored can equal it. */
    private const NO_VALUE = "\0devo:no-value\0";

    // $force_value: the value to format. FALSE (the default) reads the
    // field's meta, as before.
    function __construct( $type, $field_key, $post_id, $post_type_details, $force_value = FALSE ) {
        $force_value = $force_value === FALSE ? self::NO_VALUE : $force_value;
        $this->field_key = $field_key;
        $this->post_id = $post_id;
        $this->post_type_details = $post_type_details;
        // Find the custom method for the data type
        if ( $type && method_exists( $this, $type ) ) {
            $this->output = $this->{ $type }( $force_value );
        } 
        // or just return the field
        else {
            $this->output = is_string( $value = devo_get_post_meta( $this->post_id, $this->field_key ) ) ? do_shortcode( $value ) : $value;
        }
    }

    private function address( $force_value = self::NO_VALUE ) {
        $raw_address = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $address = is_array( $raw_address ) ? $raw_address : [];
        $data = [];
        if ( count( $address ) ) {
            $data = [
                'name' => isset( $address['name'] ) ? $address['name'] : '',
                'address_1' => isset( $address['address_1'] ) ? $address['address_1'] : '',
                'address_2' => isset( $address['address_2'] ) ? $address['address_2'] : '',
                'city' => isset( $address['city'] ) ? $address['city'] : '',
                'state_locality' => isset( $address['state_locality'] ) ? $address['state_locality'] : '',
                'postal_code' => isset( $address['postal_code'] ) ? $address['postal_code'] : '',
                'country' => isset( $address['country'] ) ? $address['country'] : '',
                'google_maps' => isset( $address['google_maps'] ) ? $address['google_maps'] : '',
            ];
        };
        return $data;
    }

    /* Background: a colour and an optional media file.
     *
     * Stored by the admin field as a `multi` with Color and Media sub-fields, so
     * the raw meta is { color: '#rrggbb', media: '<url>' }. Without this method
     * the value fell through to the constructor's generic branch and the media
     * arrived as a bare URL string, which the front end cannot size or type. */
    private function background( $force_value = self::NO_VALUE ) {
        $value = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $color = isset( $value->color ) && is_string( $value->color ) ? trim( $value->color ) : '';
        $media_value = isset( $value->media ) && is_string( $value->media ) ? trim( $value->media ) : '';
        // media() returns [] for an empty value; hand the front end null instead
        // so `media?: Media` is either absent or a real object.
        $media = strlen( $media_value ) ? $this->media( $media_value ) : [];

        return [
            'color' => $color,
            'media' => $media ? $media : NULL,
        ];
    }

    // Same shape; kept so the background_hero field type resolves here too.
    private function background_hero( $force_value = self::NO_VALUE ) {
        return $this->background( $force_value );
    }

    private function binary( $force_value = self::NO_VALUE ) {
        return $force_value !== self::NO_VALUE ? (bool) $force_value : (bool) devo_get_post_meta( $this->post_id, $this->field_key );
    }
    
    private function binary_select( $force_value = self::NO_VALUE ) {
        return $this->binary( $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key ) );
    }

    private function ctas( $force_value = self::NO_VALUE ) {
        $raw_ctas = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $ctas = is_array( $raw_ctas ) ? $raw_ctas : [];
        $data = [];
        foreach ( $ctas as $cta_details ) {
            $data[] = [
                'text' => isset( $cta_details->text ) ? $cta_details->text : '',
                'url' => isset( $cta_details->url ) ? $cta_details->url : '',
                'modal' => isset( $cta_details->modal ) ? (bool) $cta_details->modal : FALSE,
                'button_style' => isset( $cta_details->button_style ) ? $cta_details->button_style : '',
                'modal_class' => isset( $cta_details->modal_class ) ? $cta_details->modal_class : '',
            ];
        }
        return $data;
    }

    private function date( $force_value = self::NO_VALUE ) {
        $raw_date = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $date = [];
        if ( strlen( $raw_date ) ) {
            $date = [
                'stamp' => (int) $raw_date,
                'iso8601' => devo_utc_to_timezone( $raw_date, FALSE, 'Y-m-d' ) . 'T' . devo_utc_to_timezone( $raw_date, FALSE, 'H:i:sP' ),
                'formatted' => devo_utc_to_timezone( $raw_date, FALSE, 'F j, Y' ),
                'month' => devo_utc_to_timezone( $raw_date, FALSE, 'F' ),
                'day' => devo_utc_to_timezone( $raw_date, FALSE, 'j' ),
                'year' => devo_utc_to_timezone( $raw_date, FALSE, 'Y' ),
            ];
        }
        return $date;
    }

    private function date_time( $force_value = self::NO_VALUE ) {
        $raw_date = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $date = [];
        if ( strlen( $raw_date ) ) {
            $date = [
                'stamp' => (int) $raw_date,
                'iso8601' => devo_utc_to_timezone( $raw_date, FALSE, 'Y-m-d' ) . 'T' . devo_utc_to_timezone( $raw_date, FALSE, 'H:i:sP' ),
                'formatted' => devo_utc_to_timezone( $raw_date, FALSE, 'F j, Y g:ia' ),
                'month' => devo_utc_to_timezone( $raw_date, FALSE, 'F' ),
                'day' => devo_utc_to_timezone( $raw_date, FALSE, 'j' ),
                'year' => devo_utc_to_timezone( $raw_date, FALSE, 'Y' ),
                'time' => devo_utc_to_timezone( $raw_date, FALSE, 'g:ia' ),
            ];
        }
        return $date;
    }

    private function date_time_timezone( $force_value = self::NO_VALUE ) {
        $raw_date = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $date = is_array( $raw_date ) ? $raw_date : [];
        $timestamp = isset( $date['date_time'] ) ? (int) $date['date_time'] : 0;
        $timezone = isset( $date['timezone'] ) ? $date['timezone'] : '';
        $data = [];
        if ( strlen( $timestamp ) && strlen( $timezone ) ) {
            $data = [
                'stamp' => $timestamp,
                'iso8601' => devo_utc_to_timezone( $timestamp, $timezone, 'Y-m-d ' ) . 'T' . devo_utc_to_timezone( $timestamp, $timezone, 'H:i:sP' ),
                'formatted' => devo_utc_to_timezone( $timestamp, $timezone ),
                'month' => devo_utc_to_timezone( $timestamp, $timezone, 'F' ),
                'day' => devo_utc_to_timezone( $timestamp, $timezone, 'j' ),
                'year' => devo_utc_to_timezone( $timestamp, $timezone, 'Y' ),
                'time' => devo_utc_to_timezone( $timestamp, $timezone, 'g:ia' ),
                'timezone' => devo_utc_to_timezone( $timestamp, $timezone, 'T' ),
                'timezone_full' => $timezone
            ];
        }
        return $data;
    }

    private function gallery( $force_value = self::NO_VALUE ) {
        $raw_gallery = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $gallery = is_array( $raw_gallery ) ? $raw_gallery : [];
        $data = [];
        foreach ( $gallery as $media_elements ) {
            $media_title = isset( $media_elements->title ) && strlen( $media_elements->title ) ? $media_elements->title : '';
            $media_file = isset( $media_elements->media ) && strlen( $media_elements->media ) ? $media_elements->media : '';
            $image_api_field = $this->media( $media_file );
            $data[] = [
                'title' => $media_title,
                'media' => $image_api_field,
            ];
        }
        return $data;
    }

    private function html( $force_value = self::NO_VALUE ) {
        // Same formatting as wp_editor
        return $this->wp_editor( $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta_string( $this->post_id, $this->field_key ) );
    }

    private function icon( $force_value = self::NO_VALUE ) {
        return $this->media( $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key ) );
    }

    private function image_link( $force_value = self::NO_VALUE ) {
        $value = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        // Same formatting as wp_editor
        return $this->multi( $value );
    }

    // Provide all thumbnails
    private function media( $force_value = self::NO_VALUE ) {
        $media = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $data = [];
        // Get all the thumbnails
        if ( $media ) {
            $media_type = devo_media_type( $media );
            $image_sizes = get_intermediate_image_sizes();
            $data[ 'type' ] = $media_type;
            switch ( $media_type ) {
                case 'image':
                    $image_id = devo_get_media_by_url( $media, 'full', 'id' );
                    $is_icon = $image_id ? (bool) devo_get_post_meta( $image_id, 'icon' ) : FALSE;
                    // If it's an icon
                    if ( $is_icon ) {
                        $data[ 'type' ] = 'icon';
                        $data[ 'url' ]  = $media;
                        $data[ 'alt' ]  = devo_get_post_meta( $image_id, 'icon_label' );
                    }
                    // If it's not an icon
                    else {
                        // If the image is not an svg
                        if ( strpos( $media, '.svg' ) === FALSE ) {
                            // Loop though the image sizes
                            foreach ( $image_sizes as $size ) {
                                // If the image is in the database, get and use it's details
                                if ( $image_id ) {
                                    $image_details = wp_get_attachment_image_src( $image_id, $size );
                                    if ( $image_details ) {
                                        $data[ $size ] = [
                                            'url' => isset( $image_details[0] ) ? $image_details[0] : '',
                                            'width' => isset( $image_details[1] ) ? $image_details[1] : '',
                                            'height' => isset( $image_details[2] ) ? $image_details[2] : '',
                                        ];
                                    }
                                } 
                                // If the image is not in the database, just add the url to all sizes
                                else {
                                    $data[ $size ] = [
                                        'url' => $media,
                                        'width' => '',
                                        'height' => '',
                                    ];
                                }
                            }
                            // Add full
                            $image_details = wp_get_attachment_image_src( $image_id, 'full' );
                            $data[ 'full' ] = [
                                'url' => isset( $image_details[0] ) ? $image_details[0] : '',
                                'width' => isset( $image_details[1] ) ? $image_details[1] : '',
                                'height' => isset( $image_details[2] ) ? $image_details[2] : '',
                            ];
                        }
                        // If the Image is an svg
                        else {
                            $svg_dimensions = devo_svg_dimensions( $media );
                            // Loop though the image sizes
                            foreach ( $image_sizes as $size ) {
                                $data[ $size ] = [
                                    'url' => $media,
                                    'width' => $svg_dimensions && isset( $svg_dimensions['width'] ) ? $svg_dimensions['width'] : '',
                                    'height' => $svg_dimensions && isset( $svg_dimensions['height'] ) ? $svg_dimensions['height'] : '',
                                ];
                            }
                            // Add full
                            $data[ 'full' ] = [
                                'url' => $media,
                                'width' => $svg_dimensions && isset( $svg_dimensions['width'] ) ? $svg_dimensions['width'] : '',
                                'height' => $svg_dimensions && isset( $svg_dimensions['height'] ) ? $svg_dimensions['height'] : '',
                            ];
                        }
                    }
                    break;
                case 'pdf':
                case 'url':
                case 'video':
                    $data[ 'url' ] = $media;
                    break;
            }
        }
        return $data;
    }

    private function multi( $force_value = self::NO_VALUE ) {
        $raw_multi_field = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $multi_array_field = $this->multi_array( [ $raw_multi_field ] );
        return current( $multi_array_field );
    }
    
    private function multi_array( $force_value = self::NO_VALUE, $multi_field_fields_raw = FALSE ) {
        $raw_multi_array_field = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $multi_array_field = is_array( $raw_multi_array_field ) ? $raw_multi_array_field : [];
        $meta_fields = $this->post_type_details->meta_fields;
        $meta_prefix = $this->post_type_details->meta_prefix;
        if ( $multi_field_fields_raw ) {
            $multi_field_fields = [];
            foreach ( $multi_field_fields_raw as $field_label => $field_type ) {
                $multi_field_fields[ devo_field_key( $field_label ) ] = $field_type;
            }
        }
        else {
            $multi_field_fields = [];
            foreach ( $meta_fields as $field_key => $field_details ) {
                $field_type = devo_get_meta_field_type( $field_details );
                if ( $this->field_key === $field_key ) {
                    if ( isset( $field_details['fields'] ) ) {
                        foreach( $field_details['fields'] as $field_label => $field_type ) {
                            $multi_field_fields[ devo_field_key( $field_label ) ] = $field_type;
                        }
                    }
                }
            }
        }
        $data = [];
        foreach ( $multi_array_field as $key => $multi_field ) {
            if ( is_object( $multi_field ) && count( (array) $multi_field ) ) {
                foreach ( $multi_field as $field_key => $field_value ) {
                    $field_type = isset( $multi_field_fields[ $field_key ] ) ? devo_get_meta_field_type( $multi_field_fields[ $field_key ] ) : 'text';
                    $field_endpoint = $this->force_field( $field_type, $field_value, ( $field_type === 'multi_array' ? $multi_field_fields[ $field_key ]['fields'] : FALSE ) );
                    $data[ $key ][ $field_key ] = $field_endpoint;
                }
            }
        }
        return $data;
    }

    private function per_row( $force_value = self::NO_VALUE ) {
        return strlen( $per_row = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key ) ) ? (int) $per_row : '';
    }

    private function post_browser( $force_value = self::NO_VALUE ) {
        $raw_post_ids = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $post_ids = $raw_post_ids && is_array( $raw_post_ids ) ? $raw_post_ids : [];
        $data = [];
        $limit = isset( $this->post_type_details->meta_fields[ $this->field_key ]['settings']['limit'] ) ? $this->post_type_details->meta_fields[ $this->field_key ]['settings']['limit'] : FALSE;
        // Get all the data for all the posts
        foreach ( $post_ids as $post_id ) {
            // IDs only: get_post( 0 ) would fall back to the global post
            if ( is_scalar( $post_id ) && ctype_digit( (string) $post_id ) && (int) $post_id > 0 ) {
                // Only posts a visitor could see, in the /wp/v2/ shape. A raw
                // WP_Post would carry post_password and unpublished content.
                $prepared_post = devo_rest_prepare_post( (int) $post_id );
                if ( $prepared_post ) {
                    $data[] = $prepared_post;
                }
            }
        }
        if ( $limit === 1 ) {
            $data = current( $data );
        }
        return $data;
    }

    private function stats( $force_value = self::NO_VALUE ) {
        $raw_stats = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $stats = is_array( $raw_stats ) ? $raw_stats : [];
        $data = [];
        foreach ( $stats as $stat_elements ) {
            $stat_icon = isset( $stat_elements->icon ) && strlen( $stat_elements->icon ) ? $stat_elements->icon : '';
            $image_api_field = $this->media( $stat_icon );
            $stat_before_number = isset( $stat_elements->before_number ) && strlen( $stat_elements->before_number ) ? $stat_elements->before_number : '';
            $stat_number = isset( $stat_elements->number ) && strlen( $stat_elements->number ) ? $stat_elements->number : '';
            $stat_after_number = isset( $stat_elements->after_number ) && strlen( $stat_elements->after_number ) ? $stat_elements->after_number : '';
            $stat_title = isset( $stat_elements->title ) && strlen( $stat_elements->title ) ? $stat_elements->title : '';
            $stat_description = isset( $stat_elements->description ) && strlen( $stat_elements->description ) ? $stat_elements->description : '';
            $stat_count_down = isset( $stat_elements->count_down ) && strlen( $stat_elements->count_down ) ? (bool) $stat_elements->count_down : FALSE;
            $stat_decimal = $stat_number && strpos( $stat_number, '.' ) !== FALSE;
            $stat_number = $stat_decimal ? (float) $stat_number : (int) $stat_number;
            $data[] = [
                'before_number' => $stat_before_number,
                'number' => $stat_number,
                'after_number' => $stat_after_number,
                'description' => devo_autop( $stat_description ),
                'count_down' => $stat_count_down,
                'decimal' => $stat_decimal,
            ];
        }
        return $data;
    }

    // Free text, read as stored: "2.10" or "[1]" typed into a text field
    // stays that string (see devo_get_post_meta()).
    // A sub-field's value (inside a multi) passes through as before.
    private function text( $force_value = self::NO_VALUE ) {
        if ( $force_value !== self::NO_VALUE ) {
            return $force_value;
        }
        return do_shortcode( devo_get_post_meta_string( $this->post_id, $this->field_key ) );
    }

    private function textarea( $force_value = self::NO_VALUE ) {
        // Same formatting as wp_editor
        return $this->wp_editor( $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta_string( $this->post_id, $this->field_key ) );
    }

    private function videos( $force_value = self::NO_VALUE ) {
        $raw_videos = $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta( $this->post_id, $this->field_key );
        $videos = is_array( $raw_videos ) ? $raw_videos : [];
        $data = [];
        foreach ( $videos as $video_elements ) {
            $data[] = [
                'title' => isset( $video_elements->title ) && strlen( $video_elements->title ) ? $video_elements->title : '',
                'copy' => isset( $video_elements->copy ) && strlen( $video_elements->copy ) ? do_shortcode( $video_elements->copy ) : '',
                'url' => isset( $video_elements->url ) && strlen( $video_elements->url ) ? $video_elements->url : '',
            ];
        }
        return $data;
    }

    private function wp_editor( $force_value = self::NO_VALUE ) {
        // Wrap in devo_autop
        return devo_autop( $force_value !== self::NO_VALUE ? $force_value : devo_get_post_meta_string( $this->post_id, $this->field_key ) );
    }

    // The admin editor runs with wpautop on, which strips <p> tags on save, so
    // REST output needs autop just as wp_editor's does. (It used to fall
    // through to the raw value and lost its paragraphs.)
    private function wp_editor_limited( $force_value = self::NO_VALUE ) {
        return $this->wp_editor( $force_value );
    }

    /*
     * HELPERS
     */

    private function force_field( $type, $force_value, $multi_fields = FALSE ) {
        // Find the custom method for the data type
        if ( $type && method_exists( $this, $type ) ) {
            if ( $multi_fields ) {
                return $this->{ $type }( $force_value, $multi_fields );
            } else {
                return $this->{ $type }( $force_value );
            }
        } 
        // or just return the value
        else {
            return $force_value;
        }
    }
}

