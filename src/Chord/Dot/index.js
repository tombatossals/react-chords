import React from 'react'
import PropTypes from 'prop-types'

const positions = {
  string: [50, 40, 30, 20, 10, 0],
  fret: [-4],
  finger: [-3]
}

const fretHeight = 12

const getFretPosition = fret =>
  fret === 0 ? positions.fret[0] : fret * fretHeight - 6

const getFingerPosition = fret =>
  fret === 0 ? positions.finger[0] : fret * fretHeight - 4

const offset = {
  4: 0,
  6: -1
}

const getStringPosition = (string, strings) =>
  positions.string[string + offset[strings]]

const radius = {
  open: 2,
  fret: 4
}

const Dot = ({ string, fret, finger, strings, lite }) =>
  fret === -1
    ? <text fontSize='0.7rem' fill='#444' fontFamily='Verdana' textAnchor='middle' x={getStringPosition(string, strings)} y='-2'>x</text>
    : (
      <g>
        <circle
          strokeWidth='0.25'
          stroke='#444'
          fill={fret === 0 ? 'transparent' : '#444'}
          cx={getStringPosition(string, strings)}
          cy={getFretPosition(fret)}
          r={fret === 0 ? radius.open : radius.fret}
        />
        {!lite && finger > 0 &&
          <text fontSize='3pt' fontFamily='Verdana' textAnchor='middle' fill='white' x={getStringPosition(string, strings)} y={getFingerPosition(fret)}>{finger}</text>}
      </g>)

Dot.propTypes = {
  string: PropTypes.number,
  fret: PropTypes.number,
  finger: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  strings: PropTypes.number.isRequired,
  lite: PropTypes.bool
}

Dot.defaultProps = {
  fret: 0,
  lite: false
}

export default Dot
