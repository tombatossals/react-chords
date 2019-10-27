import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Menu = ({ siteTitle, data }) => (
  <ul
    style={{
      display: `flex`,
      listStyle: `none`,
      fontWeight: `bold`,
      justifyContent: `space-around`
    }}
  >
    <li>Guitar</li>
    <li>Ukelele</li>
  </ul>
)

Menu.propTypes = {
  siteTitle: PropTypes.string,
}

Menu.defaultProps = {
  siteTitle: ``,
}

export default Menu
