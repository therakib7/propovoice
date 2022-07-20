<?php

namespace Ncpi\Ctrls\Taxonomy;

use Ncpi\Ctrls\Taxonomy\Types\ContactStatus;
use Ncpi\Ctrls\Taxonomy\Types\DealPipeline;
use Ncpi\Ctrls\Taxonomy\Types\Tag;
use Ncpi\Ctrls\Taxonomy\Types\DealStage;
use Ncpi\Ctrls\Taxonomy\Types\LeadLevel;
use Ncpi\Ctrls\Taxonomy\Types\LeadSource;
use Ncpi\Ctrls\Taxonomy\Types\ProjectStatus;
use Ncpi\Ctrls\Taxonomy\Types\TaskPriority;
use Ncpi\Ctrls\Taxonomy\Types\TaskStatus;
use Ncpi\Ctrls\Taxonomy\Types\TaskType;

class TaxonomyController {
	
	public function __construct() {  
		new LeadSource(); 
		new LeadLevel(); 
		new Tag();
		new TaskStatus();
		new TaskType();
		new TaskPriority(); 
		new DealPipeline();
		new DealStage();
		new ProjectStatus();
		new ContactStatus();
	} 
}