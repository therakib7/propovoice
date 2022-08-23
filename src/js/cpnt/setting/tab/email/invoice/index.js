import { useState, useEffect } from "react";
import WithApi from 'hoc/Api';

import Default from './sub/Default';
import Reminder from './sub/Reminder';
import Recurring from './sub/Recurring';
import ProLabel from 'block/pro-alert/label';

const Main = (props) => {
	const [tabs, setTabs] = useState(
		[
			{
				id: 'default',
				text: 'Default'
			},
			{
				id: 'reminder',
				text: 'Reminder'
			},
			{
				id: 'recurring',
				text: 'Recurring'
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
						{tab.text} {(tab.id == 'reminder' || tab.id == 'recurring') && wage.length > 0 && <ProLabel />}
					</li>
				))}
			</ul>
	
			{currentTab == 'default' && <Default {...props} />}
			{currentTab == 'reminder' && <Reminder {...props} />}
			{currentTab == 'recurring' && <Recurring {...props} />}
		</>
	) 
}  
export default WithApi(Main) 