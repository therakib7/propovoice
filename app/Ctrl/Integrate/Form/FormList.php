<?php

namespace Ndpi\Ctrl\Integrate\Form; 
 
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

        $ninja_from = false;
        if ( class_exists( 'Ninja_Forms' ) ) {
            $ninja_forms_version = get_option( 'ninja_forms_version', '0.0.0' );
            if ( version_compare( $ninja_forms_version, '3', '>=' ) ) {
                $ninja_from = true;
            }
        }

        $form_list = [
            [
                'active' => class_exists( 'WPCF7_ContactForm' ),
                'name' => 'Contact Form 7',
                'slug' => 'contact_form_7',
                'img' => '',
                'pro' => true,
            ],
            [
                'active' => class_exists( 'WPForms' ),
                'name' => 'WPForms',
                'slug' => 'wpforms',
                'img' => '',
                'pro' => true,
            ],
            [
                'active' => $ninja_from,
                'name' => 'Ninja Forms',
                'slug' => 'ninja_forms',
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