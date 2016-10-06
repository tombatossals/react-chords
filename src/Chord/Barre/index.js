import React from 'react'
import './styles.css'

const fretXYPosition = [ 2, 14, 26, 38 ]

const Barre = ({ barre, frets, fingers }) => {
  const string1 = frets.indexOf(barre) + 1
  const finger = fingers[string1 - 1]
  const string2 = fingers.map(c => c === finger ? c : -1).lastIndexOf(finger) + 1
  console.log(frets, barre)
  const x1 = 50 - 10 * (string2 - 1)
  const x2 = (string2 - string1) * 10
  const y = fretXYPosition[barre - 1]

  return <g>
    <rect className='Barre' x={x1} y={y} width={x2} height='8' />
  </g>
}

Barre.propTypes = {
  frets: React.PropTypes.array,
  fingers: React.PropTypes.array,
  barre: React.PropTypes.number
}

export default Barre
