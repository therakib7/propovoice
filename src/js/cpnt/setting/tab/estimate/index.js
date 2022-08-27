import React, { Component } from 'react';
import WithApi from 'hoc/Api'; 
import Reminder from 'block/field/reminder';
import AdditionalAmount from '../estvoice/AdditionalAmount';
import Template from './sub/Template';

class General extends Component {
	constructor(props) {
		super(props);
		const i18n = ndpv.i18n;
		this.state = {
			tabs: [
				{
					id: 'reminder',
					text: i18n.rem
				},
				{
					id: 'extra-amount',
					text: i18n.addi + ' ' + i18n.amount,
				},
				/* {
					id: 'template',
					text: 'Template'
				}  */
			],
			currentTab: '',
		} 
	} 

	componentDidMount() {
		this.setState({ currentTab: 'reminder' });
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
		
				{currentTab == 'reminder' && <Reminder {...this.props} path={'estimate'} />} 
				{currentTab == 'extra-amount' && <AdditionalAmount {...this.props} />} 
				{currentTab == 'template' && <Template {...this.props} />}
			</>
		);
	}
} 

export default WithApi(General); 