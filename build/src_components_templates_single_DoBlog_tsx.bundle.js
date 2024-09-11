"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_single_DoBlog_tsx"],{

/***/ "./src/components/layout/PanelWrapper.tsx":
/*!************************************************!*\
  !*** ./src/components/layout/PanelWrapper.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_BackgroundVideo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/BackgroundVideo */ "./src/components/shared/BackgroundVideo.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var assets_styles_components_panels_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! assets/styles/components/panels.scss */ "./assets/styles/components/panels.scss");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }





var PanelWrapper = function PanelWrapper(_ref) {
  var background = _ref.background,
    backgroundVideo = _ref.backgroundVideo,
    _ref$classes = _ref.classes,
    classes = _ref$classes === void 0 ? [] : _ref$classes,
    children = _ref.children,
    _ref$copy = _ref.copy,
    copy = _ref$copy === void 0 ? '' : _ref$copy,
    _ref$copyParallax = _ref.copyParallax,
    copyParallax = _ref$copyParallax === void 0 ? {} : _ref$copyParallax,
    cta = _ref.cta,
    featuredSettings = _ref.featuredSettings,
    _ref$heading = _ref.heading,
    heading = _ref$heading === void 0 ? {} : _ref$heading,
    _ref$headerParallax = _ref.headerParallax,
    headerParallax = _ref$headerParallax === void 0 ? {} : _ref$headerParallax,
    _ref$panelID = _ref.panelID,
    panelID = _ref$panelID === void 0 ? '' : _ref$panelID,
    _ref$panelType = _ref.panelType,
    panelType = _ref$panelType === void 0 ? '' : _ref$panelType;
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("section", {
    id: panelID,
    className: (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(classes) ? classes.join(' ') : ''
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", _objectSpread({
    className: 'panel-inner-wrapper' + (panelType == 'linear-content' ? '' : ' container')
  }, featuredSettings), heading && (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(heading.title) || (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(backgroundVideo) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement("header", _objectSpread({
    className: 'panel-header' + ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(cta) ? ' has-cta' : '')
  }, headerParallax), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_BackgroundVideo__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread(_objectSpread({}, backgroundVideo), {}, {
    id: panelID + '-video'
  })), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], _objectSpread({}, heading))) : null, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(copy) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", _objectSpread({
    className: "panel-copy-wrapper"
  }, copyParallax), copy) : null, children));
};
/* harmony default export */ __webpack_exports__["default"] = (PanelWrapper);

/***/ }),

/***/ "./src/components/shared/PostDetails.tsx":
/*!***********************************************!*\
  !*** ./src/components/shared/PostDetails.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");


// Post Details Display Component
var PostDetails = function PostDetails(_ref) {
  var author = _ref.author,
    podcastSeries = _ref.podcastSeries,
    description = _ref.description;
  console.log('here');
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: "post-details"
  }, author ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "author"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "By "), author) : null, podcastSeries ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "podcast-series"
  }, podcastSeries) : null, description ? (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.doParse)(description) : null);
};
/* harmony default export */ __webpack_exports__["default"] = (PostDetails);

/***/ }),

/***/ "./src/components/shared/RecentPosts.tsx":
/*!***********************************************!*\
  !*** ./src/components/shared/RecentPosts.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_utils_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/utils/api */ "./src/utils/api/index.ts");
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_SliderNav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/components/shared/SliderNav */ "./src/components/shared/SliderNav.tsx");
/* harmony import */ var src_loaders_PartialTemplateLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/loaders/PartialTemplateLoader */ "./src/loaders/PartialTemplateLoader.tsx");
/* harmony import */ var assets_styles_components_posts_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! assets/styles/components/posts.scss */ "./assets/styles/components/posts.scss");
/* harmony import */ var assets_styles_components_blocks_scss__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! assets/styles/components/blocks.scss */ "./assets/styles/components/blocks.scss");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


var _wp$element = wp.element,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;







var RecentPosts = function RecentPosts(_ref) {
  var _ref$count = _ref.count,
    count = _ref$count === void 0 ? 10 : _ref$count,
    postID = _ref.postID,
    _ref$postType = _ref.postType,
    postType = _ref$postType === void 0 ? '' : _ref$postType,
    _ref$slider = _ref.slider,
    slider = _ref$slider === void 0 ? true : _ref$slider,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'block' : _ref$type;
  var postsArgs = {
    post_type: postType,
    posts_per_page: count,
    orderby: 'date_desc',
    post__not_in: postID ? [postID] : [],
    nopaging: true
  };
  var _useState = useState([]),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
    recentPosts = _useState2[0],
    setRecentPosts = _useState2[1];
  useEffect(function () {
    function fetchData() {
      return _fetchData.apply(this, arguments);
    }
    function _fetchData() {
      _fetchData = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0,src_utils_api__WEBPACK_IMPORTED_MODULE_5__.doGetArchivePosts)(postsArgs).then(function (data) {
                setRecentPosts(data.json);
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
  }, []);
  function Posts() {
    return react__WEBPACK_IMPORTED_MODULE_4___default().createElement("ul", {
      id: "recent-posts",
      className: 'blocks ' + postType + ' ' + (type === 'block' ? 'post three' : type) + ' ' + (slider ? 'uk-slider-items' : '')
    }, recentPosts.map(function (post, index) {
      if (type == 'text') {
        // CTA settings
        var ctaSettings = {
          url: post.permalink,
          title: post.post_title,
          classes: ['block-link']
        };
        return react__WEBPACK_IMPORTED_MODULE_4___default().createElement("li", {
          key: index
        }, react__WEBPACK_IMPORTED_MODULE_4___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_7__["default"], _objectSpread({}, ctaSettings), (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.doParse)(post.post_title)));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_4___default().createElement(src_loaders_PartialTemplateLoader__WEBPACK_IMPORTED_MODULE_9__["default"], {
          key: index,
          index: index,
          type: type,
          post: post,
          perRow: 3,
          panelSlider: slider
        });
      }
    }));
  }
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.doLength)(recentPosts)) {
    return react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), null, slider ? react__WEBPACK_IMPORTED_MODULE_4___default().createElement("div", {
      className: "panel-slider-wrapper",
      "uk-slider": "finite: true"
    }, react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Posts, null), react__WEBPACK_IMPORTED_MODULE_4___default().createElement(src_components_shared_SliderNav__WEBPACK_IMPORTED_MODULE_8__["default"], {
      dotNav: false,
      length: (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_6__.doLength)(recentPosts)
    })) : react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Posts, null));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (RecentPosts);

/***/ }),

/***/ "./src/components/shared/SliderNav.tsx":
/*!*********************************************!*\
  !*** ./src/components/shared/SliderNav.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assets_styles_components_slider_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! assets/styles/components/slider.scss */ "./assets/styles/components/slider.scss");


var SliderNav = function SliderNav(_ref) {
  var _ref$dotNav = _ref.dotNav,
    dotNav = _ref$dotNav === void 0 ? false : _ref$dotNav,
    _ref$length = _ref.length,
    length = _ref$length === void 0 ? 0 : _ref$length;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "slider-buttons btn-previous",
    href: "#",
    "uk-slidenav-previous": "",
    "uk-slider-item": "previous"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "screen-reader-text"
  }, "Previous")), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "slider-buttons btn-next",
    href: "#",
    "uk-slidenav-next": "",
    "uk-slider-item": "next"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "screen-reader-text"
  }, "Next")), dotNav === true ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "uk-slider-nav uk-dotnav uk-flex-center uk-margin"
  }, function () {
    var dots = [];
    for (var i = 0; i < length; i++) {
      dots.push(react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
        key: i,
        "uk-slider-item": i,
        className: i === 0 ? 'uk-active' : ''
      }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
        className: "screen-reader-text"
      }, i + 1))));
    }
    return dots;
  }()) : null);
};
/* harmony default export */ __webpack_exports__["default"] = (SliderNav);

/***/ }),

/***/ "./src/components/shared/StructuredData.tsx":
/*!**************************************************!*\
  !*** ./src/components/shared/StructuredData.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");



var StructuredData = function StructuredData(_ref) {
  var post = _ref.post;
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(post) && post.schema) {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__.Helmet, null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
      type: "application/ld+json"
    }, JSON.stringify(post.schema)));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (StructuredData);

/***/ }),

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

