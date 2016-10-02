import React from 'react'
import './styles.css'

const fretXYPosition = [ 2.5, 14, 26, 38 ]

const Barre = ({ strings, fret }) => {
  const x1 = 50 - 10 * (strings[1] - 1)
  const x2 = (strings[1] - strings[0]) * 10
  const y = fretXYPosition[fret - 1]

  return <g>
    <rect className='Barre' x={x1} y={y} width={x2} height='8' />
  </g>
}

Barre.propTypes = {
  strings: React.PropTypes.array,
  fret: React.PropTypes.number
}

export default Barre
