import React from 'react';
import PropTypes from 'prop-types';
import Chord from '../';

// Função para tocar o som do acorde
const playChord = (position) => {
  const midiNotes = position.midi || [];
  if (!midiNotes || midiNotes.length === 0) {
    return;
  }

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  midiNotes.forEach(midiNote => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(midiToFreq(midiNote), audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  });
};

const ChordBlock = ({ instrument, position, name, isPiano }) => {
  if (!position) {
    return null;
  }

  const handlePlayClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    playChord(position);
  };

  return (
    <div className="chord-container flex flex-col items-center text-center" style={{display: "ruby"}}>
      <div className="flex justify-center items-center mb-2">
        <h4 className="text-base font-normal mr-2 h-8 flex items-center">{name}</h4>
        {position.midi && position.midi.length > 0 && (
          <button onClick={handlePlayClick} aria-label="Tocar acorde" className="cursor-pointer border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200">
            <svg width="12" height="12" viewBox="0 0 10 10">
              <path d="M 2 1 L 2 9 L 8 5 Z" fill="#444" />
            </svg>
          </button>
        )}
      </div>
      <Chord instrument={instrument} chord={position} />
    </div>
  );
};

ChordBlock.propTypes = {
  instrument: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  isPiano: PropTypes.bool,
};

ChordBlock.defaultProps = {
  isPiano: false,
};

export default ChordBlock;