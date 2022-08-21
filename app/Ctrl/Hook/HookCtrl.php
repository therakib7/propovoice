<?php

namespace Ndpi\Ctrl\Hook;

use Ndpi\Ctrl\Hook\Type\Filter;

class HookCtrl
{
	public function __construct()
	{
		new Filter();
	}
}
