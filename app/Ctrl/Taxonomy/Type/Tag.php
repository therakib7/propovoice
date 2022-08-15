<?php

namespace Ncpi\Ctrl\Taxonomy\Type; 

class Tag { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpi_tag' ) ) {
            return;
        }
         
        do_action('ndpi_tag_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Deal Tags', 'deal_tag general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Deal Tag', 'deal_tag singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Deal Tags', 'propovoice' ),
            'all_items'         => esc_html__( 'All Deal Tags', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Deal Tag', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Deal Tag:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Deal Tag', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Deal Tag', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Deal Tag', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Deal Tag', 'propovoice' ),
            'menu_name'         => esc_html__( 'Deal Tags', 'propovoice' ),   
            'not_found'         => esc_html__( 'No deal tag found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'ndpi_tag' ),
        );
     
        register_taxonomy( 'ndpi_tag', array( 'ndpi_deal' ), apply_filters('ndpi_tag_taxonomy_args', $args) ); 
        
        do_action('ncpi_after_deal_tag_taxonomy');          
    }
}
