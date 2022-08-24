<?php

namespace Ndpi\Model;

class Form
{
    public function contact_form_7()
    {
        $forms = [];

        $args = [
            'post_type' => 'wpcf7_contact_form',
            'posts_per_page' => -1,
        ];

        $cf7_query = new \WP_Query($args);

        if (! $cf7_query->have_posts()) {
            return $forms;
        } else {
            while ($cf7_query->have_posts()) {
                $cf7_query->the_post();

                global $post;

                $cf7 = \WPCF7_ContactForm::get_instance($post->ID);

                $get_data = get_option("ndpi_contact_form_7_{$post->ID}");
                $form = [
                    'id'     => $post->ID,
                    'active'  => isset($get_data['active']) ? $get_data['active'] : false,
                    'title'  => $post->post_title,
                    'fields' => [],
                ];

                foreach ($cf7->collect_mail_tags() as $tag) {
                    $value = '';
                    if ($get_data['fields']) {
                        foreach ($get_data['fields'] as $svalue) {
                            if ($svalue['id'] == $tag) {
                                $value = $svalue['value'];
                                break;
                            }
                        }
                    }
                    $form['fields'][] = [
                        'id'    => $tag,
                        'label' => "[{$tag}]",
                        'value' => $value,
                    ];
                }

                $forms[] = $form;
            }
        }
        return $forms;
    }

    public function wpforms()
    {
        $forms = [];

        $wpforms = wpforms()->form->get();

        foreach ($wpforms as $wpform) {
            $get_data = get_option("ndpi_wpforms_{$wpform->ID}");
            $form = [
                'id'     => $wpform->ID,
                'active'  => isset($get_data['active']) ? $get_data['active'] : false,
                'title'  => $wpform->post_title,
                'fields' => [],
            ];

            $wpform_fields = wpforms_get_form_fields($wpform);

            foreach ($wpform_fields as $wpform_field) {
                $value = '';
                if ($get_data['fields']) {
                    foreach ($get_data['fields'] as $svalue) {
                        if ($svalue['id'] == $wpform_field['id']) {
                            $value = $svalue['value'];
                            break;
                        }
                    }
                }

                $form['fields'][] = [
                    'id'    => $wpform_field['id'],
                    'label' => $wpform_field['label'],
                    'value' => $value,
                ];
            }

            $forms[] = $form;
        }
        return $forms;
    }

    public function ninja_forms()
    {
        $forms = [];

        $nf = Ninja_Forms();
        $nf_forms = $nf->form()->get_forms();

        foreach ($nf_forms as $nform) {
            $form_id = absint($nform->get_id());
            $form_settings = $nform->get_settings();
            $fields = $nf->form($form_id)->get_fields();

            $get_data = get_option("ndpi_ninja_forms_{$form_id}");
            $form = [
                'id'     => $form_id,
                'active'  => isset($get_data['active']) ? $get_data['active'] : false,
                'title'  => $form_settings['title'],
                'fields' => [],
            ];

            foreach ($fields as $field) {
                $field_id = $field->get_id();
                $field_settings = $field->get_settings();

                $value = '';
                if ($get_data['fields']) {
                    foreach ($get_data['fields'] as $svalue) {
                        if ($svalue['id'] == $field_id) {
                            $value = $svalue['value'];
                            break;
                        }
                    }
                }

                $form['fields'][] = [
                    'id'    => $field_id,
                    'label' => $field_settings['label'],
                    'value' => $value,
                ]; 
            }

            $forms[] = $form;
        }
        return $forms;
    }
}
