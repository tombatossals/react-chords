import React from 'react'
import Guitar from './Guitar'

const Suffixes = ({ params }) => {
  return params.instrument === 'guitar'
    ? <Guitar params={params} />
    : null
}

Suffixes.propTypes = {
  params: React.PropTypes.object
}

export default Suffixes
