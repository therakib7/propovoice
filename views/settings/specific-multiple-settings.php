<?php
if ( ! defined('ABSPATH') ) {
	exit;
}  

use Ncpi\Helpers\Functions;
use Ncpi\Models\Post;

/**
 * Specific Multiple Settings.
 */ 
$options = [
	'head_section' => [
		'title'       => esc_html__('Multiple Single Pages', 'propovoice'),
		'is_pro'      => true,
		'description'=> esc_html__('You can customize multiple single post/page together from here', 'propovoice'),
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
	'post_type' => [
		'title'          => esc_html__('Post Type', 'propovoice'),
		'description'=> esc_html__('Which post type data you want to customize', 'propovoice'),
		'type'           => 'multi_checkbox',
		'default'        => [
			'post',
			'page',
		], 
		'options'        => Functions::getPostTypes(false, false),
	], 
	'post_type_post' => [
		'title'          => esc_html__('Select Posts', 'propovoice'),
		'description'=> esc_html__('Which single post you want to customize', 'propovoice'),
		'type'           => 'multiselect',
		'default'        => [], 
		'options'        => Post::by_type('post'),
	],  
	'post_type_page' => [
		'title'          => esc_html__('Select Pages', 'propovoice'),
		'description'=> esc_html__('Which single page you want to customize', 'propovoice'),
		'type'           => 'multiselect',
		'default'        => [], 
		'options'        => Post::by_type('page'),
	],     
];

if ( Functions::is_enable('css') ) {
	$options['css'] = [
		'type'            => 'textarea',
		'id'           	  => 'ncpi-css',
		'class'           => 'large-text',
		'title'           => esc_html__('Custom CSS', 'propovoice'), 
		'description'     => wp_kses( 
			__('- This CSS will load multiple pages depend on the selection</br>- You don\'t need &lt;style>&lt;/style> tag here', 'propovoice'), 
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
			__('- This JS will load multiple pages depend on the selection</br>- You don\'t need &lt;script>&lt;/script> tag here', 'propovoice'), 
			['br' => [] ]
		),
	];

	$options['js_pos'] = [
		'title'      => esc_html__('Custom JS Position', 'propovoice'),
		'description'=> esc_html__('In which position you want to load your JS', 'propovoice'),
		'type'       => 'select', 
		'blank'      => false,
		'default'    => 'wp_footer',
		'options'    => Functions::js_pos_args(),
	];
}

if ( Functions::is_enable('html') ) {
	$options['html'] = [
		'type'            => 'textarea',
		'id'           	  => 'ncpi-html',
		'class'           => 'large-text',
		'title'           => esc_html__('Custom HTML', 'propovoice'), 
		'description'     => wp_kses( 
			__('This HTML will load multiple pages depend on the selection', 'propovoice'), 
			['br' => [] ]
		),
	];

	$options['html_pos'] = [
		'title'      => esc_html__('Custom HTML Position', 'propovoice'),
		'description'=> esc_html__('In which position you want to load your HTML', 'propovoice'),
		'type'       => 'select', 
		'blank'      => false,
		'default'    => 'wp_body_open',
		'options'    => Functions::html_pos_args(),
	];
}

return apply_filters('ncpi_specific_multiple_settings_options', $options);
 