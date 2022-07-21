import React, { Component } from 'react';
import WithApi from 'hoc/Api';
import Reminder from 'block/field/reminder';
import AdditionalAmount from 'block/field/extra-amount/setting';
import Recurring from './sub/Recurring';

class General extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: [
				{
					id: 'reminder',
					text: 'Reminder'
				},
				{
					id: 'extra-amount',
					text: 'Additional Amount'
				},
				{
					id: 'template',
					text: 'Recurring'
				} 
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
				<ul className='pi-settings-horizontal-tab'>
					{tabs.map((tab, index) => (
						<li
							key={index}
							className={'pi-tab ' + (tab.id == currentTab ? 'pi-active' : '')}
							onClick={(e) => this.setActiveTab(tab.id)}
						>
							{tab.text}
						</li>
					))}
				</ul>
		
				{currentTab == 'reminder' && <Reminder {...this.props} path={'invoice'} />} 
				{currentTab == 'extra-amount' && <AdditionalAmount taxonomy='extra_amount' title='Additional Amount' {...this.props} />} 
				{currentTab == 'template' && <Recurring {...this.props} />}
			</>
		);
	}
} 

export default WithApi(General); 