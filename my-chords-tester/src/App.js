import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, Link } from 'react-router-dom';
import ChordBlock from '@tombatossals/react-chords/lib/Chord/ChordBlock';
import guitarChords from '@tombatossals/chords-db/lib/guitar.json';
import ukuleleChords from '@tombatossals/chords-db/lib/ukulele.json';
import pianoChords from '@tombatossals/chords-db/lib/piano.json';
import cavaquinhoChords from '@tombatossals/chords-db/lib/cavaquinho.json';
import { addMidiToPosition } from '@tombatossals/react-chords/lib/Chord/midiUtils';
import { optimizeProgression } from './progressionOptimizer';
import { PrimaryInstrumentNav } from './navigation';
import { ThemeToggle, CavaquinhoModeSwitch, InstrumentControls, KeyFilterBar } from './cavaquinhoShell';
import './App.css';

const THEME_STORAGE_KEY = 'testerThemePreference';

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
  },
  cavaquinho: {
    name: 'Cavaquinho',
    chords: cavaquinhoChords,
    config: {
      strings: 4,
      fretsOnChord: 6,
      name: 'Cavaquinho',
      keys: [],
      tunings: {
        standard: ['D', 'G', 'B', 'D']
      }
    }
  }
};

const defaultProgression = [
  { key: 'C', suffix: 'major', positionIndex: null },
  { key: 'A', suffix: 'm7', positionIndex: null },
  { key: 'D', suffix: 'm7', positionIndex: null },
  { key: 'G', suffix: '7', positionIndex: null }
];

function formatSuffix (suffix) {
  if (suffix === 'm7b5') {
    return 'm7(5b)';
  }

  return suffix.replace(/sharp/g, '#').replace(/flat/g, 'b');
}

function formatChordName (key, suffix) {
  const formattedKey = key.replace('sharp', '#').replace('flat', 'b');

  if (suffix === 'major') {
    return formattedKey;
  }

  return `${formattedKey}${formatSuffix(suffix)}`;
}

function getCavaquinhoSuffixes (key) {
  return (cavaquinhoChords.chords[key] || []).map(chord => chord.suffix);
}

function createProgressionStep () {
  return { key: 'C', suffix: 'major', positionIndex: null };
}

function normalizeProgressionStep (step) {
  const chord = (cavaquinhoChords.chords[step.key] || [])
    .find(candidate => candidate.suffix === step.suffix);
  const positionIndex = Number.isInteger(step.positionIndex) &&
    chord &&
    step.positionIndex >= 0 &&
    step.positionIndex < chord.positions.length
    ? step.positionIndex
    : null;

  return { key: step.key, suffix: step.suffix, positionIndex };
}

function loadSavedProgression () {
  try {
    const saved = window.localStorage.getItem('cavaquinhoProgression');
    if (!saved) {
      return defaultProgression;
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultProgression;
    }

    const validSteps = parsed.filter(step => step && step.key && step.suffix);

    return validSteps.length > 0
      ? validSteps.map(normalizeProgressionStep)
      : defaultProgression;
  } catch (error) {
    return defaultProgression;
  }
}

