import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
// import Style from './style.scoped.scss'
// import Invoice from './tab/invoice';

const General = lazy(() => import('./tab/General'));

//subtab: mail
const Reminder = lazy(() => import('./tab/mail/Reminder'));
const Recurring = lazy(() => import('./tab/mail/Recurring'));

const Business = lazy(() => import('./tab/Business'));
const Payment = lazy(() => import('components/payment')); 

export default function SettingWrap() { 

	const { tab, subtab } = useParams();
	let navigate = useNavigate(); 

    let tabDefault = tab; 
    let subtabDefault = subtab; 
	if ( tab === undefined ) {
		tabDefault = 'general'
	} 

    const tab_data = [ 
        {
            id: 'business',
            text: 'Business Info'
        },
        {
            id: 'payment',
            text: 'Payment'
        }, 
    ];
    
    const [ currentTab, setCurrentTab ] = useState(tabDefault); 
    const [ currentSubtab, setCurrentSubtab ] = useState(subtabDefault); 
    const [ tabs, setTabs ] = useState(tab_data); 

    useEffect( () => {
        
        if ( !wage.length ) {
            const new_tab_data = [ 
                {
                    id: 'reminder',
                    text: 'Reminder'  
                },
                {
                    id: 'mail',
                    text: 'Mail Template',
                    subtabs: [
                        {
                            id: 'reminder',
                            text: 'Reminder', 
                        }, 
                        {
                            id: 'recurring',
                            text: 'Recurring'
                        }, 
                    ],
                },  
            ];
            setTabs( new_tab_data );
        }
    }, [] )

	const routeChange = (tab, subtab = null) => { 
        if ( subtab ) { 
            navigate(`/setting/${tab}/${subtab}`, { replace: true });
        } else {
            navigate(`/setting/${tab}`, { replace: true });
        } 
	};  

    const addCurrentTab = (tab, subtab = null) => { 
        if ( subtab ) { 
            setCurrentSubtab(subtab);
        } else {
            setCurrentTab(tab);
            setCurrentSubtab(null);
        }
		routeChange(tab, subtab);
	}; 

	return ( 
		<> 
            <h1>Settings</h1>
            <nav className='pi-breadcrumb'>
                <ul>
                    <li><a href='#'>Home</a></li>
                    <li>&gt;</li>
                    <li className='pi-active'>Settings</li>
                </ul>
            </nav>

            <div className='pi-settings-tab'>
                <ul className='pi-settings-tabs'>
                    {tabs.map((tab, index) => (
                        <li 
                            key={index}
                            className={'pi-tab ' + (tab.id == currentTab ? 'pi-active' : '' )} 
                        >   
                            <a onClick={() => addCurrentTab(tab.id)}>{tab.text}</a>                            
                            {tab.hasOwnProperty('subtabs') && tab.subtabs.length > 0 && <ul className='pi-settings-subtabs'>
                                {tab.subtabs.map((subtab, subindex) => (
                                    <li 
                                        key={subindex}
                                        className={'pi-subtab ' + (subtab.id == currentSubtab ? 'pi-active' : '' )}
                                    > 
                                        <a onClick={() => addCurrentTab(tab.id, subtab.id)}>{subtab.text}</a>
                                    </li>
                                ))}                      
                            </ul>} 
                        </li>
                    ))}                      
                </ul> 
                
                <div className="pi-setting-tab-content">
                    {/* <div className="pi-setting-heading-content">
                        <h3>Payment Info</h3>
                        <p>note: in this version, you can add only bank info in your invoice</p>
                    </div> */} 

                    <Suspense fallback={<div>Loading...</div>}>
                        {/* {currentTab == 'general' && <General />} */}

                        {!wage.length && 
                            <>
                                {currentTab == 'mail' && currentSubtab == 'reminder' && <Reminder />}
                                {currentTab == 'mail' && currentSubtab == 'recurring' && <Recurring />}
                            </>
                        }

                        {wage.length > 0 &&   
                            <>
                                {currentTab == 'business' && <Business />}
                                {currentTab == 'payment' && <Payment />}  
                            </>
                        }
                        
                    </Suspense>
                </div>
                {/* ./ pi-tabs */}
            </div>
		</>
	);
} 