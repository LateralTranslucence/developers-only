"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_block_DOStaffBlock_tsx"],{

/***/ "./src/components/shared/Modal.tsx":
/*!*****************************************!*\
  !*** ./src/components/shared/Modal.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var assets_styles_components_modals_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! assets/styles/components/modals.scss */ "./assets/styles/components/modals.scss");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



var Modal = function Modal(_ref) {
  var children = _ref.children,
    _ref$content = _ref.content,
    content = _ref$content === void 0 ? '' : _ref$content,
    _ref$heading = _ref.heading,
    heading = _ref$heading === void 0 ? {} : _ref$heading,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? '' : _ref$id;
  return react__WEBPACK_IMPORTED_MODULE_1___default().createElement("section", {
    id: id,
    className: "panel do-inline-modal-wrapper modal-more",
    "uk-modal": ""
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "panel-inner-wrapper do-inline-modal-inner-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
    className: "do-modal-window-close uk-modal-close-default",
    type: "button",
    "uk-close": ""
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: "screen-reader-text"
  }, "Close")), react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "do-inline-modal-content-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement("header", {
    className: "panel-header"
  }, react__WEBPACK_IMPORTED_MODULE_1___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({}, heading))), content ? content : null, children ? children : null)));
};
/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./src/components/templates/block/DOStaffBlock.tsx":
/*!*********************************************************!*\
  !*** ./src/components/templates/block/DOStaffBlock.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_utils_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/utils/api */ "./src/utils/api/index.ts");
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/utils/helpers */ "./src/utils/helpers/index.ts");
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");
/* harmony import */ var src_components_shared_Modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/components/shared/Modal */ "./src/components/shared/Modal.tsx");




var _wp$element = wp.element,
  useEffect = _wp$element.useEffect,
  useState = _wp$element.useState;






