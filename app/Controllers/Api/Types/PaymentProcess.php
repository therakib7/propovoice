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

    public function calcItemsTotal( $items ) {   
        $total = 0;
        foreach ( $items as $value ) {
            $total += ( $value['qty'] * $value['price'] );
        }
        return $total;
    }
    
    public function calcExtraTotal( $total, $type, $value ) {  
        if ( $type == 'percent' ) {
            return $total * ( $value / 100);
        } else {
            return $value;
        }
    }  
    
    public function getTotalAmount( $invoice )
    {
        $items = $invoice['items'];
        $extra_field = $invoice['extra_field']; 
        $item_total = $this->calcItemsTotal( $items );  
        $total = $item_total;
        
        if ( isset( $extra_field['tax'] ) ) {
            $total += $this->calcExtraTotal($item_total, $extra_field['tax'], $invoice['tax']); 
        }
    
        if ( isset( $extra_field['discount'] ) ) {
            $total -= $this->calcExtraTotal($item_total, $extra_field['discount'], $invoice['discount']); 
        } 
    
        if ( isset( $extra_field['late_fee'] ) ) {
            $total += $this->calcExtraTotal($item_total, $extra_field['late_fee'], $invoice['late_fee']);
        }  
    
        return $total; 
    }

    public function get($req)
    {
        $request = $req->get_params();

        $type = isset($request['type']) ? sanitize_text_field($request['type']) : '';

        if ($type == 'payment_indent') {
            $id = isset($request['id']) ? absint($request['id']) : '';  

            $invoice = get_post_meta($id, 'invoice', true); 
            $payment_methods = isset($invoice['payment_methods']) ? $invoice['payment_methods'] : null;
            $stripe_id = isset($payment_methods['stripe']) ? $payment_methods['stripe'] : null; 

            $amount = $this->getTotalAmount( $invoice );
            // Create a stripe payment intent
            $secret_key = get_post_meta($stripe_id, 'secret_key', true); 

            try {
                $stripe = new \Stripe\StripeClient($secret_key);

                /* $customer = $stripe->customers->create([
                    'email' => $user->user_email,
                ]); */

                $paymentIntents = $stripe->paymentIntents->create([
                    'amount' => $amount,
                    'currency' => 'USD',
                    'description' => 'Propovoice Invoice', //TODO: check it
                    // 'customer' => $customer,
                    // 'receipt_email' => $user->user_email,
                    'payment_method_types' => ['card'],
                ]);
            } catch (\Exception $e) {
                // status_header(402);
                // wp_send_json($e->jsonBody);
            }

            wp_send_json_success([
                'intent_obj' => $paymentIntents
            ]);
        }
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

                $payment_details = isset($params['payment_details']) ? $params['payment_details'] : '';
                $receipt = isset($params['receipt']) ? $params['receipt'] : '';
                $amount = isset($params['amount']) ? $params['amount'] : '';
                $date = isset($params['date']) ? $params['date'] : '';
                $note = isset($params['note']) ? nl2br($params['note']) : '';

                $bank_info = [];
                $bank_info['payment_details'] = $payment_details;
                $bank_info['receipt'] = $receipt;
                // $bank_info['amount'] = $amount;
                // $bank_info['date'] = $date;
                $bank_info['note'] = $note;
                $bank_info['date'] = current_time('timestamp');

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
        return true;
        // return current_user_can('publish_posts');
    }
}
