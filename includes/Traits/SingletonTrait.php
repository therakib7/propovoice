<?php 

/**
 * SingletonTrait 
 * 
 * @since 1.0.0 
 * @package NCPI Project
 * @author NurCreation
 */

namespace Ncpi\Traits; 

trait SingletonTrait {
    /**
     * Store the singleton object.
     */
    private static $singleton = false;

    /**
     * Fetch an instance of the class.
     */
    public static function getInstance() {
        if ( self::$singleton === false ) {
            self::$singleton = new self();
        }

        return self::$singleton;
    }
}