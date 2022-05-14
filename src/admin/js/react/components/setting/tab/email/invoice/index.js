import React, { Component } from 'react';

import Reminder from './sub/Reminder';
import Recurring from './sub/Recurring';

export default class Invoice extends Component {
	constructor(props) {
		super(props);

	}


	render() {
		return (
			<>
				<div className="pi-accordion-wrapper">
					<ul>
						<li className="pi-edit-style">
							<input type="checkbox" defaultChecked="checked" />
							<i />
							<h3>Reminder</h3>
							<div className="pi-edit-content">
								<Reminder />
							</div>
						</li>

						<li className="pi-edit-style">
							<input type="checkbox" defaultChecked="checked" />
							<i />
							<h3>Recurring</h3>
							<div className="pi-edit-content">
								<Recurring />
							</div>
						</li>
					</ul>
				</div>
			</>
		);
	}
} 