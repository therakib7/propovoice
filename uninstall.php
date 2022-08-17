<?php
// If uninstall not called from WordPress, then exit

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

$timestamp = wp_next_scheduled( 'ndpi_hourly_event' );
wp_unschedule_event( $timestamp, 'ndpi_hourly_event' );