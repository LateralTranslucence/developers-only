<?php
// View phpinfo()
class DO_View_PHPInfo {
	public function __construct() {
		// Import Option Screen
        $phpinfo = new DO_Options_Screen( 'devo_view_phpinfo' );
        $phpinfo->settings( [
            'submenu' => 'tools.php',
            'page_title' => 'PHPInfo',
            'button_text' => 'Refresh',
            'post_form_callback' => [ $this, 'view_phpinfo' ],
            'icon' => '\f177',
        ] );
        $phpinfo->fields( [ 'Nothing' => 'hidden', ] );
	}

    public function view_phpinfo() {
        phpinfo();
    }
}
if ( is_admin() ) {
    $view_phpinfo = new DO_View_PHPInfo();
}