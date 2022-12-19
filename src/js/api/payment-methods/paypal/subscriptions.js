import api from "api";

const apiBase = "https://api-m.sandbox.paypal.com/";
const accessToken =
  "access_token$sandbox$yyxkrwgb4jx4vtr5$0048b70216864d1419e2d675d8e5ffc9";

// Create New plan
function createPlan() {
  const planData = {
    product_id: "PROD-XXCD1234QWER65782",

    name: "Video Streaming Service Plan",

    description: "Video Streaming Service basic plan",

    status: "ACTIVE",

    billing_cycles: [
      {
        frequency: {
          interval_unit: "MONTH",

          interval_count: 1,
        },

        tenure_type: "TRIAL",

        sequence: 1,

        total_cycles: 2,

        pricing_scheme: {
          fixed_price: {
            value: "3",

            currency_code: "USD",
          },
        },
      },

      {
        frequency: {
          interval_unit: "MONTH",

          interval_count: 1,
        },

        tenure_type: "TRIAL",

        sequence: 2,

        total_cycles: 3,

        pricing_scheme: {
          fixed_price: {
            value: "6",

            currency_code: "USD",
          },
        },
      },

      {
        frequency: {
          interval_unit: "MONTH",

          interval_count: 1,
        },

        tenure_type: "REGULAR",

        sequence: 3,

        total_cycles: 12,

        pricing_scheme: {
          fixed_price: {
            value: "10",

            currency_code: "USD",
          },
        },
      },
    ],

    payment_preferences: {
      auto_bill_outstanding: true,

      setup_fee: {
        value: "10",

        currency_code: "USD",
      },

      setup_fee_failure_action: "CONTINUE",

      payment_failure_threshold: 3,
    },
  };

  fetch(apiBase + "/v1/billing/plans", {
    method: "POST",
    mode: "no-cors",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authentication: "Bearer " + accessToken,
    },
    body: JSON.stringify(planData),
  }).then((resp) => console.log("Create Plan Response", resp));
}

// Activate plan
function activatePlan() {
  return "Hello";
}

// Create subscription
export function createSubs(data, actions) {
  createPlan();
  console.log("from Subscriptions");
  return actions.subscription
    .create({
      plan_id: "P-3RX065706M3469222L5IFM4I",
    })
    .then((orderId) => {
      // Your code here after create the order
      return orderId;
    });
}

// Activate subscription
function activateSubs() {}