/***/ "./src/loaders/PartialTemplateLoader.tsx":
/*!***********************************************!*\
  !*** ./src/loaders/PartialTemplateLoader.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

// Block
var DefaultBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_block_DefaultBlock_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/block/DefaultBlock */ "./src/components/templates/block/DefaultBlock.tsx"));
});
var DoCompanyBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_block_DOCompanyBlock_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/block/DOCompanyBlock */ "./src/components/templates/block/DOCompanyBlock.tsx"));
});
var DoEventBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_block_DOEventBlock_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/block/DOEventBlock */ "./src/components/templates/block/DOEventBlock.tsx"));
});
var DoStaffBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_block_DOStaffBlock_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/block/DOStaffBlock */ "./src/components/templates/block/DOStaffBlock.tsx"));
});
var DoMediaCoverageBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_block_DOMediaCoverageBlock_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/block/DOMediaCoverageBlock */ "./src/components/templates/block/DOMediaCoverageBlock.tsx"));
});
var DoPodcastBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_block_DOPodcastBlock_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/block/DOPodcastBlock */ "./src/components/templates/block/DOPodcastBlock.tsx"));
});
var DoPressReleaseBlock = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_block_DOPressReleaseBlock_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/block/DOPressReleaseBlock */ "./src/components/templates/block/DOPressReleaseBlock.tsx"));
});
// List
var DefaultList = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_list_DefaultList_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/list/DefaultList */ "./src/components/templates/list/DefaultList.tsx"));
});
var DoGlossaryTermList = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_list_DOGlossaryTermList_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/list/DOGlossaryTermList */ "./src/components/templates/list/DOGlossaryTermList.tsx"));
});
var DoTimelineList = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_list_DOTimelineList_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/list/DOTimelineList */ "./src/components/templates/list/DOTimelineList.tsx"));
});
// Simple
var DefaultSimple = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_simple_DefaultSimple_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/simple/DefaultSimple */ "./src/components/templates/simple/DefaultSimple.tsx"));
});
var DoCompanySimple = (0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_templates_simple_DOCompanySimple_tsx").then(__webpack_require__.bind(__webpack_require__, /*! src/components/templates/simple/DOCompanySimple */ "./src/components/templates/simple/DOCompanySimple.tsx"));
});
var templates = {
  block: {
    default: DefaultBlock,
    do_company: DoCompanyBlock,
    do_event: DoEventBlock,
    do_staff: DoStaffBlock,
    do_media_coverage: DoMediaCoverageBlock,
    do_podcast: DoPodcastBlock,
    do_press_release: DoPressReleaseBlock
  },
  list: {
    default: DefaultList,
    do_glossary_term: DoGlossaryTermList,
    do_timeline: DoTimelineList
  },
  simple: {
    default: DefaultSimple,
    do_company: DoCompanySimple
  }
};
var PartialTemplateLoader = function PartialTemplateLoader(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? '' : _ref$type;
  // Select the correct template type. Default is block
  var finalType = templates[type] ? templates[type] : templates.block;
  var TemplateName = finalType[post.post_type] ? finalType[post.post_type] : finalType.default;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: ""
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TemplateName, {
    index: index,
    panelSlider: panelSlider,
    perRow: perRow,
    post: post,
    type: type
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (PartialTemplateLoader);

/***/ }),

