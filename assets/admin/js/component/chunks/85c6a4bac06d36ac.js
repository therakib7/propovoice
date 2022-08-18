"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_invoice_list_index_js-_d3991"],{

/***/ "./src/admin/js/react/api/action.js":
/*!******************************************!*\
  !*** ./src/admin/js/react/api/action.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/admin/js/react/api/helper.js");


var url = _helper__WEBPACK_IMPORTED_MODULE_1__.apiUrl + 'actions';

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

/***/ "./src/admin/js/react/api/payment-process.js":
/*!***************************************************!*\
  !*** ./src/admin/js/react/api/payment-process.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./src/admin/js/react/api/helper.js");


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

/***/ "./src/admin/js/react/blocks/action/table/index.js":
/*!*********************************************************!*\
  !*** ./src/admin/js/react/blocks/action/table/index.js ***!
  \*********************************************************/
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
  /* const showDropdown = () => {
      if (dropdown) {
          setDropdown(false);
      } else {
          setDropdown(true);
      }
  }; */

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "pi-table-action pi-mb-10",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "pi-checkbox-field pi-mt-6",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
        type: "checkbox",
        defaultChecked: true,
        onChange: function onChange() {
          return props.uncheckAll();
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
        children: [props.length, " Items Selected"]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "pi-small-button-group",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
        className: "pi-btn pi-btn-small pi-bg-stroke pi-bg-shadow pi-bg-hover-shadow",
        onClick: function onClick() {
          return props.deleteEntry('selected');
        },
        children: "Delete"
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Action);

/***/ }),

/***/ "./src/admin/js/react/blocks/add-new/index.js":
/*!****************************************************!*\
  !*** ./src/admin/js/react/blocks/add-new/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var hoc_Api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hoc/Api */ "./src/admin/js/react/hoc/Api.js");
/* harmony import */ var block_outside_click__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! block/outside-click */ "./src/admin/js/react/blocks/outside-click/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








var AddNew = function AddNew(props) {
  var dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      dropdown = _useState2[0],
      setDropdown = _useState2[1];

  var close = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    return setDropdown(false);
  }, []);
  (0,block_outside_click__WEBPACK_IMPORTED_MODULE_3__["default"])(dropdownRef, close);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {}, []);

  var showDropdown = function showDropdown() {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  var ImportExport = function ImportExport(e, type) {
    e.preventDefault();
    setDropdown(false);
    alert('Features, In progressing...');
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "pi-list-single-button-content",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
      className: "pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white",
      onClick: function onClick() {
        return props.openForm('new');
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("svg", {
        width: 14,
        height: 12,
        viewBox: "0 0 12 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
          d: "M2.5 8H13.5",
          stroke: "white",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
          d: "M8 2.5V13.5",
          stroke: "white",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })]
      }), "Add ", props.title]
    }),  false && /*#__PURE__*/0]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,hoc_Api__WEBPACK_IMPORTED_MODULE_2__["default"])(AddNew));

/***/ }),

/***/ "./src/admin/js/react/blocks/breadcrumb/index.js":
/*!*******************************************************!*\
  !*** ./src/admin/js/react/blocks/breadcrumb/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var Breadcrumb = function Breadcrumb(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
    className: "pi-breadcrumb",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
      className: "",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
          href: "#",
          className: "",
          children: "Home"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
          width: 5,
          height: 10,
          viewBox: "0 0 5 10",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M0.5 1.25L4.25 5L0.5 8.75",
            stroke: "#718096",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
        className: "pi-active",
        children: props.title
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Breadcrumb);

/***/ }),

