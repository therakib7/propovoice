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
    <?php wp_body_open(); ?>
    <?php echo '<div id="ncpi-admin-app" class="flex ncpi-frontend"></div>'; ?>
    <?php wp_footer(); ?>
</body>
</html>

