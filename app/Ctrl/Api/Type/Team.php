<?php

namespace Ndpv\Ctrl\Api\Type;

use Ndpv\Helper\Fns;
use Ndpv\Model\Contact;
use Ndpv\Model\Org;
use Ndpv\Model\Person;

class Team
{
    public function __construct()
    {
        add_action("rest_api_init", [$this, "rest_routes"]);
    }

    public function rest_routes()
    {
        register_rest_route("ndpv/v1", "/teams", [
            [
                "methods" => "GET",
                "callback" => [$this, "get"],
                "permission_callback" => [$this, "get_per"],
            ],
            [
                "methods" => "POST",
                "callback" => [$this, "create"],
                "permission_callback" => [$this, "create_per"],
            ],
        ]);

        register_rest_route("ndpv/v1", "/teams/(?P<id>\d+)", [
            "methods" => "GET",
            "callback" => [$this, "get_single"],
            "permission_callback" => [$this, "get_per"],
            "args" => [
                "id" => [
                    "validate_callback" => function ($param, $request, $key) {
                        return is_numeric($param);
                    },
                ],
            ],
        ]);

        register_rest_route("ndpv/v1", "/teams/(?P<id>\d+)", [
            "methods" => "PUT",
            "callback" => [$this, "update"],
            "permission_callback" => [$this, "update_per"],
            "args" => [
                "id" => [
                    "validate_callback" => function ($param, $request, $key) {
                        return is_numeric($param);
                    },
                ],
            ],
        ]);

        register_rest_route("ndpv/v1", "/teams/(?P<id>[0-9,]+)", [
            "methods" => "DELETE",
            "callback" => [$this, "delete"],
            "permission_callback" => [$this, "del_per"],
            "args" => [
                "id" => [
                    "sanitize_callback" => "sanitize_text_field",
                ],
            ],
        ]);
    }

    public function get($req)
    {
        $param = $req->get_params();

        $per_page = 10;
        $offset = 0;

        $s = isset($param["text"]) ? sanitize_text_field($param["text"]) : null;

        if (isset($param["per_page"])) {
            $per_page = $param["per_page"];
        }

        if (isset($param["page"]) && $param["page"] > 1) {
            $offset = $per_page * $param["page"] - $per_page;
        }
        
        $result = $data = [];

        $users = get_users( array(
            'role__in' => array( 'ndpv_admin', 'ndpv_manager', 'ndpv_staff' )
        ) );

        $total_data = count($users);

        foreach ( $users as $user ) {
            $info = [];
            $info['id'] = $user->id; 
            $info['name'] = $user->display_name; 
            $info['img'] = Fns::gravatar($user->user_email); 
            $info['email'] = $user->user_email; 
            $info['role'] = reset($user->roles);  
           
            $user_data = new \WP_User($user->id);
            $allcaps = array_keys( array_filter( $user_data->allcaps ) );

            $info['caps'] = $allcaps; 
            $info['role_title'] = ucwords( str_replace( 'ndpv_', '', reset($user->roles) ) ); 
            $data[] = $info;
        }

        $result['result'] = $data;
        $result['total'] = $total_data;

        wp_send_json_success($result);
    }

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id = $url_params["id"];
        $query_data = [];
        $query_data["id"] = absint($id);

        $queryMeta = get_post_meta($id);
        $query_data["ws_id"] = isset($queryMeta["ws_id"])
            ? $queryMeta["ws_id"][0]
            : "";
        $query_data["tab_id"] = isset($queryMeta["tab_id"])
            ? absint($queryMeta["tab_id"][0])
            : "";

        $query_data["person"] = null;
        $person_id = isset($queryMeta["person_id"])
            ? $queryMeta["person_id"][0]
            : "";
        if ($person_id) {
            $person = new Person();
            $query_data["person"] = $person->single($person_id, true);
        }

        $query_data["org"] = null;
        $org_id = isset($queryMeta["org_id"]) ? $queryMeta["org_id"][0] : "";
        if ($org_id) {
            $org = new Org();
            $query_data["org"] = $org->single($org_id, true);
        }

        $query_data["date"] = get_the_time(get_option("date_format"));

