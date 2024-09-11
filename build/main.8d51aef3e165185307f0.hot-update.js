"use strict";
self["webpackHotUpdatedevelopers_only"]("main",{

/***/ "./src/loaders/TemplateLoader.tsx":
/*!****************************************!*\
  !*** ./src/loaders/TemplateLoader.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageSlugContext: function() { return /* binding */ PageSlugContext; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var src_utils_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/utils/api */ "./src/utils/api/index.ts");
/* harmony import */ var src_components_shared_Loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/shared/Loading */ "./src/components/shared/Loading.tsx");




// Single Templates




// const DoAnnouncement = lazy( () => import( 'src/components/templates/single/DoAnnouncement' ) );
// const DoAnalystReport = lazy( () => import( 'src/components/templates/single/DoAnalystReport' ) );
var DoBlog = (0,react__WEBPACK_IMPORTED_MODULE_3__.lazy)(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-dom_server_browser_js-node_modules_react-helmet_es_Helmet_js"), __webpack_require__.e("src_components_shared_Hero_tsx-src_components_shared_SEOTags_tsx"), __webpack_require__.e("src_components_templates_single_DoBlog_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/single/DoBlog */ "./src/components/templates/single/DoBlog.tsx"));
});
// const DoCustomerStory = lazy( () => import( 'src/components/templates/single/DoCustomerStory' ) );
// const DoEvent = lazy( () => import( 'src/components/templates/single/DoEvent' ) );
// const DoForm = lazy( () => import( 'src/components/templates/single/DoForm' ) );
// const DoGlossary = lazy( () => import( 'src/components/templates/single/DoGlossary' ) );
// const DoLegal = lazy( () => import( 'src/components/templates/single/DoLegal' ) );
// const DoMediaCoverage = lazy( () => import( 'src/components/templates/single/DoMediaCoverage' ) );
// const DoPodcast = lazy( () => import( 'src/components/templates/single/DoPodcast' ) );
// const DoPressRelease = lazy( () => import( 'src/components/templates/single/DoPressRelease' ) );
// const DoSimplePage = lazy( () => import( 'src/components/templates/single/DoSimplePage' ) );
// const DoTopic = lazy( () => import( 'src/components/templates/single/DoTopic' ) );
// const DoVideo = lazy( () => import( 'src/components/templates/single/DoVideo' ) );
// const DoWhitePaper = lazy( () => import( 'src/components/templates/single/DoWhitePaper' ) );
// const Attachment = lazy( () => import( 'src/components/templates/single/Attachment' ) );
// const DefaultSingle = lazy( () => import( 'src/components/templates/single/DefaultSingle' ) );
// const LandingPage = lazy( () => import( 'src/components/templates/LandingPage' ) );
var Page404 = (0,react__WEBPACK_IMPORTED_MODULE_3__.lazy)(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-dom_server_browser_js-node_modules_react-helmet_es_Helmet_js"), __webpack_require__.e("src_components_shared_Hero_tsx-src_components_shared_SEOTags_tsx"), __webpack_require__.e("src_components_templates_Page404_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/Page404 */ "./src/components/templates/Page404.tsx"));
});
var templates = {
  // 'about': LandingPage,
  // 'ad': LandingPage,
  // 'analyst-report': DoAnalystReport,
  // 'announcement': DoAnnouncement,
  'blog': DoBlog,
  // 'customer-story': DoCustomerStory,
  // 'default': DefaultSingle,
  // 'event': DoEvent,
  // 'form': DoForm,
  // 'glossary': DoGlossary,
  // 'landing-page': LandingPage,
  // 'legal': DoLegal,
  // 'location': LandingPage,
  // 'media-library': Attachment,
  // 'media-coverage': DoMediaCoverage,
  // 'podcast': DoPodcast,
  // 'press-release': DoPressRelease,
  // 'simple-page': DoSimplePage,
  // 'topic': DoTopic,
  // 'video': DoVideo,
  // 'white-paper': DoWhitePaper,
  '404': Page404
};
var PageSlugContext = (0,react__WEBPACK_IMPORTED_MODULE_3__.createContext)('');
var TemplateLoader = function TemplateLoader(_ref) {
  var _ref$iframe = _ref.iframe,
    iframe = _ref$iframe === void 0 ? false : _ref$iframe,
    postType = _ref.postType,
    _ref$queryString = _ref.queryString,
    queryString = _ref$queryString === void 0 ? '' : _ref$queryString,
    slug = _ref.slug,
    layoutClassesFunction = _ref.layoutClassesFunction;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(undefined),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    post = _useState2[0],
    setPost = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
    TemplateName = _useState4[0],
    setTemplateName = _useState4[1];
  var finalPostType = postType;
  if (finalPostType === 'media') {
    // rename
    finalPostType = 'media-library';
  } else if (finalPostType === 'page') {
    // rename
    finalPostType = 'simple-page';
  }
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    function fetchData() {
      return _fetchData.apply(this, arguments);
    }
    function _fetchData() {
      _fetchData = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0,src_utils_api__WEBPACK_IMPORTED_MODULE_4__.doGetPost)(finalPostType, slug, queryString).then(function (data) {
                if (data.json) {
                  setPost(data.json);
                  var template = templates[finalPostType] ? templates[finalPostType] : templates.default;
                  setTemplateName(template);
                } else {
                  setPost(undefined);
                  setTemplateName(templates['404']);
                }
              });
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _fetchData.apply(this, arguments);
    }
    fetchData();
  }, [slug]);
  if (TemplateName && post) {
    return react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react__WEBPACK_IMPORTED_MODULE_3__.Suspense, {
      fallback: react__WEBPACK_IMPORTED_MODULE_3___default().createElement(src_components_shared_Loading__WEBPACK_IMPORTED_MODULE_5__["default"], null)
    }, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(PageSlugContext.Provider, {
      value: slug
    }, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(TemplateName, {
      post: post,
      iframe: iframe ? iframe : false,
      layoutClasses: layoutClassesFunction
    })), react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.ScrollRestoration, null));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (TemplateLoader);

