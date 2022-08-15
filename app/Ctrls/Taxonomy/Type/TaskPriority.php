<?php

namespace Ncpi\Ctrls\Taxonomy\Type; 

class TaskPriority { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpi_task_priority' ) ) {
            return;
        }
         
        do_action('ndpi_task_priority_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Task Priority', 'task_priority general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Task Priority', 'task_priority singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Task Priority', 'propovoice' ),
            'all_items'         => esc_html__( 'All Task Priority', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Task Priority', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Task Priority:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Task Priority', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Task Priority', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Task Priority', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Task Priority', 'propovoice' ),
            'menu_name'         => esc_html__( 'Task Priority', 'propovoice' ),   
            'not_found'         => esc_html__( 'No task priority found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'task_priority' ),
        );
     
        register_taxonomy( 'ndpi_task_priority', array( 'ndpi_task' ), apply_filters('ndpi_task_priority_taxonomy_args', $args) ); 
        
        do_action('ncpi_after_task_priority_taxonomy');          
    }
}
