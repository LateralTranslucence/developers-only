<?php

class DO_Search {
    private $search_query;

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'rest_route' ] );
    }

    public function rest_api_endpoint( $data ) {
        $output = [];
        $query_params = $data->get_params();
        // The panel's settings are read from the post that holds it, so it has
        // to be a post a visitor could see.
        $post_id = isset( $query_params['postID'] ) && is_scalar( $query_params['postID'] ) ? absint( $query_params['postID'] ) : 0;
        if ( ! $post_id || ! is_post_publicly_viewable( $post_id ) ) {
            return new WP_Error( 'devo_not_found', __( 'No search panel found.', 'developers_only' ), [ 'status' => 404 ] );
        }
        $meta_prefix = isset( $query_params['metaPrefix'] ) && is_string( $query_params['metaPrefix'] ) ? sanitize_key( $query_params['metaPrefix'] ) : '';
        $meta_suffix = isset( $query_params['metaSuffix'] ) && is_string( $query_params['metaSuffix'] ) ? preg_replace( '/[^a-z0-9_]/', '', strtolower( $query_params['metaSuffix'] ) ) : '';
        $fields = devo_get_post_meta( $post_id, $meta_prefix . '_search_fields' . $meta_suffix );
        $field_settings = $this->organize_field_settings( is_array( $fields ) ? $fields : [] );
        $settings = [
            'query_params'   => $query_params,
            'post_id'        => $post_id,
            'meta_prefix'    => $meta_prefix,
            'meta_suffix'    => $meta_suffix,
            'field_settings' => $field_settings,
        ];
        $this->query( $output, $settings );
        $this->ui( $output, $settings );

        return $output;
    }

    public function rest_route() {
        register_rest_route( 'wp/v2', '/devo-search', [
            'methods'             => 'GET',
            'callback'            => [ $this, 'rest_api_endpoint' ],
            'permission_callback' => '__return_true',
        ] );
    }

    private function query( &$output, $settings = [] ) {
        $query_params   = $settings['query_params'];
        $post_id        = $settings['post_id'];
        $meta_prefix    = $settings['meta_prefix'];
        $meta_suffix    = $settings['meta_suffix'];
        $field_settings = $settings['field_settings'];
        // Filters the panel actually offers. Only these become query criteria,
        // so a request can't turn arbitrary meta keys into meta queries.
        $filter_params = [];
        foreach ( $field_settings as $field_name => $field_setting ) {
            $filter_params[ $field_name ] = $field_setting['meta_key'] ? $field_setting['meta_key'] : $field_name;
            if ( $field_setting['meta_key'] ) {
                $filter_params[ $field_setting['meta_key'] ] = $field_setting['meta_key'];
            }
        }
        // Current query settings
        $current_query = [];
        foreach ( $query_params as $param_key => $param_value ) {
            // Not these param keys - we'll deal with them specifically later
            if ( in_array( $param_key, [ 'posts_per_page', 'paged', 's', 'sort', 'postID', 'metaPrefix', 'metaSuffix', 'post_type' ], TRUE ) || ! isset( $filter_params[ $param_key ] ) || ! is_string( $param_value ) ) {
                continue;
            }
            $current_query[ $filter_params[ $param_key ] ] = strlen( $param_value ) ? explode( ',', $param_value ) : [];
        }
        // Post types: the panel's own list, which a request can only narrow
        $post_types_field = devo_get_post_meta( $post_id, $meta_prefix . '_search_post_types' . $meta_suffix );
        $post_type = devo_filter_public_post_types( is_array( $post_types_field ) ? $post_types_field : ( is_string( $post_types_field ) && strlen( $post_types_field ) ? [ $post_types_field ] : [] ) );
        if ( ! count( $post_type ) ) {
            $post_type = devo_get_public_post_types( 'indexed_array' );
        }
        if ( isset( $query_params['post_type'] ) && is_string( $query_params['post_type'] ) && strlen( $query_params['post_type'] ) && $query_params['post_type'] !== 'all' ) {
            $requested_post_types = array_values( array_intersect( devo_filter_public_post_types( $query_params['post_type'] ), $post_type ) );
            if ( count( $requested_post_types ) ) {
                $current_query['post_type'] = $requested_post_types;
            }
        }
        $query_per_page = devo_get_post_meta( $post_id, $meta_prefix . '_posts_per_page' . $meta_suffix );
        $current_query['posts_per_page'] = devo_clamp_posts_per_page( is_scalar( $query_per_page ) && strlen( (string) $query_per_page ) ? $query_per_page : 16, 16 );
        $current_query['paged']          = isset( $query_params['paged'] ) && is_scalar( $query_params['paged'] ) ? max( 1, absint( $query_params['paged'] ) ) : 1;
        $current_query['s']              = isset( $query_params['s'] ) && is_string( $query_params['s'] ) ? sanitize_text_field( $query_params['s'] ) : '';
        if ( isset( $query_params['sort'] ) && is_string( $query_params['sort'] ) ) {
            $current_query['sort'] = $query_params['sort'];
        } elseif ( count( $sort = (array) devo_get_post_meta( $post_id, $meta_prefix . '_custom_sort_by' . $meta_suffix ) ) && isset( $sort[0] ) ) {
            $current_query['sort'] = is_object( $sort[0] ) ? $sort[0]->value : $sort[0]['value'];
        } else {
            $current_query['sort'] = 'date_desc';
        }
        // Perform the search. post_type is always set, so WP_Query never
        // falls back to 'any' (which includes every searchable type).
        $search_query_args = [
            'query'         => $current_query,
            'default_query' => [
                'post_type' => $post_type,
            ],
        ];
        $this->search_query = new DO_Search_Query( $search_query_args );

        // Update $output
        $output['posts']        = $this->search_query->posts;
        $output['found_posts']  = $this->search_query->found_posts;
        $output['pages']        = $this->search_query->pages;
        $output['current_page'] = $this->search_query->current_page;
    }

    private function ui( &$output, $settings = [] ) {
        $query_params = $settings['query_params'];
        $post_id      = $settings['post_id'];
        $meta_prefix  = $settings['meta_prefix'];
        $meta_suffix  = $settings['meta_suffix'];

        // Relevant query settings
        $query_post_types = isset( $query_params['post_type'] ) ? devo_filter_public_post_types( $query_params['post_type'] ) : [];
        $post_types_field  = devo_get_post_meta( $post_id, $meta_prefix . '_search_post_types' . $meta_suffix );
        $post_type         = devo_filter_public_post_types( is_array( $post_types_field ) ? $post_types_field : ( is_string( $post_types_field ) && strlen( $post_types_field ) ? [ $post_types_field ] : [] ) );

        // UI Settings
        $post_types    = count( $query_post_types ) ? $query_post_types : $post_type;
        $sort_by_array = (array) devo_get_post_meta( $post_id, $meta_prefix . '_custom_sort_by' . $meta_suffix );
        $hide_sort_by  = devo_get_post_meta( $post_id, $meta_prefix . '_hide_sort_by' . $meta_suffix );
        $sort_settings = $this->organize_sort_settings( $sort_by_array );
        $field_settings = $settings['field_settings'];
        // UI
        $search_ui_args = [
            'post_types'    => $post_types,
            'fields'        => $field_settings,
            'sort'          => $sort_settings,
            'hide_sort_by'  => (bool) $hide_sort_by,
            'post_id'       => $post_id,
            'meta_prefix'   => $meta_prefix,
            'meta_suffix'   => $meta_suffix,
        ];
        $search_ui = new DO_Search_UI( $search_ui_args, $this->search_query );

        // Update $output
        $output['ui']                = $search_ui->ui;
        $output['results_statement'] = $search_ui->results_statement;
        $output['sort']              = $search_ui->sort;
    }

    /*
     * HELPERS
     */

    private function organize_field_settings( $fields = [] ) {
        $field_settings = [];
        foreach ( $fields as $field ) {
            if ( ! is_object( $field ) ) {
                continue;
            }
            $field_type = isset( $field->field_type ) ? $field->field_type : FALSE;
            switch ( $field_type ) {
                case 'alphabet':
                    $field_name = 'alpha';
                    break;
                case 'post_types':
                    $field_name = 'post_type';
                    break;
                case 'search':
                    $field_name = 's';
                    break;
                default:
                    $field_name = sanitize_title_with_dashes( isset( $field->field_name ) ? $field->field_name : '' );
                    break;
            }
            if ( ! strlen( $field_name ) ) {
                continue;
            }
            $settings = [
                'label'             => isset( $field->field_name ) ? $field->field_name : '',
                'name'              => $field_name,
                'type'              => $field_type,
                'options_post_type' => $field->options_post_type ?? '',
                'meta_key'          => isset( $field->meta_field ) && is_string( $field->meta_field ) && strlen( $field->meta_field ) ? sanitize_key( $field->meta_field ) : FALSE,
            ];
            $field_settings[ $field_name ] = $settings;
        };
        return $field_settings;
    }

    private function organize_sort_settings( $sort = [] ) {
        $sort_settings = [];
        // If there are sort settings...
        if ( is_array( $sort ) && count( $sort ) ) {
            // ...loop through them
            foreach ( $sort as $setting ) {
                $value = is_object( $setting ) ? ( $setting->value ?? FALSE ) : ( $setting['value'] ?? FALSE );
                $label = is_object( $setting ) ? ( $setting->label ?? FALSE ) : ( $setting['label'] ?? FALSE );
                if ( $value && $label ) {
                    $sort_settings[ $value ] = $label;
                }
            }
        }
        // ...otherwise create the defaults
        else {
            $sort_settings = [
                'date_desc'  => 'Publish Date',
                'title_asc'  => 'A to Z',
                'title_desc' => 'Z to A',
            ];
        }
        return $sort_settings;
    }
}
$search = new DO_Search();
