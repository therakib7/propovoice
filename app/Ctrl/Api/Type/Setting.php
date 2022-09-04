<?php 
namespace Ndpv\Ctrl\Api\Type; 

class Setting {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'rest_routes' ] );
    }

    public function rest_routes() {
        register_rest_route( 'ndpv/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'get' ],
            'permission_callback' => [ $this, 'get_permission' ]
        ] );

        register_rest_route( 'ndpv/v1', '/settings', [
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

            if ( $tab == 'email_social' ) {
                $option = get_option('ndpv_' . $tab);

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

            if ( $tab == 'estinv_currency' ) {
                $option = get_option('ndpv_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {
                    $data['currency'] = 'USD';
                    $data['currency_pos'] = 1;  
                }
            }

            if ( $tab == 'estimate_reminder' ) {
                $option = get_option('ndpv_' . $tab);

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
                $option = get_option('ndpv_' . $tab);

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
                $option = get_option('ndpv_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ndpv()->get_default('email_template', 'estimate', 'default', 'subject');
                    $data['msg'] = ndpv()->get_default('email_template', 'estimate', 'default', 'msg'); 
                }
            }

            if ( $tab == 'email_estimate_reminder' ) {
                $option = get_option('ndpv_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ndpv()->get_default('email_template', 'estimate', 'reminder', 'subject');
                    $data['msg'] = ndpv()->get_default('email_template', 'estimate', 'reminder', 'msg');
                }
            }

            if ( $tab == 'email_invoice_default' ) {
                $option = get_option('ndpv_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ndpv()->get_default('email_template', 'invoice', 'default', 'subject');
                    $data['msg'] = ndpv()->get_default('email_template', 'invoice', 'default', 'msg');
                }
            }

            if ( $tab == 'email_invoice_reminder' ) {
                $option = get_option('ndpv_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ndpv()->get_default('email_template', 'invoice', 'reminder', 'subject');
                    $data['msg'] = ndpv()->get_default('email_template', 'invoice', 'reminder', 'msg');
                }
            }

            if ( $tab == 'email_invoice_recurring' ) {
                $option = get_option('ndpv_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = ndpv()->get_default('email_template', 'invoice', 'recurring', 'subject');
                    $data['msg'] = ndpv()->get_default('email_template', 'invoice', 'recurring', 'msg');
                }
            }

            if ( $tab == 'estvoice_tax' ) {
                $option = get_option('ndpv_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['item_tax'] = false;
                    // $data['item_tax_val_type'] = 'fixed';
                }
            }

            if ( $tab == 'smtp_other' ) {
                $option = get_option('ndpv_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['host'] = '';
                    $data['port'] = '';
                    $data['secure'] = '';
                    $data['auth'] = false;
                    $data['user'] = '';
                    $data['pass'] = '';
                }
            }

            if ( $tab == 'smtp_sendinblue' ) {
                $option = get_option('ndpv_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['key'] = '';
                    $data['web'] = '';
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

            if ( $tab == 'email_social' ) {
                //TODO: sanitization  
                $data['social'] = isset( $params['social'] ) ? ( $params['social'] ) : null; 

                $option = update_option('ndpv_' . $tab , $data);                 
            }

            if ( $tab == 'estinv_currency' ) { 
                $data['currency'] = isset( $params['currency'] ) ? sanitize_text_field( $params['currency'] ) : null;
                $data['currency_pos'] = isset( $params['currency_pos'] ) ? absint( $params['currency_pos'] ) : null; 
                $option = update_option('ndpv_' . $tab , $data);                 
            }

            if ( $tab == 'estimate_reminder' || $tab == 'invoice_reminder' ) {
                //TODO: sanitization 
                $data['status'] = isset( $params['status'] ) ? rest_sanitize_boolean( $params['status'] ) : null;
                $data['due_date'] = isset( $params['due_date'] ) ? ( $params['due_date'] ) : null;
                $data['before'] = isset( $params['before'] ) ? ( $params['before'] ) : null;
                $data['after'] = isset( $params['after'] ) ? ( $params['after'] ) : null; 

                $option = update_option('ndpv_' . $tab , $data);                 
            }

            if ( $tab == 'email_estimate_default' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ndpv_' . $tab, $data);                 
            }

            if ( $tab == 'email_estimate_reminder' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ndpv_' . $tab, $data);                 
            }

            if ( $tab == 'email_invoice_default' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ndpv_' . $tab, $data);                 
            }

            if ( $tab == 'email_invoice_reminder' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ndpv_' . $tab, $data);                 
            }

            if ( $tab == 'email_invoice_recurring' ) {  
                $data['subject'] = isset( $params['subject'] ) ? sanitize_text_field( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? sanitize_textarea_field( $params['msg'] ) : null;  
                $option = update_option('ndpv_' . $tab, $data);                 
            }

            if ( $tab == 'estvoice_tax' ) {  
                $data['item_tax'] = isset( $params['item_tax'] ) ? rest_sanitize_boolean( $params['item_tax'] ) : null;
                // $data['item_tax_val_type'] = isset( $params['item_tax_val_type'] ) ? sanitize_textarea_field( $params['item_tax_val_type'] ) : null;  
                $option = update_option('ndpv_' . $tab, $data);                 
            }

            if ( $tab == 'smtp_default' ) {                   
                update_option('ndpv_smtp', null);                 
            }

            if ( $tab == 'smtp_other' ) {   
                $data['host'] = isset( $params['host'] ) ? sanitize_text_field( $params['host'] ) : null;
                $data['port'] = isset( $params['port'] ) ? absint( $params['port'] ) : null;  
                $data['secure'] = isset( $params['secure'] ) ? sanitize_text_field( $params['secure'] ) : null;
                $data['auth'] = isset( $params['auth'] ) ? rest_sanitize_boolean( $params['auth'] ) : null;
                $data['user'] = isset( $params['user'] ) ? sanitize_text_field( $params['user'] ) : null;
                $data['pass'] = isset( $params['pass'] ) ? sanitize_text_field( $params['pass'] ) : null;
                update_option('ndpv_' . $tab, $data);                 
                update_option('ndpv_smtp', 'other');                 
            }

            if ( $tab == 'smtp_sendinblue' ) {  
                //Check valid key here
                $data['key'] = isset( $params['key'] ) ? sanitize_text_field( $params['key'] ) : null;
                $data['web'] = isset( $params['web'] ) ? esc_url_raw( $params['web'] ) : null;  
                update_option('ndpv_' . $tab, $data);   
                update_option('ndpv_smtp', 'sendinblue');                 
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
