import React, { Component } from 'react';
import WithApi from 'hoc/Api';

import SubGeneral from './sub/General';
import Tag from './sub/Tag';
import Social from './sub/Social';

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
					id: 'tag',
					text: 'Tag'
				},
				{
					id: 'social',
					text: 'Social'
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
		
				{currentTab == 'general' && <SubGeneral {...this.props} />} 
				{currentTab == 'tag' && <Tag/>}
				{currentTab == 'social' && <Social {...this.props} />}
			</>
		);
	}
} 

export default WithApi(General); 