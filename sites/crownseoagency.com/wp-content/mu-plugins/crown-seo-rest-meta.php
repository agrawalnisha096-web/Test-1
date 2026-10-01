<?php
/**
 * Plugin Name: Crown SEO — REST-writable SEO meta
 * Description: Lets the GitHub content pipeline set Rank Math / Yoast title,
 *              description, focus keyword and canonical via the REST API.
 *              Deployed from Git (deploy.yml); must-use plugins load automatically.
 *
 * Without this, WordPress silently ignores these `meta` keys in REST requests,
 * so SEO titles/descriptions in content/ would never reach the live site.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', function () {
	$keys = array(
		// Rank Math
		'rank_math_title',
		'rank_math_description',
		'rank_math_focus_keyword',
		'rank_math_canonical_url',
		// Yoast
		'_yoast_wpseo_title',
		'_yoast_wpseo_metadesc',
		'_yoast_wpseo_focuskw',
		'_yoast_wpseo_canonical',
	);

	foreach ( array( 'post', 'page' ) as $post_type ) {
		foreach ( $keys as $key ) {
			register_post_meta( $post_type, $key, array(
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function ( $allowed, $meta_key, $post_id ) {
					return current_user_can( 'edit_post', $post_id );
				},
			) );
		}
	}
} );
