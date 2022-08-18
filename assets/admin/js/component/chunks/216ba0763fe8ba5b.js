"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_dashboard_chart_Bar_js"],{

/***/ "./src/admin/js/react/components/dashboard/chart/Bar.js":
/*!**************************************************************!*\
  !*** ./src/admin/js/react/components/dashboard/chart/Bar.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Example)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }







var Example = /*#__PURE__*/function (_PureComponent) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Example, _PureComponent);

  var _super = _createSuper(Example);

  function Example(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Example);

    _this = _super.call(this, props);
    _this.state = {
      data: []
    };
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Example, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var data = [];

      if (this.props.type == 'estimate') {
        data = [{
          name: 'Jan',
          Sent: 4000,
          Viewed: 2400,
          Accepted: 2400,
          Rejected: 2400
        }, {
          name: 'Feb',
          Sent: 3000,
          Viewed: 1398,
          Accepted: 2210,
          Rejected: 1400
        }, {
          name: 'Mar',
          Sent: 2000,
          Viewed: 3800,
          Accepted: 2290,
          Rejected: 2600
        }, {
          name: 'Apr',
          Sent: 2780,
          Viewed: 3908,
          Accepted: 2000,
          Rejected: 1400
        }, {
          name: 'May',
          Sent: 1890,
          Viewed: 4800,
          Accepted: 2181,
          Rejected: 900
        }, {
          name: 'Jun',
          Sent: 2390,
          Viewed: 3800,
          Accepted: 2500,
          Rejected: 700
        }];
      } else {
        data = [{
          name: 'Jan',
          Sent: 4000,
          Viewed: 2400,
          Paid: 2400,
          OverDue: 2400
        }, {
          name: 'Feb',
          Sent: 3000,
          Viewed: 1398,
          Paid: 2210,
          OverDue: 1400
        }, {
          name: 'Mar',
          Sent: 2000,
          Viewed: 3800,
          Paid: 2290,
          OverDue: 2600
        }, {
          name: 'Apr',
          Sent: 2780,
          Viewed: 3908,
          Paid: 2000,
          OverDue: 1400
        }, {
          name: 'May',
          Sent: 1890,
          Viewed: 4800,
          Paid: 2181,
          OverDue: 900
        }, {
          name: 'Jun',
          Sent: 2390,
          Viewed: 3800,
          Paid: 2500,
          OverDue: 700
        }];
      }

      this.setState({
        data: data
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "pi-widget pi-summery pi-bg-white pi-border-gray",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h3", {
          className: "pi-title-medium pi-mb-20",
          style: {
            fontWeight: "bold",
            color: "#718096"
          },
          children: this.props.type == 'estimate' ? 'Estimate' : 'Invoice'
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          style: {
            width: '100%',
            height: '300px'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
            width: "100%",
            height: "100%",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
              width: 500,
              height: 300,
              data: this.state.data,
              margin: {
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                strokeDasharray: "3 3"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                dataKey: "name"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                dataKey: "Sent",
                fill: "#82ca9d"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                dataKey: "Viewed",
                fill: "#8884d8"
              }), this.props.type == 'estimate' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                  dataKey: "Accepted",
                  fill: "#00C49F"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                  dataKey: "Rejected",
                  fill: "#FFBB28"
                })]
              }), this.props.type == 'invoice' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                  dataKey: "Paid",
                  fill: "#00C49F"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recharts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
                  dataKey: "OverDue",
                  fill: "#FFBB28"
                })]
              })]
            })
          })
        })]
      });
    }
  }]);

  return Example;
}(react__WEBPACK_IMPORTED_MODULE_5__.PureComponent);



/***/ })

}]);