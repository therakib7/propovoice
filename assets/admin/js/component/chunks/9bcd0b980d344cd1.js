"use strict";
(self["webpackChunkpropovoice"] = self["webpackChunkpropovoice"] || []).push([["src_admin_js_react_components_setting_index_js"],{

/***/ "./src/admin/js/react/components/setting/index.js":
/*!********************************************************!*\
  !*** ./src/admin/js/react/components/setting/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingWrap)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var block_preloader_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! block/preloader/spinner */ "./src/admin/js/react/blocks/preloader/spinner/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



 // import Style from './style.scoped.scss' 





var General = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_general_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/general */ "./src/admin/js/react/components/setting/tab/general/index.js"));
});
var Task = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_task_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/task */ "./src/admin/js/react/components/setting/tab/task/index.js"));
});
var Lead = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_lead_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/lead */ "./src/admin/js/react/components/setting/tab/lead/index.js"));
});
var Deal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_deal_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/deal */ "./src/admin/js/react/components/setting/tab/deal/index.js"));
});
var Estimate = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_estimate_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/estimate */ "./src/admin/js/react/components/setting/tab/estimate/index.js"));
});
var Invoice = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_invoice_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/invoice */ "./src/admin/js/react/components/setting/tab/invoice/index.js"));
});
var Project = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_project_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/project */ "./src/admin/js/react/components/setting/tab/project/index.js"));
});
var Contact = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_contact_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/contact */ "./src/admin/js/react/components/setting/tab/contact/index.js"));
});
var Tag = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_tag_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/tag */ "./src/admin/js/react/components/setting/tab/tag/index.js"));
}); //subtab: estimate
// const EstimateReminder = lazy(() => import('./tab/estimate/Reminder'));
// const EstimateRecurring = lazy(() => import('./tab/estimate/Recurring'));
//subtab: invoice
// const InvoiceReminder = lazy(() => import('./tab/invoice/Reminder'));
// const InvoiceRecurring = lazy(() => import('./tab/invoice/Recurring'));
//subtab: email 

var EmailEstimate = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_email_estimate_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/email/estimate */ "./src/admin/js/react/components/setting/tab/email/estimate/index.js"));
});
var EmailInvoice = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_email_invoice_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/email/invoice */ "./src/admin/js/react/components/setting/tab/email/invoice/index.js"));
});
var BusinessSingle = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_setting_tab_business_index_js").then(__webpack_require__.bind(__webpack_require__, /*! ./tab/business/index */ "./src/admin/js/react/components/setting/tab/business/index.js"));
});
var Payment = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_admin_js_react_components_payment_index_js").then(__webpack_require__.bind(__webpack_require__, /*! components/payment */ "./src/admin/js/react/components/payment/index.js"));
});
function SettingWrap() {
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useParams)(),
      tab = _useParams.tab,
      subtab = _useParams.subtab;

  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useNavigate)();
  var tabDefault = tab;
  var subtabDefault = subtab;

  if (tab === undefined) {
    tabDefault = 'general';
  }

  var tab_data = {
    business: {
      label: 'Business'
    },
    payment: {
      label: 'Payment'
    }
  };

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(tabDefault),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      currentTab = _useState2[0],
      setCurrentTab = _useState2[1];

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(subtabDefault),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      currentSubtab = _useState4[0],
      setCurrentSubtab = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(tab_data),
      _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
      tabs = _useState6[0],
      setTabs = _useState6[1];

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!wage.length) {
      var new_tab_data = {
        general: {
          label: 'General'
        },
        task: {
          label: 'Task & Activity'
        },
        lead: {
          label: 'Lead'
        },
        deal: {
          label: 'Deal'
        },
        estimate: {
          label: 'Estimate'
        },
        invoice: {
          label: 'Invoice'
        },
        project: {
          label: 'Project'
        },
        business: {
          label: 'Business'
        },
        payment: {
          label: 'Payment'
        },
        email: {
          label: 'Email Template',
          subtabs: {
            estimate: {
              label: 'Estimate'
            },
            invoice: {
              label: 'Invoice'
            }
          }
        },
        contact: {
          label: 'Contact'
        },
        tag: {
          label: 'Tag'
        }
      };
      setTabs(new_tab_data);
    }
  }, []);

  var routeChange = function routeChange(tab) {
    var subtab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (subtab) {
      navigate("/setting/".concat(tab, "/").concat(subtab));
    } else {
      navigate("/setting/".concat(tab));
    }
  };

  var addCurrentTab = function addCurrentTab(e, tab) {
    var subtab = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    e.preventDefault();
    setCurrentTab(tab);
    setCurrentSubtab(subtab);
    routeChange(tab, subtab);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("nav", {
      className: "pi-breadcrumb",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("ul", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
            href: "#",
            children: "Home"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
            width: 5,
            height: 10,
            viewBox: "0 0 5 10",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
              d: "M.5 1.25L4.25 5 .5 8.75",
              stroke: "#718096",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
          className: "pi-active",
          children: "Settings"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
      className: "pi-page-title",
      children: "Settings"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "pi-settings-tab",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "col-md-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("ul", {
            className: "pi-settings-tabs",
            children: Object.keys(tabs).map(function (key) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("li", {
                className: 'pi-tab ' + (key == currentTab ? 'pi-active' : ''),
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                  onClick: function onClick(e) {
                    return addCurrentTab(e, key);
                  },
                  children: tabs[key].label
                }), tabs[key].hasOwnProperty('subtabs') && tabs[key].subtabs && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("ul", {
                  className: "pi-settings-subtabs",
                  children: Object.keys(tabs[key].subtabs).map(function (subkey) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
                      className: 'pi-subtab ' + (subkey == currentSubtab || !currentSubtab && Object.keys(tabs[key].subtabs)[0] == subkey ? 'pi-active' : ''),
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                        onClick: function onClick(e) {
                          return addCurrentTab(e, key, subkey);
                        },
                        children: tabs[key].subtabs[subkey].label
                      })
                    }, subkey);
                  })
                })]
              }, key);
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "col-md-9",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "pi-setting-tab-content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("h4", {
              className: "pi-title-medium pi-mb-15",
              style: {
                textTransform: 'capitalize'
              },
              children: [currentTab, " Settings"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
              fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(block_preloader_spinner__WEBPACK_IMPORTED_MODULE_2__["default"], {}),
              children: [currentTab == 'general' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(General, {}), currentTab == 'task' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Task, {}), currentTab == 'lead' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Lead, {}), currentTab == 'deal' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Deal, {}), currentTab == 'estimate' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Estimate, {}), currentTab == 'invoice' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Invoice, {}), currentTab == 'project' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Project, {}), currentTab == 'business' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(BusinessSingle, {}), currentTab == 'payment' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Payment, {}), !wage.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
                children: [currentTab == 'email' && (currentSubtab == 'estimate' || !currentSubtab) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(EmailEstimate, {}), currentTab == 'email' && currentSubtab == 'invoice' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(EmailInvoice, {})]
              }), currentTab == 'contact' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Contact, {}), currentTab == 'tag' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Tag, {})]
            })]
          })
        })]
      })
    })]
  });
}

/***/ })

}]);