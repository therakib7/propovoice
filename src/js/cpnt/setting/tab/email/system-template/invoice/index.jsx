import { useState, useEffect } from "react";
import WithApi from 'hoc/Api';

import Default from './sub/Default';
import Reminder from './sub/Reminder';
import Recurring from './sub/Recurring';
import ProLabel from 'block/pro-alert/label';

const Main = (props) => {
	/* 	const [tabs, setTabs] = useState(
			[
				{
					id: 'default',
					text: ndpv.i18n.def
				},
				{
					id: 'reminder',
					text: ndpv.i18n.rem
				},
				{
					id: 'recurring',
					text: ndpv.i18n.recur
				}
			]
		);
		const [currentTab, setCurrentTab] = useState('default'); */

	return (
		<>
			{/* <ul className='pv-horizontal-tab'>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={'pv-tab ' + (tab.id == currentTab ? 'pv-active' : '')}
						onClick={(e) => setCurrentTab(tab.id)}
					>
						{tab.text} {(tab.id == 'reminder' || tab.id == 'recurring') && wage.length > 0 && <ProLabel />}
					</li>
				))}
			</ul> */}

			<Default {...props} />
			<Reminder {...props} />
			<Recurring {...props} />
		</>
	)
}
export default WithApi(Main) 