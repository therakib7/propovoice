import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import WithApi from 'hoc/Api';
import ProLabel from 'block/pro-alert/label';

import Form from './form';  
import Smtp from './smtp';  

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
			<ul className='pv-settings-horizontal-tab'>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={'pv-tab ' + (tab.id == currentTab ? 'pv-active' : '')}
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