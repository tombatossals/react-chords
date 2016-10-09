import React from 'react'
import Neck from './Neck'
import Dot from './Dot'
import Barre from './Barre'
import './styles.css'

const Chord = ({ chord, tunning, version }) => {
  if (chord.positions.length < version) return null

  const position = chord.positions[version - 1]
  console.log(position)
  return <svg
    className='Chord'
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMinYMin meet'
    viewBox='0 0 68 100'>
    <g className='Title' transform='translate(30, 10)'>
      <text className='Key' x='-7' y='0'>{chord.key}</text>
      <text className='Type' x='0' y='2'>{chord.suffix}</text>
    </g>
    <g
      transform='translate(13, 22)'>
      <Neck withNotesAtTheEnd tunning={tunning} frets={position.frets} baseFret={position.baseFret} />
      {position.barres.map((barre, index) => <Barre key={index} barre={barre} frets={position.frets} />)}

      { position.frets.map((fret, string) => (
        <Dot key={string} string={string + 1} fret={fret} finger={position.fingers[string]} />
      ))}
    </g>
  </svg>
}

Chord.propTypes = {
  chord: React.PropTypes.any,
  tunning: React.PropTypes.array,
  instrument: React.PropTypes.string,
  version: React.PropTypes.number
}

Chord.defaultProps = {
  tunning: [ 'E', 'B', 'G', 'D', 'A', 'E' ],
  instrument: 'guitar',
  version: 1
}

export default Chord
