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
    paramPostType = _useParams.paramPostType,
    paramSlug = _useParams.paramSlug;
  var finalPostType = propPostType || paramPostType || '';
  var finalSlug = propSlug || paramSlug || '';
  console.log(finalPostType);
  console.log(finalSlug);
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
      // 1726024217322
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
      // 1726024218238
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
      // 1726024217446
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
      // 1726024217548
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
      // 1726024218059
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
      // 1726024217448
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
      // 1726024218401
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
      // 1726024218491
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
      // 1726024218235
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
      // 1726024218133
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
      // 1726024218280
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
      // 1726024217450
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
      // 1726024218248
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
      // 1726024217341
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "ce5ecfc90abf92cba5f8"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4yOWY5YjJjYzUyMTE4Yjk3ZWY0ZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQzFCLElBQUFDLFdBQUEsR0FBZ0NDLEVBQUUsQ0FBQ0MsT0FBTztFQUFsQ0MsU0FBUyxHQUFBSCxXQUFBLENBQVRHLFNBQVM7RUFBRUMsUUFBUSxHQUFBSixXQUFBLENBQVJJLFFBQVE7QUFDa0I7QUFDdkI7QUFDMEI7QUFDUTtBQUNOO0FBQ0E7QUFDeEI7QUFDb0I7QUFDOUMsSUFBTU8sTUFBTSxHQUFHLFNBQVRBLE1BQU1BLENBQUFDLElBQUEsRUFBNkU7RUFBQSxJQUFBQyxXQUFBLEdBQUFELElBQUEsQ0FBdkVFLE1BQU07SUFBTkEsTUFBTSxHQUFBRCxXQUFBLGNBQUcsS0FBSyxHQUFBQSxXQUFBO0lBQUFFLGFBQUEsR0FBQUgsSUFBQSxDQUFFSSxRQUFRO0lBQUVDLFlBQVksR0FBQUYsYUFBQSxjQUFHLEVBQUUsR0FBQUEsYUFBQTtJQUFBRyxTQUFBLEdBQUFOLElBQUEsQ0FBRU8sSUFBSTtJQUFFQyxRQUFRLEdBQUFGLFNBQUEsY0FBRyxFQUFFLEdBQUFBLFNBQUE7RUFDOUUsSUFBQUcsVUFBQSxHQUFxQ2hCLDJEQUFTLENBQUMsQ0FBQztJQUF4Q2lCLGFBQWEsR0FBQUQsVUFBQSxDQUFiQyxhQUFhO0lBQUVDLFNBQVMsR0FBQUYsVUFBQSxDQUFURSxTQUFTO0VBQ2hDLElBQU1DLGFBQWEsR0FBR1AsWUFBWSxJQUFJSyxhQUFhLElBQUksRUFBRTtFQUN6RCxJQUFNRyxTQUFTLEdBQUdMLFFBQVEsSUFBSUcsU0FBUyxJQUFJLEVBQUU7RUFDN0NHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSCxhQUFhLENBQUM7RUFDMUJFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixTQUFTLENBQUM7RUFDdEIsSUFBTUcsV0FBVyxHQUFHZCxNQUFNLElBQUksS0FBSztFQUNuQyxJQUFBZSxTQUFBLEdBQW9EekIsUUFBUSxDQUFDLEVB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LG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7VUNSQSxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9ub2RlX21vZHVsZXMvYW9zL2Rpc3QvYW9zLmNzcz9jYzlmIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9idXR0b25zLnNjc3M/MjNlNyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvZmVlZGJhY2suc2Nzcz83NzFjIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9mb290ZXIuc2Nzcz85ZDk1Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZWFkZXItcHJvbW8uc2Nzcz9mNDRiIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZWFkZXIuc2Nzcz80MTVlIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9pbWFnZS5zY3NzPzE0NzQiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2luZm9ncmFwaGljLnNjc3M/NmNmYyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvbW9kYWxzLnNjc3M/ZDQwMiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc2VhcmNoLnNjc3M/NTUyMSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc2VsZWN0LWxpc3Quc2Nzcz82OGI4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zaXRlcy1tZW51LnNjc3M/ZWMwOSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc29jaWFsLW1lbnUuc2Nzcz83OWMzIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy90by10b3Auc2Nzcz9hOTkyIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9ID0gd3AuZWxlbWVudDtcbmltcG9ydCB7IHVzZVBhcmFtcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFPUyBmcm9tICdhb3MnO1xuaW1wb3J0IHsgRG9CYWNrVG9Ub3AgfSBmcm9tICdzcmMvdXRpbHMvZGlzcGxheSc7XG5pbXBvcnQgVGVtcGxhdGVMb2FkZXIgZnJvbSAnc3JjL2xvYWRlcnMvVGVtcGxhdGVMb2FkZXInO1xuaW1wb3J0IEhlYWRlciBmcm9tICdzcmMvY29tcG9uZW50cy9sYXlvdXQvSGVhZGVyJztcbmltcG9ydCBGb290ZXIgZnJvbSAnc3JjL2NvbXBvbmVudHMvbGF5b3V0L0Zvb3Rlcic7XG5pbXBvcnQgJ2Fvcy9kaXN0L2Fvcy5jc3MnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvdG8tdG9wLnNjc3MnO1xuY29uc3QgTGF5b3V0ID0gKHsgaWZyYW1lID0gZmFsc2UsIHBvc3RUeXBlOiBwcm9wUG9zdFR5cGUgPSAnJywgc2x1ZzogcHJvcFNsdWcgPSAnJyB9KSA9PiB7XG4gICAgY29uc3QgeyBwYXJhbVBvc3RUeXBlLCBwYXJhbVNsdWcgfSA9IHVzZVBhcmFtcygpO1xuICAgIGNvbnN0IGZpbmFsUG9zdFR5cGUgPSBwcm9wUG9zdFR5cGUgfHwgcGFyYW1Qb3N0VHlwZSB8fCAnJztcbiAgICBjb25zdCBmaW5hbFNsdWcgPSBwcm9wU2x1ZyB8fCBwYXJhbVNsdWcgfHwgJyc7XG4gICAgY29uc29sZS5sb2coZmluYWxQb3N0VHlwZSk7XG4gICAgY29uc29sZS5sb2coZmluYWxTbHVnKTtcbiAgICBjb25zdCBmaW5hbElmcmFtZSA9IGlmcmFtZSB8fCBmYWxzZTtcbiAgICBjb25zdCBbbWFpbkVsZW1lbnRDbGFzc2VzLCBzZXRNYWluRWxlbWVudENsYXNzZXNdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IGxheW91dENsYXNzZXMgPSAoY2xhc3NlcykgPT4ge1xuICAgICAgICBpZiAoZmluYWxJZnJhbWUpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnaWZyYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0TWFpbkVsZW1lbnRDbGFzc2VzKGNsYXNzZXMuam9pbignICcpKTtcbiAgICB9O1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIG5ldyBEb0JhY2tUb1RvcCgpO1xuICAgICAgICBBT1MuaW5pdCh7XG4gICAgICAgICAgICBvZmZzZXQ6IDE1MCxcbiAgICAgICAgICAgIGRlbGF5OiAxMDAsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTEwMCxcbiAgICAgICAgICAgIGVhc2luZzogJ2Vhc2UnLFxuICAgICAgICAgICAgb25jZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgaWZyYW1lID9cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1haW5cIiwgeyBpZDogXCJjb250ZW50XCIsIGNsYXNzTmFtZTogbWFpbkVsZW1lbnRDbGFzc2VzIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRlbXBsYXRlTG9hZGVyLCB7IHBvc3RUeXBlOiBmaW5hbFBvc3RUeXBlLCBzbHVnOiBmaW5hbFNsdWcsIGxheW91dENsYXNzZXNGdW5jdGlvbjogbGF5b3V0Q2xhc3NlcywgcXVlcnlTdHJpbmc6IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gucmVwbGFjZSgnPycsICcnKSB9KSlcbiAgICAgICAgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIZWFkZXIsIG51bGwpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1haW5cIiwgeyBpZDogXCJjb250ZW50XCIsIGNsYXNzTmFtZTogbWFpbkVsZW1lbnRDbGFzc2VzIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZW1wbGF0ZUxvYWRlciwgeyBwb3N0VHlwZTogZmluYWxQb3N0VHlwZSwgc2x1ZzogZmluYWxTbHVnLCBsYXlvdXRDbGFzc2VzRnVuY3Rpb246IGxheW91dENsYXNzZXMsIHF1ZXJ5U3RyaW5nOiB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnJlcGxhY2UoJz8nLCAnJykgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb290ZXIsIG51bGwpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IExheW91dDtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjQyMTczMjJcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0MjE4MjM4XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjQyMTc0NDZcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNDIxNzU0OFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0MjE4MDU5XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjQyMTc0NDhcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNDIxODQwMVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0MjE4NDkxXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjQyMTgyMzVcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNDIxODEzM1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0MjE4MjgwXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjQyMTc0NTBcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNDIxODI0OFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI0MjE3MzQxXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJjZTVlY2ZjOTBhYmY5MmNiYTVmOFwiOyB9Il0sIm5hbWVzIjpbIlJlYWN0IiwiX3dwJGVsZW1lbnQiLCJ3cCIsImVsZW1lbnQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVBhcmFtcyIsIkFPUyIsIkRvQmFja1RvVG9wIiwiVGVtcGxhdGVMb2FkZXIiLCJIZWFkZXIiLCJGb290ZXIiLCJMYXlvdXQiLCJfcmVmIiwiX3JlZiRpZnJhbWUiLCJpZnJhbWUiLCJfcmVmJHBvc3RUeXBlIiwicG9zdFR5cGUiLCJwcm9wUG9zdFR5cGUiLCJfcmVmJHNsdWciLCJzbHVnIiwicHJvcFNsdWciLCJfdXNlUGFyYW1zIiwicGFyYW1Qb3N0VHlwZSIsInBhcmFtU2x1ZyIsImZpbmFsUG9zdFR5cGUiLCJmaW5hbFNsdWciLCJjb25zb2xlIiwibG9nIiwiZmluYWxJZnJhbWUiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJtYWluRWxlbWVudENsYXNzZXMiLCJzZXRNYWluRWxlbWVudENsYXNzZXMiLCJsYXlvdXRDbGFzc2VzIiwiY2xhc3NlcyIsInB1c2giLCJqb2luIiwiaW5pdCIsIm9mZnNldCIsImRlbGF5IiwiZHVyYXRpb24iLCJlYXNpbmciLCJvbmNlIiwiY3JlYXRlRWxlbWVudCIsIkZyYWdtZW50IiwiaWQiLCJjbGFzc05hbWUiLCJsYXlvdXRDbGFzc2VzRnVuY3Rpb24iLCJxdWVyeVN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicmVwbGFjZSJdLCJzb3VyY2VSb290IjoiIn0=