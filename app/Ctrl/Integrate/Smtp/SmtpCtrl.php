<?php

namespace Ndpi\Ctrl\Integrate\Smtp;

use Ndpi\Ctrl\Integrate\Smtp\Type\SmtpList;
use Ndpi\Ctrl\Integrate\Smtp\Type\Sendinblue; 

class SmtpCtrl
{ 
	public function __construct()
	{ 
		new SmtpList();
		new Sendinblue(); 
	}
}
