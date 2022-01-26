<?php

namespace Ncpi\Controllers\Meta; 

use Ncpi\Controllers\Meta\Taxonomy\Any as AnyTaxonomy; 
use Ncpi\Controllers\Meta\Types\Any as AnyType;
use Ncpi\Controllers\Meta\Types\Code;
use Ncpi\Controllers\Meta\User\User;

class MetaController {

	public function __construct() {   

		//meta box
		// new AnyType();
		new Code();

		//taxonomy meta
		new AnyTaxonomy();

		//user meta
		/* new User(); */
	} 
}