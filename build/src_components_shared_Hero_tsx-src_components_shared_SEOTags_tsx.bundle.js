"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_shared_Hero_tsx-src_components_shared_SEOTags_tsx"],{

/***/ "./src/components/shared/BackgroundVideo.tsx":
/*!***************************************************!*\
  !*** ./src/components/shared/BackgroundVideo.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_components_shared_BackgroundVideoControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/BackgroundVideoControls */ "./src/components/shared/BackgroundVideoControls.tsx");
/* harmony import */ var assets_styles_components_background_videos_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/styles/components/background-videos.scss */ "./assets/styles/components/background-videos.scss");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



var BackgroundVideo = function BackgroundVideo(_ref) {
  var animated = _ref.animated,
    avatar = _ref.avatar,
    color = _ref.color,
    id = _ref.id;
  if (avatar && animated && color) {
    var media = templateDirectory + '/images/avatar/avatar-' + color + '.mp4';
    var jpg = media.replace('.mp4', '.jpg');
    var webm = media.replace('.mp4', '.webm');
    var videoAttributes = {
      autoPlay: true,
      controls: false,
      muted: true,
      playsInline: true,
      id: id,
      poster: jpg,
      loop: true
    };
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "background-video-wrapper has-avatar"
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("video", _objectSpread({}, videoAttributes), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("source", {
      src: webm,
      type: "video/webm"
    }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("source", {
      src: media,
      type: "video/mp4"
    }))), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_BackgroundVideoControls__WEBPACK_IMPORTED_MODULE_2__["default"], {
      videoID: id
    }));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (BackgroundVideo);

/***/ }),

/***/ "./src/components/shared/BackgroundVideoControls.tsx":
/*!***********************************************************!*\
  !*** ./src/components/shared/BackgroundVideoControls.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var _wp$element = wp.element,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;
var BackgroundVideoControls = function BackgroundVideoControls(_ref) {
  var videoID = _ref.videoID;
  var _useState = useState(null),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    video = _useState2[0],
    setVideo = _useState2[1];
  useEffect(function () {
    setVideo(videoID ? document.getElementById(videoID) : null);
  }, []);
  if (video) {
    var controlsID = 'do-controls-' + videoID;
    video.removeAttribute('controls');
    // Add event listeners
    //video.addEventListener( 'ended', onended );
    var playPauseOnclick = function playPauseOnclick(e) {
      var playPauseButton = e.target;
      if (video.paused) {
        video.play();
        playPauseButton.classList.remove('play');
        playPauseButton.classList.add('pause');
        playPauseButton.innerHTML = '<span>Pause</span>';
      } else {
        video.pause();
        playPauseButton.classList.remove('pause');
        playPauseButton.classList.add('play');
        playPauseButton.innerHTML = '<span>Play</span>';
      }
    };
    var rewindOnclick = function rewindOnclick(e) {
      video.currentTime -= 3;
    };
    var forwardOnclick = function forwardOnclick(e) {
      video.currentTime += 3;
    };
    // const onended = ( e ) => {
    //     const playPauseButton = '';
    //     playPauseButton.classList.remove( 'pause' );
    //     playPauseButton.classList.add( 'play' );
    //     playPauseButton.innerHTML = '<span>Play</span>';
    // }
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "do-controls-wrapper",
      id: controlsID + '-wrapper'
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
      className: "do-control rewind",
      id: controlsID + '-rewind',
      onClick: function onClick(e) {
        return rewindOnclick;
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "Rewind")), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
      className: "do-control pause",
      id: controlsID + '-playpause',
      onClick: function onClick(e) {
        return playPauseOnclick;
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "Pause")), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
      className: "do-control forward",
      id: controlsID + '-forward',
      onClick: function onClick(e) {
        return forwardOnclick;
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "Forward")));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (BackgroundVideoControls);

/***/ }),

/***/ "./src/components/shared/Breadcrumbs.tsx":
/*!***********************************************!*\
  !*** ./src/components/shared/Breadcrumbs.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var assets_styles_components_breadcrumbs_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/styles/components/breadcrumbs.scss */ "./assets/styles/components/breadcrumbs.scss");




var Breadcrumbs = function Breadcrumbs(_ref) {
  var post = _ref.post;
  var breadcrumbs;
  // Set in post type
  if (post.post_type_details.breadcrumbs && (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.doLength)(post.post_type_details.breadcrumbs)) {
    breadcrumbs = post.post_type_details.breadcrumbs;
  }
  // Set in admin
  else {
    var metaPrefix = post.post_type_details.meta_prefix;
    breadcrumbs = post.fields[metaPrefix + '_breadcrumbs'] ? post.fields[metaPrefix + '_breadcrumbs'] : [];
  }
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__.doLength)(breadcrumbs)) {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
      id: "breadcrumbs"
    }, breadcrumbs.map(function (crumb, index) {
      var text = crumb.text;
      var url = crumb.url;
      return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
        key: index
      }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__["default"], {
        key: index,
        url: url
      }, text));
    }));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Breadcrumbs);

/***/ }),

/***/ "./src/components/shared/CTAs.tsx":
/*!****************************************!*\
  !*** ./src/components/shared/CTAs.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


var CTAs = function CTAs(_ref) {
  var ctas = _ref.ctas;
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", {
    className: "panel-cta"
  }, (Array.isArray(ctas) ? ctas : [ctas]).map(function (cta, index) {
    var ctaText = cta.text ? cta.text : '';
    var ctaURL = cta.url ? cta.url : '';
    var ctaModal = cta.modal ? cta.modal : false;
    var ctaClasses = cta.buttonStyle ? ['button', cta.buttonStyle] : ['button'];
    var ctaModalClass = cta.modalClass ? cta.modalClass : '';
    var ctaSettings = {
      url: ctaURL,
      text: ctaText,
      modal: ctaModal,
      modalClass: ctaModalClass,
      classes: ctaClasses
    };
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({
      key: index
    }, ctaSettings));
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (CTAs);

/***/ }),

/***/ "./src/components/shared/Heading.tsx":
/*!*******************************************!*\
  !*** ./src/components/shared/Heading.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_CTAs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/CTAs */ "./src/components/shared/CTAs.tsx");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }




