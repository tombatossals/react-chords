import React from 'react'
import './styles.css'

const Neck = ({ withNotesAtTheEnd, tunning, firstFret }) => {
  return <g>
    <path
      className='Neck'
      d='M 0 0 H 50 M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50
         M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48' />
    { firstFret === 1
      ? <path className='Nut' d='M 0 0 H 50' />
      : <text className='FirstFret' x='-10' y='7'>{firstFret}fr</text> }
    { withNotesAtTheEnd &&
      <g>
        { tunning.map((note, index) =>
          <text key={index} className='Note' x={index * 10} y='56'>{note}</text>
        )}
      </g>
    }
  </g>
}

Neck.propTypes = {
  withNotesAtTheEnd: React.PropTypes.bool,
  tunning: React.PropTypes.array,
  firstFret: React.PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ])
}

Neck.defaultProps = {
  withNotesAtTheEnd: false,
  firstFret: 1
}

export default Neck
