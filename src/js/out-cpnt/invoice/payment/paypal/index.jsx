import React, { useEffect, useState, Component } from "react";

import api from "api";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import { toast } from "react-toastify";

import "./style.css";

import Api from "api/payment-process";

// This values are the props in the UI

const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ invoice, currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component

  // console.log("Invoice: ", invoice);
  const amount = invoice.total;
  const invoice_id = invoice.id;
  const isSubscribe = invoice.recurring
    ? invoice.recurring.subscription
    : false;

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

      {details
        ? viewDetails(details, i18n)
        : !isSubscribe
          ? viewPayPalBtns(invoice_id, amount, currency, style, setDetails)
          : viewPayPalSubsBtns(invoice_id)}
    </>
  );
};

function viewDetails(details, i18n) {
  return (
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
  );
}

function viewPayPalBtns(invoice_id, amount, currency, style, setDetails) {
  return (
    <PayPalButtons
      style={style}
      disabled={false}
      forceReRender={[amount, currency, style]}
      fundingSource={undefined}
      createOrder={(data, actions) =>
        createOrder(data, actions, currency, amount)
      }
      onApprove={(data, actions) =>
        onOrderApprove(data, actions, invoice_id, setDetails)
      }
    />
  );
}

function viewPayPalSubsBtns(invoice_id) {
  return (
    <PayPalButtons
      createSubscription={(data, actions) =>
        createSubs(data, actions, invoice_id)
      }
      onApprove={(data, actions) => onSubsSuccess(data, actions, invoice_id)}
      style={{
        label: "subscribe",
      }}
    />
  );
}

function createOrder(data, actions, currency, amount) {
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
}

function onOrderApprove(data, actions, invoice_id, setDetails) {
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
        resp.data.data.forEach(function (value) {
          toast.error(value);
        });
      }
    });
  });
}

function createSubs(data, actions, invoice_id) {
  return api
    .get("invoices/" + invoice_id + "/paypal-subscriptions", "", "pro")
    .then((res) => {
      // Plan Id in res.data

      return actions.subscription
        .create({
          plan_id: res.data,
        })
        .then((orderId) => {
          return orderId;
        });
    });
}

function onSubsSuccess(data, actions, invoice_id) {
  api
    .get(
      "invoices/" + invoice_id + "/paypal-subscriptions/" + data.subscriptionID,
      "",
      "pro"
    )
    .then(() => { });
  alert("You have successfully created subscription " + data.subscriptionID);
}

class Paypal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isSubscribe = this.props.invoice.recurring
      ? this.props.invoice.recurring.subscription
      : false;
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
