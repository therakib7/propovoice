import React, { Component } from 'react'

class Seal extends Component {

	constructor(props) {
		super(props);
	}

	render = () => {
		let status = false;
		let title, desc;
		let extraClass = '';
		switch (this.props.status) { 
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
				extraClass = 'pi-green-color';
				desc = 'Thanks, We have received the payment';
				break;
		}

		if ( this.props.status =='accept' || this.props.status =='decline' ) return null;
		return (
			<>
				{status && <div className="pi-inv-seal"> 
					<div 
					className={'pi-badge-border ' + extraClass}
					style={{
						position: "absolute",
						top: 120,
						zIndex: 99,
						left: 300,
						width: 185,
						transform: "rotate(340deg)"
					}}
					>
						<div className="pi-badge-style-one">
							<h4>{title}</h4>
							<p>{desc}</p>
						</div>
					</div>
				</div>}
			</>
		)
	}
}

export default Seal
