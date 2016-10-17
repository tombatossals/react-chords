import React from 'react'
import Guitar from './Guitar'

const Keys = (props) =>
  props.params.instrument === 'guitar'
    ? <Guitar />
    : null

Keys.propTypes = {
  params: React.PropTypes.object
}

export default Keys
