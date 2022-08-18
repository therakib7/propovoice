"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_proposal_single_tab_proposal_sidebar_AdditionalAmount_js"],{

/***/ "./src/admin/js/react/api/payment.js":
/*!*******************************************!*\
  !*** ./src/admin/js/react/api/payment.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/admin/js/react/api/helper.js");


var url = _helper__WEBPACK_IMPORTED_MODULE_1__.apiUrl + 'payments';

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

/***/ "./src/admin/js/react/components/proposal/single/tab/proposal/sidebar/AdditionalAmount.js":
/*!************************************************************************************************!*\
  !*** ./src/admin/js/react/components/proposal/single/tab/proposal/sidebar/AdditionalAmount.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
/* harmony import */ var api_payment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! api/payment */ "./src/admin/js/react/api/payment.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var AdditionalAmount = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(AdditionalAmount, _Component);

  var _super = _createSuper(AdditionalAmount);

  function AdditionalAmount(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, AdditionalAmount);

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
      api_payment__WEBPACK_IMPORTED_MODULE_9__["default"].getAll(params).then(function (resp) {
        var result = resp.data.data.result;

        _this.setState({
          payments: result,
          preloader: false
        });
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault(); // this.props.handleSubmit(this.state.form);
      // this.setState({ form: this.initialState });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "setPayment", function (data) {
      _this.props.handleChange(data);
    });

    _this.state = {
      preloader: true,
      payment: {
        id: null
      },
      payments: [],
      checkedBoxes: [],
      offset: 0,
      perPage: 10,
      currentPage: 1
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(AdditionalAmount, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getLists();
    }
  }, {
    key: "render",
    value: function render() {
      var payment_id = this.props.data.payment_id;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("li", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
          type: "checkbox",
          defaultChecked: "checked"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("i", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("h3", {
          children: "Additional Amount"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "pi-form-accrodion",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "pi-tab",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
              type: "checkbox",
              id: "rd4",
              name: "rd"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
              className: "pi-tab-label",
              htmlFor: "rd4",
              children: "Tax"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "pi-tab-content pi-bg-pearl",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "pi-form-content pi-form-style-two pi-form-style-four",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                  className: "pi-radio-content",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "pi-radio-group",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("h4", {
                      children: "Tax in:"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                      type: "radio",
                      name: "tax",
                      id: "rate"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "rate",
                      children: "Flat Rate"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                      type: "radio",
                      name: "tax",
                      id: "percent"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "percent",
                      children: "Percentage"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                    type: "number",
                    id: "number",
                    name: "number",
                    placeholder: "100$"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                    children: "% Invoice Balance"
                  })]
                })
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "pi-tab",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
              type: "checkbox",
              id: "rd5",
              name: "rd"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
              className: "pi-tab-label",
              htmlFor: "rd5",
              children: "Discount Price"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "pi-tab-content pi-bg-pearl",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "pi-form-content pi-form-style-two pi-form-style-four",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                  className: "pi-radio-content",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "pi-radio-group",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("h4", {
                      children: "Discount Price in:"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                      type: "radio",
                      name: "discount",
                      id: "flat"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "flat",
                      children: "Flat Rate"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                      type: "radio",
                      name: "discount",
                      id: "discount"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "discount",
                      children: "Percentage"
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                    type: "number",
                    id: "number",
                    name: "number",
                    placeholder: "100$"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                    children: "% Invoice Balance"
                  })]
                })
              })
            })]
          })]
        })]
      });
    }
  }]);

  return AdditionalAmount;
}(react__WEBPACK_IMPORTED_MODULE_8__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdditionalAmount);

/***/ })

}]);