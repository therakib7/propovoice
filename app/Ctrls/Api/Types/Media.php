<?php

namespace Ncpi\Ctrls\Api\Types;

use Ncpi\Helpers\Fns;
use WP_Query;

class Media
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/media', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_permission'],
            ],
            [
                'methods' => 'POST',
                'callback' => [$this, 'create'],
                'permission_callback' => [$this, 'create_permission']
            ],
        ]);

        register_rest_route('ncpi/v1', '/media/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_single'],
            'permission_callback' => [$this, 'get_permission'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ncpi/v1', '/media/(?P<id>[0-9,]+)', array(
            'methods' => 'DELETE',
            'callback' => [$this, 'delete'],
            'permission_callback' => [$this, 'delete_permission'],
            'args' => array(
                'id' => array(
                    'sanitize_callback'  => 'sanitize_text_field',
                ),
            ),
        ));
    }

    public function get($req)
    {
        $request = $req->get_params();

        $per_page = 10;
        $offset = 0;

        if (isset($request['per_page'])) {
            $per_page = $request['per_page'];
        }

        if (isset($request['page']) && $request['page'] > 1) {
            $offset = ($per_page * $request['page']) - $per_page;
        }

        $args = array(
            'post_type' => 'ncpi_estvoice',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'offset' => $offset,
        );

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        $query = new WP_Query($args);
        $total_data = $query->found_posts; //use this for pagination 
        $result = $data = [];
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id;

            $query_data['project'] = [
                'name' => ''
            ];

            $from_id = get_post_meta($id, 'from', true);
            $fromData = [];
            if ($from_id) {
                $fromData['id'] = $from_id;
                $fromData['name'] = get_post_meta($from_id, 'name', true);
            }
            $query_data['from'] = $fromData;

            $to_id = get_post_meta($id, 'to', true);
            $toData = [];
            if ($to_id) {
                $toData['id'] = $to_id;
                $to_obj = get_user_by('id', $to_id);

                $toData['first_name'] = $to_obj->first_name;
                $toData['last_name'] = $to_obj->last_name;
                $toData['email'] = $to_obj->user_email;
            }
            $query_data['to'] = $toData;

            $query_data['invoice'] = json_decode(get_post_meta($id, 'invoice', true));

            $query_data['total'] = get_post_meta($id, 'total', true);
            $query_data['paid'] = get_post_meta($id, 'paid', true);
            if (!$query_data['paid']) {
                $query_data['paid'] = 0;
            }
            $query_data['due'] = get_post_meta($id, 'due', true);
            if (!$query_data['due']) {
                $query_data['due'] = 0;
            }

            $query_data['date'] = get_the_time('j-M-Y');
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
        $id    = $url_params['id'];

        $query_data = [];
        $query_data['id'] = $id;

        $query_data['invoice'] = json_decode(get_post_meta($id, 'invoice', true));

        $from_id = get_post_meta($id, 'from', true);
        $fromData = [];
        if ($from_id) {
            $fromData['id'] = $from_id;

            $fromMeta = get_post_meta($from_id);

            $fromData['name'] = isset($fromMeta['name']) ? $fromMeta['name'][0] : '';
            $fromData['email'] = isset($fromMeta['email']) ? $fromMeta['email'][0] : '';
            $fromData['web'] = isset($fromMeta['web']) ? $fromMeta['web'][0] : '';
            $fromData['address'] = isset($fromMeta['address']) ? $fromMeta['address'][0] : '';
        }
        $query_data['fromData'] = $fromData;

        $to_id = get_post_meta($id, 'to', true);
        $toData = [];
        if ($to_id) {
            $toData['id'] = $to_id;
            $to_obj = get_user_by('id', $to_id);

            $toData['first_name'] = $to_obj->first_name;
            $toData['last_name'] = $to_obj->last_name;
            $toData['email'] = $to_obj->user_email;
            $toData['web'] = get_user_meta($to_id, 'web', true);
            $toData['address'] = get_user_meta($to_id, 'address', true);
        }
        $query_data['toData'] = $toData;

        wp_send_json_success($query_data);
    }

    public function create($req)
    {

        $file_params = $req->get_file_params();
        $params = $req->get_params(); 
        $file_data     = isset($file_params['file']) ? $file_params['file'] : '';
        $attach_type   = isset($params['attach_type']) ? $params['attach_type'] : ''; 
        
        $reg_errors  = new \WP_Error;

        $img_max_size = 1024; //1024KB

        // $file               = $_FILES['file'];
        $file               = $file_data;
        $allowed_file_types = ['image/jpg', 'image/jpeg', 'image/png'];
        // Allowed file size -> 1MB
        $allowed_file_size = $img_max_size * 1024;

        if (!empty($file['name'])) {
            // Check file type
            if (!in_array($file['type'], $allowed_file_types)) {
                $valid_file_type = str_replace('image/', '', implode(', ', $allowed_file_types));
                $error_file_type = str_replace('image/', '', $file['type']);

                $reg_errors->add(
                    'field',
                    sprintf(
                        esc_html__('Invalid file type: %s. Supported file types: %s', 'propovoice'),
                        $error_file_type,
                        $valid_file_type
                    )
                );
            }

            // Check file size
            if ($file['size'] > $allowed_file_size) {
                $reg_errors->add(
                    'field',
                    sprintf(
                        esc_html__('File is too large. Max. upload file size is %s', 'propovoice'),
                        Fns::format_bytes($allowed_file_size)
                    )
                );
            }

            if ($reg_errors->get_error_messages()) {
                wp_send_json_error($reg_errors->get_error_messages());
            } else {
                if (!function_exists('wp_handle_upload')) {
                    require_once ABSPATH . 'wp-admin/includes/file.php';
                }
                $upload_overrides = ['test_form' => false];
                $uploaded         = wp_handle_upload($file, $upload_overrides);

                if ($uploaded && !isset($uploaded['error'])) {
                    $filename = $uploaded['file'];
                    $filetype = wp_check_filetype(basename($filename), null);

                    $attach_id = wp_insert_attachment(
                        [
                            'guid'            => $uploaded['url'],
                            'post_title'      => sanitize_text_field(preg_replace('/\.[^.]+$/', '', basename($filename))),
                            'post_excerpt'    => '',
                            'post_content'    => '',
                            'post_mime_type'  => sanitize_text_field($filetype['type']),
                            'post_status'     => 'ncpi-inherit',
                            'comments_status' => 'closed',
                        ],
                        $uploaded['file'],
                        0
                    );

                    $file_info = [];
                    if (!is_wp_error($attach_id)) {
                        // wp_update_attachment_metadata($attach_id, wp_generate_attachment_metadata($attach_id, $filename)); 
                        update_post_meta($attach_id, 'ws_id', ncpi()->get_workspace() );
                        update_post_meta($attach_id, 'ncpi_attach_type', $attach_type); 

                        $file_info = [
                            'id'  => $attach_id,
                            'src' => wp_get_attachment_image_url($attach_id, 'thumbnail'),
                        ];
                    }

                    wp_send_json_success($file_info);
                } else {
                    /*
                     * Error generated by _wp_handle_upload()
                     * @see _wp_handle_upload() in wp-admin/includes/file.php
                     */
                    wp_send_json_error([$uploaded['error']]);
                }
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
        wp_send_json_success($ids);
    }

    // check permission
    public function get_permission()
    {
        return true;
    }

    public function create_permission($req)
    {
        $params = $req->get_params();
        return isset($params['permission']) ? true : current_user_can('publish_posts');
    }

    public function delete_permission()
    {
        return current_user_can('delete_posts');
    }
}
