<?php

namespace Ndpi\Ctrl\Ajax;

use Ndpi\Ctrl\Ajax\Type\Auth; 

class AjaxCtrl {

    public function __construct() {  
        new Auth(); 
    }
}