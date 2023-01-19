<?php 
namespace Ndpv\Ctrl\Api\Type; 
use Ndpv\Model\Person;

class Org
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'rest_routes']);
    }

    public function rest_routes()
    {
        register_rest_route('ndpv/v1', '/organizations', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_per'],
            ],
            [
                'methods' => 'POST',
                'callback' => [$this, 'create'],
                'permission_callback' => [$this, 'create_per']
            ],
        ]);

        register_rest_route('ndpv/v1', '/organizations/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_single'],
            'permission_callback' => [$this, 'get_per'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ndpv/v1', '/organizations/(?P<id>\d+)', array(
            'methods' => 'PUT',
            'callback' => [$this, 'update'],
            'permission_callback' => [$this, 'update_per'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ndpv/v1', '/organizations/(?P<id>[0-9,]+)', array(
            'methods' => 'DELETE',
            'callback' => [$this, 'delete'],
            'permission_callback' => [$this, 'del_per'],
            'args' => array(
                'id' => array(
                    'sanitize_callback'  => 'sanitize_text_field',
                ),
            ),
        ));
    }

    public function get($req)
    {
        $param = $req->get_params();

        $per_page = 10;
        $offset = 0;

        $s = isset($param['text']) ? sanitize_text_field($param['text']) : null;

        if (isset($param['per_page'])) {
            $per_page = $param['per_page'];
        }

        if (isset($param['page']) && $param['page'] > 1) {
            $offset = ($per_page * $param['page']) - $per_page;
        }

        $args = array(
            'post_type' => 'ndpv_org',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'offset' => $offset,
        );

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        if ($s) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'name',
                    'value'   => $s,
                    'compare' => 'Like',
                )
            );
            $args['meta_query'][] = array(
                array(
                    'key'     => 'email',
                    'value'   => $s,
                    'compare' => 'Like',
                )
            );
        }

        $query = new \WP_Query($args);
        $total_data = $query->found_posts; //use this for pagination
        $result = $data = [];
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id;

            $queryMeta = get_post_meta($id);
            $query_data['name'] = isset($queryMeta['name']) ? $queryMeta['name'][0] : '';
            $query_data['person_id'] = isset($queryMeta['person_id']) ? $queryMeta['person_id'][0] : '';
            $query_data['first_name'] = $queryMeta['person_id'] ? get_post_meta($query_data['person_id'], 'first_name', true) : '';
            $query_data['email'] = isset($queryMeta['email']) ? $queryMeta['email'][0] : '';
            $query_data['web'] = isset($queryMeta['web']) ? $queryMeta['web'][0] : '';
            $query_data['mobile'] = isset($queryMeta['mobile']) ? $queryMeta['mobile'][0] : '';
            $query_data['country'] = isset($queryMeta['country']) ? $queryMeta['country'][0] : '';
            $query_data['region'] = isset($queryMeta['region']) ? $queryMeta['region'][0] : '';
            $query_data['address'] = isset($queryMeta['address']) ? $queryMeta['address'][0] : '';

            $logo_id = isset($queryMeta['logo']) ? $queryMeta['logo'][0] : null; 
            $logoData = null;  
            if ( $logo_id ) {
                $logo_src = wp_get_attachment_image_src( $logo_id, 'thumbnail' );
                if ( $logo_src ) {
                    $logoData = []; 
                    $logoData['id'] = $logo_id;  
                    $logoData['src'] = $logo_src[0]; 
                }
            } 
            $query_data['logo'] = $logoData;

            $query_data['date'] = get_the_time( get_option('date_format') );
            $data[] = $query_data;
        }
        wp_reset_postdata();

        $result['result'] = $data;
        $result['total'] = $total_data;

        wp_send_json_success($result);
    }

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id = $url_params['id'];
        $query_data = [];
        $query_data['id'] = $id;

        $query_data['name'] = get_post_meta($id, 'name', true); 
        $query_data['email'] = get_post_meta($id, 'email', true); 
        $query_data['web'] = get_post_meta($id, 'web', true);
        $query_data['mobile'] = get_post_meta($id, 'mobile', true);
        $query_data['country'] = get_post_meta($id, 'country', true);
        $query_data['region'] = get_post_meta($id, 'region', true);
        $query_data['address'] = get_post_meta($id, 'address', true);

        $logo_id = get_post_meta($id, 'logo', true);
        $logoData = null;
        if ($logo_id) {
            $logo_src = wp_get_attachment_image_src($logo_id, 'thumbnail');
            if ($logo_src) {
                $logoData = [];
                $logoData['id'] = $logo_id;
                $logoData['src'] = $logo_src[0];
            }
        }
        $query_data['logo'] = $logoData;
        $data = [];
        $data['profile'] = $query_data;

        wp_send_json_success($data);
    }

    public function create($req)
    {
        $param = $req->get_params();
        $reg_errors = new \WP_Error;

        $name         = isset($param['name']) ? sanitize_text_field($req['name']) : null;
        $first_name   = isset($param['first_name']) ? sanitize_text_field($req['first_name']) : null;
        $person_id    = isset($param['person_id']) ? absint($param['person_id']) : null; 
        $email        = isset($param['email']) ? strtolower(sanitize_email($req['email'])) : null;
        $web          = isset($param['web']) ? esc_url_raw($req['web']) : null;
        $mobile       = isset($param['mobile']) ? sanitize_text_field($req['mobile']) : null;
        $country      = isset($param['country']) ? sanitize_text_field($req['country']) : null;
        $region       = isset($param['region']) ? sanitize_text_field($req['region']) : null;
        $address      = isset($param['address']) ? sanitize_text_field($req['address']) : null;
        $logo = isset( $param['logo'] ) ? absint( $param['logo'] ) : null;

        if (empty($name)) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = array(
                'post_type' => 'ndpv_org',
                'post_title'    => $name,
                'post_content'  => '',
                'post_status'   => 'publish',
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_insert_post($data);

            if (!is_wp_error($post_id)) {
                update_post_meta($post_id, 'ws_id', ndpv()->get_workspace());

                if ($name) {
                    update_post_meta($post_id, 'name', $name);
                }

                if (! $person_id && $first_name) {
                    $person = new Person();
                    $person_id = $person->create([ 'first_name' => $first_name, 'org_id' => $post_id]);
                }

                if ($person_id) {
                    update_post_meta($post_id, 'person_id', $person_id);
                }

                if ($email) {
                    update_post_meta($post_id, 'email', $email);
                }

                if ($web) {
                    update_post_meta($post_id, 'web', $web);
                }

                if ($mobile) {
                    update_post_meta($post_id, 'mobile', $mobile);
                }

                if ($country) {
                    update_post_meta($post_id, 'country', $country);
                }

                if ($region) {
                    update_post_meta($post_id, 'region', $region);
                }

                if ($address) {
                    update_post_meta($post_id, 'address', $address);
                }

                if ($logo) {
                    update_post_meta($post_id, 'logo', $logo);
                }

                do_action('ndpvp/webhook', 'contact_add', $param);
                
                wp_send_json_success($post_id);
            } else {
                wp_send_json_error();
            }
        }
    }

    public function update($req)
    {
        $param = $req->get_params();
        $reg_errors = new \WP_Error;

        $first_name   = isset($param['first_name']) ? sanitize_text_field($req['first_name']) : null;
        $last_name    = isset($param['last_name']) ? sanitize_text_field($req['last_name']) : null;
        $email        = isset($param['email']) ? strtolower(sanitize_email($req['email'])) : null;
        $name = isset($param['name']) ? sanitize_text_field($req['name']) : null;
        $web          = isset($param['web']) ? esc_url_raw($req['web']) : null;
        $mobile       = isset($param['mobile']) ? sanitize_text_field($req['mobile']) : null;
        $country      = isset($param['country']) ? sanitize_text_field($req['country']) : null;
        $region       = isset($param['region']) ? sanitize_text_field($req['region']) : null;
        $address      = isset($param['address']) ? sanitize_text_field($req['address']) : null;
        $logo = isset( $param['logo'] ) ? absint( $param['logo'] ) : null;

        if (empty($name)) {
            $reg_errors->add('field', esc_html__('Name field is missing', 'propovoice'));
        }

        if (!is_email($email)) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $post_id    = $url_params['id'];

            $data = array(
                'ID'            => $post_id,
                'post_title'    => $name,
                'post_author'   => get_current_user_id()
            );
            $post_id = wp_update_post($data);

            if (!is_wp_error($post_id)) {
                if ($first_name) {
                    update_post_meta($post_id, 'first_name', $first_name);
                }

                if ($last_name) {
                    update_post_meta($post_id, 'last_name', $last_name);
                }

                if ($email) {
                    update_post_meta($post_id, 'email', $email);
                }

                if ($name) {
                    update_post_meta($post_id, 'name', $name);
                }

                if ($web) {
                    update_post_meta($post_id, 'web', $web);
                }

                if ($mobile) {
                    update_post_meta($post_id, 'mobile', $mobile);
                }

                if ($country) {
                    update_post_meta($post_id, 'country', $country);
                }

                if ($region) {
                    update_post_meta($post_id, 'region', $region);
                }

                if ($address) {
                    update_post_meta($post_id, 'address', $address);
                }

                if ( $logo ) {
                    update_post_meta($post_id, 'logo', $logo); 
                } else {
                    delete_post_meta($post_id, 'logo'); 
                }

                do_action('ndpvp/webhook', 'contact_edit', $param);

                wp_send_json_success($post_id);
            } else {
                wp_send_json_error();
            }
        }
    }

    public function delete($req)
    {
        $url_params = $req->get_url_params();

        $ids = explode(',', $url_params['id']);
        foreach ($ids as $id) {
            wp_delete_post($id);
        }
        
        do_action('ndpvp/webhook', 'contact_del', $ids);

        wp_send_json_success($ids);
    }

    // check permission
    public function get_per()
    {
        return current_user_can('publish_posts');
    }

    public function create_per()
    {
        return current_user_can('publish_posts');
    }

    public function update_per()
    {
        return current_user_can('edit_posts');
    }

    public function del_per()
    {
        return current_user_can('delete_posts');
    }
}
