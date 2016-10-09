import React from 'react'
import './styles.css'

const Neck = ({ withNotesAtTheEnd, tunning, frets, baseFret }) => {
  return <g>
    <path
      className='Neck'
      d='M 0 0 H 50 M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50
         M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48' />
    { baseFret === 1
      ? <path className='Nut' d='M 0 0 H 50' />
      : <text className='BaseFret' x={frets[5] === 1 ? (baseFret > 9 ? -12 : -9) : (baseFret > 9 ? -8 : -6)} y='7'>{baseFret}fr</text> }
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
  frets: React.PropTypes.array,
  baseFret: React.PropTypes.oneOf([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ])
}

Neck.defaultProps = {
  withNotesAtTheEnd: false,
  baseFret: 1
}

export default Neck
