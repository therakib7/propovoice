import { useState, useEffect } from "react";
import WithApi from 'hoc/Api';

import Form from './sub/Form';  
import Smtp from './sub/Smtp';  

const Main = (props) => {
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
	const [currentTab, setCurrentTab] = useState(''); 

	useEffect(() => { 
        setCurrentTab('form') 
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
	
			{currentTab == 'form' && <Form {...props} />}   
			{currentTab == 'smtp' && <Smtp {...props} />}   
		</>
	) 
}  
export default WithApi(Main) 