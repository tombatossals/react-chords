import React from 'react'
import Frets from './Frets'
import Dot from './Dot'

const Chord = ({ tunning, name }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMinYMin meet'
    viewBox='0 0 60 80'>
    <g
      transform='translate(5, 15)'>
      <Frets letters />
      <Dot string='6' />
      <Dot string='5' fret='2' finger='2' />
      <Dot string='4' fret='2' finger='3' />
      <Dot string='3' fret='1' finger='1' />
      <Dot string='2' />
      <Dot string='1' />
    </g>
  </svg>
)

Chord.propTypes = {
  tunning: React.PropTypes.string,
  instrument: React.PropTypes.string,
  name: React.PropTypes.string
}

Chord.defaultProps = {
  tunning: 'default',
  instrument: 'guitar'
}

export default Chord
