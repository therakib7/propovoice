<?php
namespace Ncpi\Models; 

class Person {

    public function create($params)
    {  
        $reg_errors = new \WP_Error;

        $first_name   = isset($params['first_name']) ? sanitize_text_field($params['first_name']) : null; 
        $email        = isset($params['email']) ? strtolower(sanitize_email($params['email'])) : null;
        $org_name     = isset($params['org_name']) ? sanitize_text_field($params['org_name']) : null;
        $web          = isset($params['web']) ? esc_url_raw($params['web']) : null;
        $mobile       = isset($params['mobile']) ? sanitize_text_field($params['mobile']) : null;
        $country      = isset($params['country']) ? sanitize_text_field($params['country']) : null;
        $region       = isset($params['region']) ? sanitize_text_field($params['region']) : null;
        $address      = isset($params['address']) ? sanitize_text_field($params['address']) : null;
        $img = isset( $params['img'] ) && isset( $params['img']['id'] ) ? absint( $params['img']['id'] ) : null; 
        /* if ( empty($first_name) ) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }  */

        if ( $reg_errors->get_error_messages() ) {
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

                update_post_meta($post_id, 'wp_id', ncpi()->get_workplace() );
                
                if ($first_name) {
                    update_post_meta($post_id, 'first_name', $first_name);
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

                if ( $img ) {
                    update_post_meta($post_id, 'img', $img); 
                } 

                return $post_id;
            } else {
                return $reg_errors->add('insert_post', esc_html__('Something wrong!', 'propovoice'));
            }
        }
    }

    public function update($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $first_name   = isset($params['first_name']) ? sanitize_text_field($params['first_name']) : null;
        $last_name    = isset($params['last_name']) ? sanitize_text_field($params['last_name']) : null;
        $email        = isset($params['email']) ? strtolower(sanitize_email($params['email'])) : null;
        $org_name     = isset($params['org_name']) ? sanitize_text_field($params['org_name']) : null;
        $web          = isset($params['web']) ? esc_url_raw($params['web']) : null;
        $mobile       = isset($params['mobile']) ? sanitize_text_field($params['mobile']) : null;
        $country      = isset($params['country']) ? sanitize_text_field($params['country']) : null;
        $region       = isset($params['region']) ? sanitize_text_field($params['region']) : null;
        $address      = isset($params['address']) ? sanitize_text_field($params['address']) : null;
        $img = isset( $params['img'] ) && isset( $params['img']['id'] ) ? absint( $params['img']['id'] ) : null;

        /* if (empty($first_name)) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        } */

        if ($reg_errors->get_error_messages()) {
            return $reg_errors;
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

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

                if ( $img ) {
                    update_post_meta($post_id, 'img', $img); 
                } 

                return $post_id;
            } else {
                return $reg_errors->add('update_post', esc_html__('Something wrong!', 'propovoice'));
            }
        }
    }
 
}