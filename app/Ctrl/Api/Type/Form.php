<?php 
namespace Ndpv\Ctrl\Api\Type;

use Ndpv\Model\Form as ModelForm;

class Form
{ 
    public function __construct()
    {         
        add_action('rest_api_init', [$this, 'rest_routes']);
    }

    public function rest_routes()
    { 
        register_rest_route('ndpv/v1', '/forms', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_per'],
            ] 
        ]); 
    }

    public function get($req)
    {
        $params = $req->get_params();
        $form = isset($params['form']) ? sanitize_text_field($params['form']) : null;

        $data = [];
        $model = new ModelForm();

        if ( $form == 'contact_form_7' ) {
            $data = $model->contact_form_7();
        } else if ( $form == 'wpforms' ) {
            $data = $model->wpforms();
        } else if ( $form == 'ninja_forms' ) {
            $data = $model->ninja_forms();
        } else if ( $form == 'gravity_forms' ) {
            $data = $model->gravity_forms();
        } else if ( $form == 'fluent_forms' ) {
            $data = $model->fluent_forms();
        }
        
        wp_send_json_success( $data );
    } 

    // check permission
    public function get_per()
    {
        return true;
    } 
}
