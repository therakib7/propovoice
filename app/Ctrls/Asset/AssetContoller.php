<?php

namespace Ncpi\Ctrls\Asset;

use Ncpi\Helpers\Fns;
use Ncpi\Helpers\I18n;

class AssetContoller
{
    private $suffix;
    private $version;

    public function __construct()
    {
        $this->suffix  = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
        $this->version = (defined('WP_DEBUG') && WP_DEBUG) ? time() : ncpi()->version();
        $this->ajaxurl = admin_url('admin-ajax.php');

        add_action('wp_enqueue_scripts', array($this, 'public_scripts'), 999);
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));

        //remove thank you text from propovoice dashboard
        if (isset($_GET['page']) && $_GET['page'] == 'ndpi') {
            add_filter('admin_footer_text', '__return_empty_string', 11);
            add_filter('update_footer', '__return_empty_string', 11);
        }

        add_filter('show_admin_bar', [$this, 'hide_admin_bar']);
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

    public function admin_public_script()
    {
    }

    public function dashboard_script()
    {
        //font family
        if (
            (isset($_GET['page']) && $_GET['page'] == 'ndpi-welcome') ||
            (isset($_GET['page']) && $_GET['page'] == 'ndpi') ||
            is_page_template([
                'workspace-template.php',
                'invoice-template.php',
                'estimate-template.php'
            ])
        ) {
            wp_enqueue_style('ncpi-google-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), $this->version);
        }
        if (isset($_GET['page']) && $_GET['page'] == 'ndpi-welcome') {
            wp_enqueue_style('ndpi-welcome', ncpi()->get_assets_uri("css/welcome{$this->suffix}.css"), array(), $this->version);
            wp_enqueue_script('ndpi-welcome', ncpi()->get_assets_uri("/js/welcome{$this->suffix}.js"), array('wp-i18n'), $this->version, true);
            wp_localize_script('ndpi-welcome', 'ndpi', array(
                'apiUrl' => esc_url(rest_url()),
                'nonce' => wp_create_nonce('wp_rest'),
                'dashboard' => menu_page_url('ndpi', false),
                'assetImgUri' => ncpi()->get_assets_uri('img/')
            ));
        }

        if (
            is_page_template([
                'invoice-template.php',
                'estimate-template.php'
            ])
        ) {

            //TODO: Remove all wordpress unused file from frontend

            wp_enqueue_style('ndpi-invoice', ncpi()->get_assets_uri("css/invoice{$this->suffix}.css"), array(), $this->version);
            wp_enqueue_script('ndpi-invoice', ncpi()->get_assets_uri("/js/invoice{$this->suffix}.js"), array(), $this->version, true);
            wp_localize_script('ndpi-invoice', 'ndpi', array(
                'apiUrl' => esc_url(rest_url()),
                'nonce' => wp_create_nonce('wp_rest'),
                'assetImgUri' => ncpi()->get_assets_uri('img/')
            ));
        }

        if (
            (isset($_GET['page']) && $_GET['page'] == 'ndpi') ||
            is_page_template([
                'workspace-template.php',
                'invoice-template.php',
                'estimate-template.php'
            ])
        ) {
            wp_enqueue_style('ndpi-dashboard', ncpi()->get_assets_uri("css/dashboard{$this->suffix}.css"), array(), $this->version);
            wp_enqueue_script('ndpi-dashboard', ncpi()->get_assets_uri("/js/dashboard{$this->suffix}.js"), array('wp-i18n'), $this->version, true);
            $current_user = wp_get_current_user();
            wp_localize_script('ndpi-dashboard', 'ndpi', array(
                'apiUrl' => esc_url(rest_url()),
                'version' => ncpi()->version(),
                'dashboard' => admin_url('admin.php?page=ndpi'),
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
                'assetImgUri' => ncpi()->get_assets_uri('img/'),
                'assetUri' => trailingslashit(NCPI_URL),
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

        //wp_enqueue_style( 'propovoice-main', ncpi()->get_assets_uri( "public/css/main{$this->suffix}.css" ), array(), $this->version );

        $this->dashboard_script();
    }

    public function admin_scripts()
    {
        $this->admin_public_script();
        $this->dashboard_script();
    }
}
