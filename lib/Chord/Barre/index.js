'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fretXPosition = {
  4: [10, 20, 30, 40, 50],
  6: [0, 10, 20, 30, 40, 50]
};

var fretYPosition = [2.35, 13.9, 26, 38];
var offset = {
  4: 0,
  6: -1
};

var positions = {
  string: [50, 40, 30, 20, 10, 0],
  fret: [-4, 6.5, 18, 30, 42, 54],
  finger: [-3, 8, 19.5, 31.5, 43.5]
};

var getStringPosition = function getStringPosition(string, strings) {
  return positions.string[string + offset[strings]];
};

var onlyBarres = function onlyBarres(frets, barre, capo) {
  return capo ? [{ position: 0, value: barre }, { position: frets.length - 1, value: barre }] : frets.map(function (f, index) {
    return { position: index, value: f };
  }).filter(function (f) {
    return f.value === barre;
  });
};

var Barre = function Barre(_ref) {
  var barre = _ref.barre,
      frets = _ref.frets,
      capo = _ref.capo,
      finger = _ref.finger,
      lite = _ref.lite;

  var strings = frets.length;
  var barreFrets = onlyBarres(frets, barre, capo);

  var string1 = capo ? 0 : barreFrets[0].position;
  var string2 = capo ? strings - 1 : barreFrets[barreFrets.length - 1].position;
  var width = (string2 - string1) * 10;
  var y = fretYPosition[barre - 1];

  return _react2.default.createElement(
    'g',
    null,
    barreFrets.map(function (fret) {
      return _react2.default.createElement('circle', {
        key: fret.position,
        strokeWidth: '0.25',
        stroke: '#444',
        fill: '#444',
        cx: getStringPosition(strings - fret.position, strings),
        cy: positions.fret[fret.value],
        r: 4
      });
    }),
    _react2.default.createElement('rect', {
      fill: '#444',
      x: fretXPosition[strings][string1],
      y: y,
      width: width,
      height: 8.25
    }),
    !lite && finger && barreFrets.map(function (fret) {
      return _react2.default.createElement(
        'text',
        {
          key: fret.position,
          fontSize: '3pt',
          fontFamily: 'Verdana',
          textAnchor: 'middle',
          fill: 'white',
          x: getStringPosition(strings - fret.position, strings),
          y: positions.finger[fret.value]
        },
        finger
      );
    })
  );
};

Barre.propTypes = {
  frets: _propTypes2.default.array,
  barre: _propTypes2.default.number,
  capo: _propTypes2.default.bool,
  lite: _propTypes2.default.bool,
  finger: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5])
};

exports.default = Barre;