import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Style from './style.scoped.scss' 
import Spinner from 'block/preloader/spinner';
import WithApi from 'hoc/Api'; 

const General = lazy(() => import('./tab/general')); 
const Task = lazy(() => import('./tab/task'));
const Lead = lazy(() => import('./tab/lead'));
const Deal = lazy(() => import('./tab/deal'));
const Estimate = lazy(() => import('./tab/estimate'));
const Invoice = lazy(() => import('./tab/invoice'));
const Project = lazy(() => import('./tab/project'));
const Contact = lazy(() => import('./tab/contact'));
const Tag = lazy(() => import('./tab/tag')); 
 
//subtab: email 
const EmailEstimate = lazy(() => import('./tab/email/estimate'));
const EmailInvoice = lazy(() => import('./tab/email/invoice')); 
const EmailSocial = lazy(() => import('./tab/email/social')); 

const Payment = lazy(() => import('components/payment'));


const SettingWrap = (props) => {

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
                    label: 'General'
                },
                task: {
                    label: 'Task & Activity'
                },
                lead: {
                    label: 'Lead'
                },
                deal: {
                    label: 'Deal'
                },
                estimate: {
                    label: 'Estimate'
                },
                invoice: {
                    label: 'Invoice'
                },
                project: {
                    label: 'Project'
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
                        social: {
                            label: 'Social'
                        },
                    },
                },
                contact: {
                    label: 'Contact'
                },
                tag: {
                    label: 'Tag'
                },
            };
            setTabs(new_tab_data);
        }

    }, []);

    const routeChange = (tab, subtab = null) => {
        if (subtab) {
            navigate(`/setting/${tab}/${subtab}`);
        } else {
            navigate(`/setting/${tab}`);
        }
    };

    const addCurrentTab = (e, tab, subtab = null) => {
        e.preventDefault();
        setCurrentTab(tab);
        setCurrentSubtab(subtab);
        routeChange(tab, subtab);
    };

    return (
        <>
            <nav className='pi-breadcrumb'>
                <ul>
                    <li><a href='#'>Home</a></li>
                    <li>
                        <svg
                            width={5}
                            height={10}
                            viewBox="0 0 5 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M.5 1.25L4.25 5 .5 8.75"
                                stroke="#718096"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </li>
                    <li className='pi-active'>Settings</li>
                </ul>
            </nav>

            <h2 className='pi-page-title'>Settings</h2>

            <div className='pi-settings-tab'>
                <div className='row'>
                    <div className='col-md-3'>
                        <ul className='pi-settings-tabs'>
                            {Object.keys(tabs).map(key =>
                                <li
                                    key={key}
                                    className={'pi-tab ' + (key == currentTab ? 'pi-active' : '')}
                                >
                                    <a onClick={(e) => addCurrentTab(e, key)}>
                                        {tabs[key].label}
                                    </a>

                                    {tabs[key].hasOwnProperty('subtabs') && tabs[key].subtabs && <ul className='pi-settings-subtabs'>
                                        {Object.keys(tabs[key].subtabs).map(subkey =>
                                            <li
                                                key={subkey}
                                                className={'pi-subtab ' + ((subkey == currentSubtab) || (!currentSubtab && Object.keys(tabs[key].subtabs)[0] == subkey) ? 'pi-active' : '')}
                                            >
                                                <a onClick={(e) => addCurrentTab(e, key, subkey)}>
                                                    {tabs[key].subtabs[subkey].label}
                                                </a>
                                            </li>
                                        )}
                                    </ul>}
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className='col-md-9'>
                        <div className="pi-setting-tab-content">
                            {/* <div className="pi-setting-heading-content">
                                <h3>Payment Info</h3>
                                <p>note: in this version, you can add only bank info in your invoice</p>
                            </div> */}

                            <h4 className='pi-title-medium pi-mb-15' style={{ textTransform: 'capitalize' }}>{currentTab} Settings</h4>

                            <Suspense fallback={<Spinner />}>

                                {currentTab == 'general' && <General />}
                                {currentTab == 'task' && <Task />}
                                {currentTab == 'lead' && <Lead />}
                                {currentTab == 'deal' && <Deal />}
                                {currentTab == 'estimate' && <Estimate />}
                                {currentTab == 'invoice' && <Invoice />}
                                {currentTab == 'project' && <Project />}  
                                {currentTab == 'payment' && <Payment />}

                                {currentTab == 'email' && (currentSubtab == 'estimate' || !currentSubtab) && <EmailEstimate />}
                                {currentTab == 'email' && currentSubtab == 'invoice' && <EmailInvoice />}
                                {currentTab == 'email' && currentSubtab == 'social' && <EmailSocial {...props} />}

                                {currentTab == 'contact' && <Contact />}
                                {currentTab == 'tag' && <Tag />}

                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 

export default WithApi(SettingWrap); 