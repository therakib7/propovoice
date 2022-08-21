<?php

namespace Ndpi\Ctrl\Setting;
 
use Ndpi\Ctrl\Setting\Type\Dashboard;
use Ndpi\Ctrl\Setting\Type\Welcome;

class SettingCtrl {
	
	public function __construct() {   
		if ( is_admin() ) {
			new Dashboard();
			new Welcome();
		} 
	} 
}