import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import Api from 'api/media';

class Sign extends Component {

	constructor(props) {
		super(props);

		this.state = {
			edit: false,
		};

		this.inputRef = React.createRef();
	}

	componentDidUpdate() {
		if (!this.state.edit && this.props.data) {
			this.setState({ edit: true });
		}
	}

	onFileUpload = (file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('type', 'sign');

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
		this.props.changeHandler(null)

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
		const sign = this.props.data;
		return (
			<div className='text-right'>
				{!sign &&
					<div>
						<input type="file" ref={this.inputRef} onChange={this.onFileChange} hidden />
						<button className='border p-3 rounded' onClick={() => this.inputRef.current.click()}>
							Authorized Sign
						</button>
					</div>
				}

				{sign &&
					<>
						<div>
							<img src={sign.url} width="100" className='inline' />
							<button className='border p-3 rounded' onClick={() => this.handleDelete(sign.id)}>
								x
							</button>
						</div>

					</>
				}
			</div>
		)
	}
}

export default Sign
