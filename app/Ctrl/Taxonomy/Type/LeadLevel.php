<?php

namespace Ncpi\Ctrl\Taxonomy\Type; 

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
            'name'              => esc_html_x( 'Lead Levels', 'lead_level general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Lead Level', 'lead_level singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Lead Levels', 'propovoice' ),
            'all_items'         => esc_html__( 'All Lead Levels', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Lead Level', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Lead Level:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Lead Level', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Lead Level', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Lead Level', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Lead Level', 'propovoice' ),
            'menu_name'         => esc_html__( 'Lead Levels', 'propovoice' ),   
            'not_found'         => esc_html__( 'No lead stage found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'lead_level' ),
        );
     
        register_taxonomy( 'ndpi_lead_level', array( 'ndpi_lead' ), apply_filters('ndpi_lead_level_taxonomy_args', $args) ); 
        
        do_action('ncpi_after_lead_level_taxonomy');          
    }
}
