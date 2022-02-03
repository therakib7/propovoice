"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_client_index_jsx"],{

/***/ "./src/admin/js/react/components/client/helper.js":
/*!********************************************************!*\
  !*** ./src/admin/js/react/components/client/helper.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var apiUrl = "".concat(ncpi_local.apiUrl, "ncpi/v1/clients");
var token = {
  headers: {
    'content-type': 'application/json',
    'X-WP-NONCE': ncpi_local.nonce
  }
};

var getAll = function getAll() {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get(apiUrl);
};

var get = function get(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(apiUrl, "/").concat(id));
};

var create = function create(data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().post(apiUrl, data, token);
};

var update = function update(id, data) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().put("".concat(apiUrl, "/").concat(id), data);
};

var remove = function remove(id) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("".concat(apiUrl, "/").concat(id));
};

var removeSelected = function removeSelected() {
  return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("".concat(apiUrl));
};

var findByArg = function findByArg(title) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get("".concat(apiUrl, "?title=").concat(title));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getAll: getAll,
  get: get,
  create: create,
  update: update,
  remove: remove,
  removeSelected: removeSelected,
  findByArg: findByArg
});

/***/ }),

/***/ "./src/admin/js/react/components/client/index.jsx":
/*!********************************************************!*\
  !*** ./src/admin/js/react/components/client/index.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/admin/js/react/components/client/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var Client = function Client() {
  var initialClientState = {
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    company_name: '',
    web: '',
    mobile: '',
    zip: '',
    address: '',
    date: false
  };

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      formModal = _useState2[0],
      setFormModal = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('new'),
      _useState4 = _slicedToArray(_useState3, 2),
      formModalType = _useState4[0],
      setFormModalType = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialClientState),
      _useState6 = _slicedToArray(_useState5, 2),
      client = _useState6[0],
      setClient = _useState6[1];

  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      clients = _useState8[0],
      setClients = _useState8[1];

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      currentClient = _useState10[0],
      setCurrentClient = _useState10[1];

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(-1),
      _useState12 = _slicedToArray(_useState11, 2),
      currentIndex = _useState12[0],
      setCurrentIndex = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
      _useState14 = _slicedToArray(_useState13, 2),
      searchTitle = _useState14[0],
      setSearchTitle = _useState14[1];

  var inputChange = function inputChange(e) {
    var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value;
    setClient(_objectSpread(_objectSpread({}, client), {}, _defineProperty({}, name, value)));
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    retrieveClients();
  }, []);

  var openForm = function openForm() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'new';
    var client = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    setFormModal(true);

    if (type == 'new') {
      setFormModalType('new');
      setClient(initialClientState);
    } else {
      setFormModalType('edit');
      setClient(client);
    }
  };

  var onChangeSearchTitle = function onChangeSearchTitle(e) {
    var searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  var retrieveClients = function retrieveClients() {
    _helper__WEBPACK_IMPORTED_MODULE_1__["default"].getAll().then(function (resp) {
      setClients(resp.data.data); // console.log(resp.data);
    })["catch"](function (e) {
      console.log(e);
    });
  };

  var saveClient = function saveClient() {
    _helper__WEBPACK_IMPORTED_MODULE_1__["default"].create(client).then(function (resp) {
      /* setTutorial({
          id: resp.data.id,
          title: resp.data.title,
          description: resp.data.description,
          published: resp.data.published
      }); */
      setFormModal(false);
      retrieveClients();
      console.log(resp.data);
    })["catch"](function (e) {
      console.log(e);
    });
  };

  var refreshList = function refreshList() {
    retrieveClients();
    setCurrentClient(null);
    setCurrentIndex(-1);
  };

  var setActiveClient = function setActiveClient(client, index) {
    setCurrentClient(client);
    setCurrentIndex(index);
  };

  var removeAllClients = function removeAllClients() {
    _helper__WEBPACK_IMPORTED_MODULE_1__["default"].removeSelected().then(function (resp) {
      console.log(resp.data);
      refreshList();
    })["catch"](function (e) {
      console.log(e);
    });
  };

  var findByArg = function findByArg() {
    _helper__WEBPACK_IMPORTED_MODULE_1__["default"].findByArg(searchTitle).then(function (resp) {
      setClients(resp.data);
      console.log(resp.data);
    })["catch"](function (e) {
      console.log(e);
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "mb-5 font-bold text-2xl",
      children: "Client"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
      className: "bg-blue-700 hover:bg-blue-800 text-white font-medium text-base py-2 px-4 rounded mb-3",
      onClick: function onClick() {
        return openForm('new');
      },
      children: "Create New Client"
    }), formModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "relative w-auto my-6 mx-auto max-w-3xl",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
            className: "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h3", {
                className: "text-xl p-2 font-semibold",
                children: [formModalType == 'new' ? 'New' : 'Edit', " Client"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
                className: "p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none",
                onClick: function onClick() {
                  return setFormModal(false);
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                  className: "bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none",
                  children: "\xD7"
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "relative px-6 py-5 flex-auto",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("form", {
                className: "w-full max-w-lg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                  className: "flex flex-wrap -mx-3 mb-2",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                    className: "w-full md:w-1/2 px-3 mb-6 md:mb-0",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
                      className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                      htmlFor: "first_name",
                      children: "First Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                      className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                      id: "first_name",
                      type: "text",
                      required: true,
                      name: "first_name",
                      value: client.first_name,
                      onChange: inputChange
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                    className: "w-full md:w-1/2 px-3 mb-6 md:mb-0",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
                      className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                      htmlFor: "last_name",
                      children: "Last Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                      className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                      id: "last_name",
                      type: "text",
                      required: true,
                      name: "last_name",
                      value: client.last_name,
                      onChange: inputChange
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                  className: "flex flex-wrap -mx-3 mb-2",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                    className: "w-full md:w-1/2 px-3",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
                      className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                      htmlFor: "grid-email",
                      children: "Email"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                      className: "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                      id: "grid-email",
                      type: "email",
                      name: "email",
                      value: client.email,
                      onChange: inputChange
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                    className: "w-full md:w-1/2 px-3 mb-6 md:mb-0",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
                      className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                      htmlFor: "grid-mobile",
                      children: "Mobile Number"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                      className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                      id: "grid-mobile",
                      type: "text",
                      required: true,
                      name: "mobile",
                      value: client.mobile,
                      onChange: inputChange
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                  className: "flex flex-wrap -mx-3 mb-2",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                    className: "w-full md:w-1/2 px-3 mb-6 md:mb-0",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
                      className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                      htmlFor: "grid-company_name",
                      children: "Company Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                      className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                      id: "grid-company_name",
                      type: "text",
                      required: true,
                      name: "company_name",
                      value: client.company_name,
                      onChange: inputChange
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                    className: "w-full md:w-1/2 px-3",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
                      className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                      htmlFor: "grid-web",
                      children: "Website"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                      className: "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                      id: "grid-web",
                      type: "url",
                      name: "web",
                      value: client.web,
                      onChange: inputChange
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                  className: "flex flex-wrap -mx-3 mb-2",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                    className: "w-full md:w-1/2 px-3",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
                      className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                      htmlFor: "grid-zip",
                      children: "Zip Code"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                      className: "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                      id: "grid-zip",
                      type: "number",
                      name: "zip",
                      value: client.zip,
                      onChange: inputChange
                    })]
                  })
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
                className: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",
                type: "button",
                onClick: function onClick() {
                  return setFormModal(false);
                },
                children: "Close"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
                className: "text-white bg-blue-700 hover:bg-blue-800 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",
                type: "button",
                onClick: function onClick() {
                  return saveClient();
                },
                children: "Save Changes"
              })]
            })]
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "opacity-25 fixed inset-0 z-40 bg-black"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "shadow overflow-hidden rounded border-b border-gray-200",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("table", {
        className: "min-w-full bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("thead", {
          className: "bg-gray-800 text-white",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
              className: "text-left py-3 pl-4 pr-0 font-bold text-sm",
              style: {
                width: '20px'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                type: "checkbox"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
              className: "text-left py-3 px-4 font-bold text-sm",
              children: "Client Name"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
              className: "text-left py-3 px-4 font-semibold text-sm",
              children: "Email"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
              className: "text-left py-3 px-4 font-semibold text-sm",
              children: "Company Name"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
              className: "text-left py-3 px-4 font-semibold text-sm",
              children: "Website"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
              className: "text-left py-3 px-4 font-semibold text-sm",
              children: "Mobile"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
              className: "text-left py-3 px-4 font-semibold text-sm",
              children: "Date"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("th", {
              className: "text-left py-3 px-4 font-semibold text-sm",
              children: "Action"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("tbody", {
          className: "text-gray-700",
          children: clients && clients.map(function (client, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                className: "text-left py-3 pl-4 pr-0",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                  type: "checkbox"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                className: "text-left py-3 px-4",
                children: client.first_name + ' ' + client.last_name
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                className: "text-left py-3 px-4",
                children: client.email
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                className: "text-left py-3 px-4",
                children: client.company_name
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                className: "text-left py-3 px-4",
                children: client.web
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                className: "text-left py-3 px-4",
                children: client.mobile
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
                className: "text-left py-3 px-4",
                children: client.date
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
                className: "text-left py-3 px-4",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                  className: "bg-green-700 hover:bg-green-800 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2",
                  children: "View"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                  onClick: function onClick() {
                    return openForm('edit', client);
                  },
                  className: "bg-blue-700 hover:bg-blue-800 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2",
                  children: "Edit"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
                  className: "bg-red-700 hover:bg-red-800 cursor-pointer text-white text-sm py-1 px-2 rounded",
                  children: "Delete"
                })]
              })]
            }, index);
          })
        })]
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Client);

/***/ })

}]);