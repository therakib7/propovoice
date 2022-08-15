<?php

namespace Ncpi\Ctrls\Api\Type;

class Action
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {
        register_rest_route('ncpi/v1', '/actions', [
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

        register_rest_route('ncpi/v1', '/actions/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/actions/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/actions/(?P<id>[0-9,]+)', array(
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

    public function get($req)
    {
        $request = $req->get_params(); 
        wp_send_json_success();
    }  

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id    = $url_params['id'];
        $query_data = [];
        $query_data['id'] = $id; 

        wp_send_json_success($query_data);
    }

    public function create($req)
    {

        $params = $req->get_params();
        $reg_errors = new \WP_Error; 
         
        $id = isset($params['id']) ? absint($params['id']) : null;
        $type = isset($params['type']) ? sanitize_text_field($params['type']) : null; 

        if (
            empty($id) ||
            empty($type) 
        ) {
            $reg_errors->add('field', esc_html__('Required field is missing', 'propovoice'));
        }
        
        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {  
            // $post = (array) get_post( $id );
            // unset($post['ID']); // Remove id, wp will create new post if not set.
            // wp_insert_post($post);
            // $post_id = wp_insert_post( $data );

            $title   = get_the_title($id);
            $oldpost = get_post($id);
            $post    = array(
                'post_title' => $title,
                'post_status' => 'publish',
                'post_type' => $oldpost->post_type,
                'post_author' => get_current_user_id()
            );
            $new_post_id = wp_insert_post($post);
            
            // Copy post metadata
            $data = get_post_meta($id);
            foreach ( $data as $key => $values) {
                foreach ($values as $value) {
                    if ( $key == 'status' ) {
                        $value = 'draft';
                    }

                    if ( $key == 'path' && $type == 'copy-to-inv' ) {
                        $value = 'invoice'; 
                    }

                    if ( $key == 'invoice' && $type == 'copy-to-inv' ) {
                        $value = maybe_unserialize( $value ); 
                        $value['path'] = 'invoice';
                    }
                    
                    add_post_meta( $new_post_id, $key, maybe_unserialize( $value ) );
                }
            }

            if ( !is_wp_error($new_post_id) ) {  
                wp_send_json_success($new_post_id);
            } else {
                wp_send_json_error();
            }
        }
    }

    public function update($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error; 

        $url_params = $req->get_url_params(); 
        $id = isset($url_params['id']) ? absint($url_params['id']) : null;
        $type = isset($params['type']) ? sanitize_text_field($params['type']) : null; 

        if (
            empty($id) ||
            empty($type) 
        ) {
            $reg_errors->add('field', esc_html__('Required field is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            update_post_meta($id, 'status', $type);  
            wp_send_json_success($id);
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
