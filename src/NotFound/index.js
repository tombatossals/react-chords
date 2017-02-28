import React from 'react'

const NotFound = ({ location }) => (
  <div>
    <h2>404 Not Found</h2>
  </div>
)

NotFound.propTypes = {
  location: React.PropTypes.object
}

export default NotFound
