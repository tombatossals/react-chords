import React from "react"
import Chord from "@tombatossals/react-chords/lib/Chord"

const IndexPage = ({ chords, instrument, lite }) => (
  <div className={lite ? "litegrid" : "maingrid"}>
    {chords &&
      chords.map((chord, px) => {
        const show_versions = chord.positions.length > 1
        return chord.positions.map((position, version) => (
          <div key={px + "_" + version}>
            <p className="text-lg">
              {chord.key}
              <span className="text-xs">{chord.suffix}</span>{" "}
              {show_versions && <span className="font-bold text-sm">(v{version})</span>}
            </p>
            <Chord chord={position} instrument={instrument} lite={lite} />
          </div>
        ))
      })}
  </div>
)

export default IndexPage
