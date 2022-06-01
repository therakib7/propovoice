<?php

namespace Ncpi\Controllers\Taxonomy;

use Ncpi\Controllers\Taxonomy\Types\Tag;
use Ncpi\Controllers\Taxonomy\Types\DealStage;
use Ncpi\Controllers\Taxonomy\Types\LeadLevel; 

class TaxonomyController {
	
	public function __construct() {   
		new LeadLevel(); 
		new Tag();
		new DealStage();
	} 
}