import React, { Component } from 'react';
import WithApi from 'hoc/Api';

import SubGeneral from './sub/General';
import Other from './sub/Other';

class General extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: [
				{
					id: 'general',
					text: 'General'
				},
				{
					id: 'other',
					text: 'Other'
				} 
			],
			currentTab: '',
		}

	} 

	componentDidMount() {
		this.setState({ currentTab: 'general' });
	}

	setActiveTab(id) { 
		this.setState({ currentTab: id });
	}

	render() {
		const { tabs = [], currentTab } = this.state;
		return (
			<>
				{false && <ul className='pi-settings-horizontal-tab'>
					{tabs.map((tab, index) => (
						<li
							key={index}
							className={'pi-tab ' + (tab.id == currentTab ? 'pi-active' : '')}
							onClick={(e) => this.setActiveTab(tab.id)}
						>
							{tab.text}
						</li>
					))}
				</ul>}
		
				{currentTab == 'general' && <SubGeneral {...this.props} />} 
				{currentTab == 'other' && <Other {...this.props} />}
			</>
		);
	}
} 

export default WithApi(General); 