var DOStaffBlock = function DOStaffBlock(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    presenter = _ref.presenter,
    type = _ref.type;
  var _useState = useState(),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    staff = _useState2[0],
    setStaff = _useState2[1];
  useEffect(function () {
    if (presenter) {
      var fetchData = /*#__PURE__*/function () {
        var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(staff) {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0,src_utils_api__WEBPACK_IMPORTED_MODULE_4__.doGetPost)('staff', staff).then(function (data) {
                  setStaff(data.json);
                });
              case 2:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function fetchData(_x) {
          return _ref2.apply(this, arguments);
        };
      }();
      fetchData(presenter.staff);
    } else {
      setStaff(post);
    }
  }, []);
  if (staff) {
    var modalHeading = {
      tag: 'h3',
      title: staff.fields.staff_first_name + ' ' + staff.fields.staff_last_name,
      classes: ['bio-name']
    };
    var BioModal = function BioModal() {
      return react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_8__["default"], {
        image: staff.fields.staff_image,
        size: "square_400"
      }), react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", {
        className: "panel-copy-wrapper"
      }, (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_5__.doParse)(staff.fields.staff_bio)));
    };
    return react__WEBPACK_IMPORTED_MODULE_3___default().createElement("li", null, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_6__["default"], {
      classes: ['block-link'],
      url: '#modal-' + staff.post_name,
      modal: true
    }, react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", {
      className: "block-content-wrapper"
    }, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_8__["default"], {
      image: staff.fields.staff_image,
      size: "square_400"
    }), react__WEBPACK_IMPORTED_MODULE_3___default().createElement("span", {
      className: "bio-details-wrapper"
    }, staff.fields.staff_first_name || staff.fields.staff_last_name ? react__WEBPACK_IMPORTED_MODULE_3___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_7__["default"], {
      tag: "h3",
      title: staff.fields.staff_first_name + ' ' + staff.fields.staff_last_name,
      classes: ['bio-name']
    }) : null, staff.fields.staff_position ? react__WEBPACK_IMPORTED_MODULE_3___default().createElement("p", {
      className: "bio-position"
    }, staff.fields.staff_position) : null))), react__WEBPACK_IMPORTED_MODULE_3___default().createElement(src_components_shared_Modal__WEBPACK_IMPORTED_MODULE_9__["default"], {
      id: 'modal-' + staff.post_name,
      heading: modalHeading,
      content: react__WEBPACK_IMPORTED_MODULE_3___default().createElement(BioModal, null)
    }));
  } else {
    return null;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (DOStaffBlock);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX2Jsb2NrX0RPU3RhZmZCbG9ja190c3guYnVuZGxlLmpzP3Y9MTcyNjAxNzg0ODY1MSIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7QUFDMEI7QUFDTjtBQUM5QyxJQUFNRSxLQUFLLEdBQUcsU0FBUkEsS0FBS0EsQ0FBQUMsSUFBQSxFQUEwRDtFQUFBLElBQXBEQyxRQUFRLEdBQUFELElBQUEsQ0FBUkMsUUFBUTtJQUFBQyxZQUFBLEdBQUFGLElBQUEsQ0FBRUcsT0FBTztJQUFQQSxPQUFPLEdBQUFELFlBQUEsY0FBRyxFQUFFLEdBQUFBLFlBQUE7SUFBQUUsWUFBQSxHQUFBSixJQUFBLENBQUVLLE9BQU87SUFBUEEsT0FBTyxHQUFBRCxZQUFBLGNBQUcsQ0FBQyxDQUFDLEdBQUFBLFlBQUE7SUFBQUUsT0FBQSxHQUFBTixJQUFBLENBQUVPLEVBQUU7SUFBRkEsRUFBRSxHQUFBRCxPQUFBLGNBQUcsRUFBRSxHQUFBQSxPQUFBO0VBQzFELE9BQVFULDBEQUFtQixDQUFDLFNBQVMsRUFBRTtJQUFFVSxFQUFFLEVBQUVBLEVBQUU7SUFBRUUsU0FBUyxFQUFFLDBDQUEwQztJQUFFLFVBQVUsRUFBRTtFQUFHLENBQUMsRUFDcEhaLDBEQUFtQixDQUFDLEtBQUssRUFBRTtJQUFFWSxTQUFTLEVBQUU7RUFBb0QsQ0FBQyxFQUN6RlosMERBQW1CLENBQUMsUUFBUSxFQUFFO0lBQUVZLFNBQVMsRUFBRSw4Q0FBOEM7SUFBRUMsSUFBSSxFQUFFLFFBQVE7SUFBRSxVQUFVLEVBQUU7RUFBRyxDQUFDLEVBQ3ZIYiwwREFBbUIsQ0FBQyxNQUFNLEVBQUU7SUFBRVksU0FBUyxFQUFFO0VBQXFCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUM5RVosMERBQW1CLENBQUMsS0FBSyxFQUFFO0lBQUVZLFNBQVMsRUFBRTtFQUFrQyxDQUFDLEVBQ3ZFWiwwREFBbUIsQ0FBQyxRQUFRLEVBQUU7SUFBRVksU0FBUyxFQUFF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LENBQUMsQ0FBQyxDQUFDLEVBQ3pCckUsMERBQW1CLENBQUNFLG1FQUFLLEVBQUU7TUFBRVEsRUFBRSxFQUFFLFFBQVEsR0FBR3VCLEtBQUssQ0FBQ2tDLFNBQVM7TUFBRTNELE9BQU8sRUFBRTZDLFlBQVk7TUFBRS9DLE9BQU8sRUFBRU4sMERBQW1CLENBQUM0RCxRQUFRLEVBQUUsSUFBSTtJQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzVJLENBQUMsTUFDSTtJQUNELE9BQU8sSUFBSTtFQUNmO0FBQ0osQ0FBQztBQUNELCtEQUFlcEMsWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsb3BlcnMtb25seS8uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9Nb2RhbC50c3giLCJ3ZWJwYWNrOi8vZGV2ZWxvcGVycy1vbmx5Ly4vc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL2Jsb2NrL0RPU3RhZmZCbG9jay50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWFkaW5nIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9IZWFkaW5nJztcbmltcG9ydCAnYXNzZXRzL3N0eWxlcy9jb21wb25lbnRzL21vZGFscy5zY3NzJztcbmNvbnN0IE1vZGFsID0gKHsgY2hpbGRyZW4sIGNvbnRlbnQgPSAnJywgaGVhZGluZyA9IHt9LCBpZCA9ICcnIH0pID0+IHtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIsIHsgaWQ6IGlkLCBjbGFzc05hbWU6IFwicGFuZWwgZG8taW5saW5lLW1vZGFsLXdyYXBwZXIgbW9kYWwtbW9yZVwiLCBcInVrLW1vZGFsXCI6IFwiXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwYW5lbC1pbm5lci13cmFwcGVyIGRvLWlubGluZS1tb2RhbC1pbm5lci13cmFwcGVyXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiZG8tbW9kYWwtd2luZG93LWNsb3NlIHVrLW1vZGFsLWNsb3NlLWRlZmF1bHRcIiwgdHlwZTogXCJidXR0b25cIiwgXCJ1ay1jbG9zZVwiOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwic2NyZWVuLXJlYWRlci10ZXh0XCIgfSwgXCJDbG9zZVwiKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImRvLWlubGluZS1tb2RhbC1jb250ZW50LXdyYXBwZXJcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIiwgeyBjbGFzc05hbWU6IFwicGFuZWwtaGVhZGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIZWFkaW5nLCB7IC4uLmhlYWRpbmcgfSkpLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQgP1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA/XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuY29uc3QgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gPSB3cC5lbGVtZW50O1xuaW1wb3J0IHsgZG9HZXRQb3N0IH0gZnJvbSAnc3JjL3V0aWxzL2FwaSc7XG5pbXBvcnQgeyBkb1BhcnNlIH0gZnJvbSAnc3JjL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IENUQSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvQ1RBJztcbmltcG9ydCBIZWFkaW5nIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9IZWFkaW5nJztcbmltcG9ydCBJbWFnZSBmcm9tICdzcmMvY29tcG9uZW50cy9zaGFyZWQvSW1hZ2UnO1xuaW1wb3J0IE1vZGFsIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9Nb2RhbCc7XG5jb25zdCBET1N0YWZmQmxvY2sgPSAoeyBpbmRleCwgcGFuZWxTbGlkZXIsIHBlclJvdywgcG9zdCwgcHJlc2VudGVyLCB0eXBlLCB9KSA9PiB7XG4gICAgY29uc3QgW3N0YWZmLCBzZXRTdGFmZl0gPSB1c2VTdGF0ZSgpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChwcmVzZW50ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jIChzdGFmZikgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IGRvR2V0UG9zdCgnc3RhZmYnLCBzdGFmZikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRTdGFmZihkYXRhLmpzb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZldGNoRGF0YShwcmVzZW50ZXIuc3RhZmYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0U3RhZmYocG9zdCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG4gICAgaWYgKHN0YWZmKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsSGVhZGluZyA9IHtcbiAgICAgICAgICAgIHRhZzogJ2gzJyxcbiAgICAgICAgICAgIHRpdGxlOiBzdGFmZi5maWVsZHMuc3RhZmZfZmlyc3RfbmFtZSArICcgJyArIHN0YWZmLmZpZWxkcy5zdGFmZl9sYXN0X25hbWUsXG4gICAgICAgICAgICBjbGFzc2VzOiBbJ2Jpby1uYW1lJ10sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IEJpb01vZGFsID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW1hZ2UsIHsgaW1hZ2U6IHN0YWZmLmZpZWxkcy5zdGFmZl9pbWFnZSwgc2l6ZTogXCJzcXVhcmVfNDAwXCIgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJwYW5lbC1jb3B5LXdyYXBwZXJcIiB9LCBkb1BhcnNlKHN0YWZmLmZpZWxkcy5zdGFmZl9iaW8pKSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDVEEsIHsgY2xhc3NlczogWydibG9jay1saW5rJ10sIHVybDogJyNtb2RhbC0nICsgc3RhZmYucG9zdF9uYW1lLCBtb2RhbDogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiYmxvY2stY29udGVudC13cmFwcGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbWFnZSwgeyBpbWFnZTogc3RhZmYuZmllbGRzLnN0YWZmX2ltYWdlLCBzaXplOiBcInNxdWFyZV80MDBcIiB9KSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiYmlvLWRldGFpbHMtd3JhcHBlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFmZi5maWVsZHMuc3RhZmZfZmlyc3RfbmFtZSB8fCBzdGFmZi5maWVsZHMuc3RhZmZfbGFzdF9uYW1lID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEhlYWRpbmcsIHsgdGFnOiBcImgzXCIsIHRpdGxlOiBzdGFmZi5maWVsZHMuc3RhZmZfZmlyc3RfbmFtZSArICcgJyArIHN0YWZmLmZpZWxkcy5zdGFmZl9sYXN0X25hbWUsIGNsYXNzZXM6IFsnYmlvLW5hbWUnXSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWZmLmZpZWxkcy5zdGFmZl9wb3NpdGlvbiA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgeyBjbGFzc05hbWU6IFwiYmlvLXBvc2l0aW9uXCIgfSwgc3RhZmYuZmllbGRzLnN0YWZmX3Bvc2l0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWwsIHsgaWQ6ICdtb2RhbC0nICsgc3RhZmYucG9zdF9uYW1lLCBoZWFkaW5nOiBtb2RhbEhlYWRpbmcsIGNvbnRlbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQmlvTW9kYWwsIG51bGwpIH0pKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgRE9TdGFmZkJsb2NrO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiSGVhZGluZyIsIk1vZGFsIiwiX3JlZiIsImNoaWxkcmVuIiwiX3JlZiRjb250ZW50IiwiY29udGVudCIsIl9yZWYkaGVhZGluZyIsImhlYWRpbmciLCJfcmVmJGlkIiwiaWQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwidHlwZSIsIl9vYmplY3RTcHJlYWQiLCJfd3AkZWxlbWVudCIsIndwIiwiZWxlbWVudCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiZG9HZXRQb3N0IiwiZG9QYXJzZSIsIkNUQSIsIkltYWdlIiwiRE9TdGFmZkJsb2NrIiwiaW5kZXgiLCJwYW5lbFNsaWRlciIsInBlclJvdyIsInBvc3QiLCJwcmVzZW50ZXIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3NsaWNlZFRvQXJyYXkiLCJzdGFmZiIsInNldFN0YWZmIiwiZmV0Y2hEYXRhIiwiX3JlZjIiLCJfYXN5bmNUb0dlbmVyYXRvciIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJ0aGVuIiwiZGF0YSIsImpzb24iLCJzdG9wIiwiX3giLCJhcHBseSIsImFyZ3VtZW50cyIsIm1vZGFsSGVhZGluZyIsInRhZyIsInRpdGxlIiwiZmllbGRzIiwic3RhZmZfZmlyc3RfbmFtZSIsInN0YWZmX2xhc3RfbmFtZSIsImNsYXNzZXMiLCJCaW9Nb2RhbCIsIkZyYWdtZW50IiwiaW1hZ2UiLCJzdGFmZl9pbWFnZSIsInNpemUiLCJzdGFmZl9iaW8iLCJ1cmwiLCJwb3N0X25hbWUiLCJtb2RhbCIsInN0YWZmX3Bvc2l0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==