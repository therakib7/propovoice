import React, { useState, useEffect } from 'react';

import { 
    HashRouter,
    Routes,
    Route,
    NavLink
} from "react-router-dom"; 

import Dashboard from './Dashboard';
import Proposal from './proposal';
import Contract from './Contract';
import Invoice from './Invoice';
import Payment from './Payment';
import TemplateLibrary from './TemplateLibrary';
import Client from './Client';
import Setting from './Setting';
import Help from './Help';

const Home = () => {

    return(
        <>
        <HashRouter>
            <aside className="relative bg-sidebar ncpi-h-screen w-64 hidden sm:block shadow-xl">
                <div className="p-6 pb-5">
                    <a href="index.html" className="text-white text-3xl font-semibold hover:text-gray-300">Propovoice</a> 
                </div>
                <nav className="text-white text-base"> 
                    <NavLink 
                        to='/'  
                        className={({ isActive }) => "flex items-center text-white py-4 pl-6 nav-item " + (isActive  ? "active-nav-link " : "") }>
                        <i className="dashicons dashicons-dashboard mr-3" />
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to='proposal'
                        className={({ isActive }) => "flex items-center text-white py-4 pl-6 nav-item " + (isActive  ? "active-nav-link " : "") }>
                        <i className="dashicons dashicons-portfolio mr-3" />
                        Proposal
                    </NavLink> 
                    <NavLink 
                        to='contract'
                        className={({ isActive }) => "flex items-center text-white py-4 pl-6 nav-item " + (isActive  ? "active-nav-link " : "") }>
                        <i className="dashicons dashicons-groups mr-3" />
                        Contract
                    </NavLink>  
                    <NavLink 
                        to='invoice'
                        className={({ isActive }) => "flex items-center text-white py-4 pl-6 nav-item " + (isActive  ? "active-nav-link " : "") }>
                        <i className="dashicons dashicons-text-page mr-3" />
                        Invoice
                    </NavLink> 
                    <NavLink 
                        to='payment'
                        className={({ isActive }) => "flex items-center text-white py-4 pl-6 nav-item " + (isActive  ? "active-nav-link " : "") }>
                        <i className="dashicons dashicons-money-alt mr-3" />
                        Payment
                    </NavLink> 
                    <NavLink 
                        to='template-library'
                        className={({ isActive }) => "flex items-center text-white py-4 pl-6 nav-item " + (isActive  ? "active-nav-link " : "") }>
                        <i className="dashicons dashicons-admin-page mr-3" />
                        Template Library
                    </NavLink> 
                    <NavLink 
                        to='client'
                        className={({ isActive }) => "flex items-center text-white py-4 pl-6 nav-item " + (isActive  ? "active-nav-link " : "") }>
                        <i className="dashicons dashicons-groups mr-3" />
                        Client
                    </NavLink> 
                    <NavLink 
                        to='setting'
                        className={({ isActive }) => "flex items-center text-white py-4 pl-6 nav-item " + (isActive  ? "active-nav-link " : "") }>
                        <i className="dashicons dashicons-admin-generic mr-3" />
                        Settings
                    </NavLink> 
                    <NavLink 
                        to='help'
                        className={({ isActive }) => "flex items-center text-white py-4 pl-6 nav-item " + (isActive  ? "active-nav-link " : "") }>
                        <i className="dashicons dashicons-editor-help mr-3" />
                        Help
                    </NavLink>
                </nav>

                <a href="#" className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4">
                    <i className="dashicons dashicons-upload mr-3" />
                    Upgrade to Pro!
                </a>
            </aside>
            
            <div className="w-full ncpi-h-screen overflow-y-hidden p-6"> 
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>  
                    <Route path="/proposal" element={<Proposal/>}/>  
                    <Route path="/contract" element={<Contract/>}/>  
                    <Route path="/invoice" element={<Invoice/>}/>  
                    <Route path="/payment" element={<Payment/>}/>  
                    <Route path="/template-library" element={<TemplateLibrary/>}/>  
                    <Route path="/client" element={<Client/>}/>  
                    <Route path="/setting" element={<Setting/>}/>  
                    <Route path="/help" element={<Help/>}/>  
                </Routes> 
            </div> 
        </HashRouter>
        </>
    )
}

export default Home;