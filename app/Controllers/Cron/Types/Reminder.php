<?php

namespace Ncpi\Controllers\Cron\Types;

use Ncpi\Helpers\Fns;
use WP_Query;

class Reminder
{

    public function __construct()
    {
        // add_action('ndpi_one_minute_event', [$this, 'handle_event']);
        // add_action('ndpi_half_minute_event', [$this, 'handle_event']);
        // add_action('ndpi_hourly_event', [$this, 'handle_event']);
    }

    /**
     * Run schedule every specific time
     * Check if any reminder on
     * Check if reminder not reached limit
     * Add history if reminder sent
     */
    public function handle_event()
    {
    }
}
