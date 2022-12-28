import React, { Component } from 'react'
import { toast } from 'react-toastify';
import Api from 'api/media';

class Branding extends Component {

	constructor(props) {
		super(props);

		this.state = {
			edit: false
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
		formData.append('type', 'business_logo');

		Api.create(formData)
			.then(resp => {
				if (resp.data.success) {
					this.props.changeHandler(resp.data.data);
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

	// On file select (from the pop up) 
	onFileChange = event => {
		this.onFileUpload(event.target.files[0]);
	};

	handleUploadFile = () => {
		const business = this.props.data;
		if (business.id) {
			this.inputRef.current.click();
		} else {
			//TODO: translation
			toast.error(ndpv.i18n.fileInfo);
		}
	};

	render = () => {
		const business = this.props.data;
		const i18n = ndpv.i18n;
		return (
			<>
				{!business.logo &&
					<>
						<input type="file" ref={this.inputRef} onChange={this.onFileChange} className='hidden' />
						<div className="pv-text-center" onClick={() => this.handleUploadFile()}>
							<img className="pv-cursor-pointer" src={ndpv.assetImgUri + 'upload-img.png'} width="120" />
							<h3 className="pv-cursor-pointer pv-upload pv-color-blue">{i18n.upload} {i18n.logo}</h3>
						</div>
					</>
				}

				{business.id && business.logo &&
					<div className="pv-field-logo-wrap pv-text-center pv-mb-30">
						<div className='pv-field-logo'>
							<img src={business.logo.src} width="120" />
							<span className='pv-field-logo-close' onClick={() => this.handleDelete(business.logo.id)}>×</span>
						</div>
					</div>}

				<div className="pv-buttons pv-text-center">
					<button className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big" onClick={() => this.props.handleSubmit('', 'branding')}>{i18n.save} {i18n.nd} {i18n.cont}</button>
					<a className="pv-text-hover-blue" onClick={() => this.props.handleSkip('branding')}>{i18n.skip}</a>
				</div>
			</>
		)
	}
}

export default Branding
