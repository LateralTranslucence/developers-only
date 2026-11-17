<?php
// Options page class

class DO_Options_Screen {
    public $admin_notices;
    public $all_fields;
    public $button_text;
    private $character_count;
    public $fields;
    public $hide_menu;
    public $menu_position;
    public $name;
    public $network;
    public $notes;
    public $onsave_callback;
    public $page_title;
    public $post_form_callback;
    public $pre_form_callback;
    public $restrict_users;
    public $settings;
    public $screen_callback;
    public $submenu;
    public $text;
    public $user_capability;

    public function __construct( $name = FALSE, $type = 'option' ) {
        if ( $name === FALSE ) {
            trigger_error( 'Missing argument: $name - DO_Options_Screen( $name )' );
            return;
        }
        // Vars
        $this->name = strtolower( str_replace( ' ', '_', $name ) );
        global ${ $this->name . '_obj' };
        ${ $this->name . '_obj' } = $this;
        $this->all_fields = [];
        $this->fields = [];
        $this->admin_notices = $this->name . '_admin_notices';
        // Defaults
        $this->submenu = FALSE;
        $this->network = FALSE;
        $this->menu_position = NULL;
        $this->hide_menu = FALSE;
        $this->page_title = 'Options';
        $this->text = '';
        $this->restrict_users = 'administrator';
        $this->user_capability = $this->get_baseline_capability( $this->restrict_users );
        $this->button_text = 'Save';
        $this->screen_callback = $type == 'option' ? 'options_form' : 'page_content';
        // Add page to menu
        add_action( 'admin_menu', [ $this, 'options_add_page' ] );
        add_action( 'network_admin_menu', [ $this, 'network_options_add_page' ] );
        // Register settings and fields
        add_action( 'admin_init', [ $this, 'options_init' ] );
        // Admin notices
        add_action( 'admin_notices', [ $this, 'admin_notices' ] );
        // Network callback
        add_action( 'network_admin_edit_' . $name, [ $this, 'network_callback' ] );
    }

    public function settings( $settings = FALSE ) {
        if ( ! $settings ) {
            return;
        }
        $this->settings = $this->settings ? array_merge( $settings, $this->settings ) : $settings;

        // Submenu
        if ( isset ( $settings['submenu'] ) ) {
            $this->submenu = $settings['submenu'];
        }
        // Network
        if ( isset ( $settings['network'] ) ) {
            $this->network = $settings['network'];
        }
        // Admin Menu Icon
        if ( isset( $settings['icon'] ) ) {
            $name = $this->name;
            $icon = $settings['icon'];
            add_action( 'admin_head', function() use( $name, $icon ) {
                // The icon is a CSS escape like \f177; allow only that shape.
                $icon = preg_replace( '/[^\\\\a-fA-F0-9]/', '', (string) $icon );
                echo '<style>#adminmenu li#toplevel_page_' . esc_attr( $name ) . ' div.wp-menu-image:before { content: "' . $icon . '"; }</style>' . "\n";
            });
        }
        // Hide menu
        if ( isset ( $settings['hide_menu'] ) ) {
            $this->hide_menu = $settings['hide_menu'];
        }
        // Menu Position
        if ( isset ( $settings['menu_position'] ) ) {
            $this->menu_position = $settings['menu_position'];
        }
        // Page Title
        if ( isset ( $settings['page_title'] ) ) {
            $this->page_title = $settings['page_title'];
        }
        // Page Intro Text
        if ( isset ( $settings['text'] ) ) {
            $this->text = $settings['text'];
        }
        // OnSave callback
        if ( isset( $settings['onsave_callback'] ) ) {
            $this->onsave_callback = $settings['onsave_callback'];
        }
        // Pre-form callback
        if ( isset( $settings['pre_form_callback'] ) ) {
            $this->pre_form_callback = $settings['pre_form_callback'];
        }
        // Post-form callback
        if ( isset( $settings['post_form_callback'] ) ) {
            $this->post_form_callback = $settings['post_form_callback'];
        }
        // Notes
        if ( isset( $settings['notes'] ) ) {
            $this->notes = $settings['notes'];
        }
        // Button Text
        if ( isset( $settings['button_text'] ) ) {
            $this->button_text = $settings['button_text'];
        }
        // Restrict Users (by role)
        if ( isset( $settings['restrict_users'] ) ) {
            $this->restrict_users = $settings['restrict_users'];
            $this->user_capability = $this->get_baseline_capability( $this->restrict_users );
        }
        // User Capability
        if ( isset( $settings['user_capability'] ) ) {
            $this->user_capability = $settings['user_capability'];
        }
        // Character Count
        if ( isset( $settings['character_count'] ) ) {
            $this->character_count = $settings['character_count'];
        }
    }

