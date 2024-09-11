"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_block_DOPressReleaseBlock_tsx"],{

/***/ "./src/components/templates/block/DOPressReleaseBlock.tsx":
/*!****************************************************************!*\
  !*** ./src/components/templates/block/DOPressReleaseBlock.tsx ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");





var DOPressReleaseBlock = function DOPressReleaseBlock(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var title = (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.doLength)(post.fields.press_long_title) ? (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.doStripTags)(post.fields.press_long_title) : post.fields.press_title;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "has-block-link"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__["default"], {
    classes: ['block-link'],
    url: post.permalink,
    title: title
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__["default"], {
    image: post.post_thumbnail,
    size: "cinema_600",
    classes: ['block-thumbnail']
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "block-content-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__["default"], {
    tag: "h3",
    pretitle: post.post_type_details.post_type_display_name,
    title: title
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (DOPressReleaseBlock);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX2Jsb2NrX0RPUHJlc3NSZWxlYXNlQmxvY2tfdHN4LmJ1bmRsZS5qcz92PTE3MjYwMTc4NDg2NTEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNnQztBQUNkO0FBQ1E7QUFDSjtBQUNoRCxJQUFNTSxtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQW1CQSxDQUFBQyxJQUFBLEVBQW9EO0VBQUEsSUFBOUNDLEtBQUssR0FBQUQsSUFBQSxDQUFMQyxLQUFLO0lBQUVDLFdBQVcsR0FBQUYsSUFBQSxDQUFYRSxXQUFXO0lBQUVDLE1BQU0sR0FBQUgsSUFBQSxDQUFORyxNQUFNO0lBQUVDLElBQUksR0FBQUosSUFBQSxDQUFKSSxJQUFJO0lBQUVDLElBQUksR0FBQUwsSUFBQSxDQUFKSyxJQUFJO0VBQ2pFLElBQU1DLEtBQUssR0FBR1osMkRBQVEsQ0FBQ1UsSUFBSSxDQUFDRyxNQUFNLENBQUNDLGdCQUFnQixDQUFDLEdBQUdiLDhEQUFXLENBQUNTLElBQUksQ0FBQ0csTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxHQUFHSixJQUFJLENBQUNHLE1BQU0sQ0FBQ0UsV0FBVztFQUMxSCxPQUFRaEIsMERBQW1CLENBQUMsSUFBSSxFQUFFO0lBQUVrQixTQUFTLEVBQUU7RUFBaUIsQ0FBQyxFQUM3RGxCLDBEQUFtQixDQUFDRyxpRUFBRyxFQUFFO0lBQUVnQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFBRUMsR0FBRyxFQUFFVCxJQUFJLENBQUNVLFNBQVM7SUFBRVIsS0FBSyxFQUFFQTtFQUFNLENBQUMsRUFDbkZiLDBEQUFtQixDQUFDSyxtRUFBSyxFQUFFO0lBQUVpQixLQUFLLEVBQUVYLElBQUksQ0FBQ1ksY0FBYztJQUFFQyxJQUFJLEVBQUUsWUFBWTtJQUFFTCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUI7RUFBRSxDQUFDLENBQUMsRUFDNUduQiwwREFBbUIsQ0FBQyxLQUFLLEVBQUU7SUFBRWtCLFNBQVMsRUFBRTtFQUF3QixDQUFDLEVBQzdEbEIsMERBQW1CLENBQUNJLHFFQUFPLEVBQUU7SUFBRXFCLEdBQUcsRUFBRSxJQUFJO0lBQUVDLFFBQVEsRUFBRWYsSUFBSSxDQUFDZ0IsaUJBQWlCLENBQUNDLHNCQUFzQjtJQUFFZixLQUFLLEVBQUVBO0VBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JJLENBQUM7QUFDRCwrREFBZVAsbUJBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL2Jsb2NrL0RPUHJlc3NSZWxlYXNlQmxvY2sudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBkb0xlbmd0aCwgZG9TdHJpcFRhZ3MgfSBmcm9tICdzcmMvdXRpbHMvaGVscGVycyc7XG5pbXBvcnQgQ1RBIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9DVEEnO1xuaW1wb3J0IEhlYWRpbmcgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0hlYWRpbmcnO1xuaW1wb3J0IEltYWdlIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9JbWFnZSc7XG5jb25zdCBET1ByZXNzUmVsZWFzZUJsb2NrID0gKHsgaW5kZXgsIHBhbmVsU2xpZGVyLCBwZXJSb3csIHBvc3QsIHR5cGUsIH0pID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGRvTGVuZ3RoKHBvc3QuZmllbGRzLnByZXNzX2xvbmdfdGl0bGUpID8gZG9TdHJpcFRhZ3MocG9zdC5maWVsZHMucHJlc3NfbG9uZ190aXRsZSkgOiBwb3N0LmZpZWxkcy5wcmVzc190aXRsZTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJoYXMtYmxvY2stbGlua1wiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IGNsYXNzZXM6IFsnYmxvY2stbGluayddLCB1cmw6IHBvc3QucGVybWFsaW5rLCB0aXRsZTogdGl0bGUgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW1hZ2UsIHsgaW1hZ2U6IHBvc3QucG9zdF90aHVtYm5haWwsIHNpemU6IFwiY2luZW1hXzYwMFwiLCBjbGFzc2VzOiBbJ2Jsb2NrLXRodW1ibmFpbCddIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJibG9jay1jb250ZW50LXdyYXBwZXJcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZGluZywgeyB0YWc6IFwiaDNcIiwgcHJldGl0bGU6IHBvc3QucG9zdF90eXBlX2RldGFpbHMucG9zdF90eXBlX2Rpc3BsYXlfbmFtZSwgdGl0bGU6IHRpdGxlIH0pKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBET1ByZXNzUmVsZWFzZUJsb2NrO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiZG9MZW5ndGgiLCJkb1N0cmlwVGFncyIsIkNUQSIsIkhlYWRpbmciLCJJbWFnZSIsIkRPUHJlc3NSZWxlYXNlQmxvY2siLCJfcmVmIiwiaW5kZXgiLCJwYW5lbFNsaWRlciIsInBlclJvdyIsInBvc3QiLCJ0eXBlIiwidGl0bGUiLCJmaWVsZHMiLCJwcmVzc19sb25nX3RpdGxlIiwicHJlc3NfdGl0bGUiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiY2xhc3NlcyIsInVybCIsInBlcm1hbGluayIsImltYWdlIiwicG9zdF90aHVtYm5haWwiLCJzaXplIiwidGFnIiwicHJldGl0bGUiLCJwb3N0X3R5cGVfZGV0YWlscyIsInBvc3RfdHlwZV9kaXNwbGF5X25hbWUiXSwic291cmNlUm9vdCI6IiJ9