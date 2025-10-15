"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ = _interopRequireDefault(require("../"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Função para tocar o som do acorde
var playChord = function playChord(position) {
  var midiNotes = position.midi || [];
  if (!midiNotes || midiNotes.length === 0) {
    return;
  }
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var midiToFreq = function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  };
  midiNotes.forEach(function (midiNote) {
    var oscillator = audioContext.createOscillator();
    var gainNode = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(midiToFreq(midiNote), audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  });
};
var ChordBlock = function ChordBlock(_ref) {
  var instrument = _ref.instrument,
    position = _ref.position,
    name = _ref.name,
    isPiano = _ref.isPiano;
  if (!position) {
    return null;
  }
  var handlePlayClick = function handlePlayClick(e) {
    e.stopPropagation();
    e.preventDefault();
    playChord(position);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "chord-container flex flex-col items-center text-center",
    style: {
      display: "ruby"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-center items-center mb-2"
  }, /*#__PURE__*/_react["default"].createElement("h4", {
    className: "text-base font-normal mr-2 h-8 flex items-center"
  }, name), position.midi && position.midi.length > 0 && /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handlePlayClick,
    "aria-label": "Tocar acorde",
    className: "cursor-pointer border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 10 10"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M 2 1 L 2 9 L 8 5 Z",
    fill: "#444"
  })))), /*#__PURE__*/_react["default"].createElement(_["default"], {
    instrument: instrument,
    chord: position
  }));
};
ChordBlock.propTypes = {
  instrument: _propTypes["default"].object.isRequired,
  position: _propTypes["default"].object.isRequired,
  name: _propTypes["default"].string.isRequired,
  isPiano: _propTypes["default"].bool
};
ChordBlock.defaultProps = {
  isPiano: false
};
var _default = exports["default"] = ChordBlock;