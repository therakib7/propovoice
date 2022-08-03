import React from 'react';
import ReactDOM from 'react-dom'; 
import Welcome from 'components/welcome'; 

document.addEventListener( 'DOMContentLoaded', function() { 
    let element = document.getElementById( 'ncpi-welcome' );
    if( typeof element !== 'undefined' && element !== null ) {
        ReactDOM.render( <Welcome />, element );
    }
} );

