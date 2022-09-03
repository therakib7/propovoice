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
     
        $args = array(
            'hierarchical'      => true, 
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => 'contact_status' ),
        );
     
        register_taxonomy( 'ndpv_contact_status', array( 'ndpv_person', 'ndpv_org' ), apply_filters('ndpv_contact_status_taxonomy_args', $args) ); 
        
        do_action('ndpv_after_contact_status_taxonomy');          
    }
}
