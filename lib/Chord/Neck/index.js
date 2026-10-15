"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jsxDevRuntime = require("react/jsx-dev-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const offsets = {
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
const fretHeight = 12;
const getNeckHorizonalLine = (pos, strings) => `M ${offsets[strings].x} ${fretHeight * pos} H ${offsets[strings].length}`;
const getNeckVerticalLine = (pos, strings, fretsOnChord) => `M ${offsets[strings].y + pos * 10} 0 V ${fretHeight * fretsOnChord}`;
const getNeckPath = (strings, fretsOnChord) => Array.apply(null, Array(fretsOnChord + 1)).map((_, pos) => getNeckHorizonalLine(pos, strings)).join(' ').concat(Array.apply(null, Array(strings)).map((_, pos) => getNeckVerticalLine(pos, strings, fretsOnChord)).join(' '));
const getBarreOffset = (strings, frets, baseFret, capo) => strings === 6 ? frets[0] === 1 || capo ? baseFret > 9 ? -12 : -11 : baseFret > 9 ? -10 : -7 : frets[0] === 1 || capo ? baseFret > 9 ? -1 : 0 : baseFret > 9 ? 3 : 4;
const Neck = ({
  tuning,
  frets,
  strings,
  fretsOnChord,
  baseFret,
  capo,
  lite
}) => {
  return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("g", {
    children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("path", {
      stroke: "#444",
      strokeWidth: "0.25",
      strokeLinecap: "square",
      strokeLinejoin: "square",
      d: getNeckPath(strings, fretsOnChord)
    }, void 0, false), baseFret === 1 ? /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("path", {
      stroke: "#444",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: `M ${offsets[strings].x} 0 H ${offsets[strings].length}`
    }, void 0, false) : /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("text", {
      fontSize: "0.25rem",
      fill: "#444",
      fontFamily: "Verdana",
      x: getBarreOffset(strings, frets, baseFret, capo),
      y: "8",
      children: [baseFret, "fr"]
    }, void 0, true), !lite && /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("g", {
      children: tuning.slice().map((note, index) => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("text", {
        fontSize: "0.3rem",
        fill: "#444",
        fontFamily: "Verdana",
        textAnchor: "middle",
        x: offsets[strings].x + index * 10,
        y: fretHeight * fretsOnChord + 5,
        children: note
      }, index, false))
    }, void 0, false)]
  }, void 0, true);
};
Neck.propTypes = {
  tuning: _propTypes.default.array,
  frets: _propTypes.default.array,
  capo: _propTypes.default.bool,
  strings: _propTypes.default.number.isRequired,
  baseFret: _propTypes.default.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
  fretsOnChord: _propTypes.default.number.isRequired,
  lite: _propTypes.default.bool
};
Neck.defaultProps = {
  baseFret: 1,
  lite: false
};
var _default = exports.default = Neck;