/***/ "./assets/styles/components/blocks.scss":
/*!**********************************************!*\
  !*** ./assets/styles/components/blocks.scss ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726026376840
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
      // 1726026376968
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
      // 1726026376859
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
      // 1726026377003
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
      // 1726026376861
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX3NpbmdsZV9Eb0Jsb2dfdHN4LmJ1bmRsZS5qcz92PTE3MjYwMTc4NDg2NTEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDbUI7QUFDdUI7QUFDaEI7QUFDTjtBQUM5QyxJQUFNSSxZQUFZLEdBQUcsU0FBZkEsWUFBWUEsQ0FBQUMsSUFBQSxFQUF1TDtFQUFBLElBQWpMQyxVQUFVLEdBQUFELElBQUEsQ0FBVkMsVUFBVTtJQUFFQyxlQUFlLEdBQUFGLElBQUEsQ0FBZkUsZUFBZTtJQUFBQyxZQUFBLEdBQUFILElBQUEsQ0FBRUksT0FBTztJQUFQQSxPQUFPLEdBQUFELFlBQUEsY0FBRyxFQUFFLEdBQUFBLFlBQUE7SUFBRUUsUUFBUSxHQUFBTCxJQUFBLENBQVJLLFFBQVE7SUFBQUMsU0FBQSxHQUFBTixJQUFBLENBQUVPLElBQUk7SUFBSkEsSUFBSSxHQUFBRCxTQUFBLGNBQUcsRUFBRSxHQUFBQSxTQUFBO0lBQUFFLGlCQUFBLEdBQUFSLElBQUEsQ0FBRVMsWUFBWTtJQUFaQSxZQUFZLEdBQUFELGlCQUFBLGNBQUcsQ0FBQyxDQUFDLEdBQUFBLGlCQUFBO0lBQUVFLEdBQUcsR0FBQVYsSUFBQSxDQUFIVSxHQUFHO0lBQUVDLGdCQUFnQixHQUFBWCxJQUFBLENBQWhCVyxnQkFBZ0I7SUFBQUMsWUFBQSxHQUFBWixJQUFBLENBQUVhLE9BQU87SUFBUEEsT0FBTyxHQUFBRCxZQUFBLGNBQUcsQ0FBQyxDQUFDLEdBQUFBLFlBQUE7SUFBQUUsbUJBQUEsR0FBQWQsSUFBQSxDQUFFZSxjQUFjO0lBQWRBLGNBQWMsR0FBQUQsbUJBQUEsY0FBRyxDQUFDLENBQUMsR0FBQUEsbUJBQUE7SUFBQUUsWUFBQSxHQUFBaEIsSUFBQSxDQUFFaUIsT0FBTztJQUFQQSxPQUFPLEdBQUFELFlBQUEsY0FBRyxFQUFFLEdBQUFBLFlBQUE7SUFBQUUsY0FBQSxHQUFBbEIsSUFBQSxDQUFFbUIsU0FBUztJQUFUQSxTQUFTLEdBQUFELGNBQUEsY0FBRyxFQUFFLEdBQUFBLGNBQUE7RUFDN0wsT0FBUXZCLDBEQUFtQixDQUFDLFNBQVMsRUFBRTtJQUFFMEIsRUFBRSxFQUFFSixPQUFPO0lBQUVLLFNBQVMsRUFBRTFCLDJEQUFRLENBQUNRLE9BQU8sQ0FBQyxHQUFHQSxPQUFPLENBQUNtQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUc7RUFBRyxDQUFDLEVBQ3pHNUIsMERBQW1CLENBQUMsS0FBSyxFQUFBNkIsYUFBQTtJQUFJRixTQUFTLEVBQUUscUJBQXFCLElBQUlILFNBQVMsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLEdBQUcsWUFBWTtFQUFDLEdBQUtSLGdCQUFnQixHQUNuSUUsT0FBTyxJQUFJakIsMkRBQVEsQ0FBQ2lCLE9BQU8sQ0FBQ1ksS0FBSyxDQUFDLElBQUs3QiwyREFBUSxDQUFDTSxlQUFlLENBQUMsR0FDN0RQLDBEQUFtQixDQUFDLFFBQVEsRUFBQTZCLGFBQUE7SUFBSUYsU0FBUyxFQUFFLGNBQWMsSUFBSTFCLDJEQUFRLENBQUNjLEdBQUcsQ0FBQyxHQUFHLFVBQVUsR0FBRyxFQUFFO0VBQUMsR0FBS0ssY0FBYyxHQUM1R3BCLDBEQUFtQixDQUFDRSw2RUFBZSxFQUFBMkIsYUFBQSxDQUFBQSxhQUFBLEtBQU90QixlQUFlO0lBQUVtQixFQUFFLEVBQUVKLE9BQU8sR0FBRztFQUFRLEVBQUUsQ0FBQyxFQUNwRnRCLDBEQUFtQixDQUFDRyxxRUFBTyxFQUFBMEIsYUFBQSxLQUFPWCxPQUFPLENBQUUsQ0FBQyxDQUFDLEdBQy9DLElBQUksRUFDVmpCLDJEQUFRLENBQUNXLElBQUksQ0FBQyxHQUNWWiwwREFBbUIsQ0FBQyxLQUFLLEVBQUE2QixhQUFBO0lBQUlGLFNBQVMsRUFBRTtFQUFvQixHQUFLYixZQUFZLEdBQUlGLElBQUksQ0FBQyxHQUNwRixJQUFJLEVBQ1ZGLFFBQVEsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFDRCwrREFBZU4sWUFBWTs7Ozs7Ozs7Ozs7Ozs7QUNsQkQ7QUFDa0I7QUFDNUM7QUFDQSxJQUFNNEIsV0FBVyxHQUFHLFNBQWRBLFdBQVdBLENBQUEzQixJQUFBLEVBQWdEO0VBQUEsSUFBMUM0QixNQUFNLEdBQUE1QixJQUFBLENBQU40QixNQUFNO0lBQUVDLGFBQWEsR0FBQTdCLElBQUEsQ0FBYjZCLGFBQWE7SUFBRUMsV0FBVyxHQUFBOUIsSUFBQSxDQUFYOEIsV0FBVztFQUNyREMsT0FBTyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0VBQ25CLE9BQVFyQywwREFBbUIsQ0FBQyxLQUFLLEVBQUU7SUFBRTBCLEVBQUUsRUFBRTtFQUFlLENBQUMsRUFDckRPLE1BQU0sR0FDRmpDLDBEQUFtQixDQUFDLEdBQUcsRUFBRTtJQUFFMkIsU0FBUyxFQUFFO0VBQVMsQ0FBQyxFQUM1QzNCLDBEQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQ3hDaUMsTUFBTSxDQUFDLEdBQ1QsSUFBSSxFQUNWQyxhQUFhLEdBQ1RsQywwREFBbUIsQ0FBQyxHQUFHLEVBQUU7SUFBRTJCLFNBQVMsRUFBRTtFQUFpQixDQUFDLEVBQUVPLGFBQWEsQ0FBQyxHQUN0RSxJQUFJLEVBQ1ZDLFdBQVcsR0FDUEosMERBQU8sQ0FBQ0ksV0FBVyxDQUFDLEdBQ2xCLElBQUksQ0FBQztBQUNuQixDQUFDO0FBQ0QsK0RBQWVILFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7QUFDMUIsSUFBQU0sV0FBQSxHQUFnQ0MsRUFBRSxDQUFDQyxPQUFPO0VBQWxDQyxTQUFTLEdBQUFILFdBQUEsQ0FBVEcsU0FBUztFQUFFQyxRQUFRLEdBQUFKLFdBQUEsQ0FBUkksUUFBUTtBQUN1QjtBQUNJO0FBQ1Y7QUFDWTtBQUNjO0FBQ3pCO0FBQ0M7QUFDOUMsSUFBTUssV0FBVyxHQUFHLFNBQWRBLFdBQVdBLENBQUExQyxJQUFBLEVBQThFO0VBQUEsSUFBQTJDLFVBQUEsR0FBQTNDLElBQUEsQ0FBeEU0QyxLQUFLO0lBQUxBLEtBQUssR0FBQUQsVUFBQSxjQUFHLEVBQUUsR0FBQUEsVUFBQTtJQUFFRSxNQUFNLEdBQUE3QyxJQUFBLENBQU42QyxNQUFNO0lBQUFDLGFBQUEsR0FBQTlDLElBQUEsQ0FBRStDLFFBQVE7SUFBUkEsUUFBUSxHQUFBRCxhQUFBLGNBQUcsRUFBRSxHQUFBQSxhQUFBO0lBQUFFLFdBQUEsR0FBQWhELElBQUEsQ0FBRWlELE1BQU07SUFBTkEsTUFBTSxHQUFBRCxXQUFBLGNBQUcsSUFBSSxHQUFBQSxXQUFBO0lBQUFFLFNBQUEsR0FBQWxELElBQUEsQ0FBRW1ELElBQUk7SUFBSkEsSUFBSSxHQUFBRCxTQUFBLGNBQUcsT0FBTyxHQUFBQSxTQUFBO0VBQ25GLElBQU1FLFNBQVMsR0FBRztJQUNkQyxTQUFTLEVBQUVOLFFBQVE7SUFDbkJPLGNBQWMsRUFBRVYsS0FBSztJQUNyQlcsT0FBTyxFQUFFLFdBQVc7SUFDcEJDLFlBQVksRUFBRVgsTUFBTSxHQUFHLENBQUNBLE1BQU0sQ0FBQyxHQUFHLEVBQUU7SUFDcENZLFFBQVEsRUFBRTtFQUNkLENBQUM7RUFDRCxJQUFBQyxTQUFBLEdBQXNDckIsUUFBUSxDQUFDLEVBQUUsQ0FBQztJQUFBc0IsVUFBQSxHQUFBQyxnRkFBQSxDQUFBRixTQUFBO0lBQTNDRyxXQUFXLEdBQUFGLFVBQUE7SUFBRUcsY0FBYyxHQUFBSCxVQUFBO0VBQ2xDdkIsU0FBUyxDQUFDLFlBQU07SUFBQSxTQUNHMkIsU0FBU0EsQ0FBQTtNQUFBLE9BQUFDLFVBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0lBQUE7SUFBQSxTQUFBRixXQUFBO01BQUFBLFVBQUEsR0FBQUcsbUZBQUEsZUFBQUMsc0VBQUEsQ0FBeEIsU0FBQUUsUUFBQTtRQUFBLE9BQUFGLHNFQUFBLFVBQUFJLFNBQUFDLFFBQUE7VUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtZQUFBO2NBQUFGLFFBQUEsQ0FBQUUsSUFBQTtjQUFBLE9BQ1VyQyxnRUFBaUIsQ0FBQ2MsU0FBUyxDQUFDLENBQUN3QixJQUFJLENBQUMsVUFBQ0MsSUFBSSxFQUFLO2dCQUM5Q2YsY0FBYyxDQUFDZSxJQUFJLENBQUNDLElBQUksQ0FBQztjQUM3QixDQUFDLENBQUM7WUFBQTtZQUFBO2NBQUEsT0FBQUwsUUFBQSxDQUFBTSxJQUFBO1VBQUE7UUFBQSxHQUFBVCxPQUFBO01BQUEsQ0FDTDtNQUFBLE9BQUFOLFVBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0lBQUE7SUFDREgsU0FBUyxDQUFDLENBQUM7RUFDZixDQUFDLEVBQUUsRUFBRSxDQUFDO0VBQ04sU0FBU2lCLEtBQUtBLENBQUEsRUFBRztJQUNiLE9BQVFyRiwwREFBbUIsQ0FBQyxJQUFJLEVBQUU7TUFBRTBCLEVBQUUsRUFBRSxjQUFjO01BQUVDLFNBQVMsRUFBRSxTQUFTLEdBQUd5QixRQUFRLEdBQUcsR0FBRyxJQUFJSSxJQUFJLEtBQUssT0FBTyxHQUFHLFlBQVksR0FBR0EsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJRixNQUFNLEdBQUcsaUJBQWlCLEdBQUcsRUFBRTtJQUFFLENBQUMsRUFBRVksV0FBVyxDQUFDb0IsR0FBRyxDQUFDLFVBQUNDLElBQUksRUFBRUMsS0FBSyxFQUFLO01BQ25OLElBQUloQyxJQUFJLElBQUksTUFBTSxFQUFFO1FBQ2hCO1FBQ0EsSUFBTWlDLFdBQVcsR0FBRztVQUNoQkMsR0FBRyxFQUFFSCxJQUFJLENBQUNJLFNBQVM7VUFDbkI3RCxLQUFLLEVBQUV5RCxJQUFJLENBQUNLLFVBQVU7VUFDdEJuRixPQUFPLEVBQUUsQ0FBQyxZQUFZO1FBQzFCLENBQUM7UUFDRCxPQUFRVCwwREFBbUIsQ0FBQyxJQUFJLEVBQUU7VUFBRTZGLEdBQUcsRUFBRUw7UUFBTSxDQUFDLEVBQzVDeEYsMERBQW1CLENBQUM0QyxpRUFBRyxFQUFBZixhQUFBLEtBQU80RCxXQUFXLEdBQUkxRCwwREFBTyxDQUFDd0QsSUFBSSxDQUFDSyxVQUFVLENBQUMsQ0FBQyxDQUFDO01BQy9FLENBQUMsTUFDSTtRQUNELE9BQU81RiwwREFBbUIsQ0FBQzhDLHlFQUFxQixFQUFFO1VBQUUrQyxHQUFHLEVBQUVMLEtBQUs7VUFBRUEsS0FBSyxFQUFFQSxLQUFLO1VBQUVoQyxJQUFJLEVBQUVBLElBQUk7VUFBRStCLElBQUksRUFBRUEsSUFBSTtVQUFFTyxNQUFNLEVBQUUsQ0FBQztVQUFFQyxXQUFXLEVBQUV6QztRQUFPLENBQUMsQ0FBQztNQUMzSTtJQUNKLENBQUMsQ0FBQyxDQUFDO0VBQ1A7RUFDQSxJQUFJckQsMkRBQVEsQ0FBQ2lFLFdBQVcsQ0FBQyxFQUFFO0lBQ3ZCLE9BQVFsRSwwREFBbUIsQ0FBQ0EsdURBQWMsRUFBRSxJQUFJLEVBQUVzRCxNQUFNLEdBQ3BEdEQsMERBQW1CLENBQUMsS0FBSyxFQUFFO01BQUUyQixTQUFTLEVBQUUsc0JBQXNCO01BQUUsV0FBVyxFQUFFO0lBQWUsQ0FBQyxFQUN6RjNCLDBEQUFtQixDQUFDcUYsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUNoQ3JGLDBEQUFtQixDQUFDNkMsdUVBQVMsRUFBRTtNQUFFb0QsTUFBTSxFQUFFLEtBQUs7TUFBRUMsTUFBTSxFQUFFakcsMkRBQVEsQ0FBQ2lFLFdBQVc7SUFBRSxDQUFDLENBQUMsQ0FBQyxHQUNuRmxFLDBEQUFtQixDQUFDcUYsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQzNDLENBQUMsTUFDSTtJQUNELE9BQU8sSUFBSTtFQUNmO0FBQ0osQ0FBQztBQUNELCtEQUFldEMsV0FBVzs7Ozs7Ozs7Ozs7Ozs7QUN0REE7QUFDb0I7QUFDOUMsSUFBTUYsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUF4QyxJQUFBLEVBQXVDO0VBQUEsSUFBQThGLFdBQUEsR0FBQTlGLElBQUEsQ0FBakM0RixNQUFNO0lBQU5BLE1BQU0sR0FBQUUsV0FBQSxjQUFHLEtBQUssR0FBQUEsV0FBQTtJQUFBQyxXQUFBLEdBQUEvRixJQUFBLENBQUU2RixNQUFNO0lBQU5BLE1BQU0sR0FBQUUsV0FBQSxjQUFHLENBQUMsR0FBQUEsV0FBQTtFQUMzQyxPQUFRcEcsMERBQW1CLENBQUNBLHVEQUFjLEVBQUUsSUFBSSxFQUM1Q0EsMERBQW1CLENBQUMsR0FBRyxFQUFFO0lBQUUyQixTQUFTLEVBQUUsNkJBQTZCO0lBQUUwRSxJQUFJLEVBQUUsR0FBRztJQUFFLHNCQUFzQixFQUFFLEVBQUU7SUFBRSxnQkFBZ0IsRUFBRTtFQUFXLENBQUMsRUFDdElyRywwREFBbUIsQ0FBQyxNQUFNLEVBQUU7SUFBRTJCLFNBQVMsRUFBRTtFQUFxQixDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFDakYzQiwwREFBbUIsQ0FBQyxHQUFHLEVBQUU7SUFBRTJCLFNBQVMsRUFBRSx5QkFBeUI7SUFBRTBFLElBQUksRUFBRSxHQUFHO0lBQUUsa0JBQWtCLEVBQUUsRUFBRTtJQUFFLGdCQUFnQixFQUFFO0VBQU8sQ0FBQyxFQUMxSHJHLDBEQUFtQixDQUFDLE1BQU0sRUFBRTtJQUFFMkIsU0FBUyxFQUFFO0VBQXFCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUM3RXNFLE1BQU0sS0FBSyxJQUFJLEdBQ1hqRywwREFBbUIsQ0FBQyxJQUFJLEVBQUU7SUFBRTJCLFNBQVMsRUFBRTtFQUFtRCxDQUFDLEVBQUcsWUFBTTtJQUNoRyxJQUFNMkUsSUFBSSxHQUFHLEVBQUU7SUFDZixLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0wsTUFBTSxFQUFFSyxDQUFDLEVBQUUsRUFBRTtNQUM3QkQsSUFBSSxDQUFDRSxJQUFJLENBQUN4RywwREFBbUIsQ0FBQyxJQUFJLEVBQUU7UUFBRTZGLEdBQUcsRUFBRVUsQ0FBQztRQUFFLGdCQUFnQixFQUFFQSxDQUFDO1FBQUU1RSxTQUFTLEVBQUU0RSxDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVcsR0FBRztNQUFHLENBQUMsRUFDdEd2RywwREFBbUIsQ0FBQyxHQUFHLEVBQUU7UUFBRXFHLElBQUksRUFBRTtNQUFJLENBQUMsRUFDbENyRywwREFBbUIsQ0FBQyxNQUFNLEVBQUU7UUFBRTJCLFNBQVMsRUFBRTtNQUFxQixDQUFDLEVBQUU0RSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RGO0lBQ0EsT0FBT0QsSUFBSTtFQUNmLENBQUMsQ0FBRSxDQUFDLENBQUMsR0FDSCxJQUFJLENBQUM7QUFDbkIsQ0FBQztBQUNELCtEQUFlekQsU0FBUzs7Ozs7Ozs7Ozs7Ozs7O0FDcEJFO0FBQ1k7QUFDTztBQUM3QyxJQUFNNkQsY0FBYyxHQUFHLFNBQWpCQSxjQUFjQSxDQUFBckcsSUFBQSxFQUFpQjtFQUFBLElBQVhrRixJQUFJLEdBQUFsRixJQUFBLENBQUprRixJQUFJO0VBQzFCLElBQUl0RiwyREFBUSxDQUFDc0YsSUFBSSxDQUFDLElBQUlBLElBQUksQ0FBQ29CLE1BQU0sRUFBRTtJQUMvQixPQUFRM0csMERBQW1CLENBQUN5RyxnREFBTSxFQUFFLElBQUksRUFDcEN6RywwREFBbUIsQ0FBQyxRQUFRLEVBQUU7TUFBRXdELElBQUksRUFBRTtJQUFzQixDQUFDLEVBQUVvRCxJQUFJLENBQUNDLFNBQVMsQ0FBQ3RCLElBQUksQ0FBQ29CLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFDcEcsQ0FBQyxNQUNJO0lBQ0QsT0FBTyxJQUFJO0VBQ2Y7QUFDSixDQUFDO0FBQ0QsK0RBQWVELGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaSDtBQUMxQixJQUFRakUsU0FBUyxHQUFLRixFQUFFLENBQUNDLE9BQU8sQ0FBeEJDLFNBQVM7QUFDcUM7QUFDdEQ7QUFDOEM7QUFDRTtBQUNjO0FBQ0Y7QUFDQTtBQUNSO0FBQ2M7QUFDekI7QUFDSztBQUNEO0FBQzdDLElBQU13RSxNQUFNLEdBQUcsU0FBVEEsTUFBTUEsQ0FBQTVHLElBQUEsRUFBNEQ7RUFBQSxJQUF0RGtGLElBQUksR0FBQWxGLElBQUEsQ0FBSmtGLElBQUk7SUFBQTJCLFdBQUEsR0FBQTdHLElBQUEsQ0FBRThHLE1BQU07SUFBTkEsTUFBTSxHQUFBRCxXQUFBLGNBQUcsS0FBSyxHQUFBQSxXQUFBO0lBQUFFLGtCQUFBLEdBQUEvRyxJQUFBLENBQUVnSCxhQUFhO0lBQWJBLGFBQWEsR0FBQUQsa0JBQUEsY0FBRyxZQUFNLENBQUUsQ0FBQyxHQUFBQSxrQkFBQTtFQUM3RCxJQUFJbkgsMkRBQVEsQ0FBQ3NGLElBQUksQ0FBQyxFQUFFO0lBQ2hCLElBQU0rQixZQUFZLEdBQUc7TUFDakJDLFFBQVEsRUFBRWhDLElBQUksQ0FBQ2lDLGlCQUFpQixDQUFDQyxzQkFBc0I7TUFDdkQzRixLQUFLLEVBQUV5RCxJQUFJLENBQUNtQyxNQUFNLENBQUNDLFVBQVU7TUFDN0JDLFdBQVcsRUFBRXJDLElBQUk7TUFDakJzQyxXQUFXLEVBQUV0QyxJQUFJLENBQUN1QyxTQUFTLENBQUNDLFNBQVM7TUFDckNDLFVBQVUsRUFBRWhJLDBEQUFtQixDQUFDZ0MseUVBQVcsRUFBRTtRQUFFQyxNQUFNLEVBQUVzRCxJQUFJLENBQUNtQyxNQUFNLENBQUNPLFdBQVc7UUFBRTlGLFdBQVcsRUFBRW9ELElBQUksQ0FBQ21DLE1BQU0sQ0FBQ1E7TUFBaUIsQ0FBQyxDQUFDO01BQzVIeEMsR0FBRyxFQUFFeUMsT0FBTyxHQUFHLEdBQUcsR0FBRzVDLElBQUksQ0FBQ2lDLGlCQUFpQixDQUFDWSxjQUFjLEdBQUcsR0FBRyxHQUFHN0MsSUFBSSxDQUFDOEMsU0FBUztNQUNqRkMsUUFBUSxFQUFFO0lBQ2QsQ0FBQztJQUNEN0YsU0FBUyxDQUFDLFlBQU07TUFDWjtNQUNBNEUsYUFBYSxDQUFDLENBQUMscUJBQXFCLEVBQUUsU0FBUyxHQUFHOUIsSUFBSSxDQUFDaUMsaUJBQWlCLENBQUM5RCxTQUFTLENBQUMsQ0FBQztJQUN4RixDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ04sT0FBUTFELDBEQUFtQixDQUFDQSx1REFBYyxFQUFFLElBQUksRUFDNUNBLDBEQUFtQixDQUFDZ0gscUVBQU8sRUFBRTtNQUFFekIsSUFBSSxFQUFFQTtJQUFLLENBQUMsQ0FBQyxFQUM1Q3ZGLDBEQUFtQixDQUFDMEcsNEVBQWMsRUFBRTtNQUFFbkIsSUFBSSxFQUFFQTtJQUFLLENBQUMsQ0FBQyxFQUNuRHZGLDBEQUFtQixDQUFDOEcsa0VBQUksRUFBQWpGLGFBQUEsS0FBT3lGLFlBQVksQ0FBRSxDQUFDLEVBQzlDdEgsMERBQW1CLENBQUMsU0FBUyxFQUFFO01BQUUwQixFQUFFLEVBQUUsaUJBQWlCO01BQUVDLFNBQVMsRUFBRTtJQUF1QixDQUFDLEVBQ3ZGM0IsMERBQW1CLENBQUMsU0FBUyxFQUFFO01BQUUwQixFQUFFLEVBQUU7SUFBZSxDQUFDLEVBQ2pENkQsSUFBSSxDQUFDbUMsTUFBTSxDQUFDYSxVQUFVLEdBQ2xCdkksMERBQW1CLENBQUNBLHVEQUFjLEVBQUUsSUFBSSxFQUNwQ0EsMERBQW1CLENBQUMrRyxtRUFBSyxFQUFFO01BQUV5QixLQUFLLEVBQUVqRCxJQUFJLENBQUNtQyxNQUFNLENBQUNhLFVBQVU7TUFBRUUsSUFBSSxFQUFFLGFBQWE7TUFBRS9HLEVBQUUsRUFBRTtJQUFhLENBQUMsQ0FBQyxFQUNwRzZELElBQUksQ0FBQ21DLE1BQU0sQ0FBQ2dCLGlCQUFpQixJQUN6QjFJLDBEQUFtQixDQUFDLE1BQU0sRUFBRTtNQUFFMkIsU0FBUyxFQUFFO0lBQW9CLENBQUMsRUFBRTRELElBQUksQ0FBQ21DLE1BQU0sQ0FBQ2dCLGlCQUFpQixDQUFDLENBQUMsR0FDckcsSUFBSSxFQUNWMUksMERBQW1CLENBQUMsS0FBSyxFQUFFO01BQUUwQixFQUFFLEVBQUU7SUFBZSxDQUFDLEVBQUVLLDBEQUFPLENBQUN3RCxJQUFJLENBQUNtQyxNQUFNLENBQUNpQixZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDL0YzSSwwREFBbUIsQ0FBQ0ksMEVBQVksRUFBRTtNQUFFa0IsT0FBTyxFQUFFLG9CQUFvQjtNQUFFRSxTQUFTLEVBQUUsU0FBUztNQUFFZixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUM7TUFBRVMsT0FBTyxFQUFFO1FBQUUwSCxHQUFHLEVBQUUsSUFBSTtRQUFFOUcsS0FBSyxFQUFFO01BQWU7SUFBRSxDQUFDLEVBQzlLOUIsMERBQW1CLENBQUMrQyx5RUFBVyxFQUFFO01BQUVLLFFBQVEsRUFBRW1DLElBQUksQ0FBQ2lDLGlCQUFpQixDQUFDOUQsU0FBUztNQUFFUixNQUFNLEVBQUVxQyxJQUFJLENBQUNzRDtJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0csQ0FBQyxNQUNJO0lBQ0QsT0FBTyxJQUFJO0VBQ2Y7QUFDSixDQUFDO0FBQ0QsK0RBQWU1QixNQUFNOzs7Ozs7Ozs7Ozs7O0FDakR5QjtBQUM5QztBQUNBLElBQU0rQixZQUFZLEdBQUdELDJDQUFJLENBQUM7RUFBQSxPQUFNLG9QQUFxRDtBQUFBLEVBQUM7QUFDdEYsSUFBTUUsY0FBYyxHQUFHRiwyQ0FBSSxDQUFDO0VBQUEsT0FBTSwwUEFBdUQ7QUFBQSxFQUFDO0FBQzFGLElBQU1HLFlBQVksR0FBR0gsMkNBQUksQ0FBQztFQUFBLE9BQU0sb1BBQXFEO0FBQUEsRUFBQztBQUN0RixJQUFNSSxZQUFZLEdBQUdKLDJDQUFJLENBQUM7RUFBQSxPQUFNLG9QQUFxRDtBQUFBLEVBQUM7QUFDdEYsSUFBTUssb0JBQW9CLEdBQUdMLDJDQUFJLENBQUM7RUFBQSxPQUFNLDRRQUE2RDtBQUFBLEVBQUM7QUFDdEcsSUFBTU0sY0FBYyxHQUFHTiwyQ0FBSSxDQUFDO0VBQUEsT0FBTSwwUEFBdUQ7QUFBQSxFQUFDO0FBQzFGLElBQU1PLG1CQUFtQixHQUFHUCwyQ0FBSSxDQUFDO0VBQUEsT0FBTSx5UUFBNEQ7QUFBQSxFQUFDO0FBQ3BHO0FBQ0EsSUFBTVEsV0FBVyxHQUFHUiwyQ0FBSSxDQUFDO0VBQUEsT0FBTSw4T0FBbUQ7QUFBQSxFQUFDO0FBQ25GLElBQU1TLGtCQUFrQixHQUFHVCwyQ0FBSSxDQUFDO0VBQUEsT0FBTSxtUUFBMEQ7QUFBQSxFQUFDO0FBQ2pHLElBQU1VLGNBQWMsR0FBR1YsMkNBQUksQ0FBQztFQUFBLE9BQU0sdVBBQXNEO0FBQUEsRUFBQztBQUN6RjtBQUNBLElBQU1XLGFBQWEsR0FBR1gsMkNBQUksQ0FBQztFQUFBLE9BQU0sMFBBQXVEO0FBQUEsRUFBQztBQUN6RixJQUFNWSxlQUFlLEdBQUdaLDJDQUFJLENBQUM7RUFBQSxPQUFNLGdRQUF5RDtBQUFBLEVBQUM7QUFDN0YsSUFBTWEsU0FBUyxHQUFHO0VBQ2RDLEtBQUssRUFBRTtJQUNIQyxPQUFPLEVBQUVkLFlBQVk7SUFDckJlLFVBQVUsRUFBRWQsY0FBYztJQUMxQmUsUUFBUSxFQUFFZCxZQUFZO0lBQ3RCZSxRQUFRLEVBQUVkLFlBQVk7SUFDdEJlLGlCQUFpQixFQUFFZCxvQkFBb0I7SUFDdkNlLFVBQVUsRUFBRWQsY0FBYztJQUMxQmUsZ0JBQWdCLEVBQUVkO0VBQ3RCLENBQUM7RUFDRGUsSUFBSSxFQUFFO0lBQ0ZQLE9BQU8sRUFBRVAsV0FBVztJQUNwQmUsZ0JBQWdCLEVBQUVkLGtCQUFrQjtJQUNwQ2UsV0FBVyxFQUFFZDtFQUNqQixDQUFDO0VBQ0RlLE1BQU0sRUFBRTtJQUNKVixPQUFPLEVBQUVKLGFBQWE7SUFDdEJLLFVBQVUsRUFBRUo7RUFDaEI7QUFDSixDQUFDO0FBQ0QsSUFBTTdHLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBcUJBLENBQUF6QyxJQUFBLEVBQXlEO0VBQUEsSUFBbkRtRixLQUFLLEdBQUFuRixJQUFBLENBQUxtRixLQUFLO0lBQUVPLFdBQVcsR0FBQTFGLElBQUEsQ0FBWDBGLFdBQVc7SUFBRUQsTUFBTSxHQUFBekYsSUFBQSxDQUFOeUYsTUFBTTtJQUFFUCxJQUFJLEdBQUFsRixJQUFBLENBQUprRixJQUFJO0lBQUFoQyxTQUFBLEdBQUFsRCxJQUFBLENBQUVtRCxJQUFJO0lBQUpBLElBQUksR0FBQUQsU0FBQSxjQUFHLEVBQUUsR0FBQUEsU0FBQTtFQUN4RTtFQUNBLElBQU1rSCxTQUFTLEdBQUdiLFNBQVMsQ0FBQ3BHLElBQUksQ0FBQyxHQUFHb0csU0FBUyxDQUFDcEcsSUFBSSxDQUFDLEdBQUdvRyxTQUFTLENBQUNDLEtBQUs7RUFDckUsSUFBTWEsWUFBWSxHQUFHRCxTQUFTLENBQUNsRixJQUFJLENBQUM3QixTQUFTLENBQUMsR0FBRytHLFNBQVMsQ0FBQ2xGLElBQUksQ0FBQzdCLFNBQVMsQ0FBQyxHQUFHK0csU0FBUyxDQUFDWCxPQUFPO0VBQzlGLE9BQVE5SiwwREFBbUIsQ0FBQzhJLDJDQUFRLEVBQUU7SUFBRTZCLFFBQVEsRUFBRTtFQUFHLENBQUMsRUFDbEQzSywwREFBbUIsQ0FBQzBLLFlBQVksRUFBRTtJQUFFbEYsS0FBSyxFQUFFQSxLQUFLO0lBQUVPLFdBQVcsRUFBRUEsV0FBVztJQUFFRCxNQUFNLEVBQUVBLE1BQU07SUFBRVAsSUFBSSxFQUFFQSxJQUFJO0lBQUUvQixJQUFJLEVBQUVBO0VBQUssQ0FBQyxDQUFDLENBQUM7QUFDOUgsQ0FBQztBQUNELCtEQUFlVixxQkFBcUI7Ozs7Ozs7Ozs7O0FDM0NwQztBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQTs7Ozs7Ozs7Ozs7QUNSQTtBQUNVO0FBQ1YsT0FBTyxJQUFVO0FBQ2pCO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsK0pBQWdGLGNBQWMsZUFBZTtBQUMzSSxNQUFNLFVBQVU7QUFDaEIsTUFBTSxpQkFBaUI7QUFDdkI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL2xheW91dC9QYW5lbFdyYXBwZXIudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9Qb3N0RGV0YWlscy50c3giLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvc2hhcmVkL1JlY2VudFBvc3RzLnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy9zaGFyZWQvU2xpZGVyTmF2LnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy9zaGFyZWQvU3RydWN0dXJlZERhdGEudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9zaW5nbGUvRG9CbG9nLnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvbG9hZGVycy9QYXJ0aWFsVGVtcGxhdGVMb2FkZXIudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9ibG9ja3Muc2Nzcz9hM2E2Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9wYW5lbHMuc2Nzcz9lNGYxIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9wb3N0cy5zY3NzPzllZmMiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3NsaWRlci5zY3NzP2NkZTMiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9wYWdlcy9zaW5nbGUuc2Nzcz85YTU4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBkb0xlbmd0aCB9IGZyb20gJ3NyYy91dGlscy9oZWxwZXJzJztcbmltcG9ydCBCYWNrZ3JvdW5kVmlkZW8gZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0JhY2tncm91bmRWaWRlbyc7XG5pbXBvcnQgSGVhZGluZyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSGVhZGluZyc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9wYW5lbHMuc2Nzcyc7XG5jb25zdCBQYW5lbFdyYXBwZXIgPSAoeyBiYWNrZ3JvdW5kLCBiYWNrZ3JvdW5kVmlkZW8sIGNsYXNzZXMgPSBbXSwgY2hpbGRyZW4sIGNvcHkgPSAnJywgY29weVBhcmFsbGF4ID0ge30sIGN0YSwgZmVhdHVyZWRTZXR0aW5ncywgaGVhZGluZyA9IHt9LCBoZWFkZXJQYXJhbGxheCA9IHt9LCBwYW5lbElEID0gJycsIHBhbmVsVHlwZSA9ICcnLCB9KSA9PiB7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCB7IGlkOiBwYW5lbElELCBjbGFzc05hbWU6IGRvTGVuZ3RoKGNsYXNzZXMpID8gY2xhc3Nlcy5qb2luKCcgJykgOiAnJyB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAncGFuZWwtaW5uZXItd3JhcHBlcicgKyAocGFuZWxUeXBlID09ICdsaW5lYXItY29udGVudCcgPyAnJyA6ICcgY29udGFpbmVyJyksIC4uLmZlYXR1cmVkU2V0dGluZ3MgfSxcbiAgICAgICAgICAgIChoZWFkaW5nICYmIGRvTGVuZ3RoKGhlYWRpbmcudGl0bGUpKSB8fCBkb0xlbmd0aChiYWNrZ3JvdW5kVmlkZW8pID9cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIsIHsgY2xhc3NOYW1lOiAncGFuZWwtaGVhZGVyJyArIChkb0xlbmd0aChjdGEpID8gJyBoYXMtY3RhJyA6ICcnKSwgLi4uaGVhZGVyUGFyYWxsYXggfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCYWNrZ3JvdW5kVmlkZW8sIHsgLi4uYmFja2dyb3VuZFZpZGVvLCBpZDogcGFuZWxJRCArICctdmlkZW8nIH0pLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlYWRpbmcsIHsgLi4uaGVhZGluZyB9KSlcbiAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBkb0xlbmd0aChjb3B5KSA/XG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwYW5lbC1jb3B5LXdyYXBwZXJcIiwgLi4uY29weVBhcmFsbGF4IH0sIGNvcHkpXG4gICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgY2hpbGRyZW4pKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUGFuZWxXcmFwcGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGRvUGFyc2UgfSBmcm9tICdzcmMvdXRpbHMvaGVscGVycyc7XG4vLyBQb3N0IERldGFpbHMgRGlzcGxheSBDb21wb25lbnRcbmNvbnN0IFBvc3REZXRhaWxzID0gKHsgYXV0aG9yLCBwb2RjYXN0U2VyaWVzLCBkZXNjcmlwdGlvbiwgfSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdoZXJlJyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwicG9zdC1kZXRhaWxzXCIgfSxcbiAgICAgICAgYXV0aG9yID9cbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgY2xhc3NOYW1lOiBcImF1dGhvclwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJCeSBcIiksXG4gICAgICAgICAgICAgICAgYXV0aG9yKVxuICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICBwb2RjYXN0U2VyaWVzID9cbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgY2xhc3NOYW1lOiBcInBvZGNhc3Qtc2VyaWVzXCIgfSwgcG9kY2FzdFNlcmllcylcbiAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgZGVzY3JpcHRpb24gP1xuICAgICAgICAgICAgZG9QYXJzZShkZXNjcmlwdGlvbilcbiAgICAgICAgICAgIDogbnVsbCkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFBvc3REZXRhaWxzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9ID0gd3AuZWxlbWVudDtcbmltcG9ydCB7IGRvR2V0QXJjaGl2ZVBvc3RzIH0gZnJvbSAnc3JjL3V0aWxzL2FwaSc7XG5pbXBvcnQgeyBkb0xlbmd0aCwgZG9QYXJzZSB9IGZyb20gJ3NyYy91dGlscy9oZWxwZXJzJztcbmltcG9ydCBDVEEgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0NUQSc7XG5pbXBvcnQgU2xpZGVyTmF2IGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9TbGlkZXJOYXYnO1xuaW1wb3J0IFBhcnRpYWxUZW1wbGF0ZUxvYWRlciBmcm9tICdzcmMvbG9hZGVycy9QYXJ0aWFsVGVtcGxhdGVMb2FkZXInO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvcG9zdHMuc2Nzcyc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9ibG9ja3Muc2Nzcyc7XG5jb25zdCBSZWNlbnRQb3N0cyA9ICh7IGNvdW50ID0gMTAsIHBvc3RJRCwgcG9zdFR5cGUgPSAnJywgc2xpZGVyID0gdHJ1ZSwgdHlwZSA9ICdibG9jaycsIH0pID0+IHtcbiAgICBjb25zdCBwb3N0c0FyZ3MgPSB7XG4gICAgICAgIHBvc3RfdHlwZTogcG9zdFR5cGUsXG4gICAgICAgIHBvc3RzX3Blcl9wYWdlOiBjb3VudCxcbiAgICAgICAgb3JkZXJieTogJ2RhdGVfZGVzYycsXG4gICAgICAgIHBvc3RfX25vdF9pbjogcG9zdElEID8gW3Bvc3RJRF0gOiBbXSxcbiAgICAgICAgbm9wYWdpbmc6IHRydWUsXG4gICAgfTtcbiAgICBjb25zdCBbcmVjZW50UG9zdHMsIHNldFJlY2VudFBvc3RzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBhc3luYyBmdW5jdGlvbiBmZXRjaERhdGEoKSB7XG4gICAgICAgICAgICBhd2FpdCBkb0dldEFyY2hpdmVQb3N0cyhwb3N0c0FyZ3MpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRSZWNlbnRQb3N0cyhkYXRhLmpzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2hEYXRhKCk7XG4gICAgfSwgW10pO1xuICAgIGZ1bmN0aW9uIFBvc3RzKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7IGlkOiBcInJlY2VudC1wb3N0c1wiLCBjbGFzc05hbWU6ICdibG9ja3MgJyArIHBvc3RUeXBlICsgJyAnICsgKHR5cGUgPT09ICdibG9jaycgPyAncG9zdCB0aHJlZScgOiB0eXBlKSArICcgJyArIChzbGlkZXIgPyAndWstc2xpZGVyLWl0ZW1zJyA6ICcnKSB9LCByZWNlbnRQb3N0cy5tYXAoKHBvc3QsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PSAndGV4dCcpIHtcbiAgICAgICAgICAgICAgICAvLyBDVEEgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICBjb25zdCBjdGFTZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwb3N0LnBlcm1hbGluayxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHBvc3QucG9zdF90aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWydibG9jay1saW5rJ10sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGtleTogaW5kZXggfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDVEEsIHsgLi4uY3RhU2V0dGluZ3MgfSwgZG9QYXJzZShwb3N0LnBvc3RfdGl0bGUpKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGFydGlhbFRlbXBsYXRlTG9hZGVyLCB7IGtleTogaW5kZXgsIGluZGV4OiBpbmRleCwgdHlwZTogdHlwZSwgcG9zdDogcG9zdCwgcGVyUm93OiAzLCBwYW5lbFNsaWRlcjogc2xpZGVyIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSkpO1xuICAgIH1cbiAgICBpZiAoZG9MZW5ndGgocmVjZW50UG9zdHMpKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCwgc2xpZGVyID9cbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicGFuZWwtc2xpZGVyLXdyYXBwZXJcIiwgXCJ1ay1zbGlkZXJcIjogXCJmaW5pdGU6IHRydWVcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUG9zdHMsIG51bGwpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2xpZGVyTmF2LCB7IGRvdE5hdjogZmFsc2UsIGxlbmd0aDogZG9MZW5ndGgocmVjZW50UG9zdHMpIH0pKVxuICAgICAgICAgICAgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFBvc3RzLCBudWxsKSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IFJlY2VudFBvc3RzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3NsaWRlci5zY3NzJztcbmNvbnN0IFNsaWRlck5hdiA9ICh7IGRvdE5hdiA9IGZhbHNlLCBsZW5ndGggPSAwIH0pID0+IHtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiBcInNsaWRlci1idXR0b25zIGJ0bi1wcmV2aW91c1wiLCBocmVmOiBcIiNcIiwgXCJ1ay1zbGlkZW5hdi1wcmV2aW91c1wiOiBcIlwiLCBcInVrLXNsaWRlci1pdGVtXCI6IFwicHJldmlvdXNcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwic2NyZWVuLXJlYWRlci10ZXh0XCIgfSwgXCJQcmV2aW91c1wiKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3NOYW1lOiBcInNsaWRlci1idXR0b25zIGJ0bi1uZXh0XCIsIGhyZWY6IFwiI1wiLCBcInVrLXNsaWRlbmF2LW5leHRcIjogXCJcIiwgXCJ1ay1zbGlkZXItaXRlbVwiOiBcIm5leHRcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwic2NyZWVuLXJlYWRlci10ZXh0XCIgfSwgXCJOZXh0XCIpKSxcbiAgICAgICAgZG90TmF2ID09PSB0cnVlID9cbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7IGNsYXNzTmFtZTogXCJ1ay1zbGlkZXItbmF2IHVrLWRvdG5hdiB1ay1mbGV4LWNlbnRlciB1ay1tYXJnaW5cIiB9LCAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvdHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBrZXk6IGksIFwidWstc2xpZGVyLWl0ZW1cIjogaSwgY2xhc3NOYW1lOiBpID09PSAwID8gJ3VrLWFjdGl2ZScgOiAnJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFcIiwgeyBocmVmOiBcIiNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInNjcmVlbi1yZWFkZXItdGV4dFwiIH0sIGkgKyAxKSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvdHM7XG4gICAgICAgICAgICB9KSgpKVxuICAgICAgICAgICAgOiBudWxsKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2xpZGVyTmF2O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEhlbG1ldCB9IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgeyBkb0xlbmd0aCB9IGZyb20gJ3NyYy91dGlscy9oZWxwZXJzJztcbmNvbnN0IFN0cnVjdHVyZWREYXRhID0gKHsgcG9zdCB9KSA9PiB7XG4gICAgaWYgKGRvTGVuZ3RoKHBvc3QpICYmIHBvc3Quc2NoZW1hKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChIZWxtZXQsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9sZCtqc29uXCIgfSwgSlNPTi5zdHJpbmdpZnkocG9zdC5zY2hlbWEpKSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IFN0cnVjdHVyZWREYXRhO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IHsgdXNlRWZmZWN0IH0gPSB3cC5lbGVtZW50O1xuaW1wb3J0IHsgZG9MZW5ndGgsIGRvUGFyc2UgfSBmcm9tICdzcmMvdXRpbHMvaGVscGVycyc7XG4vLyBpbXBvcnQgQ3VzdG9tQ1RBIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9DdXN0b21DVEEnO1xuaW1wb3J0IEhlcm8gZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0hlcm8nO1xuaW1wb3J0IEltYWdlIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9JbWFnZSc7XG5pbXBvcnQgUGFuZWxXcmFwcGVyIGZyb20gJ3NyYy9jb21wb25lbnRzL2xheW91dC9QYW5lbFdyYXBwZXInO1xuaW1wb3J0IFBvc3REZXRhaWxzIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9Qb3N0RGV0YWlscyc7XG5pbXBvcnQgUmVjZW50UG9zdHMgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL1JlY2VudFBvc3RzJztcbmltcG9ydCBTRU9UYWdzIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9TRU9UYWdzJztcbmltcG9ydCBTdHJ1Y3R1cmVkRGF0YSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvU3RydWN0dXJlZERhdGEnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL3BhZ2VzL3NpbmdsZS5zY3NzJztcbmltcG9ydCAnYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2Jsb2Nrcy5zY3NzJztcbmltcG9ydCAnYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3Bvc3RzLnNjc3MnO1xuY29uc3QgRG9CbG9nID0gKHsgcG9zdCwgaWZyYW1lID0gZmFsc2UsIGxheW91dENsYXNzZXMgPSAoKSA9PiB7IH0gfSkgPT4ge1xuICAgIGlmIChkb0xlbmd0aChwb3N0KSkge1xuICAgICAgICBjb25zdCBoZXJvU2V0dGluZ3MgPSB7XG4gICAgICAgICAgICBwcmV0aXRsZTogcG9zdC5wb3N0X3R5cGVfZGV0YWlscy5wb3N0X3R5cGVfZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgdGl0bGU6IHBvc3QuZmllbGRzLmJsb2dfdGl0bGUsXG4gICAgICAgICAgICBicmVhZGNydW1iczogcG9zdCxcbiAgICAgICAgICAgIHB1Ymxpc2hEYXRlOiBwb3N0LnBvc3RfZGF0ZS5mb3JtYXR0ZWQsXG4gICAgICAgICAgICBjdXN0b21IVE1MOiBSZWFjdC5jcmVhdGVFbGVtZW50KFBvc3REZXRhaWxzLCB7IGF1dGhvcjogcG9zdC5maWVsZHMuYmxvZ19hdXRob3IsIGRlc2NyaXB0aW9uOiBwb3N0LmZpZWxkcy5ibG9nX2Rlc2NyaXB0aW9uIH0pLFxuICAgICAgICAgICAgdXJsOiBob21lVVJMICsgJy8nICsgcG9zdC5wb3N0X3R5cGVfZGV0YWlscy5wb3N0X3R5cGVfc2x1ZyArICcvJyArIHBvc3QucG9zdF9uYW1lLFxuICAgICAgICAgICAgc2hhcmVCYXI6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBTZXQgY2xhc3NlcyBmb3IgPG1haW4+XG4gICAgICAgICAgICBsYXlvdXRDbGFzc2VzKFsnc2luZ2xlLWNvbnRlbnQtaXRlbScsICdzaW5nbGUtJyArIHBvc3QucG9zdF90eXBlX2RldGFpbHMucG9zdF90eXBlXSk7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChTRU9UYWdzLCB7IHBvc3Q6IHBvc3QgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFN0cnVjdHVyZWREYXRhLCB7IHBvc3Q6IHBvc3QgfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlcm8sIHsgLi4uaGVyb1NldHRpbmdzIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImFydGljbGVcIiwgeyBpZDogXCJjb250ZW50LXdyYXBwZXJcIiwgY2xhc3NOYW1lOiBcImNvbnRhaW5lciBvbmUtY29sdW1uXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiLCB7IGlkOiBcIm1haW4tY29udGVudFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHBvc3QuZmllbGRzLmJsb2dfaW1hZ2UgP1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEltYWdlLCB7IGltYWdlOiBwb3N0LmZpZWxkcy5ibG9nX2ltYWdlLCBzaXplOiBcImNpbmVtYV8xMDAwXCIsIGlkOiBcInBvc3QtaW1hZ2VcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0LmZpZWxkcy5ibG9nX2ltYWdlX2NyZWRpdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzTmFtZTogXCJwb3N0LWltYWdlLWNyZWRpdFwiIH0sIHBvc3QuZmllbGRzLmJsb2dfaW1hZ2VfY3JlZGl0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcInBvc3QtY29udGVudFwiIH0sIGRvUGFyc2UocG9zdC5maWVsZHMuYmxvZ19jb250ZW50KSkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUGFuZWxXcmFwcGVyLCB7IHBhbmVsSUQ6IFwicmVjZW50LXBvc3RzLXBhbmVsXCIsIHBhbmVsVHlwZTogXCJhcmNoaXZlXCIsIGNsYXNzZXM6IFsncGFuZWwnLCAncGFuZWwtdHlwZS1hcmNoaXZlJ10sIGhlYWRpbmc6IHsgdGFnOiAnaDInLCB0aXRsZTogJ1JlY2VudCBCbG9ncycgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVjZW50UG9zdHMsIHsgcG9zdFR5cGU6IHBvc3QucG9zdF90eXBlX2RldGFpbHMucG9zdF90eXBlLCBwb3N0SUQ6IHBvc3QuSUQgfSkpKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgRG9CbG9nO1xuIiwiaW1wb3J0IFJlYWN0LCB7IFN1c3BlbnNlLCBsYXp5IH0gZnJvbSAncmVhY3QnO1xuLy8gQmxvY2tcbmNvbnN0IERlZmF1bHRCbG9jayA9IGxhenkoKCkgPT4gaW1wb3J0KCdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvYmxvY2svRGVmYXVsdEJsb2NrJykpO1xuY29uc3QgRG9Db21wYW55QmxvY2sgPSBsYXp5KCgpID0+IGltcG9ydCgnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL2Jsb2NrL0RPQ29tcGFueUJsb2NrJykpO1xuY29uc3QgRG9FdmVudEJsb2NrID0gbGF6eSgoKSA9PiBpbXBvcnQoJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9ibG9jay9ET0V2ZW50QmxvY2snKSk7XG5jb25zdCBEb1N0YWZmQmxvY2sgPSBsYXp5KCgpID0+IGltcG9ydCgnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL2Jsb2NrL0RPU3RhZmZCbG9jaycpKTtcbmNvbnN0IERvTWVkaWFDb3ZlcmFnZUJsb2NrID0gbGF6eSgoKSA9PiBpbXBvcnQoJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9ibG9jay9ET01lZGlhQ292ZXJhZ2VCbG9jaycpKTtcbmNvbnN0IERvUG9kY2FzdEJsb2NrID0gbGF6eSgoKSA9PiBpbXBvcnQoJ3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9ibG9jay9ET1BvZGNhc3RCbG9jaycpKTtcbmNvbnN0IERvUHJlc3NSZWxlYXNlQmxvY2sgPSBsYXp5KCgpID0+IGltcG9ydCgnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL2Jsb2NrL0RPUHJlc3NSZWxlYXNlQmxvY2snKSk7XG4vLyBMaXN0XG5jb25zdCBEZWZhdWx0TGlzdCA9IGxhenkoKCkgPT4gaW1wb3J0KCdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvbGlzdC9EZWZhdWx0TGlzdCcpKTtcbmNvbnN0IERvR2xvc3NhcnlUZXJtTGlzdCA9IGxhenkoKCkgPT4gaW1wb3J0KCdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvbGlzdC9ET0dsb3NzYXJ5VGVybUxpc3QnKSk7XG5jb25zdCBEb1RpbWVsaW5lTGlzdCA9IGxhenkoKCkgPT4gaW1wb3J0KCdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvbGlzdC9ET1RpbWVsaW5lTGlzdCcpKTtcbi8vIFNpbXBsZVxuY29uc3QgRGVmYXVsdFNpbXBsZSA9IGxhenkoKCkgPT4gaW1wb3J0KCdzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvc2ltcGxlL0RlZmF1bHRTaW1wbGUnKSk7XG5jb25zdCBEb0NvbXBhbnlTaW1wbGUgPSBsYXp5KCgpID0+IGltcG9ydCgnc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3NpbXBsZS9ET0NvbXBhbnlTaW1wbGUnKSk7XG5jb25zdCB0ZW1wbGF0ZXMgPSB7XG4gICAgYmxvY2s6IHtcbiAgICAgICAgZGVmYXVsdDogRGVmYXVsdEJsb2NrLFxuICAgICAgICBkb19jb21wYW55OiBEb0NvbXBhbnlCbG9jayxcbiAgICAgICAgZG9fZXZlbnQ6IERvRXZlbnRCbG9jayxcbiAgICAgICAgZG9fc3RhZmY6IERvU3RhZmZCbG9jayxcbiAgICAgICAgZG9fbWVkaWFfY292ZXJhZ2U6IERvTWVkaWFDb3ZlcmFnZUJsb2NrLFxuICAgICAgICBkb19wb2RjYXN0OiBEb1BvZGNhc3RCbG9jayxcbiAgICAgICAgZG9fcHJlc3NfcmVsZWFzZTogRG9QcmVzc1JlbGVhc2VCbG9jayxcbiAgICB9LFxuICAgIGxpc3Q6IHtcbiAgICAgICAgZGVmYXVsdDogRGVmYXVsdExpc3QsXG4gICAgICAgIGRvX2dsb3NzYXJ5X3Rlcm06IERvR2xvc3NhcnlUZXJtTGlzdCxcbiAgICAgICAgZG9fdGltZWxpbmU6IERvVGltZWxpbmVMaXN0LFxuICAgIH0sXG4gICAgc2ltcGxlOiB7XG4gICAgICAgIGRlZmF1bHQ6IERlZmF1bHRTaW1wbGUsXG4gICAgICAgIGRvX2NvbXBhbnk6IERvQ29tcGFueVNpbXBsZSxcbiAgICB9LFxufTtcbmNvbnN0IFBhcnRpYWxUZW1wbGF0ZUxvYWRlciA9ICh7IGluZGV4LCBwYW5lbFNsaWRlciwgcGVyUm93LCBwb3N0LCB0eXBlID0gJycsIH0pID0+IHtcbiAgICAvLyBTZWxlY3QgdGhlIGNvcnJlY3QgdGVtcGxhdGUgdHlwZS4gRGVmYXVsdCBpcyBibG9ja1xuICAgIGNvbnN0IGZpbmFsVHlwZSA9IHRlbXBsYXRlc1t0eXBlXSA/IHRlbXBsYXRlc1t0eXBlXSA6IHRlbXBsYXRlcy5ibG9jaztcbiAgICBjb25zdCBUZW1wbGF0ZU5hbWUgPSBmaW5hbFR5cGVbcG9zdC5wb3N0X3R5cGVdID8gZmluYWxUeXBlW3Bvc3QucG9zdF90eXBlXSA6IGZpbmFsVHlwZS5kZWZhdWx0O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChTdXNwZW5zZSwgeyBmYWxsYmFjazogXCJcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRlbXBsYXRlTmFtZSwgeyBpbmRleDogaW5kZXgsIHBhbmVsU2xpZGVyOiBwYW5lbFNsaWRlciwgcGVyUm93OiBwZXJSb3csIHBvc3Q6IHBvc3QsIHR5cGU6IHR5cGUgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBQYXJ0aWFsVGVtcGxhdGVMb2FkZXI7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI2Mzc2ODQwXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzY5NjhcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3Njg1OVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI2Mzc3MDAzXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzY4NjFcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIl0sIm5hbWVzIjpbIlJlYWN0IiwiZG9MZW5ndGgiLCJCYWNrZ3JvdW5kVmlkZW8iLCJIZWFkaW5nIiwiUGFuZWxXcmFwcGVyIiwiX3JlZiIsImJhY2tncm91bmQiLCJiYWNrZ3JvdW5kVmlkZW8iLCJfcmVmJGNsYXNzZXMiLCJjbGFzc2VzIiwiY2hpbGRyZW4iLCJfcmVmJGNvcHkiLCJjb3B5IiwiX3JlZiRjb3B5UGFyYWxsYXgiLCJjb3B5UGFyYWxsYXgiLCJjdGEiLCJmZWF0dXJlZFNldHRpbmdzIiwiX3JlZiRoZWFkaW5nIiwiaGVhZGluZyIsIl9yZWYkaGVhZGVyUGFyYWxsYXgiLCJoZWFkZXJQYXJhbGxheCIsIl9yZWYkcGFuZWxJRCIsInBhbmVsSUQiLCJfcmVmJHBhbmVsVHlwZSIsInBhbmVsVHlwZSIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImNsYXNzTmFtZSIsImpvaW4iLCJfb2JqZWN0U3ByZWFkIiwidGl0bGUiLCJkb1BhcnNlIiwiUG9zdERldGFpbHMiLCJhdXRob3IiLCJwb2RjYXN0U2VyaWVzIiwiZGVzY3JpcHRpb24iLCJjb25zb2xlIiwibG9nIiwiX3dwJGVsZW1lbnQiLCJ3cCIsImVsZW1lbnQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImRvR2V0QXJjaGl2ZVBvc3RzIiwiQ1RBIiwiU2xpZGVyTmF2IiwiUGFydGlhbFRlbXBsYXRlTG9hZGVyIiwiUmVjZW50UG9zdHMiLCJfcmVmJGNvdW50IiwiY291bnQiLCJwb3N0SUQiLCJfcmVmJHBvc3RUeXBlIiwicG9zdFR5cGUiLCJfcmVmJHNsaWRlciIsInNsaWRlciIsIl9yZWYkdHlwZSIsInR5cGUiLCJwb3N0c0FyZ3MiLCJwb3N0X3R5cGUiLCJwb3N0c19wZXJfcGFnZSIsIm9yZGVyYnkiLCJwb3N0X19ub3RfaW4iLCJub3BhZ2luZyIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsInJlY2VudFBvc3RzIiwic2V0UmVjZW50UG9zdHMiLCJmZXRjaERhdGEiLCJfZmV0Y2hEYXRhIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJ0aGVuIiwiZGF0YSIsImpzb24iLCJzdG9wIiwiUG9zdHMiLCJtYXAiLCJwb3N0IiwiaW5kZXgiLCJjdGFTZXR0aW5ncyIsInVybCIsInBlcm1hbGluayIsInBvc3RfdGl0bGUiLCJrZXkiLCJwZXJSb3ciLCJwYW5lbFNsaWRlciIsIkZyYWdtZW50IiwiZG90TmF2IiwibGVuZ3RoIiwiX3JlZiRkb3ROYXYiLCJfcmVmJGxlbmd0aCIsImhyZWYiLCJkb3RzIiwiaSIsInB1c2giLCJIZWxtZXQiLCJTdHJ1Y3R1cmVkRGF0YSIsInNjaGVtYSIsIkpTT04iLCJzdHJpbmdpZnkiLCJIZXJvIiwiSW1hZ2UiLCJTRU9UYWdzIiwiRG9CbG9nIiwiX3JlZiRpZnJhbWUiLCJpZnJhbWUiLCJfcmVmJGxheW91dENsYXNzZXMiLCJsYXlvdXRDbGFzc2VzIiwiaGVyb1NldHRpbmdzIiwicHJldGl0bGUiLCJwb3N0X3R5cGVfZGV0YWlscyIsInBvc3RfdHlwZV9kaXNwbGF5X25hbWUiLCJmaWVsZHMiLCJibG9nX3RpdGxlIiwiYnJlYWRjcnVtYnMiLCJwdWJsaXNoRGF0ZSIsInBvc3RfZGF0ZSIsImZvcm1hdHRlZCIsImN1c3RvbUhUTUwiLCJibG9nX2F1dGhvciIsImJsb2dfZGVzY3JpcHRpb24iLCJob21lVVJMIiwicG9zdF90eXBlX3NsdWciLCJwb3N0X25hbWUiLCJzaGFyZUJhciIsImJsb2dfaW1hZ2UiLCJpbWFnZSIsInNpemUiLCJibG9nX2ltYWdlX2NyZWRpdCIsImJsb2dfY29udGVudCIsInRhZyIsIklEIiwiU3VzcGVuc2UiLCJsYXp5IiwiRGVmYXVsdEJsb2NrIiwiRG9Db21wYW55QmxvY2siLCJEb0V2ZW50QmxvY2siLCJEb1N0YWZmQmxvY2siLCJEb01lZGlhQ292ZXJhZ2VCbG9jayIsIkRvUG9kY2FzdEJsb2NrIiwiRG9QcmVzc1JlbGVhc2VCbG9jayIsIkRlZmF1bHRMaXN0IiwiRG9HbG9zc2FyeVRlcm1MaXN0IiwiRG9UaW1lbGluZUxpc3QiLCJEZWZhdWx0U2ltcGxlIiwiRG9Db21wYW55U2ltcGxlIiwidGVtcGxhdGVzIiwiYmxvY2siLCJkZWZhdWx0IiwiZG9fY29tcGFueSIsImRvX2V2ZW50IiwiZG9fc3RhZmYiLCJkb19tZWRpYV9jb3ZlcmFnZSIsImRvX3BvZGNhc3QiLCJkb19wcmVzc19yZWxlYXNlIiwibGlzdCIsImRvX2dsb3NzYXJ5X3Rlcm0iLCJkb190aW1lbGluZSIsInNpbXBsZSIsImZpbmFsVHlwZSIsIlRlbXBsYXRlTmFtZSIsImZhbGxiYWNrIl0sInNvdXJjZVJvb3QiOiIifQ==