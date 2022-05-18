<?php

namespace Ncpi\Helpers;

class Fns
{

    public static function locate_template($name)
    {
        // Look within passed path within the theme - this is priority.
        $template = [];

        $template[] = ncpi()->get_template_path() . $name . ".php";

        if (!$template_file = locate_template(apply_filters('ncpi_locate_template_names', $template))) {
            $template_file = NCPI_PATH . "templates/$name.php";
        }

        return apply_filters('ncpi_locate_template', $template_file, $name);
    }

    /* get url by page template */
    public static function client_page_url($slug)
    {
        $page = get_pages(array(
            'meta_key' => '_wp_page_template',
            'meta_value' => $slug . '-template.php'
        ));
        if (!empty($page)) {
            return get_permalink($page[0]->ID);
        } else {
            return '#';
        }
    }

    /* templateVariable */
    public static function templateVariable($string = '', $array = [])
    {
        $id = isset($array['id']) ? $array['id'] : '';
        $path = isset($array['path']) ? $array['path'] : '';
        $company_name = isset($array['company_name']) ? $array['company_name'] : '';
        $client_name = isset($array['client_name']) ? $array['client_name'] : '';
        $date = isset($array['date']) ? $array['date'] : '';
        $due_date = isset($array['due_date']) ? $array['due_date'] : '';
        $amount = isset($array['amount']) ? $array['amount'] : '';
        $msg = isset($array['msg']) ? $array['msg'] :  '';
        $url = isset($array['url']) ? $array['url'] : '';

        $social = '';
        //TODO: set free version social link
        $social_list = [
            [
                'id' => 'facebook',
                'label' => 'Facebook',
                'icon_url' => '',
                'url' => 'https://www.facebook.com/propovoice/',
            ],
            [
                'id' => 'twitter',
                'label' => 'Twitter',
                'icon_url' => '',
                'url' => 'https://twitter.com/nasirbinburhan',
            ],
            [
                'id' => 'linkedin',
                'label' => 'Linkedin',
                'icon_url' => '',
                'url' => '',
            ],
        ];

        if (function_exists('ncpip')) {
            $get_social = get_option('ncpi_general_social');
            if (isset($get_social['social'])) {
                $social_list = $get_social['social'];
            }
        }

        foreach ($social_list as $val) {
            $icon_url = $val['icon_url'];
            if (!$icon_url) {
                if ($val['id'] == 'facebook') {
                    $icon_url = 'https://appux.co/wp-content/plugins/propovoice-server/assets/email/f.png';
                } else if ($val['id'] == 'twitter') {
                    $icon_url = 'https://appux.co/wp-content/plugins/propovoice-server/assets/email/t.png';
                } else if ($val['id'] == 'linkedin') {
                    $icon_url = 'https://appux.co/wp-content/plugins/propovoice-server/assets/email/i.png';
                }
            }

            if ($val['url']) {
                $social .= '<a href="' . esc_url($val['url']) . '"><img src="' . esc_url($icon_url) . '" alt="' . esc_attr($val['label']) . '"></a>';
            }
        }

        return str_replace(
            array(
                '{id}',
                '{path}',
                '{company_name}',
                '{client_name}',
                '{date}',
                '{due_date}',
                '{amount}',
                '{msg}',
                '{url}',
                '{social}'
            ),
            array(
                $id,
                $path,
                $company_name,
                $client_name,
                $date,
                $due_date,
                $amount,
                $msg,
                $url,
                $social
            ),
            $string
        );
    }

    /**
     * Get template part (for templates like the shop-loop).
     *
     * NCPI_TEMPLATE_DEBUG_MODE will prevent overrides in themes from taking priority.
     *
     * @param mixed  $slug Template slug.
     * @param string $name Template name (default: '').
     */
    static function get_template_part($slug, $args = null, $include = true)
    {
        // load template from theme if exist
        $template = NCPI_TEMPLATE_DEBUG_MODE ? '' : locate_template(
            array(
                "{$slug}.php",
                ncpi()->get_template_path() . "{$slug}.php"
            )
        );

        // load template from pro plugin if exist
        if (!$template && function_exists('ncpip')) {
            $fallback = ncpi()->plugin_path() . "-pro" . "/templates/{$slug}.php";
            $template = file_exists($fallback) ? $fallback : '';
        }

        // load template from current plugin if exist
        if (!$template) {
            $fallback = ncpi()->plugin_path() . "/templates/{$slug}.php";
            $template = file_exists($fallback) ? $fallback : '';
        }

        // Allow 3rd party plugins to filter template file from their plugin.
        $template = apply_filters('ncpi_get_template_part', $template, $slug);

        if ($template) {
            if (!empty($args) && is_array($args)) {
                extract($args); // @codingStandardsIgnoreLine
            }

            // load_template($template, false, $args);
            if ($include) {
                include $template;
            } else {
                return $template;
            }
        }
    }

