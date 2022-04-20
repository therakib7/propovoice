import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Select from 'react-select';
import ReactToPrint from 'react-to-print';

// import Template from 'inv-template';
import Api from 'api/invoice';
import InvTemplate from 'inv-template';

import Feedback from './Feedback';
//payment
import Bank from './payment/bank';
//TODO do it on lazy load
import Stripe from './payment/stripe';
import Paypal from './payment/paypal';

const EditDownload = props => {
    return (
        <>
            <ReactToPrint
                content={() => props.componentRef}
                trigger={() => <button
                    className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white"
                    style={{ color: '#000', marginRight: '5px' }}
                // onClick={() => props.handleDownload()}
                >
                    <svg
                        width={16}
                        height={13}
                        viewBox="0 0 16 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.037 9.553H8.69v-4.32a.144.144 0 00-.146-.142h-1.09a.144.144 0 00-.146.142v4.32H5.965c-.122 0-.19.137-.115.23l2.036 2.526a.143.143 0 00.115.055.148.148 0 00.114-.055l2.036-2.526c.075-.093.008-.23-.114-.23z"
                            fill="#4C6FFF"
                        />
                        <path
                            d="M13.346 3.675A5.715 5.715 0 008.004 0 5.714 5.714 0 002.66 3.673 3.56 3.56 0 000 7.11a3.562 3.562 0 003.57 3.556h.716a.143.143 0 00.143-.143V9.458a.143.143 0 00-.143-.142H3.57a2.206 2.206 0 01-.565-4.34l.677-.176.248-.65a4.378 4.378 0 011.573-2.014 4.337 4.337 0 012.5-.787 4.337 4.337 0 013.436 1.673 4.3 4.3 0 01.638 1.127l.246.65.675.177a2.216 2.216 0 011.645 2.135c0 .589-.23 1.143-.648 1.56a2.198 2.198 0 01-1.565.645h-.716a.143.143 0 00-.143.142v1.066c0 .079.065.143.143.143h.716A3.562 3.562 0 0016 7.11a3.559 3.559 0 00-2.654-3.436z"
                            fill="#4C6FFF"
                        />
                    </svg>
                    Download
                </button>}
            />

            <ReactToPrint
                content={() => props.componentRef}
                // pageStyle="@page { size: 2.5in 4in }"
                trigger={() => <button
                    className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white"
                    // onClick={() => props.handlePrint()}
                    style={{ color: '#000' }}
                >
                    <svg
                        width={16}
                        height={14}
                        viewBox="0 0 16 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.429 1.75c0-.464.18-.91.502-1.237A1.697 1.697 0 015.143 0h5.714c.455 0 .89.184 1.212.513.322.328.502.773.502 1.237v.583h1.143c.606 0 1.188.246 1.617.684.428.437.669 1.03.669 1.65v5.25c0 .464-.18.909-.502 1.237a1.697 1.697 0 01-1.212.513h-1.6v.583c0 .464-.18.91-.502 1.237A1.697 1.697 0 0110.97 14H5.143c-.455 0-.89-.184-1.212-.513a1.769 1.769 0 01-.502-1.237v-.583H1.714c-.454 0-.89-.185-1.212-.513A1.769 1.769 0 010 9.917v-5.25c0-.62.24-1.213.67-1.65a2.262 2.262 0 011.616-.684h1.143V1.75zm8 .583V1.75a.59.59 0 00-.168-.412.566.566 0 00-.404-.171H5.143a.566.566 0 00-.404.17.59.59 0 00-.168.413v.583h6.858zm-8 1.167H2.286c-.303 0-.594.123-.808.342a1.18 1.18 0 00-.335.825v5.25c0 .154.06.303.167.412.107.11.253.171.404.171H3.43v-.583c0-.464.18-.91.502-1.238a1.697 1.697 0 011.212-.512h5.828c.455 0 .891.184 1.213.512.321.328.502.774.502 1.238v.583h1.6a.566.566 0 00.404-.17.59.59 0 00.167-.413v-5.25c0-.31-.12-.606-.335-.825a1.131 1.131 0 00-.808-.342H3.43zm1.714 5.833a.566.566 0 00-.404.171.59.59 0 00-.168.413v2.333c0 .155.06.303.168.412.107.11.252.171.404.171h5.828a.566.566 0 00.405-.17.59.59 0 00.167-.413V9.917a.59.59 0 00-.167-.413.566.566 0 00-.405-.17H5.143z"
                            fill="#4C6FFF"
                        />
                    </svg>
                    Print
                </button>}
            />
        </>
    );
}

