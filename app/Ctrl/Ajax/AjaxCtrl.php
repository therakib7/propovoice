<?php

namespace Ndpv\Ctrl\Ajax;

use Ndpv\Ctrl\Ajax\Type\Auth; 

class AjaxCtrl {

    public function __construct() {  
        new Auth(); 
    }
}