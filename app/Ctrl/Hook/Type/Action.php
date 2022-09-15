<?php

namespace Ndpv\Ctrl\Hook\Type;

class Action
{
	public function __construct()
	{

		add_action('woocommerce_payment_complete', [$this, 'ndpv_order_complete']);
	}


	function ndpv_order_complete($order_id)
	{
		$invoice_id = get_post_meta($order_id, "_ndpv_invoice_id", true);
		if ($invoice_id) {
			update_post_meta($invoice_id, 'status', 'paid');
		}
	}
}
