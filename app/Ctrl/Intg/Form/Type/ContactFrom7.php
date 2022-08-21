<?php

namespace Ndpi\Ctrl\Intg\Form\Type; 
 
class ContactFrom7
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'rest_routes']);
    }

    public function rest_routes()
    {
        register_rest_route('ndpi/v1', '/intg-form', [
            'methods' => 'GET',
            'callback' => [$this, 'get'],
            'permission_callback' => [$this, 'get_permission']
        ]);

        register_rest_route('ndpi/v1', '/intg-form', [
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

            if ($tab == 'license') {
                $key = isset($params['key']) ? sanitize_text_field($params['key']) : null;
                $type = isset($params['type']) ? sanitize_textarea_field($params['type']) : null;
                $license = new License();
                $license->manage_licensing($key, $type);
                // $option = update_option('ndpi_' . $tab, $data);
            }

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
