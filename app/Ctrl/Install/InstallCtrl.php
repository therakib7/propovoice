<?php

namespace Ndpi\Ctrl\Install;

use Ndpi\Ctrl\Install\Type\DB;
use Ndpi\Ctrl\Install\Type\Merging;
use Ndpi\Ctrl\Install\Type\Page;
use Ndpi\Ctrl\Install\Type\Taxonomy;

class InstallCtrl
{
    public function __construct()
    {
        register_activation_hook(NCPI_FILE, array($this, 'plugin_activate'));
        add_filter('cron_schedules', array($this, 'custom_schedule'));
        register_activation_hook(NCPI_FILE, array($this, 'schedule_my_cron'));

        add_action('admin_init', array($this, 'insertData'));
        add_action('admin_init', array($this, 'plugin_redirect'));

        $uploads_dir = trailingslashit(wp_upload_dir()['basedir']) . 'propovoice';
        wp_mkdir_p($uploads_dir);
    }

    public function custom_schedule($schedules)
    {
        $schedules['half_minute'] = array(
            'interval'  => 30,
            'display'   => esc_html__('Every Half Minute', 'propovoice')
        );

        $schedules['one_minute'] = array(
            'interval'  => 60,
            'display'   => esc_html__('Every 1 Minute', 'propovoice')
        );
        return $schedules;
    }

    public function schedule_my_cron()
    {

        //set cron job
        if (!wp_next_scheduled('ndpi_hourly_event')) {
            wp_schedule_event(time(), 'hourly', 'ndpi_hourly_event');
        }

        if (!wp_next_scheduled('ndpi_half_minute_event')) {
            wp_schedule_event(time(), 'half_minute', 'ndpi_half_minute_event');
        }

        if (!wp_next_scheduled('ndpi_one_minute_event')) {
            wp_schedule_event(time(), 'one_minute', 'ndpi_one_minute_event');
        }
    }

    public function plugin_activate()
    {
        add_option('ndpi_active', true);
    }

    public function plugin_redirect()
    {
        if (get_option('ndpi_active', false)) {
            delete_option('ndpi_active');

            // $this->insertData();

            wp_redirect(admin_url('admin.php?page=ndpi-welcome'));
        }
    }

    public function insertData()
    {
        $version = get_option('ndpi_version', '0.1.0');
        if ( version_compare( $version, NCPI_VERSION, '<') ) {
            update_option('ndpi_version', NCPI_VERSION);
        }
        
        if ( version_compare( $version, '0.5.0', '<') ) { 
            new Page();
            new DB();
            new Taxonomy();
            new Merging();

            // $uploads_dir = trailingslashit(wp_upload_dir()['basedir']) . 'propovoice';
            // wp_mkdir_p($uploads_dir);
        }  
    }
}
