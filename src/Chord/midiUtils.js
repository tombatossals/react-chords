// Afinações padrão em números MIDI (corda mais grave para a mais aguda)
const tunings = {
  guitar: [40, 45, 50, 55, 59, 64], // E2, A2, D3, G3, B3, E4
  ukulele: [55, 60, 64, 69] // G3, C4, E4, A4
}

/**
 * Calcula os números MIDI para uma posição de acorde de guitarra ou ukulele.
 * @param {object} position - O objeto de posição do acorde.
 * @param {string} instrumentName - O nome do instrumento ('guitar' ou 'ukulele').
 * @returns {object} A posição do acorde com a propriedade 'midi' adicionada.
 */
export const addMidiToPosition = (position, instrumentName) => {
  if (position.midi) {
    return position // Retorna se já tiver dados MIDI (como no piano)
  }

  const tuning = tunings[instrumentName]
  if (!tuning) {
    return position // Retorna se o instrumento não for suportado
  }

  const midiNotes = position.frets
    .map((fret, stringIndex) => {
      if (fret === -1) return null // Ignora cordas não tocadas
      const openStringMidi = tuning[stringIndex]
      return openStringMidi + fret
    })
    .filter(note => note !== null) // Remove as cordas não tocadas da lista

  return {
    ...position,
    midi: midiNotes
  }
}
