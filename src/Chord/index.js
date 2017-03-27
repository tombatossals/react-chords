import React from 'react'
import Neck from './Neck'
import Dot from './Dot'
import Barre from './Barre'
import { instrumentPropTypes } from '../utils/propTypes'

const Chord = ({ chord, instrument, lite }) =>
  chord ? <svg
    width='100%'
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMinYMin meet'
    viewBox='0 0 80 70'>
    <g
      transform='translate(13, 13)'>
      <Neck
        tunning={instrument.tunnings.standard}
        strings={instrument.strings}
        frets={chord.frets}
        fretsOnChord={instrument.fretsOnChord}
        baseFret={chord.baseFret}
        lite={lite}
      />
      {chord.barres.map((barre, index) =>
        <Barre
          key={index}
          barre={barre}
          strings={instrument.strings}
          frets={chord.frets}
        />)}
      {chord.frets.map((fret, index) => (
        <Dot
          key={index}
          string={instrument.strings - index}
          fret={fret}
          strings={instrument.strings}
          finger={chord.fingers[index]}
          lite={lite}
        />
      ))}
    </g>
  </svg> : null

Chord.propTypes = {
  chord: React.PropTypes.any,
  instrument: instrumentPropTypes,
  lite: React.PropTypes.bool
}

Chord.defaultProps = {
  lite: false
}

export default Chord
