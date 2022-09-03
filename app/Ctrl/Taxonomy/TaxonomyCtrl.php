<?php 
namespace Ndpv\Ctrl\Taxonomy;

use Ndpv\Ctrl\Taxonomy\Type\ContactStatus;
use Ndpv\Ctrl\Taxonomy\Type\DealPipeline;
use Ndpv\Ctrl\Taxonomy\Type\Tag;
use Ndpv\Ctrl\Taxonomy\Type\DealStage;
use Ndpv\Ctrl\Taxonomy\Type\EstinvQtyType;
use Ndpv\Ctrl\Taxonomy\Type\ExtraAmount;
use Ndpv\Ctrl\Taxonomy\Type\LeadLevel;
use Ndpv\Ctrl\Taxonomy\Type\LeadSource;
use Ndpv\Ctrl\Taxonomy\Type\ProjectStatus;
use Ndpv\Ctrl\Taxonomy\Type\TaskPriority;
use Ndpv\Ctrl\Taxonomy\Type\TaskStatus;
use Ndpv\Ctrl\Taxonomy\Type\TaskType;

class TaxonomyCtrl {
	
	public function __construct() {  
		new LeadSource(); 
		new LeadLevel(); 
		new Tag();
		new EstinvQtyType();
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