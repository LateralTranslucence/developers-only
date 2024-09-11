<?php
/**
 * Site Updates Email class
 */
include locate_template( '/inc/classes/post-types/class-email-subscriber.php' );

class DO_Site_Updates_Email {
 	private $message_options;
 	private $preferences_options;

 	function __construct() {
		// Vars
		$this->message_options = get_option( 'do_email_options_message' );
		$subscribe_form = isset( $this->message_options['subscribe_form'] ) && strlen( $this->message_options['subscribe_form'] ) ? str_replace( '-', '_', $this->message_options['subscribe_form'] ) : FALSE;
		// Preferences page rewrite
		$preferences_rewrite = new DO_Rewrite( [ 'from' => 'site-updates', 'template' => 'site-updates.php', 'parameter_count' => 1 ] );

		// Post type and options screen
		add_action( 'after_setup_theme', [ $this, 'post_type' ], 3 );
		add_action( 'after_setup_theme', [ $this, 'email_options' ], 3 );
		// Form class submit hook
		if ( $subscribe_form ) {
			add_action( 'do_form_submit_' . $subscribe_form, [ $this, 'add_subscriber' ] );
		}
		// wp cron job
		add_action( 'do_site_updates_email_hook', [ $this, 'cron_job' ] );
		// Schedule wp cron job
		add_action( 'init', [ $this, 'schedule_cron_job' ] );
		// Uncomment to send email now...
		//add_action( 'admin_init', [ $this, 'cron_job' ] );
		// Uncomment to delete wp_cron hook
		//wp_unschedule_event( wp_next_scheduled( 'do_site_updates_email_hook' ), 'do_site_updates_email_hook' );

		// Preferences screen
		add_action( 'generate_rewrite_rules' , [ $this, 'preferences_rewrite_rules' ] );
		add_filter( 'query_vars', [ $this, 'preferences_query_vars' ] );
		add_action( 'template_include', [ $this, 'preferences_template_include' ] );
	}

	// Create subscriber post type
	public function post_type() {
		$email_subscriber = DO_Email_Subscriber::get_instance();
	}
	// Create email options page
	public function email_options() {
		// Options Screen
		$option_screen = new DO_Options_Screen( 'do_email_options' );
	    $option_screen->settings( [
	    	'page_title' => 'Site Updates Email Options',
	    	'submenu' => 'do_form',
	    	// Show date and time of next email
	    	'notes' => [
	    	    'Hour of Day' => '0 - 23',
	    	    'Day of Month' => '1 - 31',
	    	    'Max Posts' => 'The maximum number of posts to show. Default is 5.',
	    	    //'Add to marketing list' => 'Requires language on the sign up form indicating they are being added to a marketing list',
	    	],
	    ] );
	    $option_screen->fields( [
			'Subscribe Form' => new DO_CPT_Form_Field( 'select', 'do_form', 'post_title', 'Form ID' ),
	    	'From Name' => 'text',
	    	'From Address' => 'text',
	    	'Bcc' => 'text_array',
	    	//'Logo' => 'media',
	    	'Footer' => 'wp_editor',
			'Post Types' => [
				'type' => 'select_multiple',
				'options' => 'do_get_public_post_types',
			],
	    ], 'Message' );
	    $option_screen->fields( [
			'SendGrid Category' => 'text',
	    	'Subject' => 'text',
	    	'Title' => 'text',
	    	'Message' => 'wp_editor',
			'Max Posts' => 'int',
			'Hour of Day' => 'int',
	    ], 'Daily' );
	    $option_screen->fields( [
			'SendGrid Category' => 'text',
	    	'Subject' => 'text',
	    	'Title' => 'text',
	    	'Message' => 'wp_editor',
			'Max Posts' => 'int',
			'Hour of Day' => 'int',
			'Day of Week' => [
				'type' => 'select',
				'options' => [
					'sunday' => [
						'label' => 'Sunday',
						'value' => 0,
					],
					'monday' => [
						'label' => 'Monday',
						'value' => 1,
					],
					'tuesday' => [
						'label' => 'Tuesday',
						'value' => 2,
					],
					'wednesday' => [
						'label' => 'Wednesday',
						'value' => 3,
					],
					'thursday' => [
						'label' => 'Thursday',
						'value' => 4,
					],
					'friday' => [
						'label' => 'Friday',
						'value' => 5,
					],
					'saturday' => [
						'label' => 'Saturday',
						'value' => 6,
					],
				],
			],
	    ], 'Weekly' );
	    $option_screen->fields( [
			'SendGrid Category' => 'text',
	    	'Subject' => 'text',
	    	'Title' => 'text',
	    	'Message' => 'wp_editor',
			'Max Posts' => 'int',
			'Hour of Day' => 'int',
			'Day of Month' => 'int',
	    ], 'Monthly' );
	    $option_screen->fields( [
			'Daily' => 'date_time',
	    	'Weekly' => 'date_time',
	    	'Monthly' => 'date_time',
	    ], 'Last Sent' );
	    $option_screen->fields( [
			'Title' => 'text',
			'Email Label' => 'text',
			'Frequency Label' => 'text',
			'Button Label' => 'text',
			'Submitted Message' => 'wp_editor',
			'Unsubscribed Message' => 'wp_editor',
			'Email Not Found Message' => 'wp_editor',
	    ], 'Preferences Screen' );
	}

