import React, { Component, Suspense, lazy } from 'react'
import { ToastContainer } from 'react-toastify';
import Select from 'react-select';
import ReactToPrint from 'react-to-print';
import Spinner from 'block/preloader/spinner';
// import Template from 'inv-template';
import Api from 'api/invoice';
import InvTemplate from 'inv-template';

import Feedback from './Feedback';
//payment
const Bank = lazy(() => import('./payment/bank'));
const Stripe = lazy(() => import('./payment/stripe'));
const Paypal = lazy(() => import('./payment/paypal'));
// import Bank from './payment/bank';
// //TODO do it on lazy load
// import Stripe from './payment/stripe';
// import Paypal from './payment/paypal';

const EditDownload = props => {
    return (
        <>
            <ReactToPrint
                content={() => props.componentRef}
                trigger={() => <button
                    className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5"
                // style={{ color: '#000', marginRight: '5px' }}
                // onClick={() => props.handleDownload()}
                >
                    <svg
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z"
                            stroke="#2D3748"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z"
                            stroke="#2D3748"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Download
                </button>}
            />

            <ReactToPrint
                content={() => props.componentRef}
                // pageStyle="@page { size: 2.5in 4in }"
                trigger={() => <button
                    className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5"
                // style={{ color: '#000', marginRight: '5px' }}
                // onClick={() => props.handlePrint()}
                >
                    <svg
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z"
                            stroke="#2D3748"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z"
                            stroke="#2D3748"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                        className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white"
                        onClick={() => props.handleChange('feedback', 'accept')}
                        style={{ marginRight: '5px' }}
                    >
                        Accept
                    </button>

                    <button
                        className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow"
                        style={{ color: '#000' }}
                        onClick={() => props.handleChange('feedback', 'decline')}
                    >
                        Decline
                    </button>
                </>
            }

            {props.type == 'invoice' && payment_methods.length > 0 &&
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
                        className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white"
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
            payment_methods: [],
            selected_payment_method: null,
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
            previewHeight: 'auto',
        };

        this.previewRef = React.createRef();

    }

    componentDidMount() {

        this.getData();
    }

    isPreviewLoaded = () => {
        let previewRef = this.previewRef.current;
        if (previewRef) {
            let height;

            if (previewRef.clientHeight > 1123) {
                height = (Math.ceil(previewRef.clientHeight / 1123) * 1123) + 'px';
            } else {
                height = '1123px';
            }
            this.setState({ previewHeight: height });
        }
    }

    getData = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        Api.get(id + '?client_view=1')
            .then(resp => {
                let data = resp.data.data;
                let payment_methods = [];

                let paypal = {
                    id: 'paypal',
                    label: 'Paypal',
                };

                let stripe = {
                    id: 'stripe',
                    label: 'Stripe',
                };

                let bank = {
                    id: 'bank',
                    label: 'Bank',
                };

                if (!wage.length) {
                    if (data.invoice.payment_methods.hasOwnProperty('paypal') && data.invoice.payment_methods.paypal) { 
                        payment_methods.push(paypal);
                    }

                    if (data.invoice.payment_methods.hasOwnProperty('stripe') && data.invoice.payment_methods.stripe) {
                        payment_methods.push(stripe);
                    }
                }

                if (data.invoice.payment_methods.hasOwnProperty('bank') && data.invoice.payment_methods.bank) {
                    payment_methods.push(bank);
                } 
                
                data.payment_methods = payment_methods;

                if (!wage.length && data.invoice.payment_methods.hasOwnProperty('paypal') && data.invoice.payment_methods.paypal) {
                    data.selected_payment_method = paypal;
                } else if (!wage.length && data.invoice.payment_methods.hasOwnProperty('stripe') && data.invoice.payment_methods.stripe) {
                    data.selected_payment_method = stripe;
                } else if (data.invoice.payment_methods.hasOwnProperty('bank') && data.invoice.payment_methods.bank) {
                    data.selected_payment_method = bank;
                }
                
                this.setState(data);
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
                <ToastContainer hideProgressBar />
                <iframe id="ndpi-invoice-print" style={{ margin: 0, padding: 0, height: 0, width: 0, position: 'absolute' }}></iframe>
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
                        <div className='pi-inv-hidden-preview' style={{ position: 'absolute', left: 9999 }} ref={this.previewRef} >
                            {this.state.fromData && <InvTemplate data={this.state} isPreviewLoaded={this.isPreviewLoaded} />}
                        </div>

                        <div className='pi-inv-preview-wrap'>
                            <div className='pi-inv-preview' ref={(response) => (this.componentRef = response)} >
                                {this.state.fromData && <InvTemplate data={this.state} height={this.state.previewHeight} />}
                            </div>
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
                        <Suspense fallback={<Spinner />}>
                            {this.state.payment_method == 'bank' && <Bank
                                show={this.state.paymentModal}
                                invoice_id={this.state.id}
                                handleSubmit={this.handleSubmit}
                                close={() => this.setState({ paymentModal: false })}
                            />}

                            {this.state.payment_method == 'paypal' && <Paypal
                                show={this.state.paymentModal}
                                invoice={this.state.invoice}
                                close={() => this.setState({ paymentModal: false })}
                            />}

                            {this.state.payment_method == 'stripe' && <Stripe
                                show={this.state.paymentModal}
                                invoice={this.state.invoice}
                                close={() => this.setState({ paymentModal: false })}
                            />}
                        </Suspense>
                    </>
                }
            </div>
        );
    }
} 