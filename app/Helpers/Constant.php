<?php

namespace Ncpi\Helpers;

class Constant
{
    public function __construct()
    {
        if (!defined('NCPI_VERSION')) {
            define('NCPI_VERSION', '0.5.0');
        }

        if (!defined('NCPI_PATH')) {
            define('NCPI_PATH', plugin_dir_path(NCPI_FILE));
        }

        if (!defined('NCPI_URL')) {
            define('NCPI_URL', plugins_url('', NCPI_FILE));
        }

        if (!defined('NCPI_SLUG')) {
            define('NCPI_SLUG', basename(dirname(NCPI_FILE)));
        }

        if (!defined('NCPI_TEMPLATE_DEBUG_MODE')) {
            define('NCPI_TEMPLATE_DEBUG_MODE', false);
        }
    }
}
