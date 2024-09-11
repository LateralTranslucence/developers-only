"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([[17],{

/***/ 8210:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3676);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6643);
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2243);
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2212);





var DOEventBlock = function DOEventBlock(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var eventTypePretty = (0,src_utils_helpers__WEBPACK_IMPORTED_MODULE_1__/* .doUpperCaseWords */ .Qt)(post.fields.event_type.replace('-', ' '));
  var eventDateUTC = post.fields.event_date ? post.fields.event_date.stamp : '';
  var eventDate = post.fields.event_date ? post.fields.event_date.formatted : '';
  var eventEndDateUTC = post.fields.event_end_date ? post.fields.event_end_date.stamp : 0;
  //const eventEndDate: string = post.fields.event_end_date ? post.fields.event_end_date.formatted : '';
  var now = Math.ceil(Date.now() / 1000);
  //const eventPast = eventEndDateUTC ? time() > eventEndDateUTC : now > eventDateUTC + 1800;
  var eventPast = eventEndDateUTC ? now > eventEndDateUTC : now > eventDateUTC + 1800;
  var eventImage = post.fields.event_image;
  var eventRegistrationLink = post.fields.event_registration_link;
  //const eventCustomCTAText = post.fields.event_custom_cta_text ? post.fields.event_custom_cta_text : [];
  // Labels based on event type
  // // Webinars and Hybrid
  // let eventRegistrationText;
  // if ( post.fields.event_type === 'webinar' || post.fields.event_type === 'hybrid' ) {
  //     // Custom
  //     if ( doLength( eventCustomCTAText.before_the_event ) || doLength( eventCustomCTAText.after_the_event ) ) {
  //         eventRegistrationText = eventPast ? eventCustomCTAText[1] : eventCustomCTAText[0];
  //     }
  //     // Default
  //     else {
  //         eventRegistrationText = eventPast ? 'Watch the Replay' : 'Register Now';
  //     }
  // }
  // // In-Person
  // else {
  //     eventRegistrationText = eventCustomCTAText && eventCustomCTAText[0] ? eventCustomCTAText[0] : 'Register Now';
  // }
  // Show things?
  var showDate = Boolean(eventDate) && !eventPast && ['in-person', 'hybrid', 'conference'].includes(post.fields.event_type);
  //const showLocation: boolean =  eventLocation && ! eventPast && ( post.fields.event_type === 'in-person' || 'hybrid' );
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: 'has-block-link ' + (eventPast ? 'past-event' : 'do-event'),
    "data-event-type": post.fields.event_type,
    "data-event-date": eventDateUTC
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
    url: eventRegistrationLink ? eventRegistrationLink : post.permalink,
    classes: ['block-link']
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
    image: eventImage,
    size: "cinema_600",
    classes: [post.fields.event_type, 'block-thumbnail'],
    wrapperDataAttr: {
      'data-label': eventTypePretty + '"'
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "block-content-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
    tag: "h3",
    pretitle: post.post_type_details.post_type_display_name + ' - ' + eventTypePretty,
    title: post.fields.event_title,
    subtitle: post.fields.event_subtitle
  }), showDate ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "do-event-details"
  }, showDate && react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "do-event-date"
  }, eventDate))) : null)));
};
/* harmony default export */ __webpack_exports__["default"] = (DOEventBlock);

/***/ })

}]);
//# sourceMappingURL=17.bundle.js.map?v=1726017769337