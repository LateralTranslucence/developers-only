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
    postType = _ref$postType === void 0 ? '' : _ref$postType,
    _ref$slug = _ref.slug,
    slug = _ref$slug === void 0 ? '' : _ref$slug;
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useParams)(),
    postTypeParam = _useParams.postTypeParam,
    slugParam = _useParams.slugParam;
  var finalSlug = slug ? slug : slugParam ? slugParam : '';
  console.log(slug);
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
    queryString: queryString
  })) : react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_layout_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("main", {
    id: "content",
    className: mainElementClasses
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_loaders_TemplateLoader__WEBPACK_IMPORTED_MODULE_4__["default"], {
    postType: finalPostType,
    slug: finalSlug,
    layoutClassesFunction: layoutClasses,
    queryString: queryString
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
      // 1726022668831
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
      // 1726022669040
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
      // 1726022668945
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
      // 1726022668943
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
      // 1726022669035
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
      // 1726022668948
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
      // 1726022669090
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
      // 1726022669206
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
      // 1726022669045
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
      // 1726022669065
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
      // 1726022669039
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
      // 1726022668946
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
      // 1726022669033
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
      // 1726022668725
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "faefcef2e5afedf4a0fb"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wYzBhMTRiZWI1NTE5NmViZjM2Mi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQzFCLElBQUFDLFdBQUEsR0FBZ0NDLEVBQUUsQ0FBQ0MsT0FBTztFQUFsQ0MsU0FBUyxHQUFBSCxXQUFBLENBQVRHLFNBQVM7RUFBRUMsUUFBUSxHQUFBSixXQUFBLENBQVJJLFFBQVE7QUFDa0I7QUFDdkI7QUFDMEI7QUFDUTtBQUNOO0FBQ0E7QUFDeEI7QUFDb0I7QUFDOUMsSUFBTU8sTUFBTSxHQUFHLFNBQVRBLE1BQU1BLENBQUFDLElBQUEsRUFBcUQ7RUFBQSxJQUFBQyxXQUFBLEdBQUFELElBQUEsQ0FBL0NFLE1BQU07SUFBTkEsTUFBTSxHQUFBRCxXQUFBLGNBQUcsS0FBSyxHQUFBQSxXQUFBO0lBQUFFLGFBQUEsR0FBQUgsSUFBQSxDQUFFSSxRQUFRO0lBQVJBLFFBQVEsR0FBQUQsYUFBQSxjQUFHLEVBQUUsR0FBQUEsYUFBQTtJQUFBRSxTQUFBLEdBQUFMLElBQUEsQ0FBRU0sSUFBSTtJQUFKQSxJQUFJLEdBQUFELFNBQUEsY0FBRyxFQUFFLEdBQUFBLFNBQUE7RUFDdEQsSUFBQUUsVUFBQSxHQUFxQ2QsMkRBQVMsQ0FBQyxDQUFDO0lBQXhDZSxhQUFhLEdBQUFELFVBQUEsQ0FBYkMsYUFBYTtJQUFFQyxTQUFTLEdBQUFGLFVBQUEsQ0FBVEUsU0FBUztFQUNoQyxJQUFNQyxTQUFTLEdBQUdKLElBQUksR0FBR0EsSUFBSSxHQUFJRyxTQUFTLEdBQUdBLFNBQVMsR0FBRyxFQUFHO0VBQzVERSxPQUFPLENBQUNDLEdBQUcsQ0FBQ04sSUFBSSxDQUFDO0VBQ2pCLElBQU1PLGFBQWEsR0FBR1QsUUFBUSxHQUFHQSxRQUFRLEdBQUlJLGFBQWEsR0FBR0EsYUFBYSxHQUFHLEVBQUc7RUFDaEYsSUFBQU0sU0FBQSxHQUFvRHRCLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFBQXVCLFVBQUEsR0FBQUMsZ0ZBQUEsQ0FB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O0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7VUNSQSxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvTGF5b3V0LnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9ub2RlX21vZHVsZXMvYW9zL2Rpc3QvYW9zLmNzcz9jYzlmIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9idXR0b25zLnNjc3M/MjNlNyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvZmVlZGJhY2suc2Nzcz83NzFjIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9mb290ZXIuc2Nzcz85ZDk1Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZWFkZXItcHJvbW8uc2Nzcz9mNDRiIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZWFkZXIuc2Nzcz80MTVlIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9pbWFnZS5zY3NzPzE0NzQiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2luZm9ncmFwaGljLnNjc3M/NmNmYyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvbW9kYWxzLnNjc3M/ZDQwMiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc2VhcmNoLnNjc3M/NTUyMSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc2VsZWN0LWxpc3Quc2Nzcz82OGI4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zaXRlcy1tZW51LnNjc3M/ZWMwOSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc29jaWFsLW1lbnUuc2Nzcz83OWMzIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy90by10b3Auc2Nzcz9hOTkyIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9ID0gd3AuZWxlbWVudDtcbmltcG9ydCB7IHVzZVBhcmFtcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFPUyBmcm9tICdhb3MnO1xuaW1wb3J0IHsgRG9CYWNrVG9Ub3AgfSBmcm9tICdzcmMvdXRpbHMvZGlzcGxheSc7XG5pbXBvcnQgVGVtcGxhdGVMb2FkZXIgZnJvbSAnc3JjL2xvYWRlcnMvVGVtcGxhdGVMb2FkZXInO1xuaW1wb3J0IEhlYWRlciBmcm9tICdzcmMvY29tcG9uZW50cy9sYXlvdXQvSGVhZGVyJztcbmltcG9ydCBGb290ZXIgZnJvbSAnc3JjL2NvbXBvbmVudHMvbGF5b3V0L0Zvb3Rlcic7XG5pbXBvcnQgJ2Fvcy9kaXN0L2Fvcy5jc3MnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvdG8tdG9wLnNjc3MnO1xuY29uc3QgTGF5b3V0ID0gKHsgaWZyYW1lID0gZmFsc2UsIHBvc3RUeXBlID0gJycsIHNsdWcgPSAnJyB9KSA9PiB7XG4gICAgY29uc3QgeyBwb3N0VHlwZVBhcmFtLCBzbHVnUGFyYW0gfSA9IHVzZVBhcmFtcygpO1xuICAgIGNvbnN0IGZpbmFsU2x1ZyA9IHNsdWcgPyBzbHVnIDogKHNsdWdQYXJhbSA/IHNsdWdQYXJhbSA6ICcnKTtcbiAgICBjb25zb2xlLmxvZyhzbHVnKTtcbiAgICBjb25zdCBmaW5hbFBvc3RUeXBlID0gcG9zdFR5cGUgPyBwb3N0VHlwZSA6IChwb3N0VHlwZVBhcmFtID8gcG9zdFR5cGVQYXJhbSA6ICcnKTtcbiAgICBjb25zdCBbbWFpbkVsZW1lbnRDbGFzc2VzLCBzZXRNYWluRWxlbWVudENsYXNzZXNdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IGZpbmFsSWZyYW1lID0gaWZyYW1lID8gaWZyYW1lIDogZmFsc2U7XG4gICAgY29uc3QgbGF5b3V0Q2xhc3NlcyA9IChjbGFzc2VzKSA9PiB7XG4gICAgICAgIGlmIChmaW5hbElmcmFtZSkge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKCdpZnJhbWUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGFzc2VzU3RyaW5nID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgIHNldE1haW5FbGVtZW50Q2xhc3NlcyhjbGFzc2VzU3RyaW5nKTtcbiAgICB9O1xuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKCc/JywgJycpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIG5ldyBEb0JhY2tUb1RvcCgpO1xuICAgICAgICBBT1MuaW5pdCh7XG4gICAgICAgICAgICBvZmZzZXQ6IDE1MCxcbiAgICAgICAgICAgIGRlbGF5OiAxMDAsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTEwMCxcbiAgICAgICAgICAgIGVhc2luZzogJ2Vhc2UnLFxuICAgICAgICAgICAgb25jZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgaWZyYW1lID9cbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1haW5cIiwgeyBpZDogXCJjb250ZW50XCIsIGNsYXNzTmFtZTogbWFpbkVsZW1lbnRDbGFzc2VzIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRlbXBsYXRlTG9hZGVyLCB7IHBvc3RUeXBlOiBmaW5hbFBvc3RUeXBlLCBzbHVnOiBmaW5hbFNsdWcsIGxheW91dENsYXNzZXNGdW5jdGlvbjogbGF5b3V0Q2xhc3NlcywgcXVlcnlTdHJpbmc6IHF1ZXJ5U3RyaW5nIH0pKVxuICAgICAgICA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlYWRlciwgbnVsbCksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibWFpblwiLCB7IGlkOiBcImNvbnRlbnRcIiwgY2xhc3NOYW1lOiBtYWluRWxlbWVudENsYXNzZXMgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRlbXBsYXRlTG9hZGVyLCB7IHBvc3RUeXBlOiBmaW5hbFBvc3RUeXBlLCBzbHVnOiBmaW5hbFNsdWcsIGxheW91dENsYXNzZXNGdW5jdGlvbjogbGF5b3V0Q2xhc3NlcywgcXVlcnlTdHJpbmc6IHF1ZXJ5U3RyaW5nIH0pKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9vdGVyLCBudWxsKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBMYXlvdXQ7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjY4ODMxXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjY2OTA0MFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjY4OTQ1XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI2Njg5NDNcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjY2OTAzNVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjY4OTQ4XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI2NjkwOTBcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjY2OTIwNlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjY5MDQ1XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI2NjkwNjVcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjY2OTAzOVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjY4OTQ2XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI2NjkwMzNcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjY2ODcyNVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiZmFlZmNlZjJlNWFmZWRmNGEwZmJcIjsgfSJdLCJuYW1lcyI6WyJSZWFjdCIsIl93cCRlbGVtZW50Iiwid3AiLCJlbGVtZW50IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VQYXJhbXMiLCJBT1MiLCJEb0JhY2tUb1RvcCIsIlRlbXBsYXRlTG9hZGVyIiwiSGVhZGVyIiwiRm9vdGVyIiwiTGF5b3V0IiwiX3JlZiIsIl9yZWYkaWZyYW1lIiwiaWZyYW1lIiwiX3JlZiRwb3N0VHlwZSIsInBvc3RUeXBlIiwiX3JlZiRzbHVnIiwic2x1ZyIsIl91c2VQYXJhbXMiLCJwb3N0VHlwZVBhcmFtIiwic2x1Z1BhcmFtIiwiZmluYWxTbHVnIiwiY29uc29sZSIsImxvZyIsImZpbmFsUG9zdFR5cGUiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJtYWluRWxlbWVudENsYXNzZXMiLCJzZXRNYWluRWxlbWVudENsYXNzZXMiLCJmaW5hbElmcmFtZSIsImxheW91dENsYXNzZXMiLCJjbGFzc2VzIiwicHVzaCIsImNsYXNzZXNTdHJpbmciLCJqb2luIiwicXVlcnlTdHJpbmciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInJlcGxhY2UiLCJpbml0Iiwib2Zmc2V0IiwiZGVsYXkiLCJkdXJhdGlvbiIsImVhc2luZyIsIm9uY2UiLCJjcmVhdGVFbGVtZW50IiwiRnJhZ21lbnQiLCJpZCIsImNsYXNzTmFtZSIsImxheW91dENsYXNzZXNGdW5jdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=