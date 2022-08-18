"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_js_components_dashboard_section_DealFunnel_js"],{

/***/ "./src/js/components/dashboard/section/DealFunnel.js":
/*!***********************************************************!*\
  !*** ./src/js/components/dashboard/section/DealFunnel.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var Summary = function Summary(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    common: [],
    won: null,
    lost: null
  }),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      funnel = _useState2[0],
      setFunnel = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    props.getAll('dashboard', 'section=deal_funnel').then(function (resp) {
      if (resp.data.success) {
        setFunnel(resp.data.data);
      }
    });
  }, []);
  var funnelColor = ["#d6defa", "#acbef4", "#829dee", "#5b7cea"];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "pi-punnel pi-border-gray",
    style: {
      minHeight: '435px',
      marginBottom: '30px'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
      className: "pi-title-medium pi-mb-20",
      style: {
        fontWeight: "bold",
        color: "#718096"
      },
      children: "Deal Funnel"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("ul", {
      children: [funnel.common.map(function (item, i) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
          style: {
            color: i < 2 ? '#4A5568' : '',
            backgroundColor: i < 4 ? funnelColor[i] : '#345bde',
            width: item.percent
          },
          children: [item.name, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
            children: item.items
          })]
        }, i);
      }), funnel.won && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
        style: {
          backgroundColor: "#345bde"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          children: funnel.won.items
        }), " Deal Won"]
      })]
    }), funnel.lost && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
      className: "pi-text-center",
      children: ["Deal Lost ", funnel.lost.items]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Summary);

/***/ })

}]);