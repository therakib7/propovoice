import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Style from './style.scoped.scss' 

//subtab: general
const GeneralSocial = lazy(() => import('./tab/general/social'));

//subtab: estimate
const EstimateReminder = lazy(() => import('./tab/estimate/Reminder'));
const EstimateRecurring = lazy(() => import('./tab/estimate/Recurring'));

//subtab: invoice
const InvoiceReminder = lazy(() => import('./tab/invoice/Reminder'));
const InvoiceRecurring = lazy(() => import('./tab/invoice/Recurring'));

//subtab: email 
const EmailEstimate = lazy(() => import('./tab/email/estimate'));
const EmailInvoice = lazy(() => import('./tab/email/invoice'));

const BusinessSingle = lazy(() => import('./tab/business/index'));
const Business = lazy(() => import('components/business'));

const Payment = lazy(() => import('components/payment'));

export default function SettingWrap() {

    const { tab, subtab } = useParams();
    let navigate = useNavigate();

    let tabDefault = tab;
    let subtabDefault = subtab;
    if (tab === undefined) {
        tabDefault = 'general'
    }

    const tab_data = {
        business: {
            label: 'Business'
        },
        payment: {
            label: 'Payment'
        },
    };

    const [currentTab, setCurrentTab] = useState(tabDefault);
    const [currentSubtab, setCurrentSubtab] = useState(subtabDefault);
    const [tabs, setTabs] = useState(tab_data);

    useEffect(() => {
        if (!wage.length) {
            const new_tab_data = {
                general: {
                    label: 'General',
                    subtabs: {
                        social: {
                            label: 'Social',
                        },
                        /* template: {
                            label: 'Template',
                        }, */
                        /* recurring: { 
                            label: 'Recurring'
                        }, */
                    },
                }, 
                estimate: {
                    label: 'Estimate',
                    subtabs: {
                        reminder: {
                            label: 'Reminder',
                        },
                        template: {
                            label: 'Template',
                        }, 
                    },
                },
                invoice: {
                    label: 'Invoice',
                    subtabs: {
                        reminder: {
                            label: 'Reminder',
                        },
                        template: {
                            label: 'Template',
                        }, 
                    },
                },
                business: {
                    label: 'Business'
                },
                payment: {
                    label: 'Payment'
                },
                email: {
                    label: 'Email Template',
                    subtabs: { 
                        estimate: {
                            label: 'Estimate',
                        },
                        invoice: {
                            label: 'Invoice'
                        },
                    },
                },
            };
            setTabs(new_tab_data);
        }

    }, []);

    const routeChange = (tab, subtab = null) => {
        if (subtab) {
            navigate(`/setting/${tab}/${subtab}`, { replace: true });
        } else {
            navigate(`/setting/${tab}`, { replace: true });
        }
    };

    const addCurrentTab = (tab, subtab = null) => {
        if (subtab) {
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
                    {Object.keys(tabs).map(key =>
                        <li
                            key={key}
                            className={'pi-tab ' + (key == currentTab ? 'pi-active' : '')}
                            onClick={() => addCurrentTab(key)}
                        >
                            {tabs[key].label}
                        </li>
                    )}
                </ul>

                {tabs.hasOwnProperty(currentTab) && tabs[currentTab].hasOwnProperty('subtabs') && tabs[currentTab].subtabs && <ul className='pi-settings-subtabs'>
                    {Object.keys(tabs[currentTab].subtabs).map(key =>
                        <li
                            key={key}
                            className={'pi-subtab ' + ((key == currentSubtab) || (!currentSubtab && Object.keys(tabs[currentTab].subtabs)[0] == key) ? 'pi-active' : '')}
                            onClick={() => addCurrentTab(currentTab, key)}
                        >
                            {tabs[currentTab].subtabs[key].label}
                        </li>
                    )}
                </ul>}

                <div className="pi-setting-tab-content">
                    {/* <div className="pi-setting-heading-content">
                        <h3>Payment Info</h3>
                        <p>note: in this version, you can add only bank info in your invoice</p>
                    </div> */}

                    <Suspense fallback={<div>Loading...</div>}> 

                        {!wage.length &&
                            <>
                                {currentTab == 'general' && (currentSubtab == 'social' || !currentSubtab) && <GeneralSocial />} 
                            </>
                        }

                        {!wage.length &&
                            <>
                                {currentTab == 'estimate' && (currentSubtab == 'reminder' || !currentSubtab) && <EstimateReminder />}
                                {currentTab == 'estimate' && currentSubtab == 'recurring' && <EstimateRecurring />}

                                {currentTab == 'invoice' && (currentSubtab == 'reminder' || !currentSubtab) && <InvoiceReminder />}
                                {currentTab == 'invoice' && currentSubtab == 'recurring' && <InvoiceRecurring />}
                            </>
                        }

                        {!wage.length &&
                            <> 
                                {currentTab == 'email' && (currentSubtab == 'estimate' || !currentSubtab) && <EmailEstimate />}
                                {currentTab == 'email' && currentSubtab == 'invoice' && <EmailInvoice />}
                            </>
                        }

                        {currentTab == 'business' && wage.length > 0 && <BusinessSingle />}
                        {currentTab == 'business' && !wage.length && <Business />}
                        {currentTab == 'payment' && <Payment />}

                    </Suspense>
                </div>
                {/* ./ pi-tabs */}
            </div>
        </>
    );
} 