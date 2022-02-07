<?php

namespace Ncpi\Controllers\Setting\Types; 

use Ncpi\Models\SettingsAPI;

class Main extends SettingsAPI {

	protected $tabs = [];

	protected $active_tab;

	protected $current_section;

	public function __construct() { 
        add_action('admin_menu', [$this, 'add_settings_menu'], 30);
		add_action('admin_init', [$this, 'setTabs']); 
		add_action('ncpi_admin_settings_groups', [$this, 'setup_settings']); 
        add_action('admin_init', [$this, 'save']); 
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

		/* add_submenu_page(
			'ncpi',
			esc_html__('Settings', 'propovoice'),
			esc_html__('Settings', 'propovoice'),
			'manage_options',
			'ncpi-settings',
			[$this, 'display_settings_form'],
			20
		); */
	}

    public function display_settings_form() {
		require_once NCPI_PATH . 'views/settings/admin-settings-display.php';
	}

	function main_settings() {  
        echo '<div class="wrap"><div id="ncpi-admin-app" class="flex"></div></div>';
    }

    public function setTabs() {
		$this->tabs = [
			'general' => esc_html__( 'General', 'propovoice' ), 
            'specific' => esc_html__( 'Specific Page', 'propovoice' ), 
            'support' => esc_html__( 'Support', 'propovoice' )
		];

		// Hook to register custom tabs
		$this->tabs = apply_filters('ncpi_register_settings_tabs', $this->tabs);

		// Find the active tab
		$this->option = $this->active_tab = ! empty($_GET['tab']) && array_key_exists($_GET['tab'], $this->tabs) ? trim($_GET['tab']) : 'general';
		$this->add_subsections();

		if ( ! empty($this->subtabs) ) {
			$this->current_section = ! empty($_GET['section']) && array_key_exists($_GET['section'], $this->subtabs) ? trim($_GET['section']) : '';
			$this->option          = $this->current_section ? $this->option . '_' . $this->current_section : $this->active_tab;
			$this->option .= '_settings';
		} else {
			$this->option = $this->option . '_settings';
		}
	}  

    protected function add_subsections() {
		if (! $this->active_tab) {
			return;
		}
		if (method_exists($this, $this->active_tab . '_add_subsections')) {
			$this->{$this->active_tab . '_add_subsections'}();
		} else {
			$sub_sections = apply_filters('ncpi_' . $this->active_tab . '_sub_sections', []);
			if (is_array($sub_sections) && ! empty($sub_sections)) {
				$this->subtabs = $sub_sections;
			}
		}
	}

	public function setup_settings() {
		$this->set_fields();
		$this->admin_options();
	}

	public function set_fields() {
		$field = [];
		if ($this->active_tab && $this->current_section && array_key_exists($this->active_tab, $this->tabs) && array_key_exists($this->current_section, $this->subtabs)) {
			$file_name = NCPI_PATH . "views/settings/{$this->active_tab}-{$this->current_section}-settings.php";
		} else {
			$file_name = NCPI_PATH . "views/settings/{$this->active_tab}-settings.php";
		}
		if (file_exists($file_name)) {
			$field = include $file_name;
		}

		$this->form_fields = apply_filters('ncpi_settings_option_fields', $field, $this->active_tab, $this->current_section);
	} 

	protected function specific_add_subsections() {
		$sub_sections = [
			'' => esc_html__( 'All', 'propovoice' ), 
            // 'multiple' => esc_html__( 'Multiple', 'propovoice' ),  
            'home' => esc_html__( 'Home', 'propovoice' ),  
            'single' => esc_html__( 'Single', 'propovoice' ),  
            'archive' => esc_html__( 'Archive', 'propovoice' ),
            '404' => esc_html__( '404', 'propovoice' ),
			'admin' => esc_html__( 'Dashboard', 'propovoice' ),
            // 'wc' => esc_html__( 'WooCommmerce', 'propovoice' ),
		];
		$this->subtabs = apply_filters('ncpi_specific_sub_sections', $sub_sections);
	}

	public function save() {
		if ( 'POST' !== $_SERVER['REQUEST_METHOD']
			|| ! isset($_REQUEST['page']) 
			|| (isset($_REQUEST['page']) && 'ncpi-settings' !== $_REQUEST['page']) 
		) {
			return;
		}

		if ( empty($_REQUEST['_wpnonce']) || ! wp_verify_nonce($_REQUEST['_wpnonce'], 'ncpi-settings') ) {
			die( esc_html__('Action failed. Please refresh the page and retry.', 'propovoice') );
		}
		$this->set_fields();
		$this->process_admin_options();

		self::add_message(esc_html__('Your settings have been saved.', 'propovoice'));
		update_option('ncpi_queue_flush_rewrite_rules', 'yes');

		do_action('ncpi_admin_settings_saved', $this->option, $this);
	} 
	
} 