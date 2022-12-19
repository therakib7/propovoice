import React, { useEffect, useState, Component } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

import "./style.css";

import Api from "api/payment-process";
import { createSubs } from "api/payment-methods/paypal/subscriptions";

// This values are the props in the UI

const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ invoice, currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component

  const amount = invoice.total;
  const invoice_id = invoice.id;
  const isSubscribe = true;

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
        ...(isSubscribe && { intent: "subscription" }),
      },
    });
  }, [currency, showSpinner]);

  const i18n = ndpv.i18n;
  return (
    <>
      {showSpinner && isPending && <div className="pv-preloader" />}

      {details ? (
        <div className="Result">
          <div className="ResultTitle" role="alert">
            {i18n.payment} successful
          </div>
          <div className="ResultMessage">
            Thanks for trying paypal payment.
            <div style={{ marginTop: "7px", color: "#000" }}>
              <b>
                {i18n.txn} {i18n.id}:
              </b>{" "}
              {details.id}
            </div>
          </div>
        </div>
      ) : (
        <>
          {!isSubscribe
            ? viewPayPalBtns(amount, currency, style)
            : viewPayPalSubsBtns()}
        </>
      )}
    </>
  );
};

function viewPayPalBtns(amount, currency, style) {
  return (
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
          let form = {
            invoice_id,
            payment_method: "paypal",
            payment_info: {
              id: details.id,
              // amount: details.amount,
              // currency: details.currency,
              billing_address: details.payer,
              created: details.create_time,
            },
          };
          Api.create(form).then((resp) => {
            if (resp.data.success) {
              setDetails(details);
              // close();
              // toast.success('Thanks for payment');
            } else {
              resp.data.data.forEach(function (value, index, array) {
                toast.error(value);
              });
            }
          });
        });
      }}
    />
  );
}

function viewPayPalSubsBtns() {
  return (
    <PayPalButtons
      createSubscription={(data, actions) => createSubs(data, actions)}
      style={{
        label: "subscribe",
      }}
    />
  );
}

class Paypal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isSubscribe = true;
    const client_id = this.props.invoice.payment_methods.paypal.client_id;
    const currency = this.props.invoice.currency;

    const paypalOptions = {
      "client-id": client_id,
      currency: currency,
      ...(isSubscribe && {
        intent: "subscription",
        vault: true,
      }),
    };

    return (
      <>
        {this.props.show && (
          <div className="pv-overlay pv-show">
            <div className="pv-modal-content pv-modal-style-two pv-modal-small">
              <div className="pv-modal-header">
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
                <h2 className="pv-modal-title">
                  {ndpv.i18n.pay} {ndpv.i18n.with} Paypal
                </h2>
              </div>

              <div className="pv-content">
                <div className="pv-form-style-one">
                  <div className="row">
                    <div className="col-lg">
                      <PayPalScriptProvider options={paypalOptions}>
                        <ButtonWrapper
                          invoice={this.props.invoice}
                          currency={currency}
                          showSpinner
                        />
                      </PayPalScriptProvider>
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
export default Paypal;
