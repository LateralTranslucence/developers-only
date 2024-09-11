"use strict";
self["webpackHotUpdatedevelopers_only"]("src_components_templates_single_DoBlog_tsx",{

/***/ "./src/components/templates/single/DoBlog.tsx":
/*!****************************************************!*\
  !*** ./src/components/templates/single/DoBlog.tsx ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_Hero__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/Hero */ "./src/components/shared/Hero.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");
/* harmony import */ var src_components_layout_PanelWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/layout/PanelWrapper */ "./src/components/layout/PanelWrapper.tsx");
/* harmony import */ var src_components_shared_PostDetails__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/components/shared/PostDetails */ "./src/components/shared/PostDetails.tsx");
/* harmony import */ var src_components_shared_RecentPosts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/components/shared/RecentPosts */ "./src/components/shared/RecentPosts.tsx");
/* harmony import */ var src_components_shared_SEOTags__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/components/shared/SEOTags */ "./src/components/shared/SEOTags.tsx");
/* harmony import */ var src_components_shared_StructuredData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/components/shared/StructuredData */ "./src/components/shared/StructuredData.tsx");
/* harmony import */ var assets_styles_pages_single_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! assets/styles/pages/single.scss */ "./assets/styles/pages/single.scss");
/* harmony import */ var assets_styles_components_blocks_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! assets/styles/components/blocks.scss */ "./assets/styles/components/blocks.scss");
/* harmony import */ var assets_styles_components_posts_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! assets/styles/components/posts.scss */ "./assets/styles/components/posts.scss");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

var useEffect = wp.element.useEffect;

// import CustomCTA from 'src/components/shared/CustomCTA';










var DoBlog = function DoBlog(_ref) {
  var post = _ref.post,
    _ref$iframe = _ref.iframe,
    iframe = _ref$iframe === void 0 ? false : _ref$iframe,
    _ref$layoutClasses = _ref.layoutClasses,
    layoutClasses = _ref$layoutClasses === void 0 ? function () {} : _ref$layoutClasses;
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(post)) {
    console.log(post);
    var heroSettings = {
      pretitle: post.post_type_details.post_type_display_name,
      title: post.fields.blog_title,
      breadcrumbs: post,
      publishDate: post.post_date.formatted,
      customHTML: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_PostDetails__WEBPACK_IMPORTED_MODULE_6__["default"], {
        author: post.fields.blog_author,
        description: post.fields.blog_description
      }),
      url: homeURL + '/' + post.post_type_details.post_type_slug + '/' + post.post_name,
      shareBar: true
    };
    useEffect(function () {
      // Set classes for <main>
      layoutClasses(['single-content-item', 'single-' + post.post_type_details.post_type]);
    }, []);
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_SEOTags__WEBPACK_IMPORTED_MODULE_8__["default"], {
      post: post
    }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_StructuredData__WEBPACK_IMPORTED_MODULE_9__["default"], {
      post: post
    }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Hero__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread({}, heroSettings)), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("article", {
      id: "content-wrapper",
      className: "container one-column"
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("section", {
      id: "main-content"
    }, post.fields.blog_image ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__["default"], {
      image: post.fields.blog_image,
      size: "cinema_1000",
      id: "post-image"
    }), post.fields.blog_image_credit && react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
      className: "post-image-credit"
    }, post.fields.blog_image_credit)) : null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      id: "post-content"
    }, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doParse)(post.fields.blog_content)))), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_layout_PanelWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
      panelID: "recent-posts-panel",
      panelType: "archive",
      classes: ['panel', 'panel-type-archive'],
      heading: {
        tag: 'h2',
        title: 'Recent Blogs'
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_RecentPosts__WEBPACK_IMPORTED_MODULE_7__["default"], {
      postType: post.post_type_details.post_type,
      postID: post.ID
    })));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (DoBlog);

/***/ }),

