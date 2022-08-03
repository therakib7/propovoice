<?php

namespace Ncpi\Ctrls\Api\Types;

use Ncpi\Helpers\Fns;
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
        $dashboard = isset($params['dashboard']) ? sanitize_text_field($req['dashboard']) : false;
        $status_id = isset($params['status_id']) ? absint($req['status_id']) : false;

        if (isset($params['page']) && $params['page'] > 1) {
            $offset = ($per_page * $params['page']) - $per_page;
        }

        if ($dashboard) {
            $per_page = 3;
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

        if (!$status_id) {
            $taxonomy = 'task_status';
            $get_taxonomy = Fns::get_terms($taxonomy);
            $status_id = $get_taxonomy[0]->term_id;
        }

        $args['tax_query'] = array(
            array(
                'taxonomy' => 'ndpi_task_status',
                'terms' => $status_id,
                'field' => 'term_id',
            )
        );

        $query = new WP_Query($args);
        $total_data = $query->found_posts; //use this for pagination 
        $result = [];

        $data = [
            'task_status' => [],
            'latest' => [],
            'today' => [],
            'other' => [],
            'unschedule' => [],
        ];

        $taxonomy = 'task_status';
        $get_taxonomy = Fns::get_terms($taxonomy);

        $format_taxonomy = [];
        foreach ($get_taxonomy as $single) {
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

            $query_data['status_id'] = '';
            $status = get_the_terms($id, 'ndpi_task_status');
            if ($status) {
                $term_id = $status[0]->term_id;
                $query_data['status_id'] = [
                    'id' => $term_id,
                    'label' => $status[0]->name,
                    'color' => '#4a5568',
                    'bg_color' => '#E2E8F0',
                    'type' => get_term_meta($term_id, 'type', true),
                ];

                $color = get_term_meta($term_id, 'color', true);
                $bg_color = get_term_meta($term_id, 'bg_color', true);

                if ($color) {
                    $query_data['status_id']['color'] = $color;
                }

                if ($bg_color) {
                    $query_data['status_id']['bg_color'] = $bg_color;
                }
            }

            $query_data['type_id'] = '';
            $type = get_the_terms($id, 'ndpi_task_type');
            if ($type) {
                $icon_id = get_term_meta($type[0]->term_id, 'icon', true);
                $iconData = null;
                if ($icon_id) {
                    $icon_src = wp_get_attachment_image_src($icon_id, 'thumbnail');
                    if ($icon_src) {
                        $iconData = [];
                        $iconData['id'] = $icon_id;
                        $iconData['src'] = $icon_src[0];
                    }
                }
                $query_data['type_id'] = [
                    'id' => $type[0]->term_id,
                    'label' => $type[0]->name,
                    'icon' => $iconData ? $iconData : '',
                    'color' => '#4a5568',
                    'bg_color' => '#E2E8F0',
                ];
            }

            $query_data['priority_id'] = '';
            $priority = get_the_terms($id, 'ndpi_task_priority');
            if ($priority) {
                $term_id = $priority[0]->term_id;
                $query_data['priority_id'] = [
                    'id' => $term_id,
                    'label' => $priority[0]->name,
                    'color' => '#4a5568',
                    'bg_color' => '#E2E8F0',
                ];

                $color = get_term_meta($term_id, 'color', true);
                $bg_color = get_term_meta($term_id, 'bg_color', true);

                if ($color) {
                    $query_data['priority_id']['color'] = $color;
                }

                if ($bg_color) {
                    $query_data['priority_id']['bg_color'] = $bg_color;
                }
            }

            $query_data['desc'] = get_the_content();
            $query_data['start_date'] = get_post_meta($id, 'start_date', true);
            $query_data['due_date'] = get_post_meta($id, 'due_date', true);
            $query_data['checklist'] = get_post_meta($id, 'checklist', true);
            $query_data['date'] = get_the_time('j-M-Y');

            if ($dashboard) {
                $data['latest'][] = $query_data;
            } else {
                $start_date = get_post_meta($id, 'start_date', true);
                if ($start_date) {
                    $current_date = date('Y-m-d', current_time('timestamp'));
                    $format_start_date = date('Y-m-d', strtotime($start_date));

                    if ($current_date == $format_start_date) {
                        $data['today'][] = $query_data;
                    } else {
                        $data['other'][] = $query_data;
                    }
                } else {
                    $data['unschedule'][] = $query_data;
                }
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

        $tab_id    = isset($params['tab_id']) ? absint($req['tab_id']) : null;
        $title     = isset($params['title']) ? sanitize_text_field($req['title']) : null;
        $status_id = isset($params['status_id']) ? absint($params['status_id']) : null;
        $type_id = isset($params['type_id']) ? absint($params['type_id']) : null;
        $priority_id = isset($params['priority_id']) ? absint($params['priority_id']) : null;

        $start_date = isset($params['start_date']) ? $params['start_date'] : null;
        $due_date = isset($params['due_date']) ? $params['due_date'] : null;

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
                update_post_meta($post_id, 'ws_id', ncpi()->get_workspace());

                if ($tab_id) {
                    update_post_meta($post_id, 'tab_id', $tab_id);
                }

                if ($status_id) {
                    wp_set_post_terms($post_id, [$status_id], 'ndpi_task_status');
                }

                if ($type_id) {
                    wp_set_post_terms($post_id, [$type_id], 'ndpi_task_type');
                }

                if ($priority_id) {
                    wp_set_post_terms($post_id, [$priority_id], 'ndpi_task_priority');
                }

                if ($start_date) {
                    update_post_meta($post_id, 'start_date', $start_date);
                }

                if ($due_date) {
                    update_post_meta($post_id, 'due_date', $due_date);
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

        $status_id  = isset($params['status_id']) ? absint($params['status_id']) : null;
        $type_id  = isset($params['type_id']) ? absint($params['type_id']) : null;
        $priority_id  = isset($params['priority_id']) ? absint($params['priority_id']) : null;

        $start_date = isset($params['start_date']) ? $params['start_date'] : null;
        $due_date = isset($params['due_date']) ? $params['due_date'] : null;
        $checklist = isset($params['checklist']) ? $params['checklist'] : null;

        /* if (empty($title)) {
            $reg_errors->add('field', esc_html__('Title field is missing', 'propovoice'));
        } */

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

            $data = array(
                'ID'            => $post_id,
                'post_author'   => get_current_user_id()
            );

            if (isset($params['title'])) {
                $data['post_title'] = sanitize_text_field($req['title']);
            }

            if (isset($params['desc'])) {
                $data['post_content'] = sanitize_text_field($req['desc']);
            }

            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {

                if ($status_id) {
                    wp_set_post_terms($post_id, [$status_id], 'ndpi_task_status');
                }

                if ($type_id) {
                    wp_set_post_terms($post_id, [$type_id], 'ndpi_task_type');
                }

                if ($priority_id) {
                    wp_set_post_terms($post_id, [$priority_id], 'ndpi_task_priority');
                }

                if ($start_date) {
                    update_post_meta($post_id, 'start_date', $start_date);
                }

                if ($due_date) {
                    update_post_meta($post_id, 'due_date', $due_date);
                }

                if ($checklist) {
                    update_post_meta($post_id, 'checklist', $checklist);
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
