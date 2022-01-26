<?php

namespace Ncpi\Controllers\Marketing\Types; 

class Link {

    public function __construct() { 
        add_filter('plugin_action_links_' . plugin_basename(NCPI_FILE), [$this, 'marketing_links']);
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
		/* if ( ! function_exists('ncpip') ) {
			$links[] = '<a target="_blank" style="color: #39b54a;font-weight: 700;" href="' . esc_url('https://www.nurcreation.com/downloads/propovoice/?utm_source=WordPress&utm_medium=propovoice&utm_campaign=pro_click') . '">Get Pro</a>';
		} */

		return $links;
	}
}
