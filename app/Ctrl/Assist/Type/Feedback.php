<?php 
namespace Ndpv\Ctrl\Assist\Type;

use Ndpv\Helper\Info;

class Feedback { 

    private $api = 'http://nurencyplugin.local/wp-json/ndpva/v1/';

	public function __construct() {  
		add_action('wp_ajax_ndpv_deactivate_feedback', [ $this, 'deactivate' ]);
	} 

	/**
     *  
     * @since 1.0.0
     * @access public
     */
    public function deactivate()
    {
        /* if ( !isset($_POST['_wpnonce']) || ! wp_verify_nonce($_POST['_wpnonce'], '_ndpv_deactivate_nonce') ) {
            wp_send_json_error();
        }  */

        $reason_key = isset($_POST['reason_key']) ? sanitize_text_field($_POST['reason_key']) : '';
        $reason_text = isset($_POST["reason_{$reason_key}"]) ? sanitize_text_field($_POST["reason_{$reason_key}"]) : '';
        
        $data = Info::wp();
        $data['reason_key'] = $reason_key;
        $data['reason_text'] = $reason_text;

        /* wp_remote_post( $this->api, [
			'timeout' => 30,
			'body' => $data,
		] ); */

        wp_send_json_success($data);
    } 
}
