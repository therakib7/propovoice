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
const Intg = lazy(() => import('./tab/intg'));
const License = lazy(() => import('./tab/license'));

//subtab: email 
const EmailEstimate = lazy(() => import('./tab/email/estimate'));
const EmailInvoice = lazy(() => import('./tab/email/invoice'));
const EmailSocial = lazy(() => import('./tab/email/social'));

const Payment = lazy(() => import('cpnt/payment'));


const SettingWrap = (props) => {

    const { tab, subtab } = useParams();
    let navigate = useNavigate();

    let tabDefault = tab;
    let subtabDefault = subtab;
    if (tab === undefined) {
        tabDefault = 'general'
    }

    const i18n = ndpi.i18n;
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
        estimate: {
            label: i18n.est
        },
        invoice: {
            label: i18n.inv
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
            label: i18n.task
        },
        contact: {
            label: i18n.contact
        },
        tag: {
            label: i18n.tag
        },
        intg: {
            label: 'Intregation'
        },
    };

    const [currentTab, setCurrentTab] = useState(tabDefault);
    const [currentSubtab, setCurrentSubtab] = useState(subtabDefault);
    const [tabs, setTabs] = useState(tab_data);

    useEffect(() => {
        if (has_wage.ins) {
            let new_tabs = { ...tabs }
            new_tabs.license = {
                label: 'License Manager'
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
        setCurrentTab(tab);
        setCurrentSubtab(subtab);
        routeChange(tab, subtab);
    };

    return (
        <>
            <nav className='pi-breadcrumb'>
                <ul>
                    <li><a href='#'>{i18n.home}</a></li>
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
                    <li className='pi-active'>{i18n.settings}</li>
                </ul>
            </nav>

            <h2 className='pi-page-title'>{i18n.settings}</h2>

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
                            <h4 className='pi-title-medium pi-mb-15' style={{ textTransform: 'capitalize' }}>{tabs[currentTab].label} {i18n.settings}</h4>

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
                                {currentTab == 'intg' && <Intg {...props} />}
                                {currentTab == 'license' && <License {...props} />}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WithApi(SettingWrap); 