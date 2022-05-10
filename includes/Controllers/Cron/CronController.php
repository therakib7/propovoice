<?php

namespace Ncpi\Controllers\Cron;
 
use Ncpi\Controllers\Cron\Types\Reminder; 
use Ncpi\Controllers\Cron\Types\Recurring;

class CronController
{

	public function __construct()
	{ 
		new Recurring(); 
		new Reminder(); 
	}
}
