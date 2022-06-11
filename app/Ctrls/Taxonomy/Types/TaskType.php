<?php

namespace Ncpi\Ctrls\Taxonomy\Types; 

class TaskType { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpi_task_type' ) ) {
            return;
        }
         
        do_action('ndpi_task_type_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Task Types', 'task_type general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Task Type', 'task_type singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Task Types', 'propovoice' ),
            'all_items'         => esc_html__( 'All Task Types', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Task Type', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Task Type:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Task Type', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Task Type', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Task Type', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Task Type', 'propovoice' ),
            'menu_name'         => esc_html__( 'Task Types', 'propovoice' ),   
            'not_found'         => esc_html__( 'No task type found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'task_type' ),
        );
     
        register_taxonomy( 'ndpi_task_type', array( 'ndpi_task' ), apply_filters('ndpi_task_type_taxonomy_args', $args) ); 
        
        do_action('ncpi_after_task_type_taxonomy');          
    }
}
