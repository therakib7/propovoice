import React, { Suspense, lazy } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    HashRouter, 
    useHistory,
    Routes,
    Route,
    NavLink
} from "react-router-dom"; 

const Dashboard = lazy(() => import('components/dashboard'));
const Client = lazy(() => import('components/client')); 

const Lead = lazy(() => import('components/lead'));
const Deal = lazy(() => import('components/deal'));
const Task = lazy(() => import('components/task'));
const ListSingle = lazy(() => import('components/list-single'));

const Project = lazy(() => import('components/project'));
//const Proposal = lazy(() => import('components/proposal'));
//const Editor = lazy(() => import('components/editor'));

const Proposal = lazy(() => import('components/proposal/list'));
const ProposalSingle = lazy(() => import('components/proposal/single'));

const Invoice = lazy(() => import('components/invoice/list'));
const InvoiceSingle = lazy(() => import('components/invoice/single'));

const Payment = lazy(() => import('components/payment'));
const Business = lazy(() => import('components/business'));

const ContactPerson = lazy(() => import('components/contact/person'));
const ContactOrg = lazy(() => import('components/contact/org'));
// const ContactSummary = lazy(() => import('components/contact/summary'));

const Setting = lazy(() => import('components/setting'));

const Home = () => {  
    let deal_papge = false;
    let url = location.href;
    if ( url.includes('/deal') && ! url.includes('/deal/single') ) {
        console.log(url);
    } 
    return ( 
        <HashRouter>
            <ToastContainer />
            <div className="pi-grid-container pi-main-content">
                <div className="pi-left-sidebar" >
                    <div className="pi-menubar-icon" >
                        <svg viewBox="0 0 100 80" width="20" height="25">
                            <rect width="100" height="11"></rect>
                            <rect y="29" width="100" height="12"></rect>
                            <rect y="57" width="100" height="12"></rect>
                        </svg>
                    </div>
                    <div >
                        <div className="pi-logo-content">
                            <img src={ncpi.assetImgUri + 'logo.png'} />
                            <strong >Propovoice</strong>
                        </div>
                        <ul>
                            <li>
                                <NavLink
                                    to='/'
                                    className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                    <svg
                                        width={18}
                                        height={18}
                                        className="mt-3"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0 9C0 6.61305 0.948212 4.32387 2.63604 2.63604C4.32387 0.948212 6.61305 0 9 0V9H18C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18C6.61305 18 4.32387 17.0518 2.63604 15.364C0.948212 13.6761 0 11.3869 0 9Z"
                                            fill="#5F5F5F"
                                        />
                                        <path
                                            d="M11.25 0.283508C12.8066 0.68678 14.227 1.49901 15.364 2.63602C16.501 3.77303 17.3132 5.19343 17.7165 6.75001H11.25V0.283508Z"
                                            fill="#5F5F5F"
                                        />
                                    </svg>
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='client'
                                    className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                    <svg
                                        width={18}
                                        height={18}
                                        className="mt-3"
                                        viewBox="0 0 18 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 2.893c0 .767-.316 1.503-.879 2.045A3.057 3.057 0 015 5.786a3.057 3.057 0 01-2.121-.848A2.841 2.841 0 012 2.893c0-.767.316-1.503.879-2.046A3.057 3.057 0 015 0c.796 0 1.559.305 2.121.847C7.684 1.39 8 2.126 8 2.893zm8 0c0 .38-.078.756-.228 1.107-.151.35-.372.67-.65.938a3.01 3.01 0 01-.974.628 3.097 3.097 0 01-2.296 0 3.01 3.01 0 01-.973-.628 2.887 2.887 0 01-.65-.938A2.803 2.803 0 0110 2.893c0-.767.316-1.503.879-2.046A3.057 3.057 0 0113 0c.796 0 1.559.305 2.121.847.563.543.879 1.279.879 2.046zM11.93 13.5a6.57 6.57 0 00-1.43-5.14 5.143 5.143 0 012.5-.646c.878 0 1.74.223 2.5.646a4.915 4.915 0 011.83 1.765 4.69 4.69 0 01.67 2.41v.965h-6.07zM5 7.714c1.326 0 2.598.508 3.536 1.412A4.736 4.736 0 0110 12.536v.964H0v-.964c0-1.279.527-2.505 1.464-3.41A5.096 5.096 0 015 7.714z"
                                            fill="#5F5F5F"
                                        />
                                    </svg>
                                    <span>Client</span>
                                </NavLink>

                                <NavLink
                                    to='lead'
                                    className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                    <svg
                                        width={18}
                                        height={18}
                                        className="mt-3"
                                        viewBox="0 0 18 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 2.893c0 .767-.316 1.503-.879 2.045A3.057 3.057 0 015 5.786a3.057 3.057 0 01-2.121-.848A2.841 2.841 0 012 2.893c0-.767.316-1.503.879-2.046A3.057 3.057 0 015 0c.796 0 1.559.305 2.121.847C7.684 1.39 8 2.126 8 2.893zm8 0c0 .38-.078.756-.228 1.107-.151.35-.372.67-.65.938a3.01 3.01 0 01-.974.628 3.097 3.097 0 01-2.296 0 3.01 3.01 0 01-.973-.628 2.887 2.887 0 01-.65-.938A2.803 2.803 0 0110 2.893c0-.767.316-1.503.879-2.046A3.057 3.057 0 0113 0c.796 0 1.559.305 2.121.847.563.543.879 1.279.879 2.046zM11.93 13.5a6.57 6.57 0 00-1.43-5.14 5.143 5.143 0 012.5-.646c.878 0 1.74.223 2.5.646a4.915 4.915 0 011.83 1.765 4.69 4.69 0 01.67 2.41v.965h-6.07zM5 7.714c1.326 0 2.598.508 3.536 1.412A4.736 4.736 0 0110 12.536v.964H0v-.964c0-1.279.527-2.505 1.464-3.41A5.096 5.096 0 015 7.714z"
                                            fill="#5F5F5F"
                                        />
                                    </svg>
                                    <span>Lead</span>
                                </NavLink>

                                <NavLink
                                    to='deal'
                                    className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                    <svg
                                        width={18}
                                        height={18}
                                        className="mt-3"
                                        viewBox="0 0 18 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8 2.893c0 .767-.316 1.503-.879 2.045A3.057 3.057 0 015 5.786a3.057 3.057 0 01-2.121-.848A2.841 2.841 0 012 2.893c0-.767.316-1.503.879-2.046A3.057 3.057 0 015 0c.796 0 1.559.305 2.121.847C7.684 1.39 8 2.126 8 2.893zm8 0c0 .38-.078.756-.228 1.107-.151.35-.372.67-.65.938a3.01 3.01 0 01-.974.628 3.097 3.097 0 01-2.296 0 3.01 3.01 0 01-.973-.628 2.887 2.887 0 01-.65-.938A2.803 2.803 0 0110 2.893c0-.767.316-1.503.879-2.046A3.057 3.057 0 0113 0c.796 0 1.559.305 2.121.847.563.543.879 1.279.879 2.046zM11.93 13.5a6.57 6.57 0 00-1.43-5.14 5.143 5.143 0 012.5-.646c.878 0 1.74.223 2.5.646a4.915 4.915 0 011.83 1.765 4.69 4.69 0 01.67 2.41v.965h-6.07zM5 7.714c1.326 0 2.598.508 3.536 1.412A4.736 4.736 0 0110 12.536v.964H0v-.964c0-1.279.527-2.505 1.464-3.41A5.096 5.096 0 015 7.714z"
                                            fill="#5F5F5F"
                                        />
                                    </svg>
                                    <span>Deal Pipeline</span>
                                </NavLink>

                                {/* <ul className='pi-sub-menu'>
                                    <li>
                                        <NavLink
                                            to='project'
                                            className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                            <i className="dashicons dashicons-groups mr-3" />
                                            Project
                                        </NavLink>
                                    </li>
                                </ul> */}
                            </li>
                            {!wage.length && <li>
                                <NavLink
                                    to='project'
                                    className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                    <svg
                                        width={18}
                                        height={18}
                                        viewBox="0 0 18 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0 3a3 3 0 013-3h6.879A3 3 0 0112 .879L17.121 6A3 3 0 0118 8.121V21a3 3 0 01-3 3H3a3 3 0 01-3-3V3zm3 9a1.5 1.5 0 011.5-1.5h9a1.5 1.5 0 110 3h-9A1.5 1.5 0 013 12zm1.5 4.5a1.5 1.5 0 100 3h9a1.5 1.5 0 100-3h-9z"
                                            fill="#5F5F5F"
                                        />
                                    </svg>
                                    <span>Project</span>
                                </NavLink>
                            </li>}

                            <li>
                                <NavLink
                                    to='estimate'
                                    className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                    <svg
                                        width={18}
                                        height={18}
                                        viewBox="0 0 15 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0 2.75A2.5 2.5 0 012.5.25 3.75 3.75 0 006.25 4h2.5A3.75 3.75 0 0012.5.25a2.5 2.5 0 012.5 2.5V16.5a2.5 2.5 0 01-2.5 2.5h-10A2.5 2.5 0 010 16.5V2.75zm3.75 5a1.25 1.25 0 000 2.5h.013a1.25 1.25 0 000-2.5H3.75zm3.75 0a1.25 1.25 0 000 2.5h3.75a1.25 1.25 0 000-2.5H7.5zm-3.75 5a1.25 1.25 0 000 2.5h.013a1.25 1.25 0 000-2.5H3.75zm3.75 0a1.25 1.25 0 000 2.5h3.75a1.25 1.25 0 000-2.5H7.5z"
                                            fill="#5F5F5F"
                                        />
                                    </svg>
                                    <span>Estimate</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='invoice'
                                    className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                    <svg
                                        width={18}
                                        height={18}
                                        viewBox="0 0 18 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0 3a3 3 0 013-3h6.879A3 3 0 0112 .879L17.121 6A3 3 0 0118 8.121V21a3 3 0 01-3 3H3a3 3 0 01-3-3V3zm3 9a1.5 1.5 0 011.5-1.5h9a1.5 1.5 0 110 3h-9A1.5 1.5 0 013 12zm1.5 4.5a1.5 1.5 0 100 3h9a1.5 1.5 0 100-3h-9z"
                                            fill="#5F5F5F"
                                        />
                                    </svg>
                                    <span>Invoice</span>
                                </NavLink>
                            </li>
                            {/* <li><NavLink
                                to='proposal'
                                className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                <i className="dashicons dashicons-portfolio mr-3" />
                                Proposal
                            </NavLink></li>
                            <li><NavLink
                                to='editor'
                                className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                <i className="dashicons dashicons-portfolio mr-3" />
                                Proposal Test
                            </NavLink></li> */}
                            <li><NavLink
                                to='payment'
                                className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                <svg
                                    width={18}
                                    height={18}
                                    viewBox="0 0 18 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.25 0A2.25 2.25 0 000 2.25v1.125h18V2.25A2.25 2.25 0 0015.75 0H2.25z"
                                        fill="#5F5F5F"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18 5.625H0v5.625a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0018 11.25V5.625zm-15.75 4.5A1.125 1.125 0 013.375 9H4.5a1.125 1.125 0 110 2.25H3.375a1.125 1.125 0 01-1.125-1.125zM7.875 9a1.125 1.125 0 100 2.25H9A1.125 1.125 0 109 9H7.875z"
                                        fill="#5F5F5F"
                                    />
                                </svg>
                                <span>Payment</span>
                            </NavLink></li>
                            <li><NavLink
                                to='business'
                                className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                <svg
                                    width={18}
                                    height={18}
                                    className="mt-3"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 2.893c0 .767-.316 1.503-.879 2.045A3.057 3.057 0 015 5.786a3.057 3.057 0 01-2.121-.848A2.841 2.841 0 012 2.893c0-.767.316-1.503.879-2.046A3.057 3.057 0 015 0c.796 0 1.559.305 2.121.847C7.684 1.39 8 2.126 8 2.893zm8 0c0 .38-.078.756-.228 1.107-.151.35-.372.67-.65.938a3.01 3.01 0 01-.974.628 3.097 3.097 0 01-2.296 0 3.01 3.01 0 01-.973-.628 2.887 2.887 0 01-.65-.938A2.803 2.803 0 0110 2.893c0-.767.316-1.503.879-2.046A3.057 3.057 0 0113 0c.796 0 1.559.305 2.121.847.563.543.879 1.279.879 2.046zM11.93 13.5a6.57 6.57 0 00-1.43-5.14 5.143 5.143 0 012.5-.646c.878 0 1.74.223 2.5.646a4.915 4.915 0 011.83 1.765 4.69 4.69 0 01.67 2.41v.965h-6.07zM5 7.714c1.326 0 2.598.508 3.536 1.412A4.736 4.736 0 0110 12.536v.964H0v-.964c0-1.279.527-2.505 1.464-3.41A5.096 5.096 0 015 7.714z"
                                        fill="#5F5F5F"
                                    />
                                </svg>
                                <span>Business</span>
                            </NavLink></li>
                            <li><NavLink
                                to='setting'
                                className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                <svg
                                    width={18}
                                    height={18}
                                    className="mt-3"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.25 0A2.25 2.25 0 000 2.25v1.125h18V2.25A2.25 2.25 0 0015.75 0H2.25z"
                                        fill="#5F5F5F"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18 5.625H0v5.625a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0018 11.25V5.625zm-15.75 4.5A1.125 1.125 0 013.375 9H4.5a1.125 1.125 0 110 2.25H3.375a1.125 1.125 0 01-1.125-1.125zM7.875 9a1.125 1.125 0 100 2.25H9A1.125 1.125 0 109 9H7.875z"
                                        fill="#5F5F5F"
                                    />
                                </svg>
                                <span>Settings</span>
                            </NavLink></li>
                            {/* <li><NavLink
                                to='help'
                                className={({ isActive }) => isActive ? 'pi-active' : ''}>
                                <i className="dashicons dashicons-editor-help mr-3" />
                                Help
                            </NavLink></li> */}
                        </ul>
                    </div>
                </div>

                <div className='pi-right-content pi-bg-pearl'>
                    <div className='pi-right-content-data '> {/* TODO: conditional class pi-deal-content */} 
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                {/* <Route path="/proposal" element={<Proposal />} /> */}
                                {/* <Route path="/proposal" element={<Editor />} /> */}

                                <Route path="/client" exact element={<Client />} />
                                <Route path="/client/single/:id" exact element={<ListSingle />} />

                                <Route path="/lead" exact element={<Lead />} />
                                <Route path="/lead/single/:id" exact element={<ListSingle />} />

                                <Route path="/deal" exact element={<Deal />} />
                                <Route path="/deal/single/:id" exact element={<ListSingle />} />

                                <Route path="/task" exact element={<Task />} />
                                <Route path="/task/single/:id" exact element={<ListSingle />} />

                                <Route path="/project" exact element={<Project />} />
                                <Route path="/project/single/:id" exact element={<ListSingle />} />

                                <Route path="/proposal" element={<Proposal />} />
                                <Route path="/proposal/single" element={<ProposalSingle />} />
                                <Route path="/proposal/single/:id" element={<ProposalSingle />} />
                                <Route path="/proposal/single/:id/tab/:tab" element={<ProposalSingle />} />

                                <Route path="/estimate" element={<Invoice />} />
                                <Route path="/estimate/single" element={<InvoiceSingle />} />
                                <Route path="/estimate/single/:id" element={<InvoiceSingle />} />
                                <Route path="/estimate/single/:id/tab/:tab" element={<InvoiceSingle />} />

                                <Route path="/invoice" element={<Invoice />} />
                                <Route path="/invoice/single" element={<InvoiceSingle />} />
                                <Route path="/invoice/single/:id" element={<InvoiceSingle />} />
                                <Route path="/invoice/single/:id/tab/:tab" element={<InvoiceSingle />} />

                                <Route path="/payment" element={<Payment />} /> 
                                <Route path="/business" element={<Business />} /> 

                                <Route path="/contact/person" exact element={<ContactPerson />} />
                                <Route path="/contact/organization" exact element={<ContactOrg />} />
                                <Route path="/contact/single/:id" exact element={<ListSingle />} />

                                <Route path="/setting" element={<Setting />} />
                                <Route path="/setting/:tab" element={<Setting />} />
                                <Route path="/setting/:tab/:subtab" element={<Setting />} />
                                <Route path="/setting/:tab/:subtab/:insubtab" element={<Setting />} />
                                {/* <Route path="/help" element={<Help />} /> */}
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
        </HashRouter> 
    )
}

export default Home;