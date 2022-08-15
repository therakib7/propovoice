<?php

namespace Ncpi\Ctrl\Ajax;

use Ncpi\Ctrl\Ajax\Type\Auth; 

class AjaxCtrl {

    public function __construct() {  
        new Auth(); 
    }
}