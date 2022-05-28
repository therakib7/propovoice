import React, { Component } from 'react';
import { toast } from 'react-toastify';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

import Api from 'api/email'; 

class Send extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            form: {
                invoice_id: null, 
                path: '', 
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
         
        if ( data.fromData == null || data.toData == null ) {
            toast.error('First fill up necessary information, From content tab'); 
            return;
        } 

        let path = this.props.path;  

        let path_title = path == 'invoice' ? 'Invoice' : 'Estimate'; 
        let formState = {...this.state.form}

        let id = data.invoice.id;
        let currency = data.invoice.currency; 
        let date = this.convertDate(data.invoice.date);
        let due_date = this.convertDate(data.invoice.due_date);
        let amount = this.calcGrandTotal();
        let company_name = data.fromData.name;
        let client_name = data.toData.first_name + ' ' + data.toData.last_name;

        formState.invoice_id = id;
        formState.path = path_title;
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
        
        let mail = this.props.mail;

        let subject = mail.subject.replaceAll('{id}', id)
        .replaceAll('{company_name}', company_name);

        let msg = mail.msg.replaceAll('{id}', id)
        .replaceAll('{company_name}', company_name)
        .replaceAll('{client_name}', client_name)
        .replaceAll('{date}', date)
        .replaceAll('{due_date}', due_date)
        .replaceAll('{amount}', amount + ' ' + currency);

        formState.subject = subject;
        formState.msg = msg;

        this.setState({ form: formState });  
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // TODO: send with attachment pdf
        if ( false ) {
            /* html2canvas(document.querySelector(".pi-inv")).then(canvas => { 
                const imgData = canvas.toDataURL('image/jpg'); 
                
                let formState = {...this.state.form} 
                formState.invoice_img = imgData;

                this.setState({ form: formState }, () => {
                    this.sendEmail();
                });
            }); */
        } else {
            this.sendEmail();
        } 
    }

    sendEmail = () => {
        let form = { ...this.state.form }
			form.type = 'sent'; 
        Api.create(form)
            .then(resp => {
                if (resp.data.success) {   
                    toast.success('Mail sucessfully sent'); 
                    this.props.close();
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            }) 
    } 

    render() {
        return (
            <>
                {this.props.show && (
                    <>  
                        <div className="pi-overlay pi-show">
                            <div className="pi-modal-content">
                                <div className="pi-modal-header">
                                    <h2 className="pi-modal-title pi-text-center">Send To</h2>
                                    <span className="pi-close" onClick={() => this.props.close()}>×</span>
                                </div>

                                <div className="pi-content">
                                    <form onSubmit={this.handleSubmit} className="pi-form-style-one">
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

                                        <div className="row">
                                            <div className="col">
                                                <label
                                                    htmlFor="form-subject">
                                                    Subject
                                                </label>

                                                <input
                                                    id="form-subject"
                                                    type="text"
                                                    required
                                                    name="subject"
                                                    value={this.state.form.subject}
                                                    onChange={this.handleChange}
                                                /> 
                                            </div>
                                        </div>
 
                                        <div className="row">
                                            <div className="col"> 
                                                <label htmlFor="form-msg">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="form-msg" 
                                                    rows={8}
                                                    name="msg"
                                                    value={this.state.form.msg}
                                                    onChange={this.handleChange}
                                                />   
                                            </div> 
                                        </div>

                                        <div className="row">
                                            <div className="col"> 
                                                <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto">
                                                    Send Email
                                                </button> 
                                            </div> 
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
