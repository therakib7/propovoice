import React from 'react';
import ReactDOM from 'react-dom'; 
import Invoice from './out-components/invoice'; 

document.addEventListener( 'DOMContentLoaded', function() { 
    let element = document.getElementById( 'ncpi-invoice' );
    if( typeof element !== 'undefined' && element !== null ) {
        ReactDOM.render( <Invoice />, element );
    }
} );

