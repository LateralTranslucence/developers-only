<?php
class DO_Admin_Page extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'devo_admin_page';
    }
    protected function post_type_args(): array {
        return [
            'exclude_from_search' => TRUE,
            'publicly_queryable' => FALSE,
            'show_in_nav_menus' => FALSE,
            'show_in_menu' => 'edit.php?post_type=devo_simple_page',
            'supports' => [ 'title', 'editor' ],
            'rewrite' => FALSE,
        ];
    }
    protected function settings(): array {
        return [
            'display_name' => 'Admin Pages',
            'restrict_users' => [ 'administrator' ],
            'has_archive' => FALSE,
            // Admin pages are wp-admin screens; their content is not for the
            // front end or the REST API.
            'public' => FALSE,
        ];
    }
    protected function meta_fields(): array {
        global $wp_roles;
        return [
            '' => [
                'Show In Menu' => 'varchar',
                'Menu Position' => 'int',
                'Menu Icon' => 'varchar',
                'Permissions' => [
                    'type' => 'select',
                    'options' =>  array_keys( $wp_roles->roles ),
                ],
                'Template' => 'varchar',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [];
    }
}