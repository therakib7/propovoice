<?php

namespace Ncpi\Ctrl\Install;

use Ncpi\Ctrl\Install\Type\DB;
use Ncpi\Ctrl\Install\Type\Merging;
use Ncpi\Ctrl\Install\Type\Page;
use Ncpi\Ctrl\Install\Type\Taxonomy;

class InstallCtrl
{

    public function __construct()
    {
        register_activation_hook(NCPI_FILE, array($this, 'plugin_activate'));
        add_filter('cron_schedules', array($this, 'custom_schedule'));
        register_activation_hook(NCPI_FILE, array($this, 'schedule_my_cron'));

        add_action('admin_init', array($this, 'plugin_redirect'));
    }

    function custom_schedule($schedules)
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

    function schedule_my_cron()
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

    function plugin_activate()
    {
        add_option('ncpi_activation_redirect', true);
    }

    function plugin_redirect()
    {
        if (get_option('ncpi_activation_redirect', false)) {
            delete_option('ncpi_activation_redirect');

            //TODO: Check by plugin version
            if (get_option('ncpi_role_version') < 1) {
                new Page();

                $uploads_dir = trailingslashit(wp_upload_dir()['basedir']) . 'propovoice';
                wp_mkdir_p($uploads_dir);
            }

            if (get_option('ncpi_role_version') < 1.1) {
                new DB();
                new Taxonomy();
                new Merging();
            }

            update_option('ncpi_role_version', 1.1);

            wp_redirect(admin_url('admin.php?page=ndpi-welcome'));
        }
    }
}
