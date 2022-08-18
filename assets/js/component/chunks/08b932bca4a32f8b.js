"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_js_components_list-single_tab_note_index_js"],{

/***/ "./src/js/api/taxonomy.js":
/*!********************************!*\
  !*** ./src/js/api/taxonomy.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/js/api/helper.js");


var url = _helper__WEBPACK_IMPORTED_MODULE_1__.apiUrl + 'taxonomies';

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

/***/ "./src/js/blocks/action/row/index.js":
/*!*******************************************!*\
  !*** ./src/js/blocks/action/row/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var block_outside_click__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/outside-click */ "./src/js/blocks/outside-click/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var Action = function Action(props) {
  var dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      dropdown = _useState2[0],
      setDropdown = _useState2[1];

  var close = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    return setDropdown(false);
  }, []);
  (0,block_outside_click__WEBPACK_IMPORTED_MODULE_2__["default"])(dropdownRef, close);

  var showDropdown = function showDropdown() {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  var row = props.row;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
      className: dropdown ? 'pi-active' : '',
      onClick: function onClick() {
        return showDropdown();
      },
      style: {
        padding: '0 5px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("svg", {
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12Z",
          fill: "#718096"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z",
          fill: "#718096"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z",
          fill: "#718096"
        })]
      })
    }), dropdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "pi-dropdown-content pi-show",
      ref: dropdownRef,
      children: [props.handleOverview && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        onClick: function onClick() {
          setDropdown(false);
          props.handleOverview(row.id);
        },
        children: "Overview"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        onClick: function onClick() {
          setDropdown(false);
          props.editEntry('edit', row);
        },
        children: "Edit"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        onClick: function onClick() {
          setDropdown(false);
          props.deleteEntry('single', row.id);
        },
        children: "Delete"
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Action);

/***/ }),

/***/ "./src/js/blocks/pagination/index.js":
/*!*******************************************!*\
  !*** ./src/js/blocks/pagination/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-paginate */ "./node_modules/react-paginate/dist/react-paginate.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_paginate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var Pagination = function Pagination(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)((react_paginate__WEBPACK_IMPORTED_MODULE_0___default()), {
    previousClassName: "pi-previous",
    nextClassName: "pi-next",
    disabledClassName: "pi-disabled",
    previousLabel: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
      width: 9,
      height: 14,
      viewBox: "0 0 9 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
        d: "M7.5 12.833L1.667 7 7.5 1.167",
        stroke: "#E2E8F0",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })
    }),
    nextLabel: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
      width: 9,
      height: 14,
      viewBox: "0 0 9 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
        d: "M1.5 12.833L7.333 7 1.5 1.167",
        stroke: "#4C6FFF",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })
    }),
    breakLabel: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
      width: 15,
      height: 15,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7 12a2 2 0 10-4 0 2 2 0 004 0zM14 12a2 2 0 10-4 0 2 2 0 004 0zM21 12a2 2 0 10-4 0 2 2 0 004 0z",
        fill: "#718096"
      })
    }),
    breakClassName: "break",
    forcePage: props.forcePage,
    pageCount: props.pageCount,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 5,
    onPageChange: props.onPageChange,
    containerClassName: "pi-pagination",
    activeClassName: "pi-active"
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);

/***/ }),

/***/ "./src/js/components/list-single/tab/note/Form.js":
/*!********************************************************!*\
  !*** ./src/js/components/list-single/tab/note/Form.js ***!
  \********************************************************/
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

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      _this.props.handleSubmit(_this.state.form, 'new');

      _this.setState({
        form: _this.initialState
      });
    });

    _this.initialState = {
      id: null,
      tab_id: _this.props.tab_id,
      text: '',
      desc: '',
      priority: '',
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
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("form", {
        onSubmit: this.handleSubmit,
        className: "",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "pi-tab-buttons-group pi-text-right",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "pi-activity-field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
              id: "field-text",
              type: "text",
              required: true,
              name: "text",
              value: this.state.form.text,
              placeholder: "Write your note",
              onChange: this.handleChange
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
            className: "pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow",
            children: "Save"
          })]
        })
      });
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);

/***/ }),

