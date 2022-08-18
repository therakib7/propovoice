"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_js_components_payment_index_js"],{

/***/ "./src/js/api/payment.js":
/*!*******************************!*\
  !*** ./src/js/api/payment.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/js/api/helper.js");


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

/***/ "./src/js/blocks/empty/index.js":
/*!**************************************!*\
  !*** ./src/js/blocks/empty/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var Empty = function Empty(props) {
  var title = props.title,
      clickHandler = props.clickHandler,
      searchVal = props.searchVal,
      _props$logo = props.logo,
      logo = _props$logo === void 0 ? '' : _props$logo;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "pi-empty-content pi-text-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        width: "77",
        height: "76",
        viewBox: "0 0 77 76",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M61.8594 1.30469V14.8447H75.3985L61.8594 1.30469Z",
          fill: "#4C6FFF",
          fillOpacity: "0.5"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M59.6328 19.2969C58.4032 19.2969 57.4062 18.3 57.4062 17.0703V0H25.4922C21.809 0 18.8125 2.99651 18.8125 6.67969V31.571C19.5461 31.5045 20.2884 31.4688 21.0391 31.4688C28.6284 31.4688 35.4222 34.9386 39.9182 40.375H64.0859C65.3156 40.375 66.3125 41.3719 66.3125 42.6016C66.3125 43.8312 65.3156 44.8281 64.0859 44.8281H42.8517C44.2434 47.5439 45.1409 50.5526 45.429 53.7344H64.0859C65.3156 53.7344 66.3125 54.7313 66.3125 55.9609C66.3125 57.1906 65.3156 58.1875 64.0859 58.1875H45.429C44.7631 65.5409 40.8342 71.9664 35.1047 76H70.0234C73.7066 76 76.7031 73.0035 76.7031 69.3203V19.2969H59.6328ZM64.0859 31.4688H31.4297C30.2 31.4688 29.2031 30.4718 29.2031 29.2422C29.2031 28.0125 30.2 27.0156 31.4297 27.0156H64.0859C65.3156 27.0156 66.3125 28.0125 66.3125 29.2422C66.3125 30.4718 65.3156 31.4688 64.0859 31.4688Z",
          fill: "#4C6FFF"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
          cx: "20",
          cy: "56",
          r: "20",
          fill: "#A5B7FF"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M17.9091 67.6136V45.1136H21.7273V67.6136H17.9091ZM8.56818 58.2727V54.4545H31.0682V58.2727H8.56818Z",
          fill: "white"
        })]
      }), !searchVal.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
        className: "pi-empty-title",
        children: ["You haven't  ", title == 'Client' ? 'added' : 'created', " any ", title, " yet."]
      }), searchVal.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
        className: "pi-empty-title",
        children: ["No ", title, " found by your search query."]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        className: "pi-btn pi-bg-blue pi-bg-hover-blue",
        onClick: function onClick() {
          return clickHandler('new');
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
          width: 14,
          height: 12,
          viewBox: "0 0 12 15",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M2.5 8H13.5",
            stroke: "white",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M8 2.5V13.5",
            stroke: "white",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })]
        }), "Let's Start ", title == 'Client' ? 'Adding' : 'Creating']
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Empty);

/***/ }),

/***/ "./src/js/blocks/preloader/table/index.js":
/*!************************************************!*\
  !*** ./src/js/blocks/preloader/table/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/js/components/payment/FormBank.js":
/*!***********************************************!*\
  !*** ./src/js/components/payment/FormBank.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

 // const Editor = lazy(() => import('block/editor'));




var FormBank = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(FormBank, _Component);

  var _super = _createSuper(FormBank);

  function FormBank(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, FormBank);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleDesc", function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var form = _this.state.form;
      form['details'] = value;

      _this.setState({
        form: form
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "toggleChange", function () {
      var value = !_this.state.form["default"];

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, 'default', value))
      });
    });

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

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      _this.props.handleSubmit(_this.state.form); // this.setState({ form: this.initialState });

    });

    _this.initialState = {
      id: null,
      type: 'bank',
      name: '',
      details: '',
      "default": false,
      date: false
    };
    _this.state = {
      form: _this.initialState
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(FormBank, [{
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

      var i18n = ndpi.i18n;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "pi-overlay",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "pi-modal-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "pi-modal-header pi-gradient",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
              className: "pi-close",
              onClick: function onClick() {
                return _this2.props.close();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("svg", {
                width: 25,
                height: 25,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  d: "M12.5 3.5L3.5 12.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  d: "M12.5 12.5L3.5 3.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("h2", {
              className: "pi-modal-title",
              children: [this.props.modalType == 'new' ? i18n["new"] : i18n.edit, " Account"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
              children: "Please fill up necessary informaiton in the form."
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("form", {
            onSubmit: this.handleSubmit,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-name",
                      children: "Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-name",
                      type: "text",
                      required: true,
                      name: "name",
                      value: this.state.form.name,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-details",
                      children: "Details"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("textarea", {
                      id: "form-details",
                      rows: 4,
                      name: "details",
                      value: this.state.form.details,
                      onChange: this.handleChange
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
                      className: "pi-field-desc",
                      children: "You need to mention bank details here, Like: Name, Routing No. etc"
                    })]
                  })
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "pi-modal-footer",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                    type: "reset",
                    className: "pi-btn pi-text-hover-blue",
                    children: i18n.clear
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                    type: "submit",
                    className: "pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white",
                    children: i18n.save
                  })
                })]
              })
            })]
          })]
        })
      });
    }
  }]);

  return FormBank;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormBank);

/***/ }),

/***/ "./src/js/components/payment/FormPaypal.js":
/*!*************************************************!*\
  !*** ./src/js/components/payment/FormPaypal.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var FormPaypal = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(FormPaypal, _Component);

  var _super = _createSuper(FormPaypal);

  function FormPaypal(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, FormPaypal);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "toggleChange", function () {
      var value = !_this.state.form["default"];

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, 'default', value))
      });
    });

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

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      _this.props.handleSubmit(_this.state.form); // this.setState({ form: this.initialState });

    });

    _this.initialState = {
      id: null,
      type: 'paypal',
      account_type: 'business',
      account_name: '',
      account_email: '',
      client_id: '',
      secret_id: '',
      "default": false
    };
    _this.state = {
      form: _this.initialState
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(FormPaypal, [{
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

      var i18n = ndpi.i18n;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "pi-overlay",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "pi-modal-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "pi-modal-header pi-gradient",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
              className: "pi-close",
              onClick: function onClick() {
                return _this2.props.close();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("svg", {
                width: 25,
                height: 25,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  d: "M12.5 3.5L3.5 12.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  d: "M12.5 12.5L3.5 3.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("h2", {
              className: "pi-modal-title",
              children: [this.props.modalType == 'new' ? i18n["new"] : i18n.edit, " Paypal"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
              children: "Please fill up necessary informaiton in the form."
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("form", {
            onSubmit: this.handleSubmit,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row d-none",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-account_type",
                      children: "Account Type"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                        htmlFor: "form-account_type_personal",
                        children: "Personal"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                        id: "form-account_type_personal",
                        type: "radio",
                        name: "account_type",
                        value: "personal",
                        onChange: this.handleChange
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                        htmlFor: "form-account_type_business",
                        children: "Business"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                        id: "form-account_type_business",
                        type: "radio",
                        name: "account_type",
                        value: "business",
                        onChange: this.handleChange
                      })]
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-account_name",
                      children: "Account Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-account_name",
                      type: "text",
                      required: true,
                      name: "account_name",
                      value: this.state.form.account_name,
                      onChange: this.handleChange
                    })]
                  })
                }), this.state.form.account_type == 'personal' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-account_email",
                      children: "Account Email"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-account_email",
                      type: "email",
                      name: "account_email",
                      value: this.state.form.account_email //onChange={this.handleChange}

                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-client_id",
                      children: "Client ID"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-client_id",
                      type: "text",
                      required: true,
                      name: "client_id",
                      value: this.state.form.client_id,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-secret_id",
                      children: "Secret ID"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-secret_id",
                      type: "text",
                      required: true,
                      name: "secret_id",
                      value: this.state.form.secret_id,
                      onChange: this.handleChange
                    })]
                  })
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "pi-modal-footer",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                    type: "reset",
                    className: "pi-btn pi-text-hover-blue",
                    children: i18n.clear
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                    type: "submit",
                    className: "pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white",
                    children: i18n.save
                  })
                })]
              })
            })]
          })]
        })
      });
    }
  }]);

  return FormPaypal;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormPaypal);

/***/ }),

