import React from 'react'
import Neck from './Neck'
import Dot from './Dot'
import Barre from './Barre'
import './styles.css'

const Chord = ({ chord, instrument, version, lite }) => {
  if (chord.positions.length < version) return null

  const position = chord.positions[version - 1]
  return <svg
    className='Chord'
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMinYMin meet'
    viewBox='0 0 80 70'>
    <g
      transform='translate(13, 13)'>
      <Neck
        tunning={instrument.main.tunnings.standard}
        strings={instrument.main.strings}
        frets={position.frets}
        fretsOnChord={instrument.main.fretsOnChord}
        baseFret={position.baseFret}
        lite={lite}
      />
      {position.barres.map((barre, index) =>
        <Barre
          key={index}
          barre={barre}
          strings={instrument.main.strings}
          frets={position.frets}
        />)}
      { position.frets.map((fret, string) => (
        <Dot
          key={string}
          string={string + 1}
          fret={fret}
          strings={instrument.main.strings}
          finger={position.fingers[string]}
          lite={lite}
        />
      ))}
    </g>
  </svg>
}

Chord.propTypes = {
  chord: React.PropTypes.any,
  instrument: React.PropTypes.object,
  version: React.PropTypes.number,
  lite: React.PropTypes.bool
}

Chord.defaultProps = {
  version: 1,
  lite: false
}

export default Chord
