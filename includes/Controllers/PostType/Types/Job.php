<?php

namespace Ncpi\Controllers\PostType\Types; 

class Job { 

    public function __construct() {  
        add_action('init', [$this, 'create_post_type'] ); 

        // Add the custom columns to the ncpi_job post type:
        add_filter( 'manage_ncpi_job_posts_columns', [$this, 'set_custom_edit_ncpi_job_columns'] );
        // Add the data to the custom columns for the ncpi_job post type:
        add_action( 'manage_ncpi_job_posts_custom_column' , [$this, 'custom_ncpi_job_column'], 10, 2 );
    }  

    public function create_post_type() {
        
        if ( !is_blog_installed() || post_type_exists( 'ncpi_job' ) ) {
            return;
        }
         
        do_action('ncpi_ncpi_job_post_type');

        $label = array(
            'name'                  => esc_html_x( 'Job', 'Post type general name', 'propovoice' ),
            'singular_name'         => esc_html_x( 'Job', 'Post type singular name', 'propovoice' ),
            'menu_name'             => esc_html_x( 'All Job', 'Admin Menu text', 'propovoice' ),
            'name_admin_bar'        => esc_html_x( 'Job', 'Add New on Toolbar', 'propovoice' ),
            'add_new'               => esc_html__( 'Add New', 'propovoice' ),
            'add_new_item'          => esc_html__( 'Add New Job', 'propovoice' ),
            'new_item'              => esc_html__( 'New Job', 'propovoice' ),
            'edit_item'             => esc_html__( 'Edit Job', 'propovoice' ),
            'view_item'             => esc_html__( 'View Job', 'propovoice' ),
            'all_items'             => esc_html__( 'All Jobs', 'propovoice' ),
            'search_items'          => esc_html__( 'Search Job', 'propovoice' ),
            'parent_item_colon'     => esc_html__( 'Parent Job:', 'propovoice' ),
            'not_found'             => esc_html__( 'No code found.', 'propovoice' ),
            'not_found_in_trash'    => esc_html__( 'No code found in Trash.', 'propovoice' ), 
        ); 
        
        $support = array('title'); 
        $args = array( 
            'labels' => $label,
            'supports' => $support, 
            'hierarchical' => false,
            'public' => false, 
            'show_ui' => current_user_can('administrator'),
            'show_in_menu' => 'ncpi',
            'show_in_nav_menus' => false,
            'show_in_admin_bar' => true,
            'menu_position' => 20,
            'menu_icon'  => 'dashicons-groups',
            'can_export' => true,
            'has_archive' => false,
            'exclude_from_search' => true,
            'publicly_queryable' => false,
            'capability_type' => 'page',
        );
     
        register_post_type( 'ncpi_job', apply_filters('ncpi_ncpi_job_post_type_args', $args) );
        
        do_action('ncpi_after_ncpi_job_post_type'); 
    }  

    public function set_custom_edit_ncpi_job_columns($columns) { 
        // Remove Date
        unset($columns['date']);
        $columns['type'] = esc_html__( 'Code Type', 'propovoice' );
        $columns['location'] = esc_html__( 'Location', 'propovoice' ); 
        $columns['priority'] = esc_html__( 'Priority', 'propovoice' ); 
        $columns['date'] = esc_html__( 'Date', 'propovoice' );

        return $columns;
    } 

    public function custom_ncpi_job_column( $column, $post_id ) {
        switch ( $column ) {

            case 'type' :
                $types = get_post_meta( $post_id, 'ncpi_type', true);
                if ( is_array( $types ) ) {
                    foreach( $types as $type ) {
                        printf(
                            '<span class="ncpi-type ncpi-type-%s">%s</span>',
                            $type,
                            strtoupper( $type )
                        );
                    }
                } 
                break;

            case 'location' :
                $where = get_post_meta( $post_id, 'ncpi_location', true); 
                if ( $where ) {
                    echo ucwords( $where );
                }
                break;

            case 'priority':
                $priority = get_post_field( 'menu_order', $post_id, true ); 
                if ( $priority ) {
                    echo absint( $priority );
                } 
                break; 

        }
    }
}
