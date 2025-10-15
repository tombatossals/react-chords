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
  var chordNotes = chord.notes.map(function (note) {
    return note.slice(0, -1).replace('Db', 'C#').replace('Eb', 'D#').replace('Gb', 'F#').replace('Ab', 'G#').replace('Bb', 'A#');
  });
  return /*#__PURE__*/_react["default"].createElement("g", null, whiteKeys.map(function (note, i) {
    return /*#__PURE__*/_react["default"].createElement("rect", {
      key: note,
      x: i * 10,
      y: 0,
      width: 10,
      height: 48,
      fill: chordNotes.includes(note) ? '#e5e7eb' : '#ffffff',
      stroke: "#444",
      strokeWidth: "0.25"
    });
  }), whiteKeys.map(function (note, i) {
    if (!blackKeys[note]) return null;
    var blackNote = blackKeys[note];
    return /*#__PURE__*/_react["default"].createElement("rect", {
      key: blackNote,
      x: i * 10 + 7,
      y: 0,
      width: 6,
      height: 30,
      fill: chordNotes.includes(blackNote) ? '#e5e7eb' : '#000000',
      stroke: "#444",
      strokeWidth: "0.25"
    });
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