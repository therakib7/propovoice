<?php

namespace Ncpi\Ctrls\Api\Types;

use WP_Query;

class Business
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/businesses', [
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

        register_rest_route('ncpi/v1', '/businesses/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/businesses/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/businesses/(?P<id>[0-9,]+)', array(
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
            'post_type' => 'ncpi_business',
            'post_status' => 'publish',
            'posts_per_page' => $per_page, 
            'offset' => $offset,
        ); 

        $args['meta_query'] = array(
            'relation' => 'OR'
        ); 

        if ( isset( $request['default'] ) ) { 
            $args['meta_query'][] = array( 
                array(
                    'key'     => 'default',
                    'value'   => 1,
                    'compare' => 'LIKE'
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
            
            $query_data['name'] = get_post_meta($id, 'name', true);
            $query_data['org_name'] = get_post_meta($id, 'org_name', true);
            $query_data['web'] = get_post_meta($id, 'web', true);
            $query_data['email'] = get_post_meta($id, 'email', true);
            $query_data['mobile'] = get_post_meta($id, 'mobile', true);
            $query_data['address'] = get_post_meta($id, 'address', true);
            $query_data['zip'] = get_post_meta($id, 'zip', true); 
            $query_data['default'] = (bool) get_post_meta($id, 'default', true); 

            $logo_id = get_post_meta($id, 'logo', true);
            $logoData = null; 
            if ( $logo_id ) {
                $logo_src = wp_get_attachment_image_src( $logo_id, 'thumbnail' );
                if ( $logo_src ) {
                    $logoData = []; 
                    $logoData['id'] = $logo_id;  
                    $logoData['src'] = $logo_src[0]; 
                }
            } 
            $query_data['logo'] = $logoData;

            $query_data['date'] = get_the_time('j-M-Y');
            $data[] = $query_data; 
        } 
        wp_reset_postdata(); 

        $result['result'] = $data;
        $result['total'] = $total_data; 

        wp_send_json_success($result); 
    }

    public function get_single( $req )
    {  
        $url_params = $req->get_url_params();
        $id    = $url_params['id'];  
        $query_data = [];
        $query_data['id'] = $id; 
          
        $query_data['name'] = get_post_meta($id, 'name', true);
        $query_data['org_name'] = get_post_meta($id, 'org_name', true);
        $query_data['web'] = get_post_meta($id, 'web', true);
        $query_data['email'] = get_post_meta($id, 'email', true);
        $query_data['mobile'] = get_post_meta($id, 'mobile', true);
        $query_data['address'] = get_post_meta($id, 'address', true);
        $query_data['zip'] = get_post_meta($id, 'zip', true);  
        $query_data['default'] = (bool) get_post_meta($id, 'default', true);  

        $logo_id = get_post_meta($id, 'logo', true);
        $logoData = null;  
        if ( $logo_id ) {
            $logo_src = wp_get_attachment_image_src( $logo_id, 'thumbnail' );
            if ( $logo_src ) {
                $logoData = []; 
                $logoData['id'] = $logo_id;  
                $logoData['src'] = $logo_src[0]; 
            }
        } 
        $query_data['logo'] = $logoData;

        wp_send_json_success($query_data); 
    }

    public function set_default() {
        $args = array( 
            'post_type' => 'ncpi_business',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'fields' => 'ids'
        );  
        
        $args['meta_query'] = array(
            'relation' => 'OR'
        ); 
        
        $args['meta_query'][] = array( 
            array(
                'key'     => 'default',
                'value'   => 1,
                'compare' => 'LIKE'
            )
        );
        
        $query = new WP_Query( $args ); 
        foreach( $query->posts as $id ) {
            update_post_meta($id, 'default', false); 
        }
    }

    public function create($req)
    { 

        $params = $req->get_params(); 
        $reg_errors = new \WP_Error;  

        $name = isset( $params['name'] ) ? sanitize_text_field( $params['name'] ) : null; 
        $org_name = isset( $params['org_name'] ) ? sanitize_text_field( $params['org_name'] ) : null; 
        $web = isset( $params['web'] ) ? esc_url_raw( $params['web'] ) : null; 
        $email = isset( $params['email'] ) ? strtolower( sanitize_email( $params['email'] ) ) : null; 
        $mobile = isset( $params['mobile'] ) ? sanitize_text_field( $params['mobile'] ) : null; 
        $address = isset( $params['address'] ) ? sanitize_text_field( $params['address'] ) : null; 
        $zip = isset( $params['zip'] ) ? sanitize_text_field( $params['zip'] ) : null; 
        $default = isset( $params['default'] ) ? rest_sanitize_boolean( $params['default'] ) : null;  
        $logo = isset( $params['logo'] ) ? absint( $params['logo'] ) : null;

        if ( empty( $name ) ) {
            $reg_errors->add('field', esc_html__('Name is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
         
            $data = array(
                'post_type' => 'ncpi_business',
                'post_title'    => $name,
                'post_content'  => '',
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id() 
            ); 
            $post_id = wp_insert_post( $data );

            if ( !is_wp_error($post_id) ) {
                
                update_post_meta($post_id, 'ws_id', ncpi()->get_workspace() ); 

                if ( $name ) {
                    update_post_meta($post_id, 'name', $name); 
                }

                if ( $org_name ) {
                    update_post_meta($post_id, 'org_name', $org_name); 
                }
                 
                if ( $web ) {
                    update_post_meta($post_id, 'web', $web); 
                } 

                if ( $email ) {
                    update_post_meta($post_id, 'email', $email); 
                } 

                if ( $mobile ) {
                    update_post_meta($post_id, 'mobile', $mobile); 
                } 

                if ( $address ) {
                    update_post_meta($post_id, 'address', $address); 
                }

                if ( $zip ) {
                    update_post_meta($post_id, 'zip', $zip); 
                } 

                if ( $default ) {
                    $this->set_default(); 
                    update_post_meta($post_id, 'default', true);
                } else {
                    update_post_meta($post_id, 'default', false); 
                }

                if ( $logo ) {
                    update_post_meta($post_id, 'logo', $logo); 
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

        $name = isset( $params['name'] ) ? sanitize_text_field( $params['name'] ) : null; 
        $org_name = isset( $params['org_name'] ) ? sanitize_text_field( $params['org_name'] ) : null; 
        $web = isset( $params['web'] ) ? esc_url_raw( $params['web'] ) : null; 
        $email = isset( $params['email'] ) ? strtolower( sanitize_email( $params['email'] ) ) : null; 
        $mobile = isset( $params['mobile'] ) ? sanitize_text_field( $params['mobile'] ) : null; 
        $address = isset( $params['address'] ) ? sanitize_text_field( $params['address'] ) : null; 
        $zip = isset( $params['zip'] ) ? sanitize_text_field( $params['zip'] ) : null; 
        $default = isset( $params['default'] ) ? rest_sanitize_boolean( $params['default'] ) : null; 
        $logo = isset( $params['logo'] ) ? absint( $params['logo'] ) : null;

        if ( empty( $name ) ) {
            $reg_errors->add('field', esc_html__('Name is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];
 
            $data = array(
                'ID'            => $post_id,  
                'post_title'    => $name, 
                'post_author'   => get_current_user_id() 
            ); 
            $post_id = wp_update_post( $data );

            if ( !is_wp_error($post_id) ) {
                
                if ( $name ) {
                    update_post_meta($post_id, 'name', $name); 
                }

                if ( $org_name ) {
                    update_post_meta($post_id, 'org_name', $org_name); 
                }
                 
                if ( $web ) {
                    update_post_meta($post_id, 'web', $web); 
                } 

                if ( $email ) {
                    update_post_meta($post_id, 'email', $email); 
                } 

                if ( $mobile ) {
                    update_post_meta($post_id, 'mobile', $mobile); 
                } 

                if ( $address ) {
                    update_post_meta($post_id, 'address', $address); 
                }

                if ( $zip ) {
                    update_post_meta($post_id, 'zip', $zip); 
                } 

                if ( $default ) {
                    $this->set_default(); 
                    update_post_meta($post_id, 'default', true);  
                } else {
                    update_post_meta($post_id, 'default', false); 
                }

                if ( $logo ) {
                    update_post_meta($post_id, 'logo', $logo); 
                } else {
                    delete_post_meta($post_id, 'logo'); 
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
