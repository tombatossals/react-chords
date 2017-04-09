'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positions = {
  string: [50, 40, 30, 20, 10, 0],
  fret: [-4, 6.5, 18, 30, 42, 54],
  finger: [-3, 8, 19.5, 31.5, 43.5]
};

var offset = {
  4: 0,
  6: -1
};

var getStringPosition = function getStringPosition(string, strings) {
  return positions.string[string + offset[strings]];
};

var radius = {
  open: 2,
  fret: 4
};

var Dot = function Dot(_ref) {
  var string = _ref.string,
      fret = _ref.fret,
      finger = _ref.finger,
      strings = _ref.strings,
      lite = _ref.lite;
  return fret === -1 ? _react2.default.createElement(
    'text',
    {
      fontSize: '0.7rem',
      fill: '#444',
      fontFamily: 'Verdana',
      textAnchor: 'middle',
      x: getStringPosition(string, strings),
      y: '-2'
    },
    'x'
  ) : _react2.default.createElement(
    'g',
    null,
    _react2.default.createElement('circle', {
      strokeWidth: '0.25',
      stroke: '#444',
      fill: fret === 0 ? 'transparent' : '#444',
      cx: getStringPosition(string, strings),
      cy: positions.fret[fret],
      r: fret === 0 ? radius['open'] : radius['fret']
    }),
    !lite && finger > 0 && _react2.default.createElement(
      'text',
      {
        fontSize: '3pt',
        fontFamily: 'Verdana',
        textAnchor: 'middle',
        fill: 'white',
        x: getStringPosition(string, strings),
        y: positions.finger[fret]
      },
      finger
    )
  );
};

Dot.propTypes = {
  string: _propTypes2.default.number,
  fret: _propTypes2.default.number,
  finger: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5]),
  strings: _propTypes2.default.number.isRequired,
  lite: _propTypes2.default.bool
};

Dot.defaultProps = {
  fret: 0,
  lite: false
};

exports.default = Dot;