<?php
/*
 * Template Name: Propovoice Dashboard
 * Description: Template for Propovoice Dashboard
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
        if ( is_user_logged_in() && current_user_can('administrator') ) {
            echo '<div id="ncpi-dashboard"></div>';
        } else {
            esc_html_e( 'Sorry!! You don\'t have permission to view this page', 'propovoice' );
        }
    ?>
    <?php wp_footer(); ?>
</body>
</html>

