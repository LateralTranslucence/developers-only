"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_Page404_tsx"],{

/***/ "./src/components/templates/Page404.tsx":
/*!**********************************************!*\
  !*** ./src/components/templates/Page404.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_loaders_TemplateLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/loaders/TemplateLoader */ "./src/loaders/TemplateLoader.tsx");
/* harmony import */ var src_components_shared_Hero__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/Hero */ "./src/components/shared/Hero.tsx");
/* harmony import */ var src_components_shared_SEOTags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/SEOTags */ "./src/components/shared/SEOTags.tsx");
/* harmony import */ var assets_styles_pages_404_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! assets/styles/pages/404.scss */ "./assets/styles/pages/404.scss");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

var _wp$element = wp.element,
  useContext = _wp$element.useContext,
  useEffect = _wp$element.useEffect;




var Page404 = function Page404(_ref) {
  var layoutClassesFunction = _ref.layoutClassesFunction;
  var slug = useContext(src_loaders_TemplateLoader__WEBPACK_IMPORTED_MODULE_2__.PageSlugContext);
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
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_SEOTags__WEBPACK_IMPORTED_MODULE_4__["default"], {
    post: seoSettings
  }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Hero__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread({}, heroSettings)));
};
/* harmony default export */ __webpack_exports__["default"] = (Page404);

/***/ }),

