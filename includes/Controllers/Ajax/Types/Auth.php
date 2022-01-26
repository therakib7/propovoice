<?php

namespace Ncpi\Controllers\Ajax\Types;

class Auth {
	public function __construct() {
		add_action('wp_ajax_nopriv_ncpi_login', [$this, 'login']);
		add_action('wp_ajax_nopriv_ncpi_registration', [$this, 'registration']);

		add_action('wp_ajax_ncpi_profile', [$this, 'profile']);
	}

	public function login() {
		// Check for nonce security
		if (! wp_verify_nonce($_POST['nonce'], 'ncpi-ajax-nonce')) {
			die('Busted!');
		}

		$reg_errors = new \WP_Error;
		global $wpdb;

		//We shall SQL escape all inputs
		$username = $wpdb->escape($_REQUEST['username']);
		$password = $wpdb->escape($_REQUEST['password']);
		// $remember = $wpdb->escape($_REQUEST['rememberme']); 
		// $remember = ($remember) ? 'true' : 'false';

		if (empty($username) || empty($password)) {
			$reg_errors->add('field', esc_html__('Required form field is missing', 'propovoice'));
		}

		$login_data                  = [];
		$login_data['user_login']    = $username;
		$login_data['user_password'] = $password;
		// $login_data['remember']      = $remember;

		$user_verify = wp_signon($login_data, false);

		if (is_wp_error($user_verify)) {
			$reg_errors->add('field', esc_html__('Invalid login details', 'propovoice'));
		}

		if ($reg_errors->get_error_messages()) {
			wp_send_json_error($reg_errors->get_error_messages());
		} else {
			wp_send_json_success($user_verify);
		}
	}

	public function registration() {
		// Check for nonce security
		if (! wp_verify_nonce($_POST['nonce'], 'ncpi-ajax-nonce')) {
			die('Busted!');
		}

		$reg_errors             = new \WP_Error;
		$useremail              = strtolower(sanitize_email($_POST['email']));
		$first_name             = sanitize_text_field($_POST['first_name']);
		$last_name              = sanitize_text_field($_POST['last_name']);
		$company                = sanitize_text_field($_POST['bureau']);
		$password               = esc_attr($_POST['password']);
		$password_confirmation  = esc_attr($_POST['password_confirmation']);

		if (
			empty($first_name) ||
			empty($last_name) ||
			empty($useremail) ||
			empty($company) ||
			empty($password) ||
			empty($password_confirmation)
		) {
			$reg_errors->add('field', esc_html__('Required form field is missing', 'propovoice'));
		} 

		if (! is_email($useremail)) {
			$reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
		}

		if (email_exists($useremail)) {
			$reg_errors->add('email', esc_html__('Email Already exist!', 'propovoice'));
		}

		if (5 > strlen($password)) {
			$reg_errors->add('password', esc_html__('Password length must be greater than 5!', 'propovoice'));
		}

		if ($password != $password_confirmation) {
			$reg_errors->add('password', esc_html__('Password confirmation din\'t match!', 'propovoice'));
		}

		if ($reg_errors->get_error_messages()) {
			wp_send_json_error($reg_errors->get_error_messages());
		} else {
			$userdata = [
				'user_login' => $useremail,
				'user_email' => $useremail,
				'user_pass'  => $password,
				'first_name' => $first_name,
				'last_name'  => $last_name,
			];
			$id = wp_insert_user($userdata);

			if (! is_wp_error($id)) {
				update_user_meta($id, 'user_company', $company);

				$user_id = $id;
				$user = get_user_by( 'id', $user_id ); 
				if ( $user ) {
					wp_set_current_user( $user_id, $user->user_login );
					wp_set_auth_cookie( $user_id );
					do_action( 'wp_login', $user->user_login, $user );
				}

				wp_send_json_success($id);
			} else {
				wp_send_json_error();
			}
		}
	}

	public function profile() {
		// Check for nonce security
		if (! wp_verify_nonce($_POST['nonce'], 'ncpi-ajax-nonce')) {
			die('Busted!');
		}

		$reg_errors            = new \WP_Error;
		$useremail             = strtolower(sanitize_email($_POST['email']));
		$first_name            = sanitize_text_field($_POST['first_name']);
		$last_name             = sanitize_text_field($_POST['last_name']);
		$company               = sanitize_text_field($_POST['bureau']);
		$linkedin              = isset($_POST['linkedin']) ? sanitize_text_field($_POST['linkedin']) : '';
		$password              = esc_attr($_POST['password']);
		$password_confirmation = esc_attr($_POST['password_confirmation']);

		if (
			empty($useremail) ||
			empty($first_name) ||
			empty($last_name) ||
			empty($company)
			) {
			$reg_errors->add('field', esc_html__('Required form field is missing', 'propovoice'));
		}

		if (! is_email($useremail)) {
			$reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
		}

		$current_user = wp_get_current_user();
		$user_id      = $current_user->ID;

		if (($useremail != $current_user->user_email) && email_exists($useremail)) {
			$reg_errors->add('email', esc_html__('Email Already exist!', 'propovoice'));
		}

		if (
			($password && $password_confirmation) &&
			($password != $password_confirmation)
		) {
			if (5 > strlen($password)) {
				$reg_errors->add('password', esc_html__('Password length must be greater than 5!', 'propovoice'));
			}

			$reg_errors->add('password', esc_html__('Password confirmation din\'t match!', 'propovoice'));
		}

		if ($reg_errors->get_error_messages()) {
			wp_send_json_error($reg_errors->get_error_messages());
		} else {
			$data = [
				'ID'         => $user_id,
				'user_login' => $useremail,
				'user_email' => $useremail,
				'first_name' => $first_name,
				'last_name'  => $last_name,
			];

			if ($password && $password_confirmation) {
				$data['user_pass'] = $password;
			}

			$user_data = wp_update_user($data);

			if (! is_wp_error($user_data)) {
				update_user_meta($user_id, 'user_company', $company);
				update_user_meta($user_id, 'linkedin', $linkedin);
				wp_send_json_success($user_id);
			} else {
				wp_send_json_error();
			}
		}
	}
}
