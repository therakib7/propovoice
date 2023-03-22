<?php
namespace Ndpv\Model;

use Ndpv\Helper\Fns;

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
            $password = wp_generate_password( $length = 12, $include_standard_special_chars = false );
            $user_id = wp_create_user( $name, $password, $email );
            $user_id_role = new \WP_User($user_id);
            $user_id_role->set_role('ndpv_client_role');    
            
            $type = get_post_type($post_id) == "ndpv_person" ? "person" : "org";
            update_user_meta($user_id, 'ndpv_client_id', $post_id);
            update_user_meta($user_id, 'ndpv_client_type', $type);

            //sent mail
            $data = [];

            $option = get_option('ndpv_email_client_portal_password');
            if ($option) {
                $data = $option;
            } else {
                $data['subject'] = ndpv()->get_default('email_template', 'client_portal', 'password', 'subject');
                $data['msg'] = ndpv()->get_default('email_template', 'client_portal', 'password', 'msg');
            }

            $mail_subject = $data['subject'];
            $msg = nl2br($data['msg']);

            $business = new Business();
            $business_info = $business->info();
            $org_name = $business_info['name'];
            $org_email = $business_info['email'];
            $client_name = $name;
            $permalink = Fns::client_page_url("workspace");
            $login_url =  "<a href='$permalink'>$permalink</a>";

            $subject = $this->templ_variable($mail_subject, [
                "org_name" => $org_name,
            ]);
            $template = ndpv()->render("email/password", [], true); 
            $template = str_replace( '{msg}', $msg, $template );            
            $body = $this->templ_variable($template, [
                "org_name" => $org_name,
                "client_name" => $client_name,
                "login_url" => $login_url,
                "email" => $email,
                "password" => $password,
            ]);
 
            $headers = ["Content-Type: text/html; charset=UTF-8"];
            $headers[] = "From: " . $org_name . " <" . $org_email . ">";  
            $send_mail = wp_mail($email, $subject, $body, $headers, []);

            if ($send_mail) {
                //wp_send_json_success($send_mail);
            } else {
                //wp_send_json_error(["Something wrong: Email not sent"]);
            }
        } 

        update_user_meta($user_id, 'ndpv_client_portal', $client_portal);
        
        return $user_id;        
    }

    private function templ_variable( $string, $array = [] ) {
        $org_name = isset($array['org_name']) ? $array['org_name'] : '';
        $client_name = isset($array['client_name']) ? $array['client_name'] : '';
        $login_url = isset($array['login_url']) ? $array['login_url'] : '';
        $email = isset($array['email']) ? $array['email'] : '';
        $password = isset($array['password']) ? $array['password'] : '';
        return str_replace(
            array( 
                '{org_name}', 
                '{client_name}', 
                '{login_url}', 
                '{email}', 
                '{password}'
            ),
            array( 
                $org_name, 
                $client_name, 
                $login_url, 
                $email, 
                $password 
            ),
            $string
        );
    }
 
}