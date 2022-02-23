import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { toast } from 'react-toastify';
import Helper from '../../helper';

class Attachments extends Component { 

	constructor(props) {
		super(props);

		this.state= {
			edit: false,   
		};

		this.inputReference = React.createRef();
	}

    componentDidUpdate() {   
        /* if ( ! this.state.edit && this.props.data ) { 
            this.setState({ edit: true });
        } */
	}

	onFileUpload = ( file ) => {  
		const formData = new FormData();  
		formData.append( 'file', file ); 
		formData.append( 'type', 'attachment' ); 
	    
		Helper.createMedia(formData)
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

	handleDelete = ( id ) => {   
        this.props.changeHandler( id )

		Helper.removeMedia(id)
                .then(resp => {
                    if ( !resp.data.success ) { 
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                }) 
    }; 

    handlePros = ( data ) => {   
        this.props.changeHandler( data );
    }; 

    // On file select (from the pop up) 
    onFileChange = event => {   
		this.onFileUpload( event.target.files[0] );
	};  

    render = () => { 
        const attachments = this.props.data; 
        return (
            <div className=''>   
				<div> 
					<input type="file" ref={this.inputReference} onChange={this.onFileChange} hidden />  
					<button className='border p-3 rounded' onClick={ () => this.inputReference.current.click() }> 
						Add Attachments 
					</button> 
				</div>  

				{attachments.map((item, index) => ( 
					<div key={index}> 
						<img src={item.url} width="100" className='inline' />
						<button className='border p-3 rounded' onClick={ () => this.handleDelete( index ) }> 
							x 
						</button> 
					</div>   
				))}
            </div>
        )
    }
} 

export default Attachments


