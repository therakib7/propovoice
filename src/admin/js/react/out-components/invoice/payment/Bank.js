import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Api from 'api/email';

class Payment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                invoice_id: null,
                payment_type: '',
                country: '',
                bank_name: '',
                account_name: '',
                account_no: '',
                amount: '',
                date: '',
                note: '',
            },
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    componentDidMount() {
        let form = { ...this.state.form }
        form.invoice_id = this.props.data.invoice.id;
        form.payment_type = this.props.data.payment_type;
        this.setState({ form });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = { ...this.state.form }
        form.type = 'payment';
        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    this.props.close();

                    toast.success('Thanks for payment');

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
                            <div className="pi-popup-content">
                                <div className="pi-modal-header">
                                    <h2 className="pi-modal-title pi-text-center">Payment Info</h2>
                                    <span className="pi-close" onClick={() => this.props.close()}>×</span>
                                </div>

                                <div className="pi-content">
                                    <form onSubmit={this.handleSubmit} className="pi-form-content pi-form-style-two pi-form-style-three">

                                        <div className="row">
                                            <div className="col-lg">
                                                <label htmlFor="form-country">
                                                    Country
                                                </label>

                                                <input
                                                    id="form-country"
                                                    type="text"
                                                    required
                                                    name="country"
                                                    value={this.state.form.country}
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="col-lg">
                                                <label htmlFor="form-bank_name">
                                                    Bank Name
                                                </label>
                                                <input
                                                    id="form-bank_name"
                                                    type="text"
                                                    required
                                                    name="bank_name"
                                                    value={this.state.form.bank_name}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg">
                                                <label htmlFor="form-account_name">
                                                    Account Name
                                                </label>

                                                <input
                                                    id="form-account_name"
                                                    type="text"
                                                    required
                                                    name="account_name"
                                                    value={this.state.form.account_name}
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="col-lg">
                                                <label htmlFor="form-account_no">
                                                    Account No
                                                </label>
                                                <input
                                                    id="form-account_no"
                                                    type="text"
                                                    required
                                                    name="account_no"
                                                    value={this.state.form.account_no}
                                                    onChange={this.handleChange}
                                                />
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
                                                    rows={5}
                                                    name="note"
                                                    value={this.state.form.note}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <button
                                                    className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white"
                                                    // onClick={() => this.setState({ media: true })}
                                                    style={{ color: '#000' }}
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

                                        <div className="pi-footer-content pi-text-center">
                                            <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                                                Payment
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

export default Payment; 