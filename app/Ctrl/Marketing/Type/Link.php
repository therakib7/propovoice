<?php 
namespace Ndpv\Ctrl\Marketing\Type; 

class Link {

    public function __construct() { 
        add_filter('plugin_action_links_' . plugin_basename(NDPV_FILE), [$this, 'marketing_links']);
    }  

    /**
	 * Marketing links.
	 *
	 * @param array $links
	 *
	 * @return array
	 */
	public function marketing_links( $links ) { 
		$links[] = '<a target="_blank" href="' . esc_url( 'https://propovoice.com/docs/' ) . '">Documentation</a>';
		if ( ! function_exists( 'ndpvp' ) ) {
			$links[] = '<a target="_blank" style="color: #39b54a;font-weight: 700;" href="' . esc_url( 'https://propovoice.com/pricing//?utm_source=WordPress&utm_medium=propovoice&utm_campaign=pro_click' ) . '">Get Pro</a>';
		}
		return $links;
	}
}
