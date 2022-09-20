"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_js_out-components_invoice_payment_paypal_index_js"],{

/***/ "./node_modules/@paypal/react-paypal-js/dist/esm/react-paypal-js.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@paypal/react-paypal-js/dist/esm/react-paypal-js.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BraintreePayPalButtons": () => (/* binding */ BraintreePayPalButtons),
/* harmony export */   "DISPATCH_ACTION": () => (/* binding */ DISPATCH_ACTION),
/* harmony export */   "FUNDING": () => (/* binding */ FUNDING),
/* harmony export */   "PAYPAL_HOSTED_FIELDS_TYPES": () => (/* binding */ PAYPAL_HOSTED_FIELDS_TYPES),
/* harmony export */   "PayPalButtons": () => (/* binding */ PayPalButtons),
/* harmony export */   "PayPalHostedField": () => (/* binding */ PayPalHostedField),
/* harmony export */   "PayPalHostedFieldsProvider": () => (/* binding */ PayPalHostedFieldsProvider),
/* harmony export */   "PayPalMarks": () => (/* binding */ PayPalMarks),
/* harmony export */   "PayPalMessages": () => (/* binding */ PayPalMessages),
/* harmony export */   "PayPalScriptProvider": () => (/* binding */ PayPalScriptProvider),
/* harmony export */   "SCRIPT_LOADING_STATE": () => (/* binding */ SCRIPT_LOADING_STATE),
/* harmony export */   "ScriptContext": () => (/* binding */ ScriptContext),
/* harmony export */   "destroySDKScript": () => (/* binding */ destroySDKScript),
/* harmony export */   "getScriptID": () => (/* binding */ getScriptID),
/* harmony export */   "scriptReducer": () => (/* binding */ scriptReducer),
/* harmony export */   "usePayPalHostedFields": () => (/* binding */ usePayPalHostedFields),
/* harmony export */   "usePayPalScriptReducer": () => (/* binding */ usePayPalScriptReducer),
/* harmony export */   "useScriptProviderContext": () => (/* binding */ useScriptProviderContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/*!
 * react-paypal-js v7.8.1 (2022-05-27T22:10:01.444Z)
 * Copyright 2020-present, PayPal, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Enum for the SDK script resolve status,
 *
 * @enum {string}
 */

var SCRIPT_LOADING_STATE;

(function (SCRIPT_LOADING_STATE) {
  SCRIPT_LOADING_STATE["INITIAL"] = "initial";
  SCRIPT_LOADING_STATE["PENDING"] = "pending";
  SCRIPT_LOADING_STATE["REJECTED"] = "rejected";
  SCRIPT_LOADING_STATE["RESOLVED"] = "resolved";
})(SCRIPT_LOADING_STATE || (SCRIPT_LOADING_STATE = {}));
/**
 * Enum for the PayPalScriptProvider context dispatch actions
 *
 * @enum {string}
 */


var DISPATCH_ACTION;

(function (DISPATCH_ACTION) {
  DISPATCH_ACTION["LOADING_STATUS"] = "setLoadingStatus";
  DISPATCH_ACTION["RESET_OPTIONS"] = "resetOptions";
  DISPATCH_ACTION["SET_BRAINTREE_INSTANCE"] = "braintreeInstance";
})(DISPATCH_ACTION || (DISPATCH_ACTION = {}));
/**
 * Enum for all the available hosted fields
 *
 * @enum {string}
 */


var PAYPAL_HOSTED_FIELDS_TYPES;

(function (PAYPAL_HOSTED_FIELDS_TYPES) {
  PAYPAL_HOSTED_FIELDS_TYPES["NUMBER"] = "number";
  PAYPAL_HOSTED_FIELDS_TYPES["CVV"] = "cvv";
  PAYPAL_HOSTED_FIELDS_TYPES["EXPIRATION_DATE"] = "expirationDate";
  PAYPAL_HOSTED_FIELDS_TYPES["EXPIRATION_MONTH"] = "expirationMonth";
  PAYPAL_HOSTED_FIELDS_TYPES["EXPIRATION_YEAR"] = "expirationYear";
  PAYPAL_HOSTED_FIELDS_TYPES["POSTAL_CODE"] = "postalCode";
})(PAYPAL_HOSTED_FIELDS_TYPES || (PAYPAL_HOSTED_FIELDS_TYPES = {}));
/*********************************************
 * Common reference to the script identifier *
 *********************************************/


var SCRIPT_ID = "data-react-paypal-script-id";
var SDK_SETTINGS = {
  DATA_CLIENT_TOKEN: "data-client-token",
  DATA_USER_ID_TOKEN: "data-user-id-token",
  DATA_SDK_INTEGRATION_SOURCE: "data-sdk-integration-source",
  DATA_SDK_INTEGRATION_SOURCE_VALUE: "react-paypal-js",
  DATA_NAMESPACE: "data-namespace"
};
var LOAD_SCRIPT_ERROR = "Failed to load the PayPal JS SDK script.";
/****************************
 * Braintree error messages *
 ****************************/

var EMPTY_BRAINTREE_AUTHORIZATION_ERROR_MESSAGE = "Invalid authorization data. Use data-client-token or data-user-id-token to authorize.";
var braintreeVersion = "3.84.0";
var BRAINTREE_SOURCE = "https://js.braintreegateway.com/web/".concat(braintreeVersion, "/js/client.min.js");
var BRAINTREE_PAYPAL_CHECKOUT_SOURCE = "https://js.braintreegateway.com/web/".concat(braintreeVersion, "/js/paypal-checkout.min.js");
/*********************
 * PayPal namespaces *
 *********************/

var DEFAULT_PAYPAL_NAMESPACE = "paypal";
var DEFAULT_BRAINTREE_NAMESPACE = "braintree";
/*****************
 * Hosted Fields *
 *****************/

var HOSTED_FIELDS_CHILDREN_ERROR = "To use HostedFields you must use it with at least 3 children with types: [number, cvv, expirationDate] includes";
var HOSTED_FIELDS_DUPLICATE_CHILDREN_ERROR = "Cannot use duplicate HostedFields as children";
/*******************
 * Script Provider *
 *******************/

var SCRIPT_PROVIDER_REDUCER_ERROR = "usePayPalScriptReducer must be used within a PayPalScriptProvider";

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
/**
 * Get the namespace from the window in the browser
 * this is useful to get the paypal object from window
 * after load PayPal SDK script
 *
 * @param namespace the name space to return
 * @returns the namespace if exists or undefined otherwise
 */


function getPayPalWindowNamespace$1(namespace) {
  if (namespace === void 0) {
    namespace = DEFAULT_PAYPAL_NAMESPACE;
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  return window[namespace];
}
/**
 * Get a namespace from the window in the browser
 * this is useful to get the braintree from window
 * after load Braintree script
 *
 * @param namespace the name space to return
 * @returns the namespace if exists or undefined otherwise
 */


function getBraintreeWindowNamespace(namespace) {
  if (namespace === void 0) {
    namespace = DEFAULT_BRAINTREE_NAMESPACE;
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  return window[namespace];
}
/**
 * Creates a string hash code based on the string argument
 *
 * @param str the source input string to hash
 * @returns string hash code
 */


function hashStr(str) {
  var hash = "";

  for (var i = 0; i < str.length; i++) {
    var total = str[i].charCodeAt(0) * i;

    if (str[i + 1]) {
      total += str[i + 1].charCodeAt(0) * (i - 1);
    }

    hash += String.fromCharCode(97 + Math.abs(total) % 26);
  }

  return hash;
}

function generateErrorMessage(_a) {
  var reactComponentName = _a.reactComponentName,
      sdkComponentKey = _a.sdkComponentKey,
      _b = _a.sdkRequestedComponents,
      sdkRequestedComponents = _b === void 0 ? "" : _b,
      _c = _a.sdkDataNamespace,
      sdkDataNamespace = _c === void 0 ? DEFAULT_PAYPAL_NAMESPACE : _c;
  var requiredOptionCapitalized = sdkComponentKey.charAt(0).toUpperCase().concat(sdkComponentKey.substring(1));
  var errorMessage = "Unable to render <".concat(reactComponentName, " /> because window.").concat(sdkDataNamespace, ".").concat(requiredOptionCapitalized, " is undefined."); // The JS SDK only loads the buttons component by default.
  // All other components like messages and marks must be requested using the "components" query parameter

  if (!sdkRequestedComponents.includes(sdkComponentKey)) {
    var expectedComponents = [sdkRequestedComponents, sdkComponentKey].filter(Boolean).join();
    errorMessage += "\nTo fix the issue, add '".concat(sdkComponentKey, "' to the list of components passed to the parent PayPalScriptProvider:") + "\n`<PayPalScriptProvider options={{ components: '".concat(expectedComponents, "'}}>`.");
  }

  return errorMessage;
}
/**
 * Generate a new random identifier for react-paypal-js
 *
 * @returns the {@code string} containing the random library name
 */


function getScriptID(options) {
  return "react-paypal-js-".concat(hashStr(JSON.stringify(options)));
}
/**
 * Destroy the PayPal SDK from the document page
 *
 * @param reactPayPalScriptID the script identifier
 */


function destroySDKScript(reactPayPalScriptID) {
  var scriptNode = self.document.querySelector("script[".concat(SCRIPT_ID, "=\"").concat(reactPayPalScriptID, "\"]"));

  if (scriptNode === null || scriptNode === void 0 ? void 0 : scriptNode.parentNode) {
    scriptNode.parentNode.removeChild(scriptNode);
  }
}
/**
 * Reducer function to handle complex state changes on the context
 *
 * @param state  the current state on the context object
 * @param action the action to be executed on the previous state
 * @returns a the same state if the action wasn't found, or a new state otherwise
 */


function scriptReducer(state, action) {
  var _a;

  switch (action.type) {
    case DISPATCH_ACTION.LOADING_STATUS:
      return __assign(__assign({}, state), {
        loadingStatus: action.value
      });

    case DISPATCH_ACTION.RESET_OPTIONS:
      // destroy existing script to make sure only one script loads at a time
      destroySDKScript(state.options[SCRIPT_ID]); // exclude the old data-react-paypal-script-id value from the hash generated by getScriptID()

      delete action.value[SCRIPT_ID];
      return __assign(__assign({}, state), {
        loadingStatus: SCRIPT_LOADING_STATE.PENDING,
        options: __assign(__assign({}, action.value), (_a = {}, _a[SCRIPT_ID] = "".concat(getScriptID(action.value)), _a[SDK_SETTINGS.DATA_SDK_INTEGRATION_SOURCE] = SDK_SETTINGS.DATA_SDK_INTEGRATION_SOURCE_VALUE, _a))
      });

    case DISPATCH_ACTION.SET_BRAINTREE_INSTANCE:
      return __assign(__assign({}, state), {
        braintreePayPalCheckoutInstance: action.value
      });

    default:
      {
        return state;
      }
  }
} // Create the React context to use in the script provider component


var ScriptContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
/**
 * Check if the context is valid and ready to dispatch actions.
 *
 * @param scriptContext the result of connecting to the context provider
 * @returns strict context avoiding null values in the type
 */

function validateReducer(scriptContext) {
  if (typeof (scriptContext === null || scriptContext === void 0 ? void 0 : scriptContext.dispatch) === "function" && scriptContext.dispatch.length !== 0) {
    return scriptContext;
  }

  throw new Error(SCRIPT_PROVIDER_REDUCER_ERROR);
}
/**
 * Check if the data-client-token or the data-user-id-token are
 * set in the options of the context.
 * @type data-client-token is use to pass a client token
 * @type data-user-id-token is use to pass a client tokenization key
 *
 * @param scriptContext the result of connecting to the context provider
 * @throws an {@link Error} if both data-client-token and the data-user-id-token keys are null or undefine
 * @returns strict context if one of the keys are defined
 */


var validateBraintreeAuthorizationData = function (scriptContext) {
  var _a, _b;

  if (!((_a = scriptContext === null || scriptContext === void 0 ? void 0 : scriptContext.options) === null || _a === void 0 ? void 0 : _a[SDK_SETTINGS.DATA_CLIENT_TOKEN]) && !((_b = scriptContext === null || scriptContext === void 0 ? void 0 : scriptContext.options) === null || _b === void 0 ? void 0 : _b[SDK_SETTINGS.DATA_USER_ID_TOKEN])) {
    throw new Error(EMPTY_BRAINTREE_AUTHORIZATION_ERROR_MESSAGE);
  }

  return scriptContext;
};
/**
 * Custom hook to get access to the Script context and
 * dispatch actions to modify the state on the {@link ScriptProvider} component
 *
 * @returns a tuple containing the state of the context and
 * a dispatch function to modify the state
 */


function usePayPalScriptReducer() {
  var scriptContext = validateReducer((0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ScriptContext));

  var derivedStatusContext = __assign(__assign({}, scriptContext), {
    isInitial: scriptContext.loadingStatus === SCRIPT_LOADING_STATE.INITIAL,
    isPending: scriptContext.loadingStatus === SCRIPT_LOADING_STATE.PENDING,
    isResolved: scriptContext.loadingStatus === SCRIPT_LOADING_STATE.RESOLVED,
    isRejected: scriptContext.loadingStatus === SCRIPT_LOADING_STATE.REJECTED
  });

  return [derivedStatusContext, scriptContext.dispatch];
}
/**
 * Custom hook to get access to the ScriptProvider context
 *
 * @returns the latest state of the context
 */


function useScriptProviderContext() {
  var scriptContext = validateBraintreeAuthorizationData(validateReducer((0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ScriptContext)));
  return [scriptContext, scriptContext.dispatch];
} // Create the React context to use in the PayPal hosted fields provider


var PayPalHostedFieldsContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
/**
 * Custom hook to get access to the PayPal Hosted Fields instance.
 * The instance represent the returned object after the render process
 * With this object a user can submit the fields and dynamically modify the cards
 *
 * @returns the hosted fields instance if is available in the component
 */

function usePayPalHostedFields() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(PayPalHostedFieldsContext);
}
/**
This `<PayPalButtons />` component supports rendering [buttons](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/#buttons) for PayPal, Venmo, and alternative payment methods.
It relies on the `<PayPalScriptProvider />` parent component for managing state related to loading the JS SDK script.
*/


var PayPalButtons = function (_a) {
  var _b = _a.className,
      className = _b === void 0 ? "" : _b,
      _c = _a.disabled,
      disabled = _c === void 0 ? false : _c,
      children = _a.children,
      _d = _a.forceReRender,
      forceReRender = _d === void 0 ? [] : _d,
      buttonProps = __rest(_a, ["className", "disabled", "children", "forceReRender"]);

  var isDisabledStyle = disabled ? {
    opacity: 0.38
  } : {};
  var classNames = "".concat(className, " ").concat(disabled ? "paypal-buttons-disabled" : "").trim();
  var buttonsContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var buttons = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _e = usePayPalScriptReducer()[0],
      isResolved = _e.isResolved,
      options = _e.options;

  var _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      initActions = _f[0],
      setInitActions = _f[1];

  var _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
      isEligible = _g[0],
      setIsEligible = _g[1];

  var _h = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      setErrorState = _h[1];

  function closeButtonsComponent() {
    if (buttons.current !== null) {
      buttons.current.close().catch(function () {// ignore errors when closing the component
      });
    }
  } // useEffect hook for rendering the buttons


  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // verify the sdk script has successfully loaded
    if (isResolved === false) {
      return closeButtonsComponent;
    }

    var paypalWindowNamespace = getPayPalWindowNamespace$1(options[SDK_SETTINGS.DATA_NAMESPACE]); // verify dependency on window object

    if (paypalWindowNamespace === undefined || paypalWindowNamespace.Buttons === undefined) {
      setErrorState(function () {
        throw new Error(generateErrorMessage({
          reactComponentName: PayPalButtons.displayName,
          sdkComponentKey: "buttons",
          sdkRequestedComponents: options.components,
          sdkDataNamespace: options[SDK_SETTINGS.DATA_NAMESPACE]
        }));
      });
      return closeButtonsComponent;
    }

    var decoratedOnInit = function (data, actions) {
      setInitActions(actions);

      if (typeof buttonProps.onInit === "function") {
        buttonProps.onInit(data, actions);
      }
    };

    try {
      buttons.current = paypalWindowNamespace.Buttons(__assign(__assign({}, buttonProps), {
        onInit: decoratedOnInit
      }));
    } catch (err) {
      return setErrorState(function () {
        throw new Error("Failed to render <PayPalButtons /> component. Failed to initialize:  ".concat(err));
      });
    } // only render the button when eligible


    if (buttons.current.isEligible() === false) {
      setIsEligible(false);
      return closeButtonsComponent;
    }

    if (!buttonsContainerRef.current) {
      return closeButtonsComponent;
    }

    buttons.current.render(buttonsContainerRef.current).catch(function (err) {
      // component failed to render, possibly because it was closed or destroyed.
      if (buttonsContainerRef.current === null || buttonsContainerRef.current.children.length === 0) {
        // paypal buttons container is no longer in the DOM, we can safely ignore the error
        return;
      } // paypal buttons container is still in the DOM


      setErrorState(function () {
        throw new Error("Failed to render <PayPalButtons /> component. ".concat(err));
      });
    });
    return closeButtonsComponent; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, __spreadArray(__spreadArray([isResolved], forceReRender, true), [buttonProps.fundingSource], false)); // useEffect hook for managing disabled state

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (initActions === null) {
      return;
    }

    if (disabled === true) {
      initActions.disable().catch(function () {// ignore errors when disabling the component
      });
    } else {
      initActions.enable().catch(function () {// ignore errors when enabling the component
      });
    }
  }, [disabled, initActions]);
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isEligible ? react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: buttonsContainerRef,
    style: isDisabledStyle,
    className: classNames
  }) : children);
};

