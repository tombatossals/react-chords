import React from 'react'
import PropTypes from 'prop-types'

const fretXPosition = {
  4: [10, 20, 30, 40, 50],
  6: [0, 10, 20, 30, 40, 50]
}

const fretHeight = 12
const getBarreYPosition = fret => fret * fretHeight - 9.65
const offset = {
  4: 0,
  6: -1
}

const positions = {
  string: [50, 40, 30, 20, 10, 0],
  fret: [-4],
  finger: [-3]
}

const getFretPosition = fret =>
  fret === 0 ? positions.fret[0] : fret * fretHeight - 6

const getFingerPosition = fret =>
  fret === 0 ? positions.finger[0] : fret * fretHeight - 4

const getStringPosition = (string, strings) =>
  positions.string[string + offset[strings]]

const onlyBarres = (frets, barre) =>
  frets.map((f, index) => ({ position: index, value: f }))
    .filter(f => f.value === barre)

const Barre = ({ barre, frets, capo, finger, lite }) => {
  const strings = frets.length
  const barreFrets = onlyBarres(frets, barre)

  const string1 = barreFrets[0].position
  const string2 = barreFrets[barreFrets.length - 1].position
  const width = (string2 - string1) * 10
  const y = getBarreYPosition(barre)

  return (
    <g>
      {capo &&
        <g>
          <g
            transform={`translate(${getStringPosition(strings, strings)}, ${getFretPosition(barreFrets[0].value)})`}
          >
            <path
              d={`
            M 0, 0
            m -4, 0
            a 4,4 0 1,1 8,0
          `}
              fill='#555'
              fillOpacity={0.2}
              transform='rotate(-90)'
            />
          </g>
          <rect
            fill='#555'
            x={fretXPosition[strings][0]}
            y={getBarreYPosition(barre)}
            width={(strings - 1) * 10}
            fillOpacity={0.2}
            height={8.25}
          />
          <g
            transform={`translate(${getStringPosition(1, strings)}, ${getFretPosition(barreFrets[0].value)})`}
          >
            <path
              d={`
            M 0, 0
            m -4, 0
            a 4,4 0 1,1 8,0
          `}
              fill='#555'
              fillOpacity={0.2}
              transform='rotate(90)'
            />
          </g>
        </g>}
      {barreFrets.map(fret =>
        <circle
          key={fret.position}
          strokeWidth='0.25'
          stroke='#444'
          fill='#444'
          cx={getStringPosition(strings - fret.position, strings)}
          cy={getFretPosition(fret.value)}
          r={4}
        />
      )}
      <rect
        fill='#444'
        x={fretXPosition[strings][string1]}
        y={y}
        width={width}
        height={8.25}
      />
      {!lite && finger &&
        barreFrets.map(fret =>
          <text
            key={fret.position}
            fontSize='3pt'
            fontFamily='Verdana'
            textAnchor='middle'
            fill='white'
            x={getStringPosition(strings - fret.position, strings)}
            y={getFingerPosition(fret.value)}
          >{finger}
          </text>
        )}
    </g>
  )
}

Barre.propTypes = {
  frets: PropTypes.array,
  barre: PropTypes.number,
  capo: PropTypes.bool,
  lite: PropTypes.bool,
  finger: PropTypes.oneOf([0, 1, 2, 3, 4, 5])
}

export default Barre