	// When form is submitted...
	public function add_subscriber( $form_value_array ) {
		$email_address = FALSE;
        $data = [];
		$serialize_me = [];
		// Prepare form data to be serialized
		foreach ( $form_value_array as $field_name => $field_details ) {
			$serialize_me[ $field_details['label'] ] = sanitize_text_field( $field_details['current_value'] );
			if ( $field_details['field_type'] == 'email' && $email_address === FALSE ) {
				$email_address = sanitize_email( $field_details['current_value'] );
			}
		}
		if ( $email_address ) {
			// Does this email address already exist?
			$subscriber_check = get_posts( [
				'post_type' => 'do_email_subscriber',
				'fields' => 'ids',
				'meta_query' => [
					[
						'key' => 'subscriber_email',
						'value' => $email_address,
						'compare' => '=',
					],
				],
			] );
			// Exists - update to active
			if ( count( $subscriber_check ) ) {
				$subscriber_id = current( $subscriber_check );
				update_post_meta( $subscriber_id, 'subscriber_active', 1 );
				update_post_meta( $subscriber_id, 'subscriber_frequency', 'weekly' );
			}
			// Doesn't exist - create it
			else {
				$create_subscriber_args = [
					'post_type' => 'do_email_subscriber',
					'post_status' => 'publish',
					'post_title' => $email_address,
					'post_content'  => '',
				];
				$subscriber_id = wp_insert_post( $create_subscriber_args );
				update_post_meta( $subscriber_id, 'subscriber_email', $email_address );
				update_post_meta( $subscriber_id, 'subscriber_active', 1 );
				update_post_meta( $subscriber_id, 'subscriber_frequency', 'weekly' );
				update_post_meta( $subscriber_id, 'subscriber_subjects', '' );
				update_post_meta( $subscriber_id, 'subscriber_data', serialize( $serialize_me ) );
				update_post_meta( $subscriber_id, 'subscriber_date_subscribed', time() );
				update_post_meta( $subscriber_id, 'subscriber_date_last_updated', time() );
				update_post_meta( $subscriber_id, 'subscriber_date_last_email', '' );
				update_post_meta( $subscriber_id, 'subscriber_date_unsubscribed', '' );
			}
			// Send email confirming subscription
			$message_settings = $this->message_options;
			$from_address = isset( $message_settings['from_address'] ) ? $message_settings['from_address'] : 'loren.rice@ipsoft.com';
			$from_name = isset( $message_settings['from_name'] ) ? $message_settings['from_name'] : '{DevelopersOnly}';
			$preferences_url = home_url( '/site-updates/' . $email_address . '/' );
			$email_frequency = do_get_post_meta( $subscriber_id, 'subscriber_frequency' );
			$email_content = <<<HTML
			<p>Thank you for signing up to recieve updates from {DevelopersOnly}! You will recieve a $email_frequency email with the latest content from {DevelopersOnly}.</p>
			<p>To change the frequency of emails or to unsubscribe, please use the link below: <br>
			<a href="$preferences_url">$preferences_url</a></p>
HTML;
			new DO_Send_Simple_Email( $from_address, $from_name, $email_address, __( '{DevelopersOnly} Site Updates', 'developers_only' ), $email_content );
		}
	}

