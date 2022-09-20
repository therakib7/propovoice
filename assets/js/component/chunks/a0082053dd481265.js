"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_js_components_invoice_single_tab_invoice_sidebar_AdditionalAmount_js"],{

/***/ "./src/js/components/invoice/single/tab/invoice/sidebar/AdditionalAmount.js":
/*!**********************************************************************************!*\
  !*** ./src/js/components/invoice/single/tab/invoice/sidebar/AdditionalAmount.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var block_pro_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/pro-alert */ "./src/js/blocks/pro-alert/index.js");
/* harmony import */ var block_pro_alert_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! block/pro-alert/label */ "./src/js/blocks/pro-alert/label.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    props.getAll('settings', 'tab=estvoice_tax').then(function (resp) {
      if (resp.data.success) {// console.log(resp.data.data);
        // props.handleDefault(resp.data.data);
      }
    });
    props.getAll('taxonomies', 'taxonomy=extra_amount').then(function (resp) {
      if (resp.data.success) {
        var extra_amount = resp.data.data['extra_amount'];
        var tax_fields = [];
        var fee_fields = [];
        var discount_fields = [];
        var additional_amount = [];

        if (extra_amount) {
          extra_amount.map(function (item, i) {
            if (item.extra_amount_type == 'tax') {
              tax_fields.push(item);
            } else if (item.extra_amount_type == 'fee') {
              fee_fields.push(item);
            } else {
              discount_fields.push(item);
            }
          });
          additional_amount = [].concat(tax_fields, fee_fields, discount_fields);
          setList(additional_amount);
        }
      }
    });
  }, []);

  var setAdditional = function setAdditional(i, data, type) {
    var type_val = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    props.handleChange(i, data, type, type_val);
  };

  var itemTaxChange = function itemTaxChange(e) {
    if (wage.length > 0) {
      (0,block_pro_alert__WEBPACK_IMPORTED_MODULE_2__["default"])();
      return;
    }

    props.itemTaxChange(e);
  };

  var extra_field = props.data;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "pi-form-accordion pi-additional",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "pi-form-style-one",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "row",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "col",
            style: {
              marginBottom: '10px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
              id: "form-item_tax",
              children: ["Each Item Tax Field", wage.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(block_pro_alert_label__WEBPACK_IMPORTED_MODULE_3__["default"], {})
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "pi-field-switch pi-ml-10",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
                className: "pi-switch",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                  type: "checkbox",
                  id: "form-item_tax",
                  name: "item_tax",
                  checked: props.item_tax ? 'checked' : '',
                  onChange: itemTaxChange
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "pi-switch-slider pi-round"
                })]
              })
            })]
          })
        })
      }), list.map(function (item, i) {
        var hasItem = extra_field.find(function (x) {
          return x.id == item.id;
        });
        var percent_val_type = false;
        var fixed_val_type = false;

        if (hasItem) {
          if (hasItem.val_type === 'percent') {
            percent_val_type = true;
          } else {
            fixed_val_type = true;
          }
        } else {
          if (item.val_type === 'percent') {
            percent_val_type = true;
          } else {
            fixed_val_type = true;
          }
        }

        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "pi-tab",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
            checked: hasItem ? true : false,
            onChange: function onChange() {
              return setAdditional(i, item, 'field');
            },
            type: "checkbox",
            id: 'additional-field-' + i,
            name: "additional-field"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            className: (hasItem ? 'pi-active' : '') + ' pi-tab-label',
            htmlFor: 'additional-field-' + i,
            children: item.label
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "pi-tab-content",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "pi-form-style-one",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "pi-radio-content",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: "pi-radio-group",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("h4", {
                    children: [item.label, " Type:"]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                    className: "row",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                      className: "col",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                        className: "pi-field-radio",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                          onChange: function onChange() {
                            return setAdditional(i, item, 'type', 'percent');
                          },
                          defaultChecked: percent_val_type,
                          type: "radio",
                          name: "val-type-" + i,
                          id: "val-type-percent-" + i,
                          value: "percent"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                          htmlFor: "val-type-percent-" + i,
                          children: "Percent"
                        })]
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                      className: "col pi-p-0",
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                        className: "pi-field-radio",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                          onChange: function onChange() {
                            return setAdditional(i, item, 'type', 'fixed');
                          },
                          defaultChecked: fixed_val_type,
                          type: "radio",
                          name: "val-type-" + i,
                          id: "val-type-fixed-" + i,
                          value: "fixed"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                          htmlFor: "val-type-fixed-" + i,
                          children: "Fixed"
                        })]
                      })
                    })]
                  })]
                })
              })
            })
          })]
        }, i);
      })]
    })
  });
});

/***/ })

}]);