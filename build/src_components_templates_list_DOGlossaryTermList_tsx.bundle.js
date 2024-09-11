"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_list_DOGlossaryTermList_tsx"],{

/***/ "./src/components/templates/list/DOGlossaryTermList.tsx":
/*!**************************************************************!*\
  !*** ./src/components/templates/list/DOGlossaryTermList.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");
/* harmony import */ var assets_styles_components_blocks_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! assets/styles/components/blocks.scss */ "./assets/styles/components/blocks.scss");
/* harmony import */ var assets_styles_components_list_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! assets/styles/components/list.scss */ "./assets/styles/components/list.scss");


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
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
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
  if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(post)) {
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", {
      key: index,
      "data-index": index,
      className: 'glossary' + (openTerm === index ? ' open' : '')
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "block-content-wrapper"
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], {
      tag: "h3",
      title: post.post_title
    }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "glossary-term-overview"
    }, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doParse)((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doTruncate)((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doStripTags)(post.fields.term_definition ? post.fields.term_definition : ''), {
      indicator: '...'
    }))), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "glossary-term-full"
    }, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doParse)(post.fields.term_definition ? post.fields.term_definition : ''), (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(post.fields.term_related_posts) ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], {
      tag: "h4",
      title: "Related Resources"
    }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("ul", {
      className: "glossary-term-related-resources"
    }, post.fields.term_related_posts.map(function (resource, index) {
      if ((0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.doLength)(resource)) {
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", {
          key: index
        }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_3__["default"], {
          url: resource.permalink,
          classes: ['block-link']
        }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_5__["default"], {
          image: resource.post_thumbnail,
          size: "cinema_400"
        }), react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_4__["default"], {
          tag: 'h5',
          title: resource.post_title,
          pretitle: resource.post_type_details.post_type_display_name
        })));
      }
    }))) : null), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
      className: "glossary-term-open",
      onClick: function onClick(e) {
        return openTheTerm;
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "Expand")), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
      className: "glossary-term-close",
      onClick: function onClick(e) {
        return closeTheTerm;
      }
    }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, "Close"))));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (DOGlossaryTermList);

/***/ }),