/***/ }),

/***/ "./node_modules/aos/dist/aos.css":
/*!***************************************!*\
  !*** ./node_modules/aos/dist/aos.css ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726026375927
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
      // 1726026376744
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
      // 1726026376097
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
      // 1726026376400
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
      // 1726026376748
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
      // 1726026376402
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
      // 1726026376966
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
      // 1726026377032
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
      // 1726026376747
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
      // 1726026376826
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
      // 1726026376774
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
      // 1726026376399
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
      // 1726026376775
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
      // 1726026375848
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "909dde66ba75ae79ece3"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7OztVQ1JBLHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9sb2FkZXJzL1RlbXBsYXRlTG9hZGVyLnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9ub2RlX21vZHVsZXMvYW9zL2Rpc3QvYW9zLmNzcz9jYzlmIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9idXR0b25zLnNjc3M/MjNlNyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvZmVlZGJhY2suc2Nzcz83NzFjIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9mb290ZXIuc2Nzcz85ZDk1Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZWFkZXItcHJvbW8uc2Nzcz9mNDRiIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZWFkZXIuc2Nzcz80MTVlIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9pbWFnZS5zY3NzPzE0NzQiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2luZm9ncmFwaGljLnNjc3M/NmNmYyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvbW9kYWxzLnNjc3M/ZDQwMiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc2VhcmNoLnNjc3M/NTUyMSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc2VsZWN0LWxpc3Quc2Nzcz82OGI4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zaXRlcy1tZW51LnNjc3M/ZWMwOSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc29jaWFsLW1lbnUuc2Nzcz83OWMzIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy90by10b3Auc2Nzcz9hOTkyIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIFNpbmdsZSBUZW1wbGF0ZXNcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIGxhenksIFN1c3BlbnNlLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2Nyb2xsUmVzdG9yYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IGRvR2V0UG9zdCB9IGZyb20gJ3NyYy91dGlscy9hcGknO1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0xvYWRpbmcnO1xuLy8gY29uc3QgRG9Bbm5vdW5jZW1lbnQgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvQW5ub3VuY2VtZW50JyApICk7XG4vLyBjb25zdCBEb0FuYWx5c3RSZXBvcnQgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvQW5hbHlzdFJlcG9ydCcgKSApO1xuY29uc3QgRG9CbG9nID0gbGF6eSgoKSA9PiBpbXBvcnQoJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9CbG9nJykpO1xuLy8gY29uc3QgRG9DdXN0b21lclN0b3J5ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0N1c3RvbWVyU3RvcnknICkgKTtcbi8vIGNvbnN0IERvRXZlbnQgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvRXZlbnQnICkgKTtcbi8vIGNvbnN0IERvRm9ybSA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9Gb3JtJyApICk7XG4vLyBjb25zdCBEb0dsb3NzYXJ5ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0dsb3NzYXJ5JyApICk7XG4vLyBjb25zdCBEb0xlZ2FsID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0xlZ2FsJyApICk7XG4vLyBjb25zdCBEb01lZGlhQ292ZXJhZ2UgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvTWVkaWFDb3ZlcmFnZScgKSApO1xuLy8gY29uc3QgRG9Qb2RjYXN0ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb1BvZGNhc3QnICkgKTtcbi8vIGNvbnN0IERvUHJlc3NSZWxlYXNlID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb1ByZXNzUmVsZWFzZScgKSApO1xuLy8gY29uc3QgRG9TaW1wbGVQYWdlID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb1NpbXBsZVBhZ2UnICkgKTtcbi8vIGNvbnN0IERvVG9waWMgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvVG9waWMnICkgKTtcbi8vIGNvbnN0IERvVmlkZW8gPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvVmlkZW8nICkgKTtcbi8vIGNvbnN0IERvV2hpdGVQYXBlciA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9XaGl0ZVBhcGVyJyApICk7XG4vLyBjb25zdCBBdHRhY2htZW50ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9BdHRhY2htZW50JyApICk7XG4vLyBjb25zdCBEZWZhdWx0U2luZ2xlID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9EZWZhdWx0U2luZ2xlJyApICk7XG4vLyBjb25zdCBMYW5kaW5nUGFnZSA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9MYW5kaW5nUGFnZScgKSApO1xuY29uc3QgUGFnZTQwNCA9IGxhenkoKCkgPT4gaW1wb3J0KCdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvUGFnZTQwNCcpKTtcbmNvbnN0IHRlbXBsYXRlcyA9IHtcbiAgICAvLyAnYWJvdXQnOiBMYW5kaW5nUGFnZSxcbiAgICAvLyAnYWQnOiBMYW5kaW5nUGFnZSxcbiAgICAvLyAnYW5hbHlzdC1yZXBvcnQnOiBEb0FuYWx5c3RSZXBvcnQsXG4gICAgLy8gJ2Fubm91bmNlbWVudCc6IERvQW5ub3VuY2VtZW50LFxuICAgICdibG9nJzogRG9CbG9nLFxuICAgIC8vICdjdXN0b21lci1zdG9yeSc6IERvQ3VzdG9tZXJTdG9yeSxcbiAgICAvLyAnZGVmYXVsdCc6IERlZmF1bHRTaW5nbGUsXG4gICAgLy8gJ2V2ZW50JzogRG9FdmVudCxcbiAgICAvLyAnZm9ybSc6IERvRm9ybSxcbiAgICAvLyAnZ2xvc3NhcnknOiBEb0dsb3NzYXJ5LFxuICAgIC8vICdsYW5kaW5nLXBhZ2UnOiBMYW5kaW5nUGFnZSxcbiAgICAvLyAnbGVnYWwnOiBEb0xlZ2FsLFxuICAgIC8vICdsb2NhdGlvbic6IExhbmRpbmdQYWdlLFxuICAgIC8vICdtZWRpYS1saWJyYXJ5JzogQXR0YWNobWVudCxcbiAgICAvLyAnbWVkaWEtY292ZXJhZ2UnOiBEb01lZGlhQ292ZXJhZ2UsXG4gICAgLy8gJ3BvZGNhc3QnOiBEb1BvZGNhc3QsXG4gICAgLy8gJ3ByZXNzLXJlbGVhc2UnOiBEb1ByZXNzUmVsZWFzZSxcbiAgICAvLyAnc2ltcGxlLXBhZ2UnOiBEb1NpbXBsZVBhZ2UsXG4gICAgLy8gJ3RvcGljJzogRG9Ub3BpYyxcbiAgICAvLyAndmlkZW8nOiBEb1ZpZGVvLFxuICAgIC8vICd3aGl0ZS1wYXBlcic6IERvV2hpdGVQYXBlcixcbiAgICAnNDA0JzogUGFnZTQwNCxcbn07XG5leHBvcnQgY29uc3QgUGFnZVNsdWdDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgnJyk7XG5jb25zdCBUZW1wbGF0ZUxvYWRlciA9ICh7IGlmcmFtZSA9IGZhbHNlLCBwb3N0VHlwZSwgcXVlcnlTdHJpbmcgPSAnJywgc2x1ZywgbGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uIH0pID0+IHtcbiAgICBjb25zdCBbcG9zdCwgc2V0UG9zdF0gPSB1c2VTdGF0ZSh1bmRlZmluZWQpO1xuICAgIGNvbnN0IFtUZW1wbGF0ZU5hbWUsIHNldFRlbXBsYXRlTmFtZV0gPSB1c2VTdGF0ZSgpO1xuICAgIGxldCBmaW5hbFBvc3RUeXBlID0gcG9zdFR5cGU7XG4gICAgaWYgKGZpbmFsUG9zdFR5cGUgPT09ICdtZWRpYScpIHtcbiAgICAgICAgLy8gcmVuYW1lXG4gICAgICAgIGZpbmFsUG9zdFR5cGUgPSAnbWVkaWEtbGlicmFyeSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGZpbmFsUG9zdFR5cGUgPT09ICdwYWdlJykge1xuICAgICAgICAvLyByZW5hbWVcbiAgICAgICAgZmluYWxQb3N0VHlwZSA9ICdzaW1wbGUtcGFnZSc7XG4gICAgfVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YSgpIHtcbiAgICAgICAgICAgIGF3YWl0IGRvR2V0UG9zdChmaW5hbFBvc3RUeXBlLCBzbHVnLCBxdWVyeVN0cmluZykudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0UG9zdChkYXRhLmpzb24pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRlbXBsYXRlc1tmaW5hbFBvc3RUeXBlXSA/IHRlbXBsYXRlc1tmaW5hbFBvc3RUeXBlXSA6IHRlbXBsYXRlcy5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICBzZXRUZW1wbGF0ZU5hbWUodGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0UG9zdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUZW1wbGF0ZU5hbWUodGVtcGxhdGVzWyc0MDQnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2hEYXRhKCk7XG4gICAgfSwgW3NsdWddKTtcbiAgICBpZiAoVGVtcGxhdGVOYW1lICYmIHBvc3QpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFN1c3BlbnNlLCB7IGZhbGxiYWNrOiBSZWFjdC5jcmVhdGVFbGVtZW50KExvYWRpbmcsIG51bGwpIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFBhZ2VTbHVnQ29udGV4dC5Qcm92aWRlciwgeyB2YWx1ZTogc2x1ZyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGVtcGxhdGVOYW1lLCB7IHBvc3Q6IHBvc3QsIGlmcmFtZTogaWZyYW1lID8gaWZyYW1lIDogZmFsc2UsIGxheW91dENsYXNzZXM6IGxheW91dENsYXNzZXNGdW5jdGlvbiB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNjcm9sbFJlc3RvcmF0aW9uLCBudWxsKSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlTG9hZGVyO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3NTkyN1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzY3NDRcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3NjA5N1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI2Mzc2NDAwXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzY3NDhcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3NjQwMlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI2Mzc2OTY2XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzcwMzJcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3Njc0N1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI2Mzc2ODI2XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzY3NzRcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3NjM5OVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI2Mzc2Nzc1XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzU4NDhcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjkwOWRkZTY2YmE3NWFlNzllY2UzXCI7IH0iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwibGF6eSIsIlN1c3BlbnNlIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJTY3JvbGxSZXN0b3JhdGlvbiIsImRvR2V0UG9zdCIsIkxvYWRpbmciLCJEb0Jsb2ciLCJQYWdlNDA0IiwidGVtcGxhdGVzIiwiUGFnZVNsdWdDb250ZXh0IiwiVGVtcGxhdGVMb2FkZXIiLCJfcmVmIiwiX3JlZiRpZnJhbWUiLCJpZnJhbWUiLCJwb3N0VHlwZSIsIl9yZWYkcXVlcnlTdHJpbmciLCJxdWVyeVN0cmluZyIsInNsdWciLCJsYXlvdXRDbGFzc2VzRnVuY3Rpb24iLCJfdXNlU3RhdGUiLCJ1bmRlZmluZWQiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJwb3N0Iiwic2V0UG9zdCIsIl91c2VTdGF0ZTMiLCJfdXNlU3RhdGU0IiwiVGVtcGxhdGVOYW1lIiwic2V0VGVtcGxhdGVOYW1lIiwiZmluYWxQb3N0VHlwZSIsImZldGNoRGF0YSIsIl9mZXRjaERhdGEiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsInRoZW4iLCJkYXRhIiwianNvbiIsInRlbXBsYXRlIiwiZGVmYXVsdCIsInN0b3AiLCJjcmVhdGVFbGVtZW50IiwiZmFsbGJhY2siLCJQcm92aWRlciIsInZhbHVlIiwibGF5b3V0Q2xhc3NlcyJdLCJzb3VyY2VSb290IjoiIn0=