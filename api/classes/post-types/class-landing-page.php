<?php
/*
 * Landing Pages
 *
 */

class DO_Landing_Page extends DO_Custom_Post_Type {
    
    protected function construct() {
        // Actions/Filters
        if ( $this->post_type() == 'devo_landing_page' ) {
            add_action( 'generate_rewrite_rules' , [ $this, 'rewrite_rules' ] );
        }
        add_filter( 'pre_get_posts', [ $this, 'pre_get_posts' ] );
    }

    protected function post_type(): string {
        return 'devo_landing_page';
    }

    protected function post_type_args(): array {
        $args = [ 'menu_position' => 20 ];
        if ( $this->post_type() === 'devo_landing_page' ) {
            $args['rewrite'] = FALSE;
        }
        return $args;
    }

    protected function settings(): array {
        return [
            'post_excerpt' => 'SEO Description',
            'post_name' => 'Slug',
            'post_title' => 'Title',
            'post_thumbnail' => 'SEO Image||Media',
            'display_name' => $this->post_type_display_name(),
            'icon' => '\f116',
            'onsave_callback' => [ $this, 'onsave' ],
            'aftersave_callback' => [ $this, 'aftersave' ],
            'has_archive' => FALSE,
            'is_landing_page' => TRUE,
            'slug' => $this->post_type_slug(),
            'rest_slug' => $this->post_type_rest_slug(),
            'meta_prefix' => $this->meta_prefix(),
            //'show_in_menu' => $this->post_type() == 'devo_landing_page' ? FALSE : 'edit.php?post_type=devo_landing_page',
            'seo' => [
                'title' => 'SEO Title||post_title',
                'image' => 'SEO Image||Media',
                'description' => 'SEO Description',
            ],
            'character_count' => [
                'SEO Title' => 60,
                'SEO Description' => 160,
            ],
            'notes' => [
                'SEO Title' => 'Overwrites page "Title" field for SEO use.',
                'SEO Description' => 'Overwrites hero "Copy" field for SEO use.',
                //'Background' => 'Can be an image or video (.mp4)',
                //'Panel Background' => 'Can be an image or video (.mp4)',
                'Frame' => 'Square brackets only - [iframe][/iframe]',
                'Height / Width Ratio' => 'height / width * 100',
                'Images' => 'Title is required (for screen reader text). URL is supported only if not a lightbox.',
                'CTA' => 'For internal links, only include the path (for example <b>blog</b>)',
                'Media' => 'Supports images or Vimeo videos.',
                'Search Subject' => 'If a Search Subject is selected, a subject filter will not work.',
                'Stats' => 'Number Field: can ONLY be a number. No commas, or other text.',
                'Custom Media' => 'Use to override report image.',
                'Blocks Per Row' => 'Default is 3.',
                'Blocks Color' => 'Default is "Multi".',
            ],
            'dynamic_interface' => [
                'settings' => [
                    'type' => 'array',
                    'nested' => 'Panel Type',
                    'default_meta_boxes' => [ 'Hero', 'SEO', 'Admin' ],
                    'dynamic_meta_box' => 'Panel',
                    'dynamic_meta_box_title_field' => 'Title',
                ],
                'field_configuration' => [
                    'Panel Type' => $this->panel_fields(),
                ],
            ],
            'bonus_fields' => [
                'noindex' => $this->meta_prefix() . '_noindex',
            ],
            'hide_field' => 'Hidden',
            'schema' => [
                '@type' => 'WebPage',
                'breadcrumb' => 'Breadcrumbs',
                'headline' => 'Title',
                'image' => 'SEO Image',
                'description' => 'SEO Description',
            ],
        ];
    }

    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [
            'Hero' => $this->panel_fields( 'hero' ),
            'SEO' => $this->panel_fields( 'seo' ),
            'Admin' => $this->panel_fields( 'admin' ),
            'Panel' => array_merge( $this->panel_control_fields() ),
        ];
    }

    protected function admin_fields(): array {
        return [ 'Title', 'Slug', 'post_date' ];
    }

    protected function post_type_display_name(): string {
        return 'Landing Page';
    }

    protected function post_type_slug(): string {
        return FALSE;
    }

    protected function post_type_rest_slug(): string {
        return 'landing-page';
    }

    protected function meta_prefix(): string {
        return 'page';
    }

    protected function set_panel_default_fields( $unset = FALSE, $add = FALSE ): array {
        $default_fields = [
            'Title' => 'text',
            'Background' => 'background',
            'Copy' => 'wp_editor',
            'ID' => 'varchar',
        ];
        // Unset specified default fields for panel type
        if ( $unset ) {
            if ( is_array( $unset ) ) {
                foreach ( $unset as $field_label ) {
                    unset( $default_fields[ $field_label ] );
                }
            } elseif ( is_string( $unset ) ) {
                unset( $default_fields[ $unset ] );
            }
        }
        // Add specified default fields for panel type
        if ( $add ) {
            $default_fields_indexed = [];
            $i = 0;
            foreach ( $default_fields as $field_label => $field_details ) {
                $default_fields_indexed[ $i ] = [
                    $field_label => $field_details
                ];
                $i++;
            }
            $new_default_fields_indexed = [];
            foreach ( $add as $index => $field ) {
                $new_default_fields_indexed = devo_array_insert( $default_fields_indexed, $index, $field );
            }
            $new_default_fields = [];
            foreach ( $new_default_fields_indexed as $index => $field ) {
                $new_default_fields[ array_keys( $field )[0] ] = array_values( $field )[0];
            }
            $default_fields = $new_default_fields;
        }
        return $default_fields;
    }

    protected function set_panel_fields(): array {
        global $devo_site;
        include( locate_template( 'api/fields/colors.php' ) );
        $fields = [
            'accordion' => array_merge( $this->set_panel_default_fields(), [
                'Accordion Items' => 'accordion',
                'Full Width?' => 'binary',
            ] ),

            'admin' => [
                'Hidden' => 'binary',
                'NoIndex' => 'binary',
                'Slug' => 'varchar',
                'CSS' => 'varchar',
                'Landing Page Type' => [
                    'type' => 'select',
                    'options' => [
                        'form' => [
                            'label' => 'Form',
                            'value' => 'form',
                        ],
                        'landing-page' => [
                            'label' => 'Landing Page',
                            'value' => 'landing-page',
                        ],
                    ],
                ],
                'Schema' => [
                    'type' => 'select',
                    'options' => [
                        'WebPage' => [
                            'label' => 'WebPage (default)',
                            'value' => 'WebPage',
                        ],
                        'AboutPage' => [
                            'label' => 'AboutPage',
                            'value' => 'AboutPage',
                        ],
                        'ContactPage' => [
                            'label' => 'ContactPage',
                            'value' => 'ContactPage',
                        ],
                        'SearchResultsPage' => [
                            'label' => 'SearchResultsPage',
                            'value' => 'SearchResultsPage',
                        ],
                    ],
                ],
                'Breadcrumbs' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Text' => 'varchar',
                        'URL' => 'url',
                    ],
                ],
            ],
            'blocks' => array_merge( $this->set_panel_default_fields(), [
                'Blocks' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Hidden' => 'binary', 
			            'Media' => 'media',
                        'Icon' => 'icon',
                        'Title' => 'text',
                        'Copy' => 'html',
                        'CTA' => 'cta',
                    ],
                ],
                'Blocks Per Row' => 'per_row',
                'Block Style' => [
                    'type' => 'select',
                    'options' => [
                        'card' => [
                            'label' => 'Card (default)',
                            'value' => 'card',
                        ],
                        'plain' => [
                            'label' => 'Plain',
                            'value' => 'plain',
                        ],
                    ],
                ],
                'CTA' => 'ctas',
            ] ),
            'cta' => array_merge( $this->set_panel_default_fields(), [
                'CTA' => 'ctas',
            ] ),
            'custom' => array_merge( $this->set_panel_default_fields(), [
                'ID' => 'varchar',
            ] ),
            'decision-tree' => array_merge( $this->set_panel_default_fields(), [
                'Cards' => [
                    'type' => 'multi_array',
                    'limit' => 2,
                    'fields' => [
                        'Title' => 'text',
                        'Overview' => 'html',
                        'Copy' => 'html',
                        'CTA Text' => 'varchar',
                        'CTA URL' => 'url',
                        'List' => [
                            'type' => 'multi_array',
                            'fields' => [
                                'Icon' => 'media',
                                'Title' => 'text',
                                'URL' => 'url',
                            ],
                        ],
                    ],
                ],
            ] ),
            'featured-media' => array_merge( $this->set_panel_default_fields(), [
                'Media' => 'media',
                'Image Link' => 'image_link',
                'Full-Width SVG' => 'binary',
            ] ),
            'featured-post' => array_merge( $this->set_panel_default_fields( [ 'Title', 'Background', 'Copy' ] ), [
                'Post Type' => [
                    'type' => 'select_multiple',
                    'options' => 'devo_get_public_post_types',
                ],
                'Post' => [
                    'type' => 'post_browser',
                    'settings' => [
                        'post_types_field' => 'Post Type',
                        'limit' => 1,
                    ],
                ],
                'Override Image' => 'media',
                'Override Type' => 'post_type_labels',
                'Override Pretitle' => 'text',
                'Override Title' => 'text',
                'Override Description' => 'html',
                'Override CTA Text' => 'varchar',
                'Override URL' => 'url',
                'Link Target' => [
                    'type' => 'select',
                    'options' => [
                        [
                            'label' => 'Self (default)',
                            'value' => '_self',
                        ],
                        [
                            'label' => 'Modal',
                            'value' => 'modal',
                        ],
                        [
                            'label' => 'New Tab/Window',
                            'value' => '_blank',
                        ],
                    ]
                ]
            ] ),
            'form' => array_merge( $this->set_panel_default_fields(), [
                'Form' => new DO_CPT_Form_Field( 'select', 'devo_form', 'post_title', 'post_id' ),
            ] ),
            'gallery' => array_merge( $this->set_panel_default_fields(), [
                'Gallery' => 'gallery',
            ] ),
            'hero' => [
                'Title' => 'text',
                'Background' => 'background',
                'Copy' => 'wp_editor',
                'CTA' => 'ctas',
            ],
            'posts' => array_merge( $this->set_panel_default_fields(), [
                'Post Type' => [
                    'type' => 'select_multiple',
                    'options' => 'devo_get_public_post_types',
                ],
                'Posts' => [
                    'type' => 'post_browser',
                    'settings' => [
                        'post_types_field' => 'Post Type',
                    ],
                ],
                'Posts Per Row' => 'per_row',
                'Slider' => 'binary',
                'Modal' => 'binary',
                'CTA' => 'ctas',
            ] ),

            'quotes' => array_merge( $this->set_panel_default_fields(), [
                'Quotes' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Quote' => 'html',
                        'Attribution' => 'text',
                    ],
                ],
                'CTAs' => 'ctas',
            ] ),

            'search' => array_merge( $this->set_panel_default_fields(), [
                'Search Post Types' => [
                    'type' => 'select_multiple',
                    'options' => 'devo_get_public_post_types',
                ],
                'Search Subject' => [
                    'type' => 'select',
                    'options' => 'devo_subject',
                ],
                'Search Fields' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Field Name' => 'varchar',
                        'Field Type' => [
                            'type' => 'select',
                            'options' => [
                                'alphabet' => [
                                    'label' => 'Alphabet',
                                    'value' => 'alphabet',
                                ],
                                'post_types' => [
                                    'label' => 'Post Types',
                                    'value' => 'post_types',
                                ],
                                'search' => [
                                    'label' => 'Text Search',
                                    'value' => 'search',
                                ],
                                'select_list' => [
                                    'label' => 'Select List',
                                    'value' => 'select_list',
                                ],
                            ],
                        ],
                        'Options Post Type' => [
                            'type' => 'select',
                            'options' => 'devo_get_post_types',
                        ],
                        'Meta Field' => 'varchar',
                    ],
                ],
                'Posts Per Row' => 'per_row',
                'Posts Per Page' => 'int',
                'Modal' => 'binary',
                'Custom Sort By' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Value' => 'varchar',
                        'Label' => 'varchar',
                    ],
                ],
                'Hide Sort By' => 'binary',
            ] ),
            'seo' => [
                'SEO Title' => 'text',
                'SEO Description' => 'textarea',
                'SEO Image' => 'media',
            ],
            'stats' => array_merge( $this->set_panel_default_fields(), [
                'Stats' => 'stats',
            ] ),
            'tabs' => array_merge( $this->set_panel_default_fields(), [
                'Tabs' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Nav Label' => 'varchar',
                        'Title' => 'text',
                        'Media' => 'media',
                        'Copy' => 'html',
                        'CTA' => 'cta',
                    ],
                ],
            ] ),
            'text' => array_merge( $this->set_panel_default_fields(), [
                'Overlay' => 'binary',
                'CTA' => 'ctas',
            ] ),
            'text-media' => array_merge( $this->set_panel_default_fields(), [
                'Media' => 'media',
                'Media Alignment' => [
                    'type' => 'select',
                    'options' => [
                        'left' => [
                            'label' => 'Left',
                            'value' => 'left',
                        ],
                        'right' => [
                            'label' => 'Right',
                            'value' => 'right',
                        ],
                        'alternate' => [
                            'label' => 'Alternate',
                            'value' => 'alternate',
                        ],
                    ],
                ],
                'Image Size' => 'image_size',
                'Image Link' => 'image_link',
                'CTA' => 'ctas',
            ] ),
        ];
        return $fields;
    }

    public function set_panel_types(): array {
        $panel_types = [
            'accordion' => [
                'label' => 'Accordion',
                'value' => 'accordion',
            ],
            'blocks' => [
                'label' => 'Blocks',
                'value' => 'blocks',
            ],
            'cta' => [
                'label' => 'CTA',
                'value' => 'cta',
            ],
            'decision-tree' => [
                'label' => 'Decision Tree',
                'value' => 'decision-tree',
            ],
            'featured-media' => [
                'label' => 'Featured Media',
                'value' => 'featured-media',
            ],
            'featured-post' => [
                'label' => 'Featured Post',
                'value' => 'featured-post',
            ],
            'form' => [
                'label' => 'Form',
                'value' => 'form',
            ],
            'gallery' => [
                'label' => 'Gallery',
                'value' => 'gallery',
            ],
            'posts' => [
                'label' => 'Posts',
                'value' => 'posts',
            ],
            'quotes' => [
                'label' => 'Quotes',
                'value' => 'quotes',
            ],
            'search' => [
                'label' => 'Search',
                'value' => 'search',
            ],
            'stats' => [
                'label' => 'Stats',
                'value' => 'stats',
            ],
            'tabs' => [
                'label' => 'Tabs',
                'value' => 'tabs',
            ],
            'text' => [
                'label' => 'Text',
                'value' => 'text',
            ],
            'text-media' => [
                'label' => 'Text + Media',
                'value' => 'text-media',
            ],

        ];
        // Lets extensions (see extensions/README.md) register additional
        // panel types into the CMS dropdown without editing this file.
        return apply_filters( 'devo_panel_types', $panel_types );
    }

    public function panel_control_fields( $field_label_prefix = FALSE ): array {
        $panel_types = $this->set_panel_types();
        ksort( $panel_types );
        $fields = [
            'Hide Panel' => 'binary',
            'Panel Type' => [
                'type' => 'select',
                'options' => $panel_types,
            ],
        ];
        if ( $field_label_prefix ) {
            foreach ( $fields as $key => $value ) {
                $control_fields[ $field_label_prefix . ' ' . $key ] = $value;
            }
        } else {
            $control_fields = $fields;
        }
        return $control_fields;
    }

    // Used in the panel method to call (and maybe rename) specified panels in child classes
    public function panel_default_fields( $field_label_prefix = FALSE ): array {
        if ( $field_label_prefix ) {
            foreach ( $this->set_panel_default_fields() as $key => $value ) {
                $default_fields[ $field_label_prefix . ' ' . $key ] = $value;
            }
        } else {
            $default_fields = $this->set_panel_default_fields();
        }
        return $default_fields;
    }

    public function panel_fields( $panel_type = FALSE, $field_label_prefix = FALSE ): array {
        // Modify labels...
        if ( $field_label_prefix ) {
            foreach ( $this->set_panel_fields() as $type_key => $type_value ) {
                foreach ( $type_value as $key => $value ) {
                    $type_fields[ $type_key ][ $field_label_prefix . ' ' . $key ] = $value;
                }
            }
        }
        // ...or don't
        else {
            $type_fields = $this->set_panel_fields();
        }

        // Return specific type...
        if ( $panel_type ) {
            return isset( $type_fields[ $panel_type ] ) ? $type_fields[ $panel_type ] : [];
        }
        // ...or return them all
        else {
            return $type_fields;
        }
    }

    // Used by child classes to display specific panel types
    public function panel( $panel_type = FALSE, $field_label_prefix = FALSE ): array {
        if ( $panel_type ) {
            $panel = in_array( $panel_type, [ 'hero', 'seo', 'admin' ] ) ? $this->panel_fields( $panel_type, $field_label_prefix ) : array_merge( $this->panel_default_fields( $field_label_prefix ), $this->panel_fields( $panel_type, $field_label_prefix ) );
        } else {
            $panel = array_merge( $this->panel_control_fields( $field_label_prefix ), $this->panel_default_fields( $field_label_prefix ) );
        }
        return $panel;
    }

    public function rewrite_rules( $wp_rewrite ): void {
        // $wp_rewrite->rules = [ '[^/]+/attachment/([^/]+)/?$' => 'index.php?attachment=$matches[1]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/attachment/([^/]+)/trackback/?$' => 'index.php?attachment=$matches[1]&tb=1' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/attachment/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$' => 'index.php?attachment=$matches[1]&feed=$matches[2]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/attachment/([^/]+)/(feed|rdf|rss|rss2|atom)/?$' => 'index.php?attachment=$matches[1]&feed=$matches[2]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/attachment/([^/]+)/comment-page-([0-9]{1,})/?$' => 'index.php?attachment=$matches[1]&cpage=$matches[2]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/attachment/([^/]+)/embed/?$' => 'index.php?attachment=$matches[1]&embed=true' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '([^/]+)/embed/?$' => 'index.php?' . $this->post_type() . '=$matches[1]&embed=true' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '([^/]+)/trackback/?$' => 'index.php?' . $this->post_type() . '=$matches[1]&tb=1' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '([^/]+)/page/?([0-9]{1,})/?$' => 'index.php?' . $this->post_type() . '=$matches[1]&paged=$matches[2]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '([^/]+)/comment-page-([0-9]{1,})/?$' => 'index.php?' . $this->post_type() . '=$matches[1]&cpage=$matches[2]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '([^/]+)(?:/([0-9]+))?/?$' => 'index.php?' . $this->post_type() . '=$matches[1]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/([^/]+)/trackback/?$' => 'index.php?attachment=$matches[1]&tb=1' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/([^/]+)/feed/(feed|rdf|rss|rss2|atom)/?$' => 'index.php?attachment=$matches[1]&feed=$matches[2]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/([^/]+)/(feed|rdf|rss|rss2|atom)/?$' => 'index.php?attachment=$matches[1]&feed=$matches[2]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/([^/]+)/comment-page-([0-9]{1,})/?$' => 'index.php?attachment=$matches[1]&cpage=$matches[2]' ] + $wp_rewrite->rules;
        // $wp_rewrite->rules = [ '[^/]+/([^/]+)/embed/?$' => 'index.php?attachment=$matches[1]&embed=true' ] + $wp_rewrite->rules;
        $wp_rewrite->rules = $wp_rewrite->rules + [ '[^/]+/?$' => 'index.php?' . $this->post_type() . '=$matches[1]' ];
        $wp_rewrite->rules = $wp_rewrite->rules + [ 'iframe/[^/]+/?$' => 'index.php?' . $this->post_type() . '=$matches[1]&iframe=1' ];
    }

    public function aftersave( $post_id ): void {
        $post_type = get_post_field( 'post_type', $post_id );
        if ( $post_type === $this->post_type ) {
            global $devo_custom_post_types, $wpdb;
            $post_type_details = $devo_custom_post_types[ $post_type ];
            // Manually set the guid
            $guid = home_url( ( $post_type_details->post_type_slug ? $post_type_details->post_type_slug . '/' : '' ) . get_post_field( 'post_name', $post_id ) . '/' );
            $wpdb->query( "UPDATE $wpdb->posts SET guid = '$guid' WHERE ID = $post_id;" );
            // Flush rewrite rules
            flush_rewrite_rules();
        }
    }

    public function onsave( $POST, $cpt_obj ): array {
        if ( isset( $POST[ $this->meta_prefix() . '_slug' ] ) && $POST[ $this->meta_prefix() . '_slug' ] === 'home' ) {
            $POST['post_title_override'] = 'Home';
        }
        return $POST;
    }

    public function pre_get_posts( $wp_query ): void {
        if ( is_admin() && isset( $wp_query->query_vars['post_type'] ) && $wp_query->query_vars['post_type'] == $this->post_type() ) {
            if ( ! isset( $_GET['orderby'] ) ) {
                $wp_query->set( 'orderby', [ 'post_name' => 'ASC' ] );
            }
        }
    }
}
$DO_Landing_Page = DO_Landing_Page::get_instance();