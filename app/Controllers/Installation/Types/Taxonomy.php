<?php

namespace Ncpi\Controllers\Installation\Types; 

class Taxonomy {

    public function __construct() {  
        $this->create_custom_taxonomy();
    }   

    function create_custom_taxonomy() {  
        
        $temp_stage = [
            'Opportunity',
            'Contracting',
            'Engaging',
            'Proposing',
            'Deal Closing',
        ];  
        foreach( $temp_stage as $stage ) {
            wp_insert_term(
                $stage,   // the term 
                'ndpi_deal_stage', // the taxonomy 
            );
        }

        $temp_tag = [
            'Design',
            'Development',
            'Marketing',
        ];  
        foreach( $temp_tag as $tag ) {
            wp_insert_term(
                $tag,   // the term 
                'ndpi_deal_tag', // the taxonomy 
            );
        } 
    } 
}