PayPalButtons.displayName = "PayPalButtons";

function findScript(url, attributes) {
  var currentScript = document.querySelector("script[src=\"".concat(url, "\"]"));
  if (currentScript === null) return null;
  var nextScript = createScriptElement(url, attributes);
  var currentScriptClone = currentScript.cloneNode();
  delete currentScriptClone.dataset.uidAuto;

  if (Object.keys(currentScriptClone.dataset).length !== Object.keys(nextScript.dataset).length) {
    return null;
  }

  var isExactMatch = true;
  Object.keys(currentScriptClone.dataset).forEach(function (key) {
    if (currentScriptClone.dataset[key] !== nextScript.dataset[key]) {
      isExactMatch = false;
    }
  });
  return isExactMatch ? currentScript : null;
}

function insertScriptElement(_a) {
  var url = _a.url,
      attributes = _a.attributes,
      onSuccess = _a.onSuccess,
      onError = _a.onError;
  var newScript = createScriptElement(url, attributes);
  newScript.onerror = onError;
  newScript.onload = onSuccess;
  document.head.insertBefore(newScript, document.head.firstElementChild);
}

function processOptions(options) {
  var sdkBaseURL = "https://www.paypal.com/sdk/js";

  if (options.sdkBaseURL) {
    sdkBaseURL = options.sdkBaseURL;
    delete options.sdkBaseURL;
  }

  processMerchantID(options);

  var _a = Object.keys(options).filter(function (key) {
    return typeof options[key] !== "undefined" && options[key] !== null && options[key] !== "";
  }).reduce(function (accumulator, key) {
    var value = options[key].toString();

    if (key.substring(0, 5) === "data-") {
      accumulator.dataAttributes[key] = value;
    } else {
      accumulator.queryParams[key] = value;
    }

    return accumulator;
  }, {
    queryParams: {},
    dataAttributes: {}
  }),
      queryParams = _a.queryParams,
      dataAttributes = _a.dataAttributes;

  return {
    url: "".concat(sdkBaseURL, "?").concat(objectToQueryString(queryParams)),
    dataAttributes: dataAttributes
  };
}

