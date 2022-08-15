<?php

namespace Ncpi\Ctrl\Filter;

use Ncpi\Ctrl\Filter\Type\BodyClass;
use Ncpi\Ctrl\Filter\Type\Media;

class FilterCtrl
{
	public function __construct()
	{
		new BodyClass();
		new Media();
	}
}