function getInitialTheme () {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

function useThemePreference () {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}

function AppTopBar ({
  searchTerm,
  onSearchChange,
  contextualLabel,
  theme,
  onToggleTheme,
  selectedInstrument
}) {
  return (
    <header className="app-topbar">
      <div className="app-topbar__inner">
        <div>
          <h1 className="app-topbar__title">Chords Database</h1>
          <p className="app-topbar__subtitle">{contextualLabel}</p>
        </div>
        <div className="app-topbar__controls">
          <div className="app-topbar__actions">
            <PrimaryInstrumentNav
              instruments={instruments}
              selectedInstrument={selectedInstrument}
              className="app-topbar__instrument-nav"
            />
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            {typeof onSearchChange === 'function'
              ? (
                  <label className="app-topbar__search">
                    <span className="sr-only">Search chord</span>
                    <input
                      type="text"
                      placeholder="Search chord..."
                      value={searchTerm}
                      onChange={(event) => onSearchChange(event.target.value)}
                      className="app-topbar__search-input"
                    />
                  </label>
                )
              : null}
          </div>
        </div>
      </div>
    </header>
  );
}

function PageFrame ({ children, searchTerm, onSearchChange, selectedInstrument, theme, onToggleTheme }) {
  const contextualLabel = selectedInstrument === 'cavaquinho'
    ? 'Cavaquinho library and practice'
    : 'Browse instruments and chord shapes';

  return (
    <div className="app-shell" data-theme={theme}>
      <AppTopBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        contextualLabel={contextualLabel}
        theme={theme}
        onToggleTheme={onToggleTheme}
        selectedInstrument={selectedInstrument}
      />
      <div className="app-shell__canvas">
        <div className="app-shell__content">
          {children}
        </div>
      </div>
    </div>
  );
}

function ProgressionOptimizerPage ({ theme, onToggleTheme }) {
  const keys = Object.keys(cavaquinhoChords.chords);
  const [progression, setProgression] = useState(loadSavedProgression);
  const result = React.useMemo(
    () => optimizeProgression(progression, cavaquinhoChords),
    [progression]
  );

  useEffect(() => {
    window.localStorage.setItem('cavaquinhoProgression', JSON.stringify(progression));
  }, [progression]);

  const updateStep = (index, field, value) => {
    setProgression(current => current.map((step, stepIndex) => {
      if (stepIndex !== index) {
        return step;
      }

      if (field === 'key') {
        const suffixes = getCavaquinhoSuffixes(value);
        const suffix = suffixes.includes(step.suffix) ? step.suffix : suffixes[0];

        return { key: value, suffix, positionIndex: null };
      }

      if (field === 'suffix') {
        return { ...step, suffix: value, positionIndex: null };
      }

      return { ...step, [field]: value };
    }));
  };

  const selectShape = (index, positionIndex) => {
    setProgression(current => current.map((step, stepIndex) => stepIndex === index
      ? { ...step, positionIndex }
      : step));
  };

  const cycleShape = (index, currentPositionIndex, positionCount, direction) => {
    const positionIndex = (currentPositionIndex + direction + positionCount) % positionCount;
    selectShape(index, positionIndex);
  };

  const removeStep = (index) => {
    setProgression(current => current.length === 1
      ? current
      : current.filter((_, stepIndex) => stepIndex !== index));
  };

  return (
    <PageFrame
      selectedInstrument="cavaquinho"
      theme={theme}
      onToggleTheme={onToggleTheme}
    >
      <main className="cavaquinho-page">
        <InstrumentControls
          title="Cavaquinho"
          subtitle="Cavaquinho practice"
          summary="Progression mode chooses cavaquinho shapes with low movement while keeping manual shape overrides available."
          modeSwitch={<CavaquinhoModeSwitch activeView="progressions" />}
        />

        <section className="content-surface content-surface--stacked content-surface--light-canvas">
          <div className="progression-toolbar">
            <div>
              <p className="content-surface__eyebrow">Progression Optimizer</p>
              <h3 className="content-surface__title">Build a progression, then inspect the best shape path</h3>
            </div>
            <p className="content-surface__supporting">
              Choose a chord sequence and the optimizer will pick cavaquinho voicings with minimum finger movement.
            </p>
          </div>

          <div className="grid gap-3 mb-5">
            {progression.map((step, index) => {
              const suffixes = getCavaquinhoSuffixes(step.key);

              return (
                <div key={index} className="progression-step-card">
                  <span className="progression-step-card__index">{index + 1}.</span>
                  <label>
                    <span className="sr-only">Key</span>
                    <select
                      aria-label={`Chord ${index + 1} key`}
                      value={step.key}
                      onChange={(event) => updateStep(index, 'key', event.target.value)}
                      className="form-select"
                    >
                      {keys.map(key => (
                        <option key={key} value={key}>{key}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Suffix</span>
                    <select
                      aria-label={`Chord ${index + 1} suffix`}
                      value={step.suffix}
                      onChange={(event) => updateStep(index, 'suffix', event.target.value)}
                      className="form-select"
                    >
                      {suffixes.map(suffix => (
                        <option key={suffix} value={suffix}>{formatSuffix(suffix) || 'major'}</option>
                      ))}
                    </select>
                  </label>
                  <strong className="progression-step-card__name">{formatChordName(step.key, step.suffix)}</strong>
                  <button
                    type="button"
                    aria-label={`Remove chord ${index + 1}`}
                    onClick={() => removeStep(index)}
                    className="progression-step-card__remove"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          <div className="action-row">
            <button
              type="button"
              onClick={() => setProgression(current => current.concat(createProgressionStep()))}
              className="accent-button"
            >
              Add chord
            </button>
            <button
              type="button"
              onClick={() => setProgression(defaultProgression)}
              className="quiet-button"
            >
              Reset
            </button>
          </div>

          {result.missing.length > 0
            ? (
                <div className="alert-surface">
                  Missing data for {result.missing.map(step => formatChordName(step.key, step.suffix)).join(', ')}.
                </div>
              )
            : (
                <>
                  <div className="chords-grid chords-grid--progression grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
                    {result.steps.map((step, index) => {
                      const positionCount = step.chord.positions.length;

                      return (
                        <div key={`${step.key}-${step.suffix}-${index}`} className="progression-result-card text-center">
                          <div className="progression-result-card__diagram-stage">
                            <ChordBlock
                              instrument={instruments.cavaquinho.config}
                              position={step.position}
                              name={formatChordName(step.key, step.suffix)}
                            />
                            <div className="shape-control-row">
                              <button
                                type="button"
                                aria-label={`Previous shape for chord ${index + 1}`}
                                title="Previous shape"
                                onClick={() => cycleShape(index, step.positionIndex, positionCount, -1)}
                                className="shape-control-button shape-control-button--left"
                              >
                                ‹
                              </button>
                              <button
                                type="button"
                                aria-label={`Next shape for chord ${index + 1}`}
                                title="Next shape"
                                onClick={() => cycleShape(index, step.positionIndex, positionCount, 1)}
                                className="shape-control-button shape-control-button--right"
                              >
                                ›
                              </button>
                            </div>
                          </div>
                          <div className="diagram-meta">{step.positionIndex + 1}/{positionCount}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
        </section>
      </main>
    </PageFrame>
  );
}

function ChordBrowser ({ theme, onToggleTheme }) {
  const params = useParams();
  const selectedInstrument = params.instrument || 'guitar';
  const selectedKey = params.key || 'All';
  const selectedSuffix = params.suffix || 'All';
  const [searchTerm, setSearchTerm] = useState('');

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

  const sharedSummary = selectedKey === 'All'
    ? `Browse ${instrument.name.toLowerCase()} key and suffix family.`
    : `Focused on key ${selectedKey.replace('sharp', '#')} with suffix filters and larger diagram density.`;

  return (
    <PageFrame
      selectedInstrument={selectedInstrument}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      theme={theme}
      onToggleTheme={onToggleTheme}
    >
      <main className="browser-layout">
        <InstrumentControls
          title={instrument.name}
          summary={sharedSummary}
          modeSwitch={selectedInstrument === 'cavaquinho' ? <CavaquinhoModeSwitch activeView="library" /> : null}
          keyFilter={(
            <KeyFilterBar
              instrumentName={instrument.name}
              selectedInstrument={selectedInstrument}
              selectedKey={selectedKey}
              keys={allKeys}
            />
          )}
        />

        <section className="browser-main">
          {selectedKey !== 'All' && (
            <aside className="suffix-sidebar content-surface content-surface--compact content-surface--light-canvas">
              <p className="content-surface__eyebrow">Suffix</p>
              <ul className="suffix-sidebar__list">
                <li>
                  <Link
                    to={`/${selectedInstrument}/${selectedKey}`}
                    className={`suffix-sidebar__link ${selectedSuffix === 'All' ? 'is-active' : ''}`}
                  >
                    All
                  </Link>
                </li>
                {availableSuffixes.map(suffix => (
                  <li key={suffix}>
                    <Link
                      to={`/${selectedInstrument}/${selectedKey}/${suffix}`}
                      className={`suffix-sidebar__link ${selectedSuffix === suffix ? 'is-active' : ''}`}
                    >
                      {formatChordName(selectedKey, suffix)}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="browser-results">
            {keysToRender.map(key => {
              const chordsForKey = (chords.chords[key] || []).filter(chord => {
                const chordName = formatChordName(chord.key, chord.suffix);
                const suffixFilter = selectedSuffix === 'All' || chord.suffix === selectedSuffix;
                return suffixFilter && chordName.toLowerCase().includes(searchTerm.toLowerCase());
              });

              if (chordsForKey.length === 0) {
                return null;
              }

              return (
                <div key={key} className="content-surface content-surface--results content-surface--light-canvas">
                  {selectedKey === 'All' && <h3 className="results-section__title">{key.replace('sharp', '#')}</h3>}
                  <div className={`chords-grid grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 ${selectedKey === 'All' ? 'all-selected' : ''} ${selectedSuffix !== 'All' ? 'suffix-selected' : ''}`}>
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
                          const positionsToRender = selectedKey !== 'All' ? chord.positions : chord.positions.slice(0, 1);
                          return positionsToRender.map((position, posIndex) => (
                            <Link to={`/${selectedInstrument}/${chord.key}/${chord.suffix}`} key={`${chordIndex}-${posIndex}`} className="no-underline">
                              <ChordBlock
                                instrument={instrument}
                                position={addMidiToPosition(position, selectedInstrument)}
                                name={formatChordName(chord.key, chord.suffix)}
                              />
                            </Link>
                          ));
                        })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </PageFrame>
  );
}

function App () {
  const { theme, toggleTheme } = useThemePreference();

  return (
    <Routes>
      <Route path="/" element={<ChordBrowser theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/cavaquinho/progression" element={<ProgressionOptimizerPage theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/:instrument" element={<ChordBrowser theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/:instrument/:key" element={<ChordBrowser theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/:instrument/:key/:suffix" element={<ChordBrowser theme={theme} onToggleTheme={toggleTheme} />} />
    </Routes>
  );
}

export default App;
