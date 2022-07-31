<?php

namespace Ncpi\Ctrls\Installation\Types;

class Taxonomy
{
    public function __construct()
    {
        $this->create_custom_taxonomy();
    }

    public function create_custom_taxonomy()
    {
        //when install set workspace for all previous data

        //Workspace pro
        $data = array(
            'post_type'     => 'ndpi_workspace',
            'post_title'    => 'Workspace',
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
            [
                'label' => 'Hot',
                'bg_color' => '',
                'color' => '',
                'type' => '',
            ],
            [
                'label' => 'Warm',
                'bg_color' => '',
                'color' => '',
                'type' => '',
            ],
            [
                'label' => 'Cold',
                'bg_color' => '',
                'color' => '',
                'type' => '',
            ]
        ];
        foreach ($lead_level as $level) {
            $term_id = wp_insert_term(
                $level['label'], // the term
                'ndpi_lead_level', // the taxonomy
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
                if ($level['bg_color']) {
                    update_term_meta($term_id['term_id'], 'bg_color', $level['bg_color']);
                }
                if ($level['color']) {
                    update_term_meta($term_id['term_id'], 'color', $level['color']);
                }
                if ($level['type']) {
                    update_term_meta($term_id['term_id'], 'type', $level['type']);
                }
            }
        }

        //deal
        $temp_pipeline = [
            'Deal Pipeline'
        ];
        foreach ($temp_pipeline as $pipeline) {
            $pipeline_add = wp_insert_term(
                $pipeline, // the term
                'ndpi_deal_pipeline', // the taxonomy
            );

            if (!is_wp_error($pipeline_add)) {
                update_term_meta($pipeline_add['term_id'], 'tax_pos', $pipeline_add['term_id']);

                $pipeline_id = isset($pipeline_add['term_id']) ? $pipeline_add['term_id'] : 0;

                $temp_stage = [
                    [
                        'label' => 'Opportunity',
                        'bg_color' => '',
                        'color' => '',
                        'type' => '',
                    ],
                    [
                        'label' => 'Contracting',
                        'bg_color' => '',
                        'color' => '',
                        'type' => '',
                    ],
                    [
                        'label' => 'Engaging',
                        'bg_color' => '',
                        'color' => '',
                        'type' => '',
                    ],
                    [
                        'label' => 'Closing Won',
                        'bg_color' => '',
                        'color' => '',
                        'type' => 'won',
                    ],
                    [
                        'label' => 'Lost',
                        'bg_color' => '',
                        'color' => '',
                        'type' => 'lost',
                    ],
                ];

                foreach ($temp_stage as $stage) {
                    $stage_add = wp_insert_term(
                        $stage['label'], //the term
                        'ndpi_deal_stage', //the taxonomy
                    );

                    if (!is_wp_error($stage_add)) {
                        $stage_id = isset($stage_add['term_id']) ? $stage_add['term_id'] : 0;
                        add_term_meta($stage_id, 'deal_pipeline_id', $pipeline_id);
                        update_term_meta($stage_id, 'tax_pos', $stage_id);

                        if ($stage['bg_color']) {
                            update_term_meta($stage_id, 'bg_color', $stage['bg_color']);
                        }
                        if ($stage['color']) {
                            update_term_meta($stage_id, 'color', $stage['color']);
                        }
                        if ($stage['type']) {
                            update_term_meta($stage_id, 'type', $stage['type']);
                        }
                    }
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
                $tag, // the term
                'ndpi_tag', // the taxonomy
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
            }
        }

        //task status
        $task_status = [
            [
                'label' => 'Todo',
                'bg_color' => '',
                'color' => '',
                'type' => '',
            ],
            [
                'label' => 'In Progress',
                'bg_color' => '',
                'color' => '',
                'type' => '',
            ],
            [
                'label' => 'Done',
                'bg_color' => '',
                'color' => '',
                'type' => 'done',
            ]
        ];
        foreach ($task_status as $status) {
            $term_id = wp_insert_term(
                $status['label'], // the term
                'ndpi_task_status', // the taxonomy
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
                if ($status['bg_color']) {
                    update_term_meta($term_id['term_id'], 'bg_color', $status['bg_color']);
                }
                if ($status['color']) {
                    update_term_meta($term_id['term_id'], 'color', $status['color']);
                }
                if ($status['type']) {
                    update_term_meta($term_id['term_id'], 'type', $status['type']);
                }
            }
        }

        //task type
        $task_type = [
            'Task',
            'Meeting',
            'Call',
            'Email',
            'Presentation',
        ];
        foreach ($task_type as $type) {
            $term_id = wp_insert_term(
                $type, // the term
                'ndpi_task_type', // the taxonomy
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
            }
        }

        //project status
        $project_status = [
            [
                'label' => 'New',
                'bg_color' => '',
                'color' => '',
                'type' => '',
            ],
            [
                'label' => 'In Progress',
                'bg_color' => '',
                'color' => '',
                'type' => '',
            ],
            [
                'label' => 'Done',
                'bg_color' => '',
                'color' => '',
                'type' => '',
            ],
            [
                'label' => 'Completed',
                'bg_color' => '',
                'color' => '',
                'type' => 'completed',
            ]
        ];

        foreach ($project_status as $status) {
            $term_id = wp_insert_term(
                $status['label'], // the term
                'ndpi_project_status', // the taxonomy
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
                if ($status['bg_color']) {
                    update_term_meta($term_id['term_id'], 'bg_color', $status['bg_color']);
                }
                if ($status['color']) {
                    update_term_meta($term_id['term_id'], 'color', $status['color']);
                }
                if ($status['type']) {
                    update_term_meta($term_id['term_id'], 'type', $status['type']);
                }
            }
        }

        //contact status
        $contact_status = [
            [
                'label' => 'Active',
                'bg_color' => '',
                'color' => '',
                'type' => 'active',
            ],
            [
                'label' => 'Inactive',
                'bg_color' => '',
                'color' => '',
                'type' => 'inactive',
            ],
            [
                'label' => 'Block',
                'bg_color' => '',
                'color' => '',
                'type' => 'block',
            ]
        ];

        foreach ($contact_status as $status) {
            $term_id = wp_insert_term(
                $status['label'], // the term
                'ndpi_contact_status', // the taxonomy
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
                if ($status['bg_color']) {
                    update_term_meta($term_id['term_id'], 'bg_color', $status['bg_color']);
                }
                if ($status['color']) {
                    update_term_meta($term_id['term_id'], 'color', $status['color']);
                }
                if ($status['type']) {
                    update_term_meta($term_id['term_id'], 'type', $status['type']);
                }
            }
        }
    }
}
