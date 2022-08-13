import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from 'components/welcome';

document.addEventListener('DOMContentLoaded', function () {
    let element = document.getElementById('ndpi-welcome');
    if (typeof element !== 'undefined' && element !== null) {
        ReactDOM.render(<Welcome />, element);
    }
});