var Heading = function Heading(_ref) {
  var _ref$align = _ref.align,
    align = _ref$align === void 0 ? '' : _ref$align,
    _ref$classes = _ref.classes,
    classes = _ref$classes === void 0 ? [] : _ref$classes,
    _ref$cta = _ref.cta,
    cta = _ref$cta === void 0 ? [] : _ref$cta,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? '' : _ref$id,
    _ref$pretitle = _ref.pretitle,
    pretitle = _ref$pretitle === void 0 ? '' : _ref$pretitle,
    _ref$publishDate = _ref.publishDate,
    publishDate = _ref$publishDate === void 0 ? '' : _ref$publishDate,
    _ref$tag = _ref.tag,
    tag = _ref$tag === void 0 ? 'h2' : _ref$tag,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$url = _ref.url,
    url = _ref$url === void 0 ? '' : _ref$url;
  var Tag = (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doTrimChar)(tag, '<>');
  var hasPretitle = Boolean((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(pretitle));
  var hasPublishDate = Boolean((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(publishDate));
  // Either has-date OR has-pretitle, not both
  if (hasPublishDate) {
    classes.push('has-date');
  } else if (hasPretitle) {
    classes.push('has-pretitle');
  }
  if (align) {
    classes.push('text-align-' + align);
  }
  var tagAttributes = {
    className: classes.join(' ')
  };
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(id)) {
    tagAttributes.id = id;
  }
  if (!hasPublishDate) {
    tagAttributes['data-pretitle'] = pretitle;
  }
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Tag, _objectSpread(_objectSpread({}, tagAttributes), {}, {
    "data-aos": "fade-in"
  }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_3__["default"], {
    url: url
  }, hasPublishDate ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: "heading-title"
  }, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doParse)(title)), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: "heading-pretitle"
  }, pretitle), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: "heading-publish-date"
  }, publishDate)) : title)), (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(cta) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTAs__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ctas: cta
  }) : null);
};
/* harmony default export */ __webpack_exports__["default"] = (Heading);

/***/ }),

/***/ "./src/components/shared/Hero.tsx":
/*!****************************************!*\
  !*** ./src/components/shared/Hero.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ "./node_modules/react-dom/server.browser.js");
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_BackgroundVideo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/BackgroundVideo */ "./src/components/shared/BackgroundVideo.tsx");
/* harmony import */ var src_components_shared_Breadcrumbs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/shared/Breadcrumbs */ "./src/components/shared/Breadcrumbs.tsx");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_MediaLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/components/shared/MediaLoader */ "./src/components/shared/MediaLoader.tsx");
/* harmony import */ var src_components_shared_ShareBar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/components/shared/ShareBar */ "./src/components/shared/ShareBar.tsx");
/* harmony import */ var assets_styles_components_hero_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! assets/styles/components/hero.scss */ "./assets/styles/components/hero.scss");

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
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doLength)(backgroundSettings)) {
    classes.push('has-background');
  }
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doLength)(copy)) {
    classes.push('has-copy');
  }
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doLength)(media)) {
    classes.push('has-media');
  }
  var heroBackground = (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doBackgroundImage)(backgroundSettings, classes);
  var headingSettings = {
    tag: 'h1',
    pretitle: pretitle,
    title: title,
    subtitle: subtitle,
    publishDate: publishDate
  };
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("header", _objectSpread({
    id: id
  }, heroBackground), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_BackgroundVideo__WEBPACK_IMPORTED_MODULE_4__["default"], _objectSpread(_objectSpread({}, backgroundSettings), {}, {
    id: "hero-background"
  })), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "hero-container container"
  }, breadcrumbs ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Breadcrumbs__WEBPACK_IMPORTED_MODULE_5__["default"], {
    post: breadcrumbs
  }) : null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "hero-text-wrapper"
  }, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doLength)(title) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_7__["default"], _objectSpread({}, headingSettings)) : null, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doLength)(copy) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doParse)(copy)) : null, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doLength)(ctas) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", {
    id: "hero-cta"
  }, ctas.map(function (cta, index) {
    var ctaSettings = {
      url: cta.url,
      text: cta.text,
      modal: cta.modal,
      modalClass: cta.modalClass,
      classes: cta.buttonStyle ? ['button', cta.buttonStyle] : ['button']
    };
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_6__["default"], _objectSpread({
      key: index
    }, ctaSettings));
  })) : null, customHTML ? (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doParse)(react_dom_server__WEBPACK_IMPORTED_MODULE_2__.renderToStaticMarkup(customHTML)) : null), (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doLength)(media) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "hero-media-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_6__["default"], {
    url: imageLink.url,
    modal: imageLink.modal,
    classes: []
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_MediaLoader__WEBPACK_IMPORTED_MODULE_8__["default"], {
    media: media,
    size: "square_600",
    loop: mediaLoop
  }))) : null, customHTMLAfter ? customHTMLAfter : null, shareBar ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_ShareBar__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: title,
    url: url
  }) : null));
};
/* harmony default export */ __webpack_exports__["default"] = (Hero);

/***/ }),

/***/ "./src/components/shared/MediaLoader.tsx":
/*!***********************************************!*\
  !*** ./src/components/shared/MediaLoader.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");
/* harmony import */ var src_components_shared_Video__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/Video */ "./src/components/shared/Video.tsx");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



var MediaLoader = function MediaLoader(props) {
  var media = props.media;
  var mediaType = media.type;
  if (mediaType === 'image' || mediaType === 'icon') {
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({
      image: media
    }, props));
  } else if (mediaType === 'video') {
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Video__WEBPACK_IMPORTED_MODULE_3__["default"], _objectSpread({
      url: media.url
    }, props));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (MediaLoader);

/***/ }),

/***/ "./src/components/shared/SEOTags.tsx":
/*!*******************************************!*\
  !*** ./src/components/shared/SEOTags.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");



var SEOTags = function SEOTags(_ref) {
  var post = _ref.post;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__.Helmet, null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title", null, post.seo_title ? (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doParse)(post.seo_title) : (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doParse)(post.post_title)), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("link", {
    rel: "canonical",
    href: post.seo_url ? post.seo_url : post.guid
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:locale",
    content: post.seo_locale ? post.seo_locale : ''
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:type",
    content: "website"
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:title",
    content: post.seo_title ? post.seo_title : post.post_title
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:description",
    content: post.seo_description
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "description",
    content: post.seo_description
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:url",
    content: post.seo_url ? post.seo_url : post.guid
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:site_name",
    content: post.seo_site_name ? post.seo_site_name : '{DevelopersOnly}'
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:image",
    content: post.seo_image ? post.seo_image : ''
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "robots",
    content: post.noindex ? post.noindex : 'index, follow'
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (SEOTags);

/***/ }),

/***/ "./src/components/shared/ShareBar.tsx":
/*!********************************************!*\
  !*** ./src/components/shared/ShareBar.tsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var assets_styles_components_share_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! assets/styles/components/share.scss */ "./assets/styles/components/share.scss");



var ShareBar = function ShareBar(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$url = _ref.url,
    url = _ref$url === void 0 ? '' : _ref$url;
  var facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  var twitterLink = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
  var linkedinLink = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url;
  var mailLink = 'mailto:?subject=' + title + '&body=' + url;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "do-share-bar",
    "data-label": "Share"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: ['do-fa', 'fa-facebook-f'],
    text: "Facebook",
    url: facebookLink
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: ['do-fa', 'fa-twitter'],
    text: "Twitter",
    url: twitterLink
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: ['do-fa', 'fa-linkedin'],
    text: "LinkedIn",
    url: linkedinLink
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: ['do-fa', 'fa-envelope'],
    text: "Email",
    url: mailLink
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (ShareBar);

/***/ }),

/***/ "./src/components/shared/Video.tsx":
/*!*****************************************!*\
  !*** ./src/components/shared/Video.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var assets_styles_components_videos_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! assets/styles/components/videos.scss */ "./assets/styles/components/videos.scss");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

var _wp$element = wp.element,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;



