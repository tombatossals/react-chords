import React from 'react'
import Chord from '../Chord'

const guitar = require(`@tombatossals/chords-db/lib/guitar.json`)
const chord = guitar.chords.C.find(chord => chord.suffix === 'major')
const App = () =>
  <Chord chord={chord.positions[0]} instrument={guitar.main} />

export default App
