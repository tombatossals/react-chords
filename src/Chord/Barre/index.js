import React from 'react'
import './styles.css'

const fretXYPosition = [ 2, 14, 26, 38 ]

const lastValidBarreString = (frets, barre) => {
  const lastString = frets.lastIndexOf(barre)

  return frets[lastString - 1] >= barre
    ? lastString + 1
    : frets.slice(0, lastString).lastIndexOf(barre) + 1
}

const Barre = ({ barre, frets }) => {
  const string1 = frets.indexOf(barre) + 1
  const string2 = lastValidBarreString(frets, barre)

  const x1 = 50 - 10 * (string2 - 1)
  const x2 = (string2 - string1) * 10
  const y = fretXYPosition[barre - 1]

  return <rect className='Barre' x={x1} y={y} width={x2} height='8' />
}

Barre.propTypes = {
  frets: React.PropTypes.array,
  barre: React.PropTypes.number
}

export default Barre
