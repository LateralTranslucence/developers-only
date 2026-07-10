<?php
// Add rewrite rules send from wp path to wp path or template
class DO_Rewrite {

	public $code;
	public $from_path;
	public $parameter_count;
	public $template;
	public $to_path;
	public $var;

	public function __construct( $settings = [] ) {
		if ( ! count( $settings ) ) {
			trigger_error( 'Missing argument: $settings' . ' - DO_Rewrite( $settings = [] )' );
			return;
		}
        // Vars
		$this->from_path = isset( $settings['from'] ) ? trim( $settings['from'], '/' ) : FALSE;
		$this->var = isset( $settings['from'] ) ? sanitize_title_with_dashes( str_replace( '/', '-', $settings['from'] ) ) : FALSE;
		$this->to_path = isset( $settings['to'] ) ? trim( $settings['to'], '/' ) : FALSE;
		$this->code = isset( $settings['code'] ) ? $settings['code'] : 301;
		$this->template = isset( $settings['template'] ) ? $settings['template'] : FALSE;
		$this->parameter_count = isset( $settings['parameter_count'] ) ? $settings['parameter_count'] : 0;

        // If missing settings, return
        if ( ! ( $this->from_path && ( $this->to_path || $this->template ) ) ) {
            return;
        }

        // Hooks
        add_action( 'generate_rewrite_rules' , [ $this, 'rewrite_rules' ] );
		add_filter( 'query_vars', [ $this, 'query_vars' ] );
		add_action( 'template_include', [ $this, 'template_include' ] );
	}

	public function rewrite_rules( $wp_rewrite ) {
		devo_rewrite_generator( $wp_rewrite, $this->parameter_count, ( $this->from_path ? $this->from_path : $this->var ), FALSE, $this->var );
	}

    public function query_vars( $vars ) {
        array_push( $vars, $this->var );
        return $vars;
    }

	public function template_include( $template ) {
	    global $wp_query;
		if ( isset( $wp_query->query_vars[ $this->var ] ) ) {
            // Template
            if ( $this->template ) {
                if ( is_array( $this->template ) && isset( $this->template[0] ) && isset( $this->template[1] ) && is_object( $this->template[0] ) ) {
                    if ( method_exists( $this->template[0], $this->template[1]) ) {
                        call_user_func( [ $this->template[0], $this->template[1] ] );
                        return;
                    }
                } else {
                    return locate_template( $this->template );
                }
            }
            // Redirect
            elseif ( $this->to_path ) {
                wp_redirect(  home_url( '/' . $this->to_path . '/' ), $this->code );
                exit;
            }
		}
        return $template;
	}
}