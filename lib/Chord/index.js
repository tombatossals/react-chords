"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Neck = _interopRequireDefault(require("./Neck"));
var _Dot = _interopRequireDefault(require("./Dot"));
var _Barre = _interopRequireDefault(require("./Barre"));
var _Piano = _interopRequireDefault(require("./Piano"));
var _propTypes2 = require("./propTypes");
var _jsxDevRuntime = require("react/jsx-dev-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const onlyDots = chord => chord.frets.map((f, index) => ({
  position: index,
  value: f
})).filter(f => !chord.barres || chord.barres.indexOf(f.value) === -1);
const getViewBoxHeight = instrument => instrument.name === 'Piano' ? 70 : instrument.fretsOnChord * 12 + 22;
const getFretsOnChord = (instrument, chord) => Math.max(instrument.fretsOnChord, ...chord.frets.filter(fret => fret > 0));
const Chord = ({
  chord,
  instrument,
  lite
}) => {
  if (!chord || !chord.frets) return null;
  const fretsOnChord = instrument.name === 'Piano' ? instrument.fretsOnChord : getFretsOnChord(instrument, chord);
  const renderedInstrument = {
    ...instrument,
    fretsOnChord
  };
  return /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("svg", {
    width: "100%",
    xmlns: "http://www.w3.org/2000/svg",
    preserveAspectRatio: "xMinYMin meet",
    viewBox: `0 0 80 ${getViewBoxHeight(renderedInstrument)}`,
    children: instrument.name === 'Piano' ? /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("g", {
      transform: "translate(5, 13)",
      children: /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_Piano.default, {
        chord: chord,
        lite: lite
      }, void 0, false)
    }, void 0, false) : /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)("g", {
      transform: "translate(13, 13)",
      children: [/*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_Neck.default, {
        tuning: instrument.tunings.standard,
        strings: instrument.strings,
        frets: chord.frets,
        capo: chord.capo,
        fretsOnChord: fretsOnChord,
        baseFret: chord.baseFret,
        lite: lite
      }, void 0, false), chord.barres && chord.barres.map((barre, index) => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_Barre.default, {
        capo: index === 0 && chord.capo,
        barre: barre,
        finger: chord.fingers && chord.fingers[chord.frets.indexOf(barre)],
        frets: chord.frets,
        lite: lite
      }, index, false)), onlyDots(chord).map(fret => /*#__PURE__*/(0, _jsxDevRuntime.jsxDEV)(_Dot.default, {
        string: instrument.strings - fret.position,
        fret: fret.value,
        strings: instrument.strings,
        finger: chord.fingers && chord.fingers[fret.position],
        lite: lite
      }, fret.position, false))]
    }, void 0, true)
  }, void 0, false);
};
Chord.propTypes = {
  chord: _propTypes.default.any,
  instrument: _propTypes2.instrumentPropTypes,
  lite: _propTypes.default.bool
};
Chord.defaultProps = {
  lite: false
};
var _default = exports.default = Chord;