/***/ "./src/admin/js/react/blocks/empty/index.js":
/*!**************************************************!*\
  !*** ./src/admin/js/react/blocks/empty/index.js ***!
  \**************************************************/
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
      className: "pi-empty-content pi-text-center" // style={{ backgroundImage: "url(assets/img/overlay-image.png)" }}
      ,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        width: 80,
        height: 80,
        viewBox: "0 0 36 36",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M28.8281 0.617554V7.03125H35.2414L28.8281 0.617554Z",
          fill: "#4C6FFF",
          fillOpacity: "0.5"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M27.7734 9.14062C27.191 9.14062 26.7188 8.66841 26.7188 8.08594V0H11.6016C9.8569 0 8.4375 1.4194 8.4375 3.16406V14.9547C8.78498 14.9232 9.13662 14.9062 9.49219 14.9062C13.0871 14.9062 16.3053 16.5499 18.435 19.125H29.8828C30.4653 19.125 30.9375 19.5972 30.9375 20.1797C30.9375 20.7622 30.4653 21.2344 29.8828 21.2344H19.8245C20.4837 22.5208 20.9088 23.946 21.0453 25.4531H29.8828C30.4653 25.4531 30.9375 25.9253 30.9375 26.5078C30.9375 27.0903 30.4653 27.5625 29.8828 27.5625H21.0453C20.7299 31.0457 18.8689 34.0893 16.1549 36H32.6953C34.44 36 35.8594 34.5806 35.8594 32.8359V9.14062H27.7734ZM29.8828 14.9062H14.4141C13.8316 14.9062 13.3594 14.434 13.3594 13.8516C13.3594 13.2691 13.8316 12.7969 14.4141 12.7969H29.8828C30.4653 12.7969 30.9375 13.2691 30.9375 13.8516C30.9375 14.434 30.4653 14.9062 29.8828 14.9062Z",
          fill: "#4C6FFF"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
          d: "M9.49219 17.0156C4.25819 17.0156 0 21.2738 0 26.5078C0 31.7418 4.25819 36 9.49219 36C14.7262 36 18.9844 31.7418 18.9844 26.5078C18.9844 21.2738 14.7262 17.0156 9.49219 17.0156ZM8.90627 25.4531H10.0782C11.3058 25.4531 12.3047 26.452 12.3047 27.6797V28.8515C12.3047 29.9185 11.5502 30.8121 10.5469 31.0281V31.4297C10.5469 32.0122 10.0747 32.4844 9.49219 32.4844C8.90972 32.4844 8.4375 32.0122 8.4375 31.4297V31.0281C7.43414 30.8121 6.67969 29.9185 6.67969 28.8515C6.67969 28.2691 7.15191 27.7969 7.73438 27.7969C8.31684 27.7969 8.78906 28.2691 8.78906 28.8515C8.78906 28.9162 8.84166 28.9688 8.90627 28.9688H10.0782C10.1428 28.9688 10.1954 28.9162 10.1954 28.8515V27.6797C10.1954 27.6151 10.1428 27.5625 10.0782 27.5625H8.90627C7.67855 27.5625 6.67969 26.5636 6.67969 25.3359V24.1641C6.67969 23.0972 7.43414 22.2035 8.4375 21.9876V21.5859C8.4375 21.0035 8.90972 20.5312 9.49219 20.5312C10.0747 20.5312 10.5469 21.0035 10.5469 21.5859V21.9876C11.5502 22.2035 12.3047 23.0972 12.3047 24.1641C12.3047 24.7466 11.8325 25.2188 11.25 25.2188C10.6675 25.2188 10.1953 24.7466 10.1953 24.1641C10.1953 24.0995 10.1427 24.0469 10.0781 24.0469H8.9062C8.84159 24.0469 8.78899 24.0995 8.78899 24.1641V25.3359C8.78906 25.4005 8.84166 25.4531 8.90627 25.4531Z",
          fill: "#4C6FFF",
          fillOpacity: "0.5"
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

/***/ "./src/admin/js/react/blocks/pagination/index.js":
/*!*******************************************************!*\
  !*** ./src/admin/js/react/blocks/pagination/index.js ***!
  \*******************************************************/
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

