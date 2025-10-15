import React from 'react'
import PropTypes from 'prop-types'

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackKeys = { // Mapeia a nota branca para sua correspondente preta
  C: 'C#', // Db
  D: 'D#', // Eb
  F: 'F#', // Gb
  G: 'G#', // Ab
  A: 'A#'  // Bb
};

const Piano = ({ chord, lite }) => {
  // Remove o número da oitava e converte 'b' para '#' para padronização
  const chordNotes = chord.frets.map(note =>
    note.replace('Db', 'C#').replace('Eb', 'D#').replace('Gb', 'F#').replace('Ab', 'G#').replace('Bb', 'A#')
  );

  return (
    <g>
      {/* Teclas Brancas e seus Nomes */}
      {whiteKeys.map((note, i) => {
        const isPressed = chordNotes.includes(note);
        return (
          <React.Fragment key={`white-${note}`}>
            <rect
              x={i * 10}
              y={0}
              width={10}
              height={48}
              fill={isPressed ? '#e5e7eb' : '#ffffff'}
              stroke='#444'
              strokeWidth='0.25'
            />
            {isPressed && (
              <text
                x={(i * 10) + 5}
                y={42}
                textAnchor="middle"
                fontSize="3px"
                fontFamily="Arial"
                fill="#000"
              >
                {`${note}4`}
              </text>
            )}
          </React.Fragment>
        );
      })}
      {/* Black Keys */}
      {whiteKeys.map((note, i) => {
        if (!blackKeys[note]) return null
        const blackNote = blackKeys[note]
        const isPressed = chordNotes.includes(blackNote);
        return (
          <React.Fragment key={`black-${blackNote}`}>
            <rect
              x={(i * 10) + 7}
              y={0}
              width={6}
              height={30}
              fill={isPressed ? '#e5e7eb' : '#000000'}
              stroke='#444'
              strokeWidth='0.25'
            />
            {isPressed && (
              <text
                x={(i * 10) + 10}
                y={25}
                textAnchor="middle"
                fontSize="2.5px"
                fontFamily="Arial"
                fill="#000"
              >{`${blackNote}4`}</text>
            )}
          </React.Fragment>
        )
      })}
      {/* Octave indicator */}
      {!lite && chord.octave && (
        <text fontSize='0.3rem' fill='#444' fontFamily='Verdana' x={-12} y={24}>
          Octave: {chord.octave}
        </text>
      )}
    </g>
  )
}

Piano.propTypes = {
  chord: PropTypes.object.isRequired,
  lite: PropTypes.bool
}

export default Piano