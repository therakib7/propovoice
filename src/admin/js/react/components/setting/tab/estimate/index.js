import React, { Component } from 'react';
import WithApi from 'hoc/Api'; 
import Reminder from 'block/field/reminder';
import Template from './sub/Template';

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
					id: 'template',
					text: 'Template'
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
		
				{currentTab == 'reminder' && <Reminder {...this.props} path={'estimate'} />} 
				{currentTab == 'template' && <Template {...this.props} />}
			</>
		);
	}
} 

export default WithApi(General); 