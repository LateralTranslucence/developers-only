<?php
// View the permalinks
class DO_View_Permalinks {
	public function __construct() {
		// Import Option Screen
        $permalinks = new DO_Options_Screen( 'do_view_permalinks' );
        $permalinks->settings( [
            'page_title' => 'View Permalinks',
            'onsave_callback' => [ $this, 'refresh_permalinks' ],
            'button_text' => 'Refresh',
            'post_form_callback' => [ $this, 'view_permalinks' ],
            'icon' => '\f177',
        ] );
        $permalinks->fields( [ 'Nothing' => 'hidden', ] );
	}

    public function view_permalinks() {
        global $wp_rewrite;
        $wp_rewrite->rewrite_rules();
        do_var_dump( $wp_rewrite->rules );
    }

	public function refresh_permalinks() {
		flush_rewrite_rules();
	}
}
if ( is_admin() ) {
    $view_permalinks = new DO_View_Permalinks();
}