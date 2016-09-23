import React from 'react'
import './styles.css'

const Chord = ({ tunning, name }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='200'
    height='300'
    viewBox='0 0 100 100'>
    <g transform='translate(0,0.182918)'>
      <g transform='matrix(1.368608,0,0,1.249953,30.96028,-872.8009)'>
        <path
          style={{ stroke: '#000000', strokeWidth: 0.72000003, strokeLinecap: 'round', strokeLinejoin: 'round' }}
          d='m 0,841.89 116.22,0' />
      </g>
    </g>
  </svg>
)

Chord.propTypes = {
  tunning: React.PropTypes.string,
  name: React.PropTypes.string
}

Chord.defaultProps = {
  tunning: 'default'
}

export default Chord
