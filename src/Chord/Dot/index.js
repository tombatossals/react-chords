import React from 'react'

const stringMatrix = {
  6: 0,
  5: 10,
  4: 20,
  3: 30,
  2: 40,
  1: 50
}

const fretMatrix = {
  0: -5,
  1: 6.5,
  2: 18,
  3: 30,
  4: 42,
}

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
  }
}

const radius = {
  open: 2,
  fret: 4
}

const Dot = ({ string, fret, finger }) => (
  <g>
    <circle
      style={fret === '0' ? styles['open'] : styles['fret']}
      cx={stringMatrix[string]}
      cy={fretMatrix[fret]}
      r={fret === '0' ? radius['open'] : radius['fret']}
    />
    {finger &&
      <text style={styles['finger']} x={stringMatrix[string]} y={fretMatrix[fret] + 1}>{ finger }</text>
    }
  </g>
)

Dot.propTypes = {
  string: React.PropTypes.oneOf(Object.keys(stringMatrix)),
  fret: React.PropTypes.oneOf(Object.keys(fretMatrix)),
  finger: React.PropTypes.oneOf([ '1', '2', '3', '4', '5' ])
}

Dot.defaultProps = {
  fret: '0'
}

export default Dot
