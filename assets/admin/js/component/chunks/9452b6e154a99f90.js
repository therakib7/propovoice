(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_list-single_tab_task_index_js-_af271"],{

/***/ "./src/admin/js/react/components/list-single/tab/task/Form.js":
/*!********************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/Form.js ***!
  \********************************************************************/
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
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-moment */ "./node_modules/react-moment/dist/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var DateField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_blocks_date-picker_index_js-_3fac0").then(__webpack_require__.bind(__webpack_require__, /*! block/date-picker */ "./src/admin/js/react/blocks/date-picker/index.js"));
});

var Form = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Form, _Component);

  var _super = _createSuper(Form);

  function Form(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Form);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "showDropdown", function (id) {
      if (_this.state.dropdown == id) {
        _this.setState({
          dropdown: null
        });
      } else {
        _this.setState({
          dropdown: id
        });
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "setTax", function (e, value, key) {
      e.preventDefault();

      _this.setState({
        dropdown: null,
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, key, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var target = e.target;
      var name = target.name;
      var value = target.type === 'checkbox' ? target.checked : target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "onDateChange", function (date) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var form = _objectSpread({}, _this.state.form); // const startDateStr = new Moment(date).format('YYYY-MM-DD HH:mm:ss')
      //  const endDateStr = moment(endDate).format('YYYY-MM-DD HH:mm:ss')    
      // console.log(startDateStr);
      // console.log(date);
      // console.log(date.toLocaleString());


      if (type == 'start_date') {
        form.start_date = date;
      } else {
        form.end_date = date;
      }

      _this.setState({
        form: form
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleSubmit", function (e) {
      e.preventDefault();

      var form = _objectSpread({}, _this.state.form);

      if (form.status_id) {
        form.status_id = parseInt(form.status_id.id);
      }

      if (form.type_id) {
        form.type_id = parseInt(form.type_id.id);
      }

      if (form.priority_id) {
        form.priority_id = parseInt(form.priority_id.id);
      }

      _this.props.handleSubmit(form, 'new');

      var newFrom = _objectSpread({}, _this.initialState);

      newFrom.status_id = _this.state.status[0];
      newFrom.type_id = _this.state.types[0];
      newFrom.priority_id = _this.state.priorities[0];

      _this.setState({
        form: newFrom
      });
    });

    _this.initialState = {
      id: null,
      tab_id: _this.props.tab_id,
      title: '',
      status_id: '',
      type_id: '',
      priority_id: '',
      start_date: false,
      end_date: false,
      date: false
    };
    _this.state = {
      form: _this.initialState,
      dropdown: null,
      status: [],
      types: [],
      priorities: []
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.props.getAll('taxonomies', 'taxonomy=task_status,task_type,task_priority').then(function (resp) {
        if (resp.data.success) {
          var form = _objectSpread({}, _this2.state.form);

          var status = resp.data.data.task_status;
          var types = resp.data.data.task_type;
          var priorities = resp.data.data.task_priority; //TODO: add fallback if no taxonomy

          form.status_id = status[0];
          form.type_id = types[0];
          form.priority_id = priorities[0];

          _this2.setState({
            form: form,
            status: status,
            types: types,
            priorities: priorities
          });

          _this2.props.setTaxonomies({
            status: status,
            types: types,
            priorities: priorities
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var typeList = this.state.types;
      var priorityList = this.state.priorities;
      var form = this.state.form;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("form", {
        onSubmit: this.handleSubmit,
        className: "",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "pi-tab-buttons-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
            className: "pi-activity-field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("input", {
              id: "field-title",
              type: "text" //className='pi-mb-20'
              ,
              required: true,
              name: "title",
              value: form.title,
              placeholder: "Add activity or task",
              onChange: this.handleChange
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "pi-tab-buttons",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "pi-action-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(DateField, {
                date: form.start_date,
                type: "start_date",
                onDateChange: this.onDateChange
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              className: "pi-action-content",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("button", {
                className: "pi-task-btn",
                type: "button",
                onClick: function onClick() {
                  return _this3.showDropdown('type');
                },
                children: [form.type_id.icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("img", {
                  src: form.type_id.icon.src
                }), !form.type_id.icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("svg", {
                  width: 16,
                  height: 20,
                  viewBox: "0 0 16 20",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                    d: "M5 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H11M5 3C5 3.53043 5.21071 4.03914 5.58579 4.41421C5.96086 4.78929 6.46957 5 7 5H9C9.53043 5 10.0391 4.78929 10.4142 4.41421C10.7893 4.03914 11 3.53043 11 3M5 3C5 2.46957 5.21071 1.96086 5.58579 1.58579C5.96086 1.21071 6.46957 1 7 1H9C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3M5 12L7 14L11 10",
                    stroke: "#CBD5E0",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })]
              }), this.state.dropdown == 'type' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "pi-dropdown-content pi-show",
                children: typeList && typeList.map(function (item, itemIndex) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("a", {
                    onClick: function onClick(e) {
                      return _this3.setTax(e, item, 'type_id');
                    },
                    children: [item.icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("img", {
                      src: item.icon.src
                    }), item.label]
                  }, itemIndex);
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              className: "pi-action-content",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("button", {
                className: "pi-task-btn",
                type: "button",
                onClick: function onClick() {
                  return _this3.showDropdown('priority');
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("svg", {
                  width: 18,
                  height: 18,
                  viewBox: "0 0 20 20",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                    d: "M10 1.5V7M1 19V15V19ZM1 15V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H9.5L10.5 2H19L16 8L19 14H10.5L9.5 13H3C2.46957 13 1.96086 13.2107 1.58579 13.5858C1.21071 13.9609 1 14.4696 1 15V15Z",
                    stroke: form.priority_id && form.priority_id.bg_color ? form.priority_id.bg_color : '#CBD5E0',
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })
              }), this.state.dropdown == 'priority' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                className: "pi-dropdown-content pi-show",
                children: priorityList && priorityList.map(function (item, itemIndex) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("a", {
                    onClick: function onClick(e) {
                      return _this3.setTax(e, item, 'priority_id');
                    },
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("svg", {
                      ref: function ref(e) {
                        return e && e.style.setProperty('top', '8px', 'important');
                      },
                      width: 24,
                      height: 24,
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                        d: "M3.75 20.25V4.5",
                        stroke: item.bg_color ? item.bg_color : "#CBD5E0",
                        strokeWidth: 2,
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("path", {
                        d: "M3.75 15.75C9.75 11.25 14.25 20.25 20.25 15.75V4.49997C14.25 8.99997 9.75 -3.40939e-05 3.75 4.49997",
                        fill: item.bg_color ? item.bg_color : "#CBD5E0"
                      })]
                    }), item.label]
                  }, itemIndex);
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("button", {
              type: "submit",
              className: "pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-br-4",
              children: "Save"
            })]
          })]
        })
      });
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Api__WEBPACK_IMPORTED_MODULE_8__["default"])(Form));

/***/ }),

/***/ "./src/admin/js/react/components/list-single/tab/task/FormEdit.js":
/*!************************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/FormEdit.js ***!
  \************************************************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\src\\admin\\js\\react\\components\\list-single\\tab\\task\\FormEdit.js: Unexpected token (39:1)\n\n\u001b[0m \u001b[90m 37 |\u001b[39m             \u001b[36mif\u001b[39m (\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mtimeout) clearTimeout(\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mtimeout)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 38 |\u001b[39m             \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mtimeout \u001b[33m=\u001b[39m setTimeout(() \u001b[33m=>\u001b[39m {\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 39 |\u001b[39m \u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    |\u001b[39m  \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 40 |\u001b[39m                 \u001b[36mlet\u001b[39m form \u001b[33m=\u001b[39m { \u001b[33m...\u001b[39m\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mstate\u001b[33m.\u001b[39mform }\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 41 |\u001b[39m                 \u001b[36mdelete\u001b[39m form\u001b[33m.\u001b[39mpriority_id\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 42 |\u001b[39m                 \u001b[36mdelete\u001b[39m form\u001b[33m.\u001b[39mstatus_id\u001b[33m;\u001b[39m\u001b[0m\n    at instantiate (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:72:32)\n    at constructor (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:358:12)\n    at Object.raise (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:3341:19)\n    at Object.unexpected (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:3379:16)\n    at Object.jsxParseIdentifier (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7785:12)\n    at Object.jsxParseNamespacedName (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7795:23)\n    at Object.jsxParseElementName (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7806:21)\n    at Object.jsxParseOpeningElementAt (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7905:22)\n    at Object.jsxParseElementAt (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7937:33)\n    at Object.jsxParseElement (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:8022:17)");

/***/ }),

