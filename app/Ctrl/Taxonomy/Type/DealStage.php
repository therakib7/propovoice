<?php

namespace Ndpi\Ctrl\Taxonomy\Type; 

class DealStage { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpi_deal_stage' ) ) {
            return;
        }
         
        do_action('ndpi_deal_stage_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Deal Stages', 'deal_stage general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Deal Stage', 'deal_stage singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Deal Stages', 'propovoice' ),
            'all_items'         => esc_html__( 'All Deal Stages', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Deal Stage', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Deal Stage:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Deal Stage', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Deal Stage', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Deal Stage', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Deal Stage', 'propovoice' ),
            'menu_name'         => esc_html__( 'Deal Stages', 'propovoice' ),   
            'not_found'         => esc_html__( 'No deal stage found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'deal_stage' ),
        );
     
        register_taxonomy( 'ndpi_deal_stage', array( 'ndpi_deal' ), apply_filters('ndpi_deal_stage_taxonomy_args', $args) ); 
        
        do_action('ncpi_after_deal_stage_taxonomy');          
    }
}