var Video = function Video(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? '' : _ref$id,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? 'Watch' : _ref$label,
    _ref$loop = _ref.loop,
    loop = _ref$loop === void 0 ? false : _ref$loop,
    _ref$playerNumber = _ref.playerNumber,
    playerNumber = _ref$playerNumber === void 0 ? Math.floor(Math.random() * 1000) : _ref$playerNumber,
    timestamp = _ref.timestamp,
    url = _ref.url,
    _ref$videoDataAttr = _ref.videoDataAttr,
    videoDataAttr = _ref$videoDataAttr === void 0 ? {} : _ref$videoDataAttr,
    width = _ref.width;
  var _useState = useState(undefined),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    videoURL = _useState2[0],
    setVideoURL = _useState2[1];
  useEffect(function () {
    setVideoURL(url);
  }, [url]);
  if (videoURL) {
    var type = (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doVideoType)(videoURL);
    var videoEmbedURL = type == 'streaming' ? (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.doVideoEmbedURL)(videoURL) : '';
    var webmFile = videoURL.replace('.mp4', '.webm');
    var webm = type == 'embed' && webmFile.length ? webmFile : '';
    var posterFile = videoURL.replace('.mp4', '.jpg');
    var poster = type == 'embed' && posterFile.length ? posterFile : '';
    if (width) {
      videoDataAttr.style = {
        'max-width': width
      };
    }
    if (id) {
      videoDataAttr.id = id;
    }
    var VideoElement = function VideoElement() {
      if (type == 'streaming') {
        return react__WEBPACK_IMPORTED_MODULE_2___default().createElement("iframe", {
          src: videoEmbedURL,
          allowFullScreen: true
        }, react__WEBPACK_IMPORTED_MODULE_2___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_4__["default"], {
          url: videoEmbedURL,
          target: "_blank",
          text: label
        }, label));
      } else if (type == 'embed') {
        var videoAttributes = {
          autoPlay: true,
          controls: false,
          muted: true,
          playsInline: true,
          poster: poster,
          loop: true
        };
        return react__WEBPACK_IMPORTED_MODULE_2___default().createElement("video", _objectSpread({}, videoAttributes), react__WEBPACK_IMPORTED_MODULE_2___default().createElement("source", {
          src: webm,
          type: "video/webm"
        }), react__WEBPACK_IMPORTED_MODULE_2___default().createElement("source", {
          src: videoURL,
          type: "video/mp4"
        }));
      } else {
        return null;
      }
    };
    return react__WEBPACK_IMPORTED_MODULE_2___default().createElement("figure", _objectSpread({
      className: 'do-video ' + type
    }, videoDataAttr), react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
      className: "do-video-wrapper"
    }, react__WEBPACK_IMPORTED_MODULE_2___default().createElement(VideoElement, null)));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Video);

/***/ }),

