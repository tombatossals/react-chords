'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Neck = require('./Neck');

var _Neck2 = _interopRequireDefault(_Neck);

var _Dot = require('./Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _Barre = require('./Barre');

var _Barre2 = _interopRequireDefault(_Barre);

var _propTypes3 = require('./propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onlyDots = function onlyDots(chord) {
  return chord.frets.map(function (f, index) {
    return { position: index, value: f };
  }).filter(function (f) {
    return !chord.barres || chord.barres.indexOf(f.value) === -1;
  });
};

var Chord = function Chord(_ref) {
  var chord = _ref.chord,
      instrument = _ref.instrument,
      lite = _ref.lite;
  return chord ? _react2.default.createElement(
    'svg',
    {
      width: '100%',
      xmlns: 'http://www.w3.org/2000/svg',
      preserveAspectRatio: 'xMinYMin meet',
      viewBox: '0 0 80 70' },
    _react2.default.createElement(
      'g',
      {
        transform: 'translate(13, 13)' },
      _react2.default.createElement(_Neck2.default, {
        tuning: instrument.tunings.standard,
        strings: instrument.strings,
        frets: chord.frets,
        capo: chord.capo,
        fretsOnChord: instrument.fretsOnChord,
        baseFret: chord.baseFret,
        lite: lite
      }),
      chord.barres && chord.barres.map(function (barre, index) {
        return _react2.default.createElement(_Barre2.default, {
          key: index,
          capo: index === 0 && chord.capo,
          barre: barre,
          finger: chord.fingers && chord.fingers[chord.frets.indexOf(barre)],
          frets: chord.frets,
          lite: lite
        });
      }),
      onlyDots(chord).map(function (fret) {
        return _react2.default.createElement(_Dot2.default, {
          key: fret.position,
          string: instrument.strings - fret.position,
          fret: fret.value,
          strings: instrument.strings,
          finger: chord.fingers && chord.fingers[fret.position],
          lite: lite
        });
      })
    )
  ) : null;
};

Chord.propTypes = {
  chord: _propTypes2.default.any,
  instrument: _propTypes3.instrumentPropTypes,
  lite: _propTypes2.default.bool
};

Chord.defaultProps = {
  lite: false
};

exports.default = Chord;