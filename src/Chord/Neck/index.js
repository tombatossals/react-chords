import React from 'react'
import './styles.css'

const Neck = ({ withLetters, tunning, frets }) => {
  const path = frets === 4
   ? `M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50
         M 0 0 V 48 M 10 0 V 48 M 20 0 V 48 M 30 0 V 48 M 40 0 V 48 M 50 0 V 48`
   : `M 0 12 H 50 M 0 24 H 50 M 0 36 H 50 M 0 48 H 50 M 0 60 H 50
         M 0 0 V 60 M 10 0 V 60 M 20 0 V 60 M 30 0 V 60 M 40 0 V 60 M 50 0 V 60`
  return <g>
    <path
      className='Neck'
      d={path} />
    <path className='Nut'
      d='M 0 0 H 50' />
    { withLetters &&
      <g>
        { tunning.map((note, index) =>
          <text key={index} className='Note' x={index * 10} y={frets === 4 ? '56' : '66'}>{note}</text>
        )}
      </g>
    }
  </g>
}

Neck.propTypes = {
  withLetters: React.PropTypes.bool,
  tunning: React.PropTypes.array,
  frets: React.PropTypes.oneOf([ 4, 5 ])
}

Neck.defaultProps = {
  withLetters: false,
  frets: 4
}

export default Neck