function objectToQueryString(params) {
  var queryString = "";
  Object.keys(params).forEach(function (key) {
    if (queryString.length !== 0) queryString += "&";
    queryString += key + "=" + params[key];
  });
  return queryString;
}

function parseErrorMessage(message) {
  var originalErrorText = message.split("/* Original Error:")[1];
  return originalErrorText ? originalErrorText.replace(/\n/g, "").replace("*/", "").trim() : message;
}

function createScriptElement(url, attributes) {
  if (attributes === void 0) {
    attributes = {};
  }

  var newScript = document.createElement("script");
  newScript.src = url;
  Object.keys(attributes).forEach(function (key) {
    newScript.setAttribute(key, attributes[key]);

    if (key === "data-csp-nonce") {
      newScript.setAttribute("nonce", attributes["data-csp-nonce"]);
    }
  });
  return newScript;
}

function processMerchantID(options) {
  var merchantID = options["merchant-id"],
      dataMerchantID = options["data-merchant-id"];
  var newMerchantID = "";
  var newDataMerchantID = "";

  if (Array.isArray(merchantID)) {
    if (merchantID.length > 1) {
      newMerchantID = "*";
      newDataMerchantID = merchantID.toString();
    } else {
      newMerchantID = merchantID.toString();
    }
  } else if (typeof merchantID === "string" && merchantID.length > 0) {
    newMerchantID = merchantID;
  } else if (typeof dataMerchantID === "string" && dataMerchantID.length > 0) {
    newMerchantID = "*";
    newDataMerchantID = dataMerchantID;
  }

  options["merchant-id"] = newMerchantID;
  options["data-merchant-id"] = newDataMerchantID;
  return options;
}

