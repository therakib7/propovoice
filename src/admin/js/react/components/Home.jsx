import React, { useState, useEffect, Suspense, lazy } from 'react';

import {
    HashRouter,
    Routes,
    Route,
    NavLink
} from "react-router-dom";

import Dashboard from './Dashboard';
import Client from './client/client';
import Project from './project';
import ClientSummary from './client/client-summary';
// const Client = lazy(() => import('./client')); //TODO: need to seen path wp-content/folders root
import Proposal from './proposal';
import Editor from './editor';
// const Editor = lazy(() => import('./editor')); 
import Contract from './Contract';
import Estimate from './estimate';
import Invoice from './invoice/invoice';
import InvoiceSingle from './invoice/invoice-single';
import Payment from './Payment';
import TemplateLibrary from './TemplateLibrary';
import Business from './business';
import Setting from './setting';
import Help from './Help';

const Home = () => {

    return (
        <>
            <HashRouter>
                <aside className="relative ncpi-h-screen w-64 hidden sm:block shadow-xl">
                    <div className="p-6 pb-5">
                        <a href="#" className="text-3xl font-semibold text-gray-800 hover:text-purple-700 hover:text-purple-700">Propovoice</a>
                    </div>
                    <nav className="text-base">
                        <NavLink
                            to='/'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-dashboard mr-3" />
                            Dashboard
                        </NavLink>
                        <NavLink
                            to='client'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-groups mr-3" />
                            Client
                        </NavLink>
                        <NavLink
                            to='project'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-groups mr-3" />
                            Project
                        </NavLink>
                        <NavLink
                            to='estimate'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-groups mr-3" />
                            Estimate
                        </NavLink>
                        <NavLink
                            to='invoice'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-text-page mr-3" />
                            Invoice
                        </NavLink>
                        <NavLink
                            to='proposal'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-portfolio mr-3" />
                            Proposal
                        </NavLink>
                        <NavLink
                            to='editor'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-portfolio mr-3" />
                            Proposal Test
                        </NavLink>
                        <NavLink
                            to='contract'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-groups mr-3" />
                            Contract
                        </NavLink>
                        <NavLink
                            to='payment'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-money-alt mr-3" />
                            Payment
                        </NavLink>
                        <NavLink
                            to='template-library'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-admin-page mr-3" />
                            Template Library
                        </NavLink>
                        <NavLink
                            to='business'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-admin-generic mr-3" />
                            Business
                        </NavLink>
                        <NavLink
                            to='setting'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-admin-generic mr-3" />
                            Settings
                        </NavLink>
                        <NavLink
                            to='help'
                            className={({ isActive }) => "flex items-center text-gray-700 hover:text-purple-700 py-4 pl-6 nav-item " + (isActive ? "active-nav-link " : "")}>
                            <i className="dashicons dashicons-editor-help mr-3" />
                            Help
                        </NavLink>
                    </nav>

                    {/* <a href="#" className="absolute w-full upgrade-btn bottom-0 active-nav-link text-gray-700 hover:text-purple-700 flex items-center justify-center py-4">
                        <i className="dashicons dashicons-upload mr-3" />
                        Upgrade to Pro!
                    </a> */}
                </aside>

                <div className="w-full ncpi-h-screen overflow-y-hidden p-6">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/proposal" element={<Proposal />} />
                            <Route path="/editor" element={<Editor />} />
                            <Route path="/contract" element={<Contract />} />
                            <Route path="/estimate" element={<Estimate />} />
                            <Route path="/invoice" element={<Invoice />} />
                            <Route path="/invoice/single" element={<InvoiceSingle />} />
                            <Route path="/invoice/single/:id" element={<InvoiceSingle />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/template-library" element={<TemplateLibrary />} />
                            <Route path="/client" exact element={<Client />} />
                            <Route path="/project" exact element={<Project />} />
                            <Route path="/client/:id" exact element={<ClientSummary />} />
                            <Route path="/business" element={<Business />} />
                            <Route path="/setting" element={<Setting />} />
                            <Route path="/help" element={<Help />} />
                        </Routes>
                    </Suspense>
                </div>
            </HashRouter>
        </>
    )
}

export default Home;