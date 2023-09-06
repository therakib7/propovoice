import { useState } from 'react';
import Currency from './sub/Currency';
import QtyType from './sub/QtyType';
import Tax from './sub/Tax';
import Fee from './sub/Fee';
import Discount from './sub/Discount';
import SavedItemsSettings from './sub/SavedItems';

export default (props) => {

	const i18n = ndpv.i18n;
	let allTabs = [
		{
			id: 'currency',
			text: i18n.cur
		},
		{
			id: 'qty-type',
			text: i18n.qty + ' ' + i18n.type
		},
		{
			id: 'discount',
			text: i18n.discount
		},
		{
			id: 'fee',
			text: i18n.fee
		},
		{
			id: 'tax',
			text: i18n.tax
		}
	]

	if (!wage.length) {
		allTabs.push({
			id: 'saved_items',
			text: i18n.saved_items
		});
	}
	const [tabs, setTabs] = useState(allTabs);

	const [currentTab, setCurrentTab] = useState('currency');

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

			{currentTab == 'currency' && <Currency {...props} />}
			{currentTab == 'qty-type' && <QtyType />}
			{currentTab == 'tax' && <Tax {...props} />}
			{currentTab == 'fee' && <Fee />}
			{currentTab == 'discount' && <Discount />}
			{currentTab == 'saved_items' && !wage.length && <SavedItemsSettings />}
		</>
	);
}  