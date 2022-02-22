import React, { Component } from 'react'
import PropTypes from 'prop-types' 

import Helper from '../../helper';

class Signature extends Component {
    state = {
        edit: false,
        selectedFile: null,
		note: {
            label: 'Signature', 
            text: ''
        }, 
	}

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ note: { ...this.state.note, [name]: value } });
        this.handlePros();
    }

    componentDidUpdate() {   
        if ( ! this.state.edit && this.props.data ) { 
            this.setState({ edit: true, note: this.props.data });
        }
	}

    handlePros = () => { 
        this.props.changeHandler( this.state.note );
    }; 

    // On file select (from the pop up) 
    onFileChange = event => { 
		// Update the state 
		this.setState({ selectedFile: event.target.files[0] }); 
	}; 
	   
	  // On file upload (click the upload button) 
	onFileUpload = () => { 
		// Create an object of formData 
		const formData = new FormData(); 
	   
		// Update the formData object 
		formData.append( 'file', this.state.selectedFile ); 
	   
		// Details of the uploaded file 
		// console.log(this.state.selectedFile); 
	   
		// Request made to the backend api 
		// Send formData object 
		// axios.post("api/uploadfile", formData); 
		Helper.createMedia(formData)
            .then(resp => {
				console.log(resp.data)
                /* let fromData = resp.data.data.result;
                if ( fromData.length ) { 
                    this.setState({ from: fromData[0] }); 
                    this.props.setFrom(fromData[0].id);
                } */
            }); 
	}; 

	// file upload is complete 
    fileData = () => { 
		if (this.state.selectedFile) { 
			
		  return ( 
			<div> 
			  <h2>File Details:</h2> 
			  <p>File Name: {this.state.selectedFile.name}</p> 
			  <p>File Type: {this.state.selectedFile.type}</p> 
			  <p> 
				Last Modified:{" "} 
				{this.state.selectedFile.lastModifiedDate.toDateString()} 
			  </p> 
			</div> 
		  ); 
		} else { 
		  return ( 
			<div> 
			  <br /> 
			  <h4>Choose before Pressing the Upload button</h4> 
			</div> 
		  ); 
		} 
	  }; 

    render = () => {

        const { label, text } = this.state.note;

        return (
            <div className=''> 
                <div> 
					<input type="file" onChange={this.onFileChange} /> 
					<button onClick={this.onFileUpload}> 
					Upload! 
					</button> 
				</div> 
				{this.fileData()} 
            </div>
        )
    }
} 

export default Signature


