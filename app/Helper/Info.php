<?php

namespace Ndpv\Helper;

class Info
{
    /**
     * Get site name
     */
    public function get_site_name() {
        $site_name = get_bloginfo( 'name' );

        if ( empty( $site_name ) ) {
            $site_name = get_bloginfo( 'description' );
            $site_name = wp_trim_words( $site_name, 3, '' );
        }

        if ( empty( $site_name ) ) {
            $site_name = esc_url( home_url() );
        }

        return $site_name;
    }

    public function wp() {

        $users = get_users( array(
            'role'    => 'administrator',
            'orderby' => 'ID',
            'order'   => 'ASC',
            'number'  => 1,
            'paged'   => 1,
        ) );

        $admin_user =  ( is_array( $users ) && ! empty( $users ) ) ? $users[0] : false;
        $first_name = $last_name = '';

        if ( $admin_user ) {
            $first_name = $admin_user->first_name ? $admin_user->first_name : $admin_user->display_name;
            $last_name  = $admin_user->last_name;
        }

        return [
            'url'         => esc_url( home_url() ),
            'site'        => $this->get_site_name(),
            'admin_email' => get_option( 'admin_email' ),
            'first_name'  => $first_name,
            'last_name'   => $last_name,     
            'wp'          => $this->get_wp_info(),
            'ip'          => $this->get_user_ip_address(), 
        ];
    }

    public function name_email() {

        $users = get_users( array(
            'role'    => 'administrator',
            'orderby' => 'ID',
            'order'   => 'ASC',
            'number'  => 1,
            'paged'   => 1,
        ) );

        $admin_user =  ( is_array( $users ) && ! empty( $users ) ) ? $users[0] : false;
        $first_name = $last_name = '';

        if ( $admin_user ) {
            $first_name = $admin_user->first_name ? $admin_user->first_name : $admin_user->display_name;
            $last_name  = $admin_user->last_name;
        }

        return [ 
            'admin_email' => get_option( 'admin_email' ),
            'first_name'  => $first_name,
            'last_name'   => $last_name,
        ];
    }

     /**
     * Get WordPress related data.
     *
     * @return array
     */
    public function get_wp_info() {
        $wp_data = array();

        $wp_data['memory_limit'] = WP_MEMORY_LIMIT;
        $wp_data['debug_mode']   = ( defined('WP_DEBUG') && WP_DEBUG );
        $wp_data['locale']       = get_locale();
        $wp_data['version']      = get_bloginfo( 'version' );
        $wp_data['multisite']    = is_multisite();
        $wp_data['theme_slug']   = get_stylesheet();

        $theme = wp_get_theme( $wp_data['theme_slug'] );

        $wp_data['theme_name']    = $theme->get( 'Name' );
        $wp_data['theme_version'] = $theme->get( 'Version' );
        $wp_data['theme_uri']     = $theme->get( 'ThemeURI' );
        $wp_data['theme_author']  = $theme->get( 'Author' );

        return $wp_data;
    }

    /**
     * Get user IP Address
     */
    public function get_user_ip_address() {
        $response = wp_remote_get( 'https://icanhazip.com/' );

        if ( is_wp_error( $response ) ) {
            return '';
        }

        $ip = trim( wp_remote_retrieve_body( $response ) );

        if ( ! filter_var( $ip, FILTER_VALIDATE_IP ) ) {
            return '';
        }

        return $ip;
    }
}
