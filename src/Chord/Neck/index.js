import React from 'react'
import './styles.css'

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

const Neck = ({ withLetters }) => (
  <g>
    <path
      className='Neck'
      d='M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50
         M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48' />
    <path className='Nut'
      d='M 0 0 H 50' />
    { withLetters &&
      <g>
        { strings.map(({ letter, pos }, index) =>
          <text key={index} className='Letters' {...pos}>{letter}</text>
        )}
      </g>
    }
  </g>
)

Neck.propTypes = {
  withLetters: React.PropTypes.bool
}

Neck.defaultProps = {
  withLetters: false
}

export default Neck
