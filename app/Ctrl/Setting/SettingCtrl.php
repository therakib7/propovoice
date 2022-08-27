<?php 
namespace Ndpv\Ctrl\Setting;
 
use Ndpv\Ctrl\Setting\Type\Dashboard;
use Ndpv\Ctrl\Setting\Type\Welcome;

class SettingCtrl {
	
	public function __construct() {   
		if ( is_admin() ) {
			new Dashboard();
			new Welcome();
		} 
	} 
}