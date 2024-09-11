"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[2],{

/***/ 3394:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ single_DoBlog; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(7363);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./src/utils/helpers/index.ts + 23 modules
var helpers = __webpack_require__(3676);
// EXTERNAL MODULE: ./src/components/shared/Hero.tsx + 4 modules
var Hero = __webpack_require__(7637);
// EXTERNAL MODULE: ./src/components/shared/Image.tsx
var Image = __webpack_require__(2212);
// EXTERNAL MODULE: ./src/components/shared/BackgroundVideo.tsx + 1 modules
var BackgroundVideo = __webpack_require__(5008);
// EXTERNAL MODULE: ./src/components/shared/Heading.tsx + 1 modules
var Heading = __webpack_require__(2243);
;// CONCATENATED MODULE: ./src/components/layout/PanelWrapper.tsx

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }





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
  return external_React_default().createElement("section", {
    id: panelID,
    className: (0,helpers/* doLength */.dk)(classes) ? classes.join(' ') : ''
  }, external_React_default().createElement("div", _objectSpread({
    className: 'panel-inner-wrapper' + (panelType == 'linear-content' ? '' : ' container')
  }, featuredSettings), heading && (0,helpers/* doLength */.dk)(heading.title) || (0,helpers/* doLength */.dk)(backgroundVideo) ? external_React_default().createElement("header", _objectSpread({
    className: 'panel-header' + ((0,helpers/* doLength */.dk)(cta) ? ' has-cta' : '')
  }, headerParallax), external_React_default().createElement(BackgroundVideo/* default */.Z, _objectSpread(_objectSpread({}, backgroundVideo), {}, {
    id: panelID + '-video'
  })), external_React_default().createElement(Heading/* default */.Z, _objectSpread({}, heading))) : null, (0,helpers/* doLength */.dk)(copy) ? external_React_default().createElement("div", _objectSpread({
    className: "panel-copy-wrapper"
  }, copyParallax), copy) : null, children));
};
/* harmony default export */ var layout_PanelWrapper = (PanelWrapper);
;// CONCATENATED MODULE: ./src/components/shared/PostDetails.tsx


// Post Details Display Component
var PostDetails = function PostDetails(_ref) {
  var author = _ref.author,
    podcastSeries = _ref.podcastSeries,
    description = _ref.description;
  return external_React_default().createElement("div", {
    id: "post-details"
  }, author ? external_React_default().createElement("p", {
    className: "author"
  }, external_React_default().createElement("span", null, "By "), author) : null, podcastSeries ? external_React_default().createElement("p", {
    className: "podcast-series"
  }, podcastSeries) : null, description ? (0,helpers/* doParse */.sg)(description) : null);
};
/* harmony default export */ var shared_PostDetails = (PostDetails);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5861);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(1037);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4687);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./src/utils/api/index.ts + 12 modules
var api = __webpack_require__(9015);
// EXTERNAL MODULE: ./src/components/shared/CTA.tsx
var CTA = __webpack_require__(6643);
;// CONCATENATED MODULE: ./src/components/shared/SliderNav.tsx


var SliderNav = function SliderNav(_ref) {
  var _ref$dotNav = _ref.dotNav,
    dotNav = _ref$dotNav === void 0 ? false : _ref$dotNav,
    _ref$length = _ref.length,
    length = _ref$length === void 0 ? 0 : _ref$length;
  return external_React_default().createElement((external_React_default()).Fragment, null, external_React_default().createElement("a", {
    className: "slider-buttons btn-previous",
    href: "#",
    "uk-slidenav-previous": "",
    "uk-slider-item": "previous"
  }, external_React_default().createElement("span", {
    className: "screen-reader-text"
  }, "Previous")), external_React_default().createElement("a", {
    className: "slider-buttons btn-next",
    href: "#",
    "uk-slidenav-next": "",
    "uk-slider-item": "next"
  }, external_React_default().createElement("span", {
    className: "screen-reader-text"
  }, "Next")), dotNav === true ? external_React_default().createElement("ul", {
    className: "uk-slider-nav uk-dotnav uk-flex-center uk-margin"
  }, function () {
    var dots = [];
    for (var i = 0; i < length; i++) {
      dots.push(external_React_default().createElement("li", {
        key: i,
        "uk-slider-item": i,
        className: i === 0 ? 'uk-active' : ''
      }, external_React_default().createElement("a", {
        href: "#"
      }, external_React_default().createElement("span", {
        className: "screen-reader-text"
      }, i + 1))));
    }
    return dots;
  }()) : null);
};
/* harmony default export */ var shared_SliderNav = (SliderNav);
;// CONCATENATED MODULE: ./src/loaders/PartialTemplateLoader.tsx

