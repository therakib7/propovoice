<?php 
namespace Ndpv\Ctrl\Taxonomy\Type; 

class EstinvQtyType { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpv_estinv_qty_type' ) ) {
            return;
        }
         
        do_action('ndpv_estinv_qty_type_taxonomy');   
     
        $args = array(
            'hierarchical'      => true, 
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'estinv_qty_type' ),
        );
     
        register_taxonomy( 'ndpv_estinv_qty_type', array( 'ndpv_project' ), apply_filters('ndpv_estinv_qty_type_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_estinv_qty_type_taxonomy');          
    }
}
