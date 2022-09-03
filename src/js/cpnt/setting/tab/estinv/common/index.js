import React, { Component } from 'react'; 
import Currency from './sub/Currency';
import QtyType from './sub/QtyType';
import ExtraAmount from './sub/ExtraAmount';

export default class Main extends Component {
	constructor(props) {
		super(props);
		const i18n = ndpv.i18n;
		this.state = {
			tabs: [
				{
					id: 'currency',
					text: i18n.cur
				},
				{
					id: 'qty-type',
					text: i18n.qty + ' ' +i18n.type
				},
				{
					id: 'extra-amount',
					text: i18n.adtl + ' ' +i18n.amt
				},
			],
			currentTab: '',
		} 
	} 

	componentDidMount() {
		this.setState({ currentTab: 'currency' });
	}

	setActiveTab(id) { 
		this.setState({ currentTab: id });
	}

	render() {
		const { tabs = [], currentTab } = this.state;
		return (
			<>
				<ul className='pv-settings-horizontal-tab'>
					{tabs.map((tab, index) => (
						<li
							key={index}
							className={'pv-tab ' + (tab.id == currentTab ? 'pv-active' : '')}
							onClick={(e) => this.setActiveTab(tab.id)}
						>
							{tab.text}
						</li>
					))}
				</ul>
		  
				{currentTab == 'currency' && <Currency {...this.props} />} 
				{currentTab == 'qty-type' && <QtyType {...this.props} />} 
				{currentTab == 'extra-amount' && <ExtraAmount {...this.props} />} 
			</>
		);
	}
}  