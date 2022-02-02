<?php

namespace Ncpi\Controllers\Api;

use Ncpi\Controllers\Api\Types\Client;
use Ncpi\Controllers\Api\Types\Proposal;
use Ncpi\Controllers\Api\Types\Setting;

class ApiController {
	
	public function __construct() {   
		new Client();
		new Proposal();
		new Setting();
	} 
}