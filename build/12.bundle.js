"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[12],{

/***/ 5647:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ block_DOStaffBlock; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5861);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(1037);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4687);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(7363);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./src/utils/api/index.ts + 12 modules
var api = __webpack_require__(9015);
// EXTERNAL MODULE: ./src/utils/helpers/index.ts + 23 modules
var helpers = __webpack_require__(3676);
// EXTERNAL MODULE: ./src/components/shared/CTA.tsx
var CTA = __webpack_require__(6643);
// EXTERNAL MODULE: ./src/components/shared/Heading.tsx + 1 modules
var Heading = __webpack_require__(2243);
// EXTERNAL MODULE: ./src/components/shared/Image.tsx
var Image = __webpack_require__(2212);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
;// CONCATENATED MODULE: ./src/components/shared/Modal.tsx

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



var Modal = function Modal(_ref) {
  var children = _ref.children,
    _ref$content = _ref.content,
    content = _ref$content === void 0 ? '' : _ref$content,
    _ref$heading = _ref.heading,
    heading = _ref$heading === void 0 ? {} : _ref$heading,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? '' : _ref$id;
  return external_React_default().createElement("section", {
    id: id,
    className: "panel do-inline-modal-wrapper modal-more",
    "uk-modal": ""
  }, external_React_default().createElement("div", {
    className: "panel-inner-wrapper do-inline-modal-inner-wrapper"
  }, external_React_default().createElement("button", {
    className: "do-modal-window-close uk-modal-close-default",
    type: "button",
    "uk-close": ""
  }, external_React_default().createElement("span", {
    className: "screen-reader-text"
  }, "Close")), external_React_default().createElement("div", {
    className: "do-inline-modal-content-wrapper"
  }, external_React_default().createElement("header", {
    className: "panel-header"
  }, external_React_default().createElement(Heading/* default */.Z, _objectSpread({}, heading))), content ? content : null, children ? children : null)));
};
/* harmony default export */ var shared_Modal = (Modal);
;// CONCATENATED MODULE: ./src/components/templates/block/DOStaffBlock.tsx




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
    _useState2 = (0,slicedToArray/* default */.Z)(_useState, 2),
    staff = _useState2[0],
    setStaff = _useState2[1];
  useEffect(function () {
    if (presenter) {
      var fetchData = /*#__PURE__*/function () {
        var _ref2 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee(staff) {
          return regenerator_default().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0,api/* doGetPost */.BM)('staff', staff).then(function (data) {
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
      return external_React_default().createElement((external_React_default()).Fragment, null, external_React_default().createElement(Image/* default */.Z, {
        image: staff.fields.staff_image,
        size: "square_400"
      }), external_React_default().createElement("div", {
        className: "panel-copy-wrapper"
      }, (0,helpers/* doParse */.sg)(staff.fields.staff_bio)));
    };
    return external_React_default().createElement("li", null, external_React_default().createElement(CTA/* default */.Z, {
      classes: ['block-link'],
      url: '#modal-' + staff.post_name,
      modal: true
    }, external_React_default().createElement("div", {
      className: "block-content-wrapper"
    }, external_React_default().createElement(Image/* default */.Z, {
      image: staff.fields.staff_image,
      size: "square_400"
    }), external_React_default().createElement("span", {
      className: "bio-details-wrapper"
    }, staff.fields.staff_first_name || staff.fields.staff_last_name ? external_React_default().createElement(Heading/* default */.Z, {
      tag: "h3",
      title: staff.fields.staff_first_name + ' ' + staff.fields.staff_last_name,
      classes: ['bio-name']
    }) : null, staff.fields.staff_position ? external_React_default().createElement("p", {
      className: "bio-position"
    }, staff.fields.staff_position) : null))), external_React_default().createElement(shared_Modal, {
      id: 'modal-' + staff.post_name,
      heading: modalHeading,
      content: external_React_default().createElement(BioModal, null)
    }));
  } else {
    return null;
  }
};
/* harmony default export */ var block_DOStaffBlock = (DOStaffBlock);

/***/ })

}]);
//# sourceMappingURL=12.bundle.js.map?v=1726017769337