"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_block_DefaultBlock_tsx"],{

/***/ "./src/components/templates/block/DefaultBlock.tsx":
/*!*********************************************************!*\
  !*** ./src/components/templates/block/DefaultBlock.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");




var DefaultBlock = function DefaultBlock(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "has-block-link"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: ['block-link'],
    url: post.permalink,
    title: post.post_title
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_3__["default"], {
    image: post.post_thumbnail,
    size: "cinema_600",
    classes: ['block-thumbnail']
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "block-content-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    tag: "h3",
    pretitle: post.post_type_details.post_type_display_name,
    title: post.post_title
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (DefaultBlock);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX2Jsb2NrX0RlZmF1bHRCbG9ja190c3guYnVuZGxlLmpzP3Y9MTcyNjAxNzg0ODY1MSIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDa0I7QUFDUTtBQUNKO0FBQ2hELElBQU1JLFlBQVksR0FBRyxTQUFmQSxZQUFZQSxDQUFBQyxJQUFBLEVBQW9EO0VBQUEsSUFBOUNDLEtBQUssR0FBQUQsSUFBQSxDQUFMQyxLQUFLO0lBQUVDLFdBQVcsR0FBQUYsSUFBQSxDQUFYRSxXQUFXO0lBQUVDLE1BQU0sR0FBQUgsSUFBQSxDQUFORyxNQUFNO0lBQUVDLElBQUksR0FBQUosSUFBQSxDQUFKSSxJQUFJO0lBQUVDLElBQUksR0FBQUwsSUFBQSxDQUFKSyxJQUFJO0VBQzFELE9BQVFWLDBEQUFtQixDQUFDLElBQUksRUFBRTtJQUFFWSxTQUFTLEVBQUU7RUFBaUIsQ0FBQyxFQUM3RFosMERBQW1CLENBQUNDLGlFQUFHLEVBQUU7SUFBRVksT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO0lBQUVDLEdBQUcsRUFBRUwsSUFBSSxDQUFDTSxTQUFTO0lBQUVDLEtBQUssRUFBRVAsSUFBSSxDQUFDUTtFQUFXLENBQUMsRUFDN0ZqQiwwREFBbUIsQ0FBQ0csbUVBQUssRUFBRTtJQUFFZSxLQUFLLEVBQUVULElBQUksQ0FBQ1UsY0FBYztJQUFFQyxJQUFJLEVBQUUsWUFBWTtJQUFFUCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUI7RUFBRSxDQUFDLENBQUMsRUFDNUdiLDBEQUFtQixDQUFDLEtBQUssRUFBRTtJQUFFWSxTQUFTLEVBQUU7RUFBd0IsQ0FBQyxFQUM3RFosMERBQW1CLENBQUNFLHFFQUFPLEVBQUU7SUFBRW1CLEdBQUcsRUFBRSxJQUFJO0lBQUVDLFFBQVEsRUFBRWIsSUFBSSxDQUFDYyxpQkFBaUIsQ0FBQ0Msc0JBQXNCO0lBQUVSLEtBQUssRUFBRVAsSUFBSSxDQUFDUTtFQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvSSxDQUFDO0FBQ0QsK0RBQWViLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvYmxvY2svRGVmYXVsdEJsb2NrLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENUQSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQ1RBJztcbmltcG9ydCBIZWFkaW5nIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9IZWFkaW5nJztcbmltcG9ydCBJbWFnZSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSW1hZ2UnO1xuY29uc3QgRGVmYXVsdEJsb2NrID0gKHsgaW5kZXgsIHBhbmVsU2xpZGVyLCBwZXJSb3csIHBvc3QsIHR5cGUsIH0pID0+IHtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJoYXMtYmxvY2stbGlua1wiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IGNsYXNzZXM6IFsnYmxvY2stbGluayddLCB1cmw6IHBvc3QucGVybWFsaW5rLCB0aXRsZTogcG9zdC5wb3N0X3RpdGxlIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEltYWdlLCB7IGltYWdlOiBwb3N0LnBvc3RfdGh1bWJuYWlsLCBzaXplOiBcImNpbmVtYV82MDBcIiwgY2xhc3NlczogWydibG9jay10aHVtYm5haWwnXSB9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2stY29udGVudC13cmFwcGVyXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlYWRpbmcsIHsgdGFnOiBcImgzXCIsIHByZXRpdGxlOiBwb3N0LnBvc3RfdHlwZV9kZXRhaWxzLnBvc3RfdHlwZV9kaXNwbGF5X25hbWUsIHRpdGxlOiBwb3N0LnBvc3RfdGl0bGUgfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRCbG9jaztcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkNUQSIsIkhlYWRpbmciLCJJbWFnZSIsIkRlZmF1bHRCbG9jayIsIl9yZWYiLCJpbmRleCIsInBhbmVsU2xpZGVyIiwicGVyUm93IiwicG9zdCIsInR5cGUiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiY2xhc3NlcyIsInVybCIsInBlcm1hbGluayIsInRpdGxlIiwicG9zdF90aXRsZSIsImltYWdlIiwicG9zdF90aHVtYm5haWwiLCJzaXplIiwidGFnIiwicHJldGl0bGUiLCJwb3N0X3R5cGVfZGV0YWlscyIsInBvc3RfdHlwZV9kaXNwbGF5X25hbWUiXSwic291cmNlUm9vdCI6IiJ9