/***/ "./src/admin/js/react/components/list-single/tab/task/Table.js":
/*!*********************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/Table.js ***!
  \*********************************************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\src\\admin\\js\\react\\components\\list-single\\tab\\task\\Table.js: Unexpected token (13:1)\n\n\u001b[0m \u001b[90m 11 |\u001b[39m  \u001b[0m\n\u001b[0m \u001b[90m 12 |\u001b[39m         \u001b[36mreturn\u001b[39m (\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 13 |\u001b[39m \u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    |\u001b[39m  \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 14 |\u001b[39m             \u001b[33m<\u001b[39m\u001b[33mdiv\u001b[39m className\u001b[33m=\u001b[39m\u001b[32m\"pi-accordion-table-list\"\u001b[39m key\u001b[33m=\u001b[39m{index}\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 15 |\u001b[39m \u001b[33m===\u001b[39m\u001b[33m===\u001b[39m\u001b[33m=\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 16 |\u001b[39m             \u001b[33m<\u001b[39m\u001b[33mdiv\u001b[39m className\u001b[33m=\u001b[39m{\u001b[32m\"pi-accordion-table-list \"\u001b[39m \u001b[33m+\u001b[39m ( props\u001b[33m.\u001b[39mdashboard \u001b[33m?\u001b[39m \u001b[32m'pi-mt-15 pi-mb-15'\u001b[39m \u001b[33m:\u001b[39m \u001b[32m''\u001b[39m)} key\u001b[33m=\u001b[39m{index}\u001b[33m>\u001b[39m \u001b[0m\n    at instantiate (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:72:32)\n    at constructor (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:358:12)\n    at Object.raise (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:3341:19)\n    at Object.unexpected (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:3379:16)\n    at Object.jsxParseIdentifier (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7785:12)\n    at Object.jsxParseNamespacedName (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7795:23)\n    at Object.jsxParseElementName (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7806:21)\n    at Object.jsxParseOpeningElementAt (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7905:22)\n    at Object.jsxParseElementAt (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:7937:33)\n    at Object.jsxParseElement (C:\\Users\\user\\Local Sites\\nurency\\app\\public\\wp-content\\plugins\\propovoice\\node_modules\\@babel\\parser\\lib\\index.js:8022:17)");

/***/ }),