/***/ "./assets/styles/components/background-videos.scss":
/*!*********************************************************!*\
  !*** ./assets/styles/components/background-videos.scss ***!
  \*********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726026376994
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
      // 1726026376992
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
      // 1726026376952
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
      // 1726026376995
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
      // 1726026377015
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfc2hhcmVkX0hlcm9fdHN4LXNyY19jb21wb25lbnRzX3NoYXJlZF9TRU9UYWdzX3RzeC5idW5kbGUuanM/dj0xNzI2MDE3ODQ4NjUxIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUMwRDtBQUMzQjtBQUN6RCxJQUFNRSxlQUFlLEdBQUcsU0FBbEJBLGVBQWVBLENBQUFDLElBQUEsRUFBd0M7RUFBQSxJQUFsQ0MsUUFBUSxHQUFBRCxJQUFBLENBQVJDLFFBQVE7SUFBRUMsTUFBTSxHQUFBRixJQUFBLENBQU5FLE1BQU07SUFBRUMsS0FBSyxHQUFBSCxJQUFBLENBQUxHLEtBQUs7SUFBRUMsRUFBRSxHQUFBSixJQUFBLENBQUZJLEVBQUU7RUFDbEQsSUFBSUYsTUFBTSxJQUFJRCxRQUFRLElBQUlFLEtBQUssRUFBRTtJQUM3QixJQUFNRSxLQUFLLEdBQUdDLGlCQUFpQixHQUFHLHdCQUF3QixHQUFHSCxLQUFLLEdBQUcsTUFBTTtJQUMzRSxJQUFNSSxHQUFHLEdBQUdGLEtBQUssQ0FBQ0csT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDekMsSUFBTUMsSUFBSSxHQUFHSixLQUFLLENBQUNHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO0lBQzNDLElBQU1FLGVBQWUsR0FBRztNQUNwQkMsUUFBUSxFQUFFLElBQUk7TUFDZEMsUUFBUSxFQUFFLEtBQUs7TUFDZkMsS0FBSyxFQUFFLElBQUk7TUFDWEMsV0FBVyxFQUFFLElBQUk7TUFDakJWLEVBQUUsRUFBRUEsRUFBRTtNQUNOVyxNQUFNLEVBQUVSLEdBQUc7TUFDWFMsSUFBSSxFQUFFO0lBQ1YsQ0FBQztJQUNELE9BQVFuQiwwREFBbUIsQ0FBQ0EsdURBQWMsRUFBRSxJQUFJLEVBQzVDQSwwREFBbUIsQ0FBQyxLQUFLLEVBQUU7TUFBRXNCLFNBQVMsRUFBRTtJQUFzQyxDQUFDLEVBQzNFdEIsMERBQW1CLENBQUMsT0FBTyxFQUFBdUIsYUFBQSxL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QUFlN0MsS0FBSzs7Ozs7Ozs7Ozs7QUNyRHBCO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQywrSkFBZ0YsY0FBYyxlQUFlO0FBQzNJLE1BQU0sVUFBVTtBQUNoQixNQUFNLGlCQUFpQjtBQUN2QjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvc2hhcmVkL0JhY2tncm91bmRWaWRlby50c3giLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvc2hhcmVkL0JhY2tncm91bmRWaWRlb0NvbnRyb2xzLnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy9zaGFyZWQvQnJlYWRjcnVtYnMudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9DVEFzLnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy9zaGFyZWQvSGVhZGluZy50c3giLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvc2hhcmVkL0hlcm8udHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9NZWRpYUxvYWRlci50c3giLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvc2hhcmVkL1NFT1RhZ3MudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9TaGFyZUJhci50c3giLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvc2hhcmVkL1ZpZGVvLnRzeCIsIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9hc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvYmFja2dyb3VuZC12aWRlb3Muc2Nzcz9jODNhIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9icmVhZGNydW1icy5zY3NzP2YzOGYiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL2hlcm8uc2Nzcz9lYThjIiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zaGFyZS5zY3NzPzk2OGUiLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3ZpZGVvcy5zY3NzPzU4MjkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBCYWNrZ3JvdW5kVmlkZW9Db250cm9scyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQmFja2dyb3VuZFZpZGVvQ29udHJvbHMnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvYmFja2dyb3VuZC12aWRlb3Muc2Nzcyc7XG5jb25zdCBCYWNrZ3JvdW5kVmlkZW8gPSAoeyBhbmltYXRlZCwgYXZhdGFyLCBjb2xvciwgaWQgfSkgPT4ge1xuICAgIGlmIChhdmF0YXIgJiYgYW5pbWF0ZWQgJiYgY29sb3IpIHtcbiAgICAgICAgY29uc3QgbWVkaWEgPSB0ZW1wbGF0ZURpcmVjdG9yeSArICcvaW1hZ2VzL2F2YXRhci9hdmF0YXItJyArIGNvbG9yICsgJy5tcDQnO1xuICAgICAgICBjb25zdCBqcGcgPSBtZWRpYS5yZXBsYWNlKCcubXA0JywgJy5qcGcnKTtcbiAgICAgICAgY29uc3Qgd2VibSA9IG1lZGlhLnJlcGxhY2UoJy5tcDQnLCAnLndlYm0nKTtcbiAgICAgICAgY29uc3QgdmlkZW9BdHRyaWJ1dGVzID0ge1xuICAgICAgICAgICAgYXV0b1BsYXk6IHRydWUsXG4gICAgICAgICAgICBjb250cm9sczogZmFsc2UsXG4gICAgICAgICAgICBtdXRlZDogdHJ1ZSxcbiAgICAgICAgICAgIHBsYXlzSW5saW5lOiB0cnVlLFxuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgcG9zdGVyOiBqcGcsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImJhY2tncm91bmQtdmlkZW8td3JhcHBlciBoYXMtYXZhdGFyXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIiwgeyAuLi52aWRlb0F0dHJpYnV0ZXMgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNvdXJjZVwiLCB7IHNyYzogd2VibSwgdHlwZTogXCJ2aWRlby93ZWJtXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIiwgeyBzcmM6IG1lZGlhLCB0eXBlOiBcInZpZGVvL21wNFwiIH0pKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJhY2tncm91bmRWaWRlb0NvbnRyb2xzLCB7IHZpZGVvSUQ6IGlkIH0pKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgQmFja2dyb3VuZFZpZGVvO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmNvbnN0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9ID0gd3AuZWxlbWVudDtcbmNvbnN0IEJhY2tncm91bmRWaWRlb0NvbnRyb2xzID0gKHsgdmlkZW9JRCB9KSA9PiB7XG4gICAgY29uc3QgW3ZpZGVvLCBzZXRWaWRlb10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRWaWRlbyh2aWRlb0lEID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmlkZW9JRCkgOiBudWxsKTtcbiAgICB9LCBbXSk7XG4gICAgaWYgKHZpZGVvKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xzSUQgPSAnZG8tY29udHJvbHMtJyArIHZpZGVvSUQ7XG4gICAgICAgIHZpZGVvLnJlbW92ZUF0dHJpYnV0ZSgnY29udHJvbHMnKTtcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAvL3ZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoICdlbmRlZCcsIG9uZW5kZWQgKTtcbiAgICAgICAgY29uc3QgcGxheVBhdXNlT25jbGljayA9IChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwbGF5UGF1c2VCdXR0b24gPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgICAgICAgICAgcGxheVBhdXNlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXknKTtcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VCdXR0b24uY2xhc3NMaXN0LmFkZCgncGF1c2UnKTtcbiAgICAgICAgICAgICAgICBwbGF5UGF1c2VCdXR0b24uaW5uZXJIVE1MID0gJzxzcGFuPlBhdXNlPC9zcGFuPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZScpO1xuICAgICAgICAgICAgICAgIHBsYXlQYXVzZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdwbGF5Jyk7XG4gICAgICAgICAgICAgICAgcGxheVBhdXNlQnV0dG9uLmlubmVySFRNTCA9ICc8c3Bhbj5QbGF5PC9zcGFuPic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJld2luZE9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgLT0gMztcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZm9yd2FyZE9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgKz0gMztcbiAgICAgICAgfTtcbiAgICAgICAgLy8gY29uc3Qgb25lbmRlZCA9ICggZSApID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnN0IHBsYXlQYXVzZUJ1dHRvbiA9ICcnO1xuICAgICAgICAvLyAgICAgcGxheVBhdXNlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoICdwYXVzZScgKTtcbiAgICAgICAgLy8gICAgIHBsYXlQYXVzZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCAncGxheScgKTtcbiAgICAgICAgLy8gICAgIHBsYXlQYXVzZUJ1dHRvbi5pbm5lckhUTUwgPSAnPHNwYW4+UGxheTwvc3Bhbj4nO1xuICAgICAgICAvLyB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJkby1jb250cm9scy13cmFwcGVyXCIsIGlkOiBjb250cm9sc0lEICsgJy13cmFwcGVyJyB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJkby1jb250cm9sIHJld2luZFwiLCBpZDogY29udHJvbHNJRCArICctcmV3aW5kJywgb25DbGljazogKGUpID0+IHJld2luZE9uY2xpY2sgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIlJld2luZFwiKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImRvLWNvbnRyb2wgcGF1c2VcIiwgaWQ6IGNvbnRyb2xzSUQgKyAnLXBsYXlwYXVzZScsIG9uQ2xpY2s6IChlKSA9PiBwbGF5UGF1c2VPbmNsaWNrIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJQYXVzZVwiKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImRvLWNvbnRyb2wgZm9yd2FyZFwiLCBpZDogY29udHJvbHNJRCArICctZm9yd2FyZCcsIG9uQ2xpY2s6IChlKSA9PiBmb3J3YXJkT25jbGljayB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIFwiRm9yd2FyZFwiKSkpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBCYWNrZ3JvdW5kVmlkZW9Db250cm9scztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBkb0xlbmd0aCB9IGZyb20gJ3NyYy91dGlscy9oZWxwZXJzJztcbmltcG9ydCBDVEEgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0NUQSc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9icmVhZGNydW1icy5zY3NzJztcbmNvbnN0IEJyZWFkY3J1bWJzID0gKHsgcG9zdCB9KSA9PiB7XG4gICAgbGV0IGJyZWFkY3J1bWJzO1xuICAgIC8vIFNldCBpbiBwb3N0IHR5cGVcbiAgICBpZiAocG9zdC5wb3N0X3R5cGVfZGV0YWlscy5icmVhZGNydW1icyAmJiBkb0xlbmd0aChwb3N0LnBvc3RfdHlwZV9kZXRhaWxzLmJyZWFkY3J1bWJzKSkge1xuICAgICAgICBicmVhZGNydW1icyA9IHBvc3QucG9zdF90eXBlX2RldGFpbHMuYnJlYWRjcnVtYnM7XG4gICAgfVxuICAgIC8vIFNldCBpbiBhZG1pblxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBtZXRhUHJlZml4ID0gcG9zdC5wb3N0X3R5cGVfZGV0YWlscy5tZXRhX3ByZWZpeDtcbiAgICAgICAgYnJlYWRjcnVtYnMgPSBwb3N0LmZpZWxkc1ttZXRhUHJlZml4ICsgJ19icmVhZGNydW1icyddID8gcG9zdC5maWVsZHNbbWV0YVByZWZpeCArICdfYnJlYWRjcnVtYnMnXSA6IFtdO1xuICAgIH1cbiAgICBpZiAoZG9MZW5ndGgoYnJlYWRjcnVtYnMpKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHsgaWQ6IFwiYnJlYWRjcnVtYnNcIiB9LCBicmVhZGNydW1icy5tYXAoKGNydW1iLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGNydW1iLnRleHQ7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBjcnVtYi51cmw7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGtleTogaW5kZXggfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENUQSwgeyBrZXk6IGluZGV4LCB1cmw6IHVybCB9LCB0ZXh0KSkpO1xuICAgICAgICB9KSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IEJyZWFkY3J1bWJzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDVEEgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0NUQSc7XG5jb25zdCBDVEFzID0gKHsgY3RhcyB9KSA9PiB7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGNsYXNzTmFtZTogXCJwYW5lbC1jdGFcIiB9LCAoQXJyYXkuaXNBcnJheShjdGFzKSA/IGN0YXMgOiBbY3Rhc10pLm1hcCgoY3RhLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBjdGFUZXh0ID0gY3RhLnRleHQgPyBjdGEudGV4dCA6ICcnO1xuICAgICAgICBjb25zdCBjdGFVUkwgPSBjdGEudXJsID8gY3RhLnVybCA6ICcnO1xuICAgICAgICBjb25zdCBjdGFNb2RhbCA9IGN0YS5tb2RhbCA/IGN0YS5tb2RhbCA6IGZhbHNlO1xuICAgICAgICBjb25zdCBjdGFDbGFzc2VzID0gY3RhLmJ1dHRvblN0eWxlID8gWydidXR0b24nLCBjdGEuYnV0dG9uU3R5bGVdIDogWydidXR0b24nXTtcbiAgICAgICAgY29uc3QgY3RhTW9kYWxDbGFzcyA9IGN0YS5tb2RhbENsYXNzID8gY3RhLm1vZGFsQ2xhc3MgOiAnJztcbiAgICAgICAgY29uc3QgY3RhU2V0dGluZ3MgPSB7XG4gICAgICAgICAgICB1cmw6IGN0YVVSTCxcbiAgICAgICAgICAgIHRleHQ6IGN0YVRleHQsXG4gICAgICAgICAgICBtb2RhbDogY3RhTW9kYWwsXG4gICAgICAgICAgICBtb2RhbENsYXNzOiBjdGFNb2RhbENsYXNzLFxuICAgICAgICAgICAgY2xhc3NlczogY3RhQ2xhc3NlcyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IGtleTogaW5kZXgsIC4uLmN0YVNldHRpbmdzIH0pO1xuICAgIH0pKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgQ1RBcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBkb0xlbmd0aCwgZG9QYXJzZSwgZG9UcmltQ2hhciB9IGZyb20gJ3NyYy91dGlscy9oZWxwZXJzJztcbmltcG9ydCBDVEEgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0NUQSc7XG5pbXBvcnQgQ1RBcyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQ1RBcyc7XG5jb25zdCBIZWFkaW5nID0gKHsgYWxpZ24gPSAnJywgY2xhc3NlcyA9IFtdLCBjdGEgPSBbXSwgaWQgPSAnJywgcHJldGl0bGUgPSAnJywgcHVibGlzaERhdGUgPSAnJywgdGFnID0gJ2gyJywgdGl0bGUgPSAnJywgdXJsID0gJycsIH0pID0+IHtcbiAgICBjb25zdCBUYWcgPSBkb1RyaW1DaGFyKHRhZywgJzw+Jyk7XG4gICAgY29uc3QgaGFzUHJldGl0bGUgPSBCb29sZWFuKGRvTGVuZ3RoKHByZXRpdGxlKSk7XG4gICAgY29uc3QgaGFzUHVibGlzaERhdGUgPSBCb29sZWFuKGRvTGVuZ3RoKHB1Ymxpc2hEYXRlKSk7XG4gICAgLy8gRWl0aGVyIGhhcy1kYXRlIE9SIGhhcy1wcmV0aXRsZSwgbm90IGJvdGhcbiAgICBpZiAoaGFzUHVibGlzaERhdGUpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdoYXMtZGF0ZScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChoYXNQcmV0aXRsZSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ2hhcy1wcmV0aXRsZScpO1xuICAgIH1cbiAgICBpZiAoYWxpZ24pIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCd0ZXh0LWFsaWduLScgKyBhbGlnbik7XG4gICAgfVxuICAgIGNvbnN0IHRhZ0F0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3Nlcy5qb2luKCcgJyksXG4gICAgfTtcbiAgICBpZiAoZG9MZW5ndGgoaWQpKSB7XG4gICAgICAgIHRhZ0F0dHJpYnV0ZXMuaWQgPSBpZDtcbiAgICB9XG4gICAgaWYgKCFoYXNQdWJsaXNoRGF0ZSkge1xuICAgICAgICB0YWdBdHRyaWJ1dGVzWydkYXRhLXByZXRpdGxlJ10gPSBwcmV0aXRsZTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhZywgeyAuLi50YWdBdHRyaWJ1dGVzLCBcImRhdGEtYW9zXCI6IFwiZmFkZS1pblwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENUQSwgeyB1cmw6IHVybCB9LCBoYXNQdWJsaXNoRGF0ZSA/XG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaGVhZGluZy10aXRsZVwiIH0sIGRvUGFyc2UodGl0bGUpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaGVhZGluZy1wcmV0aXRsZVwiIH0sIHByZXRpdGxlKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaGVhZGluZy1wdWJsaXNoLWRhdGVcIiB9LCBwdWJsaXNoRGF0ZSkpXG4gICAgICAgICAgICAgICAgOiB0aXRsZSkpLFxuICAgICAgICBkb0xlbmd0aChjdGEpID9cbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBcywgeyBjdGFzOiBjdGEgfSlcbiAgICAgICAgICAgIDogbnVsbCkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEhlYWRpbmc7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NU2VydmVyIGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInO1xuaW1wb3J0IHsgZG9CYWNrZ3JvdW5kSW1hZ2UsIGRvTGVuZ3RoLCBkb1BhcnNlIH0gZnJvbSAnc3JjL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IEJhY2tncm91bmRWaWRlbyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQmFja2dyb3VuZFZpZGVvJztcbmltcG9ydCBCcmVhZGNydW1icyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQnJlYWRjcnVtYnMnO1xuaW1wb3J0IENUQSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQ1RBJztcbmltcG9ydCBIZWFkaW5nIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9IZWFkaW5nJztcbmltcG9ydCBNZWRpYUxvYWRlciBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvTWVkaWFMb2FkZXInO1xuaW1wb3J0IFNoYXJlQmFyIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9TaGFyZUJhcic7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9oZXJvLnNjc3MnO1xuY29uc3QgSGVybyA9ICh7IGJhY2tncm91bmRTZXR0aW5ncywgYnJlYWRjcnVtYnMsIGNsYXNzZXMgPSBbXSwgY29weSA9ICcnLCBjdGFzID0gW10sIGN1c3RvbUhUTUwsIGN1c3RvbUhUTUxBZnRlciwgaWQgPSAnaGVybycsIGltYWdlTGluayA9IHtcbiAgICBtb2RhbDogZmFsc2UsXG4gICAgdXJsOiAnJyxcbn0sIG1lZGlhID0ge30sIG1lZGlhTG9vcCA9IGZhbHNlLCBwcmV0aXRsZSA9ICcnLCBwdWJsaXNoRGF0ZSA9ICcnLCBzaGFyZUJhciA9IGZhbHNlLCBzdWJ0aXRsZSA9ICcnLCB0ZXh0Q29sb3IgPSAnJywgdGl0bGUgPSAnJywgdXJsID0gJycsIH0pID0+IHtcbiAgICAvLyBBZGQgc29tZSBjbGFzc2VzXG4gICAgaWYgKHRleHRDb2xvci5sZW5ndGgpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCd0ZXh0LScgKyB0ZXh0Q29sb3IpO1xuICAgIH1cbiAgICBpZiAoZG9MZW5ndGgoYmFja2dyb3VuZFNldHRpbmdzKSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ2hhcy1iYWNrZ3JvdW5kJyk7XG4gICAgfVxuICAgIGlmIChkb0xlbmd0aChjb3B5KSkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ2hhcy1jb3B5Jyk7XG4gICAgfVxuICAgIGlmIChkb0xlbmd0aChtZWRpYSkpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdoYXMtbWVkaWEnKTtcbiAgICB9XG4gICAgY29uc3QgaGVyb0JhY2tncm91bmQgPSBkb0JhY2tncm91bmRJbWFnZShiYWNrZ3JvdW5kU2V0dGluZ3MsIGNsYXNzZXMpO1xuICAgIGNvbnN0IGhlYWRpbmdTZXR0aW5ncyA9IHtcbiAgICAgICAgdGFnOiAnaDEnLFxuICAgICAgICBwcmV0aXRsZTogcHJldGl0bGUsXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgc3VidGl0bGU6IHN1YnRpdGxlLFxuICAgICAgICBwdWJsaXNoRGF0ZTogcHVibGlzaERhdGUsXG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIiwgeyBpZDogaWQsIC4uLmhlcm9CYWNrZ3JvdW5kIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQmFja2dyb3VuZFZpZGVvLCB7IC4uLmJhY2tncm91bmRTZXR0aW5ncywgaWQ6IFwiaGVyby1iYWNrZ3JvdW5kXCIgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaGVyby1jb250YWluZXIgY29udGFpbmVyXCIgfSxcbiAgICAgICAgICAgIGJyZWFkY3J1bWJzID9cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJyZWFkY3J1bWJzLCB7IHBvc3Q6IGJyZWFkY3J1bWJzIH0pXG4gICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJoZXJvLXRleHQtd3JhcHBlclwiIH0sXG4gICAgICAgICAgICAgICAgZG9MZW5ndGgodGl0bGUpID9cbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIZWFkaW5nLCB7IC4uLmhlYWRpbmdTZXR0aW5ncyB9KVxuICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgZG9MZW5ndGgoY29weSkgP1xuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBkb1BhcnNlKGNvcHkpKVxuICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgZG9MZW5ndGgoY3RhcykgP1xuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGlkOiBcImhlcm8tY3RhXCIgfSwgY3Rhcy5tYXAoKGN0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0YVNldHRpbmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogY3RhLnVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjdGEudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RhbDogY3RhLm1vZGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsQ2xhc3M6IGN0YS5tb2RhbENsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IGN0YS5idXR0b25TdHlsZSA/IFsnYnV0dG9uJywgY3RhLmJ1dHRvblN0eWxlXSA6IFsnYnV0dG9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IGtleTogaW5kZXgsIC4uLmN0YVNldHRpbmdzIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgIGN1c3RvbUhUTUwgPyBkb1BhcnNlKFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKGN1c3RvbUhUTUwpKSA6IG51bGwpLFxuICAgICAgICAgICAgZG9MZW5ndGgobWVkaWEpID9cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImhlcm8tbWVkaWEtd3JhcHBlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IHVybDogaW1hZ2VMaW5rLnVybCwgbW9kYWw6IGltYWdlTGluay5tb2RhbCwgY2xhc3NlczogW10gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVkaWFMb2FkZXIsIHsgbWVkaWE6IG1lZGlhLCBzaXplOiBcInNxdWFyZV82MDBcIiwgbG9vcDogbWVkaWFMb29wIH0pKSlcbiAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICBjdXN0b21IVE1MQWZ0ZXIgP1xuICAgICAgICAgICAgICAgIGN1c3RvbUhUTUxBZnRlclxuICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIHNoYXJlQmFyID9cbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNoYXJlQmFyLCB7IHRpdGxlOiB0aXRsZSwgdXJsOiB1cmwgfSlcbiAgICAgICAgICAgICAgICA6IG51bGwpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgSGVybztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0ltYWdlJztcbmltcG9ydCBWaWRlbyBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvVmlkZW8nO1xuY29uc3QgTWVkaWFMb2FkZXIgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCBtZWRpYSA9IHByb3BzLm1lZGlhO1xuICAgIGNvbnN0IG1lZGlhVHlwZSA9IG1lZGlhLnR5cGU7XG4gICAgaWYgKG1lZGlhVHlwZSA9PT0gJ2ltYWdlJyB8fCBtZWRpYVR5cGUgPT09ICdpY29uJykge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChJbWFnZSwgeyBpbWFnZTogbWVkaWEsIC4uLnByb3BzIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtZWRpYVR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVmlkZW8sIHsgdXJsOiBtZWRpYS51cmwsIC4uLnByb3BzIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IE1lZGlhTG9hZGVyO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEhlbG1ldCB9IGZyb20gJ3JlYWN0LWhlbG1ldCc7XG5pbXBvcnQgeyBkb1BhcnNlIH0gZnJvbSAnc3JjL3V0aWxzL2hlbHBlcnMnO1xuY29uc3QgU0VPVGFncyA9ICh7IHBvc3QgfSkgPT4ge1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChIZWxtZXQsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aXRsZVwiLCBudWxsLCBwb3N0LnNlb190aXRsZSA/IGRvUGFyc2UocG9zdC5zZW9fdGl0bGUpIDogZG9QYXJzZShwb3N0LnBvc3RfdGl0bGUpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpbmtcIiwgeyByZWw6IFwiY2Fub25pY2FsXCIsIGhyZWY6IHBvc3Quc2VvX3VybCA/IHBvc3Quc2VvX3VybCA6IHBvc3QuZ3VpZCB9KSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzpsb2NhbGVcIiwgY29udGVudDogcG9zdC5zZW9fbG9jYWxlID8gcG9zdC5zZW9fbG9jYWxlIDogJycgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6dHlwZVwiLCBjb250ZW50OiBcIndlYnNpdGVcIiB9KSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzp0aXRsZVwiLCBjb250ZW50OiBwb3N0LnNlb190aXRsZSA/IHBvc3Quc2VvX3RpdGxlIDogcG9zdC5wb3N0X3RpdGxlIH0pLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOmRlc2NyaXB0aW9uXCIsIGNvbnRlbnQ6IHBvc3Quc2VvX2Rlc2NyaXB0aW9uIH0pLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLCB7IG5hbWU6IFwiZGVzY3JpcHRpb25cIiwgY29udGVudDogcG9zdC5zZW9fZGVzY3JpcHRpb24gfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6dXJsXCIsIGNvbnRlbnQ6IHBvc3Quc2VvX3VybCA/IHBvc3Quc2VvX3VybCA6IHBvc3QuZ3VpZCB9KSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzpzaXRlX25hbWVcIiwgY29udGVudDogcG9zdC5zZW9fc2l0ZV9uYW1lID8gcG9zdC5zZW9fc2l0ZV9uYW1lIDogJ3tEZXZlbG9wZXJzT25seX0nIH0pLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibWV0YVwiLCB7IHByb3BlcnR5OiBcIm9nOmltYWdlXCIsIGNvbnRlbnQ6IHBvc3Quc2VvX2ltYWdlID8gcG9zdC5zZW9faW1hZ2UgOiAnJyB9KSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1ldGFcIiwgeyBuYW1lOiBcInR3aXR0ZXI6Y2FyZFwiLCBjb250ZW50OiBcInN1bW1hcnlfbGFyZ2VfaW1hZ2VcIiB9KSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm1ldGFcIiwgeyBuYW1lOiBcInJvYm90c1wiLCBjb250ZW50OiBwb3N0Lm5vaW5kZXggPyBwb3N0Lm5vaW5kZXggOiAnaW5kZXgsIGZvbGxvdycgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTRU9UYWdzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDVEEgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0NUQSc7XG5pbXBvcnQgJ2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9zaGFyZS5zY3NzJztcbmNvbnN0IFNoYXJlQmFyID0gKHsgdGl0bGUgPSAnJywgdXJsID0gJycgfSkgPT4ge1xuICAgIGNvbnN0IGZhY2Vib29rTGluayA9ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyL3NoYXJlci5waHA/dT0nICsgdXJsO1xuICAgIGNvbnN0IHR3aXR0ZXJMaW5rID0gJ2h0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD0nICsgdXJsICsgJyZ0ZXh0PScgKyB0aXRsZTtcbiAgICBjb25zdCBsaW5rZWRpbkxpbmsgPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUmdXJsPScgKyB1cmw7XG4gICAgY29uc3QgbWFpbExpbmsgPSAnbWFpbHRvOj9zdWJqZWN0PScgKyB0aXRsZSArICcmYm9keT0nICsgdXJsO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHsgY2xhc3NOYW1lOiBcImRvLXNoYXJlLWJhclwiLCBcImRhdGEtbGFiZWxcIjogXCJTaGFyZVwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDVEEsIHsgY2xhc3NlczogWydkby1mYScsICdmYS1mYWNlYm9vay1mJ10sIHRleHQ6IFwiRmFjZWJvb2tcIiwgdXJsOiBmYWNlYm9va0xpbmsgfSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ1RBLCB7IGNsYXNzZXM6IFsnZG8tZmEnLCAnZmEtdHdpdHRlciddLCB0ZXh0OiBcIlR3aXR0ZXJcIiwgdXJsOiB0d2l0dGVyTGluayB9KSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDVEEsIHsgY2xhc3NlczogWydkby1mYScsICdmYS1saW5rZWRpbiddLCB0ZXh0OiBcIkxpbmtlZEluXCIsIHVybDogbGlua2VkaW5MaW5rIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENUQSwgeyBjbGFzc2VzOiBbJ2RvLWZhJywgJ2ZhLWVudmVsb3BlJ10sIHRleHQ6IFwiRW1haWxcIiwgdXJsOiBtYWlsTGluayB9KSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTaGFyZUJhcjtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5jb25zdCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSA9IHdwLmVsZW1lbnQ7XG5pbXBvcnQgeyBkb1ZpZGVvVHlwZSwgZG9WaWRlb0VtYmVkVVJMIH0gZnJvbSAnc3JjL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IENUQSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQ1RBJztcbmltcG9ydCAnYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL3ZpZGVvcy5zY3NzJztcbmNvbnN0IFZpZGVvID0gKHsgaWQgPSAnJywgbGFiZWwgPSAnV2F0Y2gnLCBsb29wID0gZmFsc2UsIHBsYXllck51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDApLCB0aW1lc3RhbXAsIHVybCwgdmlkZW9EYXRhQXR0ciA9IHt9LCB3aWR0aCwgfSkgPT4ge1xuICAgIGNvbnN0IFt2aWRlb1VSTCwgc2V0VmlkZW9VUkxdID0gdXNlU3RhdGUodW5kZWZpbmVkKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRWaWRlb1VSTCh1cmwpO1xuICAgIH0sIFt1cmxdKTtcbiAgICBpZiAodmlkZW9VUkwpIHtcbiAgICAgICAgY29uc3QgdHlwZSA9IGRvVmlkZW9UeXBlKHZpZGVvVVJMKTtcbiAgICAgICAgY29uc3QgdmlkZW9FbWJlZFVSTCA9IHR5cGUgPT0gJ3N0cmVhbWluZycgPyBkb1ZpZGVvRW1iZWRVUkwodmlkZW9VUkwpIDogJyc7XG4gICAgICAgIGNvbnN0IHdlYm1GaWxlID0gdmlkZW9VUkwucmVwbGFjZSgnLm1wNCcsICcud2VibScpO1xuICAgICAgICBjb25zdCB3ZWJtID0gdHlwZSA9PSAnZW1iZWQnICYmIHdlYm1GaWxlLmxlbmd0aCA/IHdlYm1GaWxlIDogJyc7XG4gICAgICAgIGNvbnN0IHBvc3RlckZpbGUgPSB2aWRlb1VSTC5yZXBsYWNlKCcubXA0JywgJy5qcGcnKTtcbiAgICAgICAgY29uc3QgcG9zdGVyID0gdHlwZSA9PSAnZW1iZWQnICYmIHBvc3RlckZpbGUubGVuZ3RoID8gcG9zdGVyRmlsZSA6ICcnO1xuICAgICAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgICAgIHZpZGVvRGF0YUF0dHIuc3R5bGUgPSB7ICdtYXgtd2lkdGgnOiB3aWR0aCB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgdmlkZW9EYXRhQXR0ci5pZCA9IGlkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFZpZGVvRWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlID09ICdzdHJlYW1pbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIsIHsgc3JjOiB2aWRlb0VtYmVkVVJMLCBhbGxvd0Z1bGxTY3JlZW46IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDVEEsIHsgdXJsOiB2aWRlb0VtYmVkVVJMLCB0YXJnZXQ6IFwiX2JsYW5rXCIsIHRleHQ6IGxhYmVsIH0sIGxhYmVsKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnZW1iZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW9BdHRyaWJ1dGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBhdXRvUGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtdXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcGxheXNJbmxpbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvc3RlcjogcG9zdGVyLFxuICAgICAgICAgICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIiwgeyAuLi52aWRlb0F0dHJpYnV0ZXMgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNvdXJjZVwiLCB7IHNyYzogd2VibSwgdHlwZTogXCJ2aWRlby93ZWJtXCIgfSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIiwgeyBzcmM6IHZpZGVvVVJMLCB0eXBlOiBcInZpZGVvL21wNFwiIH0pKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZmlndXJlXCIsIHsgY2xhc3NOYW1lOiAnZG8tdmlkZW8gJyArIHR5cGUsIC4uLnZpZGVvRGF0YUF0dHIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImRvLXZpZGVvLXdyYXBwZXJcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVmlkZW9FbGVtZW50LCBudWxsKSkpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBWaWRlbztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzY5OTRcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3Njk5MlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTtcbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNzI2MDI2Mzc2OTUyXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE3MjYwMjYzNzY5OTVcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wibG9jYWxzXCI6ZmFsc2V9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpO1xuICAgIH1cbiAgIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3NzAxNVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiXSwibmFtZXMiOlsiUmVhY3QiLCJCYWNrZ3JvdW5kVmlkZW9Db250cm9scyIsIkJhY2tncm91bmRWaWRlbyIsIl9yZWYiLCJhbmltYXRlZCIsImF2YXRhciIsImNvbG9yIiwiaWQiLCJtZWRpYSIsInRlbXBsYXRlRGlyZWN0b3J5IiwianBnIiwicmVwbGFjZSIsIndlYm0iLCJ2aWRlb0F0dHJpYnV0ZXMiLCJhdXRvUGxheSIsImNvbnRyb2xzIiwibXV0ZWQiLCJwbGF5c0lubGluZSIsInBvc3RlciIsImxvb3AiLCJjcmVhdGVFbGVtZW50IiwiRnJhZ21lbnQiLCJjbGFzc05hbWUiLCJfb2JqZWN0U3ByZWFkIiwic3JjIiwidHlwZSIsInZpZGVvSUQiLCJfd3AkZWxlbWVudCIsIndwIiwiZWxlbWVudCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiX3VzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5IiwidmlkZW8iLCJzZXRWaWRlbyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250cm9sc0lEIiwicmVtb3ZlQXR0cmlidXRlIiwicGxheVBhdXNlT25jbGljayIsImUiLCJwbGF5UGF1c2VCdXR0b24iLCJ0YXJnZXQiLCJwYXVzZWQiLCJwbGF5IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaW5uZXJIVE1MIiwicGF1c2UiLCJyZXdpbmRPbmNsaWNrIiwiY3VycmVudFRpbWUiLCJmb3J3YXJkT25jbGljayIsIm9uQ2xpY2siLCJkb0xlbmd0aCIsIkNUQSIsIkJyZWFkY3J1bWJzIiwicG9zdCIsImJyZWFkY3J1bWJzIiwicG9zdF90eXBlX2RldGFpbHMiLCJtZXRhUHJlZml4IiwibWV0YV9wcmVmaXgiLCJmaWVsZHMiLCJtYXAiLCJjcnVtYiIsImluZGV4IiwidGV4dCIsInVybCIsImtleSIsIkNUQXMiLCJjdGFzIiwiQXJyYXkiLCJpc0FycmF5IiwiY3RhIiwiY3RhVGV4dCIsImN0YVVSTCIsImN0YU1vZGFsIiwibW9kYWwiLCJjdGFDbGFzc2VzIiwiYnV0dG9uU3R5bGUiLCJjdGFNb2RhbENsYXNzIiwibW9kYWxDbGFzcyIsImN0YVNldHRpbmdzIiwiY2xhc3NlcyIsImRvUGFyc2UiLCJkb1RyaW1DaGFyIiwiSGVhZGluZyIsIl9yZWYkYWxpZ24iLCJhbGlnbiIsIl9yZWYkY2xhc3NlcyIsIl9yZWYkY3RhIiwiX3JlZiRpZCIsIl9yZWYkcHJldGl0bGUiLCJwcmV0aXRsZSIsIl9yZWYkcHVibGlzaERhdGUiLCJwdWJsaXNoRGF0ZSIsIl9yZWYkdGFnIiwidGFnIiwiX3JlZiR0aXRsZSIsInRpdGxlIiwiX3JlZiR1cmwiLCJUYWciLCJoYXNQcmV0aXRsZSIsIkJvb2xlYW4iLCJoYXNQdWJsaXNoRGF0ZSIsInB1c2giLCJ0YWdBdHRyaWJ1dGVzIiwiam9pbiIsIlJlYWN0RE9NU2VydmVyIiwiZG9CYWNrZ3JvdW5kSW1hZ2UiLCJNZWRpYUxvYWRlciIsIlNoYXJlQmFyIiwiSGVybyIsImJhY2tncm91bmRTZXR0aW5ncyIsIl9yZWYkY29weSIsImNvcHkiLCJfcmVmJGN0YXMiLCJjdXN0b21IVE1MIiwiY3VzdG9tSFRNTEFmdGVyIiwiX3JlZiRpbWFnZUxpbmsiLCJpbWFnZUxpbmsiLCJfcmVmJG1lZGlhIiwiX3JlZiRtZWRpYUxvb3AiLCJtZWRpYUxvb3AiLCJfcmVmJHNoYXJlQmFyIiwic2hhcmVCYXIiLCJfcmVmJHN1YnRpdGxlIiwic3VidGl0bGUiLCJfcmVmJHRleHRDb2xvciIsInRleHRDb2xvciIsImxlbmd0aCIsImhlcm9CYWNrZ3JvdW5kIiwiaGVhZGluZ1NldHRpbmdzIiwicmVuZGVyVG9TdGF0aWNNYXJrdXAiLCJzaXplIiwiSW1hZ2UiLCJWaWRlbyIsInByb3BzIiwibWVkaWFUeXBlIiwiaW1hZ2UiLCJIZWxtZXQiLCJTRU9UYWdzIiwic2VvX3RpdGxlIiwicG9zdF90aXRsZSIsInJlbCIsImhyZWYiLCJzZW9fdXJsIiwiZ3VpZCIsInByb3BlcnR5IiwiY29udGVudCIsInNlb19sb2NhbGUiLCJzZW9fZGVzY3JpcHRpb24iLCJuYW1lIiwic2VvX3NpdGVfbmFtZSIsInNlb19pbWFnZSIsIm5vaW5kZXgiLCJmYWNlYm9va0xpbmsiLCJ0d2l0dGVyTGluayIsImxpbmtlZGluTGluayIsIm1haWxMaW5rIiwiZG9WaWRlb1R5cGUiLCJkb1ZpZGVvRW1iZWRVUkwiLCJfcmVmJGxhYmVsIiwibGFiZWwiLCJfcmVmJGxvb3AiLCJfcmVmJHBsYXllck51bWJlciIsInBsYXllck51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRpbWVzdGFtcCIsIl9yZWYkdmlkZW9EYXRhQXR0ciIsInZpZGVvRGF0YUF0dHIiLCJ3aWR0aCIsInVuZGVmaW5lZCIsInZpZGVvVVJMIiwic2V0VmlkZW9VUkwiLCJ2aWRlb0VtYmVkVVJMIiwid2VibUZpbGUiLCJwb3N0ZXJGaWxlIiwic3R5bGUiLCJWaWRlb0VsZW1lbnQiLCJhbGxvd0Z1bGxTY3JlZW4iXSwic291cmNlUm9vdCI6IiJ9