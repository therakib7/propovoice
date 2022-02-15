<?php

namespace Ncpi\Controllers\Setting\Types;  

class Main { 

	public function __construct() { 
        add_action('admin_menu', [$this, 'add_settings_menu'], 30);  
	}  

	public function add_settings_menu() { 
		add_menu_page(
			esc_html__('Propovoice', 'propovoice'),
			esc_html__('Propovoice', 'propovoice'),
			'manage_options',
			'ncpi',
			array($this, 'main_settings'),
			'dashicons-groups', 
			30
		); 
	} 

	function main_settings() {  
        echo '<div class="wrap"><div id="ncpi-admin-app" class="flex"></div></div>';
    } 
} 