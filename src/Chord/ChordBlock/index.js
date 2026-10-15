import React from 'react'
import PropTypes from 'prop-types'
import Chord from '../'

let sharedAudioContext

const getAudioContext = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext
  if (!AudioContextConstructor) {
    return null
  }

  if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
    sharedAudioContext = new AudioContextConstructor()
  }

  return sharedAudioContext
}

// Função para tocar o som do acorde
const playChord = async (position) => {
  const midiNotes = position.midi || []
  if (!midiNotes || midiNotes.length === 0) {
    return
  }

  const audioContext = getAudioContext()
  if (!audioContext) {
    return
  }

  if (audioContext.state === 'suspended') {
    await audioContext.resume()
  }

  const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12)

  midiNotes.forEach(midiNote => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(midiToFreq(midiNote), audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 1)
  })
}

const ChordBlock = ({ instrument, position, name, isPiano }) => {
  if (!position) {
    return null
  }

  const handlePlayClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    playChord(position)
  }

  return (
    <div className='chord-container flex flex-col items-center text-center'>
      <div className='flex items-center justify-center gap-2 mb-2 w-full'>
        <h4 className='text-lg font-semibold leading-tight flex items-center justify-center min-h-[2rem]'>{name}</h4>
        {position.midi && position.midi.length > 0 && (
          <button
            onClick={handlePlayClick}
            aria-label='Tocar acorde'
            className='cursor-pointer w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 focus-visible:text-slate-700'
          >
            <svg width='10' height='10' viewBox='0 0 10 10'>
              <path d='M 2 1 L 2 9 L 8 5 Z' fill='currentColor' />
            </svg>
          </button>
        )}
      </div>
      <Chord instrument={instrument} chord={position} />
    </div>
  )
}

ChordBlock.propTypes = {
  instrument: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  isPiano: PropTypes.bool
}

ChordBlock.defaultProps = {
  isPiano: false
}

export default ChordBlock
