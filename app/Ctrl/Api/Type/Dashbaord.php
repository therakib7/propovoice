<?php

namespace Ndpi\Ctrl\Api\Type;

use Ndpi\Helper\Fns;
use Ndpi\Model\Client;
use Ndpi\Model\Deal;
use Ndpi\Model\Lead;
use Ndpi\Model\Project; 

class Dashbaord
{

    public $months = array(1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr', 5 => 'May', 6 => 'Jun', 7 => 'Jul', 8 => 'Aug', 9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dec');

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'rest_routes']);
    }

    public function rest_routes()
    {
        register_rest_route('ndpi/v1', '/dashboard', [
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

        if ($params['section'] == 'summary') {
            $this->summary($params);
        }

        if ($params['section'] == 'deal_tracking') {
            $this->deal_tracking($params);
        }

        if ($params['section'] == 'deal_funnel') {
            $this->deal_funnel($params);
        }

        if ($params['section'] == 'lead_level' || $params['section'] == 'lead_source') {
            $this->lead_level_source($params);
        }

        if ($params['section'] == 'estimate' || $params['section'] == 'invoice') {
            $this->estvoice($params['section']);
        }
    }

    public function summary($params)
    {
        $total_estimate = 0;
        $accepted_estimate = 0;
        $total_invoice = 0;
        $paid_invoice = 0;

        $summary = [];
        $client = new Client();
        $lead = new Lead();
        $deal = new Deal();
        $project = new Project();
        $summary['total_client'] = $client->total();
        $summary['total_lead'] = $lead->total();
        $summary['total_deal'] = $deal->total();
        $summary['total_project'] = $project->total();

        $args = array(
            'post_type' => 'ncpi_estvoice',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        );
        $query = new \WP_Query($args);
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $path = get_post_meta($id, 'path', true);
            $status = get_post_meta($id, 'status', true);

            if ($path == 'estimate') {
                $total_estimate++;
                if ($status == 'accept') {
                    $accepted_estimate++;
                }
            } else if ($path == 'invoice') {
                $total_invoice++;
                if ($status == 'paid') {
                    $paid_invoice++;
                }
            }
        }
        wp_reset_postdata();

        $summary['total_estimate'] = $total_estimate;
        $summary['accepted_estimate'] = $accepted_estimate;
        $summary['total_invoice'] = $total_invoice;
        $summary['paid_invoice'] = $paid_invoice;


        wp_send_json_success($summary);
    }

    public function deal_funnel($params)
    {

        $per_page = 10;
        $offset = 0;

        if (isset($params['per_page'])) {
            $per_page = $params['per_page'];
        }

        if (isset($params['page']) && $params['page'] > 1) {
            $offset = ($per_page * $params['page']) - $per_page;
        }

        $get_stage = Fns::get_terms('deal_stage');

        $column = [];
        $total_stage = count($get_stage) - 2;

        $item_percent = 100;
        $minus_percent = 100 / $total_stage;

        foreach ($get_stage as $stage) :
            $stage_id = $stage->term_id;
            $stage_name = $stage->name;

            $items = [];
            $args = array(
                'post_type' => 'ndpi_deal',
                'post_status' => 'publish',
                'orderby' => 'menu_order',
                'order' => 'ASC',
                'posts_per_page' => $per_page,
                'offset' => $offset,
            );

            $args['meta_query'] = array(
                'relation' => 'OR'
            );

            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'ndpi_deal_stage',
                    'terms' => $stage_id,
                    'field' => 'term_id',
                )
            );

            $query = new \WP_Query($args);
            $total_data = $query->found_posts; //use this for pagination  

            $type = get_term_meta($stage_id, 'type', true);

            $percent = '';

            if ($type != 'won' || $type != 'lost') {
                if ($item_percent < 35) {
                    $item_percent = 35;
                }
                $percent = $item_percent . '%';
                $item_percent -= $minus_percent;
            }

            $bg_color = get_term_meta($stage_id, 'bg_color', true);
            $color = get_term_meta($stage_id, 'color', true);
            $stage_single = [
                'name' => $stage_name,
                'color' => $color ? $color : '#fff',
                'bg_color' => $bg_color ? $bg_color : '#345bde',
                'type' => $type,
                'percent' => $percent,
                'items' => $total_data
            ];

            if ($type == 'won') {
                $column['won'] = $stage_single;
            } else if ($type == 'lost') {
                $column['lost'] = $stage_single;
            } else {
                $column['common'][] = $stage_single;
            }
        endforeach;

        wp_send_json_success($column);
    }

    public function deal_tracking()
    {
        $data = [];

        for ($i = 0; $i < 12; $i++) {
            $data[] = [
                'name' => $this->months[$i + 1],
                'Won' => 0,
                'Lost' => 0,
            ];
        }

        $args = array(
            'post_type' => 'ndpi_deal',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        );
        $query = new \WP_Query($args);
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $query_data['stage_id'] = '';
            $stage = get_the_terms($id, 'ndpi_deal_stage');
            if ($stage) {
                $month_num = ((int) get_the_time('m')) - 1;
                $type = get_term_meta($stage[0]->term_id, 'type', true);
                if ($type == 'won') {
                    $data[$month_num]['Won']++;
                }

                if ($type == 'lost') {
                    $data[$month_num]['Lost']++;
                }
            }
        }
        wp_reset_postdata();

        wp_send_json_success($data);
    }

    public function lead_level_source($params)
    {

        $per_page = 10;
        $offset = 0;

        if (isset($params['per_page'])) {
            $per_page = $params['per_page'];
        }

        if (isset($params['page']) && $params['page'] > 1) {
            $offset = ($per_page * $params['page']) - $per_page;
        }

        $get_tax = Fns::get_terms($params['section']);

        $column = [];
        $total_posts = 0;
        foreach ($get_tax as $tax) :
            $tax_id = $tax->term_id;
            $tax_name = $tax->name;

            $args = array(
                'post_type' => 'ndpi_lead',
                'post_status' => 'publish',
                'orderby' => 'menu_order',
                'order' => 'ASC',
                'posts_per_page' => $per_page,
                'offset' => $offset,
            );
            $args['meta_query'] = array(
                'relation' => 'OR'
            );
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'ndpi_' . $params['section'],
                    'terms' => $tax_id,
                    'field' => 'term_id',
                )
            );

            $query = new \WP_Query($args);
            $total_data = $query->found_posts; //use this for pagination    
            $total_posts += $total_data; //use this for pagination    

            $bg_color = get_term_meta($tax_id, 'bg_color', true);
            $tax_single = [
                'name' => $tax_name,
                'bg_color' => $bg_color ? $bg_color : '#B9C7FF',
                'item' => $total_data,
                'percent' => 0
            ];

            $column[] = $tax_single;
        endforeach;

        $column_with_percent = [];
        foreach ($column as $col) {
            $col['percent'] = round(($col['item'] / $total_posts) * 100);
            $column_with_percent[] = $col;
        }

        wp_send_json_success($column_with_percent);
    }

    public function estvoice($type)
    {
        $data = [];

        for ($i = 0; $i < 12; $i++) {
            if ($type == 'estimate') {
                $data[$i] = [
                    'name' => $this->months[$i + 1],
                    'Sent' => 0,
                    'Viewed' => 0,
                    'Accepted' => 0,
                    'Declined' => 0,
                ];
            } else if ($type == 'invoice') {
                $data[$i] = [
                    'name' => $this->months[$i + 1],
                    'Sent' => 0,
                    'Viewed' => 0,
                    'Paid' => 0,
                    'Overdue' => 0,
                ];
            }
        }

        $args = array(
            'post_type' => 'ncpi_estvoice',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        );
        $query = new \WP_Query($args);
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $path = get_post_meta($id, 'path', true);
            $status = get_post_meta($id, 'status', true);

            $month_num = ((int) get_the_time('m')) - 1;
            if ($type == 'estimate' && $path == 'estimate') {
                if ($status == 'accept') {
                    $data[$month_num]['Accepted']++;
                }

                if ($status == 'decline') {
                    $data[$month_num]['Declined']++;
                }
            } else if ($type == 'invoice' && $path == 'invoice') {
                if ($status == 'paid') {
                    $data[$month_num]['Paid']++;
                }
            }
        }
        wp_reset_postdata();

        wp_send_json_success($data);
    }

    // check permission
    public function get_permission()
    {
        return true;
    }
}
