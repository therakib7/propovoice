<?php

namespace Ncpi\Ctrls\Api\Types;

use Ncpi\Helpers\Fns;
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
        $extra_amount_type = isset($params['extra_amount_type']) ? sanitize_text_field($params['extra_amount_type']) : null;
        $id = isset($params['id']) ? sanitize_text_field($params['id']) : null; //post id

        if (empty($taxonomies)) {
            $reg_errors->add('field', esc_html__('Taxonomy is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = [];

            $taxonomies = explode(',', $taxonomies);
            foreach ($taxonomies as $taxonomy) {
                $get_taxonomy = Fns::get_terms($taxonomy, $extra_amount_type);

                $format_taxonomy = [];
                foreach ($get_taxonomy as $single) {
                    $color = get_term_meta($single->term_id, 'color', true);
                    $bg_color = get_term_meta($single->term_id, 'bg_color', true);

                    $icon_id = get_term_meta($single->term_id, 'icon', true);
                    $iconData = null;
                    if ($icon_id) {
                        $icon_src = wp_get_attachment_image_src($icon_id, 'thumbnail');
                        if ($icon_src) {
                            $iconData = [];
                            $iconData['id'] = $icon_id;
                            $iconData['src'] = $icon_src[0];
                        }
                    }

                    $term_property = [
                        'id' => (string) $single->term_id,
                        'label' => $single->name,
                        'color' => '#4a5568',
                        'bg_color' => '#E2E8F0',
                        'icon' => $iconData ? $iconData : ''
                    ];

                    if ($color) {
                        $term_property['color'] = $color;
                    }

                    if ($bg_color) {
                        $term_property['bg_color'] = $bg_color;
                    }

                    if ($taxonomy == 'lead_source') {
                        $term_property['bg_color'] = '';
                        $term_property['color'] = '#718096';
                    }

                    if (
                        $taxonomy == 'deal_stage' ||
                        $taxonomy == 'project_status' ||
                        $taxonomy == 'contact_status' ||
                        $taxonomy == 'task_status' 
                    ) { // for deal won, deal lost, project complted, task done, contact active, block
                        $term_property['type'] = get_term_meta($single->term_id, 'type', true);  
                    }

                    if ( 
                        $taxonomy == 'extra_amount' 
                    ) { // for deal won, deal lost, project complted, task done, contact active, block
                        $term_property['extra_amount_type'] = get_term_meta($single->term_id, 'extra_amount_type', true); 
                        $term_property['val_type'] = get_term_meta($single->term_id, 'val_type', true); 
                        $term_property['show'] = get_term_meta($single->term_id, 'show', true); 
                        if ( $taxonomy == 'extra_amount' && $extra_amount_type != $term_property['extra_amount_type'] ) {
                            if ( $extra_amount_type && $extra_amount_type != $term_property['extra_amount_type'] ) {
                                continue;
                            }
                        }
                    }

                    $format_taxonomy[] = $term_property;
                }
                $data[$taxonomy] = $format_taxonomy;

                if ($id) {
                    $tags = get_the_terms($id, 'ndpi_' . $taxonomy);
                    $tagList = [];
                    if ($tags) {
                        foreach ($tags as $tag) {
                            $color = get_term_meta($tag->term_id, 'color', true);
                            $bg_color = get_term_meta($tag->term_id, 'bg_color', true);

                            $single_tag = [
                                'id' => $tag->term_id,
                                'label' => $tag->name,
                                'color' => '#4a5568',
                                'bg_color' => '#E2E8F0',
                            ];

                            if ($color) {
                                $single_tag['color'] = $color;
                            }

                            if ($bg_color) {
                                $single_tag['bg_color'] = $bg_color;
                            }

                            if ($taxonomy == 'lead_source') {
                                $single_tag['bg_color'] = '';
                                $single_tag['color'] = '#718096';
                            }

                            $tagList[] = $single_tag;
                        }
                    }
                    $data['single_' . $taxonomy] = $tagList;
                }
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
        $icon_id = get_term_meta($id, 'icon', true);
        $iconData = null;
        if ($icon_id) {
            $icon_src = wp_get_attachment_image_src($icon_id, 'thumbnail');
            if ($icon_src) {
                $iconData = [];
                $iconData['id'] = $icon_id;
                $iconData['src'] = $icon_src[0];
            }
        }
        $query_data['icon'] = $iconData;

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
        $icon = isset($params['icon']) && isset($params['icon']['id']) ? absint($params['icon']['id']) : null;
        $extra_amount_type = isset($params['extra_amount_type']) ? sanitize_text_field($params['extra_amount_type']) : null;
        $val_type = isset($params['val_type']) ? sanitize_text_field($params['val_type']) : null;
        $show = isset($params['show']) ? rest_sanitize_boolean($params['show']) : null;

        if (empty($taxonomy)) {
            $reg_errors->add('field', esc_html__('Taxonomy is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            if ($reorder) {
                $this->reorder_taxonomies($reorder);
                wp_send_json_success();
            } else {
                $add_taxonomy = wp_insert_term(
                    $label,   // the term 
                    'ndpi_' . $taxonomy, // the add_taxonomy 
                );

                if (!is_wp_error($add_taxonomy)) {
                    $term_id = $add_taxonomy['term_id'];
                    update_term_meta($term_id, 'tax_pos', $term_id);
                    update_term_meta($term_id, 'color', $color);
                    update_term_meta($term_id, 'bg_color', $bg_color);

                    if ($icon) {
                        update_term_meta($term_id, 'icon', $icon);
                    }
 
                    if ( $taxonomy == 'extra_amount' && $extra_amount_type) {
                        update_term_meta($term_id, 'extra_amount_type', $extra_amount_type);
                        update_term_meta($term_id, 'val_type', $val_type);
                        update_term_meta($term_id, 'show', $show);
                    }

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
        $post_id = isset($params['post_id']) ? absint($params['post_id']) : null;
        $add = isset($params['add']) ? true : false;
        $append = isset($params['append']) && $params['append'] ? true : false;
        $delete = isset($params['delete']) ? true : false;
        $label = isset($params['label']) ? sanitize_text_field($params['label']) : null;
        $color = isset($params['color']) ? sanitize_text_field($params['color']) : null;
        $bg_color = isset($params['bg_color']) ? sanitize_text_field($params['bg_color']) : null;
        $icon = isset($params['icon']) && isset($params['icon']['id']) ? absint($params['icon']['id']) : null;
        $val_type = isset($params['val_type']) ? sanitize_text_field($params['val_type']) : null;
        $show = isset($params['show']) ? rest_sanitize_boolean($params['show']) : null;

        if (empty($taxonomy)) {
            $reg_errors->add('field', esc_html__('Taxonomy is missing', 'propovoice'));
        }

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $url_params = $req->get_url_params();
            $term_id = absint($url_params['id']);

            if ($add) {
                if ($append) {
                    wp_set_object_terms($post_id, $term_id, 'ndpi_' . $taxonomy, true);
                } else {
                    wp_set_post_terms($post_id, [$term_id], 'ndpi_' . $taxonomy);
                }
                wp_send_json_success();
            } else if ($delete) {
                if ($post_id) { //delete term from post
                    wp_remove_object_terms($post_id, $term_id, 'ndpi_' . $taxonomy);
                } else { // delte term
                    wp_delete_term($term_id, 'ndpi_' . $taxonomy);
                }
                wp_send_json_success();
            } else {
                $add_taxonomy = wp_update_term(
                    $term_id,   // the term 
                    'ndpi_' . $taxonomy, // the taxonomy 
                    array(
                        'name' => $label,
                    )
                );

                if (!is_wp_error($add_taxonomy)) {
                    update_term_meta($term_id, 'color', $color);
                    update_term_meta($term_id, 'bg_color', $bg_color);

                    if ($icon) {
                        update_term_meta($term_id, 'icon', $icon);
                    } else {
                        delete_term_meta($term_id, 'icon');
                    }

                    if ( $taxonomy == 'extra_amount') { 
                        update_term_meta($term_id, 'val_type', $val_type);
                        update_term_meta($term_id, 'show', $show);
                    }

                    wp_send_json_success($term_id);
                } else {
                    wp_send_json_error();
                }
            }
        }
    }

    public function reorder_taxonomies($ids = array())
    {
        $i = 1;
        foreach ($ids as $id) :
            update_term_meta($id, 'tax_pos', $i);
            $i++;
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