function loadScript(options, PromisePonyfill) {
  if (PromisePonyfill === void 0) {
    PromisePonyfill = getDefaultPromiseImplementation();
  }

  validateArguments(options, PromisePonyfill);
  if (typeof window === "undefined") return PromisePonyfill.resolve(null);

  var _a = processOptions(options),
      url = _a.url,
      dataAttributes = _a.dataAttributes;

  var namespace = dataAttributes["data-namespace"] || "paypal";
  var existingWindowNamespace = getPayPalWindowNamespace(namespace);

  if (findScript(url, dataAttributes) && existingWindowNamespace) {
    return PromisePonyfill.resolve(existingWindowNamespace);
  }

  return loadCustomScript({
    url: url,
    attributes: dataAttributes
  }, PromisePonyfill).then(function () {
    var newWindowNamespace = getPayPalWindowNamespace(namespace);

    if (newWindowNamespace) {
      return newWindowNamespace;
    }

    throw new Error("The window.".concat(namespace, " global variable is not available."));
  });
}

function loadCustomScript(options, PromisePonyfill) {
  if (PromisePonyfill === void 0) {
    PromisePonyfill = getDefaultPromiseImplementation();
  }

  validateArguments(options, PromisePonyfill);
  var url = options.url,
      attributes = options.attributes;

  if (typeof url !== "string" || url.length === 0) {
    throw new Error("Invalid url.");
  }

  if (typeof attributes !== "undefined" && typeof attributes !== "object") {
    throw new Error("Expected attributes to be an object.");
  }

  return new PromisePonyfill(function (resolve, reject) {
    if (typeof window === "undefined") return resolve();
    insertScriptElement({
      url: url,
      attributes: attributes,
      onSuccess: function () {
        return resolve();
      },
      onError: function () {
        var defaultError = new Error("The script \"".concat(url, "\" failed to load."));

        if (!window.fetch) {
          return reject(defaultError);
        }

        return fetch(url).then(function (response) {
          if (response.status === 200) {
            reject(defaultError);
          }

          return response.text();
        }).then(function (message) {
          var parseMessage = parseErrorMessage(message);
          reject(new Error(parseMessage));
        }).catch(function (err) {
          reject(err);
        });
      }
    });
  });
}

function getDefaultPromiseImplementation() {
  if (typeof Promise === "undefined") {
    throw new Error("Promise is undefined. To resolve the issue, use a Promise polyfill.");
  }

  return Promise;
}

function getPayPalWindowNamespace(namespace) {
  return window[namespace];
}

function validateArguments(options, PromisePonyfill) {
  if (typeof options !== "object" || options === null) {
    throw new Error("Expected an options object.");
  }

  if (typeof PromisePonyfill !== "undefined" && typeof PromisePonyfill !== "function") {
    throw new Error("Expected PromisePonyfill to be a function.");
  }
}
/**
 * Simple check to determine if the Braintree is a valid namespace.
 *
 * @param braintreeSource the source {@link BraintreeNamespace}
 * @returns a boolean representing if the namespace is valid.
 */


var isValidBraintreeNamespace = function (braintreeSource) {
  var _a, _b;

  if (typeof ((_a = braintreeSource === null || braintreeSource === void 0 ? void 0 : braintreeSource.client) === null || _a === void 0 ? void 0 : _a.create) !== "function" && typeof ((_b = braintreeSource === null || braintreeSource === void 0 ? void 0 : braintreeSource.paypalCheckout) === null || _b === void 0 ? void 0 : _b.create) !== "function") {
    throw new Error("The braintreeNamespace property is not a valid BraintreeNamespace type.");
  }

  return true;
};
/**
 * Use `actions.braintree` to provide an interface for the paypalCheckoutInstance
 * through the createOrder, createBillingAgreement and onApprove callbacks
 *
 * @param braintreeButtonProps the component button options
 * @returns a new copy of the component button options casted as {@link PayPalButtonsComponentProps}
 */


var decorateActions = function (buttonProps, payPalCheckoutInstance) {
  var createOrderRef = buttonProps.createOrder;
  var createBillingAgreementRef = buttonProps.createBillingAgreement;
  var onApproveRef = buttonProps.onApprove;

  if (typeof createOrderRef === "function") {
    buttonProps.createOrder = function (data, actions) {
      return createOrderRef(data, __assign(__assign({}, actions), {
        braintree: payPalCheckoutInstance
      }));
    };
  }

  if (typeof createBillingAgreementRef === "function") {
    buttonProps.createBillingAgreement = function (data, actions) {
      return createBillingAgreementRef(data, __assign(__assign({}, actions), {
        braintree: payPalCheckoutInstance
      }));
    };
  }

  if (typeof onApproveRef === "function") {
    buttonProps.onApprove = function (data, actions) {
      return onApproveRef(data, __assign(__assign({}, actions), {
        braintree: payPalCheckoutInstance
      }));
    };
  }

  return __assign({}, buttonProps);
};
/**
 * Get the Braintree namespace from the component props.
 * If the prop `braintreeNamespace` is undefined will try to load it from the CDN.
 * This function allows users to set the braintree manually on the `BraintreePayPalButtons` component.
 *
 * Use case can be for example legacy sites using AMD/UMD modules,
 * trying to integrate the `BraintreePayPalButtons` component.
 * If we attempt to load the Braintree from the CDN won't define the braintree namespace.
 * This happens because the braintree script is an UMD module.
 * After detecting the AMD on the global scope will create an anonymous module using `define`
 * and the `BraintreePayPalButtons` won't be able to get access to the `window.braintree` namespace
 * from the global context.
 *
 * @param braintreeSource the source {@link BraintreeNamespace}
 * @returns the {@link BraintreeNamespace}
 */


