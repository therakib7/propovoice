<?php

namespace Ncpi\Ctrls\Api\Types; 

class Taxonomy {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'ncpi/v1', '/taxonomies', [
            'methods' => 'GET',
            'callback' => [ $this, 'get' ],
            'permission_callback' => [ $this, 'get_permission' ]
        ] );

        register_rest_route( 'ncpi/v1', '/taxonomies', [
            'methods' => 'POST',
            'callback' => [ $this, 'create' ],
            'permission_callback' => [ $this, 'create_permission' ]
        ] );
    }

    public function get($req) {
        $params = $req->get_params(); 
        $reg_errors = new \WP_Error;  

        $taxonomies = isset( $params['taxonomy'] ) ? sanitize_text_field( $params['taxonomy'] ) : null;  

        if ( empty( $taxonomies ) ) {
            $reg_errors->add('field', esc_html__('Taxonomy is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = [];
            
            $taxonomies = explode(',', $taxonomies);
            foreach ($taxonomies as $taxonomy) { 
                $get_taxonomy = get_terms( array(
                    'taxonomy' => 'ndpi_' . $taxonomy,
                    'orderby' => 'ID', 
                    'order'   => 'ASC',
                    'hide_empty' => false
                ) );

                $format_taxonomy = [];
                foreach( $get_taxonomy as $single ) {
                    $format_taxonomy[] = [
                        'id' => $single->term_id,
                        'label' => $single->name
                    ];
                } 
                $data[$taxonomy] = $format_taxonomy;
            }
            wp_send_json_success($data); 
        }
    } 

    public function create($req)
    {
        $params = $req->get_params(); 
        $reg_errors = new \WP_Error;  

        $taxonomy = isset( $params['taxonomy'] ) ? sanitize_text_field( $params['taxonomy'] ) : null;  

        if ( empty( $taxonomy ) ) {
            $reg_errors->add('field', esc_html__('Taxonomy is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else { 
            $data = []; 

            wp_send_json_success();
        }
    }

    public function get_permission() {
        return true;
    }

    public function create_permission() {
        return current_user_can( 'publish_posts' );
    } 
   
} 
