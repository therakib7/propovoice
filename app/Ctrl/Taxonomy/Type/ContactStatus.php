<?php

namespace Ndpv\Ctrl\Taxonomy\Type; 

class ContactStatus { 

    public function __construct() {  
        add_action('init', [$this, 'create_taxonomy'] ); 
    }  

    public function create_taxonomy() {
        
        if ( !is_blog_installed() || taxonomy_exists( 'ndpv_contact_status' ) ) {
            return;
        }
         
        do_action('ndpv_contact_status_taxonomy');  

        $labels = array(
            'name'              => esc_html_x( 'Contact Status', 'contact_status general name', 'propovoice' ),
            'singular_name'     => esc_html_x( 'Contact Status', 'contact_status singular name', 'propovoice' ),
            'search_items'      => esc_html__( 'Search Contact Status', 'propovoice' ),
            'all_items'         => esc_html__( 'All Contact Status', 'propovoice' ),
            'parent_item'       => esc_html__( 'Parent Contact Status', 'propovoice' ),
            'parent_item_colon' => esc_html__( 'Parent Contact Status:', 'propovoice' ),
            'edit_item'         => esc_html__( 'Edit Contact Status', 'propovoice' ),
            'update_item'       => esc_html__( 'Update Contact Status', 'propovoice' ),
            'add_new_item'      => esc_html__( 'Add New Contact Status', 'propovoice' ),
            'new_item_name'     => esc_html__( 'New Contact Status', 'propovoice' ),
            'menu_name'         => esc_html__( 'Contact Status', 'propovoice' ),   
            'not_found'         => esc_html__( 'No contact status found.', 'propovoice' ), 
        );
     
        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'contact_status' ),
        );
     
        register_taxonomy( 'ndpv_contact_status', array( 'ndpv_person', 'ndpv_org' ), apply_filters('ndpv_contact_status_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_contact_status_taxonomy');          
    }
}
