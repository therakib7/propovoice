<?php

namespace Ncpi\Controllers\Installation\Types; 

class DB {

    public function __construct() {  
        $this->create_custom_term();
        $this->create_custom_table();
    }   

    function create_custom_term() { 
        /* wp_insert_term(
            'Apple',   // the term 
            'product', // the taxonomy 
        ); */
    } 

    function create_custom_table() {
        
    } 
}