/***/ "./src/admin/js/react/components/invoice/list/Search.js":
/*!**************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/list/Search.js ***!
  \**************************************************************/
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
      }, function () {
        if (name == 'text') {
          //search when typing stop
          if (_this.timeout) clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function () {
            _this.props.handleSubmit(_this.state.form);
          }, 300);
        } else {
          _this.props.handleSubmit(_this.state.form);
        }
      });
    });

    _this.state = {
      form: {
        text: '',
        level: '',
        tag: ''
      },
      searchModal: false
    };
    _this.timeout = 0;
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Form, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          title = _this$props.title,
          showing = _this$props.showing,
          showItem = _this$props.showItem,
          total = _this$props.total;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "pi-search-bar",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "pi-search-box pi-mediun-search-bar",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("svg", {
            width: 24,
            height: 24,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
              d: "M10.77 18.3C9.2807 18.3 7.82485 17.8584 6.58655 17.031C5.34825 16.2036 4.38311 15.0275 3.81318 13.6516C3.24325 12.2757 3.09413 10.7616 3.38468 9.30096C3.67523 7.84029 4.39239 6.49857 5.44548 5.44548C6.49857 4.39239 7.84029 3.67523 9.30096 3.38468C10.7616 3.09413 12.2757 3.24325 13.6516 3.81318C15.0275 4.38311 16.2036 5.34825 17.031 6.58655C17.8584 7.82485 18.3 9.2807 18.3 10.77C18.3 11.7588 18.1052 12.738 17.7268 13.6516C17.3484 14.5652 16.7937 15.3953 16.0945 16.0945C15.3953 16.7937 14.5652 17.3484 13.6516 17.7268C12.738 18.1052 11.7588 18.3 10.77 18.3V18.3ZM10.77 4.74999C9.58331 4.74999 8.42327 5.10189 7.43657 5.76118C6.44988 6.42046 5.68084 7.35754 5.22672 8.45389C4.77259 9.55025 4.65377 10.7566 4.88528 11.9205C5.11679 13.0844 5.68824 14.1535 6.52735 14.9926C7.36647 15.8317 8.43556 16.4032 9.59945 16.6347C10.7633 16.8662 11.9697 16.7474 13.0661 16.2933C14.1625 15.8391 15.0995 15.0701 15.7588 14.0834C16.4181 13.0967 16.77 11.9367 16.77 10.75C16.77 9.15869 16.1379 7.63257 15.0126 6.50735C13.8874 5.38213 12.3613 4.74999 10.77 4.74999Z",
              fill: "#718096"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
              d: "M20 20.75C19.9014 20.7505 19.8038 20.7312 19.7128 20.6935C19.6218 20.6557 19.5392 20.6001 19.47 20.53L15.34 16.4C15.2075 16.2578 15.1354 16.0698 15.1388 15.8755C15.1422 15.6812 15.2209 15.4958 15.3583 15.3584C15.4958 15.221 15.6811 15.1422 15.8754 15.1388C16.0697 15.1354 16.2578 15.2075 16.4 15.34L20.53 19.47C20.6704 19.6106 20.7493 19.8012 20.7493 20C20.7493 20.1987 20.6704 20.3894 20.53 20.53C20.4607 20.6001 20.3782 20.6557 20.2872 20.6935C20.1961 20.7312 20.0985 20.7505 20 20.75Z",
              fill: "#718096"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
            type: "text",
            className: "pi-search-input",
            placeholder: 'Search ' + title,
            name: "text",
            value: this.state.form.text,
            onChange: this.handleChange
          })]
        }),  false && /*#__PURE__*/0, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "pi-total-list",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("p", {
            children: ["Show ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("select", {
              onChange: showItem,
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
                value: "10",
                children: "10"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
                value: "20",
                children: "20"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
                value: "30",
                children: "30"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
                value: "50",
                children: "50"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
                value: "99",
                children: "99"
              })]
            }), title, " from ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
              children: total
            })]
          })
        })]
      });
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);



/***/ }),

/***/ "./src/admin/js/react/components/invoice/list/Table.js":
/*!*************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/list/Table.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-moment */ "./node_modules/react-moment/dist/index.js");
/* harmony import */ var react_moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _feedback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feedback */ "./src/admin/js/react/components/invoice/list/feedback/index.js");
/* harmony import */ var block_outside_click__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! block/outside-click */ "./src/admin/js/react/blocks/outside-click/index.js");
/* harmony import */ var _payment_Bank__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./payment/Bank */ "./src/admin/js/react/components/invoice/list/payment/Bank.js");
/* harmony import */ var _payment_Paypal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./payment/Paypal */ "./src/admin/js/react/components/invoice/list/payment/Paypal.js");
/* harmony import */ var _payment_Stripe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./payment/Stripe */ "./src/admin/js/react/components/invoice/list/payment/Stripe.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






 //payment








var TableHeader = function TableHeader(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("thead", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
          type: "checkbox" // value={row.id}
          // checked={ props.checkedBoxes.data.find((p) => p.id === row.id)} 
          ,
          onChange: function onChange(e) {
            return props.checkedBoxes.handle(e, 'all');
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("th", {
        children: [props.path == 'invoice' ? 'Invoice' : 'Estimate', " ID"]
      }), !props.client_id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
        children: "Contact"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
        children: "Total"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
        children: "Status"
      }), props.path == 'invoice' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
        children: "Payment Method"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
        children: "Date"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("th", {
        children: "Action"
      })]
    })
  });
};

