"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_block_DOCompanyBlock_tsx"],{

/***/ "./src/components/templates/block/DOCompanyBlock.tsx":
/*!***********************************************************!*\
  !*** ./src/components/templates/block/DOCompanyBlock.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");





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
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__["default"], {
    url: clientLink,
    title: title,
    classes: ['block-link']
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__["default"], {
    image: image,
    size: "logo"
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__["default"], {
    tag: "h3",
    title: title,
    classes: ['screen-reader-text']
  }), description ? (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.doParse)(description) : null)));
};
/* harmony default export */ __webpack_exports__["default"] = (DOCompanyBlock);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX2Jsb2NrX0RPQ29tcGFueUJsb2NrX3RzeC5idW5kbGUuanM/dj0xNzI2MDE3ODQ4NjUxIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDa0I7QUFDQTtBQUNRO0FBQ0o7QUFDaEQsSUFBTUssY0FBYyxHQUFHLFNBQWpCQSxjQUFjQSxDQUFBQyxJQUFBLEVBQW9EO0VBQUEsSUFBOUNDLEtBQUssR0FBQUQsSUFBQSxDQUFMQyxLQUFLO0lBQUVDLFdBQVcsR0FBQUYsSUFBQSxDQUFYRSxXQUFXO0lBQUVDLE1BQU0sR0FBQUgsSUFBQSxDQUFORyxNQUFNO0lBQUVDLElBQUksR0FBQUosSUFBQSxDQUFKSSxJQUFJO0lBQUVDLElBQUksR0FBQUwsSUFBQSxDQUFKSyxJQUFJO0VBQzVELElBQU1DLFVBQVUsR0FBR0YsSUFBSSxDQUFDRyxpQkFBaUIsQ0FBQ0MsV0FBVztFQUNyRCxJQUFNQyxLQUFLLEdBQUdMLElBQUksQ0FBQ00sTUFBTSxDQUFDSixVQUFVLEdBQUcsZUFBZSxDQUFDO0VBQ3ZELElBQU1LLFdBQVcsR0FBR1AsSUFBSSxDQUFDTSxNQUFNLENBQUNKLFVBQVUsR0FBRyxjQUFjLENBQUM7RUFDNUQsSUFBTU0sVUFBVSxHQUFHUixJQUFJLENBQUNNLE1BQU0sQ0FBQ0osVUFBVSxHQUFHLE1BQU0sQ0FBQztFQUNuRCxJQUFNTyxLQUFLLEdBQUdULElBQUksQ0FBQ00sTUFBTSxDQUFDSixVQUFVLEdBQUcsYUFBYSxDQUFDO0VBQ3JELE9BQVFaLDBEQUFtQixDQUFDLElBQUksRUFBRTtJQUFFcUIsR0FBRyxFQUFFZDtFQUFNLENBQUMsRUFDNUNQLDBEQUFtQixDQUFDRSxpRUFBRyxFQUFFO0lBQUVvQixHQUFHLEVBQUVKLFVBQVU7SUFBRUgsS0FBSyxFQUFFQSxLQUFLO0lBQUVRLE9BQU8sRUFBRSxDQUFDLFlBQVk7RUFBRSxDQUFDLEVBQy9FdkIsMERBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksRUFDNUJBLDBEQUFtQixDQUFDSSxtRUFBSyxFQUFFO0lBQUVlLEtBQUssRUFBRUEsS0FBSztJQUFFSyxJQUFJLEVBQUU7RUFBTyxDQUFDLENBQUMsRUFDMUR4QiwwREFBbUIsQ0FBQ0cscUVBQU8sRUFBRTtJQUFFc0IsR0FBRyxFQUFFLElBQUk7SUFBRVYsS0FBSyxFQUFFQSxLQUFLO0lBQUVRLE9BQU8sRUFBRSxDQUFDLG9CQUFvQjtFQUFFLENBQUMsQ0FBQyxFQUMxRk4sV0FBVyxHQUNQaEIsMERBQU8sQ0FBQ2dCLFdBQVcsQ0FBQyxHQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFDRCwrREFBZVosY0FBYyIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9ibG9jay9ET0NvbXBhbnlCbG9jay50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGRvUGFyc2UgfSBmcm9tICdzcmMvdXRpbHMvaGVscGVycyc7XG5pbXBvcnQgQ1RBIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9DVEEnO1xuaW1wb3J0IEhlYWRpbmcgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0hlYWRpbmcnO1xuaW1wb3J0IEltYWdlIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9JbWFnZSc7XG5jb25zdCBET0NvbXBhbnlCbG9jayA9ICh7IGluZGV4LCBwYW5lbFNsaWRlciwgcGVyUm93LCBwb3N0LCB0eXBlLCB9KSA9PiB7XG4gICAgY29uc3QgbWV0YVByZWZpeCA9IHBvc3QucG9zdF90eXBlX2RldGFpbHMubWV0YV9wcmVmaXg7XG4gICAgY29uc3QgdGl0bGUgPSBwb3N0LmZpZWxkc1ttZXRhUHJlZml4ICsgJ19jb21wYW55X25hbWUnXTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHBvc3QuZmllbGRzW21ldGFQcmVmaXggKyAnX2Rlc2NyaXB0aW9uJ107XG4gICAgY29uc3QgY2xpZW50TGluayA9IHBvc3QuZmllbGRzW21ldGFQcmVmaXggKyAnX3VybCddO1xuICAgIGNvbnN0IGltYWdlID0gcG9zdC5maWVsZHNbbWV0YVByZWZpeCArICdfd2hpdGVfbG9nbyddO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsga2V5OiBpbmRleCB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENUQSwgeyB1cmw6IGNsaWVudExpbmssIHRpdGxlOiB0aXRsZSwgY2xhc3NlczogWydibG9jay1saW5rJ10gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbWFnZSwgeyBpbWFnZTogaW1hZ2UsIHNpemU6IFwibG9nb1wiIH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZGluZywgeyB0YWc6IFwiaDNcIiwgdGl0bGU6IHRpdGxlLCBjbGFzc2VzOiBbJ3NjcmVlbi1yZWFkZXItdGV4dCddIH0pLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID9cbiAgICAgICAgICAgICAgICAgICAgZG9QYXJzZShkZXNjcmlwdGlvbilcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBET0NvbXBhbnlCbG9jaztcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImRvUGFyc2UiLCJDVEEiLCJIZWFkaW5nIiwiSW1hZ2UiLCJET0NvbXBhbnlCbG9jayIsIl9yZWYiLCJpbmRleCIsInBhbmVsU2xpZGVyIiwicGVyUm93IiwicG9zdCIsInR5cGUiLCJtZXRhUHJlZml4IiwicG9zdF90eXBlX2RldGFpbHMiLCJtZXRhX3ByZWZpeCIsInRpdGxlIiwiZmllbGRzIiwiZGVzY3JpcHRpb24iLCJjbGllbnRMaW5rIiwiaW1hZ2UiLCJjcmVhdGVFbGVtZW50Iiwia2V5IiwidXJsIiwiY2xhc3NlcyIsInNpemUiLCJ0YWciXSwic291cmNlUm9vdCI6IiJ9