/***/ "./src/js/components/payment/FormStripe.js":
/*!*************************************************!*\
  !*** ./src/js/components/payment/FormStripe.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var FormStripe = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(FormStripe, _Component);

  var _super = _createSuper(FormStripe);

  function FormStripe(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, FormStripe);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "toggleChange", function () {
      var value = !_this.state.form["default"];

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, 'default', value))
      });
    });

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

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      _this.props.handleSubmit(_this.state.form); // this.setState({ form: this.initialState });

    });

    _this.initialState = {
      id: null,
      type: 'stripe',
      account_name: '',
      public_key: '',
      secret_key: '',
      "default": false
    };
    _this.state = {
      form: _this.initialState
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(FormStripe, [{
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

      var i18n = ndpi.i18n;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "pi-overlay",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "pi-modal-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "pi-modal-header pi-gradient",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
              className: "pi-close",
              onClick: function onClick() {
                return _this2.props.close();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("svg", {
                width: 25,
                height: 25,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  d: "M12.5 3.5L3.5 12.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  d: "M12.5 12.5L3.5 3.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("h2", {
              className: "pi-modal-title",
              children: [this.props.modalType == 'new' ? i18n["new"] : i18n.edit, " Stripe"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
              children: "Please fill up necessary informaiton in the form."
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("form", {
            onSubmit: this.handleSubmit,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-account_name",
                      children: "Account Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-account_name",
                      type: "text",
                      required: true,
                      name: "account_name",
                      value: this.state.form.account_name,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-public_key",
                      children: "Public Key"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-public_key",
                      type: "text",
                      required: true,
                      name: "public_key",
                      value: this.state.form.public_key,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-secret_key",
                      children: "Secret Key"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-secret_key",
                      type: "text",
                      required: true,
                      name: "secret_key",
                      value: this.state.form.secret_key,
                      onChange: this.handleChange
                    })]
                  })
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "pi-modal-footer",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                    type: "reset",
                    className: "pi-btn pi-text-hover-blue",
                    children: i18n.clear
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                    type: "submit",
                    className: "pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white",
                    children: i18n.save
                  })
                })]
              })
            })]
          })]
        })
      });
    }
  }]);

  return FormStripe;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormStripe);

/***/ }),

/***/ "./src/js/components/payment/Search.js":
/*!*********************************************!*\
  !*** ./src/js/components/payment/Search.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









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
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      _this.props.handleSubmit(_this.state.form);
    });

    _this.initialState = {
      id: null,
      name: '',
      job: '',
      first_name: '',
      last_name: '',
      email: '',
      org_name: '',
      web: '',
      mobile: '',
      zip: '',
      address: '',
      date: false
    };
    _this.state = {
      form: _this.initialState
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Form, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: this.props.show && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "ncpi-search absolute top-0 right-0",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("form", {
              onSubmit: this.handleSubmit,
              className: "h-screen border-0 shadow-lg flex flex-col w-full bg-white",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h3", {
                  className: "text-xl p-2 font-semibold",
                  children: "Search"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                  className: "p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none",
                  onClick: function onClick() {
                    return _this2.props.close('search');
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                    className: "bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none",
                    children: "\xD7"
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "relative px-6 py-5 flex-auto overflow-y-auto",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "w-full max-w-lg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "-mx-3 mb-2",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                      className: "w-full px-3 mb-6 md:mb-0",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                        className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                        htmlFor: "first_name",
                        children: "First Name"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                        className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                        id: "first_name",
                        type: "text",
                        name: "first_name",
                        value: this.state.form.first_name,
                        onChange: this.handleChange
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                      className: "w-full px-3 mb-6 md:mb-0",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                        className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                        htmlFor: "last_name",
                        children: "Last Name"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                        className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                        id: "last_name",
                        type: "text",
                        name: "last_name",
                        value: this.state.form.last_name,
                        onChange: this.handleChange
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                      className: "w-full px-3 mb-6 md:mb-0",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                        className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                        htmlFor: "grid_email",
                        children: "Email"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                        className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                        id: "grid_email",
                        type: "email",
                        name: "email",
                        value: this.state.form.email,
                        onChange: this.handleChange
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                      className: "w-full px-3 mb-6 md:mb-0",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                        className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                        htmlFor: "grid-mobile",
                        children: "Mobile Number"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                        className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                        id: "grid-mobile",
                        type: "text",
                        name: "mobile",
                        value: this.state.form.mobile,
                        onChange: this.handleChange
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                      className: "w-full px-3 mb-6 md:mb-0",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                        className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                        htmlFor: "grid-org_name",
                        children: "Company Name"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                        className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                        id: "grid-org_name",
                        type: "text",
                        name: "org_name",
                        value: this.state.form.org_name,
                        onChange: this.handleChange
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                      className: "w-full px-3 mb-6 md:mb-0",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                        className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                        htmlFor: "grid-web",
                        children: "Website"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                        className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                        id: "grid-web",
                        type: "url",
                        name: "web",
                        value: this.state.form.web,
                        onChange: this.handleChange
                      })]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                      className: "w-full px-3 mb-6 md:mb-0",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                        className: "block tracking-wide text-gray-700 text-xs font-bold mb-2",
                        htmlFor: "grid-zip",
                        children: "Zip Code"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                        className: "appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
                        id: "grid-zip",
                        type: "number",
                        name: "zip",
                        value: this.state.form.zip,
                        onChange: this.handleChange
                      })]
                    })]
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                  className: "text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",
                  onClick: function onClick() {
                    return _this2.props.close('search');
                  },
                  children: "Close"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                  className: "text-white bg-gray-800 hover:bg-gray-900 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150",
                  type: "submit",
                  children: "Search"
                })]
              })]
            })
          })
        })
      });
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);



/***/ }),

