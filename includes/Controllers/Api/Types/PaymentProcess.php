<?php

namespace Ncpi\Controllers\Api\Types;

use WP_Query;

class PaymentProcess
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/payment-process', [
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
    }

    public function get($req)
    {
        $request = $req->get_params();

        $type = isset($request['type']) ? sanitize_text_field($request['type']) : '';

        $amount = 22.5;
        // Create a stripe payment intent

        try {

            $stripe = new \Stripe\StripeClient('sk_test_q0ZQwYU7J53zk2ebhFzV9JB7');

            /* $customer = $stripe->customers->create([
                'email' => $user->user_email,
            ]); */

            $paymentIntents = $stripe->paymentIntents->create([
                'amount' => ($amount * 100),
                'currency' => 'USD',
                'description' => 'This is a dda test invoice', //TODO: check it
                // 'customer' => $customer,
                // 'receipt_email' => $user->user_email,
                // 'payment_method_types' => ['card'],
            ]);
        } catch (\Exception $e) {
            // status_header(402);
            // wp_send_json($e->jsonBody);
        }

        return wp_send_json_success([
            'intent_obj' => $paymentIntents
        ]);
    }

    public function create($req)
    {

        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $type = isset($params['type']) ? sanitize_text_field($params['type']) : null;
        $country = isset($params['country']) ? sanitize_text_field($params['country']) : null;
        $bank_name = isset($params['bank_name']) ? sanitize_text_field($params['bank_name']) : null;
        $routing_no = isset($params['routing_no']) ? sanitize_text_field($params['routing_no']) : null;
        $bank_branch = isset($params['bank_branch']) ? sanitize_text_field($params['bank_branch']) : null;
        $account_name = isset($params['account_name']) ? sanitize_text_field($params['account_name']) : null;
        $account_no = isset($params['account_no']) ? sanitize_text_field($params['account_no']) : null;
        $confirm_account_no = isset($params['confirm_account_no']) ? sanitize_text_field($params['confirm_account_no']) : null;
        $default = isset($params['default']) ? rest_sanitize_boolean($params['default']) : null;
        $logo = isset($params['logo']) && isset($params['logo']['id']) ? absint($params['logo']['id']) : null;

        if (
            empty($bank_name)
        ) {
            $reg_errors->add('field', esc_html__('Bank name is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            $data = array(
                'post_type' => 'ncpi_payment',
                'post_title'    => $type,
                'post_content'  => '',
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) {

                if ($type) {
                    update_post_meta($post_id, 'type', $type);
                }

                if ($country) {
                    update_post_meta($post_id, 'country', $country);
                }

                if ($bank_name) {
                    update_post_meta($post_id, 'bank_name', $bank_name);
                }

                if ($routing_no) {
                    update_post_meta($post_id, 'routing_no', $routing_no);
                }

                if ($bank_branch) {
                    update_post_meta($post_id, 'bank_branch', $bank_branch);
                }

                if ($account_name) {
                    update_post_meta($post_id, 'account_name', $account_name);
                }

                if ($account_no) {
                    update_post_meta($post_id, 'account_no', $account_no);
                }

                if ($confirm_account_no) {
                    update_post_meta($post_id, 'confirm_account_no', $confirm_account_no);
                }

                if ($default) {
                    update_post_meta($post_id, 'default', true);
                } else {
                    update_post_meta($post_id, 'default', false);
                }

                if ($logo) {
                    update_post_meta($post_id, 'logo', $logo);
                }

                wp_send_json_success($post_id);
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