    /* Changes option capability */
    public function option_capability( $cap ) {
        return $this->user_capability;
    }

    /* Generate a tab ID based on the tab name */
    private function tab_id( $tab_name ) {
        return str_replace( ' ', '_', strtolower( $tab_name ) );
    }

    /* Initial setup of screen fields */
    public function fields( $fields = FALSE, $title = NULL ) {
        if ( ! $fields || ! is_array( $fields ) ) {
            return;
        }
        $tab_title = $title ? $title : 'Options';
        $this->fields[ $tab_title ] = $fields;
        $this->all_fields = array_merge( $this->all_fields, $fields );
        // Media upload and enqueue scripts
        add_action( 'admin_enqueue_scripts', function() {
            wp_enqueue_media();
            wp_enqueue_script( 'media-upload-field', get_template_directory_uri() . '/admin/js/init-media-upload-field.js', [ 'jquery' ], '07032019', TRUE );
        } );
        // Check for color picker and enqueue scripts
        if ( in_array( 'color', $fields ) ) {
            add_action( 'admin_enqueue_scripts', function() {
                wp_enqueue_style( 'wp-color-picker' );
                // Same initialiser the post-edit screens use. The old path
                // (/admin/js/devo-color-picker.js) does not exist in the theme,
                // so colour fields on options screens never bound to a picker.
                wp_enqueue_script( 'devo-color-picker', get_template_directory_uri() . '/public/js/color-picker.js', [ 'jquery', 'wp-color-picker' ], DO_VER, TRUE );
            } );
        }
        // Capability
        foreach ( $this->fields as $tab_name => $fields ) {
            add_filter( 'option_page_capability_' . $this->name . '_' . $this->tab_id( $tab_name ), [ $this, 'option_capability' ] );
        }
    }

    public function options_add_page() {
        if ( current_user_can( $this->user_capability ) ) {
            if ( $this->submenu && get_post_type_object( $this->submenu ) ) {
                //add_submenu_page( $parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function )
                add_submenu_page( 'edit.php?post_type=' . $this->submenu, $this->page_title, $this->page_title, $this->user_capability, $this->name, [ $this, $this->screen_callback ] );
            } elseif ( $this->submenu == 'tools.php' ) {
                add_management_page( $this->page_title, $this->page_title, $this->user_capability, $this->name, [ $this, $this->screen_callback ] );
            } elseif ( $this->submenu ) {
                //add_submenu_page( $parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function )
                add_submenu_page( $this->submenu, $this->page_title, $this->page_title, $this->user_capability, $this->name, [ $this, $this->screen_callback ] );
            } else {
                //add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position )
                add_menu_page( '', $this->page_title, $this->user_capability, $this->name, [ $this, $this->screen_callback ], '', $this->menu_position );
                if ( $this->hide_menu ) {
                    remove_menu_page( $this->name );
                }
            }
        }
    }

    public function network_options_add_page() {
        if ( $this->network ) {
            //add_submenu_page( $parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function )
            add_submenu_page( 'settings.php', $this->page_title, $this->page_title, 'manage_network', $this->name, [ $this, $this->screen_callback ] );
        }
    }

