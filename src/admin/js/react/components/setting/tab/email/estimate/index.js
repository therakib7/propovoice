import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import Style from './style.scoped.scss'
// import Invoice from './tab/invoice';

// import Reminder from './sub/Reminder';

const Reminder = lazy(() => import('./sub/Reminder'));

 

export default function SettingWrap() {

    const { tab, subtab } = useParams();
    let navigate = useNavigate();

    let tabDefault = tab;
    let subtabDefault = subtab;
    if (tab === undefined) {
        tabDefault = 'reminder'
    }

    const tab_data = {
        reminder: {
            label: 'Reminder'
        },
        recurring: {
            label: 'Recurring'
        },
    };

    const [currentTab, setCurrentTab] = useState(tabDefault); 
    const [tabs, setTabs] = useState(tab_data);

    useEffect(() => { 

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
            <div className='pi-settings-vertical-subtabs'>
                <ul className='pi-settings-subtabs'>
                    {Object.keys(tabs).map(key =>
                        <li
                            key={key}
                            className={'pi-subtab ' + (key == currentTab ? 'pi-active' : '')}
                            onClick={() => addCurrentTab(key)}
                        >
                            {tabs[key].label}
                        </li>
                    )}
                </ul> 

                <div className="pi-setting-tab-content"> 
                    <Suspense fallback={<div>Loading...</div>}>
                        {currentTab == 'reminder' && <Reminder />}
                    </Suspense>
                </div> 
            </div>
        </>
    );
} 