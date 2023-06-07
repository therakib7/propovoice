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
 * Version: 1.6.0
 * Description: Lead, Deal, Estimate, Invoice, Billing, Client, Project Automation
 * Text Domain: propovoice
 * Domain Path: /languages
 *
 */

if (!class_exists('Ndpv')) {

    if (!defined('NDPV_FILE')) {
        define('NDPV_FILE', __FILE__);
    }

    require_once plugin_dir_path(__FILE__) . 'app/Ndpv.php';
}
