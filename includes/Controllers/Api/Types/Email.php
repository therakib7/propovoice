<?php

namespace Ncpi\Controllers\Api\Types;

use WP_Query;

class Email
{

    public function __construct()
    {
        add_action('rest_api_init', [$this, 'create_rest_routes']);
    }

    public function create_rest_routes()
    {

        register_rest_route('ncpi/v1', '/emails', [
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

        register_rest_route('ncpi/v1', '/emails/(?P<id>\d+)', array(
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

        register_rest_route('ncpi/v1', '/emails/(?P<id>[0-9,]+)', array(
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

        $per_page = 10;
        $offset = 0;

        if (isset($request['per_page'])) {
            $per_page = $request['per_page'];
        }

        if (isset($request['page']) && $request['page'] > 1) {
            $offset = ($per_page * $request['page']) - $per_page;
        }

        $args = array(
            'post_type' => 'ncpi_email',
            'post_status' => 'publish',
            'posts_per_page' => $per_page,
            'offset' => $offset,
        );

        $args['meta_query'] = array(
            'relation' => 'OR'
        );

        $query = new WP_Query($args);
        $total_data = $query->get_total(); //use this for pagination 
        $result = $data = [];
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $query_data = [];
            $query_data['id'] = $id;

            $query_data['project'] = [
                'name' => ''
            ];

            $query_data['to'] = [
                'first_name' => '',
                'last_name' => '',
                'email' => '',
            ];
            $query_data['email'] = json_decode(get_post_meta($id, 'email', true));

            $query_data['total'] = get_post_meta($id, 'total', true);
            $query_data['paid'] = get_post_meta($id, 'paid', true);
            if (!$query_data['paid']) {
                $query_data['paid'] = 0;
            }
            $query_data['due'] = get_post_meta($id, 'due', true);
            if (!$query_data['due']) {
                $query_data['due'] = 0;
            }

            $query_data['date'] = get_the_time('j-M-Y');
            $data[] = $query_data;
        }
        wp_reset_postdata();

        $result['result'] = $data;
        $result['total'] = $total_data;

        return wp_send_json_success($result);
    }

    public function get_single($req)
    {
        $url_params = $req->get_url_params();
        $id    = $url_params['id'];

        $query_data = [];
        $query_data['id'] = $id;

        $query_data['email'] = json_decode(get_post_meta($id, 'email', true));

        return wp_send_json_success($query_data);
    }

    public function templateVariable($string = '', $compnay_name, $client_name, $invoice_id, $invoice_url, $msg = '')
    {
        return str_replace(
            array(
                '{company_name}',
                '{client_name}',
                '{invoice_id}',
                '{invoice_url}',
                '{msg}'
            ),
            array(
                $compnay_name,
                $client_name,
                $invoice_id,
                $invoice_url,
                $msg,
            ),
            $string
        );
    }

    /* get url by page template */
    public function invoice_page_url()
    {
        $page = get_pages(array(
            'meta_key' => '_wp_page_template',
            'meta_value' => 'invoice-template.php'
        ));
        if (!empty($page)) {
            return get_permalink($page[0]->ID);
        } else {
            return '#';
        }
    }

    public function create($req)
    {

        $params = $req->get_params();
        $type = isset($params['type']) ? $params['type'] : '';
        if ($type == 'sent') {
            $this->sent($params);
        } else if ($type == 'feedback') {
            $this->feedback($params);
        }
    }

    public function sent($params)
    {

        $mail_from = isset($params['fromData']) ? $params['fromData']['email'] : '';
        $mail_to = isset($params['toData']) ? $params['toData']['email'] : '';
        $invoice_id = isset($params['invoice_id']) ? $params['invoice_id'] : '';
        $mail_subject = isset($params['subject']) ? $params['subject'] : '';
        $msg = isset($params['msg']) ? nl2br($params['msg']) : '';
        $mail_invoice_img = isset($params['invoice_img']) ? $params['invoice_img'] : '';

        $compnay_name = isset($params['fromData']) ? $params['fromData']['name'] : '';
        $client_name = isset($params['toData']) ? $params['toData']['name'] : '';

        $token = get_post_meta($invoice_id, 'token', true);
        $invoice_url = sprintf(
            '%s?id=%s&token=%s',
            $this->invoice_page_url(),
            $invoice_id,
            $token
        );

        $subject = $this->templateVariable($mail_subject, $compnay_name, $client_name, $invoice_id, $invoice_url);
        $template = ncpi()->render('email/invoice', [], true);
        $body = $this->templateVariable($template, $compnay_name, $client_name, $invoice_id, $invoice_url, $msg);

        $headers = array('Content-Type: text/html; charset=UTF-8');
        $headers[] = 'From: ' . $compnay_name . ' <' . $mail_from . '>';
        $headers[] = 'Cc: Rakib <rakib@wordpress.org>';
        $headers[] = 'Cc: iluvwp@wordpress.org'; // note you can just use a simple email address

        //attachment
        $attachments = [];
        if ($mail_invoice_img) {
            ob_start();
?>
            <!DOCTYPE html>
            <html>

            <head>
                <meta http-equiv="content-type" content="text/html; charset=UTF-8">
                <title>PDF</title>
                <style type="text/css">
                    @media print {
                        * {
                            box-sizing: border-box;
                            margin: 0;
                            padding: 0;
                        }

                        @page {
                            margin: 0;
                        }

                        .page {
                            width: 803px;
                            /* height: 1132px; */
                            height: 1110px;
                            page-break-after: always;
                        }
                    }
                </style>
            </head>

            <body>
                <div class="page" style="background-image: url(<?php echo $mail_invoice_img; ?>);"></div>
            </body>

            </html>
<?php
            $invoice_html = ob_get_clean();
            $dompdf = new \Dompdf\Dompdf();
            $dompdf->set_option('enable_css_float', true);
            $dompdf->set_option('enable_remote', true);
            $dompdf->setPaper('A4', 'portrait');
            $invoice_html = preg_replace('/>\s+</', "><", $invoice_html);
            $dompdf->loadHtml($invoice_html);
            $dompdf->render();
            //TODO: change directory later
            $uploads_dir = trailingslashit(wp_upload_dir()['basedir']) . 'propovoice';
            $filename = $uploads_dir . '/invoice.pdf';

            $output = $dompdf->output();
            file_put_contents($filename, $output);

            $attachments = array(
                $filename
            );
        }

        $send_mail = wp_mail($mail_to, $subject, $body, $headers, $attachments);

        if ($send_mail) {
            update_post_meta($invoice_id, 'status', 'sent');
            wp_send_json_success($send_mail);
        } else {
            wp_send_json_error(['Something wrong']);
        }
    }

    public function feedback($params)
    {

        $invoice_id = isset($params['invoice_id']) ? $params['invoice_id'] : '';
        $feedback = isset($params['feedback']) ? $params['feedback'] : '';
        $note = isset($params['note']) ? nl2br($params['note']) : '';

        if ($invoice_id) {
            update_post_meta($invoice_id, 'status', $feedback);
            update_post_meta($invoice_id, 'feedback_time', current_time('timestamp'));
            update_post_meta($invoice_id, 'feedback_note', $note);
        }

        wp_send_json_success();
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
        return current_user_can('publish_posts');
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
