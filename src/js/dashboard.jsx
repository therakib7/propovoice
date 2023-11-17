import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from 'cpnt/home';
import AppContext from 'context/app-context';
import msgData from 'context/data/msg';

import { checkRoute } from 'helper';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function Dashboard() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={{
                CrudMsg: msgData
            }}>
                <Home />
            </AppContext.Provider>
        </QueryClientProvider>
    )
}

const container = document.getElementById('ndpv-dashboard');
const root = createRoot(container);
root.render(
    <StrictMode>
        <Dashboard />
    </StrictMode>
);

document.addEventListener('DOMContentLoaded', function () {

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