	public function schedule_cron_job() {
		if ( ! wp_next_scheduled( 'do_site_updates_email_hook' ) ) {
			wp_schedule_event( time(), 'hourly', 'do_site_updates_email_hook' );
		}
	}

	public function cron_job() {
		// Current
		$now = current_time( 'timestamp' );
		$current_hour = date( 'G', $now );
		$current_day_of_week = date( 'w', $now );
		$current_day_of_month = date( 'j', $now );
		$current_day_of_year = date( 'z', $now );
		$current_week_of_year = date( 'W', $now );
		$current_month_of_year = date( 'n', $now );
		$current_year = date( 'Y', $now );
		
		// Email settings
		$email_settings = $this->message_options;
		$email_options_post_types = isset( $email_settings['post_types'] ) ? $email_settings['post_types'] : FALSE;
		
		// Last sent
		$last_sent = get_option( 'do_email_options_last_sent' );
		$last_sent_daily = isset( $last_sent['daily'] ) ? $last_sent['daily'] : FALSE;
		$last_sent_weekly = isset( $last_sent['weekly'] ) ? $last_sent['weekly'] : FALSE;
		$last_sent_monthly = isset( $last_sent['monthly'] ) ? $last_sent['monthly'] : FALSE;

		// Timeframes in seconds
		$twenty_four_hours = 86400;
		$one_week = $twenty_four_hours * 7;
		$thirty_days = $twenty_four_hours * 30;

		// Daily
		$daily_settings = get_option( 'do_email_options_daily' );
		$daily_hour = isset( $daily_settings['hour_of_day'] ) ? $daily_settings['hour_of_day'] : 9;
		$daily_max_posts = isset( $daily_settings['max_posts'] ) ? $daily_settings['max_posts'] : 5;
		// If $last_sent_daily day of year is less than $current_day_of_year
		// and if $current_hour is $daily_hour or later
		if ( ! $last_sent_daily || ( ( $current_year > date( 'Y', $last_sent_daily ) || date( 'z', $last_sent_daily ) < $current_day_of_year ) && $current_hour >= $daily_hour ) ) {
			// get posts
			$daily_posts = $this->get_posts( $email_options_post_types, $daily_max_posts, $last_sent_daily ? $last_sent_daily : time() - $twenty_four_hours );
			// get recipients
			$daily_recipients = $this->get_recipients( 'daily', $last_sent_daily );
			// If there are posts and recipients
			if ( count( $daily_posts ) && count( $daily_recipients ) ) {
				// compose and send the email
				$daily_email_content = $this->get_email_content( $daily_posts, 'daily' );
				// update $last_sent
				$last_sent['daily'] = $this->send( $daily_recipients, $daily_email_content, 'daily' );
			}
		}

		// Weekly
		$weekly_settings = get_option( 'do_email_options_weekly' );
		$weekly_day = isset( $weekly_settings['day_of_week'] ) ? $weekly_settings['day_of_week'] : FALSE;
		$weekly_hour = isset( $weekly_settings['hour_of_day'] ) ? $weekly_settings['hour_of_day'] : FALSE;
		$weekly_max_posts = isset( $weekly_settings['max_posts'] ) ? $weekly_settings['max_posts'] : FALSE;
		// If $last_sent_weekly week of year is less than $current_week_of_year
		// and $current_day_of_week greater than or equal to $weekly_day
		// and $current_hour is greater than or equal to $weekly_hour
		if ( ! $last_sent_weekly || ( ( $current_year > date( 'Y', $last_sent_weekly ) || date( 'W', $last_sent_weekly ) < $current_week_of_year ) && $current_day_of_week >= $weekly_day && $current_hour >= $weekly_hour ) ) {
			// get posts
			$weekly_posts = $this->get_posts( $email_options_post_types, $weekly_max_posts, $last_sent_weekly ? $last_sent_weekly : time() - $one_week );
			// get recipients
			$weekly_recipients = $this->get_recipients( 'weekly', $last_sent_weekly );
			// If there are posts and recipients
			if ( count( $weekly_posts ) && count( $weekly_recipients ) ) {
				// compose and send the email
				$weekly_email_content = $this->get_email_content( $weekly_posts, 'weekly' );
				// update $last_sent
				$last_sent['weekly'] = $this->send( $weekly_recipients, $weekly_email_content, 'weekly' );
			}
		}

		// Monthly
		$monthly_settings = get_option( 'do_email_options_monthly' );
		$monthly_day = isset( $monthly_settings['day_of_month'] ) ? $monthly_settings['day_of_month'] : FALSE;
		$monthly_hour = isset( $monthly_settings['hour_of_day'] ) ? $monthly_settings['hour_of_day'] : FALSE;
		$monthly_max_posts = isset( $monthly_settings['max_posts'] ) ? $monthly_settings['max_posts'] : FALSE;
		// If $last_sent_monthly month of year is less than $current_month_of_year
		// and $current_day_of_month greater than or equal to $monthly_day
		// and $current_hour is greater than or equal to $monthly_hour
		if ( ! $last_sent_monthly || ( ( date( 'n', $last_sent_monthly ) < $current_month_of_year || $current_year > date( 'Y', $last_sent_monthly ) ) && $current_day_of_month >= $monthly_day && $current_hour >= $monthly_hour ) ) {
			// get posts
			$monthly_posts = $this->get_posts( $email_options_post_types, $monthly_max_posts, $last_sent_monthly ? $last_sent_monthly : time() - $thirty_days );
			// get recipients
			$monthly_recipients = $this->get_recipients( 'monthly', $last_sent_monthly );
			// If there are posts and recipients
			if ( count( $monthly_posts ) && count( $monthly_recipients ) ) {
				// Compose the email
				$monthly_email_content = $this->get_email_content( $monthly_posts, 'monthly' );
				// Send the email / update $last_sent
				$last_sent['monthly'] = $this->send( $monthly_recipients, $monthly_email_content, 'monthly' );
			}
		}
		// Update update_option( do_email_updates_last_sent);
		update_option( 'do_email_options_last_sent', $last_sent );
	}

