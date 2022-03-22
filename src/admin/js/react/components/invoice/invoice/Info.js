import React, { Component } from 'react';

class Info extends Component {
    constructor(props) {
        super(props);

    }

    componentDidUpdate() {
        // this.setState({ note: this.props.data.note });
    }

    handleChange = e => { 
    }

    render() {
        const data = this.props.data;
        return (
            <>
                {this.props.show && (
                    <div className="pi-overlay pi-show">
                        <div className="pi-popup-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title pi-text-center">{( data.status == 'accept' || data.status == 'decline' ) ? 'Feedback' : 'Payment Info' }</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <div className="pi-form-content pi-form-style-two pi-form-style-three">

                                    {( data.status == 'accept' || data.status == 'decline' ) && <div className="pi-textarea-content">
                                        <div className="row">
                                            <div className="col">
                                                <h4 htmlFor="form-note">
                                                    Additional Note
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <p>{data.feedback.note}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">

                                            </div>
                                        </div>
                                    </div>}

                                    {( data.status == 'paid_req' || data.status == 'paid' ) && 
                                        <>
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
                                                    value={data.payment.country}
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
                                                    value={data.payment.bank_name}
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
                                                    value={data.payment.account_name}
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
                                                    value={data.payment.account_no}
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
                                                    value={data.payment.amount}
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
                                                    value={data.payment.date}
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
                                                    value={data.payment.note}
                                                    onChange={this.handleChange}
                                                />
                                            </div> 
                                        </div>  

                                        <div className="pi-footer-content pi-text-center">
                                            <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                                                Mark As Paid
                                            </button>
                                        </div>
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

export default Info;
