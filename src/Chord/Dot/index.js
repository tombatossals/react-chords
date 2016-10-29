import React from 'react'
import './styles.css'

const positions = {
  string: [ 50, 40, 30, 20, 10, 0 ],
  fret: [ -4, 6.5, 18, 30, 42, 54 ],
  finger: [ -3, 7.75, 19.5, 31.5, 43.5 ]
}

const offset = {
  4: 0,
  6: -1
}

const getStringPosition = (string, strings) =>
  positions.string[ string + offset[strings] ]

const radius = {
  open: 2,
  fret: 4
}

const Dot = ({ string, fret, finger, strings, lite }) =>
  fret === -1
    ? <text
      className='Muted'
      x={getStringPosition(string, strings)}
      y='-2'
      >x</text>
    : (<g>
      <circle
        className={fret === 0 ? 'Open' : 'Fret'}
        cx={getStringPosition(string, strings)}
        cy={positions.fret[fret]}
        r={fret === 0 ? radius['open'] : radius['fret']}
      />
      { !lite && finger > 0 &&
        <text className='Finger' x={getStringPosition(string, strings)} y={positions.finger[fret]}>{ finger }</text>}
    </g>)

Dot.propTypes = {
  string: React.PropTypes.number,
  fret: React.PropTypes.oneOf([ -1 ].concat([...Array(positions.fret.length).keys()])),
  finger: React.PropTypes.oneOf([ 0, 1, 2, 3, 4, 5 ]),
  strings: React.PropTypes.number.isRequired,
  lite: React.PropTypes.bool
}

Dot.defaultProps = {
  fret: 0,
  lite: false
}

export default Dot
