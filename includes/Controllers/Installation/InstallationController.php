<?php 

namespace Ncpi\Controllers\Installation;

// use Ncpi\Controllers\Installation\Types\DB;
use Ncpi\Controllers\Installation\Types\Page;

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
            
            //TODO: check by plugin version
            if ( get_option( 'ncpi_role_version' ) < 1 ) { 
                new Page();

                $uploads_dir = trailingslashit( wp_upload_dir()['basedir'] ) . 'propovoice';
                wp_mkdir_p( $uploads_dir );

            }
            update_option( 'ncpi_role_version', 1 );
			
            wp_redirect( admin_url('admin.php?page=ncpi-welcome') );
        }
    } 
}
