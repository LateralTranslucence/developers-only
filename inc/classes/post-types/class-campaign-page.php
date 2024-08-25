<?php
/*
 * Campaign Pages
 *
 */


class DO_Campaign_Page extends DO_Landing_Page {

    protected function set_post_type() {
        return 'do_campaign_page';
    }

    protected function set_post_type_display_name() {
        return 'Campaign Pages';
    }

    protected function set_post_type_slug() {
        return 'ad';
    }

    protected function set_post_type_rest_slug() {
        return 'ad';
    }

    protected function set_post_type_settings() {
        $landing_page_default_settings = parent::set_post_type_settings();
        return array_merge( $landing_page_default_settings, [
            'post_title' => 'Title',
            'noindex' => TRUE,
        ] );
    }
}
$do_campaign_page = new DO_Campaign_Page();