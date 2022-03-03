<?php
/*
 * Template Name: Propovoice Invoice
 * Description: Template for Single Invoice
 */  
?>
<!DOCTYPE html>
<html lang="en">
<head> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>  
    <?php 
        
        $id = isset( $_GET['id'] ) ? absint( $_GET['id'] ) : null; 
        if ( $id && get_post($id) ) {
            $token = isset( $_GET['token'] ) ? sanitize_text_field( $_GET['token'] ) : null;

            //Check token that send in mail
            $check_permission = false;
            $post_token = get_post_meta($id, 'token', true);  
            if ( $token == $post_token ) {
                $check_permission = true;
            }

            if ( is_user_logged_in() ) {
                $check_permission = true;
            }

            if ( $check_permission ) { 
                echo '<div id="ncpi-invoice"></div>'; 
            } else {
                esc_html_e( 'Sorry!! You don\'t have permission to view this page', 'propovoice' );
            }
        } else {
            esc_html_e( 'Sorry!! page not found', 'propovoice' );
        } 
    ?>
    <?php wp_footer(); ?>
</body>
</html>

