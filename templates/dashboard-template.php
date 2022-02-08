<?php
/*
 * Template Name: Propovoice Dashboard
 * Description: Template for Propovoice Dashboard
 */  
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php esc_html_e( 'Propovoice Dashboard', 'propovoice' ); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>> 
    <?php echo '<div id="ncpi-admin-app" class="flex ncpi-frontend"></div>'; ?>
    <?php wp_footer(); ?>
</body>
</html>