var getBraintreeNamespace = function (braintreeSource) {
  if (braintreeSource && isValidBraintreeNamespace(braintreeSource)) {
    return Promise.resolve(braintreeSource);
  }

  return Promise.all([loadCustomScript({
    url: BRAINTREE_SOURCE
  }), loadCustomScript({
    url: BRAINTREE_PAYPAL_CHECKOUT_SOURCE
  })]).then(function () {
    return getBraintreeWindowNamespace();
  });
};
/**
This `<BraintreePayPalButtons />` component renders the [Braintree PayPal Buttons](https://developer.paypal.com/braintree/docs/guides/paypal/overview) for Braintree Merchants.
It relies on the `<PayPalScriptProvider />` parent component for managing state related to loading the JS SDK script.

Note: You are able to make your integration using the client token or using the tokenization key.

- To use the client token integration set the key `data-client-token` in the `PayPayScriptProvider` component's options.
- To use the tokenization key integration set the key `data-user-id-token` in the `PayPayScriptProvider` component's options.
*/


var BraintreePayPalButtons = function (_a) {
  var _b = _a.className,
      className = _b === void 0 ? "" : _b,
      _c = _a.disabled,
      disabled = _c === void 0 ? false : _c,
      children = _a.children,
      _d = _a.forceReRender,
      forceReRender = _d === void 0 ? [] : _d,
      braintreeNamespace = _a.braintreeNamespace,
      merchantAccountId = _a.merchantAccountId,
      buttonProps = __rest(_a, ["className", "disabled", "children", "forceReRender", "braintreeNamespace", "merchantAccountId"]);

  var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      setErrorState = _e[1];

  var _f = useScriptProviderContext(),
      providerContext = _f[0],
      dispatch = _f[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    getBraintreeNamespace(braintreeNamespace).then(function (braintree) {
      var clientTokenizationKey = providerContext.options[SDK_SETTINGS.DATA_USER_ID_TOKEN];
      var clientToken = providerContext.options[SDK_SETTINGS.DATA_CLIENT_TOKEN];
      return braintree.client.create({
        authorization: clientTokenizationKey || clientToken
      }).then(function (clientInstance) {
        var merchantProp = merchantAccountId ? {
          merchantAccountId: merchantAccountId
        } : {};
        return braintree.paypalCheckout.create(__assign(__assign({}, merchantProp), {
          client: clientInstance
        }));
      }).then(function (paypalCheckoutInstance) {
        dispatch({
          type: DISPATCH_ACTION.SET_BRAINTREE_INSTANCE,
          value: paypalCheckoutInstance
        });
      });
    }).catch(function (err) {
      setErrorState(function () {
        throw new Error("".concat(LOAD_SCRIPT_ERROR, " ").concat(err));
      });
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerContext.options]);
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, providerContext.braintreePayPalCheckoutInstance && react__WEBPACK_IMPORTED_MODULE_0__.createElement(PayPalButtons, __assign({
    className: className,
    disabled: disabled,
    forceReRender: forceReRender
  }, decorateActions(buttonProps, providerContext.braintreePayPalCheckoutInstance)), children));
};
/**
The `<PayPalMarks />` component is used for conditionally rendering different payment options using radio buttons.
The [Display PayPal Buttons with other Payment Methods guide](https://developer.paypal.com/docs/business/checkout/add-capabilities/buyer-experience/#display-paypal-buttons-with-other-payment-methods) describes this style of integration in detail.
It relies on the `<PayPalScriptProvider />` parent component for managing state related to loading the JS SDK script.

This component can also be configured to use a single funding source similar to the [standalone buttons](https://developer.paypal.com/docs/business/checkout/configure-payments/standalone-buttons/) approach.
A `FUNDING` object is exported by this library which has a key for every available funding source option.
*/


var PayPalMarks = function (_a) {
  var _b = _a.className,
      className = _b === void 0 ? "" : _b,
      children = _a.children,
      markProps = __rest(_a, ["className", "children"]);

  var _c = usePayPalScriptReducer()[0],
      isResolved = _c.isResolved,
      options = _c.options;
  var markContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
      isEligible = _d[0],
      setIsEligible = _d[1];

  var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      setErrorState = _e[1];
  /**
   * Render PayPal Mark into the DOM
   */


  var renderPayPalMark = function (mark) {
    var current = markContainerRef.current; // only render the mark when eligible

    if (!current || !mark.isEligible()) {
      return setIsEligible(false);
    } // Remove any children before render it again


    if (current.firstChild) {
      current.removeChild(current.firstChild);
    }

    mark.render(current).catch(function (err) {
      // component failed to render, possibly because it was closed or destroyed.
      if (current === null || current.children.length === 0) {
        // paypal marks container is no longer in the DOM, we can safely ignore the error
        return;
      } // paypal marks container is still in the DOM


      setErrorState(function () {
        throw new Error("Failed to render <PayPalMarks /> component. ".concat(err));
      });
    });
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // verify the sdk script has successfully loaded
    if (isResolved === false) {
      return;
    }

    var paypalWindowNamespace = getPayPalWindowNamespace$1(options[SDK_SETTINGS.DATA_NAMESPACE]); // verify dependency on window object

    if (paypalWindowNamespace === undefined || paypalWindowNamespace.Marks === undefined) {
      return setErrorState(function () {
        throw new Error(generateErrorMessage({
          reactComponentName: PayPalMarks.displayName,
          sdkComponentKey: "marks",
          sdkRequestedComponents: options.components,
          sdkDataNamespace: options[SDK_SETTINGS.DATA_NAMESPACE]
        }));
      });
    }

    renderPayPalMark(paypalWindowNamespace.Marks(__assign({}, markProps))); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResolved, markProps.fundingSource]);
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isEligible ? react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: markContainerRef,
    className: className
  }) : children);
};

PayPalMarks.displayName = "PayPalMarks";
/**
This `<PayPalMessages />` messages component renders a credit messaging on upstream merchant sites.
It relies on the `<PayPalScriptProvider />` parent component for managing state related to loading the JS SDK script.
*/

