import React, { Component } from 'react' 

class Signature extends Component { 

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

export default Signature


