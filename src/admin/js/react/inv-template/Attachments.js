import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { toast } from 'react-toastify';

class Attachments extends Component { 

	constructor(props) {
		super(props);
	} 

    render = () => { 
        const attachments = this.props.data; 
        return (
            <div className=''>   
				{attachments.map((item, index) => ( 
					<div key={index}> 
						<img src={item.url} width="100" className='inline' /> 
					</div>   
				))}
            </div>
        )
    }
} 

export default Attachments


