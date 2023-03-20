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

    public function set_user_if_not( $post_id, $name = '', $email = '', $client_portal = false )
    {  
        $user_id = email_exists( $email );
        
        if ( !$user_id ) {
            $random_password = wp_generate_password( $length = 12, $include_standard_special_chars = false );
            $user_id = wp_create_user( $name, $random_password, $email );
            $user_id_role = new \WP_User($user_id);
            $user_id_role->set_role('ndpv_client_role');    
            
            $type = get_post_type($post_id) == "ndpv_person" ? "person" : "org";
            update_user_meta($user_id, 'ndpv_client_id', $post_id);
            update_user_meta($user_id, 'ndpv_client_type', $type);
        } 

        update_user_meta($user_id, 'ndpv_client_portal', $client_portal);
        
        return $user_id;        
    }
 
}