	private function get_posts( $post_types = 'any', $max_posts = 5, $last_sent_date = FALSE ) {
		$args = [
			'post_type' => $post_types,
			'max_posts' => $max_posts,
			'fields' => 'ids',
			'date_query' => [
				'after' => [
					'year' => date( 'Y', $last_sent_date ),
					'month' => date( 'n', $last_sent_date ),
					'day' => date( 'j', $last_sent_date ),
				],
				'inclusive' => TRUE,
			],
            'post_status' => 'publish',
			'meta_query' => [
				'relation' => 'OR',
                [
                    'key' => 'hide_post',
                    'value' => '',
                    'compare' => '=',
                ],
                [
                    'key' => 'hide_post',
                    'value' => '',
                    'compare' => 'NOT EXISTS',
                ],
			],
		];
        return get_posts( $args );
	}

	private function get_recipients( $frequency = FALSE, $last_sent = FALSE ) {
        $args = [
			'post_type' => 'do_email_subscriber',
			'fields' => 'ids',
			'meta_query' => [
				'relation' => 'AND',
				'active' => [
					'key' => 'subscriber_active',
					'value' => '1',
				],
				'frequency' => [
					'key' => 'subscriber_frequency',
					'value' => $frequency,
				],
                'last_sent' => [
                    'key' => 'subscriber_date_last_email',
                    'value' => date( 'Y-n-j', $last_sent ),
                    'compare' => '<',
                ]
			],
		];
        if ( DO_ENVIRONMENT !== 'prod' ) {
            $args['meta_query']['internal_only'] = [
                'key' => 'subscriber_email',
                'value' => '@ipsoft.com',
                'compare' => 'LIKE',
            ];
        }
		return get_posts( $args );
	}

