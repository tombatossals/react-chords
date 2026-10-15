import React from 'react';
import { Link } from 'react-router-dom';

const primaryLinkClasses = (isActive) =>
  `primary-instrument-nav__link ${isActive ? 'is-active' : ''}`;

export function PrimaryInstrumentNav ({ instruments, selectedInstrument, className = '' }) {
  return (
    <ul className={`primary-instrument-nav ${className}`.trim()} aria-label="Instruments">
      {Object.keys(instruments).map((instrumentName) => (
        <li key={instrumentName}>
          <Link
            to={`/${instrumentName}`}
            aria-current={selectedInstrument === instrumentName ? 'page' : undefined}
            className={primaryLinkClasses(selectedInstrument === instrumentName)}
          >
            {instruments[instrumentName].name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
