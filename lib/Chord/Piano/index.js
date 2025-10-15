"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
var blackKeys = {
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
var Piano = function Piano(_ref) {
  var chord = _ref.chord,
    lite = _ref.lite;
  // Remove o número da oitava e converte 'b' para '#' para padronização
  var chordNotes = chord.frets.map(function (note) {
    return note.replace('Db', 'C#').replace('Eb', 'D#').replace('Gb', 'F#').replace('Ab', 'G#').replace('Bb', 'A#');
  });
  return /*#__PURE__*/_react["default"].createElement("g", null, whiteKeys.map(function (note, i) {
    var isPressed = chordNotes.includes(note);
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: "white-".concat(note)
    }, /*#__PURE__*/_react["default"].createElement("rect", {
      x: i * 10,
      y: 0,
      width: 10,
      height: 48,
      fill: isPressed ? '#e5e7eb' : '#ffffff',
      stroke: "#444",
      strokeWidth: "0.25"
    }), isPressed && /*#__PURE__*/_react["default"].createElement("text", {
      x: i * 10 + 5,
      y: 42,
      textAnchor: "middle",
      fontSize: "3px",
      fontFamily: "Arial",
      fill: "#000"
    }, "".concat(note, "4")));
  }), whiteKeys.map(function (note, i) {
    if (!blackKeys[note]) return null;
    var blackNote = blackKeys[note];
    var isPressed = chordNotes.includes(blackNote);
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: "black-".concat(blackNote)
    }, /*#__PURE__*/_react["default"].createElement("rect", {
      x: i * 10 + 7,
      y: 0,
      width: 6,
      height: 30,
      fill: isPressed ? '#e5e7eb' : '#000000',
      stroke: "#444",
      strokeWidth: "0.25"
    }), isPressed && /*#__PURE__*/_react["default"].createElement("text", {
      x: i * 10 + 10,
      y: 25,
      textAnchor: "middle",
      fontSize: "2.5px",
      fontFamily: "Arial",
      fill: "#000"
    }, "".concat(blackNote, "4")));
  }), !lite && chord.octave && /*#__PURE__*/_react["default"].createElement("text", {
    fontSize: "0.3rem",
    fill: "#444",
    fontFamily: "Verdana",
    x: -12,
    y: 24
  }, "Octave: ", chord.octave));
};
Piano.propTypes = {
  chord: _propTypes["default"].object.isRequired,
  lite: _propTypes["default"].bool
};
var _default = exports["default"] = Piano;