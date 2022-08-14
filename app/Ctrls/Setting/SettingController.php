<?php

namespace Ncpi\Ctrls\Setting;
 
use Ncpi\Ctrls\Setting\Type\Dashboard;
use Ncpi\Ctrls\Setting\Type\Welcome;

class SettingController {
	
	public function __construct() {   
		if ( is_admin() ) {
			new Dashboard();
			new Welcome();
		} 
	} 
}