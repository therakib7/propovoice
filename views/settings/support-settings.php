<?php 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} 

/**
 * Support Settings
 */
$options = array(
	'css' => [
		'type'            => 'title',  
		'description'     => wp_kses( 
			__('If you face any issue or any suggestion</br>
				Don\'t forget to inform us. We will try our best to happy our valuable customer.</br>
				Inform us to <strong>info@nurcreation.com</strong>', 'propovoice'), 
			['br' => [], 'strong' => [] ]
		),
	], 
);

return apply_filters( 'ncpi_support_settings_options', $options );