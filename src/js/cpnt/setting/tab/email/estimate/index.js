import React, { Component } from 'react';

import Reminder from './sub/Reminder';
import DefaultMail from './sub/DefaultMail';
import ProLabel from 'block/pro-alert/label';

export default class Invoice extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: [
				{
					id: 'default',
					text: 'Default'
				},
				{
					id: 'reminder',
					text: 'Reminder'
				}
			],
			currentTab: '',
		}

	}

	componentDidMount() {
		this.setState({ currentTab: 'default' });
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
							onClick={() => this.setActiveTab(tab.id)}
						>
							{tab.text} {tab.id == 'reminder' && wage.length > 0 && <ProLabel />}
						</li>
					))}
				</ul>

				{currentTab == 'default' && <DefaultMail />}
				{currentTab == 'reminder' && <Reminder />}
			</>
		);
	}
} 