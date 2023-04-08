<?php
/*
 * Template Name: Propovoice Embeded Form
 * Description: Template for Propovoice Embeding form
 */

function propovoice_render_form($get)
{
    $form_list = [
        "contact-form-7",
        "fluentform",
        "ninja_form",
        "wpforms",

    ];
    if (isset($get['type']) && isset($get['id'])) {

        if (in_array($get['type'], $form_list)) {
            return do_shortcode('[' . $get['type'] . ' id="' . $get['id'] . '"]');
        }
        return 'form not found';
    }

    return 'No form found';
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>

<body>
    <?php echo propovoice_render_form($_GET) ?>

    <?php wp_footer(); ?>
</body>

</html>