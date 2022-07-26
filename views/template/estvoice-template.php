 <?php

    $id = isset($_GET['id']) ? absint($_GET['id']) : null;
    if ($id && get_post($id)) {
        $token = isset($_GET['token']) ? sanitize_text_field($_GET['token']) : null;

        //Check token that send in mail
        $check_permission = false;
        $post_token = get_post_meta($id, 'token', true);
        if ($token == $post_token) {
            $check_permission = true;

            //update status if user not admin
            $update_status = false;
            if (is_user_logged_in()) {
                $author_id = (int) get_post_field('post_author', $id);
                if (get_current_user_id() != $author_id) {
                    $update_status = true;
                }
            } else {
                $update_status = true;
            }

            if ($update_status) {
                $status = get_post_meta($id, 'status', true);
                if ($status == 'draft') {
                    update_post_meta($id, 'status', 'viewed');
                }
            }
        }

        if (is_user_logged_in()) {
            $check_permission = true;
        }

        if ($check_permission) {
            echo '<div id="ncpi-invoice"></div>';
        } else {
            //esc_html_e('Sorry!! You don\'t have permission to view this page', 'propovoice'); 
            ncpi()->render('template/partials/403');
        }
    } else {  
        //esc_html_e('Sorry!! page not found', 'propovoice');
        ncpi()->render('template/partials/404');
    }
