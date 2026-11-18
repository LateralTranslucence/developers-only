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
        // get_bloginfo() returns the name HTML-escaped ("Tom&#039;s"); a mail
        // header wants the plain text.
        $default_from_name = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );

        // Recipients arrive either as a comma-separated string (the "simple send"
        // path reads one meta field) or as an array (the routing-logic path maps
        // a field value to a list). explode() on an array is a fatal in PHP 8.
        $recipients = is_array( $to_addresses ) ? $to_addresses : explode( ',', (string) $to_addresses );
        $recipients = array_filter( array_map( 'trim', $recipients ), 'is_email' );
        if ( ! $recipients ) {
            $this->status_code = 400;
            $this->status_log = 'No valid recipient address.';
            return;
        }

        $this->send( $from_address ? $from_address : $default_from_address, $from_name ? $from_name : $default_from_name, $recipients, $subject, $content, $content_type );
    }

    private function send( $from_address, $from_name, $to_addresses, $subject, $content, $content_type ) {
        // Set up filters to change the from email and name.
        // Hold the closures in variables so they can be removed individually
        // afterwards. remove_all_filters() would strip every other callback on
        // these hooks too, silently breaking SMTP plugins (WP Mail SMTP,
        // Postmark, SendGrid, ...) that set the envelope sender there.
        $from_address_filter = function() use ( $from_address ) {
            return $from_address;
        };
        $from_name_filter = function() use ( $from_name ) {
            return $from_name;
        };
        add_filter( 'wp_mail_from', $from_address_filter );
        add_filter( 'wp_mail_from_name', $from_name_filter );

        $headers = array();
        if ( strtolower( $content_type ) === 'text/html' ) {
            $headers[] = 'Content-Type: text/html; charset=UTF-8';
        }

        try {
            $to = array_map( 'trim', $to_addresses );
            $success = wp_mail( $to, $subject, $content, $headers );

            if ( $success ) {
                $this->status_code = 200;
                $this->status_log = 'Email sent successfully.';
            } else {
                $this->status_code = 500;
                $this->status_log = 'Failed to send email.';
            }
        }
        finally {
            // Scoped to this send only, and in a finally block so a throwing
            // mailer can't leave the from-address pinned for the rest of the request.
            remove_filter( 'wp_mail_from', $from_address_filter );
            remove_filter( 'wp_mail_from_name', $from_name_filter );
        }
    }
}