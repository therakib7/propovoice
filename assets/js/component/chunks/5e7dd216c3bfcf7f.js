"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_js_components_list-single_tab_file_index_js"],{

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

/***/ "./src/js/components/list-single/tab/file/FormDrive.js":
/*!*************************************************************!*\
  !*** ./src/js/components/list-single/tab/file/FormDrive.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_google_drive_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-google-drive-picker */ "./node_modules/react-google-drive-picker/dist/index.js");
/* harmony import */ var react_google_drive_picker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_google_drive_picker__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






function App() {
  var _useDrivePicker = react_google_drive_picker__WEBPACK_IMPORTED_MODULE_2___default()(),
      _useDrivePicker2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useDrivePicker, 2),
      openPicker = _useDrivePicker2[0],
      authResponse = _useDrivePicker2[1]; // const customViewsArray = [new google.picker.DocsView()]; // custom view


  var handleOpenPicker = function handleOpenPicker() {
    openPicker({
      clientId: "360087475802-7mg8et7lg5rfm4njqea5t8243ksmlh69.apps.googleusercontent.com",
      developerKey: "AIzaSyD5mPs_ifRKqVXdpEu4xu0FFDuSNEmt6Ws",
      viewId: "DOCS",
      // token: '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',
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: function callbackFunction(data) {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button');
        }

        console.log(data);
      }
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
      onClick: function onClick() {
        return handleOpenPicker();
      },
      children: "Open Picker"
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/js/components/list-single/tab/file/FormFile.js":
/*!************************************************************!*\
  !*** ./src/js/components/list-single/tab/file/FormFile.js ***!
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
/* harmony import */ var block_field_upload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! block/field/upload */ "./src/js/blocks/field/upload/index.js");
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
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      var form = _objectSpread({}, _this.state.form);

      _this.props.handleSubmit(form);

      _this.setState({
        form: _this.initialState
      });

      _this.props.close();
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleUploadChange", function (data) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var form = _objectSpread({}, _this.state.form);

      form.file = data;

      _this.setState({
        form: form
      });
    });

    _this.initialState = {
      id: null,
      tab_id: _this.props.tab_id,
      type: 'file',
      title: '',
      file: ''
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

      var form = this.state.form;
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
              children: [this.props.modalType == 'new' ? 'New' : 'Edit', " File"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
              children: "Add new file from here"
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
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "title",
                      children: "Title"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "title",
                      type: "text",
                      name: "title",
                      value: form.title,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "file_id",
                      children: "File"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(block_field_upload__WEBPACK_IMPORTED_MODULE_8__["default"], {
                      data: form.file,
                      changeHandler: this.handleUploadChange
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

/***/ "./src/js/components/list-single/tab/file/FormLink.js":
/*!************************************************************!*\
  !*** ./src/js/components/list-single/tab/file/FormLink.js ***!
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
      type: 'link',
      title: '',
      url: ''
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
              children: [this.props.modalType == 'new' ? 'New' : 'Edit', " Link"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("p", {
              children: "Add new link from here"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("form", {
            onSubmit: this.handleSubmit,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "title",
                      children: "Title"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                      id: "title",
                      type: "text",
                      name: "title",
                      value: form.title,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "url",
                      children: "URL"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
                      id: "url",
                      type: "url",
                      name: "url",
                      required: true,
                      value: form.url,
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

/***/ "./src/js/components/list-single/tab/file/Table.js":
/*!*********************************************************!*\
  !*** ./src/js/components/list-single/tab/file/Table.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-moment */ "./node_modules/react-moment/dist/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








var TableHeader = function TableHeader(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("thead", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("th", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
          type: "checkbox",
          onChange: function onChange(e) {
            return props.checkedBoxes.handle(e, 'all');
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("th", {
        children: "File Name & Description"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("th", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("svg", {
          width: 16,
          height: 16,
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
            d: "M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z",
            stroke: "#718096",
            strokeMiterlimit: 10
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
            d: "M1.9375 13.5001C2.55184 12.4358 3.43552 11.552 4.49972 10.9375C5.56392 10.323 6.77113 9.99951 8 9.99951C9.22887 9.99951 10.4361 10.323 11.5003 10.9375C12.5645 11.552 13.4482 12.4358 14.0625 13.5001",
            stroke: "#718096",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })]
        }), "Uploaded by"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("th", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("svg", {
          width: 12,
          height: 12,
          viewBox: "0 0 12 12",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
            d: "M6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5Z",
            stroke: "#718096",
            strokeMiterlimit: 10
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
            d: "M6 3.375V6H8.625",
            stroke: "#718096",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })]
        }), "Time"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("th", {
        children: "Action"
      })]
    })
  });
};

