'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return 'M ' + offsets[strings].x + ' ' + 12 * pos + ' H ' + offsets[strings].length;
};

var getNeckVerticalLine = function getNeckVerticalLine(pos, strings) {
  return 'M ' + (offsets[strings].y + pos * 10) + ' 0 V 48';
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

  return _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('path', {
      stroke: '#444',
      strokeWidth: '0.25',
      strokeLinecap: 'square',
      strokeLinejoin: 'square',
      d: getNeckPath(strings, fretsOnChord) }),
    baseFret === 1 ? _react2.default.createElement('path', {
      stroke: '#444',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      d: 'M ' + offsets[strings].x + ' 0 H ' + offsets[strings].length
    }) : _react2.default.createElement(
      'text',
      {
        fontSize: '0.25rem',
        fill: '#444',
        fontFamily: 'Verdana',
        x: getBarreOffset(strings, frets, baseFret, capo),
        y: '8'
      },
      baseFret,
      'fr'
    ),
    !lite && _react2.default.createElement(
      'g',
      null,
      tuning.slice().map(function (note, index) {
        return _react2.default.createElement(
          'text',
          {
            key: index,
            fontSize: '0.3rem',
            fill: '#444',
            fontFamily: 'Verdana',
            textAnchor: 'middle',
            x: offsets[strings].x + index * 10,
            y: '53'
          },
          note
        );
      })
    )
  );
};

Neck.propTypes = {
  tuning: _propTypes2.default.array,
  frets: _propTypes2.default.array,
  capo: _propTypes2.default.bool,
  strings: _propTypes2.default.number.isRequired,
  baseFret: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
  fretsOnChord: _propTypes2.default.number.isRequired,
  lite: _propTypes2.default.bool
};

Neck.defaultProps = {
  baseFret: 1,
  lite: false
};

exports.default = Neck;