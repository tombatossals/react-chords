import React from 'react'
import './styles.css'

const fretXYPosition = [ 2, 14, 26, 38 ]

const Barre = ({ barre, frets }) => {
  const string1 = frets.indexOf(barre) + 1
  const string2 = frets.lastIndexOf(barre) + 1
  const x1 = 50 - 10 * (string2 - 1)
  const x2 = (string2 - string1) * 10
  const y = fretXYPosition[barre - 1]

  return <g>
    <rect className='Barre' x={x1} y={y} width={x2} height='8' />
  </g>
}

Barre.propTypes = {
  frets: React.PropTypes.array,
  barre: React.PropTypes.number
}

export default Barre