var TableBody = function TableBody(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      dropdown = _useState2[0],
      setDropdown = _useState2[1];

  var showDropdown = function showDropdown(id) {
    if (dropdown == id) {
      setDropdown(null);
    } else {
      setDropdown(id);
    }
  };

  var rows = props.tableData.map(function (row, index) {
    var data = props.checkedBoxes.data;
    var checkedCheckbox = data.indexOf(row.id) !== -1 ? true : false;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
          type: "checkbox",
          value: row.id,
          checked: checkedCheckbox,
          onChange: function onChange(e) {
            return props.checkedBoxes.handle(e, 'single', row.id);
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        children: [row.file && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
          src: row.file.src,
          alt: "file",
          width: "40"
        }), !row.file && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
          src: ncpi.assetImgUri + 'file.png',
          alt: "file"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
            target: "_blank",
            href: row.url,
            children: row.title
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "pi-avater",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
            src: ncpi.assetImgUri + 'avatar.png',
            alt: "avatar"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
        children: row.date
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
        className: "pi-action",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "pi-action-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
            className: row.id == dropdown ? 'pi-active' : '',
            onClick: function onClick() {
              return showDropdown(row.id);
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
          }), row.id == dropdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "pi-dropdown-content pi-show" // ref={popover}
            ,
            children: [row.type == 'link' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
              onClick: function onClick() {
                return props.editEntry('edit', row);
              },
              children: "Edit"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
              onClick: function onClick() {
                return props.deleteEntry('single', row.id);
              },
              children: "Delete"
            })]
          })]
        })
      })]
    }, index);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("tbody", {
    children: rows
  });
};

var Table = function Table(props) {
  var tableData = props.tableData,
      editEntry = props.editEntry,
      checkedBoxes = props.checkedBoxes,
      deleteEntry = props.deleteEntry;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: tableData.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "pi-table-wrap",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("table", {
        className: "pi-table pi-table-three",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TableHeader, {
          checkedBoxes: checkedBoxes
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TableBody, {
          tableData: tableData,
          editEntry: editEntry,
          checkedBoxes: checkedBoxes,
          deleteEntry: deleteEntry
        })]
      })
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ "./src/js/components/list-single/tab/file/index.js":
/*!*********************************************************!*\
  !*** ./src/js/components/list-single/tab/file/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var block_preloader_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/preloader/table */ "./src/js/blocks/preloader/table/index.js");
/* harmony import */ var _FormDrive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormDrive */ "./src/js/components/list-single/tab/file/FormDrive.js");
/* harmony import */ var _FormFile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FormFile */ "./src/js/components/list-single/tab/file/FormFile.js");
/* harmony import */ var _FormLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormLink */ "./src/js/components/list-single/tab/file/FormLink.js");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Table */ "./src/js/components/list-single/tab/file/Table.js");
/* harmony import */ var hoc_Crud__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! hoc/Crud */ "./src/js/hoc/Crud.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







 // import Search from './Search';
// import Empty from 'block/empty';






