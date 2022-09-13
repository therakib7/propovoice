<?php 
namespace Ndpv\Ctrl\Api\Type;

use Ndpv\Helper\Fns;

class Email
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'rest_routes']);
    }

    public function rest_routes()
    {

        register_rest_route('ndpv/v1', '/emails', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get'],
                'permission_callback' => [$this, 'get_permission'],
            ],
            [
                'methods' => 'POST',
                'callback' => [$this, 'create'],
                'permission_callback' => [$this, 'create_permission']
            ],
        ]);

        register_rest_route('ndpv/v1', '/emails/(?P<id>\d+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_single'],
            'permission_callback' => [$this, 'get_permission'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function ($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
        ));

        register_rest_route('ndpv/v1', '/emails/(?P<id>[0-9,]+)', array(
            'methods' => 'DELETE',
            'callback' => [$this, 'delete'],
            'permission_callback' => [$this, 'delete_permission'],
            'args' => array(
                'id' => array(
                    'sanitize_callback'  => 'sanitize_text_field',
                ),
            ),
        ));
    }

    public function get($req)
    {
        $request = $req->get_params();
 

        wp_send_json_success();
    }

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id    = $url_params['id']; 
        wp_send_json_success();
    } 

    public function create($req)
    {
        $params = $req->get_params();
        $type = isset($params['type']) ? $params['type'] : '';
        if ($type == 'sent') {
            $this->sent($params);
        } else if ($type == 'feedback') {
            $this->feedback($params);
        } else if ($type == 'dashboard') {
            $this->dashboard($params);
        }
    }

    public function sent($params)
    {
        $mail_from = isset($params['fromData']) ? $params['fromData']['email'] : '';
        $mail_to = isset($params['toData']) ? $params['toData']['email'] : '';
        $invoice_id = isset($params['invoice_id']) ? $params['invoice_id'] : '';
        $path = isset($params['path']) ? $params['path'] : '';
        $mail_subject = isset($params['subject']) ? $params['subject'] : '';
        $msg = isset($params['msg']) ? nl2br($params['msg']) : '';
        $mail_invoice_img = isset($params['invoice_img']) ? $params['invoice_img'] : '';

        $compnay_name = isset($params['fromData']) ? $params['fromData']['name'] : '';

        $token = get_post_meta($invoice_id, 'token', true);
        $url = sprintf(
            '%s?id=%s&token=%s',
            Fns::client_page_url($path),
            $invoice_id,
            $token
        );
 
        $subject = Fns::templateVariable($mail_subject, []);
        $template = ndpv()->render('email/invoice', [], true); 
             
        $body = Fns::templateVariable($template, [
            'msg' => $msg,
            'url' => $url,
            'path' => $path
        ]);

        $headers = array('Content-Type: text/html; charset=UTF-8');
        $headers[] = 'From: ' . $compnay_name . ' <' . $mail_from . '>';
        //TODO: dynamic Cc later
        //$headers[] = 'Cc: Rakib <therakib7@gmail.com>';
        //$headers[] = 'Cc: therakib7@gmail.com'; // note you can just use a simple email address

        //attachment
        $attachments = []; 

        $send_mail = wp_mail($mail_to, $subject, $body, $headers, $attachments);

        if ($send_mail) {
            $status = get_post_meta($invoice_id, 'status', true);
            if ( $status == 'draft') {
                update_post_meta($invoice_id, 'status', 'sent');
            }
            wp_send_json_success($send_mail);
        } else {
            wp_send_json_error(['Something wrong: Email not sent']);
        }
    }

    public function feedback($params)
    {

        $invoice_id = isset($params['invoice_id']) ? $params['invoice_id'] : '';
        $feedback_type = isset($params['feedback_type']) ? $params['feedback_type'] : '';
        $note = isset($params['note']) ? nl2br($params['note']) : '';
        $attachment = isset($params['attachment']) ? $params['attachment'] : '';

        if ($invoice_id) {
            update_post_meta($invoice_id, 'status', $feedback_type);
            $feedback = [];
            $feedback['type'] = $feedback_type;
            $feedback['note'] = $note;
            $feedback['attachment'] = $attachment;
            $feedback['time'] = current_time('timestamp');
            update_post_meta($invoice_id, 'feedback', $feedback);
        }

        wp_send_json_success();
    }

    public function dashboard($params)
    {
        $feedback_type = isset($params['feedback_type']) ? $params['feedback_type'] : '';
        $feedback_title = '';
        if ($feedback_type == 'features') {
            $feedback_title = 'Features Request: ';
        } else {
            $feedback_title = 'Bug Information: ';
        }

        
        $current_user = wp_get_current_user(); 
        $name = isset($params['name']) ? $params['name'] : $current_user->display_name;
        $from = isset($params['from']) ? $params['from'] : $current_user->user_email;
        $subject = isset($params['subject']) ? $params['subject'] : '';
        $details = isset($params['details']) ? nl2br($params['details']) : '';
        //TODO: change name email
        $propovoice_mail = 'support@propovoice.com';

        $headers = array('Content-Type: text/html; charset=UTF-8');
        $headers[] = 'From: ' . $name . ' <' . $from . '>';

        //attachment
        $attachments = [];
        $subject = $feedback_title . $subject;
        $send_mail = wp_mail($propovoice_mail, $subject, $details, $headers, $attachments);

        if ($send_mail) {
            wp_send_json_success($send_mail);
        } else {
            wp_send_json_error(['Something wrong']);
        }
    }

    public function delete($req)
    {
        $url_params = $req->get_url_params();

        $ids = explode(',', $url_params['id']);
        foreach ($ids as $id) {
            wp_delete_post($id);
        }
        wp_send_json_success($ids);
    }

    // check permission
    public function get_permission()
    {
        return true;
    }

    public function create_permission()
    {
        // TODO: check it later
        return true;
        // return current_user_can('publish_posts');
    }

    public function update_permission()
    {
        return current_user_can('edit_posts');
    }

    public function delete_permission()
    {
        return current_user_can('delete_posts');
    }
}
