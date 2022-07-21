<?php

namespace Ncpi\Ctrls\Taxonomy\Types; 

class ExtraAmount { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpi_extra_amount' ) ) {
            return;
        }
         
        do_action('ndpi_extra_amount_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Estvoice Extra Amounts', 'extra_amount general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Estvoice Extra Amount', 'extra_amount singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Estvoice Extra Amounts', 'propovoice' ),
            'all_items'         => esc_html__( 'All Estvoice Extra Amounts', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Estvoice Extra Amount', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Estvoice Extra Amount:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Estvoice Extra Amount', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Estvoice Extra Amount', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Estvoice Extra Amount', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Estvoice Extra Amount', 'propovoice' ),
            'menu_name'         => esc_html__( 'Estvoice Extra Amounts', 'propovoice' ),   
            'not_found'         => esc_html__( 'No Estvoice extra amount found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'ndpi_extra_amount' ),
        );
     
        register_taxonomy( 'ndpi_extra_amount', array( 'ndpi_deal' ), apply_filters('ndpi_extra_amount_taxonomy_args', $args) ); 
        
        do_action('ncpi_after_extra_amount_taxonomy');          
    }
}
