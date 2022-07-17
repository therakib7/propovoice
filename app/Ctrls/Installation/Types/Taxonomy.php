<?php

namespace Ncpi\Ctrls\Installation\Types;

class Taxonomy
{

    public function __construct()
    {
        $this->create_custom_taxonomy();
    }

    function create_custom_taxonomy()
    {
        //when install set workspace for all previous data

        //Workplace pro 
        $data = array(
            'post_type'     => 'ndpi_workspace',
            'post_title'    => 'Workplace',
            'post_content'  => '',
            'post_status'   => 'publish', //TODO: is it public or private for workspace
            'post_author'   => get_current_user_id()
        );
        $post_id = wp_insert_post($data);

        if (!is_wp_error($post_id)) {
            update_option('ndpi_workspace_default', $post_id);
        }

        //lead
        $lead_level = [
            'Hot',
            'Warm',
            'Cold'
        ];
        foreach ($lead_level as $level) {
            $term_id = wp_insert_term(
                $level,   // the term 
                'ndpi_lead_level', // the taxonomy 
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
            }
        }

        //deal 
        $temp_pipeline = [
            'Deal Pipeline'
        ];
        foreach ($temp_pipeline as $pipeline) {
            $pipeline_add = wp_insert_term(
                $pipeline,   // the term 
                'ndpi_deal_pipeline', // the taxonomy 
            );

            if (!is_wp_error($pipeline_add)) {
                update_term_meta($pipeline_add['term_id'], 'tax_pos', $pipeline_add['term_id']);
            }

            $pipeline_id = isset($pipeline_add['term_id']) ? $pipeline_add['term_id'] : 0;


            $temp_stage = [
                'Opportunity',
                'Contracting',
                'Engaging',
                'Proposing',
                'Closing Won',
                'Lost',
            ];

            foreach ($temp_stage as $stage) {
                $stage_add = wp_insert_term(
                    $stage,  //the term 
                    'ndpi_deal_stage', //the taxonomy 
                );

                if (!is_wp_error($stage_add)) {
                    update_term_meta($stage_add['term_id'], 'tax_pos', $stage_add['term_id']);

                    //TODO: Check the stage name for specific type
                    if ($stage == 'Closing Won') {
                        update_term_meta($stage_add['term_id'], 'type', 'won');
                    } else if ($stage == 'Lost') {
                        update_term_meta($stage_add['term_id'], 'type', 'lost');
                    }
                }

                if (!is_wp_error($stage_add)) {

                    $stage_id = isset($stage_add['term_id']) ? $stage_add['term_id'] : 0;
                    add_term_meta($stage_id, 'deal_pipeline_id', $pipeline_id);
                }
            }
        }

        $temp_tag = [
            'Design',
            'Development',
            'Marketing',
        ];
        foreach ($temp_tag as $tag) {
            $term_id = wp_insert_term(
                $tag,   // the term 
                'ndpi_tag', // the taxonomy 
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
            }
        }

        //task status
        $task_status = [
            'Todo',
            'In Progress',
            'Done'
        ];
        foreach ($task_status as $status) {
            $term_id = wp_insert_term(
                $status,   // the term 
                'ndpi_task_status', // the taxonomy 
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
                if ($status == 'Done') {
                    update_term_meta($term_id['term_id'], 'type', 'done');
                }
            }
        }

        //task type
        $task_type = [
            'Email',
            'Call',
            'Meeting'
        ];
        foreach ($task_type as $type) {
            $term_id = wp_insert_term(
                $type,   // the term 
                'ndpi_task_type', // the taxonomy 
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
            }
        }

        //project status
        $project_status = [
            'New',
            'In Progress',
            'Done',
            'Completed',
        ];

        foreach ($project_status as $status) {
            $term_id = wp_insert_term(
                $status,   // the term 
                'ndpi_project_status', // the taxonomy 
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
                if ($status == 'Completed') {
                    update_term_meta($term_id['term_id'], 'type', 'completed');
                }
            }
        }
    }
}
