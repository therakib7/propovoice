<?php

namespace Ncpi\Ctrls\Api\Types;

use WP_Query;

class Taxonomy
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/taxonomies', [
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

        register_rest_route('ncpi/v1', '/taxonomies/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/taxonomies/(?P<id>\d+)', array(
            'methods' => 'PUT',
            'callback' => [$this, 'update'],
            'permission_callback' => [$this, 'update_permission'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ncpi/v1', '/taxonomies/(?P<id>[0-9,]+)', array(
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
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $taxonomies = isset($params['taxonomy']) ? sanitize_text_field($params['taxonomy']) : null;

        if (empty($taxonomies)) {
            $reg_errors->add('field', esc_html__('Taxonomy is missing', 'propovoice'));
        } 

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = [];

            $taxonomies = explode(',', $taxonomies);
            foreach ($taxonomies as $taxonomy) {
                $get_taxonomy = get_terms( array(
                    'taxonomy' => 'ndpi_' . $taxonomy, 
                    'orderby' => 'term_order', 
                    'hide_empty' => false
                ) );

                $format_taxonomy = [];
                foreach ($get_taxonomy as $single) {
                    $color = get_term_meta($single->term_id, 'color', true);
                    $bg_color = get_term_meta($single->term_id, 'bg_color', true);
                    $format_taxonomy[] = [
                        'id' => (string) $single->term_id,
                        'label' => $single->name,
                        'color' => $color ? $color : '',
                        'bg_color' => $bg_color ? $bg_color : ''
                    ];
                }
                $data[$taxonomy] = $format_taxonomy;
            }
            wp_send_json_success($data);
        }
    }

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id = $url_params['id'];
        $query_data = [];
        $query_data['id'] = $id;

        $query_data['label'] = get_term($id)->name;
        $query_data['color'] = get_term_meta($id, 'color', true);
        $query_data['bg_color'] = get_term_meta($id, 'bg_color', true);

        wp_send_json_success($query_data);
    }

    public function create($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $taxonomy = isset($params['taxonomy']) ? sanitize_text_field($params['taxonomy']) : null; 
        $reorder  = isset($params['reorder']) ? array_map('absint', $params['reorder']) : false;
        $label = isset($params['label']) ? sanitize_text_field($params['label']) : null;
        $color = isset($params['color']) ? sanitize_text_field($params['color']) : null;
        $bg_color = isset($params['bg_color']) ? sanitize_text_field($params['bg_color']) : null;

        if (empty($taxonomy)) {
            $reg_errors->add('field', esc_html__('Taxonomy is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            if ( $reorder ) {
                $this->reorder_taxonomies($reorder);
                wp_send_json_success();
            } else {
                $taxonomy = wp_insert_term(
                    $label,   // the term 
                    'ndpi_' . $taxonomy, // the taxonomy 
                );
    
                if (!is_wp_error($taxonomy)) {
                    $term_id = $taxonomy['term_id'];
                    update_term_meta($term_id, 'color', $color);
                    update_term_meta($term_id, 'bg_color', $bg_color);
                    wp_send_json_success($term_id);
                } else {
                    wp_send_json_error();
                }
            } 
        }
    }

    public function update($req)
    {
        $params = $req->get_params();
        $reg_errors = new \WP_Error;

        $taxonomy = isset($params['taxonomy']) ? sanitize_text_field($params['taxonomy']) : null;
        $delete = isset($params['delete']) ? true : false;
        $label = isset($params['label']) ? sanitize_text_field($params['label']) : null;
        $color = isset($params['color']) ? sanitize_text_field($params['color']) : null;
        $bg_color = isset($params['bg_color']) ? sanitize_text_field($params['bg_color']) : null;

        if (empty($taxonomy)) {
            $reg_errors->add('field', esc_html__('Taxonomy is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $term_id = $url_params['id']; 

            if ($delete) {
                wp_delete_term($term_id, 'ndpi_' . $taxonomy);
                wp_send_json_success();
            } else {
                $taxonomy = wp_update_term(
                    $term_id,   // the term 
                    'ndpi_' . $taxonomy, // the taxonomy 
                    array(
                        'name' => $label,
                    )
                );

                if (!is_wp_error($taxonomy)) {
                    update_term_meta($term_id, 'color', $color);
                    update_term_meta($term_id, 'bg_color', $bg_color);
                    wp_send_json_success($term_id);
                } else {
                    wp_send_json_error();
                }
            }
        }
    } 

    public function reorder_taxonomies($ids = array())
    {
        global $wpdb;  
        $i = 0; 
        foreach ($ids as $id):  
            $i++; 
            $result = $wpdb->update($wpdb->prefix . 'terms', array('term_order' => $i), array('term_id' => $id) ); 
        endforeach;
    }

    public function delete($req)
    {
        $url_params = $req->get_url_params();

        $ids = explode(',', $url_params['id']);
        foreach ($ids as $id) {
            wp_delete_term($id);
        }
        wp_send_json_success($ids);
    }

    // check permission
    public function get_permission()
    {
        return true;
    }

    public function create_permission()
    {
        return current_user_can('publish_posts');
    }

    public function update_permission()
    {
        return current_user_can('edit_posts');
    }

    public function delete_permission()
    {
        return current_user_can('delete_posts');
    }
}
