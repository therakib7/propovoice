import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Style from './style.scoped.scss' 
import Spinner from 'block/preloader/spinner';
import WithApi from 'hoc/Api';

//subtab: general 
const General = lazy(() => import('./tab/general')); 

const Task = lazy(() => import('./tab/task'));
const Lead = lazy(() => import('./tab/lead'));
const Deal = lazy(() => import('./tab/deal')); 

//subtab: estinv 
const EstinvCom = lazy(() => import('./tab/estinv/common'));
const EstinvEst = lazy(() => import('./tab/estinv/est'));
const EstinvInv = lazy(() => import('./tab/estinv/inv'));

const Project = lazy(() => import('./tab/project'));
const Contact = lazy(() => import('./tab/contact'));
const Tag = lazy(() => import('./tab/tag'));
const Integrate = lazy(() => import('./tab/integrate'));
const License = lazy(() => import('./tab/license'));

//subtab: email 
const EmailEstimate = lazy(() => import('./tab/email/estimate'));
const EmailInvoice = lazy(() => import('./tab/email/invoice'));
const EmailSocial = lazy(() => import('./tab/email/social'));

const Payment = lazy(() => import('cpnt/payment'));

const Setting = (props) => {

    const { tab, subtab } = useParams();
    let navigate = useNavigate();

    let tabDefault = tab;
    let subtabDefault = subtab;
    if (tab === undefined) {
        tabDefault = 'general'
    }

    const i18n = ndpv.i18n;
    const tab_data = {
        general: {
            label: i18n.general
        },
        lead: {
            label: i18n.lead
        },
        deal: {
            label: i18n.deal
        },
        /* estimate: {
            label: i18n.est
        },
        invoice: {
            label: i18n.inv
        }, */
        estinv: {
            label: i18n.est + ' ' + i18n.nd + ' ' + i18n.inv,
            subtabs: {
                common: {
                    label: i18n.cmn,
                },
                est: {
                    label: i18n.est
                },
                inv: {
                    label: i18n.inv
                },
            },
        },
        project: {
            label: i18n.project
        },
        payment: {
            label: i18n.payment
        },
        email: {
            label: i18n.email + ' ' + i18n.tmpl,
            subtabs: {
                estimate: {
                    label: i18n.est,
                },
                invoice: {
                    label: i18n.inv
                },
                social: {
                    label: i18n.social
                },
            },
        },
        task: {
            label: i18n.taska
        },
        contact: {
            label: i18n.ct
        },
        tag: {
            label: i18n.tag
        },
        integration: {
            label: i18n.intg
        },
    };

    const [currentTab, setCurrentTab] = useState(tabDefault);
    const [currentSubtab, setCurrentSubtab] = useState(subtabDefault);
    const [tabs, setTabs] = useState(tab_data);

    useEffect(() => {
        if (has_wage.ins) {
            let new_tabs = { ...tabs }
            new_tabs.license = {
                label: i18n.limang
            }
            setTabs(new_tabs);
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
        if (!subtab) {
            subtab = tabs[tab].hasOwnProperty('subtabs') && Object.keys(tabs[tab].subtabs)[0];
        }
        setCurrentTab(tab);
        setCurrentSubtab(subtab);
        routeChange(tab, subtab);
    };

    return (
        <>
            <nav className='pv-breadcrumb'>
                <ul>
                    <li><a href='#'>{i18n.home}</a></li>
                    <li>
                        <svg
                            width={5}
                            height={10}
                            viewBox="0 0 5 10"
                            fill="none"

                        >
                            <path
                                d="M.5 1.25L4.25 5 .5 8.75"
                                stroke="#718096"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </li>
                    <li className='pv-active'>{i18n.settings}</li>
                </ul>
            </nav>

            <h2 className='pv-page-title'>{i18n.settings}</h2>

            <div className='pv-settings-tab'>
                <div className='row'>
                    <div className='col-md-3'>
                        <ul className='pv-settings-tabs'>
                            {Object.keys(tabs).map(key =>
                                <li
                                    key={key}
                                    className={'pv-tab ' + (key == currentTab ? 'pv-active' : '')}
                                >
                                    <a onClick={(e) => addCurrentTab(e, key)}>
                                        {tabs[key].label}
                                    </a>

                                    {tabs[key].hasOwnProperty('subtabs') && tabs[key].subtabs && <ul className='pv-settings-subtabs'>
                                        {Object.keys(tabs[key].subtabs).map(subkey =>
                                            <li
                                                key={subkey}
                                                className={'pv-subtab ' + ((subkey == currentSubtab) || (!currentSubtab && Object.keys(tabs[key].subtabs)[0] == subkey) ? 'pv-active' : '')}
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
                        <div className="pv-setting-tab-content">
                            <h4 className='pv-title-medium pv-mb-15' style={{ textTransform: 'capitalize' }}>{tabs[currentTab] && tabs[currentTab].label}{currentSubtab && tabs[currentTab].subtabs[currentSubtab] && ': ' + tabs[currentTab].subtabs[currentSubtab].label} {i18n.settings}</h4>

                            <Suspense fallback={<Spinner />}>
                                {currentTab == 'general' && <General />}

                                {currentTab == 'task' && <Task />}
                                {currentTab == 'lead' && <Lead />}
                                {currentTab == 'deal' && <Deal />} 
                                {currentTab == 'estinv' && (currentSubtab == 'common' || !currentSubtab) && <EstinvCom {...props} />}
                                {currentTab == 'estinv' && currentSubtab == 'est' && <EstinvEst {...props} />}
                                {currentTab == 'estinv' && currentSubtab == 'inv' && <EstinvInv {...props} />}

                                {currentTab == 'project' && <Project {...props} />}
                                {currentTab == 'payment' && <Payment {...props} />}

                                {currentTab == 'email' && (currentSubtab == 'estimate' || !currentSubtab) && <EmailEstimate {...props} />}
                                {currentTab == 'email' && currentSubtab == 'invoice' && <EmailInvoice {...props} />}
                                {currentTab == 'email' && currentSubtab == 'social' && <EmailSocial {...props} />}
                                {currentTab == 'contact' && <Contact />}
                                {currentTab == 'tag' && <Tag />}
                                {currentTab == 'integration' && <Integrate {...props} />}
                                {currentTab == 'license' && <License {...props} />}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WithApi(Setting); 