(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_invoice_invoice-single_index_js"],{

/***/ "./src/admin/js/react/components/invoice/invoice-single/index.js":
/*!***********************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/invoice-single/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/admin/js/react/components/invoice/invoice-single/style.scss");
/* harmony import */ var _tab_invoice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab/invoice */ "./src/admin/js/react/components/invoice/invoice-single/tab/invoice/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







function InvoiceWrap() {
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useParams)(),
      id = _useParams.id;

  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useNavigate)();

  var routeChange = function routeChange(id) {
    navigate("/invoice/single/".concat(id), {
      replace: true
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_tab_invoice__WEBPACK_IMPORTED_MODULE_2__["default"], {
      id: id,
      routeChange: routeChange
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InvoiceWrap);

/***/ }),

/***/ "./src/admin/js/react/components/invoice/invoice-single/tab/invoice/index.js":
/*!***********************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/invoice-single/tab/invoice/index.js ***!
  \***********************************************************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/src/admin/js/react/components/invoice/invoice-single/tab/invoice/index.js: Legacy octal literals are not allowed in strict mode. (538:27)\n\n\u001b[0m \u001b[90m 536 |\u001b[39m \t\t\t\t\t\t\t\t\t\t\t\t\t\tid\u001b[33m=\u001b[39m\u001b[32m\"fname\"\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 537 |\u001b[39m \t\t\t\t\t\t\t\t\t\t\t\t\t\tname\u001b[33m=\u001b[39m\u001b[32m\"firstname\"\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 538 |\u001b[39m \t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder\u001b[33m=\u001b[39m{\u001b[35m0001\u001b[39m}\u001b[0m\n\u001b[0m \u001b[90m     |\u001b[39m \t\t\t\t\t\t\t\t\t\t\t\t\t\t             \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 539 |\u001b[39m \t\t\t\t\t\t\t\t\t\t\t\t\t\u001b[33m/\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 540 |\u001b[39m \t\t\t\t\t\t\t\t\t\t\t\t\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mdiv\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 541 |\u001b[39m \t\t\t\t\t\t\t\t\t\t\t\u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mdiv\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n    at Object._raise (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:476:17)\n    at Object.raiseWithData (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:469:17)\n    at Object.raise (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:430:17)\n    at Object.recordStrictModeErrors (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:3215:12)\n    at Object.readNumber (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:2988:12)\n    at Object.getTokenFromCode (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:2693:14)\n    at Object.getTokenFromCode (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:7848:18)\n    at Object.nextToken (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:2100:10)\n    at Object.next (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:2001:10)\n    at Object.jsxParseAttributeValue (/home/rakib/Local Sites/nurencyplugins/app/public/wp-content/plugins/propovoice/node_modules/@babel/parser/lib/index.js:7603:14)");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/admin/js/react/components/invoice/invoice-single/style.scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/admin/js/react/components/invoice/invoice-single/style.scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ncpi .pi-right-content {\n  width: 100%;\n  background-color: #E5E5E5;\n}\n\n.ncpi .pi-grid-container {\n  display: flex;\n  grid-template-columns: auto auto auto;\n}\n\n.ncpi .pi-right-content {\n  padding: 30px 70px;\n}\n\n.ncpi .pi-right-content h1 {\n  margin-bottom: 10px;\n  margin-top: 0;\n}\n\n.ncpi .pi-text-hover-blue.pi-float-right {\n  background-color: transparent;\n}\n\n.ncpi .pi-empty-content {\n  margin-top: 90px;\n}\n\n.ncpi .pi-empty-content img {\n  margin-bottom: 20px;\n}\n\n.ncpi .pi-empty-content h4 {\n  font-size: 20px;\n  font-weight: 700;\n  margin-bottom: 25px;\n}\n\n@media screen and (max-width: 992px) {\n  .ncpi .pi-right-content {\n    padding: 30px;\n    padding-top: 50px;\n  }\n}\n@media screen and (max-width: 500px) {\n  .ncpi .pi-search-box.pi-float-right {\n    margin-top: 15px;\n    float: left;\n  }\n}\n.ncpi .pi-single-image-content {\n  position: relative;\n}\n\n.ncpi .pi-single-image {\n  opacity: 1;\n  display: block;\n  width: 100%;\n  height: auto;\n  transition: 0.5s ease;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n\n.ncpi .pi-single-image-current.pi-active {\n  border: 5px solid var(--bg-color-blue);\n  border-radius: 15px;\n}\n\n.ncpi .pi-overflow-content {\n  transition: 0.5s ease;\n  opacity: 0;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  text-align: center;\n  width: 100%;\n  height: 100%;\n  background-color: #0a0a0a61;\n  border-radius: 10px;\n}\n\n.ncpi .pi-single-image-content:hover .pi-single-image {\n  opacity: 0.3;\n}\n\n.ncpi .pi-single-image-content:hover .pi-overflow-content {\n  opacity: 1;\n}\n\n.ncpi .pi-single-image-content a {\n  transform: translateY(-113%);\n  width: 110px;\n  display: block;\n  margin: auto;\n  top: 50%;\n  position: relative;\n  padding: 10px 15px;\n  font-size: 12px;\n}\n\n.ncpi .pi-single-image-content .pi-bg-hover-blue:hover {\n  background-color: #4e6de9 !important;\n  color: var(--bg-color-white);\n}\n\n.ncpi .pi-single-image-content a:last-child {\n  background-color: var(--bg-color-white);\n  color: var(--bg-color-black);\n  margin-top: 10px;\n}\n\n.ncpi .pi-add-info-content {\n  padding: 25px 50px;\n  border-radius: 20px;\n}\n\n.ncpi .pi-add-info-content input[type=text] {\n  width: 100%;\n  padding: 10px;\n  border: 1px solid #CBD5E0;\n  border-radius: 4px;\n  font-size: 10px;\n  background-color: #fff;\n}\n\n.ncpi .pi-add-info-content h3 {\n  font-size: 24px;\n  font-weight: 700;\n  margin-bottom: 10px;\n}\n\n.ncpi .pi-info-content {\n  padding: 20px;\n  border-radius: 20px;\n}\n\n.ncpi .pi-info-logo img {\n  width: 125px;\n  height: 125px;\n  border-radius: 8px;\n  padding: 10px;\n  border-radius: 5px;\n  border: 1px dotted;\n}\n\n.ncpi .pi-info-form {\n  float: right;\n}\n\n.ncpi label {\n  padding: 12px 12px 12px 0;\n  display: inline-block;\n  font-size: 12px;\n}\n\n.ncpi input[type=submit]:hover {\n  background-color: #45a049;\n}\n\n.ncpi .container {\n  border-radius: 5px;\n  background-color: #f2f2f2;\n  padding: 20px;\n}\n\n.ncpi .p-info-lavel {\n  width: 45%;\n  margin-top: 3px;\n  text-align: right;\n}\n\n.ncpi .pi-fnfo-input-field {\n  float: left;\n  width: 50%;\n  margin-top: 6px;\n  text-align: right;\n}\n\n@media screen and (max-width: 768px) {\n  .ncpi .pi-info-content .pi-info-logo {\n    text-align: center;\n    margin-top: 10px;\n    margin-bottom: 20px;\n  }\n\n  .ncpi .pi-info-content .pi-info-form {\n    float: none;\n  }\n}\n.ncpi .pi-from-content {\n  padding: 35px 30px;\n}\n\n.ncpi .pi-from-content .recive-title {\n  margin-top: 0;\n  margin-bottom: 4px;\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.ncpi .pi-from-content .pi-to,\n.ncpi .pi-from-content .pi-from {\n  padding: 10px 20px;\n  border-radius: 15px;\n  border: 1px solid #CBD5E0;\n}\n\n.ncpi .pi-from-content .pi-from {\n  width: 72%;\n}\n\n.ncpi .pi-from-content select {\n  border: none;\n  font-size: 12px;\n  margin-bottom: 15px;\n  font-weight: 700;\n  outline: none;\n}\n\n.ncpi .pi-from-content .from-title {\n  font-size: 14px;\n  font-weight: 700;\n}\n\n.ncpi .pi-from-content .from-title span {\n  margin-left: 30px;\n  font-size: 12px;\n  font-weight: 400;\n  border: 1px solid #CBD5E0;\n  padding: 6px 10px;\n  border-radius: 4px;\n  position: relative;\n  top: 2px;\n  background-color: #fff;\n  cursor: pointer;\n}\n\n.ncpi .pi-from-content .from-title svg {\n  margin-right: 10px;\n}\n\n.ncpi .pi-from-content address {\n  font-size: 12px;\n  font-style: normal;\n  line-height: 25px;\n}\n\n.info-table-content table {\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.info-table-content th, .info-table-content td {\n  text-align: left;\n  padding: 15px 20px;\n}\n\n.info-table-content th {\n  width: 30%;\n}\n\n.info-table-content tr:nth-child(odd) {\n  background-color: #f8f8f8;\n}\n\n.info-table-content td:first-child input[type=text] {\n  width: 100%;\n}\n\n.info-table-content td input[type=text] {\n  width: 70px;\n  padding: 10px;\n  border: 1px solid #CBD5E0;\n  border-radius: 4px;\n  background-color: #fff;\n}\n\n.info-table-content td select {\n  width: 65px;\n  padding: 10px;\n  border: 1px solid #CBD5E0;\n  border-radius: 4px;\n  font-size: 10px;\n  background-color: var(--text-color-air-white);\n}\n\n.info-table-content tr td:nth-child(3) input[type=text],\n.info-table-content tr td:nth-child(2) input[type=text] {\n  float: left;\n  font-size: 12px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/admin/js/react/components/invoice/invoice-single/style.scss":
/*!*************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/invoice-single/style.scss ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!../../../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!../../../../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./style.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[1].use[3]!./src/admin/js/react/components/invoice/invoice-single/style.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_style_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_9_oneOf_1_use_3_style_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);