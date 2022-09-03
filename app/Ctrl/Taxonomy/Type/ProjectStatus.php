<?php 
namespace Ndpv\Ctrl\Taxonomy\Type; 

class ProjectStatus { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpv_project_status' ) ) {
            return;
        }
         
        do_action('ndpv_project_status_taxonomy');   
     
        $args = array(
            'hierarchical'      => true, 
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'project_status' ),
        );
     
        register_taxonomy( 'ndpv_project_status', array( 'ndpv_project' ), apply_filters('ndpv_project_status_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_project_status_taxonomy');          
    }
}
