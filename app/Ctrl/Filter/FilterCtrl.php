<?php

namespace Ndpi\Ctrl\Filter;

use Ndpi\Ctrl\Filter\Type\BodyClass;
use Ndpi\Ctrl\Filter\Type\Media;

class FilterCtrl
{
	public function __construct()
	{
		new BodyClass();
		new Media();
	}
}
