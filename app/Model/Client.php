<?php
namespace Ndpv\Model; 

class Client {

    public function total( $id = null )
    { 

        $args = array(
            'post_type' => ['ndpv_person', 'ndpv_org'],
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

    public function set_user_if_not( $name = '', $email = '' )
    {  
        $user_id = email_exists( $email );
        if ( !$user_id ) {
            $random_password = wp_generate_password( $length = 12, $include_standard_special_chars = false );
            $user_id = wp_create_user( $name, $random_password, $email );
            $user_id_role = new \WP_User($user_id);
            $user_id_role->set_role('ndpv_client_role');
            return $user_id;
        } else {
            return $user_id;
        }
        
    }
 
}