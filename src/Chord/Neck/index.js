import React from 'react'
import PropTypes from 'prop-types'

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
  Array.apply(null, Array(fretsOnChord + 1)).map((_, pos) => getNeckHorizonalLine(pos, strings)).join(' ').concat(
    Array.apply(null, Array(strings)).map((_, pos) => getNeckVerticalLine(pos, strings)).join(' '))

const getBarreOffset = (strings, frets, baseFret, capo) =>
  strings === 6
  ? frets[0] === 1 || capo ? (baseFret > 9 ? -12 : -11) : (baseFret > 9 ? -10 : -7)
  : frets[0] === 1 || capo ? (baseFret > 9 ? -1 : 0) : (baseFret > 9 ? 3 : 4)

const Neck = ({ tuning, frets, strings, fretsOnChord, baseFret, capo, lite }) => {
  return <g>
    <path
      stroke='#444'
      strokeWidth='0.25'
      strokeLinecap='square'
      strokeLinejoin='square'
      d={getNeckPath(strings, fretsOnChord)} />
    { baseFret === 1
      ? <path
        stroke='#444'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        d={`M ${offsets[strings].x} 0 H ${offsets[strings].length}`}
      />
      : <text
        fontSize='0.25rem'
        fill='#444'
        fontFamily='Verdana'
        x={getBarreOffset(strings, frets, baseFret, capo)}
        y='8'
      >{baseFret}fr</text> }
    { !lite &&
      <g>
        { tuning.slice().map((note, index) =>
          <text
            key={index}
            fontSize='0.3rem'
            fill='#444'
            fontFamily='Verdana'
            textAnchor='middle'
            x={offsets[strings].x + index * 10}
            y='53'
          >{note}</text>
        )}
      </g>
    }
  </g>
}

Neck.propTypes = {
  tuning: PropTypes.array,
  frets: PropTypes.array,
  capo: PropTypes.bool,
  strings: PropTypes.number.isRequired,
  baseFret: PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]),
  fretsOnChord: PropTypes.number.isRequired,
  lite: PropTypes.bool
}

Neck.defaultProps = {
  baseFret: 1,
  lite: false
}

export default Neck
