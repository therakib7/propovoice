<?php

namespace Ncpi\Ctrls\Api\Types;

use WP_Query;

class Task
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/tasks', [
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

        register_rest_route('ncpi/v1', '/tasks/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/tasks/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/tasks/(?P<id>[0-9,]+)', array(
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

        if (isset($params['per_page'])) {
            $per_page = $params['per_page'];
        }

        $tab_id = isset($params['tab_id']) ? absint($req['tab_id']) : false;

        if (isset($params['page']) && $params['page'] > 1) {
            $offset = ($per_page * $params['page']) - $per_page;
        }

        $args = array(
            'post_type' => 'ndpi_task',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        );

        if (!$tab_id) {
            $args['posts_per_page'] = $per_page;
            $args['offset'] = $offset;
        }

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        if ($tab_id) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'tab_id',
                    'value'   => $tab_id,
                    'compare' => '='
                )
            );
        }

        $query = new WP_Query($args);
        $total_data = $query->found_posts; //use this for pagination 
        $result = [];

        $data = [
            'task_status' => [],
            'today' => [],
            'other' => [],
            'unschedule' => [],
        ];

        if (!$tab_id) {
            $data = [];
        }

        $taxonomy = 'task_status';
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

        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id;
            $query_data['title'] = get_the_title();
            $query_data['type_id'] = '';

            $type = get_the_terms($id, 'ndpi_task_type');
            if ($type) {
                $query_data['type_id'] = [
                    'id' => $type[0]->term_id,
                    'label' => $type[0]->name
                ];
            }

            $query_data['desc'] = get_the_content();
            $query_data['date'] = get_the_time('j-M-Y');

            if ( $tab_id ) { 
                if (false) { //TODO: check unschedule
                    $data['unschedule'][] = $query_data;
                } else if (true) { //TODO: check today 
                    $data['today'][] = $query_data;
                } else {
                    $data['other'][] = $query_data;
                }
            } else {
                $data[] = $query_data;
            }
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
        $query_data['id'] = $id;

        $query_data['title'] = get_the_title();
        $query_data['desc'] = get_the_content();
        // $query_data['desc'] = get_post_meta($id, 'title', true); 

        wp_send_json_success($query_data);
    }

    public function create($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $tab_id   = isset($params['tab_id']) ? absint($req['tab_id']) : null;
        $title   = isset($params['title']) ? sanitize_text_field($req['title']) : null;
        $type_id  = isset($params['type_id']) ? absint($params['type_id']) : null;

        if (empty($tab_id)) {
            $reg_errors->add('field', esc_html__('Tab ID is missing', 'propovoice'));
        }

        if (empty($title)) {
            $reg_errors->add('field', esc_html__('Title field is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            $data = array(
                'post_type' => 'ndpi_task',
                'post_title' => $title,
                'post_content' => '',
                'post_status'  => 'publish',
                'post_author'  => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) {
                update_post_meta($post_id, 'wp_id', ncpi()->get_workplace());
                update_post_meta($post_id, 'tab_id', $tab_id);
                if ($type_id) {
                    wp_set_post_terms($post_id, [$type_id], 'ndpi_task_type');
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

        $title = isset($params['title']) ? sanitize_text_field($req['title']) : null;
        $type_id = isset($params['type_id']) ? absint($params['type_id']) : null;
        $desc = isset($params['desc']) ? sanitize_text_field($req['desc']) : null;

        if (empty($title)) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
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
            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {

                if ($type_id) {
                    wp_set_post_terms($post_id, [$type_id], 'ndpi_task_type');
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
