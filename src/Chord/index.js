import React from 'react'
import './styles.css'

const Chord = ({ tunning, name }) => (
  <svg>
    <circle cx={50} cy={50} r={10} fill='red' />
  </svg>
)

Chord.propTypes = {
  tunning: React.PropTypes.string,
  name: React.PropTypes.string
}

Chord.defaultProps = {
  tunning: 'default'
}

export default Chord