var PayPalMessages = function (_a) {
  var _b = _a.className,
      className = _b === void 0 ? "" : _b,
      _c = _a.forceReRender,
      forceReRender = _c === void 0 ? [] : _c,
      messageProps = __rest(_a, ["className", "forceReRender"]);

  var _d = usePayPalScriptReducer()[0],
      isResolved = _d.isResolved,
      options = _d.options;
  var messagesContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var messages = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      setErrorState = _e[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // verify the sdk script has successfully loaded
    if (isResolved === false) {
      return;
    }

    var paypalWindowNamespace = getPayPalWindowNamespace$1(options[SDK_SETTINGS.DATA_NAMESPACE]); // verify dependency on window object

    if (paypalWindowNamespace === undefined || paypalWindowNamespace.Messages === undefined) {
      return setErrorState(function () {
        throw new Error(generateErrorMessage({
          reactComponentName: PayPalMessages.displayName,
          sdkComponentKey: "messages",
          sdkRequestedComponents: options.components,
          sdkDataNamespace: options[SDK_SETTINGS.DATA_NAMESPACE]
        }));
      });
    }

    messages.current = paypalWindowNamespace.Messages(__assign({}, messageProps));
    messages.current.render(messagesContainerRef.current).catch(function (err) {
      // component failed to render, possibly because it was closed or destroyed.
      if (messagesContainerRef.current === null || messagesContainerRef.current.children.length === 0) {
        // paypal messages container is no longer in the DOM, we can safely ignore the error
        return;
      } // paypal messages container is still in the DOM


      setErrorState(function () {
        throw new Error("Failed to render <PayPalMessages /> component. ".concat(err));
      });
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, __spreadArray([isResolved], forceReRender, true));
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: messagesContainerRef,
    className: className
  });
};

PayPalMessages.displayName = "PayPalMessages";
/**
This `<PayPalScriptProvider />` component takes care of loading the JS SDK `<script>`.
It manages state for script loading so children components like `<PayPalButtons />` know when it's safe to use the `window.paypal` global namespace.

Note: You always should use this component as a wrapper for  `PayPalButtons`, `PayPalMarks`, `PayPalMessages` and `BraintreePayPalButtons` components.
 */

var PayPalScriptProvider = function (_a) {
  var _b;

  var _c = _a.options,
      options = _c === void 0 ? {
    "client-id": "test"
  } : _c,
      children = _a.children,
      _d = _a.deferLoading,
      deferLoading = _d === void 0 ? false : _d;

  var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(scriptReducer, {
    options: __assign(__assign({}, options), (_b = {}, _b[SCRIPT_ID] = "".concat(getScriptID(options)), _b[SDK_SETTINGS.DATA_SDK_INTEGRATION_SOURCE] = SDK_SETTINGS.DATA_SDK_INTEGRATION_SOURCE_VALUE, _b)),
    loadingStatus: deferLoading ? SCRIPT_LOADING_STATE.INITIAL : SCRIPT_LOADING_STATE.PENDING
  }),
      state = _e[0],
      dispatch = _e[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (deferLoading === false && state.loadingStatus === SCRIPT_LOADING_STATE.INITIAL) {
      return dispatch({
        type: DISPATCH_ACTION.LOADING_STATUS,
        value: SCRIPT_LOADING_STATE.PENDING
      });
    }

    if (state.loadingStatus !== SCRIPT_LOADING_STATE.PENDING) {
      return;
    }

    var isSubscribed = true;
    loadScript(state.options).then(function () {
      if (isSubscribed) {
        dispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.RESOLVED
        });
      }
    }).catch(function (err) {
      console.error("".concat(LOAD_SCRIPT_ERROR, " ").concat(err));

      if (isSubscribed) {
        dispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.REJECTED
        });
      }
    });
    return function () {
      isSubscribed = false;
    };
  }, [state.options, deferLoading, state.loadingStatus]);
  return react__WEBPACK_IMPORTED_MODULE_0__.createElement(ScriptContext.Provider, {
    value: __assign(__assign({}, state), {
      dispatch: dispatch
    })
  }, children);
};
/**
 * Custom hook to store registered hosted fields children
 * Each `PayPalHostedField` component should be registered on the parent provider
 *
 * @param initialValue the initially registered components
 * @returns at first, an {@link Object} containing the registered hosted fields,
 * and at the second a function handler to register the hosted fields components
 */


var useHostedFieldsRegister = function (initialValue) {
  if (initialValue === void 0) {
    initialValue = {};
  }

  var registeredFields = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initialValue);

  var registerHostedField = function (component) {
    registeredFields.current = __assign(__assign({}, registeredFields.current), component);
  };

  return [registeredFields, registerHostedField];
};
/**
 * Throw an exception if the HostedFields is not found in the paypal namespace
 * Probably cause for this problem is not sending the hosted-fields string
 * as part of the components props in options
 * {@code <PayPalScriptProvider options={{ components: 'hosted-fields'}}>}
 *
 * @param param0 and object containing the components and namespace defined in options
 * @throws {@code Error}
 *
 */


var generateMissingHostedFieldsError = function (_a) {
  var _b = _a.components,
      components = _b === void 0 ? "" : _b,
      _c = SDK_SETTINGS.DATA_NAMESPACE,
      _d = _a[_c],
      dataNamespace = _d === void 0 ? DEFAULT_PAYPAL_NAMESPACE : _d;
  var expectedComponents = components ? "".concat(components, ",hosted-fields") : "hosted-fields";
  var errorMessage = "Unable to render <PayPalHostedFieldsProvider /> because window.".concat(dataNamespace, ".HostedFields is undefined.");

  if (!components.includes("hosted-fields")) {
    errorMessage += "\nTo fix the issue, add 'hosted-fields' to the list of components passed to the parent PayPalScriptProvider: <PayPalScriptProvider options={{ components: '".concat(expectedComponents, "'}}>");
  }

  return errorMessage;
};
/**
 * Validate the expiration date component. Valid combinations are:
 * 1- Only the `expirationDate` field exists.
 * 2- Only the `expirationMonth` and `expirationYear` fields exist. Cannot be used with the `expirationDate` field.
 *
 * @param registerTypes
 * @returns @type {true} when the children are valid
 */


var validateExpirationDate = function (registerTypes) {
  return !registerTypes.includes(PAYPAL_HOSTED_FIELDS_TYPES.EXPIRATION_DATE) && !registerTypes.includes(PAYPAL_HOSTED_FIELDS_TYPES.EXPIRATION_MONTH) && !registerTypes.includes(PAYPAL_HOSTED_FIELDS_TYPES.EXPIRATION_YEAR);
};
/**
 * Check if we find the [number, expiration, cvv] in children
 *
 * @param requiredChildren the list with required children [number, expiration, cvv]
 * @param registerTypes    the list of all the children types pass to the parent
 * @throw an @type {Error} when not find the default children
 */


var hasDefaultChildren = function (registerTypes) {
  if (!registerTypes.includes(PAYPAL_HOSTED_FIELDS_TYPES.NUMBER) || !registerTypes.includes(PAYPAL_HOSTED_FIELDS_TYPES.CVV) || validateExpirationDate(registerTypes)) {
    throw new Error(HOSTED_FIELDS_CHILDREN_ERROR);
  }
};
/**
 * Check if we don't have duplicate children types
 *
 * @param registerTypes the list of all the children types pass to the parent
 * @throw an @type {Error} when duplicate types was found
 */


