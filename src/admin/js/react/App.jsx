import React from 'react';
import Home from './components/Home';
import AppContext from './context/app-context';
import msgData from './context/data/msg';

function App() {
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
export default App;