import React, { Component } from 'react'  

class PaymentInfo extends Component {

    constructor(props) {
        super(props); 
    } 

    render = () => {
        const bank_info = this.props.data;
        return (  
            <div className="pi-from-content"> 
                {bank_info ?
                    <>
                        <div className="pi-from-to"> 
                            <label>Payment Info:</label> 
                            <div className="pi-bank-info" dangerouslySetInnerHTML={{__html: bank_info.bank_details.replaceAll('\n', '<br />')}}></div>
                        </div> 
                    </> : ''
                } 
            </div> 
        )
    }
}

export default PaymentInfo
