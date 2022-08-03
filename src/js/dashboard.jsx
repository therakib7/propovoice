import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'components/home';
import AppContext from 'context/app-context';
import msgData from 'context/data/msg';

function Dashboard() {
    return (
        <>
            <AppContext.Provider value={{
                user_id: null,
                user_role: null,
                CrudMsg: msgData
            }}>
                <Home />
            </AppContext.Provider>
        </>
    )
}

document.addEventListener('DOMContentLoaded', function () {
    //TODO: collapse menu for main page
    // document.body.className+=' folded';  
    let element = document.getElementById('ncpi-dashboard');
    if (typeof element !== 'undefined' && element !== null) {
        ReactDOM.render(
            <React.StrictMode>
                <Dashboard />
            </React.StrictMode>,
            element
        );
    }

    //show current menu in dashbaord 
    let navUl = document.querySelectorAll('#toplevel_page_ncpi ul > li');
    for (let y = 0, l = navUl.length; y < l; y++) {
        //TODO: set current class when reload
        //let link = navUl[y].getElementsByTagName('a');
        navUl[y].addEventListener('click', checkLi);
    }
    function checkLi() {
        for (let y = 0, l = navUl.length; y < l; y++) {
            navUl[y].classList.remove('current');
        }
        this.classList.add('current');
    }

});
