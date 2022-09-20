const apiUrl = `${ndpv.apiUrl}ndpv/v1/`;
const apiProUrl = `${ndpv.apiUrl}ndpvp/v1/`;
const apiServerUrl = `${ndpv.apiServerUrl}ncpis/v1/`;

const token = {
  headers: {
    "content-type": "application/json",
    "X-WP-NONCE": ndpv.nonce,
  },
};

export { apiUrl, apiProUrl, apiServerUrl, token };
