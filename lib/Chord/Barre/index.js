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

var firstValidBarreString = function firstValidBarreString(frets, barre) {
  var firstString = frets.indexOf(barre);
  return frets[firstString + 1] >= barre ? firstString : frets.slice(firstString + 1).indexOf(barre) + firstString + 1;
};

var Barre = function Barre(_ref) {
  var barre = _ref.barre,
      frets = _ref.frets,
      strings = _ref.strings;

  var string1 = firstValidBarreString(frets, barre);
  var string2 = frets.lastIndexOf(barre);
  var width = (string2 - string1) * 10;
  var y = fretYPosition[barre - 1];

  return _react2.default.createElement('rect', {
    fill: '#444',
    x: fretXPosition[strings][string1],
    y: y,
    width: width,
    height: 8.25
  });
};

Barre.propTypes = {
  frets: _propTypes2.default.array,
  barre: _propTypes2.default.number,
  strings: _propTypes2.default.number.isRequired
};

exports.default = Barre;