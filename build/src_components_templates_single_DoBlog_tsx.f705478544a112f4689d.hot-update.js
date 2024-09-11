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
      // 1726025417720
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
      // 1726025417753
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
      // 1726025417723
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
      // 1726025417780
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
      // 1726025417724
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX3NpbmdsZV9Eb0Jsb2dfdHN4LmY3MDU0Nzg1NDRhMTEyZjQ2ODlkLmhvdC11cGRhdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQzFCLElBQVFDLFNBQVMsR0FBS0MsRUFBRSxDQUFDQyxPQUFPLENBQXhCRixTQUFTO0FBQ3FDO0FBQ3REO0FBQzhDO0FBQ0U7QUFDYztBQUNGO0FBQ0E7QUFDUjtBQUNjO0FBQ3pCO0FBQ0s7QUFDRDtBQUM3QyxJQUFNWSxNQUFNLEdBQUcsU0FBVEEsTUFBTUEsQ0FBQUMsSUFBQSxFQUE0RDtFQUFBLElBQXREQyxJQUFJLEdBQUFELElBQUEsQ0FBSkMsSUFBSTtJQUFBQyxXQUFBLEdBQUFGLElBQUEsQ0FBRUcsTUFBTTtJQUFOQSxNQUFNLEdBQUFELFdBQUEsY0FBRyxLQUFLLEdBQUFBLFdBQUE7SUFBQUUsa0JBQUEsR0FBQUosSUFBQSxDQUFFSyxhQUFhO0lBQWJBLGFBQWEsR0FBQUQsa0JBQUEsY0FBRyxZQUFNLENBQUUsQ0FBQyxHQUFBQSxrQkFBQTtFQUM3RCxJQUFJZCwyREFBUSxDQUFDVyxJQUFJLENBQUMsRUFBRTtJQUNoQixJQUFNSyxZQUFZLEdBQUc7TUFDakJDLFFBQVEsRUFBRU4sSUFBSSxDQUFDTyxpQkFBaUIsQ0FBQ0Msc0JBQXNCO01BQ3ZEQyxLQUFLLEVBQUVULElBQUksQ0FBQ1UsTUFBTSxDQUFDQyxVQUFVO01BQzdCQyxXQUFXLEVBQUVaLElBQUk7TUFDakJhLFdBQVcsRUFBRWIsSUFBSSxDQUFDYyxTQUFTLENBQUNDLFNBQVM7TUFDckNDLFVBQVUsRUFBRS9CLDBEQUFtQixDQUFDUyx5RUFBVyxFQUFFO1FBQUV3QixNQUFNLEVBQUVsQixJQUFJLENBQUNVLE1BQU0sQ0FBQ1MsV0FBVztRQUFFQyxXQUFXLEVBQUVwQixJQUFJLENBQUNVLE1BQU0sQ0FBQ1c7TUFBaUIsQ0FBQyxDQUFDO01BQzVIQyxHQUFHLEVBQUVD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Q0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbmdsZS9Eb0Jsb2cudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9ibG9ja3Muc2Nzcz9hM2E2Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9wYW5lbHMuc2Nzcz9lNGYxIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9wb3N0cy5zY3NzPzllZmMiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3NsaWRlci5zY3NzP2NkZTMiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9wYWdlcy9zaW5nbGUuc2Nzcz85YTU4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5jb25zdCB7IHVzZUVmZmVjdCB9ID0gd3AuZWxlbWVudDtcbmltcG9ydCB7IGRvTGVuZ3RoLCBkb1BhcnNlIH0gZnJvbSAnc3JjL3V0aWxzL2hlbHBlcnMnO1xuLy8gaW1wb3J0IEN1c3RvbUNUQSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQ3VzdG9tQ1RBJztcbmltcG9ydCBIZXJvIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9IZXJvJztcbmltcG9ydCBJbWFnZSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSW1hZ2UnO1xuaW1wb3J0IFBhbmVsV3JhcHBlciBmcm9tICdzcmMvY29tcG9uZW50cy9sYXlvdXQvUGFuZWxXcmFwcGVyJztcbmltcG9ydCBQb3N0RGV0YWlscyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvUG9zdERldGFpbHMnO1xuaW1wb3J0IFJlY2VudFBvc3RzIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9SZWNlbnRQb3N0cyc7XG5pbXBvcnQgU0VPVGFncyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvU0VPVGFncyc7XG5pbXBvcnQgU3RydWN0dXJlZERhdGEgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL1N0cnVjdHVyZWREYXRhJztcbmltcG9ydCAnYXNzZXRzL3N0eWxlcy9wYWdlcy9zaW5nbGUuc2Nzcyc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9ibG9ja3Muc2Nzcyc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9wb3N0cy5zY3NzJztcbmNvbnN0IERvQmxvZyA9ICh7IHBvc3QsIGlmcmFtZSA9IGZhbHNlLCBsYXlvdXRDbGFzc2VzID0gKCkgPT4geyB9IH0pID0+IHtcbiAgICBpZiAoZG9MZW5ndGgocG9zdCkpIHtcbiAgICAgICAgY29uc3QgaGVyb1NldHRpbmdzID0ge1xuICAgICAgICAgICAgcHJldGl0bGU6IHBvc3QucG9zdF90eXBlX2RldGFpbHMucG9zdF90eXBlX2Rpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgIHRpdGxlOiBwb3N0LmZpZWxkcy5ibG9nX3RpdGxlLFxuICAgICAgICAgICAgYnJlYWRjcnVtYnM6IHBvc3QsXG4gICAgICAgICAgICBwdWJsaXNoRGF0ZTogcG9zdC5wb3N0X2RhdGUuZm9ybWF0dGVkLFxuICAgICAgICAgICAgY3VzdG9tSFRNTDogUmVhY3QuY3JlYXRlRWxlbWVudChQb3N0RGV0YWlscywgeyBhdXRob3I6IHBvc3QuZmllbGRzLmJsb2dfYXV0aG9yLCBkZXNjcmlwdGlvbjogcG9zdC5maWVsZHMuYmxvZ19kZXNjcmlwdGlvbiB9KSxcbiAgICAgICAgICAgIHVybDogaG9tZVVSTCArICcvJyArIHBvc3QucG9zdF90eXBlX2RldGFpbHMucG9zdF90eXBlX3NsdWcgKyAnLycgKyBwb3N0LnBvc3RfbmFtZSxcbiAgICAgICAgICAgIHNoYXJlQmFyOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICAgICAgLy8gU2V0IGNsYXNzZXMgZm9yIDxtYWluPlxuICAgICAgICAgICAgbGF5b3V0Q2xhc3NlcyhbJ3NpbmdsZS1jb250ZW50LWl0ZW0nLCAnc2luZ2xlLScgKyBwb3N0LnBvc3RfdHlwZV9kZXRhaWxzLnBvc3RfdHlwZV0pO1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU0VPVGFncywgeyBwb3N0OiBwb3N0IH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTdHJ1Y3R1cmVkRGF0YSwgeyBwb3N0OiBwb3N0IH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIZXJvLCB7IC4uLmhlcm9TZXR0aW5ncyB9KSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIsIHsgaWQ6IFwiY29udGVudC13cmFwcGVyXCIsIGNsYXNzTmFtZTogXCJjb250YWluZXIgb25lLWNvbHVtblwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwgeyBpZDogXCJtYWluLWNvbnRlbnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBwb3N0LmZpZWxkcy5ibG9nX2ltYWdlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbWFnZSwgeyBpbWFnZTogcG9zdC5maWVsZHMuYmxvZ19pbWFnZSwgc2l6ZTogXCJjaW5lbWFfMTAwMFwiLCBpZDogXCJwb3N0LWltYWdlXCIgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdC5maWVsZHMuYmxvZ19pbWFnZV9jcmVkaXQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwicG9zdC1pbWFnZS1jcmVkaXRcIiB9LCBwb3N0LmZpZWxkcy5ibG9nX2ltYWdlX2NyZWRpdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJwb3N0LWNvbnRlbnRcIiB9LCBkb1BhcnNlKHBvc3QuZmllbGRzLmJsb2dfY29udGVudCkpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFBhbmVsV3JhcHBlciwgeyBwYW5lbElEOiBcInJlY2VudC1wb3N0cy1wYW5lbFwiLCBwYW5lbFR5cGU6IFwiYXJjaGl2ZVwiLCBjbGFzc2VzOiBbJ3BhbmVsJywgJ3BhbmVsLXR5cGUtYXJjaGl2ZSddLCBoZWFkaW5nOiB7IHRhZzogJ2gyJywgdGl0bGU6ICdSZWNlbnQgQmxvZ3MnIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlY2VudFBvc3RzLCB7IHBvc3RUeXBlOiBwb3N0LnBvc3RfdHlwZV9kZXRhaWxzLnBvc3RfdHlwZSwgcG9zdElEOiBwb3N0LklEIH0pKSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IERvQmxvZztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjU0MTc3MjBcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNTQxNzc1M1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI1NDE3NzIzXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjU0MTc3ODBcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNTQxNzcyNFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ3cCIsImVsZW1lbnQiLCJkb0xlbmd0aCIsImRvUGFyc2UiLCJIZXJvIiwiSW1hZ2UiLCJQYW5lbFdyYXBwZXIiLCJQb3N0RGV0YWlscyIsIlJlY2VudFBvc3RzIiwiU0VPVGFncyIsIlN0cnVjdHVyZWREYXRhIiwiRG9CbG9nIiwiX3JlZiIsInBvc3QiLCJfcmVmJGlmcmFtZSIsImlmcmFtZSIsIl9yZWYkbGF5b3V0Q2xhc3NlcyIsImxheW91dENsYXNzZXMiLCJoZXJvU2V0dGluZ3MiLCJwcmV0aXRsZSIsInBvc3RfdHlwZV9kZXRhaWxzIiwicG9zdF90eXBlX2Rpc3BsYXlfbmFtZSIsInRpdGxlIiwiZmllbGRzIiwiYmxvZ190aXRsZSIsImJyZWFkY3J1bWJzIiwicHVibGlzaERhdGUiLCJwb3N0X2RhdGUiLCJmb3JtYXR0ZWQiLCJjdXN0b21IVE1MIiwiY3JlYXRlRWxlbWVudCIsImF1dGhvciIsImJsb2dfYXV0aG9yIiwiZGVzY3JpcHRpb24iLCJibG9nX2Rlc2NyaXB0aW9uIiwidXJsIiwiaG9tZVVSTCIsInBvc3RfdHlwZV9zbHVnIiwicG9zdF9uYW1lIiwic2hhcmVCYXIiLCJwb3N0X3R5cGUiLCJGcmFnbWVudCIsIl9vYmplY3RTcHJlYWQiLCJpZCIsImNsYXNzTmFtZSIsImJsb2dfaW1hZ2UiLCJpbWFnZSIsInNpemUiLCJibG9nX2ltYWdlX2NyZWRpdCIsImJsb2dfY29udGVudCIsInBhbmVsSUQiLCJwYW5lbFR5cGUiLCJjbGFzc2VzIiwiaGVhZGluZyIsInRhZyIsInBvc3RUeXBlIiwicG9zdElEIiwiSUQiXSwic291cmNlUm9vdCI6IiJ9