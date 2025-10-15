import React, { useState } from 'react';
import Chord from '@tombatossals/react-chords/lib/Chord';
import guitarChords from '@tombatossals/chords-db/lib/guitar.json';
import ukuleleChords from '@tombatossals/chords-db/lib/ukulele.json';
import pianoChords from '@tombatossals/chords-db/lib/piano.json';
import './App.css';

const instruments = {
    guitar: {
        name: 'Guitar',
        chords: guitarChords,
        config: {
            strings: 6,
            fretsOnChord: 4,
            name: 'Guitar',
            keys: [],
            tunings: {
                standard: ['E', 'A', 'D', 'G', 'B', 'E']
            }
        }
    },
    ukulele: {
        name: 'Ukulele',
        chords: ukuleleChords,
        config: {
            strings: 4,
            fretsOnChord: 4,
            name: 'Ukulele',
            keys: [],
            tunings: {
                standard: ['G', 'C', 'E', 'A']
            }
        }
    },
    piano: {
        name: 'Piano',
        chords: pianoChords,
        config: {
            strings: 0,
            fretsOnChord: 24,
            name: 'Piano',
            keys: [],
            tunings: {
                standard: []
            }
        }
    }
};

/**
 * The piano chords from the database have a different structure.
 * This function converts them to the format react-chords expects.
 * @param {object} chord - The original chord data from piano.json.
 * @returns {object} The converted chord data.
 */
const convertPianoChord = (chord) => ({
    ...chord,
    notes: chord.positions[0].frets, // react-chords expects a 'notes' prop for piano
    baseFret: chord.positions[0].frets[0] // Use the first note to determine octave, etc.
});

/**
 * Formats the chord name for display.
 * Replaces 'sharp' with '#' and handles suffix display.
 * @param {string} key - The chord key (e.g., 'Csharp').
 * @param {string} suffix - The chord suffix (e.g., 'major', 'm').
 * @returns {string} The formatted chord name.
 */
const formatChordName = (key, suffix) => {
    const formattedKey = key.replace('sharp', '#').replace('flat', 'b');
    
    // Don't display 'major' for major chords, just the key.
    if (suffix === 'major') {
        return formattedKey;
    }

    const formattedSuffix = suffix.replace(/sharp/g, '#').replace(/flat/g, 'b');
    return `${formattedKey}${formattedSuffix}`;
};

