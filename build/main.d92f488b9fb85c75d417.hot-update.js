"use strict";
self["webpackHotUpdatedevelopers_only"]("main",{

/***/ "./src/components/templates/Layout.tsx":
/*!*********************************************!*\
  !*** ./src/components/templates/Layout.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aos */ "./node_modules/aos/dist/aos.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_2__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/utils/display'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/loaders/TemplateLoader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/components/layout/Header'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/components/layout/Footer'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var aos_dist_aos_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aos/dist/aos.css */ "./node_modules/aos/dist/aos.css");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'assets/styles/components/to-top.scss'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

var _wp$element = wp.element,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;









var Layout = function Layout(_ref) {
  var _ref$iframe = _ref.iframe,
    iframe = _ref$iframe === void 0 ? false : _ref$iframe,
    _ref$postType = _ref.postType,
    postType = _ref$postType === void 0 ? '' : _ref$postType,
    _ref$slug = _ref.slug,
    slug = _ref$slug === void 0 ? '' : _ref$slug;
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useParams)(),
    postTypeParam = _useParams.postTypeParam,
    slugParam = _useParams.slugParam;
  var finalSlug = slug ? slug : slugParam ? slugParam : '';
  var finalPostType = postType ? postType : postTypeParam ? postTypeParam : '';
  var _useState = useState(''),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    mainElementClasses = _useState2[0],
    setMainElementClasses = _useState2[1];
  var finalIframe = iframe ? iframe : false;
  var layoutClasses = function layoutClasses(classes) {
    if (finalIframe) {
      classes.push('iframe');
    }
    var classesString = classes.join(' ');
    setMainElementClasses(classesString);
  };
  var queryString = window.location.search.replace('?', '');
  useEffect(function () {
    new Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/utils/display'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
    aos__WEBPACK_IMPORTED_MODULE_2___default().init({
      offset: 150,
      delay: 100,
      duration: 1100,
      easing: 'ease',
      once: true
    });
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, iframe ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement("main", {
    id: "content",
    className: mainElementClasses
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/loaders/TemplateLoader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
    postType: finalPostType,
    slug: finalSlug,
    layoutClassesFunction: layoutClasses,
    queryString: queryString
  })) : react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/components/layout/Header'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
    color: finalSlug === 'home' ? 'dark' : 'light'
  }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("main", {
    id: "content",
    className: mainElementClasses
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/loaders/TemplateLoader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
    postType: finalPostType,
    slug: finalSlug,
    layoutClassesFunction: layoutClasses,
    queryString: queryString
  })), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/components/layout/Footer'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), null)));
};
/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./node_modules/aos/dist/aos.css":
/*!***************************************!*\
  !*** ./node_modules/aos/dist/aos.css ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1724342247990
      var cssReload = __webpack_require__(/*! ../../mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "2e2ac51257730348f96d"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLEVBQUU7SUFBRTBDLEtBQUssRUFBRTdCLFNBQVMsS0FBSyxNQUFNLEdBQUcsTUFBTSxHQUFHO0VBQVEsQ0FBQyxDQUFDLEVBQy9FbEIsMERBQW1CLENBQUMsTUFBTSxFQUFFO0lBQUU0QyxFQUFFLEVBQUUsU0FBUztJQUFFQyxTQUFTLEVBQUV0QjtFQUFtQixDQUFDLEVBQ3hFdkIsMERBQW1CLENBQUNJLHlKQUFjLEVBQUU7SUFBRVEsUUFBUSxFQUFFTyxhQUFhO0lBQUVMLElBQUksRUFBRUksU0FBUztJQUFFNEIscUJBQXFCLEVBQUVwQixhQUFhO0lBQUVLLFdBQVcsRUFBRUE7RUFBWSxDQUFDLENBQUMsQ0FBQyxFQUN0Si9CLDBEQUFtQixDQUFDTSwySkFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUNELCtEQUFlQyxNQUFNOzs7Ozs7Ozs7OztBQzNDckI7QUFDVTtBQUNWLE9BQU8sSUFBVTtBQUNqQjtBQUNBLHNCQUFzQixtQkFBTyxDQUFDLCtJQUFnRSxjQUFjLGVBQWU7QUFDM0gsTUFBTSxVQUFVO0FBQ2hCLE1BQU0saUJBQWlCO0FBQ3ZCO0FBQ0E7Ozs7Ozs7O1VDUkEscUNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL0xheW91dC50c3giLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vbm9kZV9tb2R1bGVzL2Fvcy9kaXN0L2Fvcy5jc3M/Y2M5ZiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9ID0gd3AuZWxlbWVudDtcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VQYXJhbXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBBT1MgZnJvbSAnYW9zJztcbmltcG9ydCB7IERvQmFja1RvVG9wIH0gZnJvbSAnc3JjL3V0aWxzL2Rpc3BsYXknO1xuaW1wb3J0IFRlbXBsYXRlTG9hZGVyIGZyb20gJ3NyYy9sb2FkZXJzL1RlbXBsYXRlTG9hZGVyJztcbmltcG9ydCBIZWFkZXIgZnJvbSAnc3JjL2NvbXBvbmVudHMvbGF5b3V0L0hlYWRlcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJ3NyYy9jb21wb25lbnRzL2xheW91dC9Gb290ZXInO1xuaW1wb3J0ICdhb3MvZGlzdC9hb3MuY3NzJztcbmltcG9ydCAnYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3RvLXRvcC5zY3NzJztcbmNvbnN0IExheW91dCA9ICh7IGlmcmFtZSA9IGZhbHNlLCBwb3N0VHlwZSA9ICcnLCBzbHVnID0gJycgfSkgPT4ge1xuICAgIGNvbnN0IHsgcG9zdFR5cGVQYXJhbSwgc2x1Z1BhcmFtIH0gPSB1c2VQYXJhbXMoKTtcbiAgICBjb25zdCBmaW5hbFNsdWcgPSBzbHVnID8gc2x1ZyA6IChzbHVnUGFyYW0gPyBzbHVnUGFyYW0gOiAnJyk7XG4gICAgY29uc3QgZmluYWxQb3N0VHlwZSA9IHBvc3RUeXBlID8gcG9zdFR5cGUgOiAocG9zdFR5cGVQYXJhbSA/IHBvc3RUeXBlUGFyYW0gOiAnJyk7XG4gICAgY29uc3QgW21haW5FbGVtZW50Q2xhc3Nlcywgc2V0TWFpbkVsZW1lbnRDbGFzc2VzXSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCBmaW5hbElmcmFtZSA9IGlmcmFtZSA/IGlmcmFtZSA6IGZhbHNlO1xuICAgIGNvbnN0IGxheW91dENsYXNzZXMgPSAoY2xhc3NlcykgPT4ge1xuICAgICAgICBpZiAoZmluYWxJZnJhbWUpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnaWZyYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xhc3Nlc1N0cmluZyA9IGNsYXNzZXMuam9pbignICcpO1xuICAgICAgICBzZXRNYWluRWxlbWVudENsYXNzZXMoY2xhc3Nlc1N0cmluZyk7XG4gICAgfTtcbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gucmVwbGFjZSgnPycsICcnKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBuZXcgRG9CYWNrVG9Ub3AoKTtcbiAgICAgICAgQU9TLmluaXQoe1xuICAgICAgICAgICAgb2Zmc2V0OiAxNTAsXG4gICAgICAgICAgICBkZWxheTogMTAwLFxuICAgICAgICAgICAgZHVyYXRpb246IDExMDAsXG4gICAgICAgICAgICBlYXNpbmc6ICdlYXNlJyxcbiAgICAgICAgICAgIG9uY2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGlmcmFtZSA/XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIsIHsgaWQ6IFwiY29udGVudFwiLCBjbGFzc05hbWU6IG1haW5FbGVtZW50Q2xhc3NlcyB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZW1wbGF0ZUxvYWRlciwgeyBwb3N0VHlwZTogZmluYWxQb3N0VHlwZSwgc2x1ZzogZmluYWxTbHVnLCBsYXlvdXRDbGFzc2VzRnVuY3Rpb246IGxheW91dENsYXNzZXMsIHF1ZXJ5U3RyaW5nOiBxdWVyeVN0cmluZyB9KSlcbiAgICAgICAgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIZWFkZXIsIHsgY29sb3I6IGZpbmFsU2x1ZyA9PT0gJ2hvbWUnID8gJ2RhcmsnIDogJ2xpZ2h0JyB9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIsIHsgaWQ6IFwiY29udGVudFwiLCBjbGFzc05hbWU6IG1haW5FbGVtZW50Q2xhc3NlcyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGVtcGxhdGVMb2FkZXIsIHsgcG9zdFR5cGU6IGZpbmFsUG9zdFR5cGUsIHNsdWc6IGZpbmFsU2x1ZywgbGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uOiBsYXlvdXRDbGFzc2VzLCBxdWVyeVN0cmluZzogcXVlcnlTdHJpbmcgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb290ZXIsIG51bGwpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IExheW91dDtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjQzNDIyNDc5OTBcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiMmUyYWM1MTI1NzczMDM0OGY5NmRcIjsgfSJdLCJuYW1lcyI6WyJfd3AkZWxlbWVudCIsIndwIiwiZWxlbWVudCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiUmVhY3QiLCJ1c2VQYXJhbXMiLCJBT1MiLCJEb0JhY2tUb1RvcCIsIlRlbXBsYXRlTG9hZGVyIiwiSGVhZGVyIiwiRm9vdGVyIiwiTGF5b3V0IiwiX3JlZiIsIl9yZWYkaWZyYW1lIiwiaWZyYW1lIiwiX3JlZiRwb3N0VHlwZSIsInBvc3RUeXBlIiwiX3JlZiRzbHVnIiwic2x1ZyIsIl91c2VQYXJhbXMiLCJwb3N0VHlwZVBhcmFtIiwic2x1Z1BhcmFtIiwiZmluYWxTbHVnIiwiZmluYWxQb3N0VHlwZSIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsIm1haW5FbGVtZW50Q2xhc3NlcyIsInNldE1haW5FbGVtZW50Q2xhc3NlcyIsImZpbmFsSWZyYW1lIiwibGF5b3V0Q2xhc3NlcyIsImNsYXNzZXMiLCJwdXNoIiwiY2xhc3Nlc1N0cmluZyIsImpvaW4iLCJxdWVyeVN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicmVwbGFjZSIsImluaXQiLCJvZmZzZXQiLCJkZWxheSIsImR1cmF0aW9uIiwiZWFzaW5nIiwib25jZSIsImNyZWF0ZUVsZW1lbnQiLCJGcmFnbWVudCIsImlkIiwiY2xhc3NOYW1lIiwibGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uIiwiY29sb3IiXSwic291cmNlUm9vdCI6IiJ9