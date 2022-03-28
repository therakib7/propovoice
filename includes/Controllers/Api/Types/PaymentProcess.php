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
        $payment_type = isset($params['payment_type']) ? $params['payment_type'] : '';        

        if ($invoice_id) {

            $payment = [];
            $payment['type'] = $payment_type;

            update_post_meta($invoice_id, 'payment_type', $payment_type);

            if ($payment_type == 'bank') {
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
                

                $payment['country'] = $country;
                $payment['bank_name'] = $bank_name;
                $payment['account_name'] = $account_name;
                $payment['account_no'] = $account_no;
                $payment['amount'] = $amount;
                $payment['date'] = $date;
                $payment['note'] = $note;
                $payment['time'] = current_time('timestamp');

                update_post_meta($invoice_id, 'payment_info', $payment);
            } else if ($payment_type == 'paypal') {

                $name = isset($params['name']) ? $params['name'] : '';
                $email = isset($params['email']) ? $params['email'] : ''; 
                $address = isset($params['address']) ? $params['address'] : ''; 

                update_post_meta($invoice_id, 'status', 'paid');
            } else if ($payment_type == 'stripe') {

                $name = isset($params['name']) ? $params['name'] : '';
                $email = isset($params['email']) ? $params['email'] : ''; 
                $address = isset($params['address']) ? $params['address'] : ''; 
                
                update_post_meta($invoice_id, 'status', 'paid');
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
