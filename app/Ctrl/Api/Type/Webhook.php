<?php

namespace Ndpv\Ctrl\Api\Type; 

class Webhook
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'rest_routes']); 
    }

    public function rest_routes()
    {
        register_rest_route('ndpv/v1', '/webhooks', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_per'],
            ],
            [
                'methods' => 'POST',
                'callback' => [$this, 'create'],
                'permission_callback' => [$this, 'create_per']
            ],
        ]);

        register_rest_route('ndpv/v1', '/webhooks/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_single'],
            'permission_callback' => [$this, 'get_per'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ndpv/v1', '/webhooks/(?P<id>\d+)', array(
            'methods' => 'PUT',
            'callback' => [$this, 'update'],
            'permission_callback' => [$this, 'update_per'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ndpv/v1', '/webhooks/(?P<id>[0-9,]+)', array(
            'methods' => 'DELETE',
            'callback' => [$this, 'delete'],
            'permission_callback' => [$this, 'del_per'],
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

        $type = isset($params['type']) ? sanitize_text_field($params['type']) : '';
        $s = isset($params['text']) ? sanitize_text_field($params['text']) : null;

        if (isset($params['per_page'])) {
            $per_page = $params['per_page'];
        }

        if (isset($params['page']) && $params['page'] > 1) {
            $offset = ($per_page * $params['page']) - $per_page;
        }

        $args = array(
            'post_type' => 'ndpv_webhook',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'offset' => $offset,
        );

        $args['meta_query'] = array(
            'relation' => 'AND'
        ); 

        if ( $type ) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'type',
                    'value'   => $type
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
            $query_data['budget'] = isset($queryMeta['budget']) ? $queryMeta['budget'][0] : ''; 

             
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

        $queryMeta = get_post_meta($id);
        $query_data['ws_id'] = isset($queryMeta['ws_id']) ? $queryMeta['ws_id'][0] : '';
        $query_data['tab_id'] = isset($queryMeta['tab_id']) ? absint($queryMeta['tab_id'][0]) : '';
        $query_data['budget'] = isset($queryMeta['budget']) ? $queryMeta['budget'][0] : '';
        $query_data['currency'] = isset($queryMeta['currency']) ? $queryMeta['currency'][0] : '';
        $query_data['note'] = isset($queryMeta['note']) ? $queryMeta['note'][0] : '';
        $query_data['desc'] = get_post_field('post_content', $id);

        

        $query_data['date'] = get_the_time(get_option('date_format'));

        wp_send_json_success($query_data);
    }

    public function create($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error();

        //webhook
        $type = isset($params['type']) ? sanitize_text_field($params['type']) : null;
        $org_name   = isset($params['org_name']) ? sanitize_text_field($params['org_name']) : null;
        $person_id = isset($params['person_id']) ? absint($params['person_id']) : null;
        $org_id    = isset($params['org_id']) ? absint($params['org_id']) : null;
        $level_id  = isset($params['level_id']) ? absint($params['level_id']) : null;
        $budget    = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency  = isset($params['currency']) ? sanitize_text_field($params['currency']) : null;
        $tags      = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $desc      = isset($params['desc']) ? nl2br($params['desc']) : '';
        $note      = isset($params['note']) ? nl2br($params['note']) : null;

        if ( empty($type) ) {
            $reg_errors->add('field', esc_html__('Type is missing', 'propovoice'));
        } 

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            //insert webhook
            $data = array(
                'post_type' => 'ndpv_webhook',
                'post_title' => 'Webhook',
                'post_content' => $desc,
                'post_status'  => 'publish',
                'post_author'  => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) {
                update_post_meta($post_id, 'ws_id', ndpv()->get_workspace());  

                if ($budget) {
                    update_post_meta($post_id, 'budget', $budget);
                }

                if ($currency) {
                    update_post_meta($post_id, 'currency', $currency);
                }

                if ($tags) {
                    wp_set_post_terms($post_id, $tags, 'ndpv_tag');
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
        $reg_errors = new \WP_Error();

        //webhook
        $type = isset($params['type']) ? sanitize_text_field($params['type']) : null;
        $org_name   = isset($params['org_name']) ? sanitize_text_field($params['org_name']) : null;
        $person_id = isset($params['person_id']) ? absint($params['person_id']) : null;
        $org_id    = isset($params['org_id']) ? absint($params['org_id']) : null;
        $level_id     = isset($params['level_id']) ? absint($params['level_id']) : null;
        $budget       = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency     = isset($params['currency']) ? sanitize_text_field($params['currency']) : null;
        $tags         = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $desc         = isset($params['desc']) ? nl2br($params['desc']) : '';
        $note         = isset($params['note']) ? nl2br($params['note']) : null;

        $img = isset($contact['img']) && isset($contact['img']['id']) ? absint($contact['img']['id']) : null;

        if (empty($type)) {
            $reg_errors->add('field', esc_html__('Type is missing', 'propovoice'));
        } 
        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

            $data = array(
                'ID'            => $post_id,
                'post_title'    => 'Webhook', 
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {
                 
                if ($budget) {
                    update_post_meta($post_id, 'budget', $budget);
                }

                if ($currency) {
                    update_post_meta($post_id, 'currency', $currency);
                }

                if ($tags) {
                    wp_set_post_terms($post_id, $tags, 'ndpv_tag');
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
        //TODO: when delete webhook delete task note file, if not exist in deal project
        $url_params = $req->get_url_params();
        $ids = explode(',', $url_params['id']);
        foreach ($ids as $id) {
            wp_delete_post($id);
        }
        wp_send_json_success($ids);
    }

    // check permission
    public function get_per()
    {
        return true;
    }

    public function create_per()
    {
        return current_user_can('publish_posts');
    }

    public function update_per()
    {
        return current_user_can('edit_posts');
    }

    public function del_per()
    {
        return current_user_can('delete_posts');
    }
}
