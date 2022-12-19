// Create subscription
export function createSubs(data, actions) {
  return actions.subscription
    .create({
      plan_id: "P-17L85200KS669793XMOQCDIA",
    })
    .then((orderId) => {
      // Your code here after create the order
      return orderId;
    });
}

// Activate subscription
function activateSubs() {}
