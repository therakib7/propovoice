<?php

namespace Ncpi\Controllers\Api;

use Ncpi\Controllers\Api\Types\Setting;

class ApiController {
	
	public function __construct() {   
		new Setting();
	} 
}