var noDuplicateChildren = function (registerTypes) {
  if (registerTypes.length !== new Set(registerTypes).size) {
    throw new Error(HOSTED_FIELDS_DUPLICATE_CHILDREN_ERROR);
  }
};
/**
 * Validate the hosted field children in the PayPalHostedFieldsProvider component.
 * These are the rules:
 * 1- We need to find 3 default children for number, expiration, cvv
 * 2- No duplicate children are allowed
 * 3- No invalid combinations of `expirationDate`, `expirationMonth`, and `expirationYear`
 *
 * @param childrenList     the list of children
 * @param requiredChildren the list with required children [number, expiration, cvv]
 */


var validateHostedFieldChildren = function (registeredFields) {
  hasDefaultChildren(registeredFields);
  noDuplicateChildren(registeredFields);
};
/**
This `<PayPalHostedFieldsProvider />` provider component wraps the form field elements and accepts props like `createOrder()`.

This provider component is designed to be used with the `<PayPalHostedField />` component.

Warning: If you don't see anything in the screen probably your client is ineligible.
To handle this problem make sure to use the prop `notEligibleError` and pass a component with a custom message.
Take a look to this link if that is the case: https://developer.paypal.com/docs/checkout/advanced/integrate/
*/


var PayPalHostedFieldsProvider = function (_a) {
  var styles = _a.styles,
      createOrder = _a.createOrder,
      notEligibleError = _a.notEligibleError,
      children = _a.children,
      installments = _a.installments;
  var _b = useScriptProviderContext()[0],
      options = _b.options,
      loadingStatus = _b.loadingStatus;

  var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
      isEligible = _c[0],
      setIsEligible = _c[1];

  var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
      cardFields = _d[0],
      setCardFields = _d[1];

  var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      setErrorState = _e[1];

  var hostedFieldsContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var hostedFields = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  var _f = useHostedFieldsRegister(),
      registeredFields = _f[0],
      registerHostedField = _f[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _a;

    validateHostedFieldChildren(Object.keys(registeredFields.current)); // Only render the hosted fields when script is loaded and hostedFields is eligible

    if (!(loadingStatus === SCRIPT_LOADING_STATE.RESOLVED)) {
      return;
    } // Get the hosted fields from the [window.paypal.HostedFields] SDK


    hostedFields.current = getPayPalWindowNamespace$1(options[SDK_SETTINGS.DATA_NAMESPACE]).HostedFields;

    if (!hostedFields.current) {
      throw new Error(generateMissingHostedFieldsError((_a = {
        components: options.components
      }, _a[SDK_SETTINGS.DATA_NAMESPACE] = options[SDK_SETTINGS.DATA_NAMESPACE], _a)));
    }

    if (!hostedFields.current.isEligible()) {
      return setIsEligible(false);
    } // Clean all the fields before the rerender


    if (cardFields) {
      cardFields.teardown();
    }

    hostedFields.current.render({
      // Call your server to set up the transaction
      createOrder: createOrder,
      fields: registeredFields.current,
      installments: installments,
      styles: styles
    }).then(function (cardFieldsInstance) {
      if (hostedFieldsContainerRef.current) {
        setCardFields(cardFieldsInstance);
      }
    }).catch(function (err) {
      setErrorState(function () {
        throw new Error("Failed to render <PayPalHostedFieldsProvider /> component. ".concat(err));
      });
    });
  }, [loadingStatus, styles]); // eslint-disable-line react-hooks/exhaustive-deps

  return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    ref: hostedFieldsContainerRef
  }, isEligible ? react__WEBPACK_IMPORTED_MODULE_0__.createElement(PayPalHostedFieldsContext.Provider, {
    value: {
      cardFields: cardFields,
      registerHostedField: registerHostedField
    }
  }, children) : notEligibleError);
};
/**
This `<PayPalHostedField />` component renders individual fields for [Hosted Fields](https://developer.paypal.com/docs/business/checkout/advanced-card-payments/integrate#3-add-javascript-sdk-and-card-form) integrations.
It relies on the `<PayPalHostedFieldsProvider />` parent component for managing state related to loading the JS SDK script
and execute some validations before the rendering the fields.

To use the PayPal hosted fields you need to define at least three fields:

- A card number field
- The CVV code from the client card
- The expiration date

You can define the expiration date as a single field similar to the example below,
or you are able to define it in [two separate fields](https://paypal.github.io/react-paypal-js//?path=/docs/paypal-paypalhostedfields--expiration-date). One for the month and second for year.

Note: Take care when using multiple instances of the PayPal Hosted Fields on the same page.
The component will fail to render when any of the selectors return more than one element.
*/


var PayPalHostedField = function (_a) {
  var hostedFieldType = _a.hostedFieldType,
      // eslint-disable-line @typescript-eslint/no-unused-vars
  options = _a.options,
      // eslint-disable-line @typescript-eslint/no-unused-vars
  props = __rest(_a, ["hostedFieldType", "options"]);

  var hostedFieldContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(PayPalHostedFieldsContext);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _a;

    if (!(hostedFieldContext === null || hostedFieldContext === void 0 ? void 0 : hostedFieldContext.registerHostedField)) {
      throw new Error("The HostedField cannot be register in the PayPalHostedFieldsProvider parent component");
    } // Register in the parent provider


    hostedFieldContext.registerHostedField((_a = {}, _a[hostedFieldType] = {
      selector: options.selector,
      placeholder: options.placeholder,
      type: options.type,
      formatInput: options.formatInput,
      maskInput: options.maskInput,
      select: options.select,
      maxlength: options.maxlength,
      minlength: options.minlength,
      prefill: options.prefill,
      rejectUnsupportedCards: options.rejectUnsupportedCards
    }, _a));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", __assign({}, props));
};

var FUNDING$1 = {
  PAYPAL: 'paypal',
  VENMO: 'venmo',
  APPLEPAY: 'applepay',
  ITAU: 'itau',
  CREDIT: 'credit',
  PAYLATER: 'paylater',
  CARD: 'card',
  IDEAL: 'ideal',
  SEPA: 'sepa',
  BANCONTACT: 'bancontact',
  GIROPAY: 'giropay',
  SOFORT: 'sofort',
  EPS: 'eps',
  MYBANK: 'mybank',
  P24: 'p24',
  VERKKOPANKKI: 'verkkopankki',
  PAYU: 'payu',
  BLIK: 'blik',
  TRUSTLY: 'trustly',
  ZIMPLER: 'zimpler',
  MAXIMA: 'maxima',
  OXXO: 'oxxo',
  BOLETO: 'boleto',
  WECHATPAY: 'wechatpay',
  MERCADOPAGO: 'mercadopago',
  MULTIBLANCO: 'multiblanco'
}; // We do not re-export `FUNDING` from the `sdk-constants` module
// directly because it has no type definitions.
//
// See https://github.com/paypal/react-paypal-js/issues/125

