import React, { Component } from 'react';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Api from 'api/email';

class Send extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            form: {
                invoice_id: null,  
                fromData: {
                    id: '',
                    email: ''
                }, 
                toData: {
                    id: '',
                    name: '',
                    email: ''
                },
                subject: '',
                msg: '',
                invoice_img: null,
            }, 
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    convertDate = str => {
        let date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    //try to call it from invoice to avoid duplication code
    calcTaxAmount = (c) => {
		return c * (this.props.data.invoice.tax / 100)
	}

	calcItemsTotal = () => {
		return this.props.data.invoice.items.reduce((prev, cur) => (prev + (cur.qty * cur.price)), 0)
	}

	calcTaxTotal = () => {
		return this.calcItemsTotal() * (this.props.data.invoice.tax / 100)
	}

	calcGrandTotal = () => {
		return this.calcItemsTotal() + this.calcTaxTotal(); 
	}
    //end try to call it from invoice to avoid duplication code

    componentDidMount() {  
        let data = this.props.data;  
        let formState = {...this.state.form}

        let invoice_id = data.invoice.id;
        let invoice_date = this.convertDate(data.invoice.date);
        let invoice_due_date = this.convertDate(data.invoice.due_date);
        let invoice_due_amount = this.calcGrandTotal();
        let company_name = data.fromData.name;
        let client_name = data.toData.first_name + ' ' + data.toData.last_name;

        formState.invoice_id = invoice_id;
        formState.fromData = {
            id: data.fromData.id,
            name: company_name,
            email: data.fromData.email,
        };

        formState.toData = {
            id: data.toData.id,
            name: client_name,
            email: data.toData.email,
        }; 
        this.setState({ form: formState });  
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // TODO: send with attachment pdf
        if ( true ) {
            html2canvas(document.querySelector(".pi-inv")).then(canvas => { 
                const imgData = canvas.toDataURL('image/jpg'); 
                
                let formState = {...this.state.form} 
                formState.invoice_img = imgData;

                this.setState({ form: formState }, () => {
                    this.sendEmail();
                });
            });
        } else {
            this.sendEmail();
        }

        // this.props.handleSubmit(this.state.form); 
    }

    sendEmail = () => {
        Api.create(this.state.form)
                .then(resp => {
                    if (resp.data.success) {  
						//this.props.routeChange(resp.data.data);  

                        toast.success('Mail sucessfully sent'); 
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                }) 
    }

    subjectLook = () => {
        let data = this.props.data; 
        let company_name = data.fromData.name;
        let invoice_id = data.invoice.id;
        return `${company_name} sent you a Invoice #${invoice_id}`;
    }

    render() {
        return (
            <>
                {this.props.show && (
                    <>  
                        <div className="pi-overlay pi-show">
                            <div className="pi-popup-content">
                                <div className="pi-modal-header">
                                    <h2 className="pi-modal-title pi-text-center">Accept Estimate</h2>
                                    <span className="pi-close" onClick={() => this.props.close()}>×</span>
                                </div>

                                <div className="pi-content">
                                    <form onSubmit={this.handleSubmit} className="pi-form-content pi-form-style-two">
                                        <div className="row">
                                            <div className="col-lg">
                                                <label
                                                    htmlFor="form-name">
                                                    Client Name
                                                </label>

                                                <input
                                                    id="form-name"
                                                    type="text"
                                                    required
                                                    readOnly
                                                    name="name"
                                                    value={this.state.form.toData.name}
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="col-lg">
                                                <label
                                                    htmlFor="form-email">
                                                    Email
                                                </label>

                                                <input
                                                    id="form-email"
                                                    type="text"
                                                    required
                                                    readOnly
                                                    name="email"
                                                    value={this.state.form.toData.email}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>  
                                         
                                        <div className="pi-textarea-content">
                                            <div className="row">
                                                <div className="col"> 
                                                    <h4
                                                        htmlFor="form-msg">
                                                        Additional Note
                                                    </h4>
                                                </div> 
                                            </div>

                                            <div className="row">
                                                <div className="col">  
                                                    <textarea
                                                        id="form-msg" 
                                                        rows={3}
                                                        name="msg"
                                                        value={this.state.form.msg}
                                                        onChange={this.handleChange}
                                                    />   
                                                </div>
                                            </div> 
                                            
                                            <div className="row">
                                                <div className="col">  
                                                    <button 
                                                    className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white"
                                                    // onClick={() => this.setState({ media: true })}
                                                    >
                                                        <svg
                                                        width={12}
                                                        height={12}
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"  
                                                        >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z"
                                                            fill="#18181B"
                                                        />
                                                        </svg>
                                                        Add Attachment
                                                    </button>	   
                                                </div>
                                            </div> 
                                        </div> 

                                        <div className="pi-footer-content pi-text-center">
                                            <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                                                Accept
                                            </button>
                                        </div>
                                    </form> 
                                </div>
                            </div> 
                        </div>
                    </>
                )
                }
            </>
        );
    }
}

export default Send;
