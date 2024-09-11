"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[9],{

/***/ 3186:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3676);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6643);
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2243);
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2212);





var DOCompanyBlock = function DOCompanyBlock(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var metaPrefix = post.post_type_details.meta_prefix;
  var title = post.fields[metaPrefix + '_company_name'];
  var description = post.fields[metaPrefix + '_description'];
  var clientLink = post.fields[metaPrefix + '_url'];
  var image = post.fields[metaPrefix + '_white_logo'];
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    key: index
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
    url: clientLink,
    title: title,
    classes: ['block-link']
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
    image: image,
    size: "logo"
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
    tag: "h3",
    title: title,
    classes: ['screen-reader-text']
  }), description ? (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__/* .doParse */ .sg)(description) : null)));
};
/* harmony default export */ __webpack_exports__["default"] = (DOCompanyBlock);

/***/ })

}]);
//# sourceMappingURL=9.bundle.js.map?v=1726017769337