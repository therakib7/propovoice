<?php

namespace Ncpi\Controllers\Taxonomy\Types; 

class LeadLevel { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpi_lead_level' ) ) {
            return;
        }
         
        do_action('ndpi_lead_level_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Deal Levels', 'lead_level general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Deal Level', 'lead_level singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Deal Levels', 'propovoice' ),
            'all_items'         => esc_html__( 'All Deal Levels', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Deal Level', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Deal Level:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Deal Level', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Deal Level', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Deal Level', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Deal Level', 'propovoice' ),
            'menu_name'         => esc_html__( 'Deal Levels', 'propovoice' ),   
            'not_found'         => esc_html__( 'No deal stage found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'lead_level' ),
        );
     
        register_taxonomy( 'ndpi_lead_level', array( 'ndpi_deal' ), apply_filters('ndpi_lead_level_taxonomy_args', $args) ); 
        
        do_action('ncpi_after_lead_level_taxonomy');          
    }
}
