<?php 

namespace Ncpi\Controllers\Installation;

use Ncpi\Controllers\Installation\Types\DB;

class InstallationController {

    public function __construct() { 
        register_activation_hook(NCPI_FILE, array($this, 'plugin_activate'));
        add_action('admin_init', array($this, 'plugin_redirect') );
    }   

    function plugin_activate() { 
        add_option('ncpi_activation_redirect', true);
    }

    function plugin_redirect() {
        if ( get_option('ncpi_activation_redirect', false) ) {
            delete_option('ncpi_activation_redirect'); 

			// new DB();
			
            wp_redirect( admin_url('admin.php?page=ncpi') );
        }
    } 
}