/***/ "./assets/styles/pages/404.scss":
/*!**************************************!*\
  !*** ./assets/styles/pages/404.scss ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726026376858
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX1BhZ2U0MDRfdHN4LmJ1bmRsZS5qcz92PTE3MjYwMTc4NDg2NTEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDMUIsSUFBQUMsV0FBQSxHQUFrQ0MsRUFBRSxDQUFDQyxPQUFPO0VBQXBDQyxVQUFVLEdBQUFILFdBQUEsQ0FBVkcsVUFBVTtFQUFFQyxTQUFTLEdBQUFKLFdBQUEsQ0FBVEksU0FBUztBQUNnQztBQUNmO0FBQ007QUFDZDtBQUN0QyxJQUFNSSxPQUFPLEdBQUcsU0FBVkEsT0FBT0EsQ0FBQUMsSUFBQSxFQUFrQztFQUFBLElBQTVCQyxxQkFBcUIsR0FBQUQsSUFBQSxDQUFyQkMscUJBQXFCO0VBQ3BDLElBQU1DLElBQUksR0FBR1IsVUFBVSxDQUFDRSx1RUFBZSxDQUFDO0VBQ3hDO0VBQ0EsSUFBTU8sWUFBWSxHQUFHO0lBQ2pCQyxLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCQyxJQUFJLEVBQUUsc0pBQXNKO0lBQzVKQyxrQkFBa0IsRUFBRTtNQUFFQyxLQUFLLEVBQUUsT0FBTztNQUFFQyxNQUFNLEVBQUU7SUFBSyxDQUFDO0lBQ3BEQyxJQUFJLEVBQUUsQ0FBQztNQUFFQyxJQUFJLEVBQUUsY0FBYztNQUFFQyxHQUFHLEVBQUUsR0FBRztNQUFFQyxXQUFXLEVBQUU7SUFBZSxDQUFDO0VBQzFFLENBQUM7RUFDRCxJQUFNQyxXQUFXLEdBQUc7SUFDaEJDLFNBQVMsRUFBRSxnQkFBZ0I7SUFDM0JDLGFBQWEsRUFBRSxrQkFBa0I7SUFDakNDLE9BQU8sRUFBRUMsT0FBTyxHQUFHLEdBQUcsR0FBR2YsSUFBSSxHQUFHLEdBQUc7SUFDbkNnQixVQUFVLEVBQUUsT0FBTztJQUNuQkMsZUFBZSxFQUFFLEVBQUU7SUFDbkJDLE9BQU8sRUFBRTtFQUNiLENBQUM7RUFDRDtFQUNBekIsU0FBUyxDQUFDLFlBQU07SUFDWjtJQUNBLElBQUlNLHFCQUFxQixFQUFFO01BQ3ZCQSxxQkFBcUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDO0VBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQztFQUNOLE9BQVFYLDBEQUFtQixDQUFDQSx1REFBYyxFQUFFLElBQUksRUFDNUNBLDBEQUFtQixDQUFDUSxxRUFBTyxFQUFFO0lBQUV5QixJQUFJLEVBQUVWO0VBQVksQ0FBQyxDQUFDLEVBQ25EdkIsMERBQW1CLENBQUNPLGtFQUFJLEVBQUEyQixhQUFBLEtBQU9yQixZQUFZLENBQUUsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFDRCwrREFBZUosT0FBTzs7Ozs7Ozs7Ozs7QUNsQ3RCO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL1BhZ2U0MDQudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvcGFnZXMvNDA0LnNjc3M/ZWJkMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QgfSA9IHdwLmVsZW1lbnQ7XG5pbXBvcnQgeyBQYWdlU2x1Z0NvbnRleHQgfSBmcm9tICdzcmMvbG9hZGVycy9UZW1wbGF0ZUxvYWRlcic7XG5pbXBvcnQgSGVybyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSGVybyc7XG5pbXBvcnQgU0VPVGFncyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvU0VPVGFncyc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvcGFnZXMvNDA0LnNjc3MnO1xuY29uc3QgUGFnZTQwNCA9ICh7IGxheW91dENsYXNzZXNGdW5jdGlvbiB9KSA9PiB7XG4gICAgY29uc3Qgc2x1ZyA9IHVzZUNvbnRleHQoUGFnZVNsdWdDb250ZXh0KTtcbiAgICAvLyBTZXR0aW5nc1xuICAgIGNvbnN0IGhlcm9TZXR0aW5ncyA9IHtcbiAgICAgICAgdGl0bGU6ICdQYWdlIE5vdCBGb3VuZCcsXG4gICAgICAgIGNvcHk6ICc8cD5Pb3BzLCBsb29rcyBsaWtlIHRoZSBwYWdlIHlvdSBhcmUgdHJ5aW5nIHRvIHJlYWNoIGlzIG5vdCBhdmFpbGFibGUuPC9wPjxwPlBsZWFzZSBjaGVjayB0aGUgVVJMIGZvciBwcm9wZXIgc3BlbGxpbmcgb3IgcmV0dXJuIHRvIG91ciBob21lcGFnZS48L3A+JyxcbiAgICAgICAgYmFja2dyb3VuZFNldHRpbmdzOiB7IGNvbG9yOiAnd2hpdGUnLCBhdmF0YXI6IHRydWUgfSxcbiAgICAgICAgY3RhczogW3sgdGV4dDogJ0dvIEJhY2sgSG9tZScsIHVybDogJy8nLCBidXR0b25TdHlsZTogJ3NvbGlkLWJ1dHRvbicgfV0sXG4gICAgfTtcbiAgICBjb25zdCBzZW9TZXR0aW5ncyA9IHtcbiAgICAgICAgc2VvX3RpdGxlOiAnUGFnZSBOb3QgRm91bmQnLFxuICAgICAgICBzZW9fc2l0ZV9uYW1lOiAne0RldmVsb3BlcnNPbmx5fScsXG4gICAgICAgIHNlb191cmw6IGhvbWVVUkwgKyAnLycgKyBzbHVnICsgJy8nLFxuICAgICAgICBzZW9fbG9jYWxlOiAnZW5fVVMnLFxuICAgICAgICBzZW9fZGVzY3JpcHRpb246ICcnLFxuICAgICAgICBub2luZGV4OiB0cnVlLFxuICAgIH07XG4gICAgLy8gU2V0IGNsYXNzZXMgZm9yIDxtYWluPlxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIFNldCBjbGFzc2VzIGZvciA8bWFpbj5cbiAgICAgICAgaWYgKGxheW91dENsYXNzZXNGdW5jdGlvbikge1xuICAgICAgICAgICAgbGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uKFsncGFnZS00MDQnXSk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNFT1RhZ3MsIHsgcG9zdDogc2VvU2V0dGluZ3MgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVybywgeyAuLi5oZXJvU2V0dGluZ3MgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBQYWdlNDA0O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3Njg1OFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiXSwibmFtZXMiOlsiUmVhY3QiLCJfd3AkZWxlbWVudCIsIndwIiwiZWxlbWVudCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJQYWdlU2x1Z0NvbnRleHQiLCJIZXJvIiwiU0VPVGFncyIsIlBhZ2U0MDQiLCJfcmVmIiwibGF5b3V0Q2xhc3Nlc0Z1bmN0aW9uIiwic2x1ZyIsImhlcm9TZXR0aW5ncyIsInRpdGxlIiwiY29weSIsImJhY2tncm91bmRTZXR0aW5ncyIsImNvbG9yIiwiYXZhdGFyIiwiY3RhcyIsInRleHQiLCJ1cmwiLCJidXR0b25TdHlsZSIsInNlb1NldHRpbmdzIiwic2VvX3RpdGxlIiwic2VvX3NpdGVfbmFtZSIsInNlb191cmwiLCJob21lVVJMIiwic2VvX2xvY2FsZSIsInNlb19kZXNjcmlwdGlvbiIsIm5vaW5kZXgiLCJjcmVhdGVFbGVtZW50IiwiRnJhZ21lbnQiLCJwb3N0IiwiX29iamVjdFNwcmVhZCJdLCJzb3VyY2VSb290IjoiIn0=