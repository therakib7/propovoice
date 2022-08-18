"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_list-single_tab_task_index_js-_af271"],{

/***/ "./src/admin/js/react/blocks/action/row/index.js":
/*!*******************************************************!*\
  !*** ./src/admin/js/react/blocks/action/row/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var block_outside_click__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/outside-click */ "./src/admin/js/react/blocks/outside-click/index.js");
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
    className: "pi-action-content",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
      style: {
        padding: '0 5px'
      },
      className: dropdown ? 'pi-active' : '',
      onClick: function onClick() {
        return showDropdown();
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

/***/ "./src/admin/js/react/components/list-single/tab/task/Action.js":
/*!**********************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/Action.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var block_outside_click__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/outside-click */ "./src/admin/js/react/blocks/outside-click/index.js");
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
    className: "pi-action-content pi-action-btn pi-bg-shadow",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
      className: dropdown ? 'dpi-active' : '',
      onClick: function onClick() {
        return showDropdown();
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("svg", {
        width: 20,
        height: 20,
        viewBox: "0 0 22 13",
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
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        onClick: function onClick() {
          setDropdown(false);
          props.editEntry('edit', row);
        },
        children: "Edit"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        onClick: function onClick() {
          setDropdown(false);
          props.deleteEntry();
        },
        children: "Delete"
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Action);

/***/ }),

/***/ "./src/admin/js/react/components/list-single/tab/task/Checklist.js":
/*!*************************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/Checklist.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _ChecklistTitle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ChecklistTitle */ "./src/admin/js/react/components/list-single/tab/task/ChecklistTitle.js");
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Action */ "./src/admin/js/react/components/list-single/tab/task/Action.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }









