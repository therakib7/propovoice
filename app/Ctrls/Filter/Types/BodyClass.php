<?php

namespace Ncpi\Ctrls\Filter\Types;

class BodyClass
{

	public function __construct()
	{
		add_filter('body_class', [$this, 'body_class']);
		add_filter('admin_body_class', [$this, 'admin_body_class']);
	}

	function body_class($classes)
	{
		if (
			is_page_template([
				'dashboard-template.php',
				'invoice-template.php',
				'estimate-template.php'
			])
		) {
			$classes[] = 'ncpi';
			$classes[] = get_option('template') . '-theme';
		}
		return $classes;
	}

	function admin_body_class($classes)
	{
		if (
			(isset($_GET['page']) && $_GET['page'] == 'ncpi') ||
			(isset($_GET['page']) && $_GET['page'] == 'ncpi-welcome')
		) {
			$classes .= ' ncpi ' . get_option('template') . '-theme';
		}

		return $classes;
	}
}
