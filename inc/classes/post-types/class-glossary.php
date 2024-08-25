<?php
// Glossary
class DO_Glossary_Term {
    public function __construct() {
        $glossary = new DO_Custom_Post_Type( 'do_glossary_term' );
        $glossary->settings( [
            'display_name' => 'Glossary Term',
            'slug' => 'glossary',
            'post_title' => 'Term',
            'post_name' => 'Term',
            'post_content' => 'Definition',
            'has_archive' => FALSE,
            'show_in_menu' => 'resources',
            'seo' => [
                'title' => 'post_title',
                'description' => 'Definition',
            ],
            'hide_field' => 'Hidden',
            'schema' => [
                '@type' => 'ItemPage',
                'breadcrumb' => 'Breadcrumbs',
                'headline' => 'Term',
                //'image' => 'SEO Image',
                //'description' => 'SEO Description',
            ],
        ] );
        $glossary->meta_fields( [
            'Term' => 'text',
            'Definition' => 'wp_editor',
            'Related Posts' => [
                'type' => 'post_browser',
                'settings' => [
                    'post_types' => [
                        'do_blog',
                        'do_video',
                        'do_press_release',
                        'do_media_coverage',
                        'do_case_study',
                        'do_white_paper',
                        'do_analyst_report',
                        'do_topic'
                    ],
                    'limit' => 5,
                ],
            ],
            'Source' => 'url',
            'Hidden' => 'binary',
        ] );
        $glossary->admin_fields( [ 'Title', 'Definition', 'Hidden', 'post_date' ] );
    }
}
$do_glossary_term = new DO_Glossary_Term();