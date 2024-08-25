<?php
class DoSearch_Query {
    public $current_page;
    private $default_query;
    public $default_query_fields;
    public $found_posts;
    public $pages;
    public $posts;
    public $query;
    public $query_fields;
    public $query_string;

    function __construct( $settings = [] ) {
        $query_result = $this->get_posts( $settings );
        $this->posts = $query_result->posts;
        $this->found_posts = $query_result->found_posts;
        $this->pages = $query_result->max_num_pages;
        $this->current_page = $this->pages > 0 ? ( $query_result->query_vars['paged'] > 0 ? $query_result->query_vars['paged'] : 1 ) : 0;
        $this->query_string = trim( $query_result->query_string, '&' );
        $this->query = $query_result->query;
        $this->default_query_fields = $settings['default_query'];
        $this->query_fields = $query_result->query_fields;
        $this->default_query = $query_result->default_query;
    }

    private function get_posts( $settings ) {
        //do_var_dump($settings);exit;
        // Clean up the query, removing empty values
        $new_query = [];
        foreach ( $settings['query'] as $key => $value ) {
            if ( do_has_value( $value ) ) {
                $new_query[ $key ] = $value;
            }
        }
        $query_args = [];
        $query_string = '?';
        // Merge the new and default queries
        $query = array_merge( $settings['default_query'], $new_query );
        // Build the query
        [ $query_args, $query_string ] = $this->build_query( $query );
        // Add filter for alpha title
        add_filter( 'posts_where', [ $this, 'alpha_title_filter' ], 10, 2 );
        // Execute the query
        $wp_query = new WP_Query( $query_args );
        // Remove the filter
        remove_filter( 'posts_where', [ $this, 'alpha_title_filter' ], 10, 2 );
        // Add custom fields to results
        $this->add_custom_fields( $wp_query );
        // Add the query string
        $wp_query->query_string = $query_string;
        // Add the query fields array
        $wp_query->query_fields = $query;
        // Add the default query
        $wp_query->default_query = $this->build_query( $settings['default_query'] )[0];

        return $wp_query;
    }

    function alpha_title_filter( $where, $wp_query ) {
        global $wpdb;
        $alpha_title = $wp_query->get( 'alpha_title' );
        if ( do_has_value( $alpha_title ) ) {
            $value = is_array( $alpha_title ) ? implode( ',', $alpha_title ) : $alpha_title;
            $where .= ' AND (' . $wpdb->posts . '.post_title LIKE \'' . esc_sql( like_escape( $value ) ) . '%\'';
            $where .= ' OR ' . $wpdb->posts . '.post_title LIKE \'The ' . esc_sql( like_escape( $value ) ) . '%\'';
            $where .= ' OR ' . $wpdb->posts . '.post_title LIKE \'the ' . esc_sql( like_escape( $value ) ) . '%\'';
            $where .= ' OR ' . $wpdb->posts . '.post_title LIKE \'A ' . esc_sql( like_escape( $value ) ) . '%\'';
            $where .= ' OR ' . $wpdb->posts . '.post_title LIKE \'a ' . esc_sql( like_escape( $value ) ) . '%\')';
        }
        return $where;
    }

    /*
     * HELPERS
     */

    private function add_custom_fields( &$wp_query ) {
        foreach ( $wp_query->posts as $i => $post ) {
            $wp_query->posts[ $i ] = do_api_custom_data( $post );
        }
    }

    private function build_query( $query_fields ) {
        $query_args = [];
        $query_string = '?';
        // Construct WP_Query args
        foreach ( $query_fields as $search_param_key => $search_param_value ) {
            if ( do_has_value( $search_param_value ) ) {
                // Don't include paged or sort in query string
                if ( ! in_array( $search_param_key, [ 'paged', 'posts_per_page', 'sort' ] ) ) {
                    $query_string .= $search_param_key . '=' . ( is_array( $search_param_value ) ? implode( ',', $search_param_value ) : $search_param_value ) . '&';
                }
                // If a keyword search is happening, use relevanssi
                if ( function_exists( 'relevanssi_init' ) && $search_param_key === 's' && strlen( $search_param_value ) ) {
                    $query_args['relevanssi'] = TRUE;
                }
                // If it's a default parameter, just add it
                if ( $this->is_default_parameter( $search_param_key ) ) {
                    $query_args[ $search_param_key ] = $search_param_value;
                }
                // If it's an alpha, the parameter is title, but we need a special/
                // filter, so create the custom 'alpha_title' param
                elseif ( $search_param_key === 'alpha' ) {
                    $query_args['alpha_title'] = $search_param_value;
                }
                // If it's not a sort, add it to a meta query
                elseif ( $search_param_key !== 'sort' ) {
                    if ( ! isset( $query_args['meta_query'] ) ) {
                        $query_args['meta_query'] = [
                            'relation' => 'AND',
                        ];
                    }
                    if ( is_array( $search_param_value ) ) {
                        foreach ( $search_param_value as $i => $value ) {
                            $query_args['meta_query'][ $search_param_key . '_' . $i ] = [
                                'key' => $search_param_key,
                                'value' => $value,
                                'compare' => 'LIKE',
                            ];
                        }
                    }
                    else {
                        $query_args['meta_query'][ $search_param_key ] = [
                            'key' => $search_param_key,
                            'value' => $search_param_value,
                        ];
                    }
                }
                // If it is sort, make it an orderby
                elseif ( $search_param_key === 'sort' ) {
                    $search_param_value = do_str_lreplace( '_', '#', $search_param_value );
                    [ $orderby, $order ] = explode( '#', $search_param_value );
                    $query_args['orderby'][ $orderby ] = strtoupper( $order );
                    // If the orderby is not a default field, add it to the meta_query
                    if ( ! $this->is_default_parameter( $orderby ) ) {
                        $query_args['meta_query'][ $orderby ] = [
                            'key' => $orderby
                        ];
                    }
                }
            }
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
        //do_var_dump($query_args);exit;
        return [ $query_args, $query_string ];
    }

    private function is_default_parameter( $param ) {
        return in_array( $param, [ 'paged', 'post_type', 'posts_per_page', 's', 'date', 'title' ] ) !== FALSE;
    }
}