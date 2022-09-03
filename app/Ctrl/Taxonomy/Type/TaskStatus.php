<?php 
namespace Ndpv\Ctrl\Taxonomy\Type; 

class TaskStatus { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpv_task_status' ) ) {
            return;
        }
         
        do_action('ndpv_task_status_taxonomy');  
     
        $args = array(
            'hierarchical'      => true, 
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'task_status' ),
        );
     
        register_taxonomy( 'ndpv_task_status', array( 'ndpv_task' ), apply_filters('ndpv_task_status_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_task_status_taxonomy');          
    }
}
