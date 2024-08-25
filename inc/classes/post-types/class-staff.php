<?php
// Staff Bios
class DO_Staff {
    public function __construct() {
        $staff = new DO_Custom_Post_Type( 'do_staff', [ 
            'labels' => [ 
                'name' => 'Staff',
                'menu_name' => 'Staff',
            ] 
        ] );
        $staff->settings( [
            'display_name' => 'Staff',
            'slug' => 'about/staff',
            'post_title' => [ 'First Name', 'Last Name' ],
            'post_name' => [ 'First Name', 'Last Name' ],
            'post_thumbnail' => 'Image',
            'post_content' => 'Bio',
            'rest_slug' => 'staff',
            'noindex' => TRUE,
            'has_archive' => FALSE,
            'show_in_menu' => 'edit.php?post_type=do_about',
            'show_in_admin_bar' => FALSE,
            'seo' => [
                'title' => 'post_title',
                'image' => 'Image',
                'description' => 'Bio',
            ],
            'hide_field' => 'Hidden',
        ] );
        $staff->meta_fields( [
            'First Name' => 'text',
            'Last Name' => 'text',
            'Position' => 'text',
            'Image' => 'media',
            'Bio' => 'wp_editor',
            'LinkedIn' => 'url',
            'Hidden' => 'binary',
        ] );
        $staff->admin_fields( [ 'Title', 'Position', 'Sort Order', 'post_date' ] );
    }
}
$do_staff = new DO_Staff();