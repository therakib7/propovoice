<?php

namespace Ncpi\Controllers\Api;

use Ncpi\Controllers\Api\Types\Business;
use Ncpi\Controllers\Api\Types\Client;
use Ncpi\Controllers\Api\Types\Invoice;
use Ncpi\Controllers\Api\Types\Media;
use Ncpi\Controllers\Api\Types\Setting;

class ApiController {
	
	public function __construct() {   
		new Client();
		new Invoice(); 
		new Business();
		new Media();
		new Setting();
	} 
}