var File = function File(props) {
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    props.getLists();
  }, []);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      fileModal = _useState2[0],
      setFileModal = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      driveModal = _useState4[0],
      setDriveModal = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('all'),
      _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
      activeTab = _useState6[0],
      setActiveTab = _useState6[1];

  var _props$state = props.state,
      lists = _props$state.lists,
      checkedBoxes = _props$state.checkedBoxes,
      searchVal = _props$state.searchVal;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "pi-small-button-group pi-small-button-group-two",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-sm-5",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h3", {
            className: "pi-title-small",
            children: "My Files"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
            className: 'pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow ' + (activeTab == 'all' ? 'pi-active' : ''),
            onClick: function onClick() {
              setActiveTab('all');
              props.getLists();
            },
            children: "All"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
            className: 'pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow ' + (activeTab == 'file' ? 'pi-active' : ''),
            onClick: function onClick() {
              setActiveTab('file');
              props.getLists({
                type: 'file'
              });
            },
            children: "File"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
            className: 'pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow ' + (activeTab == 'link' ? 'pi-active' : ''),
            onClick: function onClick() {
              setActiveTab('link');
              props.getLists({
                type: 'link'
              });
            },
            children: "Link"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "col-sm-7",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "pi-buttons-right pi-text-right",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("button", {
              className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-shadow pi-bg-hover-shadow",
              onClick: function onClick() {
                return setDriveModal(true);
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("svg", {
                width: 17,
                height: 14,
                viewBox: "0 0 17 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  d: "M5.875 5.125L8.5 2.5L11.125 5.125",
                  stroke: "#718096",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  d: "M8.5 9.5V2.5",
                  stroke: "#718096",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  d: "M14 9.5V13C14 13.1326 13.9473 13.2598 13.8536 13.3536C13.7598 13.4473 13.6326 13.5 13.5 13.5H3.5C3.36739 13.5 3.24021 13.4473 3.14645 13.3536C3.05268 13.2598 3 13.1326 3 13V9.5",
                  stroke: "#718096",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              }), "Upload Drive"]
            }),  false && /*#__PURE__*/0, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("button", {
              className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-shadow pi-bg-hover-shadow",
              onClick: function onClick() {
                return props.openForm('new');
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("svg", {
                width: 12,
                height: 12,
                viewBox: "0 0 12 12",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "M7.97636 1.90264C8.11473 1.75937 8.28025 1.6451 8.46326 1.56648C8.64626 1.48787 8.84309 1.44649 9.04226 1.44476C9.24143 1.44303 9.43895 1.48098 9.62329 1.5564C9.80764 1.63182 9.97512 1.7432 10.116 1.88404C10.2568 2.02488 10.3682 2.19236 10.4436 2.3767C10.519 2.56105 10.557 2.75857 10.5552 2.95774C10.5535 3.15691 10.5121 3.35374 10.4335 3.53674C10.3549 3.71975 10.2406 3.88527 10.0974 4.02364L7.84736 6.27364C7.56607 6.55484 7.18461 6.71282 6.78686 6.71282C6.38912 6.71282 6.00766 6.55484 5.72636 6.27364C5.58491 6.13702 5.39546 6.06142 5.19881 6.06313C5.00217 6.06484 4.81406 6.14372 4.675 6.28277C4.53594 6.42183 4.45707 6.60994 4.45536 6.80658C4.45365 7.00323 4.52925 7.19268 4.66586 7.33414C5.22845 7.89655 5.99137 8.21249 6.78686 8.21249C7.58236 8.21249 8.34528 7.89655 8.90786 7.33414L11.1579 5.08414C11.7043 4.51833 12.0067 3.76052 11.9999 2.97393C11.9931 2.18734 11.6775 1.4349 11.1213 0.87868C10.5651 0.322456 9.81266 0.00694867 9.02607 0.000113408C8.23948 -0.00672185 7.48167 0.295661 6.91586 0.842135L5.79086 1.96714C5.71923 2.03632 5.6621 2.11908 5.62279 2.21058C5.58348 2.30209 5.56279 2.4005 5.56193 2.50008C5.56106 2.59967 5.58004 2.69843 5.61775 2.7906C5.65546 2.88277 5.71115 2.96651 5.78157 3.03693C5.85199 3.10735 5.93573 3.16304 6.0279 3.20075C6.12007 3.23846 6.21883 3.25744 6.31841 3.25657C6.418 3.25571 6.51641 3.23502 6.60792 3.19571C6.69942 3.15641 6.78218 3.09927 6.85136 3.02764L7.97636 1.90264ZM4.22636 5.65264C4.50766 5.37143 4.88912 5.21346 5.28686 5.21346C5.68461 5.21346 6.06607 5.37143 6.34736 5.65264C6.41655 5.72427 6.49931 5.7814 6.59081 5.82071C6.68231 5.86002 6.78073 5.88071 6.88031 5.88157C6.9799 5.88244 7.07866 5.86346 7.17083 5.82575C7.263 5.78804 7.34674 5.73235 7.41716 5.66193C7.48758 5.59151 7.54327 5.50777 7.58098 5.4156C7.61869 5.32343 7.63767 5.22467 7.6368 5.12508C7.63594 5.0255 7.61525 4.92709 7.57594 4.83558C7.53663 4.74408 7.4795 4.66132 7.40786 4.59214C6.84528 4.02972 6.08236 3.71378 5.28686 3.71378C4.49137 3.71378 3.72845 4.02972 3.16586 4.59214L0.915865 6.84214C0.629334 7.11888 0.400787 7.44991 0.24356 7.81592C0.0863335 8.18193 0.00357472 8.57559 0.00011327 8.97393C-0.00334818 9.37227 0.0725569 9.76731 0.2234 10.136C0.374242 10.5047 0.597002 10.8396 0.87868 11.1213C1.16036 11.403 1.49531 11.6258 1.864 11.7766C2.23269 11.9274 2.62773 12.0033 3.02607 11.9999C3.42441 11.9964 3.81807 11.9137 4.18408 11.7564C4.55009 11.5992 4.88112 11.3707 5.15786 11.0841L6.28286 9.95914C6.3545 9.88995 6.41163 9.80719 6.45094 9.71569C6.49025 9.62419 6.51094 9.52577 6.5118 9.42619C6.51267 9.3266 6.49369 9.22784 6.45598 9.13567C6.41827 9.0435 6.36258 8.95976 6.29216 8.88934C6.22174 8.81892 6.138 8.76323 6.04583 8.72552C5.95366 8.68781 5.8549 8.66883 5.75531 8.6697C5.65573 8.67056 5.55731 8.69125 5.46581 8.73056C5.37431 8.76987 5.29155 8.827 5.22236 8.89864L4.09736 10.0236C3.95899 10.1669 3.79348 10.2812 3.61047 10.3598C3.42747 10.4384 3.23064 10.4798 3.03147 10.4815C2.8323 10.4832 2.63478 10.4453 2.45043 10.3699C2.26609 10.2944 2.09861 10.1831 1.95777 10.0422C1.81693 9.90139 1.70555 9.73391 1.63013 9.54957C1.55471 9.36522 1.51676 9.1677 1.51849 8.96853C1.52022 8.76936 1.5616 8.57254 1.64021 8.38953C1.71883 8.20652 1.8331 8.04101 1.97636 7.90264L4.22636 5.65264Z",
                  fill: "#718096"
                })
              }), "Add File Link"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "pi-buttons-group pi-mb-20",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                className: "pi-btn pi-btn-icon pi-bg-hover-shadow pi-mr-5",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("svg", {
                  width: 16,
                  height: 16,
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                    d: "M12.9999 9H2.99988C2.72374 9 2.49988 9.22386 2.49988 9.5V12C2.49988 12.2761 2.72374 12.5 2.99988 12.5H12.9999C13.276 12.5 13.4999 12.2761 13.4999 12V9.5C13.4999 9.22386 13.276 9 12.9999 9Z",
                    stroke: "#718096",
                    strokeWidth: "0.8",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                    d: "M12.9999 3.5H2.99988C2.72374 3.5 2.49988 3.72386 2.49988 4V6.5C2.49988 6.77614 2.72374 7 2.99988 7H12.9999C13.276 7 13.4999 6.77614 13.4999 6.5V4C13.4999 3.72386 13.276 3.5 12.9999 3.5Z",
                    stroke: "#718096",
                    strokeWidth: "0.8",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
                className: "pi-btn pi-btn-icon pi-bg-hover-shadow",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("svg", {
                  width: 16,
                  height: 16,
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                    d: "M7 3H3V7H7V3Z",
                    stroke: "#718096",
                    strokeWidth: "0.8",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                    d: "M13 3H9V7H13V3Z",
                    stroke: "#718096",
                    strokeWidth: "0.8",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                    d: "M7 9H3V13H7V9Z",
                    stroke: "#718096",
                    strokeWidth: "0.8",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                    d: "M13 9H9V13H13V9Z",
                    stroke: "#718096",
                    strokeWidth: "0.8",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })]
                })
              })]
            })]
          })
        })]
      })
    }), driveModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_FormDrive__WEBPACK_IMPORTED_MODULE_3__["default"], {
      tab_id: props.tab_id,
      handleSubmit: props.handleSubmit,
      modalType: 'new',
      data: props.state.list,
      close: function close() {
        return setDriveModal(false);
      }
    }), fileModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_FormFile__WEBPACK_IMPORTED_MODULE_4__["default"], {
      tab_id: props.tab_id,
      handleSubmit: props.handleSubmit,
      modalType: 'new',
      data: props.state.list,
      close: function close() {
        return setFileModal(false);
      }
    }), props.state.formModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_FormLink__WEBPACK_IMPORTED_MODULE_5__["default"], {
      tab_id: props.tab_id,
      handleSubmit: props.handleSubmit,
      modalType: props.state.formModalType,
      data: props.state.list,
      close: props.closeForm
    }), props.state.preloader ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(block_preloader_table__WEBPACK_IMPORTED_MODULE_2__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_6__["default"], {
      tableData: lists,
      searchVal: searchVal,
      editEntry: props.openForm,
      checkedBoxes: {
        data: checkedBoxes,
        handle: props.handleCheckbox
      },
      deleteEntry: props.deleteEntry
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Crud__WEBPACK_IMPORTED_MODULE_7__["default"])(File, 'file'));

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

