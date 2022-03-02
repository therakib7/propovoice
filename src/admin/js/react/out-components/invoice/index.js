import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from './style.scss'

import Api from '../../api/business'; 
import Info from './Info';
import Branding from './Branding';

export default class Invoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                {
                    id: 'welcome',
                    text: 'Welcome'
                },
                {
                    id: 'info',
                    text: 'Business Info'
                },
                {
                    id: 'branding',
                    text: 'Branding Resource'
                },
                {
                    id: 'finish',
                    text: 'Finish'
                } 
            ],
            currentTab: 'welcome',
            currentTabIndex: null,  
            preloader: true, 
            business: { id: null } 
        };
    } 

    componentDidMount() {
        this.getData(); 
    }

    getData = () => {  
        Api.getAll('default=1')
        .then(resp => {
            let businessData = resp.data.data.result;
            if ( businessData.length ) {  
                this.setState({ business: businessData[0] });  
            }
        }); 
    };

    handleBrandingChange = ( data ) => {  
		let business = {...this.state.business} 
		business.logo = data; 
		this.setState({business})  
	}

    handleSubmit = ( business, tab = null ) => { 
        if ( tab == 'branding' ) {
            business = this.state.business;
        }

        if ( !business.id ) {
            Api.create(business)
                .then(resp => {
                    if ( resp.data.success ) {   
                        let businessData = {...business} 
                        businessData.id = resp.data.data; 
                        this.setState({ business: businessData });
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Api.update(business.id, business)
                .then(resp => {
                    if ( !resp.data.success) { 
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }

        if ( tab == 'branding' ) {
            this.setState({ currentTab: 'finish', currentTabIndex: 3 });
        } else {
            this.setState({ currentTab: 'branding', currentTabIndex: 2 });
        } 
    }  

    handleSkip = ( name = null ) => { 
        if ( name == 'info' ) {
            this.setState({ currentTab: 'branding', currentTabIndex: 2 });
        } else {
            this.setState({ currentTab: 'finish', currentTabIndex: 3 });
        }
        
    } 

    setActiveTab(id, index) { 
        this.setState({
            currentTab: id,
            currentTabIndex: index
        });
    }

    render() {
        const { tabs = [], currentTab, currentTabIndex } = this.state;
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

                    <div className="pi-items-table">
                        <table>
                        <thead>
                            <tr>
                            <th>SL</th>
                            <th>Item Description</th>
                            <th>Unit</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>01.</td>
                            <td>
                                Saas Landing page design <br />
                                <span>Designed a saas landing page for a local client</span>
                            </td>
                            <td>5 pages</td>
                            <td>
                                10$ <br />
                                <span> (Fixed price)</span>
                            </td>
                            <td>10$</td>
                            </tr>
                            <tr>
                            <td>02.</td>
                            <td>
                                Saas Landing page design <br />
                                <span>
                                Designed a saas landing page for a local <br /> client for his
                                business
                                </span>
                            </td>
                            <td>5 pages</td>
                            <td>
                                10$ <br />
                                <span> (Fixed price)</span>
                            </td>
                            <td>10$</td>
                            </tr>
                            <tr>
                            <td>03.</td>
                            <td>
                                Saas Landing page design <br />
                                <span>Designed a saas landing page for a local client</span>
                            </td>
                            <td>5 pages</td>
                            <td>
                                10$ <br />
                                <span> (Fixed price)</span>
                            </td>
                            <td>10$</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>

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
                        <h4>Note:</h4>
                        <p>Designed a saas landing page for a local client for his business</p>
                        <h4 className="mt-35">T&amp;C:</h4>
                        <p>Danding page for a local client for his business</p>
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