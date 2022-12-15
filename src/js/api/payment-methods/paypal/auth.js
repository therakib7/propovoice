export let token;
fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
  method: "POST",
}).then((res) => {
  console.log(res.access_token);
});
