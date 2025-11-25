import { render, screen } from '@testing-library/react';
import App from './App';

test('renders instructions to reload', () => {
  render(<App />);
  const linkElement = screen.getByText(/and save to reload./i);
  expect(linkElement).toBeInTheDocument();
});