/***/ }),

/***/ "./node_modules/react-google-drive-picker/dist/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-google-drive-picker/dist/index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var typeDefs_1 = __webpack_require__(/*! ./typeDefs */ "./node_modules/react-google-drive-picker/dist/typeDefs.js");
var useInjectScript_1 = __importDefault(__webpack_require__(/*! ./useInjectScript */ "./node_modules/react-google-drive-picker/dist/useInjectScript.js"));
function useDrivePicker() {
    var defaultScopes = ['https://www.googleapis.com/auth/drive.readonly'];
    var _a = (0, useInjectScript_1.default)('https://apis.google.com/js/api.js'), loaded = _a[0], error = _a[1];
    var _b = (0, useInjectScript_1.default)('https://accounts.google.com/gsi/client'), loadedGsi = _b[0], errorGsi = _b[1];
    var _c = (0, react_1.useState)(false), pickerApiLoaded = _c[0], setpickerApiLoaded = _c[1];
    var _d = (0, react_1.useState)(false), openAfterAuth = _d[0], setOpenAfterAuth = _d[1];
    var _e = (0, react_1.useState)(false), authWindowVisible = _e[0], setAuthWindowVisible = _e[1];
    var _f = (0, react_1.useState)(typeDefs_1.defaultConfiguration), config = _f[0], setConfig = _f[1];
    var _g = (0, react_1.useState)(), authRes = _g[0], setAuthRes = _g[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var picker;
    // get the apis from googleapis
    (0, react_1.useEffect)(function () {
        if (loaded && !error && loadedGsi && !errorGsi && !pickerApiLoaded) {
            loadApis();
        }
    }, [loaded, error, loadedGsi, errorGsi, pickerApiLoaded]);
    // use effect to open picker after auth
    (0, react_1.useEffect)(function () {
        if (openAfterAuth &&
            config.token &&
            loaded &&
            !error &&
            loadedGsi &&
            !errorGsi &&
            pickerApiLoaded) {
            createPicker(config);
            setOpenAfterAuth(false);
        }
    }, [
        openAfterAuth,
        config.token,
        loaded,
        error,
        loadedGsi,
        errorGsi,
        pickerApiLoaded,
    ]);
    // open the picker
    var openPicker = function (config) {
        // global scope given conf
        setConfig(config);
        // if we didnt get token generate token.
        if (!config.token) {
            var client = google.accounts.oauth2.initTokenClient({
                client_id: config.clientId,
                scope: (config.customScopes
                    ? __spreadArray(__spreadArray([], defaultScopes, true), config.customScopes, true) : defaultScopes).join(' '),
                callback: function (tokenResponse) {
                    setAuthRes(tokenResponse);
                    createPicker(__assign(__assign({}, config), { token: tokenResponse.access_token }));
                },
            });
            client.requestAccessToken();
        }
        // if we have token and everything is loaded open the picker
        if (config.token && loaded && !error && pickerApiLoaded) {
            return createPicker(config);
        }
    };
    // load the Drive picker api
    var loadApis = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.gapi.load('auth');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.gapi.load('picker', { callback: onPickerApiLoad });
    };
    var onPickerApiLoad = function () {
        setpickerApiLoaded(true);
    };
    var createPicker = function (_a) {
        var token = _a.token, _b = _a.appId, appId = _b === void 0 ? '' : _b, _c = _a.supportDrives, supportDrives = _c === void 0 ? false : _c, developerKey = _a.developerKey, _d = _a.viewId, viewId = _d === void 0 ? 'DOCS' : _d, disabled = _a.disabled, multiselect = _a.multiselect, _e = _a.showUploadView, showUploadView = _e === void 0 ? false : _e, showUploadFolders = _a.showUploadFolders, _f = _a.setParentFolder, setParentFolder = _f === void 0 ? '' : _f, viewMimeTypes = _a.viewMimeTypes, customViews = _a.customViews, _g = _a.locale, locale = _g === void 0 ? 'en' : _g, setIncludeFolders = _a.setIncludeFolders, setSelectFolderEnabled = _a.setSelectFolderEnabled, _h = _a.disableDefaultView, disableDefaultView = _h === void 0 ? false : _h, callbackFunction = _a.callbackFunction;
        if (disabled)
            return false;
        var view = new google.picker.DocsView(google.picker.ViewId[viewId]);
        if (viewMimeTypes)
            view.setMimeTypes(viewMimeTypes);
        if (setIncludeFolders)
            view.setSelectFolderEnabled(true);
        if (setSelectFolderEnabled)
            view.setSelectFolderEnabled(true);
        var uploadView = new google.picker.DocsUploadView();
        if (viewMimeTypes)
            uploadView.setMimeTypes(viewMimeTypes);
        if (showUploadFolders)
            uploadView.setIncludeFolders(true);
        if (setParentFolder)
            uploadView.setParent(setParentFolder);
        picker = new google.picker.PickerBuilder()
            .setAppId(appId)
            .setOAuthToken(token)
            .setDeveloperKey(developerKey)
            .setLocale(locale)
            .setCallback(callbackFunction);
        if (!disableDefaultView) {
            picker.addView(view);
        }
        if (customViews) {
            customViews.map(function (view) { return picker.addView(view); });
        }
        if (multiselect) {
            picker.enableFeature(google.picker.Feature.MULTISELECT_ENABLED);
        }
        if (showUploadView)
            picker.addView(uploadView);
        if (supportDrives) {
            picker.enableFeature(google.picker.Feature.SUPPORT_DRIVES);
        }
        picker.build().setVisible(true);
        return true;
    };
    return [openPicker, authRes];
}
exports["default"] = useDrivePicker;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/react-google-drive-picker/dist/typeDefs.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-google-drive-picker/dist/typeDefs.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultConfiguration = void 0;
exports.defaultConfiguration = {
    clientId: '',
    developerKey: '',
    viewId: 'DOCS',
    callbackFunction: function () { return null; },
};
//# sourceMappingURL=typeDefs.js.map

