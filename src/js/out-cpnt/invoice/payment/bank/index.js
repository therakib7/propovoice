import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';
import Api from 'api/payment-process';
import { sprintf } from 'sprintf-js';

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

                    toast.success(ndpv.i18n.aThankR);

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
        const i18n = ndpv.i18n;
        return (
            <>
                {this.props.show && (
                    <div className="pv-overlay pv-show">
                        <div className="pv-modal-content">

                            <div className="pv-modal-header pv-gradient">
                                <span className="pv-close" onClick={() => this.props.close()}>
                                    <svg
                                        width={25}
                                        height={25}
                                        viewBox="0 0 16 16"
                                        fill="none" 
                                    >
                                        <path
                                            d="M12.5 3.5L3.5 12.5"
                                            stroke="#718096"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12.5 12.5L3.5 3.5"
                                            stroke="#718096"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <h2 className="pv-modal-title">{i18n.payment} {i18n.info}</h2>
                                <p>{i18n.payDesc}</p>
                            </div>
                            <form onSubmit={this.handleSubmit} >
                                <div className="pv-content">
                                    <div className="pv-form-style-one">
                                        <div className="row">
                                            <div className="col-lg">
                                                <label htmlFor="form-payment_details">
                                                    {i18n.payment} {i18n.dtl}
                                                </label>
                                                <textarea
                                                    id="form-payment_details"
                                                    rows={4}
                                                    name="payment_details"
                                                    value={this.state.form.payment_details}
                                                    onChange={this.handleChange}
                                                />
                                                <p className='pv-field-desc'>Give your payment details here, Like: Name, Transection ID. etc</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md">
                                                <label htmlFor="field-receipt">{i18n.payment} {i18n.receipt}</label>
                                                <Upload label={'Upload'} attach_type='secret' permission library={false} data={this.state.form.receipt} changeHandler={this.handleUploadChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pv-modal-footer">
                                    <div className="row">
                                        <div className="col">
                                            {/* <button type='reset' className="pv-btn pv-text-hover-blue">{i18n.clear}</button> */}
                                        </div>
                                        <div className="col">
                                            <button type='submit' className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white">
                                                {i18n.payment}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
export default Bank; 