<?php

namespace Ndpi\Ctrl\Api\Type;

use Ndpi\Model\Form as ModelForm;

class Form
{ 
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'rest_routes']);
    }

    public function rest_routes()
    { 
        register_rest_route('ndpi/v1', '/forms', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_permission'],
            ] 
        ]); 
    }

    public function get($req)
    {
        $params = $req->get_params();
        $form = isset($params['form']) ? sanitize_text_field($params['form']) : null;

        $data = [];
        $model = new ModelForm();

        if ( $form == 'cf7' ) {
            $data = $model->cf7();
        } else if ( $form == 'wpforms' ) {
            $data = $model->wpforms();
        }
        wp_send_json_success( $data );
    } 

    // check permission
    public function get_permission()
    {
        return true;
    } 
}
