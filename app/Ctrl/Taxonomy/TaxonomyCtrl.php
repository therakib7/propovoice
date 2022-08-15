<?php

namespace Ncpi\Ctrl\Taxonomy;

use Ncpi\Ctrl\Taxonomy\Type\ContactStatus;
use Ncpi\Ctrl\Taxonomy\Type\DealPipeline;
use Ncpi\Ctrl\Taxonomy\Type\Tag;
use Ncpi\Ctrl\Taxonomy\Type\DealStage;
use Ncpi\Ctrl\Taxonomy\Type\ExtraAmount;
use Ncpi\Ctrl\Taxonomy\Type\LeadLevel;
use Ncpi\Ctrl\Taxonomy\Type\LeadSource;
use Ncpi\Ctrl\Taxonomy\Type\ProjectStatus;
use Ncpi\Ctrl\Taxonomy\Type\TaskPriority;
use Ncpi\Ctrl\Taxonomy\Type\TaskStatus;
use Ncpi\Ctrl\Taxonomy\Type\TaskType;

class TaxonomyCtrl {
	
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