/***/ "./assets/styles/components/blocks.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/blocks.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025158761
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/panels.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/panels.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025158879
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/posts.scss":
/*!*********************************************!*\
  !*** ./assets/styles/components/posts.scss ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025158758
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/components/slider.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/slider.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025158931
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./assets/styles/pages/single.scss":
/*!*****************************************!*\
  !*** ./assets/styles/pages/single.scss ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726025158762
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX3NpbmdsZV9Eb0Jsb2dfdHN4LmJmMmQ5NjU5YWE3NzhjYjBkYjlmLmhvdC11cGRhdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQzFCLElBQVFDLFNBQVMsR0FBS0MsRUFBRSxDQUFDQyxPQUFPLENBQXhCRixTQUFTO0FBQ3FDO0FBQ3REO0FBQzhDO0FBQ0U7QUFDYztBQUNGO0FBQ0E7QUFDUjtBQUNjO0FBQ3pCO0FBQ0s7QUFDRDtBQUM3QyxJQUFNWSxNQUFNLEdBQUcsU0FBVEEsTUFBTUEsQ0FBQUMsSUFBQSxFQUE0RDtFQUFBLElBQXREQyxJQUFJLEdBQUFELElBQUEsQ0FBSkMsSUFBSTtJQUFBQyxXQUFBLEdBQUFGLElBQUEsQ0FBRUcsTUFBTTtJQUFOQSxNQUFNLEdBQUFELFdBQUEsY0FBRyxLQUFLLEdBQUFBLFdBQUE7SUFBQUUsa0JBQUEsR0FBQUosSUFBQSxDQUFFSyxhQUFhO0lBQWJBLGFBQWEsR0FBQUQsa0JBQUEsY0FBRyxZQUFNLENBQUUsQ0FBQyxHQUFBQSxrQkFBQTtFQUM3RCxJQUFJZCwyREFBUSxDQUFDVyxJQUFJLENBQUMsRUFBRTtJQUNoQkssT0FBTyxDQUFDQyxHQUFHLENBQUNOLElBQUksQ0FBQztJQUNqQixJQUFNTyxZQUFZLEdBQUc7TUFDakJDLFFBQVEsRUFBRVIsSUFBSSxDQUFDUyxpQkFBaUIsQ0FBQ0Msc0JBQXNCO01BQ3ZEQyxLQUFLLEVBQUVYLElBQUksQ0FBQ1ksTUFBTSxDQUFDQyxVQUFVO01BQzdCQyxXQUFXLEVBQUVkLElBQUk7TUFDakJlLFdBQVcsRUFBRWYsSUFBSSxDQUFDZ0IsU0FBUyxDQUFDQyxTQUFTO01BQ3JDQyxVQUFVLEVBQUVqQywwREFBbUIsQ0FBQ1MseUVBQVcsRUFBRTtRQUFFMEIsTUFBTSxFQUFFcEIsSUFBSSxDQUFDWSxNQUFNLENBQUNTLFdBQVc7UUFBRUMsV0FBVyxFQUFFdEIsSUFBSSxDQUFDWSxNQUFN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O0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9CbG9nLnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvYmxvY2tzLnNjc3M/YTNhNiIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvcGFuZWxzLnNjc3M/ZTRmMSIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvcG9zdHMuc2Nzcz85ZWZjIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zbGlkZXIuc2Nzcz9jZGUzIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvcGFnZXMvc2luZ2xlLnNjc3M/OWE1OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgeyB1c2VFZmZlY3QgfSA9IHdwLmVsZW1lbnQ7XG5pbXBvcnQgeyBkb0xlbmd0aCwgZG9QYXJzZSB9IGZyb20gJ3NyYy91dGlscy9oZWxwZXJzJztcbi8vIGltcG9ydCBDdXN0b21DVEEgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0N1c3RvbUNUQSc7XG5pbXBvcnQgSGVybyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSGVybyc7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0ltYWdlJztcbmltcG9ydCBQYW5lbFdyYXBwZXIgZnJvbSAnc3JjL2NvbXBvbmVudHMvbGF5b3V0L1BhbmVsV3JhcHBlcic7XG5pbXBvcnQgUG9zdERldGFpbHMgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL1Bvc3REZXRhaWxzJztcbmltcG9ydCBSZWNlbnRQb3N0cyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvUmVjZW50UG9zdHMnO1xuaW1wb3J0IFNFT1RhZ3MgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL1NFT1RhZ3MnO1xuaW1wb3J0IFN0cnVjdHVyZWREYXRhIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9TdHJ1Y3R1cmVkRGF0YSc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvcGFnZXMvc2luZ2xlLnNjc3MnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvYmxvY2tzLnNjc3MnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvcG9zdHMuc2Nzcyc7XG5jb25zdCBEb0Jsb2cgPSAoeyBwb3N0LCBpZnJhbWUgPSBmYWxzZSwgbGF5b3V0Q2xhc3NlcyA9ICgpID0+IHsgfSB9KSA9PiB7XG4gICAgaWYgKGRvTGVuZ3RoKHBvc3QpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBvc3QpO1xuICAgICAgICBjb25zdCBoZXJvU2V0dGluZ3MgPSB7XG4gICAgICAgICAgICBwcmV0aXRsZTogcG9zdC5wb3N0X3R5cGVfZGV0YWlscy5wb3N0X3R5cGVfZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgdGl0bGU6IHBvc3QuZmllbGRzLmJsb2dfdGl0bGUsXG4gICAgICAgICAgICBicmVhZGNydW1iczogcG9zdCxcbiAgICAgICAgICAgIHB1Ymxpc2hEYXRlOiBwb3N0LnBvc3RfZGF0ZS5mb3JtYXR0ZWQsXG4gICAgICAgICAgICBjdXN0b21IVE1MOiBSZWFjdC5jcmVhdGVFbGVtZW50KFBvc3REZXRhaWxzLCB7IGF1dGhvcjogcG9zdC5maWVsZHMuYmxvZ19hdXRob3IsIGRlc2NyaXB0aW9uOiBwb3N0LmZpZWxkcy5ibG9nX2Rlc2NyaXB0aW9uIH0pLFxuICAgICAgICAgICAgdXJsOiBob21lVVJMICsgJy8nICsgcG9zdC5wb3N0X3R5cGVfZGV0YWlscy5wb3N0X3R5cGVfc2x1ZyArICcvJyArIHBvc3QucG9zdF9uYW1lLFxuICAgICAgICAgICAgc2hhcmVCYXI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBTZXQgY2xhc3NlcyBmb3IgPG1haW4+XG4gICAgICAgICAgICBsYXlvdXRDbGFzc2VzKFsnc2luZ2xlLWNvbnRlbnQtaXRlbScsICdzaW5nbGUtJyArIHBvc3QucG9zdF90eXBlX2RldGFpbHMucG9zdF90eXBlXSk7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTRU9UYWdzLCB7IHBvc3Q6IHBvc3QgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFN0cnVjdHVyZWREYXRhLCB7IHBvc3Q6IHBvc3QgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlcm8sIHsgLi4uaGVyb1NldHRpbmdzIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFydGljbGVcIiwgeyBpZDogXCJjb250ZW50LXdyYXBwZXJcIiwgY2xhc3NOYW1lOiBcImNvbnRhaW5lciBvbmUtY29sdW1uXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCB7IGlkOiBcIm1haW4tY29udGVudFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHBvc3QuZmllbGRzLmJsb2dfaW1hZ2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEltYWdlLCB7IGltYWdlOiBwb3N0LmZpZWxkcy5ibG9nX2ltYWdlLCBzaXplOiBcImNpbmVtYV8xMDAwXCIsIGlkOiBcInBvc3QtaW1hZ2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0LmZpZWxkcy5ibG9nX2ltYWdlX2NyZWRpdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJwb3N0LWltYWdlLWNyZWRpdFwiIH0sIHBvc3QuZmllbGRzLmJsb2dfaW1hZ2VfY3JlZGl0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcInBvc3QtY29udGVudFwiIH0sIGRvUGFyc2UocG9zdC5maWVsZHMuYmxvZ19jb250ZW50KSkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGFuZWxXcmFwcGVyLCB7IHBhbmVsSUQ6IFwicmVjZW50LXBvc3RzLXBhbmVsXCIsIHBhbmVsVHlwZTogXCJhcmNoaXZlXCIsIGNsYXNzZXM6IFsncGFuZWwnLCAncGFuZWwtdHlwZS1hcmNoaXZlJ10sIGhlYWRpbmc6IHsgdGFnOiAnaDInLCB0aXRsZTogJ1JlY2VudCBCbG9ncycgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVjZW50UG9zdHMsIHsgcG9zdFR5cGU6IHBvc3QucG9zdF90eXBlX2RldGFpbHMucG9zdF90eXBlLCBwb3N0SUQ6IHBvc3QuSUQgfSkpKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgRG9CbG9nO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNTE1ODc2MVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI1MTU4ODc5XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjUxNTg3NThcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNTE1ODkzMVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI1MTU4NzYyXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsIndwIiwiZWxlbWVudCIsImRvTGVuZ3RoIiwiZG9QYXJzZSIsIkhlcm8iLCJJbWFnZSIsIlBhbmVsV3JhcHBlciIsIlBvc3REZXRhaWxzIiwiUmVjZW50UG9zdHMiLCJTRU9UYWdzIiwiU3RydWN0dXJlZERhdGEiLCJEb0Jsb2ciLCJfcmVmIiwicG9zdCIsIl9yZWYkaWZyYW1lIiwiaWZyYW1lIiwiX3JlZiRsYXlvdXRDbGFzc2VzIiwibGF5b3V0Q2xhc3NlcyIsImNvbnNvbGUiLCJsb2ciLCJoZXJvU2V0dGluZ3MiLCJwcmV0aXRsZSIsInBvc3RfdHlwZV9kZXRhaWxzIiwicG9zdF90eXBlX2Rpc3BsYXlfbmFtZSIsInRpdGxlIiwiZmllbGRzIiwiYmxvZ190aXRsZSIsImJyZWFkY3J1bWJzIiwicHVibGlzaERhdGUiLCJwb3N0X2RhdGUiLCJmb3JtYXR0ZWQiLCJjdXN0b21IVE1MIiwiY3JlYXRlRWxlbWVudCIsImF1dGhvciIsImJsb2dfYXV0aG9yIiwiZGVzY3JpcHRpb24iLCJibG9nX2Rlc2NyaXB0aW9uIiwidXJsIiwiaG9tZVVSTCIsInBvc3RfdHlwZV9zbHVnIiwicG9zdF9uYW1lIiwic2hhcmVCYXIiLCJwb3N0X3R5cGUiLCJGcmFnbWVudCIsIl9vYmplY3RTcHJlYWQiLCJpZCIsImNsYXNzTmFtZSIsImJsb2dfaW1hZ2UiLCJpbWFnZSIsInNpemUiLCJibG9nX2ltYWdlX2NyZWRpdCIsImJsb2dfY29udGVudCIsInBhbmVsSUQiLCJwYW5lbFR5cGUiLCJjbGFzc2VzIiwiaGVhZGluZyIsInRhZyIsInBvc3RUeXBlIiwicG9zdElEIiwiSUQiXSwic291cmNlUm9vdCI6IiJ9