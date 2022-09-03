import React, { Component } from 'react'; 
import QtyType from './sub/QtyType';
import ExtraAmount from './sub/ExtraAmount';

export default class Main extends Component {
	constructor(props) {
		super(props);
		const i18n = ndpv.i18n;
		this.state = {
			tabs: [
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
		this.setState({ currentTab: 'qty-type' });
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
		  
				{currentTab == 'qty-type' && <QtyType {...this.props} />} 
				{currentTab == 'extra-amount' && <ExtraAmount {...this.props} />} 
			</>
		);
	}
}  