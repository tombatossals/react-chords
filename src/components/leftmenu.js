import { Link } from "gatsby"
import React from "react"

const LeftMenu = ({ keys, selectedKey, suffixes, selectedSuffix }) =>
  selectedKey && (
    <ul className="pl-3 flex flex-wrap">
      <li className="font-bold p-1">Suffixes:</li>
      {suffixes.map(suffix => (
        <li key={suffix} className="mr-3">
          <Link
            className={
              (suffix === selectedSuffix.replace("sharp", "#")
                ? `bg-blue-500 text-white hover:bg-blue-500 hover:border-blue-200 `
                : `border-white text-blue-500 hover:border-gray-200 hover:bg-gray-200 `) +
              `inline-block border font-bold rounded py-1 px-3`
            }
            to={`/guitar/${selectedKey.replace("#", "sharp")}/${suffix.replace(
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
