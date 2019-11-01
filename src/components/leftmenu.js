import { Link } from "gatsby"
import React from "react"

const LeftMenu = ({ keys, instrument, selectedKey, suffixes, selectedSuffix }) =>
  selectedKey && (
    <ul className="pl-3">
      <li className="font-bold p-1">Suffixes:</li>
      {suffixes.map(suffix => (
        <li key={suffix} className="mr-3 block">
          <Link
            className={
              (suffix === selectedSuffix.replace("sharp", "#")
                ? `text-blue-500 hover:text-grey-800 `
                : `text-grey-800 hover:text-blue-500 `) +
              `font-bold py-1 px-3`
            }
            to={`/${instrument}/${selectedKey.replace("#", "sharp")}/${suffix.replace(
              "#",
              "sharp"
            )}`}
          >
            {suffix}
          </Link>
        </li>
      ))}
    </ul>
  )

export default LeftMenu
