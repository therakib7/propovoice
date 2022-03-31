<?php

namespace Ncpi\Controllers\Template;

class PageTemplater
{

	public function __construct()
	{
		add_filter('theme_page_templates', [$this, 'add_template_to_select'], 10, 4);
		add_filter('template_include', [$this, 'load_plugin_template']);

		// add_filter('single_template', [$this, 'single_template']);

		add_action('wp_enqueue_scripts', array($this, 'wage_scripts'), 1);
		add_action('admin_enqueue_scripts', array($this, 'wage_scripts'));
	}

	/**
	 * Add "Custom" template to page attirbute template section.
	 */
	function add_template_to_select($post_templates, $wp_theme, $post, $post_type)
	{

		// Add custom template named dashboard-template.php to select dropdown 
		$post_templates['dashboard-template.php'] = esc_html__('Propovoice Dashboard', 'propovoice');
		$post_templates['invoice-template.php'] = esc_html__('Propovoice Invoice', 'propovoice');
		return $post_templates;
	}

	/**
	 * Check if current page has our custom template. Try to load
	 * template from theme directory and if not exist load it 
	 * from root plugin directory.
	 */
	function load_plugin_template($template)
	{

		if (get_page_template_slug() === 'dashboard-template.php') {
			$custom_template = ncpi()->plugin_path() . '/views/template/dashboard-template.php';
			if (file_exists($custom_template)) {
				return $custom_template;
			}
		} else if (get_page_template_slug() === 'invoice-template.php') {
			$custom_template = ncpi()->plugin_path() . '/views/template/invoice-template.php';
			if (file_exists($custom_template)) {
				return $custom_template;
			}
		}

		return $template;
	}

	/**
	 *  NCPI Project Entity Star Icon
	 *
	 * @package NCPI Project
	 * @since 1.0
	 */
	function wage_scripts()
	{
		wp_localize_script('ncpi-dashboard', 'wage', ['PT97']);
		wp_localize_script('ncpi-invoice', 'wage', ['PT97']);
		// wp_localize_script('ncpi-dashboard', 'wage', []);
		// wp_localize_script('ncpi-invoice', 'wage', []);
	}

	public function single_template($single)
	{
		global $post;

		/* Checks for single template by post type */
		if ($post->post_type == 'ncpi_invoice') {
			return ncpi()->plugin_path() . '/views/template/invoice-template.php';
		} else if ($post->post_type == 'estimate') {
		}

		return $single;
	}
}
