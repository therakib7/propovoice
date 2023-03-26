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

	const { i18n, caps, profile } = ndpv;
	const isClient = caps.includes("ndpv_client_role");
	return (
		<>
			{isClient && <>
				<div className="pv-form-style-one">
					<div className="row">
						<div className="col">
							<label htmlFor="field-name">
								{i18n.name}
							</label>
							<input
								id="field-name"
								readOnly
								type="text"
								name="name"
								value={profile.name}
							/>
						</div>
						<div className="col"></div>
					</div>

					<div className="row">
						<div className="col">
							<label htmlFor="field-email">
								{i18n.email}
							</label>
							<input
								id="field-email"
								readOnly
								type="text"
								name="email"
								value={profile.email}
							/>
						</div>
						<div className="col"></div>
					</div>
				</div>
			</>}

			{!isClient && <>
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
			</>}
		</>
	)
}
export default WithApi(Main)