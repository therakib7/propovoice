<?php

/**
 * Singleton 
 * 
 * @since 0.1.0 
 * @package NCPI Project
 * @author NurencyDigital
 */

namespace Ndpi\Traits;

trait Singleton
{
    /**
     * Store the singleton object.
     */
    private static $singleton = false;

    /**
     * Fetch an instance of the class.
     */
    public static function getInstance()
    {
        if (self::$singleton === false) {
            self::$singleton = new self();
        }

        return self::$singleton;
    }
}
