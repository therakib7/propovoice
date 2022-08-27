<?php 
namespace Ndpv\Ctrl\Hook;

use Ndpv\Ctrl\Hook\Type\Filter;

class HookCtrl
{
	public function __construct()
	{
		new Filter();
	}
}
