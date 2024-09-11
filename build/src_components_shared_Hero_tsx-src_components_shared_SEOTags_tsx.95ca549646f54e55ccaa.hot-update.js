"use strict";
self["webpackHotUpdatedevelopers_only"]("src_components_shared_Hero_tsx-src_components_shared_SEOTags_tsx",{

/***/ "./src/components/shared/Hero.tsx":
/*!****************************************!*\
  !*** ./src/components/shared/Hero.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_BackgroundVideo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/BackgroundVideo */ "./src/components/shared/BackgroundVideo.tsx");
/* harmony import */ var src_components_shared_Breadcrumbs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/Breadcrumbs */ "./src/components/shared/Breadcrumbs.tsx");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_MediaLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/components/shared/MediaLoader */ "./src/components/shared/MediaLoader.tsx");
/* harmony import */ var src_components_shared_ShareBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/components/shared/ShareBar */ "./src/components/shared/ShareBar.tsx");
/* harmony import */ var assets_styles_components_hero_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! assets/styles/components/hero.scss */ "./assets/styles/components/hero.scss");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }









var Hero = function Hero(_ref) {
  var backgroundSettings = _ref.backgroundSettings,
    breadcrumbs = _ref.breadcrumbs,
    _ref$classes = _ref.classes,
    classes = _ref$classes === void 0 ? [] : _ref$classes,
    _ref$copy = _ref.copy,
    copy = _ref$copy === void 0 ? '' : _ref$copy,
    _ref$ctas = _ref.ctas,
    ctas = _ref$ctas === void 0 ? [] : _ref$ctas,
    customHTML = _ref.customHTML,
    customHTMLAfter = _ref.customHTMLAfter,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? 'hero' : _ref$id,
    _ref$imageLink = _ref.imageLink,
    imageLink = _ref$imageLink === void 0 ? {
      modal: false,
      url: ''
    } : _ref$imageLink,
    _ref$media = _ref.media,
    media = _ref$media === void 0 ? {} : _ref$media,
    _ref$mediaLoop = _ref.mediaLoop,
    mediaLoop = _ref$mediaLoop === void 0 ? false : _ref$mediaLoop,
    _ref$pretitle = _ref.pretitle,
    pretitle = _ref$pretitle === void 0 ? '' : _ref$pretitle,
    _ref$publishDate = _ref.publishDate,
    publishDate = _ref$publishDate === void 0 ? '' : _ref$publishDate,
    _ref$shareBar = _ref.shareBar,
    shareBar = _ref$shareBar === void 0 ? false : _ref$shareBar,
    _ref$subtitle = _ref.subtitle,
    subtitle = _ref$subtitle === void 0 ? '' : _ref$subtitle,
    _ref$textColor = _ref.textColor,
    textColor = _ref$textColor === void 0 ? '' : _ref$textColor,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$url = _ref.url,
    url = _ref$url === void 0 ? '' : _ref$url;
  // Add some classes
  if (textColor.length) {
    classes.push('text-' + textColor);
  }
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(backgroundSettings)) {
    classes.push('has-background');
  }
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(copy)) {
    classes.push('has-copy');
  }
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(media)) {
    classes.push('has-media');
  }
  var heroBackground = (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doBackgroundImage)(backgroundSettings, classes);
  var headingSettings = {
    tag: 'h1',
    pretitle: pretitle,
    title: title,
    subtitle: subtitle,
    publishDate: publishDate
  };
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("header", _objectSpread({
    id: id
  }, heroBackground), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_BackgroundVideo__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread(_objectSpread({}, backgroundSettings), {}, {
    id: "hero-background"
  })), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "hero-container container"
  }, breadcrumbs ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Breadcrumbs__WEBPACK_IMPORTED_MODULE_4__["default"], {
    post: breadcrumbs
  }) : null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "hero-text-wrapper"
  }, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(title) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_6__["default"], _objectSpread({}, headingSettings)) : null, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(copy) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doParse)(copy)) : null, "Start CTAs", (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(ctas) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", {
    id: "hero-cta"
  }, ctas.map(function (cta, index) {
    var ctaSettings = {
      url: cta.url,
      text: cta.text,
      modal: cta.modal,
      modalClass: cta.modalClass,
      classes: cta.buttonStyle ? ['button', cta.buttonStyle] : ['button']
    };
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_5__["default"], _objectSpread({
      key: index
    }, ctaSettings));
  })) : null, "End CTAs", customHTML ? (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doParse)(customHTML) : null), (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(media) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "hero-media-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_5__["default"], {
    url: imageLink.url,
    modal: imageLink.modal,
    classes: []
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_MediaLoader__WEBPACK_IMPORTED_MODULE_7__["default"], {
    media: media,
    size: "square_600",
    loop: mediaLoop
  }))) : null, customHTMLAfter ? customHTMLAfter : null, shareBar ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_ShareBar__WEBPACK_IMPORTED_MODULE_8__["default"], {
    title: title,
    url: url
  }) : null));
};
/* harmony default export */ __webpack_exports__["default"] = (Hero);

