<?php

namespace Ncpi\Ctrls\Filter;
 
use Ncpi\Ctrls\Filter\Types\BodyClass;
use Ncpi\Ctrls\Filter\Types\Media;

class FilterController {

	public function __construct() { 
		new BodyClass();
		new Media();

		add_filter( 'get_terms_orderby', [$this, 'order_by_term'], 10, 3 );
	}   

	function order_by_term( $orderby, $query_vars, $taxonomies ) { 
		return $query_vars['orderby'] == 'term_order' ? 'term_order' : $orderby;
	}
	
}
