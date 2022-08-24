<?php
namespace Ndpi\Model; 

class Form {

    public function contact_form_7()
    {  
        $forms = [];

        $args = [
            'post_type' => 'wpcf7_contact_form',
            'posts_per_page' => -1,
        ];

        $cf7_query = new \WP_Query( $args );

        if ( ! $cf7_query->have_posts() ) {
            return $forms;
        } else {
            while ( $cf7_query->have_posts() ) {
                $cf7_query->the_post();

                global $post;

                $cf7 = \WPCF7_ContactForm::get_instance( $post->ID );

                $form = [
                    'id'     => $post->ID,
                    'active'  => true,
                    'title'  => $post->post_title,
                    'fields' => [],
                ];

                foreach ( $cf7->collect_mail_tags() as $tag ) { 
                    $form['fields'][] = [
                        'id'    => $tag,
                        'label' => "[{$tag}]",
                        'value' => '',
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

        foreach ( $wpforms as $wpform ) {
            $form = [
                'id'     => $wpform->ID,
                'title'  => $wpform->post_title,
                'fields' => [],
            ];

            $wpform_fields = wpforms_get_form_fields( $wpform );

            foreach ( $wpform_fields as $wpform_field ) {
                $form['fields'][] = [
                    'id'    => $wpform_field['id'],
                    'label' => $wpform_field['label'],
                    'value' => '',
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

        foreach ( $nf_forms as $nform ) {
            $form_id = absint( $nform->get_id() );
            $form_settings = $nform->get_settings();
            $fields = $nf->form( $form_id )->get_fields();

            $form = [
                'id'     => $form_id,
                'title'  => $form_settings['title'],
                'fields' => [],
            ];

            foreach ( $fields as $field ) {
                $field_id = $field->get_id();
                $field_settings = $field->get_settings();

                $form['fields'][] = [
                    'id'    => $field_id,
                    'label' => $field_settings['label'],
                    'value' => '',
                ];
            }

            $forms[] = $form;
        }
        return $forms;
    }
 
}