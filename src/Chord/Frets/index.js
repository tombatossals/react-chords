import React from 'react'

const styles = {
  letters: {
    fontSize: '0.2rem',
    fontWeight: 'bold',
    fill: '#444',
    fontFamily: 'Verdana',
    textAnchor: 'middle',
    alignmentBaseline: 'baseline'
  }
}

const Frets = ({ letters }) => (
  <g>
    <path
      style={{
        stroke: '#444',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }}
      d='M 0 0 H 50' />
    <path
      style={{
        stroke: '#666',
        strokeWidth: 0.25,
        strokeLinecap: 'square',
        strokeLinejoin: 'square'
      }}
      d='M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50
        M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48' />
    { letters &&
      <g>
        <text style={styles['finger']} x='10' y='10'>A</text>
      </g>
    }
  </g>
)

Frets.propTypes = {
  letters: React.PropTypes.bool
}

Frets.defaultProps = {
  letters: false
}

export default Frets
