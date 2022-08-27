<?php

namespace Ndpv\Ctrl\Taxonomy\Type; 

class LeadSource { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpv_lead_source' ) ) {
            return;
        }
         
        do_action('ndpv_lead_source_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Lead Sources', 'lead_source general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Lead Source', 'lead_source singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Lead Sources', 'propovoice' ),
            'all_items'         => esc_html__( 'All Lead Sources', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Lead Source', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Lead Source:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Lead Source', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Lead Source', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Lead Source', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Lead Source', 'propovoice' ),
            'menu_name'         => esc_html__( 'Lead Sources', 'propovoice' ),   
            'not_found'         => esc_html__( 'No lead stage found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'lead_source' ),
        );
     
        register_taxonomy( 'ndpv_lead_source', array( 'ndpv_lead' ), apply_filters('ndpv_lead_source_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_lead_source_taxonomy');          
    }
}
