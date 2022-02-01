<?php

namespace Ncpi\Controllers\Setting;
 
use Ncpi\Controllers\Setting\Types\Main;
use Ncpi\Controllers\Setting\Types\Setup;

class SettingController {
	
	public function __construct() {   
		if ( is_admin() ) {
			new Main();
			new Setup();
		} 
	} 
}