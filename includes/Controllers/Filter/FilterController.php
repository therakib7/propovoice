<?php

namespace Ncpi\Controllers\Filter;

class FilterController {
	public function __construct() {
		/* Filter the single_template with our custom function*/
		// add_filter('single_template', [$this, 'project_template']);
	}

	public function project_template($single) {
		global $post;
		
		/* Checks for single template by post type */
		if ($post->post_type == 'project') {
			return ncpi()->plugin_path() . '/views/admin/project-single.php';
		}  

		return $single;
	}
}
