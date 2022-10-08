<?php 
namespace Ndpv\Ctrl\Install\Type;

use Ndpv\Helper\Info;

class Installer
{
    private $api = 'http://nurencyplugin.local/wp-json/ndpva/v1/';

    public function __construct()
    {  
        $this->info(); 
    }

    public function info()
    { 
        $version = get_option('ndpv_version_install');
        if ( version_compare($version, NDPV_VERSION, '<') ) { 
            $info = new Info; 
            $data = $info->wp();
            $data['version'] = NDPV_VERSION;
            $data['package'] = 'free';

            wp_remote_post( $this->api . 'installer', [
                'timeout' => 30,
                'body' => $data,
                'blocking'  => false,
                'sslverify'   => false,
            ] );

            update_option('ndpv_version_install', NDPV_VERSION);
        }
    }
}
