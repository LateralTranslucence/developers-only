<?php
// Legal
class DO_Legal {
    public function __construct() {
        $legal = new DO_Custom_Post_Type( 'devo_legal', [
            'labels' => [
                'name' => 'Legal',
                'menu_name' => 'Legal',
                'add_new_item' => 'Add New Legal Entry',
                'edit_item' => 'Edit Legal Entry',
                'all_items' => 'Legal Entries',
                'singular_name' => 'Legal Entry',
            ],
        ] );
        $legal->settings( [
            'display_name' => 'Legal',
            'post_title' => 'Title',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'post_name' => 'Slug',
            'slug' => 'legal',
            'has_archive' => FALSE,
            'icon' => '\f334',
            'seo' => [
                'title' => 'Title',
                'description' => 'Description',
            ],
            'hide_field' => 'Hidden',
            //'restrict_users' => [ 'legal', 'editor', 'administrator' ],
            'breadcrumbs' => [
                'Legal &amp; Privacy' => '/legal/',
            ],
            'schema' => [
                '@type' => 'ItemPage',
                'breadcrumb' => 'Breadcrumbs',
                'headline' => 'Title',
                //'image' => 'SEO Image',
                'description' => 'Description',
            ],
        ] );
        $legal->meta_fields( [
            'Title' => 'text',
            'Slug' => 'varchar',
            'Effective Date' => 'date',
            'Last Updated Date' => 'date',
            'Last Updated Change' => 'varchar',
            'Description' => 'html',
            'Content' => 'wp_editor',
            'Hidden' => 'binary',
        ] );
        $legal->admin_fields( [ 'Title', 'Slug', 'Hidden', 'post_date' ] );
    }
}
$devo_legal = new DO_Legal();