var TableBody = function TableBody(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      dropdown = _useState2[0],
      setDropdown = _useState2[1]; // const close = useCallback(() => setDropdown(null), []);	


  var showDropdown = function showDropdown(id) {
    if (dropdown == id) {
      setDropdown(null);
    } else {
      setDropdown(id);
    }
  };

  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useNavigate)();

  function handleClick(id) {
    var view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var path = props.path;
    navigate("/".concat(path, "/single/").concat(id).concat(view));
  }

  var rows = props.tableData.map(function (row, index) {
    // const popover = useRef();
    // useClickOutside(popover, close);
    var data = props.checkedBoxes.data;
    var checkedCheckbox = data.indexOf(row.id) !== -1 ? true : false;
    var status;

    switch (row.status) {
      case 'draft':
        status = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-bg-pink" // style={{color: '#fff'}}
          ,
          children: "Draft"
        });
        break;

      case 'sent':
        status = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-bg-gray" // style={{color: '#fff'}}
          ,
          children: "Sent"
        });
        break;

      case 'viewed':
        status = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-bg-orange" // style={{color: '#999'}}
          ,
          children: "Viewed"
        });
        break;

      case 'accept':
        status = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-bg-blue pi-cursor-pointer",
          style: {
            color: '#fff'
          },
          onClick: function onClick() {
            return props.infoModal(row, 'feedback');
          },
          children: "Accepted"
        });
        break;

      case 'decline':
        status = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-bg-red pi-cursor-pointer",
          style: {
            color: '#fff'
          },
          onClick: function onClick() {
            return props.infoModal(row, 'feedback');
          },
          children: "Declined"
        });
        break;

      case 'paid_req':
        status = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-bg-orange",
          style: {
            color: '#4a5568'
          },
          children: "Paid Request"
        });
        break;

      case 'paid':
        status = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-bg-blue",
          style: {
            color: '#fff'
          },
          children: "Paid"
        });
        break;
    }

    var payment_method;

    switch (row.payment_method) {
      case 'bank':
        payment_method = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-cursor-pointer",
          style: {
            color: '#fff',
            backgroundColor: '#4A5568'
          },
          onClick: function onClick() {
            return props.infoModal(row, 'bank');
          },
          children: "Bank & Others"
        });
        break;

      case 'paypal':
        payment_method = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-cursor-pointer",
          style: {
            color: '#fff',
            backgroundColor: '#009cde'
          },
          onClick: function onClick() {
            return props.infoModal(row, 'paypal');
          },
          children: "Paypal"
        });
        break;

      case 'stripe':
        payment_method = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "pi-badge pi-cursor-pointer",
          style: {
            color: '#fff',
            backgroundColor: '#5433FF'
          },
          onClick: function onClick() {
            return props.infoModal(row, 'stripe');
          },
          children: "Stripe"
        });
        break;
    }

    var invoice_id = row.id;
    var invoice_token = row.token;
    var url = row.path == 'invoice' ? ncpi.invoice_page_url : ncpi.estimate_page_url; //replace text with id and token

    var result = url.replace('invoice_id', invoice_id);
    var client_url = result.replace('invoice_token', invoice_token);
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
          type: "checkbox",
          value: row.id,
          checked: checkedCheckbox,
          onChange: function onChange(e) {
            return props.checkedBoxes.handle(e, 'single', row.id);
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
        onClick: function onClick() {
          handleClick(row.id);
        },
        className: "pi-cursor-pointer",
        children: (row.path == 'invoice' ? 'Inv' : 'Est') + row.id
      }), !props.client_id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
        onClick: function onClick() {
          handleClick(row.id);
        },
        className: "pi-cursor-pointer",
        children: row.to.type == 'person' ? row.to.first_name : row.to.org_name
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
        onClick: function onClick() {
          handleClick(row.id);
        },
        className: "pi-cursor-pointer",
        children: row.total
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
        children: status
      }), props.path == 'invoice' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
        children: payment_method
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
        onClick: function onClick() {
          handleClick(row.id);
        },
        className: "pi-cursor-pointer",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react_moment__WEBPACK_IMPORTED_MODULE_2___default()), {
          format: "YYYY-MM-DD",
          children: row.date
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
        className: "pi-action",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "pi-action-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
            className: row.id == dropdown ? 'pi-active' : '',
            onClick: function onClick() {
              return showDropdown(row.id);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("svg", {
              width: 24,
              height: 24,
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12Z",
                fill: "#718096"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z",
                fill: "#718096"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z",
                fill: "#718096"
              })]
            })
          }), row.id == dropdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "pi-dropdown-content pi-show" // ref={popover}
            ,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              onClick: function onClick() {
                showDropdown(row.id);
                handleClick(row.id);
              },
              children: "Edit"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              onClick: function onClick() {
                return handleClick(row.id, '/tab/preview');
              },
              children: "Preview"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              target: "_blank",
              href: client_url,
              children: "Client Preview"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              onClick: function onClick() {
                showDropdown(row.id);
                props.action('sent', row.id);
              },
              children: "Mark As Sent"
            }), row.path == 'invoice' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              onClick: function onClick() {
                showDropdown(row.id);
                props.action('paid', row.id);
              },
              children: "Mark As Paid"
            }), row.path == 'estimate' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              onClick: function onClick() {
                showDropdown(row.id);
                props.action('accept', row.id);
              },
              children: "Mark As Accepted"
            }), row.path == 'estimate' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              onClick: function onClick() {
                showDropdown(row.id);
                props.action('decline', row.id);
              },
              children: "Mark As Declined"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              onClick: function onClick() {
                showDropdown(row.id);
                props.action('copy', row.id);
              },
              children: "Duplicate"
            }), row.path == 'estimate' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              onClick: function onClick() {
                showDropdown(row.id);
                props.action('copy-to-inv', row.id);
              },
              children: "Copy To Invoice"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              onClick: function onClick() {
                showDropdown(row.id);
                props.deleteEntry('single', row.id);
              },
              children: "Delete"
            })]
          })]
        })
      })]
    }, index);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("tbody", {
    children: rows
  });
};

