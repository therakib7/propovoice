import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'cpnt/home';
import AppContext from 'context/app-context';
import msgData from 'context/data/msg';

import { checkRoute } from 'helper';

function Dashboard() {
    return (
        <>
            <AppContext.Provider value={{
                CrudMsg: msgData
            }}>
                <Home />
            </AppContext.Provider>
        </>
    )
}

document.addEventListener('DOMContentLoaded', function () {
    let el = document.getElementById('ndpv-dashboard');
    if (typeof el !== 'undefined' && el !== null) {
        ReactDOM.render(
            <React.StrictMode>
                <Dashboard />
            </React.StrictMode>,
            el
        );
    }

    //show current menu in dashbaord
    const currentHash = window.location.hash;
    let navUl = document.querySelectorAll('#toplevel_page_ndpv ul > li');

    //on click active
    for (let y = 0, l = navUl.length; y < l; y++) {
        navUl[y].addEventListener('click', function () {
            for (let y = 0, l = navUl.length; y < l; y++) {
                navUl[y].classList.remove('current');
            }
            this.classList.add('current');
        });
    }

    //initial active route
    checkRoute();

});
