<?php

namespace Ncpi\Controllers\Api\Types;

use WP_Query;

class Deal
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {
        register_rest_route('ncpi/v1', '/deals', [
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

        register_rest_route('ncpi/v1', '/deals/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/deals/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/deals/(?P<id>[0-9,]+)', array(
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

        $per_page = 10;
        $offset = 0;

        if (isset($request['per_page'])) {
            $per_page = $request['per_page'];
        }

        if (isset($request['page']) && $request['page'] > 1) {
            $offset = ($per_page * $request['page']) - $per_page;
        }

        $get_stage = get_terms( array(
            'taxonomy' => 'ncpi_deal_stage',
            'hide_empty' => false
        ) );
 
        $result = $column = []; 

        foreach( $get_stage as $stage ):
            $stage_id = $stage->term_id;
            $stage_name = $stage->name;

            $items = [];
            $args = array(
                'post_type' => 'ncpi_deal',
                'post_status' => 'publish',
                'posts_per_page' => $per_page,
                'offset' => $offset,
            );
    
            $args['meta_query'] = array(
                'relation' => 'OR'
            );
    
            /* if (isset($request['default'])) {
                $args['meta_query'][] = array(
                    array(
                        'key'     => 'default',
                        'value'   => 1,
                        'compare' => 'LIKE'
                    )
                );
            } */

            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'ncpi_deal_stage',
                    'terms' => $stage_id,
                    'field' => 'term_id',
                )
            );
    
            $query = new WP_Query($args);
            // $total_data = $query->get_total(); //use this for pagination 
            
            while ($query->have_posts()) {
                $query->the_post();
                $id = get_the_ID();
    
                $query_data = [];
                $query_data['id'] = (string) $id; //Invariant failed: Draggable requires a [string] draggableId.

                $deal = [];
                $title = get_post_meta($id, 'title', true);
                $deal['title'] =  ( $title ) ? $title : 'Rakib Project';  
                $deal['budget'] = get_post_meta($id, 'budget', true); 
                $deal['currency'] = get_post_meta($id, 'currency', true); 
                $deal['provability'] = get_post_meta($id, 'provability', true);  
                $query_data['deal'] = $deal;   

                $contact = [];
                $contact['name'] = 'Rakib';   
                $query_data['contact'] = $contact; 
    
                $query_data['date'] = get_the_time('j-M-Y');
                $items[] = $query_data;
            }
            wp_reset_postdata();
            
            $column[$stage_id] = [
                'name' => $stage_name,
                'items' => $items
            ];

            $result['column'] = $column;
            // $result['total'] = $total_data;

        endforeach;   

        wp_send_json_success($result);
    }

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id = $url_params['id'];
        $query_data = [];
        $query_data['id'] = $id;

        $query_data['first_name'] = get_post_meta($id, 'first_name', true);
        $query_data['last_name'] = get_post_meta($id, 'last_name', true);
        $query_data['email'] = get_post_meta($id, 'email', true);
        $query_data['company_name'] = get_post_meta($id, 'company_name', true);
        $query_data['web'] = get_post_meta($id, 'web', true);
        $query_data['mobile'] = get_post_meta($id, 'mobile', true);
        $query_data['country'] = get_post_meta($id, 'country', true);
        $query_data['region'] = get_post_meta($id, 'region', true);
        $query_data['address'] = get_post_meta($id, 'address', true);

        $img_id = get_post_meta($id, 'img', true);
        $imgData = null;
        if ($img_id) {
            $img_src = wp_get_attachment_image_src($img_id, 'thumbnail');
            if ($img_src) {
                $imgData = [];
                $imgData['id'] = $img_id;
                $imgData['src'] = $img_src[0];
            }
        }
        $query_data['img'] = $imgData;
        $data = [];
        $data['profile'] = $query_data;

        wp_send_json_success($data);
    }

    public function create($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $title        = isset($params['title']) ? sanitize_text_field($req['title']) : null;
        $stage_id     = isset($params['stage_id']) ? absint($req['stage_id']) : null;
        $contact_id   = isset($params['contact_id']) ? absint($req['contact_id']) : null;
        $budget       = isset($params['budget']) ? sanitize_text_field($req['budget']) : null;
        $currency     = isset($params['currency']) ? sanitize_text_field($req['currency']) : null;
        $provability  = isset($params['provability']) ? absint($req['provability']) : null; 
        $tags         = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $note         = isset($params['note']) ? nl2br($req['note']) : null;

        if (empty($stage_id)) {
            $reg_errors->add('field', esc_html__('Please select a stage', 'propovoice'));
        }

        if (empty($contact_id)) {
            $reg_errors->add('field', esc_html__('Please select a contact', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            $data = array(
                'post_type' => 'ncpi_deal',
                'post_title'    => $title,
                'post_content'  => '',
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) { 

                if ($title) {
                    update_post_meta($post_id, 'title', $title);
                }

                if ($stage_id) { 
                    wp_set_post_terms( $post_id, [$stage_id], 'ncpi_deal_stage' );
                }

                if ($contact_id) {
                    update_post_meta($post_id, 'contact_id', $contact_id);
                }

                if ($budget) {
                    update_post_meta($post_id, 'budget', $budget);
                }

                if ($currency) {
                    update_post_meta($post_id, 'currency', $currency);
                }

                if ($provability) {
                    update_post_meta($post_id, 'provability', $provability);
                }

                if ($tags) { 
                    wp_set_post_terms( $post_id, $tags, 'ncpi_deal_tag' );
                }

                if ($note) {
                    update_post_meta($post_id, 'note', $note);
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

        $title        = isset($params['title']) ? sanitize_text_field($req['title']) : null;
        $stage_id     = isset($params['stage_id']) ? absint($req['stage_id']) : null;
        $contact_id   = isset($params['contact_id']) ? absint($req['contact_id']) : null;
        $budget       = isset($params['budget']) ? sanitize_text_field($req['budget']) : null;
        $currency     = isset($params['currency']) ? sanitize_text_field($req['currency']) : null;
        $provability  = isset($params['provability']) ? absint($req['provability']) : null; 
        $tags         = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $note         = isset($params['note']) ? nl2br($req['note']) : null;

        if (empty($stage_id)) {
            $reg_errors->add('field', esc_html__('Please select a stage', 'propovoice'));
        }

        if (empty($contact_id)) {
            $reg_errors->add('field', esc_html__('Please select a contact', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

            $data = array(
                'ID'            => $post_id,
                'post_title'    => $title,
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {

                if ($title) {
                    update_post_meta($post_id, 'title', $title);
                }

                if ($stage_id) { 
                    wp_set_post_terms( $post_id, [$stage_id], 'ncpi_deal_stage' );
                }

                if ($contact_id) {
                    update_post_meta($post_id, 'contact_id', $contact_id);
                }

                if ($budget) {
                    update_post_meta($post_id, 'budget', $budget);
                }

                if ($currency) {
                    update_post_meta($post_id, 'currency', $currency);
                }

                if ($provability) {
                    update_post_meta($post_id, 'provability', $provability);
                }

                if ($tags) { 
                    wp_set_post_terms( $post_id, $tags, 'ncpi_deal_tag' );
                }

                if ($note) {
                    update_post_meta($post_id, 'note', $note);
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
