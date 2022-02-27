<?php

namespace Ncpi\Controllers\Setting;
 
use Ncpi\Controllers\Setting\Types\Dashboard;
use Ncpi\Controllers\Setting\Types\Welcome;

class SettingController {
	
	public function __construct() {   
		if ( is_admin() ) {
			new Dashboard();
			new Welcome();
		} 
	} 
}