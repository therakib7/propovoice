import React, { Component } from 'react' 

class Sign extends Component { 

	constructor(props) {
		super(props); 
	} 

    render = () => { 
        const signature = this.props.data; 
        return (
            <div className='text-right'>   
				{ signature &&
					<>
						<div> 
							<img src={signature.url} width="100" className='inline'/> 
						</div>  
					</>
				}
            </div>
        )
    }
} 

export default Sign


