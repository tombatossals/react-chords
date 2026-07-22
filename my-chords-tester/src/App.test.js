import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('Cavaquinho Instrument Support', () => {
  test('renders all instruments including cavaquinho', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Guitar')).toBeInTheDocument();
    expect(screen.getByText('Ukulele')).toBeInTheDocument();
    expect(screen.getByText('Piano')).toBeInTheDocument();
    expect(screen.getByText('Cavaquinho')).toBeInTheDocument();
  });

  test('cavaquinho is navigable', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    const cavaquinhoLink = screen.getByText('Cavaquinho');
    expect(cavaquinhoLink).toBeInTheDocument();
    expect(cavaquinhoLink.closest('a')).toHaveAttribute('href', '/cavaquinho');
  });
});
