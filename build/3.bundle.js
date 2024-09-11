"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[3],{

/***/ 9791:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4942);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_loaders_TemplateLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6654);
/* harmony import */ var src_components_shared_Hero__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7637);
/* harmony import */ var src_components_shared_SEOTags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(826);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

var _wp$element = wp.element,
  useContext = _wp$element.useContext,
  useEffect = _wp$element.useEffect;




var Page404 = function Page404(_ref) {
  var layoutClassesFunction = _ref.layoutClassesFunction;
  var slug = useContext(src_loaders_TemplateLoader__WEBPACK_IMPORTED_MODULE_2__/* .PageSlugContext */ .$);
  // Settings
  var heroSettings = {
    title: 'Page Not Found',
    copy: '<p>Oops, looks like the page you are trying to reach is not available.</p><p>Please check the URL for proper spelling or return to our homepage.</p>',
    backgroundSettings: {
      color: 'white',
      avatar: true
    },
    ctas: [{
      text: 'Go Back Home',
      url: '/',
      buttonStyle: 'solid-button'
    }]
  };
  var seoSettings = {
    seo_title: 'Page Not Found',
    seo_site_name: '{DevelopersOnly}',
    seo_url: homeURL + '/' + slug + '/',
    seo_locale: 'en_US',
    seo_description: '',
    noindex: true
  };
  // Set classes for <main>
  useEffect(function () {
    // Set classes for <main>
    if (layoutClassesFunction) {
      layoutClassesFunction(['page-404']);
    }
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_SEOTags__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
    post: seoSettings
  }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Hero__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, _objectSpread({}, heroSettings)));
};
/* harmony default export */ __webpack_exports__["default"] = (Page404);

/***/ })

}]);
//# sourceMappingURL=3.bundle.js.map?v=1726017769337