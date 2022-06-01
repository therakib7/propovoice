<?php

namespace Ncpi\Ctrls\Api\Types;

use WP_Query;

class Project
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/projects', [
            [
                'methods' => 'GET', 
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_permission'], 
            ],
            [
                'methods' => 'POST', 
                'callback' => [$this, 'create'],
                'permission_callback' => [$this, 'create_permission']
            ],
        ]);

        register_rest_route('ncpi/v1', '/projects/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_single'],
            'permission_callback' => [$this, 'get_permission'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ncpi/v1', '/projects/(?P<id>\d+)', array(
            'methods' => 'PUT',
            'callback' => [$this, 'update'],
            'permission_callback' => [$this, 'update_permission'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ncpi/v1', '/projects/(?P<id>[0-9,]+)', array(
            'methods' => 'DELETE',
            'callback' => [$this, 'delete'],
            'permission_callback' => [$this, 'delete_permission'],
            'args' => array(
                'id' => array(
                    'sanitize_callback'  => 'sanitize_text_field',
                ),
            ),
        ));
    }

    public function get( $req )
    {
        $request = $req->get_params();

        $per_page = 10;
        $offset = 0;

        if ( isset($request['per_page']) ) {
            $per_page = $request['per_page'];
        }

        if ( isset($request['page']) && $request['page'] > 1 ) {
            $offset = ( $per_page * $request['page'] ) - $per_page;
        }

        $args = array( 
            'post_type' => 'ndpi_project',
            'post_status' => 'publish',
            'posts_per_page' => $per_page, 
            'offset' => $offset,
        ); 

        $args['meta_query'] = array(
            'relation' => 'OR'
        );  

        if ( isset( $request['client_id'] ) ) {   
            $args['meta_query'][] = array( 
                array(
                    'key'     => 'client_id',
                    'value'   => $request['client_id'] 
                )
            );
        }

        $query = new WP_Query( $args );
        $total_data = $query->found_posts; //use this for pagination 
        $result = $data = [];
        while ( $query->have_posts() ) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id; 
            
            $query_data['title'] = get_the_title();
            $query_data['desc'] = get_the_content(); 

            $client_id = (int) get_post_meta($id, 'client_id', true);
            $clientData = null; 
            if ( $client_id ) {
                $clientData['id'] = $client_id;
                $client_obj = get_user_by('id', $client_id);
                
                $clientData['first_name'] = $client_obj->first_name;
                $clientData['last_name'] = $client_obj->last_name; 
                $clientData['email'] = $client_obj->user_email; 
            } 
            $query_data['client_id'] = $client_id;
            $query_data['client'] = $clientData;

            $query_data['date'] = get_the_time('j-M-Y');
            $data[] = $query_data;

        } 
        wp_reset_postdata(); 

        $result['result'] = $data;
        $result['total'] = $total_data; 

        return wp_send_json_success($result); 
    }

    public function get_single( $req )
    {  
        $url_params = $req->get_url_params();
        $id    = $url_params['id'];  
        $query_data = [];
        $query_data['id'] = $id; 
          
        $query_data['title'] = get_the_title($id);
        $query_data['desc'] = get_post_field('post_content', $id);  

        $client_id = get_post_meta($id, 'client_id', true);
        $clientData = []; 
        if ( $client_id ) {
            $clientData['id'] = $client_id;
            $client_obj = get_user_by('id', $client_id);
            
            $clientData['first_name'] = $client_obj->first_name;
            $clientData['last_name'] = $client_obj->last_name; 
            $clientData['email'] = $client_obj->user_email; 
        } 
        $query_data['client_id'] = $client_id;
        $query_data['client'] = $clientData;

        return wp_send_json_success($query_data); 
    }

    public function create($req)
    { 

        $params = $req->get_params(); 
        $reg_errors = new \WP_Error;  

        $title = isset( $params['title'] ) ? sanitize_text_field( $params['title'] ) : null; 
        $desc = isset( $params['desc'] ) ? sanitize_text_field( $params['desc'] ) : null;  
        $client_id = isset( $params['client_id'] ) ? absint( $params['client_id'] ) : null;  

        if ( empty( $title ) ) {
            $reg_errors->add('field', esc_html__('Title is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
         
            $data = array(
                'post_type' => 'ndpi_project',
                'post_title'    => $title,
                'post_content'  => $desc,
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id() 
            ); 
            $post_id = wp_insert_post( $data );

            if ( !is_wp_error($post_id) ) {
                
                if ( $client_id ) {
                    update_post_meta($post_id, 'client_id', $client_id); 
                } 

                wp_send_json_success($post_id);
            } else {
                wp_send_json_error();
            }
        }
    } 

    public function update($req)
    {  
        $params = $req->get_params(); 
        $reg_errors = new \WP_Error;  

        $title = isset( $params['title'] ) ? sanitize_text_field( $params['title'] ) : null; 
        $desc = isset( $params['desc'] ) ? sanitize_text_field( $params['desc'] ) : null;
        $client_id = isset( $params['client_id'] ) ? absint( $params['client_id'] ) : null;

        if ( empty( $title ) ) {
            $reg_errors->add('field', esc_html__('Name is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];
 
            $data = array(
                'ID'            => $post_id,  
                'post_title'    => $title,
                'post_content'  => $desc,
                'post_author'   => get_current_user_id() 
            ); 
            $post_id = wp_update_post( $data );

            if ( !is_wp_error($post_id) ) {
                
                if ( $client_id ) {
                    update_post_meta($post_id, 'client_id', $client_id); 
                } else {
                    delete_post_meta($post_id, 'client_id'); 
                }

                wp_send_json_success($post_id);
            } else {
                wp_send_json_error();
            }
        }
    } 

    public function delete($req)
    {
        $url_params = $req->get_url_params();

        $ids = explode(',', $url_params['id']);
        foreach ($ids as $id) { 
            wp_delete_post($id);
        }
        wp_send_json_success($ids);
    }

    // check permission
    public function get_permission()
    {
        return true;
    }

    public function create_permission()
    {
        return current_user_can('publish_posts');
    }

    public function update_permission()
    {
        return current_user_can('edit_posts');
    }

    public function delete_permission()
    {
        return current_user_can('delete_posts');
    }
}