	// Compose Email
	public function get_email_content( $post_ids = [], $frequency = FALSE ) {
		$frequency_settings = $frequency ? get_option( 'do_email_options_' . $frequency ) : [];
		$message_settings = $this->message_options;
		$subject = isset( $frequency_settings['subject'] ) ? $frequency_settings['subject'] : '';
		$title = isset( $frequency_settings['title'] ) ? $frequency_settings['title'] : '';
		$message = isset( $frequency_settings['message'] ) ? do_autop( $frequency_settings['message'] ) : '';
		$posts = '';
		$logo = home_url( '/wp-content/themes/developers-only/images/logos/black-on-white.svg' );
		$footer = isset( $message_settings['footer'] ) ? do_autop( $message_settings['footer'] ) : '';
		$utm = '?utm_source=site_updates_email&utm_medium=email&utm_campaign=site_updates_email' . ( $frequency ? '_' . $frequency : '' );
		$home_url = home_url( $utm );
		$unsubscribe_url = home_url( '/site-updates/unsubscribe/-email-/' . $utm );
		$preferences_url = home_url( '/site-updates/-email-/' . $utm );

		// Posts loop
		foreach ( $post_ids as $post_id ) {
			$post_title = get_the_title( $post_id );
			$post_url = get_permalink( $post_id ) . $utm;
			$post_publish_date = get_the_date( 'F j, Y', $post_id );
			$posts .= <<<HTML
			<p style="font-size: 1em">
				<a href="$post_url">$post_title</a><br>
				<span style="font-size: 0.85em">$post_publish_date</span>
			</p>
HTML;
		}
		$content = <<<HTML
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="UTF-8">
			<title>$subject</title>
		</head>
		<body style="font-family: Arial, san-serif;">
			<table width="100%" cellpadding="25" cellspacing="0" style="max-width: 650px !important; margin: 0 auto 0 !important;">
				<thead>
					<tr>
						<th align="left"><a href="$home_url"><img src="$logo" border="0" width="250px" height="75px"></a></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td align="left">
							<h1 style="font-size: 1.5em; font-weight: bold; margin-bottom: 1em">$title</h1>
							$message
							$posts
						</th>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td align="center" style="font-size: 0.85em; opacity: 0.75">
							$footer
							<p><a href="$unsubscribe_url">Unsubscribe</a> | <a href="$preferences_url">Manage Preferences</a></p>
						</th>
					</tr>
				</tfoot>
			</table>
		</body>
		</html>
HTML;
		return $content;
	}