/***/ "./src/js/components/list-single/tab/note/FormEdit.js":
/*!************************************************************!*\
  !*** ./src/js/components/list-single/tab/note/FormEdit.js ***!
  \************************************************************/
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
/* harmony import */ var react_country_region_selector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-country-region-selector */ "./node_modules/react-country-region-selector/dist/rcrs.es.js");
/* harmony import */ var api_taxonomy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! api/taxonomy */ "./src/js/api/taxonomy.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









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

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "editData", function () {
      //condition added to stop multiple rendering 
      if (_this.props.modalType == 'edit') {
        if (_this.state.form.id != _this.props.data.id) {
          _this.setState({
            form: _this.props.data
          });
        }
        /* if ( JSON.stringify(this.state.form) != JSON.stringify(this.props.data) ) {
            this.setState({ form: this.props.data }); 
        } */

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

      var form = _objectSpread({}, _this.state.form);

      _this.props.handleSubmit(form);

      _this.setState({
        form: _this.initialState
      });
    });

    _this.initialState = {
      id: null,
      tab_id: _this.props.tab_id,
      text: ''
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
              children: [this.props.modalType == 'new' ? 'New' : 'Edit', " Note"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              children: "Add new note from here"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("form", {
            onSubmit: this.handleSubmit,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "pi-form-style-one",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "col",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "form-text",
                      children: "Note"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("textarea", {
                      id: "form-text",
                      required: true,
                      name: "text",
                      value: form.text,
                      onChange: this.handleChange
                    })]
                  })
                })
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

/***/ "./src/js/components/list-single/tab/note/Table.js":
/*!*********************************************************!*\
  !*** ./src/js/components/list-single/tab/note/Table.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-moment */ "./node_modules/react-moment/dist/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var block_action_row__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/action/row */ "./src/js/blocks/action/row/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








var TableBody = function TableBody(props) {
  var rows = props.tableData.map(function (row, index) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "pi-note",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(block_action_row__WEBPACK_IMPORTED_MODULE_2__["default"], {
        row: row,
        editEntry: props.editEntry,
        deleteEntry: props.deleteEntry
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "pi-avater",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
          src: ncpi.assetImgUri + 'avatar.png',
          alt: "avatar"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "pi-note-text",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("h4", {
          children: ["Nabil Ahmed ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            children: "10 min ago"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          children: row.text
        })]
      })]
    }, index);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "pi-note-content",
    children: rows
  });
};

var Table = function Table(props) {
  var tableData = props.tableData,
      editEntry = props.editEntry,
      checkedBoxes = props.checkedBoxes,
      deleteEntry = props.deleteEntry;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: tableData.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TableBody, {
      tableData: tableData,
      editEntry: editEntry,
      checkedBoxes: checkedBoxes,
      deleteEntry: deleteEntry
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ "./src/js/components/list-single/tab/note/index.js":
/*!*********************************************************!*\
  !*** ./src/js/components/list-single/tab/note/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var block_preloader_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! block/preloader/table */ "./src/js/blocks/preloader/table/index.js");
/* harmony import */ var block_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/pagination */ "./src/js/blocks/pagination/index.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Form */ "./src/js/components/list-single/tab/note/Form.js");
/* harmony import */ var _FormEdit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FormEdit */ "./src/js/components/list-single/tab/note/FormEdit.js");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Table */ "./src/js/components/list-single/tab/note/Table.js");
/* harmony import */ var hoc_Crud__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! hoc/Crud */ "./src/js/hoc/Crud.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






 // import Search from './Search';
// import Empty from 'block/empty';





var Note = function Note(props) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    props.getLists();
  }, []);
  var _props$state = props.state,
      lists = _props$state.lists,
      checkedBoxes = _props$state.checkedBoxes,
      searchVal = _props$state.searchVal;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: "",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Form__WEBPACK_IMPORTED_MODULE_3__["default"], {
      handleSubmit: props.handleSubmit,
      tab_id: props.tab_id
    }), props.state.formModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_FormEdit__WEBPACK_IMPORTED_MODULE_4__["default"], {
      tab_id: props.tab_id,
      handleSubmit: props.handleSubmit,
      modalType: props.state.formModalType,
      data: props.state.list,
      close: props.closeForm
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h3", {
      className: "pi-title-small",
      children: "My Note"
    }), props.state.preloader ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(block_preloader_table__WEBPACK_IMPORTED_MODULE_1__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_5__["default"], {
      tableData: lists,
      searchVal: searchVal,
      editEntry: props.openForm,
      checkedBoxes: {
        data: checkedBoxes,
        handle: props.handleCheckbox
      },
      deleteEntry: props.deleteEntry
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "pi-pagination-content-two",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "pi-pagination-content",
        children: props.state.totalPage > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(block_pagination__WEBPACK_IMPORTED_MODULE_2__["default"], {
          forcePage: props.state.currentPage - 1,
          pageCount: props.state.totalPage,
          onPageChange: props.handlePageClick
        })
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Crud__WEBPACK_IMPORTED_MODULE_6__["default"])(Note, 'note'));

/***/ }),

/***/ "./src/js/hoc/Crud.js":
/*!****************************!*\
  !*** ./src/js/hoc/Crud.js ***!
  \****************************/
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
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var context_app_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! context/app-context */ "./src/js/context/app-context.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var api_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! api/helper */ "./src/js/api/helper.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }








