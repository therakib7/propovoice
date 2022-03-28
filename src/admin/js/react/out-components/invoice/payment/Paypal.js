import React, { useEffect, Component } from 'react';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';

import './paypal.css';

import Api from 'api/payment-process'; 

// This values are the props in the UI
const amount = "1";
const currency = "USD";
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ invoice_id, close, currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    // const invoice_id = data.invoice.id; 
    useEffect(() => { 
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
        {(showSpinner && isPending) && <div className="spinner loading" />}
        <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        // Your code here after create the order
                        // console.log(orderId)
                        return orderId;
                    });
            }}
            onApprove={function (data, actions) {
                return actions.order.capture().then((details) => {
                    // console.log(details)
                    // const name = details.payer.name.given_name;
                    // console.log(`Transaction completed by ${name}`);
                    let form = { 
                        invoice_id,
                        payment_type: 'paypal',
                        details
                    } 
                    Api.create(form).then(resp => {
                        if (resp.data.success) {
                            close();

                            toast.success('Thanks for payment');

                        } else {
                            resp.data.data.forEach(function (value, index, array) {
                                toast.error(value);
                            });
                        }
                    })
                });
            }}
        />
    </>
    );
} 

class Paypal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.show && (
                    <>
                        <div className="pi-overlay pi-show">
                            {/* TODO: fixed reponsive width in mobile */}
                            <div className="pi-popup-content" style={{ width: '25%' }}>
                                <div className="pi-modal-header">
                                    <h2 className="pi-modal-title pi-text-center">Pay With Paypal</h2>
                                    <span className="pi-close" onClick={() => this.props.close()}>×</span>
                                </div>

                                <div className="pi-content">
                                    <form onSubmit={this.handleSubmit} className="pi-form-content pi-form-style-two pi-form-style-three">

                                        <div className="row">
                                            <div className="col-lg">
                                                <PayPalScriptProvider
                                                    options={{
                                                        "client-id": "AWSCZzuM_fnlSmcoIMVIBVy7Ccb3PgbE_i_9LNFfSwBQIhPURIwvQfsMUb-GHy3Lxy-OQpUFWIn_BymV",
                                                        components: "buttons",
                                                        currency: "USD"
                                                    }}
                                                >
                                                    <ButtonWrapper 
                                                        {...this.props}
                                                        currency={currency}
                                                        showSpinner={true}
                                                    />
                                                </PayPalScriptProvider>
                                            </div>
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
export default Paypal; 