	// Send the email
	// TODO: break recipients into chunks of 1000
	private function send( $recipients = FALSE, $message = FALSE, $frequency = FALSE ) {
		if ( ! $recipients || ! $message || ! $frequency ) {
			return;
		}
		// Get the SendGrid API
		require_once( locate_template( 'libs/sendgrid-php/sendgrid-php.php' ) );

		$frequency_settings = get_option( 'do_email_options_' . $frequency );
		$message_settings = $this->message_options;
		$subject = isset( $frequency_settings['subject'] ) ? $frequency_settings['subject'] : '';
		$from_address = isset( $message_settings['from_address'] ) ? $message_settings['from_address'] : 'loren.rice@ipsoft.com';
		$from_name = isset( $message_settings['from_name'] ) ? $message_settings['from_name'] : '{DevelopersOnly}';
		$bcc = isset( $message_settings['bcc'] ) && strlen( $message_settings['bcc'] ) ? explode( ';', $message_settings['bcc'] ) : FALSE;
		$recipient_addresses = [];

		// Get Recipient addresses
		foreach ( $recipients as $post_id ) {
			$recipient_addresses[] = strtolower( do_get_post_meta( $post_id, 'subscriber_email' ) );
		}
		// Merge in the BCCs
		if ( $bcc ) {
			$recipient_addresses = array_merge( $recipient_addresses, $bcc );
		}
		$recipient_addresses = array_unique( $recipient_addresses );
		// If the from address is in $recipient_addresses, remove it
		if ( in_array( $from_address, $recipient_addresses ) ) {
			unset( $recipient_addresses[ array_search( $from_address, $recipient_addresses ) ] );
		}
		// Initialize the email
		$email = new \SendGrid\Mail\Mail();
		$email->setFrom( $from_address, $from_name );
		$email->setSubject( $subject );
		
		// Set the BCCs
		$personalization = new \SendGrid\Mail\Personalization();
		$personalization->addTo( new \SendGrid\Mail\To( "$from_address", "$from_name" ) );
		foreach ( $recipient_addresses as $email_address ) {
			if ( strlen( $email_address ) && is_email( $email_address ) !== FALSE ) {
				$personalization->addBcc( new \SendGrid\Mail\Bcc( "$email_address" ) );
				$personalization->addSubstitution( "-email-", "$email_address" );
			}
		}
        $email->addPersonalization( $personalization );
		// Add the content
		$email->addContent(
			'text/html', $message
		);
		
		// Send the email, save any errors to the log
		$sendgrid = new \SendGrid( SENDGRID_API_KEY );
		try {
			$response = $sendgrid->send( $email );
			if ( strpos( (string)$response->statusCode(), '2' ) === 0 ) {
				// Update recipients 'Date Last Email' field
				foreach ( $recipients as $post_id ) {
					$email_address = do_get_post_meta( $post_id, 'subscriber_email' );
					if ( strlen( $email_address ) && is_email( $email_address ) !== FALSE ) {
						update_post_meta( $post_id, 'subscriber_date_last_email', time() );
					}
				}
				// Return timestamp for 'last_sent'
				return time();
			} else {
				$log = $response->statusCode() . "\n";
				foreach ( $response->headers() as $header ) {
					$log .= $header . "\n";
				}
				$log .= $response->body() . "\n";
				//do_var_dump($log);
				error_log( $log );
			}
		} catch ( Exception $e ) {
			error_log( 'Caught exception: ' . $e->getMessage() . "\n" );
		}
	}

	// Preferences screen
	public function preferences_rewrite_rules( $wp_rewrite ) {
		$wp_rewrite->rules = [ 'site-updates$' => 'index.php?do_email_preferences=1' ] + $wp_rewrite->rules;
		$wp_rewrite->rules = [ 'site-updates/([^/]+)$' => 'index.php?do_email_preferences=1&do_email_address=$matches[1]' ] + $wp_rewrite->rules;
		$wp_rewrite->rules = [ 'site-updates/unsubscribe$' => 'index.php?do_email_preferences=1' ] + $wp_rewrite->rules;
		$wp_rewrite->rules = [ 'site-updates/unsubscribe/([^/]+)$' => 'index.php?do_email_preferences=1&do_unsubscribe=1&do_email_address=$matches[1]' ] + $wp_rewrite->rules;
	}
    
	public function preferences_query_vars( $vars ) {
        array_push( $vars, 'do_email_preferences' );
        array_push( $vars, 'do_unsubscribe' );
        array_push( $vars, 'do_email_address' );
        return $vars;
    }

	public function preferences_template_include( $template ) {
	    global $wp_query;
		if ( isset( $wp_query->query_vars['do_email_preferences'] ) ) {
			$template = locate_template( 'templates/site-updates.php' );
		}
        return $template;
	}
}
$site_updates = new DO_Site_Updates_Email();