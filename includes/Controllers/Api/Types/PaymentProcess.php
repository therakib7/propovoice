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
                'description' => 'This is a propovoice invoice', //TODO: check it
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

        $invoice_id = isset($params['invoice_id']) ? $params['invoice_id'] : '';
        $payment_method = isset($params['payment_method']) ? $params['payment_method'] : '';

        if ($invoice_id) {

            update_post_meta($invoice_id, 'payment_method', $payment_method);

            if ($payment_method == 'bank') {
                $mark_as_paid = isset($params['mark_as_paid']) ? $params['mark_as_paid'] : false;
                if ($mark_as_paid) {
                    update_post_meta($invoice_id, 'status', 'paid');
                } else {
                    update_post_meta($invoice_id, 'status', 'paid_req');
                }

                $country = isset($params['country']) ? $params['country'] : '';
                $bank_name = isset($params['bank_name']) ? $params['bank_name'] : '';
                $account_name = isset($params['account_name']) ? $params['account_name'] : '';
                $account_no = isset($params['account_no']) ? $params['account_no'] : '';
                $amount = isset($params['amount']) ? $params['amount'] : '';
                $date = isset($params['date']) ? $params['date'] : '';
                $note = isset($params['note']) ? nl2br($params['note']) : '';

                $bank_info = [];
                $bank_info['country'] = $country;
                $bank_info['bank_name'] = $bank_name;
                $bank_info['account_name'] = $account_name;
                $bank_info['account_no'] = $account_no;
                $bank_info['amount'] = $amount;
                $bank_info['date'] = $date;
                $bank_info['note'] = $note;
                $bank_info['time'] = current_time('timestamp');

                update_post_meta($invoice_id, 'payment_info', $bank_info);
            } else if ($payment_method == 'paypal') {

                update_post_meta($invoice_id, 'status', 'paid');
                $payment_info = isset($params['payment_info']) ? $params['payment_info'] : '';
                update_post_meta($invoice_id, 'payment_info', $payment_info);
            } else if ($payment_method == 'stripe') {

                update_post_meta($invoice_id, 'status', 'paid');
                $payment_info = isset($params['payment_info']) ? $params['payment_info'] : '';
                update_post_meta($invoice_id, 'payment_info', $payment_info);
            }
        }

        wp_send_json_success();
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
