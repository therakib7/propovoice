<?php

namespace Ndpi\Ctrl\Integrate\Form\Type; 
 
class Wpforms
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'rest_routes']);
    }

    public function rest_routes()
    {
        register_rest_route('ndpi/v1', '/intg-form/wpforms', [
            'methods' => 'GET',
            'callback' => [$this, 'get'],
            'permission_callback' => [$this, 'get_permission']
        ]);

        register_rest_route('ndpi/v1', '/intg-form/wpforms', [
            'methods' => 'POST',
            'callback' => [$this, 'create'],
            'permission_callback' => [$this, 'create_permission']
        ]);
    }

    public function get($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $tab = isset($params['tab']) ? sanitize_text_field($params['tab']) : null;

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
 
        wp_send_json_success($forms);
    }

    public function create($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $tab = isset($params['tab']) ? sanitize_text_field($params['tab']) : null;

        if (empty($tab)) {
            $reg_errors->add('field', esc_html__('Tab is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = []; 

            wp_send_json_success();
        }
    }

    public function get_permission()
    {
        return true;
    }

    public function create_permission()
    {
        return current_user_can('publish_posts');
    }
}