var Checklist = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Checklist, _Component);

  var _super = _createSuper(Checklist);

  function Checklist(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Checklist);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handleChecklistLabel", function (index) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var items = _this.state.checklist[index];
      items['label'] = value;
      var checklist = _this.state.checklist;

      _this.setState({
        checklist: checklist
      });

      _this.handlePros();
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handleChange", function (checklist_index, list_index) {
      return function (e) {
        var _e$target = e.target,
            name = _e$target.name,
            value = _e$target.value;

        var items = _this.state.checklist[checklist_index].items.map(function (item, i) {
          if (list_index !== i) return item;
          return _objectSpread(_objectSpread({}, item), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])({}, name, value));
        });

        _this.state.checklist[checklist_index].items = items;
        var checklist = _this.state.checklist;

        _this.setState({
          checklist: checklist
        });

        _this.handlePros();
      };
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "addChecklist", function (e) {
      e.preventDefault();
      var checklist = _this.state.checklist;
      checklist.push({
        label: 'Checklist',
        items: []
      });

      _this.setState({
        checklist: checklist
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handleNewItem", function (e, index) {
      var items = _this.state.checklist[index];
      items['newItem'] = e.target.value;
      var checklist = _this.state.checklist;

      _this.setState({
        checklist: checklist
      });

      _this.handlePros();
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "addItem", function (e, index) {
      e.preventDefault();
      var items = _this.state.checklist[index].items;
      var value = _this.state.checklist[index].newItem;
      if (!value) return;
      items.push({
        text: value,
        done: false
      }); //remove value after add

      var newitems = _this.state.checklist[index];
      newitems['newItem'] = '';
      var checklist = _this.state.checklist;

      _this.setState({
        checklist: checklist
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handlePros", function () {
      _this.props.changeHandler(_this.state.checklist);
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "doneHandler", function (checklist_index) {
      var list_index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var array = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_this.state.checklist);

      var items = array[checklist_index].items[list_index];
      items['done'] = !items.done;

      _this.setState({
        checklist: array
      }, function () {
        _this.handlePros();
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "deleteHandler", function (checklist_index) {
      var list_index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var array = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_this.state.checklist);

      if (list_index === null) {
        array.splice(checklist_index, 1);
      } else {
        var items = array[checklist_index].items;
        items.splice(list_index, 1);
      }

      _this.setState({
        checklist: array
      }, function () {
        _this.handlePros();
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "doneCount", function (checklist_index, type) {
      var items = _this.state.checklist[checklist_index].items;

      if (type) {
        var list = items.filter(function (item) {
          return item.done === true;
        });
        return list.length;
      } else {
        return items.length;
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "render", function () {
      var checklist = _this.state.checklist;
      var itemEdit = _this.state.itemEdit;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
        children: [checklist.map(function (checklist_single, checklist_index) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "pi-checklist pi-mb-15",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              className: "pi-checklist-head",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ChecklistTitle__WEBPACK_IMPORTED_MODULE_9__["default"], {
                value: checklist_single.label,
                index: checklist_index,
                changeHandler: _this.handleChecklistLabel
              }, checklist_index), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("span", {
                children: [_this.doneCount(checklist_index, true), " task done out of ", _this.doneCount(checklist_index, false)]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                className: "pi-close-icon",
                onClick: function onClick() {
                  return _this.deleteHandler(checklist_index);
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("svg", {
                  width: 15,
                  height: 15,
                  viewBox: "0 0 10 10",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M1.19499 1.20353C1.31989 1.07854 1.48926 1.00833 1.66585 1.00833C1.84245 1.00833 2.01182 1.07854 2.13671 1.20353L4.99584 4.06553L7.85496 1.20353C7.9164 1.13985 7.98988 1.08906 8.07114 1.05412C8.15239 1.01919 8.23979 1.00079 8.32822 1.00003C8.41665 0.999256 8.50434 1.01612 8.58619 1.04964C8.66804 1.08316 8.7424 1.13267 8.80493 1.19526C8.86747 1.25786 8.91692 1.33229 8.95041 1.41422C8.98389 1.49615 9.00074 1.58394 8.99997 1.67246C8.99921 1.76098 8.98083 1.84846 8.94593 1.9298C8.91103 2.01113 8.86029 2.08469 8.79668 2.14619L5.93756 5.00819L8.79668 7.87019C8.91799 7.99593 8.98512 8.16433 8.98361 8.33913C8.98209 8.51392 8.91205 8.68113 8.78857 8.80474C8.66508 8.92834 8.49804 8.99846 8.32342 8.99997C8.1488 9.00149 7.98057 8.9343 7.85496 8.81286L4.99584 5.95086L2.13671 8.81286C2.01111 8.9343 1.84287 9.00149 1.66825 8.99997C1.49363 8.99846 1.32659 8.92834 1.20311 8.80474C1.07963 8.68113 1.00958 8.51392 1.00807 8.33913C1.00655 8.16433 1.07368 7.99593 1.19499 7.87019L4.05412 5.00819L1.19499 2.14619C1.07014 2.02117 1 1.85163 1 1.67486C1 1.49808 1.07014 1.32854 1.19499 1.20353Z",
                    fill: "#4A5568",
                    stroke: "#4A5568",
                    strokeWidth: "0.2"
                  })
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              className: "pi-checklist-content",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("ul", {
                children: checklist_single.items.map(function (item, list_index) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("li", {
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("input", {
                      type: "checkbox",
                      id: checklist_index + '-task-' + list_index,
                      value: item.done,
                      checked: item.done,
                      onChange: function onChange() {
                        return _this.doneHandler(checklist_index, list_index);
                      }
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                      htmlFor: checklist_index + '-task-' + list_index,
                      style: {
                        textDecoration: item.done ? "line-through" : ""
                      },
                      children: itemEdit && itemEdit.checklist == checklist_index && itemEdit.list == list_index ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("input", {
                        type: "text",
                        name: "text",
                        value: item.text,
                        onChange: _this.handleChange(checklist_index, list_index),
                        onKeyPress: function onKeyPress(e) {
                          if (e.key === 'Enter') {
                            _this.setState({
                              itemEdit: false
                            });
                          }
                        }
                      }) : item.text
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Action__WEBPACK_IMPORTED_MODULE_10__["default"], {
                      row: item,
                      editEntry: function editEntry() {
                        _this.setState({
                          itemEdit: {
                            checklist: checklist_index,
                            list: list_index
                          }
                        });
                      },
                      deleteEntry: function deleteEntry() {
                        return _this.deleteHandler(checklist_index, list_index);
                      }
                    })]
                  }, list_index);
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("input", {
                type: "text",
                placeholder: "Write new " + checklist_single.label + " item",
                value: checklist_single.newItem,
                onChange: function onChange(e) {
                  return _this.handleNewItem(e, checklist_index);
                },
                onKeyPress: function onKeyPress(e) {
                  if (e.key === 'Enter') {
                    _this.addItem(e, checklist_index);
                  }
                }
              })]
            })]
          }, checklist_index);
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("button", {
          className: "pi-btn pi-btn-small",
          style: {
            color: "#718096",
            marginTop: 10
          },
          onClick: function onClick(e) {
            return _this.addChecklist(e);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("svg", {
            width: 12,
            height: 12,
            viewBox: "0 0 12 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
              d: "M1.875 6H10.125",
              stroke: "#718096",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
              d: "M6 1.875V10.125",
              stroke: "#718096",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })]
          }), "Add Checklist"]
        })]
      });
    });

    _this.state = {
      edit: false,
      itemEdit: false,
      checklist: [{
        label: 'Checklist',
        items: [],
        newItem: ''
      }]
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Checklist, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.state.edit && this.props.data) {
        this.setState({
          edit: true,
          checklist: this.props.data
        });
      }
    }
  }]);

  return Checklist;
}(react__WEBPACK_IMPORTED_MODULE_8__.Component);

Checklist.propTypes = {
  title: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Checklist);

/***/ }),

