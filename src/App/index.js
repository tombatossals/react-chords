import React from 'react'
import Chord from '@tombatossals/react-chords/lib/Chord'

const guitar = require(`@tombatossals/chords-db/lib/guitar.json`)
const chord = guitar.chords.C.find(chord => chord.suffix === 'major')
const instrument = Object.assign(guitar.main, { tunnings: guitar.tunnings })

const App = () =>
  <Chord chord={chord.positions[0]} instrument={instrument} lite={false} />

export default App
