// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import './stripe.css';

import Api from 'api/payment-process';
import { apiUrl } from 'api/helper'

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
                color: '#fce883',
            },
            '::placeholder': {
                color: '#87BBFD',
            },
        },
        invalid: {
            iconColor: '#FFC7EE',
            color: '#FFC7EE',
        },
    },
};

const CardField = ({ onChange }) => (
    <div className="FormRow">
        <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
);

const Field = ({
    label,
    id,
    type,
    placeholder,
    required,
    autoComplete,
    value,
    onChange,
}) => (
    <div className="FormRow">
        <label htmlFor={id} className="FormRowLabel">
            {label}
        </label>
        <input
            className="FormRowInput"
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
        />
    </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
    <button
        className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? 'Processing...' : children}
    </button>
);

const ErrorMessage = ({ children }) => (
    <div className="ErrorMessage" role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#FFF"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#6772e5"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
);

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            cardComplete: false,
            processing: false,
            paymentMethod: null,
            email: '',
            phone: '',
            name: '',
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { stripe, elements } = this.props;
        const { email, phone, name, error, cardComplete } = this.state;

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

        if (cardComplete) {
            this.setState({ processing: true });
        }

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
                    city: 'Cumilla'
                },
                email,
                phone,
                name,
            },
        });

        if (paymentPayload.error) {
            this.setState({ error: paymentPayload.error });
            return;
        }

        const confirmPayment = await stripe.confirmCardPayment(client_secret, {
            payment_method: paymentPayload.paymentMethod.id
        });

        if (confirmPayment.error) {
            this.setState({ error: confirmPayment.error });
            return;
        }
        //after payment success
        this.setState({ processing: false });
        console.log('success')
        /* 

        if (payload.error) {
            this.setState({ error: payload.error });
        } else {
            this.setState({ paymentMethod: payload.paymentMethod });
        } */
    };

    render() {
        const { error, processing, paymentMethod, name, email, phone } = this.state;
        const { stripe } = this.props;
        return paymentMethod ? (
            <div className="Result">
                <div className="ResultTitle" role="alert">
                    Payment successful
                </div>
                <div className="ResultMessage">
                    Thanks for trying Stripe Elements. No money was charged, but we
                    generated a PaymentMethod: {paymentMethod.id}
                </div>
            </div>
        ) : (
            <form className="Form" onSubmit={this.handleSubmit}>
                <fieldset className="FormGroup">
                    <Field
                        label="Name"
                        id="name"
                        type="text"
                        placeholder="Jane Doe"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(event) => {
                            this.setState({ name: event.target.value });
                        }}
                    />
                    <Field
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="janedoe@gmail.com"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => {
                            this.setState({ email: event.target.value });
                        }}
                    />
                    <Field
                        label="Phone"
                        id="phone"
                        type="tel"
                        placeholder="(941) 555-0123"
                        required
                        autoComplete="tel"
                        value={phone}
                        onChange={(event) => {
                            this.setState({ phone: event.target.value });
                        }}
                    />
                </fieldset>
                <fieldset className="FormGroup">
                    <CardField
                        onChange={(event) => {
                            this.setState({
                                error: event.error,
                                cardComplete: event.complete,
                            });
                        }}
                    />
                </fieldset>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                <SubmitButton processing={processing} error={error} disabled={!stripe}>
                    Pay $25
                </SubmitButton>
            </form>
        );
    }
}

const InjectedCheckoutForm = () => (
    <ElementsConsumer>
        {({ stripe, elements }) => (
            <CheckoutForm stripe={stripe} elements={elements} />
        )}
    </ElementsConsumer>
);

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

const Stripe = () => {
    return (
        <div className="stripe-wrapper">
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                <InjectedCheckoutForm />
            </Elements>
        </div>
    );
};

export default Stripe;