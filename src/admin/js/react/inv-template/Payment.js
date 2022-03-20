import React, { Component } from 'react'  

class Payment extends Component {

    constructor(props) {
        super(props); 
    } 

    render = () => {
        const {paymentData} = this.props.data;
        return (   
            <div className="pi-banking">
                {paymentData ? <><h4>Bank Info:</h4>
                <table>
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td>{paymentData.account_name}</td>
                        </tr>
                        <tr>
                            <th>Account No:</th>
                            <td>{paymentData.account_no}</td>
                        </tr>
                        <tr>
                            <th>Bank Name:</th>
                            <td>{paymentData.bank_name}</td>
                        </tr>
                        <tr>
                            <th>Routing No:</th>
                            <td>{paymentData.routing_no}</td>
                        </tr>
                        <tr>
                            <th>Branch Name:</th>
                            <td>{paymentData.bank_branch}</td>
                        </tr> 
                    </tbody>
                </table></> : '' }
            </div>
        )
    }
}

export default Payment
