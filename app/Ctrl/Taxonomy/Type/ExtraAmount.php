<?php 
namespace Ndpv\Ctrl\Taxonomy\Type; 

class ExtraAmount { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpv_extra_amount' ) ) {
            return;
        }
         
        do_action('ndpv_extra_amount_taxonomy');   
     
        $args = array(
            'hierarchical'      => true, 
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'ndpv_extra_amount' ),
        );
     
        register_taxonomy( 'ndpv_extra_amount', array( 'ndpv_deal' ), apply_filters('ndpv_extra_amount_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_extra_amount_taxonomy');          
    }
}
