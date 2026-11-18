<?php
// Validates form fields based on the data type

class DO_Form_Field_Validate {
    public $raw_value;
    public $value;
    function __construct( $type, $raw_value ) {
        $this->raw_value = $raw_value;
        // If $raw_value is an array 
        if ( is_array( $raw_value ) ) {
            // make sure it isn't empty,
            $imploded = implode( '', devo_array_flatten( $raw_value ) );
            if ( strlen( $imploded ) ) {
                $this->value = $this->validate( $raw_value, $type, TRUE );
            } 
            // otherwise save as empty array.
            else {
                $this->value = json_encode( [] );
            }
        } 
        // If $raw_value is a string, 
        else {
            // make sure it has length,
            if ( strlen( $raw_value ) ) {
                $this->value = $this->validate( $raw_value, $type );
            } 
            // otherwise save as empty string.
            else {
                $this->value = '';
            }
        }
        
    }

    private function validate( $value, $type, $json_encode = FALSE ) {
        // Find the custom method for the data type
        if ( method_exists( $this, $type ) ) {
            return $json_encode ? json_encode( $this->{ $type }() ) : $this->{ $type }();
        } 
        // or just generically sanitize the field
        else {
            if ( is_array( $value ) ) {
                $sanitized_array = array_map( [ $this, 'clean_html' ], $value );
                return $json_encode ? json_encode( $sanitized_array ) : $sanitized_array;
            } else {
                return $json_encode ? json_encode( $this->clean_html( $this->raw_value ) ) : $this->clean_html( $this->raw_value );
            }
        }
    }

    private function accordion( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi_array( $value );
    }
    
    private function address( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        $address = [
            'name' => isset( $value['name'] ) ? $this->text( $value['name'] ) : '',
            'address_1' => isset( $value['address_1'] ) ? $this->varchar( $value['address_1'] ) : '',
            'address_2' => isset( $value['address_2'] ) ? $this->varchar( $value['address_2'] ) : '',
            'city' => isset( $value['city'] ) ? $this->varchar( $value['city'] ) : '',
            'state_locality' => isset( $value['state_locality'] ) ? $this->varchar( $value['state_locality'] ) : '',
            'postal_code' => isset( $value['postal_code'] ) ? $this->varchar( $value['postal_code'] ) : '',
            'country' => isset( $value['country'] ) ? $this->country( $value['country'] ) : '',
            'google_maps' => isset( $value['google_maps'] ) ? $this->google_maps_embed( $value['google_maps'] ) : '',
        ];
        return $address;
    }

    private function background( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi( $value );
    }
    
    private function background_hero( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi( $value );
    }
    
    private function binary( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return (int) preg_replace( '/[^0-1]/', '', $value );
    }
    
    private function binary_select( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->binary( $value );
    }

    // private function blocks( $force_value = FALSE ) {
    //     $value = $force_value !== FALSE ? $force_value : $this->raw_value;
    //     return $this->multi_array( $value );
    // }

