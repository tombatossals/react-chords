import React from "react"
import Chord from "@tombatossals/react-chords/lib/Chord"

const IndexPage = ({ chords, instrument, lite }) => (
  <div className="maingrid">
    {chords.map((chord, px) =>
      chord.positions.map((position, py) => (
        <div key={px + "_" + py}>
          <p className="text-lg">
            {chord.key}
            <span className="text-xs">{chord.suffix}</span>
          </p>
          <Chord chord={position} instrument={instrument} lite={lite} />
        </div>
      ))
    )}
  </div>
)

export default IndexPage
