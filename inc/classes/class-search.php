<?php

class DoSearch {
    private $search_query;
    
    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'rest_route' ] );
    }

    public function rest_api_endpoint( $data ) {
        $output = [];
        $query_params = $data->get_params();
        $post_id = $query_params[ 'postID' ];
        $meta_prefix = $query_params[ 'metaPrefix' ];
        $meta_suffix = $query_params[ 'metaSuffix' ];
        $fields = do_get_post_meta( $post_id, $meta_prefix . '_search_fields' . $meta_suffix );
        $field_settings = $this->organize_field_settings( $fields );
        $settings = [
            'query_params' => $query_params,
            'post_id' => $post_id,
            'meta_prefix' => $meta_prefix,
            'meta_suffix' => $meta_suffix,
            'field_settings' => $field_settings,
        ];
        $this->query( $output, $settings );
        $this->ui( $output, $settings );
    
        return $output;
    }

    public function rest_route() {
        register_rest_route( 'wp/v2', '/search/', [
            'methods' => 'GET',
            'callback' => [ $this, 'rest_api_endpoint' ],
            'permission_callback' => function () {
                return TRUE;
            }
        ] );
    }

    private function query( &$output, $settings = [] ) {
        $query_params = $settings[ 'query_params' ];
        $post_id = $settings[ 'post_id' ];
        $meta_prefix = $settings[ 'meta_prefix' ];
        $meta_suffix = $settings[ 'meta_suffix' ];
        $field_settings = $settings[ 'field_settings' ];
        // Current query settings (could be anything)
        $current_query = [];
        foreach ( $query_params as $param_key => $param_value ) {
            // Not these param keys - we'll deal with them specifically later
            if ( ! in_array( $param_key, [ 'posts_per_page', 'paged', 's', 'sort', 'postID', 'metaPrefix', 'metaSuffix' ] ) ) {
                // If there's a meta_key, use it
                $field_key = isset( $field_settings[ $param_key ] ) && $field_settings[ $param_key ]['meta_key'] ? $field_settings[ $param_key ]['meta_key'] : $param_key;
                $current_query[ $field_key ] = strlen( $param_value ) ? explode( ',', $param_value ) : [];
            }
        }
        $current_query['posts_per_page'] = strlen( $query_per_page = do_get_post_meta( $post_id, $meta_prefix . '_posts_per_page' . $meta_suffix ) ) ? $query_per_page : 16;
        $current_query['paged'] = isset( $query_params[ 'paged' ] ) ? $query_params[ 'paged' ] : 1;
        $current_query['s'] = isset( $query_params[ 's' ] ) ? $query_params[ 's' ] : '';
        if ( isset( $query_params[ 'sort' ] ) ) {
            $current_query['sort'] = $query_params[ 'sort' ];
        } elseif ( count( $sort = do_get_post_meta( $post_id, $meta_prefix . '_custom_sort_by' . $meta_suffix ) ) && isset( $sort[0] ) ) {
            $current_query['sort'] = $sort[0]['value'];
        } else {
            $current_query['sort'] = 'date_desc';
        }
        // Default query settings (only options are post type and subject)
        $subject = strlen( $subject_field = do_get_post_meta( $post_id, $meta_prefix . '_search_subject' . $meta_suffix ) ) ? explode( ',', $subject_field ) : [];
        $post_type = is_array( $post_types_field = do_get_post_meta( $post_id, $meta_prefix . '_search_post_types' . $meta_suffix ) ) ? $post_types_field : ( strlen( $post_types_field ) ? [ $post_types_field ] : [] );
        // Perform the search
        $search_query_args = [
            'query' => $current_query,
            'default_query' => [
                'post_type' => $post_type,
                'subject' => $subject,
            ]
        ];
        $this->search_query = new DoSearch_Query( $search_query_args );

        // Update $output
        $output['posts'] = $this->search_query->posts;
        $output['found_posts'] = $this->search_query->found_posts;
        $output['pages'] = $this->search_query->pages;
        $output['current_page'] = $this->search_query->current_page;
        //$output['query_string'] = $this->search_query->query_string;
        //$output['query_fields'] = $this->search_query->query_fields;
        //$output['default_query'] = $this->search_query->default_query;
    }

    private function ui( &$output, $settings = [] ) {
        $query_params = $settings[ 'query_params' ];
        $post_id = $settings[ 'post_id' ];
        $meta_prefix = $settings[ 'meta_prefix' ];
        $meta_suffix = $settings[ 'meta_suffix' ];

        // Relevant query settings
        $query_post_types = isset( $query_params[ 'post_type' ] ) ? explode( ',', $query_params[ 'post_type' ] ) : [];
        $post_type = is_array( $post_types_field = do_get_post_meta( $post_id, $meta_prefix . '_search_post_types' . $meta_suffix ) ) ? $post_types_field : ( strlen( $post_types_field ) ? [ $post_types_field ] : [] );
        
        // UI Settings
        $post_types = count( $query_post_types ) ? $query_post_types : $post_type;
        $sort_by_array = do_get_post_meta( $post_id, $meta_prefix . '_custom_sort_by' . $meta_suffix );
        $hide_sort_by = do_get_post_meta( $post_id, $meta_prefix . '_hide_sort_by' . $meta_suffix );
        $sort_settings = $this->organize_sort_settings( $sort_by_array );
        $field_settings = $settings['field_settings'];
        // UI
        $search_ui_args = [
            'post_types' => $post_types,
            'fields' => $field_settings,
            'sort' => $sort_settings,
            'hide_sort_by' => (bool) $hide_sort_by,
            'post_id' => $post_id,
            'meta_prefix' => $meta_prefix,
            'meta_suffix' => $meta_suffix,
        ];
        $search_ui = new DoSearch_UI( $search_ui_args, $this->search_query );

        // Update $output
        $output['ui'] = $search_ui->ui;
        $output['results_statement'] = $search_ui->results_statement;
        $output['sort'] = $search_ui->sort;
    }

    /*
     * HELPERS
     */

    private function organize_field_settings( $fields = [] ) {
        $field_settings = [];
        foreach ( $fields as $field ) {
            $field_type = isset( $field['field_type'] ) ? $field['field_type'] : FALSE;
            switch( $field_type ) {
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
                    $field_name = sanitize_title_with_dashes( $field['field_name'] );
                    break;
            }
            $settings = [
                'label' => $field['field_name'],
                'name' => $field_name,
                'type' => $field_type,
                'options_post_type' => $field['options_post_type'],
                'meta_key' => isset( $field['meta_field'] ) && strlen( $field['meta_field'] ) ? $field['meta_field'] : FALSE,
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
                if ( isset( $setting['value'] ) && isset( $setting['value'] ) ) {
                    $sort_settings[ $setting['value'] ] = $setting['label'];
                }
            }
        }
        // ...otherwise create the defaults
        else {
            $sort_settings = [
                'date_desc' => 'Publish Date',
                'title_asc' => 'A to Z',
                'title_desc' => 'Z to A',
            ];
        }
        return $sort_settings;
    }
}
$search = new DoSearch();