/***/ }),

/***/ "./assets/styles/components/background-videos.scss":
/*!*********************************************************!*\
  !*** ./assets/styles/components/background-videos.scss ***!
  \*********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025954131
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/breadcrumbs.scss":
/*!***************************************************!*\
  !*** ./assets/styles/components/breadcrumbs.scss ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025954129
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/hero.scss":
/*!********************************************!*\
  !*** ./assets/styles/components/hero.scss ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025954079
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/share.scss":
/*!*********************************************!*\
  !*** ./assets/styles/components/share.scss ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025954138
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/videos.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/videos.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025954157
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfc2hhcmVkX0hlcm9fdHN4LXNyY19jb21wb25lbnRzX3NoYXJlZF9TRU9UYWdzX3RzeC45NWNhNTQ5NjQ2ZjU0ZTU1Y2NhYS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUMrQztBQUNMO0FBQ1I7QUFDaEI7QUFDUTtBQUNRO0FBQ047QUFDVjtBQUM1QyxJQUFNVSxJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBQUMsSUFBQSxFQUdzSTtFQUFBLElBSGhJQyxrQkFBa0IsR0FBQUQsSUFBQSxDQUFsQkMsa0JBQWtCO0lBQUVDLFdBQVcsR0FBQUYsSUFBQSxDQUFYRSxXQUFXO0lBQUFDLFlBQUEsR0FBQUgsSUFBQSxDQUFFSSxPQUFPO0lBQVBBLE9BQU8sR0FBQUQsWUFBQSxjQUFHLEVBQUUsR0FBQUEsWUFBQTtJQUFBRSxTQUFBLEdBQUFMLElBQUEsQ0FBRU0sSUFBSTtJQUFKQSxJQUFJLEdBQUFELFNBQUEsY0FBRyxFQUFFLEdBQUFBLFNBQUE7SUFBQUUsU0FBQSxHQUFBUCxJQUFBLENBQUVRLElBQUk7SUFBSkEsSUFBSSxHQUFBRCxTQUFBLGNBQUcsRUFBRSxHQUFBQSxTQUFBO0lBQUVFLFVBQVUsR0FBQVQsSUFBQSxDQUFWUyxVQUFVO0lBQUVDLGVBQWUsR0FBQVYsSUFBQSxDQUFmVSxlQUFlO0lBQUFDLE9BQUEsR0FBQVgsSUFBQSxDQUFFWSxFQUFFO0lBQUZBLEVBQUUsR0FBQUQsT0FBQSxjQUFHLE1BQU0sR0FBQUEsT0FBQTtJQUFBRSxjQUFBLEdBQUFiLElBQUEsQ0FBRWMsU0FBUztJQUFUQSxTQUFTLEdBQUFELGNBQUEsY0FBRztNQUN2SUUsS0FBSyxFQUFFLEtBQUs7TUFDWkMsR0FBRyxFQUFFO0lBQ1QsQ0FBQyxHQUFBSCxjQUFBO0lBQUFJLFVBQUEsR0FBQWpCLElBQUEsQ0FBRWtCLEtBQUs7SUFBTEEsS0FBSyxHQUFBRCxVQUFBLGNBQUcsQ0FBQyxDQUFDLEdBQUFB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Q0FBQyxHQUMvRixJQUFJLEVBQ1ZWLGVBQWUsR0FDWEEsZUFBZSxHQUNiLElBQUksRUFDVmdCLFFBQVEsR0FDSnJDLDBEQUFtQixDQUFDUyxzRUFBUSxFQUFFO0lBQUVrQyxLQUFLLEVBQUVBLEtBQUs7SUFBRWhCLEdBQUcsRUFBRUE7RUFBSSxDQUFDLENBQUMsR0FDdkQsSUFBSSxDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUNELCtEQUFlakIsSUFBSTs7Ozs7Ozs7Ozs7QUMxRW5CO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvc2hhcmVkL0hlcm8udHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9iYWNrZ3JvdW5kLXZpZGVvcy5zY3NzP2M4M2EiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2JyZWFkY3J1bWJzLnNjc3M/ZjM4ZiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvaGVyby5zY3NzP2VhOGMiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3NoYXJlLnNjc3M/OTY4ZSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvdmlkZW9zLnNjc3M/NTgyOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZG9CYWNrZ3JvdW5kSW1hZ2UsIGRvTGVuZ3RoLCBkb1BhcnNlIH0gZnJvbSAnc3JjL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IEJhY2tncm91bmRWaWRlbyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQmFja2dyb3VuZFZpZGVvJztcbmltcG9ydCBCcmVhZGNydW1icyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQnJlYWRjcnVtYnMnO1xuaW1wb3J0IENUQSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQ1RBJztcbmltcG9ydCBIZWFkaW5nIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9IZWFkaW5nJztcbmltcG9ydCBNZWRpYUxvYWRlciBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvTWVkaWFMb2FkZXInO1xuaW1wb3J0IFNoYXJlQmFyIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9TaGFyZUJhcic7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZXJvLnNjc3MnO1xuY29uc3QgSGVybyA9ICh7IGJhY2tncm91bmRTZXR0aW5ncywgYnJlYWRjcnVtYnMsIGNsYXNzZXMgPSBbXSwgY29weSA9ICcnLCBjdGFzID0gW10sIGN1c3RvbUhUTUwsIGN1c3RvbUhUTUxBZnRlciwgaWQgPSAnaGVybycsIGltYWdlTGluayA9IHtcbiAgICBtb2RhbDogZmFsc2UsXG4gICAgdXJsOiAnJyxcbn0sIG1lZGlhID0ge30sIG1lZGlhTG9vcCA9IGZhbHNlLCBwcmV0aXRsZSA9ICcnLCBwdWJsaXNoRGF0ZSA9ICcnLCBzaGFyZUJhciA9IGZhbHNlLCBzdWJ0aXRsZSA9ICcnLCB0ZXh0Q29sb3IgPSAnJywgdGl0bGUgPSAnJywgdXJsID0gJycsIH0pID0+IHtcbiAgICAvLyBBZGQgc29tZSBjbGFzc2VzXG4gICAgaWYgKHRleHRDb2xvci5sZW5ndGgpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCd0ZXh0LScgKyB0ZXh0Q29sb3IpO1xuICAgIH1cbiAgICBpZiAoZG9MZW5ndGgoYmFja2dyb3VuZFNldHRpbmdzKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ2hhcy1iYWNrZ3JvdW5kJyk7XG4gICAgfVxuICAgIGlmIChkb0xlbmd0aChjb3B5KSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ2hhcy1jb3B5Jyk7XG4gICAgfVxuICAgIGlmIChkb0xlbmd0aChtZWRpYSkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdoYXMtbWVkaWEnKTtcbiAgICB9XG4gICAgY29uc3QgaGVyb0JhY2tncm91bmQgPSBkb0JhY2tncm91bmRJbWFnZShiYWNrZ3JvdW5kU2V0dGluZ3MsIGNsYXNzZXMpO1xuICAgIGNvbnN0IGhlYWRpbmdTZXR0aW5ncyA9IHtcbiAgICAgICAgdGFnOiAnaDEnLFxuICAgICAgICBwcmV0aXRsZTogcHJldGl0bGUsXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgc3VidGl0bGU6IHN1YnRpdGxlLFxuICAgICAgICBwdWJsaXNoRGF0ZTogcHVibGlzaERhdGUsXG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIiwgeyBpZDogaWQsIC4uLmhlcm9CYWNrZ3JvdW5kIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQmFja2dyb3VuZFZpZGVvLCB7IC4uLmJhY2tncm91bmRTZXR0aW5ncywgaWQ6IFwiaGVyby1iYWNrZ3JvdW5kXCIgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaGVyby1jb250YWluZXIgY29udGFpbmVyXCIgfSxcbiAgICAgICAgICAgIGJyZWFkY3J1bWJzID9cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJyZWFkY3J1bWJzLCB7IHBvc3Q6IGJyZWFkY3J1bWJzIH0pXG4gICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJoZXJvLXRleHQtd3JhcHBlclwiIH0sXG4gICAgICAgICAgICAgICAgZG9MZW5ndGgodGl0bGUpID9cbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIZWFkaW5nLCB7IC4uLmhlYWRpbmdTZXR0aW5ncyB9KVxuICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgZG9MZW5ndGgoY29weSkgP1xuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBkb1BhcnNlKGNvcHkpKVxuICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgXCJTdGFydCBDVEFzXCIsXG4gICAgICAgICAgICAgICAgZG9MZW5ndGgoY3RhcykgP1xuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGlkOiBcImhlcm8tY3RhXCIgfSwgY3Rhcy5tYXAoKGN0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0YVNldHRpbmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogY3RhLnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjdGEudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbDogY3RhLm1vZGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsQ2xhc3M6IGN0YS5tb2RhbENsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IGN0YS5idXR0b25TdHlsZSA/IFsnYnV0dG9uJywgY3RhLmJ1dHRvblN0eWxlXSA6IFsnYnV0dG9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IGtleTogaW5kZXgsIC4uLmN0YVNldHRpbmdzIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIFwiRW5kIENUQXNcIixcbiAgICAgICAgICAgICAgICBjdXN0b21IVE1MID8gZG9QYXJzZShjdXN0b21IVE1MKSA6IG51bGwpLFxuICAgICAgICAgICAgZG9MZW5ndGgobWVkaWEpID9cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImhlcm8tbWVkaWEtd3JhcHBlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IHVybDogaW1hZ2VMaW5rLnVybCwgbW9kYWw6IGltYWdlTGluay5tb2RhbCwgY2xhc3NlczogW10gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVkaWFMb2FkZXIsIHsgbWVkaWE6IG1lZGlhLCBzaXplOiBcInNxdWFyZV82MDBcIiwgbG9vcDogbWVkaWFMb29wIH0pKSlcbiAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBjdXN0b21IVE1MQWZ0ZXIgP1xuICAgICAgICAgICAgICAgIGN1c3RvbUhUTUxBZnRlclxuICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIHNoYXJlQmFyID9cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNoYXJlQmFyLCB7IHRpdGxlOiB0aXRsZSwgdXJsOiB1cmwgfSlcbiAgICAgICAgICAgICAgICA6IG51bGwpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgSGVybztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjU5NTQxMzFcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNTk1NDEyOVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI1OTU0MDc5XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjU5NTQxMzhcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNTk1NDE1N1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiXSwibmFtZXMiOlsiUmVhY3QiLCJkb0JhY2tncm91bmRJbWFnZSIsImRvTGVuZ3RoIiwiZG9QYXJzZSIsIkJhY2tncm91bmRWaWRlbyIsIkJyZWFkY3J1bWJzIiwiQ1RBIiwiSGVhZGluZyIsIk1lZGlhTG9hZGVyIiwiU2hhcmVCYXIiLCJIZXJvIiwiX3JlZiIsImJhY2tncm91bmRTZXR0aW5ncyIsImJyZWFkY3J1bWJzIiwiX3JlZiRjbGFzc2VzIiwiY2xhc3NlcyIsIl9yZWYkY29weSIsImNvcHkiLCJfcmVmJGN0YXMiLCJjdGFzIiwiY3VzdG9tSFRNTCIsImN1c3RvbUhUTUxBZnRlciIsIl9yZWYkaWQiLCJpZCIsIl9yZWYkaW1hZ2VMaW5rIiwiaW1hZ2VMaW5rIiwibW9kYWwiLCJ1cmwiLCJfcmVmJG1lZGlhIiwibWVkaWEiLCJfcmVmJG1lZGlhTG9vcCIsIm1lZGlhTG9vcCIsIl9yZWYkcHJldGl0bGUiLCJwcmV0aXRsZSIsIl9yZWYkcHVibGlzaERhdGUiLCJwdWJsaXNoRGF0ZSIsIl9yZWYkc2hhcmVCYXIiLCJzaGFyZUJhciIsIl9yZWYkc3VidGl0bGUiLCJzdWJ0aXRsZSIsIl9yZWYkdGV4dENvbG9yIiwidGV4dENvbG9yIiwiX3JlZiR0aXRsZSIsInRpdGxlIiwiX3JlZiR1cmwiLCJsZW5ndGgiLCJwdXNoIiwiaGVyb0JhY2tncm91bmQiLCJoZWFkaW5nU2V0dGluZ3MiLCJ0YWciLCJjcmVhdGVFbGVtZW50IiwiX29iamVjdFNwcmVhZCIsImNsYXNzTmFtZSIsInBvc3QiLCJGcmFnbWVudCIsIm1hcCIsImN0YSIsImluZGV4IiwiY3RhU2V0dGluZ3MiLCJ0ZXh0IiwibW9kYWxDbGFzcyIsImJ1dHRvblN0eWxlIiwia2V5Iiwic2l6ZSIsImxvb3AiXSwic291cmNlUm9vdCI6IiJ9