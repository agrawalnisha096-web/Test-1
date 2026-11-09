<?php
/**
 * Plugin Name: Qubik – landing page leads to Lead CRM
 * Description: Sends each submission of the landing page's hidden Divi Contact Form (/marketing/automation/) to the Lead CRM webhook, server-side. The webhook URL is read from wp-config.php (QUBIK_LEADCRM_WEBHOOK) and never appears in page source.
 * Version: 1.0.0
 *
 * Install: copy this file to wp-content/mu-plugins/ (create the folder if needed). Must-use plugins load automatically; no activation needed.
 * Configure: in wp-config.php, above "That's all, stop editing!", add:
 *     define( 'QUBIK_LEADCRM_WEBHOOK', 'https://…the private webhook URL…' );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'et_pb_contact_form_submit', 'qubik_leadcrm_on_divi_submit', 10, 3 );
add_action( 'qubik_leadcrm_retry', 'qubik_leadcrm_send', 10, 2 );

/**
 * Divi fires et_pb_contact_form_submit after a Contact Form module is submitted.
 *
 * @param array      $fields     Field ID => array( 'value' => ..., 'label' => ... ).
 * @param bool|mixed $has_error  True when Divi rejected the submission.
 * @param array      $form_info  Form metadata (post ID, form number, etc.).
 */
function qubik_leadcrm_on_divi_submit( $fields, $has_error, $form_info = array() ) {
	if ( $has_error || ! is_array( $fields ) ) {
		return;
	}
	if ( ! defined( 'QUBIK_LEADCRM_WEBHOOK' ) || '' === QUBIK_LEADCRM_WEBHOOK ) {
		return;
	}
	// Only the landing page form: it is the only Divi form with these fields.
	if ( ! isset( $fields['variant'], $fields['landing_page'] ) ) {
		return;
	}

	$get = function ( $key ) use ( $fields ) {
		if ( ! isset( $fields[ $key ] ) ) {
			return '';
		}
		$raw = is_array( $fields[ $key ] ) ? ( isset( $fields[ $key ]['value'] ) ? $fields[ $key ]['value'] : '' ) : $fields[ $key ];
		return trim( wp_strip_all_tags( (string) $raw ) );
	};

	$details = array(
		'Wants to fix'       => $get( 'automate' ),
		'Staff'              => $get( 'staff' ),
		'Annual revenue'     => $get( 'revenue' ),
		'Timing'             => $get( 'timing' ),
		'Biggest challenge'  => $get( 'challenge' ),
		'Their cost estimate' => $get( 'estimate' ),
		'Page version'       => $get( 'variant' ),
	);
	$message = array();
	foreach ( $details as $label => $value ) {
		if ( '' !== $value ) {
			$message[] = $label . ': ' . $value;
		}
	}

	$payload = array(
		'name'           => $get( 'name' ),
		'email'          => $get( 'email' ),
		'phone'          => $get( 'phone' ),
		'business_name'  => $get( 'company' ),
		'message'        => implode( "\n", $message ),
		'gclid'          => $get( 'gclid' ),
		'gbraid'         => $get( 'gbraid' ),
		'wbraid'         => $get( 'wbraid' ),
		'utm_source'     => $get( 'utm_source' ),
		'utm_medium'     => $get( 'utm_medium' ),
		'utm_campaign'   => $get( 'utm_campaign' ),
		'utm_term'       => $get( 'utm_term' ),
		'landing_page'   => $get( 'landing_page' ),
		'submission_id'  => wp_generate_uuid4(),
		// Extra fields; the CRM keeps anything it doesn't map.
		'wants_to_fix'   => $get( 'automate' ),
		'staff'          => $get( 'staff' ),
		'annual_revenue' => $get( 'revenue' ),
		'timing'         => $get( 'timing' ),
		'challenge'      => $get( 'challenge' ),
		'cost_estimate'  => $get( 'estimate' ),
		'page_version'   => $get( 'variant' ),
		'consent'        => $get( 'consent' ),
		'source'         => 'qubik.com.au landing page',
		'submitted_at'   => gmdate( 'c' ),
	);
	$payload = array_filter( $payload, function ( $value ) {
		return '' !== $value;
	} );

	// The CRM needs a name plus a phone or an email.
	if ( empty( $payload['name'] ) || ( empty( $payload['email'] ) && empty( $payload['phone'] ) ) ) {
		return;
	}

	qubik_leadcrm_send( $payload, 1 );
}

/**
 * POST the lead. 200/201 = received. Network errors, 429 and 5xx are retried
 * (up to 5 attempts, backing off) with the same submission_id, so the CRM never
 * creates a duplicate. Other 4xx responses are logged and not retried.
 */
function qubik_leadcrm_send( $payload, $attempt = 1 ) {
	if ( ! defined( 'QUBIK_LEADCRM_WEBHOOK' ) || '' === QUBIK_LEADCRM_WEBHOOK ) {
		return;
	}
	$response = wp_remote_post(
		QUBIK_LEADCRM_WEBHOOK,
		array(
			'timeout' => 5,
			'headers' => array( 'Content-Type' => 'application/json' ),
			'body'    => wp_json_encode( $payload ),
		)
	);
	$code = is_wp_error( $response ) ? 0 : (int) wp_remote_retrieve_response_code( $response );

	if ( 200 === $code || 201 === $code ) {
		return;
	}

	$id = isset( $payload['submission_id'] ) ? $payload['submission_id'] : '';
	if ( $attempt < 5 && ( 0 === $code || 429 === $code || $code >= 500 ) ) {
		wp_schedule_single_event( time() + 120 * $attempt, 'qubik_leadcrm_retry', array( $payload, $attempt + 1 ) );
		error_log( sprintf( 'Qubik Lead CRM: attempt %d failed (HTTP %d) for submission %s; retry scheduled.', $attempt, $code, $id ) );
		return;
	}
	error_log( sprintf( 'Qubik Lead CRM: giving up on submission %s after attempt %d (HTTP %d).', $id, $attempt, $code ) );
}
