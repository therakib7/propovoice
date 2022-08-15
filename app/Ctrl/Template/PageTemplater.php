<?php

namespace Ncpi\Ctrl\Template;

class PageTemplater
{

	public function __construct()
	{
		add_filter('theme_page_templates', [$this, 'add_template_to_select'], 10, 4);
		add_filter('template_include', [$this, 'load_plugin_template']);

		add_action('wp_enqueue_scripts', array($this, 'wage_scripts'), 999);
		add_action('admin_enqueue_scripts', array($this, 'wage_scripts'));
	}

	/**
	 * Add "Custom" template to page attirbute template section.
	 */
	function add_template_to_select($post_templates, $wp_theme, $post, $post_type)
	{
		//TODO: dashboard is pro features
		if (function_exists('ncpip')) {
			$post_templates['workspace-template.php'] = esc_html__('Propovoice Workspace', 'propovoice');
		}
		$post_templates['invoice-template.php'] = esc_html__('Propovoice Client Invoice', 'propovoice');
		$post_templates['estimate-template.php'] = esc_html__('Propovoice Client Estimate', 'propovoice');
		return $post_templates;
	}

	/**
	 * Check if current page has our custom template. Try to load
	 * template from theme directory and if not exist load it 
	 * from root plugin directory.
	 */
	function load_plugin_template($template)
	{
		if (get_page_template_slug() === 'workspace-template.php') {
			$custom_template = ncpi()->plugin_path() . '/views/template/workspace-template.php';
			if (file_exists($custom_template)) {
				return $custom_template;
			}
		} else if (get_page_template_slug() === 'invoice-template.php') {
			$custom_template = ncpi()->plugin_path() . '/views/template/invoice-template.php';
			if (file_exists($custom_template)) {
				return $custom_template;
			}
		} else if (get_page_template_slug() === 'estimate-template.php') {
			$custom_template = ncpi()->plugin_path() . '/views/template/estimate-template.php';
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
		wp_localize_script('ndpi-dashboard', 'wage', apply_filters('ncpi_wage', ['PT97']));
		wp_localize_script('ndpi-invoice', 'wage', apply_filters('ncpi_wage', ['PT97']));
		wp_localize_script('ndpi-dashboard', 'has_wage', ['ins' => function_exists('ncpip')]);
	}
}
