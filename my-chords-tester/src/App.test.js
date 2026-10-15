import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const React = require('react');
const { fireEvent, render, screen, waitFor, within } = require('@testing-library/react');
const App = require('./App').default;
const { HashRouter } = require('react-router-dom');
const cavaquinhoChords = require('@tombatossals/chords-db/lib/cavaquinho.json');

const renderWithHashRoute = (route) => {
  window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}#${route}`);

  return render(
    <HashRouter>
      <App />
    </HashRouter>
  );
};

describe('Cavaquinho Instrument Support', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)' ? false : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }));
    window.localStorage.clear();
    window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}`);
  });

  test('renders all instruments including cavaquinho', () => {
    renderWithHashRoute('/cavaquinho/C');

    const instrumentNav = screen.getByLabelText('Instruments');

    expect(within(instrumentNav).getByRole('link', { name: 'Guitar' })).toBeInTheDocument();
    expect(within(instrumentNav).getByRole('link', { name: 'Ukulele' })).toBeInTheDocument();
    expect(within(instrumentNav).getByRole('link', { name: 'Piano' })).toBeInTheDocument();
    expect(within(instrumentNav).getByRole('link', { name: 'Cavaquinho' })).toBeInTheDocument();
    expect(within(instrumentNav).queryByRole('link', { name: 'Progressions' })).not.toBeInTheDocument();
  });

  test('cavaquinho is navigable', () => {
    renderWithHashRoute('/cavaquinho/C');

    const cavaquinhoLink = screen.getByRole('link', { name: 'Cavaquinho' });
    expect(cavaquinhoLink).toBeInTheDocument();
    expect(cavaquinhoLink.closest('a').getAttribute('href')).toContain('#/cavaquinho');
  });

  test('uses the page heading as the primary instrument label', () => {
    renderWithHashRoute('/guitar');

    expect(screen.getByRole('heading', { name: 'Guitar', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guitar' })).toHaveAttribute('aria-current', 'page');
  });

  test('renders every C major cavaquinho position on the C key page', () => {
    const { container } = renderWithHashRoute('/cavaquinho/C');

    const cMajor = cavaquinhoChords.chords.C.find(chord => chord.suffix === 'major');
    const renderedPositions = container.querySelectorAll('a[href$="#/cavaquinho/C/major"] svg[viewBox^="0 0 80"]');

    expect(cMajor.positions).toHaveLength(7);
    expect(renderedPositions).toHaveLength(cMajor.positions.length);
  });

  test('uses expanded cavaquinho chord data for C suffixes', () => {
    const expectedCounts = {
      minor: 7,
      m7: 11,
      m7b5: 8,
      dim: 12,
      dim7: 12,
      maj7: 11
    };

    Object.entries(expectedCounts).forEach(([suffix, count]) => {
      const chord = cavaquinhoChords.chords.C.find(chord => chord.suffix === suffix);

      expect(chord).toBeDefined();
      expect(chord.positions).toHaveLength(count);
    });
  });

  test('uses four independent fingers for D minor position 2', () => {
    const dMinor = cavaquinhoChords.chords.D.find(chord => chord.suffix === 'minor');
    const position = dMinor.positions[1];

    expect(position.frets).toEqual([3, 2, 3, 3]);
    expect(position.fingers).toEqual([2, 1, 3, 4]);
    expect(position.barres).toEqual([]);
    expect(position.capo).toBeUndefined();
  });

  test('renders cavaquinho diagrams with six visible frets', () => {
    const { container } = renderWithHashRoute('/cavaquinho/C');

    const cMajorFirstDiagram = container.querySelector('a[href$="#/cavaquinho/C/major"] svg[viewBox="0 0 80 94"]');
    const neckPath = cMajorFirstDiagram.querySelector('path[d*="M 10 72 H 40"]');

    expect(neckPath).toBeInTheDocument();
    expect(neckPath.getAttribute('d')).toContain('V 72');
  });

  test('renders the cavaquinho progression optimizer route', () => {
    renderWithHashRoute('/cavaquinho/progression');

    expect(screen.getByText('Progression Optimizer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add chord' })).toBeInTheDocument();
    expect(screen.queryByText('Total movement score:')).not.toBeInTheDocument();
  });

  test('shows a cavaquinho-only secondary navigation on the chord library page', () => {
    renderWithHashRoute('/cavaquinho');

    expect(screen.getByRole('link', { name: 'Guitar' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ukulele' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Piano' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cavaquinho' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Chord Library' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Progressions' })).toBeInTheDocument();
  });

  test('marks the progression section active on the progression route', () => {
    renderWithHashRoute('/cavaquinho/progression');

    expect(screen.getByRole('link', { name: 'Progressions' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Chord Library' })).not.toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Cavaquinho practice')).toBeInTheDocument();
  });

  test('marks the active key chip on the cavaquinho library route', () => {
    renderWithHashRoute('/cavaquinho/C');

    const keyFilter = screen.getByLabelText('Cavaquinho keys');

    expect(within(keyFilter).getByRole('link', { name: 'C' })).toHaveAttribute('aria-current', 'page');
    expect(within(keyFilter).getByRole('link', { name: 'All' })).not.toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Focused on key C with suffix filters and larger diagram density.')).toBeInTheDocument();
  });

  test('renders and persists the cavaquinho theme toggle', () => {
    renderWithHashRoute('/cavaquinho');

    const appShell = document.querySelector('[data-theme]');
    const topBar = screen.getByRole('banner');
    const toggle = within(topBar).getByRole('button', { name: 'Switch to dark mode' });

    expect(appShell).toHaveAttribute('data-theme', 'light');
    expect(window.localStorage.getItem('testerThemePreference')).toBe('light');

    fireEvent.click(toggle);

    expect(appShell).toHaveAttribute('data-theme', 'dark');
    expect(window.localStorage.getItem('testerThemePreference')).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('renders the global theme toggle on non-cavaquinho routes', () => {
    renderWithHashRoute('/guitar');

    const topBar = screen.getByRole('banner');

    expect(within(topBar).getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Chord Library' })).not.toBeInTheDocument();
  });

  test('does not render the cavaquinho secondary navigation on non-cavaquinho routes', () => {
    renderWithHashRoute('/guitar');

    expect(screen.queryByRole('link', { name: 'Chord Library' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Progressions' })).not.toBeInTheDocument();
  });

  test('updates the optimized progression from dropdown selections', () => {
    window.localStorage.clear();

    const { container } = renderWithHashRoute('/cavaquinho/progression');

    fireEvent.change(screen.getByLabelText('Chord 1 key'), { target: { value: 'F' } });
    fireEvent.change(screen.getByLabelText('Chord 1 suffix'), { target: { value: 'maj7' } });

    expect(screen.getAllByText('Fmaj7').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.chords-grid svg[viewBox^="0 0 80"]')).toHaveLength(4);
  });

  test('shows supported suffix choices in the progression builder', () => {
    window.localStorage.clear();

    renderWithHashRoute('/cavaquinho/progression');

    fireEvent.change(screen.getByLabelText('Chord 1 suffix'), { target: { value: '9' } });

    expect(screen.getAllByText('C9').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('option', { name: '9' }).length).toBeGreaterThan(0);
  });

  test('cycles and releases a manual shape for one progression chord', async () => {
    renderWithHashRoute('/cavaquinho/progression');

    const automaticShape = screen.getByText(/^\d+\/7$/);
    const automaticPosition = Number(automaticShape.textContent.match(/^(\d+)/)[1]);
    const expectedPosition = automaticPosition === 7 ? 1 : automaticPosition + 1;

    fireEvent.click(screen.getByRole('button', { name: 'Next shape for chord 1' }));

    expect(screen.getByText(`${expectedPosition}/7`)).toBeInTheDocument();

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem('cavaquinhoProgression'));
      expect(saved[0].positionIndex).toBe(expectedPosition - 1);
    });
    expect(screen.queryByRole('button', { name: 'Use automatic shape for chord 1' })).not.toBeInTheDocument();
  });

  test('clears only the changed chord manual shape', async () => {
    renderWithHashRoute('/cavaquinho/progression');

    fireEvent.click(screen.getByRole('button', { name: 'Next shape for chord 1' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next shape for chord 2' }));
    fireEvent.change(screen.getByLabelText('Chord 1 key'), { target: { value: 'F' } });

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem('cavaquinhoProgression'));
      expect(saved[0].positionIndex).toBeNull();
      expect(Number.isInteger(saved[1].positionIndex)).toBe(true);
    });
    expect(screen.queryByRole('button', { name: 'Use automatic shape for chord 1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Use automatic shape for chord 2' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next shape for chord 1' }));
    fireEvent.change(screen.getByLabelText('Chord 1 suffix'), { target: { value: 'maj7' } });

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem('cavaquinhoProgression'));
      expect(saved[0].positionIndex).toBeNull();
      expect(Number.isInteger(saved[1].positionIndex)).toBe(true);
    });
  });

  test('restores a saved manual shape after remounting', async () => {
    const firstRender = renderWithHashRoute('/cavaquinho/progression');

    fireEvent.click(screen.getByRole('button', { name: 'Previous shape for chord 1' }));

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem('cavaquinhoProgression'));
      expect(saved[0].positionIndex).toBe(6);
    });

    const savedPosition = JSON.parse(window.localStorage.getItem('cavaquinhoProgression'))[0].positionIndex;
    firstRender.unmount();

    renderWithHashRoute('/cavaquinho/progression');

    expect(screen.getByText(`${savedPosition + 1}/7`)).toBeInTheDocument();
  });

  test('falls back to automatic selection for an outdated saved shape', () => {
    window.localStorage.setItem('cavaquinhoProgression', JSON.stringify([
      { key: 'C', suffix: 'major', positionIndex: 99 },
      null
    ]));

    renderWithHashRoute('/cavaquinho/progression');

    expect(screen.getByText(/^\d+\/7$/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Use automatic shape for chord 1' })).not.toBeInTheDocument();
  });
});
