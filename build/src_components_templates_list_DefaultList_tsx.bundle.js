"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_list_DefaultList_tsx"],{

/***/ "./src/components/templates/list/DefaultList.tsx":
/*!*******************************************************!*\
  !*** ./src/components/templates/list/DefaultList.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var assets_styles_components_blocks_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! assets/styles/components/blocks.scss */ "./assets/styles/components/blocks.scss");
/* harmony import */ var assets_styles_components_list_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! assets/styles/components/list.scss */ "./assets/styles/components/list.scss");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }





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
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({}, ctaSettings), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "block-content-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__["default"], {
    tag: "h3",
    pretitle: post.post_type_details.post_type_display_name,
    title: post.post_title
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (DefaultList);

/***/ }),

/***/ "./assets/styles/components/list.scss":
/*!********************************************!*\
  !*** ./assets/styles/components/list.scss ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726026377026
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX2xpc3RfRGVmYXVsdExpc3RfdHN4LmJ1bmRsZS5qcz92PTE3MjYwMTc4NDg2NTEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDa0I7QUFDUTtBQUNOO0FBQ0Y7QUFDNUMsSUFBTUcsV0FBVyxHQUFHLFNBQWRBLFdBQVdBLENBQUFDLElBQUEsRUFBb0Q7RUFBQSxJQUE5Q0MsS0FBSyxHQUFBRCxJQUFBLENBQUxDLEtBQUs7SUFBRUMsV0FBVyxHQUFBRixJQUFBLENBQVhFLFdBQVc7SUFBRUMsTUFBTSxHQUFBSCxJQUFBLENBQU5HLE1BQU07SUFBRUMsSUFBSSxHQUFBSixJQUFBLENBQUpJLElBQUk7SUFBRUMsSUFBSSxHQUFBTCxJQUFBLENBQUpLLElBQUk7RUFDekQsSUFBTUMsV0FBVyxHQUFHO0lBQ2hCQyxHQUFHLEVBQUVILElBQUksQ0FBQ0ksU0FBUztJQUNuQkMsS0FBSyxFQUFFTCxJQUFJLENBQUNNLFVBQVU7SUFDdEJDLE9BQU8sRUFBRSxDQUFDLFlBQVk7RUFDMUIsQ0FBQztFQUNELE9BQVFmLDBEQUFtQixDQUFDLElBQUksRUFBRTtJQUFFaUIsR0FBRyxFQUFFWixLQUFLO0lBQUUsWUFBWSxFQUFFQTtFQUFNLENBQUMsRUFDakVMLDBEQUFtQixDQUFDQyxpRUFBRyxFQUFBaUIsYUFBQSxLQUFPUixXQUFXLEdBQ3JDViwwREFBbUIsQ0FBQyxLQUFLLEVBQUU7SUFBRW1CLFNBQVMsRUFBRTtFQUF3QixDQUFDLEVBQzdEbkIsMERBQW1CLENBQUNFLHFFQUFPLEVBQUU7SUFBRWtCLEdBQUcsRUFBRSxJQUFJO0lBQUVDLFFBQVEsRUFBRWIsSUFBSSxDQUFDYyxpQkFBaUIsQ0FBQ0Msc0JBQXNCO0lBQUVWLEtBQUssRUFBRUwsSUFBSSxDQUFDTTtFQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvSSxDQUFDO0FBQ0QsK0RBQWVYLFdBQVc7Ozs7Ozs7Ozs7O0FDaEIxQjtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9saXN0L0RlZmF1bHRMaXN0LnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvbGlzdC5zY3NzPzlmYzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDVEEgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0NUQSc7XG5pbXBvcnQgSGVhZGluZyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSGVhZGluZyc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9ibG9ja3Muc2Nzcyc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9saXN0LnNjc3MnO1xuY29uc3QgRGVmYXVsdExpc3QgPSAoeyBpbmRleCwgcGFuZWxTbGlkZXIsIHBlclJvdywgcG9zdCwgdHlwZSwgfSkgPT4ge1xuICAgIGNvbnN0IGN0YVNldHRpbmdzID0ge1xuICAgICAgICB1cmw6IHBvc3QucGVybWFsaW5rLFxuICAgICAgICB0aXRsZTogcG9zdC5wb3N0X3RpdGxlLFxuICAgICAgICBjbGFzc2VzOiBbJ2Jsb2NrLWxpbmsnXSxcbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsga2V5OiBpbmRleCwgXCJkYXRhLWluZGV4XCI6IGluZGV4IH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IC4uLmN0YVNldHRpbmdzIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJsb2NrLWNvbnRlbnQtd3JhcHBlclwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIZWFkaW5nLCB7IHRhZzogXCJoM1wiLCBwcmV0aXRsZTogcG9zdC5wb3N0X3R5cGVfZGV0YWlscy5wb3N0X3R5cGVfZGlzcGxheV9uYW1lLCB0aXRsZTogcG9zdC5wb3N0X3RpdGxlIH0pKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGlzdDtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzcwMjZcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ1RBIiwiSGVhZGluZyIsIkRlZmF1bHRMaXN0IiwiX3JlZiIsImluZGV4IiwicGFuZWxTbGlkZXIiLCJwZXJSb3ciLCJwb3N0IiwidHlwZSIsImN0YVNldHRpbmdzIiwidXJsIiwicGVybWFsaW5rIiwidGl0bGUiLCJwb3N0X3RpdGxlIiwiY2xhc3NlcyIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJfb2JqZWN0U3ByZWFkIiwiY2xhc3NOYW1lIiwidGFnIiwicHJldGl0bGUiLCJwb3N0X3R5cGVfZGV0YWlscyIsInBvc3RfdHlwZV9kaXNwbGF5X25hbWUiXSwic291cmNlUm9vdCI6IiJ9