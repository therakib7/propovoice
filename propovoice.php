<?php
if (!defined('ABSPATH')) {
    die;
} // Cannot access directly.
/**
 *
 * @package   NurencyDigital - Propovoice
 * @author    NurencyDigital <support@propovoice.com>
 * @link      https://propovoice.com
 * @copyright 2022 NurencyDigital 
 *
 * Plugin Name: Propovoice
 * Plugin URI: https://wordpress.org/plugins/propovoice
 * Author: Propovoice
 * Author URI: https://propovoice.com
<<<<<<< HEAD
 * Version: 1.0.1.6
=======
 * Version: 1.0.1.5
>>>>>>> 0d49210e2a1f4deba6c1891e6aeed92aa2ebf922
 * Description: Lead, Deal, Estimate, Invoice, Billing, Client, Project Automation
 * Text Domain: propovoice
 * Domain Path: /languages
 *
 */

if ( !class_exists('Ndpv') ) {

    if (!defined('NDPV_FILE')) {
        define('NDPV_FILE', __FILE__);
    }

    require_once plugin_dir_path(__FILE__) . 'app/Ndpv.php';
} 