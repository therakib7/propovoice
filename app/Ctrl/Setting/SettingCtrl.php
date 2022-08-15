<?php

namespace Ncpi\Ctrl\Setting;
 
use Ncpi\Ctrl\Setting\Type\Dashboard;
use Ncpi\Ctrl\Setting\Type\Welcome;

class SettingCtrl {
	
	public function __construct() {   
		if ( is_admin() ) {
			new Dashboard();
			new Welcome();
		} 
	} 
}