    function options_init() {
        //register_setting( $option_group, $option_name, $sanitize_callback )
        foreach ( $this->fields as $tab_name => $fields ) {
            $option_name = count( $this->fields ) > 1 ? $this->name . '_' . $this->tab_id( $tab_name ) : $this->name;
            // register_setting( $option_group, $option_name, $sanitize_callback )
            register_setting( $this->name . '_' . $this->tab_id( $tab_name ), $option_name, [ $this, 'options_validate' ] );
            // add_settings_section( $id, $title, $callback, $page )
            add_settings_section( $this->name . '_' . $this->tab_id( $tab_name ) . '_section', '', '', $this->name . '_' . $this->tab_id( $tab_name ) );
            foreach ( $fields as $field_title => $settings ) {
                $field_name = $this->field_name( $field_title );
                $field_id = $option_name . $field_name;
                $form_field_class = FALSE;
                $field_options = FALSE;
                $obj = FALSE;
                $field_settings = [];
                if ( is_a( $settings, 'DO_CPT_Form_Field' ) ) {
                    $type = $settings;
                    $type_class = 'cpt-form-field';
                    $form_field_class = TRUE;
                }
                elseif ( is_array( $settings ) ) {
                    // Method callback
                    if ( isset( $settings[0] ) ) {
                        if ( isset( $settings[1] ) && strpos( $settings[1], '_callback' ) ) {
                            $obj = $settings[0];
                            $type = $settings[1];
                            $type_class = 'callback';
                        }
                    }
                    // Something with an array of settings
                    elseif ( isset( $settings['type'] ) ) {
                        // Manual field (value is set in the post type)
                        if ( $settings['type'] == 'manual' ) {
                            $type = 'read_only';
                            $type_class = 'read-only';
                            $field_settings['force_value'] = $settings['value'];
                        }
                        // Normal field
                        else {
                            $type = $settings['type'];
                            $type_class = $settings['type'];
                            $field_options = devo_field_options( isset( $settings['options'] ) ? $settings['options'] : $settings );
                        }
                    }
                }
                // A plain John field
                else {
                    $type = $settings;
                    $type_class = $settings;
                }
                // Clean up the $type_class field
                $type_class = str_replace( '_', '-', $type_class );
                // add_settings_field( $id, $title, $callback, $page, $section, $args )
                add_settings_field( $field_id, $field_title, function() use( $field_name, $type, $field_options, $field_title, $option_name, $obj, $form_field_class, $field_settings ) {
                    // Notes
                    if ( isset( $this->notes[ $field_title ] ) ) {
                        echo '<span class="red small">' . wp_kses_post( $this->notes[ $field_title ] ) . '</span><br>';
                    }
                    // If using DO_CPT_Form_Field
                    if ( $form_field_class ) {
                        $callback = $type->callback;
                        $site_option = $this->network ? get_site_option( $option_name ) : FALSE;
                        $value_source = $this->network && isset( $site_option[ $field_name ] ) ? $site_option[ $field_name ] : $option_name . '[' . $field_name . ']';
                        call_user_func( $callback , $value_source, 'edit', FALSE, $field_name );
                    }
                    // If custom callback
                    elseif ( strpos( $type, '_callback' ) !== FALSE ) {
                        $callback = $type;
                        if ( $obj ) {
                            if ( method_exists( $obj, $callback) ) {
                                call_user_func( [ $obj, $callback ], $option_name, 'edit', FALSE, $field_name, $this );
                            }
                        } else {
                            if ( function_exists( $callback) ) {
                                call_user_func( $callback , $option_name, 'edit', FALSE, $field_name, $this );
                            }
                        }
                    }
                    // Just show me the field
                    else {
                        $site_option = $this->network ? get_site_option( $option_name ) : FALSE;
                        $value_source = $this->network && isset( $site_option[ $field_name ] ) ? $site_option[ $field_name ] : $option_name . '[' . $field_name . ']';
                        $count_characters = $this->character_count && isset( $this->character_count[ $field_title ] ) && is_int( $this->character_count[ $field_title ] ) ? $this->character_count[ $field_title ] : FALSE;
                        $field_settings['value_source'] = $value_source;
                        if ( isset( $_GET[ $field_name ] ) ) {
                            $field_settings['force_value'] = sanitize_text_field( $_GET[ $field_name ] );
                        }
                        if ( $count_characters ) {
                            echo '<div class="count-characters" data-character-limit="' . (int) $count_characters . '">';
                            echo '<span class="character-count-info">
                                    <span class="statement">Maximum ' . (int) $count_characters . ' characters</span>
                                    <span class="status"><span class="number">' . (int) $count_characters . '</span> characters remaining</span>
                                </span>';
                        }
                        echo $this->option_fields_display( $type, $field_name, $field_options, $field_settings );
                        if ( $count_characters ) {
                            echo '</div>';
                        }
                    }
                }, $this->name . '_' . $this->tab_id( $tab_name ), $this->name . '_' . $this->tab_id( $tab_name ) . '_section', [ 'class' => implode( ' ', [ str_replace( '_', '-', $field_name ), $type_class . '-label', $type_class . '-type' ] ) ] );
            }
        }
    }

