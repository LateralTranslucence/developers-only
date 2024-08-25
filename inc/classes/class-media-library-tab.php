<?php
/*
 * Media Library Filter Tab
 * - designed as a Singleton
 * - to create a new tab, add to the $tabs property
 */

class DO_Media_Library_Filter_Tab {
    private static $instance;
    private $tabs;

    private function __construct() {
        $this->tabs = [
            'icons' => [
                'query_var' => 'icons',
                'post_type' => 'do_icon',
                'meta_query_show' => [
                    'relation' => 'AND',
                    'show_icons' => [
                        'key' => 'icon',
                        'value' => 1,
                        'compare' => '=',
                    ],
                    'only_navy' => [
                        'key' => 'icon_color',
                        'value' => 'navy',
                        'compare' => '=',
                    ],
                ],
                'meta_query_hide' => [
                    'hide_icons' => [
                        'key' => 'icon',
                        'value' => '',
                        'compare' => 'NOT EXISTS',
                    ],
                ],
            ],
            'logos' => [
                'query_var' => 'logos',
                'post_type' => 'do_company',
                'meta_query_show' => [
                    'relation' => 'AND',
                    'show_logos' => [
                        'key' => 'logo',
                        'value' => 1,
                        'compare' => '=',
                    ],
                ],
                'meta_query_hide' => [
                    'hide_logos' => [
                        'key' => 'logo',
                        'value' => '',
                        'compare' => 'NOT EXISTS',
                    ],
                ],
            ],
        ];

        add_filter( 'ajax_query_attachments_args', [ $this, 'query_attachments' ], 99 );
    }

    public static function get_instance() {
        if ( ! self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function query_attachments( $args ) {
        if ( ! isset( $args['meta_query'] ) ) {
            $args['meta_query'] = [];
        }
        foreach ( $this->tabs as $tab ) {
            // Determine whether or not we're looking for "this"
            $only_this = isset( $_POST['query'][ $tab['query_var'] ] );
            $referrer = wp_get_referer();
            $current_post_id = strpos( $referrer, 'post.php' ) !== FALSE ? explode( '=', explode( '&', explode( '?', $referrer )[1] )[0] )[1] : FALSE;
            $current_post_type = $current_post_id ? get_post_field( 'post_type', $current_post_id ) : FALSE;
            // If we're browing for "this", only show "this"
            if ( $only_this ) {
                // Only show "this" files
                $args['meta_query'] = array_merge( $args['meta_query'], $tab['meta_query_show'] );
                unset( $_POST['query'][ $tab['query_var'] ] );
            }
            // If we aren't browsing for "this", and aren't on the "this" post type, don't show them
            elseif ( $current_post_type !== $tab['post_type'] ) {
                $args['meta_query'] = array_merge( $args['meta_query'], $tab['meta_query_hide'] );
            }
        }
        return $args;
    }
}
$do_media_library_tab = DO_Media_Library_Filter_Tab::get_instance();