<?php
/*
 *
 */

class DO_Send_Simple_Email {

    public  $status_code,
            $status_log;
    private $default_from_address,
            $default_from_name;

    public function __construct( $from_address = FALSE, $from_name = FALSE, $to_addresses = FALSE, $subject = '', $content = FALSE, $content_type = 'text/html' ) {
        if ( ! $to_addresses || ! $content ) {
            return null;
        }
        $default_from_address = get_option( 'admin_email' );
        $default_from_name = get_bloginfo( 'name' );

        $this->send( $from_address ? $from_address : $default_from_address, $from_name ? $from_name : $default_from_name, explode( ',', $to_addresses ), $subject, $content, $content_type );
    }

    private function send( $from_address, $from_name, $to_addresses, $subject, $content, $content_type ) {
        // Set up filters to change the from email and name
        add_filter( 'wp_mail_from', function() use ( $from_address ) {
            return $from_address;
        });
        add_filter( 'wp_mail_from_name', function() use ( $from_name ) {
            return $from_name;
        });

        $headers = array();
        if ( strtolower( $content_type ) === 'text/html' ) {
            $headers[] = 'Content-Type: text/html; charset=UTF-8';
        }

        $to = array_map( 'trim', $to_addresses );
        $success = wp_mail( $to, $subject, $content, $headers );

        if ( $success ) {
            $this->status_code = 200;
            $this->status_log = 'Email sent successfully.';
        } else {
            $this->status_code = 500;
            $this->status_log = 'Failed to send email.';
        }

        // Remove filters to avoid affecting other emails
        remove_all_filters( 'wp_mail_from' );
        remove_all_filters( 'wp_mail_from_name' );
    }
}