import React from 'react'

const stringXYPosition = [ 50, 40, 30, 20, 10, 0 ]
const fretXYPosition = [ -4, 6.5, 18, 30, 42 ]
const fingerXYPosition = [ -3, 7.5, 19, 31, 43 ]

const styles = {
  open: {
    stroke: '#444',
    fill: '#EFEFEF',
    strokeWidth: '0.25'
  },
  fret: {
    fillOpacity: 1,
    fill: '#EEE',
    stroke: '#888',
    strokeWidth: '0.25'
  },
  finger: {
    fontSize: '0.2rem',
    fontWeight: 'bold',
    fill: '#444',
    fontFamily: 'Verdana',
    textAnchor: 'middle',
    alignmentBaseline: 'baseline'
  },
  muted: {
    fontSize: '0.4rem',
    fontWeight: 'bold',
    fill: '#444',
    fontFamily: 'Verdana',
    textAnchor: 'middle',
    alignmentBaseline: 'baseline'
  }
}

const radius = {
  open: 2,
  fret: 4
}

const Dot = ({ string, fret, finger }) =>
  fret === -1
    ? <text
      style={styles['muted']}
      x={stringXYPosition[string]}
      y='-2'
      >x</text>
    : (<g>
      <circle
        style={fret === 0 ? styles['open'] : styles['fret']}
        cx={stringXYPosition[string - 1]}
        cy={fretXYPosition[fret]}
        r={fret === 0 ? radius['open'] : radius['fret']}
      />
      { finger > 0 &&
        <text style={styles['finger']} x={stringXYPosition[string - 1]} y={fingerXYPosition[fret]}>{ finger }</text>}
    </g>)

Dot.propTypes = {
  string: React.PropTypes.number,
  fret: React.PropTypes.oneOf([ -1 ].concat([...Array(fretXYPosition.length).keys()])),
  finger: React.PropTypes.oneOf([ 0, 1, 2, 3, 4 ])
}

Dot.defaultProps = {
  fret: 0
}

export default Dot
