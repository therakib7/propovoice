import React, { useState, useEffect, Suspense, lazy } from 'react';
import WithApi from 'hoc/Api';

/* import Default from './sub/Default';
import Reminder from './sub/Reminder'; */
import ProLabel from 'block/pro-alert/label';
const EmailEstimate = lazy(() => import('./estimate'));
const EmailInvoice = lazy(() => import('./invoice'));
const EmailCredential = lazy(() => import('./credential'));

const i18n = ndpv.i18n;

const Main = (props) => {
	const [tabs, setTabs] = useState(
		[
			{
				id: 'team',
				text: i18n.team
			},
			{
				id: 'client_portal',
				text: 'Client Portal'
			},
			{
				id: 'estimate',
				text: i18n.est
			},
			{
				id: 'invoice',
				text: i18n.inv
			}
		]
	);
	const [currentTab, setCurrentTab] = useState('team');

	return (
		<>
			<ul className='pv-horizontal-tab'>
				{tabs.map((tab, index) => (
					<li
						key={index}
						className={'pv-tab ' + (tab.id == currentTab ? 'pv-active' : '')}
						onClick={(e) => setCurrentTab(tab.id)}
					>
						{tab.text} {tab.id == 'estimate' && wage.length > 0 && <ProLabel />}
					</li>
				))}
			</ul>

			{currentTab == 'estimate' && <EmailEstimate {...props} />}
			{currentTab == 'invoice' && <EmailInvoice {...props} />}
			{currentTab == 'client_portal' && <EmailCredential type='client_portal' {...props} />}
			{currentTab == 'team' && <EmailCredential type='team' {...props} />}
		</>
	)
}
export default WithApi(Main) 