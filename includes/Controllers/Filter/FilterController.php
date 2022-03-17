<?php

namespace Ncpi\Controllers\Filter;

class FilterController {

	public function __construct() { 
		add_filter( 'body_class', [$this, 'body_class'] );
		add_filter( 'admin_body_class', [$this, 'admin_body_class'] );
	}  
	
	function body_class( $classes ) {
		if (  
			is_page_template('dashboard-template.php') ||
			is_page_template('invoice-template.php')
		) { 
			$classes[] = 'ncpi';
		}
		return $classes;
	}

	function admin_body_class( $classes ) { 
		if ( 
			( isset( $_GET['page'] ) && $_GET['page'] == 'ncpi' ) ||
			( isset( $_GET['page'] ) && $_GET['page'] == 'ncpi-welcome' ) 
		) { 
			$classes .= ' ncpi';
		}
	 
		return $classes;
	} 
}
