<?php
/*
 * Fields and functionality for gated content
 *
 */

class DO_Gated {
    private $cpt_object;
    public function __construct( $cpt_object = FALSE ) {
        if ( ! $cpt_object ) {
            return;
        }
        $this->cpt_object = $cpt_object;
        add_action( 'after_setup_theme', [ $this, 'post_type_modifications' ], 3 );
        add_action( 'after_setup_theme', [ $this, 'thank_you_rewrite' ], 10 );
        add_action( 'query_vars', [ $this, 'query_vars'] );
        add_filter( 'template_include', [ $this, 'template' ], 0 );
        add_filter( 'pre_get_posts', [ $this, 'query' ] );
    }

    public function post_type_modifications() {
        $this->cpt_object->settings( [
            'dynamic_interface' => [
                'settings' => [
                    'type' => 'nested',
                    'nested' => 'Thanks Panel Type',
                    'dynamic_meta_box' => 'Thank You Page Custom Panel',
                    'dynamic_meta_box_title_field' => 'Thanks Panel Title',
                ],
                'field_configuration' => [
                    'Thanks Panel Type' => DO_Landing_Page::panel_fields( FALSE, 'Thanks' ),
                ],
            ],
            'notes' => [
                'Form Title' => 'Optional. Default is "Download the Free Report"',
                'Thank You Page Title' => 'Default is report title.',
                'Thank You Page Copy' => 'Default is "Thank you for your interest in [Thank You Page Title]. You can download the report below."',
                'Thank You Page Download Button Text' => 'Default is "Download"',
            ],
        ] );
        $this->cpt_object->meta_fields( [
            'Gated?' => 'binary',
            'Form Title' => 'text',
            'Form Embed Code' => 'form_embed_code',
        ], 'Gating' );
        $this->cpt_object->meta_fields( [
            'Thank You Page Title' => 'text',
            'Thank You Page Copy' => 'wp_editor',
        ], 'Thank You Page' );
        $this->cpt_object->meta_fields( DO_Landing_Page::panel( FALSE, 'Thanks' ), 'Thank You Page Custom Panel' );
    }

    public function thank_you_rewrite() {
        // Manually create rewrite rule for Thank You Page endpoint
        add_rewrite_rule( $this->cpt_object->post_type_slug . '/thank-you/?$', 'index.php?post_type=' . $this->cpt_object->post_type . '&thanks=1', 'top' );
        add_rewrite_rule( $this->cpt_object->post_type_slug . '/([^/]+)/thank-you/?$', 'index.php?post_type=' . $this->cpt_object->post_type . '&name=$matches[1]&thanks=1', 'top' );
    }

    public function query_vars( $vars ) {
        array_push( $vars, 'thanks' );
        return $vars;
    }

    public function query( $wp_query ) {
        if ( isset( $wp_query->query_vars['thanks'] ) ) {
            $wp_query->is_single = FALSE;
        }
    }

    public function template( $template ) {
        global $wp_query;
        if ( isset( $wp_query->query_vars['thanks'] ) ) {
            $template = locate_template( 'templates/thank-you.php' );
        }
        return $template;
    }
}