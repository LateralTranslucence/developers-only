<?php
// Redirect from wp path to external url
class DO_Redirect {

	public $from_path;
	public $to_url;
	public $code;

	public function __construct( $from = '', $to = '', $code = 301 ) {
		if ( ! strlen( $from ) || ! strlen( $to ) ) {
			trigger_error( 'Missing argument: ' . ( ! strlen( $from ) ? '$from_path' : '$to_url' ) . ' - DO_Redirect( $from_path, $to_url, $code=301 )' );
			return;
		}
		$this->from_path = trim( $from, '/' );
		$this->to_url = $to;
		$this->code = $code;
        add_action( 'generate_rewrite_rules' , [ $this, 'rewrite_rule' ] );
		add_filter( 'query_vars', [ $this, 'query_vars' ] );
		add_action( 'template_include', [ $this, 'template_include' ] );
	}

	public function rewrite_rule( $wp_rewrite ) {
		$rewrite_from_path = $this->from_path;
		$rewrite_to_url = $this->to_url;
		if ( strpos( $rewrite_from_path, '[slug]' ) !== FALSE && strpos( $rewrite_to_url, '[slug]' ) !== FALSE ) {
		    $rewrite_from_path = trim( str_replace( '[slug]', '([^/]+)', $rewrite_from_path ), '/' );
		    $rewrite_to_url = trim( str_replace( '[slug]', '$matches[1]', $rewrite_to_url ), '/' );
		    $wp_rewrite->rules = [ $rewrite_from_path . '$' => 'index.php?do_redirect=' . $rewrite_to_url ] + $wp_rewrite->rules;
		} else {
		    $wp_rewrite->rules = [ $rewrite_from_path . '/?$'  =>  'index.php?do_redirect=' . urlencode( $rewrite_to_url ) ] + $wp_rewrite->rules;
		}
	}

    public function query_vars( $vars ) {
		if ( ! in_array( 'do_redirect', $vars ) ) {
			array_push( $vars, 'do_redirect' );
		}
        return $vars;
    }

	public function template_include( $template ) {
	    global $wp_query;
		if( isset( $wp_query->query_vars['do_redirect'] ) ) {
            if ( strpos( $wp_query->query_vars['do_redirect'], 'http' ) !== FALSE ) {
                wp_redirect( urldecode( $wp_query->query_vars['do_redirect'] ), $this->code );
            } else {
                wp_safe_redirect( home_url( '/' . trim( urldecode( $wp_query->query_vars['do_redirect'] ), '/' ) . '/' ), $this->code );
            }
			exit;
		}
        return $template;
	}
}