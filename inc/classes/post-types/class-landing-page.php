<?php
/*
 * Landing Pages
 *
 */


class DO_Landing_Page extends DO_Custom_Post_Type {
    
    protected function construct() {
        // Actions/Filters
        if ( $this->post_type() == 'do_landing_page' ) {
            add_action( 'generate_rewrite_rules' , [ $this, 'rewrite_rules' ] );
        }
        add_filter( 'pre_get_posts', [ $this, 'pre_get_posts' ] );
    }

    protected function post_type(): string {
        return 'do_landing_page';
    }
    protected function post_type_args(): array {
        $args = [ 'menu_position' => 20 ];
        if ( $this->post_type() === 'do_landing_page' ) {
            $args['rewrite'] = FALSE;
        }
        return $args;
    }
    protected function settings(): array {
        return [
            'post_title' => 'Title',
            'display_name' => $this->post_type_display_name(),
            'icon' => '\f116',
            'onsave_callback' => [ $this, 'onsave' ],
            'aftersave_callback' => [ $this, 'aftersave' ],
            'has_archive' => FALSE,
            'is_landing_page' => TRUE,
            'post_name' => 'Slug',
            'slug' => $this->post_type_slug(),
            'rest_slug' => $this->post_type_rest_slug(),
            'meta_prefix' => $this->meta_prefix(),
            //'show_in_menu' => $this->post_type() == 'do_landing_page' ? FALSE : 'edit.php?post_type=do_landing_page',
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
                'Background' => 'Can be an image or video (.mp4)',
                'Panel Background' => 'Can be an image or video (.mp4)',
                'Frame' => 'Square brackets only - [iframe][/iframe]',
                'Height / Width Ratio' => 'height / width * 100',
                'Images' => 'Title is required (for screen reader text). URL is supported only if not a lightbox.',
                'CTA' => 'For internal links, only include the path (for example <b>blog</b>)',
                'Media' => 'Supports images or Vimeo videos.',
                'Countdown Date' => 'Default timezone is ' . wp_timezone_string() . '.',
                'Search Subject' => 'If a Search Subject is selected, a subject filter will not work.',
                'Stats' => 'Number Field: can ONLY be a number. No commas, or other text.',
                'Custom Media' => 'Use to override report image.',
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
        return 'Landing Pages';
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
                $new_default_fields_indexed = do_array_insert( $default_fields_indexed, $index, $field );
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
        global $do_site;
        $fields = [
            'accordion' => array_merge( $this->set_panel_default_fields(), [
                'Accordion Items' => 'accordion',
            ] ),
            'admin' => [
                'Hidden' => 'binary',
                'NoIndex' => 'binary',
                'Slug' => 'varchar',
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
            'archive' => array_merge( $this->set_panel_default_fields(), [
                'Post Type' => [
                    'type' => 'select_multiple',
                    'options' => 'do_get_public_post_types',
                ],
                'Subject' => new DO_CPT_Form_Field( 'select_multiple', 'do_subject', 'Title', 'Slug' ),
                'Region' => new DO_CPT_Form_Field( 'select', 'do_region', 'Title', 'Slug' ),
                'Posts Per Row' => 'per_row',
                'Slider' => 'binary',
                'Post Order' => 'varchar',
                'Max Posts' => 'number',
                'Modal' => 'binary',
                'CTA' => 'cta',
            ] ),
            'blocks' => array_merge( $this->set_panel_default_fields(), [
                'Blocks' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Media' => 'media',
                        'Icon / Logo' => 'binary',
                        'Title' => 'text',
                        'Copy' => 'html',
                        'CTA Text' => 'varchar',
                        'CTA URL' => 'url',
                        'CTA Modal' => 'binary_select',
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
                //'Slider' => 'binary',
                'CTA' => 'cta',
            ] ),
            'cta' => array_merge( $this->set_panel_default_fields(), [
                //'Icon' => 'media',
                'CTA' => 'cta',
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
                    'options' => 'do_get_public_post_types',
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
                'Overlay Hero?' => 'binary',
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
                'Hubspot Form Embed Code' => 'hubspot_code',
                'Form' => new DO_CPT_Form_Field( 'select', 'do_form', 'post_title', 'post_id' ),
                'Overlay Hero?' => 'binary',
            ] ),
            'hero' => [
                'Title' => 'text',
                //'Title No-Wrap' => 'binary',
                'Background' => 'background_hero',
                'Copy' => 'wp_editor',
                'Media' => 'media',
                'Image Link' => 'image_link',
                'CTA' => 'cta',
                'Promo' => [
                    'type' => 'multi',
                    'fields' => [
                        'Pretitle' => 'text',
                        'Headline' => 'html',
                        'URL' => 'url',
                        'Image' => 'media',
                        'Icon / Logo' => 'binary',
                    ],
                ],
                'Promo Countdown Date' => 'date_time_timezone',
            ],
            'iframe' => array_merge( $this->set_panel_default_fields(), [
                'Iframe' => 'html',
                'Defer' => 'binary',
                'Height / Width Ratio' => 'number',
            ] ),
            'linear-content' => array_merge( $this->set_panel_default_fields( [ 'Title', 'Copy', 'Background' ] ), [
                'Content Blocks' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Title' => 'varchar',
                        'Title Icon' => 'media',
                        'Heading' => 'text',
                        'Content' => 'html',
                        'Media' => 'media',
                        'CTA Text' => 'varchar',
                        'CTA URL' => 'url',
                    ],
                ],
            ] ),
            'logo-gallery' => array_merge( $this->set_panel_default_fields( [ 'Background' ] ), [
                'Logo Gallery' => [
                    'type' => 'post_browser',
                    'settings' => [
                        'post_types' => [ 'do_company' ],
                    ]
                ],
                'CTA' => 'cta',
            ] ),
            'media-tabs' => array_merge( $this->set_panel_default_fields( [ 'Title', 'Copy', 'Background' ] ), [
                'Tabs' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Nav Label' => 'varchar',
                        'Nav Label Icon' => 'media',
                        'ID' => 'varchar',
                        'Title' => 'text',
                        'Copy' => 'html',
                        'Media' => 'media',
                        'CTA Text' => 'varchar',
                        'CTA URL' => 'varchar',
                    ],
                ],
                'Tabs Orientation' => [
                    'type' => 'select',
                    'options' => [
                        'horizontal' => [
                            'label' => 'Horizontal (default)',
                            'value' => 'horizontal',
                        ],
                        'vertical' => [
                            'label' => 'Vertical',
                            'value' => 'vertical',
                        ],
                    ],
                ],
            ] ),
            'posts' => array_merge( $this->set_panel_default_fields(), [
                'Post Type' => [
                    'type' => 'select_multiple',
                    'options' => 'do_get_public_post_types',
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
                'CTA' => 'cta',
            ] ),
            'report' => array_merge( $this->set_panel_default_fields(), [
                'Post' => [
                    'type' => 'post_browser',
                    'settings' => [
                        'post_types' => [ 'do_white_paper', 'do_analyst_report' ],
                        'limit' => 1,
                    ]
                ],
                'Custom Media' => 'media',
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
                'CTA Text' => 'varchar',
                'CTA Style' => 'button_style',
            ] ),
            'search' => array_merge( $this->set_panel_default_fields(), [
                'Search Post Types' => [
                    'type' => 'select_multiple',
                    'options' => 'do_get_public_post_types',
                ],
                'Search Subject' => [
                    'type' => 'select',
                    'options' => 'do_subject',
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
                            'options' => 'do_get_post_types',
                        ],
                        'Meta Field' => 'varchar',
                    ],
                ],
                'Template Type' => [
                    'type' => 'select',
                    'options' => [
                        'block' => [
                            'label' => 'Block (default)',
                            'value' => 'block',
                        ],
                        'list' => [
                            'label' => 'List',
                            'value' => 'list',
                        ],
                        'search' => [
                            'label' => 'Search',
                            'value' => 'search',
                        ],
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
            'staff-bios' => array_merge( $this->set_panel_default_fields( [ 'Background' ] ), [
                'Staff' => 'staff_bios',
            ] ),
            'stats' => array_merge( $this->set_panel_default_fields( FALSE, [ 0 => [ 'Pre-Title' => 'text' ] ] ), [
                'Stats' => 'stats',
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
            ] ),
            'tabs' => array_merge( $this->set_panel_default_fields( [ 'Title', 'Background', 'Copy' ]), [
                'Tabs' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Nav Label' => 'varchar',
                        'Title' => 'text',
                        'Media' => 'media',
                        'Copy' => 'html',
                        'List' => 'text_array',
                        'CTA Text' => 'varchar',
                        'CTA URL' => 'varchar',
                        'CTA Modal' => 'binary_select',
                        'Related Title' => 'varchar',
                        'Related' => 'post_browser'
                    ],
                ],
                'Media Size' => 'image_size',
            ] ),
            'testimonial-carousel' => array_merge( $this->set_panel_default_fields( [ 'Copy' ] ), [
                'Testimonial Carousel' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Quote' => 'html',
                        'Author' => 'text',
                        'Author Company / Title' => 'text',
                        'Logo' => 'media',
                        'Stat' => 'text',
                        'Stat Description' => 'html',
                        'CTA Text' => 'varchar',
                        'CTA URL' => 'varchar',
                    ],
                ],
            ] ),
            'text' => array_merge( $this->set_panel_default_fields(), [
                'Overlay' => 'binary',
                'CTA' => 'cta',
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
                'CTA' => 'cta',
            ] ),
            'timeline' => array_merge( $this->set_panel_default_fields(), [
                'Timeline' => [
                    'type' => 'multi_array',
                    'fields' => [
                        'Year' => 'varchar',
                        'Title' => 'text',
                        'Description' => 'html',
                    ],
                ],
            ] ),
            'videos' => array_merge( $this->set_panel_default_fields(), [
                'Videos' => 'videos',
                'Videos Per Row' => 'per_row',
                'Slider' => 'binary',
                'Video Title Style' => [
                    'type' => 'select',
                    'options' => [
                        'blue-line' => [
                            'label' => 'Blue Line (default)',
                            'value' => 'blue-line',
                        ],
                        'plain' => [
                            'label' => 'Plain',
                            'value' => 'plain',
                        ],
                    ],
                ],
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
            'archive' => [
                'label' => 'Post Type Archive',
                'value' => 'archive',
            ],
            'blocks' => [
                'label' => 'Multi-Column Cards/Icon Grid',
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
            'linear-content' => [
                'label' => 'Animation Scroll',
                'value' => 'linear-content',
            ],
            'logo-gallery' => [
                'label' => 'Logo Gallery',
                'value' => 'logo-gallery',
            ],
            'media-tabs' => [
                'label' => 'Multi-Video',
                'value' => 'media-tabs',
            ],
            'posts' => [
                'label' => 'Posts',
                'value' => 'posts',
            ],
            'search' => [
                'label' => 'Search',
                'value' => 'search',
            ],
            'staff-bios' => [
                'label' => 'Staff Bios',
                'value' => 'staff-bios',
            ],
            'stats' => [
                'label' => 'Stats',
                'value' => 'stats',
            ],
            'tabs' => [
                'label' => 'Tabs',
                'value' => 'tabs',
            ],
            'testimonial-carousel' => [
                'label' => 'Testimonial Carousel',
                'value' => 'testimonial-carousel',
            ],
            'text' => [
                'label' => 'Overview Text',
                'value' => 'text',
            ],
            'text-media' => [
                'label' => '50/50',
                'value' => 'text-media',
            ],
            'timeline' => [
                'label' => 'Timeline',
                'value' => 'timeline',
            ],
            'videos' => [
                'label' => 'Videos',
                'value' => 'videos',
            ],
        ];
        return $panel_types;
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
        global $do_custom_post_types, $wpdb;
        $post_type_details = $do_custom_post_types[ get_post_field( 'post_type', $post_id ) ];
        // Manually set the guid
        $guid = home_url( ( $post_type_details->post_type_slug ? $post_type_details->post_type_slug . '/' : '' ) . get_post_field( 'post_name', $post_id ) . '/' );
        $wpdb->query( "UPDATE $wpdb->posts SET guid = '$guid' WHERE ID = $post_id;" );
        // Flush rewrite rules
        flush_rewrite_rules();
    }

    public function onsave( $POST, $cpt_obj ): array {
        if ( isset( $POST[ $this->meta_prefix() . '_slug' ] ) && $POST[ $this->meta_prefix() . '_slug' ] == 'home' ) {
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