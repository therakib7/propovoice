<?php

namespace Ncpi\Controllers\Filter;
 
use Ncpi\Controllers\Filter\Types\BodyClass;
use Ncpi\Controllers\Filter\Types\Media;

class FilterController {

	public function __construct() { 
		new BodyClass();
		new Media();
	}   
}
