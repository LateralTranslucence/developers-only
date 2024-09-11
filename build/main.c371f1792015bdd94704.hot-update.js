"use strict";
self["webpackHotUpdatedevelopers_only"]("main",{

/***/ "./src/components/layout/Header.tsx":
/*!******************************************!*\
  !*** ./src/components/layout/Header.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_layout_HeaderPromo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/layout/HeaderPromo */ "./src/components/layout/HeaderPromo.tsx");
/* harmony import */ var src_components_shared_Logo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/Logo */ "./src/components/shared/Logo.tsx");
/* harmony import */ var src_components_shared_Menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/shared/Menu */ "./src/components/shared/Menu.tsx");
/* harmony import */ var src_components_layout_SearchForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/components/layout/SearchForm */ "./src/components/layout/SearchForm.tsx");
/* harmony import */ var assets_styles_components_sites_menu_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! assets/styles/components/sites-menu.scss */ "./assets/styles/components/sites-menu.scss");
/* harmony import */ var assets_styles_components_header_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! assets/styles/components/header.scss */ "./assets/styles/components/header.scss");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * HEADER
 *
 */








var Header = function Header() {
  // CTA settings
  var ctaSettings = {
    url: 'contact',
    text: 'Request a Demo',
    modal: true,
    classes: ['solid-button', 'header-cta']
  };
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
    href: "#content",
    tabIndex: 1,
    className: "screen-reader-text"
  }, "Skip to main content"), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("aside", {
    id: "do-header-promo"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "container"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_layout_HeaderPromo__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Menu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "social-nav"
  }))), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("header", {
    id: "do-header"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("nav", {
    id: "do-navbar-main",
    className: "container"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Logo__WEBPACK_IMPORTED_MODULE_4__["default"], {
    id: "do-navbar-logo"
  }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    id: "do-navbar-menu"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Menu__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "main-nav"
  }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    id: "do-navbar-utilities" /* className="search-toggle" */
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "utilities-wrapper site-search"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_layout_SearchForm__WEBPACK_IMPORTED_MODULE_6__["default"], null)), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "utilities-wrapper cta"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({}, ctaSettings))))), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
    id: "do-navbar-toggle"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "Menu")))));
};
/* harmony default export */ __webpack_exports__["default"] = (Header);

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
  console.log(postType);
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
  console.log(finalPostType);
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
      // 1726022575452
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
      // 1726022575872
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
      // 1726022575544
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
      // 1726022575547
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
      // 1726022575831
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
      // 1726022575546
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
      // 1726022576030
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
      // 1726022576251
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
      // 1726022575876
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
      // 1726022575829
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
      // 1726022575877
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
      // 1726022575542
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
      // 1726022575874
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
      // 1726022575455
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "e2d353978cf834bdf781"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jMzcxZjE3OTIwMTViZGQ5NDcwNC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDa0I7QUFDZ0I7QUFDZDtBQUNBO0FBQ1k7QUFDUjtBQUNKO0FBQzlDLElBQU1NLE1BQU0sR0FBRyxTQUFUQSxNQUFNQSxDQUFBLEVBQVM7RUFDakI7RUFDQSxJQUFNQyxXQUFXLEdBQUc7SUFDaEJDLEdBQUcsRUFBRSxTQUFTO0lBQ2RDLElBQUksRUFBRSxnQkFBZ0I7SUFDdEJDLEtBQUssRUFBRSxJQUFJO0lBQ1hDLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFZO0VBQzFDLENBQUM7RUFDRCxPQUFRWCwwREFBbUIsQ0FBQ0EsdURBQWMsRUFBRSxJQUFJLEVBQzVDQSwwREFBbUIsQ0FBQyxHQUFHLEVBQUU7SUFBRWMsSUFBSSxFQUFFLFVBQVU7SUFBRUMsUUFBUSxFQUFFLENBQUM7SUFBRUMsU0FBUyxFQUFFO0VBQXFCLENBQUMsRUFBRSxzQkFBc0IsQ0FBQyxFQUNwSGhCLDBEQUFtQixDQUFDLE9BQU8sRUFBRTtJQUFFaUIsRUFBRSxFQUFFO0VBQWtCLENBQUMsRUFDbERqQiwwREFBbUIsQ0FBQyxLQUFLLEVBQUU7SUFBRWdCLFNBQVMsRUFBRTtFQUFZLENBQUMsRUFDakRoQiwwREFBbUIsQ0FBQ0UseUVBQVcsRUFBRSxJQUFJLENBQUMsRUFDdENGLDBEQUFtQixDQUFDSSxrRUFBSSxFQUFFO0lBQUVjLElBQUksRUFBRTtFQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0RsQiwwREFBbUIsQ0FBQyxRQUFRLEVBQUU7SUFBRWlCLEVBQUUsRUFBRTtFQUFZLENBQUMsRUFDN0NqQiwwREFBbUIsQ0FBQyxLQUFLLEVBQUU7SUFBRWlCLEVBQUUsRUFBRSxnQkFBZ0I7SUFBRUQsU0FBUyxFQUFFO0VBQVksQ0FBQyxFQUN2RWhCLDBEQUFtQixDQUFDRyxrRUFBSSxFQUFFO0lB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T0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7VUNSQSxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy9sYXlvdXQvSGVhZGVyLnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvbG9hZGVycy9UZW1wbGF0ZUxvYWRlci50c3giLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vbm9kZV9tb2R1bGVzL2Fvcy9kaXN0L2Fvcy5jc3M/Y2M5ZiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvYnV0dG9ucy5zY3NzPzIzZTciLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2ZlZWRiYWNrLnNjc3M/NzcxYyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvZm9vdGVyLnNjc3M/OWQ5NSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvaGVhZGVyLXByb21vLnNjc3M/ZjQ0YiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvaGVhZGVyLnNjc3M/NDE1ZSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvaW1hZ2Uuc2Nzcz8xNDc0Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9pbmZvZ3JhcGhpYy5zY3NzPzZjZmMiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL21vZGFscy5zY3NzP2Q0MDIiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3NlYXJjaC5zY3NzPzU1MjEiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3NlbGVjdC1saXN0LnNjc3M/NjhiOCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvc2l0ZXMtbWVudS5zY3NzP2VjMDkiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3NvY2lhbC1tZW51LnNjc3M/NzljMyIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvdG8tdG9wLnNjc3M/YTk5MiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBIRUFERVJcbiAqXG4gKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ1RBIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9DVEEnO1xuaW1wb3J0IEhlYWRlclByb21vIGZyb20gJ3NyYy9jb21wb25lbnRzL2xheW91dC9IZWFkZXJQcm9tbyc7XG5pbXBvcnQgTG9nbyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvTG9nbyc7XG5pbXBvcnQgTWVudSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvTWVudSc7XG5pbXBvcnQgU2VhcmNoRm9ybSBmcm9tICdzcmMvY29tcG9uZW50cy9sYXlvdXQvU2VhcmNoRm9ybSc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zaXRlcy1tZW51LnNjc3MnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvaGVhZGVyLnNjc3MnO1xuY29uc3QgSGVhZGVyID0gKCkgPT4ge1xuICAgIC8vIENUQSBzZXR0aW5nc1xuICAgIGNvbnN0IGN0YVNldHRpbmdzID0ge1xuICAgICAgICB1cmw6ICdjb250YWN0JyxcbiAgICAgICAgdGV4dDogJ1JlcXVlc3QgYSBEZW1vJyxcbiAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgIGNsYXNzZXM6IFsnc29saWQtYnV0dG9uJywgJ2hlYWRlci1jdGEnXSxcbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBocmVmOiBcIiNjb250ZW50XCIsIHRhYkluZGV4OiAxLCBjbGFzc05hbWU6IFwic2NyZWVuLXJlYWRlci10ZXh0XCIgfSwgXCJTa2lwIHRvIG1haW4gY29udGVudFwiKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFzaWRlXCIsIHsgaWQ6IFwiZG8taGVhZGVyLXByb21vXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiY29udGFpbmVyXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlYWRlclByb21vLCBudWxsKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KE1lbnUsIHsgbmFtZTogXCJzb2NpYWwtbmF2XCIgfSkpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImhlYWRlclwiLCB7IGlkOiBcImRvLWhlYWRlclwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibmF2XCIsIHsgaWQ6IFwiZG8tbmF2YmFyLW1haW5cIiwgY2xhc3NOYW1lOiBcImNvbnRhaW5lclwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMb2dvLCB7IGlkOiBcImRvLW5hdmJhci1sb2dvXCIgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcImRvLW5hdmJhci1tZW51XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNZW51LCB7IG5hbWU6IFwibWFpbi1uYXZcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcImRvLW5hdmJhci11dGlsaXRpZXNcIiAvKiBjbGFzc05hbWU9XCJzZWFyY2gtdG9nZ2xlXCIgKi8gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwidXRpbGl0aWVzLXdyYXBwZXIgc2l0ZS1zZWFyY2hcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VhcmNoRm9ybSwgbnVsbCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ1dGlsaXRpZXMtd3JhcHBlciBjdGFcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IC4uLmN0YVNldHRpbmdzIH0pKSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBpZDogXCJkby1uYXZiYXItdG9nZ2xlXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJNZW51XCIpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIFNpbmdsZSBUZW1wbGF0ZXNcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIGxhenksIFN1c3BlbnNlLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2Nyb2xsUmVzdG9yYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCB7IGRvR2V0UG9zdCB9IGZyb20gJ3NyYy91dGlscy9hcGknO1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0xvYWRpbmcnO1xuLy8gY29uc3QgRG9Bbm5vdW5jZW1lbnQgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvQW5ub3VuY2VtZW50JyApICk7XG4vLyBjb25zdCBEb0FuYWx5c3RSZXBvcnQgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvQW5hbHlzdFJlcG9ydCcgKSApO1xuY29uc3QgRG9CbG9nID0gbGF6eSgoKSA9PiBpbXBvcnQoJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9CbG9nJykpO1xuLy8gY29uc3QgRG9DdXN0b21lclN0b3J5ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0N1c3RvbWVyU3RvcnknICkgKTtcbi8vIGNvbnN0IERvRXZlbnQgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvRXZlbnQnICkgKTtcbi8vIGNvbnN0IERvRm9ybSA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9Gb3JtJyApICk7XG4vLyBjb25zdCBEb0dsb3NzYXJ5ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0dsb3NzYXJ5JyApICk7XG4vLyBjb25zdCBEb0xlZ2FsID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0xlZ2FsJyApICk7XG4vLyBjb25zdCBEb01lZGlhQ292ZXJhZ2UgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvTWVkaWFDb3ZlcmFnZScgKSApO1xuLy8gY29uc3QgRG9Qb2RjYXN0ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb1BvZGNhc3QnICkgKTtcbi8vIGNvbnN0IERvUHJlc3NSZWxlYXNlID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb1ByZXNzUmVsZWFzZScgKSApO1xuLy8gY29uc3QgRG9TaW1wbGVQYWdlID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb1NpbXBsZVBhZ2UnICkgKTtcbi8vIGNvbnN0IERvVG9waWMgPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvVG9waWMnICkgKTtcbi8vIGNvbnN0IERvVmlkZW8gPSBsYXp5KCAoKSA9PiBpbXBvcnQoICdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2luZ2xlL0RvVmlkZW8nICkgKTtcbi8vIGNvbnN0IERvV2hpdGVQYXBlciA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9XaGl0ZVBhcGVyJyApICk7XG4vLyBjb25zdCBBdHRhY2htZW50ID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9BdHRhY2htZW50JyApICk7XG4vLyBjb25zdCBEZWZhdWx0U2luZ2xlID0gbGF6eSggKCkgPT4gaW1wb3J0KCAnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9EZWZhdWx0U2luZ2xlJyApICk7XG4vLyBjb25zdCBMYW5kaW5nUGFnZSA9IGxhenkoICgpID0+IGltcG9ydCggJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9MYW5kaW5nUGFnZScgKSApO1xuY29uc3QgUGFnZTQwNCA9IGxhenkoKCkgPT4gaW1wb3J0KCdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvUGFnZTQwNCcpKTtcbmNvbnN0IHRlbXBsYXRlcyA9IHtcbiAgICAvLyAnYWJvdXQnOiBMYW5kaW5nUGFnZSxcbiAgICAvLyAnYWQnOiBMYW5kaW5nUGFnZSxcbiAgICAvLyAnYW5hbHlzdC1yZXBvcnQnOiBEb0FuYWx5c3RSZXBvcnQsXG4gICAgLy8gJ2Fubm91bmNlbWVudCc6IERvQW5ub3VuY2VtZW50LFxuICAgICdibG9nJzogRG9CbG9nLFxuICAgIC8vICdjdXN0b21lci1zdG9yeSc6IERvQ3VzdG9tZXJTdG9yeSxcbiAgICAvLyAnZGVmYXVsdCc6IERlZmF1bHRTaW5nbGUsXG4gICAgLy8gJ2V2ZW50JzogRG9FdmVudCxcbiAgICAvLyAnZm9ybSc6IERvRm9ybSxcbiAgICAvLyAnZ2xvc3NhcnknOiBEb0dsb3NzYXJ5LFxuICAgIC8vICdsYW5kaW5nLXBhZ2UnOiBMYW5kaW5nUGFnZSxcbiAgICAvLyAnbGVnYWwnOiBEb0xlZ2FsLFxuICAgIC8vICdsb2NhdGlvbic6IExhbmRpbmdQYWdlLFxuICAgIC8vICdtZWRpYS1saWJyYXJ5JzogQXR0YWNobWVudCxcbiAgICAvLyAnbWVkaWEtY292ZXJhZ2UnOiBEb01lZGlhQ292ZXJhZ2UsXG4gICAgLy8gJ3BvZGNhc3QnOiBEb1BvZGNhc3QsXG4gICAgLy8gJ3ByZXNzLXJlbGVhc2UnOiBEb1ByZXNzUmVsZWFzZSxcbiAgICAvLyAnc2ltcGxlLXBhZ2UnOiBEb1NpbXBsZVBhZ2UsXG4gICAgLy8gJ3RvcGljJzogRG9Ub3BpYyxcbiAgICAvLyAndmlkZW8nOiBEb1ZpZGVvLFxuICAgIC8vICd3aGl0ZS1wYXBlcic6IERvV2hpdGVQYXBlcixcbiAgICAnNDA0JzogUGFnZTQwNCxcbn07XG5leHBvcnQgY29uc3QgUGFnZVNsdWdDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgnJyk7XG5jb25zdCBUZW1wbGF0ZUxvYWRlciA9ICh7IGlmcmFtZSA9IGZhbHNlLCBwb3N0VHlwZSwgcXVlcnlTdHJpbmcgPSAnJywgc2x1ZywgbGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uIH0pID0+IHtcbiAgICBjb25zb2xlLmxvZyhwb3N0VHlwZSk7XG4gICAgY29uc3QgW3Bvc3QsIHNldFBvc3RdID0gdXNlU3RhdGUodW5kZWZpbmVkKTtcbiAgICBjb25zdCBbVGVtcGxhdGVOYW1lLCBzZXRUZW1wbGF0ZU5hbWVdID0gdXNlU3RhdGUoKTtcbiAgICBsZXQgZmluYWxQb3N0VHlwZSA9IHBvc3RUeXBlO1xuICAgIGlmIChmaW5hbFBvc3RUeXBlID09PSAnbWVkaWEnKSB7XG4gICAgICAgIC8vIHJlbmFtZVxuICAgICAgICBmaW5hbFBvc3RUeXBlID0gJ21lZGlhLWxpYnJhcnknO1xuICAgIH1cbiAgICBlbHNlIGlmIChmaW5hbFBvc3RUeXBlID09PSAncGFnZScpIHtcbiAgICAgICAgLy8gcmVuYW1lXG4gICAgICAgIGZpbmFsUG9zdFR5cGUgPSAnc2ltcGxlLXBhZ2UnO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhmaW5hbFBvc3RUeXBlKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBhc3luYyBmdW5jdGlvbiBmZXRjaERhdGEoKSB7XG4gICAgICAgICAgICBhd2FpdCBkb0dldFBvc3QoZmluYWxQb3N0VHlwZSwgc2x1ZywgcXVlcnlTdHJpbmcpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5qc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFBvc3QoZGF0YS5qc29uKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZXNbZmluYWxQb3N0VHlwZV0gPyB0ZW1wbGF0ZXNbZmluYWxQb3N0VHlwZV0gOiB0ZW1wbGF0ZXMuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGVtcGxhdGVOYW1lKHRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFBvc3QodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGVtcGxhdGVOYW1lKHRlbXBsYXRlc1snNDA0J10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZldGNoRGF0YSgpO1xuICAgIH0sIFtzbHVnXSk7XG4gICAgaWYgKFRlbXBsYXRlTmFtZSAmJiBwb3N0KSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTdXNwZW5zZSwgeyBmYWxsYmFjazogUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkaW5nLCBudWxsKSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChQYWdlU2x1Z0NvbnRleHQuUHJvdmlkZXIsIHsgdmFsdWU6IHNsdWcgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRlbXBsYXRlTmFtZSwgeyBwb3N0OiBwb3N0LCBpZnJhbWU6IGlmcmFtZSA/IGlmcmFtZSA6IGZhbHNlLCBsYXlvdXRDbGFzc2VzOiBsYXlvdXRDbGFzc2VzRnVuY3Rpb24gfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTY3JvbGxSZXN0b3JhdGlvbiwgbnVsbCkpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBUZW1wbGF0ZUxvYWRlcjtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI1NzU0NTJcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNTc1ODcyXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI1NzU1NDRcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjU3NTU0N1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNTc1ODMxXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI1NzU1NDZcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjU3NjAzMFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNTc2MjUxXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI1NzU4NzZcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjU3NTgyOVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNTc1ODc3XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjI1NzU1NDJcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyMjU3NTg3NFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDIyNTc1NDU1XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJlMmQzNTM5NzhjZjgzNGJkZjc4MVwiOyB9Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ1RBIiwiSGVhZGVyUHJvbW8iLCJMb2dvIiwiTWVudSIsIlNlYXJjaEZvcm0iLCJIZWFkZXIiLCJjdGFTZXR0aW5ncyIsInVybCIsInRleHQiLCJtb2RhbCIsImNsYXNzZXMiLCJjcmVhdGVFbGVtZW50IiwiRnJhZ21lbnQiLCJocmVmIiwidGFiSW5kZXgiLCJjbGFzc05hbWUiLCJpZCIsIm5hbWUiLCJfb2JqZWN0U3ByZWFkIiwiY3JlYXRlQ29udGV4dCIsImxhenkiLCJTdXNwZW5zZSIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiU2Nyb2xsUmVzdG9yYXRpb24iLCJkb0dldFBvc3QiLCJMb2FkaW5nIiwiRG9CbG9nIiwiUGFnZTQwNCIsInRlbXBsYXRlcyIsIlBhZ2VTbHVnQ29udGV4dCIsIlRlbXBsYXRlTG9hZGVyIiwiX3JlZiIsIl9yZWYkaWZyYW1lIiwiaWZyYW1lIiwicG9zdFR5cGUiLCJfcmVmJHF1ZXJ5U3RyaW5nIiwicXVlcnlTdHJpbmciLCJzbHVnIiwibGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uIiwiY29uc29sZSIsImxvZyIsIl91c2VTdGF0ZSIsInVuZGVmaW5lZCIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInBvc3QiLCJzZXRQb3N0IiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJUZW1wbGF0ZU5hbWUiLCJzZXRUZW1wbGF0ZU5hbWUiLCJmaW5hbFBvc3RUeXBlIiwiZmV0Y2hEYXRhIiwiX2ZldGNoRGF0YSIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwidGhlbiIsImRhdGEiLCJqc29uIiwidGVtcGxhdGUiLCJkZWZhdWx0Iiwic3RvcCIsImZhbGxiYWNrIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsImxheW91dENsYXNzZXMiXSwic291cmNlUm9vdCI6IiJ9