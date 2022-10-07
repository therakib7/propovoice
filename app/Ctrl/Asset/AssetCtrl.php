<?php

namespace Ndpv\Ctrl\Asset;

use Ndpv\Helper\Fns;
use Ndpv\Helper\I18n;

class AssetCtrl
{
    private $suffix;
    private $version;

    public function __construct()
    {
        $this->suffix  = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
        $this->version = (defined('WP_DEBUG') && WP_DEBUG) ? time() : ndpv()->version(); 

        add_action('wp_enqueue_scripts', array($this, 'public_scripts'), 999);
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));

        //remove thank you text from propovoice dashboard
        if (isset($_GET['page']) && $_GET['page'] == 'ndpv') {
            add_filter('admin_footer_text', '__return_empty_string', 11);
            add_filter('update_footer', '__return_empty_string', 11);
        }

        add_filter('show_admin_bar', [$this, 'hide_admin_bar']);

        add_action('current_screen', function () {
            if (! $this->is_plugins_screen()) {
                return;
            }

            add_action('admin_enqueue_scripts', [ $this, 'enqueue_feedback_dialog' ]);
        });
    }

    public function hide_admin_bar($show)
    {
        if (
            is_page_template([
                'workspace-template.php',
                'invoice-template.php',
                'estimate-template.php'
            ])
        ) {
            return false;
        }
        return $show;
    }

    private function admin_public_script()
    {
    }

    private function dashboard_script()
    {
        //font family
        if (
            (isset($_GET['page']) && $_GET['page'] == 'ndpv-welcome') ||
            (isset($_GET['page']) && $_GET['page'] == 'ndpv') ||
            is_page_template([
                'workspace-template.php',
                'invoice-template.php',
                'estimate-template.php'
            ]) || 
            $this->is_plugins_screen()
        ) {
            wp_enqueue_style('ndpv-google-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), $this->version);
            wp_enqueue_style('ndpv-main', ndpv()->get_asset_uri("css/main{$this->suffix}.css"), array(), $this->version);
        }
        if (isset($_GET['page']) && $_GET['page'] == 'ndpv-welcome') {
            wp_enqueue_style('ndpv-welcome', ndpv()->get_asset_uri("css/welcome{$this->suffix}.css"), array(), $this->version);
            wp_enqueue_script('ndpv-welcome', ndpv()->get_asset_uri("/js/welcome{$this->suffix}.js"), array(), $this->version, true);
            wp_localize_script('ndpv-welcome', 'ndpv', array(
                'apiUrl' => esc_url(rest_url()),
                'nonce' => wp_create_nonce('wp_rest'),
                'dashboard' => menu_page_url('ndpv', false),
                'assetImgUri' => ndpv()->get_asset_uri('img/'),
                'i18n' => I18n::dashboard()
            ));
        }

        if (
            is_page_template([
                'invoice-template.php',
                'estimate-template.php'
            ])
        ) {
            //TODO: Remove all wordpress unused file from frontend

            wp_enqueue_style('ndpv-invoice', ndpv()->get_asset_uri("css/invoice{$this->suffix}.css"), array(), $this->version);
            wp_enqueue_script('ndpv-invoice', ndpv()->get_asset_uri("/js/invoice{$this->suffix}.js"), array(), $this->version, true);
            wp_localize_script('ndpv-invoice', 'ndpv', array(
                'apiUrl' => esc_url(rest_url()),
                'assetUri' => trailingslashit(NDPV_URL),
                'nonce' => wp_create_nonce('wp_rest'),
                'date_format' => Fns::phpToMomentFormat(get_option('date_format')),
                'assetImgUri' => ndpv()->get_asset_uri('img/')
            ));
        }

        if (
            (isset($_GET['page']) && $_GET['page'] == 'ndpv') ||
            is_page_template([
                'workspace-template.php',
                'invoice-template.php',
                'estimate-template.php'
            ])
        ) {
            wp_enqueue_style('ndpv-dashboard', ndpv()->get_asset_uri("css/dashboard{$this->suffix}.css"), array(), $this->version);
            wp_enqueue_script('ndpv-dashboard', ndpv()->get_asset_uri("/js/dashboard{$this->suffix}.js"), array(), $this->version, true);
            $current_user = wp_get_current_user();
            wp_localize_script('ndpv-dashboard', 'ndpv', array(
                'apiUrl' => esc_url(rest_url()),
                'version' => ndpv()->version(),
                'dashboard' => admin_url('admin.php?page=ndpv'),
                'invoice_page_url' => sprintf(
                    '%s?id=%s&token=%s',
                    Fns::client_page_url('invoice'),
                    'invoice_id',
                    'invoice_token'
                ),
                'estimate_page_url' => sprintf(
                    '%s?id=%s&token=%s',
                    Fns::client_page_url('estimate'),
                    'invoice_id',
                    'invoice_token'
                ),
                //'apiServerUrl' => 'http://ncpluginserver.local/wp-json/', //TODO: change server URL later
                'apiServerUrl' => 'https://appux.co/propovoice-server/wp-json/', //TODO: change server URL later
                'nonce' => wp_create_nonce('wp_rest'),
                'date_format' => Fns::phpToMomentFormat(get_option('date_format')),
                'assetImgUri' => ndpv()->get_asset_uri('img/'),
                'assetUri' => trailingslashit(NDPV_URL),
                'profile' => [
                    'name' => $current_user->display_name,
                    'img' => get_avatar_url($current_user->ID, ['size' => '36']),
                    'logout' => wp_logout_url(get_permalink()),
                ],
                'i18n' => I18n::dashboard()
            ));
        }
    }

    public function public_scripts()
    {
        $this->admin_public_script();

        //wp_enqueue_style( 'propovoice-main', ndpv()->get_asset_uri( "public/css/main{$this->suffix}.css" ), array(), $this->version );

        $this->dashboard_script();
    }

    public function admin_scripts()
    {
        $this->admin_public_script();
        $this->dashboard_script();
    }  
     
    /**
     * Enqueue feedback dialog scripts.
     *
     * Registers the feedback dialog scripts and enqueues them.
     *
     * @since 1.0.0
     * @access public
     */
    public function enqueue_feedback_dialog()
    {
        add_action('admin_footer', [ $this, 'deactivate_feedback_dialog' ]); 
        wp_enqueue_script('ndpv-feedback', ndpv()->get_asset_uri("/js/feedback{$this->suffix}.js"), array(), $this->version, true);
        wp_localize_script('ndpv-feedback', 'ndpv', array(
            'ajaxurl' => esc_url( admin_url('admin-ajax.php') ), 
        )); 
    }     

    /**
     * @since 1.0.1.5 
     */
    public function deactivate_feedback_dialog()
    {
        ndpv()->render('feedback/form');
    }

    /**
     * @since 1.0.1.5 
     */
    private function is_plugins_screen()
    {
        return in_array(get_current_screen()->id, [ 'plugins', 'plugins-network' ]);
    }
}
