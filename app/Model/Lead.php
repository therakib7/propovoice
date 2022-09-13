<?php

namespace Ndpv\Model;

use Ndpv\Model\Org;
use Ndpv\Model\Person;

class Lead
{
    public function create($data)
    {
        $params = $data;

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

        //insert lead
        $data = array(
            'post_type' => 'ndpv_lead',
            'post_title' => 'Lead',
            'post_content' => $desc,
            'post_status'  => 'publish'
            // 'post_author'  => null
        );
        $post_id = wp_insert_post($data);

        if (!is_wp_error($post_id)) {
            update_post_meta($post_id, 'ws_id', ndpv()->get_workspace());
            update_post_meta($post_id, 'tab_id', $post_id); //for task, note, file

            if ($level_id) {
                wp_set_post_terms($post_id, [$level_id], 'ndpv_lead_level');
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
                wp_set_post_terms($post_id, $tags, 'ndpv_tag');
            }

            if ($note) {
                update_post_meta($post_id, 'note', $note);
            } 
        }
    }

    public function total($id = null)
    {
        $args = array(
            'post_type' => 'ndpv_lead',
            'post_status' => 'publish',
            'posts_per_page' => -1
        );

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        if ($id) {
            $args['meta_query'][] = array(
                array(
                    'key'   => 'person_id',
                    'value' => $id
                )
            );

            $args['meta_query'][] = array(
                array(
                    'key'   => 'org_id',
                    'value' => $id
                )
            );
        }

        $query = new \WP_Query($args);
        $total_data = $query->found_posts;
        wp_reset_postdata();
        return $total_data;
    }
}
