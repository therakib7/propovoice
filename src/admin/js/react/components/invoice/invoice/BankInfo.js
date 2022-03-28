import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Api from 'api/payment-process';

class BankInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                invoice_id: null,
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
        form.payment_type = 'bank';
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
                                <h2 className="pi-modal-title pi-text-center">{(data.status == 'accept' || data.status == 'decline') ? 'Feedback' : 'Bank Info'}</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <div className="pi-form-content pi-form-style-two pi-form-style-three">

                                    {(data.status == 'accept' || data.status == 'decline') &&
                                        <div className="row">
                                            <div className="col-lg">
                                                <label htmlFor="form-note">
                                                    Additional Note
                                                </label>
                                                <textarea
                                                    id="form-note"
                                                    rows={5}
                                                    name="note"
                                                    value={data.feedback.note}
                                                // onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>}

                                    {(data.status == 'paid_req' || data.status == 'paid') &&
                                        <>
                                            <form onSubmit={this.handleSubmit} >
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

                                                <div className="pi-footer-content pi-text-center">
                                                    <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                                                        Mark As Paid
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default BankInfo;
