import { useState, useEffect } from "react";
import WithApi from 'hoc/Api';

import Business from './sub/Business';
import WhiteLabel from './sub/WhiteLabel';

const Main = (props) => {
	const [tabs, setTabs] = useState(
		[
			{
				id: 'business',
				text: ndpv.i18n.biz
			},
			{
				id: 'white-label',
				text: 'White Label'
			}
		]
	);
	const [currentTab, setCurrentTab] = useState('business');
	return (
		<>
			<ul className='pv-horizontal-tab'>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={'pv-tab ' + (tab.id == currentTab ? 'pv-active' : '')}
						onClick={(e) => setCurrentTab(tab.id)}
					>
						{tab.text}
					</li>
				))}
			</ul>

			{currentTab == 'business' && <Business {...props} />}
			{currentTab == 'white-label' && <WhiteLabel />}
		</>
	)
}
export default WithApi(Main)