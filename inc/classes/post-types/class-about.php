<?php
/*
 * About
 *
 */


class DO_About extends DO_Landing_Page {
    protected function set_post_type() {
        return 'do_about';
    }

    protected function set_post_type_display_name() {
        return 'About Pages';
    }

    protected function set_post_type_slug() {
        return 'about';
    }

    protected function set_post_type_rest_slug() {
        return 'about';
    }

    protected function set_meta_prefix() {
        return 'about';
    }

    public function set_post_type_settings() {
        $landing_page_settings = parent::set_post_type_settings();
        return array_merge( $landing_page_settings, [
            'icon' => '\f337',
            'show_in_menu' => FALSE,
        ] );
    }
}
$do_about = new DO_About();