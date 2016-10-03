import React from 'react'
import './styles.css'

const Neck = ({ withLetters, tunning, firstFret }) => {
  return <g>
    <path
      className='Neck'
      d='M 0 0 H 50 M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50
         M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48' />
    { firstFret === 0
      ? <path className='Nut' d='M 0 0 H 50' />
      : <text className='FirstFret' x='-5' y='7'>{firstFret}</text> }
    { withLetters &&
      <g>
        { tunning.map((note, index) =>
          <text key={index} className='Note' x={index * 10} y='56'>{note}</text>
        )}
      </g>
    }
  </g>
}

Neck.propTypes = {
  withLetters: React.PropTypes.bool,
  tunning: React.PropTypes.array,
  firstFret: React.PropTypes.oneOf([ 0, 1, 2, 3, 4, 5 ])
}

Neck.defaultProps = {
  withLetters: false,
  firstFret: 0
}

export default Neck
