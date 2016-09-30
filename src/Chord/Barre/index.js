import React from 'react'
import './styles.css'

const Barre = ({ strings, number }) =>
  <g>
    <path d="M0,0 C0,-10 50,-10 50,0" stroke="#E79A16" />
  </g>

Barre.propTypes = {
  strings: React.PropTypes.number,
  fret: React.PropTypes.number
}

export default Barre
