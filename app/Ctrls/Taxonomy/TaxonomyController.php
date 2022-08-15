<?php

namespace Ncpi\Ctrls\Taxonomy;

use Ncpi\Ctrls\Taxonomy\Type\ContactStatus;
use Ncpi\Ctrls\Taxonomy\Type\DealPipeline;
use Ncpi\Ctrls\Taxonomy\Type\Tag;
use Ncpi\Ctrls\Taxonomy\Type\DealStage;
use Ncpi\Ctrls\Taxonomy\Type\ExtraAmount;
use Ncpi\Ctrls\Taxonomy\Type\LeadLevel;
use Ncpi\Ctrls\Taxonomy\Type\LeadSource;
use Ncpi\Ctrls\Taxonomy\Type\ProjectStatus;
use Ncpi\Ctrls\Taxonomy\Type\TaskPriority;
use Ncpi\Ctrls\Taxonomy\Type\TaskStatus;
use Ncpi\Ctrls\Taxonomy\Type\TaskType;

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
		new ExtraAmount();
		new ProjectStatus();
		new ContactStatus();
	} 
}