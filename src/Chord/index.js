import React from 'react'
import Neck from './Neck'
import Dot from './Dot'
import Barre from './Barre'
import './styles.css'

const Chord = ({ chord, instrument, version }) => {
  if (chord.positions.length < version) return null

  const position = chord.positions[version - 1]
  return <svg
    className='Chord'
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMinYMin meet'
    viewBox='0 0 68 80'>
    <g transform='translate(37, 10)'>
      <text className='Title'>
        <tspan className='Key'>{chord.key}</tspan>
        <tspan className='Type'>{chord.suffix}</tspan>
      </text>
    </g>
    <g
      transform='translate(13, 22)'>
      <Neck withNotesAtTheEnd
        tunning={instrument.main.tunnings.standard}
        strings={instrument.main.strings}
        frets={position.frets}
        fretsOnChord={instrument.main.fretsOnChord}
        baseFret={position.baseFret}
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
        />
      ))}
    </g>
  </svg>
}

Chord.propTypes = {
  chord: React.PropTypes.any,
  instrument: React.PropTypes.object,
  version: React.PropTypes.number
}

Chord.defaultProps = {
  version: 1
}

export default Chord
