import React, { Component } from 'react' 
import Media from 'cpnt/media';

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

	handleDelete = (id) => {
		this.props.changeHandler(id, 'delete') 
	};

	handlePros = (data) => {
		this.props.changeHandler(data);
	};

	render = () => {
		const attach = this.props.data; 
		const i18n = ndpi.i18n;
		return (
			<>   
				<Media
                    insertHandler={this.handlePros}
                    show={this.state.media}  
                    close={() => this.setState({ media: false })}
                />

				<button 
				className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white"
				onClick={() => this.setState({ media: true })}
				>
					<svg
					width={12}
					height={12}
					viewBox="0 0 12 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"  
					>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z"
						fill="#18181B"
					/>
					</svg>
					{i18n.add} {i18n.attachment}
				</button>					

				{attach.map((item, index) => (
					<div key={index}>
						<img src={item.src} width="100" />
						<span onClick={() => this.handleDelete(item.id)}>
							x
						</span>
					</div>
				))}
				<p>
					Attach item can be view only online from not in PDF
				</p>
			</>
		)
	}
}

export default Attach
