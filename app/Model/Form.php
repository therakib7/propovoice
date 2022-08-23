<?php
namespace Ndpi\Model; 

class Form {

    public function cf7()
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
                ];
            }

            $forms[] = $form;
        }
        return $forms;
    }
 
}