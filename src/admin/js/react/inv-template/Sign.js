import React, { Component } from 'react' 

class Sign extends Component { 

	constructor(props) {
		super(props); 
	} 

    render = () => { 
        const sign = this.props.data; 
        return (
             
			<div className="pi-sign">
				{ sign &&
					<>
						<img src={sign.src} alt="" />
						<div className="pi-border" />
						<h4>Signature</h4> 
					</>
				} 
			</div>
        )
    }
} 

export default Sign


