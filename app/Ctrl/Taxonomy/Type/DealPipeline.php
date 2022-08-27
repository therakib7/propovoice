<?php 
namespace Ndpv\Ctrl\Taxonomy\Type; 

class DealPipeline { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpv_deal_pipeline' ) ) {
            return;
        }
         
        do_action('ndpv_deal_pipeline_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Deal Pipelines', 'deal_pipeline general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Deal Pipeline', 'deal_pipeline singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Deal Pipelines', 'propovoice' ),
            'all_items'         => esc_html__( 'All Deal Pipelines', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Deal Pipeline', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Deal Pipeline:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Deal Pipeline', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Deal Pipeline', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Deal Pipeline', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Deal Pipeline', 'propovoice' ),
            'menu_name'         => esc_html__( 'Deal Pipelines', 'propovoice' ),   
            'not_found'         => esc_html__( 'No deal pipeline found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'deal_pipeline' ),
        );
     
        register_taxonomy( 'ndpv_deal_pipeline', array( 'ndpv_deal' ), apply_filters('ndpv_deal_pipeline_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_deal_pipeline_taxonomy');          
    }
}
