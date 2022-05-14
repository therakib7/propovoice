<?php

namespace Ncpi\Controllers\Ajax;

use Ncpi\Controllers\Ajax\Types\Auth; 

class AjaxController {

    public function __construct() {  
        new Auth(); 
    }
}