var Table = function Table(props) {
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      infoModal = _useState4[0],
      setInfoModal = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
      _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
      infoData = _useState6[0],
      setInfoData = _useState6[1];

  var handleInfoModal = function handleInfoModal(data) {
    setInfoData(data);
    setInfoModal(true);
  };

  var tableData = props.tableData,
      editEntry = props.editEntry,
      checkedBoxes = props.checkedBoxes,
      deleteEntry = props.deleteEntry,
      client_id = props.client_id,
      path = props.path,
      action = props.action;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: tableData.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "pi-table-wrap",
      children: [infoModal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: [(infoData.status == 'accept' || infoData.status == 'decline') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_feedback__WEBPACK_IMPORTED_MODULE_3__["default"], {
          data: infoData,
          show: infoModal,
          reload: props.reload,
          close: function close() {
            return setInfoModal(false);
          }
        }), infoData.payment_method == 'bank' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_payment_Bank__WEBPACK_IMPORTED_MODULE_5__["default"], {
          data: infoData,
          show: infoModal,
          reload: props.reload,
          close: function close() {
            return setInfoModal(false);
          }
        }), infoData.payment_method == 'paypal' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_payment_Paypal__WEBPACK_IMPORTED_MODULE_6__["default"], {
          data: infoData,
          show: infoModal,
          reload: props.reload,
          close: function close() {
            return setInfoModal(false);
          }
        }), infoData.payment_method == 'stripe' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_payment_Stripe__WEBPACK_IMPORTED_MODULE_7__["default"], {
          data: infoData,
          show: infoModal,
          reload: props.reload,
          close: function close() {
            return setInfoModal(false);
          }
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("table", {
        className: "pi-table",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(TableHeader, {
          checkedBoxes: checkedBoxes,
          client_id: client_id,
          path: path
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(TableBody, {
          infoModal: handleInfoModal,
          tableData: tableData,
          editEntry: editEntry,
          checkedBoxes: checkedBoxes,
          deleteEntry: deleteEntry,
          client_id: client_id,
          path: path,
          action: action
        })]
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Table);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/list/feedback/index.js":
/*!**********************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/list/feedback/index.js ***!
  \**********************************************************************/
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
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var block_field_upload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! block/field/upload */ "./src/admin/js/react/blocks/field/upload/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }








var Feedback = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Feedback, _Component);

  var _super = _createSuper(Feedback);

  function Feedback(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Feedback);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleUploadChange", function (data) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var form = _objectSpread({}, _this.state.form);

      form.attachment = data;

      _this.setState({
        form: form
      });
    });

    _this.state = {
      form: {// invoice_id: null,
        // date: '',
        // note: '',
        // attachment: null,
      }
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Feedback, [{
    key: "componentDidMount",
    value: function componentDidMount() {// this.setState({ note: this.props.data.note });

      /* if (this.state.form.invoice_id != this.props.data.id) { 
          this.setState({ form: this.props.data.payment_info });
      } */
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
        children: this.props.show && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
          className: "pi-overlay pi-show",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
            className: "pi-modal-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
              className: "pi-modal-header",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("h2", {
                className: "pi-modal-title pi-text-center",
                children: "Feedback"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
                className: "pi-close",
                onClick: function onClick() {
                  return _this2.props.close();
                },
                children: "\xD7"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "form-note",
                      children: "Additional Note"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("textarea", {
                      id: "form-note",
                      rows: 2,
                      name: "note",
                      value: data.feedback.note,
                      onChange: this.handleChange
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
                    className: "col-md",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("label", {
                      htmlFor: "field-receipt",
                      children: "Additional Attachment"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(block_field_upload__WEBPACK_IMPORTED_MODULE_9__["default"], {
                      label: 'Upload',
                      attach_type: "secret",
                      library: false,
                      data: data.feedback.attachment,
                      changeHandler: this.handleUploadChange,
                      remove: false
                    })]
                  })
                })]
              })
            })]
          })
        })
      });
    }
  }]);

  return Feedback;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Feedback);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/list/index.js":
