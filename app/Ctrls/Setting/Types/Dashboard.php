<?php

namespace Ncpi\Ctrls\Setting\Types;

class Dashboard
{

    public function __construct()
    {
        add_action('admin_menu', [$this, 'add_settings_menu'], 30);
    }

    public function add_settings_menu()
    {
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

        $settings_menu = [
            [
				'id' => 'lead',
				'label' => esc_html__('Lead', 'propovoice'),
			],
			[
				'id' => 'deal',
				'label' => esc_html__('Deal Pipeline', 'propovoice'),
            ],
            [
                'id' => 'client',
                'label' => esc_html__('Client', 'propovoice'),
            ],
            [
                'id' => 'estimate',
                'label' => esc_html__('Estimate', 'propovoice'),
            ],
            [
                'id' => 'invoice',
                'label' => esc_html__('Invoice', 'propovoice'),
            ], 
            [
                'id' => 'contact',
                'label' => esc_html__('Contact', 'propovoice'),
            ] 
        ];

        $settings_menu = apply_filters( 'ncpi_sidebar_menu', $settings_menu ); 

        foreach( $settings_menu as $menu ) {
            add_submenu_page(
                'ncpi',
                $menu['label'],
                $menu['label'],
                'manage_options',
                'ncpi#/' . $menu['id'],
                array($this, 'render')
            );
        }  
         
        $setting_main = function_exists('ncpip') ? 'general': 'business';
        add_submenu_page(
            'ncpi',
            esc_html__('Settings', 'propovoice'),
            esc_html__('Settings', 'propovoice'),
            'manage_options',
            'ncpi#/setting/' . $setting_main,
            array($this, 'render')
        );

        remove_submenu_page('ncpi', 'ncpi');
    }

    function main_settings()
    {
        echo '<div class="wrap"><div id="ncpi-dashboard" class="flex"></div></div>';
    }
}
