<?php
class DO_News extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'devo_news';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [
            'post_title' => 'Title',
            'post_name' => 'Title',
            'post_thumbnail' => 'Image',
            'post_content' => 'Content',
            'post_excerpt' => 'Description',
            'slug' => 'news',
            'has_archive' => false,
            'bonus_fields' => [
                'language' => 'news_subject',
                'issue' => 'news_issue',
                'region' => 'news_region',
                'population' => 'news_population',
                'fund' => 'news_fund',
            ],
            'seo' => [
                'title' => 'Title',
                'image' => 'SEO Image||Image',
                'description' => 'Description',
            ],
            'hide_field' => 'Hidden',
            'character_count' => [
                'Title' => 60,
                'Description' => 160,
            ],
            'schema' => [
                '@type' => 'NewsArticle',
                'headline' => 'Title',
                'image' => 'Image',
                'text' => 'Content',
            ],
            'breadcrumbs' => [
                'News' => '/news/',
            ],
            'show_in_menu' => 'resource-library',
        ];
    }
    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [
            'News Article' => [
                //'Featured' => 'binary',
                'Title' => 'text',
                'Image' => 'media',
                'Image Credit' => 'varchar',
                'SEO Image' => 'media',
                'Description' => 'html',
                'Content' => 'wp_editor',
                //'Author' => 'varchar',
                'Hidden' => 'binary',
            ],
            'Taxonomy' => [
                'Language' => new DO_CPT_Form_Field( 'checkbox', 'devo_language', 'post_title', 'post_name' ),
                'Issue' => new DO_CPT_Form_Field( 'checkbox', 'devo_issue', 'post_title', 'post_name' ),
                'Region' => new DO_CPT_Form_Field( 'checkbox', 'devo_region', 'post_title', 'post_name' ),
                'Population' => new DO_CPT_Form_Field( 'checkbox', 'devo_population', 'post_title', 'post_name' ),
                'Fund' => new DO_CPT_Form_Field( 'checkbox', 'devo_fund', 'post_title', 'post_name' ),
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Hidden', 'post_date' ];
    }
}
$DO_News = DO_News::get_instance();