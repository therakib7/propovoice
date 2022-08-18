"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_invoice_single_tab_invoice_sidebar_AdditionalAmount_js"],{

/***/ "./src/admin/js/react/components/invoice/single/tab/invoice/sidebar/AdditionalAmount.js":
/*!**********************************************************************************************!*\
  !*** ./src/admin/js/react/components/invoice/single/tab/invoice/sidebar/AdditionalAmount.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (props) {
  var setAdditional = function setAdditional(data, type) {
    props.handleChange(data, type);
  };

  var extra_field = props.data;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "pi-form-accordion pi-additional",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "pi-tab",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        checked: extra_field.hasOwnProperty('tax') ? 'checked' : '',
        onChange: function onChange() {
          return setAdditional('tax', 'field');
        },
        type: "checkbox",
        id: "additional-tax",
        name: "additional-tax"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
        className: (extra_field.hasOwnProperty('tax') ? 'pi-active' : '') + ' pi-tab-label',
        htmlFor: "additional-tax",
        children: "Tax"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "pi-tab-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "pi-form-style-one",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "pi-radio-content",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "pi-radio-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                children: "Tax type:"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "pi-field-radio",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      onChange: function onChange() {
                        return setAdditional({
                          field: 'tax',
                          type: 'percent'
                        }, 'type');
                      },
                      defaultChecked: extra_field.hasOwnProperty('tax') && extra_field.tax == 'percent',
                      type: "radio",
                      name: "tax",
                      id: "tax-percent"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                      htmlFor: "tax-percent",
                      children: "Percentage"
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "col pi-p-0",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "pi-field-radio",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      onChange: function onChange() {
                        return setAdditional({
                          field: 'tax',
                          type: 'fixed'
                        }, 'type');
                      },
                      defaultChecked: extra_field.hasOwnProperty('tax') && extra_field.tax == 'fixed',
                      type: "radio",
                      name: "tax",
                      id: "tax-fixed"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                      htmlFor: "tax-fixed",
                      children: "Fixed"
                    })]
                  })
                })]
              })]
            })
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "pi-tab",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        checked: extra_field.hasOwnProperty('discount') ? 'checked' : '',
        onChange: function onChange() {
          return setAdditional('discount', 'field');
        },
        type: "checkbox",
        id: "additional-discount",
        name: "additional-discount"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
        className: (extra_field.hasOwnProperty('discount') ? 'pi-active' : '') + ' pi-tab-label',
        htmlFor: "additional-discount",
        children: "Discount"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "pi-tab-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "pi-form-style-one",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "pi-radio-content",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "pi-radio-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                children: "Discount type:"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "pi-field-radio",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      onChange: function onChange() {
                        return setAdditional({
                          field: 'discount',
                          type: 'percent'
                        }, 'type');
                      },
                      defaultChecked: extra_field.hasOwnProperty('discount') && extra_field.discount == 'percent',
                      type: "radio",
                      name: "discount",
                      id: "discount-percent"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                      htmlFor: "discount-percent",
                      children: "Percentage"
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "col pi-p-0",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "pi-field-radio",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      onChange: function onChange() {
                        return setAdditional({
                          field: 'discount',
                          type: 'fixed'
                        }, 'type');
                      },
                      defaultChecked: extra_field.hasOwnProperty('discount') && extra_field.discount == 'fixed',
                      type: "radio",
                      name: "discount",
                      id: "discount-fixed"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                      htmlFor: "discount-fixed",
                      children: "Fixed"
                    })]
                  })
                })]
              })]
            })
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "pi-tab",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        checked: extra_field.hasOwnProperty('late_fee') ? 'checked' : '',
        onChange: function onChange() {
          return setAdditional('late_fee', 'field');
        },
        type: "checkbox",
        id: "additional-late_fee",
        name: "additional-late_fee"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
        className: (extra_field.hasOwnProperty('late_fee') ? 'pi-active' : '') + ' pi-tab-label',
        htmlFor: "additional-late_fee",
        children: "Late Fee"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "pi-tab-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "pi-form-style-one",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "pi-radio-content",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "pi-radio-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h4", {
                children: "Late Fee type:"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "row",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "col",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "pi-field-radio",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      onChange: function onChange() {
                        return setAdditional({
                          field: 'late_fee',
                          type: 'percent'
                        }, 'type');
                      },
                      defaultChecked: extra_field.hasOwnProperty('late_fee') && extra_field.late_fee == 'percent',
                      type: "radio",
                      name: "late_fee",
                      id: "late_fee-percent"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                      htmlFor: "late_fee-percent",
                      children: "Percentage"
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                  className: "col pi-p-0",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "pi-field-radio",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                      onChange: function onChange() {
                        return setAdditional({
                          field: 'late_fee',
                          type: 'fixed'
                        }, 'type');
                      },
                      defaultChecked: extra_field.hasOwnProperty('late_fee') && extra_field.late_fee == 'fixed' || !extra_field.hasOwnProperty('late_fee'),
                      type: "radio",
                      name: "late_fee",
                      id: "late_fee-fixed"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                      htmlFor: "late_fee-fixed",
                      children: "Fixed"
                    })]
                  })
                })]
              })]
            })
          })
        })
      })]
    })]
  });
});

/***/ })

}]);