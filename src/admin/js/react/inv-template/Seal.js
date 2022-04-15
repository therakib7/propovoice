import React, { Component } from 'react'

class Seal extends Component {

	constructor(props) {
		super(props);
	}

	render = () => {
		let status = false;
		let title, desc;
		switch (this.props.status) {

			case 'accept':
				status = true;
				title = 'Accepted';
				desc = 'Thanks for accepting';
				break;

			case 'decline':
				status = true;
				title = 'Declined';
				desc = 'Sorry for the decline';
				break;

			case 'overdue':
				status = true;
				title = 'Overdue';
				desc = 'You haven’t pay yet';
				break;

			case 'paid_req':
				status = true;
				title = 'Approval Pending';
				desc = 'You have submited your payment information. it will take a while to approve the payment';
				break;

			case 'paid':
				status = true;
				title = 'Paid';
				desc = 'Thanks, We have received the payment';
				break;
		}
		return (
			<>
				{status && <div className="pi-inv-seal">
					<div
						className="pi-badge-style-one"
						style={{
							position: "absolute",
							top: 80,
							zIndex: 99,
							left: 300,
							width: 185,
							transform: "rotate(340deg)"
						}}
					>
						<h4>{title}</h4>
						<p className="">{desc}</p>
					</div>
				</div>}
			</>
		)
	}
}

export default Seal