    static function doing_it_wrong($function, $message, $version)
    {
        // @codingStandardsIgnoreStart
        $message .= ' Backtrace: ' . wp_debug_backtrace_summary();
        _doing_it_wrong($function, $message, $version);
    }

    static function get_template($fileName, $args = null)
    {

        if (!empty($args) && is_array($args)) {
            extract($args); // @codingStandardsIgnoreLine
        }

        $located = self::locate_template($fileName);

        if (!file_exists($located)) {
            /* translators: %s template */
            self::doing_it_wrong(__FUNCTION__, sprintf(__('%s does not exist.', 'propovoice'), '<code>' . $located . '</code>'), '1.0');

            return;
        }

        // Allow 3rd party plugin filter template file from their plugin.
        $located = apply_filters('ncpi_get_template', $located, $fileName, $args);

        do_action('ncpi_before_template_part', $fileName, $located, $args);

        include $located;

        do_action('ncpi_after_template_part', $fileName, $located, $args);
    }

    /**
     * @param $id
     *
     * @return bool|mixed|void
     */

    public static function get_default_placeholder_url()
    {
        $placeholder_url = NCPI_URL . '/assets/imgs/placeholder.jpg';
        return apply_filters('ncpi_default_placeholder_url', $placeholder_url);
    }

    /**
     * is_edit_page 
     * function to check if the current page is a post edit page
     * 
     * @param  string  $new_edit what page to check for accepts new - new post page ,edit - edit post page, null for either
     * @return boolean
     */
    public static function is_edit_page($new_edit = null)
    {
        global $pagenow;
        //make sure we are on the backend
        if (!is_admin()) return false;

        if ($new_edit == "edit")
            return in_array($pagenow, array('post.php',));
        else if ($new_edit == "new") //check for new post page
            return in_array($pagenow, array('post-new.php'));
        else //check for either new or edit
            return in_array($pagenow, array('post.php', 'post-new.php'));
    }

    /**
     * @param $id
     *
     * @return bool|mixed|void
     */
    public static function get_option($id)
    {
        if (!$id) {
            return false;
        }
        $settings = get_option($id, []);

        return apply_filters($id, $settings);
    }

    /**
     * Clean variables using sanitize_text_field. Arrays are cleaned recursively.
     * Non-scalar values are ignored.
     *
     * @param string|array $var Data to sanitize.
     *
     * @return string|array
     */
    public static function clean($var)
    {
        if (is_array($var)) {
            return array_map([self::class, 'clean'], $var);
        } else {
            return is_scalar($var) ? sanitize_text_field($var) : $var;
        }
    }

    /**
     * Get all post types.
     *
     * @param none
     *
     * @return array
     */
    public static function getPostTypes($key_only = false, $select_option = true)
    {
        global $wp_post_types;

        $pre_post_types = $data = [];
        if ($select_option) {
            $data[] = esc_html__('Select', 'propovoice');
        }
        foreach ($wp_post_types as $key => $post_type) {
            $pre_post_types[$key] = $post_type->label;
        }

        // Remove some post type
        $post_type_remove = [
            //'page',
            'attachment',
            'nav_menu_item',
            'customize_changeset',
            'revision',
            'custom_css',
            'oembed_cache',
            'user_request',
            'wp_block',
            'product_variation',
            'shop_order',
            'shop_order_refund',
            'shop_coupon',
            //wc
            'scheduled-action',
            //edd
            'edd_log',
            'edd_payment',
            'edd_discount',
            //tlp
            'rtcl_cfg',
            'rtcl_cf',
            'rtcl_payment',
            'rtcl_pricing',
            'NCPI',
            'NCPI_affiliate',
            //elementor
            'elementor_library',
            'e-landing-page',
            'wp_template',
            //lp
            'lp_order',
            //this
            'ncpi_code'
        ];

        foreach ($pre_post_types as $key => $posttype) {
            if (in_array($key, $post_type_remove)) {
                continue;
            }

            if ($key_only) {
                $data[] = $key;
            } else {
                $data[$key] = $posttype;
            }
        }

        return apply_filters('ncpi_post_type', $data);
    }

