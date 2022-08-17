<?php

namespace Ndpi\Ctrl\Taxonomy\Type; 

class TaskStatus { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpi_task_status' ) ) {
            return;
        }
         
        do_action('ndpi_task_status_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Task Status', 'task_status general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Task Status', 'task_status singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Task Status', 'propovoice' ),
            'all_items'         => esc_html__( 'All Task Status', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Task Status', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Task Status:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Task Status', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Task Status', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Task Status', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Task Status', 'propovoice' ),
            'menu_name'         => esc_html__( 'Task Status', 'propovoice' ),   
            'not_found'         => esc_html__( 'No task status found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'task_status' ),
        );
     
        register_taxonomy( 'ndpi_task_status', array( 'ndpi_task' ), apply_filters('ndpi_task_status_taxonomy_args', $args) ); 
        
        do_action('ncpi_after_task_status_taxonomy');          
    }
}
