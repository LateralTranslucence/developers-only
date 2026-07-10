<?php
include locate_template( '/api/classes/post-types/class-admin-page.php' );
class DO_Admin_Pages {
    public function __construct() {
        if ( is_admin() ) {
            $devo_admin_page = DO_Admin_Page::get_instance();
            $this->create_pages();
        }
    }

    private function create_pages() {
        $posts = get_posts( [
            'post_type' => 'devo_admin_page',
            'nopaging' => TRUE,
            'fields' => 'ids',
        ] );
        if ( count( $posts ) ) {
            foreach ( $posts as $post_id ) {
                $name = get_post_field( 'post_name', $post_id );
                $menu = devo_get_post_meta( $post_id, 'page_show_in_menu' );
                $menu_position = devo_get_post_meta( $post_id, 'page_menu_position' );
                $icon = devo_get_post_meta( $post_id, 'page_menu_icon' );
                $permissions = devo_get_post_meta( $post_id, 'page_permissions' );
                $template = devo_get_post_meta( $post_id, 'page_template' );
                $settings = [
                    'post_id' => $post_id,
                    'page_title' => get_post_field( 'post_title', $post_id ),
                ];
                if ( strlen( $menu ) ) {
                    $settings['submenu'] = $menu;
                }
                if ( strlen( $menu_position ) ) {
                    $settings['menu_position'] = $menu_position;
                }
                if ( strlen( $icon ) ) {
                    $settings['icon'] = $icon;
                }
                if ( strlen( $permissions ) ) {
                    $settings['restrict_users'] = $permissions;
                }
                if ( strlen( $template ) ) {
                    $settings['template'] = $template;
                }
                $admin_page = new DO_Admin_Page_Screen( $name );
                $admin_page->settings( $settings );
            }
        }
    }
}
class DO_Admin_Page_Screen extends DO_Options_Screen {
    private $post_id;
    private $template;

    public function __construct( $name = '', $type = 'page' ) {
        parent::__construct( $name, $type );
    }

    public function settings( $settings = FALSE ) {
        if ( ! $settings ) {
            return;
        }
        // Settings in parent
        parent::settings( $settings );
        // Template
        if ( isset ( $settings['template'] ) ) {
            $this->template = $settings['template'];
        }
        // Post ID
        if ( isset ( $settings['post_id'] ) ) {
            $this->post_id = $settings['post_id'];
        }
    }

    public function page_content() {
        //$tabs = count( $this->fields ) > 1;
        //$tab_names = count( $this->fields ) ? array_keys( $this->fields ) : [ '' ];
        //$active_tab = isset( $_GET['tab'] ) ? $_GET['tab'] : $this->tab_id( $tab_names[0] ); ?>

        <h1><?php echo $this->page_title ?></h1>

        <?php // if there is more than one section, make tabs ?>
        <?php /*if ( $tabs ) :
            $url_query_vars = array_merge( $_GET, [ 'page' => $this->name ] ); ?>
            <h2 class="nav-tab-wrapper">
            <?php foreach ( $this->fields as $tab_name => $fields ) :
                $url_query_vars['tab'] = $this->tab_id( $tab_name ); ?>
                <a href="?<?php echo fc_array_to_query_string( $url_query_vars, '=', '&' ) ?>" class="nav-tab<?php echo $active_tab == $this->tab_id( $tab_name ) ? ' nav-tab-active' : ''; ?>"><?php echo $tab_name ?></a>
            <?php endforeach; ?>
            </h2>
        <?php endif; */


        // Page Callback
        if ( isset( $this->page_callback ) ) {
            // Method
            if ( is_array( $this->page_callback ) ) {
                if ( isset( $this->page_callback[0] ) && isset( $this->page_callback[1] ) ) {
                    $obj = $this->page_callback[0];
                    $function = $this->page_callback[1];
                    if ( method_exists( $obj, $function ) ) {
                        call_user_func( [ $obj, $function ] );
                    }
                }
            }
            // Function
            else {
                if ( function_exists( $this->page_callback ) ) {
                    call_user_func( $this->page_callback );
                }
            }
        } elseif ( isset ( $this->template ) ) {
            $template = locate_template( $this->template );
            if ( $template ) {
                include( $template );
            }
        } elseif ( isset ( $this->post_id ) ) {
            echo devo_autop( get_post_field( 'post_content', $this->post_id ) );
        }
    }
}
if ( is_admin() ) {
    $admin_pages = new DO_Admin_Pages();
}