<?php

namespace Ndpv\Ctrl\Hook\Type\Router;

use Ndpv\Ctrl\Api\Type\PaymentMethods\PayPal;

class Routes
{
    public function __construct()
    {
        add_action("rest_api_init", [$this, "add_routes"]);
    }

    public function add_routes()
    {
        register_rest_route("ndpv/v1", "/paypal-subscription", [
            "methods" => "GET",
            "callback" => [(new PayPal), "create_subs"],
            "permission_callback" => function () {
                return true;
            },
        ]);
    }
}
