import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Menu = ({ keys, selectedKey }) => (
  <div className="container">
    <ul className="p-4 flex">
      <li className="mr-3">
        <Link
          className="inline-block border border-blue-500 font-bold rounded py-1 px-3 bg-blue-500 text-white"
          to={`/guitar`}
        >
          Guitar
        </Link>
      </li>
      <li className="mr-3">
        <Link
          className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3"
          to={`/ukulele`}
        >
          Ukulele
        </Link>
      </li>
    </ul>
    <ul className="p-4 flex">
      {keys.map(key => (
        <li key={key} className="mr-3">
          <Link
            className={
              (key === selectedKey.replace("sharp", "#")
                ? `bg-blue-500 text-white hover:bg-blue-500 hover:border-blue-200 `
                : `border-white text-blue-500 hover:border-gray-200 hover:bg-gray-200 `) +
              `inline-block border font-bold rounded py-1 px-3`
            }
            to={`/guitar/${key.replace("#", "sharp")}`}
          >
            {key}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

Menu.propTypes = {
  siteTitle: PropTypes.string,
}

Menu.defaultProps = {
  siteTitle: ``,
}

export default Menu
