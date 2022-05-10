<?php

namespace Ncpi\Controllers\Cron\Types;

use Ncpi\Helpers\Fns;
use WP_Query;

class Reminder
{

    public function __construct()
    {
        // add_action('ncpi_one_minute_event', [$this, 'handle_event']);
        add_action('ncpi_hourly_event', [$this, 'handle_event']);
    }

    public function handle_event()
    {
        // add_option('testing-'.time(), time());
    }
}
