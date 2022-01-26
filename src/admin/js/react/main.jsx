import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom'

document.addEventListener( 'DOMContentLoaded', function() {
    //TODO: collapse menu for main page
    // document.body.className+=' folded';  
    let element = document.getElementById( 'ncpi-admin-app' );
    if( typeof element !== 'undefined' && element !== null ) {
        ReactDOM.render( <HashRouter><App /></HashRouter>, element );
    }
} );

