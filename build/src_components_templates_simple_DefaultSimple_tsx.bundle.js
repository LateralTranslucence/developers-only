"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_simple_DefaultSimple_tsx"],{

/***/ "./src/components/templates/simple/DefaultSimple.tsx":
/*!***********************************************************!*\
  !*** ./src/components/templates/simple/DefaultSimple.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }





var DefaultSimple = function DefaultSimple(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var image = post.post_type_details.post_thumbnail ? post.fields[(0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doMetaFieldKey)(post.post_type_details.post_thumbnail, post.post_type_details.meta_prefix)] : [];
  // CTA settings
  var ctaSettings = {
    url: post.permalink,
    title: post.post_title,
    classes: ['block-link']
  };
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", {
    key: index
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread({}, ctaSettings), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_5__["default"], {
    image: image,
    size: "cinema_600"
  }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], {
    tag: "h3",
    title: post.post_title
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (DefaultSimple);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX3NpbXBsZV9EZWZhdWx0U2ltcGxlX3RzeC5idW5kbGUuanM/dj0xNzI2MDE3ODQ4NjUxIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQ3lCO0FBQ1A7QUFDUTtBQUNKO0FBQ2hELElBQU1LLGFBQWEsR0FBRyxTQUFoQkEsYUFBYUEsQ0FBQUMsSUFBQSxFQUFvRDtFQUFBLElBQTlDQyxLQUFLLEdBQUFELElBQUEsQ0FBTEMsS0FBSztJQUFFQyxXQUFXLEdBQUFGLElBQUEsQ0FBWEUsV0FBVztJQUFFQyxNQUFNLEdBQUFILElBQUEsQ0FBTkcsTUFBTTtJQUFFQyxJQUFJLEdBQUFKLElBQUEsQ0FBSkksSUFBSTtJQUFFQyxJQUFJLEdBQUFMLElBQUEsQ0FBSkssSUFBSTtFQUMzRCxJQUFNQyxLQUFLLEdBQUdGLElBQUksQ0FBQ0csaUJBQWlCLENBQUNDLGNBQWMsR0FBR0osSUFBSSxDQUFDSyxNQUFNLENBQUNkLGlFQUFjLENBQUNTLElBQUksQ0FBQ0csaUJBQWlCLENBQUNDLGNBQWMsRUFBRUosSUFBSSxDQUFDRyxpQkFBaUIsQ0FBQ0csV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFO0VBQ2pLO0VBQ0EsSUFBTUMsV0FBVyxHQUFHO0lBQ2hCQyxHQUFHLEVBQUVSLElBQUksQ0FBQ1MsU0FBUztJQUNuQkMsS0FBSyxFQUFFVixJQUFJLENBQUNXLFVBQVU7SUFDdEJDLE9BQU8sRUFBRSxDQUFDLFlBQVk7RUFDMUIsQ0FBQztFQUNELE9BQVF0QiwwREFBbUIsQ0FBQyxJQUFJLEVBQUU7SUFBRXdCLEdBQUcsRUFBRWpCO0VBQU0sQ0FBQyxFQUM1Q1AsMERBQW1CLENBQUNFLGlFQUFHLEVBQUF1QixhQUFBLEtBQU9SLFdBQVcsR0FDckNqQiwwREFBbUIsQ0FBQ0ksbUVBQUssRUFBRTtJQUFFUSxLQUFLLEVBQUVBLEtBQUs7SUFBRWMsSUFBSSxFQUFFO0VBQWEsQ0FBQyxDQUFDLEVBQ2hFMUIsMERBQW1CLENBQUNHLHFFQUFPLEVBQUU7SUFBRXdCLEdBQUcsRUFBRSxJQUFJO0lBQUVQLEtBQUssRUFBRVYsSUFBSSxDQUFDVztFQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakYsQ0FBQztBQUNELCtEQUFlaEIsYUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW1wbGUvRGVmYXVsdFNpbXBsZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGRvTWV0YUZpZWxkS2V5IH0gZnJvbSAnc3JjL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IENUQSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQ1RBJztcbmltcG9ydCBIZWFkaW5nIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9IZWFkaW5nJztcbmltcG9ydCBJbWFnZSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSW1hZ2UnO1xuY29uc3QgRGVmYXVsdFNpbXBsZSA9ICh7IGluZGV4LCBwYW5lbFNsaWRlciwgcGVyUm93LCBwb3N0LCB0eXBlLCB9KSA9PiB7XG4gICAgY29uc3QgaW1hZ2UgPSBwb3N0LnBvc3RfdHlwZV9kZXRhaWxzLnBvc3RfdGh1bWJuYWlsID8gcG9zdC5maWVsZHNbZG9NZXRhRmllbGRLZXkocG9zdC5wb3N0X3R5cGVfZGV0YWlscy5wb3N0X3RodW1ibmFpbCwgcG9zdC5wb3N0X3R5cGVfZGV0YWlscy5tZXRhX3ByZWZpeCldIDogW107XG4gICAgLy8gQ1RBIHNldHRpbmdzXG4gICAgY29uc3QgY3RhU2V0dGluZ3MgPSB7XG4gICAgICAgIHVybDogcG9zdC5wZXJtYWxpbmssXG4gICAgICAgIHRpdGxlOiBwb3N0LnBvc3RfdGl0bGUsXG4gICAgICAgIGNsYXNzZXM6IFsnYmxvY2stbGluayddLFxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBrZXk6IGluZGV4IH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IC4uLmN0YVNldHRpbmdzIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEltYWdlLCB7IGltYWdlOiBpbWFnZSwgc2l6ZTogXCJjaW5lbWFfNjAwXCIgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlYWRpbmcsIHsgdGFnOiBcImgzXCIsIHRpdGxlOiBwb3N0LnBvc3RfdGl0bGUgfSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdFNpbXBsZTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImRvTWV0YUZpZWxkS2V5IiwiQ1RBIiwiSGVhZGluZyIsIkltYWdlIiwiRGVmYXVsdFNpbXBsZSIsIl9yZWYiLCJpbmRleCIsInBhbmVsU2xpZGVyIiwicGVyUm93IiwicG9zdCIsInR5cGUiLCJpbWFnZSIsInBvc3RfdHlwZV9kZXRhaWxzIiwicG9zdF90aHVtYm5haWwiLCJmaWVsZHMiLCJtZXRhX3ByZWZpeCIsImN0YVNldHRpbmdzIiwidXJsIiwicGVybWFsaW5rIiwidGl0bGUiLCJwb3N0X3RpdGxlIiwiY2xhc3NlcyIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJfb2JqZWN0U3ByZWFkIiwic2l6ZSIsInRhZyJdLCJzb3VyY2VSb290IjoiIn0=