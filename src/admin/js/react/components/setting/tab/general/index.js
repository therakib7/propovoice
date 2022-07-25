import React, { Component } from 'react';
import WithApi from 'hoc/Api';

import SubBusiness from './sub/Business';  

class General extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: [
				{
					id: 'business',
					text: 'Business'
				}, 
				/* {
					id: 'social',
					text: 'Social'
				}  */
			],
			currentTab: '',
		}

	} 

	componentDidMount() {
		this.setState({ currentTab: 'business' });
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
		
				{currentTab == 'business' && <SubBusiness {...this.props} />}   
			</>
		);
	}
} 

export default WithApi(General); 