    /* Page display callback */
    public function options_form() {
        $capability = is_multisite() ? 'manage_network_options' : 'manage_options';
        $show_meta_field_name = current_user_can( $capability );
        $tabs = count( $this->fields ) > 1;
        $tab_names = count( $this->fields ) ? array_keys( $this->fields ) : [ '' ];
        // Only accept a tab this screen actually has
        $tab_ids = [];
        foreach ( $tab_names as $tab_name ) {
            $tab_ids[] = $this->name . '_' . $this->tab_id( $tab_name );
        }
        $requested_tab = isset( $_GET['tab'] ) && is_string( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : '';
        $active_tab = in_array( $requested_tab, $tab_ids, TRUE ) ? $requested_tab : $tab_ids[0];
        $option_name = $tabs ? $active_tab : $this->name; ?>
        <?php if ( $show_meta_field_name ) : ?><p class="footnote small"><b>Option Name:</b> <?php echo esc_html( $option_name ) ?></p><?php endif; ?>
        <h1><?php echo esc_html( $this->page_title ) ?></h1>

        <?php // if there is more than one section, make tabs ?>
        <?php if ( $tabs ) : ?>
            <h2 class="nav-tab-wrapper">
            <?php foreach ( $this->fields as $tab_name => $fields ) :
                $tab_url = add_query_arg( [ 'page' => $this->name, 'tab' => $this->name . '_' . $this->tab_id( $tab_name ) ] ); ?>
                <a href="<?php echo esc_url( $tab_url ) ?>" class="nav-tab<?php echo $active_tab == $this->name . '_' . $this->tab_id( $tab_name ) ? ' nav-tab-active' : ''; ?>"><?php echo esc_html( $tab_name ) ?></a>
            <?php endforeach; ?>
            </h2>
        <?php endif; ?>

        <form action="<?php echo esc_url( $this->network ? network_admin_url( 'edit.php?action=' . $this->name ) : admin_url( 'options.php' ) ) ?>" method="post">
            <?php
            $button_text = is_array( $this->button_text ) ? ( isset( $this->button_text[ $tab_name ] ) ? $this->button_text[ $tab_name ] : 'Submit' ) : $this->button_text;
            // Show the fields
            foreach ( $this->fields as $tab_name => $fields ) {
                if ( ! $tabs || ( $tabs && $active_tab && $active_tab == $this->name . '_' . $this->tab_id( $tab_name ) ) ) {
                    $text = is_array( $this->text ) ? ( isset( $this->text[ $tab_name ] ) ? $this->text[ $tab_name ] : '' ) : $this->text;
                    $pre_form_callback = is_array( $this->pre_form_callback ) && ! is_object( current( $this->pre_form_callback ) ) ? ( isset( $this->pre_form_callback[ $tab_name ] ) ? $this->pre_form_callback[ $tab_name ] : FALSE ) : $this->pre_form_callback;
                    // Pre-Form Callback
                    if ( $pre_form_callback ) {
                        // Method
                        if ( is_array( $pre_form_callback ) ) {
                            if ( isset( $pre_form_callback[0] ) && isset( $pre_form_callback[1] ) ) {
                                $obj = $pre_form_callback[0];
                                $function = $pre_form_callback[1];
                                if ( method_exists( $obj, $function ) ) {
                                    call_user_func( [ $obj, $function ] );
                                }
                            }
                        }
                        // Function
                        else {
                            if ( function_exists( $pre_form_callback ) ) {
                                call_user_func( $pre_form_callback );
                            }
                        }
                    }
                    // Echo text
                    if ( strlen( $text ) ) {
                        echo devo_autop( $text );
                    }
                    // settings_fields( $option_group )
                    settings_fields( $this->name . '_' . $this->tab_id( $tab_name ) );
                    // do_settings_sections( $page )
                    echo '<div class="' . esc_attr( str_replace( '_', '-', $this->name . '-' . $this->tab_id( $tab_name ) ) ) . '-fields">';
                        do_settings_sections( $this->name . '_' . $this->tab_id( $tab_name ) );
                    echo '</div>';
                    ?><input type="hidden" value="<?php echo esc_attr( $this->name . '_' . $this->tab_id( $tab_name ) ) ?>" name="tab"><?php
                }
            }
            // Submit button
            if ( $button_text !== FALSE ) {
                submit_button( $button_text );
            } ?>
        </form>
    <?php
        // Post-Form Callback
        if ( isset( $this->post_form_callback ) ) {
            // Method
            if ( is_array( $this->post_form_callback ) ) {
                if ( isset( $this->post_form_callback[0] ) && isset( $this->post_form_callback[1] ) ) {
                    $obj = $this->post_form_callback[0];
                    $function = $this->post_form_callback[1];
                    if ( method_exists( $obj, $function ) ) {
                        call_user_func( [ $obj, $function ] );
                    }
                }
            }
            // Function
            else {
                if ( function_exists( $this->post_form_callback ) ) {
                    call_user_func( $this->post_form_callback );
                }
            }
        }
    }

    /* Sanitize Callback */
    public function options_validate( $input ) {
        $validated_input = [];
        $validated_input_temp = [];
        $current_tab_id = isset( $_POST['tab'] ) && is_string( $_POST['tab'] ) ? $this->tab_id( sanitize_key( wp_unslash( $_POST['tab'] ) ) ) : '';
        foreach ( $this->fields as $tab_name => $fields ) {
            $tab_id = $this->tab_id( $this->name . ' ' . $tab_name );
            if ( $tab_id == $current_tab_id ) {
                foreach ( $fields as $field_title => $settings ) {
                    $field_name = $this->field_name( $field_title );
                    $type = $this->get_field_type( $settings );
                    $array = strpos( $type, '_array' ) !== FALSE;
                    $obj = is_array( $settings ) && isset( $settings[0] ) && isset( $settings[1] ) && strpos( $settings[1], '_callback' ) ? $settings[0] : FALSE;
                    $is_multi = strpos( $type, 'multi' ) !== FALSE;
                    $type = $array && ! $is_multi ? str_replace( '_array', '', $type ) : $type;
                    // Value submitted for the field
                    if ( isset( $input[ $field_name ] ) ) {
                        // Custom callback
                        if ( strpos( $type, '_callback' ) !== FALSE ) {
                            $callback = $type;
                            // Method
                            if ( $obj && method_exists( $obj, $callback ) ) {
                                $value = call_user_func( [ $obj, $callback ], $this->name, 'validate', $input[ $field_name ], $field_name );
                            }
                            // Function
                            elseif ( function_exists( $callback ) ) {
                                $value = call_user_func( $callback , $this->name, 'validate', $input[ $field_name ], $field_name );
                            }
                        }
                        // Something else
                        else {
                            $validate = new DO_Form_Field_Validate( $type, $input[ $field_name ] );
                            //$value = $validate->value;
                            $value = is_json( $validate->value ) ? json_decode( $validate->value ) : $validate->value;
                        }
                    }
                    // If there's NOT a value for this field
                    else {
                        $value = '';
                    }
                    // Put the sanitized value in the validated array
                    $validated_input[ $field_name ] = $value;
                }
            }
        }
        // OnSave Callback
        if ( isset( $this->onsave_callback ) ) {
            // Method
            if ( is_array( $this->onsave_callback ) ) {
                if ( isset( $this->onsave_callback[0] ) && isset( $this->onsave_callback[1] ) ) {
                    $obj = $this->onsave_callback[0];
                    $function = $this->onsave_callback[1];
                    if ( method_exists( $obj, $function ) ) {
                        $validated_input = call_user_func( [ $obj, $function ], $validated_input );
                    }
                }
            }
            // Function
            else {
                if ( function_exists( $this->onsave_callback ) ) {
                    $validated_input = call_user_func( $this->onsave_callback, $validated_input );
                }
            }
        }
        return $validated_input;
    }

    /* Saves a network options screen. Network admin forms post to edit.php
     * rather than options.php, so core's nonce and capability checks don't
     * run; they have to happen here. */
    public function network_callback () {
        if ( ! current_user_can( 'manage_network_options' ) ) {
            wp_die( esc_html__( 'Sorry, you are not allowed to manage options for this network.', 'developers_only' ), 403 );
        }
        // The tab names the settings group, and so the nonce settings_fields() printed
        $tab_ids = [];
        foreach ( array_keys( $this->fields ) as $tab_name ) {
            $tab_ids[] = $this->name . '_' . $this->tab_id( $tab_name );
        }
        $tab = isset( $_POST['tab'] ) && is_string( $_POST['tab'] ) ? sanitize_key( wp_unslash( $_POST['tab'] ) ) : '';
        if ( ! in_array( $tab, $tab_ids, TRUE ) ) {
            wp_die( esc_html__( 'Unknown settings section.', 'developers_only' ), 400 );
        }
        check_admin_referer( $tab . '-options' );
        // Same option name the screen reads from (see options_init)
        $option_name = count( $this->fields ) > 1 ? $tab : $this->name;
        $input = isset( $_POST[ $option_name ] ) && is_array( $_POST[ $option_name ] ) ? wp_unslash( $_POST[ $option_name ] ) : [];
        $validated = $this->options_validate( $input );
        update_site_option( $option_name, $validated );
        wp_safe_redirect(
            add_query_arg(
                [ 'page' => $this->name, 'updated' => 'true' ],
                ( is_multisite() ? network_admin_url( 'admin.php' ) : admin_url( 'admin.php' ) )
            )
        );
        exit;
    }

    public function option_fields_display( $type, $field_name, $field_options, $settings = [] ) {
        $field =  new DO_Form_Field_Display( $type, $field_name, $field_options, $settings );
        return $field->output;
    }

    public function admin_notices() {
        $admin_notices = get_option( $this->admin_notices );
        if ( ! is_array( $admin_notices ) ) {
            $admin_notices = strlen( $admin_notices ) ? [ $admin_notices ] : [];
        }
        foreach ( $admin_notices as $notice ) : ?>
            <?php if ( isset( $notice['message'] ) && strlen( $notice['message'] ) ) : ?>
                <div class="<?php echo esc_attr( isset( $notice['type'] ) ? $notice['type'] : '' ) ?> notice">
                    <p><?php echo wp_kses_post( $notice['message'] ) ?></p>
                </div>
            <?php endif; ?>
        <?php endforeach;
        update_option( $this->admin_notices , '' );
    }

    private function get_baseline_capability( $user_role ) {
        $capability_map = [
            'subscriber' => 'read',
            'contributor' => 'edit_posts',
            'author' => 'publish_posts',
            'editor' => 'edit_others_posts',
            'administrator' => 'manage_options',
            'super-admin' => 'manage_network_options',
        ];
        return isset( $capability_map[ $user_role ] ) ? $capability_map[ $user_role ] : FALSE;
    }

    public function field_name( $field_label ) {
        $field_label = str_replace( '/[<>]/', '', $field_label );
        $field_name = trim( strtolower( preg_replace('/[^\w\d_]/', '_', preg_replace( '/[-\(\)]/', '', $field_label ) ) ), '_' );
        $field_name = str_replace( '__', '_', $field_name );
        $field_name = str_replace( '__', '_', $field_name );
        return $field_name;
    }

    // Organize fields by field_name
    public function fields_by_name() {
        $fields_by_name = [];
        foreach ( $this->all_fields as $field_label => $field_options ) {
            $fields_by_name[ $this->field_name( $field_label ) ] = $field_label;
        }
        return $fields_by_name;
    }

    // Determin field type from $settings array
    private function get_field_type( $settings ) {
        if ( is_array( $settings ) && isset( $settings['type'] ) ) {
            $type = $settings['type'];
        }
        elseif ( is_a( $settings, 'DO_CPT_Form_Field' ) ) {
            $type = $settings->field_type;
        }
        // Method
        elseif ( is_array( $settings ) && isset( $settings[0] ) && isset( $settings[1] ) && strpos( $settings[1], '_callback' ) ) {
            $type = $settings[1];
        }
        else {
            $type = $settings;
        }
        return $type;
    }
}