/***/ "./assets/styles/components/list.scss":
/*!********************************************!*\
  !*** ./assets/styles/components/list.scss ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1726026377026
      var cssReload = __webpack_require__(/*! ../../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX2xpc3RfRE9HbG9zc2FyeVRlcm1MaXN0X3RzeC5idW5kbGUuanM/dj0xNzI2MDE3ODQ4NjUxIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTBCO0FBQzFCLElBQUFDLFdBQUEsR0FBZ0NDLEVBQUUsQ0FBQ0MsT0FBTztFQUFsQ0MsU0FBUyxHQUFBSCxXQUFBLENBQVRHLFNBQVM7RUFBRUMsUUFBUSxHQUFBSixXQUFBLENBQVJJLFFBQVE7QUFDb0Q7QUFDbkM7QUFDUTtBQUNKO0FBQ0Y7QUFDRjtBQUM1QyxJQUFNUSxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQWtCQSxDQUFBQyxJQUFBLEVBQW9EO0VBQUEsSUFBOUNDLEtBQUssR0FBQUQsSUFBQSxDQUFMQyxLQUFLO0lBQUVDLFdBQVcsR0FBQUYsSUFBQSxDQUFYRSxXQUFXO0lBQUVDLE1BQU0sR0FBQUgsSUFBQSxDQUFORyxNQUFNO0lBQUVDLElBQUksR0FBQUosSUFBQSxDQUFKSSxJQUFJO0lBQUVDLElBQUksR0FBQUwsSUFBQSxDQUFKSyxJQUFJO0VBQ2hFLElBQUFDLFNBQUEsR0FBZ0NmLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFBQWdCLFVBQUEsR0FBQUMsZ0ZBQUEsQ0FBQUYsU0FBQTtJQUF4Q0csUUFBUSxHQUFBRixVQUFBO0lBQUVHLFdBQVcsR0FBQUgsVUFBQTtFQUM1QmpCLFNBQVMsQ0FBQyxZQUFNO0lBQ1pvQixXQUFXLENBQUMsS0FBSyxDQUFDO0VBQ3RCLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDTixJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBSUMsQ0FBQyxFQUFLO0lBQ3ZCLElBQU1DLE1BQU0sR0FBR0QsQ0FBQyxDQUFDQyxNQUFNO0lBQ3ZCLElBQUlBLE1BQU0sRUFBRTtNQUNSLElBQU1DLFNBQVMsR0FBR0QsTUFBTSxDQUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDO01BQ3RDLElBQU1DLFNBQVMsR0FBR0YsU0FBUyxHQUFH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LFNBQVMsRUFBRSxvQkFBb0I7TUFBRW9CLE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFHL0IsQ0FBQztRQUFBLE9BQUtELFdBQVc7TUFBQTtJQUFDLENBQUMsRUFDMUZ6QiwwREFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2hEQSwwREFBbUIsQ0FBQyxRQUFRLEVBQUU7TUFBRXFDLFNBQVMsRUFBRSxxQkFBcUI7TUFBRW9CLE9BQU8sRUFBRSxTQUFUQSxPQUFPQSxDQUFHL0IsQ0FBQztRQUFBLE9BQUtRLFlBQVk7TUFBQTtJQUFDLENBQUMsRUFDNUZsQywwREFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxDQUFDLE1BQ0k7SUFDRCxPQUFPLElBQUk7RUFDZjtBQUNKLENBQUM7QUFDRCwrREFBZWEsa0JBQWtCOzs7Ozs7Ozs7OztBQ3REakM7QUFDVTtBQUNWLE9BQU8sSUFBVTtBQUNqQjtBQUNBLHNCQUFzQixtQkFBTyxDQUFDLCtKQUFnRixjQUFjLGVBQWU7QUFDM0ksTUFBTSxVQUFVO0FBQ2hCLE1BQU0saUJBQWlCO0FBQ3ZCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvbGlzdC9ET0dsb3NzYXJ5VGVybUxpc3QudHN4Iiwid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL2Fzc2V0cy9zdHlsZXMvY29tcG9uZW50cy9saXN0LnNjc3M/OWZjOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gPSB3cC5lbGVtZW50O1xuaW1wb3J0IHsgZG9MZW5ndGgsIGRvUGFyc2UsIGRvU3RyaXBUYWdzLCBkb1RydW5jYXRlIH0gZnJvbSAnc3JjL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IENUQSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQ1RBJztcbmltcG9ydCBIZWFkaW5nIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9IZWFkaW5nJztcbmltcG9ydCBJbWFnZSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSW1hZ2UnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvYmxvY2tzLnNjc3MnO1xuaW1wb3J0ICdhc3NldHMvc3R5bGVzL2NvbXBvbmVudHMvbGlzdC5zY3NzJztcbmNvbnN0IERPR2xvc3NhcnlUZXJtTGlzdCA9ICh7IGluZGV4LCBwYW5lbFNsaWRlciwgcGVyUm93LCBwb3N0LCB0eXBlLCB9KSA9PiB7XG4gICAgY29uc3QgW29wZW5UZXJtLCBzZXRPcGVuVGVybV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc2V0T3BlblRlcm0oZmFsc2UpO1xuICAgIH0sIFtdKTtcbiAgICBjb25zdCBvcGVuVGhlVGVybSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCBjbG9zZXN0TEkgPSB0YXJnZXQuY2xvc2VzdCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IG9wZW5JbmRleCA9IGNsb3Nlc3RMSSA/IE51bWJlcihjbG9zZXN0TEkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKG9wZW5JbmRleCkge1xuICAgICAgICAgICAgICAgIHNldE9wZW5UZXJtKG9wZW5JbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGNsb3NlVGhlVGVybSA9IChlKSA9PiB7XG4gICAgICAgIHNldE9wZW5UZXJtKGZhbHNlKTtcbiAgICB9O1xuICAgIGlmIChkb0xlbmd0aChwb3N0KSkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGtleTogaW5kZXgsIFwiZGF0YS1pbmRleFwiOiBpbmRleCwgY2xhc3NOYW1lOiAnZ2xvc3NhcnknICsgKG9wZW5UZXJtID09PSBpbmRleCA/ICcgb3BlbicgOiAnJykgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2stY29udGVudC13cmFwcGVyXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlYWRpbmcsIHsgdGFnOiBcImgzXCIsIHRpdGxlOiBwb3N0LnBvc3RfdGl0bGUgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJnbG9zc2FyeS10ZXJtLW92ZXJ2aWV3XCIgfSwgZG9QYXJzZShkb1RydW5jYXRlKGRvU3RyaXBUYWdzKHBvc3QuZmllbGRzLnRlcm1fZGVmaW5pdGlvbiA/IHBvc3QuZmllbGRzLnRlcm1fZGVmaW5pdGlvbiA6ICcnKSwgeyBpbmRpY2F0b3I6ICcuLi4nIH0pKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJnbG9zc2FyeS10ZXJtLWZ1bGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICBkb1BhcnNlKHBvc3QuZmllbGRzLnRlcm1fZGVmaW5pdGlvbiA/IHBvc3QuZmllbGRzLnRlcm1fZGVmaW5pdGlvbiA6ICcnKSxcbiAgICAgICAgICAgICAgICAgICAgZG9MZW5ndGgocG9zdC5maWVsZHMudGVybV9yZWxhdGVkX3Bvc3RzKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZGluZywgeyB0YWc6IFwiaDRcIiwgdGl0bGU6IFwiUmVsYXRlZCBSZXNvdXJjZXNcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgeyBjbGFzc05hbWU6IFwiZ2xvc3NhcnktdGVybS1yZWxhdGVkLXJlc291cmNlc1wiIH0sIHBvc3QuZmllbGRzLnRlcm1fcmVsYXRlZF9wb3N0cy5tYXAoKHJlc291cmNlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9MZW5ndGgocmVzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGtleTogaW5kZXggfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENUQSwgeyB1cmw6IHJlc291cmNlLnBlcm1hbGluaywgY2xhc3NlczogWydibG9jay1saW5rJ10gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbWFnZSwgeyBpbWFnZTogcmVzb3VyY2UucG9zdF90aHVtYm5haWwsIHNpemU6IFwiY2luZW1hXzQwMFwiIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlYWRpbmcsIHsgdGFnOiAnaDUnLCB0aXRsZTogcmVzb3VyY2UucG9zdF90aXRsZSwgcHJldGl0bGU6IHJlc291cmNlLnBvc3RfdHlwZV9kZXRhaWxzLnBvc3RfdHlwZV9kaXNwbGF5X25hbWUgfSkpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiZ2xvc3NhcnktdGVybS1vcGVuXCIsIG9uQ2xpY2s6IChlKSA9PiBvcGVuVGhlVGVybSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBcIkV4cGFuZFwiKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJnbG9zc2FyeS10ZXJtLWNsb3NlXCIsIG9uQ2xpY2s6IChlKSA9PiBjbG9zZVRoZVRlcm0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJDbG9zZVwiKSkpKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgRE9HbG9zc2FyeVRlcm1MaXN0O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTcyNjAyNjM3NzAyNlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiXSwibmFtZXMiOlsiUmVhY3QiLCJfd3AkZWxlbWVudCIsIndwIiwiZWxlbWVudCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiZG9MZW5ndGgiLCJkb1BhcnNlIiwiZG9TdHJpcFRhZ3MiLCJkb1RydW5jYXRlIiwiQ1RBIiwiSGVhZGluZyIsIkltYWdlIiwiRE9HbG9zc2FyeVRlcm1MaXN0IiwiX3JlZiIsImluZGV4IiwicGFuZWxTbGlkZXIiLCJwZXJSb3ciLCJwb3N0IiwidHlwZSIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsIm9wZW5UZXJtIiwic2V0T3BlblRlcm0iLCJvcGVuVGhlVGVybSIsImUiLCJ0YXJnZXQiLCJjbG9zZXN0TEkiLCJjbG9zZXN0Iiwib3BlbkluZGV4IiwiTnVtYmVyIiwiZ2V0QXR0cmlidXRlIiwidW5kZWZpbmVkIiwiY2xvc2VUaGVUZXJtIiwiY3JlYXRlRWxlbWVudCIsImtleSIsImNsYXNzTmFtZSIsInRhZyIsInRpdGxlIiwicG9zdF90aXRsZSIsImZpZWxkcyIsInRlcm1fZGVmaW5pdGlvbiIsImluZGljYXRvciIsInRlcm1fcmVsYXRlZF9wb3N0cyIsIkZyYWdtZW50IiwibWFwIiwicmVzb3VyY2UiLCJ1cmwiLCJwZXJtYWxpbmsiLCJjbGFzc2VzIiwiaW1hZ2UiLCJwb3N0X3RodW1ibmFpbCIsInNpemUiLCJwcmV0aXRsZSIsInBvc3RfdHlwZV9kZXRhaWxzIiwicG9zdF90eXBlX2Rpc3BsYXlfbmFtZSIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9