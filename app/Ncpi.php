<?php

require_once __DIR__ . './../vendor/autoload.php';
 
use Ncpi\Ctrls\Installation\InstallationController;
use Ncpi\Traits\SingletonTrait;
use Ncpi\Helpers\Constant; 
use Ncpi\Helpers\Fns; 
use Ncpi\Helpers\Data;
use Ncpi\Ctrls\MainController;   

/**
 * Class Ncpi
 */
final class Ncpi {

    use SingletonTrait; 
 
    /**
     * NCPI Project Constructor.
     */
    public function __construct() { 
        new Constant();  
        new InstallationController();
        $this->init_hooks(); 
    } 

    private function init_hooks() {
 
        add_action('plugins_loaded', [$this, 'on_plugins_loaded'], -1); 
        add_action('init', [$this, 'init'], 1); 
    }

    public function init() {
        do_action('ncpi_before_init');

        $this->load_plugin_textdomain();
        
        new MainController();  

        do_action('ncpi_init');
    }

    public function on_plugins_loaded() { 
        do_action('ncpi_loaded');        
    }   

    /**
     * Load Localization files. 
     */
    public function load_plugin_textdomain() {
         
        $locale = determine_locale();
        $locale = apply_filters('ncpi_plugin_locale', $locale );
        unload_textdomain('propovoice');
        load_textdomain('propovoice', WP_LANG_DIR . '/ncpi/ncpi-' . $locale . '.mo');
        load_plugin_textdomain('propovoice', false, plugin_basename(dirname(NCPI_FILE)) . '/languages');
    }
 
    /**
     * What type of request is this?
     *
     * @param string $type admin, ajax, cron or public.
     *
     * @return bool
     */
    public function is_request( $type ) {
        switch( $type ) {
            case 'admin':
                return is_admin();
            case 'public':
                return ( !is_admin() || defined('DOING_AJAX') ) && !defined('DOING_CRON');
            case 'ajax':
                return defined('DOING_AJAX');
            case 'cron':
                return defined('DOING_CRON');
        }
    }  

    /**
     * Get the plugin path.
     *
     * @return string
     */
    public function plugin_path() {
        return untrailingslashit(plugin_dir_path(NCPI_FILE));
    } 

    /**
     * @return mixed
     */
    public function version() {
        return NCPI_VERSION;
    }  

    /**
     * Get the template path.
     *
     * @return string
     */
    public function get_template_path() {
        return apply_filters('ncpi_template_path', 'ncpi/templates/');
    } 

    /**
     * Get the template partial path.
     *
     * @return string
     */
    public function get_partial_path( $path = null, $args = []) {
        Fns::get_template_part( 'partials/' . $path, $args ); 
    } 

    /**
     * @param $file
     *
     * @return string
     */
    public function get_assets_uri($file) {
        $file = ltrim($file, '/');

        return trailingslashit(NCPI_URL . '/assets') . $file;
    }

    /**
     * @param $file
     *
     * @return string
     */
    public function render($viewName, $args = array(), $return = false) { 
        $path = str_replace(".", "/", $viewName);
        $viewPath = NCPI_PATH . '/views/' . $path . '.php';
        if ( !file_exists($viewPath) ) { 
            return;
        }

        if ( $args ) {
            extract($args);
        }

        if ( $return ) {
            ob_start();
            include $viewPath;

            return ob_get_clean();
        }
        include $viewPath;
    }

    /**
     * @param $file
     * Get all optoins field value
     * @return mixed
     */
    public function get_options() {

        $option_field = func_get_args()[0];
        $result = get_option( $option_field ); 
        $func_args = func_get_args();
        array_shift( $func_args );

        foreach ( $func_args as $arg ) {
            if ( is_array($arg) ) {
                if ( !empty( $result[$arg[0]] ) ) {
                    $result = $result[$arg[0]];
                } else {  
                  $result = $arg[1];
                }
            } else {
                if ( !empty($result[$arg] ) ) {
                    $result = $result[$arg];
                } else { 
                    $result = null;
                }
            }
        }
        return $result;
    }  

    /**
     * @param $file
     * Get all optoins field value
     * @return mixed
     */
    public function get_default()
    { 
        $data = new Data;
        $result = $data->default();
        $func_args = func_get_args();  
        
        foreach ($func_args as $arg) {
            if (is_array($arg)) {
                if (!empty($result[$arg[0]])) {
                    $result = $result[$arg[0]];
                } else {
                    $result = $arg[1];
                }
            } else {
                if (!empty($result[$arg])) {
                    $result = $result[$arg];
                } else {
                    $result = null;
                }
            }
        }
        return $result;
    }

    public function get_workplace() {
        $option = get_option( 'ndpi_workplace_default' );
        return $option ? absint( $option ) : null;
    }
}

/**
 * @return bool|SingletonTrait|Ncpi
 */
function ncpi() {
    return Ncpi::getInstance();
} 
ncpi(); // Run Ncpi Plugin  