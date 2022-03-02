import React, { Component } from 'react'; 

import From from '../From';
import To from '../To';
import Total from '../Total';
import Items from '../Items' 
import Note from '../Note' 
import Group from '../Group'; 
import Attachments from '../Attachments';
import Signature from '../Signature';

//style
// import Style from '../scss/1.scss'

export default class One extends Component {
    constructor(props) {
        super(props);  
    }    

    render() { 
        const { items, note, group, attachments, signature } = this.props.data.invoice; 
        const { fromData, toData } = this.props.data; 
        return ( 
            <div className="pi-invoice pi-invoice-one">
                <div className="pi-top-shape">
                    <img src="assets/img/inv/shape/Vector.svg" alt="" />
                </div>

                <div className="pi-body">
                    <div className="pi-hedear">
                        <div className="pi-from">
                        <div className="pi-from-logo">
                            <img src="assets/img/fromlogo.png" alt="" />
                        </div>
                        <address>
                            Address: <span>377 Airport - Dakshinkhan Rd, Dhaka 1230</span>
                            <br />
                            Email:{" "}
                            <span>
                            <a href="#"> hello@nurency.com</a>{" "}
                            </span>
                            <br />
                            What'sApp: <span>+8801760706361</span>
                            <br />
                        </address>
                        <div className="pi-from-date">
                            <p>
                            Invoice No: <span>00024</span>
                            </p>
                            <div className="pi-from-time">
                            <p>
                                Date:<span> 01-02-2022</span>
                            </p>
                            <p>
                                Due Date:<span> 01-02-2022</span>
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="pi-to">
                        <div className="pi-to-logo">
                            <h2>INVOICE</h2>
                        </div>
                        <p>Bill to</p>
                        <p>IBM Design agency</p>
                        <address>
                            Address:<p>377 Airport - Dakshinkhan Rd, Dhaka 1230</p>
                            Email:{" "}
                            <span>
                            <a href="#"> hello@nurency.com</a>{" "}
                            </span>
                            <br />
                            What'sApp: <span>+8801760706361</span>
                            <br />
                        </address>
                        </div>
                    </div>

                    {items && <Items data={items} />}   

                    <div className="pi-bank-info">
                        <div className="pi-banking">
                        <h4>Bank Info:</h4>
                        <table>
                            <tbody>
                            <tr>
                                <th>Name:</th>
                                <td>Nasir Bin Burhan</td>
                            </tr>
                            <tr>
                                <th>Account No:</th>
                                <td> 2311 3213 2311</td>
                            </tr>
                            <tr>
                                <th>Bank Info:</th>
                                <td>Estern Bank Bangladesh Limited.Dhaka Branch</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className="pi-amounting">
                        <table>
                            <tbody>
                            <tr>
                                <th>Subtotal:</th>
                                <td>57397.7 $</td>
                            </tr>
                            <tr className="pb-15">
                                <th>Tax:</th>
                                <td>397.7 $</td>
                            </tr>
                            <tr className="pi-table-bg">
                                <th>Total:</th>
                                <td>63397.7 $</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
                    <div className="pi-note-wrap">
                        <div className="pi-note">
                            {note && <Note data={note} />}  
                            {group && <Group data={group} />} 
                        </div>
                        <div className="pi-sign">
                            <img src="assets/img/signature.png" alt="" />
                            <div className="pi-border" />
                            <h4>Signature</h4>
                        </div>
                    </div>
                </div>

                <div className="pi-footer-shape">
                    <img src="assets/img/inv/shape/Vector2.svg" alt="" />
                </div>
            </div>
        );
    }
} 