function App() {
    const [selectedInstrument, setSelectedInstrument] = useState('guitar');
    const [selectedKey, setSelectedKey] = useState('All');
    const [selectedSuffix, setSelectedSuffix] = useState('All');

    const currentInstrumentData = instruments[selectedInstrument];
    const chords = currentInstrumentData.chords;
    const instrument = currentInstrumentData.config;
    const allKeys = Object.keys(chords.chords);

    const availableSuffixes = selectedKey !== 'All' && chords.chords[selectedKey]
        ? [...new Set(chords.chords[selectedKey].map(chord => chord.suffix))]
        : [];

    const handleInstrumentChange = (instrumentName) => {
        setSelectedInstrument(instrumentName);
        setSelectedKey('All');
        setSelectedSuffix('All');
    };

    const handleKeyChange = (key) => {
        setSelectedKey(key);
        setSelectedSuffix('All');
    };

    const keysToRender = selectedKey === 'All'
      ? allKeys
      : allKeys.filter(key => key === selectedKey);

  return (
      <div className="text-center bg-white text-gray-800">
          <header className="bg-gray-800 text-white p-5 text-2xl">
              <h1 className="text-left">Chords Database</h1>
          </header>
          <div className="p-5 max-w-7xl mx-auto text-left">
                <ul className="flex list-none py-4 px-0 m-0 border-b border-gray-200 gap-3">
                    {Object.keys(instruments).map(instrumentName => (
                        <li key={instrumentName}>
                            <button
                                className={`inline-block font-bold rounded py-1 px-3 cursor-pointer no-underline border ${selectedInstrument === instrumentName ? 'bg-blue-500 text-white border-blue-200' : 'border-transparent text-blue-500 hover:bg-gray-200'}`}
                                onClick={() => handleInstrumentChange(instrumentName)}
                            >
                                {instruments[instrumentName].name}
                            </button>
                        </li>
                    ))}
                </ul>
                <main className={`lg:flex lg:gap-5 ${selectedKey !== 'All' ? 'has-sidebar' : ''}`}>
                    {selectedKey !== 'All' && (
                        <aside className="lg:flex-shrink-0 lg:w-52 py-4">
                            <ul className="list-none p-0 m-0">
                                <li className="p-1 text-xl font-bold">Suffixes:</li>
                                <li>
                                    <button
                                        className={`block w-full text-left rounded py-1 px-3 cursor-pointer ${selectedSuffix === 'All' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                        onClick={() => setSelectedSuffix('All')}
                                    >
                                        All
                                    </button>
                                </li>
                                {availableSuffixes.map(suffix => (
                                    <li key={suffix}>
                                        <button
                                            className={`block w-full text-left rounded py-1 px-3 cursor-pointer ${selectedSuffix === suffix ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                            onClick={() => setSelectedSuffix(suffix)}
                                        >
                                            {formatChordName(selectedKey, suffix)}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    )}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-3xl font-medium my-4">{instrument.name}</h2>
                        <ul className="flex flex-wrap list-none p-0 pb-5 m-0 items-center gap-3">
                            <li className="font-bold">Keys:</li>
                            <li>
                                <button
                                    className={`inline-block font-bold rounded py-1 px-3 cursor-pointer no-underline border ${selectedKey === 'All' ? 'bg-blue-500 text-white border-blue-200' : 'border-transparent text-blue-500 hover:bg-gray-200'}`}
                                    onClick={() => handleKeyChange('All')}
                                >
                                    All
                                </button>
                            </li>
                            {allKeys.map(key => (
                                <li key={key}>
                                    <button
                                        className={`inline-block font-bold rounded py-1 px-3 cursor-pointer no-underline border ${selectedKey === key ? 'bg-blue-500 text-white border-blue-200' : 'border-transparent text-blue-500 hover:bg-gray-200'}`}
                                        onClick={() => handleKeyChange(key)}
                                    >
                                        {key.replace('sharp', '#')}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {keysToRender.map(key => (
                            <div key={key} className="mb-10">
                                {selectedKey === 'All' && <h3 className="border-b border-gray-200 pb-2 mb-5">{key}</h3>}
                                <div className={`chords-grid grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 ${selectedKey === 'All' ? 'all-selected' : ''} ${selectedSuffix !== 'All' ? 'suffix-selected' : ''}`}>
                                    {/* This is the new, corrected rendering logic */}
                                    {selectedInstrument === 'piano'
                                        ? (chords.chords[key] || [])
                                            .filter(chord => selectedSuffix === 'All' || chord.suffix === selectedSuffix)
                                            .map(chord => (
                                                <div key={`${chord.key}-${chord.suffix}`} className="flex flex-col items-center text-center">
                                                    <h4 className="mb-2 text-base font-normal">{formatChordName(chord.key, chord.suffix)}</h4>
                                                    <Chord chord={convertPianoChord(chord)} instrument={instrument} lite={false} />
                                                </div>
                                            ))
                                        : (chords.chords[key] || [])
                                            .filter(chord => selectedSuffix === 'All' || chord.suffix === selectedSuffix)
                                            .map((chord, chordIndex) => {
                                                const positionsToRender = selectedSuffix !== 'All' ? chord.positions : chord.positions.slice(0, 1);
                                                return positionsToRender.map((position, posIndex) => (
                                                    <div key={`${chordIndex}-${posIndex}`} className="flex flex-col items-center text-center">
                                                        <h4 className="mb-2 text-base font-normal">{formatChordName(chord.key, chord.suffix)}</h4>
                                                        <Chord chord={position} instrument={instrument} lite={false} />
                                                    </div>
                                                ));
                                            })
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
          </div>
      </div>
  );
}

export default App;
