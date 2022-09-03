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
     
        $args = array(
            'hierarchical'      => true, 
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'lead_source' ),
        );
     
        register_taxonomy( 'ndpv_lead_source', array( 'ndpv_lead' ), apply_filters('ndpv_lead_source_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_lead_source_taxonomy');          
    }
}
