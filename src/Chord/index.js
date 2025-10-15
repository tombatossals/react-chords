import React from 'react'
import PropTypes from 'prop-types'
import Neck from './Neck'
import Dot from './Dot'
import Barre from './Barre'
import Piano from './Piano'
import { instrumentPropTypes } from './propTypes'

const onlyDots = chord =>
  chord.frets
  .map((f, index) => ({ position: index, value: f }))
  .filter(f => !chord.barres || chord.barres.indexOf(f.value) === -1)

const Chord = ({ chord, instrument, lite }) =>
  chord && chord.frets ? <svg
    width='100%'
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMinYMin meet'
    viewBox='0 0 80 70'>
    { instrument.name === 'Piano'
      ? (
        <g transform='translate(5, 13)'>
          <Piano chord={chord} lite={lite} />
        </g>
        )
      : (
        <g transform='translate(13, 13)'>
          <Neck
            tuning={instrument.tunings.standard}
            strings={instrument.strings}
            frets={chord.frets}
            capo={chord.capo}
            fretsOnChord={instrument.fretsOnChord}
            baseFret={chord.baseFret}
            lite={lite}
          />

          {chord.barres && chord.barres.map((barre, index) =>
            <Barre
              key={index}
              capo={index === 0 && chord.capo}
              barre={barre}
              finger={chord.fingers && chord.fingers[chord.frets.indexOf(barre)]}
              frets={chord.frets}
              lite={lite}
            />)}

          {onlyDots(chord).map(fret => (
            <Dot
              key={fret.position}
              string={instrument.strings - fret.position}
              fret={fret.value}
              strings={instrument.strings}
              finger={chord.fingers && chord.fingers[fret.position]}
              lite={lite}
            />
          ))}
        </g>
        )
    }
  </svg> : null

Chord.propTypes = {
  chord: PropTypes.any,
  instrument: instrumentPropTypes,
  lite: PropTypes.bool
}

Chord.defaultProps = {
  lite: false
}

export default Chord
