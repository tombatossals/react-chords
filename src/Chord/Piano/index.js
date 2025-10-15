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
  const chordNotes = chord.notes.map(note =>
    note.slice(0, -1)
      .replace('Db', 'C#').replace('Eb', 'D#').replace('Gb', 'F#').replace('Ab', 'G#').replace('Bb', 'A#')
  );

  return (
    <g>
      {/* White Keys */}
      {whiteKeys.map((note, i) => (
        <rect
          key={note}
          x={i * 10}
          y={0}
          width={10}
          height={48}
          fill={chordNotes.includes(note) ? '#e5e7eb' : '#ffffff'}
          stroke='#444'
          strokeWidth='0.25'
        />
      ))}
      {/* Black Keys */}
      {whiteKeys.map((note, i) => {
        if (!blackKeys[note]) return null
        const blackNote = blackKeys[note]
        return (
          <rect
            key={blackNote}
            x={(i * 10) + 7}
            y={0}
            width={6}
            height={30}
            fill={chordNotes.includes(blackNote) ? '#e5e7eb' : '#000000'}
            stroke='#444'
            strokeWidth='0.25'
          />
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