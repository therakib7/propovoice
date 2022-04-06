import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
// import Style from './style.scoped.scss'
// import Invoice from './tab/invoice';

import General from './section/General';
import Business from './section/Business';
const Payment = lazy(() => import('components/payment')); 

export default function SettingWrap() { 

	const { tab } = useParams();
	let navigate = useNavigate(); 

    let section = tab; 
	if ( tab === undefined ) {
		section = 'general'
	} 

    const tabs = [
        /* {
            id: 'general',
            text: 'General'
        }, */
        {
            id: 'business',
            text: 'Business Info'
        },
        {
            id: 'payment',
            text: 'Payment'
        },
        /* {
            id: 'email',
            text: 'Email Template'
        },  */
    ];
    const [ currentTab, setCurrentTab ]   = useState(section); 

	const routeChange = tab => {
		navigate(`/setting/${tab}`, { replace: true });
	};  

    const addCurrentTab = (tab) => { 
		setCurrentTab(tab);
		routeChange(tab);
	};

	return ( 
		<>
			{/* <Invoice id={id} routeChange={routeChange}  routeInvoice={routeInvoice} path={path} key={path} /> */}
            <h1>Settings</h1>
            <nav className="pi-breadcrumb">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li>&gt;</li>
                    <li className="pi-active">Settings</li>
                </ul>
            </nav>

            <div className="pi-settings-tab">
                <ul className="pi-settings-tabs">
                    {tabs.map((tab, index) => (
                        <li 
                            key={index}
                            className={"pi-tab " + (tab.id == currentTab ? 'pi-active' : '' )}
                            onClick={() => addCurrentTab(tab.id)}
                        > 
                            {tab.text} 
                        </li>
                    ))}                      
                </ul>
                
                <div className="pi-setting-tab-content">
                    {/* <div className="pi-setting-heading-content">
                        <h3>Payment Info</h3>
                        <p>note: in this version, you can add only bank info in your invoice</p>
                    </div> */} 
                    {currentTab == 'general' && <General />}
                    {currentTab == 'business' && <Business />}
                    {currentTab == 'payment' && <Payment />} 
                </div>
                {/* ./ pi-tabs */}
            </div>
		</>
	);
} 