    /**
     * Get all taxonomy types.
     *
     * @param none
     *
     * @return array
     */
    public static function getTaxonomyTypes($key_only = false, $select_option = true)
    {
        global $wp_taxonomies;

        $pre_taxonomy_types = $data = [];
        if ($select_option) {
            $data[] = esc_html__('Select', 'propovoice');
        }
        foreach ($wp_taxonomies as $key => $taxonomy) {
            $pre_taxonomy_types[$key] = $taxonomy->label;
        }

        // Remove some post type
        $taxonomy_remove = [
            //'wp',
            'nav_menu',
            'link_category',
            'post_format',
            'wp_theme',
            'action-group',
            //wc 
            'product_type',
            'product_visibility',
            'product_shipping_class',
            //edd  
            'edd_log_type'
            //elementor 
            //lp 
        ];

        foreach ($pre_taxonomy_types as $key => $taxonomy) {
            if (in_array($key, $taxonomy_remove)) {
                continue;
            }

            if ($key_only) {
                $data[] = $key;
            } else {
                $data[$key] = $taxonomy;
            }
        }

        return apply_filters('ncpi_taxonomy_type', $data);
    }

    public static function gravatar($email, $size = 40)
    {
        $hash = md5(strtolower(trim($email)));
        return sprintf('https://www.gravatar.com/avatar/%s?d=blank&s=%s', $hash, $size);
    }

    /**
     *  String to slug convert
     *
     * @package NCPI Project
     * @since 1.0
     */
    public static function slugify($string)
    {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string), '-'));
    }

    /**
     * Sanitize out put
     *
     * @package NCPI Project
     * @since 1.0
     */
    function sanitizeOutPut($value, $type = 'text')
    {
        $newValue = null;
        if ($value) {
            if ($type == 'text') {
                $newValue = esc_html(stripslashes($value));
            } elseif ($type == 'url') {
                $newValue = esc_url(stripslashes($value));
            } elseif ($type == 'textarea') {
                $newValue = esc_textarea(stripslashes($value));
            } else {
                $newValue = esc_html(stripslashes($value));
            }
        }
        return $newValue;
    }

    /**
     * Image information
     *
     * @package NCPI Project
     * @since 1.0
     */
    function imageInfo($attachment_id)
    {
        $data = array();
        $imgData = wp_get_attachment_metadata($attachment_id);
        $data['id'] = $attachment_id;
        $data['url'] = wp_get_attachment_url($attachment_id);
        $data['width'] = !empty($imgData['width']) ? absint($imgData['width']) : 0;
        $data['height'] = !empty($imgData['height']) ? absint($imgData['height']) : 0;

        return $data;
    }

    /**
     *  NCPI Project Star Icon
     *
     * @package NCPI Project
     * @since 1.0
     */
    public static function review_stars($rating, $dash_icon = false)
    {
        ob_start();
        for ($x = 0; $x < 5; $x++) {
            if (floor($rating) - $x >= 1) {
                if ($dash_icon) {
                    echo '<i class="dashicons dashicons-star-filled"></i>';
                } else {
                    echo '<i class="ncpi-star"></i>';
                }
            } elseif ($rating - $x > 0) {
                if ($dash_icon) {
                    echo '<i class="dashicons dashicons-star-half"></i>';
                } else {
                    echo '<i class="ncpi-star-half-alt"></i>';
                }
            } else {
                if ($dash_icon) {
                    echo '<i class="dashicons dashicons-star-empty"></i>';
                } else {
                    echo '<i class="ncpi-star-empty"></i>';
                }
            }
        }
        return ob_get_clean();
    }

    /**
     *  NCPI Project Entity Star Icon
     *
     * @package NCPI Project
     * @since 1.0
     */
    public static function entity_stars($rating)
    {
        ob_start();
        foreach (array(1, 2, 3, 4, 5) as $val) {
            $score = $rating - $val;
            if ($score >= 0) {
                echo '&#9733;';
            } else if ($score > -1 && $score < 0) {
                // half star will show full star in url 
                echo '&#9733;';
            } else {
                echo '&#9734;';
            }
        }
        return ob_get_clean();
    }

    /**
     *  Format bye 
     *
     * @package NCPI Project
     * @since 1.0
     */
    public static function format_bytes($bytes)
    {
        $label = array('B', 'KB', 'MB', 'GB', 'TB', 'PB');
        for ($i = 0; $bytes >= 1024 && $i < (count($label) - 1); $bytes /= 1024, $i++);
        return (round($bytes, 2) . " " . $label[$i]);
    }
}
