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
        //Check token that send in mail
        if ( false ) {
            esc_html_e( 'Sorry!! You don\'t have permission to view this page', 'propovoice' );
        } else {
            echo '<div id="ncpi-invoice"></div>'; 
        }
    ?>
    <?php wp_footer(); ?>
</body>
</html>

