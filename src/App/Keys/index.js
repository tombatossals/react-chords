import React from 'react'
import Guitar from './Guitar'

const Keys = ({ params }) => {
  return params.instrument === 'guitar'
    ? <Guitar params={params} />
    : null
}

Keys.propTypes = {
  params: React.PropTypes.object
}

export default Keys
