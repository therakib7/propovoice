<?php 
if ( ! defined( 'ABSPATH' ) ) { die; } // Cannot access directly.
/**
 *
 * @package   NurCreation - Propovoice
 * @author    NurCreation <info@nurcreation.com>
 * @link      https://nurcreation.com
 * @copyright 2022 NurCreation 
 *
 * Plugin Name: Propovoice
 * Plugin URI: https://nurcreation.com/plugins/propovoice
 * Author: NurCreation
 * Author URI: https://nurcreation.com
 * Version: 1.0.0
 * Description: This plugin will help you to easily create proposal and invoice for client
 * Text Domain: propovoice
 * Domain Path: /languages
 *
 */ 

if ( !class_exists('Ncpi') ) { 
    
    if ( !defined('NCPI_FILE') ) {
        define('NCPI_FILE', __FILE__);
    } 

    require_once plugin_dir_path( __FILE__ ) .'includes/Ncpi.php';
}    