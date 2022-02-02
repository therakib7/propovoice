<?php

namespace Ncpi\Controllers\Api\Types;

use WP_Query;

class Client
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {
        register_rest_route('ncpi/v1', '/clients', [
            'methods' => 'GET',
            'callback' => [$this, 'get'],
            'permission_callback' => [$this, 'get_permission']
        ]);

        register_rest_route('ncpi/v1', '/clients', [
            'methods' => 'POST',
            'callback' => [$this, 'create'],
            'permission_callback' => [$this, 'create_permission']
        ]);
    }

    public function get() {
 
        $args = array(
            'role'    => 'client',
            'orderby' => 'registered',
            'order'   => 'DESC'
        );
        $users = get_users( $args );
        
        $data = [];
        foreach ( $users as $user ) {

            $field = [];

            $field['id'] = $user->ID;
            $field['first_name'] = $user->first_name;
            $field['last_name'] = $user->last_name;
            $field['email'] = $user->user_email;
            $field['company_name'] = get_user_meta($user->ID, 'company_name', true);
            $field['web'] = get_user_meta($user->ID, 'web', true);
            $field['mobile'] = get_user_meta($user->ID, 'mobile', true);
            $field['zip'] = '1245';
            $field['date'] = '10 Mar 2022';

            $data[] = $field; 
        } 

        return wp_send_json_success($data);
    } 

    public function create( $req ) {
        // Check for nonce security
        /* if (! wp_verify_nonce($req['nonce'], 'exdda-ajax-nonce')) {
			die('Busted!');
		} */

        $reg_errors             = new \WP_Error;
        $first_name             = sanitize_text_field( $req['first_name'] );
        $last_name              = sanitize_text_field( $req['last_name'] );
        $useremail              = strtolower(sanitize_email( $req['email']) ); 
        $company_name           = sanitize_text_field( $req['company_name'] );
        $web                    = esc_url_raw( $req['web'] );
        $mobile           = sanitize_text_field( $req['mobile'] );
        // $password               = esc_attr($req['password']);
        // $password_confirmation  = esc_attr($req['password_confirmation']);

        if ( 
            empty($first_name) ||
            empty($useremail) ||
            empty($company_name)
            // empty($password) ||
            // empty($password_confirmation)
        ) {
            $reg_errors->add('field', esc_html__('Required form field is missing', 'propovoice'));
        }

        if ( !is_email($useremail) ) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        if ( email_exists($useremail) ) {
            $reg_errors->add('email', esc_html__('Email Already exist!', 'propovoice'));
        }

        // if (5 > strlen($password)) {
        // 	$reg_errors->add('password', esc_html__('Password length must be greater than 5!', 'propovoice'));
        // }

        // if ($password != $password_confirmation) {
        // 	$reg_errors->add('password', esc_html__('Password confirmation din\'t match!', 'propovoice'));
        // }

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $userdata = [
                'user_login' => $useremail,
                'user_email' => $useremail,
                // 'user_pass'  => $password,
                'user_pass'  => wp_generate_password(8, true, true),
                // 'display_name' => $name,
                'first_name' => $first_name,
                'last_name'  => $last_name,
            ];
            $user_id = wp_insert_user( $userdata );

            if ( !is_wp_error( $user_id ) ) {
                update_user_meta($user_id, 'company_name', $company_name); 
                update_user_meta($user_id, 'web', $web); 
                update_user_meta($user_id, 'mobile', $mobile); 

                $user = new \WP_User( $user_id );
                $user->set_role( 'client' );

                wp_send_json_success($user_id);
            } else {
                wp_send_json_error();
            }
        }
    }

    // check permission
    public function get_permission()
    {
        return true;
    }

    public function create_permission()
    {
        return current_user_can('publish_posts');
    }
}
