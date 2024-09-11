"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[1],{

/***/ 5008:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: function() { return /* binding */ shared_BackgroundVideo; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(7363);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(1037);
;// CONCATENATED MODULE: ./src/components/shared/BackgroundVideoControls.tsx


var _wp$element = wp.element,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;
var BackgroundVideoControls = function BackgroundVideoControls(_ref) {
  var videoID = _ref.videoID;
  var _useState = useState(null),
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
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
    return external_React_default().createElement("div", {
      className: "do-controls-wrapper",
      id: controlsID + '-wrapper'
    }, external_React_default().createElement("button", {
      className: "do-control rewind",
      id: controlsID + '-rewind',
      onClick: function onClick(e) {
        return rewindOnclick;
      }
    }, external_React_default().createElement("span", null, "Rewind")), external_React_default().createElement("button", {
      className: "do-control pause",
      id: controlsID + '-playpause',
      onClick: function onClick(e) {
        return playPauseOnclick;
      }
    }, external_React_default().createElement("span", null, "Pause")), external_React_default().createElement("button", {
      className: "do-control forward",
      id: controlsID + '-forward',
      onClick: function onClick(e) {
        return forwardOnclick;
      }
    }, external_React_default().createElement("span", null, "Forward")));
  } else {
    return null;
  }
};
/* harmony default export */ var shared_BackgroundVideoControls = (BackgroundVideoControls);
;// CONCATENATED MODULE: ./src/components/shared/BackgroundVideo.tsx

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



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
    return external_React_default().createElement((external_React_default()).Fragment, null, external_React_default().createElement("div", {
      className: "background-video-wrapper has-avatar"
    }, external_React_default().createElement("video", _objectSpread({}, videoAttributes), external_React_default().createElement("source", {
      src: webm,
      type: "video/webm"
    }), external_React_default().createElement("source", {
      src: media,
      type: "video/mp4"
    }))), external_React_default().createElement(shared_BackgroundVideoControls, {
      videoID: id
    }));
  } else {
    return null;
  }
};
/* harmony default export */ var shared_BackgroundVideo = (BackgroundVideo);

/***/ }),

/***/ 2243:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: function() { return /* binding */ shared_Heading; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(7363);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./src/utils/helpers/index.ts + 23 modules
var helpers = __webpack_require__(3676);
// EXTERNAL MODULE: ./src/components/shared/CTA.tsx
var CTA = __webpack_require__(6643);
;// CONCATENATED MODULE: ./src/components/shared/CTAs.tsx

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


var CTAs = function CTAs(_ref) {
  var ctas = _ref.ctas;
  return external_React_default().createElement("p", {
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
    return external_React_default().createElement(CTA/* default */.Z, _objectSpread({
      key: index
    }, ctaSettings));
  }));
};
/* harmony default export */ var shared_CTAs = (CTAs);
;// CONCATENATED MODULE: ./src/components/shared/Heading.tsx

function Heading_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function Heading_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? Heading_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Heading_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }




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
  var Tag = (0,helpers/* doTrimChar */.pV)(tag, '<>');
  var hasPretitle = Boolean((0,helpers/* doLength */.dk)(pretitle));
  var hasPublishDate = Boolean((0,helpers/* doLength */.dk)(publishDate));
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
  if ((0,helpers/* doLength */.dk)(id)) {
    tagAttributes.id = id;
  }
  if (!hasPublishDate) {
    tagAttributes['data-pretitle'] = pretitle;
  }
  return external_React_default().createElement((external_React_default()).Fragment, null, external_React_default().createElement(Tag, Heading_objectSpread(Heading_objectSpread({}, tagAttributes), {}, {
    "data-aos": "fade-in"
  }), external_React_default().createElement(CTA/* default */.Z, {
    url: url
  }, hasPublishDate ? external_React_default().createElement((external_React_default()).Fragment, null, external_React_default().createElement("span", {
    className: "heading-title"
  }, (0,helpers/* doParse */.sg)(title)), external_React_default().createElement("span", {
    className: "heading-pretitle"
  }, pretitle), external_React_default().createElement("span", {
    className: "heading-publish-date"
  }, publishDate)) : title)), (0,helpers/* doLength */.dk)(cta) ? external_React_default().createElement(shared_CTAs, {
    ctas: cta
  }) : null);
};
/* harmony default export */ var shared_Heading = (Heading);

