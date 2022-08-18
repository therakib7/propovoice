"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_js_components_invoice_single_tab_invoice_sidebar_Reminder_js"],{

/***/ "./src/js/components/invoice/single/tab/invoice/sidebar/Reminder.js":
/*!**************************************************************************!*\
  !*** ./src/js/components/invoice/single/tab/invoice/sidebar/Reminder.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (props) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!props.id) {
      var path = props.path;
      props.getAll('settings', 'tab=' + path + '_reminder').then(function (resp) {
        if (resp.data.success) {
          props.handleDefault(resp.data.data);
        }
      });
    }
  }, []);

  var handleChange = function handleChange(e) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    props.handleChange(e, type);
  };

  var reminder = props.data;
  var i18n = ndpi.i18n;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "pi-form-style-one",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "row",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "col",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
            children: i18n.rem
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "pi-field-checkbox",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
              type: "checkbox",
              id: "reminder-due_date",
              name: "due_date",
              checked: reminder.due_date ? 'checked' : '',
              onChange: handleChange
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
              htmlFor: "reminder-due_date",
              children: "On due date"
            })]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "col-12",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
            children: [i18n.rem, " ", i18n.before]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "pi-field-checkbox",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
              type: "checkbox",
              id: "reminder-before-1",
              name: "before",
              value: 1,
              checked: reminder.before.includes(1) ? 'checked' : '',
              onChange: function onChange(e) {
                return handleChange(e, 'before');
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
              htmlFor: "reminder-before-1",
              children: "1 day"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "pi-field-checkbox",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
              type: "checkbox",
              id: "reminder-before-7",
              name: "before",
              value: 7,
              checked: reminder.before.includes(7) ? 'checked' : '',
              onChange: function onChange(e) {
                return handleChange(e, 'before');
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
              htmlFor: "reminder-before-7",
              children: "7 days"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "pi-field-checkbox",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
              type: "checkbox",
              id: "reminder-before-15",
              name: "before",
              value: 15,
              checked: reminder.before.includes(15) ? 'checked' : '',
              onChange: function onChange(e) {
                return handleChange(e, 'before');
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
              htmlFor: "reminder-before-15",
              children: "15 days"
            })]
          }),  false && /*#__PURE__*/0]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "col-12",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
            children: [i18n.rem, " ", i18n.after]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "pi-field-checkbox",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
              type: "checkbox",
              id: "reminder-after-1",
              name: "after",
              value: 1,
              checked: reminder.after.includes(1) ? 'checked' : '',
              onChange: function onChange(e) {
                return handleChange(e, 'after');
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
              htmlFor: "reminder-after-1",
              children: "1 day"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "pi-field-checkbox",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
              type: "checkbox",
              id: "reminder-after-7",
              name: "after",
              value: 7,
              checked: reminder.after.includes(7) ? 'checked' : '',
              onChange: function onChange(e) {
                return handleChange(e, 'after');
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
              htmlFor: "reminder-after-7",
              children: "7 days"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "pi-field-checkbox",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
              type: "checkbox",
              id: "reminder-after-15",
              name: "after",
              value: 15,
              checked: reminder.after.includes(15) ? 'checked' : '',
              onChange: function onChange(e) {
                return handleChange(e, 'after');
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
              htmlFor: "reminder-after-15",
              children: "15 days"
            })]
          })]
        })]
      })]
    })
  });
});

/***/ })

}]);