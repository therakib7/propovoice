<?php

namespace Ncpi\Controllers\PostType\Types; 

class Invoice { 

    public function __construct() {  
        add_action('init', [$this, 'create_post_type'] );  
    }  

    public function create_post_type() {
        
        if ( !is_blog_installed() || post_type_exists( 'ncpi_invoice' ) ) {
            return;
        }
         
        do_action('ncpi_ncpi_invoice_post_type');

        $labels = array(
            'name'                  => esc_html_x( 'Invoices', 'Post type general name', 'propovoice' ),
            'singular_name'         => esc_html_x( 'Invoice', 'Post type singular name', 'propovoice' ),
            'menu_name'             => esc_html_x( 'Invoices', 'Admin Menu text', 'propovoice' ),
            'name_admin_bar'        => esc_html_x( 'Invoice', 'Add New on Toolbar', 'propovoice' ),
            'add_new'               => esc_html__( 'Add New', 'propovoice' ),
            'add_new_item'          => esc_html__( 'Add New Invoice', 'propovoice' ),
            'new_item'              => esc_html__( 'New Invoice', 'propovoice' ),
            'edit_item'             => esc_html__( 'Edit Invoice', 'propovoice' ),
            'view_item'             => esc_html__( 'View Invoice', 'propovoice' ),
            'all_items'             => esc_html__( 'All Invoices', 'propovoice' ),
            'search_items'          => esc_html__( 'Search Invoices', 'propovoice' ),
            'parent_item_colon'     => esc_html__( 'Parent Invoices:', 'propovoice' ),
            'not_found'             => esc_html__( 'No ncpi_invoices found.', 'propovoice' ),
            'not_found_in_trash'    => esc_html__( 'No ncpi_invoices found in Trash.', 'propovoice' ), 
        );
     
        $args = array(
            'labels'             => $labels,
            'public'             => false,
            'publicly_queryable' => true,
            'show_ui'            => false,
            'show_in_menu'       => false,
            'query_var'          => true,  
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false, 
            'supports'           => array('title'),
        );
     
        register_post_type( 'ncpi_invoice', apply_filters('ncpi_ncpi_invoice_post_type_args', $args) );
        
        do_action('ncpi_after_ncpi_invoice_post_type'); 
    }   
}
