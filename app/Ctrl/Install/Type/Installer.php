<?php 
namespace Ndpv\Ctrl\Install\Type;

use Ndpv\Helper\Info;

class Installer
{
    private $api = 'https://propovoice.com/wp-json/ndpva/v1/';

    public function __construct()
    {  
        $this->info(); 
    }

    public function info()
    { 
        $version = get_option('ndpv_version_install');

        if ( version_compare($version, NDPV_VERSION, '<') ) {
            update_option('ndpv_version_install', NDPV_VERSION);
        }
    }
}
