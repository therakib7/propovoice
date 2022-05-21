import React, { Component } from 'react';

class Stripe extends Component {
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
        return (
            <>
                {this.props.show && (
                    <div className="pi-overlay pi-show">
                        <div className="pi-popup-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title pi-text-center">Stripe Payment Info</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <div className="pi-form-style-one">

                                    <div className="row">
                                        <div className="col-lg">
                                            <label htmlFor="form-name">
                                                Name
                                            </label>

                                            <input
                                                id="form-name"
                                                type="text"
                                                required
                                                name="name"
                                                value={data.payment_info.billing_address.name}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className="col-lg">
                                            <label htmlFor="form-email">
                                                Email
                                            </label>

                                            <input
                                                id="form-email"
                                                type="text"
                                                required
                                                name="email"
                                                value={data.payment_info.billing_address.email}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg">
                                            <label htmlFor="form-transection_id">
                                                Transection ID
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
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Stripe;
