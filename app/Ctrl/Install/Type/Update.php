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
        $get_update = $share_info = true;
        $get_update_at = $share_info_at = false;
        if ( $option ) {
            $get_update = ( isset( $option['get_update'] ) && !$option['get_update'] ) ? false : true;
            $share_info = ( isset( $option['share_info'] ) && !$option['share_info'] ) ? false : true;

            $get_update_at = isset( $option['get_update_at'] ) ? true : false;
            $share_info_at = isset( $option['share_info_at'] ) ? true : false;
        }

        if ( ( $get_update || $share_info ) && ( !$get_update_at || !$share_info_at ) ) {

            // return;
            /* $info = new Info;
            $data = $info->wp( $share_info_at );
            $data['version'] = NDPV_VERSION;
            $data['package'] = 'free';

            wp_remote_post( $this->api . 'installer', [
                'timeout' => 0.01,
                'body' => $data,
                'blocking' => false,
                'sslverify' => false
            ] ); */
            $data = null;
            if ( $option ) {
                if ( !$get_update_at ) {
                    $option['get_update_at'] = current_time('timestamp');
                }

                if ( !$share_info_at ) {
                    $option['share_info_at'] = current_time('timestamp');
                }

                $data = $option;
            } else {
                if ( !$get_update_at ) {
                    $data['get_update_at'] = current_time('timestamp');
                }

                if ( !$share_info_at ) {
                    $data['share_info_at'] = current_time('timestamp');
                }
            }

            if ( $data ) {
                update_option('ndpv_subscription', $data);
            }
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
