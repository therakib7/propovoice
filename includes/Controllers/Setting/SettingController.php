<?php

namespace Ncpi\Controllers\Setting;
 
use Ncpi\Controllers\Setting\Types\Main; 

class SettingController {
	
	public function __construct() {   
		if ( is_admin() ) {
			new Main();
		} 
	} 
}