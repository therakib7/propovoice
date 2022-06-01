<?php

namespace Ncpi\Ctrls\Taxonomy;

use Ncpi\Ctrls\Taxonomy\Types\Tag;
use Ncpi\Ctrls\Taxonomy\Types\DealStage;
use Ncpi\Ctrls\Taxonomy\Types\LeadLevel; 

class TaxonomyController {
	
	public function __construct() {   
		new LeadLevel(); 
		new Tag();
		new DealStage();
	} 
}