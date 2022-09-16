<?php

namespace Ndpv\Ctrl\Hook;

use Ndpv\Ctrl\Hook\Type\Filter;
use Ndpv\Ctrl\Hook\Type\Action;

class HookCtrl
{
	public function __construct()
	{
		new Filter();
		new Action();
	}
}
