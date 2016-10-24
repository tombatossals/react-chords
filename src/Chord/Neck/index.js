import React from 'react'
import './styles.css'

const offsets = {
  4: {
    x: 10,
    y: 10,
    length: 40
  },
  6: {
    x: 0,
    y: 0,
    length: 50
  }
}

const getNeckHorizonalLine = (pos, strings) =>
  `M ${offsets[strings].x} ${12 * pos} H ${offsets[strings].length}`

const getNeckVerticalLine = (pos, strings) =>
  `M ${offsets[strings].y + pos * 10} 0 V 48`

const getNeckPath = (strings, fretsOnChord) =>
  Array(fretsOnChord + 1).fill().map((_, pos) => getNeckHorizonalLine(pos, strings)).join(' ').concat(
    Array(strings).fill().map((_, pos) => getNeckVerticalLine(pos, strings)).join(' '))

const Neck = ({ withNotesAtTheEnd, tunning, frets, strings, fretsOnChord, baseFret }) => {
  return <g>
    <path
      className='Neck'
      d={getNeckPath(strings, fretsOnChord)} />
    { baseFret === 1
      ? <path className='Nut' d={`M ${offsets[strings].x} 0 H ${offsets[strings].length}`} />
      : <text className='BaseFret' x={frets[5] === 1 ? (baseFret > 9 ? -12 : -9) : (baseFret > 9 ? -8 : -6)} y='7'>{baseFret}fr</text> }
    { withNotesAtTheEnd &&
      <g>
        { tunning.map((note, index) =>
          <text key={index} className='Note' x={offsets[strings].x + index * 10} y='56'>{note}</text>
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
  baseFret: React.PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]),
  fretsOnChord: React.PropTypes.number.isRequired
}

Neck.defaultProps = {
  withNotesAtTheEnd: false,
  baseFret: 1
}

export default Neck
