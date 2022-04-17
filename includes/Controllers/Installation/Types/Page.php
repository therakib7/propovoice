<?php

namespace Ncpi\Controllers\Installation\Types; 

class Page {

    public function __construct() {  
        $this->create_custom_page();
    }   

    function create_custom_page() {
        //Workplace pro
        //Estimate
        //Invoice
        //Proposal

        if ( get_page_by_title( 'estimate' ) == null ) {
            $args = array(
                'post_title'    => 'Propovoice Estimate', 
                'post_name'     => 'estimate',
                'post_status'   => 'publish',
                'post_author'   => 1,
                'post_type'     => 'page',
            ); 
            $id = wp_insert_post( $args );
            add_post_meta($id, '_wp_page_template', 'estimate-template.php');
        }

        if ( get_page_by_title( 'invoice' ) == null ) {
            $args = array(
                'post_title'    => 'Propovoice Invoice', 
                'post_name'     => 'invoice',
                'post_status'   => 'publish',
                'post_author'   => 1,
                'post_type'     => 'page',
            ); 
            $id = wp_insert_post( $args );
            add_post_meta($id, '_wp_page_template', 'invoice-template.php');
        }
    } 
}
