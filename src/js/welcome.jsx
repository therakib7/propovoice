import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from 'cpnt/welcome';

document.addEventListener('DOMContentLoaded', function () {
    let element = document.getElementById('ndpv-welcome');
    if (typeof element !== 'undefined' && element !== null) {
        ReactDOM.render(<Welcome />, element);
    }
});
