<?php

namespace Ncpi\Ctrl\Api\Type;

use Ncpi\Models\Contact;
use Ncpi\Models\Org;
use Ncpi\Models\Person; 

class Lead
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/leads', [
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

        register_rest_route('ncpi/v1', '/leads/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/leads/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/leads/(?P<id>[0-9,]+)', array(
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
            'post_type' => 'ndpi_lead',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'offset' => $offset,
        );

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        if ($s) {
            $contact_person = new Contact();
            $person_ids = $contact_person->query($s, 'person');
            if ($person_ids) {
                $args['meta_query'][] = array(
                    array(
                        'key'     => 'person_id',
                        'value'   => $person_ids,
                        'compare' => 'IN'
                    )
                );
            }

            $org_ids = $contact_person->query($s, 'org');
            if ($org_ids) {
                $args['meta_query'][] = array(
                    array(
                        'key'     => 'org_id',
                        'value'   => $org_ids,
                        'compare' => 'IN'
                    )
                );
            }
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
            $query_data['currency'] = isset($queryMeta['currency']) ? $queryMeta['currency'][0] : '';
            $query_data['note'] = isset($queryMeta['note']) ? $queryMeta['note'][0] : '';
            $query_data['desc'] = get_the_content();

            $query_data['level_id'] = '';
            $level = get_the_terms($id, 'ndpi_lead_level');
            if ($level) {
                $term_id = $level[0]->term_id;
                $query_data['level_id'] = [
                    'id' => $term_id,
                    'label' => $level[0]->name,
                    'color' => get_term_meta($term_id, 'color', true),
                    'bg_color' => get_term_meta($term_id, 'bg_color', true)
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

            $query_data['person'] = null;
            $person_id = get_post_meta($id, 'person_id', true);
            if ($person_id) {
                $person = new Person();
                $query_data['person'] = $person->single($person_id);
            }

            $query_data['org'] = null;
            $org_id = get_post_meta($id, 'org_id', true);
            if ($org_id) {
                $org = new Org();
                $query_data['org'] = $org->single($org_id);
            }

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

        $queryMeta = get_post_meta($id);
        $query_data['ws_id'] = isset($queryMeta['ws_id']) ? $queryMeta['ws_id'][0] : '';
        $query_data['tab_id'] = isset($queryMeta['tab_id']) ? absint($queryMeta['tab_id'][0]) : '';
        $query_data['budget'] = isset($queryMeta['budget']) ? $queryMeta['budget'][0] : '';
        $query_data['currency'] = isset($queryMeta['currency']) ? $queryMeta['currency'][0] : '';
        $query_data['note'] = isset($queryMeta['note']) ? $queryMeta['note'][0] : '';
        $query_data['desc'] = get_post_field('post_content', $id);

        $query_data['level_id'] = '';
        $level = get_the_terms($id, 'ndpi_lead_level');
        if ($level) {
            $term_id = $level[0]->term_id;
            $color = get_term_meta($term_id, 'color', true);
            $bg_color = get_term_meta($term_id, 'bg_color', true);
            $query_data['level_id'] = [
                'id' => $term_id,
                'label' => $level[0]->name,
                'color' => '#4a5568',
                'bg_color' => '#E2E8F0',
            ];

            if ($color) {
                $query_data['level_id']['color'] = $color;
            }

            if ($bg_color) {
                $query_data['level_id']['bg_color'] = $bg_color;
            }
        }

        $query_data['source_id'] = '';
        $source = get_the_terms($id, 'ndpi_lead_source');
        if ($source) {
            $query_data['source_id'] = [
                'id' => $source[0]->term_id,
                'label' => $source[0]->name,
                'bg_color' => '',
                'color' => '#718096'
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

        $query_data['person'] = null;
        $person_id = isset($queryMeta['person_id']) ? $queryMeta['person_id'][0] : '';
        if ($person_id) {
            $person = new Person();
            $query_data['person'] = $person->single($person_id, true);
        }

        $query_data['org'] = null;
        $org_id = isset($queryMeta['org_id']) ? $queryMeta['org_id'][0] : '';
        if ($org_id) {
            $org = new Org();
            $query_data['org'] = $org->single($org_id, true);
        }

        $query_data['date'] = get_the_time('j-M-Y');

        wp_send_json_success($query_data);
    }

    public function create($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        //lead
        $first_name = isset($params['first_name']) ? sanitize_text_field($params['first_name']) : null;
        $org_name   = isset($params['org_name']) ? sanitize_text_field($params['org_name']) : null;
        $person_id = isset($params['person_id']) ? absint($params['person_id']) : null;
        $org_id    = isset($params['org_id']) ? absint($params['org_id']) : null;
        $level_id  = isset($params['level_id']) ? absint($params['level_id']) : null;
        $budget    = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency  = isset($params['currency']) ? sanitize_text_field($params['currency']) : null;
        $tags      = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $desc      = isset($params['desc']) ? nl2br($params['desc']) : '';
        $note      = isset($params['note']) ? nl2br($params['note']) : null;

        if (empty($first_name) &&  empty($org_name)) {
            $reg_errors->add('field', esc_html__('Contact info is missing', 'propovoice'));
        }

        /* if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }  */
        $person = new Person();
        if ($person_id) {
            $person->update($params);
        }

        if (!$person_id && $first_name) {
            $person_id = $person->create($params);
        }

        $org = new Org();
        if (!$person_id && $org_id) {
            $org->update($params);
        }

        if (!$org_id && $org_name) {
            $org_id = $org->create($params);
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            //insert lead
            $data = array(
                'post_type' => 'ndpi_lead',
                'post_title' => 'Lead',
                'post_content' => $desc,
                'post_status'  => 'publish',
                'post_author'  => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) {
                update_post_meta($post_id, 'ws_id', ncpi()->get_workspace());
                update_post_meta($post_id, 'tab_id', $post_id); //for task, note, file

                if ($level_id) {
                    wp_set_post_terms($post_id, [$level_id], 'ndpi_lead_level');
                }

                if ($person_id) {
                    update_post_meta($post_id, 'person_id', $person_id);
                }

                if ($org_id) {
                    update_post_meta($post_id, 'org_id', $org_id);
                }

                if ($budget) {
                    update_post_meta($post_id, 'budget', $budget);
                }

                if ($currency) {
                    update_post_meta($post_id, 'currency', $currency);
                }

                if ($tags) {
                    wp_set_post_terms($post_id, $tags, 'ndpi_tag');
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

        //lead
        $first_name = isset($params['first_name']) ? sanitize_text_field($params['first_name']) : null;
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

        if (empty($first_name) && empty($org_name)) {
            $reg_errors->add('field', esc_html__('Contact info is missing', 'propovoice'));
        }

        /* if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        } */

        $person = new Person();
        if ($person_id) {
            $person->update($params);
        }

        if (!$person_id && $first_name) {
            $person_id = $person->create($params);
        }

        $org = new Org();
        if (!$person_id && $org_id) {
            $org->update($params);
        }

        if (!$org_id && $org_name) {
            $org_id = $org->create($params);
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

            $data = array(
                'ID'            => $post_id,
                'post_title'    => 'Lead',
                'post_content'  => $desc,
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {

                if ($level_id) {
                    wp_set_post_terms($post_id, [$level_id], 'ndpi_lead_level');
                }

                if ($person_id) {
                    update_post_meta($post_id, 'person_id', $person_id);
                }

                if ($org_id) {
                    update_post_meta($post_id, 'org_id', $org_id);
                }

                if ($budget) {
                    update_post_meta($post_id, 'budget', $budget);
                }

                if ($currency) {
                    update_post_meta($post_id, 'currency', $currency);
                }

                if ($tags) {
                    wp_set_post_terms($post_id, $tags, 'ndpi_tag');
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
        //TODO: when delete lead delete task note file, if not exist in deal project
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
