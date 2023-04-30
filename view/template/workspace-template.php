<?php
/*
 * Template Name: Propovoice Dashboard
 * Description: Template for Propovoice Dashboard
 */

use Ndpv\Ctrl\Cleanup\Style;

add_action('wp_enqueue_scripts', [Style::getInstance(), 'clear_styles_and_scripts'], 100);
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
    if (is_user_logged_in() ) {

        $core_access = apply_filters('ndpv_admin', current_user_can('ndpv_core'));
        $client_portal = true;
        $user_id = get_current_user_id();
        if ( current_user_can("ndpv_client_role") && !get_user_meta($user_id, 'ndpv_client_portal', true) ) {
            $client_portal = false;
        }

        if ($core_access && ndpv()->wage() && $client_portal) {
            echo '<div id="ndpv-dashboard"></div>';
        } else {
            ndpv()->render('template/partial/403');
        }
    } else {
        //TODO: this css already has in all.scoped.css
    ?>

    <?php
        ndpv()->render('template/partial/login');
    }
    ?>
    <?php wp_footer(); ?>
</body>

</html>