/***/ "./src/admin/js/react/components/list-single/tab/task/ChecklistTitle.js":
/*!******************************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/ChecklistTitle.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var block_outside_click__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/outside-click */ "./src/admin/js/react/blocks/outside-click/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








var Editable = function Editable(props) {
  var inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      dropdown = _useState2[0],
      setDropdown = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      text = _useState4[0],
      setText = _useState4[1]; // const close = useCallback(() => setDropdown(false), []);
  // const close = useCallback(() => done(), []);


  (0,block_outside_click__WEBPACK_IMPORTED_MODULE_2__["default"])(inputRef, close);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {}, []);

  var handleChange = function handleChange(e) {
    setText(e.target.value);
  };

  var done = function done() {
    if (props.index == null) {
      props.changeHandler(text);
    } else {
      props.changeHandler(props.index, text);
    }

    setDropdown(false);
  };

  var handleKeyEnter = function handleKeyEnter(e) {
    if (e.key === 'Enter') {
      done();
    }
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [dropdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
        type: "text",
        ref: inputRef,
        onChange: handleChange,
        onKeyDown: handleKeyEnter,
        name: "text",
        value: text
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "pi-cursor-pointer",
        style: {
          marginLeft: '5px',
          alignSelf: 'center'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
          width: 15,
          height: 15,
          onClick: done,
          xmlns: "http://www.w3.org/2000/svg",
          xmlnsXlink: "http://www.w3.org/1999/xlink",
          viewBox: "3.4 5.6 17.6 13.4",
          enableBackground: "new 3.4 5.6 17.6 13.4",
          xmlSpace: "preserve",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
            d: "M9,16.2L4.8,12l-1.4,1.4L9,19L21,7l-1.4-1.4L9,16.2z"
          })
        })
      })]
    }), !dropdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
      // onClick={() => setState({ edit: true, text: value })}
      onClick: function onClick() {
        setText(props.value);
        setDropdown(true);
      },
      children: [props.value, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "pi-mt-3 pi-ml-5",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("svg", {
          width: 16,
          height: 16,
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
            d: "M5.79375 13.4999H3C2.86739 13.4999 2.74022 13.4473 2.64645 13.3535C2.55268 13.2597 2.5 13.1326 2.5 12.9999V10.2062C2.49978 10.1413 2.51236 10.0769 2.53702 10.0169C2.56169 9.95682 2.59796 9.90222 2.64375 9.85619L10.1438 2.3562C10.1903 2.30895 10.2457 2.27144 10.3069 2.24583C10.3681 2.22022 10.4337 2.20703 10.5 2.20703C10.5663 2.20703 10.632 2.22022 10.6931 2.24583C10.7543 2.27144 10.8097 2.30895 10.8563 2.3562L13.6438 5.1437C13.691 5.19022 13.7285 5.24568 13.7541 5.30684C13.7797 5.368 13.7929 5.43364 13.7929 5.49995C13.7929 5.56625 13.7797 5.63189 13.7541 5.69305C13.7285 5.75421 13.691 5.80967 13.6438 5.85619L6.14375 13.3562C6.09773 13.402 6.04313 13.4383 5.98307 13.4629C5.92301 13.4876 5.85868 13.5002 5.79375 13.4999V13.4999Z",
            stroke: "#CBD5E0",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
            d: "M8.5 4L12 7.5",
            stroke: "#CBD5E0",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })]
        })
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editable);

