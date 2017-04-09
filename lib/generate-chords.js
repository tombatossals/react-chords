'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _Chord = require('./Chord');

var _Chord2 = _interopRequireDefault(_Chord);

var _server = require('react-dom/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basedir = _path2.default.join(__dirname, '..', 'public', 'svg');
var instruments = ['guitar', 'ukelele'];

var writeSVGFile = function writeSVGFile(f, svg) {
  return _fs2.default.writeFileSync(f, svg);
};

var createSVGChordAndWriteFile = function createSVGChordAndWriteFile(chord, version, instrument) {
  var key = chord.key.replace('#', 'sharp');
  var suffix = chord.suffix.replace('#', 'sharp');
  var dirname = _path2.default.join(basedir, instrument.name.toLowerCase(), 'chords', key, suffix);
  (0, _mkdirp2.default)(dirname, function (err) {
    if (err) return console.error(err);
    var f = _path2.default.join(dirname, key + '-' + suffix + '-' + version + '.svg');
    var svg = (0, _server.renderToStaticMarkup)(_react2.default.createElement(_Chord2.default, {
      chord: chord,
      instrument: instrument,
      version: version
    }));

    console.log(f);
    writeSVGFile(f, svg);
  });
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = instruments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var i = _step.value;

    var instrument = require('@tombatossals/chords-db/lib/' + i + '.json');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Object.keys(instrument.chords)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var k = _step2.value;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = instrument.chords[k][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var c = _step3.value;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = Object.keys(c.positions)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var v = _step4.value;

                createSVGChordAndWriteFile(c, parseInt(v, 10) + 1, instrument.main);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}