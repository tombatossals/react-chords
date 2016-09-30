import React from 'react'
import Frets from './Frets'
import Dot from './Dot'
import instruments from './instruments'

const Chord = ({ instrument, tunning, keyName, type }) => {
  const i = instruments[instrument]
  const chord = i.chords[keyName].find(chord => chord.type === type)
  return (
    <svg
      className='Chord'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMinYMin meet'
      viewBox='0 0 60 80'>
      <g
        transform='translate(5, 15)'>
        <Frets letters />
        { chord.frets.map((fret, string) => (
          <Dot key={string} string={string + 1} fret={fret} finger={chord.fingers[string]} />
        ))}
      </g>
    </svg>
  )
}

Chord.propTypes = {
  tunning: React.PropTypes.string,
  instrument: React.PropTypes.string,
  keyName: React.PropTypes.string,
  type: React.PropTypes.string
}

Chord.defaultProps = {
  tunning: 'default',
  instrument: 'guitar',
  keyName: 'C',
  type: 'major'
}

export default Chord