/***/ }),

/***/ "./src/admin/js/react/components/list-single/tab/task/Form.js":
/*!********************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/Form.js ***!
  \********************************************************************/
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
/* harmony import */ var hoc_Api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! hoc/Api */ "./src/admin/js/react/hoc/Api.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-moment */ "./node_modules/react-moment/dist/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var DateField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_blocks_date-picker_index_js-_3fac1").then(__webpack_require__.bind(__webpack_require__, /*! block/date-picker */ "./src/admin/js/react/blocks/date-picker/index.js"));
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
/* harmony import */ var hoc_Api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! hoc/Api */ "./src/admin/js/react/hoc/Api.js");
/* harmony import */ var block_field_taxonomy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! block/field/taxonomy */ "./src/admin/js/react/blocks/field/taxonomy/index.js");
/* harmony import */ var _Checklist__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Checklist */ "./src/admin/js/react/components/list-single/tab/task/Checklist.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









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
      }, function () {
        // this.props.handleSubmit(this.state.form); 
        if (_this.timeout) clearTimeout(_this.timeout);
        _this.timeout = setTimeout(function () {
          var form = _objectSpread({}, _this.state.form);

          var status_id = form.status_id.id;
          delete form.priority_id;
          delete form.status_id;
          delete form.type_id;

          _this.props.update('tasks', form.id, form).then(function (resp) {
            if (resp.data.success && name == 'title') {
              _this.props.reload({
                status_id: status_id
              });
            }
          });
        }, 300);
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

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChecklistChange", function (data) {
      var form = _objectSpread({}, _this.state.form);

      form.checklist = data;

      _this.setState({
        form: form
      }, function () {
        if (_this.timeout) clearTimeout(_this.timeout);
        _this.timeout = setTimeout(function () {
          var form = _objectSpread({}, _this.state.form);

          delete form.priority_id;
          delete form.status_id;
          delete form.type_id;

          _this.props.update('tasks', form.id, form);
        }, 300);
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleTaskStatusChange", function (val) {
      var data = _objectSpread({}, _this.state.form);

      if (val == 'done') {
        var obj = _this.props.taxonomies.status.find(function (o) {
          return o.type === val;
        });

        data.status_id = obj;

        _this.setState({
          form: data
        }, function () {
          var newData = {};

          if (data.status_id) {
            newData.status_id = data.status_id.id;
          }

          _this.props.update('tasks', data.id, newData);
        });
      } else {
        data.status_id = val;

        _this.setState({
          form: data
        });
      }
    });

    _this.initialState = {
      id: null,
      tab_id: _this.props.tab_id,
      title: '',
      status_id: null,
      type_id: null,
      priority_id: null,
      desc: '',
      note: '',
      checklist: null
    };
    _this.state = {
      form: _this.initialState,
      dropdown: null
    };
    _this.timeout = 0;
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
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "pi-overlay",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
          className: "pi-modal-content pi-modal-sidebar pi-modal-sidebar-two",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "pi-modal-header pi-gradient",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
              className: "pi-close",
              onClick: function onClick() {
                return _this2.props.close();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("svg", {
                width: 25,
                height: 25,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                  d: "M12.5 3.5L3.5 12.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                  d: "M12.5 12.5L3.5 3.5",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              className: "pi-small-button-group",
              children: [form.id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(block_field_taxonomy__WEBPACK_IMPORTED_MODULE_9__["default"], {
                onChange: this.handleTaskStatusChange,
                id: form.id,
                data: form.status_id,
                taxonomy: "task_status",
                title: "Status",
                color: true
              }, form.status_id.id), form.status_id && form.status_id.type != 'done' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("button", {
                className: "pi-btn pi-btn-medium pi-float-right pi-bg-green",
                onClick: function onClick() {
                  return _this2.handleTaskStatusChange('done');
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("svg", {
                  width: 13,
                  height: 10,
                  viewBox: "0 0 13 10",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                    d: "M11.5 1.5L4.5 8.5L1 5",
                    stroke: "white",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                }), "Mark as Done"]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
            className: "pi-content",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              className: "pi-form-style-one",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                className: "row",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                  className: "col-lg",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                    htmlFor: "title",
                    children: "Title"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("input", {
                    id: "title",
                    className: "pi-title-field",
                    type: "text",
                    name: "title",
                    value: form.title,
                    onChange: this.handleChange
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                  className: "col",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                    htmlFor: "form-desc",
                    children: "Task Type:"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                    className: "pi-field-action",
                    children: form.id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(block_field_taxonomy__WEBPACK_IMPORTED_MODULE_9__["default"], {
                      id: form.id,
                      data: form.type_id,
                      taxonomy: "task_type",
                      title: "Type",
                      small: true,
                      color: true
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                  className: "col",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                    htmlFor: "form-desc",
                    children: "Task Priority:"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                    className: "pi-field-action",
                    children: form.id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(block_field_taxonomy__WEBPACK_IMPORTED_MODULE_9__["default"], {
                      id: form.id,
                      data: form.priority_id,
                      taxonomy: "task_priority",
                      title: "Priority",
                      small: true,
                      color: true
                    })
                  })]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                className: "row",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                  className: "col-lg",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                    htmlFor: "name",
                    children: "Meeting Place or Link"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("input", {
                    type: "text",
                    id: "name",
                    name: "name",
                    defaultValue: "Add Location"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                    className: "pi-buttons pi-mt-15",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("button", {
                      className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-shadow pi-mr-10",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("svg", {
                        width: 17,
                        height: 14,
                        viewBox: "0 0 17 14",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                          d: "M4.5 0.399902L0.5 4.3999L2.5 5.63793L4.5 4.3999L5.62941 2.3999L4.5 0.399902Z",
                          fill: "#FF2820"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                          d: "M4.5 4.3999H0.5V9.5999L2.5 10.6982L4.5 9.5999V4.3999Z",
                          fill: "#0084FF"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                          d: "M0.5 9.59985V12.2665C0.5 12.9999 1.1 13.5999 1.83334 13.5999H4.5L5.62941 11.4767L4.5 9.59985H0.5Z",
                          fill: "#0066DD"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                          d: "M15.6738 1.82014L13.1999 3.77986V3.79995L12.3931 6.88026L13.1999 9.99755L15.6628 11.9798C15.9933 12.257 16.4999 12.0241 16.4999 11.5916V2.20833C16.4999 1.77576 16.0043 1.54286 15.6738 1.82014Z",
                          fill: "#00AD3C"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                          d: "M13.2 3.77981V1.71793C13.2 0.993027 12.6128 0.399902 11.895 0.399902H9.285H4.5V4.3999H9.4V6.9999L12.0326 6.70662L13.2 3.77981Z",
                          fill: "#FFBA00"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                          d: "M9.4 9.6H4.5V13.6H9.285H11.895C12.6128 13.6 13.2 13.0078 13.2 12.2839V10L11.894 7.31684L9.4 7V9.6Z",
                          fill: "#00AD3C"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                          d: "M9.3999 6.99988L13.1999 9.99988V3.77979L9.3999 6.99988Z",
                          fill: "#00831E"
                        })]
                      }), "Add Google meet"]
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("button", {
                      className: "pi-btn pi-btn-medium pi-bg-stroke pi-bg-shadow",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("svg", {
                        width: 17,
                        height: 10,
                        viewBox: "0 0 17 10",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                          d: "M0.5 1.09594V6.95562C0.505313 8.28062 1.5875 9.34687 2.90719 9.34156H11.4481C11.6909 9.34156 11.8862 9.14625 11.8862 8.90875V3.04937C11.8809 1.72437 10.7991 0.657811 9.47906 0.663124H0.938125C0.695313 0.663124 0.5 0.858437 0.5 1.09594H0.5ZM12.43 3.38187L15.9563 0.805624C16.2625 0.552499 16.5 0.615624 16.5 1.075V8.92969C16.5 9.4525 16.2097 9.38906 15.9563 9.19906L12.43 6.62812V3.38187Z",
                          fill: "#4A8CFF"
                        })
                      }), "Connect Zoom"]
                    })]
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                className: "row",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                  className: "col",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                    htmlFor: "form-desc",
                    children: "Description"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("textarea", {
                    id: "form-desc",
                    name: "desc",
                    value: form.desc,
                    onChange: this.handleChange
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                className: "row",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                  className: "col",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                    htmlFor: "form-note",
                    children: "Note"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("textarea", {
                    id: "form-note",
                    name: "note",
                    value: form.note,
                    onChange: this.handleChange
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                className: "row",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Checklist__WEBPACK_IMPORTED_MODULE_10__["default"], {
                    data: this.state.form.checklist,
                    changeHandler: this.handleChecklistChange
                  })
                })
              })]
            })
          })]
        })
      });
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Api__WEBPACK_IMPORTED_MODULE_8__["default"])(Form));

