<?php

namespace Ndpi\Ctrl\Taxonomy;

use Ndpi\Ctrl\Taxonomy\Type\ContactStatus;
use Ndpi\Ctrl\Taxonomy\Type\DealPipeline;
use Ndpi\Ctrl\Taxonomy\Type\Tag;
use Ndpi\Ctrl\Taxonomy\Type\DealStage;
use Ndpi\Ctrl\Taxonomy\Type\ExtraAmount;
use Ndpi\Ctrl\Taxonomy\Type\LeadLevel;
use Ndpi\Ctrl\Taxonomy\Type\LeadSource;
use Ndpi\Ctrl\Taxonomy\Type\ProjectStatus;
use Ndpi\Ctrl\Taxonomy\Type\TaskPriority;
use Ndpi\Ctrl\Taxonomy\Type\TaskStatus;
use Ndpi\Ctrl\Taxonomy\Type\TaskType;

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