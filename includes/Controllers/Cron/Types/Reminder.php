<?php

namespace Ncpi\Controllers\Cron\Types;

use Ncpi\Helpers\Fns;
use WP_Query;

class Reminder {

    public function __construct()
    {
        // add_action('ncpi_one_minute_event', [$this, 'handle_event']);
        // add_action('ncpi_half_minute_event', [$this, 'handle_event']);
        // add_action('ncpi_hourly_event', [$this, 'handle_event']);
    } 

    /**
     * Run schedule every specific time
     * Check if any reminder on
     * Check if reminder not reached limit
     * Add history if reminder sent
     */
    public function handle_event()
    {  
        $args = array(
            'post_type' => 'ncpi_estvoice',
            'post_status' => 'publish',
            'posts_per_page' => -1, 
        );  

        $query = new WP_Query($args); 

        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $reminder = get_post_meta($id, 'reminder', true); 
            if ( $reminder ) { 
                // $reminderData = $reminder;  

                $sent_mail = false;               

                $reminder_history = get_post_meta($id, 'reminder_history', true);
                $sent_mail = true;  
                if ( $sent_mail ) {
                    
                    //sent mail
                    $this->sent_email($id);
                    
                }
            }
        }
        wp_reset_postdata(); 
    }

    public function sent_email($id)
    {   
        $from_id = get_post_meta($id, 'from', true);  
        $fromMeta = get_post_meta($from_id); 
        
        //TODO: sent to by name or company setting
        $compnay_name = isset($fromMeta['company_name']) ? $fromMeta['company_name'][0] : '';
        $mail_from = isset($fromMeta['email']) ? $fromMeta['email'][0] : '';

        $to_id = get_post_meta($id, 'to', true); 
        $to_obj = get_user_by('id', $to_id); 

        $mail_to = $to_obj->user_email;
        //TODO: sent to by name or company setting
        $client_name = $to_obj->first_name;
 
        $path = get_post_meta($id, 'path', true); 

        $mail_subject = 'Test reminder subject ' . $path . $id;
        // $msg = isset($params['msg']) ? nl2br($params['msg']) : '';   
        $msg = 'Test reminder msg';          

        $token = get_post_meta($id, 'token', true);
        $invoice_url = sprintf(
            '%s?id=%s&token=%s',
            Fns::client_page_url($path),
            $id,
            $token
        );

        $subject = Fns::templateVariable($mail_subject, $compnay_name, $client_name, $id, $invoice_url);
        $template = ncpi()->render('email/invoice', [], true);
        $body = Fns::templateVariable($template, $compnay_name, $client_name, $id, $invoice_url, $msg, $path);

        
        $headers = array('Content-Type: text/html; charset=UTF-8');
        $headers[] = 'From: ' . $compnay_name . ' <' . $mail_from . '>';
        //TODO: dynamic Cc later
        // $headers[] = 'Cc: Rakib <rakib@wordpress.org>';
        // $headers[] = 'Cc: iluvwp@wordpress.org'; // note you can just use a simple email address

        //attachment
        $attachments = []; 
        $send_mail = wp_mail($mail_to, $subject, $body, $headers, $attachments);

        if ( $send_mail ) {
            $reminder_history = get_post_meta($id, 'reminder_history', true);
            if ( $reminder_history ) {
                $reminder_history[] = [
                    'date_time' => '',
                    // 'time' => current_datetime(), its full object
                    'time_zone' => ''
                ];  
                update_post_meta($id, 'reminder_history', $reminder_history);
            } else {
                $reminder_history = [
                    'date_time' => '',
                    // 'time' => current_datetime(),
                    'time_zone' => ''
                ]; 
                update_post_meta($id, 'reminder_history', $reminder_history);
            }
        }   
    } 
    
}
