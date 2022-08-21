import { useState, useEffect } from "react";
import WithApi from 'hoc/Api';

import Business from './sub/Business';   

const Main = (props) => {
	const [tabs, setTabs] = useState(
		[
			{
				id: 'business',
				text: ndpi.i18n.business
			} 
		]
	);
	const [currentTab, setCurrentTab] = useState(''); 

	useEffect(() => { 
        setCurrentTab('business') 
    }, []);
 
	return (
		<>
			<ul className='pi-settings-horizontal-tab'>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={'pi-tab ' + (tab.id == currentTab ? 'pi-active' : '')}
						onClick={(e) => setCurrentTab(tab.id)}
					>
						{tab.text}
					</li>
				))}
			</ul>
	
			{currentTab == 'business' && <Business {...props} />}   
		</>
	) 
}  
export default WithApi(Main) 