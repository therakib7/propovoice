import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { toast } from 'react-toastify';

class Attach extends Component { 

	constructor(props) {
		super(props);
	} 

    render = () => { 
        const attach = this.props.data; 
        return (
            <div className=''>   
				{attach.map((item, index) => ( 
					<div key={index}> 
						<img src={item.src} width="100" /> 
					</div>   
				))}
            </div>
        )
    }
} 

export default Attach


