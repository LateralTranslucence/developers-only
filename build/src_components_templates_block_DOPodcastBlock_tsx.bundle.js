"use strict";
(self["webpackChunkdevelopers_only"] = self["webpackChunkdevelopers_only"] || []).push([["src_components_templates_block_DOPodcastBlock_tsx"],{

/***/ "./src/components/templates/block/DOPodcastBlock.tsx":
/*!***********************************************************!*\
  !*** ./src/components/templates/block/DOPodcastBlock.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/components/shared/CTA */ "./src/components/shared/CTA.tsx");
/* harmony import */ var src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/shared/Heading */ "./src/components/shared/Heading.tsx");
/* harmony import */ var src_components_shared_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/components/shared/Image */ "./src/components/shared/Image.tsx");




var DOPodcastBlock = function DOPodcastBlock(_ref) {
  var index = _ref.index,
    panelSlider = _ref.panelSlider,
    perRow = _ref.perRow,
    post = _ref.post,
    type = _ref.type;
  var podcastExternalURL = post.fields.podcast_external_url;
  var podcastLink = post.fields.podcast_external_url ? post.fields.podcast_external_url : post.permalink;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "has-block-link"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_CTA__WEBPACK_IMPORTED_MODULE_1__["default"], {
    url: podcastLink,
    title: post.fields.podcast_title,
    classes: ['block-link' + (post.fields.podcast_format ? ' icon ' + post.fields.podcast_format.PartialTemplateProps.toLowerCase.toLowerCase() : '')]
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Image__WEBPACK_IMPORTED_MODULE_3__["default"], {
    image: post.fields.podcast_image,
    size: "cinema_600",
    classes: ['block-thumbnail']
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "block-content-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(src_components_shared_Heading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    tag: "h3",
    pretitle: post.post_type_details.post_type_display_name,
    title: post.fields.podcast_title
  }), podcastExternalURL ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "read-time"
  }, "External Link") : null)));
};
/* harmony default export */ __webpack_exports__["default"] = (DOPodcastBlock);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NvbXBvbmVudHNfdGVtcGxhdGVzX2Jsb2NrX0RPUG9kY2FzdEJsb2NrX3RzeC5idW5kbGUuanM/dj0xNzI2MDE3ODQ4NjUxIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNrQjtBQUNRO0FBQ0o7QUFDaEQsSUFBTUksY0FBYyxHQUFHLFNBQWpCQSxjQUFjQSxDQUFBQyxJQUFBLEVBQW9EO0VBQUEsSUFBOUNDLEtBQUssR0FBQUQsSUFBQSxDQUFMQyxLQUFLO0lBQUVDLFdBQVcsR0FBQUYsSUFBQSxDQUFYRSxXQUFXO0lBQUVDLE1BQU0sR0FBQUgsSUFBQSxDQUFORyxNQUFNO0lBQUVDLElBQUksR0FBQUosSUFBQSxDQUFKSSxJQUFJO0lBQUVDLElBQUksR0FBQUwsSUFBQSxDQUFKSyxJQUFJO0VBQzVELElBQU1DLGtCQUFrQixHQUFHRixJQUFJLENBQUNHLE1BQU0sQ0FBQ0Msb0JBQW9CO0VBQzNELElBQU1DLFdBQVcsR0FBR0wsSUFBSSxDQUFDRyxNQUFNLENBQUNDLG9CQUFvQixHQUFHSixJQUFJLENBQUNHLE1BQU0sQ0FBQ0Msb0JBQW9CLEdBQUdKLElBQUksQ0FBQ00sU0FBUztFQUN4RyxPQUFRZiwwREFBbUIsQ0FBQyxJQUFJLEVBQUU7SUFBRWlCLFNBQVMsRUFBRTtFQUFpQixDQUFDLEVBQzdEakIsMERBQW1CLENBQUNDLGlFQUFHLEVBQUU7SUFBRWlCLEdBQUcsRUFBRUosV0FBVztJQUFFSyxLQUFLLEVBQUVWLElBQUksQ0FBQ0csTUFBTSxDQUFDUSxhQUFhO0lBQUVDLE9BQU8sRUFBRSxDQUFDLFlBQVksSUFBSVosSUFBSSxDQUFDRyxNQUFNLENBQUNVLGNBQWMsR0FBRyxRQUFRLEdBQUdiLElBQUksQ0FBQ0csTUFBTSxDQUFDVSxjQUFjLENBQUNDLG9CQUFvQixDQUFDQyxXQUFXLENBQUNBLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0VBQUUsQ0FBQyxFQUMvTnhCLDBEQUFtQixDQUFDRyxtRUFBSyxFQUFFO0lBQUVzQixLQUFLLEVBQUVoQixJQUFJLENBQUNHLE1BQU0sQ0FBQ2MsYUFBYTtJQUFFQyxJQUFJLEVBQUUsWUFBWTtJQUFFTixPQUFPLEVBQUUsQ0FBQyxpQkFBaUI7RUFBRSxDQUFDLENBQUMsRUFDbEhyQiwwREFBbUIsQ0FBQyxLQUFLLEVBQUU7SUFBRWlCLFNBQVMsRUFBRTtFQUF3QixDQUFDLEVBQzdEakIsMERBQW1CLENBQUNFLHFFQUFPLEVBQUU7SUFBRTBCLEdBQUcsRUFBRSxJQUFJO0lBQUVDLFFBQVEsRUFBRXBCLElBQUksQ0FBQ3FCLGlCQUFpQixDQUFDQyxzQkFBc0I7SUFBRVosS0FBSyxFQUFFVixJQUFJLENBQUNHLE1BQU0sQ0FBQ1E7RUFBYyxDQUFDLENBQUMsRUFDdElULGtCQUFrQixHQUNkWCwwREFBbUIsQ0FBQyxHQUFHLEVBQUU7SUFBRWlCLFNBQVMsRUFBRTtFQUFZLENBQUMsRUFBRSxlQUFlLENBQUMsR0FDbkUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBQ0QsK0RBQWViLGNBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXZlbG9wZXJzLW9ubHkvLi9zcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvYmxvY2svRE9Qb2RjYXN0QmxvY2sudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ1RBIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9DVEEnO1xuaW1wb3J0IEhlYWRpbmcgZnJvbSAnc3JjL2NvbXBvbmVudHMvc2hhcmVkL0hlYWRpbmcnO1xuaW1wb3J0IEltYWdlIGZyb20gJ3NyYy9jb21wb25lbnRzL3NoYXJlZC9JbWFnZSc7XG5jb25zdCBET1BvZGNhc3RCbG9jayA9ICh7IGluZGV4LCBwYW5lbFNsaWRlciwgcGVyUm93LCBwb3N0LCB0eXBlLCB9KSA9PiB7XG4gICAgY29uc3QgcG9kY2FzdEV4dGVybmFsVVJMID0gcG9zdC5maWVsZHMucG9kY2FzdF9leHRlcm5hbF91cmw7XG4gICAgY29uc3QgcG9kY2FzdExpbmsgPSBwb3N0LmZpZWxkcy5wb2RjYXN0X2V4dGVybmFsX3VybCA/IHBvc3QuZmllbGRzLnBvZGNhc3RfZXh0ZXJuYWxfdXJsIDogcG9zdC5wZXJtYWxpbms7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwiaGFzLWJsb2NrLWxpbmtcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KENUQSwgeyB1cmw6IHBvZGNhc3RMaW5rLCB0aXRsZTogcG9zdC5maWVsZHMucG9kY2FzdF90aXRsZSwgY2xhc3NlczogWydibG9jay1saW5rJyArIChwb3N0LmZpZWxkcy5wb2RjYXN0X2Zvcm1hdCA/ICcgaWNvbiAnICsgcG9zdC5maWVsZHMucG9kY2FzdF9mb3JtYXQuUGFydGlhbFRlbXBsYXRlUHJvcHMudG9Mb3dlckNhc2UudG9Mb3dlckNhc2UoKSA6ICcnKV0gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW1hZ2UsIHsgaW1hZ2U6IHBvc3QuZmllbGRzLnBvZGNhc3RfaW1hZ2UsIHNpemU6IFwiY2luZW1hXzYwMFwiLCBjbGFzc2VzOiBbJ2Jsb2NrLXRodW1ibmFpbCddIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJibG9jay1jb250ZW50LXdyYXBwZXJcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZGluZywgeyB0YWc6IFwiaDNcIiwgcHJldGl0bGU6IHBvc3QucG9zdF90eXBlX2RldGFpbHMucG9zdF90eXBlX2Rpc3BsYXlfbmFtZSwgdGl0bGU6IHBvc3QuZmllbGRzLnBvZGNhc3RfdGl0bGUgfSksXG4gICAgICAgICAgICAgICAgcG9kY2FzdEV4dGVybmFsVVJMID9cbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgeyBjbGFzc05hbWU6IFwicmVhZC10aW1lXCIgfSwgXCJFeHRlcm5hbCBMaW5rXCIpXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgRE9Qb2RjYXN0QmxvY2s7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJDVEEiLCJIZWFkaW5nIiwiSW1hZ2UiLCJET1BvZGNhc3RCbG9jayIsIl9yZWYiLCJpbmRleCIsInBhbmVsU2xpZGVyIiwicGVyUm93IiwicG9zdCIsInR5cGUiLCJwb2RjYXN0RXh0ZXJuYWxVUkwiLCJmaWVsZHMiLCJwb2RjYXN0X2V4dGVybmFsX3VybCIsInBvZGNhc3RMaW5rIiwicGVybWFsaW5rIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInVybCIsInRpdGxlIiwicG9kY2FzdF90aXRsZSIsImNsYXNzZXMiLCJwb2RjYXN0X2Zvcm1hdCIsIlBhcnRpYWxUZW1wbGF0ZVByb3BzIiwidG9Mb3dlckNhc2UiLCJpbWFnZSIsInBvZGNhc3RfaW1hZ2UiLCJzaXplIiwidGFnIiwicHJldGl0bGUiLCJwb3N0X3R5cGVfZGV0YWlscyIsInBvc3RfdHlwZV9kaXNwbGF5X25hbWUiXSwic291cmNlUm9vdCI6IiJ9