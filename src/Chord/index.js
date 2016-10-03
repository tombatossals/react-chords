import React from 'react'
import Neck from './Neck'
import Dot from './Dot'
import Barre from './Barre'
import './styles.css'

const Chord = ({ chord, tunning }) => {
  const frets = chord.frets.map(fret =>
    chord.position > 1 ? fret > 0 ? fret - chord.position + 1 : fret : fret
  )

  const barres = chord.barres.map(barre => ({
    fret: chord.position > 1 ? barre.fret - chord.position + 1 : barre.fret,
    strings: barre.strings.slice()
  }))

  return chord
    ? <svg
      className='Chord'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMinYMin meet'
      viewBox='0 0 64 100'>
      <g className='Title' transform='translate(30, 10)'>
        <text className='Key' x='-7' y='0'>{chord.key}</text>
        <text className='Type' x='0' y='2'>{chord.type}</text>
      </g>
      <g
        transform='translate(7, 22)'>
        <Neck withNotesAtTheEnd tunning={tunning} firstFret={chord.position} />
        {barres.map((barre, index) => {
          return barre && <Barre key={index} fret={barre.fret} strings={barre.strings} />
        })}
        { frets.map((fret, string) => (
          <Dot key={string} string={string + 1} fret={fret} finger={chord.fingers && chord.fingers[string]} />
        ))}
      </g>
    </svg>
    : null
}

Chord.propTypes = {
  chord: React.PropTypes.any,
  tunning: React.PropTypes.array,
  instrument: React.PropTypes.string
}

Chord.defaultProps = {
  tunning: 'default',
  instrument: 'guitar'
}

export default Chord
