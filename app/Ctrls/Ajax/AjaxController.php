<?php

namespace Ncpi\Ctrls\Ajax;

use Ncpi\Ctrls\Ajax\Type\Auth; 

class AjaxController {

    public function __construct() {  
        new Auth(); 
    }
}