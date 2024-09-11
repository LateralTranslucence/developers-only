"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[8],{

/***/ 603:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2243);
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2212);



var DOCompanySimple = function DOCompanySimple(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var image = post.fields[post.post_type_details.meta_prefix + '_logo'];
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    key: index
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
    image: image,
    size: "logo"
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
    tag: "h3",
    title: post.post_title,
    classes: ['screen-reader-text']
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (DOCompanySimple);

/***/ })

}]);
//# sourceMappingURL=8.bundle.js.map?v=1726017769337