<?php
if (!defined('ABSPATH')) {
    die;
} // Cannot access directly.
/**
 *
 * @package   NurCreation - Propovoice
 * @author    NurCreation <support@propovice.com>
 * @link      https://propovoice.com
 * @copyright 2022 NurCreation 
 *
 * Plugin Name: Propovoice
 * Plugin URI: https://wordpress.org/plugins/propovoice
 * Author: Propovoice
 * Author URI: https://propovoice.com
 * Version: 0.1.0
 * Description: A complete estimate and invoice management system for the WordPress.
 * Text Domain: propovoice
 * Domain Path: /languages
 *
 */

if (!class_exists('Ncpi')) {

    if (!defined('NCPI_FILE')) {
        define('NCPI_FILE', __FILE__);
    }

    require_once plugin_dir_path(__FILE__) . 'includes/Ncpi.php';
}
