<?php

namespace Ncpi\Controllers\Api\Types;

class Client
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/clients', [
            [
                'methods' => 'GET',
                // 'methods' => \WP_REST_Server::READABLE,
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_permission'],
            ],
            [
                'methods' => 'POST',
                // 'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [$this, 'create'],
                'permission_callback' => [$this, 'create_permission']
            ],
        ]);

        register_rest_route('ncpi/v1', '/clients/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/clients/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/clients/(?P<id>[0-9,]+)', array(
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

    public function get($req)
    {
        $request = $req->get_params();

        $per_page = 10;
        $offset = 0;

        if (isset($request['per_page'])) {
            $per_page = $request['per_page'];
        }

        if (isset($request['page']) && $request['page'] > 1) {
            $offset = ($per_page * $request['page']) - $per_page;
        }

        $search_value = isset($request['s'] ) ? trim($request['s']) : false;

        $args = array(
            'number' => $per_page,
            'offset' => $offset,
            'orderby' => 'registered',
            'order'   => 'DESC'
        );

        if (isset($request['email'])) {
            $args['search'] = $request['email']; //check email field
            $args['search_columns'] = array(
                'user_login',
                'user_nicename',
                'user_email',
                'user_url',
            );
        }

        if ( $search_value ) {
            $args['search'] = "*{$search_value}*"; //check email field
            $args['search_columns'] = array(
                'user_login',
                'user_nicename',
                'user_email',
                'user_url',
            );
        }

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        $args['meta_query'][] = array(
            array(
                'key'     => 'ncpi_member',
                'value'   => 1,
                'compare' => 'LIKE'
            )
        );

        if ( $search_value ) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'first_name',
                    'value'   => $search_value,
                    'compare' => 'LIKE'
                )
            );
        }

        if (isset($request['first_name'])) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'first_name',
                    'value'   => $request['first_name'],
                    'compare' => 'LIKE'
                )
            );
        }

        if (isset($request['last_name'])) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'last_name',
                    'value'   => $request['last_name'],
                    'compare' => 'LIKE'
                )
            );
        }

        if (isset($request['mobile'])) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'mobile',
                    'value'   => $request['mobile'],
                    'compare' => 'LIKE'
                )
            );
        }

        if (isset($request['company_name'])) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'company_name',
                    'value'   => $request['company_name'],
                    'compare' => 'LIKE'
                )
            );
        }

        if (isset($request['web'])) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'web',
                    'value'   => $request['web'],
                    'compare' => 'LIKE'
                )
            );
        }

        $all_users = new \WP_User_Query($args);
        $total_users = $all_users->get_total(); //use this for pagination
        $filtered = count($all_users->get_results()); //use this for determining if you have any users, although it seems unnecessary
        $result = [];

        //if ( $filtered > 0 ) {
        $data = [];
        foreach ($all_users->get_results() as $user) {
            $user_data = [];

            $user_data['id'] = $user->ID;
            $user_data['first_name'] = $user->first_name;
            $user_data['last_name'] = $user->last_name;
            $user_data['email'] = $user->user_email; 

            $prefix = 'ncpi_';
            $user_data['company_name'] = get_user_meta($user->ID, $prefix . 'company_name', true);
            $user_data['web'] = get_user_meta($user->ID, $prefix . 'web', true);
            $user_data['mobile'] = get_user_meta($user->ID, $prefix . 'mobile', true);
            $user_data['country'] = get_user_meta($user->ID, $prefix . 'country', true); 
            $user_data['region'] = get_user_meta($user->ID, $prefix . 'region', true); 
            $user_data['address'] = get_user_meta($user->ID, $prefix . 'address', true); 
        
            $user_data['date'] = $user->user_registered;

            $data[] = $user_data;
        }

        $result['result'] = $data;
        $result['total'] = $total_users;
        //}

        wp_send_json_success($result);
    }

    public function get_single($req)
    {

        $url_params = $req->get_url_params();
        $user_id      = $url_params['id'];

        $user = get_user_by('id', $user_id);

        $data = [];

        $field = [];
        $field['id'] = $user->ID;
        $field['first_name'] = $user->first_name;
        $field['last_name'] = $user->last_name;
        $field['email'] = $user->user_email;

        $prefix = 'ncpi_';
        $field['company_name'] = get_user_meta($user->ID, $prefix . 'company_name', true);
        $field['web'] = get_user_meta($user->ID, $prefix . 'web', true);
        $field['mobile'] = get_user_meta($user->ID, $prefix . 'mobile', true);
        $field['country'] = get_user_meta($user->ID, $prefix . 'country', true); 
        $field['region'] = get_user_meta($user->ID, $prefix . 'region', true); 
        $field['address'] = get_user_meta($user->ID, $prefix . 'address', true); 
        $field['date'] = $user->user_registered;

        $data['profile'] = $field;

        wp_send_json_success($data);
    }

    public function create($req)
    {

        $reg_errors   = new \WP_Error;
        $first_name   = sanitize_text_field($req['first_name']);
        $last_name    = sanitize_text_field($req['last_name']);
        $email        = strtolower(sanitize_email($req['email']));
        $company_name = sanitize_text_field($req['company_name']);
        $web          = esc_url_raw($req['web']);
        $mobile       = sanitize_text_field($req['mobile']);
        $country      = sanitize_text_field($req['country']);
        $region       = sanitize_text_field($req['region']);
        $address      = sanitize_text_field($req['address']);

        if (
            empty($first_name) ||
            empty($email)
        ) {
            $reg_errors->add('field', esc_html__('Required form field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        if (email_exists($email)) {
            $reg_errors->add('email', esc_html__('Email Already exist!', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $userdata = [
                'user_login' => $email,
                'user_email' => $email,
                'user_pass'  => wp_generate_password(8, true, true),
                'first_name' => $first_name,
                'last_name'  => $last_name,
            ];
            $user_id = wp_insert_user($userdata);

            if (!is_wp_error($user_id)) {
                //set as propovoice member 

                $prefix = 'ncpi_';
                update_user_meta($user_id, $prefix . 'member', true);
                update_user_meta($user_id, $prefix . 'company_name', $company_name);
                update_user_meta($user_id, $prefix . 'web', $web);
                update_user_meta($user_id, $prefix . 'mobile', $mobile);
                update_user_meta($user_id, $prefix . 'country', $country);
                update_user_meta($user_id, $prefix . 'region', $region);
                update_user_meta($user_id, $prefix . 'address', $address);

                wp_send_json_success($user_id);
            } else {
                wp_send_json_error();
            }
        }
    }

    public function update($req)
    {
        $params = $req->get_params();
        $reg_errors    = new \WP_Error;
        $first_name    = sanitize_text_field($params['first_name']);
        $last_name     = sanitize_text_field($params['last_name']);
        $email     = strtolower(sanitize_email($params['email']));
        $company_name  = sanitize_text_field($params['company_name']);
        $web           = esc_url_raw($params['web']);
        $mobile        = sanitize_text_field($params['mobile']);
        $country       = sanitize_text_field($req['country']);
        $region        = sanitize_text_field($req['region']);
        $address       = sanitize_text_field($req['address']);

        if (
            empty($email) ||
            empty($first_name)
        ) {
            $reg_errors->add('field', esc_html__('Required form field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        $url_params = $req->get_url_params();
        $user_id      = $url_params['id'];
        $current_user = get_user_by('id', $user_id);

        if (($email != $current_user->user_email) && email_exists($email)) {
            $reg_errors->add('email', esc_html__('Email Already exist!', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = [
                'ID'         => $user_id,
                'user_login' => $email,
                'user_email' => $email,
                'first_name' => $first_name,
                'last_name'  => $last_name,
            ];

            $user_data = wp_update_user($data);

            if (!is_wp_error($user_data)) {
                $prefix = 'ncpi_';
                update_user_meta($user_id, $prefix . 'company_name', $company_name);
                update_user_meta($user_id, $prefix . 'web', $web);
                update_user_meta($user_id, $prefix . 'mobile', $mobile);
                update_user_meta($user_id, $prefix . 'country', $country);
                update_user_meta($user_id, $prefix . 'region', $region);
                update_user_meta($user_id, $prefix . 'address', $address);
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
