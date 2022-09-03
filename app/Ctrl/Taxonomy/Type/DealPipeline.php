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
     
        $args = array(
            'hierarchical'      => true, 
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'deal_pipeline' ),
        );
     
        register_taxonomy( 'ndpv_deal_pipeline', array( 'ndpv_deal' ), apply_filters('ndpv_deal_pipeline_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_deal_pipeline_taxonomy');          
    }
}
