import { PropTypes } from 'react'

export const instrumentPropTypes = PropTypes.shape({
  strings: PropTypes.number.isRequired,
  fretsOnChord: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.oneOf([
    'A', 'Ab', 'A#', 'B', 'Bb', 'C', 'C#',
    'D', 'Db', 'D#', 'E', 'Eb', 'F', 'F#',
    'G', 'G#', 'Gb'
  ])),
  tunnings: PropTypes.shape({
    standard: PropTypes.arrayOf(PropTypes.oneOf([
      'A', 'B', 'C', 'D', 'E', 'F', 'G'
    ])).isRequired
  }).isRequired
})
