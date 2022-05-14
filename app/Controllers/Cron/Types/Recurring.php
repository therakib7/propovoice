<?php

namespace Ncpi\Controllers\Cron\Types;

use Ncpi\Helpers\Fns;
use WP_Query;

class Recurring
{

    public function __construct()
    {
        // add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {
    }
}
