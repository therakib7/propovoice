import React, { Component } from 'react';
import WithApi from 'hoc/Api';
import Reminder from 'block/field/reminder';  
import Recurring from './sub/Recurring';

class General extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: [
				{
					id: 'reminder',
					text: ndpv.i18n.rem
				},
				/* {
					id: 'extra-amount',
					text: ndpv.i18n.adtl +' '+ndpv.i18n.amt
				}, */
				/* {
					id: 'recurring',
					text: 'Recurring'
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
		
				{currentTab == 'reminder' && <Reminder {...this.props} path={'invoice'} />}  
				{currentTab == 'recurring' && <Recurring {...this.props} />}
			</>
		);
	}
} 

export default WithApi(General); 