/***/ "./src/js/components/payment/TableBank.js":
/*!************************************************!*\
  !*** ./src/js/components/payment/TableBank.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var TableBody = function TableBody(props) {
  var rows = props.tableData.map(function (row, index) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
      className: "pi-bg-pearl",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "pi-edit",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          onClick: function onClick() {
            return props.editEntry('edit', row);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
            width: 10,
            height: 10,
            viewBox: "0 0 13 13",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M12.5241 0.47579C12.2193 0.171142 11.8061 0 11.3752 0C10.9443 0 10.531 0.171142 10.2263 0.47579L4.0625 6.63957V8.93738H6.36031L12.5241 2.7736C12.8287 2.46886 12.9999 2.0556 12.9999 1.62469C12.9999 1.19379 12.8287 0.78053 12.5241 0.47579Z",
              fill: "#A0AEC0"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M0 3.24978C0 2.81879 0.171209 2.40546 0.475963 2.1007C0.780718 1.79595 1.19405 1.62474 1.62504 1.62474H4.87512C5.09062 1.62474 5.29728 1.71034 5.44966 1.86272C5.60204 2.0151 5.68764 2.22177 5.68764 2.43726C5.68764 2.65275 5.60204 2.85942 5.44966 3.0118C5.29728 3.16417 5.09062 3.24978 4.87512 3.24978H1.62504V11.375H9.75024V8.1249C9.75024 7.90941 9.83585 7.70274 9.98823 7.55036C10.1406 7.39799 10.3473 7.31238 10.5628 7.31238C10.7783 7.31238 10.9849 7.39799 11.1373 7.55036C11.2897 7.70274 11.3753 7.90941 11.3753 8.1249V11.375C11.3753 11.806 11.2041 12.2193 10.8993 12.5241C10.5946 12.8288 10.1812 13 9.75024 13H1.62504C1.19405 13 0.780718 12.8288 0.475963 12.5241C0.171209 12.2193 0 11.806 0 11.375V3.24978Z",
              fill: "#A0AEC0"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          onClick: function onClick() {
            return props.deleteEntry('single', row.id);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
            width: 10,
            height: 10,
            viewBox: "0 0 9 9",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M8.07284 2.38745C8.07282 2.48303 8.03773 2.57528 7.97422 2.64671C7.9107 2.71814 7.82318 2.76377 7.72825 2.77496L7.68259 2.77769H7.35284L6.87245 7.66354C6.84629 7.92866 6.72246 8.17456 6.52505 8.35344C6.32764 8.53232 6.07075 8.63138 5.80435 8.63135H2.92669C2.66029 8.63138 2.4034 8.53232 2.20599 8.35344C2.00858 8.17456 1.88475 7.92866 1.85859 7.66354L1.3782 2.77769H1.04845C0.944948 2.77769 0.845688 2.73657 0.772503 2.66339C0.699318 2.5902 0.658203 2.49094 0.658203 2.38745C0.658203 2.28395 0.699318 2.18469 0.772503 2.1115C0.845688 2.03832 0.944948 1.9972 1.04845 1.9972H2.99967C2.99967 1.81783 3.035 1.64022 3.10364 1.47451C3.17228 1.3088 3.27288 1.15823 3.39972 1.0314C3.52655 0.904566 3.67712 0.803958 3.84283 0.735317C4.00854 0.666677 4.18615 0.631348 4.36552 0.631348C4.54489 0.631348 4.7225 0.666677 4.88821 0.735317C5.05392 0.803958 5.20449 0.904566 5.33132 1.0314C5.45816 1.15823 5.55876 1.3088 5.6274 1.47451C5.69604 1.64022 5.73137 1.81783 5.73137 1.9972H7.68259C7.78609 1.9972 7.88535 2.03832 7.95854 2.1115C8.03172 2.18469 8.07284 2.28395 8.07284 2.38745ZM5.24357 3.65574C5.17284 3.65574 5.10451 3.68135 5.05121 3.72784C4.9979 3.77433 4.96324 3.83855 4.95362 3.90862L4.95089 3.94842V6.68013L4.95362 6.71993C4.96326 6.78999 4.99793 6.85418 5.05123 6.90065C5.10453 6.94712 5.17286 6.97272 5.24357 6.97272C5.31428 6.97272 5.3826 6.94712 5.43591 6.90065C5.48921 6.85418 5.52388 6.78999 5.53352 6.71993L5.53625 6.68013V3.94842L5.53352 3.90862C5.5239 3.83855 5.48923 3.77433 5.43593 3.72784C5.38263 3.68135 5.3143 3.65574 5.24357 3.65574ZM3.48747 3.65574C3.41674 3.65574 3.34841 3.68135 3.29511 3.72784C3.24181 3.77433 3.20714 3.83855 3.19752 3.90862L3.19479 3.94842V6.68013L3.19752 6.71993C3.20716 6.78999 3.24183 6.85418 3.29513 6.90065C3.34844 6.94712 3.41676 6.97272 3.48747 6.97272C3.55818 6.97272 3.62651 6.94712 3.67981 6.90065C3.73311 6.85418 3.76778 6.78999 3.77742 6.71993L3.78015 6.68013V3.94842L3.77742 3.90862C3.7678 3.83855 3.73314 3.77433 3.67983 3.72784C3.62653 3.68135 3.5582 3.65574 3.48747 3.65574ZM4.36552 1.41184C4.21027 1.41184 4.06138 1.47351 3.9516 1.58329C3.84183 1.69306 3.78015 1.84195 3.78015 1.9972H4.95089C4.95089 1.84195 4.88921 1.69306 4.77944 1.58329C4.66966 1.47351 4.52077 1.41184 4.36552 1.41184Z",
              fill: "#718096"
            })
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "pi-item-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
            width: 29,
            height: 24,
            viewBox: "0 0 29 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M2.71533 9H26.2479L14.4816 3L2.71533 9Z",
              stroke: "#4A5568",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M6.33569 9V16.5",
              stroke: "#4A5568",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M11.7664 9V16.5",
              stroke: "#4A5568",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M17.1969 9V16.5",
              stroke: "#4A5568",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M22.6277 9V16.5",
              stroke: "#4A5568",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M3.62036 16.5H25.3427",
              stroke: "#4A5568",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M1.81018 19.5H27.153",
              stroke: "#4A5568",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })]
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "pi-text-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
          className: "pi-title-medium",
          children: row.name
        })
      })]
    }, index);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
    children: rows
  });
};

var Table = function Table(props) {
  var tableData = props.tableData,
      editEntry = props.editEntry,
      checkedBoxes = props.checkedBoxes,
      deleteEntry = props.deleteEntry;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: tableData.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TableBody, {
      tableData: tableData,
      editEntry: editEntry,
      checkedBoxes: checkedBoxes,
      deleteEntry: deleteEntry
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ "./src/js/components/payment/TablePaypal.js":
/*!**************************************************!*\
  !*** ./src/js/components/payment/TablePaypal.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var TableBody = function TableBody(props) {
  var rows = props.tableData.map(function (row, index) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
      className: "pi-bg-pearl",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "pi-edit",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          onClick: function onClick() {
            return props.editEntry('edit', row);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
            width: 10,
            height: 10,
            viewBox: "0 0 13 13",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M12.5241 0.47579C12.2193 0.171142 11.8061 0 11.3752 0C10.9443 0 10.531 0.171142 10.2263 0.47579L4.0625 6.63957V8.93738H6.36031L12.5241 2.7736C12.8287 2.46886 12.9999 2.0556 12.9999 1.62469C12.9999 1.19379 12.8287 0.78053 12.5241 0.47579Z",
              fill: "#A0AEC0"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M0 3.24978C0 2.81879 0.171209 2.40546 0.475963 2.1007C0.780718 1.79595 1.19405 1.62474 1.62504 1.62474H4.87512C5.09062 1.62474 5.29728 1.71034 5.44966 1.86272C5.60204 2.0151 5.68764 2.22177 5.68764 2.43726C5.68764 2.65275 5.60204 2.85942 5.44966 3.0118C5.29728 3.16417 5.09062 3.24978 4.87512 3.24978H1.62504V11.375H9.75024V8.1249C9.75024 7.90941 9.83585 7.70274 9.98823 7.55036C10.1406 7.39799 10.3473 7.31238 10.5628 7.31238C10.7783 7.31238 10.9849 7.39799 11.1373 7.55036C11.2897 7.70274 11.3753 7.90941 11.3753 8.1249V11.375C11.3753 11.806 11.2041 12.2193 10.8993 12.5241C10.5946 12.8288 10.1812 13 9.75024 13H1.62504C1.19405 13 0.780718 12.8288 0.475963 12.5241C0.171209 12.2193 0 11.806 0 11.375V3.24978Z",
              fill: "#A0AEC0"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          onClick: function onClick() {
            return props.deleteEntry('single', row.id);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
            width: 10,
            height: 10,
            viewBox: "0 0 9 9",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M8.07284 2.38745C8.07282 2.48303 8.03773 2.57528 7.97422 2.64671C7.9107 2.71814 7.82318 2.76377 7.72825 2.77496L7.68259 2.77769H7.35284L6.87245 7.66354C6.84629 7.92866 6.72246 8.17456 6.52505 8.35344C6.32764 8.53232 6.07075 8.63138 5.80435 8.63135H2.92669C2.66029 8.63138 2.4034 8.53232 2.20599 8.35344C2.00858 8.17456 1.88475 7.92866 1.85859 7.66354L1.3782 2.77769H1.04845C0.944948 2.77769 0.845688 2.73657 0.772503 2.66339C0.699318 2.5902 0.658203 2.49094 0.658203 2.38745C0.658203 2.28395 0.699318 2.18469 0.772503 2.1115C0.845688 2.03832 0.944948 1.9972 1.04845 1.9972H2.99967C2.99967 1.81783 3.035 1.64022 3.10364 1.47451C3.17228 1.3088 3.27288 1.15823 3.39972 1.0314C3.52655 0.904566 3.67712 0.803958 3.84283 0.735317C4.00854 0.666677 4.18615 0.631348 4.36552 0.631348C4.54489 0.631348 4.7225 0.666677 4.88821 0.735317C5.05392 0.803958 5.20449 0.904566 5.33132 1.0314C5.45816 1.15823 5.55876 1.3088 5.6274 1.47451C5.69604 1.64022 5.73137 1.81783 5.73137 1.9972H7.68259C7.78609 1.9972 7.88535 2.03832 7.95854 2.1115C8.03172 2.18469 8.07284 2.28395 8.07284 2.38745ZM5.24357 3.65574C5.17284 3.65574 5.10451 3.68135 5.05121 3.72784C4.9979 3.77433 4.96324 3.83855 4.95362 3.90862L4.95089 3.94842V6.68013L4.95362 6.71993C4.96326 6.78999 4.99793 6.85418 5.05123 6.90065C5.10453 6.94712 5.17286 6.97272 5.24357 6.97272C5.31428 6.97272 5.3826 6.94712 5.43591 6.90065C5.48921 6.85418 5.52388 6.78999 5.53352 6.71993L5.53625 6.68013V3.94842L5.53352 3.90862C5.5239 3.83855 5.48923 3.77433 5.43593 3.72784C5.38263 3.68135 5.3143 3.65574 5.24357 3.65574ZM3.48747 3.65574C3.41674 3.65574 3.34841 3.68135 3.29511 3.72784C3.24181 3.77433 3.20714 3.83855 3.19752 3.90862L3.19479 3.94842V6.68013L3.19752 6.71993C3.20716 6.78999 3.24183 6.85418 3.29513 6.90065C3.34844 6.94712 3.41676 6.97272 3.48747 6.97272C3.55818 6.97272 3.62651 6.94712 3.67981 6.90065C3.73311 6.85418 3.76778 6.78999 3.77742 6.71993L3.78015 6.68013V3.94842L3.77742 3.90862C3.7678 3.83855 3.73314 3.77433 3.67983 3.72784C3.62653 3.68135 3.5582 3.65574 3.48747 3.65574ZM4.36552 1.41184C4.21027 1.41184 4.06138 1.47351 3.9516 1.58329C3.84183 1.69306 3.78015 1.84195 3.78015 1.9972H4.95089C4.95089 1.84195 4.88921 1.69306 4.77944 1.58329C4.66966 1.47351 4.52077 1.41184 4.36552 1.41184Z",
              fill: "#718096"
            })
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "pi-item-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
            width: 23,
            height: 27,
            viewBox: "0 0 23 27",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M19.5675 2.57768C18.3585 1.19971 16.1731 0.608938 13.3774 0.608938H5.26339C4.98664 0.608789 4.71892 0.707424 4.50841 0.887085C4.2979 1.06675 4.15843 1.31564 4.11508 1.58898L0.738033 23.0176C0.722374 23.117 0.728452 23.2187 0.755848 23.3155C0.783244 23.4123 0.831307 23.5021 0.896726 23.5785C0.962144 23.655 1.04336 23.7164 1.13479 23.7585C1.22621 23.8005 1.32566 23.8223 1.4263 23.8222H6.43554L7.69363 15.8425L7.65463 16.0924C7.69714 15.8196 7.83569 15.5709 8.0453 15.3913C8.25491 15.2116 8.5218 15.1127 8.79788 15.1123H11.1783C15.8546 15.1123 19.5162 13.2129 20.5858 7.71836C20.6176 7.55587 20.645 7.3977 20.6688 7.24315C20.9866 5.2123 20.6667 3.82999 19.5682 2.5784",
              fill: "#003087"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M19.5675 2.57768C18.3585 1.19971 16.1731 0.608938 13.3774 0.608938H5.26339C4.98664 0.608789 4.71892 0.707424 4.50841 0.887085C4.2979 1.06675 4.15843 1.31564 4.11508 1.58898L0.738033 23.0176C0.722374 23.117 0.728452 23.2187 0.755848 23.3155C0.783244 23.4123 0.831307 23.5021 0.896726 23.5785C0.962144 23.655 1.04336 23.7164 1.13479 23.7585C1.22621 23.8005 1.32566 23.8223 1.4263 23.8222H6.43554L7.69363 15.8425L7.65463 16.0924C7.69714 15.8196 7.83569 15.5709 8.0453 15.3913C8.25491 15.2116 8.5218 15.1127 8.79788 15.1123H11.1783C15.8546 15.1123 19.5162 13.2129 20.5858 7.71836C20.6176 7.55587 20.645 7.3977 20.6688 7.24315C20.9866 5.2123 20.6667 3.82999 19.5682 2.5784",
              fill: "#003087"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M9.04492 7.26989C9.08288 7.03105 9.20471 6.81356 9.38856 6.65645C9.57241 6.49934 9.80623 6.41289 10.0481 6.41263H16.4093C17.1625 6.41263 17.8653 6.46174 18.5073 6.56429C18.8583 6.62076 19.2056 6.69843 19.5473 6.79684C19.9353 6.90593 20.3107 7.05552 20.6674 7.24317C20.9866 5.2116 20.666 3.83001 19.5675 2.5777C18.3578 1.20045 16.1731 0.60968 13.3775 0.60968H5.26271C4.98621 0.609877 4.71884 0.708664 4.50863 0.888294C4.29842 1.06792 4.15915 1.31663 4.11585 1.58972L0.737354 23.0162C0.721589 23.1156 0.727563 23.2173 0.754864 23.3141C0.782166 23.411 0.830145 23.5008 0.895497 23.5773C0.960848 23.6539 1.04202 23.7153 1.13341 23.7575C1.22481 23.7996 1.32425 23.8215 1.4249 23.8215H6.43486L7.69295 15.8411L9.04492 7.26989Z",
              fill: "#003087"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M20.6681 7.24249C20.6434 7.40138 20.6157 7.55981 20.5851 7.7177C19.5155 13.2115 15.8539 15.1117 11.1776 15.1117H8.79647C8.52043 15.1119 8.25356 15.2108 8.04404 15.3905C7.83451 15.5702 7.69615 15.8189 7.65394 16.0917L6.43485 23.8208L6.08819 26.0134C6.07441 26.1005 6.07966 26.1895 6.1036 26.2743C6.12753 26.3591 6.16958 26.4377 6.22683 26.5047C6.28408 26.5717 6.35519 26.6255 6.43524 26.6624C6.51529 26.6993 6.60238 26.7183 6.69051 26.7183H10.9133C11.413 26.7183 11.8377 26.3543 11.9164 25.861L11.9576 25.6458L12.7535 20.6019L12.804 20.3231C12.8419 20.0841 12.9638 19.8664 13.1478 19.7093C13.3318 19.5521 13.5659 19.4658 13.8079 19.4659H14.4398C18.5304 19.4659 21.7334 17.8048 22.6694 12.9978C23.0594 10.99 22.8572 9.31234 21.8244 8.13441C21.4965 7.76922 21.1046 7.46696 20.6681 7.24249Z",
              fill: "#009CDE"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M19.5479 6.79685C19.3846 6.74846 19.2164 6.70513 19.043 6.66685C18.8697 6.62857 18.6906 6.59463 18.5072 6.56574C17.8644 6.46102 17.1624 6.41191 16.4084 6.41191H10.0479C9.80583 6.41161 9.57161 6.49795 9.38762 6.65531C9.20364 6.81268 9.08203 7.03067 9.04478 7.26989L7.69281 15.8425L7.65381 16.0917C7.69602 15.8189 7.83438 15.5702 8.04391 15.3904C8.25343 15.2107 8.5203 15.1118 8.79634 15.1116H11.1775C15.8538 15.1116 19.5154 13.2122 20.585 7.71766C20.6167 7.55516 20.6435 7.39773 20.668 7.24245C20.3855 7.09465 20.0913 6.97049 19.7884 6.87123C19.7096 6.84523 19.6295 6.82068 19.5479 6.79613",
              fill: "#012169"
            })]
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "pi-text-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
          className: "pi-title-medium",
          children: row.account_name
        })
      })]
    }, index);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
    children: rows
  });
};

var Table = function Table(props) {
  var tableData = props.tableData,
      editEntry = props.editEntry,
      checkedBoxes = props.checkedBoxes,
      deleteEntry = props.deleteEntry;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: tableData.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TableBody, {
      tableData: tableData,
      editEntry: editEntry,
      checkedBoxes: checkedBoxes,
      deleteEntry: deleteEntry
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ "./src/js/components/payment/TableStripe.js":
/*!**************************************************!*\
  !*** ./src/js/components/payment/TableStripe.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var TableBody = function TableBody(props) {
  var rows = props.tableData.map(function (row, index) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
      className: "pi-bg-pearl",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "pi-edit",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          onClick: function onClick() {
            return props.editEntry('edit', row);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
            width: 10,
            height: 10,
            viewBox: "0 0 13 13",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M12.5241 0.47579C12.2193 0.171142 11.8061 0 11.3752 0C10.9443 0 10.531 0.171142 10.2263 0.47579L4.0625 6.63957V8.93738H6.36031L12.5241 2.7736C12.8287 2.46886 12.9999 2.0556 12.9999 1.62469C12.9999 1.19379 12.8287 0.78053 12.5241 0.47579Z",
              fill: "#A0AEC0"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M0 3.24978C0 2.81879 0.171209 2.40546 0.475963 2.1007C0.780718 1.79595 1.19405 1.62474 1.62504 1.62474H4.87512C5.09062 1.62474 5.29728 1.71034 5.44966 1.86272C5.60204 2.0151 5.68764 2.22177 5.68764 2.43726C5.68764 2.65275 5.60204 2.85942 5.44966 3.0118C5.29728 3.16417 5.09062 3.24978 4.87512 3.24978H1.62504V11.375H9.75024V8.1249C9.75024 7.90941 9.83585 7.70274 9.98823 7.55036C10.1406 7.39799 10.3473 7.31238 10.5628 7.31238C10.7783 7.31238 10.9849 7.39799 11.1373 7.55036C11.2897 7.70274 11.3753 7.90941 11.3753 8.1249V11.375C11.3753 11.806 11.2041 12.2193 10.8993 12.5241C10.5946 12.8288 10.1812 13 9.75024 13H1.62504C1.19405 13 0.780718 12.8288 0.475963 12.5241C0.171209 12.2193 0 11.806 0 11.375V3.24978Z",
              fill: "#A0AEC0"
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          onClick: function onClick() {
            return props.deleteEntry('single', row.id);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
            width: 10,
            height: 10,
            viewBox: "0 0 9 9",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M8.07284 2.38745C8.07282 2.48303 8.03773 2.57528 7.97422 2.64671C7.9107 2.71814 7.82318 2.76377 7.72825 2.77496L7.68259 2.77769H7.35284L6.87245 7.66354C6.84629 7.92866 6.72246 8.17456 6.52505 8.35344C6.32764 8.53232 6.07075 8.63138 5.80435 8.63135H2.92669C2.66029 8.63138 2.4034 8.53232 2.20599 8.35344C2.00858 8.17456 1.88475 7.92866 1.85859 7.66354L1.3782 2.77769H1.04845C0.944948 2.77769 0.845688 2.73657 0.772503 2.66339C0.699318 2.5902 0.658203 2.49094 0.658203 2.38745C0.658203 2.28395 0.699318 2.18469 0.772503 2.1115C0.845688 2.03832 0.944948 1.9972 1.04845 1.9972H2.99967C2.99967 1.81783 3.035 1.64022 3.10364 1.47451C3.17228 1.3088 3.27288 1.15823 3.39972 1.0314C3.52655 0.904566 3.67712 0.803958 3.84283 0.735317C4.00854 0.666677 4.18615 0.631348 4.36552 0.631348C4.54489 0.631348 4.7225 0.666677 4.88821 0.735317C5.05392 0.803958 5.20449 0.904566 5.33132 1.0314C5.45816 1.15823 5.55876 1.3088 5.6274 1.47451C5.69604 1.64022 5.73137 1.81783 5.73137 1.9972H7.68259C7.78609 1.9972 7.88535 2.03832 7.95854 2.1115C8.03172 2.18469 8.07284 2.28395 8.07284 2.38745ZM5.24357 3.65574C5.17284 3.65574 5.10451 3.68135 5.05121 3.72784C4.9979 3.77433 4.96324 3.83855 4.95362 3.90862L4.95089 3.94842V6.68013L4.95362 6.71993C4.96326 6.78999 4.99793 6.85418 5.05123 6.90065C5.10453 6.94712 5.17286 6.97272 5.24357 6.97272C5.31428 6.97272 5.3826 6.94712 5.43591 6.90065C5.48921 6.85418 5.52388 6.78999 5.53352 6.71993L5.53625 6.68013V3.94842L5.53352 3.90862C5.5239 3.83855 5.48923 3.77433 5.43593 3.72784C5.38263 3.68135 5.3143 3.65574 5.24357 3.65574ZM3.48747 3.65574C3.41674 3.65574 3.34841 3.68135 3.29511 3.72784C3.24181 3.77433 3.20714 3.83855 3.19752 3.90862L3.19479 3.94842V6.68013L3.19752 6.71993C3.20716 6.78999 3.24183 6.85418 3.29513 6.90065C3.34844 6.94712 3.41676 6.97272 3.48747 6.97272C3.55818 6.97272 3.62651 6.94712 3.67981 6.90065C3.73311 6.85418 3.76778 6.78999 3.77742 6.71993L3.78015 6.68013V3.94842L3.77742 3.90862C3.7678 3.83855 3.73314 3.77433 3.67983 3.72784C3.62653 3.68135 3.5582 3.65574 3.48747 3.65574ZM4.36552 1.41184C4.21027 1.41184 4.06138 1.47351 3.9516 1.58329C3.84183 1.69306 3.78015 1.84195 3.78015 1.9972H4.95089C4.95089 1.84195 4.88921 1.69306 4.77944 1.58329C4.66966 1.47351 4.52077 1.41184 4.36552 1.41184Z",
              fill: "#718096"
            })
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "pi-item-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
            width: 29,
            height: 12,
            viewBox: "0 0 29 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M2.0267 4.70227C2.0267 4.38985 2.28304 4.26969 2.70761 4.26969C3.31642 4.26969 4.08545 4.45394 4.69426 4.78238V2.89987C4.02937 2.63551 3.3725 2.53138 2.70761 2.53138C1.08144 2.53138 0 3.38051 0 4.7984C0 7.00935 3.04406 6.65688 3.04406 7.61015C3.04406 7.97864 2.72363 8.0988 2.27503 8.0988C1.61015 8.0988 0.761015 7.82644 0.0881175 7.45794V9.36449C0.833111 9.68491 1.58611 9.82109 2.27503 9.82109C3.94125 9.82109 5.08678 8.996 5.08678 7.56208C5.07877 5.1749 2.0267 5.59947 2.0267 4.70227ZM7.44192 0.929239L5.48732 1.34579L5.4793 7.76235C5.4793 8.94793 6.36849 9.82109 7.55407 9.82109C8.21095 9.82109 8.69159 9.70094 8.95594 9.55674V7.93057C8.6996 8.03471 7.43391 8.4032 7.43391 7.21762V4.37383H8.95594V2.66756H7.43391L7.44192 0.929239ZM11.4473 3.26035L11.3191 2.66756H9.58878V9.6769H11.5915V4.92657C12.0641 4.30975 12.8652 4.4219 13.1135 4.51001V2.66756C12.8571 2.57143 11.9199 2.39519 11.4473 3.26035ZM13.6021 2.66756H15.6128V9.6769H13.6021V2.66756ZM13.6021 2.05874L15.6128 1.62617V0L13.6021 0.424566V2.05874ZM19.7944 2.53138C19.0093 2.53138 18.5047 2.89987 18.2243 3.15621L18.1202 2.65955H16.3578V12L18.3605 11.5754L18.3685 9.30841C18.6569 9.51669 19.0814 9.81308 19.7864 9.81308C21.2203 9.81308 22.526 8.65955 22.526 6.12016C22.518 3.79706 21.1963 2.53138 19.7944 2.53138ZM19.3137 8.05073C18.8411 8.05073 18.5607 7.88251 18.3685 7.67423L18.3605 4.70227C18.5688 4.46996 18.8571 4.30975 19.3137 4.30975C20.0427 4.30975 20.5474 5.12684 20.5474 6.17624C20.5474 7.24967 20.0507 8.05073 19.3137 8.05073ZM28.8384 6.20027C28.8384 4.14953 27.8451 2.53138 25.9466 2.53138C24.0401 2.53138 22.8865 4.14953 22.8865 6.18425C22.8865 8.59546 24.2483 9.81308 26.2029 9.81308C27.1562 9.81308 27.8772 9.5968 28.4219 9.29239V7.69025C27.8772 7.96262 27.2523 8.13084 26.4593 8.13084C25.6822 8.13084 24.9933 7.85848 24.9052 6.91322H28.8224C28.8224 6.80908 28.8384 6.39252 28.8384 6.20027ZM24.8812 5.43925C24.8812 4.53405 25.4339 4.15754 25.9386 4.15754C26.4272 4.15754 26.9479 4.53405 26.9479 5.43925H24.8812Z",
              fill: "#6772E5"
            })
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "pi-text-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
          className: "pi-title-medium",
          children: row.account_name
        })
      })]
    }, index);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("ul", {
    children: rows
  });
};

var Table = function Table(props) {
  var tableData = props.tableData,
      editEntry = props.editEntry,
      checkedBoxes = props.checkedBoxes,
      deleteEntry = props.deleteEntry;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: tableData.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TableBody, {
      tableData: tableData,
      editEntry: editEntry,
      checkedBoxes: checkedBoxes,
      deleteEntry: deleteEntry
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ "./src/js/components/payment/index.js":
/*!********************************************!*\
  !*** ./src/js/components/payment/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Payment)
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
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var _style_scoped_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style.scoped.scss */ "./src/js/components/payment/style.scoped.scss");
/* harmony import */ var context_app_context__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! context/app-context */ "./src/js/context/app-context.js");
/* harmony import */ var block_preloader_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! block/preloader/table */ "./src/js/blocks/preloader/table/index.js");
/* harmony import */ var api_payment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! api/payment */ "./src/js/api/payment.js");
/* harmony import */ var _FormBank__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./FormBank */ "./src/js/components/payment/FormBank.js");
/* harmony import */ var _FormPaypal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./FormPaypal */ "./src/js/components/payment/FormPaypal.js");
/* harmony import */ var _FormStripe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./FormStripe */ "./src/js/components/payment/FormStripe.js");
/* harmony import */ var _TableBank__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./TableBank */ "./src/js/components/payment/TableBank.js");
/* harmony import */ var _TablePaypal__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./TablePaypal */ "./src/js/components/payment/TablePaypal.js");
/* harmony import */ var _TableStripe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./TableStripe */ "./src/js/components/payment/TableStripe.js");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Search */ "./src/js/components/payment/Search.js");
/* harmony import */ var block_empty__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! block/empty */ "./src/js/blocks/empty/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






 //form



 //table










