import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Api from 'api/payment-process';
import Upload from 'block/field/upload'; 

class Bank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                invoice_id: null,
                payment_details: '',
                receipt: '', 
                amount: '',
                date: '',
                note: '',
            },
        };
    }

    componentDidMount() {
        // this.setState({ note: this.props.data.note });
        if (this.state.form.invoice_id != this.props.data.id) {
            this.setState({ form: this.props.data.payment_info });
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = { ...this.state.form }
        form.payment_method = 'bank';
        form.invoice_id = this.props.data.id;
        form.mark_as_paid = true;
        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    this.props.close();
                    this.props.reload();
                    toast.success('Sucessfully Paid');
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
    }

    render() {
        const data = this.props.data;
        return (
            <>
                {this.props.show && (
                    <div className="pi-overlay pi-show">
                        <div className="pi-popup-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title pi-text-center">Bank Payment Info</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <div className="pi-form-style-one">
                                    <form onSubmit={this.handleSubmit} >  

                                        <div className="row">
                                            <div className="col-lg">
                                                <label htmlFor="form-payment_details">
                                                    Payment Details
                                                </label>
                                                <textarea
                                                    id="form-payment_details"
                                                    rows={4}
                                                    name="payment_details"
                                                    value={this.state.form.payment_details}
                                                    onChange={this.handleChange}
                                                />
                                                <p className='pi-field-desc'>Give your payment details here, Like: Name, Transection ID. etc</p> 
                                            </div>
                                        </div> 

                                        <div className="row">
                                            <div className="col-md">
                                                <label htmlFor="field-receipt">Payment Receipt</label>
                                                <Upload label={'Upload'} library={false} data={this.state.form.receipt} changeHandler={this.handleUploadChange} />
                                            </div> 
                                        </div>

                                        <div className="row">
                                            <div className="col-lg">
                                                <label htmlFor="form-amount">
                                                    Amount Sent
                                                </label>

                                                <input
                                                    id="form-amount"
                                                    type="text"
                                                    required
                                                    name="amount"
                                                    value={this.state.form.amount}
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="col-lg">
                                                <label htmlFor="form-date">
                                                    Payment Date
                                                </label>
                                                <input
                                                    id="form-date"
                                                    type="text"
                                                    required
                                                    name="date"
                                                    value={this.state.form.date}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg">
                                                <label htmlFor="form-note">
                                                    Additional Note
                                                </label>
                                                <textarea
                                                    id="form-note"
                                                    rows={3}
                                                    name="note"
                                                    value={this.state.form.note}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div> 
                                         
                                        <div className="row">
                                            <div className="col-lg"> 
                                                <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto">
                                                    Mark As Paid
                                                </button> 
                                            </div> 
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Bank;
