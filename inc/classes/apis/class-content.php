<?php
/**
 * Content API
 */

class API_Content {

    public function __construct() {
        add_filter( 'query_vars', [ $this, 'query_vars' ] );
        add_action( 'generate_rewrite_rules' , [ $this, 'rewrite_rules' ] );
        add_action( 'template_include', [ $this, 'template_include' ] );        
    }

    public function query_vars( $vars ) {
        array_push( $vars, 'content_api' );
        array_push( $vars, 'page' );
        return $vars;
    }

    public function rewrite_rules( $wp_rewrite ) {
        $wp_rewrite->rules = [ 'wp-json/wp/v2/content$' => 'index.php?content=1' ] + $wp_rewrite->rules;
    }

    public function template_include( $template ) {
        global $wp_query, $do_custom_post_types;
        // If we're loading the API
        if ( isset( $wp_query->query_vars['content_api'] ) ) {
            $post_types = do_get_public_post_types( 'array' );
            $query = new WP_Query( [ 
                //'p' => 21969,
                'post_type' => $post_types, 
                'posts_per_page' => 30,
                'paged' => isset( $wp_query->query_vars['page'] ) ? $wp_query->query_vars['page'] : 1,
            ] );
            $output = [
                'total_posts' => $query->found_posts,
                'total_pages' => $query->max_num_pages,
                'current_page' => (int) $query->query['paged'],
                'posts' => [],
            ];
            if ( $query->have_posts() ) {
                while ( $query->have_posts() ) {
                    $query->the_post();
                    $post = $query->post;
                    $cpt_obj = isset( $do_custom_post_types[ $post->post_type ] ) ? $do_custom_post_types[ $post->post_type ] : [];
                    // If it's a landing page, build the content from panels
                    if ( $cpt_obj->is_landing_page ) {
                        $meta_values = do_get_post_meta( $post->ID );
                        $post_content = [];
                        $hide_panel = FALSE;
                        foreach ( $cpt_obj->meta_fields as $meta_key => $field_type ) {
                            // Determine if a panel is hidden
                            if ( strpos( $meta_key, 'hide_panel' ) !== FALSE ) {
                                $hide_panel = isset( $meta_values[ $meta_key ] ) && $meta_values[ $meta_key ] === '1';
                            }
                            // Don't include the title field or SEO fields, or hidden panels
                            if ( ! in_array( $meta_key, $cpt_obj->post_title ) && strpos( $meta_key, 'seo' ) === FALSE && isset( $meta_values[ $meta_key ] ) && ! $hide_panel ) {
                                $subfields = is_array( $field_type ) && isset( $field_type['fields'] ) ? $field_type['fields'] : [];
                                $maybe_content = do_get_content_from_meta_field( $field_type, $meta_values[ $meta_key ], $subfields );
                                if ( ! is_null( $maybe_content ) && ( ( is_string( $maybe_content ) && strlen( $maybe_content ) ) || ( is_array( $maybe_content ) && count( $maybe_content ) ) ) ) {
                                    $post_content[] = $maybe_content;
                                }
                            }
                        }
                        $post_content = do_flatten_array( $post_content );
                    } 
                    // If it's not a landing page just use post_content
                    else {
                        $post_content = $post->post_content;
                    }
                    // File
                    $file_raw = do_get_post_meta( $post->ID, 'post_file' );
                    if ( ( is_array( $file_raw ) && count( $file_raw ) ) || ( is_string( $file_raw ) && strlen( $file_raw ) ) ) {
                        $file = isset( $file_raw['pdf'] ) ? $file_raw['pdf'] : $file_raw;
                    } else {
                        $file = '';
                    }
                    $output['posts'][] = [
                        'title' => $post->post_title,
                        'content' => $post_content,
                        'file' => $file,
                        'url' => get_the_permalink( $post ),
                    ];

                }
                wp_reset_postdata();
            }
            header( 'content-type: application/json; charset=utf-8' );
            header( 'access-control-allow-origin: *' );
            echo json_encode( $output );
            return;
        }
        return $template;
    }
}
$content_api = new API_Content();