<?php

namespace Ncpi\Controllers\Asset;

use Ncpi\Helpers\Functions;

class AssetContoller {

	private $suffix;
	private $version; 

	function __construct() { 
		$this->suffix  = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';    
		$this->version = ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? time() : ncpi()->version(); 
		$this->ajaxurl = admin_url( 'admin-ajax.php' ); 

		add_action( 'wp_enqueue_scripts', array( $this, 'public_scripts' ), 1 ); 
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );  	

		//remove thank you text from main dashboard
		if ( isset( $_GET['page'] ) && $_GET['page'] == 'ncpi' ) { 
			add_filter( 'admin_footer_text', '__return_empty_string', 11 );
			add_filter( 'update_footer',     '__return_empty_string', 11 );
		} 

		add_filter( 'show_admin_bar' , [$this, 'hide_admin_bar'] );
	}    

	function hide_admin_bar(){
		if ( is_page_template('dashboard-template.php') ) {
			return false;
		}
	} 

	function admin_public_script() {  
	} 

	function dashboard_script() {   
		// wp_deregister_style('forms'); //TODO: check it later when it remove removed others admin css
		if ( 
			( isset( $_GET['page'] ) && $_GET['page'] == 'ncpi' ) ||
			is_page_template('dashboard-template.php')
		) { 
			wp_enqueue_style('dashicons');
			
			wp_enqueue_style( 'ncpi-admin-tailwind', 'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css', array(), $this->version ); //TODO: fix it later
			wp_enqueue_style( 'ncpi-admin-main', ncpi()->get_assets_uri( "admin/css/main{$this->suffix}.css" ), array(), $this->version ); 
			wp_enqueue_script( 'ncpi-admin-main', ncpi()->get_assets_uri( "admin/js/main{$this->suffix}.js" ), array('jquery', 'jquery-ui-sortable'), $this->version, true ); 
			wp_localize_script('ncpi-admin-main', 'ncpi',
				array( 
					'ajaxurl' => $this->ajaxurl,
					'nonce' => wp_create_nonce('ncpi-ajax-nonce'),
					'pro_text' => esc_html__( 'Sorry! this is a premium field. To use this field, you need to use pro plugin.', 'propovoice' ),
				)
			);  

			wp_enqueue_script( 'ncpi-admin-setting', ncpi()->get_assets_uri( "/admin/js/setting{$this->suffix}.js" ), array(), $this->version, true ); 
			
			wp_localize_script( 'ncpi-admin-setting', 'ncpi_local', array(
				'apiUrl' => esc_url( rest_url() ),
				'nonce' => wp_create_nonce( 'wp_rest' )
			) );
		}
	} 

	function public_scripts() {  
		$this->admin_public_script();   		

		// wp_enqueue_style( 'tailwind', ncpi()->get_assets_uri( "vendor/tailwind/tailwind{$this->suffix}.css" ), array(), $this->version ); 
		wp_enqueue_style( 'propovoice-main', ncpi()->get_assets_uri( "public/css/main{$this->suffix}.css" ), array(), $this->version ); 
		wp_enqueue_script( 'propovoice-main', ncpi()->get_assets_uri( "public/js/main{$this->suffix}.js" ), array('jquery'), $this->version, true ); 
		wp_localize_script('propovoice-main', 'css_js_specific_page',
			array( 
				'ajaxurl' => $this->ajaxurl,
				'nonce' => wp_create_nonce('ncpi-ajax-nonce')
			)
		);  

		$this->dashboard_script();  

	} 

	function admin_scripts() { 
		$this->admin_public_script();   
		$this->dashboard_script();  
		 
	}  
}