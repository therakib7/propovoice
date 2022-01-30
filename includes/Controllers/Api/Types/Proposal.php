<?php

namespace Ncpi\Controllers\Api\Types; 

use WP_Query;

class Proposal {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'ncpi/v1', '/proposals', [
            'methods' => 'GET',
            'callback' => [ $this, 'get' ],
            'permission_callback' => [ $this, 'get_permission' ]
        ] );
        
        register_rest_route( 'ncpi/v1', '/proposals', [
            'methods' => 'POST',
            'callback' => [ $this, 'create' ],
            'permission_callback' => [ $this, 'create_permission' ]
        ] );
    }

    public function get() { 

        $query = new WP_Query([
            'post_type' => 'ncpi_proposal',
            'post_status' => 'publish',
            'posts_per_page' => -1, 
        ]);

        $data = [];
        while( $query->have_posts() ) {
            $query->the_post();

            $field = [];

            $field['id'] = get_the_ID();
            $field['title'] = get_the_title();
            $field['name'] = 'Test Name';
            $field['status'] = 'read';
            $field['date'] = '10 12 20';

            $data[] = $field;
        }
        wp_reset_postdata();  

        return wp_send_json_success( $data );
    } 

    public function create( $req ) {
        $title = sanitize_text_field( $req['title'] );
        $name  = sanitize_text_field( $req['name'] );
 
        $data = array(
            'post_type' => 'ncpi_proposal',
            'post_title'    => $title,
            'post_content'  => '',
            'post_status'   => 'publish',
            'post_author'   => get_current_user_id() 
        ); 
        wp_insert_post( $data );

        return wp_send_json_success();
    }

    // check permission
    public function get_permission() {
        return true;
    }

    public function create_permission() {
        return current_user_can( 'publish_posts' );
    }
} 
