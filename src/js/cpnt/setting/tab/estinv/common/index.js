import { useState } from 'react';
import Currency from './sub/Currency';
import QtyType from './sub/QtyType';
import Tax from './sub/Tax';
import Fee from './sub/Fee';
import Discount from './sub/Discount';

export default (props) => {

	const i18n = ndpv.i18n;
	const [tabs, setTabs] = useState([
		{
			id: 'currency',
			text: i18n.cur
		},
		{
			id: 'qty-type',
			text: i18n.qty + ' ' + i18n.type
		},
		{
			id: 'tax',
			text: i18n.tax
		},
		{
			id: 'fee',
			text: i18n.fee
		},
		{
			id: 'discount',
			text: i18n.discount
		},
	]);
	const [currentTab, setCurrentTab] = useState('currency'); 
 
	return (
		<>
			<ul className='pv-settings-horizontal-tab'>
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

			{currentTab == 'currency' && <Currency {...props} />}
			{currentTab == 'qty-type' && <QtyType />}
			{currentTab == 'tax' && <Tax {...props} />}
			{currentTab == 'fee' && <Fee />}
			{currentTab == 'discount' && <Discount />}
		</>
	);
}  