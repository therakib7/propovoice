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
                            <label>Bank Info:</label>
                            <div >
                                <>
                                    <h4 className="pi-from-title">
                                        {bank_info.bank_name}
                                    </h4>
                                    <address>
                                        <b>Account Name:</b> {bank_info.account_name} <br />
                                        <b>Account No:</b> {bank_info.account_no} <br />
                                        <b>Routing No:</b> {bank_info.routing_no} <br />
                                        <b>Branch Name:</b> {bank_info.bank_branch} <br /> 
                                    </address>
                                </>
                            </div>
                        </div> 
                    </> : ''
                } 
            </div> 
        )
    }
}

export default PaymentInfo
