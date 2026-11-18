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
		    $wp_rewrite->rules = [ $rewrite_from_path . '$' => 'index.php?devo_redirect=' . $rewrite_to_url ] + $wp_rewrite->rules;
		} else {
		    $wp_rewrite->rules = [ $rewrite_from_path . '/?$'  =>  'index.php?devo_redirect=' . urlencode( $rewrite_to_url ) ] + $wp_rewrite->rules;
		}
	}

    public function query_vars( $vars ) {
		if ( ! in_array( 'devo_redirect', $vars ) ) {
			array_push( $vars, 'devo_redirect' );
		}
        return $vars;
    }

	/* The devo_redirect query var is public - anyone can add
	 * ?devo_redirect=https://elsewhere to a URL - so its value is never used
	 * as the destination directly. It is only honoured when it is exactly what
	 * this redirect's own rewrite rule produces, and then the destination is
	 * built from the configured target. */
	public function template_include( $template ) {
	    global $wp_query;
		if ( ! isset( $wp_query->query_vars['devo_redirect'] ) || ! is_string( $wp_query->query_vars['devo_redirect'] ) ) {
			return $template;
		}
		// Already decoded: WordPress parse_str()s the rewrite's query, so
		// decoding again turned "+" into a space and %xx into its character,
		// and targets containing either never matched
		$requested = $wp_query->query_vars['devo_redirect'];
		$destination = FALSE;
		if ( strpos( $this->from_path, '[slug]' ) !== FALSE && strpos( $this->to_url, '[slug]' ) !== FALSE ) {
			$target_template = trim( $this->to_url, '/' );
			$pattern = '#^' . str_replace( '\\[slug\\]', '([^/]+)', preg_quote( $target_template, '#' ) ) . '$#';
			if ( preg_match( $pattern, $requested, $matches ) ) {
				$destination = str_replace( '[slug]', rawurlencode( $matches[1] ), $target_template );
			}
		} elseif ( $requested === $this->to_url ) {
			$destination = $this->to_url;
		}
		if ( $destination === FALSE ) {
			return $template;
		}
		// External targets are configured in code, so they may leave the site
		if ( preg_match( '#^https?://#i', $destination ) ) {
			wp_redirect( esc_url_raw( $destination ), $this->code );
		} else {
			wp_safe_redirect( home_url( '/' . trim( $destination, '/' ) . '/' ), $this->code );
		}
		exit;
	}
}