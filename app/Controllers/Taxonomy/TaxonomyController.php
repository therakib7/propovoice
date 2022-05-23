<?php

namespace Ncpi\Controllers\Taxonomy;

use Ncpi\Controllers\Taxonomy\Types\DealStage;
use Ncpi\Controllers\Taxonomy\Types\DealTag;

class TaxonomyController {
	
	public function __construct() {   
		new DealStage();
		new DealTag();
	} 
}