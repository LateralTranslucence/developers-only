<?php
/* Class for creating custom post types */

abstract class DO_Custom_Post_Type {
    private static array $instances = [];
    private $admin_fields,
            $aftersave_callback,
            $all_meta_fields,
            $archive_redirect,
            $bonus_fields,
            $breadcrumbs = [],
            $character_count,
            $comment_status_callback,
            $comments,
            $current_user_can,
            $dynamic_interface,
            $dynamic_interface_configs,
            $dynamic_interface_payloads,
            $dynamic_interface_settings,
            $dynamic_interface_fields,
            $dynamic_interface_field_configuration,
            $has_archive,
            $hide_field,
            $is_landing_page,
            $menu_position,
            $meta_fields,
            $meta_prefix,
            $noindex,
            $notes,
            $onsave_callback,
            $orderby,
            $permalink,
            $post_content,
            $post_excerpt,
            $post_thumbnail,
            $post_title_array,
            $post_type_args,
            $post_type_details,
            $post_type_post_name,
            $post_type_post_title,
            $post_type_display_name,
            $pre_form_callback,
            $public,
            $restrict_users,
            $schema,
            $seo,
            $show_in_admin_bar,
            $single_redirect,
            $source_meta_fields,
            $show_in_menu;
    public  $post_type,
            $post_type_rest_slug,
            $post_type_slug;

    abstract protected function post_type();
    abstract protected function post_type_args();
    abstract protected function settings();
    abstract protected function meta_fields();
    abstract protected function admin_fields();
    
    /*
     * Class constructor
     *
     * */
    private function __construct() {
        //echo "__construct \n";
        $this->post_type = strtolower( str_replace( ' ', '_', $this->post_type() ) );
        
        if ( ! strlen( $this->post_type ) ) {
            trigger_error( 'Post Type is undefined.' );
            return;
        }

        // Set variables
        $this->post_type_args = $this->post_type_args();
        $post_type_array = explode( '_', $this->post_type );
        
        $this->all_meta_fields = [];
        $this->archive_redirect = FALSE;
        $this->bonus_fields = [];
        $this->comments = isset( $this->post_type_args['supports'] ) && is_array( $this->post_type_args['supports'] ) && in_array( 'comments', $this->post_type_args['supports'] ) ? TRUE : FALSE;
        $this->dynamic_interface_configs = [];
        $this->dynamic_interface_fields = [];
        $this->dynamic_interface_payloads = [];
        $this->has_archive = TRUE;
        $this->meta_prefix = strtolower( preg_replace('/[^\w\d_]/', '_', str_replace( '-', '', end( $post_type_array ) ) ) );
        $this->meta_fields = [];
        $this->noindex = FALSE;
        $this->permalink = FALSE;
        $this->post_type_display_name = ucfirst( end( $post_type_array ) );
        $this->post_type_slug = strtolower( preg_replace( '/[\s_]/', '-', end( $post_type_array ) ) );
        $this->post_type_rest_slug = $this->post_type_slug;
        $this->public = TRUE;
        $this->restrict_users = FALSE;
        $this->schema = [];
        $this->show_in_admin_bar = TRUE;
        $this->single_redirect = FALSE;
        $this->source_meta_fields = [];
        
        $user = wp_get_current_user();
        $this->current_user_can = in_array( 'administrator', $user->roles ) || in_array( 'editor', $user->roles ) || is_super_admin();

        // Set settings
        $settings_array = $this->settings();
        foreach ( $settings_array as $setting_name => $setting_value ) {
            $this->set_setting( $setting_name, $setting_value );
        }

        // Set post type details
        $this->set_post_type_details();

        // Set meta fields
        $meta_fields_array = $this->meta_fields();
        if ( $meta_fields_array ) {
            foreach ( $meta_fields_array as $box_name => $meta_fields ) {
                $this->set_meta_fields( $meta_fields, ( is_int( $box_name ) ? '' : $box_name ) );
            }
        }

        // Set admin fields
        $this->display_admin_fields( $this->admin_fields() );

        // Add action to register the post type, if the post type does not already exist
        if ( ! post_type_exists( $this->post_type ) ) {
            add_action( 'init', [ $this, 'register_post_type' ], 0 );
            // Add meta fields to rest API
            $this->rest_api();
        } else {
            add_action( 'init', [ $this, 'modify_post_type' ], 0 );
        }

        // Echo post type on admin screens (for reference)
        add_action( 'all_admin_notices', [ $this, 'post_type_info' ] );

        // iframe
        add_action( 'generate_rewrite_rules', [ $this, 'iframe' ], 10 );

        // Post permalink
        add_filter( 'post_type_link', [ $this, 'permalinks' ], 10, 3 );

        // Listen for the save post hook
        add_action( 'save_post', [ $this, 'save_post' ] );

        // Save Initial post data
        add_filter( 'wp_insert_post_data' , function( $data , $postarr ) {
            if ( $data['post_type'] == $this->post_type ) {
                // Set default title (will be overwritten later)
                if ( $postarr['ID'] && $postarr['post_title'] == 'Auto Draft' ) {
                    $data['post_title'] = $postarr['ID'];
                    $data['post_name'] = $postarr['ID'];
                }
            }
            return $data;
        } , '99', 2 );

        // Pre Get Posts hook
        add_action( 'pre_get_posts', [ $this, 'pre_get_posts' ], 0 );

        // the_post hook
        add_action( 'the_post', [ $this, 'the_post' ], 0 );

        // Query Vars hook for is_modified
        add_filter( 'query_vars', [ $this, 'query_vars' ] );

        // Admin Scripts
        add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );

