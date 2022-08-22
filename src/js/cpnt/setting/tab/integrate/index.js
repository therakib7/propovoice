import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import WithApi from 'hoc/Api';

import Form from './sub/Form';  
import Smtp from './sub/Smtp';  

const Main = (props) => {

	const { tab, subtab, insubtab } = useParams();
    let navigate = useNavigate();

    let tabDefault = subtab; 
    if (subtab === undefined) {
        tabDefault = 'form'
    }

	const [tabs, setTabs] = useState(
		[
			{
				id: 'form',
				text: 'Form'
			}, 
			{
				id: 'smtp',
				text: 'SMTP'
			} 
		]
	); 
	const [reload, setReload] = useState(false);
	const [currentTab, setCurrentTab] = useState(tabDefault);
    const [currentSubtab, setCurrentSubtab] = useState('');

	useEffect(() => { 
        
    }, []);

	const routeChange = (tab, subtab = null) => {
        if (subtab) {
            navigate(`/setting/integration/${tab}/${subtab}`);
        } else {
            navigate(`/setting/integration/${tab}`);
        }
    };

    const addCurrentTab = (tab, subtab = null, reload = true ) => { 
		if ( reload ) {
			setReload(prev => !prev)
		}
        setCurrentTab(tab);
        setCurrentSubtab(subtab);
        routeChange(tab, subtab);
    };
 
	return (
		<>
			<ul className='pi-settings-horizontal-tab'>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={'pi-tab ' + (tab.id == currentTab ? 'pi-active' : '')}
						onClick={() => addCurrentTab(tab.id)}
					>
						{tab.text}
					</li>
				))}
			</ul>
	
			{currentTab == 'form' && <Form key={reload} {...props} onChange={addCurrentTab} tab={currentSubtab} />}   
			{currentTab == 'smtp' && <Smtp key={reload} {...props} onChange={addCurrentTab} tab={currentSubtab} />}   
		</>
	) 
}  
export default WithApi(Main) 