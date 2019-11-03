import React from "react"
import Chord from "@tombatossals/react-chords/lib/Chord"
import { Link } from "gatsby"

const IndexPage = ({ chords, instrument, lite, svg }) => (
  <>
    {chords &&
      chords.map((chord, px) => {
        return chord.positions.map((position, version) =>
          svg ? (
            <a
              href={`/react-chords/static/svg/${instrument.name}/chords/${chord.key.replace(
                "#",
                "sharp"
              )}/${chord.suffix
                .replace("#", "sharp")
                .replace("/", "_")}/${chord.key.replace(
                "#",
                "sharp"
              )}-${chord.suffix
                .replace("#", "sharp")
                .replace("/", "_")}-${version}.svg`}
            >
              <Chord chord={position} instrument={instrument} lite={lite} />
            </a>
          ) : (
            <Link
              key={px + "_" + version}
              to={`/${instrument.name}/${chord.key.replace(
                "#",
                "sharp"
              )}/${chord.suffix.replace("#", "sharp").replace("/", "_")}`}
            >
              <p className="text-lg">
                {chord.key}
                <span className="text-xs">{chord.suffix}</span>{" "}
                {chord.positions.length > 1 && (
                  <span className="font-bold text-sm">(v{version})</span>
                )}
              </p>
              <Chord chord={position} instrument={instrument} lite={lite} />
            </Link>
          )
        )
      })}
  </>
)

export default IndexPage
