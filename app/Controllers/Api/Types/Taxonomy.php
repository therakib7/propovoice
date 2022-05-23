<?php

namespace Ncpi\Controllers\Api\Types; 

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

        $taxonomy = isset( $params['taxonomy'] ) ? sanitize_text_field( $params['taxonomy'] ) : null;  

        if ( empty( $taxonomy ) ) {
            $reg_errors->add('field', esc_html__('Tab is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = [];

            if ( $taxonomy == 'deal_stage_tag' ) { 

                $temp_stage = [
                    'Requested',
                    'Todo',
                    'In Progress',
                    'Done',
                ];  
                foreach( $temp_stage as $stage ) {
                    wp_insert_term(
                        $stage,   // the term 
                        'ncpi_deal_stage', // the taxonomy 
                    );
                }

                $temp_tag = [
                    'Design',
                    'Development',
                    'Marketing',
                ];  
                foreach( $temp_tag as $tag ) {
                    wp_insert_term(
                        $tag,   // the term 
                        'ncpi_deal_tag', // the taxonomy 
                    );
                } 

                $get_stage = get_terms( array(
                    'taxonomy' => 'ncpi_deal_stage',
                    'hide_empty' => false
                ) );

                $get_tag = get_terms( array(
                    'taxonomy' => 'ncpi_deal_tag',
                    'hide_empty' => false
                ) );

                $stageList = $tagList = [];

                foreach( $get_stage as $stage ) {
                    $stageList[] = [
                        'id' => $stage->term_id,
                        'label' => $stage->name
                    ];
                } 

                foreach( $get_tag as $tag ) {
                    $tagList[] = [
                        'id' => $tag->term_id,
                        'label' => $tag->name
                    ];
                } 

                $data = [
                    'stages' => $stageList,
                    'tags' => $tagList
                ];
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

            if ( $taxonomy == 'general_social' ) {
                //TODO: sanitization  
                $data['social'] = isset( $params['social'] ) ? ( $params['social'] ) : null; 

                $option = update_option('ncpi_' . $taxonomy , $data);                 
            } 

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
