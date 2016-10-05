import React from 'react'

const NotFound = ({ location }) => (
  <div>
    <h2>Following page is not found: {location.pathname}</h2>
  </div>
)

NotFound.propTypes = {
  location: React.PropTypes.string
}

export default NotFound
