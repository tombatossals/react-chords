import React from 'react';
import { Link } from 'react-router-dom';

export function ThemeToggle ({ theme, onToggle }) {
  const nextThemeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={nextThemeLabel}
      aria-pressed={theme === 'dark'}
      onClick={onToggle}
    >
      <span aria-hidden="true" className="theme-toggle__icon">
        {theme === 'dark' ? '☾' : '☼'}
      </span>
    </button>
  );
}

export function CavaquinhoModeSwitch ({ activeView }) {
  return (
    <nav className="mode-switch" aria-label="Cavaquinho sections">
      <Link
        to="/cavaquinho"
        aria-current={activeView === 'library' ? 'page' : undefined}
        className={`mode-switch__link ${activeView === 'library' ? 'is-active' : ''}`}
      >
        Chord Library
      </Link>
      <Link
        to="/cavaquinho/progression"
        aria-current={activeView === 'progressions' ? 'page' : undefined}
        className={`mode-switch__link ${activeView === 'progressions' ? 'is-active' : ''}`}
      >
        Progressions
      </Link>
    </nav>
  );
}

export function KeyFilterBar ({ instrumentName, selectedInstrument, selectedKey, keys }) {
  return (
    <nav className="key-filter-bar" aria-label={`${instrumentName} keys`}>
      <span className="control-group__label">Key</span>
      <div className="key-filter-bar__chips">
        <Link
          to={`/${selectedInstrument}`}
          aria-current={selectedKey === 'All' ? 'page' : undefined}
          className={`key-filter-chip ${selectedKey === 'All' ? 'is-active' : ''}`}
        >
          All
        </Link>
        {keys.map((key) => (
          <Link
            key={key}
            to={`/${selectedInstrument}/${key}`}
            aria-current={selectedKey === key ? 'page' : undefined}
            className={`key-filter-chip ${selectedKey === key ? 'is-active' : ''}`}
          >
            {key.replace('sharp', '#')}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function InstrumentControls ({
  title,
  subtitle,
  summary,
  modeSwitch,
  keyFilter
}) {
  return (
    <section className="instrument-controls-surface">
      <div className="instrument-controls-surface__header">
        <div>
          {subtitle ? <p className="instrument-controls-surface__eyebrow">{subtitle}</p> : null}
          <h2 className="instrument-controls-surface__title">{title}</h2>
        </div>
        {summary ? <p className="instrument-controls-surface__summary">{summary}</p> : null}
      </div>
      <div className="instrument-controls-surface__controls">
        {modeSwitch
          ? (
              <div className="control-group">
                <span className="control-group__label">Mode</span>
                {modeSwitch}
              </div>
            )
          : null}
        {keyFilter
          ? (
              <div className="control-group control-group--grow">
                {keyFilter}
              </div>
            )
          : null}
      </div>
    </section>
  );
}
