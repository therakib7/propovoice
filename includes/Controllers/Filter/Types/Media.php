<?php
namespace Ncpi\Controllers\Filter\Types; 

class Media {

    public function __construct() {
		add_filter('ajax_query_attachments_args', [$this, 'hide_bank_attachment']);
	}

	/**
	 * Hide attachment files from the Media Library's overlay (modal) view
	 * if they have a certain meta key and value set.
	 *
	 * @param array $args An array of query variables.
	 */
	public function hide_bank_attachment($args) {
		// Bail if this is not the admin area.
		if ( ! is_admin() ) {
			return;
		}

		// Modify the query.
		$args['meta_query'] = [ 
			'relation' => 'OR',
			[
				'key' => 'ncpi_attach_type',
				'compare' => 'NOT EXISTS'
			],
			[
				'key'     => 'ncpi_attach_type',
				'value'   => 'secret',
				'compare' => '!=',
			],
		];

		return $args;
	}
}
