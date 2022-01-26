<?php

namespace Ncpi\Controllers\Installation\Types; 

class DB {

    public function __construct() {  
        $this->create_custom_table();
    }   

    function create_custom_table() {
        global $wpdb;
        $table_name = $wpdb->prefix . "ncpi_products";
        $ncpi_products_db_version = '1.0.0';
        $charset_collate = $wpdb->get_charset_collate();

        if ( $wpdb->get_var("SHOW TABLES LIKE '{$table_name}'") != $table_name ) {

            $sql = "CREATE TABLE $table_name (
                    ID mediumint(9) NOT NULL AUTO_INCREMENT,
                    `product_model` text NOT NULL,
                    `product_name` text NOT NULL,
                    `product_description` int(9) NOT NULL,
                    PRIMARY KEY  (ID)
            ) $charset_collate;";

            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);
            
            add_option('ncpi_db_version', $ncpi_products_db_version);
        }
    }

}
