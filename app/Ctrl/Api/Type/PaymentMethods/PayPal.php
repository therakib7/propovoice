<?php

namespace Ndpv\Ctrl\Api\Type\PaymentMethods;

class PayPal
{
    private $paypal_base_url = "https://api-m.sandbox.paypal.com/";
    private $client_id = "Aairsx2ntDKvcjA9XyMOaZkBdFGSkrywPkUGLbxzqpMTR-HJs8m4u-dUWftfx7fOdOte7_jCDHx2QvEt";
    private $secret_id =    "EOHVMaDD1ubBvR0Uf9I5Bw1QR6IKva9oCWz2a1gTHpafKu_VeDCgVg0d7WwgOYRYEg7nvefseC2joFG4";
    public $access_token;
    public $headers_with_bearer;

    public function __construct()
    {
        $this->get_access_token();

        $this->headers_with_bearer = array(
            'Authorization' => 'Bearer ' . $this->access_token,
            'Content-Type' => 'application/json',
        );
    }

    public function get_access_token()
    {
        $response = wp_remote_post($this->paypal_base_url . "v1/oauth2/token", array(
            'headers' => array(
                'Authorization' => 'Basic ' . base64_encode($this->client_id . ':' . $this->secret_id),
                'Content-Type' => 'application/x-www-form-urlencoded;charset=UTF-8',
            ),
            'body' => 'grant_type=client_credentials',
        ));

        $body = (array) json_decode($response["body"]);

        $this->access_token = $body["access_token"];
    }

    public function create_subs()
    {

        $product_id = $this->create_product();
        wp_send_json($product_id);
        $plan_id = $this->create_plan();
        wp_send_json($plan_id);
    }

    public function activate_subs()
    {
    }

    public function create_product()
    {
        $body = array(
            "name" => "Propovoice Invoice",
            "type" => "SERVICE",
        );

        $args = array(
            'headers' => $this->headers_with_bearer,
            'body' => json_encode($body),
        );

        $response = wp_remote_post($this->paypal_base_url . "/v1/catalogs/products", $args);

        // $body = (array) json_decode($response["body"]);
        return $response;
    }

    public function create_plan()
    {

        $response = wp_remote_post($this->paypal_base_url . "/v1/billing/plans", array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->access_token,
                'Content-Type' => 'application/json',
            ),
            'body' => json_encode(array(
                "product_id" => "PROD-XXCD1234QWER65782",
                "name" => "Video Streaming Service Plan",
                "description" => "Video Streaming Service basic plan",
                "status" => "ACTIVE",
                "billing_cycles" => [
                    [
                        "frequency" => [
                            "interval_unit" => "MONTH",
                            "interval_count" => 1
                        ],
                        "tenure_type" => "TRIAL",
                        "sequence" => 1,
                        "total_cycles" => 2,
                        "pricing_scheme" => [
                            "fixed_price" => [
                                "value" => "3",
                                "currency_code" => "USD"
                            ]
                        ]
                    ],
                    [
                        "frequency" => [
                            "interval_unit" => "MONTH",
                            "interval_count" => 1
                        ],
                        "tenure_type" => "TRIAL",
                        "sequence" => 2,
                        "total_cycles" => 3,
                        "pricing_scheme" => [
                            "fixed_price" => [
                                "value" => "6",
                                "currency_code" => "USD"
                            ]
                        ]
                    ],
                    [
                        "frequency" => [
                            "interval_unit" => "MONTH",
                            "interval_count" => 1
                        ],
                        "tenure_type" => "REGULAR",
                        "sequence" => 3,
                        "total_cycles" => 12,
                        "pricing_scheme" => [
                            "fixed_price" => [
                                "value" => "10",
                                "currency_code" => "USD"
                            ]
                        ]
                    ]
                ],
                "payment_preferences" => [
                    "auto_bill_outstanding" => true,
                    "setup_fee" => [
                        "value" => "10",
                        "currency_code" => "USD"
                    ],
                    "setup_fee_failure_action" => "CONTINUE",
                    "payment_failure_threshold" => 3
                ],
                "taxes" => [
                    "percentage" => "10",
                    "inclusive" => false
                ]
            )),
        ));

        $body = (array) json_decode($response["body"]);
        // return "P-17L85200KS669793XMOQCDIA";
        return $response;
    }

    public function activate_plan()
    {
    }
}
