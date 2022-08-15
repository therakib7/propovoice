<?php

namespace Ncpi\Ctrls\Filter;

use Ncpi\Ctrls\Filter\Type\BodyClass;
use Ncpi\Ctrls\Filter\Type\Media;

class FilterController
{
	public function __construct()
	{
		new BodyClass();
		new Media();
	}
}