/***/ "./src/admin/js/react/components/list-single/tab/task/index.js":
/*!*********************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var block_preloader_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/preloader/table */ "./src/admin/js/react/blocks/preloader/table/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Form */ "./src/admin/js/react/components/list-single/tab/task/Form.js");
/* harmony import */ var _FormEdit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormEdit */ "./src/admin/js/react/components/list-single/tab/task/FormEdit.js");
/* harmony import */ var _FormEdit__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_FormEdit__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Table */ "./src/admin/js/react/components/list-single/tab/task/Table.js");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Table__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var hoc_Api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! hoc/Api */ "./src/admin/js/react/hoc/Api.js");
/* harmony import */ var hoc_Crud__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! hoc/Crud */ "./src/admin/js/react/hoc/Crud.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







 //import Search from './Search';
//import Empty from 'block/empty';







var Task = function Task(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    status: [],
    types: [],
    priorities: []
  }),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      taxonomies = _useState4[0],
      setTaxonomies = _useState4[1];

  var _props$state = props.state,
      lists = _props$state.lists,
      checkedBoxes = _props$state.checkedBoxes,
      searchVal = _props$state.searchVal;
  var openTodayTab,
      openOtherTab,
      openUnscheduleTab = false;

  if (lists.hasOwnProperty('today')) {
    if (lists.today.length > 0) {
      openTodayTab = true;
    }

    if (!lists.today.length && lists.other.length > 0) {
      openOtherTab = true;
    }

    if (!lists.today.length && !lists.other.length && lists.unschedule.length > 0) {
      openUnscheduleTab = true;
    }
  }

  var handleDelete = function handleDelete(type, id) {
    if (confirm('Are you sure, to delete it?')) {
      //TODO: translation 
      props.remove('tasks', id).then(function (resp) {
        if (resp.data.success) {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success('Successfully deleted'); //TODO: translation

          props.getLists({
            status_id: activeTab
          });
        } else {
          resp.data.data.forEach(function (value, index, array) {
            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(value);
          });
        }
      });
    }
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Form__WEBPACK_IMPORTED_MODULE_4__["default"], {
      handleSubmit: props.handleSubmit,
      setTaxonomies: setTaxonomies,
      tab_id: props.tab_id
    }), props.state.formModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((_FormEdit__WEBPACK_IMPORTED_MODULE_5___default()), {
      tab_id: props.tab_id,
      reload: props.getLists,
      taxonomies: taxonomies,
      handleSubmit: props.handleSubmit,
      modalType: props.state.formModalType,
      data: props.state.list,
      close: props.closeForm
    }), !props.dashboard && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "pi-small-button-group",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("h3", {
        className: "pi-title-small",
        children: "My Work"
      }), lists.task_status && lists.task_status.map(function (status, statusIndex) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("button", {
          className: 'pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow ' + (activeTab == status.id || !activeTab && statusIndex == 0 ? 'pi-active' : ''),
          onClick: function onClick() {
            setActiveTab(status.id);
            props.getLists({
              status_id: status.id
            });
          },
          children: status.label
        }, statusIndex);
      })]
    }), props.state.preloader ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(block_preloader_table__WEBPACK_IMPORTED_MODULE_2__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
      children: [props.dashboard && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        style: {
          marginTop: '15px'
        }
      }), props.dashboard && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((_Table__WEBPACK_IMPORTED_MODULE_6___default()), {
        dashboard: true,
        tableData: lists.latest,
        taxonomies: taxonomies,
        searchVal: searchVal,
        editEntry: props.openForm,
        checkedBoxes: {
          data: checkedBoxes,
          handle: props.handleCheckbox
        },
        handleSubmit: props.handleSubmit,
        deleteEntry: handleDelete
      }), !props.dashboard && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "pi-accordion",
        children: [lists.today.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
            type: "radio",
            name: "pi-accordion",
            defaultChecked: openTodayTab,
            id: "pi-task-today"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("section", {
            className: "pi-accordion-table",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("label", {
              className: "pi-accordion-title",
              htmlFor: "pi-task-today",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                className: "pi-down-angle",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("svg", {
                  width: 11,
                  height: 7,
                  viewBox: "0 0 11 7",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                    d: "M9.72339 1.53915L5.72339 5.53915L1.72339 1.53915",
                    stroke: "#CBD5E0",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("b", {
                children: "Today"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
              className: "pi-table-close",
              htmlFor: "pi-acc-close"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              className: "pi-accordion-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((_Table__WEBPACK_IMPORTED_MODULE_6___default()), {
                tableData: lists.today,
                taxonomies: taxonomies,
                searchVal: searchVal,
                editEntry: props.openForm,
                checkedBoxes: {
                  data: checkedBoxes,
                  handle: props.handleCheckbox
                },
                handleSubmit: props.handleSubmit,
                deleteEntry: handleDelete
              })
            })]
          })]
        }), lists.other.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
            type: "radio",
            name: "pi-accordion",
            defaultChecked: openOtherTab,
            id: "pi-task-other"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("section", {
            className: "pi-accordion-table",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("label", {
              className: "pi-accordion-title",
              htmlFor: "pi-task-other",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                className: "pi-down-angle",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("svg", {
                  width: 11,
                  height: 7,
                  viewBox: "0 0 11 7",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                    d: "M9.72339 1.53915L5.72339 5.53915L1.72339 1.53915",
                    stroke: "#CBD5E0",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("b", {
                children: "Others Day"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
              className: "pi-table-close",
              htmlFor: "pi-acc-close"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              className: "pi-accordion-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((_Table__WEBPACK_IMPORTED_MODULE_6___default()), {
                tableData: lists.other,
                taxonomies: taxonomies,
                searchVal: searchVal,
                editEntry: props.openForm,
                checkedBoxes: {
                  data: checkedBoxes,
                  handle: props.handleCheckbox
                },
                deleteEntry: handleDelete
              })
            })]
          })]
        }), lists.unschedule.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
            type: "radio",
            name: "pi-accordion",
            defaultChecked: openUnscheduleTab,
            id: "pi-task-unschedule"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("section", {
            className: "pi-accordion-table",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("label", {
              className: "pi-accordion-title",
              htmlFor: "pi-task-unschedule",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                className: "pi-down-angle",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("svg", {
                  width: 11,
                  height: 7,
                  viewBox: "0 0 11 7",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("path", {
                    d: "M9.72339 1.53915L5.72339 5.53915L1.72339 1.53915",
                    stroke: "#CBD5E0",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("b", {
                children: "Unschedule"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
              className: "pi-table-close",
              htmlFor: "pi-acc-close"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              className: "pi-accordion-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((_Table__WEBPACK_IMPORTED_MODULE_6___default()), {
                tableData: lists.unschedule,
                taxonomies: taxonomies,
                searchVal: searchVal,
                editEntry: props.openForm,
                checkedBoxes: {
                  data: checkedBoxes,
                  handle: props.handleCheckbox
                },
                deleteEntry: handleDelete
              })
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
          type: "radio",
          name: "pi-accordion",
          id: "pi-acc-close"
        })]
      })]
    })]
  });
};

var TaskHoc = (0,hoc_Crud__WEBPACK_IMPORTED_MODULE_8__["default"])(Task, 'task');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Api__WEBPACK_IMPORTED_MODULE_7__["default"])(TaskHoc));

/***/ }),

/***/ "./src/admin/js/react/hoc/Crud.js":
/*!****************************************!*\
  !*** ./src/admin/js/react/hoc/Crud.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var context_app_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! context/app-context */ "./src/admin/js/react/context/app-context.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var api_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! api/helper */ "./src/admin/js/react/api/helper.js");
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
        var args = {
          page: _this.state.currentPage,
          per_page: _this.state.perPage
        };
        /* if ( this.props.taxonomy ) {
            args.taxonomy = this.props.taxonomy;
        }  */
        //this is for task tab

        if (_this.props.tab_id) {
          args.tab_id = _this.props.tab_id;
        } //this is for task tab


        if (_this.props.dashboard) {
          args.dashboard = _this.props.dashboard;
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
        axios__WEBPACK_IMPORTED_MODULE_11___default().get("".concat(url, "/?").concat(params)).then(function (resp) {
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
          console.log(module);
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
      value: function componentDidMount() {
        this.getLists();
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