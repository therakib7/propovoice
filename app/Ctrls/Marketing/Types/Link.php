<?php

namespace Ncpi\Ctrls\Marketing\Types; 

class Link {

    public function __construct() { 
        // add_filter('plugin_action_links_' . plugin_basename(NCPI_FILE), [$this, 'marketing_links']);
    }  

    /**
	 * Marketing links.
	 *
	 * @param array $links
	 *
	 * @return array
	 */
	public function marketing_links($links) {
		$links[] = sprintf(
			'<a target="_blank" href="%s">%s</a>',
			esc_url( admin_url('admin.php?page=ndcj-settings') ),
			esc_html__('Settings', 'propovoice')
		); 
		$links[] = sprintf(
			'<a target="_blank" href="%s">%s</a>',
			esc_url('https://www.nurcreation.com/docs/propovoice'),
			esc_html__('Documentation', 'propovoice')
		);   

		return $links;
	}
}
