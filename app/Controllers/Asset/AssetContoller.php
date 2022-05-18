<?php

namespace Ncpi\Controllers\Asset;

use Ncpi\Helpers\Fns;

class AssetContoller {

	private $suffix;
	private $version; 

	function __construct() { 
		$this->suffix  = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';   
		$this->version = ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? time() : ncpi()->version(); 
		$this->ajaxurl = admin_url( 'admin-ajax.php' ); 

		add_action( 'wp_enqueue_scripts', array( $this, 'public_scripts' ), 999 ); 
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );  	

		//remove thank you text from propovoice dashboard
		if ( isset( $_GET['page'] ) && $_GET['page'] == 'ncpi' ) { 
			add_filter( 'admin_footer_text', '__return_empty_string', 11 );
			add_filter( 'update_footer',     '__return_empty_string', 11 );
		} 

		add_filter( 'show_admin_bar' , [$this, 'hide_admin_bar'] );
	}    

	function hide_admin_bar( $show ){
		if ( 
			is_page_template( [
				'dashboard-template.php', 
				'invoice-template.php',
				'estimate-template.php'
			] ) 
		) {
			return false;
		}  
		return $show;
	} 

	function admin_public_script() {  
	} 

	function dashboard_script() {   
		
		//font family
		if ( 
			( isset( $_GET['page'] ) && $_GET['page'] == 'ncpi-welcome' ) ||
			( isset( $_GET['page'] ) && $_GET['page'] == 'ncpi' ) ||
			is_page_template( [
				'dashboard-template.php', 
				'invoice-template.php',
				'estimate-template.php'
			] ) 
		) {  
			wp_enqueue_style( 'ncpi-google-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), $this->version );  
		}
		if ( isset( $_GET['page'] ) && $_GET['page'] == 'ncpi-welcome' ) {  
			wp_enqueue_style( 'ncpi-welcome', ncpi()->get_assets_uri( "admin/css/welcome{$this->suffix}.css" ), array(), $this->version );
			wp_enqueue_script( 'ncpi-welcome', ncpi()->get_assets_uri( "/admin/js/welcome{$this->suffix}.js" ), array(), $this->version, true );  
			wp_localize_script( 'ncpi-welcome', 'ncpi', array(
				'apiUrl' => esc_url( rest_url() ), 
				'nonce' => wp_create_nonce( 'wp_rest' ),
				'dashboard' => menu_page_url('ncpi', false),
				'assetImgUri' => ncpi()->get_assets_uri('admin/img/')
			) );
		}

		if ( 
			is_page_template( [
				'invoice-template.php',
				'estimate-template.php'
			] ) 
		) {  

			//TODO: Remove all wordpress unused file from frontend

			wp_enqueue_style( 'ncpi-invoice', ncpi()->get_assets_uri( "admin/css/invoice{$this->suffix}.css" ), array(), $this->version );
			wp_enqueue_script( 'ncpi-invoice', ncpi()->get_assets_uri( "/admin/js/invoice{$this->suffix}.js" ), array(), $this->version, true );  
			wp_localize_script( 'ncpi-invoice', 'ncpi', array(
				'apiUrl' => esc_url( rest_url() ),  
				'nonce' => wp_create_nonce( 'wp_rest' ), 
				'assetImgUri' => ncpi()->get_assets_uri('admin/img/')
			) );
		}

		if ( 
			( isset( $_GET['page'] ) && $_GET['page'] == 'ncpi' ) ||
			is_page_template( [
				'dashboard-template.php', 
				'invoice-template.php',
				'estimate-template.php'
			] ) 
		) {  

			wp_enqueue_style( 'ncpi-dashboard', ncpi()->get_assets_uri( "admin/css/dashboard{$this->suffix}.css" ), array(), $this->version );  
			wp_enqueue_script( 'ncpi-dashboard', ncpi()->get_assets_uri( "/admin/js/dashboard{$this->suffix}.js" ), array(), $this->version, true ); 
			
			wp_localize_script( 'ncpi-dashboard', 'ncpi', array(
				'apiUrl' => esc_url( rest_url() ),  
				'version' => ncpi()->version(),  
				'invoice_page_url' => sprintf(
					'%s?id=%s&token=%s',
					Fns::client_page_url('invoice'),
					'invoice_id',
					'invoice_token'
				),  
				'estimate_page_url' => sprintf(
					'%s?id=%s&token=%s',
					Fns::client_page_url('estimate'),
					'invoice_id',
					'invoice_token'
				),  
				//'apiServerUrl' => 'http://ncpluginserver.local/wp-json/', //TODO: change server URL later
				'apiServerUrl' => 'https://appux.co/propovoice-server/wp-json/', //TODO: change server URL later
				'nonce' => wp_create_nonce( 'wp_rest' ),
				'assetImgUri' => ncpi()->get_assets_uri('admin/img/')
			) );
		} 
	} 

	function public_scripts() {  
		$this->admin_public_script();   		

		//wp_enqueue_style( 'propovoice-main', ncpi()->get_assets_uri( "public/css/main{$this->suffix}.css" ), array(), $this->version ); 

		$this->dashboard_script();   
	} 

	function admin_scripts() { 
		$this->admin_public_script();   
		$this->dashboard_script();   
	}  
}