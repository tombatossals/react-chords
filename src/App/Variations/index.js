import React from 'react'
import Guitar from './Guitar'

const Variations = ({ params }) => {
  return params.instrument === 'guitar'
    ? <Guitar params={params} />
    : null
}

Variations.propTypes = {
  params: React.PropTypes.object
}

export default Variations