        // Execute the child class construct() method, if it exists
        if ( method_exists( $this, 'construct' ) ) {
            $this->construct();
        }
    }

    public static function get_instance(): DO_Custom_Post_Type {
        $class = get_called_class();
        
        // Check if instance already exists
        if ( ! isset( self::$instances[ $class ] ) ) {
            self::$instances[ $class ] = new static();
        }
        
        return self::$instances[ $class ];
    }

    /*
    * Settings, alpha order
    *
    * */
    private function set_setting( $setting_name, $setting_value ) {
        //echo "set_setting \n";
        if ( empty( $setting_name ) ) {
            return;
        }

        switch ( $setting_name ) {
            // Admin Menu Icon
            case 'icon':
                add_action( 'admin_head', function() use( $setting_value ) {
                    echo '<style>#adminmenu li#menu-posts-'. $this->post_type .' div.wp-menu-image:before { content: "' . $setting_value . '"; }</style>' . "\n";
                } );
                break;

            // AfterSave callback
            case 'aftersave_callback':
                $this->aftersave_callback = $setting_value;
                break;

            // Archive redirect
            case 'archive_redirect':
                $this->archive_redirect = $setting_value;
            
            // Archive Slug
            case 'slug':
                $this->post_type_slug = is_string( $setting_value ) ? trim( strtolower( preg_replace( '/[\s_]/', '-', $setting_value ) ), '/' ) : $setting_value;
                $this->post_type_rest_slug = $this->post_type_slug;
                break;

            // Bonus Fields
            case 'bonus_fields':
                $this->bonus_fields = $setting_value;
                break;

            // Breadcrumbs
            case 'breadcrumbs':
                $breadcrumbs = [];
                foreach ( $setting_value as $text => $url ) {
                    $breadcrumbs[] = [
                        'text' => $text,
                        'url' => $url,
                    ];
                }
                $this->breadcrumbs = $breadcrumbs;
                break;

            // Character Count
            case 'character_count':
                $this->character_count = $setting_value;
                break;

            // Comments
            case 'comments':
                $this->comments = $setting_value;
                break;

            // Comment Status Callback
            case 'comment_status_callback':
                $this->comment_status_callback = $setting_value;
                break;

            // Display Name
            case 'display_name':
                $this->post_type_display_name = preg_replace( '/[^\w\d\s]/', '', $setting_value );
                break;

            // Dynamic Interface
            case 'dynamic_interface':
                $this->dynamic_interface = TRUE;
                $this->dynamic_interface_configs = $this->normalize_dynamic_interface_configs( $setting_value );
                $first_dynamic_interface_config = count( $this->dynamic_interface_configs ) ? current( $this->dynamic_interface_configs ) : FALSE;
                $this->dynamic_interface_settings = $first_dynamic_interface_config ? $first_dynamic_interface_config['settings'] : FALSE;
                $this->dynamic_interface_field_configuration = $first_dynamic_interface_config ? $first_dynamic_interface_config['field_configuration'] : FALSE;
                $this->dynamic_interface_fields = [];
                $this->dynamic_interface_payloads = [];
                break;

            // "Featured" field
            case 'featured_field':
                $this->bonus_fields['featured_post'] = devo_meta_field_key( $setting_value, $this->meta_prefix );
                break;

            // has_archive
            case 'has_archive':
                $this->has_archive = $setting_value;
                break;

            // "Hide" field
            case 'hide_field':
                $this->hide_field = $setting_value;
                $this->bonus_fields['hide_post'] = devo_meta_field_key( $this->hide_field, $this->meta_prefix );
                break;

            // is_landing_page
            case 'is_landing_page':
                $this->is_landing_page = $setting_value;
                break;

            // menu_position
            case 'menu_position':
                $this->menu_position = $setting_value;
                break;

            // Meta Prefix
            case 'meta_prefix':
                $this->meta_prefix = strtolower( preg_replace( '/[\s]/', '_', trim( $setting_value, '_' ) ) );
                break;

            // noindex
            case 'noindex':
                $this->noindex = $setting_value;
                break;

            // Notes
            case 'notes':
                $this->notes = $setting_value;
                break;

            // orderby
            case 'orderby':
                $this->orderby = $setting_value;
                break;
                
            // OnSave callback
            case 'onsave_callback':
                $this->onsave_callback = $setting_value;
                break;
                
            // Permalink Structure
            case 'permalink':
                $this->permalink = $setting_value;
                break;
                
            // Post Content
            case 'post_content':
                $this->post_content = $setting_value;
                break;
                
            // Post Excerpt
            case 'post_excerpt':
                $this->post_excerpt = $setting_value;
                break;
                
            // Post File
            case 'post_file':
                $this->bonus_fields['post_file'] = devo_meta_field_key( $setting_value, $this->meta_prefix );
                break;
                
            // Post Name
            case 'post_name':
                $this->post_type_post_name = is_array( $setting_value ) ? $setting_value : [ $setting_value ]; 
                break;
                
            // Post Thumbnail
            case 'post_thumbnail':
                $this->post_thumbnail = strpos( $setting_value, '||' ) ? explode( '||', $setting_value ) : [ $setting_value ];
                break;
                
            // Post Title
            case 'post_title':
                $this->post_type_post_title = is_array( $setting_value ) ? $setting_value : [ $setting_value ];
                $post_title_array = [];
                foreach ( $this->post_type_post_title as $title_field ) {
                    $post_title_array[] = devo_meta_field_key( $title_field, $this->meta_prefix );
                }
                $this->post_title_array = $post_title_array;
                break;
                
            // Pre Form Callback
            case 'pre_form_callback':
                $this->pre_form_callback = $setting_value;
                break;
                
            // Public
            case 'public':
                $this->public = $setting_value;
                if ( $this->public == FALSE ) {
                    $this->noindex = TRUE;
                }
                break;
                
            // Restrict Users
            case 'restrict_users':
                $this->restrict_users = is_array( $setting_value ) ? $setting_value : [ $setting_value ];
                // Super-admins always can, check everyone else
                if ( is_super_admin() ) {
                    $this->current_user_can = TRUE;
                } else {
                    // Restrict by default
                    $this->current_user_can = FALSE;
                    $user = wp_get_current_user();
                    foreach ( $this->restrict_users as $role ) {
                        // If the role is listed, grant access
                        if ( in_array( $role, $user->roles ) ) {
                            $this->current_user_can = TRUE;
                        }
                    }
                }
                break;
                
            // Rest Slug
            case 'rest_slug':
                $this->post_type_rest_slug = trim( strtolower( preg_replace( '/[\s_]/', '-', $setting_value ) ), '/' );
                break;
                
            // Schema Type
            case 'schema':
                $schema = [];
                if ( is_array( $setting_value ) ) {
                    foreach( $setting_value as $schema_key => $fields ) {
                        $field_options = strpos( $fields, '||' ) ? explode( '||', $fields ) : [ $fields ];
                        foreach ( $field_options as $field ) {
                            // If this is the @type, no conversion needed
                            if ( $schema_key === '@type' ) {
                                $schema[ $schema_key ] = $field;
                            }
                            // Default fields are fine as is
                            elseif ( in_array( $field, devo_default_fields_array() ) ) {
                                if ( isset( $schema[ $schema_key ] ) ) {
                                    $schema[ $schema_key ] = $schema[ $schema_key ] . '||' . $field;
                                } else {
                                    $schema[ $schema_key ] = $field;
                                }
                            }
                            // Otherwise convert the meta label into a key
                            else {
                                if ( isset( $schema[ $schema_key ] ) ) {
                                    $schema[ $schema_key ] = $schema[ $schema_key ] . '||' . devo_meta_field_key( $field, $this->meta_prefix );
                                } else {
                                    $schema[ $schema_key ] = devo_meta_field_key( $field, $this->meta_prefix );
                                }
                            }
                        }
                    }
                    $this->schema = $schema;
                }
                break;
                
            // SEO
            case 'seo':
                $this->seo = $setting_value;
                break;
                
            // show_in_admin_bar
            case 'show_in_admin_bar':
                $this->show_in_admin_bar = $setting_value;
                break;
                
            // show_in_menu
            case 'show_in_menu':
                $this->show_in_menu = $setting_value;
                break;
                
            // Single redirect
            case 'single_redirect':
                $this->single_redirect = $setting_value;
                break;
        }
    }

    // Add post type details to $devo_custom_post_types global
    private function set_post_type_details() {
        global $devo_custom_post_types;

        $this->post_type_details = new stdClass();
        
        $this->post_type_details->breadcrumbs = $this->breadcrumbs;
        $this->post_type_details->is_landing_page = $this->is_landing_page;
        $this->post_type_details->meta_prefix = $this->meta_prefix;
        $this->post_type_details->meta_fields = [];
        $this->post_type_details->post_content = $this->post_content;
        $this->post_type_details->post_excerpt = $this->post_excerpt;
        $this->post_type_details->post_file = isset( $this->bonus_fields['post_file'] ) ? $this->bonus_fields['post_file'] : null;
        $this->post_type_details->post_name = $this->post_type_post_name;
        $this->post_type_details->post_thumbnail = $this->post_thumbnail;
        $this->post_type_details->post_title = $this->post_title_array;
        $this->post_type_details->post_type = $this->post_type;
        $this->post_type_details->post_type_display_name = $this->post_type_display_name;
        $this->post_type_details->post_type_slug = $this->post_type_slug;
        $this->post_type_details->schema = $this->schema;
        $this->post_type_details->seo_description = $this->seo_description();
        $this->post_type_details->seo_image = $this->seo_image();
        $this->post_type_details->seo_title = $this->seo_title();

        $devo_custom_post_types[ $this->post_type ] = $this->post_type_details;
    }

    /*
     * Attaches meta boxes to the post type
     *
     * */
    public function set_meta_fields( $fields = [], $_title = '', $action = 'overwrite' ) {
        //echo "meta_fields \n";
        global $devo_custom_post_types;       
        // Meta box variables
        $box_title = strlen( $_title ) ? $_title : $this->post_type_display_name;
        $box_id = $this->meta_box_id( $this->post_type, $box_title );
        $this->source_meta_fields[ $box_id ] = isset( $this->source_meta_fields[ $box_id ] ) && $action == 'merge' ? array_merge( $this->source_meta_fields[ $box_id ], $fields ) : $fields;
        $this->meta_fields = $this->source_meta_fields;
        $this->all_meta_fields = array_merge( $this->all_meta_fields, $fields, ( $this->bonus_fields ? $this->bonus_fields : [] ) );
        // Loop though meta fields and add to $devo_custom_post_types global
        foreach ( $this->source_meta_fields[ $box_id ] as $field_label => $field_details ) {
            $devo_custom_post_types[ $this->post_type ]->meta_fields[ devo_meta_field_key( $field_label, $this->meta_prefix ) ] = $field_details;
        }
        
        // If this isn't the admin, we can leave now
        if ( ! is_admin() || empty( $fields ) ) {
            return;
        }
        // Display meta box
        add_action( 'add_meta_boxes_' . $this->post_type, function( $post ) use( $box_id, $box_title ) {
            if ( $this->dynamic_interface ) {
		        $this->dynamic_interface_setup( $post );
		    }
		    if ( isset( $this->meta_fields[ $box_id ] ) ) {
    			$this->add_meta_box( $box_id, $box_title );
            }
        } );
    }

    /* Registers the post type */
    public function register_post_type() {
        //devo_var_dump('register_post_type');

        // Capitilize the words and make it plural
        $plural = devo_pluralize( $this->post_type_display_name );
        // Set the default labels based on the post type name and plural.
        //
        // The post type's own display name is site-specific data, not a fixed
        // theme string, so it is never wrapped in __() - a variable can't be
        // extracted into the POT and translating one does nothing at runtime.
        // Labels that surround it with English words use a sprintf() template
        // instead, so the translatable part is a real literal.
        $labels = [
            // general name for the post type, usually plural. The same as, and overridden by $post_type_object->label
            'name' => $plural,
            // name for one object of this post type. Defaults to value of 'name'.
            'singular_name' => $this->post_type_display_name,
            // the menu name text. This string is the name to give menu items. Defaults to value of 'name'.
            'menu_name' => $plural,
            //'name_admin_bar' => // name given for the "Add New" dropdown on admin bar. Defaults to 'singular_name' if it exists, 'name' otherwise.
            // the all items text used in the menu. Default is the value of 'name'.
            'all_items' => $plural,
            //'add_new' => 'Add New', // the add new text. The default is "Add New" for both hierarchical and non-hierarchical post types.
            /* translators: %s: singular post type name, e.g. "Case Study". */
            'add_new_item' => sprintf( __( 'Add New %s', 'developers_only' ), $this->post_type_display_name ),
            /* translators: %s: singular post type name, e.g. "Case Study". */
            'edit_item' => sprintf( __( 'Edit %s', 'developers_only' ), $this->post_type_display_name ),
            /* translators: %s: singular post type name, e.g. "Case Study". */
            'new_item' => sprintf( __( 'New %s', 'developers_only' ), $this->post_type_display_name ),
            /* translators: %s: singular post type name, e.g. "Case Study". */
            'view_item' => sprintf( __( 'View %s', 'developers_only' ), $this->post_type_display_name ),
            /* translators: %s: plural post type name, e.g. "Case Studies". */
            'search_items' => sprintf( __( 'Search %s', 'developers_only' ), $plural ),
            /* translators: %s: lowercase plural post type name, e.g. "case studies". */
            'not_found' => sprintf( __( 'No %s found', 'developers_only' ), strtolower( $plural ) ),
            /* translators: %s: lowercase plural post type name, e.g. "case studies". */
            'not_found_in_trash' => sprintf( __( 'No %s found in Trash', 'developers_only' ), strtolower( $plural ) ),
            /* translators: %s: lowercase singular post type name, e.g. "case study". */
            'parent_item_colon' => sprintf( __( 'Parent %s', 'developers_only' ), strtolower( $this->post_type_display_name ) ),
        ];
        if ( isset( $this->post_type_args['labels'] ) ) {
            $labels = array_merge( $labels, $this->post_type_args['labels'] );
            unset( $this->post_type_args['labels'] );
        }
        // Set defaults and overwrite them with any given arguments
        $default_args = [
            'labels' => $labels,
            'public' => $this->public,
            'has_archive' => $this->has_archive,
            'rewrite' => [ 'slug' => $this->post_type_slug ],
            'supports' => FALSE,
            'menu-icon' => '',
            'exclude_from_search' => ! $this->public,
            'publicly_queryable' => TRUE,
            'show_in_nav_menus' => FALSE,
            'delete_with_user' => FALSE,
            'show_in_rest' => TRUE,
            'rest_base' => $this->post_type_rest_slug,
            'show_in_admin_bar' => $this->show_in_admin_bar,
        ];
        // Set visibility based on $this->current_user_can
        if ( $this->current_user_can ) {
            $default_args['show_in_nav_menus'] = TRUE;
            $default_args['show_ui'] = TRUE;
        } else {
            $default_args['show_in_nav_menus'] = FALSE;
            $default_args['show_ui'] = FALSE;
        }

        // Add show_in_menu if set
        if ( $this->show_in_menu ) {
            $default_args['show_in_menu'] = $this->show_in_menu;
        }

        // Add menu_position if set
        if ( $this->menu_position ) {
            $default_args['menu_position'] = $this->menu_position;
        }
        $args = array_merge(
            // Default
            $default_args,
            // Given args
            $this->post_type_args
        );
        
        // Register the post type
        register_post_type( $this->post_type, $args );

        // Single
        if ( $this->single_redirect ) {
            $single_redirect = new DO_Redirect( ( $this->post_type_slug ? $this->post_type_slug : '' ) . '/[slug]', $this->single_redirect, 301 );
        } else {
            if ( $this->has_archive ) {
                add_rewrite_rule( ( $this->post_type_slug ? $this->post_type_slug : '' ) . '/([^/]+)$', 'index.php?post_type=' . $this->post_type . '&name=$matches[1]', 'top' );
                add_rewrite_rule( ( $this->post_type_slug ? $this->post_type_slug : '' ) . '/([^/]+)/page/?([0-9]{1,})/?$', 'index.php?post_type=' . $this->post_type . '&name=$matches[1]&paged=$matches[2]', 'top' );
            }
        }

        // Archive
        if ( $this->archive_redirect && $this->post_type_slug ) {
            $archive_redirect = new DO_Redirect( $this->post_type_slug, $this->archive_redirect, 302 );
        }
    }

    /* Modifies an existing post type */
    public function modify_post_type() {
        //echo "modify_post_type \n";

        $default_args = (array) get_post_type_object( $this->post_type );
        // Set visibility based on $this->current_user_can
        if ( $this->current_user_can ) {
            $default_args['show_in_nav_menus'] = TRUE;
            $default_args['show_ui'] = TRUE;
        } else {
            $default_args['show_in_nav_menus'] = FALSE;
            $default_args['show_ui'] = FALSE;
        }
        $args = array_merge(
            // Default
            $default_args,
            // Given args
            $this->post_type_args
        );
        // Register the post type
        register_post_type( $this->post_type, $args );
    }

    public function add_meta_box( $box_id, $box_title, $priority = 'high', $array_i = FALSE ) {
        add_meta_box(
            $box_id,
            $box_title,
            function( $post, $data ) use( $box_id, $box_title, $array_i ) {
                $dynamic_interface_payload = $this->dynamic_interface ? $this->get_dynamic_interface_payload_for_box( $box_title, $post ) : FALSE;
                $dynamic_interface_settings = $dynamic_interface_payload ? $dynamic_interface_payload['settings'] : [];
                // Pre-Form Callback
                if ( isset( $this->pre_form_callback ) ) {
                    // Method
                    if ( is_array( $this->pre_form_callback ) && isset( $this->pre_form_callback[0] ) && isset( $this->pre_form_callback[1] ) ) {
                        $obj = $this->pre_form_callback[0];
                        $callback = $this->pre_form_callback[1];
                        if ( method_exists( $obj, $callback ) ) {
                            call_user_func( [ $obj, $callback ], $post );
                        }
                    }
                    // Function
                    else if ( function_exists( $this->pre_form_callback ) ) {
                        call_user_func( $this->pre_form_callback, $post );
                    }
                    // It's just text
                    else {
                        echo devo_autop( $this->pre_form_callback );
                    }
                }
                // Dynamic Interface vars
                $default_meta_boxes = isset( $dynamic_interface_settings['default_meta_boxes'] ) ? ( is_array( $dynamic_interface_settings['default_meta_boxes'] ) ? $dynamic_interface_settings['default_meta_boxes'] : [ $dynamic_interface_settings['default_meta_boxes'] ] ) : FALSE;
                $is_default_meta_box = $default_meta_boxes && in_array( $box_title, $default_meta_boxes );
                $dynamic_meta_box_name = isset( $dynamic_interface_settings['dynamic_meta_box'] ) ? $dynamic_interface_settings['dynamic_meta_box'] : FALSE;
                $dynamic_interface_type = isset( $dynamic_interface_settings['type'] ) ? $dynamic_interface_settings['type'] : 'default';
                $delete_button = $dynamic_interface_type == 'array' && ! $is_default_meta_box;
                ?>
                <?php if ( $delete_button ) : ?>
                    <?php /* translators: %s: name of the repeatable meta box, e.g. "Panel". */ ?>
                    <span class="dynamic-delete-button button"><?php printf( __( 'Delete %s', 'developers_only' ), $dynamic_meta_box_name ) ?></span>
                <?php endif; ?>
                <?php if ( $box_id == current( array_keys( $this->meta_fields ) ) ) : ?>
                    <input type="hidden" name="meta_box_title" value="<?php echo $box_title ?>">
                    <input type="hidden" name="<?php echo $box_id ?>_nonce" value="<?php echo wp_create_nonce( $box_id ) ?>">
                <?php endif; ?>
                <div class="<?php echo $this->post_type_slug ? $this->post_type_slug : sanitize_title_with_dashes( $this->post_type_display_name ) ?>-post-meta post-meta-items <?php echo $box_id ?>">
                <?php
                // Loop through $this->meta_fields
                foreach ( $this->meta_fields[ $box_id ] as $label => $settings ) :
                    $meta_field_key  = $dynamic_interface_type == 'array' && $array_i !== FALSE ? devo_meta_field_key( $label . ' ' . $array_i, $this->meta_prefix ) : devo_meta_field_key( $label, $this->meta_prefix );
                    $field_settings = [ 'value_source' => $post->ID ];
                    $form_field_class = FALSE;
                    $field_options = FALSE;
                    // If using DO_CPT_Form_Field
                    if ( is_a( $settings, 'DO_CPT_Form_Field' ) ) {
                        $type = $settings;
                        $form_field_class = TRUE;
                    }
                    elseif ( is_array( $settings ) ) {
                        // Method callback
                        if ( isset( $settings[0] ) ) {
                            if ( isset( $settings[1] ) && strpos( $settings[1], '_callback' ) ) {
                                $obj = $settings[0];
                                $type = $settings[1];
                            }
                        }
                        // Something with an array of settings
                        elseif ( isset( $settings['type'] ) ) {
                            // Manual field (value is set in the post type)
                            if ( $settings['type'] == 'manual' ) {
                                $type = 'read_only';
                                $field_settings['force_value'] = $settings['value'];
                            }
                            // Normal field
                            else {
                                $type = $settings['type'];
                                $field_options = devo_field_options( isset( $settings['options'] ) ? $settings['options'] : $settings );
                                $field_settings = array_merge( $settings, $field_settings );
                                unset( $field_settings['type'] );
                            }
                        }
                    }
                    // A plain ol' field
                    else {
                        $type = $settings;
                    }
                    $title_is_label = $type != 'radio' && $type != 'checkbox';
                    $count_characters = $this->character_count && isset( $this->character_count[ $label ] ) && is_int( $this->character_count[ $label ] ) ? $this->character_count[ $label ] : FALSE;
                    if ( $type !== 'hidden' ) : ?>
                        <div class="<?php echo $meta_field_key ?> <?php echo sanitize_title_with_dashes( $label ) ?>-label <?php echo is_string( $type ) ? ' ' . $type . '-type' : '' ?><?php echo $count_characters ? ' count-characters' : '' ?>"<?php echo $count_characters ? ' data-character-limit="' . $count_characters . '"' : '' ?>>
                            <div class="post-meta-label">
                                <?php if ( $title_is_label ): ?><label for="<?php echo $meta_field_key ?>"><?php endif; ?>
                                    <?php // Field labels come from each post type's meta_fields() config, not from
                                    // a fixed string table, so there is nothing for gettext to extract here.
                                    echo trim( preg_replace( '/<(.*?)>/', '', $label ) ) ?>:
                                <?php if ( $title_is_label ): ?></label><?php endif; ?>
                            </div>
                            <div class="post-meta-content">
                                <?php if ( isset( $this->notes[ $label ] ) ) : ?>
                                    <span class="red small"><?php echo $this->notes[ $label ] ?></span>
                                <?php endif;

                                // Character Count Info
                                if ( $count_characters ) : ?>
                                    <span class="character-count-info">
                                        <span class="statement">Maximum <?php echo $count_characters ?> characters</span>
                                        <span class="status"><span class="number"><?php echo $count_characters ?></span> characters remaining</span>
                                    </span>
                                <?php endif;

                                // If using DO_CPT_Form_Field
                                if ( $form_field_class ) {
                                    $callback = $type->callback;
                                    call_user_func( $callback , $post->ID, 'edit', FALSE, $meta_field_key );
                                }
                                // If custom callback
                                elseif ( strpos( $type, '_callback' ) !== FALSE ) {
                                    $callback = $type;
                                    if ( isset( $obj ) ) {
                                        if ( method_exists( $obj, $callback) ) {
                                            call_user_func( [ $obj, $callback ], $post->ID, 'edit', FALSE, $meta_field_key );
                                        }
                                    } else {
                                        if ( function_exists( $callback) ) {
                                            call_user_func( $callback , $post->ID, 'edit', FALSE, $meta_field_key );
                                        }
                                    }
                                }
                                // Just show me the field
                                else {
                                    echo $this->meta_fields_display( $type, $meta_field_key, $field_options, $field_settings );
                                } ?>
                            </div>
                        </div>
                    <?php endif;?>
                <?php endforeach; ?>
                <?php if ( $dynamic_meta_box_name && $is_default_meta_box && current( $default_meta_boxes ) == $box_title ) : ?>
                    <div class="add-panel">
                        <span>
                            <input id="dynamic-add-number" type="number" min="1" step="1" value="1">
                            <?php /* translators: %s: name of the repeatable meta box, e.g. "Panel". */ ?>
                            <span id="dynamic-add-button" class="button"><?php printf( __( 'Add %s', 'developers_only' ), $dynamic_meta_box_name ) ?></span>
                            <span id="dynamic-add-field">
                                <?php 
                                $count_field_key = devo_meta_field_key( $dynamic_meta_box_name . ' Count', $this->meta_prefix );
                                echo $this->meta_fields_display( 'hidden', $count_field_key, FALSE, [ 'value_source' => $post->ID ] ) ?>
                                <br><span class="footnote"><?php echo $count_field_key ?></span>
                            </span>
                        </span>
                    </div>
                <?php endif; ?>
                </div>
                <div class="scroll-to" id="<?php echo $box_id ?>_scroll"></div>
                <?php
            },
            $this->post_type,
            'normal',
            $priority,
            [ $this->meta_fields[ $box_id ] ]
        );
    }

    private function normalize_dynamic_interface_configs( $setting_value ): array {
        if ( ! is_array( $setting_value ) || ! count( $setting_value ) ) {
            return [];
        }

        $configs = isset( $setting_value['settings'] ) || isset( $setting_value['field_configuration'] ) ? [ $setting_value ] : $setting_value;

        return array_values( array_filter( array_map( [ $this, 'normalize_dynamic_interface_config' ], $configs ) ) );
    }

    private function normalize_dynamic_interface_config( $config ) {
        if ( ! is_array( $config ) ) {
            return FALSE;
        }

        $settings = isset( $config['settings'] ) && is_array( $config['settings'] ) ? $config['settings'] : [];
        $settings['type'] = isset( $settings['type'] ) ? $settings['type'] : 'default';

        if ( isset( $settings['default_meta_boxes'] ) && ! is_array( $settings['default_meta_boxes'] ) ) {
            $settings['default_meta_boxes'] = [ $settings['default_meta_boxes'] ];
        }

        if ( isset( $settings['dynamic_meta_box_title_field'] ) && is_string( $settings['dynamic_meta_box_title_field'] ) ) {
            $settings['dynamic_meta_box_title_field'] = devo_meta_field_key(
                $settings['dynamic_meta_box_title_field'] . ( $settings['type'] === 'array' ? ' ' : '' ),
                $this->meta_prefix
            );
        }

        return [
            'settings' => $settings,
            'field_configuration' => isset( $config['field_configuration'] ) && is_array( $config['field_configuration'] ) ? $config['field_configuration'] : [],
        ];
    }

    private function get_dynamic_interface_payload_for_box( $box_title, $post = FALSE ) {
        if ( ! count( $this->dynamic_interface_payloads ) && $post ) {
            $this->dynamic_interface_setup( $post );
        }

        foreach ( $this->dynamic_interface_payloads as $dynamic_interface_payload ) {
            $box_titles = isset( $dynamic_interface_payload['box_titles'] ) && is_array( $dynamic_interface_payload['box_titles'] ) ? $dynamic_interface_payload['box_titles'] : [];
            if ( in_array( $box_title, $box_titles, TRUE ) ) {
                return $dynamic_interface_payload;
            }
        }

        return FALSE;
    }

    /*
     * Dynamic Interface
     * Modify $this->meta_fields based on dynamic interface settings
     *
     * */
    private function dynamic_interface_setup( $post, $context = 'interface' ) {
        if ( ! $this->dynamic_interface || ! count( $this->dynamic_interface_configs ) ) {
            return;
        }

        $this->meta_fields = $this->source_meta_fields;
        $this->dynamic_interface_fields = [];
        $this->dynamic_interface_payloads = [];

        foreach ( $this->dynamic_interface_configs as $dynamic_interface_config ) {
            $dynamic_interface_settings = $dynamic_interface_config['settings'];
            $dynamic_interface_field_configuration = $dynamic_interface_config['field_configuration'];
            $dynamic_interface_config_fields = [];
            $dynamic_interface_payload_settings = $dynamic_interface_settings;
            $dynamic_interface_box_titles = isset( $dynamic_interface_settings['default_meta_boxes'] ) && is_array( $dynamic_interface_settings['default_meta_boxes'] ) ? $dynamic_interface_settings['default_meta_boxes'] : [];
            
            // Show meta boxes based on field value (default)
            switch ( $dynamic_interface_settings['type'] ) {
            case 'default':
                $interface_configuration = [];
                $nested = isset( $dynamic_interface_settings['nested'] ) && $dynamic_interface_settings['nested'] !== FALSE ? $dynamic_interface_settings['nested'] : FALSE;
                if ( $nested ) {
                    $dynamic_box_name = $dynamic_interface_settings['dynamic_meta_box'];
                    $box_id = $this->meta_box_id( $this->post_type, $dynamic_box_name );
                    if ( isset( $this->meta_fields[ $this->meta_box_id( $this->post_type, $dynamic_box_name ) ] ) ) {
                        $meta_fields = $this->meta_fields[ $this->meta_box_id( $this->post_type, $dynamic_box_name ) ];
                        $nested_field_key = devo_meta_field_key( $nested, $this->meta_prefix );
                        $nested_field_value = $context == 'interface' ? devo_get_post_meta( $post->ID, $nested_field_key ) : ( isset( $post[ $nested_field_key ] ) ? $post[ $nested_field_key ] : FALSE );
                        $dynamic_interface_box_titles[] = $dynamic_box_name;
                        // Add all nested field values to interface settings (for use in JS)
                        $dynamic_interface_payload_settings['nested_field_options'] = $this->all_meta_fields[ $dynamic_interface_settings['nested'] ];
                        $dynamic_interface_payload_settings['nested_field_key'] = $nested_field_key;
                        if ( $nested_field_value && isset( $dynamic_interface_field_configuration[ $nested ][ $nested_field_value ] ) ) {
                            $meta_fields = array_merge( $meta_fields, $dynamic_interface_field_configuration[ $nested ][ $nested_field_value ] );
                        }
                        $this->meta_fields[ $box_id ] = $meta_fields;
                        // For JS localization
                        $dynamic_interface_config_fields[] = $nested_field_key;
                    }
                } else {
                    // Organize the fields/boxes
                    foreach ( $dynamic_interface_field_configuration as $field_label => $configuration ) {
                        $field_key = devo_meta_field_key( $field_label, $this->meta_prefix );
                        $field_taxonomy = $this->is_taxonomy( $field_label );
                        if ( $field_taxonomy ) {
                            $field_value = $context == 'interface' ? implode( ';', wp_list_pluck( wp_get_post_terms( $post->ID, $field_taxonomy ), 'term_id' ) ) : ( isset( $post[ $field_taxonomy ] ) ? $post[ $field_taxonomy ] : FALSE );
                        } else {
                            $field_value = $context == 'interface' ? devo_get_post_meta( $post->ID, $field_key ) : ( isset( $post[ $field_key ] ) ? $post[ $field_key ] : FALSE );
                        }
                        foreach ( $configuration as $value => $meta_box ) {
                            $dynamic_interface_box_titles[] = $meta_box;
                            $interface_configuration[ $meta_box ][] = $value == $field_value;
                        }
                        // For JS localization
                        $dynamic_interface_config_fields[] = $field_taxonomy ? $field_taxonomy : $field_key;
                    }
                    // Remove the boxes that shouldn't show
                    foreach ( $interface_configuration as $meta_box_name => $bools ) {
                        if ( ! in_array( TRUE, $bools ) ) {
                            unset( $this->meta_fields[ $this->meta_box_id( $this->post_type, $meta_box_name ) ]);
                        }
                    }
                }
                break;
            case 'array':
                $dynamic_box_name = $dynamic_interface_settings['dynamic_meta_box'];
                $this->bonus_fields = isset( $this->bonus_fields ) && $this->bonus_fields ? array_merge( $this->bonus_fields, [ devo_meta_field_key( $dynamic_box_name . ' Count', $this->meta_prefix ) => 'int' ] ) : [ devo_meta_field_key( $dynamic_box_name . ' Count', $this->meta_prefix ) => 'int' ];
                // Set up $this->meta_fields
                if ( isset( $this->meta_fields[ $this->meta_box_id( $this->post_type, $dynamic_box_name ) ] ) ) {
                    $count_field = $context == 'interface' ? devo_get_post_meta( $post->ID, devo_meta_field_key( $dynamic_box_name . ' Count', $this->meta_prefix ) ) : $post[ devo_meta_field_key( $dynamic_box_name . ' Count', $this->meta_prefix ) ];
                    $how_many = strlen( $count_field ) ? (int) $count_field : 0;
                    $nested = isset( $dynamic_interface_settings['nested'] ) && $dynamic_interface_settings['nested'] !== FALSE ? $dynamic_interface_settings['nested'] : FALSE;
                    if ( $nested ) {
                        // Add all nested field values to interface settings (for use in JS)
                        $dynamic_interface_payload_settings['nested_field_options'] = $this->all_meta_fields[ $dynamic_interface_settings['nested'] ];
                        $dynamic_interface_payload_settings['nested_field_key'] = devo_meta_field_key( $nested . ' ', $this->meta_prefix );
                    }
                    for ( $i = 0; $i < $how_many; $i++ ) {
                        $box_name = $dynamic_box_name . ' ' . ( $i + 1 );
                        $box_id = $this->meta_box_id( $this->post_type, $box_name );
                        $meta_fields = $this->source_meta_fields[ $this->meta_box_id( $this->post_type, $dynamic_box_name ) ];
                        $dynamic_interface_box_titles[] = $box_name;
                        if ( $nested ) {
                            $nested_field_key = devo_meta_field_key( $nested . ' ' . ( $i + 1 ), $this->meta_prefix );
                            $nested_field_value = $context == 'interface' ? devo_get_post_meta( $post->ID, $nested_field_key ) : ( isset( $post[ $nested_field_key ] ) ? $post[ $nested_field_key ] : FALSE );
                            if ( $nested_field_value && isset( $dynamic_interface_field_configuration[ $nested ][ $nested_field_value ] ) ) {
                                $meta_fields = array_merge( $meta_fields, $dynamic_interface_field_configuration[ $nested ][ $nested_field_value ] );
                            }
                            // For JS localization
                            $dynamic_interface_config_fields[] = $nested_field_key;
                        }
                        $this->meta_fields[ $box_id ] = $meta_fields;
                        if ( function_exists( 'add_meta_box' ) ) {
                            $this->add_meta_box( $box_id, $box_name, 'low', ( $i + 1 ) );
                        }
                    }
                    unset( $this->meta_fields[ $this->meta_box_id( $this->post_type, $dynamic_box_name ) ] );
                }
                break;
            case 'nested':
                $dynamic_box_name = $dynamic_interface_settings['dynamic_meta_box'];
                $nested = isset( $dynamic_interface_settings['nested'] ) && $dynamic_interface_settings['nested'] !== FALSE ? $dynamic_interface_settings['nested'] : FALSE;
                $box_id = $this->meta_box_id( $this->post_type, $dynamic_box_name );
                if ( $nested ) {
                    $nested_field_key = devo_meta_field_key( $nested . ' ', $this->meta_prefix );
                    $dynamic_interface_box_titles[] = $dynamic_box_name;
                    // Add all nested field values to interface settings (for use in JS)
                    $dynamic_interface_payload_settings['nested_field_key'] = $nested_field_key;
                    $dynamic_interface_payload_settings['nested_field_options'] = $this->all_meta_fields[ $dynamic_interface_settings['nested'] ];
                    $meta_fields = $this->meta_fields[ $this->meta_box_id( $this->post_type, $dynamic_box_name ) ];
                    $nested_field_value = $context == 'interface' ? devo_get_post_meta( $post->ID, $nested_field_key ) : ( isset( $post[ $nested_field_key ] ) ? $post[ $nested_field_key ] : FALSE );
                    if ( $nested_field_value && isset( $dynamic_interface_field_configuration[ $nested ][ $nested_field_value ] ) ) {
                        $meta_fields = array_merge( $meta_fields, $dynamic_interface_field_configuration[ $nested ][ $nested_field_value ] );
                    }
                    $this->meta_fields[ $box_id ] = $meta_fields;
                    // For JS localization
                    $dynamic_interface_config_fields[] = $nested_field_key;
                }
                break;
            }

            $dynamic_interface_config_fields = array_values( array_unique( $dynamic_interface_config_fields ) );
            $dynamic_interface_box_titles = array_values( array_unique( $dynamic_interface_box_titles ) );
            $this->dynamic_interface_fields = array_values( array_unique( array_merge( $this->dynamic_interface_fields, $dynamic_interface_config_fields ) ) );
            $this->dynamic_interface_payloads[] = [
                'fields' => $dynamic_interface_config_fields,
                'settings' => $dynamic_interface_payload_settings,
                'box_titles' => $dynamic_interface_box_titles,
            ];
        }
    }

    /*
     * Admin
     *
     * */
    public function admin_enqueue_scripts() {
        global $wp_query;
        if ( ( isset( $wp_query->query_vars['post_type'] ) && $wp_query->query_vars['post_type'] == $this->post_type ) || ( isset( $_REQUEST['post_type'] ) && $_REQUEST['post_type'] == $this->post_type ) || ( isset( $_REQUEST['post'] ) && get_post_type( $_REQUEST['post'] ) == $this->post_type ) ) {
            if ( $this->dynamic_interface ) {
                if ( isset( $_REQUEST['post'] ) ) {
                    $this->dynamic_interface_setup( get_post( $_REQUEST['post'] ) );
                }
                $dynamic_interface_settings = count( $this->dynamic_interface_payloads ) === 1 ? current( $this->dynamic_interface_payloads ) : [ 'interfaces' => $this->dynamic_interface_payloads ];
                wp_localize_script( 'devo-admin', 'dynamic_interface_settings', $dynamic_interface_settings );
            }
        }
    }

    // Admin Display
    public function display_admin_fields( $admin_fields = [] ) {
        //echo "admin_fields \n";
        if ( ! is_admin() || ! $admin_fields || ! count( $admin_fields ) ) {
            return;
        }
        // Vars
        $this->admin_fields = $admin_fields;

        // Admin Columns Header
        add_filter( 'manage_edit-' . $this->post_type . '_columns', [ $this, 'admin_columns' ] );

        // Admin Columns Content
        add_action( 'manage_' . $this->post_type . '_posts_custom_column', [ $this, 'admin_columns_content' ], 10, 2 );

        // SORT BY CUSTOM FIELDS
        // make sortable
        add_filter( 'manage_edit-' . $this->post_type . '_sortable_columns', function( $columns ) {
            foreach ( $this->admin_fields as $admin_field_title ) {
                if ( ! in_array( $admin_field_title, [ 'title', 'post_date', 'author' ] ) ) {
                    $meta_field_key = strpos( $admin_field_title, 'taxonomy_' ) === FALSE ? devo_meta_field_key( $admin_field_title, $this->meta_prefix ) : $admin_field_title;
                    $columns[ $meta_field_key ] = $meta_field_key;
                }
            }
            return $columns;
        } );
        // Only run our customization on the 'edit.php' page in the admin
        add_action( 'load-edit.php', function() {
            add_filter( 'request', function( $vars ) {
                if ( isset( $vars['post_type'] ) && $this->post_type == $vars['post_type'] ) {
                    // For each meta field
                    foreach ( $this->admin_fields as $admin_field_title ) {
                        if ( isset( $this->all_meta_fields[ $admin_field_title ] ) && ! in_array( strtolower( $admin_field_title ), [ 'title', 'post_date', 'tools', 'post_name', 'comments', 'author' ] ) && strpos( $admin_field_title, 'taxonomy_' ) === FALSE ) {
                            $meta_field_key = devo_meta_field_key( $admin_field_title, $this->meta_prefix );
                            $orderby = in_array( $this->all_meta_fields[ $admin_field_title ], [ 'number', 'binary', 'dollars', 'year', 'date', 'date_time', 'int' ] ) ? 'meta_value_num' : 'meta_value';
                            if ( isset( $vars['orderby'] ) && $meta_field_key == $vars['orderby'] ) {
                                $vars = array_merge(
                                    $vars,
                                    [
                                        'meta_key' => $meta_field_key,
                                        'orderby' => $orderby
                                    ]
                                );
                            }
                        }
                    }
                }
                return $vars;
            } );
        } );

    }

    // Creates column heads in the admin table
    public function admin_columns( $columns ) {
        $new_columns['cb'] = '<input type="checkbox">';
        foreach ( $this->admin_fields as $admin_field_title ) {
            // Some default WordPress fields
            if ( 'title' == strtolower( $admin_field_title ) ) {
                $new_columns['title'] = _x( 'Title', 'column name', 'developers_only' );
            } elseif ( 'post_date' == strtolower( $admin_field_title ) ) {
                $new_columns['date'] = _x( 'Date', 'column name', 'developers_only' );
            } elseif ( 'author' == strtolower( $admin_field_title ) ) {
                $new_columns['author'] = _x( 'Author', 'column name', 'developers_only' );
            } elseif ( 'comments' == strtolower( $admin_field_title ) ) {
                $new_columns['comments'] = '<span><span class="vers comment-grey-bubble" title="Comments"><span class="screenReader">' . _x( 'Comments', 'column name', 'developers_only' ) . '</span></span></span>';
            }
            // A tool bar (probably because we aren't showing the title)
            elseif ( 'tools' == strtolower( $admin_field_title ) ) {
                $new_columns['tools'] = _x( 'Tools', 'column name', 'developers_only' );
            }
            // A meta field
            else {
                $meta_field_key = devo_meta_field_key( $admin_field_title, $this->meta_prefix );
                $new_columns[ $meta_field_key ] = _x( ucwords( $admin_field_title ), 'column name' );
            }
        }
        return $new_columns;
    }

    // Populates column content in admin table
    public function admin_columns_content( $column_name, $post_id ) {
        foreach ( $this->admin_fields as $admin_field_title ) {
            // Make sure it's not a standard WordPress field
            if ( ( isset( $this->all_meta_fields[ $admin_field_title ] ) || strtolower( $admin_field_title ) == 'tools' ) && ! in_array( strtolower( $admin_field_title ), [ 'title', 'post_date', 'comments', 'author' ] ) ) {
                $meta_field_key = devo_meta_field_key( $admin_field_title, $this->meta_prefix );
                // Check that this is a field we want to show
                if ( $column_name == $meta_field_key || $column_name == strtolower( $admin_field_title ) ) {
                    $meta_value = devo_get_post_meta( $post_id, $meta_field_key );
                    // Tools
                    if ( strtolower( $admin_field_title ) == 'tools' ) {
                        echo '<div class="row-actions visible">';
                        if ( current_user_can( 'edit_post', $post_id ) ) {
                            echo '<span class="edit"><a href="' . home_url( '/wp-admin/post.php?post=' . $post_id . '&action=edit', 'relative' ) . '">Edit</a> | </span>';
                        }
                        if ( current_user_can( 'delete_post', $post_id ) ) {
                            echo '<span class="trash"><a class="submitdelete" href="' . wp_nonce_url( '/wp-admin/post.php?post=' . $post_id . '&action=trash', 'trash-post_' . $post_id ) . '">Trash</a> | </span>';
                        }
                        echo '<span class="view"><a href="' . get_permalink( $post_id ) . '">View</a></span>';
                        echo '</div>';
                    }
                    // Slug
                    elseif ( strtolower( $admin_field_title ) == 'post_name' ) {
                        $post = get_post( $post_id );
                        echo $post->post_name;
                    }
                    // Binary
                    elseif ( $this->all_meta_fields[ $admin_field_title ] == 'binary' ) {
                        switch ( $meta_value ) {
                            case '':
                                $image = 'binary-empty.png';
                                $class = 'binary-false';
                                break;
                            case 0:
                                $image = 'binary-empty.png';
                                $class = 'binary-false';
                                break;
                            case 1:
                                $image = 'binary-true.png';
                                $class = 'binary-true';
                                break;
                            default:
                                $image = 'binary-empty.png';
                                $class = 'binary-false';
                                break;
                        }
                        echo '<span class="devo-binary"><a href="javascript:void(0);" class="devo-binary-toggle ' . $class . '"><img src="' . get_template_directory_uri() . '/public/images/admin/' . $image . '" border="0"></a></span>';
                    }
                    // Everything else
                    else if ( ( is_array( $meta_value ) && count( $meta_value ) ) || ( is_string( $meta_value ) && strlen( $meta_value ) ) ) {
                        // If the field details are an array for some reason
                        if ( is_array( $this->all_meta_fields[ $admin_field_title ] ) ) {
                            // Something complex, like a class
                            if ( isset( $this->all_meta_fields[ $admin_field_title ][0] ) ) {
                                // Class callback
                                if ( isset( $this->all_meta_fields[ $admin_field_title ][1] ) && strpos( $this->all_meta_fields[ $admin_field_title ][1], '_callback' ) ) {
                                    $obj = $this->all_meta_fields[ $admin_field_title ][0];
                                    $callback = $this->all_meta_fields[ $admin_field_title ][1];
                                    if ( method_exists( $obj, $callback) ) {
                                        call_user_func( [ $obj, $callback ], $post_id, 'list', FALSE, $meta_field_key );
                                    }
                                }
                            }
                            // Post Browser
                            elseif ( isset( $this->all_meta_fields[ $admin_field_title ]['type'] ) && $this->all_meta_fields[ $admin_field_title ]['type'] == 'post_browser' ) {
                                $post_browser_settings = $this->all_meta_fields[ $admin_field_title ]['settings'];
                                $value_field = isset( $post_browser_settings['value_field'] ) ? $post_browser_settings['value_field'] : 'id';
                                $labels = [];
                                foreach ( $meta_value as $post_browser_value ) {
                                    if ( $value_field == 'post_name' ) {
                                        $post_ids = get_posts( [
                                            'post_type' => $post_browser_settings['post_types'],
                                            'name' => $post_browser_value,
                                            'fields' => 'ids',
                                        ] );
                                        $post_id = current( $post_ids );
                                    } else {
                                        $post_id = $post_browser_value;
                                    }
                                    $labels[] = get_post_field( 'post_title', $post_id );
                                }
                                echo implode( '<br>', $labels );
                            }
                            // Something simple, like a checkbox or select field
                            else {
                                echo is_array( $meta_value ) ? implode( ', ', $meta_value ) : $meta_value;
                            }
                        }
                        // If using DO_CPT_Form_Field class
                        elseif ( is_a( $this->all_meta_fields[ $admin_field_title ], 'DO_CPT_Form_Field' ) ) {
                            $callback = $this->all_meta_fields[ $admin_field_title ]->callback;
                            call_user_func( $callback, $post_id, 'list', FALSE, $meta_field_key );
                        }
                        // The field type is array
                        elseif ( strpos( $this->all_meta_fields[ $admin_field_title ], '_array' ) !== FALSE ) {
                            echo implode( '<br>', $meta_value );
                        }
                        // The field type is a callback function
                        elseif ( strpos( $this->all_meta_fields[ $admin_field_title ], '_callback' ) !== FALSE ) {
                            $callback = $this->all_meta_fields[ $admin_field_title ];
                            if ( function_exists( $callback) ) {
                                call_user_func( $callback, $post_id, 'list', FALSE, $meta_field_key );
                            }
                        }
                        // The field value is an image
                        elseif ( is_string( $meta_value ) && preg_match( '/(jpg|png|gif|svg|webp)$/', $meta_value ) ) {
                            echo '<img src="' . esc_url( $meta_value ) . '" class="media-preview" height="50">';
                        }
                        // The field type is number
                        elseif ( $this->all_meta_fields[ $admin_field_title ] == 'number' ) {
                            $decimals = strlen( substr( strrchr( $meta_value, "." ), 1 ) );
                            echo number_format( $meta_value, $decimals );
                        }
                        // The field type is dollars
                        elseif ( $this->all_meta_fields[ $admin_field_title ] == 'dollars' ) {
                            echo devo_format_dollars( $meta_value );
                        }
                        // The field type is date
                        elseif ( $this->all_meta_fields[ $admin_field_title ] == 'date' || $this->all_meta_fields[ $admin_field_title ] == 'select_date' ) {
                            echo devo_utc_to_timezone( $meta_value, FALSE, 'F j, Y' );
                        }
                        // The field type is date_time
                        elseif ( $this->all_meta_fields[ $admin_field_title ] == 'date_time' ) {
                            echo devo_utc_to_timezone( $meta_value, FALSE, 'F j, Y, g:i a' );
                        }
                        // The field type is date_time_timezone
                        elseif ( $this->all_meta_fields[ $admin_field_title ] == 'date_time_timezone' ) {
                            $timestamp = isset( $meta_value['date_time'] ) && strlen( $meta_value['date_time'] ) ? $meta_value['date_time'] : FALSE;
                            $timezone = isset( $meta_value['timezone'] ) && strlen( $meta_value['timezone'] ) ? $meta_value['timezone'] : FALSE;
                            echo devo_utc_to_timezone( $timestamp, $timezone );
                        }
                        // The field type is url
                        elseif ( $this->all_meta_fields[ $admin_field_title ] == 'url' ) {
                            echo '<a href="' . esc_url( $meta_value ) . '" target="_blank">' . $meta_value . '</a>';
                        }
                        // None of the above, so just echo it
                        else {
                            echo $meta_value;
                        }
                    }
                }
            }
        }
    }

    /*
     * Save post
     *
     * */
    public function save_post() {
        //echo "save_post \n";
        global $post, $wpdb;
        // verify this came from the our screen and with proper authorization,
        // because save_post can be triggered at other times
        if ( $post ) {
            $box_id = $this->meta_box_id( $post->post_type, isset( $_POST['meta_box_title'] ) ? $_POST['meta_box_title'] : '' );
            $nonce_id = $box_id . '_nonce';
            $post_id = $post->ID;
            if ( $post->post_type != 'page' ) {
                if ( ! array_key_exists( $nonce_id, $_POST ) ) {
                    return;
                }
                if ( ! wp_verify_nonce( $_POST[ $nonce_id ], $box_id ) ) {
                    return $post_id;
                }
            }
            // Check user capabilities
            if ( ! current_user_can( 'edit_post', $post_id ) ) {
                return $post_id;
            }
            // Make sure this isn't an autosave
            if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
                return $post_id;
            }
            //devo_var_dump($_POST);exit;
            // Save meta fields
            if ( isset( $_POST ) && isset( $post_id ) && get_post_type( $post_id ) == $this->post_type ) {
                // Comments status
                if ( $this->comments ) {
                    if ( isset( $this->comment_status_callback ) && function_exists( $this->comment_status_callback ) ) {
                        $comment_status = call_user_func( $this->comment_status_callback, $_POST );
                        $_POST['comment_status'] = in_array( $comment_status, [ 'closed', 'open' ] ) ? $comment_status : 'open';
                    } else {
                        $_POST['comment_status'] = 'open';
                    }
                }
                // OnSave callback (can modify $_POST)
                if ( isset( $this->onsave_callback ) ) {
                    // Method
                    if ( is_array( $this->onsave_callback ) && isset( $this->onsave_callback[0] ) && isset( $this->onsave_callback[1] ) ) {
                        $obj = $this->onsave_callback[0];
                        $callback = $this->onsave_callback[1];
                        if ( method_exists( $obj, $callback ) ) {
                            $_POST = call_user_func( [ $obj, $callback ], $_POST, $this->post_type_details );
                        }
                    }
                    // Function
                    else if ( function_exists( $this->onsave_callback ) ) {
                        $_POST = call_user_func( $this->onsave_callback, $_POST, $this->post_type_details );
                    }
                }
                // Dynamic Interface
                if ( $this->dynamic_interface ) {
                    $this->dynamic_interface_setup( $_POST, 'onsave' );
                }

                // Backup previous backups
                $backup_backups = $wpdb->query( "UPDATE $wpdb->postmeta SET meta_key = REPLACE(meta_key, 'BAK$this->meta_prefix', '_BAK$this->meta_prefix') WHERE post_id = $post_id and meta_key like 'BAK$this->meta_prefix%';" );
                foreach ( array_keys( $this->bonus_fields ) as $bonus_key ) {
                    $backup_backups = $wpdb->query( "UPDATE $wpdb->postmeta SET meta_key = REPLACE(meta_key, 'BAK$bonus_key', '_BAK$bonus_key') WHERE post_id = $post_id and meta_key like 'BAK$bonus_key%';" );
                }

                // Back up previous values
                $backup_values = $wpdb->query( "UPDATE $wpdb->postmeta SET meta_key = REPLACE(meta_key, '$this->meta_prefix', 'BAK$this->meta_prefix') WHERE post_id = $post_id and meta_key like '$this->meta_prefix%';" );
                foreach ( array_keys( $this->bonus_fields ) as $bonus_key ) {
                    $backup_values = $wpdb->query( "UPDATE $wpdb->postmeta SET meta_key = REPLACE(meta_key, '$bonus_key', 'BAK$bonus_key') WHERE post_id = $post_id and meta_key = '$bonus_key';" );
                }
                //devo_var_dump($_POST);exit;
                //devo_var_dump($this->meta_fields);exit;

                // Loop through fields and save new values
                foreach ( $this->meta_fields as $meta_box_id => $meta_field_box ) {
                    foreach ( $meta_field_box as $label => $settings ) {
                        $box_int = $this->dynamic_interface && preg_match( '/\d+_meta$/', $meta_box_id, $box_int ) ? str_replace( '_meta', '', current( $box_int ) ) : FALSE;
                        $meta_field_key = $box_int ? devo_meta_field_key( $label . ' ' . $box_int, $this->meta_prefix ) : devo_meta_field_key( $label, $this->meta_prefix );
                        $taxonomy = FALSE;
                        $type = devo_get_meta_field_type( $settings );
                        $array = strpos( $type, '_array' ) !== FALSE;
                        $obj = is_array( $settings ) && isset( $settings[0] ) && isset( $settings[1] ) && strpos( $settings[1], '_callback' ) ? $settings[0] : FALSE;
                        $is_multi = strpos( $type, 'multi' ) !== FALSE;
                        //$type = $array && ! $is_multi ? str_replace( '_array', '', $type ) : $type;

                        // Custom callback
                        if ( strpos( $type, '_callback' ) !== FALSE ) {
                            $callback = $type;
                            // Method
                            if ( $obj && method_exists( $obj, $callback ) ) {
                                $value = call_user_func( [ $obj, $callback ], $post_id, 'validate', $_POST[ $meta_field_key ], $meta_field_key );
                            }
                            // Function
                            elseif ( function_exists( $callback ) ) {
                                $value = call_user_func( $callback , $post_id, 'validate', ( isset( $_POST[ $meta_field_key ] ) ? $_POST[ $meta_field_key ] : '' ), $meta_field_key );
                            }
                        }
                        // Something else
                        else {
                            $validate = new DO_Form_Field_Validate( $type, ( isset( $_POST[ $meta_field_key ] ) ? $_POST[ $meta_field_key ] : '' ) );
                            $value = $validate->value;
                        }
                        
                        // Save the field
                        //devo_var_dump(
                        $wpdb->replace( $wpdb->postmeta, [
                            'post_id' => $post_id,
                            'meta_key' => $meta_field_key,
                            'meta_value' => $value,
                        ] );
                        //);
                    }
                }

                // Bonus Fields
                //devo_var_dump($this->bonus_fields);exit;
                if ( isset( $this->bonus_fields ) && count( $this->bonus_fields ) ) {
                    foreach ( $this->bonus_fields as $bonus_field_key => $bonus_field_value ) {
                        $bonus_field_name = is_int( $bonus_field_key ) ? $bonus_field_value : $bonus_field_key;
                        $bonus_field_type = is_int( $bonus_field_key ) ? FALSE : $bonus_field_value;
                        if ( isset( $_POST[ $bonus_field_name ] ) ) {
                            if ( $bonus_field_type ) {
                                $validate = new DO_Form_Field_Validate( $bonus_field_type, $_POST[ $bonus_field_name ] );
                                $value = $validate->value;
                            } else {
                                $value = $_POST[ $bonus_field_name ];
                            }
                        } elseif ( isset( $_POST[ $bonus_field_value ] ) ) {
                            $validate = new DO_Form_Field_Validate( $bonus_field_type, $_POST[ $bonus_field_value ] );
                            $value = $validate->value;
                        } else {
                            $value = '';
                        }
                        $wpdb->replace( $wpdb->postmeta, [
                            'post_id' => $post_id,
                            'meta_key' => $bonus_field_name,
                            'meta_value' => $value,
                        ] );
                    }
                }

                // noindex
                if ( $this->noindex ) {
                    update_post_meta( $post_id, 'noindex', 1 );
                }

                // Post Thumbnail
                if ( $this->post_thumbnail ) {
                    // Unset thumbnail
                    delete_post_meta( $post_id, '_thumbnail_id' );
                    // Reset thumbnail
                    foreach ( $this->post_thumbnail as $thumbnail_option ) {
                        $thumbnail_field_name = devo_meta_field_key( $thumbnail_option, $this->meta_prefix );
                        if ( isset( $_POST[ $thumbnail_field_name ] ) ) {
                            if ( is_string( $_POST[ $thumbnail_field_name ] ) && strlen( $_POST[ $thumbnail_field_name ] ) ) {
                                $image_url = $_POST[ $thumbnail_field_name ];
                            }
                            elseif ( is_array( $_POST[ $thumbnail_field_name ] ) && isset( $_POST[ $thumbnail_field_name ][0] ) && strlen( $_POST[ $thumbnail_field_name ][0] ) ) {
                                $image_url = $_POST[ $thumbnail_field_name ][0];
                            }
                            if ( isset( $image_url ) ) {
                                $image_id = (int) devo_get_media_by_url( $image_url, 'full', 'id' );
                                set_post_thumbnail( $post_id, $image_id );
                                break;
                            }
                        }
                    }
                }

                // Post Content
                if ( $this->post_content ) {
                    $content_field_name = devo_meta_field_key( $this->post_content, $this->meta_prefix );
                    $content = isset( $_POST[ $content_field_name ] ) ? $_POST[ $content_field_name ] : FALSE;
                    if ( $content !== FALSE ) {
                        // Unhook to avoid an infinite loop
                        remove_action( 'save_post', [ $this, 'save_post' ] );
                        // Update the post with the new content
                        $validate = new DO_Form_Field_Validate( 'wp_editor', $content );
                        wp_update_post( [ 'ID' => $_POST['post_ID'], 'post_content' => $validate->value ] );
                        // Rehook
                        add_action( 'save_post', [ $this, 'save_post' ] );
                    }
                }

                // Post Excerpt
                if ( $this->post_excerpt ) {
                    $excerpt_field_name = devo_meta_field_key( $this->post_excerpt, $this->meta_prefix );
                    $excerpt = isset( $_POST[ $excerpt_field_name ] ) ? $_POST[ $excerpt_field_name ] : FALSE;
                    if ( $excerpt !== FALSE ) {
                        // Unhook to avoid an infinite loop
                        remove_action( 'save_post', [ $this, 'save_post' ] );
                        // Update the post with the new excerpt
                        $validate = new DO_Form_Field_Validate( 'wp_editor', $excerpt );
                        wp_update_post( [ 'ID' => $_POST['post_ID'], 'post_excerpt' => $validate->value ] );
                        // Rehook
                        add_action( 'save_post', [ $this, 'save_post' ] );
                    }
                }

                // Delete previous backups
                $wpdb->query( "DELETE FROM $wpdb->postmeta WHERE post_id = $post_id and meta_key like '_BAK%';" );

                //exit; // For devo_var_dump in DO_Form_Field_Validate

                // Custom post_title/post_name
                // Build Title
                if ( isset( $this->post_type_post_title ) ) {
                    $title_array = isset( $_POST['post_title_override'] ) ? [ $_POST['post_title_override'] ] : $this->build_post_title_array( $_POST );
                    if ( count( $title_array ) ) {
                        // Unhook to avoid an infinite loop
                        remove_action( 'save_post', [ $this, 'save_post' ] );
                        $args = [
                            'ID' => $_POST['post_ID'],
                            'post_title' => str_replace( ' , ', ', ', implode( ' ', $title_array ) ),
                        ];
                        if ( ! isset( $this->post_type_post_name ) ) {
                            $args['post_name'] = sanitize_title_with_dashes( preg_replace( '/[\_\/]/', '-', remove_accents( implode( ' ', $title_array ) ) ) );
                        }
                        // Update the post with the new title
                        wp_update_post( $args );
                        // Rehook
                        add_action( 'save_post', [ $this, 'save_post' ] );
                    }
                }
                // Build Slug
                if ( isset( $this->post_type_post_name ) ) {
                    $slug_array = isset( $_POST['post_name_override'] ) ? [ $_POST['post_name_override'] ] : $this->build_post_name_array( $_POST );
                    if ( count( $slug_array ) ) {
                        // Unhook to avoid an infinite loop
                        remove_action( 'save_post', [ $this, 'save_post' ] );
                        // Update the post with the new slug
                        wp_update_post( [ 'ID' => $_POST['post_ID'], 'post_name' => remove_accents( implode( '-', $slug_array ) ) ] );
                        // Rehook
                        add_action( 'save_post', [ $this, 'save_post' ] );
                    }
                }
                // Comments status
                if ( $this->comments ) {
                    // Unhook to avoid an infinite loop
                    remove_action( 'save_post', [ $this, 'save_post' ] );
                    if ( isset( $this->comment_status_callback ) && function_exists( $this->comment_status_callback ) ) {
                        $comment_status = call_user_func( $this->comment_status_callback, $_POST );
                        // Update the post with the new slug
                        wp_update_post( [ 'ID' => $_POST['post_ID'], 'comment_status' => in_array( $comment_status, [ 'closed', 'open' ] ) ? $comment_status : 'open' ] );
                    } else {
                        wp_update_post( [ 'ID' => $_POST['post_ID'], 'comment_status' => 'open' ] );
                    }
                    // Rehook
                    add_action( 'save_post', [ $this, 'save_post' ] );
                }
            }
            // AfterSave callback
            if ( isset( $this->aftersave_callback ) ) {
                // Method
                if ( is_array( $this->aftersave_callback ) && isset( $this->aftersave_callback[0] ) && isset( $this->aftersave_callback[1] ) && isset( $_POST['post_ID'] ) ) {
                    $obj = $this->aftersave_callback[0];
                    $callback = $this->aftersave_callback[1];
                    if ( method_exists( $obj, $callback ) ) {
                        call_user_func( [ $obj, $callback ], $_POST['post_ID'] );
                    }
                }
                // Function
                elseif ( is_string( $this->aftersave_callback ) && function_exists( $this->aftersave_callback ) ) {
                    call_user_func( $this->aftersave_callback, $_POST['post_ID'] );
                }
            }
        }
    }

    /*
     * iframe Rewrite
     *
     * */
    public function iframe( $wp_rewrite ) {
        // Manually create rewrite rule for iframe endpoint
        if ( $this->post_type == 'devo_landing_page' ) {
            $wp_rewrite->rules = [ 'iframe/([^/]+)/?$' => 'index.php?pagename=$matches[1]&iframe=1' ] + $wp_rewrite->rules;
        } else {
            $wp_rewrite->rules = [ 'iframe/' . $this->post_type_slug . '/([^/]+)/?$' => 'index.php?post_type=' . $this->post_type . '&name=$matches[1]&iframe=1' ] + $wp_rewrite->rules;
        }
    }

    /*
     *
     * SEO Filters
     *
     * */

    public function seo_title() {
        $title = [];
        if ( $this->seo && isset( $this->seo['title'] ) ) {
            $has_options = is_string( $this->seo['title'] ) && strpos( $this->seo['title'], '||' ) !== FALSE;
            $title_option = $has_options ? explode( '||', $this->seo['title'] ) : $this->seo['title'] ;
            $primary_title_field = $has_options && is_array( $title_option ) ? current( $title_option ) : $title_option;
            $secondary_title_field = $has_options && is_array( $title_option ) ? end( $title_option ) : FALSE;
            if ( is_array( $primary_title_field ) ) {
                $primary_titles = [];
                foreach ( $primary_title_field as $title_field ) {
                    $primary_titles[] = $title_field == 'post_title' ? 'post_title' : devo_meta_field_key( $title_field, $this->meta_prefix );
                }
                $primary_title = $primary_titles;
            } else {
                $primary_title = $primary_title_field == 'post_title' ? 'post_title' : devo_meta_field_key( $primary_title_field, $this->meta_prefix );
            }
            $secondary_title = $secondary_title_field ? ( $secondary_title_field == 'post_title' ? 'post_title' : devo_meta_field_key( $secondary_title_field, $this->meta_prefix ) ) : FALSE;
            if ( $primary_title ) {
                $title[] = $primary_title;
            }
            if ( $secondary_title ) {
                $title[] = $secondary_title;
            }
        }
        return count( $title ) ? ( $has_options ? implode( '||', $title ) : $title ) : FALSE;
    }

    public function seo_image() {
        $image = [];
        if ( $this->seo && isset( $this->seo['image'] ) ) {
            $has_options = is_string( $this->seo['image'] ) && strpos( $this->seo['image'], '||' ) !== FALSE;
            $image_option = $has_options ? explode( '||', $this->seo['image'] ) : $this->seo['image'] ;
            $primary_image_field = $has_options && is_array( $image_option ) ? current( $image_option ) : $image_option;
            $secondary_image_field = $has_options && is_array( $image_option ) ? end( $image_option ) : FALSE;
            $primary_image = devo_meta_field_key( $primary_image_field, $this->meta_prefix );
            if ( is_array( $primary_image ) ) {
                $primary_image = current( $primary_image );
            }
            $secondary_image = $secondary_image_field ? devo_meta_field_key( $secondary_image_field, $this->meta_prefix ) : FALSE;
            if ( is_array( $secondary_image ) ) {
                $secondary_image = current( $secondary_image );
            }
            if ( $primary_image ) {
                $image[] = $primary_image;
            }
            if ( $secondary_image ) {
                $image[] = $secondary_image;
            }
        }
        return count( $image ) ? implode( '||', $image ) : FALSE;
    }

    public function seo_description() {
        $description = [];
        if ( $this->seo && isset( $this->seo['description'] ) ) {
            $primary_description_field = is_array( $this->seo['description'] ) ? current( $this->seo['description'] ) : $this->seo['description'];
            $secondary_description_field = is_array( $this->seo['description'] ) ? end( $this->seo['description'] ) : FALSE;
            $primary_description = devo_meta_field_key( $primary_description_field, $this->meta_prefix );
            $secondary_description = $secondary_description_field ? devo_meta_field_key( $secondary_description_field, $this->meta_prefix ) : FALSE;
            if ( $primary_description ) {
                $description[] = $primary_description;
            }
            if ( $secondary_description ) {
                $description[] = $secondary_description;
            }
        }
        return count( $description ) ? implode( '||', $description ) : FALSE;
    }

    public function query_vars( $vars ) {
        if ( ! in_array( 'is_modified', $vars ) ) {
            array_push( $vars, 'is_modified' );
        }
        if ( ! in_array( 'iframe', $vars ) ) {
            array_push( $vars, 'iframe' );
        }
        return $vars;
    }

    /*
     * Custom orderby, "hide" field
     *
     * */
    public function pre_get_posts( $wp_query ) {
        // Custom Order By
        if ( ! is_admin() && $this->orderby && isset( $wp_query->query_vars['post_type'] ) && ( ( is_array( $wp_query->query_vars['post_type'] ) && in_array( $this->post_type, $wp_query->query_vars['post_type'] ) ) || $wp_query->query_vars['post_type'] == $this->post_type ) && ! $wp_query->is_search() && ! isset( $wp_query->query_vars['is_modified'] ) ) {
            if ( is_array( $this->orderby ) ) {
                $translated_orderby = [];
                $meta_query = is_array( $wp_query->get( 'meta_query' ) ) ? $wp_query->get( 'meta_query' ) : [];
                foreach ( $this->orderby as $field => $direction ) {
                    if ( in_array( $field, devo_default_fields_array() ) ) {
                        $translated_orderby[ $field ] = $direction;
                    } else {
                        $meta_key = devo_meta_field_key( $field, $this->meta_prefix );
                        $translated_orderby[ $meta_key ] = $direction;
                        $meta_query[ $meta_key ] = [
                            'key' => $meta_key,
                            'compare' => 'EXISTS',
                        ];
                    }
                }
                $wp_query->set( 'orderby', $translated_orderby );
                if ( count( $meta_query ) ) {
                    $wp_query->set( 'meta_query', $meta_query );
                }
            }
        }
        // "Hide" field
        if ( ! is_admin() && ( ! defined( 'REST_REQUEST' ) || ! REST_REQUEST ) && ! $wp_query->is_single() && $this->hide_field && isset( $wp_query->query_vars['post_type'] ) && ( ( is_array( $wp_query->query_vars['post_type'] ) && in_array( $this->post_type, $wp_query->query_vars['post_type'] ) ) || $wp_query->query_vars['post_type'] == $this->post_type || $wp_query->query_vars['post_type'] == 'any' ) ) {
            $meta_query = is_array( $wp_query->get( 'meta_query' ) ) ? $wp_query->get( 'meta_query' ) : [];
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
            $meta_query['hidden'] = $hidden_field_query;
            $wp_query->set( 'meta_query', $meta_query );
        }
    }

    public function the_post( $post_object ) {
        if ( $post_object->post_type === $this->post_type ) {
            if ( $this->dynamic_interface ) {
                $this->dynamic_interface_setup( $post_object );
            }
            // Get all meta fields
            $this->post_type_details->meta_fields = [];
            if ( $this->meta_fields ) {
                foreach ( $this->meta_fields as $meta_box_name => $meta_box ) {
                    preg_match( '/\d+/', $meta_box_name, $matches );
                    $panel_suffix = count( $matches ) ? current( $matches ) : '';
                    foreach ( $meta_box as $field_label => $field_details ) {
                        $field_key = devo_meta_field_key( $field_label, $this->meta_prefix, $panel_suffix );
                        $this->post_type_details->meta_fields[ $field_key ] = $field_details;
                    }
                }
            }
            // Get all bonus fields
            foreach ( $this->bonus_fields as $field_key => $field_details ) {
                $this->post_type_details->bonus_fields[ $field_key ] = $field_details;
                $this->post_type_details->meta_fields[ $field_key ] = $field_details;
            }
            // Add fields
            $post_object = devo_api_custom_data( $post_object, $this->post_type_details );
            $post_object->post_date = $post_object->raw_post_date;
            //devo_var_dump($post_object);
        }
    }

    /*
     * Add meta fields to rest API
     *
     * */
    private function rest_api() {
        add_filter( 'rest_prepare_' . $this->post_type, function( $data, $post, $context  ) {
            if ( $this->dynamic_interface ) {
                $this->dynamic_interface_setup( $post );
            }
            // Get all meta fields
            $this->post_type_details->meta_fields = [];
            if ( $this->meta_fields ) {
                foreach ( $this->meta_fields as $meta_box_name => $meta_box ) {
                    preg_match( '/\d+/', $meta_box_name, $matches );
                    $panel_suffix = count( $matches ) ? current( $matches ) : '';
                    foreach ( $meta_box as $field_label => $field_details ) {
                        $field_key = devo_meta_field_key( $field_label, $this->meta_prefix, $panel_suffix );
                        $this->post_type_details->meta_fields[ $field_key ] = $field_details;
                    }
                }
            }
            // Get all bonus fields
            foreach ( $this->bonus_fields as $field_key => $field_details ) {
                $this->post_type_details->bonus_fields[ $field_key ] = $field_details;
                $this->post_type_details->meta_fields[ $field_key ] = $field_details;
            }
            // Add fields
            $data->data = devo_api_custom_data( $post, $this->post_type_details );
            $data->data = devo_array_from_object( $data->data );
            //devo_var_dump($data);
            return $data;
        }, 10, 3 );
    }

    public function permalinks( $post_link, $post, $leavename ) {
        if ( isset( $post->post_type ) && $this->post_type == $post->post_type ) {
            if ( $this->permalink ) {
                $permalink = str_replace( [ '[post_type]', '[post_name]' ], [ $this->post_type_slug, $post->post_name ], $this->permalink );
                $permalink = strlen( $permalink ) > 1 ? '/' . trim( $permalink, '/' ) . '/' : $permalink;
                $post_link = home_url( $permalink );
            } else {
                $post_link = home_url( '/' . ( $this->post_type_slug ? $this->post_type_slug . '/' : '' ) . $post->post_name . '/' );
            }
        }
        return $post_link;
    }

    /*
     * Helpers
     *
     * */
    private function build_post_title_array( $POST ) {
        $title_array = [];
        foreach ( $this->post_type_post_title as $title_part ) {
            if ( isset( $this->all_meta_fields[ $title_part ] ) ) {
                $field_type = $this->all_meta_fields[ $title_part ];
                $field_name = devo_meta_field_key( $title_part, $this->meta_prefix );
                if ( isset( $POST[ $field_name ] ) && strlen( $POST[ $field_name ] ) ) {
                    $validate = new DO_Form_Field_Validate( $field_type, $POST[ $field_name ] );
                    $sanitized = $validate->value;
                    $value = strpos( $field_type, 'date' ) !== FALSE ? date( 'Y-m-d', $sanitized ) : $sanitized;
                    $title_array[] = $value;
                }
            } else {
                $title_array[] = $title_part;
            }
        }
        return $title_array;
    }

    private function build_post_name_array( $POST ) {
        //devo_var_dump($this->post_type_post_name);exit;
        $slug_array = [];
        foreach ( $this->post_type_post_name as $slug_part ) {
            if ( isset( $this->all_meta_fields[ $slug_part ] ) || count( devo_array_keys_exists( devo_meta_field_key( $slug_part, $this->meta_prefix ), $this->bonus_fields ) ) ) {
                $field_type = isset( $this->all_meta_fields[ $slug_part ] ) ? devo_get_meta_field_type( $this->all_meta_fields[ $slug_part ] ) : ( isset( $this->bonus_fields[ devo_meta_field_key( $slug_part, $this->meta_prefix ) ] ) ? $this->bonus_fields[ devo_meta_field_key( $slug_part, $this->meta_prefix ) ] : 'text' );
                $field_name = devo_meta_field_key( $slug_part, $this->meta_prefix );
                if ( isset( $POST[ $field_name ] ) && strlen( isset( $POST[ $field_name ] ) ) ) {
                    $validate = new DO_Form_Field_Validate( $field_type, $POST[ $field_name ] );
                    $sanitized = $validate->value;
                    $value = ( strpos( $field_type, 'date' ) || $field_type == 'timestamp' ) !== FALSE && strlen( $sanitized ) ? date( 'Y-m-d', $sanitized ) : $sanitized;
                    $slug_array[] = sanitize_title_with_dashes( preg_replace( '/[\_\/]/', '-', remove_accents( $value ) ) );
                }
            } elseif ( in_array( $slug_part, [ 'post_name', 'post_title', 'post_date', 'post_author', 'post_status', 'post_modified', 'post_parent', 'post_type', 'post_id', 'ID' ] ) ) {
                $slug_array[] = sanitize_title_with_dashes( preg_replace( '/[\_\/]/', '-', $POST[ ( $slug_part == 'post_id' ? 'ID' : $slug_part ) ] ) );
            } else {
                $slug_array[] = sanitize_title_with_dashes( strtolower( $slug_part ) );
            }
        }
        return $slug_array;
    }

    private function meta_box_id( $post_type, $title = '' ) {
    	return $post_type . '_' . str_replace( ' ', '_', strtolower( $title ) ) . '_meta';
    }

    // Returns form field display for meta fields using DO_Form_Field_Display
    private function meta_fields_display( $type, $meta_field_key, $meta_field_options, $settings = [] ) {
        $field_settings = array_merge( [
                'value_source' => '',
                'force_array' => FALSE,
                'force_value' => FALSE,
                'is_multi' => FALSE,
            ], $settings ) ;
        $field =  new DO_Form_Field_Display( $type, $meta_field_key, $meta_field_options, $field_settings );
        return $field->output;
    }

    // Determine if a field is actually a taxonomy and return the name of the taxonomy
    private function is_taxonomy( $field_title ) {
        return isset( $this->all_meta_fields[ $field_title ] ) && is_a( $this->all_meta_fields[ $field_title ], 'DO_CPT_Form_Field' ) && $this->all_meta_fields[ $field_title ]->target_type == 'taxonomy' && $this->all_meta_fields[ $field_title ]->apply_taxonomy ? $this->all_meta_fields[ $field_title ]->target_name : FALSE;
    }

    // Echo some post type info in admin
    public function post_type_info() {
        global $post, $pagenow, $wp_query;
        if ( isset( $post->post_type ) ) {
            $this_post_type = $post->post_type;
        } elseif ( isset( $wp_query->query_vars['post_type'] ) ) {
            $this_post_type = $wp_query->query_vars['post_type'];
        } else {
            $this_post_type = FALSE;
        }

        // Abort if not on post or edit pages
        // Right page?
        $page = in_array( $pagenow, [ 'post-new.php', 'post.php', 'edit.php', ] );
        if( ! $page ) {
            return;
        }
        // Right post type?
        $type = in_array( $this_post_type, [ $this->post_type ] );
        if ( ! $type ) {
            return;
        }
        // Right capabilities?
        if( ! $this->current_user_can ) {
            return;
        }
        // Echo the post type and custom taxonomies
        $taxonomy_names = implode( ', ', get_object_taxonomies( $this->post_type ) );
        echo '<p class="footnote post-type-info"><b>Post Type:</b> ' . $this->post_type;
        echo '<br><b>Archive:</b> <a href="' . home_url( '/' . ( $this->post_type_slug ? $this->post_type_slug . '/' : '' ), 'relative' ) . '" target="_blank">/' . ( $this->post_type_slug ? $this->post_type_slug . '/' : '' ) . '</a>';
        if ( $post ) {
            echo '<br><b>View Post:</b> <a href="' . get_permalink( $post->ID ) . '" target="_blank">' . get_permalink( $post->ID ) . '</a>';
        }
        echo '</p>';
    }
}
