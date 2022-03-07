import React, { Component } from 'react' 

class Sign extends Component { 

	constructor(props) {
		super(props); 
	} 

    render = () => { 
        const sign = this.props.data; 
        return (
            <div className='text-right'>   
				{ sign &&
					<>
						<div> 
							<img src={sign.img} width="100" /> 
						</div>  
					</>
				}
            </div>
        )
    }
} 

export default Sign


