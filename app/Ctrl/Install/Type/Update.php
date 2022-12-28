<?php
namespace Ndpv\Ctrl\Install\Type;

use Ndpv\Helper\Info;

class Update
{
    private $api = 'https://propovoice.com/wp-json/ndpva/v1/';

    public function __construct()
    {
        $this->info();
    }

    public function info()
    {
        $option = get_option("ndpv_subscription");
        $subscribe = false;
        $share = true;
        if ( $option ) {
            $data = $option;
        }

        if ( !$subscribe ) {
            $info = new Info;
            $data = $info->wp( $share );
            $data['version'] = NDPV_VERSION;
            $data['package'] = 'free';

            wp_remote_post( $this->api . 'installer', [
                'timeout' => 0.01,
                'body' => $data,
                'blocking' => false,
                'sslverify' => false
            ] );

            // update_option('ndpv_version_install', NDPV_VERSION);
        }

        /* $version = get_option('ndpv_version_install');

        if ( version_compare($version, NDPV_VERSION, '<') ) {
            $info = new Info;
            $data = $info->wp();
            $data['version'] = NDPV_VERSION;
            $data['package'] = 'free';

            wp_remote_post( $this->api . 'installer', [
                'timeout' => 0.01,
                'body' => $data,
                'blocking' => false,
                'sslverify' => false
            ] );

            update_option('ndpv_version_install', NDPV_VERSION);
        } */
    }
}
