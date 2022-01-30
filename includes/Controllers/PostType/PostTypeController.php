<?php

namespace Ncpi\Controllers\PostType;

use Ncpi\Controllers\PostType\Types\Proposal;

class PostTypeController {
	
	public function __construct() {    
        new Proposal();
	} 
}