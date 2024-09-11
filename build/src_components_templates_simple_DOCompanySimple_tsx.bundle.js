"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_simple_DOCompanySimple_tsx"],{

/***/ "./src/components/templates/simple/DOCompanySimple.tsx":
/*!*************************************************************!*\
  !*** ./src/components/templates/simple/DOCompanySimple.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");



var DOCompanySimple = function DOCompanySimple(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var image = post.fields[post.post_type_details.meta_prefix + '_logo'];
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    key: index
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_2__["default"], {
    image: image,
    size: "logo"
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_1__["default"], {
    tag: "h3",
    title: post.post_title,
    classes: ['screen-reader-text']
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (DOCompanySimple);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX3NpbXBsZV9ET0NvbXBhbnlTaW1wbGVfdHN4LmJ1bmRsZS5qcz92PTE3MjYwMTc4NDg2NTEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDMEI7QUFDSjtBQUNoRCxJQUFNRyxlQUFlLEdBQUcsU0FBbEJBLGVBQWVBLENBQUFDLElBQUEsRUFBb0Q7RUFBQSxJQUE5Q0MsS0FBSyxHQUFBRCxJQUFBLENBQUxDLEtBQUs7SUFBRUMsV0FBVyxHQUFBRixJQUFBLENBQVhFLFdBQVc7SUFBRUMsTUFBTSxHQUFBSCxJQUFBLENBQU5HLE1BQU07SUFBRUMsSUFBSSxHQUFBSixJQUFBLENBQUpJLElBQUk7SUFBRUMsSUFBSSxHQUFBTCxJQUFBLENBQUpLLElBQUk7RUFDN0QsSUFBTUMsS0FBSyxHQUFHRixJQUFJLENBQUNHLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDSSxpQkFBaUIsQ0FBQ0MsV0FBVyxHQUFHLE9BQU8sQ0FBQztFQUN2RSxPQUFRYiwwREFBbUIsQ0FBQyxJQUFJLEVBQUU7SUFBRWUsR0FBRyxFQUFFVjtFQUFNLENBQUMsRUFDNUNMLDBEQUFtQixDQUFDRSxtRUFBSyxFQUFFO0lBQUVRLEtBQUssRUFBRUEsS0FBSztJQUFFTSxJQUFJLEVBQUU7RUFBTyxDQUFDLENBQUMsRUFDMURoQiwwREFBbUIsQ0FBQ0MscUVBQU8sRUFBRTtJQUFFZ0IsR0FBRyxFQUFFLElBQUk7SUFBRUMsS0FBSyxFQUFFVixJQUFJLENBQUNXLFVBQVU7SUFBRUMsT0FBTyxFQUFFLENBQUMsb0JBQW9CO0VBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0csQ0FBQztBQUNELCtEQUFlakIsZUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW1wbGUvRE9Db21wYW55U2ltcGxlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlYWRpbmcgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0hlYWRpbmcnO1xuaW1wb3J0IEltYWdlIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9JbWFnZSc7XG5jb25zdCBET0NvbXBhbnlTaW1wbGUgPSAoeyBpbmRleCwgcGFuZWxTbGlkZXIsIHBlclJvdywgcG9zdCwgdHlwZSwgfSkgPT4ge1xuICAgIGNvbnN0IGltYWdlID0gcG9zdC5maWVsZHNbcG9zdC5wb3N0X3R5cGVfZGV0YWlscy5tZXRhX3ByZWZpeCArICdfbG9nbyddO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsga2V5OiBpbmRleCB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEltYWdlLCB7IGltYWdlOiBpbWFnZSwgc2l6ZTogXCJsb2dvXCIgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZGluZywgeyB0YWc6IFwiaDNcIiwgdGl0bGU6IHBvc3QucG9zdF90aXRsZSwgY2xhc3NlczogWydzY3JlZW4tcmVhZGVyLXRleHQnXSB9KSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IERPQ29tcGFueVNpbXBsZTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkhlYWRpbmciLCJJbWFnZSIsIkRPQ29tcGFueVNpbXBsZSIsIl9yZWYiLCJpbmRleCIsInBhbmVsU2xpZGVyIiwicGVyUm93IiwicG9zdCIsInR5cGUiLCJpbWFnZSIsImZpZWxkcyIsInBvc3RfdHlwZV9kZXRhaWxzIiwibWV0YV9wcmVmaXgiLCJjcmVhdGVFbGVtZW50Iiwia2V5Iiwic2l6ZSIsInRhZyIsInRpdGxlIiwicG9zdF90aXRsZSIsImNsYXNzZXMiXSwic291cmNlUm9vdCI6IiJ9