<?php
/*
 *
 */

class DO_Send_Simple_Email {

    public $default_from_address;
    public $default_from_name;

    public function __construct( $from_address = FALSE, $from_name = FALSE, $to_addresses = FALSE, $subject = '', $content = FALSE, $content_type = 'text/html' ) {
        if ( ! $to_addresses || ! $content ) {
            return;
        }
        $default_from_address = 'loren@layeraltranslucence.com';
        $default_from_name = '{DevelopersOnly}';

        $this->send( $from_address ? $from_address : $default_from_address, $from_name ? $from_name : $default_from_name, explode( ',', $to_addresses ), $subject, $content, $content_type );
    }

    private function send( $from_address, $from_name, $to_addresses, $subject, $content, $content_type ) {
        // Get the SendGrid API
		require_once( locate_template( 'libs/sendgrid-php/sendgrid-php.php' ) );

        $email = new \SendGrid\Mail\Mail();
        $email->setFrom( "$from_address", "$from_name" );
        $email->setSubject( "$subject" );
        foreach ( $to_addresses as $to_address ) {
            $email->addTo( trim( $to_address ) );
        }
        $email->addContent(
            "text/html", "$content"
        );
        $sendgrid = new \SendGrid( SENDGRID_API_KEY );
        try {
			$response = $sendgrid->send( $email );
			if ( strpos( (string)$response->statusCode(), '2' ) !== 0 ) {
				$log = $response->statusCode() . "\n";
				foreach ( $response->headers() as $header ) {
					$log .= $header . "\n";
				}
				$log .= $response->body() . "\n";
				error_log( $log );
			}
		} catch ( Exception $e ) {
			error_log( 'Caught exception: ' . $e->getMessage() . "\n" );
		}
    }
}