/*!*************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/list/index.js ***!
  \*************************************************************/
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var context_app_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! context/app-context */ "./src/admin/js/react/context/app-context.js");
/* harmony import */ var block_add_new__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! block/add-new */ "./src/admin/js/react/blocks/add-new/index.js");
/* harmony import */ var block_action_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! block/action/table */ "./src/admin/js/react/blocks/action/table/index.js");
/* harmony import */ var block_breadcrumb__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! block/breadcrumb */ "./src/admin/js/react/blocks/breadcrumb/index.js");
/* harmony import */ var block_pagination__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! block/pagination */ "./src/admin/js/react/blocks/pagination/index.js");
/* harmony import */ var block_preloader_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! block/preloader/table */ "./src/admin/js/react/blocks/preloader/table/index.js");
/* harmony import */ var api_invoice__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! api/invoice */ "./src/admin/js/react/api/invoice.js");
/* harmony import */ var api_action__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! api/action */ "./src/admin/js/react/api/action.js");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Table */ "./src/admin/js/react/components/invoice/list/Table.js");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Search */ "./src/admin/js/react/components/invoice/list/Search.js");
/* harmony import */ var block_empty__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! block/empty */ "./src/admin/js/react/blocks/empty/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









var _class;



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




 // import ReactPaginate from 'react-paginate';
// import Preloader from 'block/preloader/table';














