import React from 'react'

const styles = {
  letters: {
    fontSize: '0.4rem',
    fontWeight: 'bold',
    fill: '#444',
    fontFamily: 'Verdana',
    textAnchor: 'middle',
    alignmentBaseline: 'baseline'
  }
}

const strings = [
  {
    letter: 'E',
    pos: { x: 0, y: 56 }
  },
  {
    letter: 'A',
    pos: { x: 10, y: 56 }
  },
  {
    letter: 'G',
    pos: { x: 20, y: 56 }
  },
  {
    letter: 'D',
    pos: { x: 30, y: 56 }
  },
  {
    letter: 'B',
    pos: { x: 40, y: 56 }
  },
  {
    letter: 'E',
    pos: { x: 50, y: 56 }
  }
]

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
        { strings.map(({ letter, pos }, index) =>
          <text key={index} style={styles['letters']} {...pos}>{letter}</text>
        )}
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