var FUNDING = FUNDING$1;



/***/ }),

/***/ "./src/js/api/payment-process.js":
/*!***************************************!*\
  !*** ./src/js/api/payment-process.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/js/api/helper.js");


var url = _helper__WEBPACK_IMPORTED_MODULE_1__.apiUrl + 'payment-process';

var getAll = function getAll() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "/?").concat(args));
};

var create = function create(data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, data, _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getAll: getAll,
  create: create
});

/***/ }),

/***/ "./src/js/out-components/invoice/payment/paypal/index.js":
/*!***************************************************************!*\
  !*** ./src/js/out-components/invoice/payment/paypal/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _paypal_react_paypal_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @paypal/react-paypal-js */ "./node_modules/@paypal/react-paypal-js/dist/esm/react-paypal-js.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style.css */ "./src/js/out-components/invoice/payment/paypal/style.css");
/* harmony import */ var api_payment_process__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! api/payment-process */ "./src/js/api/payment-process.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





 // This values are the props in the UI




var currency = "USD";
var style = {
  "layout": "vertical"
}; // Custom component to wrap the PayPalButtons and handle currency changes

var ButtonWrapper = function ButtonWrapper(_ref) {
  var invoice = _ref.invoice,
      currency = _ref.currency,
      showSpinner = _ref.showSpinner;
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  var amount = invoice.total;
  var invoice_id = invoice.id;

  var _usePayPalScriptReduc = (0,_paypal_react_paypal_js__WEBPACK_IMPORTED_MODULE_8__.usePayPalScriptReducer)(),
      _usePayPalScriptReduc2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_6__["default"])(_usePayPalScriptReduc, 2),
      _usePayPalScriptReduc3 = _usePayPalScriptReduc2[0],
      options = _usePayPalScriptReduc3.options,
      isPending = _usePayPalScriptReduc3.isPending,
      dispatch = _usePayPalScriptReduc2[1];

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(null),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_6__["default"])(_useState, 2),
      details = _useState2[0],
      setDetails = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(function () {
    dispatch({
      type: "resetOptions",
      value: _objectSpread(_objectSpread({}, options), {}, {
        currency: currency
      })
    });
  }, [currency, showSpinner]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
    children: [showSpinner && isPending && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
      className: "pi-preloader"
    }), details ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
      className: "Result",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
        className: "ResultTitle",
        role: "alert",
        children: "Payment successful"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
        className: "ResultMessage",
        children: ["Thanks for trying paypal payment.", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
          style: {
            marginTop: '7px',
            color: '#000'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("b", {
            children: "Transection ID:"
          }), " ", details.id]
        })]
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_paypal_react_paypal_js__WEBPACK_IMPORTED_MODULE_8__.PayPalButtons, {
      style: style,
      disabled: false,
      forceReRender: [amount, currency, style],
      fundingSource: undefined,
      createOrder: function createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: currency,
              value: amount
            }
          }]
        }).then(function (orderId) {
          // Your code here after create the order
          // console.log(orderId)
          return orderId;
        });
      },
      onApprove: function onApprove(data, actions) {
        return actions.order.capture().then(function (details) {
          var form = {
            invoice_id: invoice_id,
            payment_method: 'paypal',
            payment_info: {
              id: details.id,
              // amount: details.amount,
              // currency: details.currency,
              billing_address: details.payer,
              created: details.create_time
            }
          };
          api_payment_process__WEBPACK_IMPORTED_MODULE_11__["default"].create(form).then(function (resp) {
            if (resp.data.success) {
              setDetails(details); // close(); 
              // toast.success('Thanks for payment');
            } else {
              resp.data.data.forEach(function (value, index, array) {
                react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error(value);
              });
            }
          });
        });
      }
    })]
  });
};

var Paypal = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Paypal, _Component);

  var _super = _createSuper(Paypal);

  function Paypal(props) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Paypal);

    return _super.call(this, props);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Paypal, [{
    key: "render",
    value: function render() {
      var _this = this;

      var client_id = this.props.invoice.payment_methods.paypal.client_id;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
        children: this.props.show && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
          className: "pi-overlay pi-show",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
            className: "pi-modal-content pi-modal-style-two pi-modal-small",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
              className: "pi-modal-header",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
                className: "pi-close",
                onClick: function onClick() {
                  return _this.props.close();
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("svg", {
                  width: 25,
                  height: 25,
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("path", {
                    d: "M12.5 3.5L3.5 12.5",
                    stroke: "#718096",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("path", {
                    d: "M12.5 12.5L3.5 3.5",
                    stroke: "#718096",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("h2", {
                className: "pi-modal-title",
                children: "Pay With Paypal"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                className: "pi-form-style-one",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                    className: "col-lg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_paypal_react_paypal_js__WEBPACK_IMPORTED_MODULE_8__.PayPalScriptProvider, {
                      options: {
                        "client-id": client_id,
                        components: "buttons",
                        currency: "USD"
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(ButtonWrapper, {
                        invoice: this.props.invoice,
                        currency: currency,
                        showSpinner: true
                      })
                    })
                  })
                })
              })
            })]
          })
        })
      });
    }
  }]);

  return Paypal;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Paypal);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./src/js/out-components/invoice/payment/paypal/style.css":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./src/js/out-components/invoice/payment/paypal/style.css ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* preloader */\r\n.pi-preloader {\r\n    padding: 50px;\r\n    position: relative;\r\n    text-align: center;\r\n}\r\n\r\n.pi-preloader:before {\r\n    content: \"\";\r\n    height: 40px;\r\n    width: 40px;\r\n    margin: -15px auto auto -15px;\r\n    position: absolute;\r\n    top: 35%;\r\n    left: 50%;\r\n    border-width: 5px;\r\n    border-style: solid;\r\n    border-color: #2180c0 #ccc #ccc;\r\n    border-radius: 100%;\r\n    -webkit-animation: pi-rotation .7s infinite linear;\r\n            animation: pi-rotation .7s infinite linear;\r\n}\r\n\r\n@-webkit-keyframes pi-rotation {\r\n    from {\r\n        transform: rotate(0deg);\r\n    } to {\r\n        transform: rotate(359deg);\r\n    }\r\n}\r\n\r\n@keyframes pi-rotation {\r\n    from {\r\n        transform: rotate(0deg);\r\n    } to {\r\n        transform: rotate(359deg);\r\n    }\r\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/js/out-components/invoice/payment/paypal/style.css":
/*!****************************************************************!*\
  !*** ./src/js/out-components/invoice/payment/paypal/style.css ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./style.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./src/js/out-components/invoice/payment/paypal/style.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);