        wp_send_json_success($query_data);
    }

    public function create($req)
    {
        $param = $req->get_params();
        $reg_errors = new \WP_Error();

        $name = isset($param["name"])
            ? sanitize_text_field($param["name"])
            : '';
        $email = isset($param["email"])
            ? sanitize_text_field($param["email"])
            : ''; 
        $role = isset($param["role"])
            ? sanitize_text_field($param["role"])
            : ''; 
        
        $caps = isset($param["caps"])
            ? array_map("sanitize_text_field", $param["caps"])
            : ''; 

        if (empty($name)) {
            $reg_errors->add(
                "name_field",
                esc_html__("Name is missing", "propovoice")
            );
        } 

        if (empty($email)) {
            $reg_errors->add(
                "email_field",
                esc_html__("Email is missing", "propovoice")
            );
        } 

        if ( !is_email($email) ) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        } 

         if ( empty($role) ) {
            $reg_errors->add(
                "role_field",
                esc_html__("Role is missing", "propovoice")
            );
        } 

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            $user_id = email_exists( $email );
        
            if ( !$user_id ) {
                $password = wp_generate_password( $length = 12, $include_standard_special_chars = false );
                $user_args = array (
                    'user_login'     => $email,
                    'user_pass'      => $password, 
                    'user_email'     => $email,
                    'first_name'     => $name,
                    'nickname'       => $name,
                    'display_name'   => $name
                );
                $user_id = wp_insert_user( $user_args); 
                $user_id_role = new \WP_User($user_id);
                $user_id_role->set_role($role);    
                

                Fns::password_mail( $name, $email, $password, 'team');
            } else {
                //check if already exist
                $user_data = new \WP_User($user_id);
                $user_roles = $user_data->roles;
                $check_roles = array( 'ndpv_admin', 'ndpv_manager', 'ndpv_staff' );
                $role_exist = false;
                foreach( $check_roles as $role ) {
                    if ( in_array($role, $user_roles) ) {
                        $role_exist = true;
                    }
                }
                if ( $role_exist ) {
                    wp_send_json_error(['Team already exist! Please edit team member']);
                }

                //if not asign new role
                $user_id_role = new \WP_User($user_id);
                $user_id_role->set_role($role);   

                Fns::password_mail( $name, $email, 'Use your old password', 'team');
            }

            $this->add_remove_user_caps($user_id, $caps);

            wp_send_json_success($user_id);
        }
    }

     public function update($req)
    {
        $param = $req->get_params();
        $reg_errors = new \WP_Error();

        $name = isset($param["name"])
            ? sanitize_text_field($param["name"])
            : '';
        $email = isset($param["email"])
            ? sanitize_text_field($param["email"])
            : ''; 
        $role = isset($param["role"])
            ? sanitize_text_field($param["role"])
            : ''; 
        $caps = isset($param["caps"])
            ? array_map("sanitize_text_field", $param["caps"])
            : ''; 

        if (empty($name)) {
            $reg_errors->add(
                "name_field",
                esc_html__("Name is missing", "propovoice")
            );
        } 

        if (empty($email)) {
            $reg_errors->add(
                "name_field",
                esc_html__("Email is missing", "propovoice")
            );
        } 

        if ( !is_email($email) ) {
            $reg_errors->add('email_invalid', esc_html__('Email id is not valid!', 'propovoice'));
        } 

        if ($reg_errors->get_error_messages()) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {

            $user_id = email_exists( $email );
        
            if ( !$user_id ) {
                $password = wp_generate_password( $length = 12, $include_standard_special_chars = false );
                $user_args = array (
                    'user_login'   => $email,
                    'user_pass'    => $password, 
                    'user_email'   => $email,
                    'first_name'   => $name,
                    'nickname'     => $name,
                    'display_name' => $name
                );

                $user_id = wp_insert_user( $user_args );
                 

                /* $send_mail = Fns::password_mail( $name, $email, $password);

                if ($send_mail) {
                    //wp_send_json_success($send_mail);
                } else {
                    //wp_send_json_error(["Something wrong: Email not sent"]);
                } */
            } 

            $user_id_role = new \WP_User($user_id);
            $user_id_role->set_role($role);  
            
            $this->add_remove_user_caps($user_id, $caps);

            wp_send_json_success($user_id);
        }
    }

    public function add_remove_user_caps($user_id, $caps)
    {
        $default_caps = [
            'ndpv_dashboard',
            'ndpv_lead',
            'ndpv_deal',
            'ndpv_estimate',
            'ndpv_invoice',
            'ndpv_client',
            'ndpv_project',
            'ndpv_contact'
        ];

        $user = new \WP_User($user_id);

        $test = [];
        foreach( $default_caps as $cap ) {
            if ( in_array($cap, $caps) ) {
                $user->add_cap($cap, true);
            } else {
                $user->add_cap($cap, false);
            }
        } 
        
    }

    public function delete($req)
    {
        //TODO: when delete lead delete task note file, if not exist in deal project
        $url_params = $req->get_url_params();
        $ids = explode(",", $url_params["id"]);
        foreach ($ids as $id) {
            $user_id_role = new \WP_User($id);
            $user_id_role->remove_role('ndpv_admin');  
            $user_id_role->remove_role('ndpv_manager');  
            $user_id_role->remove_role('ndpv_staff');   
            $user_id_role->set_role('subscriber');  
        }

        wp_send_json_success($ids);
    }

    // check permission
    public function get_per()
    {
        return current_user_can("administrator") || current_user_can("ndpv_admin") || current_user_can("ndpv_manager") || current_user_can("ndpv_staff");
    }

    public function create_per()
    {
        return current_user_can("administrator") || current_user_can("ndpv_admin") || current_user_can("ndpv_manager");
    }

    public function update_per()
    {
        return current_user_can("administrator") || current_user_can("ndpv_admin") || current_user_can("ndpv_manager");
    }

    public function del_per()
    {
        return current_user_can("administrator") || current_user_can("ndpv_admin") || current_user_can("ndpv_manager");
    }
}
