<?php

if ( ! defined('ABSPATH') ) {
	exit;
}  

use Ncpi\Helpers\Functions;  

/**
 * General Settings.
 */ 
$highlight_position = [
	'post_type' => esc_html__('Single Post Type (Post/Page/Custom Code etc)', 'propovoice'), 
	'taxonomy' => esc_html__('Single Taxonomy (Category/Tag etc)', 'propovoice'),
	'setting' => esc_html__('Settings Page', 'propovoice'),
];

$options = [
	'general_section' => [
		'title'       => esc_html__('General Setting', 'propovoice'),
		'type'        => 'title',
	],
	'enable' => [
		'title'          => esc_html__('Enable', 'propovoice'),
		'description'    => esc_html__('If you overall enable/dsiabled custom CSS, JS or HTML from here', 'propovoice'),
		'type'           => 'multi_checkbox', 
		'default'        => [
			'css' 
		],
		'options'        => [
			'css' => esc_html__('Custom CSS', 'propovoice'),
			'js' => esc_html__('Custom JS', 'propovoice'), 
			'html' => esc_html__('Custom HTML', 'propovoice') 
		],
	],
	'post_type' => [
		'title'          => esc_html__('Enable In Post Type', 'propovoice'),
		'description'=> esc_html__('Which single post type you want to edit you can mention here', 'propovoice'),
		'type'           => 'multi_checkbox',
		'is_pro'         => true,
		'default'        => [
			'post',
			'page'
		],
		'options'        => Functions::getPostTypes(false, false),
	],
	'taxonomy' => [
		'title'          => esc_html__('Enable In Taxonomy', 'propovoice'),
		'description'	 => esc_html__('Which single taxonomy you want to edit you can mention here', 'propovoice'),
		'type'           => 'multi_checkbox',
		'is_pro'         => true,
		'default'        => [
			'category'  
		],
		'options'        => Functions::getTaxonomyTypes(false, false),
	],
	'css_syntax_highlight' => [
		'title'          => esc_html__('CSS Syntax Highlight', 'propovoice'),
		'description'     => wp_kses( 
			__('<strong>Warning:</strong> Please consider that on weaker computers, enabling CSS highlighting may slow you down', 'propovoice'), 
			['strong' => [] ]
		),
		'type'           => 'multi_checkbox', 
		'options'        => $highlight_position,
	],
	'js_syntax_highlight' => [
		'title'          => esc_html__('JS Syntax Highlight', 'propovoice'),
		'description'     => wp_kses( 
			__('<strong>Warning:</strong> Please consider that on weaker computers, enabling JS highlighting may slow you down', 'propovoice'), 
			['strong' => [] ]
		),
		'type'           => 'multi_checkbox', 
		'options'        => $highlight_position,
	],
	'html_syntax_highlight' => [
		'title'          => esc_html__('HTML Syntax Highlight', 'propovoice'),
		'description'     => wp_kses( 
			__('<strong>Warning:</strong> Please consider that on weaker computers, enabling HTML highlighting may slow you down', 'propovoice'), 
			['strong' => [] ]
		),
		'type'           => 'multi_checkbox', 
		'options'        => $highlight_position,
	],
	/* 'minify' => [
		'title'      => esc_html__('Minify?', 'propovoice'),
		'description'=> esc_html__('You can disable minified CSS/JS content from here', 'propovoice'),
		'is_pro'     => true,
		'type'       => 'radio',
		'class'      => 'regular-text',
		'default'    => 1,
		'options'    => [
			1  => esc_html__('Enable', 'propovoice'),
			0  => esc_html__('Disable', 'propovoice'), 
		],
	] */  
];

return apply_filters('ncpi_general_settings_options', $options);
 