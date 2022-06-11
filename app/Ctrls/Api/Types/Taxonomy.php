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

        $taxonomy = isset( $params['taxonomy'] ) ? sanitize_text_field( $params['taxonomy'] ) : null;  

        if ( empty( $taxonomy ) ) {
            $reg_errors->add('field', esc_html__('Tab is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = [];

            if ( $taxonomy == 'deal_stage_tag' ) {  

                $get_stage = get_terms( array(
                    'taxonomy' => 'ndpi_deal_stage',
                    'orderby' => 'ID', 
                    'order'   => 'ASC',
                    'hide_empty' => false
                ) );

                $get_tag = get_terms( array(
                    'taxonomy' => 'ndpi_tag',
                    'orderby' => 'ID', 
                    'order'   => 'ASC',
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

            if ( $taxonomy == 'lead_level_tag' ) {  

                $get_level = get_terms( array(
                    'taxonomy' => 'ndpi_lead_level',
                    'orderby' => 'ID', 
                    'order'   => 'ASC',
                    'hide_empty' => false
                ) );

                $get_tag = get_terms( array(
                    'taxonomy' => 'ndpi_tag',
                    'orderby' => 'ID', 
                    'order'   => 'ASC',
                    'hide_empty' => false
                ) );

                $levelList = $tagList = [];

                foreach( $get_level as $level ) {
                    $levelList[] = [
                        'id' => $level->term_id,
                        'label' => $level->name
                    ];
                } 

                foreach( $get_tag as $tag ) {
                    $tagList[] = [
                        'id' => $tag->term_id,
                        'label' => $tag->name
                    ];
                } 

                $data = [
                    'levels' => $levelList,
                    'tags' => $tagList
                ];
            } 

            if ( $taxonomy == 'task_type' ) {  

                $get_type = get_terms( array(
                    'taxonomy' => 'ndpi_task_type',
                    'orderby' => 'ID', 
                    'order'   => 'ASC',
                    'hide_empty' => false
                ) ); 
                $typeList = [];

                foreach( $get_type as $type ) {
                    $typeList[] = [
                        'id' => $type->term_id,
                        'label' => $type->name
                    ];
                }  

                $data = [
                    'types' => $typeList 
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
