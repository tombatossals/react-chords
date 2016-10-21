import React from 'react'
import './styles.css'

const getNeckHorizonalLine = (pos, strings) =>
  `M 0 ${12 * (pos + 1)} H ${(strings - 1) * 10}`

const getNeckVerticalLine = (pos, strings) =>
  `M ${pos * 10} 0 V 48`

const getNeckPath = strings =>
  Array(strings).fill().map((_, pos) => getNeckHorizonalLine(pos, strings)).join(' ').concat(
    Array(strings).fill().map((_, pos) => getNeckVerticalLine(pos, strings)).join(' '))

const Neck = ({ withNotesAtTheEnd, tunning, frets, strings, baseFret }) => {
  return <g>
    <path
      className='Neck'
      d={getNeckPath(strings)} />
    { baseFret === 1
      ? <path className='Nut' d={`M 0 0 H ${(strings - 1) * 10}`} />
      : <text className='BaseFret' x={frets[5] === 1 ? (baseFret > 9 ? -12 : -9) : (baseFret > 9 ? -8 : -6)} y='7'>{baseFret}fr</text> }
    { withNotesAtTheEnd &&
      <g>
        { tunning.map((note, index) =>
          <text key={index} className='Note' x={index * 10} y='56'>{note}</text>
        )}
      </g>
    }
  </g>
}

Neck.propTypes = {
  withNotesAtTheEnd: React.PropTypes.bool,
  tunning: React.PropTypes.array,
  frets: React.PropTypes.array,
  strings: React.PropTypes.number.isRequired,
  baseFret: React.PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ])
}

Neck.defaultProps = {
  withNotesAtTheEnd: false,
  baseFret: 1
}

export default Neck
