<?php

namespace Ndpi\Ctrl\Integrate\Smtp; 
 
class SmtpList
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'rest_routes']);
    }

    public function rest_routes()
    {
        register_rest_route('ndpi/v1', '/intg-smtp', [
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
                'name' => 'Sendinblue',
                'slug' => 'sendinblue',
                'img' => '',
                'pro' => true,
            ],
            [ 
                'name' => 'SendLayer',
                'slug' => 'sendLayer ',
                'img' => '',
                'pro' => true,
            ]
        ];
         
        wp_send_json_success($form_list);
    } 

    public function get_permission()
    {
        return true;
    } 
} 