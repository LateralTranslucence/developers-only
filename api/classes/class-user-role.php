<?php
/*
 * Create new user roles and give them permissions
 *
 * $roles = [
 *      $role_name => [ $post_types ]
 * ]
 */

class DO_User_Role {
    private $roles;
    public function __construct( $roles = [] ) {
        if ( ! count( $roles ) ) {
            return;
        }
        $this->roles = $roles;
        add_action( 'after_switch_theme', [ $this, 'role' ] );
        add_action( 'admin_init', [ $this, 'capabilities' ] );
        add_action( 'after_setup_theme', [ $this, 'edit_objects' ], 9 );
        add_action( 'init', [ $this, 'modify_post_type' ], 9 );
    }

    // Role
    public function role() {
        foreach ( $this->roles as $new_role => $role_post_types ) {
            remove_role( $new_role );
            $result = add_role(
                $new_role,
                __( str_replace( '_', ' ', ucwords( $new_role ) ) ),
                [ 'read' => TRUE, ]
            );
        }
    }

    // Post Type Capabilities
    public function capabilities() {
        foreach ( $this->roles as $new_role => $role_post_types ) {
            if ( ! is_array( $role_post_types ) ) {
                $role_post_types = [ $role_post_types ];
            }
            $post_types = [];
            foreach ( $role_post_types as $role_post_type ) {
                $post_types[] = [
                    'singular' => $role_post_type,
                    'plural' => devo_pluralize( $role_post_type ),
                ];
            }
            // Limited
            $role = get_role( $new_role );
            if ( $role ) {
                foreach ( $post_types as $type ) {
                    $role->add_cap( 'read_' . $type['singular'] );
                    $role->add_cap( 'edit_' . $type['singular'] );
                    $role->add_cap( 'edit_' . $type['plural'] );
                    $role->add_cap( 'edit_published_' . $type['plural'] );
                    $role->add_cap( 'publish_' . $type['plural'] );

                    $role->add_cap( 'read_private_' . $type['plural'] );
                    $role->add_cap( 'edit_others_' . $type['plural'] );
                    $role->add_cap( 'delete_others_' . $type['plural'] );
                    $role->add_cap( 'delete_private_' . $type['plural'] );
                    $role->add_cap( 'delete_published_' . $type['plural'] );
                }
            }
        }
    }

    // Add role to post type
    public function edit_objects() {
        foreach ( $this->roles as $new_role => $role_post_types ) {
            if ( ! is_array( $role_post_types ) ) {
                $role_post_types = [ $role_post_types ];
            }
            foreach ( $role_post_types as $role_post_type ) {
                $args = [
                    'capability_type' => [ $role_post_type, devo_pluralize( $role_post_type ) ],
                    'map_meta_cap' => TRUE,
                ];
                $modify_post_type = new DO_Custom_Post_Type( $role_post_type, $args );
            }
        }
    }

    public function modify_post_type() {
        foreach ( $this->roles as $new_role => $role_post_types ) {
            if ( ! is_array( $role_post_types ) ) {
                $role_post_types = [ $role_post_types ];
            }
            foreach ( $role_post_types as $post_type ) {
                $default_args = (array) get_post_type_object( $post_type );
                $args = array_merge(
                    // Default
                    $default_args,
                    // New capability
                    [ 'capability_type' => $new_role ]
                );
                // Register the post type
                register_post_type( $post_type, $args );
            }
        }
    }
}
