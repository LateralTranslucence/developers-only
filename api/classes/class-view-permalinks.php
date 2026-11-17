<?php
// View the permalinks
class DO_View_Permalinks {
	public function __construct() {
		// Import Option Screen
        $permalinks = new DO_Options_Screen( 'devo_view_permalinks' );
        $permalinks->settings( [
            'page_title' => 'View Permalinks',
            'onsave_callback' => [ $this, 'refresh_permalinks' ],
            'button_text' => 'Refresh',
            'post_form_callback' => [ $this, 'view_permalinks' ],
            'icon' => '\f177',
        ] );
        $permalinks->fields( [ 'Nothing' => 'hidden', ] );
	}

    // Lists the current rewrite rules, including DO_Redirect and DO_Rewrite ones
    public function view_permalinks() {
        global $wp_rewrite;
        $rules = $wp_rewrite->rewrite_rules();
        if ( ! is_array( $rules ) || ! count( $rules ) ) {
            echo '<p>' . esc_html__( 'No rewrite rules found. Pretty permalinks may be turned off.', 'developers_only' ) . '</p>';
            return;
        }
        echo '<table class="widefat striped"><thead><tr><th>' . esc_html__( 'Pattern', 'developers_only' ) . '</th><th>' . esc_html__( 'Rewrites to', 'developers_only' ) . '</th></tr></thead><tbody>';
        foreach ( $rules as $pattern => $rewrite ) {
            echo '<tr><td><code>' . esc_html( $pattern ) . '</code></td><td><code>' . esc_html( $rewrite ) . '</code></td></tr>';
        }
        echo '</tbody></table>';
    }

	public function refresh_permalinks() {
		flush_rewrite_rules();
	}
}
if ( is_admin() ) {
    $view_permalinks = new DO_View_Permalinks();
}