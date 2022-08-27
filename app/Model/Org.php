<?php

namespace Ndpv\Model;

class Org
{

    public function create($params)
    {
        $reg_errors = new \WP_Error;

        $name   = isset($params['org_name']) ? sanitize_text_field($params['org_name']) : null;
        $person_id     = isset($params['person_id']) ? sanitize_text_field($params['person_id']) : null;
        $email        = isset($params['email']) ? strtolower(sanitize_email($params['email'])) : null;
        $web          = isset($params['web']) ? esc_url_raw($params['web']) : null;
        $mobile       = isset($params['mobile']) ? sanitize_text_field($params['mobile']) : null;
        $country      = isset($params['country']) ? sanitize_text_field($params['country']) : null;
        $region       = isset($params['region']) ? sanitize_text_field($params['region']) : null;
        $address      = isset($params['address']) ? sanitize_text_field($params['address']) : null;
        $logo = isset($params['logo']) ? absint($params['logo']) : null;
        $is_client  = isset($params['is_client']) ? true : null;
        /* if ( empty($name) ) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }  */

        if ($reg_errors->get_error_messages()) {
            return $reg_errors;
        } else {

            $data = array(
                'post_type' => 'ndpv_org',
                'post_title'    => $name,
                'post_content'  => '',
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) {

                update_post_meta($post_id, 'ws_id', ndpv()->get_workspace());

                if ($name) {
                    update_post_meta($post_id, 'name', $name);
                }

                if ($email) {
                    update_post_meta($post_id, 'email', $email);
                }

                if ($person_id) {
                    update_post_meta($post_id, 'person_id', $person_id);
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

                if ($logo) {
                    update_post_meta($post_id, 'logo', $logo);
                }

                if ($is_client) {
                    update_post_meta($post_id, 'is_client', $is_client);
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

        $name   = isset($params['name']) ? sanitize_text_field($params['name']) : null;
        $last_name    = isset($params['last_name']) ? sanitize_text_field($params['last_name']) : null;
        $email        = isset($params['email']) ? strtolower(sanitize_email($params['email'])) : null;
        $person_id = isset($params['person_id']) ? sanitize_text_field($params['person_id']) : null;
        $web          = isset($params['web']) ? esc_url_raw($params['web']) : null;
        $mobile       = isset($params['mobile']) ? sanitize_text_field($params['mobile']) : null;
        $country      = isset($params['country']) ? sanitize_text_field($params['country']) : null;
        $region       = isset($params['region']) ? sanitize_text_field($params['region']) : null;
        $address      = isset($params['address']) ? sanitize_text_field($params['address']) : null;
        $logo = isset($params['logo']) ? absint($params['logo']) : null;

        /* if (empty($name)) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        } */

        if ($reg_errors->get_error_messages()) {
            return $reg_errors;
        } else {
            $post_id = $params['org_id'];

            $data = array(
                'ID'            => $post_id,
                'post_title'    => $name,
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {

                if ($name) {
                    update_post_meta($post_id, 'name', $name);
                }

                if ($last_name) {
                    update_post_meta($post_id, 'last_name', $last_name);
                }

                if ($email) {
                    update_post_meta($post_id, 'email', $email);
                }

                if ($person_id) {
                    update_post_meta($post_id, 'person_id', $person_id);
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

                if ($logo) {
                    update_post_meta($post_id, 'logo', $logo);
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
        $data = [];

        $data['id'] = absint($id);
        $meta = get_post_meta($id);
        $data['name'] = isset($meta['name']) ? $meta['name'][0] : '';
        $data['email'] = isset($meta['email']) ? $meta['email'][0] : '';
        $data['mobile'] = isset($meta['mobile']) ? $meta['mobile'][0] : '';
        $logo_id = isset($meta['logo']) ? $meta['logo'][0] : '';
        $logoData = null;
        if ($logo_id) {
            $logo_src = wp_get_attachment_image_src($logo_id, 'thumbnail');
            if ($logo_src) {
                $logoData = [];
                $logoData['id'] = $logo_id;
                $logoData['src'] = $logo_src[0];
            }
        }
        $data['logo'] = $logoData;
        if ($details) {
            $data['web'] = isset($meta['web']) ? $meta['web'][0] : '';
            $data['country'] = isset($meta['country']) ? $meta['country'][0] : '';
            $data['region'] = isset($meta['region']) ? $meta['region'][0] : '';
            $data['address'] = isset($meta['address']) ? $meta['address'][0] : '';
        }
        return $data;
    }
}
