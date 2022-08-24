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
                'name' => 'Default',
                'slug' => 'default',
                'img' => 'https://cdn.cdnlogo.com/logos/w/28/wordpress.svg',
                'pro' => true,
            ],
            [ 
                'name' => 'Sendinblue',
                'slug' => 'sendinblue',
                'img' => 'https://www.sendinblue.com/wp-content/themes/sendinblue2019/assets/images/common/logo-color.svg',
                'pro' => true,
            ],
            [ 
                'name' => 'SendGrid',
                'slug' => 'sendgrid ',
                'img' => 'https://cdn.cdnlogo.com/logos/s/48/sendgrid.svg',
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