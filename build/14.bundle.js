"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[14],{

/***/ 6082:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1037);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3676);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6643);
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2243);
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2212);


var _wp$element = wp.element,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;






var DOGlossaryTermList = function DOGlossaryTermList(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var _useState = useState(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)(_useState, 2),
    openTerm = _useState2[0],
    setOpenTerm = _useState2[1];
  useEffect(function () {
    setOpenTerm(false);
  }, []);
  var openTheTerm = function openTheTerm(e) {
    var target = e.target;
    if (target) {
      var closestLI = target.closest('li');
      var openIndex = closestLI ? Number(closestLI.getAttribute('data-index')) : undefined;
      if (openIndex) {
        setOpenTerm(openIndex);
      }
    }
  };
  var closeTheTerm = function closeTheTerm(e) {
    setOpenTerm(false);
  };
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__/* .doLength */ .dk)(post)) {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index,
      "data-index": index,
      className: 'glossary' + (openTerm === index ? ' open' : '')
    }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "block-content-wrapper"
    }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
      tag: "h3",
      title: post.post_title
    }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "glossary-term-overview"
    }, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__/* .doParse */ .sg)((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__/* .doTruncate */ ._6)((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__/* .doStripTags */ .fe)(post.fields.term_definition ? post.fields.term_definition : ''), {
      indicator: '...'
    }))), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "glossary-term-full"
    }, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__/* .doParse */ .sg)(post.fields.term_definition ? post.fields.term_definition : ''), (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__/* .doLength */ .dk)(post.fields.term_related_posts) ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
      tag: "h4",
      title: "Related Resources"
    }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
      className: "glossary-term-related-resources"
    }, post.fields.term_related_posts.map(function (resource, index) {
      if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__/* .doLength */ .dk)(resource)) {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
          key: index
        }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
          url: resource.permalink,
          classes: ['block-link']
        }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
          image: resource.post_thumbnail,
          size: "cinema_400"
        }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
          tag: 'h5',
          title: resource.post_title,
          pretitle: resource.post_type_details.post_type_display_name
        })));
      }
    }))) : null), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "glossary-term-open",
      onClick: function onClick(e) {
        return openTheTerm;
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Expand")), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "glossary-term-close",
      onClick: function onClick(e) {
        return closeTheTerm;
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Close"))));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (DOGlossaryTermList);

/***/ })

}]);
//# sourceMappingURL=14.bundle.js.map?v=1726017769337