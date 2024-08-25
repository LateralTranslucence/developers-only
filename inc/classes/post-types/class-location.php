<?php
/*
 * Locations
 *
 */

class DO_Location extends DO_Landing_Page {
    protected function set_post_type() {
        return 'do_location';
    }

    protected function set_post_type_display_name() {
        return 'Location Pages';
    }

    protected function set_post_type_slug() {
        return 'location';
    }

    protected function set_post_type_rest_slug() {
        return 'location';
    }

    protected function set_meta_prefix() {
        return 'location';
    }

    protected function set_panel_fields() {
        $landing_page_fields = parent::set_panel_fields();
        return array_merge( $landing_page_fields, [
            'hero' => [
                'Title' => 'text',
                'Background' => 'background',
                'Copy' => 'wp_editor',
                'Media' => 'media',
                'Image Link' => 'image_link',
                'CTA' => 'cta',
                'Promo' => [
                    'type' => 'multi_array',
                    'limit' => 1,
                    'fields' => [
                        'Pretitle' => 'text',
                        'Headline' => 'html',
                        'URL' => 'url',
                        'Image' => 'media',
                    ],
                ],
            ],
            'admin' => array_merge( $landing_page_fields['admin'], [
                'Legal Name' => 'text',
                'Address' => 'html',
                'Phone Number' => 'varchar',
                'Email' => 'email',
                'Coordinates' => [
                    'type' => 'multi',
                    'fields' => [
                        'Latitude' => 'varchar',
                        'Longitude' => 'varchar',
                    ],
                ],
                'Country' => 'country',
                'Region' => [
                    'type' => 'select',
                    'options' => [ 'Americas', 'Europe', 'Asia/Pacific' ],
                ],
                'Employees' => 'int',
                'Hidden' => 'binary',
            ] ),
        ] );
    }

    protected function set_post_type_settings() {
        $landing_page_default_settings = parent::set_post_type_settings();
        return array_merge( $landing_page_default_settings, [
            'show_in_menu' => 'edit.php?post_type=do_about',
        ] );
    }
}

$do_location = new DO_Location();