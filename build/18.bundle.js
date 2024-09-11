"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[18],{

/***/ 8412:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6643);
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2243);
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2212);




var DOPodcastBlock = function DOPodcastBlock(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var podcastExternalURL = post.fields.podcast_external_url;
  var podcastLink = post.fields.podcast_external_url ? post.fields.podcast_external_url : post.permalink;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "has-block-link"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
    url: podcastLink,
    title: post.fields.podcast_title,
    classes: ['block-link' + (post.fields.podcast_format ? ' icon ' + post.fields.podcast_format.PartialTemplateProps.toLowerCase.toLowerCase() : '')]
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
    image: post.fields.podcast_image,
    size: "cinema_600",
    classes: ['block-thumbnail']
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "block-content-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
    tag: "h3",
    pretitle: post.post_type_details.post_type_display_name,
    title: post.fields.podcast_title
  }), podcastExternalURL ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "read-time"
  }, "External Link") : null)));
};
/* harmony default export */ __webpack_exports__["default"] = (DOPodcastBlock);

/***/ })

}]);
//# sourceMappingURL=18.bundle.js.map?v=1726017769337