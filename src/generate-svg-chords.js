import React from 'react';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import Chord from '@tombatossals/react-chords/lib/Chord';

import { renderToStaticMarkup } from 'react-dom/server';

const basedir = path.join(__dirname, '..', 'public', 'static', 'svg');
const instruments = ['guitar', 'ukulele'];

const writeSVGFile = (f, svg) => fs.writeFileSync(f, svg);

const createSVGChordAndWriteFile = (chord, version, instrument) => {
  const key = chord.key.replace('#', 'sharp');
  const suffix = chord.suffix.replace('#', 'sharp').replace("/", "_");
  const dirname = path.join(
    basedir,
    instrument.main.name.toLowerCase(),
    'chords',
    key,
    suffix
  );

  mkdirp(dirname, function(err) {
    if (err) return console.error(err);
    const f = path.join(dirname, `${key}-${suffix}-${version}.svg`);
    const svg = renderToStaticMarkup(
      React.createElement(Chord, {
        chord: chord.positions[version],
        instrument: {
          strings: instrument.main.strings,
          fretsOnChord: instrument.main.fretsOnChord,
          name: instrument.main.name,
          tunings: instrument.tunings
        },
        version
      })
    );

    writeSVGFile(f, svg);
  });
};

for (let i of instruments) {
  const instrument = require(`@tombatossals/chords-db/lib/${i}.json`);
  for (let k of Object.keys(instrument.chords)) {
    for (let c of instrument.chords[k]) {
      for (let v of Object.keys(c.positions)) {
        createSVGChordAndWriteFile(c, parseInt(v, 10) + 1, instrument);
      }
    }
  }
}
