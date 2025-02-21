<?php

class DO_Form_Field_API_Display {
    private $field_key;
    public $output;
    private $post_id;
    private $post_type_details;
    function __construct( $type, $field_key, $post_id, $post_type_details, $force_value = FALSE ) {
        $this->field_key = $field_key;
        $this->post_id = $post_id;
        $this->post_type_details = $post_type_details;
        // Find the custom method for the data type
        if ( $type && method_exists( $this, $type ) ) {
            $this->output = $this->{ $type }( $force_value );
        } 
        // or just return the field
        else {
            $this->output = do_get_post_meta( $this->post_id, $this->field_key );
        }
    }

    private function address( $force_value = FALSE ) {
        $raw_address = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
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

    // Build out background object
    private function background( $force_value = FALSE ) {
        $raw_background = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $background = is_object( $raw_background ) ? $raw_background : new stdClass();
        //do_var_dump($raw_background);
        $data = [];
        if ( count( (array) $background ) ) {
            $data = [
                'media' => isset( $background->media ) ? $this->media( $background->media ) : [],
                'overlay' => isset( $background->overlay ) ? $background->overlay : '',
                'color' => isset( $background->color ) ? $background->color : '',
                'parallax' => isset( $background->parallax ) ? $background->parallax : '',
                'loop' => isset( $background->loop ) ? (bool) $background->loop : FALSE,
                'videoTranscript' => isset( $background->videoTranscript ) ? $background->videoTranscript : '',
                'avatar' => isset( $background->avatar ) ? (bool) $background->avatar : FALSE,
            ];
        }
        return $data;
    }
    private function background_hero( $force_value = FALSE ) {
        return $this->background( $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key ) );
    }

    private function binary( $force_value = FALSE ) {
        return $force_value !== FALSE ? (bool) $force_value : (bool) do_get_post_meta( $this->post_id, $this->field_key );
    }
    
