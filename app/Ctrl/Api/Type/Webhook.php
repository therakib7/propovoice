<?php 
namespace Ndpv\Ctrl\Api\Type; 

class Webhook
{ 
    public function __construct()
    {         
        add_action('rest_api_init', [$this, 'rest_routes']);
    }

    public function rest_routes()
    { 
        register_rest_route('ndpv/v1', '/webhooks', [
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
        $webhook = isset($params['webhook']) ? sanitize_text_field($params['webhook']) : null;
 

        $data = [];

        $args = [
            'post_type' => 'ndpv_webhook',
            'posts_per_page' => -1,
        ];

        $cf7_query = new \WP_Query($args);

        while ($cf7_query->have_posts()) {
            $cf7_query->the_post();

            global $post;

            $form = [
                'id'     => $post->ID,
                'active'  => isset($get_data['active']) ? $get_data['active'] : false,
                'name'  => $post->post_title,
                'fields' => [],
            ]; 

            $data[] = $form;
        }

        $form = [
            'id'     => 1,
            'active'  => isset($get_data['active']) ? $get_data['active'] : false,
            'name'  => 'This is the title',
            'fields' => [],
        ]; 

        $data[] = $form;
        
        wp_send_json_success( $data );
    } 

    // check permission
    public function get_permission()
    {
        return true;
    } 
}
