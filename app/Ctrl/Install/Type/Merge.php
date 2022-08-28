<?php 
namespace Ndpv\Ctrl\Install\Type;

use Ndpv\Model\Org;

class Merge
{

    public function __construct()
    {
        $this->user_to_contact();
        $this->extra_amount();
        $this->posttype_under_workspace();
    }

    public function user_to_contact()
    {
        $args = array(
            'orderby' => 'registered',
            'order'   => 'DESC',
            'number' => -1
        );

        $all_users = new \WP_User_Query($args);
        foreach ($all_users->get_results() as $user) {

            $user_id = $user->ID;
            $first_name = $user->first_name;
            $email = $user->user_email;

            $prefix = 'ncpi_';

            $member = get_user_meta($user->ID, $prefix . 'member', true);
            if ($member) {
                $org_name = get_user_meta($user->ID, $prefix . 'org_name', true);
                $web = get_user_meta($user->ID, $prefix . 'web', true);
                $mobile = get_user_meta($user->ID, $prefix . 'mobile', true);
                $country = get_user_meta($user->ID, $prefix . 'country', true);
                $region = get_user_meta($user->ID, $prefix . 'region', true);
                $address = get_user_meta($user->ID, $prefix . 'address', true);
                $org_id = null;

                $data = array(
                    'post_type' => 'ndpv_person',
                    'post_title'    => $first_name,
                    'post_content'  => '',
                    'post_status'   => 'publish',
                    'post_author'   => get_current_user_id()
                );
                $post_id = wp_insert_post($data);

                if (!is_wp_error($post_id)) {

                    update_post_meta($post_id, 'ws_id', ndpv()->get_workspace());

                    if ($first_name) {
                        update_post_meta($post_id, 'first_name', $first_name);
                    }

                    if (!$org_id && $org_name) {
                        $org = new Org();
                        $org_id = $org->create(['org_name' => $org_name, 'person_id' => $post_id]);
                    }

                    if ($org_id) {
                        update_post_meta($post_id, 'org_id', $org_id);
                    }

                    if ($email) {
                        update_post_meta($post_id, 'email', $email);
                    }

                    if ($web) {
                        update_post_meta($post_id, 'web', $web);
                    }

                    if ($mobile) {
                        update_post_meta($post_id, 'mobile', $mobile);
                    }

                    if ($country) {
                        update_post_meta($post_id, 'country', $country);
                    }

                    if ($region) {
                        update_post_meta($post_id, 'region', $region);
                    }

                    if ($address) {
                        update_post_meta($post_id, 'address', $address);
                    }

                    /* if ($img) {
                        update_post_meta($post_id, 'img', $img);
                    } */
                }

                if (!is_wp_error($post_id)) {
                    $args = array(
                        'post_type' => 'ndpv_estinv',
                        'post_status' => 'publish',
                        'posts_per_page' => -1
                    );

                    $args['meta_query'] = array(
                        'relation' => 'AND'
                    );

                    $args['meta_query'][] = array(
                        array(
                            'key'     => 'to',
                            'value'   => $user_id,
                            'compare' => '='
                        )
                    );

                    $query = new \WP_Query($args);
                    while ($query->have_posts()) {
                        $query->the_post();
                        $id = get_the_ID();

                        update_post_meta($id, 'to', $post_id);
                        update_post_meta($id, 'to_type', 'person');
                    }
                    wp_reset_postdata();

                    //delete user and move to contact
                    require_once(ABSPATH . 'wp-admin/includes/user.php');
                    wp_delete_user($user_id);
                }
            }
        }
    }

    function extra_amount()
    {
        $args = array(
            'post_type' => 'ndpv_estinv',
            'post_status' => 'publish',
            'posts_per_page' => -1
        );

        $query = new \WP_Query($args);
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();

            $from_id = get_post_meta($id, 'from', true);
            $fromData = [];
            if ($from_id) {
                $fromData['id'] = $from_id;
                $fromData['name'] = get_post_meta($from_id, 'name', true);
            }

            $contact_id = get_post_meta($id, 'to', true);
            $to_type = get_post_meta($id, 'to_type', true);

            $invoice = get_post_meta($id, 'invoice', true);

            $extra_field = [];
            if (isset($invoice['extra_field']) && $invoice['extra_field']) {
                foreach ($invoice['extra_field'] as $key => $value) {
                    $slug = ($key == 'late_fee') ? 'fee' : $key;
                    $term = get_term_by('slug', $slug, 'ndpv_extra_amount');
                    $extra_field[] = [
                        'id' => $term->term_id,
                        'name' => $term->name,
                        'type' => $slug,
                        'val' => $invoice[$key],
                        'val_type' => $value,
                    ];
                }
                $invoice['extra_field'] = $extra_field;
                update_post_meta($id, 'invoice', $invoice);
            }
        }
        wp_reset_postdata();
    }

    function posttype_under_workspace()
    {  
        $args = array( 
            'post_type' => ['ncpi_business', 'ncpi_estvoice', 'ncpi_payment'],
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'fields' => 'ids'
        );   
        $query = new \WP_Query( $args );  
        $get_workspace_id = ndpv()->get_workspace();
        foreach( $query->posts as $id ) {
            update_post_meta($id, 'ws_id', $get_workspace_id);

            $post_type = get_post_type($id);
            if ( $post_type == 'ncpi_business' ) {
                set_post_type($id, 'ndpv_business');
            } else if ( $post_type == 'ncpi_estvoice' ) {
                set_post_type($id, 'ndpv_estinv');
            } else if ( $post_type == 'ncpi_payment' ) {
                set_post_type($id, 'ndpv_payment');
            }
        }
        wp_reset_postdata();
    }
}
