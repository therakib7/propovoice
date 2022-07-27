<?php

namespace Ncpi\Ctrls\Setting\Types;

use Ncpi\Helpers\Fns;

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
                'id' => 'task',
                'label' => esc_html__('Task & Activity', 'propovoice'),
            ],
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
                'id' => 'project',
                'label' => esc_html__('Project', 'propovoice'),
            ],
            [
                'id' => 'contact',
                'label' => esc_html__('Contact', 'propovoice'),
            ]
        ];

        $settings_menu = apply_filters('ncpi_sidebar_menu', $settings_menu);

        foreach ($settings_menu as $menu) {
            $menu_id = $menu['id'];
            if ($menu_id == 'contact') {
                $menu_id = $menu_id . '/person';
            }

            add_submenu_page(
                'ncpi',
                $menu['label'],
                $menu['label'],
                'manage_options',
                'ncpi#/' . $menu_id,
                array($this, 'render')
            );
        }

        $setting_main = function_exists('ncpip') ? 'general' : 'business';
        add_submenu_page(
            'ncpi',
            esc_html__('Settings', 'propovoice'),
            esc_html__('Settings', 'propovoice'),
            'manage_options',
            'ncpi#/setting/' . $setting_main,
            array($this, 'render')
        );

        if (function_exists('ncpip')) {
            global $submenu;
            $permalink = Fns::client_page_url('dashboard');
            if ($permalink) {
                $submenu['ncpi'][] = array('Go to Frontend', 'manage_options', $permalink);
            }
        }

        remove_submenu_page('ncpi', 'ncpi');
    }

    function main_settings()
    {
        echo '<div class="wrap"><div id="ncpi-dashboard"></div></div>';
    }
}
