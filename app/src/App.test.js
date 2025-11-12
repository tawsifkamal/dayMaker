import { render, screen } from '@testing-library/react';
import App from './App';

test('renders edit and save text', () => {
  render(<App />);
  const textElement = screen.getByText(/edit/i);
  expect(textElement).toBeInTheDocument();
});

// u is gay