var Invoice = (_class = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Invoice, _Component);

  var _super = _createSuper(Invoice);

  function Invoice(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Invoice);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "getLists", function () {
      var searchArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var args = {
        page: _this.state.currentPage,
        per_page: _this.state.perPage
      };
      args.path = _this.state.path;

      if (_this.props.invoice_id) {
        args.invoice_id = _this.props.invoice_id;
      }

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
      api_invoice__WEBPACK_IMPORTED_MODULE_16__["default"].getAll(params).then(function (resp) {
        var result = resp.data.data.result;
        var total = resp.data.data.total;
        var empty = result.length ? false : true;

        _this.setState({
          invoices: result,
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

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "deleteEntry", function (type, index) {
      if (confirm(_this.context.CrudMsg.confirm)) {
        if (type == 'single') {
          /* this.setState({
              invoices: this.state.invoices.filter((invoice, i) => {
                  return invoice.id !== index;
              })
          }); */
        }

        var ids = type == 'single' ? index : _this.state.checkedBoxes.toString();
        api_invoice__WEBPACK_IMPORTED_MODULE_16__["default"].remove(ids).then(function (resp) {
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

          _this.state.invoices.map(function (row) {
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

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "newInvoie", function () {
      _this.props.routeChange();
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__["default"])(_this), "handleAction", function (type, id) {
      if (type == 'sent' || type == 'paid' || type == 'accept' || type == 'decline') {
        api_action__WEBPACK_IMPORTED_MODULE_17__["default"].update(id, {
          type: type
        }).then(function (resp) {
          if (resp.data.success) {
            if (type == 'sent') {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success("Successfully mark as Sent");
            } else if (type == 'paid') {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success("Successfully mark as Paid");
            } else if (type == 'accept') {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success("Successfully mark as Accepted");
            } else if (type == 'decline') {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success("Successfully mark as Declined");
            }

            _this.getLists();
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error(value);
            });
          }
        });
      } else if (type == 'copy' || type == 'copy-to-inv') {
        api_action__WEBPACK_IMPORTED_MODULE_17__["default"].create({
          id: id,
          type: type
        }).then(function (resp) {
          if (resp.data.success) {
            if (type == 'copy') {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success("Successfully copied");

              _this.getLists();
            } else if (type == 'copy-to-inv') {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success("Successfully convert to invoice");
            }
          } else {
            resp.data.data.forEach(function (value, index, array) {
              react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error(value);
            });
          }
        });
      }
    });

    _this.state = {
      title: '',
      path: '',
      empty: false,
      preloader: true,
      formModal: false,
      searchModal: false,
      formModalType: 'new',
      invoice: {
        id: null
      },
      invoices: [],
      summary: {
        total: 0,
        paid: 0,
        unpaid: 0,
        draft: 0,
        sent: 0
      },
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
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Invoice, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var title = this.props.path == '/invoice' ? 'Invoice' : 'Estimate';
      var path = this.props.path == '/invoice' ? 'invoice' : 'estimate';
      this.setState({
        title: title,
        path: path
      }, function () {
        _this2.getLists();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          title = _this$state.title,
          invoices = _this$state.invoices,
          checkedBoxes = _this$state.checkedBoxes,
          searchVal = _this$state.searchVal;
      var _this$state$summary = this.state.summary,
          total = _this$state$summary.total,
          paid = _this$state$summary.paid,
          unpaid = _this$state$summary.unpaid,
          draft = _this$state$summary.draft,
          sent = _this$state$summary.sent;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsxs)("div", {
        className: "ncpi-components",
        children: [!this.props.module_id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(block_breadcrumb__WEBPACK_IMPORTED_MODULE_13__["default"], {
          title: title
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div", {
            className: "col",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("h2", {
              className: "pi-page-title",
              children: title
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div", {
            className: "col",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(block_add_new__WEBPACK_IMPORTED_MODULE_11__["default"], {
              title: title,
              openForm: function openForm() {
                return _this3.newInvoie();
              }
            })
          })]
        }), !this.props.module_id && false && /*#__PURE__*/0, !this.props.module_id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(_Search__WEBPACK_IMPORTED_MODULE_19__["default"], {
          title: title,
          showing: invoices.length,
          showItem: this.showItem,
          total: this.state.total,
          handleSubmit: this.getLists
        }), checkedBoxes.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(block_action_table__WEBPACK_IMPORTED_MODULE_12__["default"], {
          length: checkedBoxes.length,
          uncheckAll: function uncheckAll() {
            return _this3.setState({
              checkedBoxes: []
            });
          },
          deleteEntry: this.deleteEntry
        }), this.state.empty && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(block_empty__WEBPACK_IMPORTED_MODULE_20__["default"], {
          title: title,
          searchVal: searchVal,
          clickHandler: function clickHandler() {
            return _this3.newInvoie();
          }
        }), this.state.preloader ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(block_preloader_table__WEBPACK_IMPORTED_MODULE_15__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(_Table__WEBPACK_IMPORTED_MODULE_18__["default"], {
          reload: this.getLists,
          tableData: invoices,
          checkedBoxes: {
            data: checkedBoxes,
            handle: this.handleCheckbox
          },
          deleteEntry: this.deleteEntry,
          invoice_id: this.props.invoice_id,
          path: this.state.path,
          action: this.handleAction
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)("div", {
          className: "pi-pagination-content",
          children: this.state.totalPage > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(block_pagination__WEBPACK_IMPORTED_MODULE_14__["default"], {
            forcePage: this.state.currentPage - 1,
            pageCount: this.state.totalPage,
            onPageChange: this.handlePageClick
          })
        })]
      });
    }
  }]);

  return Invoice;
}(react__WEBPACK_IMPORTED_MODULE_8__.Component), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(_class, "contextType", context_app_context__WEBPACK_IMPORTED_MODULE_10__["default"]), _class);

function InvoiceWrap(props) {
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_22__.useLocation)();
  var path = location.pathname; //module id is, project, deal id etc

  var module_id = null;

  if (props.path) {
    path = '/' + props.path;
  }

  if (props.module_id) {
    module_id = props.module_id;
  }

  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_22__.useNavigate)();

  var routeChange = function routeChange() {
    if (module_id) {
      navigate("".concat(path, "/single?module_id=").concat(module_id));
    } else {
      navigate("".concat(path, "/single"));
    }
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_21__.jsx)(Invoice, {
      routeChange: routeChange,
      path: path,
      module_id: module_id
    }, path)
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InvoiceWrap);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/list/payment/Bank.js":
/*!********************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/list/payment/Bank.js ***!
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
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var api_payment_process__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! api/payment-process */ "./src/admin/js/react/api/payment-process.js");
/* harmony import */ var block_field_upload__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! block/field/upload */ "./src/admin/js/react/blocks/field/upload/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }









var Bank = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Bank, _Component);

  var _super = _createSuper(Bank);

  function Bank(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Bank);

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

      form.payment_method = 'bank';
      form.invoice_id = _this.props.data.id;
      form.mark_as_paid = true;
      api_payment_process__WEBPACK_IMPORTED_MODULE_9__["default"].create(form).then(function (resp) {
        if (resp.data.success) {
          _this.props.close();

          _this.props.reload();

          react_toastify__WEBPACK_IMPORTED_MODULE_8__.toast.success('Successfully Paid');
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
        payment_details: '',
        receipt: '',
        // amount: '',
        note: '',
        date: ''
      }
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Bank, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.setState({ note: this.props.data.note });
      if (this.state.form.invoice_id != this.props.data.id) {
        this.setState({
          form: this.props.data.payment_info
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
        children: this.props.show && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "pi-overlay pi-show",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "pi-modal-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              className: "pi-modal-header",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h2", {
                className: "pi-modal-title pi-text-center",
                children: "Payment Info"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
                className: "pi-close",
                onClick: function onClick() {
                  return _this2.props.close();
                },
                children: "\xD7"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                className: "pi-form-style-one",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("form", {
                  onSubmit: this.handleSubmit,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                    className: "row",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                      className: "col-lg",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                        htmlFor: "form-payment_details",
                        children: "Payment Details"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("textarea", {
                        id: "form-payment_details",
                        readOnly: true,
                        rows: 4,
                        name: "payment_details",
                        value: this.state.form.payment_details,
                        onChange: this.handleChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                    className: "row",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                      className: "col-md",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                        htmlFor: "field-receipt",
                        children: "Payment Receipt"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(block_field_upload__WEBPACK_IMPORTED_MODULE_10__["default"], {
                        label: 'Upload',
                        attach_type: "secret",
                        permission: true,
                        library: false,
                        data: this.state.form.receipt,
                        changeHandler: this.handleUploadChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                    className: "row",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                      className: "col-lg",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("label", {
                        htmlFor: "form-note",
                        children: "Additional Note"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("textarea", {
                        id: "form-note",
                        rows: 3,
                        name: "note",
                        value: this.state.form.note,
                        onChange: this.handleChange
                      })]
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                    className: "row",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                      className: "col-lg",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("button", {
                        className: "pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto",
                        children: "Mark As Paid"
                      })
                    })
                  })]
                })
              })
            })]
          })
        })
      });
    }
  }]);

  return Bank;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bank);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/list/payment/Paypal.js":
