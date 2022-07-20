<?php

namespace Ncpi\Ctrls\Api\Types;

use Ncpi\Models\Contact;
use Ncpi\Models\Invoice;
use Ncpi\Models\Org;
use Ncpi\Models\Person;
use WP_Query;

class Project
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {
        register_rest_route('ncpi/v1', '/projects', [
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

        register_rest_route('ncpi/v1', '/projects/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/projects/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/projects/(?P<id>[0-9,]+)', array(
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

        $module_id = isset($params['module_id']) ? absint( $params['module_id']) : null;
        $s = isset($params['text']) ? sanitize_text_field($params['text']) : null;

        if (isset($params['per_page'])) {
            $per_page = $params['per_page'];
        }

        if (isset($params['page']) && $params['page'] > 1) {
            $offset = ($per_page * $params['page']) - $per_page;
        }

        $args = array(
            'post_type' => 'ndpi_project',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'offset' => $offset,
        );

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        if ($s) {
            $args['s'] = $s;

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
         

        if ( $module_id ) {
            $args['meta_query'][] = array(
                array(
                    'key'   => 'person_id',
                    'value' => $module_id
                )
            );
    
            $args['meta_query'][] = array(
                array(
                    'key'   => 'org_id',
                    'value' => $module_id
                )
            );
        }

        $query = new WP_Query($args);
        $total_data = $query->found_posts; //use this for pagination
        $result = $data = [];
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id;

            $queryMeta = get_post_meta($id);
            $query_data['title'] = get_the_title($id);
            $query_data['budget'] = isset($queryMeta['budget']) ? $queryMeta['budget'][0] : '';
            $query_data['currency'] = isset($queryMeta['currency']) ? $queryMeta['currency'][0] : '';
            $query_data['start_date'] = isset($queryMeta['start_date']) ? $queryMeta['start_date'][0] : '';
            $query_data['due_date'] = isset($queryMeta['due_date']) ? $queryMeta['due_date'][0] : '';
            $query_data['note'] = isset($queryMeta['note']) ? $queryMeta['note'][0] : '';
            $query_data['desc'] = get_the_content();

            $query_data['status_id'] = '';
            $status = get_the_terms($id, 'ndpi_project_status');
            if ($status) {
                $query_data['status_id'] = [
                    'id' => $status[0]->term_id,
                    'label' => $status[0]->name
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
        $query_data['title'] = get_the_title($id);
        $query_data['budget'] = isset($queryMeta['budget']) ? $queryMeta['budget'][0] : '';
        $query_data['currency'] = isset($queryMeta['currency']) ? $queryMeta['currency'][0] : '';
        $query_data['start_date'] = isset($queryMeta['start_date']) ? $queryMeta['start_date'][0] : '';
        $query_data['due_date'] = isset($queryMeta['due_date']) ? $queryMeta['due_date'][0] : '';
        $query_data['note'] = isset($queryMeta['note']) ? $queryMeta['note'][0] : '';
        $query_data['desc'] = get_post_field('post_content', $id);

        $invoice = new Invoice();
        $query_data['invoice'] = $invoice->project_invoice($id);
        
        $query_data['status_id'] = '';
        $status = get_the_terms($id, 'ndpi_project_status');
        if ($status) {
            $term_id = $status[0]->term_id;
            $query_data['status_id'] = [
                'id' => $term_id,
                'label' => $status[0]->name,
                'color' => get_term_meta($term_id, 'color', true),
                'bg_color' => get_term_meta($term_id, 'bg_color', true),
                'type' => get_term_meta($term_id, 'type', true)
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

        $deal_id    = isset($params['deal_id']) ? absint($params['deal_id']) : null;
        $first_name = isset($params['first_name']) ? sanitize_text_field($params['first_name']) : null;
        $org_name   = isset($params['org_name']) ? sanitize_text_field($params['org_name']) : null;
        $person_id = isset($params['person_id']) ? absint($params['person_id']) : null;
        $org_id    = isset($params['org_id']) ? absint($params['org_id']) : null;
        $title      = isset($params['title']) ? sanitize_text_field($params['title']) : null;
        $status_id   = isset($params['status_id']) ? absint($params['status_id']) : null;
        $budget     = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency   = isset($params['currency']) ? sanitize_text_field($params['currency']) : null;
        $start_date = isset($params['start_date']) ? $params['start_date'] : null;
        $due_date = isset($params['due_date']) ? $params['due_date'] : null;
        $tags       = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $desc       = isset($params['desc']) ? nl2br($params['desc']) : '';
        $note       = isset($params['note']) ? nl2br($params['note']) : null;

         
        if ( empty($title) ) {
            $reg_errors->add('field', esc_html__('Please title is required', 'propovoice'));
        }

        /* if ( !$deal_id && empty($contact_id)) {
            $reg_errors->add('field', esc_html__('Please select a contact', 'propovoice'));
        } */
        if (empty($first_name) &&  empty($org_name)) {
            $reg_errors->add('field', esc_html__('Contact info is missing', 'propovoice'));
        }

        $person = new Person();
        if ($person_id) {
            $person->update($params);
        }

        if (! $person_id && $first_name) {
            $person_id = $person->create($params);
        }

        $org = new Org();
        if (! $person_id && $org_id) {
            $org->update($params);
        }
        
        if (! $org_id && $org_name) {
            $org_id = $org->create($params);
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = array(
                'post_type' => 'ndpi_project',
                'post_title'   => $title,
                'post_content' => $desc,
                'post_status'  => 'publish',
                'post_author'  => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) {
                update_post_meta($post_id, 'ws_id', ncpi()->get_workspace());
                $tab_id = $post_id;
                if ($deal_id) {
                    $tab_id = $deal_id;
                    update_post_meta($post_id, 'deal_id', $deal_id);
                    update_post_meta($deal_id, 'project_id', $post_id);
                }
                update_post_meta($post_id, 'tab_id', $tab_id); //for task, note, file

                if ($title) {
                    update_post_meta($post_id, 'title', $title);
                }

                if ($status_id) {
                    wp_set_post_terms($post_id, [$status_id], 'ndpi_project_status');
                }

                if ($deal_id) {
                    $get_lead_person = get_post_meta($id, 'person_id', true);
                    if ($get_lead_person) {
                        $person_id = $get_lead_person;
                    }

                    $get_lead_org = get_post_meta($id, 'org_id', true);
                    if ($get_lead_org) {
                        $org_id = $get_lead_org;
                    }
                }

                if ($person_id) {
                    update_post_meta($post_id, 'person_id', $person_id);
                }

                if ($org_id) {
                    update_post_meta($post_id, 'org_id', $org_id);
                }

                //is_client
                if ( $person_id && $org_id ) {
                    update_post_meta($person_id, 'is_client', 1);
                }

                if ( $person_id && !$org_id ) {
                    update_post_meta($person_id, 'is_client', 1);
                }

                if ( $org_id && !$person_id ) {
                    update_post_meta($org_id, 'is_client', 1);
                }
                //end is_client

                if ($budget) {
                    update_post_meta($post_id, 'budget', $budget);
                }

                if ($currency) {
                    update_post_meta($post_id, 'currency', $currency);
                }

                if ($start_date) {
                    update_post_meta($post_id, 'start_date', $start_date);
                }

                if ($due_date) {
                    update_post_meta($post_id, 'due_date', $due_date);
                }

                if ($tags) {
                    wp_set_post_terms($post_id, $tags, 'ndpi_tag');
                }

                if ($note) {
                    update_post_meta($post_id, 'note', $note);
                }

                /* if ( $deal_id ) { //when move to deal //TODO: think it
                    wp_delete_post( $deal_id );
                } */
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

        $first_name = isset($params['first_name']) ? sanitize_text_field($params['first_name']) : null;
        $org_name   = isset($params['org_name']) ? sanitize_text_field($params['org_name']) : null;
        $person_id = isset($params['person_id']) ? absint($params['person_id']) : null;
        $org_id    = isset($params['org_id']) ? absint($params['org_id']) : null;
        $title        = isset($params['title']) ? sanitize_text_field($params['title']) : null;
        $reorder      = isset($params['reorder']) ? array_map('absint', $params['reorder']) : false;
        $status_id     = isset($params['status_id']) ? absint($params['status_id']) : null;
        $budget       = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency     = isset($params['currency']) ? sanitize_text_field($params['currency']) : null;
        $start_date = isset($params['start_date']) ? $params['start_date'] : null;
        $due_date = isset($params['due_date']) ? $params['due_date'] : null;
        $tags         = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $desc         = isset($params['desc']) ? nl2br($params['desc']) : '';
        $note         = isset($params['note']) ? nl2br($params['note']) : null;

        if (empty($first_name) &&  empty($org_name)) {
            $reg_errors->add('field', esc_html__('Contact info is missing', 'propovoice'));
        }
        
        /* if (empty($status_id)) {
            $reg_errors->add('field', esc_html__('Please select a status', 'propovoice'));
        }

        if (empty($contact_id)) {
            $reg_errors->add('field', esc_html__('Please select a contact', 'propovoice'));
        } */

        $person = new Person();
        if ($person_id) {
            $person->update($params);
        }

        if (! $person_id && $first_name) {
            $person_id = $person->create($params);
        }

        $org = new Org();
        if (! $person_id && $org_id) {
            $org->update($params);
        }
        
        if (! $org_id && $org_name) {
            $org_id = $org->create($params);
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

            $data = array(
                'ID'          => $post_id,
                'post_author' => get_current_user_id()
            );

            if ($title) {
                $data['post_title'] = $title;
            }

            if ($desc) {
                $data['post_content'] = $desc;
            }

            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {
                if ($status_id) {
                    wp_set_post_terms($post_id, [$status_id], 'ndpi_project_status');
                }

                if ($reorder) {
                    $this->reorder_posts($reorder);
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

                if ($start_date) {
                    update_post_meta($post_id, 'start_date', $start_date);
                }

                if ($due_date) {
                    update_post_meta($post_id, 'due_date', $due_date);
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

    public function reorder_posts($order = array())
    {
        global $wpdb;
        $list = join(', ', $order);
        $wpdb->query('SELECT @i:=-1');
        $result = $wpdb->query(
            "UPDATE wp_posts SET menu_order = ( @i:= @i+1 )
            WHERE ID IN ( $list ) ORDER BY FIELD( ID, $list );"
        );
        return $result;
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
