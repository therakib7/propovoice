// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import React, { Component } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

import './style.css';

import { apiUrl } from 'api/helper'

import Api from 'api/payment-process';

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#4e6de9',
            color: '#000',
            fontWeight: 500,
            // fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
                color: '#1a202c',
            },
            '::placeholder': {
                color: '#777777',
            },
        },
        invalid: {
            iconColor: '#b30000',
            color: '#b30000',
        },
    },
};

const SubmitButton = ({ processing, error, children, disabled }) => (

    <div className="pi-footer-content pi-text-center">
        <button
            className={`pi-btn pi-bg-blue pi-bg-hover-blue SubmitButton ${error ? 'SubmitButton--error' : ''}`}
            type="submit"
            disabled={processing || disabled}
        >
            {processing ? 'Processing...' : children}
        </button>
    </div>
);

const ErrorMessage = ({ children }) => (
    <div className="ErrorMessage" role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#000"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#fff"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
);

class CheckoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            cardComplete: false,
            processing: false,
            paymentMethod: null,
            form: {
                email: '',
                phone: '',
                name: '',
            }
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { stripe, elements } = this.props;
        const { error, cardComplete } = this.state;
        const { email, phone, name } = this.state.form;

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        if (error) {
            card.focus();
            return;
        }

        //if (cardComplete) {
        this.setState({ processing: true });
        //}

        let client_secret = null;
        const url = apiUrl + 'payment-process';
        const indent_resp = await axios.get(`${url}/?type=payment_indent`);
        if (indent_resp) {
            // console.log(indent_resp.data); return;
            client_secret = indent_resp.data.data.intent_obj.client_secret
        }
        // const { data: clientSecret } = await axios.get(`${url}/?type=payment_indent`);
        // console.log(data)
        // if (payment_indent) return;
        // console.log('after indent');
        const paymentPayload = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                address: {
                    city: ''
                },
                email,
                phone,
                name,
            },
        });

        if (paymentPayload.error) {
            this.setState({ error: paymentPayload.error });
        } else {
            const confirmPayment = await stripe.confirmCardPayment(client_secret, {
                payment_method: paymentPayload.paymentMethod.id
            });

            if (confirmPayment.error) {
                this.setState({ processing: false, error: confirmPayment.error });
            } else {
                this.setState({ processing: false, paymentMethod: confirmPayment });

                let form = {
                    invoice_id: this.props.invoice_id,
                    payment_type: 'stripe',
                    details: confirmPayment
                }
                Api.create(form).then(resp => {
                    if (resp.data.success) {
                        // close(); 
                        // toast.success('Thanks for payment');

                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
            }
        }
    };

    render() {
        const { error, processing, paymentMethod } = this.state;
        const { stripe } = this.props;

        return (
            <div className="pi-overlay pi-show">
                {/* TODO: fixed reponsive width in mobile */}
                <div className="pi-popup-content" style={{ width: '25%' }}>
                    <div className="pi-modal-header">
                        <h2 className="pi-modal-title pi-text-center">Pay With Stripe</h2>
                        <span className="pi-close" onClick={() => this.props.close()}>×</span>
                    </div>

                    <div className="pi-content">
                        {paymentMethod ? (
                            <div className="Result">
                                <div className="ResultTitle" role="alert">
                                    Payment successful
                                </div>
                                <div className="ResultMessage">
                                    Thanks for trying Stripe payment.
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={this.handleSubmit} className="pi-form-content pi-form-style-two pi-form-style-three">

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-name">Name</label>
                                        <input
                                            id="form-name"
                                            type="text"
                                            required
                                            name="name"
                                            value={this.state.form.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-name">Email</label>
                                        <input
                                            id="form-email"
                                            type="email"
                                            required
                                            name="email"
                                            value={this.state.form.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-name">Phone</label>
                                        <input
                                            id="form-phone"
                                            type="text"
                                            required
                                            name="phone"
                                            value={this.state.form.phone}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <CardElement options={CARD_OPTIONS} onChange={(event) => {
                                            this.setState({
                                                error: event.error,
                                                cardComplete: event.complete,
                                            });
                                        }} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        {error && <ErrorMessage>{error.message}</ErrorMessage>}
                                    </div>
                                </div>

                                <SubmitButton processing={processing} error={error} disabled={!stripe}>
                                    Pay $25
                                </SubmitButton>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
        },
    ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_n5dMNMi4zcaMIcamYh2gMQAo');

class Stripe extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.show && (
                    // <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                    <Elements stripe={stripePromise} >
                        <ElementsConsumer>
                            {({ stripe, elements }) => (
                                <CheckoutForm stripe={stripe} elements={elements} {...this.props} />
                            )}
                        </ElementsConsumer>
                    </Elements>
                )
                }
            </>
        );
    }
}

export default Stripe; 