(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_invoice_single_index_js"],{

/***/ "./node_modules/attr-accept/dist/es/index.js":
/*!***************************************************!*\
  !*** ./node_modules/attr-accept/dist/es/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;

exports["default"] = function (file, acceptedFiles) {
  if (file && acceptedFiles) {
    var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
    var fileName = file.name || '';
    var mimeType = (file.type || '').toLowerCase();
    var baseMimeType = mimeType.replace(/\/.*$/, '');
    return acceptedFilesArray.some(function (type) {
      var validType = type.trim().toLowerCase();

      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType);
      } else if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }

      return mimeType === validType;
    });
  }

  return true;
};

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./src/admin/js/react/api/email.js":
/*!*****************************************!*\
  !*** ./src/admin/js/react/api/email.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/admin/js/react/api/helper.js");


var url = _helper__WEBPACK_IMPORTED_MODULE_1__.apiUrl + 'emails';

var getAll = function getAll() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "/?").concat(args));
};

var get = function get(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "/").concat(id));
};

var create = function create(data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, data, _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var remove = function remove(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("".concat(url, "/").concat(id), _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var findByArg = function findByArg(title) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "?title=").concat(title));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getAll: getAll,
  get: get,
  create: create,
  remove: remove,
  findByArg: findByArg
});

/***/ }),

/***/ "./src/admin/js/react/api/helper.js":
/*!******************************************!*\
  !*** ./src/admin/js/react/api/helper.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apiServerUrl": () => (/* binding */ apiServerUrl),
/* harmony export */   "apiUrl": () => (/* binding */ apiUrl),
/* harmony export */   "token": () => (/* binding */ token)
/* harmony export */ });
var apiUrl = "".concat(ncpi.apiUrl, "ncpi/v1/");
var apiServerUrl = "".concat(ncpi.apiServerUrl, "ncpis/v1/");
var token = {
  headers: {
    'content-type': 'application/json',
    'X-WP-NONCE': ncpi.nonce
  }
};

/***/ }),

/***/ "./src/admin/js/react/api/invoice.js":
/*!*******************************************!*\
  !*** ./src/admin/js/react/api/invoice.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/admin/js/react/api/helper.js");


var url = _helper__WEBPACK_IMPORTED_MODULE_1__.apiUrl + 'invoices';
var urlServer = _helper__WEBPACK_IMPORTED_MODULE_1__.apiServerUrl + 'invoices';

var getAll = function getAll() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "/?").concat(args));
};

var getAllTemplate = function getAllTemplate() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(urlServer, "/?").concat(args));
};

var get = function get(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "/").concat(id));
};

var create = function create(data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, data, _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var update = function update(id, data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().put("".concat(url, "/").concat(id), data, _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var remove = function remove(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("".concat(url, "/").concat(id), _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var findByArg = function findByArg(title) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "?title=").concat(title));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getAll: getAll,
  getAllTemplate: getAllTemplate,
  get: get,
  create: create,
  update: update,
  remove: remove,
  findByArg: findByArg
});

/***/ }),

/***/ "./src/admin/js/react/api/media.js":
/*!*****************************************!*\
  !*** ./src/admin/js/react/api/media.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/admin/js/react/api/helper.js");


var url = _helper__WEBPACK_IMPORTED_MODULE_1__.apiUrl + 'media';

var getAll = function getAll() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "/?").concat(args));
};

var get = function get(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "/").concat(id));
};

var create = function create(data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, data, _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var update = function update(id, data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().put("".concat(url, "/").concat(id), data, _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var remove = function remove(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("".concat(url, "/").concat(id), _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var findByArg = function findByArg(title) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "?title=").concat(title));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getAll: getAll,
  get: get,
  create: create,
  update: update,
  remove: remove,
  findByArg: findByArg
});

/***/ }),

/***/ "./src/admin/js/react/api/setting.js":
/*!*******************************************!*\
  !*** ./src/admin/js/react/api/setting.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/admin/js/react/api/helper.js");


var url = _helper__WEBPACK_IMPORTED_MODULE_1__.apiUrl + 'settings';

var getAll = function getAll() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "/?").concat(args));
};

var get = function get(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "/").concat(id));
};

var create = function create(data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, data, _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var update = function update(id, data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().put("".concat(url, "/").concat(id), data, _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var remove = function remove(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("".concat(url, "/").concat(id), _helper__WEBPACK_IMPORTED_MODULE_1__.token);
};

var findByArg = function findByArg(title) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(url, "?title=").concat(title));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getAll: getAll,
  get: get,
  create: create,
  update: update,
  remove: remove,
  findByArg: findByArg
});

/***/ }),

/***/ "./src/admin/js/react/blocks/field/contact-select/index.js":
/*!*****************************************************************!*\
  !*** ./src/admin/js/react/blocks/field/contact-select/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var block_outside_click__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! block/outside-click */ "./src/admin/js/react/blocks/outside-click/index.js");
/* harmony import */ var hoc_Api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hoc/Api */ "./src/admin/js/react/hoc/Api.js");
/* harmony import */ var components_contact_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/contact/Form */ "./src/admin/js/react/components/contact/Form.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");











var Contact = function Contact(props) {
  var dropdownContent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      listById = _useState4[0],
      setListById = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
      dropdown = _useState6[0],
      setDropdown = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState7, 2),
      modal = _useState8[0],
      setModal = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('new'),
      _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState9, 2),
      modalType = _useState10[0],
      setModalType = _useState10[1];

  var newForm = {
    label: '',
    color: '',
    bg_color: ''
  };

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(newForm),
      _useState12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState11, 2),
      form = _useState12[0],
      setForm = _useState12[1];

  var timeout = 0;
  var close = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    return setDropdown(false);
  }, []);
  (0,block_outside_click__WEBPACK_IMPORTED_MODULE_3__["default"])(dropdownContent, close);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    getData();
  }, []);

  var getData = function getData() {
    var args = {
      page: 1,
      per_page: 10
    };
    var params = new URLSearchParams(args).toString();
    props.getAll('contacts', params).then(function (resp) {
      if (resp.data.success) {
        var toList = resp.data.data.result;
        setList(toList);
      }
    });
  };

  var showDropdown = function showDropdown() {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  var openModal = function openModal(e, type) {
    var tax = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    e.preventDefault();
    setModal(true);

    if (type == 'new') {
      setModalType(type);
      setForm(newForm);
    } else {
      setModalType(type);
      setForm(tax);
    }
  };

  var handleDelete = function handleDelete(id) {
    if (confirm('Are you sure, to delete it?')) {
      //TODO: translation
      var _newForm = {};
      _newForm.taxonomy = props.taxonomy;
      _newForm["delete"] = true;
      _newForm.post_id = parseInt(props.id);
      _newForm.id = parseInt(id);
      props.update('taxonomies', _newForm.id, _newForm).then(function (resp) {
        if (resp.data.success) {
          react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.success('Successfully deleted'); //TODO: translation

          getData();
        } else {
          resp.data.data.forEach(function (value, index, array) {
            react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(value);
          });
        }
      });
    }
  };

  var handleSelect = function handleSelect(data) {
    props.onChange(data);
    setDropdown(false);
  };

  var handleFindContact = function handleFindContact(e) {
    var target = e.target;
    var val = target.value;
    if (val.length < 2) return; //search when typing stop

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function () {
      props.getAll('contacts', 's=' + val).then(function (resp) {
        if (resp.data.success) {
          var toList = resp.data.data.result;
          setList(toList);
        }
      });
    }, 300);
  };

  var handleContactSubmit = function handleContactSubmit(contact) {
    props.onChange(contact);
    setDropdown(false);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
      className: "pi-list",
      onClick: function onClick() {
        return showDropdown();
      },
      children: [!props.data && 'Select Receiver', props.data && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
        children: props.data.type == 'person' ? props.data.first_name : props.data.org_name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("svg", {
        style: {
          marginTop: 6,
          "float": "right"
        },
        width: 12,
        height: 10,
        viewBox: "0 0 10 6",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
          d: "M5.00001 3.78145L8.30001 0.481445L9.24268 1.42411L5.00001 5.66678L0.757342 1.42411L1.70001 0.481445L5.00001 3.78145Z",
          fill: "#718096"
        })
      })]
    }), dropdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "pi-dropdown-content pi-show",
      ref: dropdownContent,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "pi-search-field",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", {
          type: "text",
          onChange: handleFindContact,
          placeholder: "Search"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
        onClick: function onClick(e) {
          openModal(e, 'new');
        },
        children: "+ Add New"
      }), list && list.map(function (item, itemIndex) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
          onClick: function onClick() {
            return handleSelect(item);
          },
          children: item.type == 'person' ? item.first_name : item.org_name
        }, itemIndex);
      })]
    }), modal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(components_contact_Form__WEBPACK_IMPORTED_MODULE_5__["default"], {
      handleSubmit: handleContactSubmit,
      modalType: modalType,
      data: form,
      close: function close() {
        return setModal(false);
      }
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Api__WEBPACK_IMPORTED_MODULE_4__["default"])(Contact));

/***/ }),

/***/ "./src/admin/js/react/blocks/field/contact/index.js":
/*!**********************************************************!*\
  !*** ./src/admin/js/react/blocks/field/contact/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var hoc_Api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! hoc/Api */ "./src/admin/js/react/hoc/Api.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var Contact = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Contact, _Component);

  var _super = _createSuper(Contact);

  function Contact(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Contact);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      if (value.length < 1) {
        _this.setState({
          personModal: false,
          personList: []
        });

        if (name == 'first_name') {
          _this.props.onChange('', 'person');
        } else {
          _this.props.onChange('', 'org');
        }

        return;
      } // this.setState({ form: { ...this.state.form, [name]: value } }, () => {


      if (name == 'first_name') {
        _this.props.onChange(value, 'person');
      } else {
        _this.props.onChange(value, 'org');
      } //search when typing stop


      if (_this.timeout) clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        if (name == 'first_name') {
          _this.props.getAll('persons', 'first_name=' + value).then(function (resp) {
            var persons = resp.data.data.result;

            _this.setState({
              personModal: true,
              personList: persons
            });
          });
        } else {
          _this.props.getAll('organizations', 'name=' + value).then(function (resp) {
            var orgs = resp.data.data.result;

            _this.setState({
              orgModal: true,
              orgList: orgs
            });
          });
        }
      }, 300); // });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSelect", function (e, val, type) {
      e.preventDefault();

      _this.props.onSelect(val, type);

      if (type == 'person') {
        _this.setState({
          personModal: false,
          personList: []
        });
      } else {
        _this.setState({
          orgModal: false,
          orgList: []
        });
      }
    });

    _this.state = {
      personList: [],
      orgList: [],
      personModal: false,
      orgModal: false
    };
    _this.timeout = 0;
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Contact, [{
    key: "componentDidMount",
    value: function componentDidMount() {// console.log(this.props.data);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {// console.log(this.props.data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var person = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "col-lg",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
          htmlFor: "first_name",
          children: "Contact Person"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "pi-field-search",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "pi-action-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
              id: "first_name",
              type: "text",
              name: "first_name",
              autoComplete: "off",
              value: this.props.first_name,
              onChange: this.handleChange
            }), this.state.personModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
              className: "pi-dropdown-content pi-show",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("button", {
                style: {
                  color: '#4c6fff'
                },
                onClick: function onClick(e) {
                  return _this2.handleSelect(e, null, 'person');
                },
                children: ["+ Add '", this.props.first_name, "' as New Contact"]
              }), this.state.personList.map(function (item, i) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("a", {
                  onClick: function onClick(e) {
                    return _this2.handleSelect(e, item, 'person');
                  },
                  children: item.first_name
                }, i);
              })]
            })]
          })
        })]
      });

      var org = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "col-lg",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
          htmlFor: "org_name",
          children: "Contact Organization"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "pi-field-search",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "pi-action-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
              id: "org_name",
              type: "text",
              name: "org_name",
              autoComplete: "off",
              value: this.props.org_name,
              onChange: this.handleChange
            }), this.state.orgModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
              className: "pi-dropdown-content pi-show",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("button", {
                style: {
                  color: '#4c6fff'
                },
                onClick: function onClick(e) {
                  return _this2.handleSelect(e, null, 'org');
                },
                children: ["+ Add '", this.props.org_name, "' as New Organization"]
              }), this.state.orgList.map(function (item, i) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("a", {
                  onClick: function onClick(e) {
                    return _this2.handleSelect(e, item, 'org');
                  },
                  children: item.name
                }, i);
              })]
            })]
          })
        })]
      });

      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "row",
        children: [!this.props.personLast && person, org, this.props.personLast && person]
      });
    }
  }]);

  return Contact;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Api__WEBPACK_IMPORTED_MODULE_8__["default"])(Contact));

/***/ }),

/***/ "./src/admin/js/react/blocks/field/upload/index.js":
/*!*********************************************************!*\
  !*** ./src/admin/js/react/blocks/field/upload/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var context_app_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! context/app-context */ "./src/admin/js/react/context/app-context.js");
/* harmony import */ var api_media__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! api/media */ "./src/admin/js/react/api/media.js");
/* harmony import */ var components_media__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! components/media */ "./src/admin/js/react/components/media/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }










var Upload = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Upload, _Component);

  var _super = _createSuper(Upload);

  function Upload(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Upload);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleDelete", function (id) {
      if (confirm(_this.context.CrudMsg.confirm)) {
        _this.props.changeHandler(null);

        api_media__WEBPACK_IMPORTED_MODULE_10__["default"].remove(id).then(function (resp) {
          if (resp.data.success) {// toast.success(this.context.CrudMsg.delete);
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error(value);
            });
          }
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handlePros", function (data) {
      _this.props.changeHandler(data);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleUploadFile", function (e) {
      e.preventDefault();

      if (_this.props.library) {
        _this.setState({
          media: true
        });
      } else {
        _this.inputRef.current.click();
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onFileChange", function (event) {
      _this.onFileUpload(event.target.files[0]);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onFileUpload", function (file) {
      var formData = new FormData();
      formData.append('file', file);

      if (_this.props.attach_type) {
        formData.append('attach_type', _this.props.attach_type);
      } else {
        formData.append('attach_type', 'ncpi');
      }

      var permission = _this.props.permission !== undefined ? true : false;
      formData.append('permission', permission);
      api_media__WEBPACK_IMPORTED_MODULE_10__["default"].create(formData).then(function (resp) {
        if (resp.data.success) {
          _this.props.changeHandler(resp.data.data);
        } else {
          resp.data.data.forEach(function (value, index, array) {
            react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error(value);
          });
        }
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "render", function () {
      var logo = _this.props.data;
      var label = _this.props.label;
      label = label ? label : 'Upload';
      var btnClass = _this.props.btnClass;
      btnClass = btnClass ? btnClass : '';
      var imgClass = _this.props.imgClass;
      imgClass = imgClass ? imgClass : '';
      var remove = _this.props.remove !== undefined ? false : true;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
        className: 'pi-field-logo-wrap ' + imgClass,
        children: [_this.props.library && _this.state.media && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(components_media__WEBPACK_IMPORTED_MODULE_11__["default"], {
          insertHandler: _this.handlePros,
          show: _this.state.media,
          close: function close() {
            return _this.setState({
              media: false
            });
          }
        }), !logo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("input", {
            type: "file",
            ref: _this.inputRef,
            onChange: _this.onFileChange,
            className: "d-none"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("button", {
            className: 'pi-btn pi-bg-stroke pi-bg-hover-stroke ' + btnClass,
            onClick: function onClick(e) {
              return _this.handleUploadFile(e);
            },
            style: {
              padding: _this.props.padding ? _this.props.padding : '10px 20px',
              border: "1px solid #E2E8F0"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("svg", {
              width: 25,
              height: 25,
              viewBox: "0 0 14 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("path", {
                d: "M3.66824 10.0907C3.01193 10.0915 2.37842 9.85536 1.88909 9.42768C1.39976 9 1.08901 8.41081 1.01638 7.773C0.943746 7.13518 1.11434 6.49358 1.49547 5.97112C1.87661 5.44866 2.44148 5.08208 3.08188 4.94161C2.89659 4.09662 3.06217 3.21426 3.5422 2.48865C4.02223 1.76304 4.77738 1.25361 5.64153 1.07243C6.50568 0.891248 7.40804 1.05316 8.1501 1.52254C8.89217 1.99193 9.41315 2.73034 9.59844 3.57533H9.66507C10.4913 3.57451 11.2883 3.87392 11.9014 4.41541C12.5146 4.9569 12.9001 5.70185 12.9831 6.50564C13.0662 7.30943 12.8408 8.11472 12.3508 8.76517C11.8608 9.41562 11.1411 9.86483 10.3314 10.0256M8.99875 8.13612L6.99981 6.1815M6.99981 6.1815L5.00087 8.13612M6.99981 6.1815V13",
                stroke: "#4C6FFF",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
              children: label
            })]
          })]
        }), logo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
            className: "pi-field-logo",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("img", {
              src: logo.src,
              width: _this.props.small ? '40' : '100'
            }), remove && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
              className: "pi-field-logo-close",
              onClick: function onClick() {
                return _this.handleDelete(logo.id);
              },
              children: "\xD7"
            })]
          })
        })]
      });
    });

    _this.state = {
      media: false,
      edit: false
    };
    _this.inputRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createRef();
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Upload, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      /* if ( ! this.state.edit && this.props.data ) { 
      	this.setState({ edit: true });
      } */
    }
  }]);

  return Upload;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Upload, "contextType", context_app_context__WEBPACK_IMPORTED_MODULE_9__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Upload);

/***/ }),

/***/ "./src/admin/js/react/blocks/outside-click/index.js":
/*!**********************************************************!*\
  !*** ./src/admin/js/react/blocks/outside-click/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
 // Improved version of https://usehooks.com/useOnClickOutside/

var useClickOutside = function useClickOutside(ref, handler) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var startedInside = false;
    var startedWhenMounted = false;

    var listener = function listener(event) {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return; // Do nothing if clicking ref's element or descendent elements

      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    var validateEventStart = function validateEventStart(event) {
      startedWhenMounted = ref.current;
      startedInside = ref.current && ref.current.contains(event.target);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);
    return function () {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useClickOutside);

/***/ }),

/***/ "./src/admin/js/react/blocks/preloader/table/index.js":
/*!************************************************************!*\
  !*** ./src/admin/js/react/blocks/preloader/table/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-content-loader */ "./node_modules/react-content-loader/dist/react-content-loader.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }






var Table = function Table(props) {
  var _props$rows = props.rows,
      rows = _props$rows === void 0 ? 5 : _props$rows;
  var rowHeight = 60;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_content_loader__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread(_objectSpread({
    viewBox: "0 0 1500 ".concat(rowHeight * rows)
  }, props), {}, {
    children: new Array(rows).fill(' ').map(function (el, index) {
      var contentVerticalPosition = function contentVerticalPosition(contentHeight) {
        return rows > 1 ? contentHeight + rowHeight * index : contentHeight;
      };

      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
          x: "20",
          y: "".concat(contentVerticalPosition(20)),
          rx: "4",
          ry: "4",
          width: "40",
          height: "20"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
          x: "100",
          y: "".concat(contentVerticalPosition(20)),
          rx: "10",
          ry: "4",
          width: "600",
          height: "20"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
          x: "750",
          y: "".concat(contentVerticalPosition(20)),
          rx: "10",
          ry: "4",
          width: "600",
          height: "20"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
          x: "1450",
          y: "".concat(contentVerticalPosition(20)),
          rx: "4",
          ry: "4",
          width: "20",
          height: "20"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
          y: "".concat(contentVerticalPosition(59)),
          x: "10",
          ry: "10",
          width: "1500",
          height: "1"
        })]
      }, index);
    })
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ "./src/admin/js/react/blocks/preloader/template/index.js":
/*!***************************************************************!*\
  !*** ./src/admin/js/react/blocks/preloader/template/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-content-loader */ "./node_modules/react-content-loader/dist/react-content-loader.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





var Template = function Template(props) {
  // Get values from props
  // const { rows, columns, coverHeight, coverWidth, padding, speed } = props;
  // Hardcoded values
  var rows = 2;
  var columns = 5;
  var coverHeight = 105;
  var coverWidth = 85;
  var padding = 8;
  var coverHeightWithPadding = coverHeight + padding;
  var coverWidthWithPadding = coverWidth + padding;
  var initial = 0;
  var covers = Array(columns * rows).fill(1);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    style: {
      width: "100%"
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_content_loader__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread(_objectSpread({
      viewBox: "0 0 500 220"
    }, props), {}, {
      children: covers.map(function (g, i) {
        var vy = Math.floor(i / columns) * coverHeightWithPadding + initial;
        var vx = i * coverWidthWithPadding % (columns * coverWidthWithPadding);
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
          x: vx,
          y: vy,
          rx: "0",
          ry: "0",
          width: coverWidth,
          height: coverHeight
        }, i);
      })
    }))
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Template);

/***/ }),

/***/ "./src/admin/js/react/components/business/Form.js":
/*!********************************************************!*\
  !*** ./src/admin/js/react/components/business/Form.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var block_field_upload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! block/field/upload */ "./src/admin/js/react/blocks/field/upload/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var Form = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Form, _Component);

  var _super = _createSuper(Form);

  function Form(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Form);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var target = e.target;
      var name = target.name;
      var value = target.type === 'checkbox' ? target.checked : target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "editData", function () {
      //condition added to stop multiple rendering 
      if (_this.props.modalType == 'edit') {
        if (_this.state.form.id != _this.props.data.id) {
          if (!wage.length) {
            _this.setState({
              form: _this.props.data
            });
          } else {
            var data = _this.props.data;
            data["default"] = true;

            _this.setState({
              form: data
            });
          }
        }
      } else {
        if (_this.state.form.id != null) {
          if (!wage.length) {
            _this.setState({
              form: _this.initialState
            });
          } else {
            var _data = _this.initialState;
            _data["default"] = true;

            _this.setState({
              form: _data
            });
          }
        }
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      var form = _objectSpread({}, _this.state.form);

      if (form.logo) {
        form.logo = form.logo.id;
      }

      _this.props.handleSubmit(form); //this.setState({ form: this.initialState });

    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleLogoChange", function (data) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var form = _objectSpread({}, _this.state.form);

      form.logo = data;

      _this.setState({
        form: form
      });
    });

    _this.initialState = {
      id: null,
      name: '',
      org_name: '',
      web: '',
      email: '',
      mobile: '',
      address: '',
      zip: '',
      "default": true,
      logo: null,
      date: false
    };
    _this.state = {
      form: _this.initialState
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //added this multiple place, because not working in invoice single
      this.editData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.editData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var form = this.state.form;
      var title = '';

      if (this.props.modalType == 'new') {
        title = 'New';
      } else if (this.props.modalType == 'edit') {
        title = 'Edit';
      }

      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "pi-overlay pi-show",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "pi-modal-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "pi-modal-header pi-gradient",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
              className: "pi-close",
              onClick: function onClick() {
                return _this2.props.close();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("svg", {
                width: 25,
                height: 25,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                  d: "M12.5 3.5L3.5 12.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                  d: "M12.5 12.5L3.5 3.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("h2", {
              className: "pi-modal-title",
              children: [title, " Business"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
              children: "Add new business from here"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("form", {
            onSubmit: this.handleSubmit,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col-md",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "field-name",
                      children: "Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "field-name",
                      type: "text",
                      name: "name",
                      value: form.name,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col-md",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "field-web",
                      children: "Website"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "field-web",
                      type: "text",
                      name: "web",
                      value: form.web,
                      onChange: this.handleChange
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col-md",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "field-email",
                      children: "Email"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "field-email",
                      type: "email",
                      required: true,
                      name: "email",
                      value: form.email,
                      onChange: this.handleChange
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col-md",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "field-mobile",
                      children: "Mobile Number"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "field-mobile",
                      type: "text",
                      required: true,
                      name: "mobile",
                      value: form.mobile,
                      onChange: this.handleChange
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col-md",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "field-zip",
                      children: "Zip Code"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "field-zip",
                      type: "number",
                      name: "zip",
                      value: form.zip,
                      onChange: this.handleChange
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "field-address",
                      children: "Address"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "field-address",
                      type: "text",
                      name: "address",
                      placeholder: "Write you full address here",
                      value: form.address,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "field-logo",
                      children: "Logo"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(block_field_upload__WEBPACK_IMPORTED_MODULE_8__["default"], {
                      data: form.logo,
                      changeHandler: this.handleLogoChange
                    })]
                  })
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              className: "pi-modal-footer",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("button", {
                    type: "reset",
                    className: "pi-btn pi-text-hover-blue",
                    children: "Clear"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("button", {
                    type: "submit",
                    className: "pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white",
                    children: "Save"
                  })
                })]
              })
            })]
          })]
        })
      });
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);

/***/ }),

/***/ "./src/admin/js/react/components/contact/Form.js":
/*!*******************************************************!*\
  !*** ./src/admin/js/react/components/contact/Form.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var context_app_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! context/app-context */ "./src/admin/js/react/context/app-context.js");
/* harmony import */ var hoc_Api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! hoc/Api */ "./src/admin/js/react/hoc/Api.js");
/* harmony import */ var block_field_contact__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! block/field/contact */ "./src/admin/js/react/blocks/field/contact/index.js");
/* harmony import */ var react_country_region_selector__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-country-region-selector */ "./node_modules/react-country-region-selector/dist/rcrs.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }










var Form = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Form, _Component);

  var _super = _createSuper(Form);

  function Form(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Form);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "editData", function () {
      //condition added to stop multiple rendering 
      if (_this.props.modalType == 'edit') {
        if (_this.state.form.id != _this.props.data.id) {
          _this.setState({
            form: _this.props.data
          });
        }
      } else {
        if (_this.state.form.id != null) {
          _this.setState({
            form: _this.initialState
          });
        }
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleContactChange", function (val, type) {
      var form = _objectSpread({}, _this.state.form);

      if (type == 'person') {
        form.first_name = val;
      } else {
        form.org_name = val;
      }

      _this.setState({
        form: form
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleContactSelect", function (val, type) {
      var form = _objectSpread({}, _this.state.form);

      if (type == 'person') {
        form.person_id = val ? val.id : null;
        form.email = val ? val.email : '';
        form.mobile = val ? val.mobile : '';
        form.web = val ? val.web : '';
      } else {
        form.org_id = val ? val.id : null;

        if (!form.first_name) {
          form.email = val ? val.email : '';
          form.mobile = val ? val.mobile : '';
          form.web = val ? val.web : '';
        }
      }

      _this.setState({
        form: form
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();
      var contact = _this.state.form;

      if (_this.props.modalType == 'new') {
        _this.props.create('contacts', contact).then(function (resp) {
          if (resp.data.success) {
            _this.props.close();

            react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.success(_this.context.CrudMsg.create);
            contact.id = resp.data.data.id;
            contact.type = resp.data.data.type;

            _this.props.handleSubmit(contact);
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error(value);
            });
          }
        });
      } else {
        _this.props.update('contacts', contact.id, contact).then(function (resp) {
          if (resp.data.success) {
            _this.props.close();

            react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.success(_this.context.CrudMsg.update);

            _this.props.handleSubmit(contact);
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error(value);
            });
          }
        });
      }
    });

    _this.initialState = {
      id: null,
      first_name: '',
      last_name: '',
      org_name: '',
      email: '',
      web: '',
      mobile: '',
      country: '',
      region: '',
      address: '',
      date: false
    };
    _this.state = {
      form: _this.initialState
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //added this multiple place, because not working in invoice single
      this.editData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.editData();
    }
  }, {
    key: "selectCountry",
    value: function selectCountry(val) {
      this.setState({
        form: _objectSpread(_objectSpread({}, this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, 'country', val))
      });
    }
  }, {
    key: "selectRegion",
    value: function selectRegion(val) {
      this.setState({
        form: _objectSpread(_objectSpread({}, this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, 'region', val))
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var form = this.state.form;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
        className: "pi-overlay pi-show",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
          className: "pi-modal-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: "pi-modal-header pi-gradient",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
              className: "pi-close",
              onClick: function onClick() {
                return _this2.props.close();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("svg", {
                width: 25,
                height: 25,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                  d: "M12.5 3.5L3.5 12.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                  d: "M12.5 12.5L3.5 3.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("h2", {
              className: "pi-modal-title",
              children: [this.props.modalType == 'new' ? 'New' : 'Edit', " Contact"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("p", {
              children: "Add new contact from here"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("form", {
            onSubmit: this.handleSubmit,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(block_field_contact__WEBPACK_IMPORTED_MODULE_11__["default"], {
                  first_name: form.first_name,
                  org_name: form.org_name,
                  review: true,
                  onChange: this.handleContactChange,
                  onSelect: this.handleContactSelect
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("label", {
                      htmlFor: "form-email",
                      children: "Email"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("input", {
                      id: "form-email",
                      type: "email",
                      required: true,
                      name: "email",
                      value: form.email,
                      onChange: this.handleChange
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("label", {
                      htmlFor: "form-mobile",
                      children: "Mobile Number"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("input", {
                      id: "form-mobile",
                      type: "text",
                      name: "mobile",
                      value: form.mobile,
                      onChange: this.handleChange
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("label", {
                      htmlFor: "form-web",
                      children: "Website"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("input", {
                      id: "form-web",
                      type: "text",
                      name: "web",
                      value: form.web,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                    className: "col-md-6",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("label", {
                      htmlFor: "form-country",
                      children: "Country"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_country_region_selector__WEBPACK_IMPORTED_MODULE_12__.CountryDropdown, {
                      value: form.country,
                      valueType: "short",
                      onChange: function onChange(val) {
                        return _this2.selectCountry(val);
                      }
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                    className: "col-md-6",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("label", {
                      htmlFor: "form-region",
                      children: "Region"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_country_region_selector__WEBPACK_IMPORTED_MODULE_12__.RegionDropdown, {
                      country: form.country,
                      countryValueType: "short",
                      value: form.region,
                      onChange: function onChange(val) {
                        return _this2.selectRegion(val);
                      }
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                    className: "col",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("label", {
                      htmlFor: "form-address",
                      children: "Address"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("input", {
                      id: "form-address",
                      type: "text",
                      name: "address",
                      value: form.address,
                      onChange: this.handleChange
                    })]
                  })
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
              className: "pi-modal-footer",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("button", {
                    type: "reset",
                    className: "pi-btn pi-text-hover-blue",
                    children: "Clear"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("button", {
                    type: "submit",
                    className: "pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white",
                    children: "Save"
                  })
                })]
              })
            })]
          })]
        })
      });
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Form, "contextType", context_app_context__WEBPACK_IMPORTED_MODULE_9__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Api__WEBPACK_IMPORTED_MODULE_10__["default"])(Form));

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/index.js":
/*!***************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var _style_scoped_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scoped.scss */ "./src/admin/js/react/components/invoice/single/style.scoped.scss");
/* harmony import */ var hoc_Api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hoc/Api */ "./src/admin/js/react/hoc/Api.js");
/* harmony import */ var _tab_invoice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tab/invoice */ "./src/admin/js/react/components/invoice/single/tab/invoice/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }










var InvoiceWrap = function InvoiceWrap(props) {
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useParams)(),
      id = _useParams.id,
      tab = _useParams.tab;

  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation)();
  var path = '';
  var module_id = null;

  var _useSearchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useSearchParams)(),
      _useSearchParams2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useSearchParams, 2),
      searchParams = _useSearchParams2[0],
      setSearchParams = _useSearchParams2[1];

  if (searchParams.get('module_id')) {
    module_id = searchParams.get('module_id');
  }

  if (id === undefined) {
    path = location.pathname == '/invoice/single' ? 'invoice' : 'estimate';
  } else {
    var url_path = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
    path = url_path.includes('invoice') ? 'invoice' : 'estimate';
  }

  var routeChange = function routeChange(id) {
    navigate("/".concat(path, "/single/").concat(id));
  };

  var routeInvoice = function routeInvoice() {
    navigate("/".concat(path));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_tab_invoice__WEBPACK_IMPORTED_MODULE_5__["default"], _objectSpread(_objectSpread({}, props), {}, {
      id: id,
      tab: tab,
      module_id: module_id,
      routeChange: routeChange,
      routeInvoice: routeInvoice,
      path: path,
      key: path
    }))
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Api__WEBPACK_IMPORTED_MODULE_4__["default"])(InvoiceWrap));

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/tab/invoice/FromTo.js":
/*!****************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/invoice/FromTo.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var context_app_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! context/app-context */ "./src/admin/js/react/context/app-context.js");
/* harmony import */ var hoc_Api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! hoc/Api */ "./src/admin/js/react/hoc/Api.js");
/* harmony import */ var block_field_contact_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! block/field/contact-select */ "./src/admin/js/react/blocks/field/contact-select/index.js");
/* harmony import */ var components_business_Form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! components/business/Form */ "./src/admin/js/react/components/business/Form.js");
/* harmony import */ var components_contact_Form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! components/contact/Form */ "./src/admin/js/react/components/contact/Form.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





 //others component







var FromTo = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(FromTo, _Component);

  var _super = _createSuper(FromTo);

  function FromTo(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, FromTo);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleContactSelect", function (val) {
      _this.setState({
        to: val
      });

      _this.props.setTo(val);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleBusinessSubmit", function (business) {
      if (_this.state.businessModalType == 'new') {
        _this.props.create('businesses', business).then(function (resp) {
          if (resp.data.success) {
            _this.setState({
              businessModal: false
            });

            react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.success(_this.context.CrudMsg.create);
            business.id = resp.data.data;

            _this.props.setFrom(business);
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error(value);
            });
          }
        });
      } else {
        _this.props.update('businesses', business.id, business).then(function (resp) {
          if (resp.data.success) {
            _this.setState({
              businessModal: false
            });

            react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.success(_this.context.CrudMsg.update);

            _this.props.setFrom(business);
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error(value);
            });
          }
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleContactSubmit", function (contact) {
      _this.props.setTo(contact);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "render", function () {
      var _this$props = _this.props,
          fromData = _this$props.fromData,
          toData = _this$props.toData;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "pi-from-content pi-border-right pi-mt-25",
        children: [_this.state.businessModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(components_business_Form__WEBPACK_IMPORTED_MODULE_12__["default"], {
          handleSubmit: _this.handleBusinessSubmit,
          modalType: _this.state.businessModalType,
          data: _this.state.businessData,
          close: function close() {
            return _this.setState({
              businessModal: false
            });
          }
        }), _this.state.contactModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(components_contact_Form__WEBPACK_IMPORTED_MODULE_13__["default"], {
          handleSubmit: _this.handleContactSubmit,
          modalType: _this.state.contactModalType,
          data: _this.state.contactData,
          close: function close() {
            return _this.setState({
              contactModal: false
            });
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "pi-from-to",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("label", {
                className: "pi-title-small",
                children: "Sender"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                className: "pi-from pi-bg-white",
                children: fromData ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("h4", {
                    className: "pi-title-small",
                    children: [fromData.name, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("button", {
                        className: "pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow",
                        onClick: function onClick() {
                          return _this.setState({
                            businessData: fromData,
                            businessModal: true,
                            businessModalType: 'edit'
                          });
                        },
                        children: "Edit"
                      })
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("address", {
                    children: [fromData.address && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
                      children: [fromData.address, ".", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("br", {})]
                    }), fromData.email, ",", fromData.mobile && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("br", {}), fromData.mobile]
                    })]
                  })]
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("a", {
                    className: "pi-color-blue pi-text-hover-blue",
                    style: {
                      color: 'blue',
                      padding: '20px',
                      display: 'table',
                      margin: 'auto'
                    },
                    onClick: function onClick() {
                      return _this.setState({
                        businessModal: true,
                        businessModalType: 'new'
                      });
                    },
                    children: "Create New Business"
                  })
                })
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "pi-from-to pi-to",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                className: "pi-from-to-content",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("label", {
                  className: "pi-title-small",
                  children: "Receiver"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                  className: "pi-sendlist pi-action-content",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(block_field_contact_select__WEBPACK_IMPORTED_MODULE_11__["default"], {
                    data: toData,
                    onChange: _this.handleContactSelect
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                className: "pi-from pi-bg-white",
                children: toData ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("h4", {
                    className: "pi-title-small",
                    children: [toData.type == 'person' ? toData.first_name : toData.org_name, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("button", {
                        className: "pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow",
                        onClick: function onClick() {
                          return _this.setState({
                            contactData: toData,
                            contactModal: true,
                            contactModalType: 'edit'
                          });
                        },
                        children: "Edit"
                      })
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("address", {
                    children: [toData.address && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
                      children: [toData.address, ".", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("br", {})]
                    }), toData.email, ",", toData.mobile && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("br", {}), toData.mobile]
                    })]
                  })]
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("a", {
                    className: "pi-color-blue pi-text-hover-blue",
                    style: {
                      color: 'blue',
                      padding: '20px',
                      display: 'table',
                      margin: 'auto'
                    },
                    onClick: function onClick() {
                      return _this.setState({
                        contactModal: true,
                        contactModalTYpe: 'new'
                      });
                    },
                    children: "Add New"
                  })
                })
              })]
            })
          })]
        })]
      });
    });

    _this.state = {
      loaded: false,
      fromList: [],
      from: {
        id: null
      },
      to: {
        id: null
      },
      to_type: 'person',
      //'org'
      businessModal: false,
      businessModalType: 'new',
      businessData: {
        id: null
      },
      contactModal: false,
      contactModalType: 'new',
      contactData: {
        id: null
      }
    };
    _this.timeout = 0;
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(FromTo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      /**
       * for free version default selected without list
       * for pro default delected with list
       * if don't have default selected first one
       */
      var args = {
        page: 1,
        per_page: 1
      };
      var params = new URLSearchParams(args).toString();
      this.props.getAll('businesses', params).then(function (resp) {
        var fromData = resp.data.data.result;

        if (fromData.length) {
          var stateValue = {};

          if (!wage.length) {
            stateValue.fromList = fromData;
          }

          if (!_this2.props.editId) {
            var filteredArray = fromData.filter(function (itm) {
              return itm["default"] == true;
            });

            if (filteredArray.length) {
              stateValue.from = filteredArray[0];

              _this2.props.setFrom(filteredArray[0]);
            } else {
              stateValue.from = fromData[0];

              _this2.props.setFrom(fromData[0]);
            }
          }

          _this2.setState(stateValue);
        }
      });

      if (this.props.editId) {
        var fromData = this.props.fromData;
        var toData = this.props.toData;

        if (fromData && toData) {
          this.setState({
            from: fromData,
            to: toData
          });
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.state.loaded && this.props.editId && this.state.to.id != null) {
        this.setState({
          from: this.props.fromData,
          to: this.props.toData,
          loaded: true
        });
      }
    }
  }]);

  return FromTo;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(FromTo, "contextType", context_app_context__WEBPACK_IMPORTED_MODULE_9__["default"]);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Api__WEBPACK_IMPORTED_MODULE_10__["default"])(FromTo));

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/tab/invoice/Items.js":
/*!***************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/invoice/Items.js ***!
  \***************************************************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\src\\admin\\js\\react\\components\\invoice\\single\\tab\\invoice\\Items.js: Unexpected token (45:1)\n\n\u001b[0m \u001b[90m 43 |\u001b[39m                             \u001b[33m<\u001b[39m\u001b[33mthead\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 44 |\u001b[39m                                 \u001b[33m<\u001b[39m\u001b[33mtr\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 45 |\u001b[39m \u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    |\u001b[39m  \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 46 |\u001b[39m                                     \u001b[33m<\u001b[39m\u001b[33mth\u001b[39m\u001b[33m>\u001b[39m\u001b[33mTitle\u001b[39m \u001b[33m&\u001b[39mamp\u001b[33m;\u001b[39m \u001b[33mDescription\u001b[39m \u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mth\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 47 |\u001b[39m                                     \u001b[33m<\u001b[39m\u001b[33mth\u001b[39m style\u001b[33m=\u001b[39m{{ width\u001b[33m:\u001b[39m \u001b[32m'125px'\u001b[39m }}\u001b[33m>\u001b[39m\u001b[33mQuantity\u001b[39m\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mth\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 48 |\u001b[39m                                     \u001b[33m<\u001b[39m\u001b[33mth\u001b[39m style\u001b[33m=\u001b[39m{{ width\u001b[33m:\u001b[39m \u001b[32m'85px'\u001b[39m }}\u001b[33m>\u001b[39m\u001b[33mRate\u001b[39m (\u001b[33mUSD\u001b[39m)\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mth\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n    at instantiate (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:72:32)\n    at constructor (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:358:12)\n    at Object.raise (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:3341:19)\n    at Object.unexpected (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:3379:16)\n    at Object.jsxParseIdentifier (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7785:12)\n    at Object.jsxParseNamespacedName (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7795:23)\n    at Object.jsxParseElementName (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7806:21)\n    at Object.jsxParseOpeningElementAt (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7905:22)\n    at Object.jsxParseElementAt (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7937:33)\n    at Object.jsxParseElementAt (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7953:32)");

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/tab/invoice/PaymentInfo.js":
/*!*********************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/invoice/PaymentInfo.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var PaymentInfo = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(PaymentInfo, _Component);

  var _super = _createSuper(PaymentInfo);

  function PaymentInfo(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, PaymentInfo);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "render", function () {
      var bank_info = _this.props.data;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: bank_info ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h4", {
            className: "pi-title-small",
            children: "Payment Info:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("address", {
            className: "pi-mb-15",
            dangerouslySetInnerHTML: {
              __html: bank_info.name + '<br />' + bank_info.details.replaceAll('\n', '<br />')
            }
          })]
        }) : ''
      });
    });

    return _this;
  }

  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(PaymentInfo);
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentInfo);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/tab/invoice/Total.js":
/*!***************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/invoice/Total.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var Total = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Total, _Component);

  var _super = _createSuper(Total);

  function Total() {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Total);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "render", function () {
      var _this$props = _this.props,
          currencyFormatter = _this$props.currencyFormatter,
          itemsTotal = _this$props.itemsTotal,
          extra_field = _this$props.extra_field,
          changeHandler = _this$props.changeHandler,
          focusHandler = _this$props.focusHandler,
          grandTotal = _this$props.grandTotal;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "pi-calculation",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("table", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tbody", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                children: "SubTotal"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                children: currencyFormatter(itemsTotal())
              })]
            }), extra_field.map(function (item, i) {
              var item_total = itemsTotal();
              var total = item_total;

              if (item.val_type == 'percent') {
                total = item_total * (item.val / 100);
              } else {
                total = parseFloat(item.val);
              }

              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("td", {
                  children: [item.name, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                    name: "extra-item-" + i,
                    type: "number",
                    step: "1",
                    min: "0.00",
                    value: item.val,
                    onChange: function onChange(e) {
                      return changeHandler(e, item);
                    },
                    onFocus: focusHandler
                  }), item.val_type == 'percent' ? '%' : '$']
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                  children: currencyFormatter(total)
                })]
              }, i);
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                children: "Total"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                children: currencyFormatter(grandTotal())
              })]
            })]
          })
        })
      });
    });

    return _this;
  }

  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(Total);
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Total);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/tab/invoice/index.js":
/*!***************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/invoice/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var api_invoice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! api/invoice */ "./src/admin/js/react/api/invoice.js");
/* harmony import */ var block_preloader_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! block/preloader/spinner */ "./src/admin/js/react/blocks/preloader/spinner/index.js");
/* harmony import */ var _FromTo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./FromTo */ "./src/admin/js/react/components/invoice/single/tab/invoice/FromTo.js");
/* harmony import */ var _Items__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Items */ "./src/admin/js/react/components/invoice/single/tab/invoice/Items.js");
/* harmony import */ var _Items__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_Items__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _PaymentInfo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PaymentInfo */ "./src/admin/js/react/components/invoice/single/tab/invoice/PaymentInfo.js");
/* harmony import */ var _Total__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Total */ "./src/admin/js/react/components/invoice/single/tab/invoice/Total.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../template */ "./src/admin/js/react/components/invoice/single/tab/template/index.js");
/* harmony import */ var _preview__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../preview */ "./src/admin/js/react/components/invoice/single/tab/preview/index.js");
/* harmony import */ var block_field_upload__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! block/field/upload */ "./src/admin/js/react/blocks/field/upload/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





 //self component





var Section = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_invoice_single_tab_invoice_Section_js").then(__webpack_require__.bind(__webpack_require__, /*! ./Section */ "./src/admin/js/react/components/invoice/single/tab/invoice/Section.js"));
});

 // import Attach from './Attach'; 

var DateField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_blocks_date-picker_index_js-_3fac1").then(__webpack_require__.bind(__webpack_require__, /*! block/date-picker */ "./src/admin/js/react/blocks/date-picker/index.js"));
});
 //sidebar section




var InvTemplate = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! inv-template */ "./src/admin/js/react/inv-template/index.js"));
});
var Style = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_invoice_single_tab_invoice_sidebar_Style_js").then(__webpack_require__.bind(__webpack_require__, /*! ./sidebar/Style */ "./src/admin/js/react/components/invoice/single/tab/invoice/sidebar/Style.js"));
});
var Payment = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_invoice_single_tab_invoice_sidebar_Payment_js").then(__webpack_require__.bind(__webpack_require__, /*! ./sidebar/Payment */ "./src/admin/js/react/components/invoice/single/tab/invoice/sidebar/Payment.js"));
});
var AdditionalAmount = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_invoice_single_tab_invoice_sidebar_AdditionalAmount_js").then(__webpack_require__.bind(__webpack_require__, /*! ./sidebar/AdditionalAmount */ "./src/admin/js/react/components/invoice/single/tab/invoice/sidebar/AdditionalAmount.js"));
});
var Reminder = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_invoice_single_tab_invoice_sidebar_Reminder_js").then(__webpack_require__.bind(__webpack_require__, /*! ./sidebar/Reminder */ "./src/admin/js/react/components/invoice/single/tab/invoice/sidebar/Reminder.js"));
});
var Recurring = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_invoice_single_tab_invoice_sidebar_Recurring_js").then(__webpack_require__.bind(__webpack_require__, /*! ./sidebar/Recurring */ "./src/admin/js/react/components/invoice/single/tab/invoice/sidebar/Recurring.js"));
});

var Invoice = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Invoice, _Component);

  var _super = _createSuper(Invoice);

  function Invoice(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Invoice);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "locale", 'en-US');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "currency", 'USD');

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "isPreviewLoaded", function () {
      // let sidebarRef = this.sidebarRef.current; 
      //TODO: ref not working
      var sidebarRef = document.getElementById('pi-right-sidebar');

      if (sidebarRef) {
        var scale = Math.min(sidebarRef.clientWidth / 796, sidebarRef.clientHeight / 1122);

        _this.setState({
          previewScale: scale
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "changeCurrency", function () {});

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "bgColor", function () {
      if (_this.state.currentTab == 'info' || _this.state.currentTab == 'preview') {
        document.body.style.backgroundColor = "#f1f1f7";
      } else {
        document.body.style.backgroundColor = "#fff";
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "updateEdit", function () {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var msg = _objectSpread({}, _this.state.msg);

      msg.saveTxt = 'Update';

      if (data) {
        var invoice = _objectSpread({}, _this.state.invoice);

        invoice.id = data.id;
        invoice.token = data.token;

        _this.setState({
          msg: msg,
          invoice: invoice
        });
      } else {
        _this.setState({
          msg: msg
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "getData", function () {
      api_invoice__WEBPACK_IMPORTED_MODULE_9__["default"].get(_this.props.id).then(function (resp) {
        var invoice = resp.data.data.invoice;
        invoice.id = parseInt(resp.data.data.id);
        invoice.token = resp.data.data.token;
        invoice.date = new Date(resp.data.data.invoice.date);
        invoice.due_date = new Date(resp.data.data.invoice.due_date);
        var payment_methods = resp.data.data.invoice.payment_methods; //it's because wordpress empty object covnert to array

        if (Array.isArray(payment_methods) && !payment_methods.length) {
          invoice.payment_methods = {};
        }

        _this.setState({
          invoice: invoice,
          status: resp.data.data.status,
          fromData: resp.data.data.fromData,
          toData: resp.data.data.toData,
          paymentBankData: resp.data.data.paymentBankData
        });
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onDateChange", function (date) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var invoice = _objectSpread({}, _this.state.invoice);

      if (type == 'date') {
        invoice.date = date;
      } else {
        invoice.due_date = date;
      }

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSetFrom", function (data) {
      var invoice = _objectSpread({}, _this.state.invoice);

      invoice.from = data.id;

      _this.setState({
        fromData: data,
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSetTo", function (data) {
      var invoice = _objectSpread({}, _this.state.invoice);

      invoice.to = data.id;
      invoice.to_type = data.type;

      _this.setState({
        toData: data,
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleTemplateChange", function (data) {
      var click = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var invoice = _objectSpread({}, _this.state.invoice);

      invoice.template = data.id;

      if (click) {
        _this.setState({
          currentTab: 'info',
          currentTabIndex: 1,
          invoice: invoice
        });
      } else {
        _this.setState({
          invoice: invoice
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSectionChange", function (data) {
      var invoice = _objectSpread({}, _this.state.invoice);

      invoice.sections = data;

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSignChange", function (data) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var invoice = _objectSpread({}, _this.state.invoice);

      invoice.sign = data;

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleAttachChange", function (data) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var invoice = _objectSpread({}, _this.state.invoice);

      if (type == 'delete') {
        var index = invoice.attach.findIndex(function (o) {
          return o.id === data;
        });
        if (index !== -1) invoice.attach.splice(index, 1);
      } else {
        invoice.attach.push(data);
      }

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "itemTaxChange", function (e) {
      var invoice = _objectSpread({}, _this.state.invoice);

      var target = e.target;
      var name = target.name;
      var value = target.type == 'checkbox' ? target.checked : target.value;
      invoice[name] = value;

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleTotalChange", function (e, item) {
      var value = e.target.value;

      var invoice = _objectSpread({}, _this.state.invoice);

      var index = invoice.extra_field.findIndex(function (x) {
        return x.id == item.id;
      });
      invoice.extra_field[index].val = value;

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleLineItemChange", function (elementIndex) {
      return function (e) {
        var invoice = _objectSpread({}, _this.state.invoice);

        var items = _this.state.invoice.items.map(function (item, i) {
          if (elementIndex !== i) return item;
          return _objectSpread(_objectSpread({}, item), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, e.target.name, e.target.value));
        });

        invoice.items = items;

        _this.setState({
          invoice: invoice
        });
      };
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleAddLineItem", function (e) {
      var invoice = _objectSpread({}, _this.state.invoice);

      invoice.items = invoice.items.concat([{
        id: Date.now().toString(),
        title: '',
        desc: '',
        qty: 0,
        qty_type: 'unit',
        price: 0,
        tax: 0,
        tax_type: 'fixed'
      }]);

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleRemoveLineItem", function (elementIndex) {
      return function (e) {
        var invoice = _objectSpread({}, _this.state.invoice);

        invoice.items = invoice.items.filter(function (item, i) {
          return elementIndex !== i;
        });

        _this.setState({
          invoice: invoice
        });
      };
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleReorderItems", function (newItems) {
      var invoice = _objectSpread({}, _this.state.invoice);

      invoice.items = newItems;

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleFocusSelect", function (e) {
      e.target.select();
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSave", function () {
      var editId = _this.props.id;

      if (!editId) {
        var path = _this.props.path == 'invoice' ? 'invoice' : 'estimate';

        var invoice = _objectSpread({}, _this.state.invoice);

        invoice.path = path;
        api_invoice__WEBPACK_IMPORTED_MODULE_9__["default"].create(invoice).then(function (resp) {
          if (resp.data.success) {
            _this.updateEdit(resp.data.data);

            _this.props.routeChange(resp.data.data.id);

            react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.success(_this.state.msg.create, {
              position: react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.POSITION.BOTTOM_RIGHT
            });

            _this.continueTab('info');
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error(value);
            });
          }
        });
      } else {
        api_invoice__WEBPACK_IMPORTED_MODULE_9__["default"].update(editId, _this.state.invoice).then(function (resp) {
          if (resp.data.success) {
            react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.success(_this.state.msg.update, {
              position: react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.POSITION.BOTTOM_RIGHT
            });

            _this.continueTab('info');
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error(value);
            });
          }
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "formatCurrency", function (amount) {
      return new Intl.NumberFormat(_this.locale, {
        style: 'currency',
        currency: _this.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "calcItemsTotal", function () {
      return _this.state.invoice.items.reduce(function (prev, cur) {
        var tax_total = 0;

        if (_this.state.item_tax && cur.tax) {
          if (cur.tax_type == 'percent') {
            tax_total += cur.price * (cur.tax / 100);
          } else {
            tax_total += parseFloat(cur.tax);
          }
        }

        return prev + cur.qty * cur.price + tax_total;
      }, 0);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "calcGrandTotal", function () {
      var item_total = _this.calcItemsTotal();

      var total = item_total;
      var extra_field = _this.state.invoice.extra_field;
      extra_field.map(function (item, i) {
        if (item.val_type == 'percent') {
          if (item.type == 'tax' || item.type == 'fee') {
            total += item_total * (item.val / 100);
          } else {
            total -= item_total * (item.val / 100);
          }
        } else {
          if (item.type == 'tax' || item.type == 'fee') {
            total += parseFloat(item.val);
          } else {
            total -= parseFloat(item.val);
          }
        }
      });
      return total;
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "backTab", function () {
      var tab = _this.state.currentTab;

      if (tab == 'info') {
        tab = 'template';
      } else if (tab == 'preview') {
        tab = 'info';
      }

      _this.setState({
        currentTab: tab
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "editTab", function () {
      _this.setState({
        currentTab: 'info',
        currentTabIndex: 1
      });

      window.scrollTo(0, 0);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "continueTab", function (param) {
      var tab = _this.state.currentTab;
      var tabIndex = 0;

      if (param == 'template') {
        tab = 'info';
        tabIndex = 1;
      } else if (param == 'info') {
        tab = 'preview';
        tabIndex = 2;
      }

      _this.setState({
        currentTab: tab,
        currentTabIndex: tabIndex
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onStyleChange", function (data) {
      var invoice = _objectSpread({}, _this.state.invoice);

      invoice.style = data;

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onPaymentChange", function (data, type) {
      var invoice = _objectSpread({}, _this.state.invoice);

      if (type == 'method') {
        if (invoice.payment_methods.hasOwnProperty(data)) {
          // if payment method exist 
          delete invoice.payment_methods[data];

          if (data == 'bank') {
            _this.setState({
              invoice: invoice,
              paymentBankData: null
            });
          } else {
            _this.setState({
              invoice: invoice
            });
          }
        } else {
          invoice.payment_methods[data] = null;

          _this.setState({
            invoice: invoice
          });
        }
      } else {
        //type id		
        invoice.payment_methods[data.type] = data.id;

        if (data.type == 'bank') {
          _this.setState({
            invoice: invoice,
            paymentBankData: data
          });
        } else {
          _this.setState({
            invoice: invoice
          });
        }
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onExtraFieldChange", function (i, item, type, type_val) {
      var invoice = _objectSpread({}, _this.state.invoice);

      var index = invoice.extra_field.findIndex(function (x) {
        return x.id == item.id;
      });

      if (type == 'field') {
        if (index != -1) {
          // if payment method exist  
          invoice.extra_field.splice(index, 1);
        } else {
          var data = {
            id: item.id,
            name: item.label,
            type: item.extra_amount_type,
            val: 0,
            val_type: item.val_type
          };
          invoice.extra_field.splice(i, 0, data);
        }

        _this.setState({
          invoice: invoice
        });
      } else {
        //type		 
        invoice.extra_field[index].val_type = type_val;

        _this.setState({
          invoice: invoice
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onReminderDefault", function (data) {
      var invoice = _objectSpread({}, _this.state.invoice);

      invoice.reminder = data;

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onReminderChange", function (e, type) {
      var invoice = _objectSpread({}, _this.state.invoice);

      var target = e.target;
      var name = target.name;
      var value = name === 'status' || name === 'due_date' ? target.checked : target.value;

      if (type) {
        //before, after
        var arr = invoice.reminder[type];

        if (target.checked) {
          arr.push(parseInt(value));
        } else {
          arr.splice(arr.indexOf(parseInt(value)), 1);
        }
      } else {
        invoice.reminder[name] = value;
      }
      /* if ( name === 'status' && value ) {
      	this.setSidebarActive('reminder')
      	this.setState({ invoice, showReminder: false })
      } */


      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onRecurringChange", function (e) {
      var invoice = _objectSpread({}, _this.state.invoice);

      var target = e.target;
      var name = target.name;
      var value = target.type == 'checkbox' ? target.checked : target.value;
      invoice.recurring[name] = value;

      _this.setState({
        invoice: invoice
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "render", function () {
      var _this$state = _this.state,
          title = _this$state.title,
          _this$state$tabs = _this$state.tabs,
          tabs = _this$state$tabs === void 0 ? [] : _this$state$tabs,
          currentTab = _this$state.currentTab,
          currentTabIndex = _this$state.currentTabIndex,
          sidebarActive = _this$state.sidebarActive,
          invoice = _this$state.invoice;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
            className: "row",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              className: "col-6 col-md-4",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("nav", {
                className: "pi-breadcrumb",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("ul", {
                  className: "",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("li", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("a", {
                      href: "#",
                      className: "",
                      children: "Home"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("li", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("svg", {
                      width: 5,
                      height: 10,
                      viewBox: "0 0 5 10",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("path", {
                        d: "M0.5 1.25L4.25 5L0.5 8.75",
                        stroke: "#718096",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      })
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("li", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_19__.NavLink, {
                      to: '/' + _this.props.path,
                      children: title
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("li", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("svg", {
                      width: 5,
                      height: 10,
                      viewBox: "0 0 5 10",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("path", {
                        d: "M0.5 1.25L4.25 5L0.5 8.75",
                        stroke: "#718096",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      })
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("li", {
                    className: "pi-active",
                    children: [currentTab == 'template' && 'Select Template', currentTab == 'info' && 'Add Content', currentTab == 'preview' && 'Preview & Share']
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              className: "col-6 col-md-8",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                className: "pi-invoice-single-btn pi-text-right",
                children: [currentTab == 'template' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("button", {
                  className: "pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-mt-20",
                  onClick: function onClick() {
                    return _this.continueTab('template');
                  },
                  children: ["Continue", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("svg", {
                    className: "pi-mr-0 pi-ml-10 pi-mt-1",
                    width: 9,
                    height: 11,
                    viewBox: "0 0 6 9",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("path", {
                      d: "M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z",
                      fill: "white"
                    })
                  })]
                }), currentTab == 'info' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("button", {
                  className: "pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-mt-20",
                  onClick: _this.handleSave,
                  children: [_this.state.msg.saveTxt, " & Continue", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("svg", {
                    className: "pi-mr-0 pi-ml-10 pi-mt-1",
                    width: 9,
                    height: 11,
                    viewBox: "0 0 6 9",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("path", {
                      d: "M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z",
                      fill: "white"
                    })
                  })]
                }), currentTab == 'preview' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("button", {
                    className: "pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-mt-20",
                    onClick: function onClick() {
                      return _this.setState({
                        emailModal: true
                      });
                    },
                    children: ["Send Email", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("svg", {
                      className: "pi-mr-0 pi-ml-10 pi-mt-1",
                      width: 9,
                      height: 11,
                      viewBox: "0 0 6 9",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("path", {
                        d: "M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z",
                        fill: "white"
                      })
                    })]
                  })
                })]
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
            className: "pi-single-tab-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              className: "pi-single-tabs pi-text-center",
              children: tabs.map(function (tab, index) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("button", {
                  className: "pi-tab-item tablink " + (index <= currentTabIndex ? 'pi-active' : ''),
                  onClick: function onClick(e) {
                    return _this.setActiveTab(e, tab.id, index);
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
                    className: "pi-single-tab-done",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("svg", {
                      width: 12,
                      height: 11,
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "3.4 5.6 17.6 13.4",
                      xmlSpace: "preserve",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("path", {
                        d: "M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                      })
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {}), tab.text, index < 2 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("svg", {
                    width: 95,
                    height: 10,
                    className: "pi-arrow",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("path", {
                      d: "M89.5 1l4 4m0 0l-4 4m4-4H1",
                      stroke: index < currentTabIndex ? '#4c6fff' : '#E2E8F0',
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })
                  })]
                }, index);
              })
            }), currentTab == 'template' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_template__WEBPACK_IMPORTED_MODULE_15__["default"], {
              currentTemplate: invoice.template,
              changeHandler: _this.handleTemplateChange
            }), currentTab == 'info' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              id: "pi-tab-info",
              className: "pi-invoice-tab-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                  className: "col-lg-9",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("h2", {
                    className: "pi-page-title",
                    children: "Add Content"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                    className: "pi-info-content pi-bg-white",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                      className: "pi-add-info-content",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("h3", {
                        className: "pi-color-blue pi-text-center",
                        children: title
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                        className: "row",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                          className: "col-12 col-md-6",
                          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                            className: "pi-info-logo",
                            children: [_this.state.fromData && _this.state.fromData.logo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("img", {
                              src: _this.state.fromData.logo.src
                            }), _this.state.fromData && !_this.state.fromData.logo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                              className: "pi-upload pi-cursor-pointer",
                              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("svg", {
                                width: 18,
                                height: 18,
                                viewBox: "0 0 18 18",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("path", {
                                  d: "M4.55765 13.121C3.68257 13.122 2.83789 12.8072 2.18545 12.2369C1.53301 11.6667 1.11868 10.8811 1.02184 10.0307C0.924994 9.18024 1.15245 8.32477 1.66063 7.62816C2.16881 6.93155 2.92198 6.44278 3.77584 6.25548C3.52879 5.12883 3.74957 3.95235 4.3896 2.98487C5.02964 2.01739 6.03651 1.33814 7.1887 1.09657C8.3409 0.854997 9.54405 1.07088 10.5335 1.69672C11.5229 2.32257 12.2175 3.30712 12.4646 4.43377H12.5534C13.655 4.43269 14.7177 4.83189 15.5353 5.55388C16.3528 6.27587 16.8668 7.26913 16.9775 8.34085C17.0882 9.41258 16.7877 10.4863 16.1344 11.3536C15.481 12.2208 14.5214 12.8198 13.4418 13.0341M11.665 10.5148L8.99975 7.90866M8.99975 7.90866L6.33449 10.5148M8.99975 7.90866V17",
                                  stroke: "#718096",
                                  strokeWidth: "1.5",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round"
                                })
                              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("p", {
                                children: ["Upload ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {}), "Logo"]
                              })]
                            })]
                          })
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                          className: "col-12 col-md-6",
                          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                            className: "pi-info-form pi-form-style-one",
                            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                              className: "pi-info-form-list",
                              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                                className: "pi-info-lavel",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                                  htmlFor: "info-number",
                                  children: [title, " number:"]
                                })
                              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                                className: "pi-info-input-field",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                                  type: "text",
                                  name: "invoice_id",
                                  value: _this.props.id ? (_this.props.path == 'invoice' ? 'Inv' : 'Est') + _this.props.id : '',
                                  readOnly: true
                                })
                              })]
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                              className: "pi-info-form-list",
                              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                                className: "pi-info-lavel",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                                  htmlFor: "date",
                                  children: [title, " date:"]
                                })
                              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                                className: "pi-info-input-field",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(DateField, {
                                  date: invoice.date,
                                  type: "date",
                                  onDateChange: _this.onDateChange
                                })
                              })]
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                              className: "pi-info-form-list",
                              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                                className: "pi-info-lavel",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("label", {
                                  htmlFor: "due",
                                  children: "Due date:"
                                })
                              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                                className: "pi-info-input-field",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(DateField, {
                                  date: invoice.due_date,
                                  type: "due_date",
                                  onDateChange: _this.onDateChange
                                })
                              })]
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                              className: "pi-info-form-list",
                              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                                className: "pi-info-lavel",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("label", {
                                  htmlFor: "info-currency",
                                  children: "Currency:"
                                })
                              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                                className: "pi-info-input-field",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                                  type: "text",
                                  name: "currency" // value={invoice.currency}
                                  ,
                                  value: "USD",
                                  readOnly: true // onChange={() => this.changeCurrency}

                                })
                              })]
                            })]
                          })
                        })]
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_FromTo__WEBPACK_IMPORTED_MODULE_11__["default"], {
                      setFrom: _this.handleSetFrom,
                      setTo: _this.handleSetTo,
                      fromData: _this.state.fromData,
                      toData: _this.state.toData,
                      editId: _this.props.id
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)((_Items__WEBPACK_IMPORTED_MODULE_12___default()), {
                      items: invoice.items,
                      item_tax: invoice.item_tax,
                      currencyFormatter: _this.formatCurrency,
                      addHandler: _this.handleAddLineItem,
                      changeHandler: _this.handleLineItemChange,
                      focusHandler: _this.handleFocusSelect,
                      deleteHandler: _this.handleRemoveLineItem,
                      reorderHandler: _this.handleReorderItems
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                      className: "row",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                        className: "col-sm-4",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_PaymentInfo__WEBPACK_IMPORTED_MODULE_13__["default"], {
                          data: _this.state.paymentBankData
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                        className: "col-sm-8",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Total__WEBPACK_IMPORTED_MODULE_14__["default"], {
                          currencyFormatter: _this.formatCurrency,
                          itemsTotal: _this.calcItemsTotal,
                          item_tax: invoice.item_tax,
                          extra_field: invoice.extra_field,
                          grandTotal: _this.calcGrandTotal,
                          changeHandler: _this.handleTotalChange,
                          focusHandler: _this.handleFocusSelect
                        })
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(react__WEBPACK_IMPORTED_MODULE_7__.Suspense, {
                      fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(block_preloader_spinner__WEBPACK_IMPORTED_MODULE_10__["default"], {}),
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(Section, {
                        data: invoice.sections,
                        changeHandler: _this.handleSectionChange
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                      className: " pi-inv-attachment pi-mt-30",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                        className: "row",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                          className: "col-md-6",
                          children:  false && /*#__PURE__*/0
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                          className: "col-md-6 pi-text-right",
                          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(block_field_upload__WEBPACK_IMPORTED_MODULE_17__["default"], {
                            label: 'Authorized Signature',
                            padding: '20px 30px',
                            data: invoice.sign,
                            changeHandler: _this.handleSignChange
                          })
                        })]
                      })
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                  className: "col-lg-3",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                    id: "pi-right-sidebar",
                    className: "pi-right-sidebar",
                    ref: _this.sidebarRef,
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("h2", {
                      className: "pi-title-medium",
                      children: ["Preview ", title]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                      className: "pi-inv-sidebar-preview",
                      style: {
                        transformOrigin: 'top left',
                        marginBottom: 'calc((' + _this.state.previewScale + ' - 1) * 1120px)',
                        transform: 'scale(' + _this.state.previewScale + ')'
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(InvTemplate, {
                        data: _this.state,
                        isPreviewLoaded: _this.isPreviewLoaded
                      }, invoice.style.primary_color)
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                      className: "pi-accordion-wrapper pi-mt-25",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("ul", {
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react__WEBPACK_IMPORTED_MODULE_7__.Suspense, {
                          children: [(!sidebarActive || sidebarActive == 'style') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("li", {
                            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                              type: "checkbox",
                              defaultChecked: "checked",
                              onClick: function onClick() {
                                return _this.setSidebarActive('style');
                              }
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("h3", {
                              className: "pi-title-small",
                              children: "Edit Style"
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(Style, {
                              handleChange: _this.onStyleChange,
                              data: invoice
                            })]
                          }), (!sidebarActive || sidebarActive == 'payment') && _this.props.path == 'invoice' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("li", {
                            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                              type: "checkbox",
                              defaultChecked: "checked",
                              onClick: function onClick() {
                                return _this.setSidebarActive('payment');
                              }
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("h3", {
                              className: "pi-title-small",
                              children: "Accepted Payment"
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(Payment, {
                              handleChange: _this.onPaymentChange,
                              data: invoice // handleSave={this.handleSave}

                            })]
                          }), (!sidebarActive || sidebarActive == 'extra-field') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("li", {
                            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                              type: "checkbox",
                              defaultChecked: "checked",
                              onClick: function onClick() {
                                return _this.setSidebarActive('extra-field');
                              }
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("h3", {
                              className: "pi-title-small",
                              children: "Additional Amount"
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(AdditionalAmount, _objectSpread(_objectSpread({}, _this.props), {}, {
                              item_tax: invoice.item_tax,
                              itemTaxChange: _this.itemTaxChange,
                              handleChange: _this.onExtraFieldChange,
                              data: invoice.extra_field
                            }))]
                          }), (!sidebarActive || sidebarActive == 'reminder') && !wage.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("li", {
                            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                              type: "checkbox",
                              defaultChecked: true,
                              onClick: function onClick() {
                                return _this.setSidebarActive('reminder');
                              }
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("h3", {
                              className: "pi-title-small",
                              children: ["Reminder", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
                                className: "pi-field-switch-content",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                                  className: "pi-field-switch pi-field-switch-big",
                                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                                    type: "checkbox",
                                    id: "reminder-status",
                                    name: "status",
                                    checked: invoice.reminder.status ? 'checked' : '',
                                    onChange: _this.onReminderChange
                                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
                                    className: "pi-switch-slider pi-round"
                                  })]
                                })
                              })]
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(Reminder, _objectSpread(_objectSpread({}, _this.props), {}, {
                              handleChange: _this.onReminderChange,
                              handleDefault: _this.onReminderDefault,
                              id: _this.props.id,
                              path: _this.props.path,
                              data: invoice.reminder
                            }))]
                          }), (!sidebarActive || sidebarActive == 'recurring') && !wage.length && _this.props.path == 'invoice' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("li", {
                            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                              type: "checkbox",
                              defaultChecked: "checked",
                              onClick: function onClick() {
                                return _this.setSidebarActive('recurring');
                              }
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("h3", {
                              className: "pi-title-small",
                              children: ["Recurring", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
                                className: "pi-field-switch-content",
                                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                                  className: "pi-field-switch pi-field-switch-big",
                                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                                    type: "checkbox",
                                    id: "recurring-status",
                                    name: "status",
                                    checked: invoice.recurring.status ? 'checked' : '',
                                    onChange: _this.onRecurringChange
                                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
                                    className: "pi-switch-slider pi-round"
                                  })]
                                })
                              })]
                            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(Recurring, _objectSpread(_objectSpread({}, _this.props), {}, {
                              handleChange: _this.onRecurringChange,
                              data: invoice.recurring
                            }))]
                          })]
                        })
                      })
                    })]
                  })
                })]
              })
            }), currentTab == 'preview' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_preview__WEBPACK_IMPORTED_MODULE_16__["default"], {
              data: _this.state,
              shareModal: _this.state.shareModal,
              showShareModal: function showShareModal() {
                return _this.setState({
                  shareModal: true
                });
              },
              closeShareModal: function closeShareModal() {
                return _this.setState({
                  shareModal: false
                });
              },
              emailModal: _this.state.emailModal,
              showEmailModal: function showEmailModal() {
                return _this.setState({
                  emailModal: true
                });
              },
              closeEmailModal: function closeEmailModal() {
                return _this.setState({
                  emailModal: false
                });
              },
              editTab: _this.editTab,
              path: _this.props.path
            })]
          })]
        })
      });
    });

    _this.state = {
      title: '',
      tabs: [{
        id: 'template',
        text: 'Select Template'
      }, {
        id: 'info',
        text: 'Add Content'
      }, {
        id: 'preview',
        text: 'Preview & Share'
      }],
      sidebarActive: '',
      currentTab: '',
      currentTabIndex: null,
      msg: {
        create: 'Successfully Added',
        update: 'Successfully Updated',
        "delete": 'Successfully Deleted',
        confirm: 'Are you sure to delete it?',
        saveTxt: 'Save'
      },
      shareModal: false,
      emailModal: false,
      fromData: null,
      toData: null,
      paymentBankData: null,
      invoice: {
        id: null,
        token: '',
        style: {
          primary_color: '#4c6fff',
          body_font: '',
          title_font: ''
        },
        date: new Date(),
        due_date: new Date(),
        currency: 'USD',
        template: null,
        from: null,
        to: null,
        to_type: '',
        //person, 'org'
        module_id: null,
        project: {
          id: null,
          title: '',
          desc: ''
        },
        item_label: {
          id: 'ID',
          title: 'Title',
          desc: 'Description',
          qty: 'Quantity',
          price: 'Rate',
          tax: 'Tax',
          amount: 'Amount'
        },
        items: [{
          id: 'init',
          //react-beautiful-dnd unique key
          title: '',
          desc: '',
          qty: 0,
          qty_type: 'unit',
          price: 0,
          tax: 0,
          tax_type: 'fixed'
        }],
        paid: 0,
        item_tax: false,
        extra_field: [],
        payment_methods: {},
        //TODO: move the the field in single, if always not needed
        reminder: {
          status: false,
          due_date: false,
          before: [],
          after: []
        },
        //TODO: move the the field in single, if always not needed
        recurring: {
          status: false,
          interval_type: 'week',
          interval_in: 'month',
          //1=day, 2=month, 3=year
          interval: 1,
          limit_type: 0,
          limit: 5,
          send_me: false,
          delivery: 1 //1=auto, 0=manual

        },
        sections: null,
        attach: [],
        sign: null
      },
      previewHeight: '',
      previewScale: ''
    };
    _this.sidebarRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createRef();
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Invoice, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var title = this.props.path == 'invoice' ? 'Invoice' : 'Estimate';

      if (this.props.id) {
        if (this.props.tab == 'preview') {
          this.setState({
            title: title,
            currentTab: 'preview',
            currentTabIndex: 2
          });
        } else {
          this.setState({
            title: title,
            currentTab: 'info',
            currentTabIndex: 1
          });
        }

        this.updateEdit();
        this.getData();
      } else {
        //set future due date
        var date = new Date();
        var dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 30);

        var invoice = _objectSpread({}, this.state.invoice);

        invoice.due_date = dueDate; //deal, project id

        if (this.props.module_id) {
          invoice.module_id = parseInt(this.props.module_id);
          console.log(invoice);
        }

        this.setState({
          title: title,
          currentTab: 'template',
          currentTabIndex: 0,
          invoice: invoice
        });
      }

      this.bgColor();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.bgColor();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.style.backgroundColor = "#fff";
    }
  }, {
    key: "setActiveTab",
    value: function setActiveTab(e, id, index) {
      e.preventDefault();
      this.setState({
        currentTab: id,
        currentTabIndex: index
      });
    }
  }, {
    key: "setSidebarActive",
    value: function setSidebarActive(id) {
      if (this.state.sidebarActive == id) {
        this.setState({
          sidebarActive: ''
        });
      } else {
        this.setState({
          sidebarActive: id
        });
      }
    }
  }]);

  return Invoice;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Invoice);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/tab/preview/Send.js":
/*!**************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/preview/Send.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var api_email__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! api/email */ "./src/admin/js/react/api/email.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


 // import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';





var Send = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Send, _Component);

  var _super = _createSuper(Send);

  function Send(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Send);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "convertDate", function (str) {
      var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "calcItemsTotal", function () {
      return _this.props.data.invoice.items.reduce(function (prev, cur) {
        return prev + cur.qty * cur.price;
      }, 0);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "calcTaxTotal", function () {
      return _this.calcItemsTotal() * (_this.props.data.invoice.tax / 100);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "calcGrandTotal", function () {
      return _this.calcItemsTotal() + _this.calcTaxTotal();
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault(); // TODO: send with attachment pdf

      if (false) {} else {
        _this.sendEmail();
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "sendEmail", function () {
      var form = _objectSpread({}, _this.state.form);

      form.type = 'sent';
      api_email__WEBPACK_IMPORTED_MODULE_9__["default"].create(form).then(function (resp) {
        if (resp.data.success) {
          react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.success('Mail sucessfully sent');

          _this.props.close();
        } else {
          resp.data.data.forEach(function (value, index, array) {
            react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error(value);
          });
        }
      });
    });

    _this.state = {
      form: {
        invoice_id: null,
        path: '',
        fromData: {
          id: '',
          email: ''
        },
        toData: {
          id: '',
          name: '',
          email: ''
        },
        subject: '',
        msg: '',
        invoice_img: null
      }
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Send, [{
    key: "componentDidMount",
    value: //end try to call it from invoice to avoid duplication code
    function componentDidMount() {
      var data = this.props.data;

      if (data.fromData == null || data.toData == null) {
        react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error('First fill up necessary information, From content tab');
        return;
      }

      var path = this.props.path;
      var path_title = path == 'invoice' ? 'Invoice' : 'Estimate';

      var formState = _objectSpread({}, this.state.form);

      var id = data.invoice.id;
      var currency = data.invoice.currency;
      var date = this.convertDate(data.invoice.date);
      var due_date = this.convertDate(data.invoice.due_date);
      var amount = this.calcGrandTotal();
      var org_name = data.fromData.name;
      var client_name = data.toData.type == 'person' ? data.toData.first_name : data.toData.org_name;
      formState.invoice_id = id;
      formState.path = path_title;
      formState.fromData = {
        id: data.fromData.id,
        name: org_name,
        email: data.fromData.email
      };
      formState.toData = {
        id: data.toData.id,
        name: client_name,
        email: data.toData.email
      };
      var mail = this.props.mail;
      var subject = mail.subject.replaceAll('{id}', id).replaceAll('{org_name}', org_name);
      var msg = mail.msg.replaceAll('{id}', id).replaceAll('{org_name}', org_name).replaceAll('{client_name}', client_name).replaceAll('{date}', date).replaceAll('{due_date}', due_date).replaceAll('{amount}', amount + ' ' + currency);
      formState.subject = subject;
      formState.msg = msg;
      this.setState({
        form: formState
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var path = this.props.path;
      var path_title = path == 'invoice' ? 'Invoice' : 'Estimate';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        className: "pi-overlay pi-show",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "pi-modal-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "pi-modal-header pi-gradient",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
              className: "pi-close",
              onClick: function onClick() {
                return _this2.props.close();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("svg", {
                width: 25,
                height: 25,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                  d: "M12.5 3.5L3.5 12.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                  d: "M12.5 12.5L3.5 3.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("h2", {
              className: "pi-modal-title",
              children: ["Email ", path_title]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("p", {
              children: ["Email ", path, " from here"]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("form", {
            onSubmit: this.handleSubmit,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "form-name",
                      children: "Client Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                      id: "form-name",
                      type: "text",
                      required: true,
                      readOnly: true,
                      name: "name",
                      value: this.state.form.toData.name,
                      onChange: this.handleChange
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "form-email",
                      children: "Email"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                      id: "form-email",
                      type: "text",
                      required: true,
                      readOnly: true,
                      name: "email",
                      value: this.state.form.toData.email,
                      onChange: this.handleChange
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "col",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "form-subject",
                      children: "Subject"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                      id: "form-subject",
                      type: "text",
                      required: true,
                      name: "subject",
                      value: this.state.form.subject,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "col",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "form-msg",
                      children: "Message"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("textarea", {
                      id: "form-msg",
                      rows: 8,
                      name: "msg",
                      value: this.state.form.msg,
                      onChange: this.handleChange
                    })]
                  })
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "pi-modal-footer",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("button", {
                    type: "reset",
                    className: "pi-btn pi-text-hover-blue",
                    children: "Clear"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("button", {
                    type: "submit",
                    className: "pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white",
                    children: "Send Email"
                  })
                })]
              })
            })]
          })]
        })
      });
    }
  }]);

  return Send;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Send);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/tab/preview/Share.js":
/*!***************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/preview/Share.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var Share = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Share, _Component);

  var _super = _createSuper(Share);

  function Share(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Share);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "copyToClipboard", function (e) {
      _this.client_url.select();

      document.execCommand('copy'); //TODO: Deprecated https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
      // This is just personal preference.
      // I prefer to not show the whole text area selected. 

      e.target.focus();
      react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.success('Copied!');
    });

    _this.state = {
      client_url: ''
    };
    _this.client_url = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createRef();
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Share, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var data = this.props.data;

      if (data.fromData == null || data.toData == null) {
        react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.error('First fill up necessary information, From content tab');
        return;
      }

      var invoice_id = this.props.data.invoice.id;
      var invoice_token = this.props.data.invoice.token;
      var url = this.props.path == 'invoice' ? ncpi.invoice_page_url : ncpi.estimate_page_url; //replace text with id and token

      var result = url.replace('invoice_id', invoice_id);
      var client_url = result.replace('invoice_token', invoice_token);
      this.setState({
        client_url: client_url
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var path = this.props.path;
      var path_title = path == 'invoice' ? 'Invoice' : 'Estimate';
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "pi-overlay pi-show",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "pi-modal-content pi-modal-style-three pi-modal-medium",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "pi-modal-header",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("h2", {
              className: "pi-modal-title pi-text-center",
              children: ["Share ", path_title]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
              className: "pi-close",
              onClick: function onClick() {
                return _this2.props.close();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("svg", {
                width: 25,
                height: 25,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                  d: "M12.5 3.5L3.5 12.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                  d: "M12.5 12.5L3.5 3.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
            className: "pi-content",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
              className: "pi-form-style-one",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                className: "row",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "col-lg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "pi-field-copy",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      type: "text",
                      id: "name",
                      name: "name",
                      value: this.state.client_url,
                      ref: function ref(client_url) {
                        return _this2.client_url = client_url;
                      },
                      readOnly: true
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                      className: "pi-copy",
                      onClick: this.copyToClipboard,
                      children: "Copy"
                    })]
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                className: "pi-field-share",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("a", {
                  href: "https://web.whatsapp.com",
                  target: "_blank",
                  className: "pi-social-icon",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                    className: "pi-whatsapp",
                    style: {
                      background: "#E9FBEF"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("svg", {
                      width: 40,
                      height: 40,
                      viewBox: "0 0 42 42",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                        d: "M11.0516 36.2279L11.7338 36.577C14.5765 38.322 17.7601 39.1363 20.9439 39.1363C30.9498 39.1363 39.1365 30.7602 39.1365 20.5227C39.1365 15.6367 37.2034 10.8669 33.7924 7.37679C30.3813 3.88668 25.833 1.90906 20.9439 1.90906C10.938 1.90906 2.75117 10.2852 2.86494 20.6391C2.86494 24.129 3.88827 27.5029 5.59377 30.4111L6.04855 31.1093L4.22944 37.9731L11.0516 36.2279Z",
                        fill: "#00E676"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                        d: "M35.9345 6.12972C32.0435 2.15683 26.6648 0 21.1716 0C9.49874 0 0.114514 9.42159 0.228864 20.8864C0.228864 24.5189 1.25883 28.0379 2.97555 31.2162L0 42L11.1008 39.1621C14.1907 40.865 17.6238 41.6596 21.0573 41.6596C32.6158 41.6596 42 32.2378 42 20.7732C42 15.2109 39.8256 9.98919 35.9347 6.12972H35.9345ZM21.1716 38.1407C18.0817 38.1407 14.9918 37.3462 12.3596 35.757L11.673 35.4164L5.03549 37.1191L6.75205 30.6489L6.29432 29.9677C1.25883 21.9084 3.66215 11.2378 11.9019 6.24314C20.1416 1.24863 30.7847 3.63246 35.8202 11.8054C40.8555 19.9784 38.4522 30.5352 30.2126 35.5299C27.5803 37.2325 24.376 38.1405 21.1716 38.1405V38.1407ZM31.2424 25.5408L29.9836 24.9732C29.9836 24.9732 28.1527 24.1786 27.0082 23.611C26.8937 23.611 26.7793 23.4974 26.6648 23.4974C26.3214 23.4974 26.0926 23.611 25.8637 23.7246C25.8637 23.7246 25.7494 23.838 24.1472 25.6542C24.0326 25.8813 23.8038 25.9948 23.5749 25.9948H23.4604C23.3461 25.9948 23.1172 25.8813 23.0027 25.7678L22.4304 25.5408C21.1716 24.9732 20.0273 24.292 19.1117 23.384C18.8828 23.157 18.5394 22.93 18.3106 22.703C17.5095 21.9084 16.7084 21.0002 16.1363 19.9785L16.0218 19.7515C15.9074 19.6379 15.9074 19.5245 15.7929 19.2975C15.7929 19.0705 15.7929 18.8435 15.9074 18.7299C15.9074 18.7299 16.3651 18.1623 16.7084 17.8219C16.9374 17.5947 17.0517 17.2543 17.2806 17.0273C17.5095 16.6867 17.624 16.2327 17.5095 15.8921C17.3951 15.3245 16.0218 12.2596 15.6786 11.5786C15.4495 11.238 15.2208 11.1246 14.8774 11.011H13.6186C13.3896 11.011 13.1609 11.1246 12.9319 11.1246L12.8173 11.238C12.5885 11.3516 12.3596 11.5786 12.1308 11.692C11.9019 11.9192 11.7874 12.146 11.5585 12.3732C10.7574 13.3948 10.2997 14.6434 10.2997 15.8921C10.2997 16.8001 10.5285 17.7083 10.8719 18.5029L10.9864 18.8435C12.0164 21.0002 13.3896 22.93 15.2208 24.6326L15.6786 25.0866C16.0218 25.4272 16.3651 25.6542 16.594 25.9947C18.9973 28.0381 21.7438 29.5137 24.8338 30.3083C25.1771 30.4217 25.6349 30.4217 25.9782 30.5353H27.1226C27.6948 30.5353 28.3814 30.3083 28.8393 30.0813C29.1825 29.8543 29.4114 29.8543 29.6402 29.6273L29.8692 29.4001C30.0981 29.1731 30.327 29.0597 30.5558 28.8327C30.7847 28.6057 31.0136 28.3787 31.1281 28.1515C31.3569 27.6975 31.4713 27.1299 31.5858 26.5624V25.7678C31.5858 25.7678 31.4713 25.6542 31.2424 25.5408Z",
                        fill: "white"
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
                    children: "Whatsapp"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("a", {
                  href: "https://messenger.com",
                  target: "_blank",
                  className: "pi-social-icon",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                    className: "pi-messenger",
                    style: {
                      background: "rgba(0, 123, 255, 0.1)"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("svg", {
                      width: 35,
                      height: 40,
                      viewBox: "0 0 44 44",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                        d: "M22 0C9.592 0 0 9.08634 0 21.3408C0 27.743 2.618 33.3092 6.908 37.1154C7.26 37.4014 7.48 37.8854 7.502 38.3694L7.612 42.2856C7.7 43.5396 8.954 44.3537 10.098 43.8476L14.454 41.9336C14.828 41.8016 15.246 41.7356 15.62 41.8016C17.6 42.3956 19.8 42.6816 22 42.6816C34.408 42.6816 44 33.5953 44 21.3408C44 9.08634 34.408 0 22 0ZM35.2 16.4126L28.754 26.687C27.72 28.2931 25.52 28.7111 23.98 27.501L18.832 23.6949C18.6035 23.5235 18.3256 23.4309 18.04 23.4309C17.7544 23.4309 17.4765 23.5235 17.248 23.6949L10.296 28.9751C9.372 29.7011 8.162 28.6011 8.8 27.589L15.246 17.3146C16.28 15.7086 18.48 15.2906 20.02 16.4346L25.168 20.3068C25.3965 20.4781 25.6744 20.5708 25.96 20.5708C26.2456 20.5708 26.5235 20.4781 26.752 20.3068L33.704 15.0266C34.628 14.3005 35.838 15.4006 35.2 16.4126Z",
                        fill: "#007BFF"
                      })
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
                    children: "Messenger"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("a", {
                  href: "https://web.telegram.org/z/",
                  target: "_blank",
                  className: "pi-social-icon",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                    className: "pi-telegrame",
                    style: {
                      background: "rgba(64, 179, 224, 0.08)"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("svg", {
                      width: 35,
                      height: 35,
                      viewBox: "0 0 41 36",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                        d: "M40.0308 2.13324L33.7792 33.6521C33.7792 33.6521 32.905 35.838 30.5007 34.7888L16.0747 23.7288L10.8291 21.1935L1.99868 18.2207C1.99868 18.2207 0.643519 17.74 0.512269 16.6908C0.381019 15.6416 2.04243 15.0734 2.04243 15.0734L37.1452 1.30309C37.1452 1.30309 40.0305 0.0354299 40.0305 2.13379",
                        fill: "#40B3E0"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                        d: "M14.9657 33.2976C14.9657 33.2976 14.5446 33.2582 14.0196 31.5968C13.4954 29.9357 10.8286 21.1928 10.8286 21.1928L32.0304 7.72875C32.0304 7.72875 33.2546 6.98555 33.2108 7.72875C33.2108 7.72875 33.4293 7.86 32.7733 8.47195C32.1179 9.08418 16.1183 23.4662 16.1183 23.4662",
                        fill: "#1F97C6"
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
                    children: "Telegrame"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("a", {
                  href: "https://web.skype.com/",
                  target: "_blank",
                  className: "pi-social-icon",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                    className: "pi-skype",
                    style: {
                      background: "rgba(0, 175, 240, 0.08)"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("svg", {
                      width: 35,
                      height: 35,
                      viewBox: "0 0 42 45",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                        d: "M40.5134 24.5059C40.5001 24.5799 40.4908 24.6548 40.4768 24.7288L40.405 24.3046C40.4444 24.3707 40.4768 24.4393 40.5134 24.5059C40.7322 23.3172 40.8428 22.1111 40.844 20.9023C40.844 18.2187 40.3198 15.615 39.2843 13.1641C38.2851 10.7965 36.8558 8.67024 35.0334 6.84475C33.2136 5.01926 31.091 3.58634 28.7305 2.58495C26.2861 1.54821 23.6888 1.02277 21.0116 1.02277C19.75 1.02277 18.4861 1.1415 17.2563 1.37816C17.2536 1.37882 17.2504 1.37882 17.2469 1.37948C17.3161 1.41615 17.386 1.44888 17.4538 1.48687L17.0367 1.42141C17.1066 1.40826 17.1772 1.39345 17.2469 1.37948C15.5597 0.480218 13.6618 0 11.741 0C8.60508 0 5.65638 1.22406 3.43875 3.4477C1.22177 5.67068 0 8.62633 0 11.7699C0.00106457 13.7668 0.509448 15.7306 1.47722 17.476C1.48985 17.404 1.49855 17.3313 1.51249 17.2592L1.58435 17.676C1.54711 17.6107 1.51446 17.5426 1.47722 17.476C1.27983 18.6074 1.17993 19.7537 1.17862 20.9023C1.17862 23.5866 1.7028 26.1896 2.73837 28.6412C3.73603 31.0094 5.16616 33.1342 6.9866 34.9597C8.80901 36.7854 10.9289 38.2203 13.292 39.219C15.7365 40.2577 18.3345 40.7838 21.0116 40.7838C22.177 40.7838 23.3449 40.6771 24.4849 40.4745C24.4184 40.4372 24.3506 40.4031 24.2827 40.3638L24.7065 40.4385C24.6333 40.4524 24.5593 40.4612 24.4849 40.4745C26.2466 41.474 28.2366 41.9996 30.261 42C33.3964 42 36.3436 40.7777 38.5612 38.5536C40.7794 36.3319 42 33.3756 42 30.232C41.9989 28.2276 41.4872 26.2565 40.5134 24.5059ZM21.0907 33.0776C14.0451 33.0776 10.8929 29.6053 10.8929 27.0031C10.8929 25.6681 11.876 24.7327 13.2308 24.7327C16.246 24.7327 15.465 29.0726 21.0907 29.0726C23.9708 29.0726 25.5611 27.505 25.5611 25.9009C25.5611 24.9361 25.0863 23.8665 23.1899 23.3978L16.923 21.8297C11.876 20.5609 10.96 17.826 10.96 15.255C10.96 9.91716 15.9738 7.91291 20.6824 7.91291C25.0197 7.91291 30.1327 10.3158 30.1327 13.5181C30.1327 14.8904 28.9474 15.6883 27.593 15.6883C25.0197 15.6883 25.4933 12.1179 20.31 12.1179C17.7378 12.1179 16.3131 13.2856 16.3131 14.9563C16.3131 16.6239 18.3445 17.1566 20.1083 17.5592L24.747 18.5913C29.828 19.7261 31.1164 22.6998 31.1164 25.5007C31.1164 29.8386 27.7946 33.0776 21.0907 33.0776ZM24.2827 40.3638C24.3506 40.4031 24.4184 40.4372 24.4849 40.4745C24.5593 40.4612 24.6333 40.4524 24.7065 40.4385L24.2827 40.3638ZM40.4768 24.7288C40.4908 24.6548 40.5001 24.5799 40.5134 24.5059C40.4768 24.4393 40.4444 24.3707 40.405 24.3046L40.4768 24.7288ZM1.51249 17.2592C1.49855 17.3313 1.48985 17.404 1.47722 17.476C1.51446 17.5426 1.54711 17.6107 1.58435 17.676L1.51249 17.2592ZM17.4538 1.48687C17.386 1.44888 17.3161 1.41615 17.2469 1.37948C17.1772 1.39345 17.1066 1.40826 17.0367 1.42141L17.4538 1.48687Z",
                        fill: "#00AFF0"
                      })
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
                    children: "Skype"
                  })]
                })]
              })]
            })
          })]
        })
      });
    }
  }]);

  return Share;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Share);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/tab/preview/index.js":
/*!***************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/preview/index.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Preview)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_to_print__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-to-print */ "./node_modules/react-to-print/lib/index.js");
/* harmony import */ var react_to_print__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_to_print__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var inv_template__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! inv-template */ "./src/admin/js/react/inv-template/index.js");
/* harmony import */ var _Share__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Share */ "./src/admin/js/react/components/invoice/single/tab/preview/Share.js");
/* harmony import */ var _Send__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Send */ "./src/admin/js/react/components/invoice/single/tab/preview/Send.js");
/* harmony import */ var api_setting__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! api/setting */ "./src/admin/js/react/api/setting.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }











var EditDownload = function EditDownload(props) {
  var title = props.path == 'invoice' ? 'Invoice' : 'Estimate';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("button", {
      className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5" // style={{ color: '#000', marginRight: '5px' }}
      ,
      onClick: function onClick() {
        return props.handleEdit();
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("svg", {
        width: 17,
        height: 16,
        viewBox: "0 0 17 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
          d: "M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z",
          stroke: "#2D3748",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
          d: "M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z",
          stroke: "#2D3748",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })]
      }), "Edit ", title]
    })
  });
};

var Preview = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Preview, _Component);

  var _super = _createSuper(Preview);

  function Preview(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Preview);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "isPreviewLoaded", function () {
      var previewRef = _this.previewRef.current;

      if (previewRef) {
        var height = 'auto';

        if (previewRef.clientHeight > 1123) {
          height = Math.ceil(previewRef.clientHeight / 1123) * 1123 + 'px';
        } else {
          height = '1123px';
        }

        _this.setState({
          previewHeight: height
        });
      }
    });

    _this.state = {
      previewHeight: 'auto',
      mail: {
        subject: '',
        msg: ''
      }
    };
    _this.previewRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createRef();
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Preview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.isPreviewLoaded();
      api_setting__WEBPACK_IMPORTED_MODULE_12__["default"].getAll('tab=email_' + this.props.path + '_default').then(function (resp) {
        if (resp.data.success) {
          _this2.setState({
            mail: resp.data.data
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      // const { id } = this.props.data.invoice.template;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
        id: "pi-tab-share",
        className: "pi-invoice-tab-content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h2", {
          className: "pi-page-title",
          children: "Preview & Share"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("iframe", {
          id: "ncpi-invoice-print",
          style: {
            height: 0,
            width: 0,
            position: 'absolute'
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
          className: "row justify-content-md-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
            className: "col-md-8",
            style: {
              margin: '50px 0 30px 0'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
              className: "",
              style: {
                maxWidth: '794px',
                margin: '0 auto'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(EditDownload, {
                componentRef: this.componentRef,
                path: this.props.path,
                handleEdit: this.props.editTab
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)((react_to_print__WEBPACK_IMPORTED_MODULE_8___default()), {
                content: function content() {
                  return _this3.componentRef;
                },
                trigger: function trigger() {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("button", {
                    className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5" // style={{ color: '#000', marginRight: '5px' }}
                    // onClick={() => props.handleDownload()}
                    ,
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("svg", {
                      width: 17,
                      height: 16,
                      viewBox: "0 0 17 16",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                        d: "M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z",
                        stroke: "#2D3748",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                        d: "M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z",
                        stroke: "#2D3748",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      })]
                    }), "Download"]
                  });
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)((react_to_print__WEBPACK_IMPORTED_MODULE_8___default()), {
                content: function content() {
                  return _this3.componentRef;
                },
                trigger: function trigger() {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("button", {
                    className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5" // style={{ color: '#000', marginRight: '5px' }}
                    // onClick={() => props.handlePrint()}
                    ,
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("svg", {
                      width: 17,
                      height: 16,
                      viewBox: "0 0 17 16",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                        d: "M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z",
                        stroke: "#2D3748",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                        d: "M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z",
                        stroke: "#2D3748",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      })]
                    }), "Print"]
                  });
                }
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: "col-md-8",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
              className: "pi-inv-hidden-preview",
              style: {
                position: 'absolute',
                left: 9999
              },
              ref: this.previewRef,
              children: this.props.data.fromData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(inv_template__WEBPACK_IMPORTED_MODULE_9__["default"], _objectSpread(_objectSpread({}, this.props), {}, {
                isPreviewLoaded: this.isPreviewLoaded
              }))
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
              className: "pi-inv-preview-wrap",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                className: "pi-inv-preview",
                ref: function ref(response) {
                  return _this3.componentRef = response;
                },
                children: this.props.data.fromData && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(inv_template__WEBPACK_IMPORTED_MODULE_9__["default"], _objectSpread(_objectSpread({}, this.props), {}, {
                  height: this.state.previewHeight
                }))
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
            className: "col-md-8",
            style: {
              margin: '30px 0'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
              className: "",
              style: {
                maxWidth: '794px',
                margin: '0 auto'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                className: "pi-float-left",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(EditDownload, {
                  componentRef: this.componentRef,
                  path: this.props.path,
                  handleEdit: this.props.editTab
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)((react_to_print__WEBPACK_IMPORTED_MODULE_8___default()), {
                  content: function content() {
                    return _this3.componentRef;
                  },
                  trigger: function trigger() {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("button", {
                      className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5",
                      style: {
                        color: '#000',
                        marginRight: '5px'
                      } //onClick={() => props.handleDownload()}
                      ,
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("svg", {
                        width: 17,
                        height: 16,
                        viewBox: "0 0 17 16",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                          d: "M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z",
                          stroke: "#2D3748",
                          strokeWidth: "1.5",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                          d: "M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z",
                          stroke: "#2D3748",
                          strokeWidth: "1.5",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })]
                      }), "Download"]
                    });
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)((react_to_print__WEBPACK_IMPORTED_MODULE_8___default()), {
                  content: function content() {
                    return _this3.componentRef;
                  },
                  trigger: function trigger() {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("button", {
                      className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5" // style={{ color: '#000', marginRight: '5px' }}
                      // onClick={() => props.handlePrint()}
                      ,
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("svg", {
                        width: 17,
                        height: 16,
                        viewBox: "0 0 17 16",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                          d: "M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z",
                          stroke: "#2D3748",
                          strokeWidth: "1.5",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                          d: "M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z",
                          stroke: "#2D3748",
                          strokeWidth: "1.5",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })]
                      }), "Print"]
                    });
                  }
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                className: "pi-float-right",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("button", {
                  className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5 pi-br-4" // style={{ color: '#000', marginRight: '5px' }}
                  ,
                  onClick: function onClick() {
                    return _this3.props.showShareModal();
                  },
                  children: "Share"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("button", {
                  className: "pi-btn pi-btn-medium pi-bg-hover-blue pi-bg-blue pi-br-4",
                  onClick: function onClick() {
                    return _this3.props.showEmailModal();
                  },
                  children: ["Send Email", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("svg", {
                    className: "pi-ml-10 pi-mr-0",
                    width: 6,
                    height: 12,
                    viewBox: "0 0 6 9",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                      d: "M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z",
                      fill: "white"
                    })
                  })]
                })]
              })]
            })
          })]
        }), this.props.shareModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_Share__WEBPACK_IMPORTED_MODULE_10__["default"], {
          data: this.props.data,
          path: this.props.path,
          close: this.props.closeShareModal
        }), this.props.emailModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_Send__WEBPACK_IMPORTED_MODULE_11__["default"], {
          data: this.props.data,
          mail: this.state.mail,
          path: this.props.path,
          close: this.props.closeEmailModal
        })]
      });
    }
  }]);

  return Preview;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);



/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/tab/template/index.js":
/*!****************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/template/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Template)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-paginate */ "./node_modules/react-paginate/dist/react-paginate.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_paginate__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var block_preloader_template__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! block/preloader/template */ "./src/admin/js/react/blocks/preloader/template/index.js");
/* harmony import */ var api_invoice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! api/invoice */ "./src/admin/js/react/api/invoice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }








var Template = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Template, _Component);

  var _super = _createSuper(Template);

  function Template(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Template);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "getLists", function () {
      var searchArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var old_version = JSON.parse(localStorage.getItem('ncpi_version'));
      var template = JSON.parse(localStorage.getItem('ncpi_templates')); //version compire

      var current_version = ncpi.version;
      var compare_version = current_version.localeCompare(old_version);

      if (template && old_version && compare_version !== 1) {
        _this.setState({
          preloader: false,
          templates: template
        });

        if (!_this.props.currentTemplate) {
          _this.props.changeHandler(template[0]);
        }

        return;
      }

      var args = {
        page: _this.state.currentPage,
        per_page: _this.state.perPage
      };

      if (searchArgs) {
        //Filter all falsy values ( "", 0, false, null, undefined )
        searchArgs = Object.entries(searchArgs).reduce(function (a, _ref) {
          var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
              k = _ref2[0],
              v = _ref2[1];

          return v ? (a[k] = v, a) : a;
        }, {});
        args = _objectSpread(_objectSpread({}, args), searchArgs);
      }

      var params = new URLSearchParams(args).toString();
      api_invoice__WEBPACK_IMPORTED_MODULE_11__["default"].getAllTemplate(params).then(function (resp) {
        var result = resp.data.data.result;
        var total = resp.data.data.total;
        localStorage.setItem('ncpi_version', JSON.stringify(ncpi.version));
        localStorage.setItem('ncpi_templates', JSON.stringify(result));

        _this.setState({
          preloader: false,
          templates: result,
          totalPage: Math.ceil(total / _this.state.perPage)
        }); //select default template


        if (!_this.props.currentTemplate) {
          _this.props.changeHandler(result[0]);
        }
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "selectEntry", function (data) {
      _this.props.changeHandler(data, true);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handlePageClick", function (e) {
      var selectedPage = e.selected + 1;
      var offset = selectedPage * _this.state.perPage;

      _this.setState({
        currentPage: selectedPage,
        offset: offset
      }, function () {
        _this.getLists();
      });
    });

    _this.state = {
      preloader: true,
      templates: [],
      offset: 0,
      perPage: 10,
      totalPage: 1,
      currentPage: 1
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Template, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getLists();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
        id: "pi-tab-template",
        className: "pi-invoice-tab-content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("h2", {
          className: "pi-page-title",
          children: "Select Template"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
          className: "row pi-gap pi-margin-l-r",
          children: [this.state.preloader && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(block_preloader_template__WEBPACK_IMPORTED_MODULE_10__["default"], {}), !this.state.preloader && this.state.templates.map(function (row, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
              className: "col-12 col-md-6 col-lg-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                className: "pi-single-image-content",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("img", {
                  src: row.src,
                  className: 'pi-single-image ' + (_this2.props.currentTemplate == row.id ? 'pi-active' : '')
                }), _this2.props.currentTemplate != row.id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                  className: "pi-overflow-content",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("a", {
                    className: "pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue",
                    onClick: function onClick() {
                      return _this2.selectEntry(row);
                    },
                    children: "Select"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("a", {
                    href: 'https://appux.co/ncpi/preview/inv' + row.id + '.html',
                    target: "_blank",
                    className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow",
                    children: "Full Preview"
                  })]
                })]
              })
            }, index);
          })]
        }), this.state.totalPage > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)((react_paginate__WEBPACK_IMPORTED_MODULE_9___default()), {
          previousLabel: "<",
          nextLabel: ">",
          breakLabel: "...",
          breakClassName: "break",
          forcePage: this.state.currentPage - 1,
          pageCount: this.state.totalPage,
          marginPagesDisplayed: 2,
          pageRangeDisplayed: 5,
          onPageChange: this.handlePageClick,
          containerClassName: "pi-pagination",
          activeClassName: "active"
        })]
      });
    }
  }]);

  return Template;
}(react__WEBPACK_IMPORTED_MODULE_8__.Component);



/***/ }),

/***/ "./src/admin/js/react/components/media/dropzone.js":
/*!*********************************************************!*\
  !*** ./src/admin/js/react/components/media/dropzone.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Index)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/admin/js/react/components/media/style.css");
/* harmony import */ var react_dropzone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dropzone */ "./node_modules/react-dropzone/dist/es/index.js");
/* harmony import */ var api_media__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! api/media */ "./src/admin/js/react/api/media.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }









function Index(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
      fileNames = _useState2[0],
      setFileNames = _useState2[1];

  var handleDrop = function handleDrop(acceptedFiles) {
    acceptedFiles.map(function (file) {
      return onFileUpload(file);
    });
  };

  var onFileUpload = function onFileUpload(file) {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'sign');
    api_media__WEBPACK_IMPORTED_MODULE_5__["default"].create(formData).then(function (resp) {
      if (resp.data.success) {
        props.newMedia(resp.data.data);
      } else {
        resp.data.data.forEach(function (value, index, array) {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(value);
        });
      }
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_dropzone__WEBPACK_IMPORTED_MODULE_7__["default"], {
      onDrop: handleDrop,
      accept: "image/*" // minSize={1024}
      // maxSize={3072000}
      ,
      children: function children(_ref) {
        var getRootProps = _ref.getRootProps,
            getInputProps = _ref.getInputProps,
            isDragActive = _ref.isDragActive;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", _objectSpread(_objectSpread({}, getRootProps({
          className: "pi-dropzone"
        })), {}, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("input", _objectSpread({}, getInputProps())), isDragActive ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            children: "Drop the files here ..."
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            children: "Drag & drop some files here, or click to select files"
          })]
        }));
      }
    })
  });
}

/***/ }),

/***/ "./src/admin/js/react/components/media/index.js":
/*!******************************************************!*\
  !*** ./src/admin/js/react/components/media/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Template)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-paginate */ "./node_modules/react-paginate/dist/react-paginate.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_paginate__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var block_preloader_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! block/preloader/table */ "./src/admin/js/react/blocks/preloader/table/index.js");
/* harmony import */ var api_invoice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! api/invoice */ "./src/admin/js/react/api/invoice.js");
/* harmony import */ var _dropzone__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dropzone */ "./src/admin/js/react/components/media/dropzone.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }










var Template = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Template, _Component);

  var _super = _createSuper(Template);

  function Template(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Template);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "getLists", function () {
      var searchArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var args = {
        page: _this.state.currentPage,
        per_page: _this.state.perPage
      };

      if (searchArgs) {
        //Filter all falsy values ( "", 0, false, null, undefined )
        searchArgs = Object.entries(searchArgs).reduce(function (a, _ref) {
          var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
              k = _ref2[0],
              v = _ref2[1];

          return v ? (a[k] = v, a) : a;
        }, {});
        args = _objectSpread(_objectSpread({}, args), searchArgs);
      }

      var params = new URLSearchParams(args).toString();
      api_invoice__WEBPACK_IMPORTED_MODULE_11__["default"].getAllTemplate(params).then(function (resp) {
        var result = resp.data.data.result;
        var total = resp.data.data.total;

        _this.setState({
          templates: result
        });

        _this.setState({
          preloader: false
        });

        _this.setState({
          totalPage: Math.ceil(total / _this.state.perPage)
        });
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "selectEntry", function (data) {
      _this.setState({
        selectedItem: data
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "newMedia", function (data) {
      var templates = _this.state.templates;
      templates.unshift(data);

      _this.setState({
        currentTab: 'gallery',
        templates: templates
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "insertMedia", function () {
      var item = _this.state.selectedItem;

      if (!item.id) {
        alert('Please select a media');
      }

      _this.props.insertHandler(item);

      _this.props.close();
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handlePageClick", function (e) {
      var selectedPage = e.selected + 1;
      var offset = selectedPage * _this.state.perPage;

      _this.setState({
        currentPage: selectedPage,
        offset: offset
      }, function () {
        _this.getLists();
      });
    });

    _this.state = {
      selectedItem: {
        id: null
      },
      currentTab: 'upload',
      preloader: true,
      templates: [],
      offset: 0,
      perPage: 10,
      totalPage: 1,
      currentPage: 1
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Template, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getLists();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
        children: this.props.show && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
          className: "pi-overlay pi-show",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: "pi-modal-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
              className: "pi-modal-header",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h2", {
                className: "pi-modal-title pi-text-center",
                children: "Media Gallery"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
                className: "pi-close",
                onClick: function onClick() {
                  return _this2.props.close();
                },
                children: "\xD7"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
              className: "pi-content",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("button", {
                className: 'pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white ' + (this.state.currentTab == 'upload' ? 'pi-bg-blue pi-color-white' : ''),
                onClick: function onClick(e) {
                  e.preventDefault();

                  _this2.setState({
                    currentTab: 'upload'
                  });
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("svg", {
                  width: 14,
                  height: 14,
                  viewBox: "0 0 14 14",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                    d: "M3.668 10.09a2.7 2.7 0 01-1.779-.662 2.563 2.563 0 01-.394-3.457 2.67 2.67 0 011.587-1.03 3.199 3.199 0 01.46-2.452 3.334 3.334 0 012.1-1.417 3.395 3.395 0 012.508.45 3.26 3.26 0 011.448 2.053h.067c.826 0 1.623.299 2.236.84a3.205 3.205 0 01.45 4.35 3.34 3.34 0 01-2.02 1.26M9 8.137l-2-1.954m0 0L5.002 8.136M7 6.182V13",
                    stroke: "#136ACD",
                    strokeWidth: 1.5,
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                }), "Upload"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("button", {
                className: 'pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white ' + (this.state.currentTab == 'gallery' ? 'pi-bg-blue pi-color-white' : ''),
                onClick: function onClick(e) {
                  e.preventDefault();

                  _this2.setState({
                    currentTab: 'gallery'
                  });
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("svg", {
                  width: 12,
                  height: 12,
                  viewBox: "0 0 12 12",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z",
                    fill: "#18181B"
                  })
                }), "Gallery"]
              }), this.state.currentTab == 'upload' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                className: "pi-media-upload",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_dropzone__WEBPACK_IMPORTED_MODULE_12__["default"], {
                  newMedia: this.newMedia
                })
              }), this.state.currentTab == 'gallery' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                  className: "pi-media-gallery",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                    className: "row pi-gap pi-margin-l-r",
                    children: [this.state.preloader && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(block_preloader_table__WEBPACK_IMPORTED_MODULE_10__["default"], {}), !this.state.preloader && this.state.templates.map(function (row, index) {
                      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                        className: "col-12 col-md-6 col-lg-3",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
                          className: _this2.state.selectedItem.id == row.id ? 'pi-single-image-content pi-active' : 'pi-single-image-content',
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("img", {
                            src: row.src,
                            className: "pi-single-image"
                          }), _this2.state.selectedItem.id != row.id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                            className: "pi-overflow-content",
                            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("a", {
                              className: "pi-btn pi-bg-blue pi-bg-hover-blue",
                              onClick: function onClick() {
                                return _this2.selectEntry(row);
                              },
                              children: "Select"
                            })
                          })]
                        })
                      }, index);
                    })]
                  }), this.state.totalPage > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)((react_paginate__WEBPACK_IMPORTED_MODULE_9___default()), {
                    previousLabel: "Prev",
                    nextLabel: "Next",
                    breakLabel: "...",
                    breakClassName: "break-me",
                    forcePage: this.state.currentPage - 1,
                    pageCount: this.state.totalPage,
                    marginPagesDisplayed: 2,
                    pageRangeDisplayed: 5,
                    onPageChange: this.handlePageClick,
                    containerClassName: "ncpi-pagination text-base mt-5 shadow",
                    activeClassName: "active"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                  className: "pi-footer-content pi-text-center",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("button", {
                    className: "pi-btn pi-bg-blue pi-bg-hover-blue",
                    onClick: function onClick(e) {
                      e.preventDefault();

                      _this2.insertMedia();
                    },
                    children: "Insert"
                  })
                })]
              })]
            })]
          })
        })
      });
    }
  }]);

  return Template;
}(react__WEBPACK_IMPORTED_MODULE_8__.Component);



/***/ }),

/***/ "./src/admin/js/react/hoc/Api.js":
/*!***************************************!*\
  !*** ./src/admin/js/react/hoc/Api.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var api_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! api/helper */ "./src/admin/js/react/api/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var Api = function Api(Inner) {
  var mod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var url = api_helper__WEBPACK_IMPORTED_MODULE_9__.apiUrl + mod;

  var apiWrap = /*#__PURE__*/function (_Component) {
    (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(apiWrap, _Component);

    var _super = _createSuper(apiWrap);

    function apiWrap(props) {
      var _this;

      (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, apiWrap);

      _this = _super.call(this, props);

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "getAll", function () {
        var nUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        if (nUrl) {
          url = api_helper__WEBPACK_IMPORTED_MODULE_9__.apiUrl + nUrl;
        }

        return axios__WEBPACK_IMPORTED_MODULE_8___default().get("".concat(url, "/?").concat(args));
      });

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "get", function () {
        var nUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var id = arguments.length > 1 ? arguments[1] : undefined;

        if (nUrl) {
          url = api_helper__WEBPACK_IMPORTED_MODULE_9__.apiUrl + nUrl;
        }

        return axios__WEBPACK_IMPORTED_MODULE_8___default().get("".concat(url, "/").concat(id));
      });

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "create", function () {
        var nUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var data = arguments.length > 1 ? arguments[1] : undefined;

        if (nUrl) {
          url = api_helper__WEBPACK_IMPORTED_MODULE_9__.apiUrl + nUrl;
        }

        return axios__WEBPACK_IMPORTED_MODULE_8___default().post(url, data, api_helper__WEBPACK_IMPORTED_MODULE_9__.token);
      });

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "update", function () {
        var nUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var id = arguments.length > 1 ? arguments[1] : undefined;
        var data = arguments.length > 2 ? arguments[2] : undefined;

        if (nUrl) {
          url = api_helper__WEBPACK_IMPORTED_MODULE_9__.apiUrl + nUrl;
        }

        return axios__WEBPACK_IMPORTED_MODULE_8___default().put("".concat(url, "/").concat(id), data, api_helper__WEBPACK_IMPORTED_MODULE_9__.token);
      });

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "remove", function () {
        var nUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var id = arguments.length > 1 ? arguments[1] : undefined;

        if (nUrl) {
          url = api_helper__WEBPACK_IMPORTED_MODULE_9__.apiUrl + nUrl;
        }

        return axios__WEBPACK_IMPORTED_MODULE_8___default()["delete"]("".concat(url, "/").concat(id), api_helper__WEBPACK_IMPORTED_MODULE_9__.token);
      });

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "findByArg", function () {
        var nUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        if (nUrl) {
          url = api_helper__WEBPACK_IMPORTED_MODULE_9__.apiUrl + nUrl;
        }

        return axios__WEBPACK_IMPORTED_MODULE_8___default().get("".concat(url, "?title=").concat(title));
      });

      return _this;
    }

    (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(apiWrap, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Inner, _objectSpread(_objectSpread({}, this.props), {}, {
          getAll: this.getAll,
          get: this.get,
          create: this.create,
          update: this.update,
          remove: this.remove,
          findByArg: this.findByArg
        }));
      }
    }]);

    return apiWrap;
  }(react__WEBPACK_IMPORTED_MODULE_7__.Component);

  return apiWrap;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Api);

/***/ }),

/***/ "./src/admin/js/react/inv-template/index.js":
/*!**************************************************!*\
  !*** ./src/admin/js/react/inv-template/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Preview)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _scss_all_scoped_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scss/all.scoped.scss */ "./src/admin/js/react/inv-template/scss/all.scoped.scss");
/* harmony import */ var _scss_loading_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scss/loading.css */ "./src/admin/js/react/inv-template/scss/loading.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


var Template1 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_inv-template_template_1_js").then(__webpack_require__.bind(__webpack_require__, /*! ./template/1 */ "./src/admin/js/react/inv-template/template/1.js"));
});
var Template2 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_inv-template_template_2_js").then(__webpack_require__.bind(__webpack_require__, /*! ./template/2 */ "./src/admin/js/react/inv-template/template/2.js"));
});
var Template3 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_inv-template_template_3_js").then(__webpack_require__.bind(__webpack_require__, /*! ./template/3 */ "./src/admin/js/react/inv-template/template/3.js"));
});
var Template4 = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_inv-template_template_4_js").then(__webpack_require__.bind(__webpack_require__, /*! ./template/4 */ "./src/admin/js/react/inv-template/template/4.js"));
});
var Feedback = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_inv-template_Feedback_js").then(__webpack_require__.bind(__webpack_require__, /*! ./Feedback */ "./src/admin/js/react/inv-template/Feedback.js"));
});






var Preview = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Preview, _Component);

  var _super = _createSuper(Preview);

  function Preview(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Preview);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "isPreviewLoaded", function () {
      if (_this.props.isPreviewLoaded) {
        _this.props.isPreviewLoaded();
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "updateDimensions", function () {
      if (_this.props.isPreviewLoaded) {
        _this.props.isPreviewLoaded();
      }
    });

    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Preview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }
  }, {
    key: "render",
    value: function render() {
      var id = this.props.data.invoice.template;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react__WEBPACK_IMPORTED_MODULE_7__.Suspense, {
        fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "pi-preloader",
          style: {
            padding: 0
          }
        }),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Feedback, {
            status: this.props.data.status
          }), id == 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Template1, _objectSpread(_objectSpread({}, this.props), {}, {
            height: this.props.height,
            isPreviewLoaded: this.isPreviewLoaded
          })), id == 2 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Template2, _objectSpread(_objectSpread({}, this.props), {}, {
            height: this.props.height,
            isPreviewLoaded: this.isPreviewLoaded
          })), id == 3 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Template3, _objectSpread(_objectSpread({}, this.props), {}, {
            height: this.props.height,
            isPreviewLoaded: this.isPreviewLoaded
          })), id == 4 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Template4, _objectSpread(_objectSpread({}, this.props), {}, {
            height: this.props.height,
            isPreviewLoaded: this.isPreviewLoaded
          }))]
        })
      });
    }
  }]);

  return Preview;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./src/admin/js/react/components/media/style.css":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./src/admin/js/react/components/media/style.css ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".pi-dropzone {\r\n    background: #edf2f7;\r\n    padding: 20px 40px;\r\n    text-align: center;\r\n    border-radius: 8px;\r\n    margin-top: 20px; \r\n}\r\n.pi-dropzone p {\r\n    font-size: 14px !important;\r\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./src/admin/js/react/inv-template/scss/loading.css":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./src/admin/js/react/inv-template/scss/loading.css ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/admin/js/react/components/invoice/single/style.scoped.scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/admin/js/react/components/invoice/single/style.scoped.scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ncpi .pi-invoice-single-btn .pi-btn {\n  border-radius: 5px;\n  z-index: 10;\n  position: relative;\n}\n\n.ncpi .pi-single-tab-content .pi-page-title {\n  margin-bottom: 55px;\n}\n\n@media screen and (max-width: 992px) {\n  .ncpi .pi-single-tab-content .pi-page-title {\n    margin-bottom: 30px;\n    margin-top: 50px;\n  }\n}\n.ncpi .pi-single-image-content {\n  position: relative;\n}\n\n.ncpi .pi-single-image {\n  opacity: 1;\n  display: block;\n  width: 100%;\n  height: auto;\n  transition: 0.5s ease;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  border-radius: 15px !important;\n  border: 1px solid var(--pi-border-color-gray);\n}\n\n.ncpi .pi-single-image.pi-active {\n  border: 5px solid var(--pi-bg-color-blue);\n  border-radius: 15px;\n}\n\n.ncpi .pi-overflow-content {\n  transition: 0.5s ease;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  text-align: center;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(10, 10, 10, 0.2784313725);\n  border-radius: 15px;\n}\n\n.ncpi .pi-single-image-content:hover .pi-single-image {\n  opacity: 0.3;\n}\n\n.ncpi .pi-single-image-content:hover .pi-active {\n  opacity: 1 !important;\n}\n\n.ncpi .pi-single-image-content:hover .pi-overflow-content {\n  opacity: 1;\n}\n\n.ncpi .pi-single-image-content a {\n  transform: translateY(-113%);\n  display: block;\n  width: 130px;\n  margin: auto;\n  top: 50%;\n  position: relative;\n  padding: 10px 15px;\n  font-size: 14px;\n  font-weight: 500;\n  border-radius: 5px;\n}\n\n.ncpi .pi-single-image-content .pi-bg-hover-blue:hover {\n  background-color: #4e6de9 !important;\n  color: var(--pi-bg-color-white);\n}\n\n.ncpi .pi-single-image-content a:last-child {\n  background-color: var(--pi-bg-color-white) !important;\n  color: #2D3748;\n  margin-top: 10px;\n}\n\n.ncpi .pi-invoice-tab-content .pi-modal-content {\n  margin: 75px auto;\n}\n\n.ncpi .pi-info-content {\n  padding: 35px 30px;\n  border-radius: 8px;\n}\n\n@media screen and (max-width: 550px) {\n  .ncpi .pi-info-content {\n    padding: 20px 15px;\n  }\n}\n.ncpi .pi-add-info-content {\n  margin-bottom: 20px;\n}\n\n.ncpi .pi-add-info-content h3 {\n  font-size: 24px;\n  font-weight: 700;\n  margin-bottom: 5px;\n}\n\n.ncpi .pi-add-info-content .pi-info-content {\n  padding: 30px 45px 45px;\n  border-radius: 20px;\n}\n\n@media screen and (max-width: 550px) {\n  .ncpi .pi-add-info-content .pi-info-lavel {\n    width: 120px;\n  }\n}\n.ncpi .pi-add-info-content input[type=number],\n.ncpi .pi-add-info-content input[type=text] {\n  padding: 12px 6px !important;\n  border: 1px solid var(--pi-border-color-gray);\n  border-radius: 4px;\n  font-size: 10px;\n}\n\n.ncpi .pi-add-info-content label {\n  padding: 9px 12px 12px 0;\n  display: inline-block;\n  font-size: 12px;\n  color: #4A5568;\n  margin-bottom: 0;\n}\n\n.ncpi .pi-add-info-content .pi-info-input-field {\n  position: relative;\n  width: 135px;\n}\n\n.ncpi .pi-add-info-content .pi-info-input-field .pi-calendar {\n  position: absolute;\n  top: 1px;\n  right: 1px;\n  padding: 10px 7px;\n  border-left: 1px solid var(--pi-border-color-gray);\n  cursor: pointer;\n  text-align: center;\n  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8FA 100%);\n  display: flex;\n  align-items: center;\n  border-radius: 0 5px 5px 0;\n}\n\n@media screen and (max-width: 550px) {\n  .ncpi .pi-add-info-content .pi-info-input-field .pi-calendar {\n    padding: 8px 7px;\n  }\n}\n.ncpi .pi-add-info-content .pi-info-form-list {\n  display: flex;\n  margin-bottom: 10px;\n  justify-content: right;\n}\n\n@media screen and (max-width: 550px) {\n  .ncpi .pi-add-info-content .pi-info-form-list {\n    justify-content: center;\n  }\n}\n.ncpi .pi-info-logo {\n  position: relative;\n  top: 50%;\n  transform: translatey(-49%);\n}\n\n.ncpi .pi-info-logo .pi-upload {\n  font-weight: 500;\n  border: 1px dashed #718096;\n  text-align: center;\n  width: 130px;\n  height: 130px;\n  border-radius: 20px;\n  padding-top: 28px;\n  background: #FAFAFA;\n  overflow: hidden;\n}\n\n@media screen and (max-width: 550px) {\n  .ncpi .pi-info-logo .pi-upload {\n    width: 135px;\n  }\n}\n.ncpi .pi-info-logo .pi-upload p {\n  font-size: 14px;\n  color: #718096;\n  font-weight: 500;\n  margin-top: 5px;\n}\n\n.ncpi .pi-info-logo input[type=file] {\n  position: absolute;\n  cursor: pointer;\n  opacity: 0;\n  padding: 50px;\n  top: 0;\n  left: 0;\n  width: 130px;\n  height: 130px;\n}\n\n@media screen and (max-width: 550px) {\n  .ncpi .pi-info-content .pi-info-logo {\n    display: flex;\n    justify-content: center;\n    margin-bottom: 50px;\n  }\n}\n@media screen and (max-width: 500px) {\n  .ncpi .pi-add-info-content {\n    padding: 25px 25px;\n  }\n}\n.ncpi .pi-from-content {\n  padding: 40px 35px 35px;\n  background: rgba(231, 236, 254, 0.26);\n  border-radius: 10px;\n}\n\n.ncpi .pi-from-content .pi-to {\n  margin-left: auto;\n}\n\n.ncpi .pi-from-content .pi-from-to-content {\n  display: flex;\n  justify-content: space-between;\n}\n\n.ncpi .pi-from-content .pi-from-to {\n  max-width: 310px;\n}\n\n.ncpi .pi-from-content .pi-from-to label {\n  font-size: 14px;\n  display: block;\n  margin-top: 0;\n  margin-bottom: 15px;\n  font-weight: 500;\n}\n\n.ncpi .pi-from-content .pi-from-to .pi-sendlist {\n  display: flex;\n  justify-content: right;\n  align-items: center;\n}\n\n.ncpi .pi-from-content .pi-from-to .pi-sendlist .pi-list {\n  cursor: pointer;\n  padding: 10px 15px;\n  position: relative;\n  color: #4A5568;\n  left: -10px;\n  margin-top: -15px;\n}\n\n.ncpi .pi-from-content .pi-from-to .pi-sendlist .pi-list svg {\n  margin-top: 6px;\n  float: right;\n  position: absolute;\n  margin-left: 15px;\n}\n\n.ncpi .pi-from-content .pi-title-small {\n  font-weight: 700;\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n\n.ncpi .pi-from-content .pi-title-small span {\n  float: right;\n  cursor: pointer;\n  margin-top: -2px;\n}\n\n.ncpi .pi-from-content .pi-from {\n  padding: 16px 15px 20px 20px;\n  border-radius: 8px;\n  border: 1px solid #CBD5E0;\n}\n\n.ncpi .pi-from-content .pi-dropdown-content {\n  top: 25px;\n  right: -20px;\n  box-shadow: none;\n  border: 1px solid rgba(221, 221, 221, 0.6588235294);\n  text-align: left;\n}\n\n.ncpi .pi-from-content .pi-dropdown-content a:hover {\n  color: #4c6fff;\n}\n\n.ncpi .pi-from-content .pi-dropdown-content a {\n  color: #4A5568;\n}\n\n.ncpi .pi-from-content address {\n  font-size: 14px;\n  font-style: normal;\n  line-height: 20px;\n  color: #718096;\n  margin-bottom: 0;\n}\n\n.pi-border-right {\n  position: relative;\n}\n\n.pi-border-right:before {\n  content: \"\";\n  height: 100%;\n  width: 1px;\n  position: absolute;\n  left: 50%;\n  border: 1px dashed #CBD5E0;\n  top: 0px;\n}\n\n@media screen and (max-width: 550px) {\n  .pi-border-right:before {\n    border: 0;\n  }\n}\n@media screen and (max-width: 550px) {\n  .pi-to,\n.pi-from-to {\n    max-width: 100% !important;\n    float: none !important;\n  }\n  .pi-to {\n    margin-top: 20px;\n  }\n  .pi-from-content {\n    padding: 20px 15px !important;\n  }\n}\n.ncpi .pi-inv-sections .pi-group-input {\n  position: relative;\n}\n\n.ncpi .pi-inv-sections .pi-group-input label {\n  font-size: 14px;\n  font-weight: 600;\n  color: #2D3748;\n}\n\n.ncpi .pi-inv-sections .pi-group-input label svg {\n  margin-left: 5px;\n  cursor: pointer;\n  color: #2D3748;\n  top: 4px;\n  position: relative;\n}\n\n.ncpi .pi-inv-sections .pi-group-input textarea {\n  margin-bottom: 25px;\n  color: #718096;\n  font-size: 12px;\n}\n\n.ncpi .pi-inv-sections .pi-group-input .pi-field-label .pi-close-icon {\n  position: absolute;\n  right: 0px;\n  top: 0%;\n  padding: 5px 10px;\n  cursor: pointer;\n}\n\n.ncpi .pi-inv-sections .pi-group-input input {\n  width: 50%;\n  font-weight: 600;\n  margin-bottom: 10px;\n}\n\n.ncpi .pi-inv-sections .pi-group-input input::-moz-placeholder {\n  color: #2D3748 !important;\n  font-weight: 600;\n}\n\n.ncpi .pi-inv-sections .pi-group-input input:-ms-input-placeholder {\n  color: #2D3748 !important;\n  font-weight: 600;\n}\n\n.ncpi .pi-inv-sections .pi-group-input input::placeholder {\n  color: #2D3748 !important;\n  font-weight: 600;\n}\n\n.ncpi .pi-right-sidebar h2.pi-title-medium {\n  margin-bottom: 15px;\n  margin-top: 80px;\n  font-size: 20px;\n  color: #4A5568;\n}\n\n.ncpi .pi-right-sidebar .pi-invoice-image {\n  border: 1px solid #718096;\n  border-radius: 10px;\n  width: 100%;\n}\n\n.ncpi .pi-right-content {\n  background-color: #f1f1f7;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/admin/js/react/inv-template/scss/all.scoped.scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/admin/js/react/inv-template/scss/all.scoped.scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --pi-inv-secondary: #4c6fff;\n  --pi-inv-text-primary: #000000;\n  --pi-inv-text-secondary: #1a202c;\n  --pi-inv-text-3th: #2d3748;\n  --pi-inv-text-4th: #31343d;\n  --pi-inv-text-5th: #4a5568;\n  --pi-inv-white: #fff;\n  --pi-inv-medium: 16px;\n  --pi-inv-small: 12px;\n  --pi-inv-primary: #4c6fff;\n  --pi-inv-odd: #f7fafc;\n  --pi-inv-even: #edf2f7;\n}\n\n.pi-inv {\n  width: 794px;\n  height: 1120px;\n  overflow: hidden;\n  margin: 0 auto;\n  background-color: var(--pi-inv-white);\n  position: relative;\n  /* ==== invoece to address */\n  /* pi-banking wrap */\n}\n\n.pi-inv a {\n  text-decoration: none;\n  color: inherit;\n}\n\n.pi-inv * {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n.pi-inv .pi-hedear {\n  display: flex;\n  justify-content: space-between;\n}\n\n.pi-inv .pi-from {\n  width: 45%;\n}\n\n.pi-inv .pi-from address {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: 600;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n  color: var(--pi-inv-text-4th);\n  margin-bottom: 15px;\n  margin-top: 18px;\n}\n\n.pi-inv .pi-from address span,\n.pi-inv .pi-from address a {\n  font-weight: 500;\n}\n\n.pi-inv .pi-from-date p {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: 600;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n}\n\n.pi-inv .pi-from-date p span {\n  font-weight: 400;\n}\n\n.pi-inv .pi-from-time {\n  display: flex;\n  -moz-column-gap: 18px;\n  column-gap: 18px;\n}\n\n.pi-inv .pi-inv-title h2 {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 30px;\n  line-height: 100%;\n  color: var(--pi-inv-text-4th);\n  margin-bottom: 18px;\n  text-transform: uppercase;\n}\n\n.pi-inv .pi-to {\n  width: 35%;\n}\n\n.pi-inv .pi-to p {\n  font-style: normal;\n  font-weight: 500;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n  color: var(--pi-inv-text-3th);\n  font-family: Inter;\n  letter-spacing: 0.07px;\n}\n\n.pi-inv .pi-to h6 {\n  font-style: normal;\n  font-weight: bold;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n  color: var(--pi-inv-text-3th);\n  font-family: Inter;\n  letter-spacing: 0.07px;\n}\n\n.pi-inv .pi-to address {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: 600;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n  color: var(--pi-inv-text-3th);\n  margin-top: 5px;\n}\n\n.pi-inv .pi-to address p,\n.pi-inv .pi-to address a,\n.pi-inv .pi-to address span {\n  font-weight: 400;\n  margin-top: -5px;\n}\n\n.pi-inv .pi-items-table table {\n  border-spacing: 0;\n  width: 100%;\n  margin-top: 30px;\n  margin-bottom: 24px;\n}\n\n.pi-inv .pi-items-table table thead th {\n  color: var(--pi-inv-white);\n  padding: 10px 35px;\n  font-family: Inter;\n  font-style: normal;\n  font-weight: 600;\n  font-size: var(--pi-inv-small);\n  line-height: 140%;\n  text-align: left;\n}\n\n.pi-inv .pi-items-table table td {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: 600;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n  padding: 10px 0px 10px 35px;\n  color: var(--pi-inv-text-3th);\n}\n\n.pi-inv .pi-items-table table td span {\n  color: var(--pi-inv-text-5th);\n  font-weight: 400;\n}\n\n.pi-inv .pi-items-table table tr th:first-child {\n  padding: 10px 0px 10px 20px;\n}\n\n.pi-inv .pi-items-table table tr td:first-child {\n  padding: 10px 0px 10px 20px;\n}\n\n.pi-inv .pi-bank-info {\n  display: flex;\n  justify-content: space-between;\n  -moz-column-gap: 30px;\n  column-gap: 30px;\n  margin-bottom: 15px;\n}\n\n.pi-inv .pi-bank-info h4 {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: bold;\n  font-size: var(--pi-inv-medium);\n  line-height: 140%;\n  color: #1a202c;\n}\n\n.pi-inv .pi-bank-info table {\n  margin-top: 10px;\n}\n\n.pi-inv .pi-bank-info table th {\n  text-align: left;\n  padding-right: 20px;\n  padding-left: 0;\n  font-family: Inter;\n  font-style: normal;\n  font-weight: 600;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n  color: var(--pi-inv-text-primary);\n  padding-bottom: 4px;\n}\n\n.pi-inv .pi-bank-info table td {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: normal;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n  color: var(--pi-inv-text-primary);\n  text-align: left;\n  padding-bottom: 4px;\n}\n\n.pi-inv .pi-amounting table {\n  border-spacing: 0;\n  width: 210px;\n}\n\n.pi-inv .pi-amounting table tr.pi-before-total th {\n  padding-bottom: 10px;\n}\n\n.pi-inv .pi-amounting table th {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: bold;\n  font-size: var(--pi-inv-medium);\n  line-height: 140%;\n  color: var(--pi-inv-text-primary);\n  padding-left: 28px;\n}\n\n.pi-inv .pi-amounting .pi-table-bg th {\n  color: var(--pi-inv-white);\n  padding: 6px;\n  padding-left: 28px;\n  padding-right: 10px;\n}\n\n.pi-inv .pi-amounting .pi-table-bg td {\n  color: var(--pi-inv-white);\n  line-height: 140%;\n}\n\n.pi-inv .pi-note-wrap {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n}\n\n.pi-inv .pi-terms h4 {\n  margin-top: 10px;\n  font-style: normal;\n  font-weight: bold;\n  font-size: var(--pi-inv-medium);\n  line-height: 150%;\n  color: var(--pi-inv-text-secondary);\n}\n\n.pi-inv .pi-terms ul {\n  list-style-type: dot;\n}\n\n.pi-inv .pi-terms ul li {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: normal;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n  color: var(--pi-inv-text-5th);\n  margin-left: 15px;\n}\n\n.pi-inv .mt-35 {\n  margin-top: 35px;\n}\n\n.pi-inv .pi-note h4 {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: bold;\n  font-size: var(--pi-inv-medium);\n  line-height: 150%;\n  color: var(--pi-inv-text-secondary);\n}\n\n.pi-inv .pi-note p {\n  font-family: Inter;\n  font-style: normal;\n  font-weight: normal;\n  font-size: var(--pi-inv-small);\n  line-height: 150%;\n  color: var(--pi-inv-text-5th);\n}\n\n.pi-inv .pi-sign {\n  text-align: center;\n  margin-right: 60px;\n}\n\n.pi-inv .pi-sign h4 {\n  font-style: normal;\n  font-weight: bold;\n  font-size: var(--pi-inv-medium);\n  line-height: 150%;\n  color: var(--pi-inv-text-secondary);\n}\n\n.pi-inv .pi-border {\n  border: 0.5px solid #a0aec0;\n  margin: 0 -30px;\n  margin-top: 8px;\n}\n\n@media screen and (max-width: 500px) {\n  .pi-inv .pi-body {\n    margin: 0 15px;\n  }\n}\n.ncpi .pi-page-content {\n  max-width: 30%;\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.ncpi .pi-page-content p {\n  font-size: 24px;\n  font-weight: 600;\n  line-height: 40px;\n  color: #4A5568;\n}\n\n.ncpi .pi-badge-border {\n  border: 1px solid var(--text-color-red);\n  padding: 5px;\n  border-radius: 17px;\n  margin-bottom: 30px;\n  margin-top: 15px;\n}\n\n.ncpi .pi-badge-border.pi-green-color {\n  border: 1px solid var(--text-color-green);\n}\n\n.ncpi .pi-badge-border.pi-green-color .pi-badge-style-one {\n  border: 1px dashed var(--text-color-green);\n}\n\n.ncpi .pi-badge-style-one {\n  padding: 15px;\n  border: 1px dashed var(--text-color-red);\n  border-radius: 12px;\n  text-align: center;\n}\n\n.ncpi .pi-badge-style-one h4 {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-color-red);\n  border-bottom: 2px solid var(--text-color-red);\n}\n\n.ncpi .pi-badge-style-one p {\n  font-size: 12px;\n  margin-top: 5px;\n  line-height: 15px;\n  color: var(--text-color-red);\n}\n\n.ncpi .pi-green-color h4 {\n  font-size: 14px;\n  font-weight: 700;\n  color: #00A74D;\n  border-bottom: 2px solid #00A74D;\n}\n\n.ncpi .pi-green-color p {\n  color: #00A74D;\n}\n\n.ncpi .pi-badge-style-two {\n  padding: 8px 50px;\n  border: 1px solid var(--border-color-gray);\n  margin-bottom: 10px;\n}\n\n.ncpi .pi-badge-style-two h4 {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--text-color-red);\n}\n\n.ncpi .pi-badge-style-two p {\n  font-size: 12px;\n  margin-top: 0px;\n  color: #2D3748;\n  line-height: 15px;\n}\n\n.pi-inv .pi-sign img {\n  max-width: 190px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/file-selector/dist/es5/file-selector.js":
/*!**************************************************************!*\
  !*** ./node_modules/file-selector/dist/es5/file-selector.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromEvent": () => (/* binding */ fromEvent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file */ "./node_modules/file-selector/dist/es5/file.js");


var FILES_TO_IGNORE = [
    // Thumbnail cache files for macOS and Windows
    '.DS_Store',
    'Thumbs.db' // Windows
];
/**
 * Convert a DragEvent's DataTrasfer object to a list of File objects
 * NOTE: If some of the items are folders,
 * everything will be flattened and placed in the same list but the paths will be kept as a {path} property.
 *
 * EXPERIMENTAL: A list of https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle objects can also be passed as an arg
 * and a list of File objects will be returned.
 *
 * @param evt
 */
function fromEvent(evt) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
            if (isObject(evt) && isDataTransfer(evt)) {
                return [2 /*return*/, getDataTransferFiles(evt.dataTransfer, evt.type)];
            }
            else if (isChangeEvt(evt)) {
                return [2 /*return*/, getInputFiles(evt)];
            }
            else if (Array.isArray(evt) && evt.every(function (item) { return 'getFile' in item && typeof item.getFile === 'function'; })) {
                return [2 /*return*/, getFsHandleFiles(evt)];
            }
            return [2 /*return*/, []];
        });
    });
}
function isDataTransfer(value) {
    return isObject(value.dataTransfer);
}
function isChangeEvt(value) {
    return isObject(value) && isObject(value.target);
}
function isObject(v) {
    return typeof v === 'object' && v !== null;
}
function getInputFiles(evt) {
    return fromList(evt.target.files).map(function (file) { return (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file); });
}
// Ee expect each handle to be https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle
function getFsHandleFiles(handles) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
        var files;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(handles.map(function (h) { return h.getFile(); }))];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, files.map(function (file) { return (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file); })];
            }
        });
    });
}
function getDataTransferFiles(dt, type) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
        var items, files;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (dt === null) {
                        return [2 /*return*/, []];
                    }
                    if (!dt.items) return [3 /*break*/, 2];
                    items = fromList(dt.items)
                        .filter(function (item) { return item.kind === 'file'; });
                    // According to https://html.spec.whatwg.org/multipage/dnd.html#dndevents,
                    // only 'dragstart' and 'drop' has access to the data (source node)
                    if (type !== 'drop') {
                        return [2 /*return*/, items];
                    }
                    return [4 /*yield*/, Promise.all(items.map(toFilePromises))];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, noIgnoredFiles(flatten(files))];
                case 2: return [2 /*return*/, noIgnoredFiles(fromList(dt.files)
                        .map(function (file) { return (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file); }))];
            }
        });
    });
}
function noIgnoredFiles(files) {
    return files.filter(function (file) { return FILES_TO_IGNORE.indexOf(file.name) === -1; });
}
// IE11 does not support Array.from()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Browser_compatibility
// https://developer.mozilla.org/en-US/docs/Web/API/FileList
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList
function fromList(items) {
    if (items === null) {
        return [];
    }
    var files = [];
    // tslint:disable: prefer-for-of
    for (var i = 0; i < items.length; i++) {
        var file = items[i];
        files.push(file);
    }
    return files;
}
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem
function toFilePromises(item) {
    if (typeof item.webkitGetAsEntry !== 'function') {
        return fromDataTransferItem(item);
    }
    var entry = item.webkitGetAsEntry();
    // Safari supports dropping an image node from a different window and can be retrieved using
    // the DataTransferItem.getAsFile() API
    // NOTE: FileSystemEntry.file() throws if trying to get the file
    if (entry && entry.isDirectory) {
        return fromDirEntry(entry);
    }
    return fromDataTransferItem(item);
}
function flatten(items) {
    return items.reduce(function (acc, files) { return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spread)(acc, (Array.isArray(files) ? flatten(files) : [files])); }, []);
}
function fromDataTransferItem(item) {
    var file = item.getAsFile();
    if (!file) {
        return Promise.reject(item + " is not a File");
    }
    var fwp = (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file);
    return Promise.resolve(fwp);
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry
function fromEntry(entry) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
            return [2 /*return*/, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
        });
    });
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry
function fromDirEntry(entry) {
    var reader = entry.createReader();
    return new Promise(function (resolve, reject) {
        var entries = [];
        function readEntries() {
            var _this = this;
            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryEntry/createReader
            // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryReader/readEntries
            reader.readEntries(function (batch) { return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(_this, void 0, void 0, function () {
                var files, err_1, items;
                return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!batch.length) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Promise.all(entries)];
                        case 2:
                            files = _a.sent();
                            resolve(files);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            reject(err_1);
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            items = Promise.all(batch.map(fromEntry));
                            entries.push(items);
                            // Continue reading
                            readEntries();
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); }, function (err) {
                reject(err);
            });
        }
        readEntries();
    });
}
// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileEntry
function fromFileEntry(entry) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    entry.file(function (file) {
                        var fwp = (0,_file__WEBPACK_IMPORTED_MODULE_0__.toFileWithPath)(file, entry.fullPath);
                        resolve(fwp);
                    }, function (err) {
                        reject(err);
                    });
                })];
        });
    });
}
//# sourceMappingURL=file-selector.js.map

/***/ }),

/***/ "./node_modules/file-selector/dist/es5/file.js":
/*!*****************************************************!*\
  !*** ./node_modules/file-selector/dist/es5/file.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "COMMON_MIME_TYPES": () => (/* binding */ COMMON_MIME_TYPES),
/* harmony export */   "toFileWithPath": () => (/* binding */ toFileWithPath)
/* harmony export */ });
var COMMON_MIME_TYPES = new Map([
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    ['aac', 'audio/aac'],
    ['abw', 'application/x-abiword'],
    ['arc', 'application/x-freearc'],
    ['avif', 'image/avif'],
    ['avi', 'video/x-msvideo'],
    ['azw', 'application/vnd.amazon.ebook'],
    ['bin', 'application/octet-stream'],
    ['bmp', 'image/bmp'],
    ['bz', 'application/x-bzip'],
    ['bz2', 'application/x-bzip2'],
    ['cda', 'application/x-cdf'],
    ['csh', 'application/x-csh'],
    ['css', 'text/css'],
    ['csv', 'text/csv'],
    ['doc', 'application/msword'],
    ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['epub', 'application/epub+zip'],
    ['gz', 'application/gzip'],
    ['gif', 'image/gif'],
    ['heic', 'image/heic'],
    ['heif', 'image/heif'],
    ['htm', 'text/html'],
    ['html', 'text/html'],
    ['ico', 'image/vnd.microsoft.icon'],
    ['ics', 'text/calendar'],
    ['jar', 'application/java-archive'],
    ['jpeg', 'image/jpeg'],
    ['jpg', 'image/jpeg'],
    ['js', 'text/javascript'],
    ['json', 'application/json'],
    ['jsonld', 'application/ld+json'],
    ['mid', 'audio/midi'],
    ['midi', 'audio/midi'],
    ['mjs', 'text/javascript'],
    ['mp3', 'audio/mpeg'],
    ['mp4', 'video/mp4'],
    ['mpeg', 'video/mpeg'],
    ['mpkg', 'application/vnd.apple.installer+xml'],
    ['odp', 'application/vnd.oasis.opendocument.presentation'],
    ['ods', 'application/vnd.oasis.opendocument.spreadsheet'],
    ['odt', 'application/vnd.oasis.opendocument.text'],
    ['oga', 'audio/ogg'],
    ['ogv', 'video/ogg'],
    ['ogx', 'application/ogg'],
    ['opus', 'audio/opus'],
    ['otf', 'font/otf'],
    ['png', 'image/png'],
    ['pdf', 'application/pdf'],
    ['php', 'application/x-httpd-php'],
    ['ppt', 'application/vnd.ms-powerpoint'],
    ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    ['rar', 'application/vnd.rar'],
    ['rtf', 'application/rtf'],
    ['sh', 'application/x-sh'],
    ['svg', 'image/svg+xml'],
    ['swf', 'application/x-shockwave-flash'],
    ['tar', 'application/x-tar'],
    ['tif', 'image/tiff'],
    ['tiff', 'image/tiff'],
    ['ts', 'video/mp2t'],
    ['ttf', 'font/ttf'],
    ['txt', 'text/plain'],
    ['vsd', 'application/vnd.visio'],
    ['wav', 'audio/wav'],
    ['weba', 'audio/webm'],
    ['webm', 'video/webm'],
    ['webp', 'image/webp'],
    ['woff', 'font/woff'],
    ['woff2', 'font/woff2'],
    ['xhtml', 'application/xhtml+xml'],
    ['xls', 'application/vnd.ms-excel'],
    ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    ['xml', 'application/xml'],
    ['xul', 'application/vnd.mozilla.xul+xml'],
    ['zip', 'application/zip'],
    ['7z', 'application/x-7z-compressed'],
    // Others
    ['mkv', 'video/x-matroska'],
    ['mov', 'video/quicktime'],
    ['msg', 'application/vnd.ms-outlook']
]);
function toFileWithPath(file, path) {
    var f = withMimeType(file);
    if (typeof f.path !== 'string') { // on electron, path is already set to the absolute path
        var webkitRelativePath = file.webkitRelativePath;
        Object.defineProperty(f, 'path', {
            value: typeof path === 'string'
                ? path
                // If <input webkitdirectory> is set,
                // the File will have a {webkitRelativePath} property
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
                : typeof webkitRelativePath === 'string' && webkitRelativePath.length > 0
                    ? webkitRelativePath
                    : file.name,
            writable: false,
            configurable: false,
            enumerable: true
        });
    }
    return f;
}
function withMimeType(file) {
    var name = file.name;
    var hasExtension = name && name.lastIndexOf('.') !== -1;
    if (hasExtension && !file.type) {
        var ext = name.split('.')
            .pop().toLowerCase();
        var type = COMMON_MIME_TYPES.get(ext);
        if (type) {
            Object.defineProperty(file, 'type', {
                value: type,
                writable: false,
                configurable: false,
                enumerable: true
            });
        }
    }
    return file;
}
//# sourceMappingURL=file.js.map

/***/ }),

/***/ "./node_modules/file-selector/dist/es5/index.js":
/*!******************************************************!*\
  !*** ./node_modules/file-selector/dist/es5/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromEvent": () => (/* reexport safe */ _file_selector__WEBPACK_IMPORTED_MODULE_0__.fromEvent)
/* harmony export */ });
/* harmony import */ var _file_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-selector */ "./node_modules/file-selector/dist/es5/file-selector.js");

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/react-content-loader/dist/react-content-loader.es.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-content-loader/dist/react-content-loader.es.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BulletList": () => (/* binding */ ReactContentLoaderBulletList),
/* harmony export */   "Code": () => (/* binding */ ReactContentLoaderCode),
/* harmony export */   "Facebook": () => (/* binding */ ReactContentLoaderFacebook),
/* harmony export */   "Instagram": () => (/* binding */ ReactContentLoaderInstagram),
/* harmony export */   "List": () => (/* binding */ ReactContentLoaderListStyle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
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
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var uid = (function () {
    return Math.random()
        .toString(36)
        .substring(6);
});

var SVG = function (_a) {
    var animate = _a.animate, animateBegin = _a.animateBegin, backgroundColor = _a.backgroundColor, backgroundOpacity = _a.backgroundOpacity, baseUrl = _a.baseUrl, children = _a.children, foregroundColor = _a.foregroundColor, foregroundOpacity = _a.foregroundOpacity, gradientRatio = _a.gradientRatio, gradientDirection = _a.gradientDirection, uniqueKey = _a.uniqueKey, interval = _a.interval, rtl = _a.rtl, speed = _a.speed, style = _a.style, title = _a.title, beforeMask = _a.beforeMask, props = __rest(_a, ["animate", "animateBegin", "backgroundColor", "backgroundOpacity", "baseUrl", "children", "foregroundColor", "foregroundOpacity", "gradientRatio", "gradientDirection", "uniqueKey", "interval", "rtl", "speed", "style", "title", "beforeMask"]);
    var fixedId = uniqueKey || uid();
    var idClip = fixedId + "-diff";
    var idGradient = fixedId + "-animated-diff";
    var idAria = fixedId + "-aria";
    var rtlStyle = rtl ? { transform: 'scaleX(-1)' } : null;
    var keyTimes = "0; " + interval + "; 1";
    var dur = speed + "s";
    var gradientTransform = gradientDirection === 'top-bottom' ? 'rotate(90)' : undefined;
    return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", __assign({ "aria-labelledby": idAria, role: "img", style: __assign(__assign({}, style), rtlStyle) }, props),
        title ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("title", { id: idAria }, title) : null,
        beforeMask && (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(beforeMask) ? beforeMask : null,
        (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { role: "presentation", x: "0", y: "0", width: "100%", height: "100%", clipPath: "url(" + baseUrl + "#" + idClip + ")", style: { fill: "url(" + baseUrl + "#" + idGradient + ")" } }),
        (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null,
            (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("clipPath", { id: idClip }, children),
            (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", { id: idGradient, gradientTransform: gradientTransform },
                (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", { offset: "0%", stopColor: backgroundColor, stopOpacity: backgroundOpacity }, animate && ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("animate", { attributeName: "offset", values: -gradientRatio + "; " + -gradientRatio + "; 1", keyTimes: keyTimes, dur: dur, repeatCount: "indefinite", begin: animateBegin }))),
                (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", { offset: "50%", stopColor: foregroundColor, stopOpacity: foregroundOpacity }, animate && ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("animate", { attributeName: "offset", values: -gradientRatio / 2 + "; " + -gradientRatio / 2 + "; " + (1 +
                        gradientRatio / 2), keyTimes: keyTimes, dur: dur, repeatCount: "indefinite", begin: animateBegin }))),
                (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", { offset: "100%", stopColor: backgroundColor, stopOpacity: backgroundOpacity }, animate && ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("animate", { attributeName: "offset", values: "0; 0; " + (1 + gradientRatio), keyTimes: keyTimes, dur: dur, repeatCount: "indefinite", begin: animateBegin })))))));
};
SVG.defaultProps = {
    animate: true,
    backgroundColor: '#f5f6f7',
    backgroundOpacity: 1,
    baseUrl: '',
    foregroundColor: '#eee',
    foregroundOpacity: 1,
    gradientRatio: 2,
    gradientDirection: 'left-right',
    id: null,
    interval: 0.25,
    rtl: false,
    speed: 1.2,
    style: {},
    title: 'Loading...',
    beforeMask: null,
};

var ContentLoader = function (props) {
    return props.children ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SVG, __assign({}, props)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ReactContentLoaderFacebook, __assign({}, props));
};

var ReactContentLoaderFacebook = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 476 124" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "48", y: "8", width: "88", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "48", y: "26", width: "52", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "56", width: "410", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "72", width: "380", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "88", width: "178", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "20", cy: "20", r: "20" }))); };

var ReactContentLoaderInstagram = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 400 460" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "31", cy: "31", r: "15" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "58", y: "18", rx: "2", ry: "2", width: "140", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "58", y: "34", rx: "2", ry: "2", width: "140", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "60", rx: "2", ry: "2", width: "400", height: "400" }))); };

var ReactContentLoaderCode = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 340 84" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "0", width: "67", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "76", y: "0", width: "140", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "127", y: "48", width: "53", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "187", y: "48", width: "72", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "18", y: "48", width: "100", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "71", width: "37", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "18", y: "23", width: "140", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "166", y: "23", width: "173", height: "11", rx: "3" }))); };

var ReactContentLoaderListStyle = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 400 110" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "0", rx: "3", ry: "3", width: "250", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "20", y: "20", rx: "3", ry: "3", width: "220", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "20", y: "40", rx: "3", ry: "3", width: "170", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "60", rx: "3", ry: "3", width: "250", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "20", y: "80", rx: "3", ry: "3", width: "200", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "20", y: "100", rx: "3", ry: "3", width: "80", height: "10" }))); };

var ReactContentLoaderBulletList = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 245 125" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "10", cy: "20", r: "8" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "25", y: "15", rx: "5", ry: "5", width: "220", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "10", cy: "50", r: "8" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "25", y: "45", rx: "5", ry: "5", width: "220", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "10", cy: "80", r: "8" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "25", y: "75", rx: "5", ry: "5", width: "220", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "10", cy: "110", r: "8" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "25", y: "105", rx: "5", ry: "5", width: "220", height: "10" }))); };

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContentLoader);

//# sourceMappingURL=react-content-loader.es.js.map


/***/ }),

/***/ "./node_modules/react-country-region-selector/dist/rcrs.es.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-country-region-selector/dist/rcrs.es.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CountryDropdown": () => (/* binding */ CountryDropdown),
/* harmony export */   "CountryRegionData": () => (/* binding */ CountryRegionData),
/* harmony export */   "RegionDropdown": () => (/* binding */ RegionDropdown)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var CountryRegionData = [["Afghanistan","AF","Badakhshan~BDS|Badghis~BDG|Baghlan~BGL|Balkh~BAL|Bamyan~BAM|Daykundi~DAY|Farah~FRA|Faryab~FYB|Ghazni~GHA|Ghor~GHO|Helmand~HEL|Herat~HER|Jowzjan~JOW|Kabul~KAB|Kandahar~KAN|Kapisa~KAP|Khost~KHO|Kunar~KNR|Kunduz~KDZ|Laghman~LAG|Logar~LOW|Maidan Wardak~WAR|Nangarhar~NAN|Nimruz~NIM|Nuristan~NUR|Paktia~PIA|Paktika~PKA|Panjshir~PAN|Parwan~PAR|Samangan~SAM|Sar-e Pol~SAR|Takhar~TAK|Urozgan~ORU|Zabul~ZAB"],["Åland Islands","AX","Brändö~BR|Eckerö~EC|Finström~FN|Föglö~FG|Geta~GT|Hammarland~HM|Jomala~JM|Kumlinge~KM|Kökar~KK|Lemland~LE|Lumparland~LU|Mariehamn~MH|Saltvik~SV|Sottunga~ST|Sund~SD|Vårdö~VR"],["Albania","AL","Berat~01|Dibër~09|Durrës~02|Elbasan~03|Fier~04|Gjirokastër~05|Korçë~06|Kukës~07|Lezhë~08|Shkodër~10|Tirana~11|Vlorë~12"],["Algeria","DZ","Adrar~01|Aïn Defla~44|Aïn Témouchent~46|Algiers~16|Annaba~23|Batna~05|Béchar~08|Béjaïa~06|Biskra~07|Blida~09|Bordj Bou Arréridj~34|Bouïra~10|Boumerdès~35|Chlef~02|Constantine~25|Djelfa~17|El Bayadh~32|El Oued~39|El Tarf~36|Ghardaïa~47|Guelma~24|Illizi~33|Jijel~18|Khenchela~40|Laghouat~03|Mascara~29|Médéa~26|Mila~43|Mostaganem~27|Msila~28|Naâma~45|Oran~31|Ouargla~30|Oum el Bouaghi~04|Relizane~48|Saïda~20|Sétif~19|Sidi Bel Abbès~22|Skikda~21|Souk Ahras~41|Tamanghasset~11|Tébessa~12|Tiaret~14|Tindouf~37|Tipaza~42|Tissemsilt~38|Tizi Ouzou~15|Tlemcen~13"],["American Samoa","AS","Tutuila~01|Aunu'u~02|Ta'ū~03|Ofu‑Olosega~04|Rose Atoll~21|Swains Island~22"],["Andorra","AD","Andorra la Vella~07|Canillo~02|Encamp~03|Escaldes-Engordany~08|La Massana~04|Ordino~05|Sant Julià de Lòria~06"],["Angola","AO","Bengo~BGO|Benguela~BGU|Bié~BIE|Cabinda~CAB|Cuando Cubango~CCU|Cuanza Norte~CNO|Cuanza Sul~CUS|Cunene~CNN|Huambo~HUA|Huíla~HUI|Luanda~LUA|Lunda Norte~LNO|Lunda Sul~LSU|Malanje~MAL|Moxico~MOX|Namibe~NAM|Uíge~UIG|Zaire~ZAI"],["Anguilla","AI","Anguilla~01|Anguillita Island~02|Blowing Rock~03|Cove Cay~04|Crocus Cay~05|Deadman's Cay~06|Dog Island~07|East Cay~08|Little Island~09|Little Scrub Island~10|Mid Cay~11|North Cay~12|Prickly Pear Cays~13|Rabbit Island~14|Sandy Island/Sand Island~15|Scilly Cay~16|Scrub Island~17|Seal Island~18|Sombrero/Hat Island~19|South Cay~20|South Wager Island~21|West Cay~22"],["Antarctica","AQ","Antarctica~AQ"],["Antigua and Barbuda","AG","Antigua Island~01|Barbuda Island~02|Bird Island~04|Bishop Island~05|Blake Island~06|Crump Island~09|Dulcina Island~10|Exchange Island~11|Five Islands~12|Great Bird Island~13|Green Island~14|Guiana Island~15|Hawes Island~17|Hells Gate Island~16|Henry Island~18|Johnson Island~19|Kid Island~20|Lobster Island~22|Maiden Island~24|Moor Island~25|Nanny Island~26|Pelican Island~27|Prickly Pear Island~28|Rabbit Island~29|Red Head Island~31|Redonda Island~03|Sandy Island~32|Smith Island~33|The Sisters~34|Vernon Island~35|Wicked Will Island~36|York Island~37"],["Argentina","AR","Buenos Aires~B|Capital Federal~C|Catamarca~K|Chaco~H|Chubut~U|Córdoba~X|Corrientes~W|Entre Ríos~E|Formosa~P|Jujuy~Y|La Pampa~L|La Rioja~F|Mendoza~M|Misiones~N|Neuquén~Q|Río Negro~R|Salta~A|San Juan~J|San Luis~D|Santa Cruz~Z|Santa Fe~S|Santiago del Estero~G|Tierra del Fuego~V|Tucumán~T"],["Armenia","AM","Aragatsotn~AG|Ararat~AR|Armavir~AV|Gegharkunik~GR|Kotayk~KT|Lori~LO|Shirak~SH|Syunik~SU|Tavush~TV|Vayots Dzor~VD|Yerevan~ER"],["Aruba","AW","Aruba~AW"],["Australia","AU","Australian Capital Territory~ACT|New South Wales~NSW|Northern Territory~NT|Queensland~QLD|South Australia~SA|Tasmania~TAS|Victoria~VIC|Western Australia~WA"],["Austria","AT","Burgenland~1|Kärnten~2|Niederösterreich~3|Oberösterreich~4|Salzburg~5|Steiermark~6|Tirol~7|Vorarlberg~8|Wien~9"],["Azerbaijan","AZ","Abşeron~ABS|Ağcabədi~AGC|Ağdam~AGM|Ağdaş~AGS|Ağstafa~AGA|Ağsu~AGU|Astara~AST|Bakı~BAK|Babək~BAB|Balakən~BAL|Bərdə~BAR|Beyləqan~BEY|Biləsuvar~BIL|Cəbrayıl~CAB|Cəlilabad~CAL|Culfa~CUL|Daşkəsən~DAS|Füzuli~FUZ|Gədəbəy~GAD|Goranboy~GOR|Göyçay~GOY|Göygöl~GYG|Hacıqabul~HAC|İmişli~IMI|İsmayıllı~ISM|Kəlbəcər~KAL|Kǝngǝrli~KAN|Kürdəmir~KUR|Laçın~LAC|Lənkəran~LAN|Lerik~LER|Masallı~MAS|Neftçala~NEF|Oğuz~OGU|Ordubad~ORD|Qəbələ~QAB|Qax~QAX|Qazax~QAZ|Qobustan~QOB|Quba~QBA|Qubadli~QBI|Qusar~QUS|Saatlı~SAT|Sabirabad~SAB|Şabran~SBN|Sədərək~SAD|Şahbuz~SAH|Şəki~SAK|Salyan~SAL|Şamaxı~SMI|Şəmkir~SKR|Samux~SMX|Şərur~SAR|Siyəzən~SIY|Şuşa~SUS|Tərtər~TAR|Tovuz~TOV|Ucar~UCA|Xaçmaz~XAC|Xızı~XIZ|Xocalı~XCI|Xocavənd~XVD|Yardımlı~YAR|Yevlax~YEV|Zəngilan~ZAN|Zaqatala~ZAQ|Zərdab~ZAR"],["Bahamas","BS","Acklins Island~01|Berry Islands~22|Bimini~02|Black Point~23|Cat Island~03|Central Abaco~24|Crooked Island and Long Cay~28|East Grand Bahama~29|Exuma~04|Freeport~05|Fresh Creek~06|Governor's Harbour~07|Green Turtle Cay~08|Harbour Island~09|High Rock~10|Inagua~11|Kemps Bay~12|Long Island~13|Marsh Harbour~14|Mayaguana~15|Moore’s Island~40|New Providence~16|Nichollstown and Berry Islands~17|North Abaco~42|North Andros~41|North Eleuthera~33|Ragged Island~18|Rock Sound~19|San Salvador and Rum Cay~20|Sandy Point~21|South Abaco~35|South Andros~36|South Eleuthera~37|West Grand Bahama~39"],["Bahrain","BH","Al Janūbīyah~14|Al Manāmah~13|Al Muḩarraq~15|Al Wusţá~16|Ash Shamālīyah~17"],["Bangladesh","BD","Barisal~A|Chittagong~B|Dhaka~C|Khulna~D|Mymensingh~M|Rajshahi~E|Rangpur~F|Sylhet~G"],["Barbados","BB","Christ Church~01|Saint Andrew~02|Saint George~03|Saint James~04|Saint John~05|Saint Joseph~06|Saint Lucy~07|Saint Michael~08|Saint Peter~09|Saint Philip~10|Saint Thomas~11"],["Belarus","BY","Brest voblast~BR|Gorod Minsk~HM|Homiel voblast~HO|Hrodna voblast~HR|Mahilyow voblast~MA|Minsk voblast~MI|Vitsebsk voblast~VI"],["Belgium","BE","Brussels~BRU|Flanders~VLG|Wallonia~WAL"],["Belize","BZ","Belize District~BZ|Cayo District~CY|Corozal District~CZL|Orange Walk District~OW|Stann Creek District~SC|Toledo District~TOL"],["Benin","BJ","Alibori~AL|Atakora~AK|Atlantique~AQ|Borgou~BO|Collines Department~CO|Donga~DO|Kouffo~KO|Littoral Department~LI|Mono Department~MO|Ouémé~OU|Plateau~PL|Zou~ZO"],["Bermuda","BM","City of Hamilton~03|Devonshire Parish~01|Hamilton Parish~02|Paget Parish~04|Pembroke Parish~05|Sandys Parish~08|Smith's Parish~09|Southampton Parish~10|St. George's Parish~07|Town of St. George~06|Warwick Parish~11"],["Bhutan","BT","Bumthang~33|Chhukha~12|Dagana~22|Gasa~GA|Haa~13|Lhuntse~44|Mongar~42|Paro~11|Pemagatshel~43|Punakha~23|Samdrup Jongkhar~45|Samtse~14|Sarpang~31|Thimphu~15|Trashigang~41|Trashiyangtse~TY|Trongsa~32|Tsirang~21|Wangdue Phodrang~24|Zhemgang~34"],["Bolivia","BO","Beni~B|Chuquisaca~H|Cochabamba~C|La Paz~L|Oruro~O|Pando~N|Potosí~P|Santa Cruz~S|Tarija~T"],["Bonaire, Sint Eustatius and Saba","BQ","Bonaire~BO|Saba Isand~SA|Sint Eustatius~SE"],["Bosnia and Herzegovina","BA","Brčko Distrikt~BRC|Federacija Bosne i Hercegovine~BIH|Republika Srpska~SRP"],["Botswana","BW","Central~CE|Ghanzi~GH|Kgalagadi~KG|Kgatleng~KL|Kweneng~KW|North West~NW|North-East~NE|South East~SE|Southern~SO"],["Bouvet Island","BV","Bouvet Island~BV"],["Brazil","BR","Acre~AC|Alagoas~AL|Amapá~AP|Amazonas~AM|Bahia~BA|Ceará~CE|Distrito Federal~DF|Espírito Santo~ES|Goiás~GO|Maranhão~MA|Mato Grosso~MT|Mato Grosso do Sul~MS|Minas Gerais~MG|Pará~PA|Paraíba~PB|Paraná~PR|Pernambuco~PE|Piauí~PI|Rio de Janeiro~RJ|Rio Grande do Norte~RN|Rio Grande do Sul~RS|Rondônia~RO|Roraima~RR|Santa Catarina~SC|São Paulo~SP|Sergipe~SE|Tocantins~TO"],["British Indian Ocean Territory","IO","British Indian Ocean Territory~IO"],["Brunei Darussalam","BN","Belait~BE|Brunei Muara~BM|Temburong~TE|Tutong~TU"],["Bulgaria","BG","Blagoevgrad~01|Burgas~02|Dobrich~08|Gabrovo~07|Jambol~28|Khaskovo~26|Kjustendil~10|Kurdzhali~09|Lovech~11|Montana~12|Pazardzhik~13|Pernik~14|Pleven~15|Plovdiv~16|Razgrad~17|Ruse~18|Shumen~27|Silistra~19|Sliven~20|Smoljan~21|Sofija~23|Sofija-Grad~22|Stara Zagora~24|Turgovishhe~25|Varna~03|Veliko Turnovo~04|Vidin~05|Vraca~06"],["Burkina Faso","BF","Balé~BAL|Bam/Lake Bam~BAM|Banwa Province~BAN|Bazèga~BAZ|Bougouriba~BGR|Boulgou Province~BLG|Boulkiemdé~BLK|Comoé/Komoe~COM|Ganzourgou Province~GAN|Gnagna~GNA|Gourma Province~GOU|Houet~HOU|Ioba~IOB|Kadiogo~KAD|Kénédougou~KEN|Komondjari~KMD|Kompienga~KMP|Kossi Province~KOS|Koulpélogo~KOP|Kouritenga~KOT|Kourwéogo~KOW|Léraba~LER|Loroum~LOR|Mouhoun~MOU|Namentenga~NAM|Naouri/Nahouri~NAO|Nayala~NAY|Noumbiel~NOU|Oubritenga~OUB|Oudalan~OUD|Passoré~PAS|Poni~PON|Sanguié~SNG|Sanmatenga~SMT|Séno~SEN|Sissili~SIS|Soum~SOM|Sourou~SOR|Tapoa~TAP|Tui/Tuy~TUI|Yagha~YAG|Yatenga~YAT|Ziro~ZIR|Zondoma~ZON|Zoundwéogo~ZOU"],["Burundi","BI","Bubanza~BB|Bujumbura Mairie~BM|Bujumbura Rural~BL|Bururi~BR|Cankuzo~CA|Cibitoke~CI|Gitega~GI|Karuzi~KR|Kayanza~KY|Kirundo~KI|Makamba~MA|Muramvya~MU|Muyinga~MY|Mwaro~MW|Ngozi~NG|Rutana~RT|Ruyigi~RY"],["Cambodia","KH","Baat Dambang~2|Banteay Mean Chey~1|Kampong Chaam~3|Kampong Chhnang~4|Kampong Spueu~5|Kampong Thum~6|Kampot~7|Kandaal~8|Kaoh Kong~9|Kracheh~10|Krong Kaeb~23|Krong Pailin~24|Krong Preah Sihanouk~18|Mondol Kiri~11|Otdar Mean Chey~22|Phnom Penh~12|Pousaat~15|Preah Vihear~13|Prey Veaeng~14|Rotanah Kiri~16|Siem Reab~17|Stueng Treng~19|Svaay Rieng~20|Taakaev~21|Tbong Khmum~25"],["Cameroon","CM","Adamaoua~AD|Centre~CE|Est~ES|Extrême-Nord~EN|Littoral~LT|Nord~NO|Nord-Ouest~NW|Ouest~OU|Sud~SU|Sud-Ouest~SW"],["Canada","CA","Alberta~AB|British Columbia~BC|Manitoba~MB|New Brunswick~NB|Newfoundland and Labrador~NL|Northwest Territories~NT|Nova Scotia~NS|Nunavut~NU|Ontario~ON|Prince Edward Island~PE|Quebec~QC|Saskatchewan~SK|Yukon~YT"],["Cape Verde","CV","Boa Vista~BV|Brava~BR|Calheta de São Miguel~CS|Maio~MA|Mosteiros~MO|Paúl~PA|Porto Novo~PN|Praia~PR|Ribeira Brava~RB|Ribeira Grande~RG|Sal~SL|Santa Catarina~CA|Santa Cruz~CR|São Domingos~SD|São Filipe~SF|São Nicolau~SN|São Vicente~SV|Tarrafal~TA|Tarrafal de São Nicolau~TS"],["Cayman Islands","KY","Creek~undefined|Eastern~undefined|Midland~undefined|South Town~undefined|Spot Bay~undefined|Stake Bay~undefined|West End~undefined|Western~undefined"],["Central African Republic","CF","Bamingui-Bangoran~BB|Bangui~BGF|Basse-Kotto~BK|Haute-Kotto~HK|Haut-Mbomou~HM|Kémo~KG|Lobaye~LB|Mambéré-Kadéï~HS|Mbomou~MB|Nana-Grebizi~10|Nana-Mambéré~NM|Ombella-M'Poko~MP|Ouaka~UK|Ouham~AC|Ouham Péndé~OP|Sangha-Mbaéré~SE|Vakaga~VK"],["Chad","TD","Bahr el Ghazal~BG|Batha~BA|Borkou~BO|Chari-Baguirmi~CB|Ennedi-Est~EE|Ennedi-Ouest~EO|Guéra~GR|Hadjer Lamis~HL|Kanem~KA|Lac~LC|Logone Occidental~LO|Logone Oriental~LR|Mondoul~MA|Mayo-Kébbi-Est~ME|Moyen-Chari~MC|Ouaddai~OD|Salamat~SA|Sila~SI|Tandjilé~TA|Tibesti~TI|Ville de Ndjamena~ND|Wadi Fira~WF"],["Chile","CL","Aisén del General Carlos Ibáñez del Campo~AI|Antofagasta~AN|Araucanía~AR|Arica y Parinacota~AP|Atacama~AT|Bío-Bío~BI|Coquimbo~CO|Libertador General Bernardo O'Higgins~LI|Los Lagos~LL|Los Ríos~LR|Magallanes y Antartica Chilena~MA|Marga-Marga~|Maule~ML|Ñuble~NB|Región Metropolitana de Santiago~RM|Tarapacá~TA|Valparaíso~VS"],["China","CN","Anhui~AH|Beijing~BJ|Chongqing~CQ|Fujian~FJ|Gansu~GS|Guangdong~GD|Guangxi~GX|Guizhou~GZ|Hainan~HI|Hebei~HE|Heilongjiang~HL|Henan~HA|Hong Kong~HK|Hubei~HB|Hunan~HN|Inner Mongolia~NM|Jiangsu~JS|Jiangxi~JX|Jilin~JL|Liaoning~LN|Macau~MO|Ningxia~NX|Qinghai~QH|Shaanxi~SN|Shandong~SD|Shanghai~SH|Shanxi~SX|Sichuan~SC|Tianjin~TJ|Tibet~XZ|Xinjiang~XJ|Yunnan~YN|Zhejiang~ZJ"],["Christmas Island","CX","Christmas Island~CX"],["Cocos (Keeling) Islands","CC","Direction Island~DI|Home Island~HM|Horsburgh Island~HR|North Keeling Island~NK|South Island~SI|West Island~WI"],["Colombia","CO","Amazonas~AMA|Antioquia~ANT|Arauca~ARA|Archipiélago de San Andrés~SAP|Atlántico~ATL|Bogotá D.C.~DC|Bolívar~BOL|Boyacá~BOY|Caldas~CAL|Caquetá~CAQ|Casanare~CAS|Cauca~CAU|Cesar~CES|Chocó~CHO|Córdoba~COR|Cundinamarca~CUN|Guainía~GUA|Guaviare~GUV|Huila~HUI|La Guajira~LAG|Magdalena~MAG|Meta~MET|Nariño~NAR|Norte de Santander~NSA|Putumayo~PUT|Quindío~QUI|Risaralda~RIS|Santander~SAN|Sucre~SUC|Tolima~TOL|Valle del Cauca~VAC|Vaupés~VAU|Vichada~VID"],["Comoros","KM","Andjazîdja~G|Andjouân~A|Moûhîlî~M"],["Congo, Republic of the (Brazzaville)","CG","Bouenza~11|Brazzaville~BZV|Cuvette~8|Cuvette-Ouest~15|Kouilou~5|Lékoumou~2|Likouala~7|Niari~9|Plateaux~14|Pointe-Noire~16|Pool~12|Sangha~13"],["Congo, the Democratic Republic of the (Kinshasa)","CD","Bandundu~BN|Bas-Congo~BC|Équateur~EQ|Kasaï-Occidental~KE|Kasaï-Oriental~KW|Katanga~KA|Kinshasa~KN|Maniema~MA|Nord-Kivu~NK|Orientale~OR|Sud-Kivu~SK"],["Cook Islands","CK","Aitutaki~undefined|Atiu~undefined|Avarua~undefined|Mangaia~undefined|Manihiki~undefined|Ma'uke~undefined|Mitiaro~undefined|Nassau~undefined|Palmerston~undefined|Penrhyn~undefined|Pukapuka~undefined|Rakahanga~undefined"],["Costa Rica","CR","Alajuela~2|Cartago~3|Guanacaste~5|Heredia~4|Limón~7|Puntarenas~6|San José~1"],["Côte d'Ivoire, Republic of","CI","Agnéby~16|Bafing~17|Bas-Sassandra~09|Denguélé~10|Dix-Huit Montagnes~06|Fromager~18|Haut-Sassandra~02|Lacs~07|Lagunes~01|Marahoué~12|Moyen-Cavally~19|Moyen-Comoé~05|N'zi-Comoé~11|Savanes~03|Sud-Bandama~15|Sud-Comoé~13|Vallée du Bandama~04|Worodougou~14|Zanzan~08"],["Croatia","HR","Bjelovarsko-bilogorska županija~07|Brodsko-posavska županija~12|Dubrovačko-neretvanska županija~19|Grad Zagreb~21|Istarska županija~18|Karlovačka županija~04|Koprivničko-križevačka županija~06|Krapinsko-zagorska županija~02|Ličko-senjska županija~09|Međimurska županija~20|Osječko-baranjska županija~14|Požeško-slavonska županija~11|Primorsko-goranska županija~08|Sisačko-moslavačka županija~03|Splitsko-dalmatinska županija~17|Šibensko-kninska županija~15|Varaždinska županija~05|Virovitičko-podravska županija~10|Vukovarsko-srijemska županija~16|Zadarska županija~13|Zagrebačka županija~01"],["Cuba","CU","Artemisa~15|Camagüey~09|Ciego de Ávila~08|Cienfuegos~06|Granma~12|Guantánamo~14|Holguín~11|Isla de la Juventud~99|La Habana~03|Las Tunas~10|Matanzas~04|Mayabeque~16|Pinar del Río~01|Sancti Spíritus~07|Santiago de Cuba~13|Villa Clara~05"],["Curaçao","CW","Curaçao~CW"],["Cyprus","CY","Ammochostos~04|Keryneia~06|Larnaka~03|Lefkosia~01|Lemesos~02|Pafos~05"],["Czech Republic","CZ","Hlavní město Praha~PR|Jihočeský kraj~JC|Jihomoravský kraj~JM|Karlovarský kraj~KA|Královéhradecký kraj~KR|Liberecký kraj~LI|Moravskoslezský kraj~MO|Olomoucký kraj~OL|Pardubický kraj~PA|Plzeňský kraj~PL|Středočeský kraj~ST|Ústecký kraj~US|Vysočina~VY|Zlínský kraj~ZL"],["Denmark","DK","Hovedstaden~84|Kujalleq~GL-KU|Midtjylland~82|Norderøerne~FO-01|Nordjylland~81|Østerø~FO-06|Qaasuitsup~GL-QA|Qeqqata~GL-QE|Sandø~FO-02|Sermersooq~GL-SM|Sjælland~85|Strømø~FO-03|Suderø~FO-04|Syddanmark~83|Vågø~FO-05"],["Djibouti","DJ","Ali Sabieh~AS|Arta~AR|Dikhil~DI|Obock~OB|Tadjourah~TA"],["Dominica","DM","Saint Andrew Parish~02|Saint David Parish~03|Saint George Parish~04|Saint John Parish~05|Saint Joseph Parish~06|Saint Luke Parish~07|Saint Mark Parish~08|Saint Patrick Parish~09|Saint Paul Parish~10|Saint Peter Parish~11"],["Dominican Republic","DO","Cibao Central~02|Del Valle~37|Distrito Nacional~01|Enriquillo~38|Norcentral~04|Nordeste~33|Noroeste~34|Norte~35|Valdesia~42"],["Ecuador","EC","Azuay~A|Bolívar~B|Cañar~F|Carchi~C|Chimborazo~H|Cotopaxi~X|El Oro~O|Esmeraldas~E|Galápagos~W|Guayas~G|Imbabura~I|Loja~L|Los Ríos~R|Manabí~M|Morona-Santiago~S|Napo~N|Orellana~D|Pastaza~Y|Pichincha~P|Santa Elena~SE|Santo Domingo de los Tsáchilas~SD|Sucumbíos~U|Tungurahua~T|Zamora-Chinchipe~Z"],["Egypt","EG","Alexandria~ALX|Aswan~ASN|Asyout~AST|Bani Sueif~BNS|Beheira~BH|Cairo~C|Daqahlia~DK|Dumiat~DT|El Bahr El Ahmar~BA|El Ismailia~IS|El Suez~SUZ|El Wadi El Gedeed~WAD|Fayoum~FYM|Gharbia~GH|Giza~GZ|Helwan~HU|Kafr El Sheikh~KFS|Luxor~LX|Matrouh~MT|Menia~MN|Menofia~MNF|North Sinai~SIN|Port Said~PTS|Qalubia~KB|Qena~KN|Sharqia~SHR|Sixth of October~SU|Sohag~SHG|South Sinai~JS"],["El Salvador","SV","Ahuachapán~AH|Cabañas~CA|Cuscatlán~CU|Chalatenango~CH|La Libertad~LI|La Paz~PA|La Unión~UN|Morazán~MO|San Miguel~SM|San Salvador~SS|Santa Ana~SA|San Vicente~SV|Sonsonate~SO|Usulután~US"],["Equatorial Guinea","GQ","Annobón~AN|Bioko Norte~BN|Bioko Sur~BS|Centro Sur~CS|Kié-Ntem~KN|Litoral~LI|Wele-Nzas~WN"],["Eritrea","ER","Anseba~AN|Debub~DU|Debub-Keih-Bahri~DK|Gash-Barka~GB|Maekel~MA|Semien-Keih-Bahri~SK"],["Estonia","EE","Harjumaa (Tallinn)~37|Hiiumaa (Kardla)~39|Ida-Virumaa (Johvi)~44|Järvamaa (Paide)~41|Jõgevamaa (Jogeva)~49|Läänemaa~57|Lääne-Virumaa (Rakvere)~59|Pärnumaa (Parnu)~67|Põlvamaa (Polva)~65|Raplamaa (Rapla)~70|Saaremaa (Kuessaare)~74|Tartumaa (Tartu)~78|Valgamaa (Valga)~82|Viljandimaa (Viljandi)~84|Võrumaa (Voru)~86"],["Ethiopia","ET","Addis Ababa~AA|Afar~AF|Amhara~AM|Benshangul-Gumaz~BE|Dire Dawa~DD|Gambela~GA|Harari~HA|Oromia~OR|Somali~SO|Southern Nations Nationalities and People's Region~SN|Tigray~TI"],["Falkland Islands (Islas Malvinas)","FK","Falkland Islands (Islas Malvinas)~undefined"],["Faroe Islands","FO","Bordoy~undefined|Eysturoy~undefined|Mykines~undefined|Sandoy~undefined|Skuvoy~undefined|Streymoy~undefined|Suduroy~undefined|Tvoroyri~undefined|Vagar~undefined"],["Fiji","FJ","Ba~01|Bua~02|Cakaudrove~03|Kadavu~04|Lau~05|Lomaiviti~06|Macuata~07|Nadroga and Navosa~08|Naitasiri~09|Namosi~10|Ra~11|Rewa~12|Rotuma~R|Serua~13|Tailevu~14"],["Finland","FI","Ahvenanmaan maakunta~FI-01|Etelä-Karjala~FI-02|Etelä-Pohjanmaa~FI-03|Etelä-Savo~FI-04|Kainuu~FI-05|Kanta-Häme~FI-06|Keski-Pohjanmaa~FI-07|Keski-Suomi~FI-08|Kymenlaakso~FI-09|Lappi~FI-10|Pirkanmaa~FI-11|Pohjanmaa~FI-12|Pohjois-Karjala~FI-13|Pohjois-Pohjanmaa~FI-14|Pohjois-Savo~FI-15|Päijät-Häme~FI-16|Satakunta~FI-17|Uusimaa~FI-18|Varsinais-Suomi~FI-19"],["France","FR","Auvergne-Rhône-Alpes~ARA|Bourgogne-Franche-Comté~BFC|Bretagne~BRE|Centre-Val de Loire~CVL|Corse~COR|Grand Est~GES|Hauts-de-France~HDF|Île-de-France~IDF|Normandie~NOR|Nouvelle-Aquitaine~NAQ|Occitanie~OCC|Pays de la Loire~PDL|Provence-Alpes-Cote d'Azur~PAC|Clipperton~CP|Guadeloupe~GP|Guyane~GF|Martinique~MQ|Mayotte~YT|Novelle-Calédonie~NC|Polynésie~PF|Saint-Pierre-et-Miquelon~PM|Saint Barthélemy~BL|Saint Martin~MF|Réunion~RE|Terres Australes Françaises~TF|Wallis-et-Futuna~WF"],["French Guiana","GF","French Guiana~undefined"],["French Polynesia","PF","Archipel des Marquises~undefined|Archipel des Tuamotu~undefined|Archipel des Tubuai~undefined|Iles du Vent~undefined|Iles Sous-le-Vent~undefined"],["French Southern and Antarctic Lands","TF","Adelie Land~undefined|Ile Crozet~undefined|Iles Kerguelen~undefined|Iles Saint-Paul et Amsterdam~undefined"],["Gabon","GA","Estuaire~1|Haut-Ogooué~2|Moyen-Ogooué~3|Ngounié~4|Nyanga~5|Ogooué-Ivindo~6|Ogooué-Lolo~7|Ogooué-Maritime~8|Woleu-Ntem~9"],["Gambia, The","GM","Banjul~B|Central River~M|Lower River~L|North Bank~N|Upper River~U|Western~W"],["Georgia","GE","Abkhazia (Sokhumi)~AB|Ajaria (Bat'umi)~AJ|Guria~GU|Imereti~IM|K'akheti~KA|Kvemo Kartli~KK|Mtshkheta-Mtianeti~MM|Rach'a-Lexhkumi-KvemoSvaneti~RL|Samegrelo-Zemo Svaneti~SZ|Samtskhe-Javakheti~SJ|Shida Kartli~SK|Tbilisi~TB"],["Germany","DE","Baden-Württemberg~BW|Bayern~BY|Berlin~BE|Brandenburg~BB|Bremen~HB|Hamburg~HH|Hessen~HE|Mecklenburg-Vorpommern~MV|Niedersachsen~NI|Nordrhein-Westfalen~NW|Rheinland-Pfalz~RP|Saarland~SL|Sachsen~SN|Sachsen-Anhalt~ST|Schleswig-Holstein~SH|Thüringen~TH"],["Ghana","GH","Ahafo~undefined|Ashanti~AH|Bono~undefined|Bono East~undefined|Central~CP|Eastern~EP|Greater Accra~AA|Northern~NP|North East~undefined|Oti~undefined|Savannah~undefined|Upper East~UE|Upper West~UW|Volta~TV|Western~WP|Western North~undefined"],["Gibraltar","GI","Gibraltar~undefined"],["Greece","GR","Anatolikí Makedonía kai Thráki~A|Attikḯ~I|Dytikí Elláda~G|Dytikí Makedonía~C|Ionía Nísia~F|Kentrikí Makedonía~B|Krítí~M|Notío Aigaío~L|Peloponnísos~J|Stereá Elláda~H|Thessalía~E|Voreío Aigaío~K|Ípeiros~D|Ágion Óros~69"],["Greenland","GL","Kommune Kujalleq~KU|Kommuneqarfik Sermersooq~SM|Qaasuitsup Kommunia~QA|Qeqqata Kommunia~QE"],["Grenada","GD","Saint Andrew~01|Saint David~02|Saint George~03|Saint John~04|Saint Mark~05|Saint Patrick~06|Southern Grenadine Islands~10"],["Guadeloupe","GP","Guadeloupe~undefined"],["Guam","GU","Guam~undefined"],["Guatemala","GT","Alta Verapaz~AV|Baja Verapaz~BV|Chimaltenango~CM|Chiquimula~CQ|El Progreso~PR|Escuintla~ES|Guatemala~GU|Huehuetenango~HU|Izabal~IZ|Jalapa~JA|Jutiapa~JU|Petén~PE|Quetzaltenango~QZ|Quiché~QC|Retalhuleu~Re|Sacatepéquez~SA|San Marcos~SM|Santa Rosa~SR|Sololá~SO|Suchitepéquez~SU|Totonicapán~TO|Zacapa~ZA"],["Guernsey","GG","Castel~undefined|Forest~undefined|St. Andrew~undefined|St. Martin~undefined|St. Peter Port~undefined|St. Pierre du Bois~undefined|St. Sampson~undefined|St. Saviour~undefined|Torteval~undefined|Vale~undefined"],["Guinea","GN","Boké~B|Conakry~C|Faranah~F|Kankan~K|Kindia~D|Labé~L|Mamou~M|Nzérékoré~N"],["Guinea-Bissau","GW","Bafatá~BA|Biombo~BM|Bissau~BS|Bolama-Bijagos~BL|Cacheu~CA|Gabú~GA|Oio~OI|Quinara~QU|Tombali~TO"],["Guyana","GY","Barima-Waini~BA|Cuyuni-Mazaruni~CU|Demerara-Mahaica~DE|East Berbice-Corentyne~EB|Essequibo Islands-West Demerara~ES|Mahaica-Berbice~MA|Pomeroon-Supenaam~PM|Potaro-Siparuni~PT|Upper Demerara-Berbice~UD|Upper Takutu-Upper Essequibo~UT"],["Haiti","HT","Artibonite~AR|Centre~CE|Grand'Anse~GA|Nippes~NI|Nord~ND|Nord-Est~NE|Nord-Ouest~NO|Ouest~OU|Sud~SD|Sud-Est~SE"],["Heard Island and McDonald Islands","HM","Heard Island and McDonald Islands~undefined"],["Holy See (Vatican City)","VA","Holy See (Vatican City)~01"],["Honduras","HN","Atlántida~AT|Choluteca~CH|Colón~CL|Comayagua~CM|Copán~CP|Cortés~CR|El Paraíso~EP|Francisco Morazán~FM|Gracias a Dios~GD|Intibucá~IN|Islas de la Bahía~IB|La Paz~LP|Lempira~LE|Ocotepeque~OC|Olancho~OL|Santa Bárbara~SB|Valle~VA|Yoro~YO"],["Hong Kong","HK","Hong Kong~HK"],["Hungary","HU","Bács-Kiskun~BK|Baranya~BA|Békés~BE|Békéscsaba~BC|Borsod-Abauj-Zemplen~BZ|Budapest~BU|Csongrád~CS|Debrecen~DE|Dunaújváros~DU|Eger~EG|Érd~ER|Fejér~FE|Győr~GY|Győr-Moson-Sopron~GS|Hajdú-Bihar~HB|Heves~HE|Hódmezővásárhely~HV|Jász-Nagykun-Szolnok~N|Kaposvár~KV|Kecskemét~KM|Komárom-Esztergom~KE|Miskolc~MI|Nagykanizsa~NK|Nógrád~NO|Nyíregyháza~NY|Pécs~PS|Pest~PE|Salgótarján~ST|Somogy~SO|Sopron~SN|Szabolcs-á-Bereg~SZ|Szeged~SD|Székesfehérvár~SF|Szekszárd~SS|Szolnok~SK|Szombathely~SH|Tatabánya~TB|Tolna~TO|Vas~VA|Veszprém~VE|Veszprém (City)~VM|Zala~ZA|Zalaegerszeg~ZE"],["Iceland","IS","Austurland~7|Höfuðborgarsvæði~1|Norðurland eystra~6|Norðurland vestra~5|Suðurland~8|Suðurnes~2|Vestfirðir~4|Vesturland~3"],["India","IN","Andaman and Nicobar Islands~AN|Andhra Pradesh~AP|Arunachal Pradesh~AR|Assam~AS|Bihar~BR|Chandigarh~CH|Chhattisgarh~CT|Dadra and Nagar Haveli and Daman and Diu~DH|Delhi~DL|Goa~GA|Gujarat~GJ|Haryana~HR|Himachal Pradesh~HP|Jammu and Kashmir~JK|Jharkhand~JH|Karnataka~KA|Kerala~KL|Ladakh~LA|Lakshadweep~LD|Madhya Pradesh~MP|Maharashtra~MH|Manipur~MN|Meghalaya~ML|Mizoram~MZ|Nagaland~NL|Odisha~OR|Puducherry~PY|Punjab~PB|Rajasthan~RJ|Sikkim~SK|Tamil Nadu~TN|Telangana~TG|Tripura~TR|Uttarakhand~UT|Uttar Pradesh~UP|West Bengal~WB"],["Indonesia","ID","Aceh~AC|Bali~BA|Bangka Belitung~BB|Banten~BT|Bengkulu~BE|Gorontalo~GO|Jakarta Raya~JK|Jambi~JA|Jawa Barat~JB|Jawa Tengah~JT|Jawa Timur~JI|Kalimantan Barat~KB|Kalimantan Selatan~KS|Kalimantan Tengah~KT|Kalimantan Timur~KI|Kalimantan Utara~KU|Kepulauan Riau~KR|Lampung~LA|Maluku~MA|Maluku Utara~MU|Nusa Tenggara Barat~NB|Nusa Tenggara Timur~NT|Papua~PA|Papua Barat~PB|Riau~RI|Sulawesi Selatan~SR|Sulawesi Tengah~ST|Sulawesi Tenggara~SG|Sulawesi Utara~SA|Sumatera Barat~SB|Sumatera Selatan~SS|Sumatera Utara~SU|Yogyakarta~YO"],["Iran, Islamic Republic of","IR","Alborz~32|Ardabīl~03|Āz̄arbāyjān-e Gharbī~02|Āz̄arbāyjān-e Sharqī~01|Būshehr~06|Chahār Maḩāl va Bakhtīārī~08|Eşfahān~04|Fārs~14|Gīlān~19|Golestān~27|Hamadān~24|Hormozgān~23|Īlām~05|Kermān~15|Kermānshāh~17|Khorāsān-e Jonūbī~29|Khorāsān-e Raẕavī~30|Khorāsān-e Shomālī~61|Khūzestān~10|Kohgīlūyeh va Bowyer Aḩmad~18|Kordestān~16|Lorestān~20|Markazi~22|Māzandarān~21|Qazvīn~28|Qom~26|Semnān~12|Sīstān va Balūchestān~13|Tehrān~07|Yazd~25|Zanjān~11"],["Iraq","IQ","Al Anbār~AN|Al Başrah~BA|Al Muthanná~MU|Al Qādisīyah~QA|An Najaf~NA|Arbīl~AR|As Sulaymānīyah~SU|Bābil~BB|Baghdād~BG|Dohuk~DA|Dhī Qār~DQ|Diyālá~DI|Karbalā'~KA|Kirkuk~KI|Maysān~MA|Nīnawá~NI|Şalāḩ ad Dīn~SD|Wāsiţ~WA"],["Ireland","IE","Carlow~CW|Cavan~CN|Clare~CE|Cork~CO|Donegal~DL|Dublin~D|Galway~G|Kerry~KY|Kildare~KE|Kilkenny~KK|Laois~LS|Leitrim~LM|Limerick~LK|Longford~LD|Louth~LH|Mayo~MO|Meath~MH|Monaghan~MN|Offaly~OY|Roscommon~RN|Sligo~SO|Tipperary~TA|Waterford~WD|Westmeath~WH|Wexford~WX|Wicklow~WW"],["Isle of Man","IM","Isle of Man~undefined"],["Israel","IL","HaDarom~D|HaMerkaz~M|HaTsafon~Z|H̱efa~HA|Tel-Aviv~TA|Yerushalayim~JM"],["Italy","IT","Abruzzo~65|Basilicata~77|Calabria~78|Campania~72|Emilia-Romagna~45|Friuli-Venezia Giulia~36|Lazio~62|Liguria~42|Lombardia~25|Marche~57|Molise~67|Piemonte~21|Puglia~75|Sardegna~88|Sicilia~82|Toscana~52|Trentino-Alto Adige~32|Umbria~55|Valle d'Aosta~23|Veneto~34"],["Jamaica","JM","Clarendon~13|Hanover~09|Kingston~01|Manchester~12|Portland~04|Saint Andrew~02|Saint Ann~06|Saint Catherine~14|Saint Elizabeth~11|Saint James~08|Saint Mary~05|Saint Thomas~03|Trelawny~07|Westmoreland~10"],["Japan","JP","Aichi~23|Akita~05|Aomori~02|Chiba~12|Ehime~38|Fukui~18|Fukuoka~40|Fukushima~07|Gifu~21|Gunma~10|Hiroshima~34|Hokkaido~01|Hyogo~28|Ibaraki~08|Ishikawa~17|Iwate~03|Kagawa~37|Kagoshima~46|Kanagawa~14|Kochi~39|Kumamoto~43|Kyoto~26|Mie~24|Miyagi~04|Miyazaki~45|Nagano~20|Nagasaki~42|Nara~29|Niigata~15|Oita~44|Okayama~33|Okinawa~47|Osaka~27|Saga~41|Saitama~11|Shiga~25|Shimane~32|Shizuoka~22|Tochigi~09|Tokushima~36|Tokyo~13|Tottori~31|Toyama~16|Wakayama~30|Yamagata~06|Yamaguchi~35|Yamanashi~19"],["Jersey","JE","Jersey~undefined"],["Jordan","JO","‘Ajlūn~AJ|Al 'Aqabah~AQ|Al Balqā’~BA|Al Karak~KA|Al Mafraq~MA|Al ‘A̅şimah~AM|Aţ Ţafīlah~AT|Az Zarqā’~AZ|Irbid~IR|Jarash~JA|Ma‘ān~MN|Mādabā~MD"],["Kazakhstan","KZ","Almaty~ALA|Aqmola~AKM|Aqtobe~AKT|Astana~AST|Atyrau~ATY|Batys Qazaqstan~ZAP|Bayqongyr~undefined|Mangghystau~MAN|Ongtustik Qazaqstan~YUZ|Pavlodar~PAV|Qaraghandy~KAR|Qostanay~KUS|Qyzylorda~KZY|Shyghys Qazaqstan~VOS|Soltustik Qazaqstan~SEV|Zhambyl~ZHA"],["Kenya","KE","Baringo~01|Bomet~02|Bungoma~03|Busia~04|Eleyo/Marakwet~05|Embu~06|Garissa~07|Homa Bay~08|Isiolo~09|Kajiado~10|Kakamega~11|Kericho~12|Kiambu~13|Kilifi~14|Kirinyaga~15|Kisii~16|Kisumu~17|Kitui~18|Kwale~19|Laikipia~20|Lamu~21|Machakos~22|Makueni~23|Mandera~24|Marsabit~25|Meru~26|Migori~27|Mombasa~28|Murang'a~29|Nairobi City~30|Nakuru~31|Nandi~32|Narok~33|Nyamira~34|Nyandarua~35|Nyeri~36|Samburu~37|Siaya~38|Taita/Taveta~39|Tana River~40|Tharaka-Nithi~41|Trans Nzoia~42|Turkana~43|Uasin Gishu~44|Vihiga~45|Wajir~46|West Pokot~47"],["Kiribati","KI","Abaiang~undefined|Abemama~undefined|Aranuka~undefined|Arorae~undefined|Banaba~undefined|Beru~undefined|Butaritari~undefined|Central Gilberts~undefined|Gilbert Islands~G|Kanton~undefined|Kiritimati~undefined|Kuria~undefined|Line Islands~L|Maiana~undefined|Makin~undefined|Marakei~undefined|Nikunau~undefined|Nonouti~undefined|Northern Gilberts~undefined|Onotoa~undefined|Phoenix Islands~P|Southern Gilberts~undefined|Tabiteuea~undefined|Tabuaeran~undefined|Tamana~undefined|Tarawa~undefined|Teraina~undefined"],["Korea, Democratic People's Republic of","KP","Chagang-do (Chagang Province)~04|Hamgyong-bukto (North Hamgyong Province)~09|Hamgyong-namdo (South Hamgyong Province)~08|Hwanghae-bukto (North Hwanghae Province)~06|Hwanghae-namdo (South Hwanghae Province)~05|Kangwon-do (Kangwon Province)~07|Nasŏn (Najin-Sŏnbong)~13|P'yongan-bukto (North P'yongan Province)~03|P'yongan-namdo (South P'yongan Province)~02|P'yongyang-si (P'yongyang City)~01|Yanggang-do (Yanggang Province)~10"],["Korea, Republic of","KR","Ch'ungch'ongbuk-do~43|Ch'ungch'ongnam-do~44|Cheju-do~49|Chollabuk-do~45|Chollanam-do~46|Inch'on-Kwangyokhi~28|Kang-won-do~42|Kwangju-Kwangyokshi~29|Kyonggi-do~41|Kyongsangbuk-do~47|Kyongsangnam-do~48|Pusan-Kwangyokshi~26|Seoul-T'ukpyolshi~11|Sejong~50|Taegu-Kwangyokshi~27|Taejon-Kwangyokshi~30|Ulsan-Kwangyokshi~31"],["Kosovo","XK","Farizaj~FZ|Gjakova~GK|Gjilan~GL|Mitrovica~MI|Peja/Peć~PE|Pristina~PR|Prizren~PZ"],["Kuwait","KW","Al Aḩmadi~AH|Al Farwānīyah~FA|Al Jahrā’~JA|Al ‘Āşimah~KU|Ḩawallī~HA|Mubārak al Kabir~MU"],["Kyrgyzstan","KG","Batken Oblasty~B|Bishkek Shaary~GB|Chuy Oblasty (Bishkek)~C|Jalal-Abad Oblasty~J|Naryn Oblasty~N|Osh Oblasty~O|Talas Oblasty~T|Ysyk-Kol Oblasty (Karakol)~Y"],["Laos","LA","Attapu~AT|Bokèo~BK|Bolikhamxai~BL|Champasak~CH|Houaphan~HO|Khammouan~KH|Louang Namtha~LM|Louangphabang~LP|Oudômxai~OU|Phôngsali~PH|Salavan~SL|Savannakhét~SV|Vientiane~VI|Xaignabouli~XA|Xékong~XE|Xaisomboun~XS|Xiangkhouang~XI"],["Latvia","LV","Aglona~001|Aizkraukle~002|Aizpute~003|Aknīste~004|Aloja~005|Alsunga~06|Alūksne~007|Amata~008|Ape~009|Auce~010|Ādaži~011|Babīte~012|Baldone~013|Baltinava~014|Balvi~015|Bauska~016|Beverīna~017|Brocēni~018|Burtnieki~019|Carnikava~020|Cesvaine~021|Cēsis~022|Cibla~023|Dagda~024|Daugavpils~025|Daugavpils (City)~DGV|Dobele~026|Dundaga~027|Durbe~028|Engure~029|Ērgļi~030|Garkalne~031|Grobiņa~032|Gulbene~033|Iecava~034|Ikšķile~035|Ilūkste~036|Inčukalns~037|Jaunjelgava~038|Jaunpiebalga~039|Jaunpils~040|Jelgava~041|Jelgava (City)~JEL|Jēkabpils~042|Jēkabpils (City)~JKB|Jūrmala (City)~JUR|Kandava~043|Kārsava~044|Kocēni~045|Koknese~046|Krāslava~047|Krimulda~048|Krustpils~049|Kuldīga~050|Ķegums~051|Ķekava~052|Lielvārde~053|Liepāja~LPX|Limbaži~054|Līgatne~055|Līvāni~056|Lubāna~057|Ludza~058|Madona~059|Mazsalaca~060|Mālpils~061|Mārupe~062|Mērsrags~063|Naukšēni~064|Nereta~065|Nīca~066|Ogre~067|Olaine~068|Ozolnieki~069|Pārgauja~070|Pāvilosta~071|Pļaviņas~072|Preiļi~073|Priekule~074|Priekuļi~075|Rauna~076|Rēzekne~077|Rēzekne (City)~REZ|Riebiņi~078|Rīga~RIX|Roja~079|Ropaži~080|Rucava~081|Rugāji~082|Rundāle~083|Rūjiena~084|Sala~085|Salacgrīva~086|Salaspils~087|Saldus~088|Saulkrasti~089|Sēja~090|Sigulda~091|Skrīveri~092|Skrunda~093|Smiltene~094|Stopiņi~095|Strenči~096|Talsi~097|Tērvete~098|Tukums~099|Vaiņode~100|Valka~101|Valmiera~VMR|Varakļāni~102|Vārkava~103|Vecpiebalga~104|Vecumnieki~105|Ventspils~106|Ventspils (City)~VEN|Viesīte~107|Viļaka~108|Viļāni~109|Zilupe~110"],["Lebanon","LB","Aakkâr~AK|Baalbelk-Hermel~BH|Béqaa~BI|Beyrouth~BA|Liban-Nord~AS|Liban-Sud~JA|Mont-Liban~JL|Nabatîyé~NA"],["Lesotho","LS","Berea~D|Butha-Buthe~B|Leribe~C|Mafeteng~E|Maseru~A|Mohales Hoek~F|Mokhotlong~J|Qacha's Nek~H|Quthing~G|Thaba-Tseka~K"],["Liberia","LR","Bomi~BM|Bong~BG|Gbarpolu~GP|Grand Bassa~GB|Grand Cape Mount~CM|Grand Gedeh~GG|Grand Kru~GK|Lofa~LO|Margibi~MG|Maryland~MY|Montserrado~MO|Nimba~NI|River Cess~RI|River Geee~RG|Sinoe~SI"],["Libya","LY","Al Buţnān~BU|Al Jabal al Akhḑar~JA|Al Jabal al Gharbī~JG|Al Jafārah~JI|Al Jufrah~JU|Al Kufrah~FK|Al Marj~MJ|Al Marquab~MB|Al Wāḩāt~WA|An Nuqaţ al Khams~NQ|Az Zāwiyah~ZA|Banghāzī~BA|Darnah~DR|Ghāt~GH|Mişrātah~MI|Murzuq~MQ|Nālūt~NL|Sabhā~SB|Surt~SR|Ţarābulus~TB|Yafran~WD|Wādī ash Shāţiʾ~WS"],["Liechtenstein","LI","Balzers~01|Eschen~02|Gamprin~03|Mauren~04|Planken~05|Ruggell~06|Schaan~07|Schellenberg~08|Triesen~09|Triesenberg~10|Vaduz~11"],["Lithuania","LT","Alytaus~AL|Kauno~KU|Klaipėdos~KL|Marijampolės~MR|Panevėžio~PN|Šiaulių~SA|Tauragės~TA|Telšių~TE|Utenos~UT|Vilniaus~VL"],["Luxembourg","LU","Capellen~CA|Clevaux~CL|Diekirch~DI|Echternach~EC|Esch-sur-Alzette~ES|Grevenmacher~GR|Luxembourg~LU|Mersch~ME|Redange~RD|Remich~RM|Vianden~VD|Wiltz~WI"],["Macao","MO","Macao~undefined"],["Macedonia, Republic of","MK","Aračinovo~02|Berovo~03|Bitola~04|Bogdanci~05|Bogovinje~06|Bosilovo~07|Brvenica~08|Centar Župa~78|Čaška~80|Češinovo-Obleševo~81|Čučer Sandevo~82|Debar~21|Debarca~22|Delčevo~23|Demir Hisar~25|Demir Kapija~24|Doran~26|Dolneni~27|Gevgelija~18|Gostivar~19|Gradsko~20|Ilinden~34|Jegunovce~35|Karbinci~37|Kavadarci~36|Kičevo~40|Kočani~42|Konče~41|Kratovo~43|Kriva Palanka~44|Krivogaštani~45|Kruševo~46|Kumanovo~47|Lipkovo~48|Lozovo~49|Makedonska Kamenica~51|Makedonski Brod~52|Mavrovo i Rostuša~50|Mogila~53|Negotino~54|Novaci~55|Novo Selo~56|Ohrid~58|Pehčevo~60|Petrovec~59|Plasnica~61|Prilep~62|Probištip~63|Radoviš~|Rankovce~65|Resen~66|Rosoman~67|Skopje~85|Sopište~70|Staro Nagoričane~71|Struga~72|Strumica~73|Studeničani~74|Sveti Nikole~69|Štip~83|Tearce~75|Tetovo~76|Valandovo~10|Vasilevo~11|Veles~13|Vevčani~12|Vinica~14|Vrapčište~16|Zelenikovo~32|Zrnovci~33|Želino~30"],["Madagascar","MG","Antananarivo~T|Antsiranana~D|Fianarantsoa~F|Mahajanga~M|Toamasina~A|Toliara~U"],["Malawi","MW","Balaka~BA|Blantyre~BL|Chikwawa~CK|Chiradzulu~CR|Chitipa~CT|Dedza~DE|Dowa~DO|Karonga~KR|Kasungu~KS|Likoma~LK|Lilongwe~LI|Machinga~MH|Mangochi~MG|Mchinji~MC|Mulanje~MU|Mwanza~MW|Mzimba~MZ|Nkhata Bay~NE|Nkhotakota~NB|Nsanje~NS|Ntcheu~NU|Ntchisi~NI|Phalombe~PH|Rumphi~RU|Salima~SA|Thyolo~TH|Zomba~ZO"],["Malaysia","MY","Johor~01|Kedah~02|Kelantan~03|Melaka~04|Negeri Sembilan~05|Pahang~06|Perak~08|Perlis~09|Pulau Pinang~07|Sabah~12|Sarawak~13|Selangor~10|Terengganu~11|Wilayah Persekutuan (Kuala Lumpur)~14|Wilayah Persekutuan (Labuan)~15|Wilayah Persekutuan (Putrajaya)~16"],["Maldives","MV","Alifu Alifu~02|Alifu Dhaalu~00|Baa~20|Dhaalu~17|Faafu~14|Gaafu Alifu~27|Gaafu Dhaalu~28|Gnaviyani~29|Haa Alifu~07|Haa Dhaalu~23|Kaafu~26|Laamu~05|Lhaviyani~03|Malé~MLE|Meemu~12|Noonu~25|Raa~13|Seenu~01|Shaviyani~24|Thaa~08|Vaavu~04"],["Mali","ML","Bamako~BKO|Gao~7|Kayes~1|Kidal~8|Koulikoro~2|Mopti~5|Segou~4|Sikasso~3|Tombouctou~6|Taoudénit~9|Ménaka~10"],["Malta","MT","Attard~01|Balzan~02|Birgu~03|Birkirkara~04|Birżebbuġa~05|Bormla~06|Dingli~07|Fgura~08|Floriana~09|Fontana~10|Guda~11|Gżira~12|Għajnsielem~13|Għarb~14|Għargħur~15|Għasri~16|Għaxaq~17|Ħamrun~18|Iklin~19|Isla~20|Kalkara~21|Kerċem~22|Kirkop~23|Lija~24|Luqa~25|Marsa~26|Marsaskala~27|Marsaxlokk~28|Mdina~29|Mellieħa~30|Mġarr~31|Mosta~32|Mqabba~33|Msida~34|Mtarfa~35|Munxar~36|Nadur~37|Naxxar~38|Paola~39|Pembroke~40|Pietà~41|Qala~42|Qormi~43|Qrendi~44|Rabat Għawdex~45|Rabat Malta~46|Safi~47|San Ġiljan~48|San Ġwann~49|San Lawrenz~50|San Pawl il-Baħar~51|Sannat~52|Santa Luċija~53|Santa Venera~54|Siġġiewi~55|Sliema~56|Swieqi~57|Tai Xbiex~58|Tarzien~59|Valletta~60|Xagħra~61|Xewkija~62|Xgħajra~63|Żabbar~64|Żebbuġ Għawde~65|Żebbuġ Malta~66|Żejtun~67|Żurrieq~68"],["Marshall Islands","MH","Ailinglaplap~ALL|Ailuk~ALK|Arno~ARN|Aur~AUR|Bikini and Kili~KIL|Ebon~EBO|Jabat~JAB|Jaluit~JAL|Kwajalein~KWA|Lae~LAE|Lib~LIB|Likiep~LIK|Majuro~MAJ|Maloelap~MAL|Mejit~MEJ|Namdrik~NMK|Namu~NMU|Rongelap~RON|Ujae~UJA|Utrik~UTI|Wotho~WTH|Wotje~WTJ"],["Martinique","MQ","Martinique~undefined"],["Mauritania","MR","Adrar~07|Assaba~03|Brakna~05|Dakhlet Nouadhibou~08|Gorgol~04|Guidimaka~10|Hodh Ech Chargui~01|Hodh El Gharbi~02|Inchiri~12|Nouakchott Nord~14|Nouakchott Ouest~13|Nouakchott Sud~15|Tagant~09|Tiris Zemmour~11|Trarza~06"],["Mauritius","MU","Agalega Islands~AG|Beau Bassin-Rose Hill~BR|Black River~BL|Cargados Carajos Shoals~CC|Curepipe~CU|Flacq~FL|Grand Port~GP|Moka~MO|Pamplemousses~PA|Plaines Wilhems~PW|Port Louis (City)~PU|Port Louis~PL|Riviere du Rempart~RR|Rodrigues Island~RO|Savanne~SA|Vacoas-Phoenix~CP"],["Mayotte","YT","Dzaoudzi~01|Pamandzi~02|Mamoudzou~03|Dembeni~04|Bandrélé~05|Kani-Kéli~06|Bouéni~07|Chirongui~08|Sada~09|Ouangani~10|Chiconi~11|Tsingoni~12|M'Tsangamouji~13|Acoua~14|Mtsamboro~15|Bandraboua~16|Koungou~17"],["Mexico","MX","Aguascalientes~AGU|Baja California~BCN|Baja California Sur~BCS|Campeche~CAM|Ciudad de México~DIF|Chiapas~CHP|Chihuahua~CHH|Coahuila de Zaragoza~COA|Colima~COL|Durango~DUR|Estado de México~MEX|Guanajuato~GUA|Guerrero~GRO|Hidalgo~HID|Jalisco~JAL|Michoacán de Ocampo~MIC|Morelos~MOR|Nayarit~NAY|Nuevo León~NLE|Oaxaca~OAX|Puebla~PUE|Querétaro de Arteaga~QUE|Quintana Roo~ROO|San Luis Potosí~SLP|Sinaloa~SIN|Sonora~SON|Tabasco~TAB|Tamaulipas~TAM|Tlaxcala~TLA|Veracruz~VER|Yucatán~YUC|Zacatecas~ZAC"],["Micronesia, Federated States of","FM","Chuuk (Truk)~TRK|Kosrae~KSA|Pohnpei~PNI|Yap~YAP"],["Moldova","MD","Aenii Noi~AN|Basarabeasca~BS|Bălți~BA|Bender~BD|Briceni~BR|Cahul~CA|Cantemir~CT|Călărași~CL|Căușeni~CS|Chișinău~CU|Cimișlia~CM|Criuleni~CR|Dondușeni~DO|Drochia~DR|Dubăsari~DU|Edineț~ED|Fălești~FA|Florești~FL|Găgăuzia~GA|Glodeni~GL|Hîncești~HI|Ialoveni~IA|Leova~LE|Nisporeni~NI|Ocnița~OC|Orhei~OR|Rezina~RE|Rîșcani~RI|Sîngerei~SI|Soroca~SO|Stânga Nistrului~SN|Strășeni~ST|Șoldănești~SD|Ștefan Vodă~SV|Taraclia~TA|Telenești~TE|Ungheni~UN"],["Monaco","MC","Colle~CL|Condamine~CO|Fontvieille~FO|Gare~GA|Jardin Exotique~JE|Larvotto~LA|Malbousquet~MA|Monaco-Ville~MO|Moneghetti~MG|Monte-Carlo~MC|Moulins~MU|Port-Hercule~PH|Saint-Roman~SR|Sainte-Dévote~SD|Source~SO|Spélugues~SP|Vallon de la Rousse~VR"],["Mongolia","MN","Arhangay~073|Bayan-Olgiy~071|Bayanhongor~069|Bulgan~067|Darhan~037|Dornod~061|Dornogovi~063|Dundgovi~059|Dzavhan~057|Govi-Altay~065|Govi-Sumber~064|Hovd~043|Hovsgol~041|Omnogovi~053|Ovorhangay~055|Selenge~049|Suhbaatar~051|Tov~047|Ulaanbaatar~1|Uvs~046|Erdenet~074"],["Montenegro","ME","Andrijevica~01|Bar~02|Berane~03|Bijelo Polje~04|Budva~05|Cetinje~06|Danilovgrad~07|Gusinje~22|Herceg Novi~08|Kolašin~09|Kotor~10|Mojkovac~11|Nikšić~12|Petnica~23|Plav~13|Plužine~14|Pljevlja~15|Podgorica~16|Rožaje~17|Šavnik~18|Tivat~19|Ulcinj~20|Žabljak~21"],["Montserrat","MS","Saint Anthony~undefined|Saint Georges~undefined|Saint Peter's~undefined"],["Morocco","MA","Tanger-Tétouan-Al Hoceïma~MA-01|L'Oriental~MA-02|Fès-Meknès~MA-03|Rabat-Salé-Kénitra~MA-04|Béni Mellal-Khénifra~MA-05|Casablanca-Settat~MA-06|Marrakech-Safi~MA-07|Drâa-Tafilalet~MA-08|Souss-Massa~MA-09|Guelmim-Oued Noun~MA-10|Laâyoune-Sakia El Hamra~MA-11|Dakhla-Oued Ed-Dahab~MA-12"],["Mozambique","MZ","Cabo Delgado~P|Gaza~G|Inhambane~I|Manica~B|Maputo~L|Maputo (City)~MPM|Nampula~N|Niassa~A|Sofala~S|Tete~T|Zambezia~Q"],["Myanmar","MM","Ayeyarwady~07|Bago~02|Chin~14|Kachin~11|Kayah~12|Kayin~13|Magway~03|Mandalay~04|Mon~15|Nay Pyi Taw~18|Rakhine~16|Sagaing~01|Shan~17|Tanintharyi~05|Yangon~06"],["Namibia","NA","Erongo~ER|Hardap~HA|Kavango East~KE|Kavango West~KW|Karas~KA|Khomas~KH|Kunene~KU|Ohangwena~OW|Omaheke~OH|Omusati~OS|Oshana~ON|Oshikoto~OT|Otjozondjupa~OD|Zambezi~CA"],["Nauru","NR","Aiwo~01|Anabar~02|Anetan~03|Anibare~04|Baiti~05|Boe~06|Buada~07|Denigomodu~08|Ewa~09|Ijuw~10|Meneng~11|Nibok~12|Uaboe~13|Yaren~14"],["Nepal","NP","Province No. 1~1|Province No. 2~2|Bagmati Province~3|Gandaki Province~4|Lumbini Province~5|Karnali Province~6|Sudurpashchim~7"],["Netherlands","NL","Drenthe~DR|Flevoland~FL|Friesland~FR|Gelderland~GE|Groningen~GR|Limburg~LI|Noord-Brabant~NB|Noord-Holland~NH|Overijssel~OV|Utrecht~UT|Zeeland~ZE|Zuid-Holland~ZH"],["New Caledonia","NC","Iles Loyaute~undefined|Nord~undefined|Sud~undefined"],["New Zealand","NZ","Auckland~AUK|Bay of Plenty~BOP|Canterbury~CAN|Gisborne~GIS|Hawke's Bay~HKB|Marlborough~MBH|Manawatu-Wanganui~MWT|Northland~NTL|Nelson~NSN|Otago~OTA|Southland~STL|Taranaki~TKI|Tasman~TAS|Waikato~WKO|Wellington~WGN|West Coast~WTC|Chatham Islands Territory~CIT"],["Nicaragua","NI","Boaco~BO|Carazo~CA|Chinandega~CI|Chontales~CO|Estelí~ES|Granada~GR|Jinotega~JI|León~LE|Madriz~MD|Managua~MN|Masaya~MS|Matagalpa~MT|Nueva Segovia~NS|Río San Juan~SJ|Rivas~RI|Atlántico Norte~AN|Atlántico Sur~AS"],["Niger","NE","Agadez~1|Diffa~2|Dosso~3|Maradi~4|Niamey~8|Tahoua~5|Tillabéri~6|Zinder~7"],["Nigeria","NG","Abia~AB|Abuja Federal Capital Territory~FC|Adamawa~AD|Akwa Ibom~AK|Anambra~AN|Bauchi~BA|Bayelsa~BY|Benue~BE|Borno~BO|Cross River~CR|Delta~DE|Ebonyi~EB|Edo~ED|Ekiti~EK|Enugu~EN|Gombe~GO|Imo~IM|Jigawa~JI|Kaduna~KD|Kano~KN|Katsina~KT|Kebbi~KE|Kogi~KO|Kwara~KW|Lagos~LA|Nassarawa~NA|Niger~NI|Ogun~OG|Ondo~ON|Osun~OS|Oyo~OY|Plateau~PL|Rivers~RI|Sokoto~SO|Taraba~TA|Yobe~YO|Zamfara~ZA"],["Niue","NU","Niue~undefined"],["Norfolk Island","NF","Norfolk Island~undefined"],["Northern Mariana Islands","MP","Northern Islands~undefined|Rota~undefined|Saipan~undefined|Tinian~undefined"],["Norway","NO","Akershus~02|Aust-Agder~09|Buskerud~06|Finnmark~20|Hedmark~04|Hordaland~12|Møre og Romsdal~15|Nordland~18|Nord-Trøndelag~17|Oppland~05|Oslo~03|Rogaland~11|Sogn og Fjordane~14|Sør-Trøndelag~16|Telemark~08|Troms~19|Vest-Agder~10|Vestfold~07|Østfold~01|Jan Mayen~22|Svalbard~21"],["Oman","OM","Ad Dakhiliyah~DA|Al Buraymi~BU|Al Wusta~WU|Az Zahirah~ZA|Janub al Batinah~BS|Janub ash Sharqiyah~SS|Masqat~MA|Musandam~MU|Shamal al Batinah~BJ|Shamal ash Sharqiyah~SJ|Zufar~ZU"],["Pakistan","PK","Āzād Kashmīr~JK|Balōchistān~BA|Gilgit-Baltistān~GB|Islāmābād~IS|Khaībar Pakhtūnkhwās~KP|Punjāb~PB|Sindh~SD|Federally Administered Tribal Areas~TA"],["Palau","PW","Aimeliik~002|Airai~004|Angaur~010|Hatobohei~050|Kayangel~100|Koror~150|Melekeok~212|Ngaraard~214|Ngarchelong~218|Ngardmau~222|Ngatpang~224|Ngchesar~226|Ngeremlengui~227|Ngiwal~228|Peleliu~350|Sonsoral~370"],["Palestine, State of","PS","Ak Khalīl~HBN|Al Quds~JEM|Arīḩā wal Aghwār~JRH|Bayt Laḩm~BTH|Dayr al Balaḩ~DEB|Ghazzah~GZA|Janīn~JEN|Khān Yūnis~KYS|Nāblus~NBS|Qalqīyah~QQA|Rafaḩ~RFH|Rām Allāh wal Bīrah~RBH|Salfīt~SLT|Shamāl Ghazzah~NGZ|Ţūbās~TBS|Ţūlkarm~TKM"],["Panama","PA","Bocas del Toro~1|Chiriquí~4|Coclé~2|Colón~3|Darién~5|Emberá~EM|Herrera~6|Kuna Yala~KY|Los Santos~7|Ngäbe-Buglé~NB|Panamá~8|Panamá Oeste~10|Veraguas~9"],["Papua New Guinea","PG","Bougainville~NSB|Central~CPM|Chimbu~CPK|East New Britain~EBR|East Sepik~ESW|Eastern Highlands~EHG|Enga~EPW|Gulf~GPK|Hela~HLA|Jiwaka~JWK|Madang~MOM|Manus~MRL|Milne Bay~MBA|Morobe~MPL|Port Moresby~NCD|New Ireland~NIK|Northern~NPP|Southern Highlands~SHM|West New Britain~WBK|West Sepik~SAN|Western~WPD|Western Highlands~WHM"],["Paraguay","PY","Alto Paraguay~16|Alto Parana~10|Amambay~13|Asuncion~ASU|Caaguazu~5|Caazapa~6|Canindeyu~14|Central~11|Concepcion~1|Cordillera~3|Boqueron~17|Guaira~4|Itapua~7|Misiones~8|Neembucu~12|Paraguari~9|Presidente Hayes~15|San Pedro~2"],["Peru","PE","Amazonas~AMA|Ancash~ANC|Apurimac~APU|Arequipa~ARE|Ayacucho~AYA|Cajamarca~CAJ|Callao~CAL|Cusco~CUS|Huancavelica~HUV|Huanuco~HUC|Ica~ICA|Junin~JUN|La Libertad~LAL|Lambayeque~LAM|Lima~LIM|Loreto~LOR|Madre de Dios~MDD|Moquegua~MOQ|Municipalidad Metropolitana de Lima~LMA|Pasco~PAS|Piura~PIU|Puno~PUN|San Martin~SAM|Tacna~TAC|Tumbes~TUM|Ucayali~UCA"],["Philippines","PH","Abra~ABR|Agusan del Norte~AGN|Agusan del Sur~AGS|Aklan~AKL|Albay~ALB|Antique~ANT|Apayao~APA|Aurora~AUR|Basilan~BAS|Bataan~BAN|Batanes~BTN|Batangas~BTG|Benguet~BEN|Biliran~BIL|Bohol~BOH|Bukidnon~BUK|Bulacan~BUL|Cagayan~CAG|Camarines Norte~CAN|Camarines Sur~CAS|Camiguin~CAM|Capiz~CAP|Catanduanes~CAT|Cavite~CAV|Cebu~CEB|Compostela~COM|Cotabato~NCO|Davao del Norte~DAV|Davao del Sur~DAS|Davao Occidental~DVO|Davao Oriental~DAO|Dinagat Islands~DIN|Eastern Samar~EAS|Guimaras~GUI|Ifugao~IFU|Ilocos Norte~ILN|Ilocos Sur~ILS|Iloilo~ILI|Isabela~ISA|Kalinga~KAL|La Union~LUN|Laguna~LAG|Lanao del Norte~LAN|Lanao del Sur~LAS|Leyte~LEY|Maguindanao~MAG|Masbate~MAS|Metro Manila~00|Mindoro Occidental~MDC|Mindoro Oriental~MDR|Misamis Occidental~MSC|Misamis Oriental~MSR|Mountain Province~MOU|Negros Occidental~NEC|Negros Oriental~NER|Northern Samar~NSA|Nueva Ecija~NUE|Nueva Vizcaya~NUV|Palawan~PLW|Pampanga~PAM|Pangasinan~PAN|Quezon~QUE|Quirino~QUI|Rizal~RIZ|Romblon~ROM|Samar~WSA|Sarangani~SAR|Siquijor~SIG|Sorsogon~SOR|Southern Leyte~SLE|Sultan Kudarat~AUK|Sulu~SLU|Surigao del Norte~SUN|Surigao del Sur~SUR|Tarlac~TAR|Tawi-Tawi~TAW|Zambales~ZMB|Zamboanga del Norte~ZAN|Zamboanga del Sur~ZAS|Zamboanga Sibugay~ZSI"],["Pitcairn","PN","Pitcairn Islands~undefined"],["Poland","PL","Dolnośląskie~DS|Kujawsko-pomorskie~KP|Łódzkie~LD|Lubelskie~LU|Lubuskie~LB|Małopolskie~MA|Mazowieckie~MZ|Opolskie~OP|Podkarpackie~PK|Podlaskie~PD|Pomorskie~PM|Śląskie~SL|Świętokrzyskie~SK|Warmińsko-mazurskie~WN|Wielkopolskie~WP|Zachodniopomorskie~ZP"],["Portugal","PT","Açores~20|Aveiro~01|Beja~02|Braga~03|Bragança~04|Castelo Branco~05|Coimbra~06|Évora~07|Faro~08|Guarda~09|Leiria~10|Lisboa~11|Madeira~30|Portalegre~12|Porto~13|Santarém~14|Setúbal~15|Viana do Castelo~16|Vila Real~17|Viseu~18"],["Puerto Rico","PR","Adjuntas~undefined|Aguada~undefined|Aguadilla~undefined|Aguas Buenas~undefined|Aibonito~undefined|Anasco~undefined|Arecibo~undefined|Arroyo~undefined|Barceloneta~undefined|Barranquitas~undefined|Bayamon~undefined|Cabo Rojo~undefined|Caguas~undefined|Camuy~undefined|Canovanas~undefined|Carolina~undefined|Cat~undefined|Ceiba~undefined|Ciales~undefined|Cidra~undefined|Coamo~undefined|Comerio~undefined|Corozal~undefined|Culebra~undefined|Dorado~undefined|Fajardo~undefined|Florida~undefined|Guanica~undefined|Guayama~undefined|Guayanilla~undefined|Guaynabo~undefined|Gurabo~undefined|Hatillo~undefined|Hormigueros~undefined|Humacao~undefined|Isabe~undefined|Juana Diaz~undefined|Juncos~undefined|Lajas~undefined|Lares~undefined|Las Marias~undefined|Las oiza~undefined|Luquillo~undefined|Manati~undefined|Maricao~undefined|Maunabo~undefined|Mayaguez~undefined|Moca~undefined|Morovis~undefined|Naguabo~undefined|Naranjito~undefined|Orocovis~undefined|Patillas~undefined|Penuelas~undefined|Ponce~undefined|Quebradillas~undefined|Rincon~undefined|Rio Grande~undefined|Sabana linas~undefined|San German~undefined|San Juan~undefined|San Lorenzo~undefined|San Sebastian~undefined|Santa Isabel~undefined|Toa Alta~undefined|Toa Baja~undefined|Trujillo Alto~undefined|Utuado~undefined|Vega Alta~undefined|Vega ues~undefined|Villalba~undefined|Yabucoa~undefined|Yauco~undefined"],["Qatar","QA","Ad Dawḩah~DA|Al Khawr wa adh Dhakhīrah~KH|Al Wakrah~WA|Ar Rayyān~RA|Ash Shamāl~MS|Az̧ Za̧`āyin~ZA|Umm Şalāl~US"],["Réunion","RE","Réunion~undefined"],["Romania","RO","Alba~AB|Arad~AR|Arges~AG|Bacau~BC|Bihor~BH|Bistrita-Nasaud~BN|Botosani~BT|Braila~BR|Brasov~BV|Bucuresti~B|Buzau~BZ|Calarasi~CL|Caras-Severin~CS|Cluj~CJ|Constanta~CT|Covasna~CV|Dambovita~DB|Dolj~DJ|Galati~GL|Giurgiu~GR|Gorj~GJ|Harghita~HR|Hunedoara~HD|Ialomita~IL|Iasi~IS|Maramures~MM|Mehedinti~MH|Mures~MS|Neamt~NT|Olt~OT|Prahova~PH|Salaj~SJ|Satu Mare~SM|Sibiu~SB|Suceava~SV|Teleorman~TR|Timis~TM|Tulcea~TL|Valcea~VL|Vaslui~VS|Vrancea~VN"],["Russian Federation","RU","Republic of Adygea~AD|Republic of Altai (Gorno-Altaysk)~AL|Altai Krai~ALT|Amur Oblast~AMU|Arkhangelsk Oblast~ARK|Astrakhan Oblast~AST|Republic of Bashkortostan~BA|Belgorod Oblast~BEL|Bryansk Oblast~BRY|Republic of Buryatia~BU|Chechen Republic~CE|Chelyabinsk Oblast~CHE|Chukotka Autonomous Okrug~CHU|Chuvash Republic~CU|Republic of Dagestan~DA|Republic of Ingushetia~IN|Irkutsk Oblast~IRK|Ivanovo Oblast~IVA|Jewish Autonomous Oblast~JEW|Kabardino-Balkar Republic~KB|Kaliningrad Oblast~KLN|Republic of Kalmykia~KL|Kaluga Oblast~KLU|Kamchatka Krai~KAM|Karachay-Cherkess Republic~KC|Republic of Karelia~KR|Khabarovsk Krai~KHA|Republic of Khakassia~KK|Khanty-Mansi Autonomous Okrug - Yugra~KHM|Kemerovo Oblast~KEM|Kirov Oblast~KIR|Komi Republic~KO|Kostroma Oblast~KOS|Krasnodar Krai~KDA|Krasnoyarsk Krai~KYA|Kurgan Oblast~KGN|Kursk Oblast~KRS|Leningrad Oblast~LEN|Lipetsk Oblast~LIP|Magadan Oblast~MAG|Mari El Republic~ME|Republic of Mordovia~MO|Moscow Oblast~MOS|Moscow~MOW|Murmansk Oblast~MU|Nenets Autonomous Okrug~NEN|Nizhny Novgorod Oblast~NIZ|Novgorod Oblast~NGR|Novosibirsk Oblast~NVS|Omsk Oblast~OMS|Orenburg Oblast~ORE|Oryol Oblast~ORL|Penza Oblast~PNZ|Perm Krai~PER|Primorsky Krai~PRI|Pskov Oblast~PSK|Rostov Oblast~ROS|Ryazan Oblast~RYA|Saint Petersburg~SPE|Sakha (Yakutia) Republic~SA|Sakhalin Oblast~SAK|Samara Oblast~SAM|Saratov Oblast~SAR|Republic of North Ossetia-Alania~NOA|Smolensk Oblast~SMO|Stavropol Krai~STA|Sverdlovsk Oblast~SVE|Tambov Oblast~TAM|Republic of Tatarstan~TA|Tomsk Oblast~TOM|Tuva Republic~TU|Tula Oblast~TUL|Tver Oblast~TVE|Tyumen Oblast~TYU|Udmurt Republic~UD|Ulyanovsk Oblast~ULY|Vladimir Oblast~VLA|Volgograd Oblast~VGG|Vologda Oblast~VLG|Voronezh Oblast~VOR|Yamalo-Nenets Autonomous Okrug~YAN|Yaroslavl Oblast~YAR|Zabaykalsky Krai~ZAB"],["Rwanda","RW","Kigali~01|Eastern~02|Northern~03|Western~04|Southern~05"],["Saint Barthélemy","BL","Au Vent~02|Sous le Vent~01"],["Saint Helena, Ascension and Tristan da Cunha","SH","Ascension~AC|Saint Helena~HL|Tristan da Cunha~TA"],["Saint Kitts and Nevis","KN","Saint Kitts~K|Nevis~N"],["Saint Lucia","LC","Anse-la-Raye~01|Canaries~12|Castries~02|Choiseul~03|Dennery~05|Gros Islet~06|Laborie~07|Micoud~08|Soufriere~10|Vieux Fort~11"],["Saint Martin","MF","Saint Martin~undefined"],["Saint Pierre and Miquelon","PM","Miquelon~undefined|Saint Pierre~undefined"],["Saint Vincent and the Grenadines","VC","Charlotte~01|Grenadines~06|Saint Andrew~02|Saint David~03|Saint George~04|Saint Patrick~05"],["Samoa","WS","A'ana~AA|Aiga-i-le-Tai~AL|Atua~AT|Fa'asaleleaga~FA|Gaga'emauga~GE|Gagaifomauga~GI|Palauli~PA|Satupa'itea~SA|Tuamasaga~TU|Va'a-o-Fonoti~VF|Vaisigano~VS"],["San Marino","SM","Acquaviva~01|Borgo Maggiore~06|Chiesanuova~02|Domagnano~03|Faetano~04|Fiorentino~05|Montegiardino~08|San Marino~07|Serravalle~09"],["Sao Tome and Principe","ST","Principe~P|Sao Tome~S"],["Saudi Arabia","SA","'Asir~14|Al Bahah~11|Al Hudud ash Shamaliyah~08|Al Jawf~12|Al Madinah al Munawwarah~03|Al Qasim~05|Ar Riyad~01|Ash Sharqiyah~04|Ha'il~06|Jazan~09|Makkah al Mukarramah~02|Najran~10|Tabuk~07"],["Senegal","SN","Dakar~DK|Diourbel~DB|Fatick~FK|Kaffrine~KA|Kaolack~KL|Kedougou~KE|Kolda~KD|Louga~LG|Matam~MT|Saint-Louis~SL|Sedhiou~SE|Tambacounda~TC|Thies~TH|Ziguinchor~ZG"],["Serbia","RS","Beograd (Belgrade)~00|Borski~14|Braničevski~11|Jablanički~23|Južnobački~06|Južnobanatski~04|Kolubarski~09|Kosovski~25|Kosovsko-Mitrovački~28|Kosovsko-Pomoravski~29|Mačvanski~08|Moravički~17|Nišavski~20|Pčinjski~24|Pećki~26|Pirotski~22|Podunavski~10|Pomoravski~13|Prizrenski~27|Rasinski~19|Raški~18|Severnobački~01|Severnobanatski~03|Srednjebanatski~02|Sremski~07|Šumadijski~12|Toplički~21|Zaječarski~15|Zapadnobački~05|Zlatiborski~16"],["Seychelles","SC","Anse aux Pins~01|Anse Boileau~02|Anse Etoile~03|Anse Royale~05|Anu Cap~04|Baie Lazare~06|Baie Sainte Anne~07|Beau Vallon~08|Bel Air~09|Bel Ombre~10|Cascade~11|Glacis~12|Grand'Anse Mahe~13|Grand'Anse Praslin~14|La Digue~15|La Riviere Anglaise~16|Les Mamelles~24|Mont Buxton~17|Mont Fleuri~18|Plaisance~19|Pointe La Rue~20|Port Glaud~21|Roche Caiman~25|Saint Louis~22|Takamaka~23"],["Sierra Leone","SL","Eastern~E|Northern~N|Southern~S|Western~W"],["Singapore","SG","Central Singapore~01|North East~02|North West~03|South East~04|South West~05"],["Sint Maarten (Dutch part)","SX","Sint Maarten~undefined"],["Slovakia","SK","Banskobystricky~BC|Bratislavsky~BL|Kosicky~KI|Nitriansky~NI|Presovsky~PV|Trenciansky~TC|Trnavsky~TA|Zilinsky~ZI"],["Slovenia","SI","Ajdovscina~001|Apace~195|Beltinci~002|Benedikt~148|Bistrica ob Sotli~149|Bled~003|Bloke~150|Bohinj~004|Borovnica~005|Bovec~006|Braslovce~151|Brda~007|Brezice~009|Brezovica~008|Cankova~152|Celje~011|Cerklje na Gorenjskem~012|Cerknica~013|Cerkno~014|Cerkvenjak~153|Cirkulane~196|Crensovci~015|Crna na Koroskem~016|Crnomelj~017|Destrnik~018|Divaca~019|Dobje~154|Dobrepolje~020|Dobrna~155|Dobrova-Polhov Gradec~021|Dobrovnik~156|Dol pri Ljubljani~022|Dolenjske Toplice~157|Domzale~023|Dornava~024|Dravograd~025|Duplek~026|Gorenja Vas-Poljane~027|Gorisnica~028|Gorje~207|Gornja Radgona~029|Gornji Grad~030|Gornji Petrovci~031|Grad~158|Grosuplje~032|Hajdina~159|Hoce-Slivnica~160|Hodos~161|Horjul~162|Hrastnik~034|Hrpelje-Kozina~035|Idrija~036|Ig~037|Ilirska Bistrica~038|Ivancna Gorica~039|Izola~040|Jesenice~041|Jursinci~042|Kamnik~043|Kanal~044|Kidricevo~045|Kobarid~046|Kobilje~047|Kocevje~048|Komen~049|Komenda~164|Koper~050|Kodanjevica na Krki~197|Kostel~165|Kozje~051|Kranj~052|Kranjska Gora~053|Krizevci~166|Krsko~054|Kungota~055|Kuzma~056|Lasko~057|Lenart~058|Lendava~059|Litija~060|Ljubljana~061|Ljubno~062|Ljutomer~063|Log-Dragomer~208|Logatec~064|Loska Dolina~065|Loski Potok~066|Lovrenc na Pohorju~167|Lukovica~068|Luce~067|Majsperk~069|Makole~198|Maribor~070|Markovci~168|Medvode~071|Menges~072|Metlika~073|Mezica~074|Miklavz na Dravskem Polju~169|Miren-Kostanjevica~075|Mirna~212|Mirna Pec~170|Mislinja~076|Mokronog-Trebelno~199|Moravce~077|Moravske Toplice~078|Mozirje~079|Murska Sobota~080|Naklo~082|Nazarje~083|Nova Gorica~084|Novo Mesto~085|Odranci~086|Ormoz~087|Osilnica~088|Pesnica~089|Piran~090|Pivka~091|Podcetrtek~092|Podlehnik~172|Podvelka~093|Poljcane~200|Postojna~094|Prebold~174|Preddvor~095|Prevalje~175|Ptuj~096|Race-Fram~098|Radece~099|Radenci~100|Radlje ob Dravi~101|Radovljica~102|Ravne na Koroskem~103|Razkrizje~176|Recica ob Savinji~209|Rence-Vogrsko~201|Ribnica~104|Ribnica na Poboriu~177|Rogaska Slatina~106|Rogasovci~105|Rogatec~107|Ruse~108|Salovci~033|Selnica ob Dravi~178|Semic~109|Sempeter-Vrtojba~183|Sencur~117|Sentilj~118|Sentjernej~119|Sentjur~120|Sentrupert~211|Sevnica~110|Sezana~111|Skocjan~121|Skofja Loka~122|Skofljica~123|Slovenj Gradec~112|Slovenska Bistrica~113|Slovenske Konjice~114|Smarje pri elsah~124|Smarjeske Toplice~206|Smartno ob Paki~125|Smartno pri Litiji~194|Sodrazica~179|Solcava~180|Sostanj~126|Sredisce ob Dravi~202|Starse~115|Store~127|Straza~203|Sveta Ana~181|Sveta Trojica v Slovenskih Goricah~204|Sveta Andraz v Slovenskih Goricah~182|Sveti Jurij~116|Sveti Jurij v Slovenskih Goricah~210|Sveti Tomaz~205|Tabor~184|Tisina~010|Tolmin~128|Trbovlje~129|Trebnje~130|Trnovska Vas~185|Trzin~186|Trzic~131|Turnisce~132|Velenje~133|Velika Polana~187|Velike Lasce~134|Verzej~188|Videm~135|Vipava~136|Vitanje~137|Vodice~138|Vojnik~139|Vransko~189|Vrhnika~140|Vuzenica~141|Zagorje ob Savi~142|Zavrc~143|Zrece~144|Zalec~190|Zelezniki~146|Zetale~191|Ziri~147|Zirovnica~192|Zuzemberk~193"],["Solomon Islands","SB","Central~CE|Choiseul~CH|Guadalcanal~GU|Honiara~CT|Isabel~IS|Makira-Ulawa~MK|Malaita~ML|Rennell and Bellona~RB|Temotu~TE|Western~WE"],["Somalia","SO","Awdal~AW|Bakool~BK|Banaadir~BN|Bari~BR|Bay~BY|Galguduud~GA|Gedo~GE|Hiiraan~HI|Jubbada Dhexe~JD|Jubbada Hoose~JH|Mudug~MU|Nugaal~NU|Sanaag~SA|Shabeellaha Dhexe~SD|Shabeellaha Hoose~SH|Sool~SO|Togdheer~TO|Woqooyi Galbeed~WO"],["South Africa","ZA","Eastern Cape~EC|Free State~FS|Gauteng~GT|KwaZulu-Natal~NL|Limpopo~LP|Mpumalanga~MP|Northern Cape~NC|North West~NW|Western Cape~WC"],["South Georgia and South Sandwich Islands","GS","Bird Island~undefined|Bristol Island~undefined|Clerke Rocks~undefined|Montagu Island~undefined|Saunders Island~undefined|South Georgia~undefined|Southern Thule~undefined|Traversay Islands~undefined"],["South Sudan","SS","Central Equatoria~CE|Eastern Equatoria~EE|Jonglei~JG|Lakes~LK|Northern Bahr el Ghazal~BN|Unity~UY|Upper Nile~NU|Warrap~WR|Western Bahr el Ghazal~BW|Western Equatoria~EW"],["Spain","ES","Albacete~AB|Alicante~A|Almería~AN|Araba/Álava~VI|Asturias~O|Ávila~AV|Badajoz~BA|Barcelona~B|Bizkaia~BI|Burgos~BU|Cáceres~CC|Cádiz~CA|Cantabria~S|Castellón/Castelló~CS|Ceuta~CE|Ciudad Real~CR|Córdoba~CO|A Coruña~C|Cuenca~CU|Gipuzkoa~SS|Girona~GI|Granada~GR|Guadalajara~GU|Huelva~H|Huesca~HU|Illes Balears~PM|Jaén~J|León~LE|Lleida~L|Lugo~LU|Madrid~M|Málaga~MA|Melilla~ML|Murcia~MU|Navarra/Nafarroa~NA|Ourense~OR|Palencia~P|Las Palmas~GC|Pontevedra~PO|La Rioja~LO|Salamanca~SA|Santa Cruz de Tenerife~TF|Segovia~SG|Sevilla~SE|Soria~SO|Tarragona~T|Teruel~TE|Toledo~TO|Valencia/València~V|Valladolid~VA|Zamora~ZA|Zaragoza~Z"],["Sri Lanka","LK","Basnahira~1|Dakunu~3|Madhyama~2|Naegenahira~5|Sabaragamuwa~9|Uturu~4|Uturumaeda~7|Vayamba~6|Uva~8"],["Sudan","SD","Al Bahr al Ahmar~RS|Al Jazirah~GZ|Al Khartum~KH|Al Qadarif~GD|An Nil al Abyad~NW|An Nil al Azraq~NB|Ash Shamaliyah~NO|Gharb Darfur~DW|Gharb Kurdufan~GK|Janub Darfur~DS|Janub Kurdufan~KS|Kassala~KA|Nahr an Nil~NR|Shamal Darfur~DN|Sharq Darfur~DE|Shiamal Kurdufan~KN|Sinnar~SI|Wasat Darfur Zalinjay~DC"],["Suriname","SR","Brokopondo~BR|Commewijne~CM|Coronie~CR|Marowijne~MA|Nickerie~NI|Para~PR|Paramaribo~PM|Saramacca~SA|Sipaliwini~SI|Wanica~WA"],["Swaziland","SZ","Hhohho~HH|Lubombo~LU|Manzini~MA|Shiselweni~SH"],["Sweden","SE","Blekinge~K|Dalarna~W|Gävleborg~X|Gotland~I|Halland~N|Jämtland~Z|Jönköping~F|Kalmar~H|Kronoberg~G|Norrbotten~BD|Örebro~T|Östergötland~E|Skåne~M|Södermanland~D|Stockholm~AB|Uppsala~C|Värmland~S|Västerbotten~AC|Västernorrland~Y|Västmanland~U|Västra Götaland~O"],["Switzerland","CH","Aargau~AG|Appenzell Ausserrhoden~AR|Appenzell Innerhoden~AI|Basel-Landschaft~BL|Basel-Stadt~BS|Bern~BE|Fribourg~FR|Genève~GE|Glarus~GL|Graubünden~GR|Jura~JU|Luzern~LU|Neuchâtel~NE|Nidwalden~NW|Obwalden~OW|Sankt Gallen~SG|Schaffhausen~SH|Schwyz~SZ|Solothurn~SO|Thurgau~TG|Ticino~TI|Uri~UR|Valais~VS|Vaud~VD|Zug~ZG|Zürich~ZH"],["Syrian Arab Republic","SY","Al Hasakah~HA|Al Ladhiqiyah~LA|Al Qunaytirah~QU|Ar Raqqah~RA|As Suwayda'~SU|Dar'a~DR|Dayr az Zawr~DY|Dimashq~DI|Halab~HL|Hamah~HM|Hims~HI|Idlib~ID|Rif Dimashq~RD|Tartus~TA"],["Taiwan","TW","Chang-hua~CHA|Chia-i~CYQ|Hsin-chu~HSQ|Hua-lien~HUA|Kao-hsiung~KHH|Keelung~KEE|Kinmen~KIN|Lienchiang~LIE|Miao-li~MIA|Nan-t'ou~NAN|P'eng-hu~PEN|New Taipei~NWT|P'ing-tung~PING|T'ai-chung~TXG|T'ai-nan~TNN|T'ai-pei~TPE|T'ai-tung~TTT|T'ao-yuan~TAO|Yi-lan~ILA|Yun-lin~YUN"],["Tajikistan","TJ","Dushanbe~DU|Kŭhistoni Badakhshon~GB|Khatlon~KT|Sughd~SU"],["Tanzania, United Republic of","TZ","Arusha~01|Coast~19|Dar es Salaam~02|Dodoma~03|Iringa~04|Kagera~05|Kigoma~08|Kilimanjaro~09|Lindi~12|Manyara~26|Mara~13|Mbeya~14|Morogoro~16|Mtwara~17|Mwanza~18|Pemba North~06|Pemba South~10|Rukwa~20|Ruvuma~21|Shinyanga~22|Singida~23|Tabora~24|Tanga~25|Zanzibar North~07|Zanzibar Central/South~11|Zanzibar Urban/West~15"],["Thailand","TH","Amnat Charoen~37|Ang Thong~15|Bueng Kan~38|Buri Ram~31|Chachoengsao~24|Chai Nat~18|Chaiyaphum~36|Chanthaburi~22|Chiang Mai~50|Chiang Rai~57|Chon Buri~20|Chumphon~86|Kalasin~46|Kamphaeng Phet~62|Kanchanaburi~71|Khon Kaen~40|Krabi~81|Krung Thep Mahanakhon (Bangkok)~10|Lampang~52|Lamphun~51|Loei~42|Lop Buri~16|Mae Hong Son~58|Maha Sarakham~44|Mukdahan~49|Nakhon Nayok~26|Nakhon Phathom~73|Nakhon Phanom~48|Nakhon Ratchasima~30|Nakhon Sawan~60|Nakhon Si Thammarat~80|Nan~55|Narathiwat~96|Nong Bua Lam Phu~39|Nong Khai~43|Nonthaburi~12|Pathum Thani~13|Pattani~94|Phangnga~82|Phatthalung~93|Phayao~56|Phetchabun~67|Phetchaburi~76|Phichit~66|Phitsanulok~65|Phra Nakhon Si Ayutthaya~14|Phrae~54|Phuket~83|Prachin Buri~25|Prachuap Khiri Khan~77|Ranong~85|Ratchaburi~70|Rayong~21|Roi Et~45|Sa Kaeo~27|Sakon Nakhon~47|Samut Prakan~11|Samut Sakhon~74|Samut Songkhram~75|Saraburi~19|Satun~91|Sing Buri~17|Si Sa ket~33|Songkhla~90|Sukhothai~64|Suphan Buri~72|Surat Thani~84|Surin~32|Tak~63|Trang~92|Trat~23|Ubon Ratchathani~34|Udon Thani~41|Uthai Thani~61|Uttaradit~53|Yala~95|Yasothon~35"],["Timor-Leste","TL","Aileu~AL|Ainaro~AN|Baucau~BA|Bobonaro~BO|Cova Lima~CO|Dili~DI|Ermera~ER|Lautem~LA|Liquica~LI|Manatuto~MT|Manufahi~MF|Oecussi~OE|Viqueque~VI"],["Togo","TG","Centre~C|Kara~K|Maritime~M|Plateaux~P|Savannes~S"],["Tokelau","TK","Atafu~undefined|Fakaofo~undefined|Nukunonu~undefined"],["Tonga","TO","'Eua~01|Ha'apai~02|Niuas~03|Tongatapu~04|Vava'u~05"],["Trinidad and Tobago","TT","Arima~ARI|Chaguanas~CHA|Couva-Tabaquite-Talparo~CTT|Diefo Martin~DMN|Mayaro-Rio Claro~MRC|Penal-Debe~PED|Point Fortin~PTF|Port-of-Spain~POS|Princes Town~PRT|San Fernando~SFO|San Juan-Laventille~SJL|Sangre Grande~SGE|Siparia~SIP|Tobago~TOB|Tunapuna-Piarco~TUP"],["Tunisia","TN","Ariana~12|Beja~31|Ben Arous~13|Bizerte~23|Gabes~81|Gafsa~71|Jendouba~32|Kairouan~41|Kasserine~42|Kebili~73|Kef~33|Mahdia~53|Medenine~82|Monastir~52|Nabeul~21|Sfax~61|Sidi Bouzid~43|Siliana~34|Sousse~51|Tataouine~83|Tozeur~72|Tunis~11|Zaghouan~22"],["Turkey","TR","Adana~01|Adiyaman~02|Afyonkarahisar~03|Agri~04|Aksaray~68|Amasya~05|Ankara~06|Antalya~07|Ardahan~75|Artvin~08|Aydin~09|Balikesir~10|Bartin~74|Batman~72|Bayburt~69|Bilecik~11|Bingol~12|Bitlis~13|Bolu~14|Burdur~15|Bursa~16|Canakkale~17|Cankiri~18|Corum~19|Denizli~20|Diyarbakir~21|Duzce~81|Edirne~22|Elazig~23|Erzincan~24|Erzurum~25|Eskisehir~26|Gaziantep~27|Giresun~28|Gumushane~29|Hakkari~30|Hatay~31|Igdir~76|Isparta~32|Istanbul~34|Izmir~35|Kahramanmaras~46|Karabuk~78|Karaman~70|Kars~36|Kastamonu~37|Kayseri~38|Kilis~79|Kirikkale~71|Kirklareli~39|Kirsehir~40|Kocaeli~41|Konya~42|Kutahya~43|Malatya~44|Manisa~45|Mardin~47|Mersin~33|Mugla~48|Mus~49|Nevsehir~50|Nigde~51|Ordu~52|Osmaniye~80|Rize~53|Sakarya~54|Samsun~55|Sanliurfa~63|Siirt~56|Sinop~57|Sirnak~73|Sivas~58|Tekirdag~59|Tokat~60|Trabzon~61|Tunceli~62|Usak~64|Van~65|Yalova~77|Yozgat~66|Zonguldak~67"],["Turkmenistan","TM","Ahal~A|Asgabat~S|Balkan~B|Dashoguz~D|Lebap~L|Mary~M"],["Turks and Caicos Islands","TC","Turks and Caicos Islands~undefined"],["Tuvalu","TV","Funafuti~FUN|Nanumanga~NMG|Nanumea~NMA|Niutao~NIT|Nui~NUI|Nukufetau~NKF|Nukulaelae~NKL|Vaitupu~VAU"],["Uganda","UG","Abim~317|Adjumani~301|Amolatar~314|Amuria~216|Amuru~319|Apac~302|Arua~303|Budaka~217|Bududa~223|Bugiri~201|Bukedea~224|Bukwa~218|Buliisa~419|Bundibugyo~401|Bushenyi~402|Busia~202|Butaleja~219|Dokolo~318|Gulu~304|Hoima~403|Ibanda~416|Iganga~203|Isingiro~417|Jinja~204|Kaabong~315|Kabale~404|Kabarole~405|Kaberamaido~213|Kalangala~101|Kaliro~220|Kampala~102|Kamuli~205|Kamwenge~413|Kanungu~414|Kapchorwa~206|Kasese~406|Katakwi~207|Kayunga~112|Kibaale~407|Kiboga~103|Kiruhura~418|Kisoro~408|Kitgum~305|Koboko~316|Kotido~306|Kumi~208|Kyenjojo~415|Lira~307|Luwero~104|Lyantonde~116|Manafwa~221|Maracha~320|Masaka~105|Masindi~409|Mayuge~214|Mbale~209|Mbarara~410|Mityana~114|Moroto~308|Moyo~309|Mpigi~106|Mubende~107|Mukono~108|Nakapiripirit~311|Nakaseke~115|Nakasongola~109|Namutumba~222|Nebbi~310|Ntungamo~411|Oyam~321|Pader~312|Pallisa~210|Rakai~110|Rukungiri~412|Sembabule~111|Sironko~215|Soroti~211|Tororo~212|Wakiso~113|Yumbe~313"],["Ukraine","UA","Cherkasy~71|Chernihiv~74|Chernivtsi~77|Dnipropetrovsk~12|Donetsk~14|Ivano-Frankivsk~26|Kharkiv~63|Kherson~65|Khmelnytskyi~68|Kiev~32|Kirovohrad~35|Luhansk~09|Lviv~46|Mykolaiv~48|Odessa~51|Poltava~53|Rivne~56|Sumy~59|Ternopil~61|Vinnytsia~05|Volyn~07|Zakarpattia~21|Zaporizhia~23|Zhytomyr~18|Avtonomna Respublika Krym~43|Kyïv~30|Sevastopol~40"],["United Arab Emirates","AE","Abu Dhabi~AZ|Ajman~AJ|Dubai~DU|Fujairah~FU|Ras al Khaimah~RK|Sharjah~SH|Umm Al Quwain~UQ"],["United Kingdom","GB","Aberdeen City~ABE|Aberdeenshire~ABD|Angus~ANS|Antrim and Newtownabbey~ANN|Ards and North Down~AND|Argyll and Bute~AGB|Armagh, Banbridge and Craigavon~ABC|Barking and Dagenham~BDG|Barnet~BNE|Barnsley~BNS|Bath and North East Somerset~BAS|Bedford~BDF|Belfast~BFS|Bexley~BEX|Birmingham~BIR|Blackburn with Darwen~BBD|Blackpool~BPL|Blaenau Gwent~BGW|Bolton~BOL|Bournemouth~BMH|Bracknell Forest~BRC|Bradford~BRD|Brent~BEN|Bridgend~BGE|Brighton and Hove~BNH|Bristol, City of~BST|Bromley~BRY|Buckinghamshire~BKM|Bury~BUR|Caerphilly~CAY|Calderdale~CLD|Cambridgeshire~CAM|Camden~CMD|Cardiff~CRF|Carmarthenshire~CMN|Causeway Coast and Glens~CCG|Central Bedfordshire~CBF|Ceredigion~CGN|Cheshire East~CHE|Cheshire West and Chester~CHW|Clackmannanshire~CLK|Conwy~CWY|Cornwall~CON|Coventry~COV|Croydon~CRY|Cumbria~CMA|Darlington~DAL|Denbighshire~DEN|Derby~DER|Derbyshire~DBY|Derry and Strabane~DRS|Devon~DEV|Doncaster~DNC|Dorset~DOR|Dudley~DUD|Dumfries and Galloway~DGY|Dundee City~DND|Durham County~DUR|Ealing~EAL|East Ayrshire~EAY|East Dunbartonshire~EDU|East Lothian~ELN|East Renfrewshire~ERW|East Riding of Yorkshire~ERY|East Sussex~ESX|Edinburgh, City of~EDH|Eilean Siar~ELS|Enfield~ENF|Essex~ESS|Falkirk~FAL|Fermanagh and Omagh~FMO|Fife~FIF|Flintshire~FLN|Gateshead~GAT|Glasgow City~GLG|Gloucestershire~GLS|Greenwich~GRE|Gwynedd~GWN|Hackney~HCK|Halton~HAL|Hammersmith and Fulham~HMF|Hampshire~HAM|Haringey~HRY|Harrow~HRW|Hartlepool~HPL|Havering~HAV|Herefordshire~HEF|Hertfordshire~HRT|Highland~HLD|Hillingdon~HIL|Hounslow~HNS|Inverclyde~IVC|Isle of Anglesey~AGY|Isle of Wight~IOW|Isles of Scilly~IOS|Islington~ISL|Kensington and Chelsea~KEC|Kent~KEN|Kingston upon Hull~KHL|Kingston upon Thames~KTT|Kirklees~KIR|Knowsley~KWL|Lambeth~LBH|Lancashire~LAN|Leeds~LDS|Leicester~LCE|Leicestershire~LEC|Lewisham~LEW|Lincolnshire~LIN|Lisburn and Castlereagh~LBC|Liverpool~LIV|London, City of~LND|Luton~LUT|Manchester~MAN|Medway~MDW|Merthyr Tydfil~MTY|Merton~MRT|Mid and East Antrim~MEA|Mid Ulster~MUL|Middlesbrough~MDB|Midlothian~MLN|Milton Keynes~MIK|Monmouthshire~MON|Moray~MRY|Neath Port Talbot~NTL|Newcastle upon Tyne~NET|Newham~NWM|Newport~NWP|Newry, Mourne and Down~NMD|Norfolk~NFK|North Ayrshire~NAY|North East Lincolnshire~NEL|North Lanarkshire~NLK|North Lincolnshire~NLN|North Somerset~NSM|North Tyneside~NTY|North Yorkshire~NYK|Northamptonshire~NTH|Northumberland~NBL|Nottingham~NGM|Nottinghamshire~NTT|Oldham~OLD|Orkney Islands~ORK|Oxfordshire~OXF|Pembrokeshire~PEM|Perth and Kinross~PKN|Peterborough~PTE|Plymouth~PLY|Poole~POL|Portsmouth~POR|Powys~POW|Reading~RDG|Redbridge~RDB|Redcar and Cleveland~RCC|Renfrewshire~RFW|Rhondda, Cynon, Taff~RCT|Richmond upon Thames~RIC|Rochdale~RCH|Rotherham~ROT|Rutland~RUT|St. Helens~SHN|Salford~SLF|Sandwell~SAW|Scottish Borders, The~SCB|Sefton~SFT|Sheffield~SHF|Shetland Islands~ZET|Shropshire~SHR|Slough~SLG|Solihull~SOL|Somerset~SOM|South Ayrshire~SAY|South Gloucestershire~SGC|South Lanarkshire~SLK|South Tyneside~STY|Southampton~STH|Southend-on-Sea~SOS|Southwark~SWK|Staffordshire~STS|Stirling~STG|Stockport~SKP|Stockton-on-Tees~STT|Stoke-on-Trent~STE|Suffolk~SFK|Sunderland~SND|Surrey~SRY|Sutton~STN|Swansea~SWA|Swindon~SWD|Tameside~TAM|Telford and Wrekin~TFW|Thurrock~THR|Torbay~TOB|Torfaen~TOF|Tower Hamlets~TWH|Trafford~TRF|Vale of Glamorgan, The~VGL|Wakefield~WKF|Walsall~WLL|Waltham Forest~WFT|Wandsworth~WND|Warrington~WRT|Warwickshire~WAR|West Berkshire~WBK|West Dunbartonshire~WDU|West Lothian~WLN|West Sussex~WSX|Westminster~WSM|Wigan~WGN|Wiltshire~WIL|Windsor and Maidenhead~WNM|Wirral~WRL|Wokingham~WOK|Wolverhampton~WLV|Worcestershire~WOR|Wrexham~WRX|York~YOR"],["United States","US","Alabama~AL|Alaska~AK|American Samoa~AS|Arizona~AZ|Arkansas~AR|California~CA|Colorado~CO|Connecticut~CT|Delaware~DE|District of Columbia~DC|Micronesia~FM|Florida~FL|Georgia~GA|Guam~GU|Hawaii~HI|Idaho~ID|Illinois~IL|Indiana~IN|Iowa~IA|Kansas~KS|Kentucky~KY|Louisiana~LA|Maine~ME|Marshall Islands~MH|Maryland~MD|Massachusetts~MA|Michigan~MI|Minnesota~MN|Mississippi~MS|Missouri~MO|Montana~MT|Nebraska~NE|Nevada~NV|New Hampshire~NH|New Jersey~NJ|New Mexico~NM|New York~NY|North Carolina~NC|North Dakota~ND|Northern Mariana Islands~MP|Ohio~OH|Oklahoma~OK|Oregon~OR|Palau~PW|Pennsylvania~PA|Puerto Rico~PR|Rhode Island~RI|South Carolina~SC|South Dakota~SD|Tennessee~TN|Texas~TX|Utah~UT|Vermont~VT|Virgin Islands~VI|Virginia~VA|Washington~WA|West Virginia~WV|Wisconsin~WI|Wyoming~WY|Armed Forces Americas~AA|Armed Forces Europe, Canada, Africa and Middle East~AE|Armed Forces Pacific~AP"],["United States Minor Outlying Islands","UM","Baker Island~81|Howland Island~84|Jarvis Island~86|Johnston Atoll~67|Kingman Reef~89|Midway Islands~71|Navassa Island~76|Palmyra Atoll~95|Wake Island~79|Bajo Nuevo Bank~BN|Serranilla Bank~SB"],["Uruguay","UY","Artigas~AR|Canelones~CA|Cerro Largo~CL|Colonia~CO|Durazno~DU|Flores~FS|Florida~FD|Lavalleja~LA|Maldonado~MA|Montevideo~MO|Paysandú~PA|Río Negro~RN|Rivera~RV|Rocha~RO|Salto~SA|San José~SJ|Soriano~SO|Tacuarembó~TA|Treinta y Tres~TT"],["Uzbekistan","UZ","Toshkent shahri~TK|Andijon~AN|Buxoro~BU|Farg‘ona~FA|Jizzax~JI|Namangan~NG|Navoiy~NW|Qashqadaryo (Qarshi)~QA|Samarqand~SA|Sirdaryo (Guliston)~SI|Surxondaryo (Termiz)~SU|Toshkent wiloyati~TO|Xorazm (Urganch)~XO|Qoraqalpog‘iston Respublikasi (Nukus)~QR"],["Vanuatu","VU","Malampa~MAP|Pénama~PAM|Sanma~SAM|Shéfa~SEE|Taféa~TAE|Torba~TOB"],["Venezuela, Bolivarian Republic of","VE","Dependencias Federales~W|Distrito Federal~A|Amazonas~Z|Anzoátegui~B|Apure~C|Aragua~D|Barinas~E|Bolívar~F|Carabobo~G|Cojedes~H|Delta Amacuro~Y|Falcón~I|Guárico~J|Lara~K|Mérida~L|Miranda~M|Monagas~N|Nueva Esparta~O|Portuguesa~P|Sucre~R|Táchira~S|Trujillo~T|Vargas~X|Yaracuy~U|Zulia~V"],["Vietnam","VN","An Giang~44|Bà Rịa - Vũng Tàu~43|Bình Dương~57|Bình Phước~58|Bình Định~31|Bình Thuận~40|Bạc Liêu~55|Bắc Giang~54|Bắc Kạn~53|Bắc Ninh~56|Bến Tre~50|Cao Bằng~04|Cà Mau~undefined|Đắk Lắk~33|Đắk Nông~72|Điện Biên~71|Đồng Nai~39|Đồng Tháp~45|Gia Lai~30|Hà Giang~03|Hà Nam~63|Hà Tây~15|Hà Tĩnh~23|Hải Dương~61|Hậu Giang~73|Hòa Bình~14|Hưng Yên~66|Khánh Hòa~34|Kiên Giang~47|Kon Tum~28|Lai Châu~01|Lâm Đồng~35|Lạng Sơn~09|Lào Cai~02|Long An~41|Nam Định~67|Nghệ An~22|Ninh Bình~18|Ninh Thuận~36|Phú Thọ~68|Phú Yên~32|Quảng Bình~24|Quảng Nam~27|Quảng Ngãi~29|Quảng Ninh~13|Quảng Trị~25|Sóc Trăng~52|Sơn La~05|Tây Ninh~37|Thái Bình~20|Thái Nguyên~69|Thanh Hóa~21|Thừa Thiên–Huế~26|Tiền Giang~46|Trà Vinh~51|Tuyên Quang~07|Vĩnh Long~49|Vĩnh Phúc~70|Yên Bái~06|Cần Thơ~CT|Đà Nẵng~DN|Hà Nội~HN|Hải Phòng~HP|Hồ Chí Minh (Sài Gòn)~SG"],["Virgin Islands, British","VG","Anegada~ANG|Jost Van Dyke~JVD|Tortola~TTA|Virgin Gorda~VGD"],["Virgin Islands, U.S.","VI","St. Thomas~STH|St. John~SJO|St. Croix~SCR"],["Wallis and Futuna","WF","Alo~ALO|Sigave~SIG|Wallis~WAL"],["Western Sahara","EH","Es Smara~ESM|Boujdour~BOD|Laâyoune~LAA|Aousserd~AOU|Oued ed Dahab~OUD"],["Yemen","YE","Abyān~AB|'Adan~AD|Aḑ Ḑāli'~DA|Al Bayḑā'~BA|Al Ḩudaydah~HU|Al Jawf~JA|Al Mahrah~MR|Al Maḩwīt~MW|'Amrān~AM|Dhamār~DH|Ḩaḑramawt~HD|Ḩajjah~HJ|Ibb~IB|Laḩij~LA|Ma'rib~MA|Raymah~RA|Şā‘dah~SD|Şan‘ā'~SN|Shabwah~SH|Tā‘izz~TA"],["Zambia","ZM","Central~02|Copperbelt~08|Eastern~03|Luapula~04|Lusaka~09|Northern~05|North-Western~06|Southern~07|Western~01"],["Zimbabwe","ZW","Bulawayo~BU|Harare~HA|Manicaland~MA|Mashonaland Central~MC|Mashonaland East~ME|Mashonaland West~MW|Masvingo~MV|Matabeleland North~MN|Matabeleland South~MS|Midlands~MI"]];

var C = {
	DISPLAY_TYPE_FULL: 'full',
	DISPLAY_TYPE_SHORT: 'short',
	REGION_LIST_DELIMITER: '|',
	SINGLE_REGION_DELIMITER: '~'
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// reduces the subset of countries depending on whether the user specified a white/blacklist, and lists priority
// countries first
var filterCountries = function filterCountries(countries, priorityCountries, whitelist, blacklist) {
	var countriesListedFirst = [];
	var filteredCountries = countries;

	if (whitelist.length > 0) {
		filteredCountries = countries.filter(function (_ref) {
			var _ref2 = slicedToArray(_ref, 2),
			    countrySlug = _ref2[1];

			return whitelist.indexOf(countrySlug) > -1;
		});
	} else if (blacklist.length > 0) {
		filteredCountries = countries.filter(function (_ref3) {
			var _ref4 = slicedToArray(_ref3, 2),
			    countrySlug = _ref4[1];

			return blacklist.indexOf(countrySlug) === -1;
		});
	}

	if (priorityCountries.length > 0) {

		// ensure the countries are added in the order in which they are specified by the user
		priorityCountries.forEach(function (slug) {
			var result = filteredCountries.find(function (_ref5) {
				var _ref6 = slicedToArray(_ref5, 2),
				    countrySlug = _ref6[1];

				return countrySlug === slug;
			});
			if (result) {
				countriesListedFirst.push(result);
			}
		});

		filteredCountries = filteredCountries.filter(function (_ref7) {
			var _ref8 = slicedToArray(_ref7, 2),
			    countrySlug = _ref8[1];

			return priorityCountries.indexOf(countrySlug) === -1;
		});
	}

	return countriesListedFirst.length ? [].concat(countriesListedFirst, toConsumableArray(filteredCountries)) : filteredCountries;
};

// called when requesting new regions. It reduces the subset of regions depending on whether the user specifies
// a white/blacklist
var filterRegions = function filterRegions(regionsObject, whitelistObject, blacklistObject) {
	var _regionsObject = slicedToArray(regionsObject, 3),
	    country = _regionsObject[0],
	    countryCode = _regionsObject[1],
	    regions = _regionsObject[2];

	var whitelist = whitelistObject.hasOwnProperty(countryCode) ? whitelistObject[countryCode] : [];
	var blacklist = blacklistObject.hasOwnProperty(countryCode) ? blacklistObject[countryCode] : [];
	var filteredRegions = regions.split('|');

	if (whitelist.length > 0 && filteredRegions.length > 0) {
		filteredRegions = filteredRegions.filter(function (region) {
			for (var i = 0, n = whitelist.length; i < n; i++) {
				if (region.indexOf(whitelist[i]) > -1) {
					return true;
				}
			}
			return false;
		});
	} else if (blacklist.length > 0 && filteredRegions.length > 0) {
		filteredRegions = filteredRegions.filter(function (region) {
			for (var i = 0, n = blacklist.length; i < n; i++) {
				if (region.indexOf(blacklist[i]) > -1) {
					return false;
				}
			}

			return true;
		});
	}

	return [country, countryCode, filteredRegions.join('|')];
};

var CountryDropdown = function (_Component) {
	inherits(CountryDropdown, _Component);

	function CountryDropdown(props) {
		classCallCheck(this, CountryDropdown);

		var _this = possibleConstructorReturn(this, (CountryDropdown.__proto__ || Object.getPrototypeOf(CountryDropdown)).call(this, props));

		_this.state = {
			countries: filterCountries(CountryRegionData, props.priorityOptions, props.whitelist, props.blacklist)
		};
		return _this;
	}

	createClass(CountryDropdown, [{
		key: 'getCountries',
		value: function getCountries() {
			var _props = this.props,
			    valueType = _props.valueType,
			    labelType = _props.labelType;


			return this.state.countries.map(function (_ref) {
				var _ref2 = slicedToArray(_ref, 2),
				    countryName = _ref2[0],
				    countrySlug = _ref2[1];

				return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
					'option',
					{ value: valueType === C.DISPLAY_TYPE_SHORT ? countrySlug : countryName, key: countrySlug },
					labelType === C.DISPLAY_TYPE_SHORT ? countrySlug : countryName
				);
			});
		}
	}, {
		key: 'getDefaultOption',
		value: function getDefaultOption() {
			var _props2 = this.props,
			    showDefaultOption = _props2.showDefaultOption,
			    defaultOptionLabel = _props2.defaultOptionLabel;

			if (!showDefaultOption) {
				return null;
			}
			return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
				'option',
				{ value: '', key: 'default' },
				defaultOptionLabel
			);
		}
	}, {
		key: 'render',
		value: function render() {
			// unused properties deliberately added so arbitraryProps gets populated with anything else the user specifies
			var _props3 = this.props,
			    name = _props3.name,
			    id = _props3.id,
			    classes = _props3.classes,
			    value = _props3.value,
			    _onChange = _props3.onChange,
			    _onBlur = _props3.onBlur,
			    disabled = _props3.disabled,
			    showDefaultOption = _props3.showDefaultOption,
			    defaultOptionLabel = _props3.defaultOptionLabel,
			    labelType = _props3.labelType,
			    valueType = _props3.valueType,
			    whitelist = _props3.whitelist,
			    blacklist = _props3.blacklist,
			    customOptions = _props3.customOptions,
			    priorityOptions = _props3.priorityOptions,
			    arbitraryProps = objectWithoutProperties(_props3, ['name', 'id', 'classes', 'value', 'onChange', 'onBlur', 'disabled', 'showDefaultOption', 'defaultOptionLabel', 'labelType', 'valueType', 'whitelist', 'blacklist', 'customOptions', 'priorityOptions']);


			var attrs = _extends({}, arbitraryProps, {
				name: name,
				value: value,
				onChange: function onChange(e) {
					return _onChange(e.target.value, e);
				},
				onBlur: function onBlur(e) {
					return _onBlur(e.target.value, e);
				},
				disabled: disabled
			});
			if (id) {
				attrs.id = id;
			}
			if (classes) {
				attrs.className = classes;
			}

			return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
				'select',
				attrs,
				this.getDefaultOption(),
				this.getCountries()
			);
		}
	}]);
	return CountryDropdown;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);


CountryDropdown.propTypes = {
	value: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number)]),
	name: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	id: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	classes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	showDefaultOption: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
	defaultOptionLabel: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number)]),
	priorityOptions: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
	onChange: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
	onBlur: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
	labelType: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf([C.DISPLAY_TYPE_FULL, C.DISPLAY_TYPE_SHORT]),
	valueType: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf([C.DISPLAY_TYPE_FULL, C.DISPLAY_TYPE_SHORT]),
	whitelist: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
	blacklist: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
	disabled: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool)
};
CountryDropdown.defaultProps = {
	value: '',
	name: 'rcrs-country',
	id: '',
	classes: '',
	showDefaultOption: true,
	defaultOptionLabel: 'Select Country',
	priorityOptions: [],
	onChange: function onChange() {},
	onBlur: function onBlur() {},
	labelType: C.DISPLAY_TYPE_FULL,
	valueType: C.DISPLAY_TYPE_FULL,
	whitelist: [],
	blacklist: [],
	disabled: false
};

var RegionDropdown = function (_PureComponent) {
	inherits(RegionDropdown, _PureComponent);

	function RegionDropdown(props) {
		classCallCheck(this, RegionDropdown);

		var _this = possibleConstructorReturn(this, (RegionDropdown.__proto__ || Object.getPrototypeOf(RegionDropdown)).call(this, props));

		_this.state = {
			regions: _this.getRegions(props.country)
		};
		_this.getRegions = _this.getRegions.bind(_this);
		return _this;
	}

	createClass(RegionDropdown, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var country = this.props.country;

			if (country === prevProps.country) {
				return;
			}

			var defaultRegions = this.getRegions(country);

			this.setState({
				regions: [].concat(toConsumableArray(defaultRegions), toConsumableArray(this.getCustomOptions(defaultRegions)))
			});
		}
	}, {
		key: 'getCustomOptions',
		value: function getCustomOptions(regions) {
			var customOptions = this.props.customOptions;


			var duplicateRegions = this.getDuplicates(regions);

			if (duplicateRegions.length) {
				console.error('Error: Duplicate regions present: ' + duplicateRegions.toString() + '.\nThe above item(s) is/are already getting added to the region dropdown by the library.');
				return [];
			}

			return customOptions.map(function (option) {
				if (option) {
					return { regionName: option, regionShortCode: option };
				}
			});
		}
	}, {
		key: 'getDuplicates',
		value: function getDuplicates(regions) {
			var _props = this.props,
			    customOptions = _props.customOptions,
			    valueType = _props.valueType;

			var regionKey = valueType === C.DISPLAY_TYPE_FULL ? 'regionName' : 'regionShortCode';

			return regions.filter(function (region) {
				return customOptions.indexOf(region[regionKey]) !== -1;
			}).map(function (region) {
				return region[regionKey];
			});
		}
	}, {
		key: 'getRegions',
		value: function getRegions(country) {
			if (!country) {
				return [];
			}

			var _props2 = this.props,
			    countryValueType = _props2.countryValueType,
			    whitelist = _props2.whitelist,
			    blacklist = _props2.blacklist;

			var searchIndex = countryValueType === C.DISPLAY_TYPE_FULL ? 0 : 1;
			var regions = [];
			CountryRegionData.forEach(function (i) {
				if (i[searchIndex] === country) {
					regions = i;
				}
			});

			// this could happen if the user is managing the state of the region/country themselves and screws up passing
			// in a valid country
			if (!regions || regions.length === 0) {
				console.error('Error. Unknown country passed: ' + country + '. If you\'re passing a country shortcode, be sure to include countryValueType="short" on the RegionDropdown');
				return [];
			}

			var filteredRegions = filterRegions(regions, whitelist, blacklist);

			return filteredRegions[2].split(C.REGION_LIST_DELIMITER).map(function (regionPair) {
				var _regionPair$split = regionPair.split(C.SINGLE_REGION_DELIMITER),
				    _regionPair$split2 = slicedToArray(_regionPair$split, 2),
				    regionName = _regionPair$split2[0],
				    _regionPair$split2$ = _regionPair$split2[1],
				    regionShortCode = _regionPair$split2$ === undefined ? null : _regionPair$split2$;

				return { regionName: regionName, regionShortCode: regionShortCode };
			});
		}
	}, {
		key: 'getRegionList',
		value: function getRegionList() {
			var _props3 = this.props,
			    labelType = _props3.labelType,
			    valueType = _props3.valueType;

			return this.state.regions.map(function (_ref) {
				var regionName = _ref.regionName,
				    regionShortCode = _ref.regionShortCode;

				var label = labelType === C.DISPLAY_TYPE_FULL ? regionName : regionShortCode;
				var value = valueType === C.DISPLAY_TYPE_FULL ? regionName : regionShortCode;
				return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
					'option',
					{ value: value, key: regionName },
					label
				);
			});
		}

		// there are two default options. The "blank" option which shows up when the user hasn't selected a country yet, and
		// a "default" option which shows

	}, {
		key: 'getDefaultOption',
		value: function getDefaultOption() {
			var _props4 = this.props,
			    blankOptionLabel = _props4.blankOptionLabel,
			    showDefaultOption = _props4.showDefaultOption,
			    defaultOptionLabel = _props4.defaultOptionLabel,
			    country = _props4.country;

			if (!country) {
				return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
					'option',
					{ value: '' },
					blankOptionLabel
				);
			}
			if (showDefaultOption) {
				return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
					'option',
					{ value: '' },
					defaultOptionLabel
				);
			}
			return null;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props5 = this.props,
			    value = _props5.value,
			    country = _props5.country,
			    _onChange = _props5.onChange,
			    _onBlur = _props5.onBlur,
			    id = _props5.id,
			    name = _props5.name,
			    classes = _props5.classes,
			    disabled = _props5.disabled,
			    blankOptionLabel = _props5.blankOptionLabel,
			    showDefaultOption = _props5.showDefaultOption,
			    defaultOptionLabel = _props5.defaultOptionLabel,
			    labelType = _props5.labelType,
			    valueType = _props5.valueType,
			    countryValueType = _props5.countryValueType,
			    disableWhenEmpty = _props5.disableWhenEmpty,
			    customOptions = _props5.customOptions,
			    arbitraryProps = objectWithoutProperties(_props5, ['value', 'country', 'onChange', 'onBlur', 'id', 'name', 'classes', 'disabled', 'blankOptionLabel', 'showDefaultOption', 'defaultOptionLabel', 'labelType', 'valueType', 'countryValueType', 'disableWhenEmpty', 'customOptions']);


			var isDisabled = disabled || disableWhenEmpty && country === '';
			var attrs = _extends({}, arbitraryProps, {
				name: name,
				value: value,
				onChange: function onChange(e) {
					return _onChange(e.target.value, e);
				},
				onBlur: function onBlur(e) {
					return _onBlur(e.target.value, e);
				},
				disabled: isDisabled
			});
			if (id) {
				attrs.id = id;
			}
			if (classes) {
				attrs.className = classes;
			}

			return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
				'select',
				attrs,
				this.getDefaultOption(),
				this.getRegionList()
			);
		}
	}]);
	return RegionDropdown;
}(react__WEBPACK_IMPORTED_MODULE_0__.PureComponent);


RegionDropdown.propTypes = {
	country: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	countryValueType: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf([C.DISPLAY_TYPE_FULL, C.DISPLAY_TYPE_SHORT]),
	value: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number)]),
	name: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	id: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	classes: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	blankOptionLabel: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	showDefaultOption: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
	defaultOptionLabel: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	onChange: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
	onBlur: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
	labelType: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	valueType: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
	whitelist: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
	blacklist: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
	disabled: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
	disableWhenEmpty: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
	customOptions: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array)
};
RegionDropdown.defaultProps = {
	country: '',
	value: '',
	name: 'rcrs-region',
	id: '',
	classes: '',
	blankOptionLabel: '-',
	showDefaultOption: true,
	defaultOptionLabel: 'Select Region',
	onChange: function onChange() {},
	onBlur: function onBlur() {},
	countryValueType: C.DISPLAY_TYPE_FULL,
	labelType: C.DISPLAY_TYPE_FULL,
	valueType: C.DISPLAY_TYPE_FULL,
	whitelist: {},
	blacklist: {},
	disabled: false,
	disableWhenEmpty: false,
	customOptions: []
};


//# sourceMappingURL=rcrs.es.js.map


/***/ }),

/***/ "./node_modules/react-dropzone/dist/es/index.js":
/*!******************************************************!*\
  !*** ./node_modules/react-dropzone/dist/es/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorCode": () => (/* reexport safe */ _utils_index__WEBPACK_IMPORTED_MODULE_3__.ErrorCode),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "useDropzone": () => (/* binding */ useDropzone)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var file_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! file-selector */ "./node_modules/file-selector/dist/es5/index.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./node_modules/react-dropzone/dist/es/utils/index.js");
var _excluded = ["children"],
    _excluded2 = ["open"],
    _excluded3 = ["refKey", "role", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnter", "onDragOver", "onDragLeave", "onDrop"],
    _excluded4 = ["refKey", "onChange", "onClick"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint prefer-template: 0 */




/**
 * Convenience wrapper component for the `useDropzone` hook
 *
 * ```jsx
 * <Dropzone>
 *   {({getRootProps, getInputProps}) => (
 *     <div {...getRootProps()}>
 *       <input {...getInputProps()} />
 *       <p>Drag 'n' drop some files here, or click to select files</p>
 *     </div>
 *   )}
 * </Dropzone>
 * ```
 */

var Dropzone = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      params = _objectWithoutProperties(_ref, _excluded);

  var _useDropzone = useDropzone(params),
      open = _useDropzone.open,
      props = _objectWithoutProperties(_useDropzone, _excluded2);

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, function () {
    return {
      open: open
    };
  }, [open]); // TODO: Figure out why react-styleguidist cannot create docs if we don't return a jsx element

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, children(_objectSpread(_objectSpread({}, props), {}, {
    open: open
  })));
});
Dropzone.displayName = "Dropzone"; // Add default props for react-docgen

var defaultProps = {
  disabled: false,
  getFilesFromEvent: file_selector__WEBPACK_IMPORTED_MODULE_1__.fromEvent,
  maxSize: Infinity,
  minSize: 0,
  multiple: true,
  maxFiles: 0,
  preventDropOnDocument: true,
  noClick: false,
  noKeyboard: false,
  noDrag: false,
  noDragEventsBubbling: false,
  validator: null,
  useFsAccessApi: true
};
Dropzone.defaultProps = defaultProps;
Dropzone.propTypes = {
  /**
   * Render function that exposes the dropzone state and prop getter fns
   *
   * @param {object} params
   * @param {Function} params.getRootProps Returns the props you should apply to the root drop container you render
   * @param {Function} params.getInputProps Returns the props you should apply to hidden file input you render
   * @param {Function} params.open Open the native file selection dialog
   * @param {boolean} params.isFocused Dropzone area is in focus
   * @param {boolean} params.isFileDialogActive File dialog is opened
   * @param {boolean} params.isDragActive Active drag is in progress
   * @param {boolean} params.isDragAccept Dragged files are accepted
   * @param {boolean} params.isDragReject Some dragged files are rejected
   * @param {File[]} params.draggedFiles Files in active drag
   * @param {File[]} params.acceptedFiles Accepted files
   * @param {FileRejection[]} params.fileRejections Rejected files and why they were rejected
   */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Set accepted file types.
   * See https://github.com/okonet/attr-accept for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all.
   * See: https://github.com/react-dropzone/react-dropzone/issues/276
   */
  accept: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_2___default().string), prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_2___default().string))]),

  /**
   * Allow drag 'n' drop (or selection from the file dialog) of multiple files
   */
  multiple: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * If true, disables click to open the native file selection dialog
   */
  noClick: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * If true, disables SPACE/ENTER to open the native file selection dialog.
   * Note that it also stops tracking the focus state.
   */
  noKeyboard: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * If true, disables drag 'n' drop
   */
  noDrag: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * If true, stops drag event propagation to parents
   */
  noDragEventsBubbling: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * Minimum file size (in bytes)
   */
  minSize: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),

  /**
   * Maximum file size (in bytes)
   */
  maxSize: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),

  /**
   * Maximum accepted number of files
   * The default value is 0 which means there is no limitation to how many files are accepted.
   */
  maxFiles: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),

  /**
   * Enable/disable the dropzone
   */
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * Use this to provide a custom file aggregator
   *
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  getFilesFromEvent: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Cb for when closing the file dialog with no selection
   */
  onFileDialogCancel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Cb for when opening the file dialog
   */
  onFileDialogOpen: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
   * to open the file picker instead of using an `<input type="file">` click event.
   */
  useFsAccessApi: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * Cb for when the `dragenter` event occurs.
   *
   * @param {DragEvent} event
   */
  onDragEnter: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Cb for when the `dragleave` event occurs
   *
   * @param {DragEvent} event
   */
  onDragLeave: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Cb for when the `dragover` event occurs
   *
   * @param {DragEvent} event
   */
  onDragOver: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Cb for when the `drop` event occurs.
   * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
   *
   * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
   * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
   * If `multiple` is set to false and additional files are dropped,
   * all files besides the first will be rejected.
   * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
   *
   * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
   * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
   *
   * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
   * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
   *
   * ```js
   * function onDrop(acceptedFiles) {
   *   const req = request.post('/upload')
   *   acceptedFiles.forEach(file => {
   *     req.attach(file.name, file)
   *   })
   *   req.end(callback)
   * }
   * ```
   *
   * @param {File[]} acceptedFiles
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  onDrop: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are accepted, this callback is not invoked.
   *
   * @param {File[]} files
   * @param {(DragEvent|Event)} event
   */
  onDropAccepted: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are rejected, this callback is not invoked.
   *
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event
   */
  onDropRejected: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Custom validation function
   * @param {File} file
   * @returns {FileError|FileError[]}
   */
  validator: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropzone);
/**
 * A function that is invoked for the `dragenter`,
 * `dragover` and `dragleave` events.
 * It is not invoked if the items are not files (such as link, text, etc.).
 *
 * @callback dragCb
 * @param {DragEvent} event
 */

/**
 * A function that is invoked for the `drop` or input change event.
 * It is not invoked if the items are not files (such as link, text, etc.).
 *
 * @callback dropCb
 * @param {File[]} acceptedFiles List of accepted files
 * @param {FileRejection[]} fileRejections List of rejected files and why they were rejected
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is invoked for the `drop` or input change event.
 * It is not invoked if the items are files (such as link, text, etc.).
 *
 * @callback dropAcceptedCb
 * @param {File[]} files List of accepted files that meet the given criteria
 * (`accept`, `multiple`, `minSize`, `maxSize`)
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is invoked for the `drop` or input change event.
 *
 * @callback dropRejectedCb
 * @param {File[]} files List of rejected files that do not meet the given criteria
 * (`accept`, `multiple`, `minSize`, `maxSize`)
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is used aggregate files,
 * in a asynchronous fashion, from drag or input change events.
 *
 * @callback getFilesFromEvent
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 * @returns {(File[]|Promise<File[]>)}
 */

/**
 * An object with the current dropzone state and some helper functions.
 *
 * @typedef {object} DropzoneState
 * @property {Function} getRootProps Returns the props you should apply to the root drop container you render
 * @property {Function} getInputProps Returns the props you should apply to hidden file input you render
 * @property {Function} open Open the native file selection dialog
 * @property {boolean} isFocused Dropzone area is in focus
 * @property {boolean} isFileDialogActive File dialog is opened
 * @property {boolean} isDragActive Active drag is in progress
 * @property {boolean} isDragAccept Dragged files are accepted
 * @property {boolean} isDragReject Some dragged files are rejected
 * @property {File[]} draggedFiles Files in active drag
 * @property {File[]} acceptedFiles Accepted files
 * @property {FileRejection[]} fileRejections Rejected files and why they were rejected
 */

var initialState = {
  isFocused: false,
  isFileDialogActive: false,
  isDragActive: false,
  isDragAccept: false,
  isDragReject: false,
  draggedFiles: [],
  acceptedFiles: [],
  fileRejections: []
};
/**
 * A React hook that creates a drag 'n' drop area.
 *
 * ```jsx
 * function MyDropzone(props) {
 *   const {getRootProps, getInputProps} = useDropzone({
 *     onDrop: acceptedFiles => {
 *       // do something with the File objects, e.g. upload to some server
 *     }
 *   });
 *   return (
 *     <div {...getRootProps()}>
 *       <input {...getInputProps()} />
 *       <p>Drag and drop some files here, or click to select files</p>
 *     </div>
 *   )
 * }
 * ```
 *
 * @function useDropzone
 *
 * @param {object} props
 * @param {string|string[]} [props.accept] Set accepted file types.
 * See https://github.com/okonet/attr-accept for more information.
 * Keep in mind that mime type determination is not reliable across platforms. CSV files,
 * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
 * Windows. In some cases there might not be a mime type set at all.
 * See: https://github.com/react-dropzone/react-dropzone/issues/276
 * @param {boolean} [props.multiple=true] Allow drag 'n' drop (or selection from the file dialog) of multiple files
 * @param {boolean} [props.preventDropOnDocument=true] If false, allow dropped items to take over the current browser window
 * @param {boolean} [props.noClick=false] If true, disables click to open the native file selection dialog
 * @param {boolean} [props.noKeyboard=false] If true, disables SPACE/ENTER to open the native file selection dialog.
 * Note that it also stops tracking the focus state.
 * @param {boolean} [props.noDrag=false] If true, disables drag 'n' drop
 * @param {boolean} [props.noDragEventsBubbling=false] If true, stops drag event propagation to parents
 * @param {number} [props.minSize=0] Minimum file size (in bytes)
 * @param {number} [props.maxSize=Infinity] Maximum file size (in bytes)
 * @param {boolean} [props.disabled=false] Enable/disable the dropzone
 * @param {getFilesFromEvent} [props.getFilesFromEvent] Use this to provide a custom file aggregator
 * @param {Function} [props.onFileDialogCancel] Cb for when closing the file dialog with no selection
 * @param {boolean} [props.useFsAccessApi] Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
 * to open the file picker instead of using an `<input type="file">` click event.
 * @param {Function} [props.onFileDialogOpen] Cb for when opening the file dialog
 * @param {dragCb} [props.onDragEnter] Cb for when the `dragenter` event occurs.
 * @param {dragCb} [props.onDragLeave] Cb for when the `dragleave` event occurs
 * @param {dragCb} [props.onDragOver] Cb for when the `dragover` event occurs
 * @param {dropCb} [props.onDrop] Cb for when the `drop` event occurs.
 * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
 *
 * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
 * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
 * If `multiple` is set to false and additional files are dropped,
 * all files besides the first will be rejected.
 * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
 *
 * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
 * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
 *
 * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
 * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
 *
 * ```js
 * function onDrop(acceptedFiles) {
 *   const req = request.post('/upload')
 *   acceptedFiles.forEach(file => {
 *     req.attach(file.name, file)
 *   })
 *   req.end(callback)
 * }
 * ```
 * @param {dropAcceptedCb} [props.onDropAccepted]
 * @param {dropRejectedCb} [props.onDropRejected]
 *
 * @returns {DropzoneState}
 */

function useDropzone() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _defaultProps$options = _objectSpread(_objectSpread({}, defaultProps), options),
      accept = _defaultProps$options.accept,
      disabled = _defaultProps$options.disabled,
      getFilesFromEvent = _defaultProps$options.getFilesFromEvent,
      maxSize = _defaultProps$options.maxSize,
      minSize = _defaultProps$options.minSize,
      multiple = _defaultProps$options.multiple,
      maxFiles = _defaultProps$options.maxFiles,
      onDragEnter = _defaultProps$options.onDragEnter,
      onDragLeave = _defaultProps$options.onDragLeave,
      onDragOver = _defaultProps$options.onDragOver,
      onDrop = _defaultProps$options.onDrop,
      onDropAccepted = _defaultProps$options.onDropAccepted,
      onDropRejected = _defaultProps$options.onDropRejected,
      onFileDialogCancel = _defaultProps$options.onFileDialogCancel,
      onFileDialogOpen = _defaultProps$options.onFileDialogOpen,
      useFsAccessApi = _defaultProps$options.useFsAccessApi,
      preventDropOnDocument = _defaultProps$options.preventDropOnDocument,
      noClick = _defaultProps$options.noClick,
      noKeyboard = _defaultProps$options.noKeyboard,
      noDrag = _defaultProps$options.noDrag,
      noDragEventsBubbling = _defaultProps$options.noDragEventsBubbling,
      validator = _defaultProps$options.validator;

  var onFileDialogOpenCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return typeof onFileDialogOpen === "function" ? onFileDialogOpen : noop;
  }, [onFileDialogOpen]);
  var onFileDialogCancelCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return typeof onFileDialogCancel === "function" ? onFileDialogCancel : noop;
  }, [onFileDialogCancel]);
  var rootRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  var _useReducer = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var isFocused = state.isFocused,
      isFileDialogActive = state.isFileDialogActive,
      draggedFiles = state.draggedFiles;
  var fsAccessApiWorksRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(typeof window !== "undefined" && window.isSecureContext && useFsAccessApi && (0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.canUseFileSystemAccessAPI)()); // Update file dialog active state when the window is focused on

  var onWindowFocus = function onWindowFocus() {
    // Execute the timeout only if the file dialog is opened in the browser
    if (!fsAccessApiWorksRef.current && isFileDialogActive) {
      setTimeout(function () {
        if (inputRef.current) {
          var files = inputRef.current.files;

          if (!files.length) {
            dispatch({
              type: "closeDialog"
            });
            onFileDialogCancelCb();
          }
        }
      }, 300);
    }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    window.addEventListener("focus", onWindowFocus, false);
    return function () {
      window.removeEventListener("focus", onWindowFocus, false);
    };
  }, [inputRef, isFileDialogActive, onFileDialogCancelCb, fsAccessApiWorksRef]);
  var dragTargetsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);

  var onDocumentDrop = function onDocumentDrop(event) {
    if (rootRef.current && rootRef.current.contains(event.target)) {
      // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
      return;
    }

    event.preventDefault();
    dragTargetsRef.current = [];
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (preventDropOnDocument) {
      document.addEventListener("dragover", _utils_index__WEBPACK_IMPORTED_MODULE_3__.onDocumentDragOver, false);
      document.addEventListener("drop", onDocumentDrop, false);
    }

    return function () {
      if (preventDropOnDocument) {
        document.removeEventListener("dragover", _utils_index__WEBPACK_IMPORTED_MODULE_3__.onDocumentDragOver);
        document.removeEventListener("drop", onDocumentDrop);
      }
    };
  }, [rootRef, preventDropOnDocument]);
  var onDragEnterCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    event.preventDefault(); // Persist here because we need the event later after getFilesFromEvent() is done

    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [].concat(_toConsumableArray(dragTargetsRef.current), [event.target]);

    if ((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.isEvtWithFiles)(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function (draggedFiles) {
        if ((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.isPropagationStopped)(event) && !noDragEventsBubbling) {
          return;
        }

        dispatch({
          draggedFiles: draggedFiles,
          isDragActive: true,
          type: "setDraggedFiles"
        });

        if (onDragEnter) {
          onDragEnter(event);
        }
      });
    }
  }, [getFilesFromEvent, onDragEnter, noDragEventsBubbling]);
  var onDragOverCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event);
    var hasFiles = (0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.isEvtWithFiles)(event);

    if (hasFiles && event.dataTransfer) {
      try {
        event.dataTransfer.dropEffect = "copy";
      } catch (_unused) {}
      /* eslint-disable-line no-empty */

    }

    if (hasFiles && onDragOver) {
      onDragOver(event);
    }

    return false;
  }, [onDragOver, noDragEventsBubbling]);
  var onDragLeaveCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    event.preventDefault();
    event.persist();
    stopPropagation(event); // Only deactivate once the dropzone and all children have been left

    var targets = dragTargetsRef.current.filter(function (target) {
      return rootRef.current && rootRef.current.contains(target);
    }); // Make sure to remove a target present multiple times only once
    // (Firefox may fire dragenter/dragleave multiple times on the same element)

    var targetIdx = targets.indexOf(event.target);

    if (targetIdx !== -1) {
      targets.splice(targetIdx, 1);
    }

    dragTargetsRef.current = targets;

    if (targets.length > 0) {
      return;
    }

    dispatch({
      isDragActive: false,
      type: "setDraggedFiles",
      draggedFiles: []
    });

    if ((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.isEvtWithFiles)(event) && onDragLeave) {
      onDragLeave(event);
    }
  }, [rootRef, onDragLeave, noDragEventsBubbling]);
  var setFiles = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (files, event) {
    var acceptedFiles = [];
    var fileRejections = [];
    files.forEach(function (file) {
      var _fileAccepted = (0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.fileAccepted)(file, accept),
          _fileAccepted2 = _slicedToArray(_fileAccepted, 2),
          accepted = _fileAccepted2[0],
          acceptError = _fileAccepted2[1];

      var _fileMatchSize = (0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.fileMatchSize)(file, minSize, maxSize),
          _fileMatchSize2 = _slicedToArray(_fileMatchSize, 2),
          sizeMatch = _fileMatchSize2[0],
          sizeError = _fileMatchSize2[1];

      var customErrors = validator ? validator(file) : null;

      if (accepted && sizeMatch && !customErrors) {
        acceptedFiles.push(file);
      } else {
        var errors = [acceptError, sizeError];

        if (customErrors) {
          errors = errors.concat(customErrors);
        }

        fileRejections.push({
          file: file,
          errors: errors.filter(function (e) {
            return e;
          })
        });
      }
    });

    if (!multiple && acceptedFiles.length > 1 || multiple && maxFiles >= 1 && acceptedFiles.length > maxFiles) {
      // Reject everything and empty accepted files
      acceptedFiles.forEach(function (file) {
        fileRejections.push({
          file: file,
          errors: [_utils_index__WEBPACK_IMPORTED_MODULE_3__.TOO_MANY_FILES_REJECTION]
        });
      });
      acceptedFiles.splice(0);
    }

    dispatch({
      acceptedFiles: acceptedFiles,
      fileRejections: fileRejections,
      type: "setFiles"
    });

    if (onDrop) {
      onDrop(acceptedFiles, fileRejections, event);
    }

    if (fileRejections.length > 0 && onDropRejected) {
      onDropRejected(fileRejections, event);
    }

    if (acceptedFiles.length > 0 && onDropAccepted) {
      onDropAccepted(acceptedFiles, event);
    }
  }, [dispatch, multiple, accept, minSize, maxSize, maxFiles, onDrop, onDropAccepted, onDropRejected, validator]);
  var onDropCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    event.preventDefault(); // Persist here because we need the event later after getFilesFromEvent() is done

    event.persist();
    stopPropagation(event);
    dragTargetsRef.current = [];

    if ((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.isEvtWithFiles)(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(function (files) {
        if ((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.isPropagationStopped)(event) && !noDragEventsBubbling) {
          return;
        }

        setFiles(files, event);
      });
    }

    dispatch({
      type: "reset"
    });
  }, [getFilesFromEvent, setFiles, noDragEventsBubbling]); // Fn for opening the file dialog programmatically

  var openFileDialog = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    // No point to use FS access APIs if context is not secure
    // https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts#feature_detection
    if (fsAccessApiWorksRef.current) {
      dispatch({
        type: "openDialog"
      });
      onFileDialogOpenCb(); // https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker

      var opts = {
        multiple: multiple,
        types: (0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.filePickerOptionsTypes)(accept)
      };
      window.showOpenFilePicker(opts).then(function (handles) {
        return getFilesFromEvent(handles);
      }).then(function (files) {
        setFiles(files, null);
        dispatch({
          type: "closeDialog"
        });
      }).catch(function (e) {
        // AbortError means the user canceled
        if ((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.isAbort)(e)) {
          onFileDialogCancelCb(e);
          dispatch({
            type: "closeDialog"
          });
        } else if ((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.isSecurityError)(e)) {
          fsAccessApiWorksRef.current = false; // CORS, so cannot use this API
          // Try using the input

          if (inputRef.current) {
            inputRef.current.value = null;
            inputRef.current.click();
          }
        }
      });
      return;
    }

    if (inputRef.current) {
      dispatch({
        type: "openDialog"
      });
      onFileDialogOpenCb();
      inputRef.current.value = null;
      inputRef.current.click();
    }
  }, [dispatch, onFileDialogOpenCb, onFileDialogCancelCb, useFsAccessApi, setFiles, accept, multiple]); // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone

  var onKeyDownCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    // Ignore keyboard events bubbling up the DOM tree
    if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
      return;
    }

    if (event.key === " " || event.key === "Enter" || event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
      openFileDialog();
    }
  }, [rootRef, openFileDialog]); // Update focus state for the dropzone

  var onFocusCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    dispatch({
      type: "focus"
    });
  }, []);
  var onBlurCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    dispatch({
      type: "blur"
    });
  }, []); // Cb to open the file dialog when click occurs on the dropzone

  var onClickCb = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (noClick) {
      return;
    } // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
    // to ensure React can handle state changes
    // See: https://github.com/react-dropzone/react-dropzone/issues/450


    if ((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.isIeOrEdge)()) {
      setTimeout(openFileDialog, 0);
    } else {
      openFileDialog();
    }
  }, [noClick, openFileDialog]);

  var composeHandler = function composeHandler(fn) {
    return disabled ? null : fn;
  };

  var composeKeyboardHandler = function composeKeyboardHandler(fn) {
    return noKeyboard ? null : composeHandler(fn);
  };

  var composeDragHandler = function composeDragHandler(fn) {
    return noDrag ? null : composeHandler(fn);
  };

  var stopPropagation = function stopPropagation(event) {
    if (noDragEventsBubbling) {
      event.stopPropagation();
    }
  };

  var getRootProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$refKey = _ref2.refKey,
          refKey = _ref2$refKey === void 0 ? "ref" : _ref2$refKey,
          role = _ref2.role,
          onKeyDown = _ref2.onKeyDown,
          onFocus = _ref2.onFocus,
          onBlur = _ref2.onBlur,
          onClick = _ref2.onClick,
          onDragEnter = _ref2.onDragEnter,
          onDragOver = _ref2.onDragOver,
          onDragLeave = _ref2.onDragLeave,
          onDrop = _ref2.onDrop,
          rest = _objectWithoutProperties(_ref2, _excluded3);

      return _objectSpread(_objectSpread(_defineProperty({
        onKeyDown: composeKeyboardHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onKeyDown, onKeyDownCb)),
        onFocus: composeKeyboardHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onFocus, onFocusCb)),
        onBlur: composeKeyboardHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onBlur, onBlurCb)),
        onClick: composeHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onClick, onClickCb)),
        onDragEnter: composeDragHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onDragEnter, onDragEnterCb)),
        onDragOver: composeDragHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onDragOver, onDragOverCb)),
        onDragLeave: composeDragHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onDragLeave, onDragLeaveCb)),
        onDrop: composeDragHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onDrop, onDropCb)),
        role: typeof role === "string" && role !== "" ? role : "button"
      }, refKey, rootRef), !disabled && !noKeyboard ? {
        tabIndex: 0
      } : {}), rest);
    };
  }, [rootRef, onKeyDownCb, onFocusCb, onBlurCb, onClickCb, onDragEnterCb, onDragOverCb, onDragLeaveCb, onDropCb, noKeyboard, noDrag, disabled]);
  var onInputElementClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    event.stopPropagation();
  }, []);
  var getInputProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$refKey = _ref3.refKey,
          refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey,
          onChange = _ref3.onChange,
          onClick = _ref3.onClick,
          rest = _objectWithoutProperties(_ref3, _excluded4);

      var inputProps = _defineProperty({
        accept: accept,
        multiple: multiple,
        type: "file",
        style: {
          display: "none"
        },
        onChange: composeHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onChange, onDropCb)),
        onClick: composeHandler((0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.composeEventHandlers)(onClick, onInputElementClick)),
        tabIndex: -1
      }, refKey, inputRef);

      return _objectSpread(_objectSpread({}, inputProps), rest);
    };
  }, [inputRef, accept, multiple, onDropCb, disabled]);
  var fileCount = draggedFiles.length;
  var isDragAccept = fileCount > 0 && (0,_utils_index__WEBPACK_IMPORTED_MODULE_3__.allFilesAccepted)({
    files: draggedFiles,
    accept: accept,
    minSize: minSize,
    maxSize: maxSize,
    multiple: multiple,
    maxFiles: maxFiles
  });
  var isDragReject = fileCount > 0 && !isDragAccept;
  return _objectSpread(_objectSpread({}, state), {}, {
    isDragAccept: isDragAccept,
    isDragReject: isDragReject,
    isFocused: isFocused && !disabled,
    getRootProps: getRootProps,
    getInputProps: getInputProps,
    rootRef: rootRef,
    inputRef: inputRef,
    open: composeHandler(openFileDialog)
  });
}

function reducer(state, action) {
  /* istanbul ignore next */
  switch (action.type) {
    case "focus":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFocused: true
      });

    case "blur":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFocused: false
      });

    case "openDialog":
      return _objectSpread(_objectSpread({}, initialState), {}, {
        isFileDialogActive: true
      });

    case "closeDialog":
      return _objectSpread(_objectSpread({}, state), {}, {
        isFileDialogActive: false
      });

    case "setDraggedFiles":
      /* eslint no-case-declarations: 0 */
      var isDragActive = action.isDragActive,
          draggedFiles = action.draggedFiles;
      return _objectSpread(_objectSpread({}, state), {}, {
        draggedFiles: draggedFiles,
        isDragActive: isDragActive
      });

    case "setFiles":
      return _objectSpread(_objectSpread({}, state), {}, {
        acceptedFiles: action.acceptedFiles,
        fileRejections: action.fileRejections
      });

    case "reset":
      return _objectSpread({}, initialState);

    default:
      return state;
  }
}

function noop() {}



/***/ }),

/***/ "./node_modules/react-dropzone/dist/es/utils/index.js":
/*!************************************************************!*\
  !*** ./node_modules/react-dropzone/dist/es/utils/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorCode": () => (/* binding */ ErrorCode),
/* harmony export */   "FILE_INVALID_TYPE": () => (/* binding */ FILE_INVALID_TYPE),
/* harmony export */   "FILE_TOO_LARGE": () => (/* binding */ FILE_TOO_LARGE),
/* harmony export */   "FILE_TOO_SMALL": () => (/* binding */ FILE_TOO_SMALL),
/* harmony export */   "TOO_MANY_FILES": () => (/* binding */ TOO_MANY_FILES),
/* harmony export */   "TOO_MANY_FILES_REJECTION": () => (/* binding */ TOO_MANY_FILES_REJECTION),
/* harmony export */   "allFilesAccepted": () => (/* binding */ allFilesAccepted),
/* harmony export */   "canUseFileSystemAccessAPI": () => (/* binding */ canUseFileSystemAccessAPI),
/* harmony export */   "composeEventHandlers": () => (/* binding */ composeEventHandlers),
/* harmony export */   "fileAccepted": () => (/* binding */ fileAccepted),
/* harmony export */   "fileMatchSize": () => (/* binding */ fileMatchSize),
/* harmony export */   "filePickerOptionsTypes": () => (/* binding */ filePickerOptionsTypes),
/* harmony export */   "getInvalidTypeRejectionErr": () => (/* binding */ getInvalidTypeRejectionErr),
/* harmony export */   "getTooLargeRejectionErr": () => (/* binding */ getTooLargeRejectionErr),
/* harmony export */   "getTooSmallRejectionErr": () => (/* binding */ getTooSmallRejectionErr),
/* harmony export */   "isAbort": () => (/* binding */ isAbort),
/* harmony export */   "isEvtWithFiles": () => (/* binding */ isEvtWithFiles),
/* harmony export */   "isIeOrEdge": () => (/* binding */ isIeOrEdge),
/* harmony export */   "isKindFile": () => (/* binding */ isKindFile),
/* harmony export */   "isPropagationStopped": () => (/* binding */ isPropagationStopped),
/* harmony export */   "isSecurityError": () => (/* binding */ isSecurityError),
/* harmony export */   "onDocumentDragOver": () => (/* binding */ onDocumentDragOver)
/* harmony export */ });
/* harmony import */ var attr_accept__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! attr-accept */ "./node_modules/attr-accept/dist/es/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

 // Error codes

var FILE_INVALID_TYPE = "file-invalid-type";
var FILE_TOO_LARGE = "file-too-large";
var FILE_TOO_SMALL = "file-too-small";
var TOO_MANY_FILES = "too-many-files";
var ErrorCode = {
  FileInvalidType: FILE_INVALID_TYPE,
  FileTooLarge: FILE_TOO_LARGE,
  FileTooSmall: FILE_TOO_SMALL,
  TooManyFiles: TOO_MANY_FILES
}; // File Errors

var getInvalidTypeRejectionErr = function getInvalidTypeRejectionErr(accept) {
  accept = Array.isArray(accept) && accept.length === 1 ? accept[0] : accept;
  var messageSuffix = Array.isArray(accept) ? "one of ".concat(accept.join(", ")) : accept;
  return {
    code: FILE_INVALID_TYPE,
    message: "File type must be ".concat(messageSuffix)
  };
};
var getTooLargeRejectionErr = function getTooLargeRejectionErr(maxSize) {
  return {
    code: FILE_TOO_LARGE,
    message: "File is larger than ".concat(maxSize, " ").concat(maxSize === 1 ? "byte" : "bytes")
  };
};
var getTooSmallRejectionErr = function getTooSmallRejectionErr(minSize) {
  return {
    code: FILE_TOO_SMALL,
    message: "File is smaller than ".concat(minSize, " ").concat(minSize === 1 ? "byte" : "bytes")
  };
};
var TOO_MANY_FILES_REJECTION = {
  code: TOO_MANY_FILES,
  message: "Too many files"
}; // Firefox versions prior to 53 return a bogus MIME type for every file drag, so dragovers with
// that MIME type will always be accepted

function fileAccepted(file, accept) {
  var isAcceptable = file.type === "application/x-moz-file" || (0,attr_accept__WEBPACK_IMPORTED_MODULE_0__["default"])(file, accept);
  return [isAcceptable, isAcceptable ? null : getInvalidTypeRejectionErr(accept)];
}
function fileMatchSize(file, minSize, maxSize) {
  if (isDefined(file.size)) {
    if (isDefined(minSize) && isDefined(maxSize)) {
      if (file.size > maxSize) return [false, getTooLargeRejectionErr(maxSize)];
      if (file.size < minSize) return [false, getTooSmallRejectionErr(minSize)];
    } else if (isDefined(minSize) && file.size < minSize) return [false, getTooSmallRejectionErr(minSize)];else if (isDefined(maxSize) && file.size > maxSize) return [false, getTooLargeRejectionErr(maxSize)];
  }

  return [true, null];
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function allFilesAccepted(_ref) {
  var files = _ref.files,
      accept = _ref.accept,
      minSize = _ref.minSize,
      maxSize = _ref.maxSize,
      multiple = _ref.multiple,
      maxFiles = _ref.maxFiles;

  if (!multiple && files.length > 1 || multiple && maxFiles >= 1 && files.length > maxFiles) {
    return false;
  }

  return files.every(function (file) {
    var _fileAccepted = fileAccepted(file, accept),
        _fileAccepted2 = _slicedToArray(_fileAccepted, 1),
        accepted = _fileAccepted2[0];

    var _fileMatchSize = fileMatchSize(file, minSize, maxSize),
        _fileMatchSize2 = _slicedToArray(_fileMatchSize, 1),
        sizeMatch = _fileMatchSize2[0];

    return accepted && sizeMatch;
  });
} // React's synthetic events has event.isPropagationStopped,
// but to remain compatibility with other libs (Preact) fall back
// to check event.cancelBubble

function isPropagationStopped(event) {
  if (typeof event.isPropagationStopped === "function") {
    return event.isPropagationStopped();
  } else if (typeof event.cancelBubble !== "undefined") {
    return event.cancelBubble;
  }

  return false;
}
function isEvtWithFiles(event) {
  if (!event.dataTransfer) {
    return !!event.target && !!event.target.files;
  } // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types#file


  return Array.prototype.some.call(event.dataTransfer.types, function (type) {
    return type === "Files" || type === "application/x-moz-file";
  });
}
function isKindFile(item) {
  return _typeof(item) === "object" && item !== null && item.kind === "file";
} // allow the entire document to be a drag target

function onDocumentDragOver(event) {
  event.preventDefault();
}

function isIe(userAgent) {
  return userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1;
}

function isEdge(userAgent) {
  return userAgent.indexOf("Edge/") !== -1;
}

function isIeOrEdge() {
  var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.navigator.userAgent;
  return isIe(userAgent) || isEdge(userAgent);
}
/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls `event.isPropagationStopped()`.
 * Note that the check is done on the first invoke too,
 * meaning that if propagation was stopped before invoking the fns,
 * no handlers will be executed.
 *
 * @param {Function} fns the event hanlder functions
 * @return {Function} the event handler to add to an element
 */

function composeEventHandlers() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return fns.some(function (fn) {
      if (!isPropagationStopped(event) && fn) {
        fn.apply(void 0, [event].concat(args));
      }

      return isPropagationStopped(event);
    });
  };
}
/**
 * canUseFileSystemAccessAPI checks if the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)
 * is supported by the browser.
 * @returns {boolean}
 */

function canUseFileSystemAccessAPI() {
  return "showOpenFilePicker" in window;
}
/**
 * filePickerOptionsTypes returns the {types} option for https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker
 * based on the accept attr (see https://github.com/react-dropzone/attr-accept)
 * E.g: converts ['image/*', 'text/*'] to {'image/*': [], 'text/*': []}
 * @param {string|string[]} accept
 */

function filePickerOptionsTypes(accept) {
  accept = typeof accept === "string" ? accept.split(",") : accept;
  return [{
    description: "everything",
    // TODO: Need to handle filtering more elegantly than this!
    accept: Array.isArray(accept) ? // Accept just MIME types as per spec
    // NOTE: accept can be https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
    accept.filter(function (item) {
      return item === "audio/*" || item === "video/*" || item === "image/*" || item === "text/*" || /\w+\/[-+.\w]+/g.test(item);
    }).reduce(function (a, b) {
      return _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, b, []));
    }, {}) : {}
  }];
}
/**
 * Check if v is an exception caused by aborting a request (e.g window.showOpenFilePicker()).
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/DOMException.
 * @param {any} v
 * @returns {boolean} True if v is an abort exception.
 */

function isAbort(v) {
  return v instanceof DOMException && (v.name === "AbortError" || v.code === v.ABORT_ERR);
}
/**
 * Check if v is a security error.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/DOMException.
 * @param {any} v
 * @returns {boolean} True if v is a security error.
 */

function isSecurityError(v) {
  return v instanceof DOMException && (v.name === "SecurityError" || v.code === v.SECURITY_ERR);
}

/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-paginate/dist/react-paginate.js":
/*!************************************************************!*\
  !*** ./node_modules/react-paginate/dist/react-paginate.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "./node_modules/react/index.js")):0}(this,(function(__WEBPACK_EXTERNAL_MODULE__98__){return(()=>{var __webpack_modules__={759:(e,t,a)=>{"use strict";a.d(t,{Z:()=>c});var r,o=a(98),_=a.n(o),n=a(697),i=a.n(n);function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},s.apply(this,arguments)}e=a.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var l=function(e){var t=e.breakLabel,a=e.breakClassName,r=e.breakLinkClassName,o=e.breakHandler,n=e.getEventListener,i=a||"break";return _().createElement("li",{className:i},_().createElement("a",s({className:r,role:"button",tabIndex:"0",onKeyPress:o},n(o)),t))};l.propTypes={breakLabel:i().oneOfType([i().string,i().node]),breakClassName:i().string,breakLinkClassName:i().string,breakHandler:i().func.isRequired,getEventListener:i().func.isRequired};var p=l;const c=p;var d,u;(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(d.register(l,"BreakView","/home/yoan/work/oss/react-paginate/react_components/BreakView.js"),d.register(p,"default","/home/yoan/work/oss/react-paginate/react_components/BreakView.js")),(u="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&u(e)},770:(e,t,a)=>{"use strict";a.d(t,{Z:()=>c});var r,o=a(98),_=a.n(o),n=a(697),i=a.n(n);function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},s.apply(this,arguments)}e=a.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var l=function(e){var t=e.pageClassName,a=e.pageLinkClassName,r=e.page,o=e.selected,n=e.activeClassName,i=e.activeLinkClassName,l=e.getEventListener,p=e.pageSelectedHandler,c=e.href,d=e.extraAriaContext,u=e.pageLabelBuilder,f=e.rel,g=e.ariaLabel||"Page "+r+(d?" "+d:""),P=null;return o&&(P="page",g=e.ariaLabel||"Page "+r+" is your current page",t=void 0!==t?t+" "+n:n,void 0!==a?void 0!==i&&(a=a+" "+i):a=i),_().createElement("li",{className:t},_().createElement("a",s({rel:f,role:c?void 0:"button",className:a,href:c,tabIndex:o?"-1":"0","aria-label":g,"aria-current":P,onKeyPress:p},l(p)),u(r)))};l.propTypes={pageSelectedHandler:i().func.isRequired,selected:i().bool.isRequired,pageClassName:i().string,pageLinkClassName:i().string,activeClassName:i().string,activeLinkClassName:i().string,extraAriaContext:i().string,href:i().string,ariaLabel:i().string,page:i().number.isRequired,getEventListener:i().func.isRequired,pageLabelBuilder:i().func.isRequired,rel:i().string};var p=l;const c=p;var d,u;(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(d.register(l,"PageView","/home/yoan/work/oss/react-paginate/react_components/PageView.js"),d.register(p,"default","/home/yoan/work/oss/react-paginate/react_components/PageView.js")),(u="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&u(e)},214:(module,__webpack_exports__,__nested_webpack_require_3517__)=>{"use strict";__nested_webpack_require_3517__.d(__webpack_exports__,{Z:()=>PaginationBoxView});var react__WEBPACK_IMPORTED_MODULE_0__=__nested_webpack_require_3517__(98),react__WEBPACK_IMPORTED_MODULE_0___default=__nested_webpack_require_3517__.n(react__WEBPACK_IMPORTED_MODULE_0__),prop_types__WEBPACK_IMPORTED_MODULE_1__=__nested_webpack_require_3517__(697),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__nested_webpack_require_3517__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__),_PageView__WEBPACK_IMPORTED_MODULE_2__=__nested_webpack_require_3517__(770),_BreakView__WEBPACK_IMPORTED_MODULE_3__=__nested_webpack_require_3517__(759),_utils__WEBPACK_IMPORTED_MODULE_4__=__nested_webpack_require_3517__(923),enterModule;function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _extends(){return _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},_extends.apply(this,arguments)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return _setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},_setPrototypeOf(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var a,r=_getPrototypeOf(e);if(t){var o=_getPrototypeOf(this).constructor;a=Reflect.construct(r,arguments,o)}else a=r.apply(this,arguments);return _possibleConstructorReturn(this,a)}}function _possibleConstructorReturn(e,t){if(t&&("object"===_typeof(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_getPrototypeOf(e)}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}module=__nested_webpack_require_3517__.hmd(module),enterModule="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0,enterModule&&enterModule(module);var __signature__="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e},PaginationBoxView=function(_Component){_inherits(PaginationBoxView,_Component);var _super=_createSuper(PaginationBoxView);function PaginationBoxView(e){var t,a;return _classCallCheck(this,PaginationBoxView),_defineProperty(_assertThisInitialized(t=_super.call(this,e)),"handlePreviousPage",(function(e){var a=t.state.selected;t.handleClick(e,null,a>0?a-1:void 0,{isPrevious:!0})})),_defineProperty(_assertThisInitialized(t),"handleNextPage",(function(e){var a=t.state.selected,r=t.props.pageCount;t.handleClick(e,null,a<r-1?a+1:void 0,{isNext:!0})})),_defineProperty(_assertThisInitialized(t),"handlePageSelected",(function(e,a){if(t.state.selected===e)return t.callActiveCallback(e),void t.handleClick(a,null,void 0,{isActive:!0});t.handleClick(a,null,e)})),_defineProperty(_assertThisInitialized(t),"handlePageChange",(function(e){t.state.selected!==e&&(t.setState({selected:e}),t.callCallback(e))})),_defineProperty(_assertThisInitialized(t),"getEventListener",(function(e){return _defineProperty({},t.props.eventListener,e)})),_defineProperty(_assertThisInitialized(t),"handleClick",(function(e,a,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},_=o.isPrevious,n=void 0!==_&&_,i=o.isNext,s=void 0!==i&&i,l=o.isBreak,p=void 0!==l&&l,c=o.isActive,d=void 0!==c&&c;e.preventDefault?e.preventDefault():e.returnValue=!1;var u=t.state.selected,f=t.props.onClick,g=r;if(f){var P=f({index:a,selected:u,nextSelectedPage:r,event:e,isPrevious:n,isNext:s,isBreak:p,isActive:d});if(!1===P)return;Number.isInteger(P)&&(g=P)}void 0!==g&&t.handlePageChange(g)})),_defineProperty(_assertThisInitialized(t),"handleBreakClick",(function(e,a){var r=t.state.selected;t.handleClick(a,e,r<e?t.getForwardJump():t.getBackwardJump(),{isBreak:!0})})),_defineProperty(_assertThisInitialized(t),"callCallback",(function(e){void 0!==t.props.onPageChange&&"function"==typeof t.props.onPageChange&&t.props.onPageChange({selected:e})})),_defineProperty(_assertThisInitialized(t),"callActiveCallback",(function(e){void 0!==t.props.onPageActive&&"function"==typeof t.props.onPageActive&&t.props.onPageActive({selected:e})})),_defineProperty(_assertThisInitialized(t),"getElementPageRel",(function(e){var a=t.state.selected,r=t.props,o=r.nextPageRel,_=r.prevPageRel,n=r.selectedPageRel;return a-1===e?_:a===e?n:a+1===e?o:void 0})),_defineProperty(_assertThisInitialized(t),"pagination",(function(){var e=[],a=t.props,r=a.pageRangeDisplayed,o=a.pageCount,_=a.marginPagesDisplayed,n=a.breakLabel,i=a.breakClassName,s=a.breakLinkClassName,l=t.state.selected;if(o<=r)for(var p=0;p<o;p++)e.push(t.getPageElement(p));else{var c=r/2,d=r-c;l>o-r/2?c=r-(d=o-l):l<r/2&&(d=r-(c=l));var u,f,g=function(e){return t.getPageElement(e)},P=[];for(u=0;u<o;u++){var E=u+1;E<=_||E>o-_||u>=l-c&&u<=l+(0===l&&r>1?d-1:d)?P.push({type:"page",index:u,display:g(u)}):n&&P.length>0&&P[P.length-1].display!==f&&(r>0||_>0)&&(f=react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_BreakView__WEBPACK_IMPORTED_MODULE_3__.Z,{key:u,breakLabel:n,breakClassName:i,breakLinkClassName:s,breakHandler:t.handleBreakClick.bind(null,u),getEventListener:t.getEventListener}),P.push({type:"break",index:u,display:f}))}P.forEach((function(t,a){var r=t;"break"===t.type&&P[a-1]&&"page"===P[a-1].type&&P[a+1]&&"page"===P[a+1].type&&P[a+1].index-P[a-1].index<=2&&(r={type:"page",index:t.index,display:g(t.index)}),e.push(r.display)}))}return e})),void 0!==e.initialPage&&void 0!==e.forcePage&&console.warn("(react-paginate): Both initialPage (".concat(e.initialPage,") and forcePage (").concat(e.forcePage,") props are provided, which is discouraged.")+" Use exclusively forcePage prop for a controlled component.\nSee https://reactjs.org/docs/forms.html#controlled-components"),a=e.initialPage?e.initialPage:e.forcePage?e.forcePage:0,t.state={selected:a},t}return _createClass(PaginationBoxView,[{key:"componentDidMount",value:function(){var e=this.props,t=e.initialPage,a=e.disableInitialCallback,r=e.extraAriaContext,o=e.pageCount,_=e.forcePage;void 0===t||a||this.callCallback(t),r&&console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."),Number.isInteger(o)||console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(o,"). Did you forget a Math.ceil()?")),void 0!==t&&t>o-1&&console.warn("(react-paginate): The initialPage prop provided is greater than the maximum page index from pageCount prop (".concat(t," > ").concat(o-1,").")),void 0!==_&&_>o-1&&console.warn("(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (".concat(_," > ").concat(o-1,")."))}},{key:"componentDidUpdate",value:function(e){void 0!==this.props.forcePage&&this.props.forcePage!==e.forcePage&&(this.props.forcePage>this.props.pageCount-1&&console.warn("(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (".concat(this.props.forcePage," > ").concat(this.props.pageCount-1,").")),this.setState({selected:this.props.forcePage})),Number.isInteger(e.pageCount)&&!Number.isInteger(this.props.pageCount)&&console.warn("(react-paginate): The pageCount prop value provided is not an integer (".concat(this.props.pageCount,"). Did you forget a Math.ceil()?"))}},{key:"getForwardJump",value:function(){var e=this.state.selected,t=this.props,a=t.pageCount,r=e+t.pageRangeDisplayed;return r>=a?a-1:r}},{key:"getBackwardJump",value:function(){var e=this.state.selected-this.props.pageRangeDisplayed;return e<0?0:e}},{key:"getElementHref",value:function(e){var t=this.props,a=t.hrefBuilder,r=t.pageCount,o=t.hrefAllControls;if(a)return o||e>=0&&e<r?a(e+1,r,this.state.selected):void 0}},{key:"ariaLabelBuilder",value:function(e){var t=e===this.state.selected;if(this.props.ariaLabelBuilder&&e>=0&&e<this.props.pageCount){var a=this.props.ariaLabelBuilder(e+1,t);return this.props.extraAriaContext&&!t&&(a=a+" "+this.props.extraAriaContext),a}}},{key:"getPageElement",value:function(e){var t=this.state.selected,a=this.props,r=a.pageClassName,o=a.pageLinkClassName,_=a.activeClassName,n=a.activeLinkClassName,i=a.extraAriaContext,s=a.pageLabelBuilder;return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PageView__WEBPACK_IMPORTED_MODULE_2__.Z,{key:e,pageSelectedHandler:this.handlePageSelected.bind(null,e),selected:t===e,rel:this.getElementPageRel(e),pageClassName:r,pageLinkClassName:o,activeClassName:_,activeLinkClassName:n,extraAriaContext:i,href:this.getElementHref(e),ariaLabel:this.ariaLabelBuilder(e),page:e+1,pageLabelBuilder:s,getEventListener:this.getEventListener})}},{key:"render",value:function(){var e=this.props.renderOnZeroPageCount;if(0===this.props.pageCount&&void 0!==e)return e?e(this.props):e;var t=this.props,a=t.disabledClassName,r=t.disabledLinkClassName,o=t.pageCount,_=t.className,n=t.containerClassName,i=t.previousLabel,s=t.previousClassName,l=t.previousLinkClassName,p=t.previousAriaLabel,c=t.prevRel,d=t.nextLabel,u=t.nextClassName,f=t.nextLinkClassName,g=t.nextAriaLabel,P=t.nextRel,E=this.state.selected,b=0===E,y=E===o-1,v="".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__.m)(s)).concat(b?" ".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__.m)(a)):""),C="".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__.m)(u)).concat(y?" ".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__.m)(a)):""),O="".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__.m)(l)).concat(b?" ".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__.m)(r)):""),m="".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__.m)(f)).concat(y?" ".concat((0,_utils__WEBPACK_IMPORTED_MODULE_4__.m)(r)):""),L=b?"true":"false",h=y?"true":"false";return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul",{className:_||n},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",{className:v},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a",_extends({className:O,href:this.getElementHref(E-1),tabIndex:b?"-1":"0",role:"button",onKeyPress:this.handlePreviousPage,"aria-disabled":L,"aria-label":p,rel:c},this.getEventListener(this.handlePreviousPage)),i)),this.pagination(),react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li",{className:C},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a",_extends({className:m,href:this.getElementHref(E+1),tabIndex:y?"-1":"0",role:"button",onKeyPress:this.handleNextPage,"aria-disabled":h,"aria-label":g,rel:P},this.getEventListener(this.handleNextPage)),d)))}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),PaginationBoxView}(react__WEBPACK_IMPORTED_MODULE_0__.Component),reactHotLoader,leaveModule;_defineProperty(PaginationBoxView,"propTypes",{pageCount:prop_types__WEBPACK_IMPORTED_MODULE_1___default().number.isRequired,pageRangeDisplayed:prop_types__WEBPACK_IMPORTED_MODULE_1___default().number,marginPagesDisplayed:prop_types__WEBPACK_IMPORTED_MODULE_1___default().number,previousLabel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().node,previousAriaLabel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,prevPageRel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,prevRel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,nextLabel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().node,nextAriaLabel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,nextPageRel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,nextRel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,breakLabel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,prop_types__WEBPACK_IMPORTED_MODULE_1___default().node]),hrefBuilder:prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,hrefAllControls:prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool,onPageChange:prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,onPageActive:prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,onClick:prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,initialPage:prop_types__WEBPACK_IMPORTED_MODULE_1___default().number,forcePage:prop_types__WEBPACK_IMPORTED_MODULE_1___default().number,disableInitialCallback:prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool,containerClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,className:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,pageClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,pageLinkClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,pageLabelBuilder:prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,activeClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,activeLinkClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,previousClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,nextClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,previousLinkClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,nextLinkClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,disabledClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,disabledLinkClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,breakClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,breakLinkClassName:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,extraAriaContext:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,ariaLabelBuilder:prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,eventListener:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string,renderOnZeroPageCount:prop_types__WEBPACK_IMPORTED_MODULE_1___default().func,selectedPageRel:prop_types__WEBPACK_IMPORTED_MODULE_1___default().string}),_defineProperty(PaginationBoxView,"defaultProps",{pageRangeDisplayed:2,marginPagesDisplayed:3,activeClassName:"selected",previousLabel:"Previous",previousClassName:"previous",previousAriaLabel:"Previous page",prevPageRel:"prev",prevRel:"prev",nextLabel:"Next",nextClassName:"next",nextAriaLabel:"Next page",nextPageRel:"next",nextRel:"next",breakLabel:"...",disabledClassName:"disabled",disableInitialCallback:!1,pageLabelBuilder:function(e){return e},eventListener:"onClick",renderOnZeroPageCount:void 0,selectedPageRel:"canonical",hrefAllControls:!1}),reactHotLoader="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0,reactHotLoader&&reactHotLoader.register(PaginationBoxView,"PaginationBoxView","/home/yoan/work/oss/react-paginate/react_components/PaginationBoxView.js"),leaveModule="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0,leaveModule&&leaveModule(module)},351:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>n});var r,o=a(214);e=a.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;var _=o.Z;const n=_;var i,s;(i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&i.register(_,"default","/home/yoan/work/oss/react-paginate/react_components/index.js"),(s="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&s(e)},923:(e,t,a)=>{"use strict";var r,o,_;function n(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return null!=e?e:t}a.d(t,{m:()=>n}),e=a.hmd(e),(r="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&r(e),"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature,(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&o.register(n,"classNameIfDefined","/home/yoan/work/oss/react-paginate/react_components/utils.js"),(_="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&_(e)},703:(e,t,a)=>{"use strict";var r=a(414);function o(){}function _(){}_.resetWarningCache=o,e.exports=function(){function e(e,t,a,o,_,n){if(n!==r){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var a={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:_,resetWarningCache:o};return a.PropTypes=a,a}},697:(e,t,a)=>{e.exports=a(703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},98:e=>{"use strict";e.exports=__WEBPACK_EXTERNAL_MODULE__98__}},__webpack_module_cache__={};function __nested_webpack_require_21573__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var a=__webpack_module_cache__[e]={id:e,loaded:!1,exports:{}};return __webpack_modules__[e](a,a.exports,__nested_webpack_require_21573__),a.loaded=!0,a.exports}__nested_webpack_require_21573__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __nested_webpack_require_21573__.d(t,{a:t}),t},__nested_webpack_require_21573__.d=(e,t)=>{for(var a in t)__nested_webpack_require_21573__.o(t,a)&&!__nested_webpack_require_21573__.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},__nested_webpack_require_21573__.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),__nested_webpack_require_21573__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__nested_webpack_require_21573__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__nested_webpack_require_21573__(351);return __webpack_exports__})()}));
//# sourceMappingURL=react-paginate.js.map

/***/ }),

/***/ "./node_modules/react-to-print/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-to-print/lib/index.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*! For license information please see index.js.LICENSE.txt */
!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "./node_modules/react/index.js"),__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js")):0}("undefined"!=typeof self?self:this,(function(e,t){return function(){"use strict";var n={655:function(e,t,n){n.r(t),n.d(t,{__extends:function(){return o},__assign:function(){return i},__rest:function(){return a},__decorate:function(){return l},__param:function(){return c},__metadata:function(){return u},__awaiter:function(){return s},__generator:function(){return f},__createBinding:function(){return d},__exportStar:function(){return p},__values:function(){return h},__read:function(){return y},__spread:function(){return b},__spreadArrays:function(){return v},__spreadArray:function(){return g},__await:function(){return m},__asyncGenerator:function(){return w},__asyncDelegator:function(){return _},__asyncValues:function(){return P},__makeTemplateObject:function(){return O},__importStar:function(){return x},__importDefault:function(){return A},__classPrivateFieldGet:function(){return T},__classPrivateFieldSet:function(){return j}});var r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var i=function(){return i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},i.apply(this,arguments)};function a(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}function l(e,t,n,r){var o,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}function c(e,t){return function(n,r){t(n,r,e)}}function u(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function s(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function l(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}c((r=r.apply(e,t||[])).next())}))}function f(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}var d=Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]};function p(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||d(t,e,n)}function h(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function y(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}function b(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(y(arguments[t]));return e}function v(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var i=arguments[t],a=0,l=i.length;a<l;a++,o++)r[o]=i[a];return r}function g(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}function m(e){return this instanceof m?(this.v=e,this):new m(e)}function w(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=n.apply(e,t||[]),i=[];return r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r;function a(e){o[e]&&(r[e]=function(t){return new Promise((function(n,r){i.push([e,t,n,r])>1||l(e,t)}))})}function l(e,t){try{(n=o[e](t)).value instanceof m?Promise.resolve(n.value.v).then(c,u):s(i[0][2],n)}catch(e){s(i[0][3],e)}var n}function c(e){l("next",e)}function u(e){l("throw",e)}function s(e,t){e(t),i.shift(),i.length&&l(i[0][0],i[0][1])}}function _(e){var t,n;return t={},r("next"),r("throw",(function(e){throw e})),r("return"),t[Symbol.iterator]=function(){return this},t;function r(r,o){t[r]=e[r]?function(t){return(n=!n)?{value:m(e[r](t)),done:"return"===r}:o?o(t):t}:o}}function P(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e=h(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,o){!function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)}(r,o,(t=e[n](t)).done,t.value)}))}}}function O(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var S=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t};function x(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&d(t,e,n);return S(t,e),t}function A(e){return e&&e.__esModule?e:{default:e}}function T(e,t,n,r){if("a"===n&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?r:"a"===n?r.call(e):r?r.value:t.get(e)}function j(e,t,n,r,o){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?o.call(e,n):o?o.value=n:t.set(e,n),n}},156:function(t){t.exports=e},111:function(e){e.exports=t}},r={};function o(e){var t=r[e];if(void 0!==t)return t.exports;var i=r[e]={exports:{}};return n[e](i,i.exports,o),i.exports}o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};return function(){var e=i;Object.defineProperty(e,"__esModule",{value:!0}),e.useReactToPrint=e.PrintContextConsumer=void 0;var t=o(655),n=o(156),r=o(111),a=Object.prototype.hasOwnProperty.call(n,"createContext"),l=Object.prototype.hasOwnProperty.call(n,"useMemo")&&Object.prototype.hasOwnProperty.call(n,"useCallback"),c=a?n.createContext({}):null;e.PrintContextConsumer=c?c.Consumer:function(){return null};var u={copyStyles:!0,pageStyle:"@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }",removeAfterPrint:!1,suppressErrors:!1},s=function(e){function o(){var n=null!==e&&e.apply(this,arguments)||this;return n.startPrint=function(e){var t=n.props,r=t.onAfterPrint,o=t.onPrintError,i=t.print,a=t.documentTitle;setTimeout((function(){var t,l;if(e.contentWindow){if(e.contentWindow.focus(),i)i(e).then(n.handleRemoveIframe).catch((function(e){o?o("print",e):n.logMessages(["An error was thrown by the specified `print` function"])}));else if(e.contentWindow.print){var c=null!==(l=null===(t=e.contentDocument)||void 0===t?void 0:t.title)&&void 0!==l?l:"",u=e.ownerDocument.title;a&&(e.ownerDocument.title=a,e.contentDocument&&(e.contentDocument.title=a)),e.contentWindow.print(),a&&(e.ownerDocument.title=u,e.contentDocument&&(e.contentDocument.title=c))}else n.logMessages(["Printing for this browser is not currently possible: the browser does not have a `print` method available for iframes."]);r&&r(),n.handleRemoveIframe()}else n.logMessages(["Printing failed because the `contentWindow` of the print iframe did not load. This is possibly an error with `react-to-print`. Please file an issue: https://github.com/gregnb/react-to-print/issues/"])}),500)},n.triggerPrint=function(e){var t=n.props,r=t.onBeforePrint,o=t.onPrintError;if(r){var i=r();i&&"function"==typeof i.then?i.then((function(){n.startPrint(e)})).catch((function(e){o&&o("onBeforePrint",e)})):n.startPrint(e)}else n.startPrint(e)},n.handleClick=function(){var e=n.props,t=e.onBeforeGetContent,r=e.onPrintError;if(t){var o=t();o&&"function"==typeof o.then?o.then(n.handlePrint).catch((function(e){r&&r("onBeforeGetContent",e)})):n.handlePrint()}else n.handlePrint()},n.handlePrint=function(){var e=n.props,o=e.bodyClass,i=e.content,a=e.copyStyles,l=e.fonts,c=e.pageStyle,u=e.nonce,s=i();if(void 0!==s)if(null!==s){var f=document.createElement("iframe");f.style.position="absolute",f.style.top="-1000px",f.style.left="-1000px",f.id="printWindow",f.srcdoc="<!DOCTYPE html>";var d=(0,r.findDOMNode)(s);if(d){var p=d.cloneNode(!0),h=p instanceof Text,y=document.querySelectorAll("link[rel='stylesheet']"),b=h?[]:p.querySelectorAll("img"),v=h?[]:p.querySelectorAll("video");n.linkTotal=y.length+b.length+v.length,n.linksLoaded=[],n.linksErrored=[],n.fontsLoaded=[],n.fontsErrored=[];var g=function(e,t){t?n.linksLoaded.push(e):(n.logMessages(['"react-to-print" was unable to load a linked node. It may be invalid. "react-to-print" will continue attempting to print the page. The linked node that errored was:',e]),n.linksErrored.push(e)),n.linksLoaded.length+n.linksErrored.length+n.fontsLoaded.length+n.fontsErrored.length===n.linkTotal&&n.triggerPrint(f)};f.onload=function(){var e,r,i,s;f.onload=null;var y=f.contentDocument||(null===(r=f.contentWindow)||void 0===r?void 0:r.document);if(y){y.body.appendChild(p),l&&((null===(i=f.contentDocument)||void 0===i?void 0:i.fonts)&&(null===(s=f.contentWindow)||void 0===s?void 0:s.FontFace)?l.forEach((function(e){var t=new FontFace(e.family,e.source);f.contentDocument.fonts.add(t),t.loaded.then((function(e){n.fontsLoaded.push(e)})).catch((function(e){n.fontsErrored.push(t),n.logMessages(['"react-to-print" was unable to load a font. "react-to-print" will continue attempting to print the page. The font that failed to load is:',t,"The error from loading the font is:",e])}))})):n.logMessages(['"react-to-print" is not able to load custom fonts because the browser does not support the FontFace API']));var m="function"==typeof c?c():c;if("string"!=typeof m)n.logMessages(['"react-to-print" expected a "string" from `pageStyle` but received "'.concat(typeof m,'". Styles from `pageStyle` will not be applied.')]);else{var w=y.createElement("style");u&&(w.setAttribute("nonce",u),y.head.setAttribute("nonce",u)),w.appendChild(y.createTextNode(m)),y.head.appendChild(w)}if(o&&(e=y.body.classList).add.apply(e,(0,t.__spreadArray)([],(0,t.__read)(o.split(" ")),!1)),!h){for(var _=h?[]:d.querySelectorAll("canvas"),P=y.querySelectorAll("canvas"),O=0;O<_.length;++O){var S=_[O],x=P[O].getContext("2d");x&&x.drawImage(S,0,0)}for(O=0;O<b.length;O++){var A=b[O],T=A.getAttribute("src");T?((k=new Image).onload=g.bind(null,A,!0),k.onerror=g.bind(null,A,!1),k.src=T):(n.logMessages(['"react-to-print" encountered an <img> tag with an empty "src" attribute. It will not attempt to pre-load it. The <img> is:',A],"warning"),g(A,!1))}for(O=0;O<v.length;O++){var j=v[O];j.preload="auto";var k,E=j.getAttribute("poster");E?((k=new Image).onload=g.bind(null,j,!0),k.onerror=g.bind(null,j,!1),k.src=E):j.readyState>=2?g(j,!0):(j.onloadeddata=g.bind(null,j,!0),j.onerror=g.bind(null,j,!1),j.onstalled=g.bind(null,j,!1))}var C="input",M=d.querySelectorAll(C),R=y.querySelectorAll(C);for(O=0;O<M.length;O++)R[O].value=M[O].value;var I="input[type=checkbox],input[type=radio]",q=d.querySelectorAll(I),D=y.querySelectorAll(I);for(O=0;O<q.length;O++)D[O].checked=q[O].checked;var L="select",W=d.querySelectorAll(L),F=y.querySelectorAll(L);for(O=0;O<W.length;O++)F[O].value=W[O].value}if(a)for(var N=document.querySelectorAll("style, link[rel='stylesheet']"),B=(O=0,N.length);O<B;++O){var G=N[O];if("style"===G.tagName.toLowerCase()){var V=y.createElement(G.tagName),Y=G.sheet;if(Y){var z="";try{for(var H=Y.cssRules.length,J=0;J<H;++J)"string"==typeof Y.cssRules[J].cssText&&(z+="".concat(Y.cssRules[J].cssText,"\r\n"))}catch(e){n.logMessages(["A stylesheet could not be accessed. This is likely due to the stylesheet having cross-origin imports, and many browsers block script access to cross-origin stylesheets. See https://github.com/gregnb/react-to-print/issues/429 for details. You may be able to load the sheet by both marking the stylesheet with the cross `crossorigin` attribute, and setting the `Access-Control-Allow-Origin` header on the server serving the stylesheet. Alternatively, host the stylesheet on your domain to avoid this issue entirely.",G],"warning")}V.setAttribute("id","react-to-print-".concat(O)),u&&V.setAttribute("nonce",u),V.appendChild(y.createTextNode(z)),y.head.appendChild(V)}}else if(G.getAttribute("href")){V=y.createElement(G.tagName),J=0;for(var K=G.attributes.length;J<K;++J){var Q=G.attributes[J];Q&&V.setAttribute(Q.nodeName,Q.nodeValue||"")}V.onload=g.bind(null,V,!0),V.onerror=g.bind(null,V,!1),u&&V.setAttribute("nonce",u),y.head.appendChild(V)}else n.logMessages(['"react-to-print" encountered a <link> tag with an empty "href" attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:',G],"warning"),g(G,!0)}}0!==n.linkTotal&&a||n.triggerPrint(f)},n.handleRemoveIframe(!0),document.body.appendChild(f)}else n.logMessages(['"react-to-print" could not locate the DOM node corresponding with the `content` prop'])}else n.logMessages(['There is nothing to print because the "content" prop returned "null". Please ensure "content" is renderable before allowing "react-to-print" to be called.']);else n.logMessages(["To print a functional component ensure it is wrapped with `React.forwardRef`, and ensure the forwarded ref is used. See the README for an example: https://github.com/gregnb/react-to-print#examples"])},n.handleRemoveIframe=function(e){var t=n.props.removeAfterPrint;if(e||t){var r=document.getElementById("printWindow");r&&document.body.removeChild(r)}},n.logMessages=function(e,t){void 0===t&&(t="error"),n.props.suppressErrors||("error"===t?console.error(e):"warning"===t&&console.warn(e))},n}return(0,t.__extends)(o,e),o.prototype.render=function(){var e=this.props,t=e.children,r=e.trigger;if(r)return n.cloneElement(r(),{onClick:this.handleClick});if(!c)return this.logMessages(['"react-to-print" requires React ^16.3.0 to be able to use "PrintContext"']),null;var o={handlePrint:this.handleClick};return n.createElement(c.Provider,{value:o},t)},o.defaultProps=u,o}(n.Component);e.default=s,e.useReactToPrint=function(e){if(!l)return e.suppressErrors||console.error('"react-to-print" requires React ^16.8.0 to be able to use "useReactToPrint"'),function(){throw new Error('"react-to-print" requires React ^16.8.0 to be able to use "useReactToPrint"')};var r=n.useMemo((function(){return new s((0,t.__assign)((0,t.__assign)({},u),e))}),[e]);return n.useCallback((function(){return r.handleClick()}),[r])}}(),i}()}));

/***/ }),

/***/ "./src/admin/js/react/components/media/style.css":
/*!*******************************************************!*\
  !*** ./src/admin/js/react/components/media/style.css ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./style.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./src/admin/js/react/components/media/style.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./src/admin/js/react/inv-template/scss/loading.css":
/*!**********************************************************!*\
  !*** ./src/admin/js/react/inv-template/scss/loading.css ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_loading_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./loading.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./src/admin/js/react/inv-template/scss/loading.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_loading_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_loading_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./src/admin/js/react/components/invoice/single/style.scoped.scss":
/*!************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/style.scoped.scss ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_style_scoped_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!../../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!../../../../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./style.scoped.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/admin/js/react/components/invoice/single/style.scoped.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_style_scoped_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_style_scoped_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./src/admin/js/react/inv-template/scss/all.scoped.scss":
/*!**************************************************************!*\
  !*** ./src/admin/js/react/inv-template/scss/all.scoped.scss ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_all_scoped_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./all.scoped.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/admin/js/react/inv-template/scss/all.scoped.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_all_scoped_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_all_scoped_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldIn": () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}');

/***/ })

}]);