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
 * Version: 0.5.0
 * Description: A complete estimate and invoice management system for the WordPress.
 * Text Domain: propovoice
 * Domain Path: /languages
 *
 */

if (!class_exists('Ndpi')) {

    if (!defined('NCPI_FILE')) {
        define('NCPI_FILE', __FILE__);
    }

    require_once plugin_dir_path(__FILE__) . 'app/Ndpi.php';
} 