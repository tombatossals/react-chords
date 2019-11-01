import React from "react"
import Chord from "@tombatossals/react-chords/lib/Chord"

const IndexPage = ({ chords, instrument }) => (
  <div className="maingrid">
    {chords.map((chord, px) =>
      chord.positions.map((position, py) => (
        <div key={px + "_" + py}>
          <p>{`${chord.key}${chord.suffix}`}</p>
          <Chord chord={position} instrument={instrument} lite={false} />
        </div>
      ))
    )}
  </div>
)

export default IndexPage
