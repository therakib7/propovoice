import axios from "axios";
const apiUrl = `${ndpv.apiUrl}ndpv/v1/`;
const apiProUrl = `${ndpv.apiUrl}ndpvp/v1/`;
const apiServerUrl = `${ndpv.apiServerUrl}ncpis/v1/`;
const url = apiUrl + "invoices";
const path = "invoices";
const urlServer = apiServerUrl + path;

const token = {
  headers: {
    "content-type": "application/json",
    "X-WP-NONCE": ndpv.nonce,
  },
};

const makeRequest = ({
  method = `get`,
  urlParts = {},
  formData = {},
  headers = token,
  requestFrom = `free`,
}) => {
  const baseUrl = getBaseUrl(requestFrom);
  const requestToUrl = urlBuilder(baseUrl, urlParts);
  return axios({
    method: method,
    url: requestToUrl,
    data: formData,
    headers,
  });
};

const urlBuilder = (baseUrl, urlParts = {}) => {
  const fullUrl = Object.entries(urlParts).reduce((url, [key, part]) => {
    let newUrl;
    switch (key) {
      case "path":
        newUrl = url + `${part}/`;
        break;
      case "params":
        newUrl = url + `?${part}`;
        break;
      case "fragment":
        newUrl = url + `#${part}`;
        break;
    }

    return newUrl;
  }, baseUrl);
  return fullUrl;
};

const getBaseUrl = (requestFrom) => {
  const urls = {
    free: `${ndpv.apiUrl}ndpv/v1/`,
    pro: `${ndpv.apiUrl}ndpvp/v1/`,
    external: `${ndpv.apiServerUrl}ncpis/v1/`,
  };
  return urls[requestFrom];
};

export default { makeRequest };

export { apiUrl, apiProUrl, apiServerUrl, token };
