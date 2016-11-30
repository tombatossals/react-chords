import React from 'react'
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import Chord from './Chord'

import { renderToStaticMarkup } from 'react-dom/server'

const basedir = path.join(__dirname, '..', 'public', 'svg')
const instruments = [ 'guitar', 'ukelele' ]

const writeSVGFile = (f, svg) =>
  fs.writeFileSync(f, svg)

const createSVGChordAndWriteFile = (chord, version, instrument) => {
  const dirname = path.join(basedir, instrument.name.toLowerCase(), 'chords', chord.key, chord.suffix, version.toString())
  mkdirp(dirname, function (err) {
    if (err) return console.error(err)
    const f = path.join(dirname, `${chord.key}${chord.suffix}.svg`)
    const svg = renderToStaticMarkup(React.createElement(Chord, {
      chord,
      instrument,
      version
    }))

    console.log(f)
    writeSVGFile(f, svg)
  })
}

for (let i of instruments) {
  const instrument = require(`@tombatossals/chords-db/lib/${i}.json`)
  for (let k of Object.keys(instrument.chords)) {
    for (let c of instrument.chords[k]) {
      for (let v of Object.keys(c.positions)) {
        createSVGChordAndWriteFile(c, parseInt(v, 10) + 1, instrument.main)
      }
    }
  }
}
