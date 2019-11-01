import React from "react"
import Chord from "@tombatossals/react-chords/lib/Chord"

const IndexPage = ({ chords, instrument, lite }) => (
  <>
    {chords &&
      chords.map((chord, px) => {
        return chord.positions.map((position, version) => (
          <div key={px + "_" + version}>
            <p className="text-lg">
              {chord.key}
              <span className="text-xs">{chord.suffix}</span>{" "}
              {chord.positions.length > 1 && (
                <span className="font-bold text-sm">(v{version})</span>
              )}
            </p>
            <Chord chord={position} instrument={instrument} lite={lite} />
          </div>
        ))
      })}
  </>
)

export default IndexPage
