"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[13],{

/***/ 5699:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4942);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6643);
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2243);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }





var DefaultList = function DefaultList(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var ctaSettings = {
    url: post.permalink,
    title: post.post_title,
    classes: ['block-link']
  };
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", {
    key: index,
    "data-index": index
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, _objectSpread({}, ctaSettings), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "block-content-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
    tag: "h3",
    pretitle: post.post_type_details.post_type_display_name,
    title: post.post_title
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (DefaultList);

/***/ })

}]);
//# sourceMappingURL=13.bundle.js.map?v=1726017769337