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
            if ( $tab == 'estimate_reminder' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {
                    $data['status'] = false;
                    $data['due_date'] = false; 
                    $data['before'] = [];
                    $data['after'] = [];
                    $data['time'] = '';
                    $data['timezone'] = '';
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
                    $data['time'] = '';
                    $data['timezone'] = '';
                }
            }

            if ( $tab == 'email_estimate_default' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = '{company_name} sent you a Estimate #{id}';
                    $data['msg'] = 'Hi <b>{client_name}</b>,
Please find attached Estimate #{id}. Due Date was {due_date}.

Estimate No: #{id}
Estimate Date: {date}
Due Date: {due_date}
Amount: {amount}

Thank you for your business.

Regards,
{company_name}';
                }
            }

            if ( $tab == 'email_estimate_reminder' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = '{company_name} sent you a reminder of Estimate #{id}';
                    $data['msg'] = 'Hi <b>{client_name}</b>,
Please find attached Estimate #{id}. Due Date was {due_date}.

Estimate No: #{id}
Estimate Date: {date}
Due Date: {due_date}
Amount: {amount}

Thank you for your business.

Regards,
{company_name}';
                }
            }

            if ( $tab == 'email_invoice_default' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = '{company_name} sent you a Invoice #{id}';
                    $data['msg'] = 'Hi <b>{client_name}</b>,
Please find attached Invoice #{id}. Due Date was {due_date}.

Invoice No: #{id}
Invoice Date: {date}
Due Date: {due_date}
Due Amount: {amount}

Thank you for your business.

Regards,
{company_name}';
                }
            }

            if ( $tab == 'email_invoice_reminder' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = '{company_name} sent you a reminder of Invoice #{id}';
                    $data['msg'] = 'Hi <b>{client_name}</b>,
Please find attached Invoice #{id}. Due Date was {due_date}.

Invoice No: #{id}
Invoice Date: {date}
Due Date: {due_date}
Due Amount: {amount}

Thank you for your business.

Regards,
{company_name}';
                }
            }

            if ( $tab == 'email_invoice_recurring' ) {
                $option = get_option('ncpi_' . $tab);

                if ( $option ) {
                    $data = $option;
                } else {  
                    $data['subject'] = '{company_name} sent you a recurring of Invoice #{id}';
                    $data['msg'] = 'Hi <b>{client_name}</b>,
Please find attached Invoice #{id}. Due Date was {due_date}.

Invoice No: #{id}
Invoice Date: {date}
Due Date: {due_date}
Due Amount: {amount}

Thank you for your business.

Regards,
{company_name}';
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
            if ( $tab == 'estimate_reminder' || $tab == 'invoice_reminder' ) {
                //TODO: sanitization 
                $data['status'] = isset( $params['status'] ) ? rest_sanitize_boolean( $params['status'] ) : null;
                $data['due_date'] = isset( $params['due_date'] ) ? ( $params['due_date'] ) : null;
                $data['before'] = isset( $params['before'] ) ? ( $params['before'] ) : null;
                $data['after'] = isset( $params['after'] ) ? ( $params['after'] ) : null;
                $data['time'] = isset( $params['time'] ) ? ( $params['time'] ) : null;
                $data['timezone'] = isset( $params['timezone'] ) ? ( $params['timezone'] ) : null; 

                $option = update_option('ncpi_' . $tab , $data);                 
            }

            if ( $tab == 'email_reminder' ) { 
                //TODO: sanitization 
                $data['subject'] = isset( $params['subject'] ) ? ( $params['subject'] ) : null;
                $data['msg'] = isset( $params['msg'] ) ? ( $params['msg'] ) : null; 

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
