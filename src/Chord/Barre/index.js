import React from 'react'
import './styles.css'

const fretXPosition = {
  4: [ 50, 40, 30, 20, 10 ],
  6: [ 60, 50, 40, 30, 20, 10, 0 ]
}

const fretYPosition = [ 2.5, 14, 26, 38 ]

const lastValidBarreString = (frets, barre) => {
  const lastString = frets.lastIndexOf(barre)
  return frets[lastString - 1] >= barre
    ? lastString + 1
    : frets.slice(0, lastString).lastIndexOf(barre) + 1
}

const Barre = ({ barre, frets, strings }) => {
  const string1 = frets.indexOf(barre) + 1
  const string2 = lastValidBarreString(frets, barre)
  const width = (string2 - string1) * 10
  const y = fretYPosition[barre - 1]

  return <rect className='Barre' x={fretXPosition[strings][string2]} y={y} width={width} height='8' />
}

Barre.propTypes = {
  frets: React.PropTypes.array,
  barre: React.PropTypes.number,
  strings: React.PropTypes.number.isRequired
}

export default Barre
