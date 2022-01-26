/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/admin/js/main.js ***!
  \******************************/
(function ($) {
  "use strict";

  var ncpiApp = {
    /**
     * Re Order
     * @since 1.0.0
     * @return {mixed} 
     */
    reOrder: function reOrder() {},

    /**
     * Alert box
     * @since 1.0.0
     * @return {mixed} 
     */
    alertBox: function alertBox() {
      $('.ncpi-pro-wrap').on('click', function () {
        alert(ncpi.pro_text);
      });
    },

    /**
     * Library support
     * @since 1.0.0
     * @return {mixed} 
     */
    libSupport: function libSupport() {},

    /**
     * Conditional meta field
     * @since 1.0.0
     * @return {mixed} 
     */
    conditionalField: function conditionalField() {
      if ($('#post_type').val() != 'ncpi_code') return;

      function check_types() {
        var ncpi_type = $('#ncpi_meta_box .meta-ncpi-type-wrap input[type=checkbox]:checked').map(function (_, el) {
          return $(el).val();
        }).get();

        if (jQuery.inArray('css', ncpi_type) !== -1) {
          $('#ncpi_meta_box .meta-ncpi-css-wrap').slideDown();
        } else {
          $('#ncpi_meta_box .meta-ncpi-css-wrap').slideUp();
        }

        if (jQuery.inArray('js', ncpi_type) !== -1) {
          $('#ncpi_meta_box .meta-ncpi-js-wrap, #ncpi_meta_box .meta-ncpi-js-pos-wrap').slideDown();
        } else {
          $('#ncpi_meta_box .meta-ncpi-js-wrap, #ncpi_meta_box .meta-ncpi-js-pos-wrap').slideUp();
        }

        if (jQuery.inArray('html', ncpi_type) !== -1) {
          $('#ncpi_meta_box .meta-ncpi-html-wrap, #ncpi_meta_box .meta-ncpi-html-pos-wrap').slideDown();
        } else {
          $('#ncpi_meta_box .meta-ncpi-html-wrap, #ncpi_meta_box .meta-ncpi-html-pos-wrap').slideUp();
        }
      }

      $('#ncpi_meta_box .meta-ncpi-type-wrap input[type=checkbox]').on('click', function () {
        check_types();
      });
      check_types();

      function check_location() {
        var location = $('#ncpi_meta_box_options .meta-ncpi-location-wrap input[name="ncpi_location"]:checked').val();

        if (location == 'frontend') {
          $('#ncpi_meta_box_options .meta-ncpi-page-wrap').slideDown();
        } else {
          $('#ncpi_meta_box_options .meta-ncpi-page-wrap').slideUp();
        }
      }

      $('#ncpi_meta_box_options .meta-ncpi-location-wrap input[type=radio]').on('click', function () {
        check_location();
      });
      check_location();
    },

    /**
     * Ajax functions
     * @since 1.0.0
     * @return {mixed} 
     */
    ajaxEvent: function ajaxEvent() {},

    /**
     * Meta Field: Repeater
     * @since 1.0.0
     * @return {mixed} 
     */
    metaRepeater: function metaRepeater() {},

    /**
     * Meta Field: Image
     * @since 1.0.0
     * @return {mixed} 
     */
    metaImage: function metaImage() {},

    /**
     * Meta Field: Group
     * @since 1.0.0
     * @return {mixed} 
     */
    metaGroup: function metaGroup() {},

    /**
     * Setting Field: Group
     * @since 1.0.0
     * @return {mixed} 
     */
    settingGroup: function settingGroup() {},

    /**
     * Setting Field: Image
     * @since 1.0.0
     * @return {mixed} 
     */
    settingImage: function settingImage() {},

    /* ---------------------------------------------
     function initialize
     --------------------------------------------- */
    initialize: function initialize() {
      ncpiApp.reOrder();
      ncpiApp.alertBox();
      ncpiApp.libSupport();
      ncpiApp.conditionalField();
      ncpiApp.ajaxEvent();
      ncpiApp.metaRepeater();
      ncpiApp.metaImage();
      ncpiApp.metaGroup();
      ncpiApp.settingGroup();
      ncpiApp.settingImage();
    }
  };
  /* ---------------------------------------------
   Document ready function
   --------------------------------------------- */

  $(function () {
    ncpiApp.initialize();
  });
  $(window).on('load', function () {});
})(jQuery);
/******/ })()
;