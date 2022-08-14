<?php

namespace Ncpi\Ctrls\PostType\Type; 

class Proposal { 

    public function __construct() {  
        add_action('init', [$this, 'create_post_type'] );  
    }  

    public function create_post_type() {
        
        if ( ! is_blog_installed() || post_type_exists( 'ncpi_proposal' ) ) {
            return;
        }
         
        do_action('ncpi_ncpi_proposal_post_type');

        $label = array(
            'name'                  => esc_html_x( 'Proposal', 'Post type general name', 'propovoice' ),
            'singular_name'         => esc_html_x( 'Proposal', 'Post type singular name', 'propovoice' ),
            'menu_name'             => esc_html_x( 'All Proposal', 'Admin Menu text', 'propovoice' ),
            'name_admin_bar'        => esc_html_x( 'Proposal', 'Add New on Toolbar', 'propovoice' ),
            'add_new'               => esc_html__( 'Add New', 'propovoice' ),
            'add_new_item'          => esc_html__( 'Add New Proposal', 'propovoice' ),
            'new_item'              => esc_html__( 'New Proposal', 'propovoice' ),
            'edit_item'             => esc_html__( 'Edit Proposal', 'propovoice' ),
            'view_item'             => esc_html__( 'View Proposal', 'propovoice' ),
            'all_items'             => esc_html__( 'All Proposals', 'propovoice' ),
            'search_items'          => esc_html__( 'Search Proposal', 'propovoice' ),
            'parent_item_colon'     => esc_html__( 'Parent Proposal:', 'propovoice' ),
            'not_found'             => esc_html__( 'No proposal found.', 'propovoice' ),
            'not_found_in_trash'    => esc_html__( 'No proposal found in Trash.', 'propovoice' ), 
        ); 
        
        $support = array('title'); 
        $args = array( 
            'labels' => $label,
            'supports' => $support, 
            'hierarchical' => false,
            'public' => false, 
            'show_ui' => current_user_can('administrator'),
            'show_in_menu' => false,
            'show_in_nav_menus' => false,
            'show_in_admin_bar' => false,
            'menu_position' => 20,
            'menu_icon'  => 'dashicons-groups',
            'can_export' => true,
            'has_archive' => false,
            'exclude_from_search' => true,
            'publicly_queryable' => false,
            'capability_type' => 'page',
        );
     
        register_post_type( 'ncpi_proposal', apply_filters('ncpi_ncpi_proposal_post_type_args', $args) );
        
        do_action('ncpi_after_ncpi_proposal_post_type'); 
    }  
    
}