    private function binary_select( $force_value = FALSE ) {
        return $this->binary( $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key ) );
    }

    

    // private function company_logo_browser( $force_value = FALSE ) {
    //     $data = $this->post_browser( $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key ) );
    //     foreach ( $data as $post ) {
    //         $related_posts_ids = get_posts( [
    //             'post_type' => [ 'do_customer_story', 'do_press_release', 'do_announcement' ],
    //             'fields' => 'ids',
    //             'meta_query' => [
    //                 [
    //                     'key' => 'client',
    //                     'value' => get_post_field( 'post_name', $post->ID ),
    //                 ],
    //             ],
    //         ] );
    //         $related_posts = [];
    //         foreach ( $related_posts_ids as $related_post_id ) {
    //             $related_posts[ get_post_field( 'post_type', $related_post_id ) ] = get_permalink( $related_post_id );
    //         }
    //         $client_link = '';
    //         // Set client link
    //         // First choice is a Customer Story
    //         if ( isset( $related_posts['do_customer_story'] ) ) {
    //             $client_link = $related_posts['do_customer_story'];
    //         }
    //         // Runner up is a Press Release
    //         elseif ( isset( $related_posts['do_press_release'] ) ) {
    //             $client_link = $related_posts['do_press_release'];
    //         }
    //         // If nothing else, Announcement will do
    //         elseif ( isset( $related_posts['do_announcement'] ) ) {
    //             $client_link = $related_posts['do_announcement'];
    //         }
    //         $post->client_link = $client_link;
    //     }
    //     return $data;
    // }

    private function date( $force_value = FALSE ) {
        $raw_date = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $date = [];
        if ( strlen( $raw_date ) ) {
            $date = [
                'stamp' => (int) $raw_date,
                'iso8601' => do_utc_to_timezone( $raw_date, FALSE, 'Y-m-d' ) . 'T' . do_utc_to_timezone( $raw_date, FALSE, 'H:i:sP' ),
                'formatted' => do_utc_to_timezone( $raw_date, FALSE, 'F j, Y' ),
                'month' => do_utc_to_timezone( $raw_date, FALSE, 'F' ),
                'day' => do_utc_to_timezone( $raw_date, FALSE, 'j' ),
                'year' => do_utc_to_timezone( $raw_date, FALSE, 'Y' ),
            ];
        }
        return $date;
    }

    private function date_time( $force_value = FALSE ) {
        $raw_date = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $date = [];
        if ( strlen( $raw_date ) ) {
            $date = [
                'stamp' => (int) $raw_date,
                'iso8601' => do_utc_to_timezone( $raw_date, FALSE, 'Y-m-d' ) . 'T' . do_utc_to_timezone( $raw_date, FALSE, 'H:i:sP' ),
                'formatted' => do_utc_to_timezone( $raw_date, FALSE, 'F j, Y g:ia' ),
                'month' => do_utc_to_timezone( $raw_date, FALSE, 'F' ),
                'day' => do_utc_to_timezone( $raw_date, FALSE, 'j' ),
                'year' => do_utc_to_timezone( $raw_date, FALSE, 'Y' ),
                'time' => do_utc_to_timezone( $raw_date, FALSE, 'g:ia' ),
            ];
        }
        return $date;
    }

    private function date_time_timezone( $force_value = FALSE ) {
        $raw_date = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $date = is_array( $raw_date ) ? $raw_date : [];
        $timestamp = isset( $date['date_time'] ) ? (int) $date['date_time'] : 0;
        $timezone = isset( $date['timezone'] ) ? $date['timezone'] : '';
        $data = [];
        if ( strlen( $timestamp ) && strlen( $timezone ) ) {
            $data = [
                'stamp' => $timestamp,
                'iso8601' => do_utc_to_timezone( $timestamp, $timezone, 'Y-m-d ' ) . 'T' . do_utc_to_timezone( $timestamp, $timezone, 'H:i:sP' ),
                'formatted' => do_utc_to_timezone( $timestamp, $timezone ),
                'month' => do_utc_to_timezone( $timestamp, $timezone, 'F' ),
                'day' => do_utc_to_timezone( $timestamp, $timezone, 'j' ),
                'year' => do_utc_to_timezone( $timestamp, $timezone, 'Y' ),
                'time' => do_utc_to_timezone( $timestamp, $timezone, 'g:ia' ),
                'timezone' => do_utc_to_timezone( $timestamp, $timezone, 'T' ),
                'timezone_full' => $timezone
            ];
        }
        return $data;
    }

    private function gallery( $force_value = FALSE ) {
        $raw_gallery = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $gallery = is_array( $raw_gallery ) ? $raw_gallery : [];
        $data = [];
        foreach ( $gallery as $media_elements ) {
            $media_title = isset( $media_elements['title'] ) && strlen( $media_elements['title'] ) ? $media_elements['title'] : '';
            $media_file = isset( $media_elements['media'] ) && strlen( $media_elements['media'] ) ? $media_elements['media'] : '';
            $media_url = isset( $media_elements['url'] ) && strlen( $media_elements['url'] ) ? $media_elements['url'] : '';
            $media_cta_modal = isset( $media_elements['modal'] ) && strlen( $media_elements['modal'] ) ? (bool) $media_elements['modal'] : FALSE;
            $media_cta_modal_class = isset( $media_elements['modal_class'] ) && strlen( $media_elements['modal_class'] ) ? $media_elements['modal_class'] : '';
            $media_video_loop = isset( $media_elements['video_loop'] ) && strlen( $media_elements['video_loop'] ) ? (bool) $media_elements['video_loop'] : FALSE;
            $media_type = do_media_type( $media_file );
            $image_api_field = $this->media( $media_file );
            $data[] = [
                'title' => $media_title,
                'media' => $image_api_field,
                'url' => $media_url,
                'modal' => $media_cta_modal,
                'modal_class' => $media_cta_modal_class,
                'video_loop' => $media_video_loop,
            ];
        } 
        return $data;
    }

    private function html( $force_value = FALSE ) {
        // Same formatting as wp_editor
        return $this->wp_editor( $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key ) );
    }

    private function form_embed_code( $force_value = FALSE ) {
        return stripslashes( $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key ) );
    }

    private function image_link( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        // Same formatting as wp_editor
        return $this->multi( $value );
    }

    private function linear_content( $force_value = FALSE ) {
        $raw_linear_content_items = $force_value ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $linear_content_items = is_array( $raw_linear_content_items ) ? $raw_linear_content_items : [];
        $data = [];
        foreach ( $linear_content_items as $content_block_elements ) {
            $content_block_title = isset( $content_block_elements['title'] ) && strlen( $content_block_elements['title'] ) ? $content_block_elements['title'] : '';
            $content_block_title_icon = isset( $content_block_elements['title_icon'] ) && strlen( $content_block_elements['title_icon'] ) ? $content_block_elements['title_icon'] : '';
            $content_block_heading = isset( $content_block_elements['heading'] ) && strlen( $content_block_elements['heading'] ) ? $content_block_elements['heading'] : '';
            $content_block_content = isset( $content_block_elements['content'] ) && strlen( $content_block_elements['content'] ) ? $content_block_elements['content'] : '';
            $content_block_media = isset( $content_block_elements['media'] ) ? $content_block_elements['media'] : '';
            $content_block_cta_text = isset( $content_block_elements['cta_text'] ) && strlen( $content_block_elements['cta_text'] ) ? $content_block_elements['cta_text'] : '';
            $content_block_cta_url = isset( $content_block_elements['cta_url'] ) && strlen( $content_block_elements['cta_url'] ) ? $content_block_elements['cta_url'] : '';
            $image_api_field = $this->media( $content_block_media );
            $data[] = [
                'title' => $content_block_title,
                'title_icon' => $content_block_title_icon,
                'heading' => $content_block_heading,
                'content' => do_autop( $content_block_content ),
                'media' => $image_api_field,
                'cta_text' => $content_block_cta_text,
                'cta_url' => $content_block_cta_url,
            ];
        }
        return $data;
    }
    
    // Provide all thumbnails
    private function media( $force_value = FALSE ) {
        $media = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $data = [];
        // Get all the thumbnails
        if ( $media ) {
            $media_type = do_media_type( $media );
            $image_sizes = get_intermediate_image_sizes();
            $data[ 'type' ] = $media_type;
            switch ( $media_type ) {
                case 'image':
                    $image_id = do_get_media_by_url( $media, 'full', 'id' );
                    $is_icon = $image_id ? (bool) do_get_post_meta( $image_id, 'icon' ) : FALSE;
                    // If it's an icon
                    if ( $is_icon ) {
                        $data[ 'type' ] = 'icon';
                        $icon_label = do_get_post_meta( $image_id, 'icon_label' );
                        // Get all icons with the same label
                        $all_icons = get_posts( [
                            'post_type' => 'attachment',
                            //'fields' => 'ids',
                            'nopaging' => TRUE,
                            'meta_key' => 'icon_label',
                            'meta_value' => $icon_label,
                        ] );
                        foreach ( $all_icons as $post ) {
                            $color = do_get_post_meta( $post->ID, 'icon_color' );
                            $data[ $color ]['url'] = $post->guid;
                            $data[ $color ]['width'] = '50';
                            $data[ $color ]['height'] = '50';
                        }
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
                            $svg_dimensions = do_svg_dimensions( $media );
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

    private function multi( $force_value = FALSE ) {
        $raw_multi_field = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $multi_array_field = $this->multi_array( [ $raw_multi_field ] );
        return current( $multi_array_field );
    }
    
    private function multi_array( $force_value = FALSE, $multi_field_fields_raw = FALSE ) {
        $raw_multi_array_field = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $multi_array_field = is_array( $raw_multi_array_field ) ? $raw_multi_array_field : [];
        $meta_fields = $this->post_type_details->meta_fields;
        $meta_prefix = $this->post_type_details->meta_prefix;
        if ( $multi_field_fields_raw ) {
            $multi_field_fields = [];
            foreach ( $multi_field_fields_raw as $field_label => $field_type ) {
                $multi_field_fields[ do_field_key( $field_label ) ] = $field_type;
            }
        }
        else {
            $multi_field_fields = [];
            foreach ( $meta_fields as $field_key => $field_details ) {
                $field_type = do_get_meta_field_type( $field_details );
                if ( $this->field_key === $field_key ) {
                    if ( isset( $field_details['fields'] ) ) {
                        foreach( $field_details['fields'] as $field_label => $field_type ) {
                            $multi_field_fields[ do_field_key( $field_label ) ] = $field_type;
                        }
                    }
                }
            }
        }
        $data = [];
        foreach ( $multi_array_field as $key => $multi_field ) {
            if ( is_object( $multi_field ) && count( (array) $multi_field ) ) {
                foreach ( $multi_field as $field_key => $field_value ) {
                    $field_type = isset( $multi_field_fields[ $field_key ] ) ? do_get_meta_field_type( $multi_field_fields[ $field_key ] ) : 'text';
                    $field_endpoint = $this->force_field( $field_type, $field_value, ( $field_type === 'multi_array' ? $multi_field_fields[ $field_key ]['fields'] : FALSE ) );
                    $data[ $key ][ $field_key ] = $field_endpoint;
                }
            }
        }
        return $data;
    }

    private function per_row( $force_value = FALSE ) {
        return strlen( $per_row = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key ) ) ? (int) $per_row : '';
    }

    private function post_browser( $force_value = FALSE ) {
        $raw_post_ids = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $post_ids = $raw_post_ids && is_array( $raw_post_ids ) ? $raw_post_ids : [];
        $data = [];
        $limit = isset( $this->post_type_details->meta_fields[ $this->field_key ]['settings']['limit'] ) ? $this->post_type_details->meta_fields[ $this->field_key ]['settings']['limit'] : FALSE;
        // Get all the data for all the posts
        foreach ( $post_ids as $post_id ) {
            if ( strlen( $post_id ) ) {
                $post = get_post( $post_id );
                $data[] = do_api_custom_data( $post );
            }
        }
        if ( $limit === 1 ) {
            $data = current( $data );
        }
        return $data;
    }

    private function promo( $force_value = FALSE ) {
        $raw_promo = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $promo = is_array( $raw_promo ) ? $raw_promo : [];
        $data = [];
        if ( count( $promo ) ) {
            $item_media = isset( $promo->media ) ? $promo->media : [];
            $image_api_field = $this->media( $item_media );
            $data = [
                'media' => $image_api_field,
                'title' => isset( $promo->title ) ? $promo->title : '',
                'cta_url' => isset( $promo->cta_url ) ? $promo->cta_url : '',
                'cta_modal' => isset( $promo->cta_modal ) ? (bool) $promo->cta_modal : FALSE,
            ];
        };
        return $data;
    }

    private function promos( $force_value ) {
        $raw_promos = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $promos = is_array( $raw_promos ) ? $raw_promos : [];
        $data = [];
        foreach ( $promos as $item_elements ) {
            $item_media = isset( $item_elements['media'] ) && strlen( $item_elements['media'] ) ? $item_elements['media'] : '';
            $item_media_type = do_media_type( $item_media );
            $image_api_field = $this->media( $item_media );
            $item_title = isset( $item_elements['title'] ) && strlen( $item_elements['title'] ) ? $item_elements['title'] : '';
            $item_cta_url = isset( $item_elements['cta_url'] ) && strlen( $item_elements['cta_url'] ) ? $item_elements['cta_url'] : '';
            $item_cta_modal = isset( $item_elements['cta_modal'] ) ? (bool) $item_elements['cta_modal'] : FALSE;
            $data[] = [
                'media' => $image_api_field,
                'title' => $item_title,
                'cta_url' => $item_cta_url,
                'cta_modal' => $item_cta_modal, 
            ];
        }
        return $data;
    }

    private function staff_bios( $force_value = FALSE ) {
        return $this->post_browser( $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key ) );
    }

    private function stats( $force_value = FALSE ) {
        $raw_stats = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
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
                'icon' => $image_api_field,
                'before_number' => $stat_before_number,
                'number' => $stat_number,
                'after_number' => $stat_after_number,
                'title' => $stat_title,
                'description' => do_autop( $stat_description ),
                'count_down' => $stat_count_down,
                'decimal' => $stat_decimal,
            ];
        }
        return $data;
    }

    // private function tabs( $force_value = FALSE ) {
    //     $raw_tabs = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
    //     $tabs = is_array( $raw_tabs ) ? $raw_tabs : [];
    //     $data = [];
    //     foreach ( $tabs as $tab_elements ) {
    //         $tab_label = isset( $tab_elements['nav_label'] ) && strlen( $tab_elements['nav_label'] ) ? $tab_elements['nav_label'] : '';
    //         $tab_label_icon = isset( $tab_elements['nav_label_icon'] ) && strlen( $tab_elements['nav_label_icon'] ) ? $tab_elements['nav_label_icon'] : '';
    //         $tab_id = isset( $tab_elements['id'] ) && strlen( $tab_elements['id'] ) ? sanitize_title_with_dashes( $tab_elements['id'] ) : sanitize_title_with_dashes( $tab_label );
    //         $tab_title = isset( $tab_elements['title'] ) && strlen( $tab_elements['title'] ) ? $tab_elements['title'] : '';
    //         $tab_copy = isset( $tab_elements['copy'] ) && strlen( $tab_elements['copy'] ) ? $tab_elements['copy'] : '';
    //         $tab_media = isset( $tab_elements['media'] ) && strlen( $tab_elements['media'] ) ? $tab_elements['media'] : '';
    //         $tab_cta_text = isset( $tab_elements['cta_text'] ) && strlen( $tab_elements['cta_text'] ) ? $tab_elements['cta_text'] : '';
    //         $tab_cta_url = isset( $tab_elements['cta_url'] ) && strlen( $tab_elements['cta_url'] ) ? $tab_elements['cta_url'] : '';
    //         $tab_media_type = do_media_type( $tab_media );
    //         $image_api_field = $this->media( $tab_media );
    //         $data[] = [
    //             'nav_label' => $tab_label,
    //             'nav_label_icon' => $tab_label_icon,
    //             'id' => $tab_id,
    //             'title' => $tab_title,
    //             'copy' => do_autop( $tab_copy ),
    //             'media' => $image_api_field,
    //             'cta_text' => $tab_cta_text,
    //             'cta_url' => $tab_cta_url,
    //         ];
    //     }
    //     return $data;
    // }

    private function textarea( $force_value = FALSE ) {
        // Same formatting as wp_editor
        return $this->wp_editor( $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key ) );
    }

    private function video_nav( $force_value = FALSE ) {
        $raw_videos = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $videos = is_array( $raw_videos ) ? $raw_videos : [];
        $data = [];
        foreach ( $videos as $video_elements ) {
            $data[] = [
                'pretitle' => isset( $video_elements['pretitle'] ) && strlen( $video_elements['pretitle'] ) ? $video_elements['pretitle'] : '',
                'title' => isset( $video_elements['title'] ) && strlen( $video_elements['title'] ) ? $video_elements['title'] : '',
                'url' => isset( $video_elements['url'] ) && strlen( $video_elements['url'] ) ? $video_elements['url'] : '',
            ];
        }
        return $data;
    }

    private function videos( $force_value = FALSE ) {
        $raw_videos = $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key );
        $videos = is_array( $raw_videos ) ? $raw_videos : [];
        $data = [];
        foreach ( $videos as $video_elements ) {
            $data[] = [
                'title' => isset( $video_elements->title ) && strlen( $video_elements->title ) ? $video_elements->title : '',
                'copy' => isset( $video_elements->copy ) && strlen( $video_elements->copy ) ? $video_elements->copy : '',
                'url' => isset( $video_elements->url ) && strlen( $video_elements->url ) ? $video_elements->url : '',
            ];
        }
        return $data;
    }

    private function wp_editor( $force_value = FALSE ) {
        // Wrap in do_autop
        return do_autop( $force_value !== FALSE ? $force_value : do_get_post_meta( $this->post_id, $this->field_key ) );
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

