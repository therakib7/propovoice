import { useState, useEffect } from "react";
import WithApi from 'hoc/Api';

import Default from './sub/Default';
import Reminder from './sub/Reminder';
import ProLabel from 'block/pro-alert/label';

const Main = (props) => {
	const [tabs, setTabs] = useState(
		[
			{
				id: 'default',
				text: ndpi.i18n.def
			},
			{
				id: 'reminder',
				text: ndpi.i18n.rem
			}
		]
	);
	const [currentTab, setCurrentTab] = useState('default');  
 
	return (
		<>
			<ul className='pi-settings-horizontal-tab'>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={'pi-tab ' + (tab.id == currentTab ? 'pi-active' : '')}
						onClick={(e) => setCurrentTab(tab.id)}
					>
						{tab.text} {tab.id == 'reminder' && wage.length > 0 && <ProLabel />}
					</li>
				))}
			</ul>
	
			{currentTab == 'default' && <Default {...props} />}
			{currentTab == 'reminder' && <Reminder {...props} />}
		</>
	) 
}  
export default WithApi(Main) 