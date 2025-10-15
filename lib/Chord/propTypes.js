"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instrumentPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var instrumentPropTypes = exports.instrumentPropTypes = _propTypes["default"].shape({
  strings: _propTypes["default"].number.isRequired,
  fretsOnChord: _propTypes["default"].number.isRequired,
  name: _propTypes["default"].string.isRequired,
  keys: _propTypes["default"].arrayOf(_propTypes["default"].oneOf(['A', 'Ab', 'A#', 'B', 'Bb', 'C', 'C#', 'D', 'Db', 'D#', 'E', 'Eb', 'F', 'F#', 'G', 'G#', 'Gb'])),
  tunings: _propTypes["default"].shape({
    standard: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired
  }).isRequired
});