"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_js_components_invoice_single_tab_invoice_sidebar_Style_js"],{

/***/ "./src/js/blocks/color-picker/index.js":
/*!*********************************************!*\
  !*** ./src/js/blocks/color-picker/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_colorful__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-colorful */ "./node_modules/react-colorful/dist/index.module.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/js/blocks/color-picker/style.scss");
/* harmony import */ var block_outside_click__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! block/outside-click */ "./src/js/blocks/outside-click/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (_ref) {
  var color = _ref.color,
      onChange = _ref.onChange;
  var popover = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      colorPicker = _useState2[0],
      SetColorPicker = _useState2[1];

  var close = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    return SetColorPicker(false);
  }, []);
  (0,block_outside_click__WEBPACK_IMPORTED_MODULE_3__["default"])(popover, close);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "pi-field-color-picker",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        style: {
          background: "#edf2f7"
        },
        onClick: function onClick() {
          return onChange('');
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("svg", {
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
            d: "M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z",
            stroke: "#718096",
            strokeWidth: "1.5",
            strokeMiterlimit: 10
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
            d: "M17.5452 5.88672L6.29517 17.8867",
            stroke: "#718096",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        style: {
          backgroundColor: '#f16063'
        },
        onClick: function onClick() {
          return onChange('#f16063');
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        style: {
          backgroundColor: '#f7936f'
        },
        onClick: function onClick() {
          return onChange('#f7936f');
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        style: {
          backgroundColor: '#4c6fff'
        },
        onClick: function onClick() {
          return onChange('#4c6fff');
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        style: {
          backgroundColor: '#18954d'
        },
        onClick: function onClick() {
          return onChange('#18954d');
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        style: {
          backgroundColor: color ? color : '#edf2f7'
        },
        onClick: function onClick() {
          return SetColorPicker(true);
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("svg", {
          width: 24,
          height: 24,
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
            d: "M16.8562 10.8556L17.3155 11.315C17.5938 11.5974 17.7498 11.9779 17.7498 12.3744C17.7498 12.7708 17.5938 13.1513 17.3155 13.4337L16.6593 14.09C16.5895 14.1609 16.5063 14.2171 16.4146 14.2555C16.3228 14.294 16.2244 14.3137 16.1249 14.3137C16.0255 14.3137 15.927 14.294 15.8353 14.2555C15.7435 14.2171 15.6603 14.1609 15.5905 14.09L9.90929 8.40874C9.83843 8.33895 9.78215 8.25577 9.74374 8.16403C9.70533 8.07229 9.68555 7.97382 9.68555 7.87437C9.68555 7.77491 9.70533 7.67644 9.74374 7.5847C9.78215 7.49296 9.83843 7.40978 9.90929 7.33999L10.5655 6.68374C10.8479 6.40549 11.2285 6.24951 11.6249 6.24951C12.0214 6.24951 12.4019 6.40549 12.6843 6.68374L13.1437 7.14312L15.7312 4.55562C16.7437 3.54312 18.3937 3.48687 19.4249 4.47124C19.6795 4.71202 19.8833 5.00134 20.0243 5.32213C20.1653 5.64292 20.2406 5.9887 20.2458 6.33907C20.2511 6.68943 20.1861 7.03731 20.0548 7.36217C19.9235 7.68704 19.7284 7.98232 19.4812 8.23062L16.8562 10.8556Z",
            stroke: "#718096",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
            d: "M14.8684 13.3684L9.61835 18.6184C9.24788 18.9933 8.78434 19.263 8.27529 19.3997C7.76623 19.5365 7.22996 19.5353 6.72148 19.3965L4.52773 20.3527C4.39091 20.4127 4.23929 20.4305 4.0923 20.4038C3.94532 20.3771 3.80966 20.3071 3.70273 20.2027V20.2027C3.62495 20.1262 3.57248 20.0276 3.55237 19.9204C3.53225 19.8131 3.54547 19.7023 3.59023 19.6027L4.60273 17.2777C4.46387 16.7692 4.46276 16.233 4.5995 15.7239C4.73623 15.2149 5.0059 14.7513 5.38085 14.3809L10.6309 9.13086",
            stroke: "#718096",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })]
        })
      })]
    }), colorPicker && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "pi-popover",
      ref: popover,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_colorful__WEBPACK_IMPORTED_MODULE_5__.HexColorPicker, {
        color: color,
        onChange: onChange
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        style: {
          marginRight: '2px',
          width: 'auto'
        },
        children: "#"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_colorful__WEBPACK_IMPORTED_MODULE_5__.HexColorInput, {
        color: color,
        onChange: onChange
      })]
    })]
  });
});

