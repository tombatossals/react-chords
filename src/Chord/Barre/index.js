import React from 'react'
import './styles.css'

const fretXPosition = {
  4: [ 10, 20, 30, 40, 50 ],
  6: [ 0, 10, 20, 30, 40, 50 ]
}

const fretYPosition = [ 2.5, 14, 26, 38 ]

const firstValidBarreString = (frets, barre) => {
  const firstString = frets.indexOf(barre)
  return frets[firstString + 1] >= barre
    ? firstString
    : frets.slice(firstString + 1).indexOf(barre) + firstString + 1
}

const Barre = ({ barre, frets, strings }) => {
  const string1 = firstValidBarreString(frets, barre)
  const string2 = frets.lastIndexOf(barre)
  const width = (string2 - string1) * 10
  const y = fretYPosition[barre - 1]

  return <rect className='Barre' x={fretXPosition[strings][string1]} y={y} width={width} height='8' />
}

Barre.propTypes = {
  frets: React.PropTypes.array,
  barre: React.PropTypes.number,
  strings: React.PropTypes.number.isRequired
}

export default Barre
