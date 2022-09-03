<?php 
namespace Ndpv\Ctrl\Taxonomy\Type; 

class LeadLevel { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpv_lead_level' ) ) {
            return;
        }
         
        do_action('ndpv_lead_level_taxonomy');  
 
        $args = array(
            'hierarchical'      => true, 
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'lead_level' ),
        );
     
        register_taxonomy( 'ndpv_lead_level', array( 'ndpv_lead' ), apply_filters('ndpv_lead_level_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_lead_level_taxonomy');          
    }
}
