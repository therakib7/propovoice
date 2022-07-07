<?php

namespace Ncpi\Ctrls\Api\Types;

use Ncpi\Helpers\Fns;
use WP_Query;

class Dashbaord
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {
        register_rest_route('ncpi/v1', '/dashboard', [
            [
                'methods' => 'GET', 
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_permission'], 
            ]
        ]);   
    }

    public function get( $req )
    {
        $params = $req->get_params(); 

        if ( $params['section'] == 'summary' ) {
            $this->summary( $params );
        } 

        if ( $params['section'] == 'deal_funnel' ) {
            $this->deal_funnel( $params );
        } 
        
    }

    public function summary( $params ) {
        $total_client = 0;
        $total_estimate = 0;
        $accepted_estimate = 0; 
        $total_invoice = 0;
        $paid_invoice = 0; 

        $args = array(
            'number' => -1,  
            'orderby' => 'registered',
            'order'   => 'DESC'
        );

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        $args['meta_query'][] = array( 
            array(
                'key'     => 'ncpi_member',
                'value'   => '1',
                'compare' => 'LIKE'
            )
        );    

        $all_users = new \WP_User_Query( $args );
        $total_users = $all_users->get_total(); //use this for pagination 
        if ( $total_users ) {
            $total_client = $total_users;
        }

        $args = array( 
            'post_type' => 'ncpi_estvoice',
            'post_status' => 'publish',
            'posts_per_page' => -1,  
        );   
        $query = new WP_Query( $args );  
        while ( $query->have_posts() ) {
            $query->the_post();
            $id = get_the_ID();  

            $path = get_post_meta($id, 'path', true);
            $status = get_post_meta($id, 'status', true);

            if ( $path == 'estimate' ) {
                $total_estimate++;
                if ( $status == 'accept' ) {
                    $accepted_estimate++; 
                }  
            } else if ( $path == 'invoice' ) {
                $total_invoice++;
                if ( $status == 'paid' ) {
                    $paid_invoice++; 
                }  
            }
        } 
        wp_reset_postdata();  

        $summary = [];
        $summary['total_client'] = $total_client;
        $summary['total_estimate'] = $total_estimate;
        $summary['accepted_estimate'] = $accepted_estimate;
        $summary['total_invoice'] = $total_invoice;
        $summary['paid_invoice'] = $paid_invoice;

        wp_send_json_success($summary); 
    }

    public function deal_funnel(  $params ) { 

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
        $total_stage = count( $get_stage ) - 2;

        $item_width = 100;
        $minus_width = 100 / $total_stage;

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

            $query = new WP_Query($args);
            $total_data = $query->found_posts; //use this for pagination  

            $type = get_term_meta($stage_id, 'type', true);

            $width = '';

            if ( $type != 'won' || $type != 'lost' ) {
                if ( $item_width < 32 ) {
                    $item_width = 32;
                }
                $width = $item_width . '%';
                $item_width -= $minus_width;
            }

            $stage_single = [ 
                'name' => $stage_name, 
                'color' => get_term_meta($stage_id, 'color', true),
                'bg_color' => get_term_meta($stage_id, 'bg_color', true),
                'type' => $type,
                'width' => $width,
                'items' => $total_data
            ];  

            if ( $type == 'won' ) {
                $column['won'] = $stage_single;
            } else if ( $type == 'lost' ) {
                $column['lost'] = $stage_single;
            } else {
                $column['common'][] = $stage_single;
            }
        endforeach;

        wp_send_json_success($column);
    }

    public function deal_tracking() {
         
    }

    public function lead_level() {
         
    }

    public function lead_source() {
         
    }

    public function estvoice() {
         
    }

    // check permission
    public function get_permission()
    {
        return true;
    }
}
