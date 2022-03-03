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

document.addEventListener( 'DOMContentLoaded', function() {
    //TODO: collapse menu for main page
    // document.body.className+=' folded';  
    let element = document.getElementById( 'ncpi-dashboard' );
    if( typeof element !== 'undefined' && element !== null ) {
        ReactDOM.render( <Dashboard />, element );
    }
} );

