import React, { Component } from 'react'
 
import Media from 'components/media';

class Attach extends Component {

	constructor(props) {
		super(props);

		this.state = {
			media: false,
			edit: false,
		}; 
	}

	componentDidUpdate() {
		/* if ( ! this.state.edit && this.props.data ) { 
			this.setState({ edit: true });
		} */
	} 

	handleDelete = () => {
		this.props.changeHandler(null) 
	};

	handlePros = (data) => {
		this.props.changeHandler(data);
	};

	render = () => {
		const sign = this.props.data; 
		return (
			<>   
				<Media
                    insertHandler={this.handlePros}
                    show={this.state.media}  
                    close={() => this.setState({ media: false })}
                /> 

				<button 
				className="pi-a-btn pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white"
				onClick={() => this.setState({ media: true })}
				>
					<svg
						width={14}
						height={14}
						viewBox="0 0 14 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3.668 10.09a2.7 2.7 0 01-1.779-.662 2.563 2.563 0 01-.394-3.457 2.67 2.67 0 011.587-1.03 3.199 3.199 0 01.46-2.452 3.334 3.334 0 012.1-1.417 3.395 3.395 0 012.508.45 3.26 3.26 0 011.448 2.053h.067c.826 0 1.623.299 2.236.84a3.205 3.205 0 01.45 4.35 3.34 3.34 0 01-2.02 1.26M9 8.137l-2-1.954m0 0L5.002 8.136M7 6.182V13"
							stroke="#136ACD"
							strokeWidth={1.5}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					Authorized Signature
				</button>				

				{sign &&
					<>
						<div>
							<img src={sign.img} width="100" />
							<span onClick={() => this.handleDelete()}>
								x
							</span>
						</div>

					</>
				} 
			</>
		)
	}
}

export default Attach
