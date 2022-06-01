<?php

namespace Ncpi\Ctrls\Filter;
 
use Ncpi\Ctrls\Filter\Types\BodyClass;
use Ncpi\Ctrls\Filter\Types\Media;

class FilterController {

	public function __construct() { 
		new BodyClass();
		new Media();
	}   
}