var Payment = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Payment, _Component);

  var _super = _createSuper(Payment);

  function Payment(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Payment);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "getLists", function () {
      var searchArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _this.setState({
        preloader: true
      });

      var args = {
        page: _this.state.currentPage,
        per_page: _this.state.perPage,
        type: _this.state.currentTab
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
      api_payment__WEBPACK_IMPORTED_MODULE_13__["default"].getAll(params).then(function (resp) {
        var result = resp.data.data.result;
        var total = resp.data.data.total;
        var empty = result.length ? false : true;

        _this.setState({
          payments: result,
          preloader: false,
          empty: empty
        });

        _this.setState({
          totalPage: Math.ceil(total / _this.state.perPage)
        });
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handleSubmit", function (payment) {
      if (_this.state.formModalType == 'new') {
        api_payment__WEBPACK_IMPORTED_MODULE_13__["default"].create(payment).then(function (resp) {
          if (resp.data.success) {
            _this.setState({
              formModal: false
            });

            react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success(_this.context.CrudMsg.create);

            _this.getLists();
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error(value);
            });
          }
        });
      } else {
        api_payment__WEBPACK_IMPORTED_MODULE_13__["default"].update(payment.id, payment).then(function (resp) {
          if (resp.data.success) {
            _this.setState({
              formModal: false
            });

            react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success(_this.context.CrudMsg.update);

            _this.getLists();
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error(value);
            });
          }
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "deleteEntry", function (type, index) {
      if (confirm(_this.context.CrudMsg.confirm)) {
        if (type == 'single') {
          _this.setState({
            payments: _this.state.payments.filter(function (payment, i) {
              return payment.id !== index;
            })
          });
        }

        var ids = type == 'single' ? index : _this.state.checkedBoxes.toString();
        api_payment__WEBPACK_IMPORTED_MODULE_13__["default"].remove(ids).then(function (resp) {
          if (resp.data.success) {
            react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success(_this.context.CrudMsg["delete"]);

            if (type != 'single') {
              _this.setState({
                checkedBoxes: []
              });
            }

            _this.getLists();
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error(value);
            });
          }
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "openForm", function () {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'new';
      var payment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _this.setState({
        formModal: true
      });

      if (type == 'new') {
        _this.setState({
          formModalType: 'new'
        });
      } else {
        _this.setState({
          formModalType: 'edit'
        });

        _this.setState({
          payment: payment
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "closeForm", function () {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'new';

      if (type == 'new') {
        _this.setState({
          formModal: false
        });
      } else {
        _this.setState({
          searchModal: false
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handleCheckbox", function (e, type) {
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var arr = _this.state.checkedBoxes;

      if (type == 'single') {
        if (e.target.checked) {
          arr.push(id);

          _this.setState({
            checkedBoxes: arr
          });
        } else {
          arr.splice(arr.indexOf(id), 1);

          _this.setState({
            checkedBoxes: arr
          });
        }
      } else {
        //check all
        if (e.target.checked) {
          var ids = [];

          _this.state.payments.map(function (row) {
            ids.push(row.id);
          });

          _this.setState({
            checkedBoxes: ids
          });
        } else {
          _this.setState({
            checkedBoxes: []
          });
        }
      }
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
      title: 'Payment',
      currentTab: 'bank',
      currentTabTitle: 'Bank',
      empty: false,
      preloader: true,
      formModal: false,
      searchModal: false,
      formModalType: 'new',
      payment: {
        id: null
      },
      payments: [],
      checkedBoxes: [],
      offset: 0,
      perPage: 10,
      totalPage: 1,
      currentPage: 1
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Payment, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getLists();
    }
  }, {
    key: "setActiveTab",
    value: function setActiveTab(e, id) {
      var _this2 = this;

      e.preventDefault();
      var title;

      switch (id) {
        case 'bank':
          title = 'Bank';
          break;

        case 'paypal':
          title = 'Paypal';
          break;

        case 'stripe':
          title = 'Stripe';
          break;
      }

      this.setState({
        currentTab: id,
        currentTabTitle: title
      }, function () {
        _this2.getLists();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          payments = _this$state.payments,
          title = _this$state.title,
          currentTab = _this$state.currentTab,
          currentTabTitle = _this$state.currentTabTitle;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("div", {
        className: "ncpi-components",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("div", {
          className: "pi-payment-tab",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("ul", {
            className: "pi-tabs",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("li", {
              "data-tab-target": "#pi-bank",
              className: 'pi-tab ' + (currentTab == 'bank' ? 'pi-active' : ''),
              onClick: function onClick(e) {
                return _this3.setActiveTab(e, 'bank');
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("span", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("svg", {
                  width: 29,
                  height: 24,
                  viewBox: "0 0 29 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                    d: "M2.71533 9H26.2479L14.4816 3L2.71533 9Z",
                    stroke: "#4A5568",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                    d: "M6.33569 9V16.5",
                    stroke: "#4A5568",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                    d: "M11.7664 9V16.5",
                    stroke: "#4A5568",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                    d: "M17.1969 9V16.5",
                    stroke: "#4A5568",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                    d: "M22.6277 9V16.5",
                    stroke: "#4A5568",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                    d: "M3.62036 16.5H25.3427",
                    stroke: "#4A5568",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                    d: "M1.81018 19.5H27.153",
                    stroke: "#4A5568",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("span", {
                children: "Bank & Others"
              })]
            }), !wage.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("li", {
                "data-tab-target": "#pi-paypal",
                className: 'pi-tab ' + (currentTab == 'paypal' ? 'pi-active' : ''),
                onClick: function onClick(e) {
                  return _this3.setActiveTab(e, 'paypal');
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("span", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("svg", {
                    width: 23,
                    height: 27,
                    viewBox: "0 0 23 27",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                      d: "M19.5675 2.57768C18.3585 1.19971 16.1731 0.608938 13.3774 0.608938H5.26339C4.98664 0.608789 4.71892 0.707424 4.50841 0.887085C4.2979 1.06675 4.15843 1.31564 4.11508 1.58898L0.738033 23.0176C0.722374 23.117 0.728452 23.2187 0.755848 23.3155C0.783244 23.4123 0.831307 23.5021 0.896726 23.5785C0.962144 23.655 1.04336 23.7164 1.13479 23.7585C1.22621 23.8005 1.32566 23.8223 1.4263 23.8222H6.43554L7.69363 15.8425L7.65463 16.0924C7.69714 15.8196 7.83569 15.5709 8.0453 15.3913C8.25491 15.2116 8.5218 15.1127 8.79788 15.1123H11.1783C15.8546 15.1123 19.5162 13.2129 20.5858 7.71836C20.6176 7.55587 20.645 7.3977 20.6688 7.24315C20.9866 5.2123 20.6667 3.82999 19.5682 2.5784",
                      fill: "#003087"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                      d: "M19.5675 2.57768C18.3585 1.19971 16.1731 0.608938 13.3774 0.608938H5.26339C4.98664 0.608789 4.71892 0.707424 4.50841 0.887085C4.2979 1.06675 4.15843 1.31564 4.11508 1.58898L0.738033 23.0176C0.722374 23.117 0.728452 23.2187 0.755848 23.3155C0.783244 23.4123 0.831307 23.5021 0.896726 23.5785C0.962144 23.655 1.04336 23.7164 1.13479 23.7585C1.22621 23.8005 1.32566 23.8223 1.4263 23.8222H6.43554L7.69363 15.8425L7.65463 16.0924C7.69714 15.8196 7.83569 15.5709 8.0453 15.3913C8.25491 15.2116 8.5218 15.1127 8.79788 15.1123H11.1783C15.8546 15.1123 19.5162 13.2129 20.5858 7.71836C20.6176 7.55587 20.645 7.3977 20.6688 7.24315C20.9866 5.2123 20.6667 3.82999 19.5682 2.5784",
                      fill: "#003087"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                      d: "M9.04492 7.26989C9.08288 7.03105 9.20471 6.81356 9.38856 6.65645C9.57241 6.49934 9.80623 6.41289 10.0481 6.41263H16.4093C17.1625 6.41263 17.8653 6.46174 18.5073 6.56429C18.8583 6.62076 19.2056 6.69843 19.5473 6.79684C19.9353 6.90593 20.3107 7.05552 20.6674 7.24317C20.9866 5.2116 20.666 3.83001 19.5675 2.5777C18.3578 1.20045 16.1731 0.60968 13.3775 0.60968H5.26271C4.98621 0.609877 4.71884 0.708664 4.50863 0.888294C4.29842 1.06792 4.15915 1.31663 4.11585 1.58972L0.737354 23.0162C0.721589 23.1156 0.727563 23.2173 0.754864 23.3141C0.782166 23.411 0.830145 23.5008 0.895497 23.5773C0.960848 23.6539 1.04202 23.7153 1.13341 23.7575C1.22481 23.7996 1.32425 23.8215 1.4249 23.8215H6.43486L7.69295 15.8411L9.04492 7.26989Z",
                      fill: "#003087"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                      d: "M20.6681 7.24249C20.6434 7.40138 20.6157 7.55981 20.5851 7.7177C19.5155 13.2115 15.8539 15.1117 11.1776 15.1117H8.79647C8.52043 15.1119 8.25356 15.2108 8.04404 15.3905C7.83451 15.5702 7.69615 15.8189 7.65394 16.0917L6.43485 23.8208L6.08819 26.0134C6.07441 26.1005 6.07966 26.1895 6.1036 26.2743C6.12753 26.3591 6.16958 26.4377 6.22683 26.5047C6.28408 26.5717 6.35519 26.6255 6.43524 26.6624C6.51529 26.6993 6.60238 26.7183 6.69051 26.7183H10.9133C11.413 26.7183 11.8377 26.3543 11.9164 25.861L11.9576 25.6458L12.7535 20.6019L12.804 20.3231C12.8419 20.0841 12.9638 19.8664 13.1478 19.7093C13.3318 19.5521 13.5659 19.4658 13.8079 19.4659H14.4398C18.5304 19.4659 21.7334 17.8048 22.6694 12.9978C23.0594 10.99 22.8572 9.31234 21.8244 8.13441C21.4965 7.76922 21.1046 7.46696 20.6681 7.24249Z",
                      fill: "#009CDE"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                      d: "M19.5479 6.79685C19.3846 6.74846 19.2164 6.70513 19.043 6.66685C18.8697 6.62857 18.6906 6.59463 18.5072 6.56574C17.8644 6.46102 17.1624 6.41191 16.4084 6.41191H10.0479C9.80583 6.41161 9.57161 6.49795 9.38762 6.65531C9.20364 6.81268 9.08203 7.03067 9.04478 7.26989L7.69281 15.8425L7.65381 16.0917C7.69602 15.8189 7.83438 15.5702 8.04391 15.3904C8.25343 15.2107 8.5203 15.1118 8.79634 15.1116H11.1775C15.8538 15.1116 19.5154 13.2122 20.585 7.71766C20.6167 7.55516 20.6435 7.39773 20.668 7.24245C20.3855 7.09465 20.0913 6.97049 19.7884 6.87123C19.7096 6.84523 19.6295 6.82068 19.5479 6.79613",
                      fill: "#012169"
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("span", {
                  children: "Paypal"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("li", {
                "data-tab-target": "#pi-stripe",
                className: 'pi-tab ' + (currentTab == 'stripe' ? 'pi-active' : ''),
                onClick: function onClick(e) {
                  return _this3.setActiveTab(e, 'stripe');
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("span", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("svg", {
                    width: 29,
                    height: 12,
                    viewBox: "0 0 29 12",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("path", {
                      d: "M2.0267 4.70227C2.0267 4.38985 2.28304 4.26969 2.70761 4.26969C3.31642 4.26969 4.08545 4.45394 4.69426 4.78238V2.89987C4.02937 2.63551 3.3725 2.53138 2.70761 2.53138C1.08144 2.53138 0 3.38051 0 4.7984C0 7.00935 3.04406 6.65688 3.04406 7.61015C3.04406 7.97864 2.72363 8.0988 2.27503 8.0988C1.61015 8.0988 0.761015 7.82644 0.0881175 7.45794V9.36449C0.833111 9.68491 1.58611 9.82109 2.27503 9.82109C3.94125 9.82109 5.08678 8.996 5.08678 7.56208C5.07877 5.1749 2.0267 5.59947 2.0267 4.70227ZM7.44192 0.929239L5.48732 1.34579L5.4793 7.76235C5.4793 8.94793 6.36849 9.82109 7.55407 9.82109C8.21095 9.82109 8.69159 9.70094 8.95594 9.55674V7.93057C8.6996 8.03471 7.43391 8.4032 7.43391 7.21762V4.37383H8.95594V2.66756H7.43391L7.44192 0.929239ZM11.4473 3.26035L11.3191 2.66756H9.58878V9.6769H11.5915V4.92657C12.0641 4.30975 12.8652 4.4219 13.1135 4.51001V2.66756C12.8571 2.57143 11.9199 2.39519 11.4473 3.26035ZM13.6021 2.66756H15.6128V9.6769H13.6021V2.66756ZM13.6021 2.05874L15.6128 1.62617V0L13.6021 0.424566V2.05874ZM19.7944 2.53138C19.0093 2.53138 18.5047 2.89987 18.2243 3.15621L18.1202 2.65955H16.3578V12L18.3605 11.5754L18.3685 9.30841C18.6569 9.51669 19.0814 9.81308 19.7864 9.81308C21.2203 9.81308 22.526 8.65955 22.526 6.12016C22.518 3.79706 21.1963 2.53138 19.7944 2.53138ZM19.3137 8.05073C18.8411 8.05073 18.5607 7.88251 18.3685 7.67423L18.3605 4.70227C18.5688 4.46996 18.8571 4.30975 19.3137 4.30975C20.0427 4.30975 20.5474 5.12684 20.5474 6.17624C20.5474 7.24967 20.0507 8.05073 19.3137 8.05073ZM28.8384 6.20027C28.8384 4.14953 27.8451 2.53138 25.9466 2.53138C24.0401 2.53138 22.8865 4.14953 22.8865 6.18425C22.8865 8.59546 24.2483 9.81308 26.2029 9.81308C27.1562 9.81308 27.8772 9.5968 28.4219 9.29239V7.69025C27.8772 7.96262 27.2523 8.13084 26.4593 8.13084C25.6822 8.13084 24.9933 7.85848 24.9052 6.91322H28.8224C28.8224 6.80908 28.8384 6.39252 28.8384 6.20027ZM24.8812 5.43925C24.8812 4.53405 25.4339 4.15754 25.9386 4.15754C26.4272 4.15754 26.9479 4.53405 26.9479 5.43925H24.8812Z",
                      fill: "#6772E5"
                    })
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("span", {
                  children: "Stripe"
                })]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)("div", {
            className: "pi-payment-tab-content",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("div", {
              id: "pi-bank",
              className: "pi-active",
              children: [currentTab == 'bank' && this.state.formModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)(_FormBank__WEBPACK_IMPORTED_MODULE_14__["default"], {
                handleSubmit: this.handleSubmit,
                modalType: this.state.formModalType,
                data: this.state.payment,
                close: this.closeForm
              }), currentTab == 'paypal' && this.state.formModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)(_FormPaypal__WEBPACK_IMPORTED_MODULE_15__["default"], {
                handleSubmit: this.handleSubmit,
                modalType: this.state.formModalType,
                data: this.state.payment,
                close: this.closeForm
              }), currentTab == 'stripe' && this.state.formModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)(_FormStripe__WEBPACK_IMPORTED_MODULE_16__["default"], {
                handleSubmit: this.handleSubmit,
                modalType: this.state.formModalType,
                data: this.state.payment,
                close: this.closeForm
              }), this.state.preloader ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)(block_preloader_table__WEBPACK_IMPORTED_MODULE_12__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("ul", {
                  children: [currentTab == 'bank' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)(_TableBank__WEBPACK_IMPORTED_MODULE_17__["default"], {
                    tableData: payments,
                    editEntry: this.openForm,
                    deleteEntry: this.deleteEntry
                  }), currentTab == 'paypal' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)(_TablePaypal__WEBPACK_IMPORTED_MODULE_18__["default"], {
                    tableData: payments,
                    editEntry: this.openForm,
                    deleteEntry: this.deleteEntry
                  }), currentTab == 'stripe' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsx)(_TableStripe__WEBPACK_IMPORTED_MODULE_19__["default"], {
                    tableData: payments,
                    editEntry: this.openForm,
                    deleteEntry: this.deleteEntry
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_22__.jsxs)("button", {
                  className: "pi-btn pi-bg-blue pi-bg-hover-blue",
                  onClick: function onClick() {
                    return _this3.openForm('new');
                  },
                  children: ["Add ", currentTabTitle, " Account"]
                })]
              })]
            })
          })]
        })
      });
    }
  }]);

  return Payment;
}(react__WEBPACK_IMPORTED_MODULE_8__.Component);

(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Payment, "contextType", context_app_context__WEBPACK_IMPORTED_MODULE_11__["default"]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/js/components/payment/style.scoped.scss":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/js/components/payment/style.scoped.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ndpi .pi-payment-tab-content {\n  margin-top: 20px;\n  border-radius: 8px;\n}\n\n@media screen and (max-width: 992px) {\n  .ndpi .pi-payment-tab-content {\n    width: 100%;\n  }\n}\n.ndpi .pi-payment-tab-content .pi-title-content h2 {\n  font-size: 20px;\n}\n\n.ndpi .pi-payment-tab-content .pi-title-content h5 {\n  font-size: 14px;\n  font-weight: 500;\n  margin-top: 5px;\n  margin-bottom: 0;\n  color: #2D3748;\n}\n\n.ndpi .pi-payment-tab-content .pi-btn {\n  display: block;\n  margin: auto;\n  margin-top: 20px;\n  padding: 12px 15px;\n  font-weight: 500;\n}\n\n.ndpi .pi-payment-tab-content ul {\n  margin: 0;\n}\n\n.ndpi .pi-payment-tab-content ul li {\n  display: flex;\n  padding: 15px;\n  position: relative;\n  border-radius: 10px;\n  margin-bottom: 10px;\n}\n\n.ndpi .pi-payment-tab-content ul li .pi-edit {\n  right: 0px;\n  position: absolute;\n  background: #fff;\n  top: 0;\n  border-radius: 25px;\n  box-shadow: 3px 3px 4px 0px rgba(205, 202, 205, 0.12);\n  height: 22px;\n}\n\n.ndpi .pi-payment-tab-content ul li .pi-edit span {\n  background: #fff;\n  padding: 4px 6px;\n  border-radius: 50%;\n  cursor: pointer;\n}\n\n.ndpi .pi-payment-tab-content ul li .pi-edit span:hover {\n  box-shadow: 3px 3px 4px 3px rgba(205, 202, 205, 0.18);\n}\n\n.ndpi .pi-payment-tab-content ul li .pi-edit span:hover svg path {\n  fill: var(--pi-bg-color-blue);\n}\n\n.ndpi .pi-payment-tab-content ul li .pi-item-content {\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n}\n\n.ndpi .pi-payment-tab-content ul li .pi-item-content .pi-text-content {\n  align-self: center;\n}\n\n.ndpi .pi-payment-tab-content ul li .pi-item-content span {\n  margin-right: 20px;\n  display: flex;\n  padding: 15px 13px;\n  background: #EDF2F7;\n  border-radius: 8px;\n  align-self: center;\n}\n\n.ndpi .pi-payment-tab-content ul li .pi-item-content h2 {\n  line-height: 100%;\n}\n\n.ndpi .pi-payment-tab-content ul li .pi-item-content p {\n  margin: 0;\n  color: #718096;\n  margin-top: 10px;\n}\n\n.ndpi .pi-payment-tab-content ul .pi-btn {\n  display: flex;\n  margin: auto;\n  margin-top: 30px;\n}\n\n.ndpi .pi-payment-tab-content ul .pi-btn svg {\n  margin-top: 2px;\n  margin-right: 5px;\n}\n\n.ndpi .pi-payment-tab-content ul .pi-btn svg path {\n  margin-top: 2px;\n  margin-right: 5px;\n  fill: var(--pi-text-color-white);\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/react-content-loader/dist/react-content-loader.es.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-content-loader/dist/react-content-loader.es.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/js/components/payment/style.scoped.scss":
/*!*****************************************************!*\
  !*** ./src/js/components/payment/style.scoped.scss ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_style_scoped_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./style.scoped.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/js/components/payment/style.scoped.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_style_scoped_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_style_scoped_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);