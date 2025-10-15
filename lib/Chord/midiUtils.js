"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMidiToPosition = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var noteToMidi = {
  'C': 0,
  'C#': 1,
  'Db': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11
};

// Afinações padrão em números MIDI (corda mais grave para a mais aguda)
var tunings = {
  guitar: [40, 45, 50, 55, 59, 64],
  // E2, A2, D3, G3, B3, E4
  ukulele: [55, 60, 64, 69] // G3, C4, E4, A4
};

/**
 * Calcula os números MIDI para uma posição de acorde de guitarra ou ukulele.
 * @param {object} position - O objeto de posição do acorde.
 * @param {string} instrumentName - O nome do instrumento ('guitar' ou 'ukulele').
 * @returns {object} A posição do acorde com a propriedade 'midi' adicionada.
 */
var addMidiToPosition = exports.addMidiToPosition = function addMidiToPosition(position, instrumentName) {
  if (position.midi) {
    return position; // Retorna se já tiver dados MIDI (como no piano)
  }
  var tuning = tunings[instrumentName];
  if (!tuning) {
    return position; // Retorna se o instrumento não for suportado
  }
  var midiNotes = position.frets.map(function (fret, stringIndex) {
    if (fret === -1) return null; // Ignora cordas não tocadas
    var openStringMidi = tuning[stringIndex];
    return openStringMidi + fret;
  }).filter(function (note) {
    return note !== null;
  }); // Remove as cordas não tocadas da lista

  return _objectSpread(_objectSpread({}, position), {}, {
    midi: midiNotes
  });
};