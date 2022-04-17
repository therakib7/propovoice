import React, { Component } from 'react'

class Feedback extends Component {

	constructor(props) {
		super(props);
	}

	render = () => {
		let status = false;
		let title, desc;
		let extraColor = '';
		switch (this.props.status) {

			case 'accept':
				status = true;
				title = 'Accepted';
				desc = 'Thanks for accepting';
				extraColor = '#00a74d';
				break;

			case 'decline':
				status = true;
				title = 'Declined';
				desc = 'Sorry for the decline';
				break; 
		}
		return (
			<>
				{status && <div className="pi-inv-feedback" style={{ maxWidth: '794px', margin: '0 auto 30px' }}>  
					<div className="pi-badge-style-two">
						<h4 style={{color: extraColor}}>{title}</h4>
						<p>{desc}</p>
					</div>
				</div>}
			</>
		)
	}
}

export default Feedback
