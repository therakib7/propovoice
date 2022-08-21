import React from 'react';
import ReactDOM from 'react-dom';
import Invoice from 'out-cpnt/invoice';
import AppContext from 'context/app-context';
import msgData from 'context/data/msg';

document.addEventListener('DOMContentLoaded', function () {
    let el = document.getElementById('ndpi-invoice');
    if (typeof el !== 'undefined' && el !== null) {
        ReactDOM.render(
            <AppContext.Provider value={{
                CrudMsg: msgData
            }}>
                <Invoice />
            </AppContext.Provider>,
            el);
    }
});