var HOC = function HOC(Inner, mod) {
  var modPlural = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  // console.log("data", module);
  if (!modPlural) {
    modPlural = mod + 's';
  }

  var url = api_helper__WEBPACK_IMPORTED_MODULE_12__.apiUrl + modPlural;

  var Crud = /*#__PURE__*/function (_Component) {
    (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Crud, _Component);

    var _super = _createSuper(Crud);

    function Crud(props) {
      var _this;

      (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Crud);

      _this = _super.call(this, props);

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "getLists", function () {
        var searchArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        // this.setState({ preloader: true });
        var args = {
          page: _this.state.currentPage,
          per_page: _this.state.perPage
        }; //this is for task tab

        if (_this.props.tab_id) {
          args.tab_id = _this.props.tab_id;
        } //this is for task tab


        if (_this.props.dashboard) {
          args.dashboard = _this.props.dashboard;
        } //this is for task tab


        if (_this.props.module_id) {
          args.module_id = _this.props.module_id;
        }

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
        var promise = axios__WEBPACK_IMPORTED_MODULE_11___default().get("".concat(url, "/?").concat(params));
        var dataPromise = promise.then(function (resp) {
          var result = resp.data.data.result;
          var total = resp.data.data.total;
          var empty = result.length ? false : true;

          _this.setState({
            lists: result,
            preloader: false,
            empty: empty,
            total: total,
            totalPage: Math.ceil(total / _this.state.perPage)
          });
        });
        return promise;
      });

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handleSearch", function (e) {
        var value = e.target.value;

        _this.setState({
          searchVal: value
        }, function () {
          // if (this.state.searchVal.length < 3) return;
          //search when typing stop
          if (_this.timeout) clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function () {
            _this.getLists({
              s: _this.state.searchVal
            });
          }, 300);
        });
      });

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "showItem", function (e) {
        var value = e.target.value;

        _this.setState({
          perPage: value
        }, function () {
          _this.getLists();
        });
      });

      (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handleSubmit", function (list) {
        var newType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        //newType for task, note tab
        var type = _this.state.formModalType;

        if (newType) {
          type = newType;
        }

        if (type == 'new') {
          axios__WEBPACK_IMPORTED_MODULE_11___default().post(url, list, api_helper__WEBPACK_IMPORTED_MODULE_12__.token).then(function (resp) {
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
          axios__WEBPACK_IMPORTED_MODULE_11___default().put("".concat(url, "/").concat(list.id), list, api_helper__WEBPACK_IMPORTED_MODULE_12__.token).then(function (resp) {
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
        var module = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        if (confirm(_this.context.CrudMsg.confirm)) {
          //TODO: instant delete do it later

          /* if (type == 'single' && module != 'task' ) {
              this.setState({
                  lists: this.state.lists.filter((list, i) => {
                      return list.id !== index;
                  })
              });
          } */
          var ids = type == 'single' ? index : _this.state.checkedBoxes.toString();
          axios__WEBPACK_IMPORTED_MODULE_11___default()["delete"]("".concat(url, "/").concat(ids), api_helper__WEBPACK_IMPORTED_MODULE_12__.token).then(function (resp) {
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
        var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (type == 'new') {
          _this.setState({
            formModal: true,
            formModalType: 'new'
          });
        } else {
          //for project form
          if (list.hasOwnProperty('start_date') && list.start_date) {
            list.start_date = new Date(list.start_date);
          }

          if (list.hasOwnProperty('due_date') && list.due_date) {
            list.due_date = new Date(list.due_date);
          }

          _this.setState({
            formModal: true,
            formModalType: 'edit',
            list: list
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

            _this.state.lists.map(function (row) {
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
        title: mod.charAt(0).toUpperCase() + mod.slice(1),
        //capitalize
        empty: false,
        preloader: true,
        formModal: false,
        searchModal: false,
        formModalType: 'new',
        list: {
          id: null
        },
        lists: [],
        checkedBoxes: [],
        offset: 0,
        perPage: 10,
        total: 1,
        totalPage: 1,
        currentPage: 1,
        searchVal: ''
      };
      _this.timeout = 0;
      return _this;
    } // static contextType = AppContext;


    (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Crud, [{
      key: "componentDidMount",
      value: function componentDidMount() {// this.getLists();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Inner, _objectSpread(_objectSpread({}, this.props), {}, {
          state: this.state,
          openForm: this.openForm,
          closeForm: this.closeForm,
          showItem: this.showItem,
          getLists: this.getLists,
          handleCheckbox: this.handleCheckbox,
          uncheckAll: function uncheckAll() {
            return _this2.setState({
              checkedBoxes: []
            });
          },
          handleSubmit: this.handleSubmit,
          handleSearch: this.handleSearch,
          handlePageClick: this.handlePageClick,
          deleteEntry: this.deleteEntry
        }));
      }
    }]);

    return Crud;
  }(react__WEBPACK_IMPORTED_MODULE_8__.Component);

  Crud.contextType = context_app_context__WEBPACK_IMPORTED_MODULE_10__["default"];
  return Crud;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HOC);

/***/ })

}]);