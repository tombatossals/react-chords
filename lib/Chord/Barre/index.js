"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var onlyBarres = function onlyBarres(frets, barre) {
  return frets.map(function (f, index) {
    return {
      position: index,
      value: f
    };
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
  var barreFrets = onlyBarres(frets, barre);
  var string1 = barreFrets[0].position;
  var string2 = barreFrets[barreFrets.length - 1].position;
  var width = (string2 - string1) * 10;
  var y = fretYPosition[barre - 1];
  return /*#__PURE__*/_react["default"].createElement("g", null, capo && /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(".concat(getStringPosition(strings, strings), ", ").concat(positions.fret[barreFrets[0].value], ")")
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "\n            M 0, 0\n            m -4, 0\n            a 4,4 0 1,1 8,0\n          ",
    fill: "#555",
    fillOpacity: 0.2,
    transform: "rotate(-90)"
  })), /*#__PURE__*/_react["default"].createElement("rect", {
    fill: "#555",
    x: fretXPosition[strings][0],
    y: fretYPosition[barre - 1],
    width: (strings - 1) * 10,
    fillOpacity: 0.2,
    height: 8.25
  }), /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(".concat(getStringPosition(1, strings), ", ").concat(positions.fret[barreFrets[0].value], ")")
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "\n            M 0, 0\n            m -4, 0\n            a 4,4 0 1,1 8,0\n          ",
    fill: "#555",
    fillOpacity: 0.2,
    transform: "rotate(90)"
  }))), barreFrets.map(function (fret) {
    return /*#__PURE__*/_react["default"].createElement("circle", {
      key: fret.position,
      strokeWidth: "0.25",
      stroke: "#444",
      fill: "#444",
      cx: getStringPosition(strings - fret.position, strings),
      cy: positions.fret[fret.value],
      r: 4
    });
  }), /*#__PURE__*/_react["default"].createElement("rect", {
    fill: "#444",
    x: fretXPosition[strings][string1],
    y: y,
    width: width,
    height: 8.25
  }), !lite && finger && barreFrets.map(function (fret) {
    return /*#__PURE__*/_react["default"].createElement("text", {
      key: fret.position,
      fontSize: "3pt",
      fontFamily: "Verdana",
      textAnchor: "middle",
      fill: "white",
      x: getStringPosition(strings - fret.position, strings),
      y: positions.finger[fret.value]
    }, finger);
  }));
};
Barre.propTypes = {
  frets: _propTypes["default"].array,
  barre: _propTypes["default"].number,
  capo: _propTypes["default"].bool,
  lite: _propTypes["default"].bool,
  finger: _propTypes["default"].oneOf([0, 1, 2, 3, 4, 5])
};
var _default = exports["default"] = Barre;