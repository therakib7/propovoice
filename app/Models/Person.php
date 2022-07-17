<?php

namespace Ncpi\Models;

class Person
{

    public function create($params)
    {
        $reg_errors = new \WP_Error;

        $org_id     = isset($params['org_id']) ? sanitize_text_field($params['org_id']) : null;
        $first_name   = isset($params['first_name']) ? sanitize_text_field($params['first_name']) : null;
        $email        = isset($params['email']) ? strtolower(sanitize_email($params['email'])) : null;
        $web          = isset($params['web']) ? esc_url_raw($params['web']) : null;
        $mobile       = isset($params['mobile']) ? sanitize_text_field($params['mobile']) : null;
        $country      = isset($params['country']) ? sanitize_text_field($params['country']) : null;
        $region       = isset($params['region']) ? sanitize_text_field($params['region']) : null;
        $address      = isset($params['address']) ? sanitize_text_field($params['address']) : null;
        $img = isset($params['img']) && isset($params['img']['id']) ? absint($params['img']['id']) : null;
        /* if ( empty($first_name) ) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }  */

        if ($reg_errors->get_error_messages()) {
            return $reg_errors;
        } else {

            $data = array(
                'post_type' => 'ndpi_person',
                'post_title'    => $first_name,
                'post_content'  => '',
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) {

                update_post_meta($post_id, 'ws_id', ncpi()->get_workspace());

                if ($org_id) {
                    update_post_meta($post_id, 'org_id', $org_id);
                }

                if ($first_name) {
                    update_post_meta($post_id, 'first_name', $first_name);
                }

                if ($email) {
                    update_post_meta($post_id, 'email', $email);
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

                return $post_id;
            } else {
                return $reg_errors->add('insert_post', esc_html__('Something wrong!', 'propovoice'));
            }
        }
    }

    public function update($params)
    { 
        $reg_errors = new \WP_Error;

        $first_name   = isset($params['first_name']) ? sanitize_text_field($params['first_name']) : null; 
        $email        = isset($params['email']) ? strtolower(sanitize_email($params['email'])) : null;
        $org_id     = isset($params['org_id']) ? sanitize_text_field($params['org_id']) : null;
        $web          = isset($params['web']) ? esc_url_raw($params['web']) : null;
        $mobile       = isset($params['mobile']) ? sanitize_text_field($params['mobile']) : null;
        $country      = isset($params['country']) ? sanitize_text_field($params['country']) : null;
        $region       = isset($params['region']) ? sanitize_text_field($params['region']) : null;
        $address      = isset($params['address']) ? sanitize_text_field($params['address']) : null;
        $img = isset($params['img']) && isset($params['img']['id']) ? absint($params['img']['id']) : null;

        /* if (empty($first_name)) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        } */

        if ($reg_errors->get_error_messages()) {
            return $reg_errors;
        } else { 
            $post_id = $params['person_id'];

            $data = array(
                'ID'            => $post_id,
                'post_title'    => $first_name,
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {

                if ($first_name) {
                    update_post_meta($post_id, 'first_name', $first_name);
                } 

                if ($email) {
                    update_post_meta($post_id, 'email', $email);
                }

                if ($org_id) {
                    update_post_meta($post_id, 'org_id', $org_id);
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

                return $post_id;
            } else {
                return $reg_errors->add('update_post', esc_html__('Something wrong!', 'propovoice'));
            }
        }
    }

    function single($id, $details = false)
    {
        if (!$id) return null;
        $Data = [];

        $Data['id'] = absint($id);
        $Meta = get_post_meta($id);
        $Data['first_name'] = isset($Meta['first_name']) ? $Meta['first_name'][0] : '';
        $Data['email'] = isset($Meta['email']) ? $Meta['email'][0] : '';
        $Data['mobile'] = isset($Meta['mobile']) ? $Meta['mobile'][0] : '';
        if ( $details ) { 
            $Data['web'] = isset($Meta['web']) ? $Meta['web'][0] : '';
            $Data['country'] = isset($Meta['country']) ? $Meta['country'][0] : '';
            $Data['region'] = isset($Meta['region']) ? $Meta['region'][0] : '';
            $Data['address'] = isset($Meta['address']) ? $Meta['address'][0] : '';
        } 

        return $Data;
    }
}
