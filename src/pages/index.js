import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Chord from '@tombatossals/react-chords/lib/Chord'


const IndexPage = () => {
  const guitar = require(`@tombatossals/chords-db/lib/guitar.json`)
  const chord = guitar.chords.C.find(chord => chord.suffix === 'major')
  const instrument = Object.assign(guitar.main, { tunings: guitar.tunings })

  return (
    <Layout>
      <SEO title="Guitar chords database" />
      <Chord chord={chord.positions[0]} instrument={instrument} lite={false} />

    </Layout>)
}

export default IndexPage
