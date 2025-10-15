"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var positions = {
  string: [50, 40, 30, 20, 10, 0],
  fret: [-4, 6.5, 18, 30, 42, 54],
  finger: [-3, 8, 19.5, 31.5, 43.5]
};
var offset = {
  4: 0,
  6: -1
};
var getStringPosition = function getStringPosition(string, strings) {
  return positions.string[string + offset[strings]];
};
var radius = {
  open: 2,
  fret: 4
};
var Dot = function Dot(_ref) {
  var string = _ref.string,
    fret = _ref.fret,
    finger = _ref.finger,
    strings = _ref.strings,
    lite = _ref.lite;
  return fret === -1 ? /*#__PURE__*/_react["default"].createElement("text", {
    fontSize: "0.7rem",
    fill: "#444",
    fontFamily: "Verdana",
    textAnchor: "middle",
    x: getStringPosition(string, strings),
    y: "-2"
  }, "x") : /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("circle", {
    strokeWidth: "0.25",
    stroke: "#444",
    fill: fret === 0 ? 'transparent' : '#444',
    cx: getStringPosition(string, strings),
    cy: positions.fret[fret],
    r: fret === 0 ? radius['open'] : radius['fret']
  }), !lite && finger > 0 && /*#__PURE__*/_react["default"].createElement("text", {
    fontSize: "3pt",
    fontFamily: "Verdana",
    textAnchor: "middle",
    fill: "white",
    x: getStringPosition(string, strings),
    y: positions.finger[fret]
  }, finger));
};
Dot.propTypes = {
  string: _propTypes["default"].number,
  fret: _propTypes["default"].number,
  finger: _propTypes["default"].oneOf([0, 1, 2, 3, 4, 5]),
  strings: _propTypes["default"].number.isRequired,
  lite: _propTypes["default"].bool
};
Dot.defaultProps = {
  fret: 0,
  lite: false
};
var _default = exports["default"] = Dot;