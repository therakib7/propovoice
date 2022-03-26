import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';

import Api from 'api/email';

class CheckoutForm extends React.Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        const { stripe, elements } = this.props;

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    };

    render() {
        const { stripe } = this.props;

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
        return (
            <div className="pi-overlay pi-show">
                <div className="pi-popup-content">
                    <div className="pi-modal-header">
                        <h2 className="pi-modal-title pi-text-center">Stripe Payment Info</h2>
                        <span className="pi-close" onClick={() => this.props.close()}>×</span>
                    </div>

                    <div className="pi-content">
                        <form onSubmit={this.handleSubmit} className="pi-form-content pi-form-style-two pi-form-style-three">

                            <div className="row">
                                <div className="col-lg">
                                    {/* <label htmlFor="form-note">
                                        Additional Note
                                    </label>
                                    <textarea
                                        id="form-note"
                                        rows={5}
                                        name="note"
                                        value={this.state.form.note}
                                        onChange={this.handleChange}
                                    /> */}
                                    <CardElement options={CARD_OPTIONS} />
                                </div>
                            </div>

                            <div className="pi-footer-content pi-text-center">
                                <button type="submit" className="pi-btn pi-bg-blue pi-bg-hover-blue" disabled={!stripe}>
                                    Pay
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const stripePromise = loadStripe('pk_test_n5dMNMi4zcaMIcamYh2gMQAo');

class Stripe extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.show && (
                    <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                            {({ stripe, elements }) => (
                                <CheckoutForm stripe={stripe} elements={elements} close={this.props.close} />
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