/***/ }),

/***/ "./node_modules/react-google-drive-picker/dist/useInjectScript.js":
/*!************************************************************************!*\
  !*** ./node_modules/react-google-drive-picker/dist/useInjectScript.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var react_1 = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var injectorState = {
    queue: {},
    injectorMap: {},
    scriptMap: {},
};
function useInjectScript(url) {
    var _a = (0, react_1.useState)({
        loaded: false,
        error: false,
    }), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d, _e;
        if (!((_a = injectorState.injectorMap) === null || _a === void 0 ? void 0 : _a[url])) {
            injectorState.injectorMap[url] = 'init';
        }
        // check if the script is already cached
        if (injectorState.injectorMap[url] === 'loaded') {
            setState({
                loaded: true,
                error: false,
            });
            return;
        }
        // check if the script already errored
        if (injectorState.injectorMap[url] === 'error') {
            setState({
                loaded: true,
                error: true,
            });
            return;
        }
        var onScriptEvent = function (error) {
            var _a, _b, _c, _d;
            // Get all error or load functions and call them
            if (error)
                console.log('error loading the script');
            (_b = (_a = injectorState.queue) === null || _a === void 0 ? void 0 : _a[url]) === null || _b === void 0 ? void 0 : _b.forEach(function (job) { return job(error); });
            if (error && injectorState.scriptMap[url]) {
                (_d = (_c = injectorState.scriptMap) === null || _c === void 0 ? void 0 : _c[url]) === null || _d === void 0 ? void 0 : _d.remove();
                injectorState.injectorMap[url] = 'error';
            }
            else
                injectorState.injectorMap[url] = 'loaded';
            delete injectorState.scriptMap[url];
        };
        var stateUpdate = function (error) {
            setState({
                loaded: true,
                error: error,
            });
        };
        if (!((_b = injectorState.scriptMap) === null || _b === void 0 ? void 0 : _b[url])) {
            injectorState.scriptMap[url] = document.createElement('script');
            if (injectorState.scriptMap[url]) {
                injectorState.scriptMap[url].src = url;
                injectorState.scriptMap[url].async = true;
                // append the script to the body
                document.body.append(injectorState.scriptMap[url]);
                injectorState.scriptMap[url].addEventListener('load', function () {
                    return onScriptEvent(false);
                });
                injectorState.scriptMap[url].addEventListener('error', function () {
                    return onScriptEvent(true);
                });
                injectorState.injectorMap[url] = 'loading';
            }
        }
        if (!((_c = injectorState.queue) === null || _c === void 0 ? void 0 : _c[url])) {
            injectorState.queue[url] = [stateUpdate];
        }
        else {
            (_e = (_d = injectorState.queue) === null || _d === void 0 ? void 0 : _d[url]) === null || _e === void 0 ? void 0 : _e.push(stateUpdate);
        }
        // remove the event listeners
        return function () {
            var _a, _b;
            //checks the main injector instance
            //prevents Cannot read property 'removeEventListener' of null in hot reload
            if (!injectorState.scriptMap[url])
                return;
            (_a = injectorState.scriptMap[url]) === null || _a === void 0 ? void 0 : _a.removeEventListener('load', function () {
                return onScriptEvent(true);
            });
            (_b = injectorState.scriptMap[url]) === null || _b === void 0 ? void 0 : _b.removeEventListener('error', function () {
                return onScriptEvent(true);
            });
        };
    }, [url]);
    return [state.loaded, state.error];
}
exports["default"] = useInjectScript;
//# sourceMappingURL=useInjectScript.js.map

/***/ })

}]);