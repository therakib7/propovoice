<?php

namespace Ncpi\Controllers\Setting\Types;  

class Dashboard { 

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

		add_submenu_page(
            'ncpi',
            esc_html__('Dashboard', 'propovoice'),
            esc_html__('Dashboard', 'propovoice'),
            'manage_options',
            'ncpi#',
            array($this, 'render')
        );

		add_submenu_page(
            'ncpi',
            esc_html__('Client', 'propovoice'),
            esc_html__('Client', 'propovoice'),
            'manage_options',
            'ncpi#/client',
            array($this, 'render')
        ); 
		
		add_submenu_page(
            'ncpi',
            esc_html__('Project', 'propovoice'),
            esc_html__('Project', 'propovoice'),
            'manage_options',
            'ncpi#/project',
            array($this, 'render')
        );

		add_submenu_page(
            'ncpi',
            esc_html__('Estimate', 'propovoice'),
            esc_html__('Estimate', 'propovoice'),
            'manage_options',
            'ncpi#/estimate',
            array($this, 'render')
        );
		
		add_submenu_page(
            'ncpi',
            esc_html__('Invoice', 'propovoice'),
            esc_html__('Invoice', 'propovoice'),
            'manage_options',
            'ncpi#/invoice',
            array($this, 'render')
        );

		add_submenu_page(
            'ncpi',
            esc_html__('Payment', 'propovoice'),
            esc_html__('Payment', 'propovoice'),
            'manage_options',
            'ncpi#/payment',
            array($this, 'render')
        );

		add_submenu_page(
            'ncpi',
            esc_html__('Business', 'propovoice'),
            esc_html__('Business', 'propovoice'),
            'manage_options',
            'ncpi#/business',
            array($this, 'render')
        );

		add_submenu_page(
            'ncpi',
            esc_html__('Settings', 'propovoice'),
            esc_html__('Settings', 'propovoice'),
            'manage_options',
            'ncpi#/setting',
            array($this, 'render')
        );

		remove_submenu_page('ncpi','ncpi');
	} 

	function main_settings() {  
        echo '<div class="wrap"><div id="ncpi-dashboard" class="flex"></div></div>';
    } 
} 