import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify';

import Api from 'api/media';
import Media from 'components/media';

class Attachments extends Component {

	constructor(props) {
		super(props);

		this.state = {
			edit: false,
		};

		this.inputRef = React.createRef();
	}

	componentDidUpdate() {
		/* if ( ! this.state.edit && this.props.data ) { 
			this.setState({ edit: true });
		} */
	}

	onFileUpload = (file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('type', 'attachment');

		Api.create(formData)
			.then(resp => {
				// console.log(resp.data)
				if (resp.data.success) {
					this.handlePros(resp.data.data.file_info);
				} else {
					resp.data.data.forEach(function (value, index, array) {
						toast.error(value);
					});
				}
			});
	};

	handleDelete = (id) => {
		this.props.changeHandler(id)

		Api.remove(id)
			.then(resp => {
				if (!resp.data.success) {
					resp.data.data.forEach(function (value, index, array) {
						toast.error(value);
					});
				}
			})
	};

	handlePros = (data) => {
		this.props.changeHandler(data);
	};

	// On file select (from the pop up) 
	onFileChange = event => {
		this.onFileUpload(event.target.files[0]);
	};

	render = () => {
		const attachments = this.props.data;
		return (
			<> 
				<input type="file" ref={this.inputRef} onChange={this.onFileChange} hidden />  
				<Media />
				<button 
				className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white"
				onClick={() => this.inputRef.current.click()}
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
					Add Attachments
				</button>					

				{attachments.map((item, index) => (
					<div key={index}>
						<img src={item.url} width="100" className='inline' />
						<span onClick={() => this.handleDelete(index)}>
							x
						</span>
					</div>
				))}
				<p>
					Attachments item can be view only online from not in PDF
				</p>
			</>
		)
	}
}

export default Attachments