// Block
var DefaultBlock = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 16).then(__webpack_require__.bind(__webpack_require__, 8202));
});
var DoCompanyBlock = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 9).then(__webpack_require__.bind(__webpack_require__, 3186));
});
var DoEventBlock = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 17).then(__webpack_require__.bind(__webpack_require__, 8210));
});
var DoStaffBlock = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 12).then(__webpack_require__.bind(__webpack_require__, 5647));
});
var DoMediaCoverageBlock = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 19).then(__webpack_require__.bind(__webpack_require__, 9756));
});
var DoPodcastBlock = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 18).then(__webpack_require__.bind(__webpack_require__, 8412));
});
var DoPressReleaseBlock = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 11).then(__webpack_require__.bind(__webpack_require__, 4085));
});
// List
var DefaultList = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 13).then(__webpack_require__.bind(__webpack_require__, 5699));
});
var DoGlossaryTermList = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 14).then(__webpack_require__.bind(__webpack_require__, 6082));
});
var DoTimelineList = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 15).then(__webpack_require__.bind(__webpack_require__, 7589));
});
// Simple
var DefaultSimple = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 10).then(__webpack_require__.bind(__webpack_require__, 3921));
});
var DoCompanySimple = (0,external_React_.lazy)(function () {
  return __webpack_require__.e(/* import() */ 8).then(__webpack_require__.bind(__webpack_require__, 603));
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
  return external_React_default().createElement(external_React_.Suspense, {
    fallback: ""
  }, external_React_default().createElement(TemplateName, {
    index: index,
    panelSlider: panelSlider,
    perRow: perRow,
    post: post,
    type: type
  }));
};
/* harmony default export */ var loaders_PartialTemplateLoader = (PartialTemplateLoader);
;// CONCATENATED MODULE: ./src/components/shared/RecentPosts.tsx



function RecentPosts_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function RecentPosts_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? RecentPosts_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : RecentPosts_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


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
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    recentPosts = _useState2[0],
    setRecentPosts = _useState2[1];
  useEffect(function () {
    function fetchData() {
      return _fetchData.apply(this, arguments);
    }
    function _fetchData() {
      _fetchData = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0,api/* doGetArchivePosts */.nH)(postsArgs).then(function (data) {
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
    return external_React_default().createElement("ul", {
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
        return external_React_default().createElement("li", {
          key: index
        }, external_React_default().createElement(CTA/* default */.Z, RecentPosts_objectSpread({}, ctaSettings), (0,helpers/* doParse */.sg)(post.post_title)));
      } else {
        return external_React_default().createElement(loaders_PartialTemplateLoader, {
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
  if ((0,helpers/* doLength */.dk)(recentPosts)) {
    return external_React_default().createElement((external_React_default()).Fragment, null, slider ? external_React_default().createElement("div", {
      className: "panel-slider-wrapper",
      "uk-slider": "finite: true"
    }, external_React_default().createElement(Posts, null), external_React_default().createElement(shared_SliderNav, {
      dotNav: false,
      length: (0,helpers/* doLength */.dk)(recentPosts)
    })) : external_React_default().createElement(Posts, null));
  } else {
    return null;
  }
};
/* harmony default export */ var shared_RecentPosts = (RecentPosts);
// EXTERNAL MODULE: ./src/components/shared/SEOTags.tsx
var SEOTags = __webpack_require__(826);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(4593);
;// CONCATENATED MODULE: ./src/components/shared/StructuredData.tsx



var StructuredData = function StructuredData(_ref) {
  var post = _ref.post;
  if ((0,helpers/* doLength */.dk)(post) && post.schema) {
    return external_React_default().createElement(Helmet/* Helmet */.q, null, external_React_default().createElement("script", {
      type: "application/ld+json"
    }, JSON.stringify(post.schema)));
  } else {
    return null;
  }
};
/* harmony default export */ var shared_StructuredData = (StructuredData);
;// CONCATENATED MODULE: ./src/components/templates/single/DoBlog.tsx

function DoBlog_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function DoBlog_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? DoBlog_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : DoBlog_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

var DoBlog_useEffect = wp.element.useEffect;

// import CustomCTA from 'src/components/shared/CustomCTA';










var DoBlog = function DoBlog(_ref) {
  var post = _ref.post,
    _ref$iframe = _ref.iframe,
    iframe = _ref$iframe === void 0 ? false : _ref$iframe,
    _ref$layoutClasses = _ref.layoutClasses,
    layoutClasses = _ref$layoutClasses === void 0 ? function () {} : _ref$layoutClasses;
  if ((0,helpers/* doLength */.dk)(post)) {
    var heroSettings = {
      pretitle: post.post_type_details.post_type_display_name,
      title: post.fields.blog_title,
      breadcrumbs: post,
      publishDate: post.post_date.formatted,
      customHTML: external_React_default().createElement(shared_PostDetails, {
        author: post.fields.blog_author,
        description: post.fields.blog_description
      }),
      url: homeURL + '/' + post.post_type_details.post_type_slug + '/' + post.post_name,
      shareBar: true
    };
    DoBlog_useEffect(function () {
      // Set classes for <main>
      layoutClasses(['single-content-item', 'single-' + post.post_type_details.post_type]);
    }, []);
    return external_React_default().createElement((external_React_default()).Fragment, null, external_React_default().createElement(SEOTags/* default */.Z, {
      post: post
    }), external_React_default().createElement(shared_StructuredData, {
      post: post
    }), external_React_default().createElement(Hero/* default */.Z, DoBlog_objectSpread({}, heroSettings)), external_React_default().createElement("article", {
      id: "content-wrapper",
      className: "container one-column"
    }, external_React_default().createElement("section", {
      id: "main-content"
    }, post.fields.blog_image ? external_React_default().createElement((external_React_default()).Fragment, null, external_React_default().createElement(Image/* default */.Z, {
      image: post.fields.blog_image,
      size: "cinema_1000",
      id: "post-image"
    }), post.fields.blog_image_credit && external_React_default().createElement("span", {
      className: "post-image-credit"
    }, post.fields.blog_image_credit)) : null, external_React_default().createElement("div", {
      id: "post-content"
    }, (0,helpers/* doParse */.sg)(post.fields.blog_content)))), external_React_default().createElement(layout_PanelWrapper, {
      panelID: "recent-posts-panel",
      panelType: "archive",
      classes: ['panel', 'panel-type-archive'],
      heading: {
        tag: 'h2',
        title: 'Recent Blogs'
      }
    }, external_React_default().createElement(shared_RecentPosts, {
      postType: post.post_type_details.post_type,
      postID: post.ID
    })));
  } else {
    return null;
  }
};
/* harmony default export */ var single_DoBlog = (DoBlog);

/***/ })

}]);
//# sourceMappingURL=2.bundle.js.map?v=1726017769337