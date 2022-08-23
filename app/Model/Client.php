<?php
namespace Ndpi\Model; 

class Client {

    public function total( $id = null )
    { 

        $args = array(
            'post_type' => ['ndpi_person', 'ndpi_org'],
            'post_status' => 'publish',
            'posts_per_page' => -1 
        ); 

        $args['meta_query'] = array(
            'relation' => 'OR'
        );  

        $args['meta_query'][] = array(
            array(
                'key'     => 'is_client',
                'value'   => 1,
                'compare' => '=',
            )
        ); 

        $query = new \WP_Query($args);   
        $total_data = $query->found_posts; 
        wp_reset_postdata(); 

        return $total_data;
    }
 
}