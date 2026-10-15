"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jsxDevRuntime = require("react/jsx-dev-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackKeys = {
  // Mapeia a nota branca para sua correspondente preta
  C: 'C#',
  // Db
  D: 'D#',
  // Eb
  F: 'F#',
  // Gb
  G: 'G#',
  // Ab
  A: 'A#' // Bb
};
const Piano = ({
  chord,
  lite
}) => {
  // Remove o número da oitava e converte 'b' para '#' para padronização
  const chordNotes = chord.frets.map(note => note.replace('Db', 'C#').replace('Eb', 'D#').replace('Gb', 'F#').replace('Ab', 'G#').replace('Bb', 'A#'));
  return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("g", {
    children: [whiteKeys.map((note, i) => {
      const isPressed = chordNotes.includes(note);
      return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_react.default.Fragment, {
        children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("rect", {
          x: i * 10,
          y: 0,
          width: 10,
          height: 48,
          fill: isPressed ? '#e5e7eb' : '#ffffff',
          stroke: "#444",
          strokeWidth: "0.25"
        }, void 0, false), isPressed && /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("text", {
          x: i * 10 + 5,
          y: 42,
          textAnchor: "middle",
          fontSize: "3px",
          fontFamily: "Arial",
          fill: "#000",
          children: `${note}4`
        }, void 0, false)]
      }, `white-${note}`, true);
    }), whiteKeys.map((note, i) => {
      if (!blackKeys[note]) return null;
      const blackNote = blackKeys[note];
      const isPressed = chordNotes.includes(blackNote);
      return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_react.default.Fragment, {
        children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("rect", {
          x: i * 10 + 7,
          y: 0,
          width: 6,
          height: 30,
          fill: isPressed ? '#e5e7eb' : '#000000',
          stroke: "#444",
          strokeWidth: "0.25"
        }, void 0, false), isPressed && /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("text", {
          x: i * 10 + 10,
          y: 25,
          textAnchor: "middle",
          fontSize: "2.5px",
          fontFamily: "Arial",
          fill: "#000",
          children: `${blackNote}4`
        }, void 0, false)]
      }, `black-${blackNote}`, true);
    }), !lite && chord.octave && /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("text", {
      fontSize: "0.3rem",
      fill: "#444",
      fontFamily: "Verdana",
      x: -12,
      y: 24,
      children: ["Octave: ", chord.octave]
    }, void 0, true)]
  }, void 0, true);
};
Piano.propTypes = {
  chord: _propTypes.default.object.isRequired,
  lite: _propTypes.default.bool
};
var _default = exports.default = Piano;