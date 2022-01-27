import React, { useState, useEffect } from 'react';

import { 
    Routes,
    Route,
    Link
} from "react-router-dom"; 

import Dashboard from './Dashboard';
import Proposal from './Proposal';
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
            <aside className="relative bg-sidebar ncpi-h-screen w-64 hidden sm:block shadow-xl">
                <div className="p-6 pb-5">
                    <a href="index.html" className="text-white text-3xl font-semibold hover:text-gray-300">Propovoice</a> 
                </div>
                <nav className="text-white text-base"> 
                    <Link 
                        to='/'
                        className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
                        >
                        <i className="dashicons dashicons-dashboard mr-3" />
                        Dashboard
                    </Link>
                    <Link 
                        to='proposal'
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <i className="dashicons dashicons-portfolio mr-3" />
                        Proposal
                    </Link> 
                    <Link 
                        to='contract'
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <i className="dashicons dashicons-groups mr-3" />
                        Contract
                    </Link>  
                    <Link 
                        to='invoice'
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <i className="dashicons dashicons-text-page mr-3" />
                        Invoice
                    </Link> 
                    <Link 
                        to='payment'
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <i className="dashicons dashicons-money-alt mr-3" />
                        Payment
                    </Link> 
                    <Link 
                        to='template-library'
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <i className="dashicons dashicons-admin-page mr-3" />
                        Template Library
                    </Link> 
                    <Link 
                        to='client'
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <i className="dashicons dashicons-groups mr-3" />
                        Client
                    </Link> 
                    <Link 
                        to='setting'
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <i className="dashicons dashicons-admin-generic mr-3" />
                        Settings
                    </Link> 
                    <Link 
                        to='help'
                        className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                        <i className="dashicons dashicons-editor-help mr-3" />
                        Help
                    </Link>
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
        </>
    )
}

export default Home;