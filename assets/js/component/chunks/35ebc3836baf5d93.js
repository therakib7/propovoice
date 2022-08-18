"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_js_inv-template_Feedback_js"],{

/***/ "./src/js/inv-template/Feedback.js":
/*!*****************************************!*\
  !*** ./src/js/inv-template/Feedback.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (props) {
  var status = false;
  var title, desc;
  var extraColor = '';

  switch (props.status) {
    case 'accept':
      status = true;
      title = 'Accepted';
      desc = 'Thanks for accepting';
      extraColor = '#00a74d';
      break;

    case 'decline':
      status = true;
      title = 'Declined';
      desc = 'Sorry for the decline';
      break;
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: status && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "pi-inv-feedback",
      style: {
        maxWidth: '794px',
        margin: '0 auto 30px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "pi-badge-style-two",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
          style: {
            color: extraColor
          },
          children: title
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: desc
        })]
      })
    })
  });
});

/***/ })

}]);