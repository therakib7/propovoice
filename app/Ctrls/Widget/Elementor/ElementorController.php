<?php

namespace Ncpi\Ctrls\Widget\Elementor; 

use Elementor\Plugin; 
use Ncpi\Ctrls\Widget\Elementor\Widgets\Registration; 

class ElementorController {

    public function __construct() {  
		add_action( 'elementor/elements/categories_registered', array( $this, 'ncpi_category' ) );
        add_action( 'elementor/widgets/widgets_registered', array( $this, 'widgets_registered' ) );
    }  

	/**
	 * @since 1.0
	 */
	public function widgets_registered() {
					
        Plugin::instance()->widgets_manager->register_widget_type( new Registration() ); 
	}

	/**
	 * @since 1.0
	 */
	public function ncpi_category( $elements_manager ) {

		$elements_manager->add_category(
			'ncpi-category',
			[
				'title' => esc_html__( 'NCPI Widgets', 'propovoice' ),
				'icon' => 'fa fa-plug',
			]
		);  
	}
}