/***/ }),

/***/ 7637:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: function() { return /* binding */ shared_Hero; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(7363);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./src/utils/helpers/index.ts + 23 modules
var helpers = __webpack_require__(3676);
// EXTERNAL MODULE: ./src/components/shared/BackgroundVideo.tsx + 1 modules
var BackgroundVideo = __webpack_require__(5008);
// EXTERNAL MODULE: ./src/components/shared/CTA.tsx
var CTA = __webpack_require__(6643);
;// CONCATENATED MODULE: ./src/components/shared/Breadcrumbs.tsx




var Breadcrumbs = function Breadcrumbs(_ref) {
  var post = _ref.post;
  var breadcrumbs;
  // Set in post type
  if (post.post_type_details.breadcrumbs && (0,helpers/* doLength */.dk)(post.post_type_details.breadcrumbs)) {
    breadcrumbs = post.post_type_details.breadcrumbs;
  }
  // Set in admin
  else {
    var metaPrefix = post.post_type_details.meta_prefix;
    breadcrumbs = post.fields[metaPrefix + '_breadcrumbs'] ? post.fields[metaPrefix + '_breadcrumbs'] : [];
  }
  if ((0,helpers/* doLength */.dk)(breadcrumbs)) {
    return external_React_default().createElement("ul", {
      id: "breadcrumbs"
    }, breadcrumbs.map(function (crumb, index) {
      var text = crumb.text;
      var url = crumb.url;
      return external_React_default().createElement("li", {
        key: index
      }, external_React_default().createElement(CTA/* default */.Z, {
        key: index,
        url: url
      }, text));
    }));
  } else {
    return null;
  }
};
/* harmony default export */ var shared_Breadcrumbs = (Breadcrumbs);
// EXTERNAL MODULE: ./src/components/shared/Heading.tsx + 1 modules
var Heading = __webpack_require__(2243);
// EXTERNAL MODULE: ./src/components/shared/Image.tsx
var Image = __webpack_require__(2212);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(1037);
;// CONCATENATED MODULE: ./src/components/shared/Video.tsx


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

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
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    videoURL = _useState2[0],
    setVideoURL = _useState2[1];
  useEffect(function () {
    setVideoURL(url);
  }, [url]);
  if (videoURL) {
    var type = (0,helpers/* doVideoType */.NW)(videoURL);
    var videoEmbedURL = type == 'streaming' ? (0,helpers/* doVideoEmbedURL */.Gw)(videoURL) : '';
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
        return external_React_default().createElement("iframe", {
          src: videoEmbedURL,
          allowFullScreen: true
        }, external_React_default().createElement(CTA/* default */.Z, {
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
        return external_React_default().createElement("video", _objectSpread({}, videoAttributes), external_React_default().createElement("source", {
          src: webm,
          type: "video/webm"
        }), external_React_default().createElement("source", {
          src: videoURL,
          type: "video/mp4"
        }));
      } else {
        return null;
      }
    };
    return external_React_default().createElement("figure", _objectSpread({
      className: 'do-video ' + type
    }, videoDataAttr), external_React_default().createElement("span", {
      className: "do-video-wrapper"
    }, external_React_default().createElement(VideoElement, null)));
  } else {
    return null;
  }
};
/* harmony default export */ var shared_Video = (Video);
;// CONCATENATED MODULE: ./src/components/shared/MediaLoader.tsx

function MediaLoader_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function MediaLoader_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? MediaLoader_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : MediaLoader_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



var MediaLoader = function MediaLoader(props) {
  var media = props.media;
  var mediaType = media.type;
  if (mediaType === 'image' || mediaType === 'icon') {
    return external_React_default().createElement(Image/* default */.Z, MediaLoader_objectSpread({
      image: media
    }, props));
  } else if (mediaType === 'video') {
    return external_React_default().createElement(shared_Video, MediaLoader_objectSpread({
      url: media.url
    }, props));
  } else {
    return null;
  }
};
/* harmony default export */ var shared_MediaLoader = (MediaLoader);
;// CONCATENATED MODULE: ./src/components/shared/ShareBar.tsx



var ShareBar = function ShareBar(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$url = _ref.url,
    url = _ref$url === void 0 ? '' : _ref$url;
  var facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  var twitterLink = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
  var linkedinLink = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url;
  var mailLink = 'mailto:?subject=' + title + '&body=' + url;
  return external_React_default().createElement("ul", {
    className: "do-share-bar",
    "data-label": "Share"
  }, external_React_default().createElement("li", null, external_React_default().createElement(CTA/* default */.Z, {
    classes: ['do-fa', 'fa-facebook-f'],
    text: "Facebook",
    url: facebookLink
  })), external_React_default().createElement("li", null, external_React_default().createElement(CTA/* default */.Z, {
    classes: ['do-fa', 'fa-twitter'],
    text: "Twitter",
    url: twitterLink
  })), external_React_default().createElement("li", null, external_React_default().createElement(CTA/* default */.Z, {
    classes: ['do-fa', 'fa-linkedin'],
    text: "LinkedIn",
    url: linkedinLink
  })), external_React_default().createElement("li", null, external_React_default().createElement(CTA/* default */.Z, {
    classes: ['do-fa', 'fa-envelope'],
    text: "Email",
    url: mailLink
  })));
};
/* harmony default export */ var shared_ShareBar = (ShareBar);
;// CONCATENATED MODULE: ./src/components/shared/Hero.tsx

function Hero_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function Hero_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? Hero_ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Hero_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }









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
  if ((0,helpers/* doLength */.dk)(backgroundSettings)) {
    classes.push('has-background');
  }
  if ((0,helpers/* doLength */.dk)(copy)) {
    classes.push('has-copy');
  }
  if ((0,helpers/* doLength */.dk)(media)) {
    classes.push('has-media');
  }
  var heroBackground = (0,helpers/* doBackgroundImage */.ib)(backgroundSettings, classes);
  var headingSettings = {
    tag: 'h1',
    pretitle: pretitle,
    title: title,
    subtitle: subtitle,
    publishDate: publishDate
  };
  return external_React_default().createElement("header", Hero_objectSpread({
    id: id
  }, heroBackground), external_React_default().createElement(BackgroundVideo/* default */.Z, Hero_objectSpread(Hero_objectSpread({}, backgroundSettings), {}, {
    id: "hero-background"
  })), external_React_default().createElement("div", {
    className: "hero-container container"
  }, breadcrumbs ? external_React_default().createElement(shared_Breadcrumbs, {
    post: breadcrumbs
  }) : null, external_React_default().createElement("div", {
    className: "hero-text-wrapper"
  }, (0,helpers/* doLength */.dk)(title) ? external_React_default().createElement(Heading/* default */.Z, Hero_objectSpread({}, headingSettings)) : null, (0,helpers/* doLength */.dk)(copy) ? external_React_default().createElement((external_React_default()).Fragment, null, (0,helpers/* doParse */.sg)(copy)) : null, (0,helpers/* doLength */.dk)(ctas) ? external_React_default().createElement("p", {
    id: "hero-cta"
  }, ctas.map(function (cta, index) {
    var ctaSettings = {
      url: cta.url,
      text: cta.text,
      modal: cta.modal,
      modalClass: cta.modalClass,
      classes: cta.buttonStyle ? ['button', cta.buttonStyle] : ['button']
    };
    return external_React_default().createElement(CTA/* default */.Z, Hero_objectSpread({
      key: index
    }, ctaSettings));
  })) : null, customHTML ? (0,helpers/* doParse */.sg)(customHTML) : null), (0,helpers/* doLength */.dk)(media) ? external_React_default().createElement("div", {
    className: "hero-media-wrapper"
  }, external_React_default().createElement(CTA/* default */.Z, {
    url: imageLink.url,
    modal: imageLink.modal,
    classes: []
  }, external_React_default().createElement(shared_MediaLoader, {
    media: media,
    size: "square_600",
    loop: mediaLoop
  }))) : null, customHTMLAfter ? customHTMLAfter : null, shareBar ? external_React_default().createElement(shared_ShareBar, {
    title: title,
    url: url
  }) : null));
};
/* harmony default export */ var shared_Hero = (Hero);

/***/ }),

/***/ 826:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4593);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3676);



var SEOTags = function SEOTags(_ref) {
  var post = _ref.post;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__/* .Helmet */ .q, null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title", null, post.seo_title ? (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__/* .doParse */ .sg)(post.seo_title) : (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__/* .doParse */ .sg)(post.post_title)), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("link", {
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
/* harmony default export */ __webpack_exports__.Z = (SEOTags);

/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map?v=1726017769337