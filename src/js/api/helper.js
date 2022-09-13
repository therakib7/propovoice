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

/*
 * Make a http request
 * @param {string} method - 'get'/'post'/'put'/delete
 * @param {Object} url - {path : "", param: "", fragment: ""}
 * @param {Object} data - data object
 * @param {Object} headers - http requests header
 * @param {string} from - 'free'/'pro'/'ext'
 * @return {Object} - http response
 *
 */
const req = ({
  method = `get`,
  url = {},
  data = {},
  header = token,
  from = `free`,
}) => {
  const baseUrl = getBaseUrl(from);
  const requestToUrl = urlBuilder(baseUrl, url);
  return axios({
    method: method,
    url: requestToUrl,
    data: data,
    header,
  });
};

const urlBuilder = (baseUrl, urlParts = {}) => {
  const fullUrl = Object.entries(urlParts).reduce((url, [key, part]) => {
    const newUrl =
      key == "path"
        ? url + `${part}/`
        : key == "param"
        ? url + `?${part}`
        : key == "fragment"
        ? url + `#${part}`
        : url;

    return newUrl;
  }, baseUrl);
  return fullUrl;
};

const getBaseUrl = (from) => {
  const urls = {
    free: `${ndpv.apiUrl}ndpv/v1/`,
    pro: `${ndpv.apiUrl}ndpvp/v1/`,
    ext: `${ndpv.apiServerUrl}ncpis/v1/`,
  };
  return urls[from];
};

export default { req };

export { apiUrl, apiProUrl, apiServerUrl, token };
