<?php 
namespace Ndpv\Ctrl\Ajax\Type;

class Feedback {
	public function __construct() { 
		add_action('wp_ajax_ndpv_deactivate_feedback', [ $this, 'deactivate' ]);
	} 

	/**
     * Ajax ndpv deactivate feedback.
     *
     * Send the user feedback when Propovoice is deactivated.
     *
     * Fired by `wp_ajax_ndpv_deactivate_feedback` action.
     *
     * @since 1.0.0
     * @access public
     */
    public function deactivate()
    {
        if (! isset($_POST['_wpnonce']) || ! wp_verify_nonce($_POST['_wpnonce'], '_ndpv_deactivate_feedback_nonce')) {
            wp_send_json_error();
        }

        $reason_text = '';
        $reason_key = '';

        if (! empty($_POST['reason_key'])) {
            $reason_key = $_POST['reason_key'];
        }

        if (! empty($_POST[ "reason_{$reason_key}" ])) {
            $reason_text = $_POST[ "reason_{$reason_key}" ];
        } 

        wp_send_json_success();
    }

	/**
     * Get user IP Address
     */
    private function get_user_ip_address() {
        $response = wp_remote_get( 'https://icanhazip.com/' );

        if ( is_wp_error( $response ) ) {
            return '';
        }

        $ip = trim( wp_remote_retrieve_body( $response ) );

        if ( ! filter_var( $ip, FILTER_VALIDATE_IP ) ) {
            return '';
        }

        return $ip;
    }

    /**
     * Get site name
     */
    private function get_site_name() {
        $site_name = get_bloginfo( 'name' );

        if ( empty( $site_name ) ) {
            $site_name = get_bloginfo( 'description' );
            $site_name = wp_trim_words( $site_name, 3, '' );
        }

        if ( empty( $site_name ) ) {
            $site_name = esc_url( home_url() );
        }

        return $site_name;
    }
}
