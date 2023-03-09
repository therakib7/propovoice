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
    <style>
        .ndpv .pv-page-content {
            max-width: 30%;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        @media screen and (max-width: 550px) {
            .ndpv .pv-page-content {
                max-width: 100%;
            }
        }

        .ndpv .pv-page-content p {
            font-size: 24px;
            font-weight: 600;
            line-height: 40px;
            color: #4A5568;
        }

        @media screen and (max-width: 550px) {
            .ndpv .pv-page-content p {
                font-size: 16px;
                line-height: 30px;
            }
        }
    </style>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php
    if (is_user_logged_in() && apply_filters('ndpv_admin', current_user_can('ndpv_core'))) {
        if (ndpv()->wage()) {
            echo '<div id="ndpv-dashboard"></div>';
        } else {
            ndpv()->render('template/partial/403');
        }
    } else {
        //TODO: this css already has in all.scoped.css
    ?>

    <?php
        ndpv()->render('template/partial/403');
    }
    ?>
    <?php wp_footer(); ?>
</body>

</html>
