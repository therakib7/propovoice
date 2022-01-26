<?php
if ( ! defined('ABSPATH') ) {
	exit;
}  

use Ncpi\Helpers\Functions;

/**
 * Specific Admin Settings.
 */ 
$options = [
	'head_section' => [
		'title'       => esc_html__('Admin Dashboard Pages', 'propovoice'),
		'description' => esc_html__('This section only load in admin dashboard', 'propovoice'),
		'type'        => 'title',
	],   
	'status' => [
		'title'      => esc_html__('Enable?', 'propovoice'),
		'description'=> esc_html__('If you disabled this option following CSS, JS and HTML will not apply', 'propovoice'),
		'type'       => 'radio',
		'class'      => 'regular-text',
		'default'    => 1,
		'options'    => [
			1  => esc_html__('Enable', 'propovoice'),
			0  => esc_html__('Disable', 'propovoice'), 
		],
	],       
];

if ( Functions::is_enable('css') ) {
	$options['css'] = [
		'type'            => 'textarea',
		'id'           	  => 'ncpi-css',
		'class'           => 'large-text',
		'title'           => esc_html__('Custom CSS', 'propovoice'), 
		'description'     => wp_kses( 
			__('- This CSS will load in admin page</br>- You don\'t need &lt;style>&lt;/style> tag here', 'propovoice'), 
			['br' => [] ]
		),
	];
}

if ( Functions::is_enable('js') ) {
	$options['js'] = [
		'type'            => 'textarea',
		'id'           	  => 'ncpi-js',
		'class'           => 'large-text',
		'title'           => esc_html__('Custom JS', 'propovoice'), 
		'description'     => wp_kses( 
			__('- This JS will load in admin page</br>- You don\'t need &lt;script>&lt;/script> tag here', 'propovoice'), 
			['br' => [] ]
		),
	];

	$options['js_pos'] = [
		'title'      => esc_html__('Custom JS Position', 'propovoice'),
		'description'=> esc_html__('In which position you want to load your JS', 'propovoice'),
		'type'       => 'select', 
		'blank'      => false,
		'default'    => 'wp_footer',
		'options'    => Functions::admin_pos_args(),
	];
}

if ( Functions::is_enable('html') ) {
	$options['html'] = [
		'type'            => 'textarea',
		'id'           	  => 'ncpi-html',
		'class'           => 'large-text',
		'title'           => esc_html__('Custom HTML', 'propovoice'), 
		'description'     => wp_kses( 
			__('This HTML will load in admin page', 'propovoice'), 
			['br' => [] ]
		),
	];

	$options['html_pos'] = [
		'title'      => esc_html__('Custom HTML Position', 'propovoice'),
		'description'=> esc_html__('In which position you want to load your HTML', 'propovoice'),
		'type'       => 'select', 
		'blank'      => false,
		'default'    => 'wp_footer',
		'options'    => Functions::admin_pos_args(), 
	];
}

return apply_filters('ncpi_specific_admin_settings_options', $options);
	