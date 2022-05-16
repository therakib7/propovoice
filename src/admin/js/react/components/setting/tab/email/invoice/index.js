import React, { Component } from 'react';

import DefaultMail from './sub/DefaultMail';
import Reminder from './sub/Reminder';
import Recurring from './sub/Recurring';

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
				},
				{
					id: 'recurring',
					text: 'Recurring'
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

				<div className="row">
                    <div className="col-md-2">
						<ul className='pi-settings-vertical-subtabs'>
							{tabs.map((tab, index) => (
								<li
									key={index}
									className={'pi-subtab ' + (tab.id == currentTab ? 'pi-active' : '')}
									onClick={(e) => this.setActiveTab(tab.id)}
								>
									{tab.text}
								</li>
							))}
						</ul>
                    </div>

                    <div className="col-md-10">
						{currentTab == 'default' && <DefaultMail />}
						{currentTab == 'reminder' && <Reminder />}
						{currentTab == 'recurring' && <Recurring />} 
                    </div>
                </div> 
			</>
		);
	}
} 