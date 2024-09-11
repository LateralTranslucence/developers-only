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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aos */ "./node_modules/aos/dist/aos.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_utils_display__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/utils/display */ "./src/utils/display/index.ts");
/* harmony import */ var src_loaders_TemplateLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/loaders/TemplateLoader */ "./src/loaders/TemplateLoader.tsx");
/* harmony import */ var src_components_layout_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/layout/Header */ "./src/components/layout/Header.tsx");
/* harmony import */ var src_components_layout_Footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/components/layout/Footer */ "./src/components/layout/Footer.tsx");
/* harmony import */ var aos_dist_aos_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! aos/dist/aos.css */ "./node_modules/aos/dist/aos.css");
/* harmony import */ var assets_styles_components_to_top_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! assets/styles/components/to-top.scss */ "./assets/styles/components/to-top.scss");


var _wp$element = wp.element,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;








var Layout = function Layout(_ref) {
  var _ref$iframe = _ref.iframe,
    iframe = _ref$iframe === void 0 ? false : _ref$iframe,
    _ref$postType = _ref.postType,
    propPostType = _ref$postType === void 0 ? '' : _ref$postType,
    _ref$slug = _ref.slug,
    propSlug = _ref$slug === void 0 ? '' : _ref$slug;
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useParams)(),
    paramPostType = _useParams.postType,
    paramSlug = _useParams.slug;
  var finalPostType = propPostType || paramPostType || '';
  var finalSlug = propSlug || paramSlug || '';
  var finalIframe = iframe || false;
  var _useState = useState(''),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    mainElementClasses = _useState2[0],
    setMainElementClasses = _useState2[1];
  var layoutClasses = function layoutClasses(classes) {
    if (finalIframe) {
      classes.push('iframe');
    }
    setMainElementClasses(classes.join(' '));
  };
  useEffect(function () {
    new src_utils_display__WEBPACK_IMPORTED_MODULE_3__.DoBackToTop();
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
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_loaders_TemplateLoader__WEBPACK_IMPORTED_MODULE_4__["default"], {
    postType: finalPostType,
    slug: finalSlug,
    layoutClassesFunction: layoutClasses,
    queryString: window.location.search.replace('?', '')
  })) : react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_layout_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("main", {
    id: "content",
    className: mainElementClasses
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_loaders_TemplateLoader__WEBPACK_IMPORTED_MODULE_4__["default"], {
    postType: finalPostType,
    slug: finalSlug,
    layoutClassesFunction: layoutClasses,
    queryString: window.location.search.replace('?', '')
  })), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_layout_Footer__WEBPACK_IMPORTED_MODULE_6__["default"], null)));
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
      // 1726024962669
      var cssReload = __webpack_require__(/*! ../../mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/buttons.scss":
/*!***********************************************!*\
  !*** ./assets/styles/components/buttons.scss ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024963119
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/feedback.scss":
/*!************************************************!*\
  !*** ./assets/styles/components/feedback.scss ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024962734
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/footer.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/footer.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024962732
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/header-promo.scss":
/*!****************************************************!*\
  !*** ./assets/styles/components/header-promo.scss ***!
  \****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024963082
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/header.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/header.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024962806
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/image.scss":
/*!*********************************************!*\
  !*** ./assets/styles/components/image.scss ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024963249
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/infographic.scss":
/*!***************************************************!*\
  !*** ./assets/styles/components/infographic.scss ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024963346
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/modals.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/modals.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024963121
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/search.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/search.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024963084
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/select-list.scss":
/*!***************************************************!*\
  !*** ./assets/styles/components/select-list.scss ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024963170
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/sites-menu.scss":
/*!**************************************************!*\
  !*** ./assets/styles/components/sites-menu.scss ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024962804
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/social-menu.scss":
/*!***************************************************!*\
  !*** ./assets/styles/components/social-menu.scss ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024963142
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/to-top.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/to-top.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726024962673
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "bf2d9659aa778cb0db9f"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7OztVQ1JBLHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9MYXlvdXQudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL25vZGVfbW9kdWxlcy9hb3MvZGlzdC9hb3MuY3NzP2NjOWYiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2J1dHRvbnMuc2Nzcz8yM2U3Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9mZWVkYmFjay5zY3NzPzc3MWMiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2Zvb3Rlci5zY3NzPzlkOTUiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2hlYWRlci1wcm9tby5zY3NzP2Y0NGIiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2hlYWRlci5zY3NzPzQxNWUiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2ltYWdlLnNjc3M/MTQ3NCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvaW5mb2dyYXBoaWMuc2Nzcz82Y2ZjIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9tb2RhbHMuc2Nzcz9kNDAyIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zZWFyY2guc2Nzcz81NTIxIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zZWxlY3QtbGlzdC5zY3NzPzY4YjgiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3NpdGVzLW1lbnUuc2Nzcz9lYzA5Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zb2NpYWwtbWVudS5zY3NzPzc5YzMiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3RvLXRvcC5zY3NzP2E5OTIiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5L3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gPSB3cC5lbGVtZW50O1xuaW1wb3J0IHsgdXNlUGFyYW1zIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgQU9TIGZyb20gJ2Fvcyc7XG5pbXBvcnQgeyBEb0JhY2tUb1RvcCB9IGZyb20gJ3NyYy91dGlscy9kaXNwbGF5JztcbmltcG9ydCBUZW1wbGF0ZUxvYWRlciBmcm9tICdzcmMvbG9hZGVycy9UZW1wbGF0ZUxvYWRlcic7XG5pbXBvcnQgSGVhZGVyIGZyb20gJ3NyYy9jb21wb25lbnRzL2xheW91dC9IZWFkZXInO1xuaW1wb3J0IEZvb3RlciBmcm9tICdzcmMvY29tcG9uZW50cy9sYXlvdXQvRm9vdGVyJztcbmltcG9ydCAnYW9zL2Rpc3QvYW9zLmNzcyc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy90by10b3Auc2Nzcyc7XG5jb25zdCBMYXlvdXQgPSAoeyBpZnJhbWUgPSBmYWxzZSwgcG9zdFR5cGU6IHByb3BQb3N0VHlwZSA9ICcnLCBzbHVnOiBwcm9wU2x1ZyA9ICcnIH0pID0+IHtcbiAgICBjb25zdCB7IHBvc3RUeXBlOiBwYXJhbVBvc3RUeXBlLCBzbHVnOiBwYXJhbVNsdWcgfSA9IHVzZVBhcmFtcygpO1xuICAgIGNvbnN0IGZpbmFsUG9zdFR5cGUgPSBwcm9wUG9zdFR5cGUgfHwgcGFyYW1Qb3N0VHlwZSB8fCAnJztcbiAgICBjb25zdCBmaW5hbFNsdWcgPSBwcm9wU2x1ZyB8fCBwYXJhbVNsdWcgfHwgJyc7XG4gICAgY29uc3QgZmluYWxJZnJhbWUgPSBpZnJhbWUgfHwgZmFsc2U7XG4gICAgY29uc3QgW21haW5FbGVtZW50Q2xhc3Nlcywgc2V0TWFpbkVsZW1lbnRDbGFzc2VzXSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCBsYXlvdXRDbGFzc2VzID0gKGNsYXNzZXMpID0+IHtcbiAgICAgICAgaWYgKGZpbmFsSWZyYW1lKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2lmcmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIHNldE1haW5FbGVtZW50Q2xhc3NlcyhjbGFzc2VzLmpvaW4oJyAnKSk7XG4gICAgfTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBuZXcgRG9CYWNrVG9Ub3AoKTtcbiAgICAgICAgQU9TLmluaXQoe1xuICAgICAgICAgICAgb2Zmc2V0OiAxNTAsXG4gICAgICAgICAgICBkZWxheTogMTAwLFxuICAgICAgICAgICAgZHVyYXRpb246IDExMDAsXG4gICAgICAgICAgICBlYXNpbmc6ICdlYXNlJyxcbiAgICAgICAgICAgIG9uY2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGlmcmFtZSA/XG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIsIHsgaWQ6IFwiY29udGVudFwiLCBjbGFzc05hbWU6IG1haW5FbGVtZW50Q2xhc3NlcyB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZW1wbGF0ZUxvYWRlciwgeyBwb3N0VHlwZTogZmluYWxQb3N0VHlwZSwgc2x1ZzogZmluYWxTbHVnLCBsYXlvdXRDbGFzc2VzRnVuY3Rpb246IGxheW91dENsYXNzZXMsIHF1ZXJ5U3RyaW5nOiB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnJlcGxhY2UoJz8nLCAnJykgfSkpXG4gICAgICAgIDogUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZGVyLCBudWxsKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIsIHsgaWQ6IFwiY29udGVudFwiLCBjbGFzc05hbWU6IG1haW5FbGVtZW50Q2xhc3NlcyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGVtcGxhdGVMb2FkZXIsIHsgcG9zdFR5cGU6IGZpbmFsUG9zdFR5cGUsIHNsdWc6IGZpbmFsU2x1ZywgbGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uOiBsYXlvdXRDbGFzc2VzLCBxdWVyeVN0cmluZzogd2luZG93LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKCc/JywgJycpIH0pKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9vdGVyLCBudWxsKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBMYXlvdXQ7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0OTYyNjY5XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNDk2MzExOVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0OTYyNzM0XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjQ5NjI3MzJcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNDk2MzA4MlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0OTYyODA2XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjQ5NjMyNDlcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNDk2MzM0NlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0OTYzMTIxXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjQ5NjMwODRcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNDk2MzE3MFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0OTYyODA0XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjQ5NjMxNDJcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNDk2MjY3M1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiYmYyZDk2NTlhYTc3OGNiMGRiOWZcIjsgfSJdLCJuYW1lcyI6WyJSZWFjdCIsIl93cCRlbGVtZW50Iiwid3AiLCJlbGVtZW50IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VQYXJhbXMiLCJBT1MiLCJEb0JhY2tUb1RvcCIsIlRlbXBsYXRlTG9hZGVyIiwiSGVhZGVyIiwiRm9vdGVyIiwiTGF5b3V0IiwiX3JlZiIsIl9yZWYkaWZyYW1lIiwiaWZyYW1lIiwiX3JlZiRwb3N0VHlwZSIsInBvc3RUeXBlIiwicHJvcFBvc3RUeXBlIiwiX3JlZiRzbHVnIiwic2x1ZyIsInByb3BTbHVnIiwiX3VzZVBhcmFtcyIsInBhcmFtUG9zdFR5cGUiLCJwYXJhbVNsdWciLCJmaW5hbFBvc3RUeXBlIiwiZmluYWxTbHVnIiwiZmluYWxJZnJhbWUiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJtYWluRWxlbWVudENsYXNzZXMiLCJzZXRNYWluRWxlbWVudENsYXNzZXMiLCJsYXlvdXRDbGFzc2VzIiwiY2xhc3NlcyIsInB1c2giLCJqb2luIiwiaW5pdCIsIm9mZnNldCIsImRlbGF5IiwiZHVyYXRpb24iLCJlYXNpbmciLCJvbmNlIiwiY3JlYXRlRWxlbWVudCIsIkZyYWdtZW50IiwiaWQiLCJjbGFzc05hbWUiLCJsYXlvdXRDbGFzc2VzRnVuY3Rpb24iLCJxdWVyeVN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicmVwbGFjZSJdLCJzb3VyY2VSb290IjoiIn0=