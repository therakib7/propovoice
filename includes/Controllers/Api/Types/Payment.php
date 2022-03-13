<?php

namespace Ncpi\Controllers\Api\Types;

use WP_Query;

class Payment
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/payments', [
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

        register_rest_route('ncpi/v1', '/payments/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/payments/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/payments/(?P<id>[0-9,]+)', array(
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
            'post_type' => 'ncpi_payment',
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
        $total_data = $query->get_total(); //use this for pagination 
        $result = $data = [];
        while ( $query->have_posts() ) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id; 
            
            $query_data['type'] = get_post_meta($id, 'type', true);
            $query_data['country'] = get_post_meta($id, 'country', true);
            $query_data['bank_name'] = get_post_meta($id, 'bank_name', true);
            $query_data['routing_no'] = get_post_meta($id, 'routing_no', true);
            $query_data['bank_branch'] = get_post_meta($id, 'bank_branch', true);
            $query_data['account_no'] = get_post_meta($id, 'account_no', true);  
            $query_data['confirm_account_no'] = get_post_meta($id, 'account_no', true);  
            $query_data['default'] = (bool) get_post_meta($id, 'default', true); 

            $logo_id = get_post_meta($id, 'logo', true);
            $logoData = null; 
            if ( $logo_id ) {
                $logoData = []; 
                $logoData['id'] = $logo_id; 
                $logo_url = wp_get_attachment_image_src( $logo_id, 'thumbnail' );
                $logoData['url'] = $logo_url[0]; 
            } 
            $query_data['logo'] = $logoData;

            $query_data['date'] = get_the_time('j-M-Y h:m a');
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
          
        $query_data['type'] = get_post_meta($id, 'type', true);
        $query_data['country'] = get_post_meta($id, 'country', true);
        $query_data['bank_name'] = get_post_meta($id, 'bank_name', true);
        $query_data['routing_no'] = get_post_meta($id, 'routing_no', true);
        $query_data['bank_branch'] = get_post_meta($id, 'bank_branch', true);
        $query_data['account_no'] = get_post_meta($id, 'account_no', true);  
        $query_data['confirm_account_no'] = get_post_meta($id, 'account_no', true);  
        $query_data['default'] = (bool) get_post_meta($id, 'default', true);  

        return wp_send_json_success($query_data); 
    }

    public function create($req)
    { 

        $params = $req->get_params(); 
        $reg_errors = new \WP_Error;  
        
        $type = isset( $params['type'] ) ? sanitize_text_field( $params['type'] ) : null; 
        $country = isset( $params['country'] ) ? sanitize_text_field( $params['country'] ) : null; 
        $bank_name = isset( $params['bank_name'] ) ? sanitize_text_field( $params['bank_name'] ) : null; 
        $routing_no = isset( $params['routing_no'] ) ? sanitize_text_field( $params['routing_no'] ) : null; 
        $bank_branch = isset( $params['bank_branch'] ) ? sanitize_text_field( $params['bank_branch'] ) : null; 
        $account_no = isset( $params['account_no'] ) ? sanitize_text_field( $params['account_no'] ) : null; 
        $confirm_account_no = isset( $params['confirm_account_no'] ) ? sanitize_text_field( $params['confirm_account_no'] ) : null; 
        $default = isset( $params['default'] ) ? rest_sanitize_boolean( $params['default'] ) : null;  
        $logo = isset( $params['logo'] ) && isset( $params['logo']['id'] ) ? absint( $params['logo']['id'] ) : null;

        if ( 
            empty( $bank_name )  
        ) {
            $reg_errors->add('field', esc_html__('Bank name is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
         
            $data = array(
                'post_type' => 'ncpi_payment',
                'post_title'    => $type,
                'post_content'  => '',
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id() 
            ); 
            $post_id = wp_insert_post( $data );

            if ( !is_wp_error($post_id) ) {
                
                if ( $type ) {
                    update_post_meta($post_id, 'type', $type); 
                }

                if ( $country ) {
                    update_post_meta($post_id, 'country', $country); 
                }
                 
                if ( $bank_name ) {
                    update_post_meta($post_id, 'bank_name', $bank_name); 
                } 

                if ( $routing_no ) {
                    update_post_meta($post_id, 'routing_no', $routing_no); 
                } 

                if ( $bank_branch ) {
                    update_post_meta($post_id, 'bank_branch', $bank_branch); 
                }

                if ( $account_no ) {
                    update_post_meta($post_id, 'account_no', $account_no); 
                } 

                if ( $confirm_account_no ) {
                    update_post_meta($post_id, 'confirm_account_no', $confirm_account_no); 
                } 

                if ( $default ) {
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

        $type = isset( $params['type'] ) ? sanitize_text_field( $params['type'] ) : null; 
        $country = isset( $params['country'] ) ? sanitize_text_field( $params['country'] ) : null; 
        $bank_name = isset( $params['bank_name'] ) ? sanitize_text_field( $params['bank_name'] ) : null; 
        $routing_no = isset( $params['routing_no'] ) ? sanitize_text_field( $params['routing_no'] ) : null; 
        $bank_branch = isset( $params['bank_branch'] ) ? sanitize_text_field( $params['bank_branch'] ) : null; 
        $account_no = isset( $params['account_no'] ) ? sanitize_text_field( $params['account_no'] ) : null; 
        $confirm_account_no = isset( $params['confirm_account_no'] ) ? sanitize_text_field( $params['confirm_account_no'] ) : null; 
        $default = isset( $params['default'] ) ? rest_sanitize_boolean( $params['default'] ) : null;  
        $logo = isset( $params['logo'] ) && isset( $params['logo']['id'] ) ? absint( $params['logo']['id'] ) : null;

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
                'post_title'    => $type, 
                'post_author'   => get_current_user_id() 
            ); 
            $post_id = wp_update_post( $data );

            if ( !is_wp_error($post_id) ) {
                
                if ( $type ) {
                    update_post_meta($post_id, 'type', $type); 
                }

                if ( $country ) {
                    update_post_meta($post_id, 'country', $country); 
                }
                 
                if ( $bank_name ) {
                    update_post_meta($post_id, 'bank_name', $bank_name); 
                } 

                if ( $routing_no ) {
                    update_post_meta($post_id, 'routing_no', $routing_no); 
                }  

                if ( $bank_branch ) {
                    update_post_meta($post_id, 'bank_branch', $bank_branch); 
                }

                if ( $account_no ) {
                    update_post_meta($post_id, 'account_no', $account_no); 
                } 

                if ( $confirm_account_no ) {
                    update_post_meta($post_id, 'confirm_account_no', $confirm_account_no); 
                } 

                if ( $default ) {
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
