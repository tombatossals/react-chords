"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jsxDevRuntime = require("react/jsx-dev-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const positions = {
  string: [50, 40, 30, 20, 10, 0],
  fret: [-4],
  finger: [-3]
};
const fretHeight = 12;
const getFretPosition = fret => fret === 0 ? positions.fret[0] : fret * fretHeight - 6;
const getFingerPosition = fret => fret === 0 ? positions.finger[0] : fret * fretHeight - 4;
const offset = {
  4: 0,
  6: -1
};
const getStringPosition = (string, strings) => positions.string[string + offset[strings]];
const radius = {
  open: 2,
  fret: 4
};
const Dot = ({
  string,
  fret,
  finger,
  strings,
  lite
}) => fret === -1 ? /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("text", {
  fontSize: "0.7rem",
  fill: "#444",
  fontFamily: "Verdana",
  textAnchor: "middle",
  x: getStringPosition(string, strings),
  y: "-2",
  children: "x"
}, void 0, false) : /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("g", {
  children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("circle", {
    strokeWidth: "0.25",
    stroke: "#444",
    fill: fret === 0 ? 'transparent' : '#444',
    cx: getStringPosition(string, strings),
    cy: getFretPosition(fret),
    r: fret === 0 ? radius.open : radius.fret
  }, void 0, false), !lite && finger > 0 && /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("text", {
    fontSize: "3pt",
    fontFamily: "Verdana",
    textAnchor: "middle",
    fill: "white",
    x: getStringPosition(string, strings),
    y: getFingerPosition(fret),
    children: finger
  }, void 0, false)]
}, void 0, true);
Dot.propTypes = {
  string: _propTypes.default.number,
  fret: _propTypes.default.number,
  finger: _propTypes.default.oneOf([0, 1, 2, 3, 4, 5]),
  strings: _propTypes.default.number.isRequired,
  lite: _propTypes.default.bool
};
Dot.defaultProps = {
  fret: 0,
  lite: false
};
var _default = exports.default = Dot;