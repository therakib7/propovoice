<?php

namespace Ncpi\Controllers\Api\Types;

class Lead
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/leads', [
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

        register_rest_route('ncpi/v1', '/leads/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/leads/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/leads/(?P<id>[0-9,]+)', array(
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

        if (isset($request['org_name'])) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'org_name',
                    'value'   => $request['org_name'],
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
            $user_data['org_name'] = get_user_meta($user->ID, $prefix . 'org_name', true);
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
        $field['org_name'] = get_user_meta($user->ID, $prefix . 'org_name', true);
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
 
        $level_id     = isset($params['level_id']) ? absint($params['level_id']) : null; 
        $budget       = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency     = isset($params['currency']) ? sanitize_text_field($params['currency']) : null; 
        $tags         = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $note         = isset($params['note']) ? nl2br($params['note']) : null;

        $contact_first_name   = sanitize_text_field($params['first_name']);
        $contact_last_name    = sanitize_text_field($params['last_name']);
        $contact_email        = strtolower(sanitize_email($params['email']));
        $contact_org_name     = sanitize_text_field($params['org_name']);
        $contact_web          = esc_url_raw($params['web']);
        $contact_mobile       = sanitize_text_field($params['mobile']);
        $contact_country      = sanitize_text_field($params['country']);
        $contact_region       = sanitize_text_field($params['region']);
        $contact_address      = sanitize_text_field($params['address']);  

        if (
            empty($contact_first_name) ||
            empty($contact_email)
        ) {
            $reg_errors->add('field', esc_html__('Required form field is missing', 'propovoice'));
        }

        //TODO: get email id if already
        /* if ( !is_email($contact_email) ) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        if (email_exists($contact_email)) {
            $reg_errors->add('email', esc_html__('Email Already exist!', 'propovoice'));
        } */

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $userdata = [
                'user_login' => $contact_email,
                'user_email' => $contact_email,
                'user_pass'  => wp_generate_password(8, true, true),
                'first_name' => $contact_first_name,
                'last_name'  => $contact_last_name,
            ];
            $user_id = wp_insert_user($userdata);

            if (!is_wp_error($user_id)) {
                //set as propovoice member 

                $prefix = 'ncpi_';
                update_user_meta($user_id, $prefix . 'member', true);
                update_user_meta($user_id, $prefix . 'org_name', $contact_org_name);
                update_user_meta($user_id, $prefix . 'web', $contact_web);
                update_user_meta($user_id, $prefix . 'mobile', $contact_mobile);
                update_user_meta($user_id, $prefix . 'country', $contact_country);
                update_user_meta($user_id, $prefix . 'region', $contact_region);
                update_user_meta($user_id, $prefix . 'address', $contact_address);
 
            }  
        }
    }

    public function update($req)
    {
        $params = $req->get_params();
        $reg_errors    = new \WP_Error;
        $contact_first_name    = sanitize_text_field($params['first_name']);
        $contact_last_name     = sanitize_text_field($params['last_name']);
        $contact_email     = strtolower(sanitize_email($params['email']));
        $contact_org_name  = sanitize_text_field($params['org_name']);
        $contact_web           = esc_url_raw($params['web']);
        $contact_mobile        = sanitize_text_field($params['mobile']);
        $contact_country       = sanitize_text_field($req['country']);
        $contact_region        = sanitize_text_field($req['region']);
        $contact_address       = sanitize_text_field($req['address']);

        if (
            empty($contact_email) ||
            empty($contact_first_name)
        ) {
            $reg_errors->add('field', esc_html__('Required form field is missing', 'propovoice'));
        }

        if (!is_email($contact_email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        $url_params = $req->get_url_params();
        $user_id      = $url_params['id'];
        $current_user = get_user_by('id', $user_id);

        if (($contact_email != $current_user->user_email) && email_exists($contact_email)) {
            $reg_errors->add('email', esc_html__('Email Already exist!', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = [
                'ID'         => $user_id,
                'user_login' => $contact_email,
                'user_email' => $contact_email,
                'first_name' => $contact_first_name,
                'last_name'  => $contact_last_name,
            ];

            $user_data = wp_update_user($data);

            if (!is_wp_error($user_data)) {
                $prefix = 'ncpi_';
                update_user_meta($user_id, $prefix . 'org_name', $contact_org_name);
                update_user_meta($user_id, $prefix . 'web', $contact_web);
                update_user_meta($user_id, $prefix . 'mobile', $contact_mobile);
                update_user_meta($user_id, $prefix . 'country', $contact_country);
                update_user_meta($user_id, $prefix . 'region', $contact_region);
                update_user_meta($user_id, $prefix . 'address', $contact_address);
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
