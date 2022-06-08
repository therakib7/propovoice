<?php

namespace Ncpi\Ctrls\Api\Types;

use WP_Query;

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
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_permission'],
            ],
            [
                'methods' => 'POST',
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

        $args = array(
            'post_type' => 'ndpi_lead',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'offset' => $offset,
        );

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        if (isset($request['default'])) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'default',
                    'value'   => 1,
                    'compare' => 'LIKE'
                )
            );
        }

        $query = new WP_Query($args);
        $total_data = $query->found_posts; //use this for pagination 
        $result = $data = [];
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id;

            $queryMeta = get_post_meta($id);
            $query_data['budget'] = isset($queryMeta['budget']) ? $queryMeta['budget'][0] : '';
            $query_data['currency'] = isset($queryMeta['currency']) ? $queryMeta['currency'][0] : '';
            $query_data['level_id'] = '';

            $level = get_the_terms($id, 'ndpi_lead_level');
            if ($level) {
                $query_data['level_id'] = [
                    'id' => $level[0]->term_id,
                    'label' => $level[0]->name
                ];
            }

            $query_data['tags'] = [];
            $tags = get_the_terms($id, 'ndpi_tag');
            if ($tags) {
                $tagList = [];
                foreach ($tags as $tag) {
                    $tagList[] = [
                        'id' => $tag->term_id,
                        'label' => $tag->name
                    ];
                }
                $query_data['tags'] = $tagList;
            }

            $contact_id = get_post_meta($id, 'contact_id', true);
            $contactData = [];

            if ($contact_id) {
                $contactData['id'] = absint($contact_id);
                $contactMeta = get_post_meta($contact_id);
                $contactData['first_name'] = isset($contactMeta['first_name']) ? $contactMeta['first_name'][0] : '';
                $contactData['last_name'] = isset($contactMeta['last_name']) ? $contactMeta['last_name'][0] : '';
                $contactData['org_name'] = isset($contactMeta['org_name']) ? $contactMeta['org_name'][0] : '';
                $contactData['email'] = isset($contactMeta['email']) ? $contactMeta['email'][0] : '';
                $contactData['mobile'] = isset($contactMeta['mobile']) ? $contactMeta['mobile'][0] : '';
                $contactData['web'] = isset($contactMeta['web']) ? $contactMeta['web'][0] : '';
                $contactData['country'] = isset($contactMeta['country']) ? $contactMeta['country'][0] : '';
                $contactData['region'] = isset($contactMeta['region']) ? $contactMeta['region'][0] : '';
                $contactData['address'] = isset($contactMeta['address']) ? $contactMeta['address'][0] : '';
            }
            $query_data['contact'] = $contactData;

            $query_data['date'] = get_the_time('j-M-Y');
            $data[] = $query_data;
        }
        wp_reset_postdata();

        $result['result'] = $data;
        $result['total'] = $total_data;

        wp_send_json_success($result);
    }

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id = $url_params['id'];
        $query_data = [];
        $query_data['id'] = absint($id);

        $queryMeta = get_post_meta($id);
        $query_data['tab_id'] = isset($queryMeta['tab_id']) ? absint($queryMeta['tab_id'][0]) : '';
        $query_data['budget'] = isset($queryMeta['budget']) ? $queryMeta['budget'][0] : '';
        $query_data['currency'] = isset($queryMeta['currency']) ? $queryMeta['currency'][0] : '';
        $query_data['note'] = isset($queryMeta['note']) ? $queryMeta['note'][0] : '';
        $query_data['desc'] = isset($queryMeta['desc']) ? $queryMeta['desc'][0] : '';

        $query_data['level_id'] = '';

        $level = get_the_terms($id, 'ndpi_lead_level');
        if ($level) {

            $query_data['level_id'] = [
                'id' => $level[0]->term_id,
                'label' => $level[0]->name
            ];
        }

        $query_data['tags'] = [];

        $tags = get_the_terms($id, 'ndpi_tag');
        if ($tags) {
            $tagList = [];
            foreach ($tags as $tag) {
                $tagList[] = [
                    'id' => $tag->term_id,
                    'label' => $tag->name
                ];
            }
            $query_data['tags'] = $tagList;
        }

        $contact_id = get_post_meta($id, 'contact_id', true);
        $contactData = [];

        if ($contact_id) {
            $contactData['id'] = absint($contact_id);
            $contactMeta = get_post_meta($contact_id);
            $contactData['first_name'] = isset($contactMeta['first_name']) ? $contactMeta['first_name'][0] : '';
            $contactData['last_name'] = isset($contactMeta['last_name']) ? $contactMeta['last_name'][0] : '';
            $contactData['org_name'] = isset($contactMeta['org_name']) ? $contactMeta['org_name'][0] : '';
            $contactData['email'] = isset($contactMeta['email']) ? $contactMeta['email'][0] : '';
            $contactData['mobile'] = isset($contactMeta['mobile']) ? $contactMeta['mobile'][0] : '';
            $contactData['web'] = isset($contactMeta['web']) ? $contactMeta['web'][0] : '';
            $contactData['country'] = isset($contactMeta['country']) ? $contactMeta['country'][0] : '';
            $contactData['region'] = isset($contactMeta['region']) ? $contactMeta['region'][0] : '';
            $contactData['address'] = isset($contactMeta['address']) ? $contactMeta['address'][0] : '';
        }
        $query_data['contact'] = $contactData;

        $query_data['date'] = get_the_time('j-M-Y');

        wp_send_json_success($query_data);
    }

    public function create($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;
        //lead
        $level_id     = isset($params['level_id']) ? absint($params['level_id']) : null;
        $budget       = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency     = isset($params['currency']) ? sanitize_text_field($params['currency']) : null;
        $tags         = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $desc         = isset($params['desc']) ? nl2br($params['desc']) : '';
        $note         = isset($params['note']) ? nl2br($params['note']) : null;

        $contact = $params['contact'];
        $first_name   = isset($contact['first_name']) ? sanitize_text_field($contact['first_name']) : null;
        $last_name    = isset($contact['last_name']) ? sanitize_text_field($contact['last_name']) : null;
        $email        = isset($contact['email']) ? strtolower(sanitize_email($contact['email'])) : null;
        $org_name     = isset($contact['org_name']) ? sanitize_text_field($contact['org_name']) : null;
        $web          = isset($contact['web']) ? esc_url_raw($contact['web']) : null;
        $mobile       = isset($contact['mobile']) ? sanitize_text_field($contact['mobile']) : null;
        $country      = isset($contact['country']) ? sanitize_text_field($contact['country']) : null;
        $region       = isset($contact['region']) ? sanitize_text_field($contact['region']) : null;
        $address      = isset($contact['address']) ? sanitize_text_field($contact['address']) : null;
        $img = isset($contact['img']) && isset($contact['img']['id']) ? absint($contact['img']['id']) : null;

        if (empty($first_name)) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        /* if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }  */

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            $data = array(
                'post_type'     => 'ndpi_contact',
                'post_title'    => $first_name,
                'post_content'  => $desc,
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id()
            );
            $contact_id = wp_insert_post($data);

            if (!is_wp_error($contact_id)) {

                update_post_meta($contact_id, 'wp_id', ncpi()->get_workplace() );

                if ($first_name) {
                    update_post_meta($contact_id, 'first_name', $first_name);
                }

                if ($last_name) {
                    update_post_meta($contact_id, 'last_name', $last_name);
                }

                if ($email) {
                    update_post_meta($contact_id, 'email', $email);
                }

                if ($org_name) {
                    update_post_meta($contact_id, 'org_name', $org_name);
                }

                if ($web) {
                    update_post_meta($contact_id, 'web', $web);
                }

                if ($mobile) {
                    update_post_meta($contact_id, 'mobile', $mobile);
                }

                if ($country) {
                    update_post_meta($contact_id, 'country', $country);
                }

                if ($region) {
                    update_post_meta($contact_id, 'region', $region);
                }

                if ($address) {
                    update_post_meta($contact_id, 'address', $address);
                }

                if ($img) {
                    update_post_meta($contact_id, 'img', $img);
                }

                //insert lead
                $data = array(
                    'post_type' => 'ndpi_lead',
                    'post_title'  => 'Lead',
                    'post_content'  => '',
                    'post_status'   => 'publish',
                    'post_author'   => get_current_user_id()
                );
                $post_id = wp_insert_post($data);

                if (!is_wp_error($post_id)) {
                    update_post_meta($post_id, 'wp_id', ncpi()->get_workplace() );
                    update_post_meta($post_id, 'tab_id', $post_id); //for task, note, file

                    if ($level_id) {
                        wp_set_post_terms($post_id, [$level_id], 'ndpi_lead_level');
                    }

                    if ($contact_id) {
                        update_post_meta($post_id, 'contact_id', $contact_id);
                    }

                    if ($budget) {
                        update_post_meta($post_id, 'budget', $budget);
                    }

                    if ($currency) {
                        update_post_meta($post_id, 'currency', $currency);
                    }

                    if ($tags) {
                        wp_set_post_terms($post_id, $tags, 'ndpi_tag');
                    } 

                    if ($note) {
                        update_post_meta($post_id, 'note', $note);
                    }

                    wp_send_json_success($post_id);
                } else {
                    wp_send_json_error();
                }
            }
        }
    }

    public function update($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        //lead
        $level_id     = isset($params['level_id']) ? absint($params['level_id']) : null;
        $budget       = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency     = isset($params['currency']) ? sanitize_text_field($params['currency']) : null;
        $tags         = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $desc         = isset($params['desc']) ? nl2br($params['desc']) : '';
        $note         = isset($params['note']) ? nl2br($params['note']) : null;

        $contact = $params['contact'];
        $contact_id   = isset($contact['id']) && $contact['id'] ? sanitize_text_field($contact['id']) : null;
        $first_name   = isset($contact['first_name']) ? sanitize_text_field($contact['first_name']) : null;
        $last_name    = isset($contact['last_name']) ? sanitize_text_field($contact['last_name']) : null;
        $email        = isset($contact['email']) ? strtolower(sanitize_email($contact['email'])) : null;
        $org_name     = isset($contact['org_name']) ? sanitize_text_field($contact['org_name']) : null;
        $web          = isset($contact['web']) ? esc_url_raw($contact['web']) : null;
        $mobile       = isset($contact['mobile']) ? sanitize_text_field($contact['mobile']) : null;
        $country      = isset($contact['country']) ? sanitize_text_field($contact['country']) : null;
        $region       = isset($contact['region']) ? sanitize_text_field($contact['region']) : null;
        $address      = isset($contact['address']) ? sanitize_text_field($contact['address']) : null;
        $img = isset($contact['img']) && isset($contact['img']['id']) ? absint($contact['img']['id']) : null;

        if (empty($first_name)) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        /* if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        } */

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

            $data = array(
                'ID'            => $post_id,
                'post_title'    => $first_name,
                'post_content'  => $desc,
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {

                if ($first_name) {
                    update_post_meta($post_id, 'first_name', $first_name);
                }

                if ($last_name) {
                    update_post_meta($post_id, 'last_name', $last_name);
                }

                if ($email) {
                    update_post_meta($post_id, 'email', $email);
                }

                if ($org_name) {
                    update_post_meta($post_id, 'org_name', $org_name);
                }

                if ($web) {
                    update_post_meta($post_id, 'web', $web);
                }

                if ($mobile) {
                    update_post_meta($post_id, 'mobile', $mobile);
                }

                if ($country) {
                    update_post_meta($post_id, 'country', $country);
                }

                if ($region) {
                    update_post_meta($post_id, 'region', $region);
                }

                if ($address) {
                    update_post_meta($post_id, 'address', $address);
                }

                if ($img) {
                    update_post_meta($post_id, 'img', $img);
                }

                wp_send_json_success($post_id);
            } else {
                wp_send_json_error();
            }
        }
    }

    public function delete($req)
    {
        //TODO: when delete lead delete task note file, if not exist in deal project
        $url_params = $req->get_url_params();

        $ids = explode(',', $url_params['id']);
        foreach ($ids as $id) {
            wp_delete_post($id);
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
