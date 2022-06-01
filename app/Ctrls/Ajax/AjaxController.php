<?php

namespace Ncpi\Ctrls\Ajax;

use Ncpi\Ctrls\Ajax\Types\Auth; 

class AjaxController {

    public function __construct() {  
        new Auth(); 
    }
}