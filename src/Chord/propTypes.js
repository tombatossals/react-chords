import PropTypes from 'prop-types'

export const instrumentPropTypes = PropTypes.shape({
  strings: PropTypes.number.isRequired,
  fretsOnChord: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.oneOf([
    'A', 'Ab', 'A#', 'B', 'Bb', 'C', 'C#',
    'D', 'Db', 'D#', 'E', 'Eb', 'F', 'F#',
    'G', 'G#', 'Gb'
  ])),
  tunings: PropTypes.shape({
    standard: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
})
