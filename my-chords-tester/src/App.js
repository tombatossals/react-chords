import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, Link } from 'react-router-dom';
import ChordBlock from '@tombatossals/react-chords/lib/Chord/ChordBlock'
import guitarChords from '@tombatossals/chords-db/lib/guitar.json';
import ukuleleChords from '@tombatossals/chords-db/lib/ukulele.json';
import pianoChords from '@tombatossals/chords-db/lib/piano.json';
import { addMidiToPosition } from '@tombatossals/react-chords/lib/Chord/midiUtils';
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

function ChordBrowser() {
    const params = useParams();

    // O estado agora é derivado da URL, com valores padrão
    const selectedInstrument = params.instrument || 'guitar';
    const selectedKey = params.key || 'All';
    const selectedSuffix = params.suffix || 'All';

    const [searchTerm, setSearchTerm] = useState('');

    // Limpa a busca ao trocar de página
    useEffect(() => {
        setSearchTerm('');
    }, [selectedInstrument, selectedKey, selectedSuffix]);

    const currentInstrumentData = instruments[selectedInstrument];
    const chords = currentInstrumentData.chords;
    const instrument = currentInstrumentData.config;
    const allKeys = Object.keys(chords.chords);

    const availableSuffixes = React.useMemo(() => {
        if (selectedKey === 'All' || !chords.chords[selectedKey]) {
            return [];
        }
        const suffixes = chords.chords[selectedKey].map(chord => chord.suffix);
        return [...new Set(suffixes)];
    }, [chords, selectedKey]);

    const keysToRender = selectedKey === 'All'
      ? allKeys
      : allKeys.filter(key => key === selectedKey);

  return (
      <div className="text-center bg-white text-gray-800">
          <header className="bg-gray-800 text-white p-5 flex justify-between items-center">
              <h1 className="text-2xl">Chords Database</h1>
              <input
                  type="text"
                  placeholder="Search chord..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 rounded text-gray-800 text-base w-1/3"
              />
          </header>
          <div className="p-5 max-w-7xl mx-auto text-left">
                <ul className="flex list-none py-4 px-0 m-0 border-b border-gray-200 gap-3">
                    {Object.keys(instruments).map(instrumentName => (
                        <li key={instrumentName} >
                            <Link
                                to={`/${instrumentName}`}
                                className={`inline-block font-bold rounded py-1 px-3 cursor-pointer no-underline border ${selectedInstrument === instrumentName ? 'bg-blue-500 text-white border-blue-200' : 'border-transparent text-blue-500 hover:bg-gray-200'}`}
                            >
                                {instruments[instrumentName].name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <main className={`lg:flex lg:gap-5 ${selectedKey !== 'All' ? 'has-sidebar' : ''}`}>
                    {selectedKey !== 'All' && (
                        <aside className="lg:flex-shrink-0 lg:w-52 py-4">
                            <ul className="list-none p-0 m-0">
                                <li className="p-1 text-xl font-bold">Suffixes:</li>
                                <li>
                                    <Link
                                        to={`/${selectedInstrument}/${selectedKey}`}
                                        className={`block w-full text-left rounded py-1 px-3 cursor-pointer ${selectedSuffix === 'All' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                    >
                                        All
                                    </Link>
                                </li>
                                {availableSuffixes.map(suffix => (
                                    <li key={suffix}>
                                        <Link
                                            to={`/${selectedInstrument}/${selectedKey}/${suffix}`}
                                            className={`block w-full text-left rounded py-1 px-3 cursor-pointer ${selectedSuffix === suffix ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                        >
                                            {formatChordName(selectedKey, suffix)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    )}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-3xl font-medium my-4">{instrument.name}</h2>
                        <ul className="flex flex-wrap list-none p-0 pb-5 m-0 items-center gap-3">
                            <li className="font-bold">Keys:</li>
                            <li >
                                <Link
                                    to={`/${selectedInstrument}`}
                                    className={`inline-block font-bold rounded py-1 px-3 cursor-pointer no-underline border ${selectedKey === 'All' ? 'bg-blue-500 text-white border-blue-200' : 'border-transparent text-blue-500 hover:bg-gray-200'}`}
                                >
                                    All
                                </Link>
                            </li>
                            {allKeys.map(key => (
                                <li key={key}>
                                    <Link
                                        to={`/${selectedInstrument}/${key}`}
                                        className={`inline-block font-bold rounded py-1 px-3 cursor-pointer no-underline border ${selectedKey === key ? 'bg-blue-500 text-white border-blue-200' : 'border-transparent text-blue-500 hover:bg-gray-200'}`}
                                    >
                                        {key.replace('sharp', '#')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {keysToRender.map(key => {
                            const chordsForKey = (chords.chords[key] || []).filter(chord => {
                                const chordName = formatChordName(chord.key, chord.suffix);
                                const suffixFilter = selectedSuffix === 'All' || chord.suffix === selectedSuffix;
                                return suffixFilter && chordName.toLowerCase().includes(searchTerm.toLowerCase());
                            });

                            if (chordsForKey.length === 0) {
                                return null; // Não renderiza a seção se estiver vazia após o filtro
                            }

                            return (
                                <div key={key} className="mb-10">
                                    {selectedKey === 'All' && <h3 className="border-b border-gray-200 pb-2 mb-5">{key.replace('sharp', '#')}</h3>}
                                    <div className={`chords-grid grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-5 ${selectedKey === 'All' ? 'all-selected' : ''} ${selectedSuffix !== 'All' ? 'suffix-selected' : ''}`}>
                                        {selectedInstrument === 'piano'
                                            ? chordsForKey.map(chord => (
                                                <Link to={`/${selectedInstrument}/${chord.key}/${chord.suffix}`} key={`${chord.key}-${chord.suffix}`} className="no-underline">
                                                    <ChordBlock
                                                        instrument={instrument}
                                                        position={chord.positions[0]}
                                                        name={formatChordName(chord.key, chord.suffix)}
                                                        isPiano={true}
                                                    />
                                                </Link>
                                              ))
                                            : chordsForKey.map((chord, chordIndex) => {
                                                  const positionsToRender = selectedSuffix !== 'All' ? chord.positions : chord.positions.slice(0, 1);
                                                  return positionsToRender.map((position, posIndex) => (
                                                    <Link to={`/${selectedInstrument}/${chord.key}/${chord.suffix}`} key={`${chordIndex}-${posIndex}`} className="no-underline">
                                                        <ChordBlock
                                                            instrument={instrument}
                                                            position={addMidiToPosition(position, selectedInstrument)}
                                                            name={formatChordName(chord.key, chord.suffix)}
                                                        />
                                                    </Link>
                                                  ));
                                              })
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
          </div>
      </div>
  );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<ChordBrowser />} />
            <Route path="/:instrument" element={<ChordBrowser />} />
            <Route path="/:instrument/:key" element={<ChordBrowser />} />
            <Route path="/:instrument/:key/:suffix" element={<ChordBrowser />} />
        </Routes>
    );
}

export default App;
