<?php

namespace Ncpi\Controllers\Api\Types; 

class Setting {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'ncpi/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get' ],
            'permission_callback' => [ $this, 'get_permission' ]
        ] );

        register_rest_route( 'ncpi/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [ $this, 'create' ],
            'permission_callback' => [ $this, 'create_permission' ]
        ] );
    }

    public function get($req) {
        $params = $req->get_params(); 
        $reg_errors = new \WP_Error;  

        $tab = isset( $params['tab'] ) ? sanitize_text_field( $params['tab'] ) : null;  

        if ( empty( $tab ) ) {
            $reg_errors->add('field', esc_html__('Tab is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else {
            $data = [];

            if ( $tab == 'general_social' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['social'] = [
                        [
                            'id' => 'facebook',
                            'label' => 'Facebook',
                            'desc' => '',
                            'icon_url' => '',
                            'url' => '',
                        ],
                        [
                            'id' => 'twitter',
                            'label' => 'Twitter',
                            'desc' => '',
                            'icon_url' => '',
                            'url' => '',
                        ],
                        [
                            'id' => 'linkedin',
                            'label' => 'Linkedin',
                            'desc' => '',
                            'icon_url' => '',
                            'url' => '',
                        ],
                    ]; 
                }
            }

            if ( $tab == 'estimate_reminder' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {
                    $data['status'] = false;
                    $data['due_date'] = false; 
                    $data['before'] = [];
                    $data['after'] = []; 
                }
            }

            if ( $tab == 'invoice_reminder' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {
                    $data['status'] = false;
                    $data['due_date'] = false; 
                    $data['before'] = [];
                    $data['after'] = [];
                }
            }

            if ( $tab == 'email_estimate_default' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ncpi()->get_default('email_template', 'estimate', 'default', 'subject');
                    $data['msg'] = ncpi()->get_default('email_template', 'estimate', 'default', 'msg'); 
                }
            }

            if ( $tab == 'email_estimate_reminder' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ncpip()->get_default('email_template', 'estimate', 'reminder', 'subject');
                    $data['msg'] = ncpip()->get_default('email_template', 'estimate', 'reminder', 'msg');
                }
            }

            if ( $tab == 'email_invoice_default' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ncpi()->get_default('email_template', 'invoice', 'default', 'subject');
                    $data['msg'] = ncpi()->get_default('email_template', 'invoice', 'default', 'msg');
                }
            }

            if ( $tab == 'email_invoice_reminder' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ncpip()->get_default('email_template', 'invoice', 'reminder', 'subject');
                    $data['msg'] = ncpip()->get_default('email_template', 'invoice', 'reminder', 'msg');
                }
            }

            if ( $tab == 'email_invoice_recurring' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ncpip()->get_default('email_template', 'invoice', 'recurring', 'subject');
                    $data['msg'] = ncpip()->get_default('email_template', 'invoice', 'recurring', 'msg');
                }
            }

            wp_send_json_success($data);
        }
    } 

    public function create($req)
    {
        $params = $req->get_params(); 
        $reg_errors = new \WP_Error;  

        $tab = isset( $params['tab'] ) ? sanitize_text_field( $params['tab'] ) : null;  

        if ( empty( $tab ) ) {
            $reg_errors->add('field', esc_html__('Tab is missing', 'propovoice'));
        } 

        if ( $reg_errors->get_error_messages() ) {
            wp_send_json_error($reg_errors->get_error_messages());
        } else { 
            $data = [];

            if ( $tab == 'general_social' ) {
                //TODO: sanitization  
                $data['social'] = isset( $params['social'] ) ? ( $params['social'] ) : null; 

                $option = update_option('ncpi_' . $tab , $data);                 
            }

            if ( $tab == 'estimate_reminder' || $tab == 'invoice_reminder' ) {
                //TODO: sanitization 
                $data['status'] = isset( $params['status'] ) ? rest_sanitize_boolean( $params['status'] ) : null;
                $data['due_date'] = isset( $params['due_date'] ) ? ( $params['due_date'] ) : null;
                $data['before'] = isset( $params['before'] ) ? ( $params['before'] ) : null;
                $data['after'] = isset( $params['after'] ) ? ( $params['after'] ) : null; 

                $option = update_option('ncpi_' . $tab , $data);                 
            }

            if ( $tab == 'email_estimate_default' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ncpi_' . $tab, $data);                 
            }

            if ( $tab == 'email_estimate_reminder' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ncpi_' . $tab, $data);                 
            }

            if ( $tab == 'email_invoice_default' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ncpi_' . $tab, $data);                 
            }

            if ( $tab == 'email_invoice_reminder' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ncpi_' . $tab, $data);                 
            }

            if ( $tab == 'email_invoice_recurring' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ncpi_' . $tab, $data);                 
            }

            wp_send_json_success();
        }
    }

    public function get_permission() {
        return true;
    }

    public function create_permission() {
        return current_user_can( 'publish_posts' );
    } 
   
} 