const InvoiceBtn = props => {
    if (!props.type) return null;

    const payment_methods = props.payment_methods.list;
    const selected_method = props.payment_methods.selected;
    const changeMethod = props.payment_methods.changeMethod;
    let status = props.status;
    if (
        status == 'accept' ||
        status == 'decline' ||
        status == 'overdue' ||
        status == 'paid_req' ||
        status == 'paid'
    ) {
        return null;
    }
    return (
        <>
            {props.type == 'estimate' &&
                <>
                    <button
                        className="pi-btn pi-bg-blue pi-color-white pi-bg-hover-blue pi-hover-color-white"
                        onClick={() => props.handleChange('feedback', 'accept')}
                        style={{ marginRight: '5px' }}
                    >
                        Accept
                    </button>

                    <button
                        className="pi-btn pi-bg-air-white pi-color-white pi-bg-hover-blue pi-hover-color-white"
                        style={{ color: '#000' }}
                        onClick={() => props.handleChange('feedback', 'decline')}
                    >
                        Decline
                    </button>
                </>
            }

            {props.type == 'invoice' &&
                <>
                    <span style={{ marginRight: '10px' }}>Pay with:</span>

                    <div style={{ width: '150px', display: 'inline-block' }}>
                        <Select
                            value={selected_method}
                            onChange={changeMethod}
                            getOptionValue={(payment_methods) => payment_methods.id}
                            getOptionLabel={(payment_methods) => payment_methods.label}
                            options={payment_methods}
                        />
                    </div>

                    <button
                        className="pi-btn pi-bg-blue pi-color-white pi-bg-hover-blue pi-hover-color-white"
                        style={{ marginLeft: '10px' }}
                        onClick={() => props.handleChange('payment', selected_method.id)}
                    >
                        Pay
                    </button>
                </>
            }
        </>
    );
}

export default class Invoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            status: null,
            emailModal: false,
            paymentModal: false,
            payment_method: '',
            payment_methods: [
                {
                    id: 'bank',
                    label: 'Bank',
                }
            ],
            selected_payment_method: {
                id: 'bank',
                label: 'Bank',
            },
            feedback: '',
            fromData: null,
            toData: null,
            invoice: {
                template: {
                    id: null,
                    img: ''
                },
                from: null,
                to: null,
                items: [
                ],
                tax: 0.00,
                paid: 0.00,
                note: null,
                group: null,
                attach: [],
                sign: null
            },
        };

    }

    componentDidMount() {
        if (!wage.length) {
            /* let payment_methods = [
                {
                    id: 'paypal',
                    label: 'Paypal',
                },
                {
                    id: 'stripe',
                    label: 'Stripe',
                },
                {
                    id: 'bank',
                    label: 'Bank',
                }
            ]

            let selected_payment_method = {
                id: 'paypal',
                label: 'Paypal',
            } */
        }

        this.getData();
    }

    getData = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        Api.get(id)
            .then(resp => {
                this.setState(resp.data.data);
            })
    };
    handleClick = (type, data = null) => {
        if (type == 'feedback') {
            this.setState({ emailModal: true, feedback_type: data });
        } else {
            this.setState({ paymentModal: true, payment_method: data });
        }
    }

    changePaymentMethod = (data) => {
        this.setState({ selected_payment_method: data });
    }

    handleSubmit = (status) => {
        this.setState({ status });
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <iframe id="ncpi-invoice-print" style={{ margin: 0, padding: 0, height: 0, width: 0, position: 'absolute' }}></iframe>
                <div className='row justify-content-md-center'>
                    <div className='col-md-8 pi-no-print' style={{ margin: '30px 0' }}>
                        <div className='' style={{ maxWidth: '794px', margin: '0 auto' }}>
                            <div className='pi-float-left'><EditDownload componentRef={this.componentRef} /></div>
                            <div className='pi-float-right'>
                                <InvoiceBtn status={this.state.status} handleChange={this.handleClick} type={this.state.invoice.path} payment_methods={{ list: this.state.payment_methods, selected: this.state.selected_payment_method, changeMethod: this.changePaymentMethod }} />
                            </div>
                        </div>
                    </div>

                    <div className='col-md-8'>
                        <div className='pi-inv-preview' ref={(response) => (this.componentRef = response)} >
                            {this.state.fromData && <InvTemplate data={this.state} />}
                        </div>
                    </div>

                    <div className='col-md-8 pi-no-print' style={{ margin: '30px 0' }}>
                        <div className='' style={{ maxWidth: '794px', margin: '0 auto' }}>
                            <div className='pi-float-left'><EditDownload componentRef={this.componentRef} /></div>
                            <div className='pi-float-right'>
                                <InvoiceBtn status={this.state.status} handleChange={this.handleClick} type={this.state.invoice.path} payment_methods={{ list: this.state.payment_methods, selected: this.state.selected_payment_method, changeMethod: this.changePaymentMethod }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TODO: check this step for every component or pass show props */}
                {this.state.emailModal &&
                    <Feedback
                        show={this.state.emailModal}
                        data={this.state}
                        invoice_id={this.state.id}
                        handleSubmit={this.handleSubmit}
                        close={() => this.setState({ emailModal: false })}
                    />}

                {this.state.paymentModal &&
                    <>
                        {this.state.payment_method == 'bank' && <Bank
                            show={this.state.paymentModal}
                            invoice_id={this.state.id}
                            handleSubmit={this.handleSubmit}
                            close={() => this.setState({ paymentModal: false })}
                        />}

                        {this.state.payment_method == 'paypal' && <Paypal
                            show={this.state.paymentModal}
                            invoice_id={this.state.id}
                            close={() => this.setState({ paymentModal: false })}
                        />}

                        {this.state.payment_method == 'stripe' && <Stripe
                            show={this.state.paymentModal}
                            invoice_id={this.state.id}
                            close={() => this.setState({ paymentModal: false })}
                        />}
                    </>
                }
            </div>
        );
    }
} 