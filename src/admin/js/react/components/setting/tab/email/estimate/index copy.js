import React, { Component } from 'react';

import Reminder from './sub/Reminder';

export default class Invoice extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<>
				<div style={{maxWidth: '500px'}}>
				<div className="pi-accordion-wrapper" >
					<ul>
						<li className="pi-edit-style">
							<input type="checkbox" defaultChecked="checked" />
							<i />
							<h3>Reminder</h3>
							<div className="pi-edit-content">
								<Reminder />
							</div>
						</li>
					</ul>
				</div>
				</div>
				
			</>
		);
	}
} 