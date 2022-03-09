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

    componentDidMount() {  
        let data = this.props.data; 
        let formState = {...this.state.form}

        formState.invoice_id = data.invoice.id;

        formState.fromData = {
            id: data.fromData.id,
            email: data.fromData.email,
        };

        formState.toData = {
            id: data.toData.id,
            email: data.toData.email,
        }; 
        
        formState.subject = '{company_name} sent you a Invoice #{invoice_id}';

        this.setState({ form: formState }); 
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // send with attachment pdf
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
                                    <h2 className="pi-modal-title">Send To</h2>
                                    <span className="pi-close" onClick={() => this.props.close()}>
                                    ×
                                    </span>
                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="pi-content">
                                        <div className='pi-business-form'> 
                                            <div className="row">

<div className="col">
    <label
        htmlFor="form-email">
        Email
    </label>

    <input
        id="form-email"
        type="email"
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
                                                        htmlFor="form-company_name">
                                                        Subject
                                                    </label>

                                                    <input
                                                        id="form-company_name"
                                                        type="text"
                                                        required
                                                        name="company_name"
                                                        value={this.state.form.subject}
                                                        onChange={this.handleChange}
                                                    /> 
                                                </div> 
                                            </div> 

                                            <div className="row">
                                                <div className="col">
                                                    <label
                                                        htmlFor="form-company_name">
                                                        Subject Preview
                                                    </label> 
                                                    {this.subjectLook()}
                                                </div> 
                                            </div> 

                                            <div className="row">
                                                <div className="col">
                                                    <label
                                                        htmlFor="form-company_name">
                                                        Private Message
                                                    </label>

                                                    <textarea
                                                        id="form-company_name"
                                                        type="text" 
                                                        name="company_name"
                                                        value={this.state.form.msg}
                                                        onChange={this.handleChange}
                                                    /> 
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pi-footer-content">  
                                        <button
                                            className="pi-btn pi-bg-black pi-bg-hover-blue pi-float-right"
                                            type="submit">
                                            Send
                                        </button>
                                    </div>
                                </form>
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
