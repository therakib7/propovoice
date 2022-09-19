<?php

namespace Ndpv\Ctrl\Hook\Type;

use Ndpv\Helper\Fns;

class Action
{
    public function __construct()
    {
        add_action("woocommerce_order_status_completed", [
            $this,
            "order_complete",
        ]);
    }

    function order_complete($order_id)
    {
        $invoice_id = get_post_meta($order_id, "_ndpv_invoice_id", true);

        if ($invoice_id) {
            update_post_meta($invoice_id, "status", "paid");
        }
        if (!is_admin()) {
            wp_safe_redirect(
                sprintf(
                    "%s?id=%s&token=%s",
                    Fns::client_page_url("invoice"),
                    $invoice_id,
                    get_post_meta($invoice_id, "token", true)
                )
            );
            exit();
        }
    }
}
