<?php

namespace Ncpi\Controllers\Api\Types;

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
        $request = $req->get_params(); 

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

        return wp_send_json_success(['summary' => $summary ]); 
    }

    // check permission
    public function get_permission()
    {
        return true;
    }
}
