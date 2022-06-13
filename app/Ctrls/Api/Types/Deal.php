<?php

namespace Ncpi\Ctrls\Api\Types;

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

        $get_stage = get_terms(array(
            'taxonomy' => 'ndpi_deal_stage',
            'orderby' => 'ID',
            'order'   => 'DESC',
            'hide_empty' => false
        ));

        $result = $column = [];

        foreach ($get_stage as $stage) :
            $stage_id = $stage->term_id;
            $stage_name = $stage->name;

            $items = [];
            $args = array(
                'post_type' => 'ndpi_deal',
                'post_status' => 'publish',
                'orderby' => 'menu_order',
                'order' => 'ASC',
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
                    'taxonomy' => 'ndpi_deal_stage',
                    'terms' => $stage_id,
                    'field' => 'term_id',
                )
            );

            $query = new WP_Query($args);
            // $total_data = $query->found_posts; //use this for pagination 

            while ($query->have_posts()) {
                $query->the_post();
                $id = get_the_ID();

                $query_data = [];
                $query_data['id'] = (string) $id; //Invariant failed: Draggable requires a [string] draggableId. 

                $queryMeta = get_post_meta($id);
                $query_data['title'] = get_the_title();
                $query_data['status'] = isset($queryMeta['status']) ? $queryMeta['status'][0] : '';
                $query_data['budget'] = isset($queryMeta['budget']) ? $queryMeta['budget'][0] : '';
                $query_data['currency'] = isset($queryMeta['currency']) ? $queryMeta['currency'][0] : '';
                $query_data['provability'] = isset($queryMeta['provability']) ? $queryMeta['provability'][0] : '';

                /* $query_data['tags'] = [];
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
                } */

                $contact_id = get_post_meta($id, 'person_id', true);
                $contactData = [];

                if ($contact_id) {
                    $contactData['id'] = absint($contact_id);
                    $contactMeta = get_post_meta($contact_id);
                    $contactData['first_name'] = isset($contactMeta['first_name']) ? $contactMeta['first_name'][0] : ''; 
                    $contactData['country'] = isset($contactMeta['country']) ? $contactMeta['country'][0] : '';
                    $contactData['region'] = isset($contactMeta['region']) ? $contactMeta['region'][0] : ''; 
                }
                $query_data['contact'] = $contactData;

                $query_data['date'] = get_the_time('j-M-Y');
                $items[] = $query_data;
            }
            wp_reset_postdata();

            $column[$stage_id] = [
                'name' => $stage_name,
                'id' => $stage_id,
                'items' => $items
            ];

            $result['result'] = $column;
        // $result['total'] = $total_data;

        endforeach;

        wp_send_json_success($result);
    }

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id = $url_params['id'];
        $query_data = [];
        $query_data['id'] = absint($id);

        $queryMeta = get_post_meta($id);
        $query_data['tab_id'] = isset($queryMeta['tab_id']) ? absint($queryMeta['tab_id'][0]) : '';
        $query_data['title'] = get_the_title( $id );
        $query_data['status'] = isset($queryMeta['status']) ? $queryMeta['status'][0] : '';
        $query_data['budget'] = isset($queryMeta['budget']) ? $queryMeta['budget'][0] : '';
        $query_data['currency'] = isset($queryMeta['currency']) ? $queryMeta['currency'][0] : '';
        $query_data['provability'] = isset($queryMeta['provability']) ? absint($queryMeta['provability'][0]) : '';
        $query_data['note'] = isset($queryMeta['note']) ? $queryMeta['note'][0] : '';
        $query_data['desc'] = get_post_field('post_content', $id);

        $query_data['stage_id'] = '';

        $stage = get_the_terms($id, 'ndpi_deal_stage');
        if ($stage) {

            $query_data['stage_id'] = [
                'id' => $stage[0]->term_id,
                'label' => $stage[0]->name
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

        $contact_id = get_post_meta($id, 'person_id', true);
        $contactData = [];

        if ($contact_id) {
            $contactData['id'] = absint($contact_id);
            $contactMeta = get_post_meta($contact_id);
            $contactData['first_name'] = isset($contactMeta['first_name']) ? $contactMeta['first_name'][0] : '';
            $contactData['org_name'] = isset($contactMeta['org_name']) ? $contactMeta['org_name'][0] : '';
            $contactData['email'] = isset($contactMeta['email']) ? $contactMeta['email'][0] : '';
            $contactData['mobile'] = isset($contactMeta['mobile']) ? $contactMeta['mobile'][0] : '';
            $contactData['web'] = isset($contactMeta['web']) ? $contactMeta['web'][0] : '';
            $contactData['country'] = isset($contactMeta['country']) ? $contactMeta['country'][0] : '';
            $contactData['region'] = isset($contactMeta['region']) ? $contactMeta['region'][0] : '';
            $contactData['address'] = isset($contactMeta['address']) ? $contactMeta['address'][0] : '';
        }
        $query_data['contact'] = $contactData;

        $query_data['date'] = get_the_time('j-M-Y');

        wp_send_json_success($query_data);
    }

    public function create($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $lead_id      = isset($params['lead_id']) ? absint($params['lead_id']) : null;
        $person_id    = isset($params['person_id']) ? absint($params['person_id']) : null; 
        $org_id       = isset($params['org_id']) ? absint($params['org_id']) : null; 
        $title        = isset($params['title']) ? sanitize_text_field($params['title']) : null;
        $stage_id     = isset($params['stage_id']) ? absint($params['stage_id']) : null; 
        $budget       = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency     = isset($params['currency']) ? sanitize_text_field($params['currency']) : null;
        $provability  = isset($params['provability']) ? absint($params['provability']) : null;
        $tags         = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $desc         = isset($params['desc']) ? nl2br($params['desc']) : '';
        $note         = isset($params['note']) ? nl2br($params['note']) : null;

        /* if ( $lead_id ) {
            wp_send_json_success($lead_id);
        } */
        if (empty($stage_id)) {
            $reg_errors->add('field', esc_html__('Please select a stage', 'propovoice'));
        }

        /* if ( !$lead_id && empty($contact_id)) {
            $reg_errors->add('field', esc_html__('Please select a contact', 'propovoice'));
        } */

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            $data = array(
                'post_type' => 'ndpi_deal',
                'post_title'    => $title,
                'post_content'  => $desc,
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) {

                update_post_meta($post_id, 'wp_id', ncpi()->get_workplace());
                $tab_id = $post_id;
                if ( $lead_id ) {
                    $tab_id = $lead_id;
                }
                update_post_meta($post_id, 'tab_id', $tab_id); //for task, note, file

                if ($title) {
                    update_post_meta($post_id, 'title', $title);
                } 

                if ($stage_id) {
                    wp_set_post_terms($post_id, [$stage_id], 'ndpi_deal_stage');
                }

                if ( $lead_id ) {
                    $get_lead_person = get_post_meta($id, 'person_id', true);
                    if ( $get_lead_person ) {
                        $person_id = $get_lead_person;
                    }

                    $get_lead_org = get_post_meta($id, 'org_id', true);
                    if ( $get_lead_org ) {
                        $org_id = $get_lead_org;
                    }
                }

                if ( $person_id ) {
                    update_post_meta($post_id, 'person_id', $person_id);
                } 

                if ( $org_id ) {
                    update_post_meta($post_id, 'org_id', $org_id);
                } 

                if ( $budget ) {
                    update_post_meta($post_id, 'budget', $budget);
                }

                if ( $currency ) {
                    update_post_meta($post_id, 'currency', $currency);
                }

                if ( $provability ) {
                    update_post_meta($post_id, 'provability', $provability);
                }

                if ( $tags ) {
                    wp_set_post_terms($post_id, $tags, 'ndpi_tag');
                }

                if ( $note ) {
                    update_post_meta($post_id, 'note', $note);
                }

                if ( $lead_id ) { //when move to deal
                    wp_delete_post( $lead_id );
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

        $person_id    = isset($params['person_id']) ? absint($params['person_id']) : null; 
        $org_id       = isset($params['org_id']) ? absint($params['org_id']) : null;  
        $status       = isset($params['status']) ? sanitize_text_field($params['status']) : null; 
        $title        = isset($params['title']) ? sanitize_text_field($params['title']) : null;
        $reorder      = isset($params['reorder']) ? array_map('absint', $params['reorder']) : false;
        $stage_id     = isset($params['stage_id']) ? absint($params['stage_id']) : null; 
        $budget       = isset($params['budget']) ? sanitize_text_field($params['budget']) : null;
        $currency     = isset($params['currency']) ? sanitize_text_field($params['currency']) : null;
        $provability  = isset($params['provability']) ? absint($params['provability']) : null;
        $tags         = isset($params['tags']) ? array_map('absint', $params['tags']) : null;
        $desc         = isset($params['desc']) ? nl2br($params['desc']) : '';
        $note         = isset($params['note']) ? nl2br($params['note']) : null;

        /* if (empty($stage_id)) {
            $reg_errors->add('field', esc_html__('Please select a stage', 'propovoice'));
        }

        if (empty($contact_id)) {
            $reg_errors->add('field', esc_html__('Please select a contact', 'propovoice'));
        } */

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

            $data = array(
                'ID'          => $post_id,  
                'post_author' => get_current_user_id()
            );

            if ( $title ) {
                $data['post_title'] = $title;
            }

            if ( $desc ) {
                $data['post_content'] = $desc;
            }

            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) { 

                if ( $stage_id ) {
                    wp_set_post_terms($post_id, [$stage_id], 'ndpi_deal_stage');
                }

                if ( $status ) {
                    update_post_meta($post_id, 'status', $status);
                } 

                if ($reorder) {
                    $this->reorder_posts($reorder);
                }

                if ( $person_id ) {
                    update_post_meta($post_id, 'person_id', $person_id);
                } 

                if ( $org_id ) {
                    update_post_meta($post_id, 'org_id', $org_id);
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
