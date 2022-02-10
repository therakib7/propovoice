<?php

namespace Ncpi\Controllers\Api\Types;

use WP_Query;

class Invoice
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/invoices', [
            [
                'methods' => 'GET', 
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_permission'], 
            ],
            [
                'methods' => 'POST', 
                'callback' => [$this, 'create'],
                'permission_callback' => [$this, 'create_permission']
            ],
        ]);

        register_rest_route('ncpi/v1', '/invoices/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_single'],
            'permission_callback' => [$this, 'get_permission'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ncpi/v1', '/invoices/(?P<id>\d+)', array(
            'methods' => 'PUT',
            'callback' => [$this, 'update'],
            'permission_callback' => [$this, 'update_permission'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ncpi/v1', '/invoices/(?P<id>[0-9,]+)', array(
            'methods' => 'DELETE',
            'callback' => [$this, 'delete'],
            'permission_callback' => [$this, 'delete_permission'],
            'args' => array(
                'id' => array(
                    'sanitize_callback'  => 'sanitize_text_field',
                ),
            ),
        ));
    }

    public function get( $req )
    {
        $request = $req->get_params();

        $per_page = 10;
        $offset = 0;

        if ( isset($request['per_page']) ) {
            $per_page = $request['per_page'];
        }

        if ( isset($request['page']) && $request['page'] > 1 ) {
            $offset = ( $per_page * $request['page'] ) - $per_page;
        }

        $args = array(
             
            // 'role'    => 'client',
            // 'orderby' => 'registered',
            // 'order'   => 'DESC'
            'post_type' => 'ncpi_invoice',
            'post_status' => 'publish',
            'posts_per_page' => $per_page, 
            'offset' => $offset,
        ); 

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        if ( isset( $request['first_name'] ) ) { 
            /* $args['meta_query'][] = array( 
                array(
                    'key'     => 'first_name',
                    'value'   => $request['first_name'],
                    'compare' => 'LIKE'
                )
            ); */
        } 

        $query = new WP_Query( $args );
        $total_data = $query->get_total(); //use this for pagination 
        $result = $data = [];
        while ( $query->have_posts() ) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id;
            $query_data['client'] = [
                'first_name' => 'First Name',
                'last_name' => 'Last Name',
                'email' => 'abac@gmail.com',
            ];  
            $query_data['total'] = '200';
            $query_data['paid'] = '100';
            $query_data['due'] = '100';
            // $user_data['company_name'] = get_post_meta($user->ID, 'company_name', true);
            $data[] = $query_data;

        } 

            $query_data = [];
            $query_data['id'] = 10;
            $query_data['client'] = [
                'first_name' => 'First Name',
                'last_name' => 'Last Name',
                'email' => 'abac@gmail.com',
            ];  
            $query_data['total'] = '200';
            $query_data['paid'] = '100';
            $query_data['due'] = '100';
            $query_data['date'] = '10 Feb 2020';
            // $user_data['company_name'] = get_post_meta($user->ID, 'company_name', true);
            $data[] = $query_data;

        $result['result'] = $data;
        $result['total'] = $total_data; 

        return wp_send_json_success($result); 
    }

    public function get_single( $req )
    { 
        
        // return wp_send_json_success(4354);
        $url_params = $req->get_url_params();
        $user_id      = $url_params['id'];

        $user = get_user_by('id', $user_id );

        $data = []; 

            $field = []; 
            $field['id'] = $user->ID;
            $field['first_name'] = $user->first_name;
            $field['last_name'] = $user->last_name;
            $field['email'] = $user->user_email;
            $field['company_name'] = get_user_meta($user->ID, 'company_name', true);
            $field['web'] = get_user_meta($user->ID, 'web', true);
            $field['mobile'] = get_user_meta($user->ID, 'mobile', true);
            $field['zip'] = '1245';
            $field['date'] = $user->user_registered;

        $data['user'] = $field; 

        return wp_send_json_success($data);
    }

    public function create($req)
    {
        // Check for nonce security
        /* if (! wp_verify_nonce($req['nonce'], 'exdda-ajax-nonce')) {
			die('Busted!');
		} */

        $reg_errors             = new \WP_Error;
        $first_name             = sanitize_text_field($req['first_name']);
        $last_name              = sanitize_text_field($req['last_name']);
        $useremail              = strtolower(sanitize_email($req['email']));
        $company_name           = sanitize_text_field($req['company_name']);
        $web                    = esc_url_raw($req['web']);
        $mobile           = sanitize_text_field($req['mobile']);
        // $password               = esc_attr($req['password']);
        // $password_confirmation  = esc_attr($req['password_confirmation']);

        if (
            empty($first_name) ||
            empty($useremail)
            // empty($password) ||
            // empty($password_confirmation)
        ) {
            $reg_errors->add('field', esc_html__('Required form field is missing', 'propovoice'));
        }

        if (!is_email($useremail)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        if (email_exists($useremail)) {
            $reg_errors->add('email', esc_html__('Email Already exist!', 'propovoice'));
        }

        // if (5 > strlen($password)) {
        // 	$reg_errors->add('password', esc_html__('Password length must be greater than 5!', 'propovoice'));
        // }

        // if ($password != $password_confirmation) {
        // 	$reg_errors->add('password', esc_html__('Password confirmation din\'t match!', 'propovoice'));
        // }

        if ($reg_errors->get_error_messages()) {
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
            $user_id = wp_insert_user($userdata);

            if (!is_wp_error($user_id)) {
                update_user_meta($user_id, 'company_name', $company_name);
                update_user_meta($user_id, 'web', $web);
                update_user_meta($user_id, 'mobile', $mobile);

                $user = new \WP_User($user_id);
                $user->set_role('client');

                wp_send_json_success($user_id);
            } else {
                wp_send_json_error();
            }
        }
    }

    public function update($req)
    { 
        $params = $req->get_params();
        $reg_errors            = new \WP_Error;
        $first_name             = sanitize_text_field($params['first_name']);
        $last_name              = sanitize_text_field($params['last_name']);
        $useremail              = strtolower(sanitize_email($params['email']));
        $company_name           = sanitize_text_field($params['company_name']);
        $web                    = esc_url_raw($params['web']);
        $mobile                 = sanitize_text_field($params['mobile']);

        if (
            empty($useremail) ||
            empty($first_name)
        ) {
            $reg_errors->add('field', esc_html__('Required form field is missing', 'exdda'));
        }

        if (!is_email($useremail)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'exdda'));
        }

        $url_params = $req->get_url_params();
        $user_id      = $url_params['id'];
        $current_user = get_user_by('id', $user_id);

        if (($useremail != $current_user->user_email) && email_exists($useremail)) {
            $reg_errors->add('email', esc_html__('Email Already exist!', 'exdda'));
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

            $user_data = wp_update_user($data);

            if (!is_wp_error($user_data)) {
                update_user_meta($user_id, 'company_name', $company_name);
                update_user_meta($user_id, 'web', $web);
                update_user_meta($user_id, 'mobile', $mobile);
                wp_send_json_success($user_id);
            } else {
                wp_send_json_error();
            }
        }
    }

    public function delete($req)
    {
        $url_params = $req->get_url_params();

        $ids = explode(',', $url_params['id']);
        foreach ($ids as $id) {
            require_once(ABSPATH . 'wp-admin/includes/user.php');
            wp_delete_user($id);
        }
        wp_send_json_success($ids);
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

    public function update_permission()
    {
        return current_user_can('edit_posts');
    }

    public function delete_permission()
    {
        return current_user_can('delete_posts');
    }
}
