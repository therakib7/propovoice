import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';
import Api from 'api/payment-process';

class Bank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                invoice_id: null,
                payment_method: 'bank',
                payment_details: '',
                receipt: null,
            },
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    componentDidMount() {
        let form = { ...this.state.form }
        form.invoice_id = this.props.invoice_id;
        this.setState({ form });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = { ...this.state.form }
        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    this.props.close();
                    this.props.handleSubmit('paid_req');

                    toast.success('Thanks for payment request');

                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
    }

    handleUploadChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.receipt = data;
        this.setState({ form })
    }

    render() {
        return (
            <>
                {this.props.show && (
                    <>
                        <div className="pi-overlay pi-show">
                            <div className="pi-popup-content">
                                <div className="pi-modal-header">
                                    <h2 className="pi-modal-title pi-text-center">Payment Info</h2>
                                    <span className="pi-close" onClick={() => this.props.close()}>×</span>
                                </div>

                                <div className="pi-content">
                                    <form onSubmit={this.handleSubmit} className="pi-form-style-one">

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
                                                <Upload label={'Upload'} attach_type='secret' permission={true} library={false} data={this.state.form.receipt} changeHandler={this.handleUploadChange} />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md">
                                                <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto">
                                                    Payment
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
export default Bank; 