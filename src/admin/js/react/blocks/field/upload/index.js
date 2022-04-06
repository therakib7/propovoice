import React, { Component } from 'react'
 
import Media from 'components/media';

class Upload extends Component {

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
		const logo = this.props.data; 
		let label = this.props.label; 
		label = label ? label : 'Upload';

		let btnClass = this.props.btnClass; 
		btnClass = btnClass ? btnClass : '';

		let imgClass = this.props.imgClass; 
		imgClass = imgClass ? imgClass : '';
		return (
			<div className={'pi-field-logo-wrap ' + imgClass}>   
				{this.state.media && <Media
                    insertHandler={this.handlePros}
                    show={this.state.media}  
                    close={() => this.setState({ media: false })}
                />} 

				{!logo &&<button 
					className={'pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white ' + btnClass}
					onClick={(e) => { e.preventDefault(); this.setState({ media: true }) } }
					style={{color: '#000'}}
				>
					<svg
					width={14}
					height={14}
					viewBox="0 0 16 13"
					fill="none"
					xmlns="http://www.w3.org/2000/svg" 
					>
					<path
						d="M10.037 9.553H8.69v-4.32a.144.144 0 00-.146-.142h-1.09a.144.144 0 00-.146.142v4.32H5.965c-.122 0-.19.137-.115.23l2.036 2.526a.143.143 0 00.115.055.148.148 0 00.114-.055l2.036-2.526c.075-.093.008-.23-.114-.23z"
						fill="#4C6FFF"
					/>
					<path
						d="M13.346 3.675A5.715 5.715 0 008.004 0 5.714 5.714 0 002.66 3.673 3.56 3.56 0 000 7.11a3.562 3.562 0 003.57 3.556h.716a.143.143 0 00.143-.143V9.458a.143.143 0 00-.143-.142H3.57a2.206 2.206 0 01-.565-4.34l.677-.176.248-.65a4.378 4.378 0 011.573-2.014 4.337 4.337 0 012.5-.787 4.337 4.337 0 013.436 1.673 4.3 4.3 0 01.638 1.127l.246.65.675.177a2.216 2.216 0 011.645 2.135c0 .589-.23 1.143-.648 1.56a2.198 2.198 0 01-1.565.645h-.716a.143.143 0 00-.143.142v1.066c0 .079.065.143.143.143h.716A3.562 3.562 0 0016 7.11a3.559 3.559 0 00-2.654-3.436z"
						fill="#4C6FFF"
					/>
					</svg>
					{label}
				</button>}			 

				{logo &&
					<>
						<div className='pi-field-logo'>
							<img src={logo.src} width="100" />
							<span className='pi-field-logo-close' onClick={() => this.handleDelete()}>×</span>
						</div> 
					</>
				} 
			</div>
		)
	}
}

export default Upload
