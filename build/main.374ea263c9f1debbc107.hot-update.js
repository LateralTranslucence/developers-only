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
  console.log(finalSlug);
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
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-helmet_es_Helmet_js"), __webpack_require__.e("src_components_shared_Hero_tsx-src_components_shared_SEOTags_tsx"), __webpack_require__.e("src_components_templates_single_DoBlog_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/single/DoBlog */ "./src/components/templates/single/DoBlog.tsx"));
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
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-helmet_es_Helmet_js"), __webpack_require__.e("src_components_shared_Hero_tsx-src_components_shared_SEOTags_tsx"), __webpack_require__.e("src_components_templates_Page404_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/Page404 */ "./src/components/templates/Page404.tsx"));
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
      // 1726022641863
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
      // 1726022642386
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
      // 1726022642071
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
      // 1726022642074
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
      // 1726022642388
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
      // 1726022642121
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
      // 1726022642916
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
      // 1726022643000
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
      // 1726022642394
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
      // 1726022642599
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
      // 1726022642601
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
      // 1726022642073
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
      // 1726022642596
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
      // 1726022641886
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "0c0a14beb55196ebf362"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zNzRlYTI2M2M5ZjFkZWJiYzEwNy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQzFCLElBQUFDLFdBQUEsR0FBZ0NDLEVBQUUsQ0FBQ0MsT0FBTztFQUFsQ0MsU0FBUyxHQUFBSCxXQUFBLENBQVRHLFNBQVM7RUFBRUMsUUFBUSxHQUFBSixXQUFBLENBQVJJLFFBQVE7QUFDa0I7QUFDdkI7QUFDMEI7QUFDUTtBQUNOO0FBQ0E7QUFDeEI7QUFDb0I7QUFDOUMsSUFBTU8sTUFBTSxHQUFHLFNBQVRBLE1BQU1BLENBQUFDLElBQUEsRUFBcUQ7RUFBQSxJQUFBQyxXQUFBLEdBQUFELElBQUEsQ0FBL0NFLE1BQU07SUFBTkEsTUFBTSxHQUFBRCxXQUFBLGNBQUcsS0FBSyxHQUFBQSxXQUFBO0lBQUFFLGFBQUEsR0FBQUgsSUFBQSxDQUFFSSxRQUFRO0lBQVJBLFFBQVEsR0FBQUQsYUFBQSxjQUFHLEVBQUUsR0FBQUEsYUFBQTtJQUFBRSxTQUFBLEdBQUFMLElBQUEsQ0FBRU0sSUFBSTtJQUFKQSxJQUFJLEdBQUFELFNBQUEsY0FBRyxFQUFFLEdBQUFBLFNBQUE7RUFDdEQsSUFBQUUsVUFBQSxHQUFxQ2QsMkRBQVMsQ0FBQyxDQUFDO0lBQXhDZSxhQUFhLEdBQUFELFVBQUEsQ0FBYkMsYUFBYTtJQUFFQyxTQUFTLEdBQUFGLFVBQUEsQ0FBVEUsU0FBUztFQUNoQyxJQUFNQyxTQUFTLEdBQUdKLElBQUksR0FBR0EsSUFBSSxHQUFJRyxTQUFTLEdBQUdBLFNBQVMsR0FBRyxFQUFHO0VBQzVERSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsU0FBUyxDQUFDO0VBQ3RCLElBQU1HLGFBQWEsR0FBR1QsUUFBUSxHQUFHQSxRQUFRLEdBQUlJLGFBQWEsR0FBR0EsYUFBYSxHQUFHLEVBQUc7RUFDaEYsSUFBQU0sU0FBQSxHQUFvRHRCLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFBQXVCLFVBQUEsR0FBQUMsZ0ZBQUEsQ0FBQUYsU0FBQTtJQUF6REcsa0JBQWtCLEdBQUFGLFVBQUE7SUFBRUcscUJBQXFCLEdBQUFILFVBQUE7RUFDaEQsSUFBTUksV0FBVyxHQUFHakIsTUFBTSxHQUFHQSxNQUFNLEdBQUcsS0FBSztFQUMzQyxJQUFNa0IsYUFBYSxHQUFHLFNBQWhCQSxhQUFhQSxDQUFJQyxPQUFPLEVBQUs7SUFDL0IsSUFBSUYsV0FBVyxFQUFFO01BQ2JFLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUMxQjtJQUNBLElBQU1DLGFBQWEsR0FBR0YsT0FBTyxDQUFDRyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3ZDTixxQkFBcUIsQ0FBQ0ssYUFBYSxDQUFDO0VBQ3hDLENBQUM7RUFDRCxJQUFNRSxXQUFXLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUNDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0VBQzNEdEMsU0FBUyxDQUFDLFlBQU07SUFDWixJQUFJSSwwREFBVyxDQUFDLENBQUM7SUFDakJELCtDQUFRLENBQUM7TUFDTHFDLE1BQU0sRUFBRSxHQUFHO01BQ1hDLEtBQUssRUFBRSxHQUFHO01BQ1ZDLFFBQVEsRUFBRSxJQUFJO01BQ2RDLE1BQU0sRUFBRSxNQUFNO01BQ2RDLElBQUksRUFBRTtJQUNWLENBQUMsQ0FBQztFQUNOLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDTixPQUFRaEQsMERBQW1CLENBQUNBLHVEQUFjLEVBQUUsSUFBSSxFQUFFZSxNQUFNLEdBQ3BEZiwwREFBbUIsQ0FBQyxNQUFNLEVBQUU7SUFBRW1ELEVBQUUsRUFBRSxTQUFTO0lBQUVDLFNBQVMsRUFBRXRCO0VBQW1CLENBQUMsRUFDeEU5QiwwREFBbUIsQ0FBQ1Msa0VBQWMsRUFBRTtJQUFFUSxRQUFRLEVBQUVTLGFBQWE7SUFBRVAsSUFBSSxFQUFFSSxTQUFTO0lBQUU4QixxQkFBcUIsRUFBRXBCLGFBQWE7SUFBRUssV0FBVyxFQUFFQTtFQUFZLENBQUMsQ0FBQyxDQUFDLEdBQ3BKdEMsMERBQW1CLENBQUNBLHVEQUFjLEVBQUUsSUFBSSxFQUN0Q0EsMERBQW1CLENBQUNVLG9FQUFNLEVBQUUsSUFBSSxDQUFDLEVBQ2pDViwwREFBbUIsQ0FBQyxNQUFNLEVBQUU7SUFBRW1ELEVBQUUsRUFBRSxTQUFTO0lBQUVDLFNBQVMsRUFBRXRCO0VBQW1CLENBQUMsRUFDeEU5QiwwREFBbUIsQ0FBQ1Msa0VBQWMsRUFBRTtJQUFFUSxRQUFRLEVBQUVTLGFBQWE7SUFBRVAsSUFBSSxFQUFFSSxTQUFTO0lBQUU4QixxQkFBcUIsRUFBRXBCLGFBQWE7SUFBRUssV0FBVyxFQUFFQTtFQUFZLENBQUMsQ0FBQyxDQUFDLEVBQ3RKdEMsMERBQW1CLENBQUNXLG9FQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBQ0QsK0RBQWVDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNLO0FBQzFCO0FBQzJFO0FBQ3RCO0FBQ1g7QUFDVTtBQUNwRDtBQUNBO0FBQ0EsSUFBTWdELE1BQU0sR0FBR0wsMkNBQUksQ0FBQztFQUFBLE9BQU0sdVpBQWdEO0FBQUEsRUFBQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNTSxPQUFPLEdBQUdOLDJDQUFJLENBQUM7RUFBQSxPQUFNLHFZQUEwQztBQUFBLEVBQUM7QUFDdEUsSUFBTU8sU0FBUyxHQUFHO0VBQ2Q7RUFDQTtFQUNBO0VBQ0E7RUFDQSxNQUFNLEVBQUVGLE1BQU07RUFDZDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLEtBQUssRUFBRUM7QUFDWCxDQUFDO0FBQ00sSUFBTUUsZUFBZSxHQUFHVCxvREFBYSxDQUFDLEVBQUUsQ0FBQztBQUNoRCxJQUFNN0MsY0FBYyxHQUFHLFNBQWpCQSxjQUFjQSxDQUFBSSxJQUFBLEVBQW9GO0VBQUEsSUFBQUMsV0FBQSxHQUFBRCxJQUFBLENBQTlFRSxNQUFNO0lBQU5BLE1BQU0sR0FBQUQsV0FBQSxjQUFHLEtBQUssR0FBQUEsV0FBQTtJQUFFRyxRQUFRLEdBQUFKLElBQUEsQ0FBUkksUUFBUTtJQUFBK0MsZ0JBQUEsR0FBQW5ELElBQUEsQ0FBRXlCLFdBQVc7SUFBWEEsV0FBVyxHQUFBMEIsZ0JBQUEsY0FBRyxFQUFFLEdBQUFBLGdCQUFBO0lBQUU3QyxJQUFJLEdBQUFOLElBQUEsQ0FBSk0sSUFBSTtJQUFFa0MscUJBQXFCLEdBQUF4QyxJQUFBLENBQXJCd0MscUJBQXFCO0VBQzdGLElBQUExQixTQUFBLEdBQXdCdEIsK0NBQVEsQ0FBQzRELFNBQVMsQ0FBQztJQUFBckMsVUFBQSxHQUFBQyxnRkFBQSxDQUFBRixTQUFBO0lBQXBDdUMsSUFBSSxHQUFBdEMsVUFBQTtJQUFFdUMsT0FBTyxHQUFBdkMsVUFBQTtFQUNwQixJQUFBd0MsVUFBQSxHQUF3Qy9ELCtDQUFRLENBQUMsQ0FBQztJQUFBZ0UsVUFBQSxHQUFBeEMsZ0ZBQUEsQ0FBQXVDLFVBQUE7SUFBM0NFLFlBQVksR0FBQUQsVUFBQTtJQUFFRSxlQUFlLEdBQUFGLFVBQUE7RUFDcEMsSUFBSTNDLGFBQWEsR0FBR1QsUUFBUTtFQUM1QixJQUFJUyxhQUFhLEtBQUssT0FBTyxFQUFFO0lBQzNCO0lBQ0FBLGFBQWEsR0FBRyxlQUFlO0VBQ25DLENBQUMsTUFDSSxJQUFJQSxhQUFhLEtBQUssTUFBTSxFQUFFO0lBQy9CO0lBQ0FBLGFBQWEsR0FBRyxhQUFhO0VBQ2pDO0VBQ0F0QixnREFBUyxDQUFDLFlBQU07SUFBQSxTQUNHb0UsU0FBU0EsQ0FBQTtNQUFBLE9BQUFDLFVBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0lBQUE7SUFBQSxTQUFBRixXQUFBO01BQUFBLFVBQUEsR0FBQUcsbUZBQUEsZUFBQUMsc0VBQUEsQ0FBeEIsU0FBQUUsUUFBQTtRQUFBLE9BQUFGLHNFQUFBLFVBQUFJLFNBQUFDLFFBQUE7VUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtZQUFBO2NBQUFGLFFBQUEsQ0FBQUUsSUFBQTtjQUFBLE9BQ1UxQix3REFBUyxDQUFDaEMsYUFBYSxFQUFFUCxJQUFJLEVBQUVtQixXQUFXLENBQUMsQ0FBQytDLElBQUksQ0FBQyxVQUFDQyxJQUFJLEVBQUs7Z0JBQzdELElBQUlBLElBQUksQ0FBQ0MsSUFBSSxFQUFFO2tCQUNYcEIsT0FBTyxDQUFDbUIsSUFBSSxDQUFDQyxJQUFJLENBQUM7a0JBQ2xCLElBQU1DLFFBQVEsR0FBRzFCLFNBQVMsQ0FBQ3BDLGFBQWEsQ0FBQyxHQUFHb0MsU0FBUyxDQUFDcEMsYUFBYSxDQUFDLEdBQUdvQyxTQUFTLENBQUMyQixPQUFPO2tCQUN4RmxCLGVBQWUsQ0FBQ2lCLFFBQVEsQ0FBQztnQkFDN0IsQ0FBQyxNQUNJO2tCQUNEckIsT0FBTyxDQUFDRixTQUFTLENBQUM7a0JBQ2xCTSxlQUFlLENBQUNULFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckM7Y0FDSixDQUFDLENBQUM7WUFBQTtZQUFBO2NBQUEsT0FBQW9CLFFBQUEsQ0FBQVEsSUFBQTtVQUFBO1FBQUEsR0FBQVgsT0FBQTtNQUFBLENBQ0w7TUFBQSxPQUFBTixVQUFBLENBQUFDLEtBQUEsT0FBQUMsU0FBQTtJQUFBO0lBQ0RILFNBQVMsQ0FBQyxDQUFDO0VBQ2YsQ0FBQyxFQUFFLENBQUNyRCxJQUFJLENBQUMsQ0FBQztFQUNWLElBQUltRCxZQUFZLElBQUlKLElBQUksRUFBRTtJQUN0QixPQUFRbEUsMERBQW1CLENBQUN3RCwyQ0FBUSxFQUFFO01BQUVtQyxRQUFRLEVBQUUzRiwwREFBbUIsQ0FBQzJELHFFQUFPLEVBQUUsSUFBSTtJQUFFLENBQUMsRUFDbEYzRCwwREFBbUIsQ0FBQytELGVBQWUsQ0FBQzZCLFFBQVEsRUFBRTtNQUFFQyxLQUFLLEVBQUUxRTtJQUFLLENBQUMsRUFDekRuQiwwREFBbUIsQ0FBQ3NFLFlBQVksRUFBRTtNQUFFSixJQUFJLEVBQUVBLElBQUk7TUFBRW5ELE1BQU0sRUFBRUEsTUFBTSxHQUFHQSxNQUFNLEdBQUcsS0FBSztNQUFFa0IsYUFBYSxFQUFFb0I7SUFBc0IsQ0FBQyxDQUFDLENBQUMsRUFDN0hyRCwwREFBbUIsQ0FBQ3lELCtEQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ3JELENBQUMsTUFDSTtJQUNELE9BQU8sSUFBSTtFQUNmO0FBQ0osQ0FBQztBQUNELCtEQUFlaEQsY0FBYzs7Ozs7Ozs7Ozs7QUN4RjdCO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSUFBZ0UsY0FBYyxlQUFlO0FBQzNILE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7OztVQ1JBLHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9MYXlvdXQudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9sb2FkZXJzL1RlbXBsYXRlTG9hZGVyLnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9ub2RlX21vZHVsZXMvYW9zL2Rpc3QvYW9zLmNzcz9jYzlmIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9idXR0b25zLnNjc3M/MjNlNyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvZmVlZGJhY2suc2Nzcz83NzFjIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9mb290ZXIuc2Nzcz85ZDk1Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZWFkZXItcHJvbW8uc2Nzcz9mNDRiIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZWFkZXIuc2Nzcz80MTVlIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9pbWFnZS5zY3NzPzE0NzQiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2luZm9ncmFwaGljLnNjc3M/NmNmYyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvbW9kYWxzLnNjc3M/ZDQwMiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc2VhcmNoLnNjc3M/NTUyMSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc2VsZWN0LWxpc3Quc2Nzcz82OGI4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zaXRlcy1tZW51LnNjc3M/ZWMwOSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc29jaWFsLW1lbnUuc2Nzcz83OWMzIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy90by10b3Auc2Nzcz9hOTkyIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9ID0gd3AuZWxlbWVudDtcbmltcG9ydCB7IHVzZVBhcmFtcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IEFPUyBmcm9tICdhb3MnO1xuaW1wb3J0IHsgRG9CYWNrVG9Ub3AgfSBmcm9tICdzcmMvdXRpbHMvZGlzcGxheSc7XG5pbXBvcnQgVGVtcGxhdGVMb2FkZXIgZnJvbSAnc3JjL2xvYWRlcnMvVGVtcGxhdGVMb2FkZXInO1xuaW1wb3J0IEhlYWRlciBmcm9tICdzcmMvY29tcG9uZW50cy9sYXlvdXQvSGVhZGVyJztcbmltcG9ydCBGb290ZXIgZnJvbSAnc3JjL2NvbXBvbmVudHMvbGF5b3V0L0Zvb3Rlcic7XG5pbXBvcnQgJ2Fvcy9kaXN0L2Fvcy5jc3MnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvdG8tdG9wLnNjc3MnO1xuY29uc3QgTGF5b3V0ID0gKHsgaWZyYW1lID0gZmFsc2UsIHBvc3RUeXBlID0gJycsIHNsdWcgPSAnJyB9KSA9PiB7XG4gICAgY29uc3QgeyBwb3N0VHlwZVBhcmFtLCBzbHVnUGFyYW0gfSA9IHVzZVBhcmFtcygpO1xuICAgIGNvbnN0IGZpbmFsU2x1ZyA9IHNsdWcgPyBzbHVnIDogKHNsdWdQYXJhbSA/IHNsdWdQYXJhbSA6ICcnKTtcbiAgICBjb25zb2xlLmxvZyhmaW5hbFNsdWcpO1xuICAgIGNvbnN0IGZpbmFsUG9zdFR5cGUgPSBwb3N0VHlwZSA/IHBvc3RUeXBlIDogKHBvc3RUeXBlUGFyYW0gPyBwb3N0VHlwZVBhcmFtIDogJycpO1xuICAgIGNvbnN0IFttYWluRWxlbWVudENsYXNzZXMsIHNldE1haW5FbGVtZW50Q2xhc3Nlc10gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgZmluYWxJZnJhbWUgPSBpZnJhbWUgPyBpZnJhbWUgOiBmYWxzZTtcbiAgICBjb25zdCBsYXlvdXRDbGFzc2VzID0gKGNsYXNzZXMpID0+IHtcbiAgICAgICAgaWYgKGZpbmFsSWZyYW1lKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2lmcmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsYXNzZXNTdHJpbmcgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgc2V0TWFpbkVsZW1lbnRDbGFzc2VzKGNsYXNzZXNTdHJpbmcpO1xuICAgIH07XG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnJlcGxhY2UoJz8nLCAnJyk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbmV3IERvQmFja1RvVG9wKCk7XG4gICAgICAgIEFPUy5pbml0KHtcbiAgICAgICAgICAgIG9mZnNldDogMTUwLFxuICAgICAgICAgICAgZGVsYXk6IDEwMCxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMTAwLFxuICAgICAgICAgICAgZWFzaW5nOiAnZWFzZScsXG4gICAgICAgICAgICBvbmNlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBpZnJhbWUgP1xuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibWFpblwiLCB7IGlkOiBcImNvbnRlbnRcIiwgY2xhc3NOYW1lOiBtYWluRWxlbWVudENsYXNzZXMgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGVtcGxhdGVMb2FkZXIsIHsgcG9zdFR5cGU6IGZpbmFsUG9zdFR5cGUsIHNsdWc6IGZpbmFsU2x1ZywgbGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uOiBsYXlvdXRDbGFzc2VzLCBxdWVyeVN0cmluZzogcXVlcnlTdHJpbmcgfSkpXG4gICAgICAgIDogUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZGVyLCBudWxsKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIsIHsgaWQ6IFwiY29udGVudFwiLCBjbGFzc05hbWU6IG1haW5FbGVtZW50Q2xhc3NlcyB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGVtcGxhdGVMb2FkZXIsIHsgcG9zdFR5cGU6IGZpbmFsUG9zdFR5cGUsIHNsdWc6IGZpbmFsU2x1ZywgbGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uOiBsYXlvdXRDbGFzc2VzLCBxdWVyeVN0cmluZzogcXVlcnlTdHJpbmcgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb290ZXIsIG51bGwpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IExheW91dDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBTaW5nbGUgVGVtcGxhdGVzXG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCBsYXp5LCBTdXNwZW5zZSwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNjcm9sbFJlc3RvcmF0aW9uIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBkb0dldFBvc3QgfSBmcm9tICdzcmMvdXRpbHMvYXBpJztcbmltcG9ydCBMb2FkaW5nIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9Mb2FkaW5nJztcbi8vIGNvbnN0IERvQW5ub3VuY2VtZW50ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0Fubm91bmNlbWVudCcgKSApO1xuLy8gY29uc3QgRG9BbmFseXN0UmVwb3J0ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0FuYWx5c3RSZXBvcnQnICkgKTtcbmNvbnN0IERvQmxvZyA9IGxhenkoKCkgPT4gaW1wb3J0KCdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvQmxvZycpKTtcbi8vIGNvbnN0IERvQ3VzdG9tZXJTdG9yeSA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9DdXN0b21lclN0b3J5JyApICk7XG4vLyBjb25zdCBEb0V2ZW50ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0V2ZW50JyApICk7XG4vLyBjb25zdCBEb0Zvcm0gPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvRm9ybScgKSApO1xuLy8gY29uc3QgRG9HbG9zc2FyeSA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9HbG9zc2FyeScgKSApO1xuLy8gY29uc3QgRG9MZWdhbCA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9MZWdhbCcgKSApO1xuLy8gY29uc3QgRG9NZWRpYUNvdmVyYWdlID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb01lZGlhQ292ZXJhZ2UnICkgKTtcbi8vIGNvbnN0IERvUG9kY2FzdCA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9Qb2RjYXN0JyApICk7XG4vLyBjb25zdCBEb1ByZXNzUmVsZWFzZSA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9QcmVzc1JlbGVhc2UnICkgKTtcbi8vIGNvbnN0IERvU2ltcGxlUGFnZSA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9TaW1wbGVQYWdlJyApICk7XG4vLyBjb25zdCBEb1RvcGljID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb1RvcGljJyApICk7XG4vLyBjb25zdCBEb1ZpZGVvID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb1ZpZGVvJyApICk7XG4vLyBjb25zdCBEb1doaXRlUGFwZXIgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvV2hpdGVQYXBlcicgKSApO1xuLy8gY29uc3QgQXR0YWNobWVudCA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvQXR0YWNobWVudCcgKSApO1xuLy8gY29uc3QgRGVmYXVsdFNpbmdsZSA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRGVmYXVsdFNpbmdsZScgKSApO1xuLy8gY29uc3QgTGFuZGluZ1BhZ2UgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvTGFuZGluZ1BhZ2UnICkgKTtcbmNvbnN0IFBhZ2U0MDQgPSBsYXp5KCgpID0+IGltcG9ydCgnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL1BhZ2U0MDQnKSk7XG5jb25zdCB0ZW1wbGF0ZXMgPSB7XG4gICAgLy8gJ2Fib3V0JzogTGFuZGluZ1BhZ2UsXG4gICAgLy8gJ2FkJzogTGFuZGluZ1BhZ2UsXG4gICAgLy8gJ2FuYWx5c3QtcmVwb3J0JzogRG9BbmFseXN0UmVwb3J0LFxuICAgIC8vICdhbm5vdW5jZW1lbnQnOiBEb0Fubm91bmNlbWVudCxcbiAgICAnYmxvZyc6IERvQmxvZyxcbiAgICAvLyAnY3VzdG9tZXItc3RvcnknOiBEb0N1c3RvbWVyU3RvcnksXG4gICAgLy8gJ2RlZmF1bHQnOiBEZWZhdWx0U2luZ2xlLFxuICAgIC8vICdldmVudCc6IERvRXZlbnQsXG4gICAgLy8gJ2Zvcm0nOiBEb0Zvcm0sXG4gICAgLy8gJ2dsb3NzYXJ5JzogRG9HbG9zc2FyeSxcbiAgICAvLyAnbGFuZGluZy1wYWdlJzogTGFuZGluZ1BhZ2UsXG4gICAgLy8gJ2xlZ2FsJzogRG9MZWdhbCxcbiAgICAvLyAnbG9jYXRpb24nOiBMYW5kaW5nUGFnZSxcbiAgICAvLyAnbWVkaWEtbGlicmFyeSc6IEF0dGFjaG1lbnQsXG4gICAgLy8gJ21lZGlhLWNvdmVyYWdlJzogRG9NZWRpYUNvdmVyYWdlLFxuICAgIC8vICdwb2RjYXN0JzogRG9Qb2RjYXN0LFxuICAgIC8vICdwcmVzcy1yZWxlYXNlJzogRG9QcmVzc1JlbGVhc2UsXG4gICAgLy8gJ3NpbXBsZS1wYWdlJzogRG9TaW1wbGVQYWdlLFxuICAgIC8vICd0b3BpYyc6IERvVG9waWMsXG4gICAgLy8gJ3ZpZGVvJzogRG9WaWRlbyxcbiAgICAvLyAnd2hpdGUtcGFwZXInOiBEb1doaXRlUGFwZXIsXG4gICAgJzQwNCc6IFBhZ2U0MDQsXG59O1xuZXhwb3J0IGNvbnN0IFBhZ2VTbHVnQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoJycpO1xuY29uc3QgVGVtcGxhdGVMb2FkZXIgPSAoeyBpZnJhbWUgPSBmYWxzZSwgcG9zdFR5cGUsIHF1ZXJ5U3RyaW5nID0gJycsIHNsdWcsIGxheW91dENsYXNzZXNGdW5jdGlvbiB9KSA9PiB7XG4gICAgY29uc3QgW3Bvc3QsIHNldFBvc3RdID0gdXNlU3RhdGUodW5kZWZpbmVkKTtcbiAgICBjb25zdCBbVGVtcGxhdGVOYW1lLCBzZXRUZW1wbGF0ZU5hbWVdID0gdXNlU3RhdGUoKTtcbiAgICBsZXQgZmluYWxQb3N0VHlwZSA9IHBvc3RUeXBlO1xuICAgIGlmIChmaW5hbFBvc3RUeXBlID09PSAnbWVkaWEnKSB7XG4gICAgICAgIC8vIHJlbmFtZVxuICAgICAgICBmaW5hbFBvc3RUeXBlID0gJ21lZGlhLWxpYnJhcnknO1xuICAgIH1cbiAgICBlbHNlIGlmIChmaW5hbFBvc3RUeXBlID09PSAncGFnZScpIHtcbiAgICAgICAgLy8gcmVuYW1lXG4gICAgICAgIGZpbmFsUG9zdFR5cGUgPSAnc2ltcGxlLXBhZ2UnO1xuICAgIH1cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBhc3luYyBmdW5jdGlvbiBmZXRjaERhdGEoKSB7XG4gICAgICAgICAgICBhd2FpdCBkb0dldFBvc3QoZmluYWxQb3N0VHlwZSwgc2x1ZywgcXVlcnlTdHJpbmcpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5qc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFBvc3QoZGF0YS5qc29uKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZXNbZmluYWxQb3N0VHlwZV0gPyB0ZW1wbGF0ZXNbZmluYWxQb3N0VHlwZV0gOiB0ZW1wbGF0ZXMuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGVtcGxhdGVOYW1lKHRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFBvc3QodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGVtcGxhdGVOYW1lKHRlbXBsYXRlc1snNDA0J10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZldGNoRGF0YSgpO1xuICAgIH0sIFtzbHVnXSk7XG4gICAgaWYgKFRlbXBsYXRlTmFtZSAmJiBwb3N0KSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTdXNwZW5zZSwgeyBmYWxsYmFjazogUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkaW5nLCBudWxsKSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChQYWdlU2x1Z0NvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWU6IHNsdWcgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRlbXBsYXRlTmFtZSwgeyBwb3N0OiBwb3N0LCBpZnJhbWU6IGlmcmFtZSA/IGlmcmFtZSA6IGZhbHNlLCBsYXlvdXRDbGFzc2VzOiBsYXlvdXRDbGFzc2VzRnVuY3Rpb24gfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTY3JvbGxSZXN0b3JhdGlvbiwgbnVsbCkpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBUZW1wbGF0ZUxvYWRlcjtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI2NDE4NjNcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjQyMzg2XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI2NDIwNzFcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjY0MjA3NFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjQyMzg4XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI2NDIxMjFcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjY0MjkxNlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjQzMDAwXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI2NDIzOTRcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjY0MjU5OVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjQyNjAxXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI2NDIwNzNcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjY0MjU5NlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNjQxODg2XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCIwYzBhMTRiZWI1NTE5NmViZjM2MlwiOyB9Il0sIm5hbWVzIjpbIlJlYWN0IiwiX3dwJGVsZW1lbnQiLCJ3cCIsImVsZW1lbnQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVBhcmFtcyIsIkFPUyIsIkRvQmFja1RvVG9wIiwiVGVtcGxhdGVMb2FkZXIiLCJIZWFkZXIiLCJGb290ZXIiLCJMYXlvdXQiLCJfcmVmIiwiX3JlZiRpZnJhbWUiLCJpZnJhbWUiLCJfcmVmJHBvc3RUeXBlIiwicG9zdFR5cGUiLCJfcmVmJHNsdWciLCJzbHVnIiwiX3VzZVBhcmFtcyIsInBvc3RUeXBlUGFyYW0iLCJzbHVnUGFyYW0iLCJmaW5hbFNsdWciLCJjb25zb2xlIiwibG9nIiwiZmluYWxQb3N0VHlwZSIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsIm1haW5FbGVtZW50Q2xhc3NlcyIsInNldE1haW5FbGVtZW50Q2xhc3NlcyIsImZpbmFsSWZyYW1lIiwibGF5b3V0Q2xhc3NlcyIsImNsYXNzZXMiLCJwdXNoIiwiY2xhc3Nlc1N0cmluZyIsImpvaW4iLCJxdWVyeVN0cmluZyIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicmVwbGFjZSIsImluaXQiLCJvZmZzZXQiLCJkZWxheSIsImR1cmF0aW9uIiwiZWFzaW5nIiwib25jZSIsImNyZWF0ZUVsZW1lbnQiLCJGcmFnbWVudCIsImlkIiwiY2xhc3NOYW1lIiwibGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uIiwiY3JlYXRlQ29udGV4dCIsImxhenkiLCJTdXNwZW5zZSIsIlNjcm9sbFJlc3RvcmF0aW9uIiwiZG9HZXRQb3N0IiwiTG9hZGluZyIsIkRvQmxvZyIsIlBhZ2U0MDQiLCJ0ZW1wbGF0ZXMiLCJQYWdlU2x1Z0NvbnRleHQiLCJfcmVmJHF1ZXJ5U3RyaW5nIiwidW5kZWZpbmVkIiwicG9zdCIsInNldFBvc3QiLCJfdXNlU3RhdGUzIiwiX3VzZVN0YXRlNCIsIlRlbXBsYXRlTmFtZSIsInNldFRlbXBsYXRlTmFtZSIsImZldGNoRGF0YSIsIl9mZXRjaERhdGEiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsIm1hcmsiLCJfY2FsbGVlIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsInRoZW4iLCJkYXRhIiwianNvbiIsInRlbXBsYXRlIiwiZGVmYXVsdCIsInN0b3AiLCJmYWxsYmFjayIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9