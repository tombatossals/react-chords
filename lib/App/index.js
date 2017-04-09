'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Chord = require('../Chord');

var _Chord2 = _interopRequireDefault(_Chord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guitar = require('@tombatossals/chords-db/lib/guitar.json');
var chord = guitar.chords.C.find(function (chord) {
  return chord.suffix === 'major';
});
var App = function App() {
  return _react2.default.createElement(_Chord2.default, { chord: chord.positions[0], instrument: guitar.main });
};

exports.default = App;