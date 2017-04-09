'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instrumentPropTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instrumentPropTypes = exports.instrumentPropTypes = _propTypes2.default.shape({
  strings: _propTypes2.default.number.isRequired,
  fretsOnChord: _propTypes2.default.number.isRequired,
  name: _propTypes2.default.string.isRequired,
  keys: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['A', 'Ab', 'A#', 'B', 'Bb', 'C', 'C#', 'D', 'Db', 'D#', 'E', 'Eb', 'F', 'F#', 'G', 'G#', 'Gb'])),
  tunnings: _propTypes2.default.shape({
    standard: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired
  }).isRequired
});