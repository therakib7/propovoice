<?php

namespace Ndpi\Ctrl\Intg\Form\Type; 
 
class FormList
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
    }

    public function get($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $form_list = [
            [
                'name' => 'Contact Form 7',
                'slug' => 'cf7',
                'img' => '',
            ],
            [
                'name' => 'Gravity Form',
                'slug' => 'gravity-form',
                'img' => '',
            ]
        ];
         
        wp_send_json_success($form_list);
    } 

    public function get_permission()
    {
        return true;
    } 
} 