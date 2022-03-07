<?php

namespace Ncpi\Controllers\Api\Types;

use WP_Query;

class Invoice
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/invoices', [
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

        register_rest_route('ncpi/v1', '/invoices/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/invoices/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/invoices/(?P<id>[0-9,]+)', array(
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
            'post_type' => 'ncpi_invoice',
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
                    'key'     => 'to',
                    'value'   => $request['client_id'] 
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

            $query_data['project'] = [
                'name' => ''
            ];
            
            $from_id = get_post_meta($id, 'from', true);
            $fromData = []; 
            if ( $from_id ) {
                $fromData['id'] = $from_id;
                $fromData['name'] = get_post_meta($from_id, 'name', true); 
            } 
            $query_data['from'] = $fromData; 

            $to_id = get_post_meta($id, 'to', true);
            $toData = []; 
            if ( $to_id ) {
                $toData['id'] = $to_id;
                $to_obj = get_user_by('id', $to_id);
                
                $toData['first_name'] = $to_obj->first_name;
                $toData['last_name'] = $to_obj->last_name; 
                $toData['email'] = $to_obj->user_email; 
            } 
            $query_data['to'] = $toData;
            
            $query_data['invoice'] = json_decode( get_post_meta($id, 'invoice', true) );
            
            $query_data['total'] = get_post_meta($id, 'total', true);
            $query_data['paid'] = get_post_meta($id, 'paid', true);
            if ( !$query_data['paid'] ) {
                $query_data['paid'] = 0;
            }
            $query_data['due'] = get_post_meta($id, 'due', true);  
            if ( !$query_data['due'] ) {
                $query_data['due'] = 0;
            }

            $query_data['date'] = get_the_time('j-M-Y h:m a');;
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
          
        $query_data['invoice'] = json_decode( get_post_meta($id, 'invoice', true) ); 

        $from_id = get_post_meta($id, 'from', true);
        $fromData = []; 
        if ( $from_id ) {
            $fromData['id'] = $from_id;

            $fromMeta = get_post_meta($from_id); 

            $fromData['name'] = isset( $fromMeta['name'] ) ? $fromMeta['name'][0] : '';
            $fromData['email'] = isset( $fromMeta['email'] ) ? $fromMeta['email'][0] : '';
            $fromData['web'] = isset( $fromMeta['web'] ) ? $fromMeta['web'][0] : '';
            $fromData['address'] = isset( $fromMeta['address'] ) ? $fromMeta['address'][0] : ''; 
        } 
        $query_data['fromData'] = $fromData; 

        $to_id = get_post_meta($id, 'to', true);
        $toData = []; 
        if ( $to_id ) {
            $toData['id'] = $to_id;
            $to_obj = get_user_by('id', $to_id);
            
            $toData['first_name'] = $to_obj->first_name;
            $toData['last_name'] = $to_obj->last_name; 
            $toData['email'] = $to_obj->user_email;
            $toData['web'] = get_user_meta($to_id, 'web', true);
            $toData['address'] = get_user_meta($to_id, 'address', true); 
        } 
        $query_data['toData'] = $toData; 

        return wp_send_json_success($query_data); 
    }

    public function create($req)
    { 

        $params = $req->get_params(); 
        $reg_errors             = new \WP_Error; 
        //TODO: sanitize later
        $invoice  = isset( $params ) ? $params : null;
        // wp_send_json_success($invoice);
        $total    = 0;
        foreach ( $params['items'] as $item ) {
            $total += ( $item['qty'] * $item['price'] );
        }
        $paid     = isset( $params['paid'] ) ? $params['paid'] : null; 
        $due      = $paid ? $total - $paid : null; 

        $from     = isset( $params['from'] ) ? $params['from'] : null;
        $to     = isset( $params['to'] ) ? $params['to'] : null;

        if ( !$from ) {
            $reg_errors->add('field', esc_html__('Sender is missing', 'propovoice'));
        } 

        if ( !$to ) {
            $reg_errors->add('field', esc_html__('Receiver is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            //TODO: give proper title
            $title = ''; 
            $data = array(
                'post_type' => 'ncpi_invoice',
                'post_title'    => $title,
                'post_content'  => '',
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id() 
            ); 
            $post_id = wp_insert_post( $data );

            if ( !is_wp_error($post_id) ) {

                if ( $from ) {
                    update_post_meta($post_id, 'from', $from); 
                }

                if ( $to ) {
                    update_post_meta($post_id, 'to', $to); 
                }
                
                if ( $invoice ) {
                    update_post_meta($post_id, 'invoice', json_encode($invoice)); 
                }
                 
                if ( $total ) {
                    update_post_meta($post_id, 'total', $total); 
                } 

                if ( $paid ) {
                    update_post_meta($post_id, 'paid', $paid); 
                } 

                if ( $due ) {
                    update_post_meta($post_id, 'due', $due); 
                } 

                if ( true ) {
                    //generate secret token
                    $bytes = random_bytes(20);
                    update_post_meta($post_id, 'token', bin2hex($bytes)); 
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
        $reg_errors             = new \WP_Error;  
        $invoice  = isset( $params ) ? $params : null; 

        $from     = isset( $params['from'] ) ? $params['from'] : null;
        $to     = isset( $params['to'] ) ? $params['to'] : null;

        $total  = 0;
        foreach ( $params['items'] as $item ) {
            $total += ( $item['qty'] * $item['price'] );
        }
        $paid     = isset( $params['paid'] ) ? $params['paid'] : null;
        $due      = $paid ? $total - $paid : null; 

        $attach = isset( $params['attach'] ) ? $params['attach'] : null;
        $sign   = isset( $params['sign'] ) ? $params['sign'] : null;       

        if ( !$from ) {
            $reg_errors->add('field', esc_html__('Sender is missing', 'propovoice'));
        } 

        if ( !$to ) {
            $reg_errors->add('field', esc_html__('Receiver is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];
 
            $data = array(
                'ID'            => $post_id,
                'post_title'    => '',
                'post_content'  => ''
            ); 
            $post_id = wp_update_post( $data );

            if ( !is_wp_error($post_id) ) {
                
                if ( $from ) {
                    update_post_meta($post_id, 'from', $from); 
                }

                if ( $to ) {
                    update_post_meta($post_id, 'to', $to); 
                }

                if ( $invoice ) {
                    update_post_meta($post_id, 'invoice', json_encode($invoice)); 
                }
                 
                if ( $total ) {
                    update_post_meta($post_id, 'total', $total); 
                }  
                if ( $paid ) {
                    update_post_meta($post_id, 'paid', $paid); 
                } 

                if ( $due ) {
                    update_post_meta($post_id, 'due', $due); 
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