/***/ }),

/***/ "./src/js/components/invoice/single/tab/invoice/sidebar/Style.js":
/*!***********************************************************************!*\
  !*** ./src/js/components/invoice/single/tab/invoice/sidebar/Style.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var block_color_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! block/color-picker */ "./src/js/blocks/color-picker/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (props) {
  var handleChange = function handleChange(val) {
    var style = _objectSpread({}, props.data.style);

    style.primary_color = val;
    props.handleChange(style);
  };

  var color = props.data.style.primary_color;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "pi-form-style-one pi-edit",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "row",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "col-12",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
          htmlFor: "name",
          children: "Edit clolor"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(block_color_picker__WEBPACK_IMPORTED_MODULE_1__["default"], {
          color: color,
          onChange: handleChange
        })]
      })
    })
  });
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[3]!./src/js/blocks/color-picker/style.scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[3]!./src/js/blocks/color-picker/style.scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".pi-popover {\n  display: inline-block;\n}\n.pi-popover .react-colorful {\n  width: 210px;\n  margin-top: 20px;\n  border-radius: 8px;\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n}\n.pi-popover input {\n  border: 1px solid #dfdfdf;\n  margin-top: 13px;\n  border-radius: 5px;\n  padding: 10px;\n  width: 80px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/react-colorful/dist/index.module.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-colorful/dist/index.module.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HexColorInput": () => (/* binding */ Ne),
/* harmony export */   "HexColorPicker": () => (/* binding */ J),
/* harmony export */   "HslColorPicker": () => (/* binding */ ne),
/* harmony export */   "HslStringColorPicker": () => (/* binding */ ae),
/* harmony export */   "HslaColorPicker": () => (/* binding */ Z),
/* harmony export */   "HslaStringColorPicker": () => (/* binding */ re),
/* harmony export */   "HsvColorPicker": () => (/* binding */ fe),
/* harmony export */   "HsvStringColorPicker": () => (/* binding */ de),
/* harmony export */   "HsvaColorPicker": () => (/* binding */ ue),
/* harmony export */   "HsvaStringColorPicker": () => (/* binding */ ie),
/* harmony export */   "RgbColorPicker": () => (/* binding */ _e),
/* harmony export */   "RgbStringColorPicker": () => (/* binding */ Ce),
/* harmony export */   "RgbaColorPicker": () => (/* binding */ me),
/* harmony export */   "RgbaStringColorPicker": () => (/* binding */ pe),
/* harmony export */   "setNonce": () => (/* binding */ Y)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function u(){return(u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function c(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r.indexOf(t=a[n])>=0||(o[t]=e[t]);return o}function i(e){var t=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(e),n=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(function(e){t.current&&t.current(e)});return t.current=e,n.current}var s=function(e,r,t){return void 0===r&&(r=0),void 0===t&&(t=1),e>t?t:e<r?r:e},f=function(e){return"touches"in e},v=function(e){return e&&e.ownerDocument.defaultView||self},d=function(e,r,t){var n=e.getBoundingClientRect(),o=f(r)?function(e,r){for(var t=0;t<e.length;t++)if(e[t].identifier===r)return e[t];return e[0]}(r.touches,t):r;return{left:s((o.pageX-(n.left+v(e).pageXOffset))/n.width),top:s((o.pageY-(n.top+v(e).pageYOffset))/n.height)}},h=function(e){!f(e)&&e.preventDefault()},m=react__WEBPACK_IMPORTED_MODULE_0__.memo(function(o){var a=o.onMove,l=o.onKey,s=c(o,["onMove","onKey"]),m=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),g=i(a),p=i(l),b=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),_=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),x=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function(){var e=function(e){h(e),(f(e)?e.touches.length>0:e.buttons>0)&&m.current?g(d(m.current,e,b.current)):t(!1)},r=function(){return t(!1)};function t(t){var n=_.current,o=v(m.current),a=t?o.addEventListener:o.removeEventListener;a(n?"touchmove":"mousemove",e),a(n?"touchend":"mouseup",r)}return[function(e){var r=e.nativeEvent,n=m.current;if(n&&(h(r),!function(e,r){return r&&!f(e)}(r,_.current)&&n)){if(f(r)){_.current=!0;var o=r.changedTouches||[];o.length&&(b.current=o[0].identifier)}n.focus(),g(d(n,r,b.current)),t(!0)}},function(e){var r=e.which||e.keyCode;r<37||r>40||(e.preventDefault(),p({left:39===r?.05:37===r?-.05:0,top:40===r?.05:38===r?-.05:0}))},t]},[p,g]),C=x[0],E=x[1],H=x[2];return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function(){return H},[H]),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",u({},s,{onTouchStart:C,onMouseDown:C,className:"react-colorful__interactive",ref:m,onKeyDown:E,tabIndex:0,role:"slider"}))}),g=function(e){return e.filter(Boolean).join(" ")},p=function(r){var t=r.color,n=r.left,o=r.top,a=void 0===o?.5:o,l=g(["react-colorful__pointer",r.className]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:l,style:{top:100*a+"%",left:100*n+"%"}},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"react-colorful__pointer-fill",style:{backgroundColor:t}}))},b=function(e,r,t){return void 0===r&&(r=0),void 0===t&&(t=Math.pow(10,r)),Math.round(t*e)/t},_={grad:.9,turn:360,rad:360/(2*Math.PI)},x=function(e){return"#"===e[0]&&(e=e.substr(1)),e.length<6?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:1}:{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:1}},C=function(e,r){return void 0===r&&(r="deg"),Number(e)*(_[r]||1)},E=function(e){var r=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?M({h:C(r[1],r[2]),s:Number(r[3]),l:Number(r[4]),a:void 0===r[5]?1:Number(r[5])/(r[6]?100:1)}):{h:0,s:0,v:0,a:1}},H=E,M=function(e){var r=e.s,t=e.l;return{h:e.h,s:(r*=(t<50?t:100-t)/100)>0?2*r/(t+r)*100:0,v:t+r,a:e.a}},N=function(e){var r=e.s,t=e.v,n=e.a,o=(200-r)*t/100;return{h:b(e.h),s:b(o>0&&o<200?r*t/100/(o<=100?o:200-o)*100:0),l:b(o/2),a:b(n,2)}},w=function(e){var r=N(e);return"hsl("+r.h+", "+r.s+"%, "+r.l+"%)"},y=function(e){var r=N(e);return"hsla("+r.h+", "+r.s+"%, "+r.l+"%, "+r.a+")"},q=function(e){var r=e.h,t=e.s,n=e.v,o=e.a;r=r/360*6,t/=100,n/=100;var a=Math.floor(r),l=n*(1-t),u=n*(1-(r-a)*t),c=n*(1-(1-r+a)*t),i=a%6;return{r:b(255*[n,u,l,l,c,n][i]),g:b(255*[c,n,n,u,l,l][i]),b:b(255*[l,l,c,n,n,u][i]),a:b(o,2)}},k=function(e){var r=/hsva?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?D({h:C(r[1],r[2]),s:Number(r[3]),v:Number(r[4]),a:void 0===r[5]?1:Number(r[5])/(r[6]?100:1)}):{h:0,s:0,v:0,a:1}},O=k,I=function(e){var r=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return r?B({r:Number(r[1])/(r[2]?100/255:1),g:Number(r[3])/(r[4]?100/255:1),b:Number(r[5])/(r[6]?100/255:1),a:void 0===r[7]?1:Number(r[7])/(r[8]?100:1)}):{h:0,s:0,v:0,a:1}},j=I,z=function(e){var r=e.toString(16);return r.length<2?"0"+r:r},B=function(e){var r=e.r,t=e.g,n=e.b,o=e.a,a=Math.max(r,t,n),l=a-Math.min(r,t,n),u=l?a===r?(t-n)/l:a===t?2+(n-r)/l:4+(r-t)/l:0;return{h:b(60*(u<0?u+6:u)),s:b(a?l/a*100:0),v:b(a/255*100),a:o}},D=function(e){return{h:b(e.h),s:b(e.s),v:b(e.v),a:b(e.a,2)}},K=react__WEBPACK_IMPORTED_MODULE_0__.memo(function(r){var t=r.hue,n=r.onChange,o=g(["react-colorful__hue",r.className]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:o},react__WEBPACK_IMPORTED_MODULE_0__.createElement(m,{onMove:function(e){n({h:360*e.left})},onKey:function(e){n({h:s(t+360*e.left,0,360)})},"aria-label":"Hue","aria-valuetext":b(t)},react__WEBPACK_IMPORTED_MODULE_0__.createElement(p,{className:"react-colorful__hue-pointer",left:t/360,color:w({h:t,s:100,v:100,a:1})})))}),L=react__WEBPACK_IMPORTED_MODULE_0__.memo(function(r){var t=r.hsva,n=r.onChange,o={backgroundColor:w({h:t.h,s:100,v:100,a:1})};return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"react-colorful__saturation",style:o},react__WEBPACK_IMPORTED_MODULE_0__.createElement(m,{onMove:function(e){n({s:100*e.left,v:100-100*e.top})},onKey:function(e){n({s:s(t.s+100*e.left,0,100),v:s(t.v-100*e.top,0,100)})},"aria-label":"Color","aria-valuetext":"Saturation "+b(t.s)+"%, Brightness "+b(t.v)+"%"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(p,{className:"react-colorful__saturation-pointer",top:1-t.v/100,left:t.s/100,color:w(t)})))}),A=function(e,r){if(e===r)return!0;for(var t in e)if(e[t]!==r[t])return!1;return!0},S=function(e,r){return e.replace(/\s/g,"")===r.replace(/\s/g,"")};function T(e,t,l){var u=i(l),c=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function(){return e.toHsva(t)}),s=c[0],f=c[1],v=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({color:t,hsva:s});(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function(){if(!e.equal(t,v.current.color)){var r=e.toHsva(t);v.current={hsva:r,color:t},f(r)}},[t,e]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function(){var r;A(s,v.current.hsva)||e.equal(r=e.fromHsva(s),v.current.color)||(v.current={hsva:s,color:r},u(r))},[s,e,u]);var d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(e){f(function(r){return Object.assign({},r,e)})},[]);return[s,d]}var F,P="undefined"!=typeof window?react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_0__.useEffect,X=function(){return F||( true?__webpack_require__.nc:0)},Y=function(e){F=e},R=new Map,V=function(e){P(function(){var r=e.current?e.current.ownerDocument:document;if(void 0!==r&&!R.has(r)){var t=r.createElement("style");t.innerHTML='.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>\')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}',R.set(r,t);var n=X();n&&t.setAttribute("nonce",n),r.head.appendChild(t)}},[])},$=function(t){var n=t.className,o=t.colorModel,a=t.color,l=void 0===a?o.defaultColor:a,i=t.onChange,s=c(t,["className","colorModel","color","onChange"]),f=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);V(f);var v=T(o,l,i),d=v[0],h=v[1],m=g(["react-colorful",n]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",u({},s,{ref:f,className:m}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(L,{hsva:d,onChange:h}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(K,{hue:d.h,onChange:h,className:"react-colorful__last-control"}))},G={defaultColor:"000",toHsva:function(e){return B(x(e))},fromHsva:function(e){return t=(r=q(e)).g,n=r.b,"#"+z(r.r)+z(t)+z(n);var r,t,n},equal:function(e,r){return e.toLowerCase()===r.toLowerCase()||A(x(e),x(r))}},J=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement($,u({},r,{colorModel:G}))},Q=function(r){var t=r.className,n=r.hsva,o=r.onChange,a={backgroundImage:"linear-gradient(90deg, "+y(Object.assign({},n,{a:0}))+", "+y(Object.assign({},n,{a:1}))+")"},l=g(["react-colorful__alpha",t]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:l},react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"react-colorful__alpha-gradient",style:a}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(m,{onMove:function(e){o({a:e.left})},onKey:function(e){o({a:s(n.a+e.left)})},"aria-label":"Alpha","aria-valuetext":b(100*n.a)+"%"},react__WEBPACK_IMPORTED_MODULE_0__.createElement(p,{className:"react-colorful__alpha-pointer",left:n.a,color:y(n)})))},U=function(t){var n=t.className,o=t.colorModel,a=t.color,l=void 0===a?o.defaultColor:a,i=t.onChange,s=c(t,["className","colorModel","color","onChange"]),f=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);V(f);var v=T(o,l,i),d=v[0],h=v[1],m=g(["react-colorful",n]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",u({},s,{ref:f,className:m}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(L,{hsva:d,onChange:h}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(K,{hue:d.h,onChange:h}),react__WEBPACK_IMPORTED_MODULE_0__.createElement(Q,{hsva:d,onChange:h,className:"react-colorful__last-control"}))},W={defaultColor:{h:0,s:0,l:0,a:1},toHsva:M,fromHsva:N,equal:A},Z=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(U,u({},r,{colorModel:W}))},ee={defaultColor:"hsla(0, 0%, 0%, 1)",toHsva:E,fromHsva:y,equal:S},re=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(U,u({},r,{colorModel:ee}))},te={defaultColor:{h:0,s:0,l:0},toHsva:function(e){return M({h:e.h,s:e.s,l:e.l,a:1})},fromHsva:function(e){return{h:(r=N(e)).h,s:r.s,l:r.l};var r},equal:A},ne=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement($,u({},r,{colorModel:te}))},oe={defaultColor:"hsl(0, 0%, 0%)",toHsva:H,fromHsva:w,equal:S},ae=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement($,u({},r,{colorModel:oe}))},le={defaultColor:{h:0,s:0,v:0,a:1},toHsva:function(e){return e},fromHsva:D,equal:A},ue=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(U,u({},r,{colorModel:le}))},ce={defaultColor:"hsva(0, 0%, 0%, 1)",toHsva:k,fromHsva:function(e){var r=D(e);return"hsva("+r.h+", "+r.s+"%, "+r.v+"%, "+r.a+")"},equal:S},ie=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(U,u({},r,{colorModel:ce}))},se={defaultColor:{h:0,s:0,v:0},toHsva:function(e){return{h:e.h,s:e.s,v:e.v,a:1}},fromHsva:function(e){var r=D(e);return{h:r.h,s:r.s,v:r.v}},equal:A},fe=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement($,u({},r,{colorModel:se}))},ve={defaultColor:"hsv(0, 0%, 0%)",toHsva:O,fromHsva:function(e){var r=D(e);return"hsv("+r.h+", "+r.s+"%, "+r.v+"%)"},equal:S},de=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement($,u({},r,{colorModel:ve}))},he={defaultColor:{r:0,g:0,b:0,a:1},toHsva:B,fromHsva:q,equal:A},me=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(U,u({},r,{colorModel:he}))},ge={defaultColor:"rgba(0, 0, 0, 1)",toHsva:I,fromHsva:function(e){var r=q(e);return"rgba("+r.r+", "+r.g+", "+r.b+", "+r.a+")"},equal:S},pe=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement(U,u({},r,{colorModel:ge}))},be={defaultColor:{r:0,g:0,b:0},toHsva:function(e){return B({r:e.r,g:e.g,b:e.b,a:1})},fromHsva:function(e){return{r:(r=q(e)).r,g:r.g,b:r.b};var r},equal:A},_e=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement($,u({},r,{colorModel:be}))},xe={defaultColor:"rgb(0, 0, 0)",toHsva:j,fromHsva:function(e){var r=q(e);return"rgb("+r.r+", "+r.g+", "+r.b+")"},equal:S},Ce=function(r){return react__WEBPACK_IMPORTED_MODULE_0__.createElement($,u({},r,{colorModel:xe}))},Ee=/^#?([0-9A-F]{3,8})$/i,He=function(r){var t=r.color,l=void 0===t?"":t,s=r.onChange,f=r.onBlur,v=r.escape,d=r.validate,h=r.format,m=r.process,g=c(r,["color","onChange","onBlur","escape","validate","format","process"]),p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function(){return v(l)}),b=p[0],_=p[1],x=i(s),C=i(f),E=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(e){var r=v(e.target.value);_(r),d(r)&&x(m?m(r):r)},[v,m,d,x]),H=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(e){d(e.target.value)||_(v(l)),C(e)},[l,v,d,C]);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function(){_(v(l))},[l,v]),react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",u({},g,{value:h?h(b):b,spellCheck:"false",onChange:E,onBlur:H}))},Me=function(e){return"#"+e},Ne=function(r){var t=r.prefixed,n=r.alpha,o=c(r,["prefixed","alpha"]),l=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(e){return e.replace(/([^0-9A-F]+)/gi,"").substr(0,n?8:6)},[n]),i=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function(e){return function(e,r){var t=Ee.exec(e),n=t?t[1].length:0;return 3===n||6===n||!!r&&4===n||!!r&&8===n}(e,n)},[n]);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(He,u({},o,{escape:l,format:t?Me:void 0,process:Me,validate:i}))};
//# sourceMappingURL=index.module.js.map


/***/ }),

/***/ "./src/js/blocks/color-picker/style.scss":
/*!***********************************************!*\
  !*** ./src/js/blocks/color-picker/style.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_3_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[3]!./style.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[3]!./src/js/blocks/color-picker/style.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_3_style_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_3_style_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);