    // A choice, like radio and select: plain text. Without its own method it
    // went through wp_kses_post(), which turned "&" into "&amp;", so a
    // submitted "S & M" no longer matched its option and didn't pre-fill.
    private function button_select( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function checkbox( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->basic_array_validation( $value );
    }

    private function code( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $value;
    }

    private function color( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }
    
    private function content_slider( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi_array( $value );
    }
    
    private function country( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function ctas( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        $sanitized_value = [];
        foreach ( $value as $value_piece ) {
            $value_array = [ 
                'text' => isset( $value_piece['text'] ) ? $this->text( $value_piece['text'] ) : '',
                'url' => isset( $value_piece['url'] ) ? $this->url( $value_piece['url'] ) : '',
                'modal' => isset( $value_piece['modal'] ) ? $this->binary_select( $value_piece['modal'] ) : '',
                'button_style' => isset( $value_piece['button_style'] ) ? $this->select( $value_piece['button_style'] ) : '',
                'modal_class' => isset( $value_piece['modal_class'] ) ? $this->varchar( $value_piece['modal_class'] ) : '',
            ];
            $value_check = implode( '', $value_array );
            if ( strlen( $value_check ) ) {
                $sanitized_value[] = $value_array;
            }
        }
        return $sanitized_value;
    }

    private function date( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->date_time( $value );
    }
    
    private function date_time( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return strlen( $value ) ? devo_timezone_to_utc( strtotime( $value ) ) : $value;
    }

    private function date_time_timezone( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        $raw_timezone = isset( $value['timezone'] ) && strlen( $value['timezone'] ) ? $value['timezone'] : wp_timezone_string();
        $raw_date_time = isset( $value['date_time'] ) && strlen( $value['date_time'] ) ? devo_timezone_to_utc( strtotime( $value['date_time'] ), $raw_timezone ) : FALSE;
        return [ 
            'date_time' => $raw_date_time ? $raw_date_time : '', 
            'timezone' => $raw_timezone ? $raw_timezone : '',
        ];
    }

    private function disabled( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }
    
    private function document( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }
    
    private function documents( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function dollars( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->number( $value );
    }

    private function files( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function gallery( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi_array( $value );
    }

    private function google_maps_embed( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        $value = is_string( $value ) ? trim( $value ) : '';
        // Google's embed code (<iframe src="...">) or the bare embed URL. The
        // src is read from the markup, whatever its other attributes; this
        // used to strip one exact embed snippet, with its quotes still slashed.
        if ( preg_match( '/<iframe\b[^>]*\ssrc\s*=\s*(["\'])(.*?)\1/is', $value, $matches ) ) {
            $value = html_entity_decode( trim( $matches[2] ), ENT_QUOTES );
        }
        // It's a map, or it's nothing
        return strpos( $value, 'https://www.google.com/maps/' ) === 0 ? esc_url_raw( $value ) : '';
    }

    private function hidden( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function html( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->wp_editor( $value );
    }

    private function image_link( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi( $value );
    }

    private function int( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        $value = preg_replace( '/[^0-9-]/', '', $value );
        return strlen( $value ) ? (int) $value : 0;
    }
    
    private function locations( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi_array( $value );
    }

    private function manual( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->code( $value );
    }

    private function matrix( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function media( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function icon( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function multi( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        // Determine if the value array is empty
        $value_string = is_array( $value ) ? implode( '', devo_array_flatten( $value ) ) : $value;
        // If the value array is empty, save an empty array
        $value = strlen( $value_string ) === 0 ? [] : ( is_array( $value ) ? $value : explode( ',', $value ) );
        // Sanitize each array item
        $sanitized_value = $this->basic_array_validation( $value );
        return $sanitized_value;
    }

    private function multi_array( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        if ( is_string( $value ) ) {
            $value = strlen( $value ) ? [ $value ] : [];
        }
        // Sanitize each array item
        $sanitized_value = [];
        $i = 0;
        foreach ( $value as $value_key => $value_piece ) {
            if ( is_array( $value_piece ) ) {
                // make sure it isn't empty,
                $imploded = implode( '', devo_array_flatten( $value_piece ) );
                if ( strlen( $imploded ) ) {
                    $sanitized_value[ is_int( $value_key ) ? $i : $value_key ] = $this->multi_array( $value_piece );
                } 
                // otherwise save as empty array.
                else {
                    $sanitized_value[ is_int( $value_key ) ? $i : $value_key ] = [];
                }
            } else {
                $sanitized_value[ is_int( $value_key ) ? $i : $value_key ] = $this->clean_html( $value_piece );
            }
            $i++;
        }
        return $sanitized_value;
    }

    private function mysql_column( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return devo_mysql_column_name( $value );
    }

    private function number( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return preg_replace( '/[^0-9\.\-;]/', '', $value );
    }

    private function post_browser( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        foreach ( $value as $post_id ) {
            if ( strlen( $post_id ) ) {
                $post_id = $this->int( $post_id );
            }
        }
        return $value;
    }
    
    private function radio( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function read_only( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->code( $value );
    }
    private function scale( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->int( $value );
    }

    private function select( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function select_multiple( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->checkbox( $value );
    }

    private function sort( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->int( $value );
    }

    private function state( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function stats( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi_array( $value );
    }
    
    private function tabs( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi_array( $value );
    }

    private function text( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->wp_editor( $value );
    }
    
    private function textarea( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return wp_strip_all_tags( $value );
    }

    private function timestamp( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->year( $value );
    }
    
    // Sends one of two option values; plain text like button_select
    private function toggle( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->varchar( $value );
    }

    private function url( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        // Remove root url
        $root_url = home_url();
        if ( $value != '/' && trim( $value, '/' ) !== home_url() ) {
            $value = str_replace( $root_url, '', trim( $value, '/' ) );
        } else {
            return '/';
        }
        // External url
        if ( strlen( $value ) && strpos( 'http', $value ) !== FALSE ) {
            return esc_url_raw( $value );
        }
        // Internal url
        else {
            // Anchor
            if ( strlen( $value ) && strpos( $value, '#' ) === 0 ) {
                return sanitize_text_field( $value );
            }
            // Relative url
            else {
                return $value == '/' ? $value : sanitize_text_field( trim( $value, '/' ) );
            }
        }
    }
    
    private function varchar( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return sanitize_text_field( $value );
    }

    private function videos( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi_array( $value );
    }
    
    private function video_nav( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->multi_array( $value );
    }

    private function wp_editor( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->clean_html( $value );
    }

    private function year( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return preg_replace( '/[^0-9]/', '', $value );
    }
    
    private function year_select( $force_value = FALSE ) {
        $value = $force_value !== FALSE ? $force_value : $this->raw_value;
        return $this->year( $value );
    }

    

    /*
     * HELPERS
     */

    private function basic_array_validation( $array ) {
        if ( ! is_array( $array ) ) {
            return $this->clean_html( $array );
        }
        $clean_array = [];
        foreach ( $array as $key => $value ) {
            if ( is_array( $value ) ) {
                return $this->basic_array_validation( $value );
            } else {
                $clean_array[ $key ] = $this->clean_html( $value );
            }
        }
        return $clean_array;
    }

    private function clean_keys( $array ) {
        $clean_array = [];
        if ( ! is_array( $array ) ) {
            return $array;
        } else {
            $i = 0;
            foreach( $array as $key => $value ) {
                $clean_array[ $i ] = $this->clean_keys( $value );
                $i++;
            }
        }
        return $clean_array;
    }

    private function force_field( $type, $force_value ) {
        // Find the custom method for the data type
        if ( method_exists( $this, $type ) ) {
            return $this->{ $type }( $force_value );
        } 
        // or just return the value
        else {
            return $force_value;
        }
    }

    /* Filters HTML down to what post content allows.
     *
     * This used to run html_entity_decode() over the result, which undid kses:
     * an escaped "&lt;script&gt;" came back out as a live <script>. The decode
     * was there because kses normalises a bare "&" to "&amp;", which then
     * showed up literally wherever a value is used as plain text. That is now
     * handled where values are turned into text (devo_plain_text()); stored
     * HTML keeps its entities, which every HTML consumer renders correctly.
     * Values saved before this change are already decoded and still render. */
    private function clean_html( $string ) {
        return wp_kses_post( is_scalar( $string ) ? (string) $string : '' );
    }
}
