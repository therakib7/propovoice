<?php

namespace Ncpi\Ctrls\Setting;
 
use Ncpi\Ctrls\Setting\Types\Dashboard;
use Ncpi\Ctrls\Setting\Types\Welcome;

class SettingController {
	
	public function __construct() {   
		if ( is_admin() ) {
			new Dashboard();
			new Welcome();
		} 
	} 
}