<?php
/*
 * Template Name: Propovoice Invoice
 * Description: Template for Invoice Client View
 */
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,nofollow">
    <style type="text/css">
        @media print {
            @page {
                margin: 0;
            }
        }
    </style>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php ndpv()->render('template/estvoice-template'); ?>
    <?php wp_footer(); ?>
</body>

</html>