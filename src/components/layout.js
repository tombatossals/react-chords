/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Menu from "./menu"
import LeftMenu from "./leftmenu"

import "./layout.css"

const guitar = require(`@tombatossals/chords-db/lib/guitar.json`)
const ukulele = require(`@tombatossals/chords-db/lib/guitar.json`)

const only_main_position = chord =>
  Object.assign(chord, { positions: [chord.positions[0]] })

const get_chords = (chords, key, suffix) => {
  const selection = []
  if (!key && !suffix) {
    Object.keys(chords).map(k =>
      chords[k].map(chord => selection.push(only_main_position(chord)))
    )
  } else if (!suffix) {
    chords[key].map(chord => selection.push(only_main_position(chord)))
  } else if (!key) {
    Object.keys(chords).map(k =>
      chords[k]
        .filter(c => c.suffix === suffix)
        .map(chord => selection.push(only_main_position(chord)))
    )
  }
  return selection
}

const Layout = ({ children, pageContext }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const instruments = { guitar, ukulele }
  const i = pageContext.instrument ? pageContext.instrument : "guitar"
  const key = pageContext.key ? pageContext.key.replace("#", "sharp") : ""
  const suffix = pageContext.suffix
    ? pageContext.suffix.replace("#", "sharp")
    : ""

  const chords = get_chords(instruments[i].chords, key, suffix)

  const instrument = Object.assign(instruments[i].main, {
    tunings: instruments[i].tunings,
  })

  const lite = !key && !suffix
  return (
    <div className="container mx-auto text-gray-700">
      <Header siteTitle={data.site.siteMetadata.title} />
      <Menu keys={["All"].concat(instruments[i].keys)} selectedKey={key} />
      <main className="flex mb-4 content-center">
        {key && (
          <div className="w-1/6">
            <LeftMenu
              keys={["All"].concat(instruments[i].keys)}
              selectedKey={key}
              suffixes={instruments[i].suffixes}
              selectedSuffix={suffix}
            />
          </div>
        )}
        <div className={key ? "w-5/6" : "w-6/6"}>
          {React.cloneElement(children, { chords, instrument, lite })}
        </div>
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
