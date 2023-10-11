import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Spinner from 'block/preloader/spinner';
import WithApi from 'hoc/Api';

//subtab: general
const General = lazy(() => import('./tab/general'));
const Password = lazy(() => import('./tab/password'));

const Task = lazy(() => import('./tab/task'));
const Lead = lazy(() => import('./tab/lead'));
const Deal = lazy(() => import('./tab/deal'));

//subtab: estinv
const EstinvCom = lazy(() => import('./tab/estinv/common'));
const Estest = lazy(() => import('./tab/estinv/est'));
const Estinv = lazy(() => import('./tab/estinv/inv'));

const Project = lazy(() => import('./tab/project'));
const Contact = lazy(() => import('./tab/contact'));
const Tag = lazy(() => import('./tab/tag'));
const CustomField = lazy(() => import('./tab/custom-field'));
const Integrate = lazy(() => import('./tab/integrate'));
const Team = lazy(() => import('./tab/team'));
const PublicApi = lazy(() => import("./tab/public-api"));

const Notification = lazy(() => import('./tab/notification'));
const License = lazy(() => import('./tab/license'));

//subtab: email
const EmailSMTP = lazy(() => import('./tab/email/smtp'));
const EmailSystemTemplate = lazy(() => import('./tab/email/system-template'));

const Payment = lazy(() => import('cpnt/payment'));

const Setting = (props) => {

  const { tab, subtab } = useParams();
  let navigate = useNavigate();

  const { i18n, caps } = ndpv;
  const isClientStaff = caps.includes("ndpv_client_role") || caps.includes("ndpv_staff");
  const isNotClientStaff = !caps.includes("ndpv_client_role") || !caps.includes("ndpv_staff");
  const isAdmin = !caps.includes("ndpv_client_role") && !caps.includes("ndpv_staff") && !caps.includes("ndpv_manager");

  let tabDefault = tab;
  let subTabDefault = subtab;
  if (tab === undefined) {
    tabDefault = 'general'
  }

  const tab_data = {};

  if (true) {
    tab_data.general = {
      label: i18n.gen
    };
  }
  if (caps.includes("ndpv_lead")) {
    tab_data.lead = {
      label: i18n.lead
    };
  }
  if (caps.includes("ndpv_deal")) {
    tab_data.deal = {
      label: i18n.deal
    };
  }
  if (caps.includes("ndpv_estimate") || caps.includes("ndpv_invoice")) {
    tab_data.estinv = {
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
    };
  }
  if (caps.includes("ndpv_project")) {
    tab_data.project = {
      label: i18n.project
    };
  }
  if (isAdmin) {
    tab_data.payment = {
      label: i18n.payment
    };
  }
  if (isAdmin) {
    tab_data.email = {
      label: 'Email',
      subtabs: {
        delivery: {
          label: 'Email Delivery',
        },
        'system-template': {
          label: 'System Email Template',
        }
      },
    };
  }
  if (caps.includes("ndpv_task")) {
    tab_data.task = {
      label: i18n.taska
    };

  }
  if (caps.includes("ndpv_contact")) {
    tab_data.contact = {
      label: i18n.ct
    };
  }
  if (isNotClientStaff) {
    tab_data.tag = {
      label: i18n.tag
    };
  }
  if (isAdmin) {
    tab_data['custom-field'] = {
      label: i18n.cus + ' ' + i18n.field
    };

  }
  if (isAdmin) {
    tab_data.integration = {
      label: i18n.intg
    };
  }
  if (isAdmin && !wage.length) {
    tab_data.team = {
      label: 'Team'
    };
  }
  if (isAdmin && !wage.length) {
    tab_data['public-api'] = {
      label: 'Public API'
    };
  }

  const [currentTab, setCurrentTab] = useState(tabDefault);
  const [currentSubtab, setCurrentSubtab] = useState(subTabDefault);
  const [tabs, setTabs] = useState(tab_data);

  useEffect(() => {
    if (isClientStaff) {
      setTabs({
        general: {
          label: i18n.gen
        },
        password: {
          label: 'Password'
        }
      });
    } else {
      if (has_wage.ins) {
        let new_tabs = { ...tabs }
        if (isAdmin) {
          new_tabs.license = {
            label: i18n.licman
          }
        }
        setTabs(new_tabs);
      }
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
              <h4 className='pv-title-medium pv-mb-15' style={{ textTransform: 'capitalize' }}>{tabs[currentTab] && tabs[currentTab].label}{(currentTab != 'custom-field' && currentTab != 'integration') && currentSubtab && tabs[currentTab].subtabs[currentSubtab] && ': ' + tabs[currentTab].subtabs[currentSubtab].label} {i18n.settings}</h4>
              {/* //TODO: subtab temp fix for integration */}

              <Suspense fallback={<Spinner />}>
                {currentTab == 'general' && <General />}
                {currentTab == 'password' && <Password />}
                {currentTab == 'task' && <Task />}
                {currentTab == 'lead' && <Lead />}
                {currentTab == 'deal' && <Deal />}
                {currentTab == 'estinv' && (currentSubtab == 'common' || !currentSubtab) && <EstinvCom {...props} />}
                {currentTab == 'estinv' && currentSubtab == 'est' && <Estest {...props} />}
                {currentTab == 'estinv' && currentSubtab == 'inv' && <Estinv {...props} />}

                {currentTab == 'project' && <Project {...props} />}
                {currentTab == 'payment' && <Payment {...props} />}

                {currentTab == 'email' && (currentSubtab == 'delivery' || !currentSubtab) && <EmailSMTP {...props} />}
                {currentTab == 'email' && (currentSubtab == 'system-template' || !currentSubtab) && <EmailSystemTemplate {...props} />}
                {currentTab == 'contact' && <Contact />}
                {currentTab == 'tag' && <Tag />}
                {currentTab == 'custom-field' && <CustomField {...props} />}
                {currentTab == 'integration' && <Integrate {...props} />}
                {currentTab == 'team' && <Team {...props} />}
                {currentTab == "public-api" && <PublicApi {...props} />}
                {currentTab == "notification" && <Notification {...props} />}
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