/***/ }),

/***/ "./src/admin/js/react/components/list-single/tab/task/Table.js":
/*!*********************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/Table.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-moment */ "./node_modules/react-moment/dist/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var block_action_row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! block/action/row */ "./src/admin/js/react/blocks/action/row/index.js");
/* harmony import */ var block_field_taxonomy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! block/field/taxonomy */ "./src/admin/js/react/blocks/field/taxonomy/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }









var TableBody = function TableBody(props) {
  return props.tableData.map(function (row, index) {
    var data = props.checkedBoxes.data;
    var checkedCheckbox = data.indexOf(row.id) !== -1 ? true : false;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "pi-accordion-table-list " + (props.dashboard ? 'pi-mt-15 pi-mb-15' : ''),
      children: [!props.dashboard && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "pi-checkbox",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
          type: "checkbox",
          value: row.id,
          checked: checkedCheckbox,
          onChange: function onChange(e) {
            return props.checkedBoxes.handle(e, 'single', row.id);
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("ul", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("li", {
          style: {
            width: '45%'
          },
          className: "pi-cursor-pointer",
          onClick: function onClick() {
            return props.editEntry('edit', row);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "pi-task-type " + (props.dashboard ? 'pi-mt-10' : ''),
            children: [row.type_id.icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
              src: row.type_id.icon.src
            }), !row.type_id.icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("svg", {
              width: 16,
              height: 20,
              viewBox: "0 0 16 20",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                d: "M5 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H11M5 3C5 3.53043 5.21071 4.03914 5.58579 4.41421C5.96086 4.78929 6.46957 5 7 5H9C9.53043 5 10.0391 4.78929 10.4142 4.41421C10.7893 4.03914 11 3.53043 11 3M5 3C5 2.46957 5.21071 1.96086 5.58579 1.58579C5.96086 1.21071 6.46957 1 7 1H9C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3M5 12L7 14L11 10",
                stroke: "#CBD5E0",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "pi-task-type-text",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h4", {
              children: row.title
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
                width: 12,
                height: 12,
                viewBox: "0 0 12 12",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                  d: "M6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5Z",
                  stroke: "#718096",
                  strokeMiterlimit: 10
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
                  d: "M6 3.375V6H8.625",
                  stroke: "#718096",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react_moment__WEBPACK_IMPORTED_MODULE_2___default()), {
                format: "YYYY-MM-DD",
                children: row.date
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
          style: {
            width: '20%'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(block_field_taxonomy__WEBPACK_IMPORTED_MODULE_4__["default"], {
            id: row.id,
            data: row.status_id,
            list: props.taxonomies.status,
            taxonomy: "task_status",
            title: "Status",
            small: true,
            color: true
          }, row.id)
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
          style: {
            width: '20%'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(block_field_taxonomy__WEBPACK_IMPORTED_MODULE_4__["default"], {
            id: row.id,
            data: row.priority_id,
            list: props.taxonomies.priorities,
            taxonomy: "task_priority",
            title: "Priority",
            small: true,
            color: true
          }, row.id)
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(block_action_row__WEBPACK_IMPORTED_MODULE_3__["default"], {
            row: row,
            editEntry: props.editEntry,
            deleteEntry: props.deleteEntry
          })
        })]
      })]
    }, index);
  });
};

var Table = function Table(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: props.tableData.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "pi-table-wrap pi-p-m",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "pi-accordion-table-list-area",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(TableBody, _objectSpread({}, props))
      })
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ "./src/admin/js/react/components/list-single/tab/task/index.js":
/*!*********************************************************************!*\
  !*** ./src/admin/js/react/components/list-single/tab/task/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Table */ "./src/admin/js/react/components/list-single/tab/task/Table.js");
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
    }), props.state.formModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_FormEdit__WEBPACK_IMPORTED_MODULE_5__["default"], {
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
      }), props.dashboard && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_6__["default"], {
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