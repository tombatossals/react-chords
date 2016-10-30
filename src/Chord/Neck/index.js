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

const Neck = ({ tunning, frets, strings, fretsOnChord, baseFret, lite }) => {
  return <g>
    <path
      className='Neck'
      d={getNeckPath(strings, fretsOnChord)} />
    { baseFret === 1
      ? <path className='Nut' d={`M ${offsets[strings].x} 0 H ${offsets[strings].length}`} />
      : <text className='BaseFret' x={frets[0] === 1 ? (baseFret > 9 ? -12 : -11) : (baseFret > 9 ? -10 : -7)} y='8'>{baseFret}fr</text> }
    { !lite &&
      <g>
        { tunning.slice().reverse().map((note, index) =>
          <text key={index} className='Note' x={offsets[strings].x + index * 10} y='56'>{note}</text>
        )}
      </g>
    }
  </g>
}

Neck.propTypes = {
  tunning: React.PropTypes.array,
  frets: React.PropTypes.array,
  strings: React.PropTypes.number.isRequired,
  baseFret: React.PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]),
  fretsOnChord: React.PropTypes.number.isRequired,
  lite: React.PropTypes.bool
}

Neck.defaultProps = {
  baseFret: 1,
  lite: false
}

export default Neck
