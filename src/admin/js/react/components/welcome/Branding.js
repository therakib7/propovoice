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
		if ( business.id ) {
			this.inputRef.current.click();
		} else { 
			//TODO: translation
			toast.error('Please fill up Business info first');
		} 
	};

	render = () => {
		const business = this.props.data;  
		return (
			<> 
				{ !business.logo &&
					<>
						<input type="file" ref={this.inputRef} onChange={this.onFileChange} className='hidden' />
						<div className="pi-text-center" onClick={() => this.handleUploadFile()}>
							<img src={ncpi_local.assetImgUri+'upload-img.png'} />
							<h3 className="pi-upload pi-color-blue">Upload Logo</h3>
						</div>
					</>
				}
				
				{ business.id && business.logo &&
				<div className="pi-field-logo-wrap pi-text-center">
					<div className='pi-field-logo'>
						<img src={business.logo.src} width="100" /> 
						<span className='pi-field-logo-close' onClick={() => this.handleDelete(business.logo.id)}>×</span>
					</div> 
				</div>}

				<div className="pi-buttons pi-text-center">
					<button className="pi-btn pi-bg-blue pi-bg-hover-blue" onClick={() => this.props.handleSubmit('', 'branding')}>Save & Continue</button>
					<a className="pi-text-hover-blue" onClick={() => this.props.handleSkip('branding')}>Skip</a>
				</div>
			</>
		)
	}
}

export default Branding
