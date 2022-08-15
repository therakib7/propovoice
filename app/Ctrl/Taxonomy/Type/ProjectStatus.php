<?php

namespace Ncpi\Ctrl\Taxonomy\Type; 

class ProjectStatus { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpi_project_status' ) ) {
            return;
        }
         
        do_action('ndpi_project_status_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Project Status', 'project_status general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Project Status', 'project_status singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Project Status', 'propovoice' ),
            'all_items'         => esc_html__( 'All Project Status', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Project Status', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Project Status:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Project Status', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Project Status', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Project Status', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Project Status', 'propovoice' ),
            'menu_name'         => esc_html__( 'Project Status', 'propovoice' ),   
            'not_found'         => esc_html__( 'No project status found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'project_status' ),
        );
     
        register_taxonomy( 'ndpi_project_status', array( 'ndpi_project' ), apply_filters('ndpi_project_status_taxonomy_args', $args) ); 
        
        do_action('ncpi_after_project_status_taxonomy');          
    }
}
