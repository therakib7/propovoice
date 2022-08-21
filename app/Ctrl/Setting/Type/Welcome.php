<?php

namespace Ndpi\Ctrl\Setting\Type;

class Welcome
{

	public function __construct()
	{
		add_action('admin_menu', [$this, 'add_settings_menu'], 30);
	}

	public function add_settings_menu()
	{
		add_menu_page(
			esc_html__('Propovoice Welcome', 'propovoice'),
			esc_html__('Propovoice Welcome', 'propovoice'),
			'manage_options',
			'ndpi-welcome',
			array($this, 'main_settings'),
			'dashicons-groups',
			30
		);

		add_action('admin_menu', function () {
			remove_menu_page('ndpi-welcome');
		}, 100);
	}

	function main_settings()
	{
		echo '<div class="wrap" id="ndpi-welcome"></div>';
	}
}
