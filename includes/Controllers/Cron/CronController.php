<?php

namespace Ncpi\Controllers\Cron;
 
use Ncpi\Controllers\Cron\Types\Email;
use Ncpi\Controllers\Cron\Types\Invoice; 

class CronController
{

	public function __construct()
	{ 
		new Invoice(); 
		new Email(); 
	}
}
