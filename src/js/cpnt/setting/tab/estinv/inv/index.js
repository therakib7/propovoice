import React, { Component } from 'react';
import WithApi from 'hoc/Api';
import Reminder from 'block/field/reminder';
import General from './sub/General';
import Recurring from './sub/Recurring';

class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: [
				{
					id: 'general',
					text: ndpv.i18n.gen
				},
				{
					id: 'reminder',
					text: ndpv.i18n.rem
				},
				/* {
					id: 'recurring',
					text: 'Recurring'
				}  */
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
				<ul className='pv-horizontal-tab'>
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

				{currentTab == 'general' && <General />}
				{currentTab == 'reminder' && <Reminder {...this.props} path={'invoice'} />}
				{currentTab == 'recurring' && <Recurring {...this.props} />}
			</>
		);
	}
}

export default WithApi(Main); 