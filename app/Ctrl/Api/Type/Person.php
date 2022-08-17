<?php

namespace Ndpi\Ctrl\Api\Type;
use Ndpi\Models\Org; 

class Person
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ndpi/v1', '/persons', [
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

        register_rest_route('ndpi/v1', '/persons/(?P<id>\d+)', array(
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

        register_rest_route('ndpi/v1', '/persons/(?P<id>\d+)', array(
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

        register_rest_route('ndpi/v1', '/persons/(?P<id>[0-9,]+)', array(
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
        $params = $req->get_params();

        $per_page = 10;
        $offset = 0;
        $s = isset($params['text']) ? sanitize_text_field($params['text']) : null;

        if (isset($params['per_page'])) {
            $per_page = $params['per_page'];
        }

        if (isset($params['page']) && $params['page'] > 1) {
            $offset = ($per_page * $params['page']) - $per_page;
        } 

        $args = array(
            'post_type' => 'ndpi_person',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'offset' => $offset,
        );

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        if ( $s ) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'first_name',
                    'value'   => $s,
                    'compare' => 'Like',
                )
            ); 
            $args['meta_query'][] = array(
                array(
                    'key'     => 'email',
                    'value'   => $s,
                    'compare' => 'Like',
                )
            ); 
        } 

        $query = new \WP_Query($args);
        $total_data = $query->found_posts; //use this for pagination 
        $result = $data = [];
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id;

            $queryMeta = get_post_meta($id);
            $query_data['first_name'] = isset($queryMeta['first_name']) ? $queryMeta['first_name'][0] : ''; 
            $query_data['org_id'] = isset($queryMeta['org_id']) ? $queryMeta['org_id'][0] : '';
            $query_data['org_name'] = $queryMeta['org_id'] ? get_post_meta($query_data['org_id'], 'name', true) : '';
            $query_data['email'] = isset($queryMeta['email']) ? $queryMeta['email'][0] : '';
            $query_data['web'] = isset($queryMeta['web']) ? $queryMeta['web'][0] : '';
            $query_data['mobile'] = isset($queryMeta['mobile']) ? $queryMeta['mobile'][0] : '';
            $query_data['country'] = isset($queryMeta['country']) ? $queryMeta['country'][0] : '';
            $query_data['region'] = isset($queryMeta['region']) ? $queryMeta['region'][0] : '';
            $query_data['address'] = isset($queryMeta['address']) ? $queryMeta['address'][0] : ''; 
            
            $img_id = isset($queryMeta['img']) ? $queryMeta['img'][0] : null; 
            $imgData = null;  
            if ( $img_id ) {
                $img_src = wp_get_attachment_image_src( $img_id, 'thumbnail' );
                if ( $img_src ) {
                    $imgData = []; 
                    $imgData['id'] = $img_id;  
                    $imgData['src'] = $img_src[0]; 
                }
            } 
            $query_data['img'] = $imgData;

            $query_data['date'] = get_the_time('j-M-Y');
            $data[] = $query_data;
        }
        wp_reset_postdata();

        $result['result'] = $data;
        $result['total'] = $total_data;

        wp_send_json_success($result);
    }

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id = $url_params['id'];
        $query_data = [];
        $query_data['id'] = absint($id);
        $query_data['tab_id'] = $id;

        $query_data['level_id'] = '';

        $level = get_the_terms($id, 'ndpi_lead_level');
        if ($level) {

            $query_data['level_id'] = [
                'id' => $level[0]->term_id,
                'label' => $level[0]->name
            ];
        }

        $query_data['tags'] = [];

        $tags = get_the_terms($id, 'ndpi_tag');
        if ($tags) {
            $tagList = [];
            foreach ($tags as $tag) {
                $tagList[] = [
                    'id' => $tag->term_id,
                    'label' => $tag->name
                ];
            }
            $query_data['tags'] = $tagList;
        }

        $person_id = $id;
        $personData = [];

        if ($person_id) {
            $personData['id'] = absint($person_id);
            $personMeta = get_post_meta($person_id);
            $personData['first_name'] = isset($personMeta['first_name']) ? $personMeta['first_name'][0] : '';
            $personData['last_name'] = isset($personMeta['last_name']) ? $personMeta['last_name'][0] : '';
            $personData['org_name'] = isset($personMeta['org_name']) ? $personMeta['org_name'][0] : '';
            $personData['email'] = isset($personMeta['email']) ? $personMeta['email'][0] : '';
            $personData['mobile'] = isset($personMeta['mobile']) ? $personMeta['mobile'][0] : '';
            $personData['web'] = isset($personMeta['web']) ? $personMeta['web'][0] : '';
            $personData['country'] = isset($personMeta['country']) ? $personMeta['country'][0] : '';
            $personData['region'] = isset($personMeta['region']) ? $personMeta['region'][0] : '';
            $personData['address'] = isset($personMeta['address']) ? $personMeta['address'][0] : '';
            $img_id = isset($personMeta['img']) ? $personMeta['img'][0] : null; 
            $imgData = null;  
            if ( $img_id ) {
                $img_src = wp_get_attachment_image_src( $img_id, 'thumbnail' );
                if ( $img_src ) {
                    $imgData = []; 
                    $imgData['id'] = $img_id;  
                    $imgData['src'] = $img_src[0]; 
                }
            } 
            $personData['img'] = $imgData;
        }
        $query_data['person'] = $personData;

        $query_data['date'] = get_the_time('j-M-Y');

        wp_send_json_success($query_data);
    }

    public function create($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $first_name = isset($params['first_name']) ? sanitize_text_field($req['first_name']) : null;
        $org_name   = isset($params['org_name']) ? sanitize_text_field($req['org_name']) : null;
        $org_id     = isset($params['org_id']) ? absint($params['org_id']) : null;
        $email      = isset($params['email']) ? strtolower(sanitize_email($req['email'])) : null;
        $web        = isset($params['web']) ? esc_url_raw($req['web']) : null;
        $mobile     = isset($params['mobile']) ? sanitize_text_field($req['mobile']) : null;
        $country    = isset($params['country']) ? sanitize_text_field($req['country']) : null;
        $region     = isset($params['region']) ? sanitize_text_field($req['region']) : null;
        $address    = isset($params['address']) ? sanitize_text_field($req['address']) : null;
        $img = isset( $params['img'] ) ? absint( $params['img'] ) : null;

        if ( empty($first_name) ) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if ( !is_email($email) ) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            $data = array(
                'post_type' => 'ndpi_person',
                'post_title'    => $first_name,
                'post_content'  => '',
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if ( !is_wp_error($post_id) ) {

                update_post_meta($post_id, 'ws_id', ndpi()->get_workspace());

                if ($first_name) {
                    update_post_meta($post_id, 'first_name', $first_name);
                } 

                if ( ! $org_id && $org_name ) {
                    $org = new Org();
                    $org_id = $org->create( [ 'org_name' => $org_name, 'person_id' => $post_id] );
                }

                if ($org_id) {
                    update_post_meta($post_id, 'org_id', $org_id);
                }

                if ($email) {
                    update_post_meta($post_id, 'email', $email);
                } 

                if ($web) {
                    update_post_meta($post_id, 'web', $web);
                }

                if ($mobile) {
                    update_post_meta($post_id, 'mobile', $mobile);
                }

                if ($country) {
                    update_post_meta($post_id, 'country', $country);
                }

                if ($region) {
                    update_post_meta($post_id, 'region', $region);
                }

                if ($address) {
                    update_post_meta($post_id, 'address', $address);
                }

                if ($img) {
                    update_post_meta($post_id, 'img', $img);
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

        $first_name   = isset($params['first_name']) ? sanitize_text_field($req['first_name']) : null;
        $last_name    = isset($params['last_name']) ? sanitize_text_field($req['last_name']) : null;
        $email        = isset($params['email']) ? strtolower(sanitize_email($req['email'])) : null;
        $org_name = isset($params['org_name']) ? sanitize_text_field($req['org_name']) : null;
        $web          = isset($params['web']) ? esc_url_raw($req['web']) : null;
        $mobile       = isset($params['mobile']) ? sanitize_text_field($req['mobile']) : null;
        $country      = isset($params['country']) ? sanitize_text_field($req['country']) : null;
        $region       = isset($params['region']) ? sanitize_text_field($req['region']) : null;
        $address      = isset($params['address']) ? sanitize_text_field($req['address']) : null;
        $img = isset( $params['img'] ) ? absint( $params['img'] ) : null;

        if (empty($first_name)) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

            $data = array(
                'ID'          => $post_id,
                'post_title'  => $first_name,
                'post_author' => get_current_user_id()
            );
            $post_id = wp_update_post($data);

            if ( !is_wp_error($post_id) ) {

                if ($first_name) {
                    update_post_meta($post_id, 'first_name', $first_name);
                }

                if ($last_name) {
                    update_post_meta($post_id, 'last_name', $last_name);
                }

                if ($email) {
                    update_post_meta($post_id, 'email', $email);
                }

                if ($org_name) {
                    update_post_meta($post_id, 'org_name', $org_name);
                }

                if ($web) {
                    update_post_meta($post_id, 'web', $web);
                }

                if ($mobile) {
                    update_post_meta($post_id, 'mobile', $mobile);
                }

                if ($country) {
                    update_post_meta($post_id, 'country', $country);
                }

                if ($region) {
                    update_post_meta($post_id, 'region', $region);
                }

                if ($address) {
                    update_post_meta($post_id, 'address', $address);
                }
                
                if ( $img ) {
                    update_post_meta($post_id, 'img', $img); 
                } else {
                    delete_post_meta($post_id, 'img'); 
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
