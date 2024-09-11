"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_block_DOMediaCoverageBlock_tsx"],{

/***/ "./src/components/templates/block/DOMediaCoverageBlock.tsx":
/*!*****************************************************************!*\
  !*** ./src/components/templates/block/DOMediaCoverageBlock.tsx ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");




var DOMediaCoverageBlock = function DOMediaCoverageBlock(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var mediaLink = post.fields.media_url ? post.fields.media_url : post.permalink;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "has-block-link"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: ['block-link'],
    url: mediaLink,
    title: post.fields.media_title
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_3__["default"], {
    image: post.fields.media_image,
    size: "cinema_600",
    classes: ['block-thumbnail']
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "block-content-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    tag: "h3",
    pretitle: post.post_type_details.post_type_display_name,
    title: post.fields.media_title
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (DOMediaCoverageBlock);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX2Jsb2NrX0RPTWVkaWFDb3ZlcmFnZUJsb2NrX3RzeC5idW5kbGUuanM/dj0xNzI2MDE3ODQ4NjUxIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNrQjtBQUNRO0FBQ0o7QUFDaEQsSUFBTUksb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUFvQkEsQ0FBQUMsSUFBQSxFQUFvRDtFQUFBLElBQTlDQyxLQUFLLEdBQUFELElBQUEsQ0FBTEMsS0FBSztJQUFFQyxXQUFXLEdBQUFGLElBQUEsQ0FBWEUsV0FBVztJQUFFQyxNQUFNLEdBQUFILElBQUEsQ0FBTkcsTUFBTTtJQUFFQyxJQUFJLEdBQUFKLElBQUEsQ0FBSkksSUFBSTtJQUFFQyxJQUFJLEdBQUFMLElBQUEsQ0FBSkssSUFBSTtFQUNsRSxJQUFNQyxTQUFTLEdBQUdGLElBQUksQ0FBQ0csTUFBTSxDQUFDQyxTQUFTLEdBQUdKLElBQUksQ0FBQ0csTUFBTSxDQUFDQyxTQUFTLEdBQUdKLElBQUksQ0FBQ0ssU0FBUztFQUNoRixPQUFRZCwwREFBbUIsQ0FBQyxJQUFJLEVBQUU7SUFBRWdCLFNBQVMsRUFBRTtFQUFpQixDQUFDLEVBQzdEaEIsMERBQW1CLENBQUNDLGlFQUFHLEVBQUU7SUFBRWdCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztJQUFFQyxHQUFHLEVBQUVQLFNBQVM7SUFBRVEsS0FBSyxFQUFFVixJQUFJLENBQUNHLE1BQU0sQ0FBQ1E7RUFBWSxDQUFDLEVBQ2hHcEIsMERBQW1CLENBQUNHLG1FQUFLLEVBQUU7SUFBRWtCLEtBQUssRUFBRVosSUFBSSxDQUFDRyxNQUFNLENBQUNVLFdBQVc7SUFBRUMsSUFBSSxFQUFFLFlBQVk7SUFBRU4sT0FBTyxFQUFFLENBQUMsaUJBQWlCO0VBQUUsQ0FBQyxDQUFDLEVBQ2hIakIsMERBQW1CLENBQUMsS0FBSyxFQUFFO0lBQUVnQixTQUFTLEVBQUU7RUFBd0IsQ0FBQyxFQUM3RGhCLDBEQUFtQixDQUFDRSxxRUFBTyxFQUFFO0lBQUVzQixHQUFHLEVBQUUsSUFBSTtJQUFFQyxRQUFRLEVBQUVoQixJQUFJLENBQUNpQixpQkFBaUIsQ0FBQ0Msc0JBQXNCO0lBQUVSLEtBQUssRUFBRVYsSUFBSSxDQUFDRyxNQUFNLENBQUNRO0VBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZKLENBQUM7QUFDRCwrREFBZWhCLG9CQUFvQiIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9ibG9jay9ET01lZGlhQ292ZXJhZ2VCbG9jay50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDVEEgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0NUQSc7XG5pbXBvcnQgSGVhZGluZyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSGVhZGluZyc7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0ltYWdlJztcbmNvbnN0IERPTWVkaWFDb3ZlcmFnZUJsb2NrID0gKHsgaW5kZXgsIHBhbmVsU2xpZGVyLCBwZXJSb3csIHBvc3QsIHR5cGUsIH0pID0+IHtcbiAgICBjb25zdCBtZWRpYUxpbmsgPSBwb3N0LmZpZWxkcy5tZWRpYV91cmwgPyBwb3N0LmZpZWxkcy5tZWRpYV91cmwgOiBwb3N0LnBlcm1hbGluaztcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJoYXMtYmxvY2stbGlua1wiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IGNsYXNzZXM6IFsnYmxvY2stbGluayddLCB1cmw6IG1lZGlhTGluaywgdGl0bGU6IHBvc3QuZmllbGRzLm1lZGlhX3RpdGxlIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEltYWdlLCB7IGltYWdlOiBwb3N0LmZpZWxkcy5tZWRpYV9pbWFnZSwgc2l6ZTogXCJjaW5lbWFfNjAwXCIsIGNsYXNzZXM6IFsnYmxvY2stdGh1bWJuYWlsJ10gfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrLWNvbnRlbnQtd3JhcHBlclwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIZWFkaW5nLCB7IHRhZzogXCJoM1wiLCBwcmV0aXRsZTogcG9zdC5wb3N0X3R5cGVfZGV0YWlscy5wb3N0X3R5cGVfZGlzcGxheV9uYW1lLCB0aXRsZTogcG9zdC5maWVsZHMubWVkaWFfdGl0bGUgfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IERPTWVkaWFDb3ZlcmFnZUJsb2NrO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ1RBIiwiSGVhZGluZyIsIkltYWdlIiwiRE9NZWRpYUNvdmVyYWdlQmxvY2siLCJfcmVmIiwiaW5kZXgiLCJwYW5lbFNsaWRlciIsInBlclJvdyIsInBvc3QiLCJ0eXBlIiwibWVkaWFMaW5rIiwiZmllbGRzIiwibWVkaWFfdXJsIiwicGVybWFsaW5rIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImNsYXNzZXMiLCJ1cmwiLCJ0aXRsZSIsIm1lZGlhX3RpdGxlIiwiaW1hZ2UiLCJtZWRpYV9pbWFnZSIsInNpemUiLCJ0YWciLCJwcmV0aXRsZSIsInBvc3RfdHlwZV9kZXRhaWxzIiwicG9zdF90eXBlX2Rpc3BsYXlfbmFtZSJdLCJzb3VyY2VSb290IjoiIn0=