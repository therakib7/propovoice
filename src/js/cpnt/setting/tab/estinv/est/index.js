import React, { Component } from 'react';
import WithApi from 'hoc/Api';
import Reminder from 'block/field/reminder';
import General from './sub/General';
import Template from './sub/Template';

class Main extends Component {
	constructor(props) {
		super(props);
		const i18n = ndpv.i18n;
		this.state = {
			tabs: [
				{
					id: 'general',
					text: ndpv.i18n.gen
				},
				{
					id: 'reminder',
					text: i18n.rem
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
				{currentTab == 'reminder' && <Reminder {...this.props} path={'estimate'} />}
				{currentTab == 'template' && <Template {...this.props} />}
			</>
		);
	}
}

export default WithApi(Main); 