/*!**********************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/list/payment/Paypal.js ***!
  \**********************************************************************/
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
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }







var Paypal = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Paypal, _Component);

  var _super = _createSuper(Paypal);

  function Paypal(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Paypal);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    _this.state = {
      form: {
        invoice_id: null,
        date: '',
        note: ''
      }
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Paypal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.setState({ note: this.props.data.note });
      if (this.state.form.invoice_id != this.props.data.id) {
        this.setState({
          form: this.props.data.payment_info
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
        children: this.props.show && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "pi-overlay pi-show",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "pi-modal-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
              className: "pi-modal-header",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("h2", {
                className: "pi-modal-title pi-text-center",
                children: "Paypal Payment Info"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                className: "pi-close",
                onClick: function onClick() {
                  return _this2.props.close();
                },
                children: "\xD7"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "form-name",
                      children: "Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "form-name",
                      type: "text",
                      required: true,
                      name: "name",
                      value: data.payment_info.billing_address.name.given_name,
                      onChange: this.handleChange
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "form-email",
                      children: "Email"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "form-email",
                      type: "text",
                      required: true,
                      name: "email",
                      value: data.payment_info.billing_address.email_address,
                      onChange: this.handleChange
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("label", {
                      htmlFor: "form-transection_id",
                      children: "Transection ID"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("input", {
                      id: "form-transection_id",
                      type: "text",
                      required: true,
                      name: "transection_id",
                      value: data.payment_info.id,
                      onChange: this.handleChange
                    })]
                  })
                })]
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

/***/ "./src/admin/js/react/components/invoice/list/payment/Stripe.js":
/*!**********************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/list/payment/Stripe.js ***!
  \**********************************************************************/
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






var Stripe = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Stripe, _Component);

  var _super = _createSuper(Stripe);

  function Stripe(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Stripe);

    _this = _super.call(this, props);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this), "handleChange", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.setState({
        form: _objectSpread(_objectSpread({}, _this.state.form), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, name, value))
      });
    });

    _this.state = {
      form: {
        invoice_id: null,
        date: '',
        note: ''
      }
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Stripe, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.setState({ note: this.props.data.note });
      if (this.state.form.invoice_id != this.props.data.id) {
        this.setState({
          form: this.props.data.payment_info
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: this.props.show && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "pi-overlay pi-show",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "pi-modal-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "pi-modal-header",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h2", {
                className: "pi-modal-title pi-text-center",
                children: "Stripe Payment Info"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "pi-close",
                onClick: function onClick() {
                  return _this2.props.close();
                },
                children: "\xD7"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "pi-content",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "pi-form-style-one",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                  className: "row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-name",
                      children: "Name"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-name",
                      type: "text",
                      required: true,
                      name: "name",
                      value: data.payment_info.billing_address.name,
                      onChange: this.handleChange
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-email",
                      children: "Email"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-email",
                      type: "text",
                      required: true,
                      name: "email",
                      value: data.payment_info.billing_address.email,
                      onChange: this.handleChange
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "col-lg",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                      htmlFor: "form-transection_id",
                      children: "Transection ID"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                      id: "form-transection_id",
                      type: "text",
                      required: true,
                      name: "transection_id",
                      value: data.payment_info.id,
                      onChange: this.handleChange
                    })]
                  })
                })]
              })
            })]
          })
        })
      });
    }
  }]);

  return Stripe;
}(react__WEBPACK_IMPORTED_MODULE_7__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Stripe);

/***/ })

}]);