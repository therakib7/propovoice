import React, { Component } from 'react'  

class Payment extends Component {

    constructor(props) {
        super(props); 
    } 

    render = () => {
        const {paymentBankData} = this.props.data; 
        return (   
            <div className="pi-banking"> 
                {paymentBankData ? <><h4>Payment Info:</h4>
                <div className="pi-bank-info" dangerouslySetInnerHTML={{__html: paymentBankData.bank_details.replaceAll('\n', '<br />')}}></div></> : '' }
            </div>
        )
    }
}

export default Payment
