"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var offsets = {
  4: {
    x: 10,
    y: 10,
    length: 40
  },
  6: {
    x: 0,
    y: 0,
    length: 50
  }
};
var getNeckHorizonalLine = function getNeckHorizonalLine(pos, strings) {
  return "M ".concat(offsets[strings].x, " ").concat(12 * pos, " H ").concat(offsets[strings].length);
};
var getNeckVerticalLine = function getNeckVerticalLine(pos, strings) {
  return "M ".concat(offsets[strings].y + pos * 10, " 0 V 48");
};
var getNeckPath = function getNeckPath(strings, fretsOnChord) {
  return Array.apply(null, Array(fretsOnChord + 1)).map(function (_, pos) {
    return getNeckHorizonalLine(pos, strings);
  }).join(' ').concat(Array.apply(null, Array(strings)).map(function (_, pos) {
    return getNeckVerticalLine(pos, strings);
  }).join(' '));
};
var getBarreOffset = function getBarreOffset(strings, frets, baseFret, capo) {
  return strings === 6 ? frets[0] === 1 || capo ? baseFret > 9 ? -12 : -11 : baseFret > 9 ? -10 : -7 : frets[0] === 1 || capo ? baseFret > 9 ? -1 : 0 : baseFret > 9 ? 3 : 4;
};
var Neck = function Neck(_ref) {
  var tuning = _ref.tuning,
    frets = _ref.frets,
    strings = _ref.strings,
    fretsOnChord = _ref.fretsOnChord,
    baseFret = _ref.baseFret,
    capo = _ref.capo,
    lite = _ref.lite;
  return /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("path", {
    stroke: "#444",
    strokeWidth: "0.25",
    strokeLinecap: "square",
    strokeLinejoin: "square",
    d: getNeckPath(strings, fretsOnChord)
  }), baseFret === 1 ? /*#__PURE__*/_react["default"].createElement("path", {
    stroke: "#444",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M ".concat(offsets[strings].x, " 0 H ").concat(offsets[strings].length)
  }) : /*#__PURE__*/_react["default"].createElement("text", {
    fontSize: "0.25rem",
    fill: "#444",
    fontFamily: "Verdana",
    x: getBarreOffset(strings, frets, baseFret, capo),
    y: "8"
  }, baseFret, "fr"), !lite && /*#__PURE__*/_react["default"].createElement("g", null, tuning.slice().map(function (note, index) {
    return /*#__PURE__*/_react["default"].createElement("text", {
      key: index,
      fontSize: "0.3rem",
      fill: "#444",
      fontFamily: "Verdana",
      textAnchor: "middle",
      x: offsets[strings].x + index * 10,
      y: "53"
    }, note);
  })));
};
Neck.propTypes = {
  tuning: _propTypes["default"].array,
  frets: _propTypes["default"].array,
  capo: _propTypes["default"].bool,
  strings: _propTypes["default"].number.isRequired,
  baseFret: _propTypes["default"].oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
  fretsOnChord: _propTypes["default"].number.isRequired,
  lite: _propTypes["default"].bool
};
Neck.defaultProps = {
  baseFret: 1,
  lite: false
};
var _default = exports["default"] = Neck;