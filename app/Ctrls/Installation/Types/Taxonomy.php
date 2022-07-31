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

        //lead level
        $lead_level = [
            [
                'label' => 'Hot',
                'bg_color' => '#FFE8F1',
                'color' => '#EE0D69',
                'type' => '',
            ],
            [
                'label' => 'Warm',
                'bg_color' => '#FFEED9',
                'color' => '#FF6B00',
                'type' => '',
            ],
            [
                'label' => 'Cold',
                'bg_color' => '#E7ECFE',
                'color' => '#4B6EFE',
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

        //lead source
        $lead_source = [
            [
                'label' => 'Upwork',
                'bg_color' => '#6fda44',
                'color' => '#fff',
                'type' => '',
            ],
            [
                'label' => 'Behance',
                'bg_color' => '##0057ff',
                'color' => '#fff',
                'type' => '',
            ],
            [
                'label' => 'Dribble',
                'bg_color' => '#ea4c89',
                'color' => '#fff',
                'type' => '',
            ],
            [
                'label' => 'Facebook',
                'bg_color' => '#4267B2',
                'color' => '#fff',
                'type' => '',
            ]
        ];
        foreach ($lead_source as $source) {
            $term_id = wp_insert_term(
                $source['label'], // the term
                'ndpi_lead_source', // the taxonomy
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
                if ($source['bg_color']) {
                    update_term_meta($term_id['term_id'], 'bg_color', $source['bg_color']);
                }
                if ($source['color']) {
                    update_term_meta($term_id['term_id'], 'color', $source['color']);
                }
                if ($source['type']) {
                    update_term_meta($term_id['term_id'], 'type', $source['type']);
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
                        'bg_color' => '#FFF0F1',
                        'color' => '#EBA45D',
                        'type' => '',
                    ],
                    [
                        'label' => 'Contracting',
                        'bg_color' => '#E0F0EC',
                        'color' => '#4BB99E',
                        'type' => '',
                    ],
                    [
                        'label' => 'Engaging',
                        'bg_color' => '#F4F2FE',
                        'color' => '#8775EC',
                        'type' => '',
                    ],
                    [
                        'label' => 'Proposing',
                        'bg_color' => '#ECF9FC',
                        'color' => '#33C3E2',
                        'type' => '',
                    ],
                    [
                        'label' => 'Closing Won',
                        'bg_color' => '#DDFFDE',
                        'color' => '#0BA24B',
                        'type' => 'won',
                    ],
                    [
                        'label' => 'Lost',
                        'bg_color' => '#FFF0F1',
                        'color' => '#FF6771',
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

        //estvoice extra_amount
        $estvoice_extra_amount = [
            [
                'label' => 'Tax',
                'extra_amount_type' => 'tax',
                'val_type' => 'fixed',
                'show' => true,
            ],
            [
                'label' => 'Fee',
                'extra_amount_type' => 'fee',
                'val_type' => 'fixed',
                'show' => true,
            ],
            [
                'label' => 'Discount',
                'extra_amount_type' => 'discount',
                'val_type' => 'fixed',
                'show' => true,
            ]  
        ];
        foreach ($estvoice_extra_amount as $extra_amount) {
            $term_id = wp_insert_term(
                $extra_amount['label'], // the term
                'ndpi_extra_amount', // the taxonomy
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
                if ($extra_amount['extra_amount_type']) {
                    update_term_meta($term_id['term_id'], 'extra_amount_type', $extra_amount['extra_amount_type']);
                }
                if ($extra_amount['val_type']) {
                    update_term_meta($term_id['term_id'], 'val_type', $extra_amount['val_type']);
                }
                if ($extra_amount['show']) {
                    update_term_meta($term_id['term_id'], 'show', $extra_amount['show']);
                }
            }
        }

        //tag
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
                'bg_color' => '#FFF0F1',
                'color' => '#FF6771',
                'type' => '',
            ],
            [
                'label' => 'In Progress',
                'bg_color' => '#ECF9FC',
                'color' => '#33C3E2',
                'type' => '',
            ],
            [
                'label' => 'Done',
                'bg_color' => '#E0F0EC',
                'color' => '#4BB99E',
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

        //task priority
        $task_priority = [
            [
                'label' => 'Low',
                'bg_color' => '#2D3748',
                'color' => '#CBD5E0',
                'type' => '',
            ],
            [
                'label' => 'Medium',
                'bg_color' => '#ECF9FC',
                'color' => '#33C3E2',
                'type' => '',
            ],
            [
                'label' => 'High',
                'bg_color' => '#FFF0F1',
                'color' => '#FF6771',
                'type' => '',
            ]
        ];
        foreach ($task_priority as $priority) {
            $term_id = wp_insert_term(
                $priority['label'], // the term
                'ndpi_task_priority', // the taxonomy
            );

            if (!is_wp_error($term_id)) {
                update_term_meta($term_id['term_id'], 'tax_pos', $term_id['term_id']);
                if ($priority['bg_color']) {
                    update_term_meta($term_id['term_id'], 'bg_color', $priority['bg_color']);
                }
                if ($priority['color']) {
                    update_term_meta($term_id['term_id'], 'color', $priority['color']);
                }
                if ($priority['type']) {
                    update_term_meta($term_id['term_id'], 'type', $priority['type']);
                }
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
                'bg_color' => '#E0F0EC',
                'color' => '#4BB99E',
                'type' => 'active',
            ],
            [
                'label' => 'Inactive',
                'bg_color' => '#EFE7DF',
                'color' => '#A49485',
                'type' => 'inactive',
            ],
            [
                'label' => 'Block',
                'bg_color' => '#FFF0F1',
                'color' => '#FF6771',
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
