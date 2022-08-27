import React, { Component } from 'react';
import { toast } from 'react-toastify';

class Paypal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                invoice_id: null,
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

    render() {
        const data = this.props.data;
        const i18n = ndpv.i18n;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <svg
                                width={25}
                                height={25}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
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
                        <h2 className="pv-modal-title">Paypal {i18n.payment} {i18n.info}</h2>
                        <p>Here is the payment information</p>
                    </div>
                    <div className="pv-content">
                        <div className="pv-form-style-one">
                            <div className="row">
                                <div className="col-lg">
                                    <label htmlFor="form-name">{i18n.name}</label>

                                    <input
                                        id="form-name"
                                        type="text"
                                        required
                                        name="name"
                                        value={data.payment_info.billing_address.name.given_name}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-lg">
                                    <label htmlFor="form-email">
                                        {i18n.email}
                                    </label>

                                    <input
                                        id="form-email"
                                        type="text"
                                        required
                                        name="email"
                                        value={data.payment_info.billing_address.email_address}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg">
                                    <label htmlFor="form-transection_id">
                                        {i18n.txn} {i18n.id}
                                    </label>

                                    <input
                                        id="form-transection_id"
                                        type="text"
                                        required
                                        name="transection_id"
                                        value={data.payment_info.id}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pv-modal-footer">

                    </div>
                </div>
            </div>
        );
    }
}

export default Paypal;
