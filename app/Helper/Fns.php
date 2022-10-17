<?php

namespace Ndpv\Helper;

class Fns
{
    public static function get_terms($tax, $extra_amount_type = null)
    {
        $args = array(
            'taxonomy' => 'ndpv_' . $tax,
            'meta_query' => array(
                'relation' => 'OR',
                array(
                    'key' => 'tax_pos',
                    'compare' => 'NOT EXISTS', // works!
                    // 'value' => '' // This is ignored, but is necessary...
                ),
                array(
                    'key' => 'tax_pos',
                    'compare' => 'EXISTS',
                ),
            ),
            'orderby' => 'tax_pos',
            'hide_empty' => false
        );

        //TODO: this is not working, that's why temp added in tax js file
        /* if ( $extra_amount_type ) {
            $args['meta_query'][] = array(
                array(
                    'key'     => 'extra_amount_type',
                    'value'   => $extra_amount_type,
                    'compare' => '=',
                )
            );
        }  */
        return get_terms($args);
    }

    public static function phpToMomentFormat($format)
    {
        $replacements = [
            'd' => 'DD',
            'D' => 'ddd',
            'j' => 'D',
            'l' => 'dddd',
            'N' => 'E',
            'S' => 'o',
            'w' => 'e',
            'z' => 'DDD',
            'W' => 'W',
            'F' => 'MMMM',
            'm' => 'MM',
            'M' => 'MMM',
            'n' => 'M',
            't' => '', // no equivalent
            'L' => '', // no equivalent
            'o' => 'YYYY',
            'Y' => 'YYYY',
            'y' => 'YY',
            'a' => 'a',
            'A' => 'A',
            'B' => '', // no equivalent
            'g' => 'h',
            'G' => 'H',
            'h' => 'hh',
            'H' => 'HH',
            'i' => 'mm',
            's' => 'ss',
            'u' => 'SSS',
            'e' => 'zz', // deprecated since version 1.6.0 of moment.js
            'I' => '', // no equivalent
            'O' => '', // no equivalent
            'P' => '', // no equivalent
            'T' => '', // no equivalent
            'Z' => '', // no equivalent
            'c' => '', // no equivalent
            'r' => '', // no equivalent
            'U' => 'X',
        ];
        $momentFormat = strtr($format, $replacements);
        return $momentFormat;
    }

    public static function locate_template($name)
    {
        // Look within passed path within the theme - this is priority.
        $template = [];

        $template[] = ndpv()->get_template_path() . $name . ".php";

        if (!$template_file = locate_template(apply_filters('ndpv_locate_template_names', $template))) {
            $template_file = NDPV_PATH . "templates/$name.php";
        }

        return apply_filters('ndpv_locate_template', $template_file, $name);
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
            return '';
        }
    }

    /* templateVariable */
    public static function templateVariable($string = '', $array = [])
    {
        $id = isset($array['id']) ? $array['id'] : '';
        $path = isset($array['path']) ? $array['path'] : '';
        $org_name = isset($array['org_name']) ? $array['org_name'] : '';
        $client_name = isset($array['client_name']) ? $array['client_name'] : '';
        $date = isset($array['date']) ? $array['date'] : '';
        $due_date = isset($array['due_date']) ? $array['due_date'] : '';
        $amount = isset($array['amount']) ? $array['amount'] : '';
        $msg = isset($array['msg']) ? $array['msg'] : '';
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
                'url' => 'https://www.linkedin.com/in/nasirbinburhan/',
            ],
        ];

        if (function_exists('ndpvp')) {
            $get_social = get_option('ndpv_email_social');
            if (isset($get_social['social'])) {
                $social_list = $get_social['social'];
            }
        }

        foreach ($social_list as $val) {
            $icon_url = $val['icon_url'];
            if (!$icon_url) {
                if ($val['id'] == 'facebook') {
                    $icon_url = 'https://appux.co/wp-content/plugins/propovoice-server/assets/email/f.png';
                } elseif ($val['id'] == 'twitter') {
                    $icon_url = 'https://appux.co/wp-content/plugins/propovoice-server/assets/email/t.png';
                } elseif ($val['id'] == 'linkedin') {
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
                '{org_name}',
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
                $org_name,
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
     * NDPV_TEMPLATE_DEBUG_MODE will prevent overrides in themes from taking priority.
     *
     * @param mixed  $slug Template slug.
     * @param string $name Template name (default: '').
     */
    public static function get_template_part($slug, $args = null, $include = true)
    {
        // load template from theme if exist
        $template = NDPV_TEMPLATE_DEBUG_MODE ? '' : locate_template(
            array(
                "{$slug}.php",
                ndpv()->get_template_path() . "{$slug}.php"
            )
        );

        // load template from pro plugin if exist
        if (!$template && function_exists('ndpvp')) {
            $fallback = ndpv()->plugin_path() . "-pro" . "/templates/{$slug}.php";
            $template = file_exists($fallback) ? $fallback : '';
        }

        // load template from current plugin if exist
        if (!$template) {
            $fallback = ndpv()->plugin_path() . "/templates/{$slug}.php";
            $template = file_exists($fallback) ? $fallback : '';
        }

        // Allow 3rd party plugins to filter template file from their plugin.
        $template = apply_filters('ndpv_get_template_part', $template, $slug);

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

    public static function doing_it_wrong($function, $message, $version)
    {
        // @codingStandardsIgnoreStart
        $message .= ' Backtrace: ' . wp_debug_backtrace_summary();
        _doing_it_wrong($function, $message, $version);
    }

    public static function get_template($fileName, $args = null)
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
        $located = apply_filters('ndpv_get_template', $located, $fileName, $args);

        do_action('ndpv_before_template_part', $fileName, $located, $args);

        include $located;

        do_action('ndpv_after_template_part', $fileName, $located, $args);
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

    public static function gravatar($email, $size = 40)
    {
        $hash = md5(strtolower(trim($email)));
        return sprintf('https://www.gravatar.com/avatar/%s?d=blank&s=%s', $hash, $size);
    }

    /**
     *  String to slug convert
     *
     * @package NDPV Project
     * @since 1.0
     */
    public static function slugify($string)
    {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string), '-'));
    }

    /**
     * Sanitize out put
     *
     * @package NDPV Project
     * @since 1.0
     */
    public function sanitizeOutPut($value, $type = 'text')
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
     * @package NDPV Project
     * @since 1.0
     */
    public function imageInfo($attachment_id)
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
     *  Format bye
     *
     * @package NDPV Project
     * @since 1.0
     */
    public static function format_bytes($bytes)
    {
        $label = array('B', 'KB', 'MB', 'GB', 'TB', 'PB');
        for ($i = 0; $bytes >= 1024 && $i < (count($label) - 1); $bytes /= 1024, $i++);
        return (round($bytes, 2) . " " . $label[$i]);
    }
}
